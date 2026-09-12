// functions/api/analyze-junk.js
// Cloudflare Pages Function: Analyze debris photo using Google Gemini API at the edge
import { simulateTruckPack } from "./packingEngine.js";

export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const { image, mimeType } = await request.json();

    if (!image || !mimeType) {
      return Response.json(
        { error: "Missing image or mimeType parameters." },
        { status: 400 }
      );
    }

    const apiKey = env.GEMINI_API_KEY;

    // Enforce valid GEMINI_API_KEY
    if (!apiKey) {
      console.warn("[Gemini Scan] No GEMINI_API_KEY present in Cloudflare env.");
      return Response.json(
        { error: "Gemini Vision AI service is not configured (missing GEMINI_API_KEY). Please contact dispatch or describe items manually." },
        { status: 503 }
      );
    }

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

15. STRICT SEBASTIAN COUNTY LANDFILL NON-HAULABLE SCREENING:
Check image for prohibited items that the local landfill rejects:
- Non-solidified/wet paint cans
- Burn barrels with loose unbagged debris
- Gas cans or fuel tanks with liquid
- Tires (unless visibly cut and quartered)
- Motor oil, oil filters, or free automotive fluids
- Car batteries, lead-acid or heavy metal batteries
- Septic pumpings or incinerator ash
- Free liquids (EPA Method 9095)
- Medical / veterinary biohazard waste
- Compressed gas cylinders or closed chemical drums
- Transformers or dielectric fluids
- Pesticide, herbicide, or fungicide containers
- PCB or hazardous chemical containers
- Firearms, ammunition, gunpowder, fireworks, explosives
- Commercial fluorescent tubes
If any are detected, list their exact names in 'prohibitedItemsDetected: string[]', add explicit warnings to 'safetyFlags' noting River Valley Cleanup Crew cannot haul them, and mention in 'briefAnalysis'.

Return ONLY a valid JSON object matching the requested schema with all required fields.`;

    const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`;

    const geminiPayload = {
      contents: [
        {
          parts: [
            {
              inline_data: {
                mime_type: mimeType,
                data: image
              }
            },
            {
              text: prompt
            }
          ]
        }
      ],
      generationConfig: {
        responseMimeType: "application/json"
      }
    };

    const res = await fetch(geminiEndpoint, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "X-goog-api-key": apiKey
      },
      body: JSON.stringify(geminiPayload)
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Gemini Edge API error:", errText);
      return Response.json({ error: "Gemini API error: " + res.statusText }, { status: res.status });
    }

    const data = await res.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!rawText) {
      return Response.json({ error: "No response text generated by Gemini." }, { status: 500 });
    }

    const parsed = JSON.parse(rawText);

    // 1. Physical 3D Bin-Packing Model: Estimate load size and calculate job labor time
    const itemsToPack = (parsed.itemTags && parsed.itemTags.length > 0)
      ? parsed.itemTags
      : Object.entries(parsed.detectedItems || {}).flatMap(([name, qty]) => Array(Math.max(0, Number(qty) || 0)).fill(name));

    const sim = simulateTruckPack(itemsToPack);

    // Overwrite raw LLM guesses with deterministic 3D packing physics
    parsed.loadType = sim.loadType;
    parsed.recommendedVehicle = sim.recommendedVehicle;
    parsed.truckLoadFraction = sim.truckLoadFraction;
    parsed.volumeCubicYards = sim.volumeCubicYards;
    parsed.weightEstimate = sim.weightEstimate;
    parsed.estimatedLaborHours = sim.estimatedLaborHours;
    parsed.crewRecommendation = sim.crewRecommendation;
    parsed.physicsNotes = sim.physicsNotes;
    parsed.safetyFlags = sim.safetyFlags;
    parsed.prohibitedItemsDetected = [
      ...new Set([...(sim.prohibitedItemsDetected || []), ...(parsed.prohibitedItemsDetected || [])])
    ];
    parsed.hasProhibitedItems = parsed.prohibitedItemsDetected.length > 0;
    parsed.confidenceScore = sim.confidenceScore;
    parsed.briefAnalysis = sim.briefAnalysis;

    // 2. Silently add the labor to the invoice in the background via Shopify Storefront API
    const estimatedHours = sim.estimatedLaborHours;
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
          console.error("Shopify Storefront API error:", shopifyRes.status, errText);
        }
      } catch (shopifyErr) {
        console.error("Shopify checkout request failed:", shopifyErr);
      }
    }

    return Response.json({
      ...parsed,
      checkoutUrl,
      url: checkoutUrl
    });
  } catch (err) {
    console.error("Analyze photo function error:", err);
    return Response.json({ error: err.message || "Failed to analyze photo" }, { status: 500 });
  }
}
