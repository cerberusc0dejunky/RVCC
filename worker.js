// Cloudflare Worker: Gemini Debris Analysis & Shopify Storefront Cart Creator
// Reworked to replace Stripe Checkout with Shopify Storefront API cartCreate mutation

export default {
  async fetch(request, env, ctx) {
    // 1. Handle CORS Preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, X-Shopify-Storefront-Access-Token, Authorization",
        },
      });
    }

    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };

    if (request.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed. Send a POST request." }),
        { status: 405, headers: corsHeaders }
      );
    }

    try {
      // 2. Image upload handling
      let image = "";
      let mimeType = "image/jpeg";
      let hoursParam = null;

      const contentType = request.headers.get("content-type") || "";

      if (contentType.includes("application/json")) {
        const body = await request.json().catch(() => ({}));
        image = body.image || "";
        mimeType = body.mimeType || "image/jpeg";
        hoursParam = body.hours || body.estimatedLaborHours || null;
      } else if (contentType.includes("multipart/form-data")) {
        const formData = await request.formData();
        const file = formData.get("image") || formData.get("photo") || formData.get("file");
        if (file && typeof file !== "string") {
          mimeType = file.type || "image/jpeg";
          const arrayBuffer = await file.arrayBuffer();
          const bytes = new Uint8Array(arrayBuffer);
          let binary = "";
          for (let i = 0; i < bytes.byteLength; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          image = btoa(binary);
        } else if (typeof file === "string") {
          image = file;
        }
      }

      // If raw base64 data URL was passed (e.g. data:image/jpeg;base64,...), strip prefix
      if (image.startsWith("data:")) {
        const matches = image.match(/^data:([^;]+);base64,(.+)$/);
        if (matches) {
          mimeType = matches[1];
          image = matches[2];
        }
      }

      const apiKey = env.GEMINI_API_KEY;

      if (!apiKey) {
        return new Response(
          JSON.stringify({ error: "Gemini Vision API key is not configured on this server." }),
          { status: 503, headers: corsHeaders }
        );
      }

      if (!image) {
        return new Response(
          JSON.stringify({ error: "Missing image payload for analysis." }),
          { status: 400, headers: corsHeaders }
        );
      }

      let parsedAnalysis = null;

      // 3. Gemini API Call & Hour Estimation Logic
      const prompt = `You are an expert junk removal dispatcher and hazardous debris estimator for River Valley Cleanup Crew in Fort Smith, Arkansas.
Carefully examine this photo of debris, scrap, trash, or discarded items and provide a thorough, professional assessment:

1. Identify specific landfill-tracked items:
   - mattress: count of mattresses / box springs (0 or more)
   - couch: count of sofas, sectionals, or recliners (0 or more)
   - appliance: count of refrigerators, washers, dryers, stoves (0 or more)
   - tv_monitor: count of televisions or computer monitors (0 or more)
   - tire: count of automotive or trailer tires (0 or more)
   - yard_bag: count of yard bags or contractor trash bags (0 or more)

2. Provide an itemized list of specific objects seen (itemTags) with item name, quantity, category (e.g., "Furniture", "Appliance", "Metal Scrap", "Construction", "Yard Waste", "Household", "Electronics"), and whether it is heavy (isHeavy: boolean).

3. Recommend the optimal haul vehicle: "truck" (standard 8-foot pickup bed up to 6 cubic yards) or "trailer" (large 14-foot dump trailer for >6 cubic yards or heavy piles).

4. Estimate the truck load fraction (e.g., "1/4 Truck Bed", "1/2 Truck Bed", "Full Bed", "Requires 14-ft Dump Trailer").

5. Estimate volume in cubic yards (e.g. 1.5, 3.0, 5.5, 10.0).

6. Estimate weight category (e.g., "Light (< 400 lbs)", "Medium (400 - 1,000 lbs)", "Heavy (1,000+ lbs)").

7. Classify the primary debris type (e.g., "Furniture & Clutter", "Construction / Remodel", "Yard & Greenery", "Metal / Salvage").

8. Estimate labor hours needed for 2 people to lift, load, tarp, and sweep the area (integer between 1 and 8).

9. Recommend crew size & handling needs (e.g., "1-Person Quick Load", "2-Person Heavy Lifting Crew").

10. Note any safety flags or obstacles (e.g., "Glass or sharp edges present", "Requires 2-person lift", "Curbside easy access", "Freon appliance handling").

11. Note if any recyclable or scrap metal is detected (boolean).

12. Assign a confidence score between 0.80 and 0.99.

13. Provide a concise 1-2 sentence professional dispatch summary in "briefAnalysis".

14. Provide a clear, clean customer description in "suggestedDescription" ready for a work order ticket.

Return ONLY a valid JSON object matching the requested schema with all required fields.`;

      const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`;
      const geminiPayload = {
        contents: [
          {
            parts: [
              { inline_data: { mime_type: mimeType, data: image } },
              { text: prompt }
            ]
          }
        ],
        generationConfig: {
          responseMimeType: "application/json"
        }
      };

      const geminiRes = await fetch(geminiEndpoint, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "X-goog-api-key": apiKey
        },
        body: JSON.stringify(geminiPayload)
      });

      if (!geminiRes.ok) {
        const errText = await geminiRes.text();
        return new Response(
          JSON.stringify({ error: `Gemini API error (${geminiRes.status}): ${errText}` }),
          { status: geminiRes.status, headers: corsHeaders }
        );
      }

      const geminiData = await geminiRes.json();
      const rawText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) {
        return new Response(
          JSON.stringify({ error: "No response text generated by Gemini." }),
          { status: 500, headers: corsHeaders }
        );
      }

      try {
        parsedAnalysis = JSON.parse(rawText);
      } catch (jsonErr) {
        return new Response(
          JSON.stringify({ error: "Failed to parse Gemini output JSON." }),
          { status: 500, headers: corsHeaders }
        );
      }

      // Hour estimation logic: take hours estimated by Gemini, or from explicit param, minimum 1
      const estimatedHours = Math.max(
        1,
        Math.round(Number(hoursParam || parsedAnalysis.estimatedLaborHours || 1))
      );

      // 4. Shopify Storefront API Cart Creation
      const shopifyEndpoint = "https://c0dejunky.com/api/2024-01/graphql.json";
      const storefrontAccessToken = env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || env.X_SHOPIFY_STOREFRONT_ACCESS_TOKEN || "";

      const cartMutation = `
        mutation cartCreate($input: CartInput!) {
          cartCreate(input: $input) {
            cart {
              id
              checkoutUrl
            }
            userErrors {
              field
              message
            }
          }
        }
      `;

      const shopifyPayload = {
        query: cartMutation,
        variables: {
          input: {
            lines: [
              {
                merchandiseId: "gid://shopify/ProductVariant/46871135060165",
                quantity: estimatedHours
              }
            ]
          }
        }
      };

      let checkoutUrl = `https://c0dejunky.com/cart/46871135060165:${estimatedHours}`;

      if (storefrontAccessToken && storefrontAccessToken.trim() !== "") {
        try {
          const shopifyRes = await fetch(shopifyEndpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Shopify-Storefront-Access-Token": storefrontAccessToken
            },
            body: JSON.stringify(shopifyPayload)
          });

          if (shopifyRes.ok) {
            const shopifyData = await shopifyRes.json();
            const extractedUrl = shopifyData?.data?.cartCreate?.cart?.checkoutUrl;
            if (extractedUrl) {
              checkoutUrl = extractedUrl;
            } else if (shopifyData?.data?.cartCreate?.userErrors?.length) {
              console.warn("Shopify cartCreate userErrors:", shopifyData.data.cartCreate.userErrors);
            }
          } else {
            const errText = await shopifyRes.text();
            console.error("Shopify Storefront API HTTP error:", shopifyRes.status, errText);
          }
        } catch (shopifyErr) {
          console.error("Shopify cart creation error:", shopifyErr);
        }
      }

      // 5. Return { checkoutUrl } matching the original format and preserving full response back to frontend
      return new Response(
        JSON.stringify({
          ...parsedAnalysis,
          checkoutUrl,
          url: checkoutUrl // Included for backward compatibility with Stripe session url property
        }),
        { status: 200, headers: corsHeaders }
      );

    } catch (err) {
      console.error("Cloudflare Worker execution error:", err);
      return new Response(
        JSON.stringify({ error: err.message || "Internal worker error" }),
        { status: 500, headers: corsHeaders }
      );
    }
  }
};
