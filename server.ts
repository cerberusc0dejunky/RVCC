import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import { simulateTruckPack } from "./src/lib/packingEngine";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Increase payload limit for base64 photo uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // Shared server-side Gemini client using the recommended modern SDK
  let ai: GoogleGenAI | null = null;
  if (process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }

  // 1. API Endpoint: Analyze junk image using Gemini
  app.post("/api/analyze-junk", async (req, res) => {
    try {
      const { image, mimeType } = req.body;
      if (!image || !mimeType) {
        return res.status(400).json({ error: "Missing image or mimeType parameters." });
      }

      if (!process.env.GEMINI_API_KEY || !ai) {
        console.warn("[Gemini Image Scan] No GEMINI_API_KEY present in server environment.");
        return res.status(503).json({ error: "Gemini Vision AI is not configured (missing GEMINI_API_KEY)." });
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

3. Recommend the optimal haul vehicle: "truck" (standard 8-foot heavy-duty pickup bed up to 6 cubic yards) or "trailer" (large 14-foot dump trailer for >6 cubic yards or heavy renovation piles).

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

Return ONLY a valid JSON object matching the requested schema.`;

      const imagePart = {
        inlineData: {
          mimeType: mimeType,
          data: image,
        },
      };

      let modelName = "gemini-3.8-flash";
      let response;
      
      try {
        response = await ai.models.generateContent({
          model: modelName,
          contents: [imagePart, { text: prompt }],
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                detectedItems: {
                  type: Type.OBJECT,
                  properties: {
                    mattress: { type: Type.INTEGER },
                    couch: { type: Type.INTEGER },
                    appliance: { type: Type.INTEGER },
                    tv_monitor: { type: Type.INTEGER },
                    tire: { type: Type.INTEGER },
                    yard_bag: { type: Type.INTEGER },
                  },
                  required: ["mattress", "couch", "appliance", "tv_monitor", "tire", "yard_bag"],
                },
                itemTags: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING },
                      quantity: { type: Type.INTEGER },
                      category: { type: Type.STRING },
                      isHeavy: { type: Type.BOOLEAN },
                    },
                    required: ["name", "quantity", "category", "isHeavy"],
                  },
                },
                loadType: { type: Type.STRING },
                truckLoadFraction: { type: Type.STRING },
                volumeCubicYards: { type: Type.NUMBER },
                weightEstimate: { type: Type.STRING },
                primaryDebrisType: { type: Type.STRING },
                estimatedLaborHours: { type: Type.INTEGER },
                crewRecommendation: { type: Type.STRING },
                safetyFlags: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                recyclableDetected: { type: Type.BOOLEAN },
                confidenceScore: { type: Type.NUMBER },
                briefAnalysis: { type: Type.STRING },
                suggestedDescription: { type: Type.STRING },
              },
              required: [
                "detectedItems",
                "itemTags",
                "loadType",
                "truckLoadFraction",
                "volumeCubicYards",
                "weightEstimate",
                "primaryDebrisType",
                "estimatedLaborHours",
                "crewRecommendation",
                "safetyFlags",
                "recyclableDetected",
                "confidenceScore",
                "briefAnalysis",
                "suggestedDescription",
              ],
            },
          },
        });
      } catch (genErr: any) {
        console.warn("Primary model gemini-3.8-flash failed, falling back to gemini-2.5-flash:", genErr?.message);
        modelName = "gemini-2.5-flash";
        response = await ai.models.generateContent({
          model: modelName,
          contents: [imagePart, { text: prompt }],
          config: {
            responseMimeType: "application/json",
          },
        });
      }

      const text = response?.text;
      if (!text) {
        throw new Error("No response received from Gemini API.");
      }

      const result = JSON.parse(text.trim());

      // 1. Physical 3D Bin-Packing: Estimate load size and calculate labor hours
      const itemsToPack = (result.itemTags && result.itemTags.length > 0)
        ? result.itemTags
        : Object.entries(result.detectedItems || {}).flatMap(([name, qty]) => Array(Math.max(0, Number(qty) || 0)).fill(name));

      const sim = simulateTruckPack(itemsToPack);

      result.loadType = sim.loadType;
      result.recommendedVehicle = sim.recommendedVehicle;
      result.truckLoadFraction = sim.truckLoadFraction;
      result.volumeCubicYards = sim.volumeCubicYards;
      result.weightEstimate = sim.weightEstimate;
      result.estimatedLaborHours = sim.estimatedLaborHours;
      result.crewRecommendation = sim.crewRecommendation;
      result.physicsNotes = sim.physicsNotes;
      result.confidenceScore = sim.confidenceScore;
      result.briefAnalysis = sim.briefAnalysis;

      // 2. Silently add the labor to the invoice in the background via Shopify Storefront API
      const estimatedHours = sim.estimatedLaborHours;

      // Shopify Storefront API cart creation
      const shopifyEndpoint = "https://c0dejunky.com/api/2024-01/graphql.json";
      const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || "";

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

      let checkoutUrl = `https://c0dejunky.com/cart/46871135060165:${estimatedHours}`;

      if (storefrontAccessToken && storefrontAccessToken.trim() !== "") {
        try {
          const shopifyRes = await fetch(shopifyEndpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Shopify-Storefront-Access-Token": storefrontAccessToken
            },
            body: JSON.stringify({
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
            })
          });

          if (shopifyRes.ok) {
            const shopifyData: any = await shopifyRes.json();
            const extractedUrl = shopifyData?.data?.cartCreate?.cart?.checkoutUrl;
            if (extractedUrl) {
              checkoutUrl = extractedUrl;
            } else if (shopifyData?.data?.cartCreate?.userErrors?.length) {
              console.warn("Shopify cartCreate userErrors:", shopifyData.data.cartCreate.userErrors);
            }
          }
        } catch (shopifyErr) {
          console.error("Shopify cart creation error:", shopifyErr);
        }
      }

      result.checkoutUrl = checkoutUrl;
      result.url = checkoutUrl;

      return res.json(result);
    } catch (error: any) {
      console.error("Gemini Error:", error);
      return res.status(500).json({ error: error.message || "Failed to analyze photo" });
    }
  });

  // API Endpoint: Add booking to Google Calendar
  app.post("/api/add-to-calendar", async (req, res) => {
    try {
      const { title, description, date, timeSlot, address, clientName, accessToken } = req.body;
      
      if (!accessToken) {
        console.log(`[Google Calendar Simulation] Booking added for ${clientName} on ${date} (${timeSlot}) at ${address}`);
        return res.json({
          success: true,
          simulated: true,
          message: "Saved to local schedule. Connect Google Calendar via OAuth to write directly to your real calendar."
        });
      }

      // Calculate start and end times based on selected date and time slot
      // Morning is 8 AM to 12 PM, Afternoon is 12 PM to 4 PM
      const startHour = timeSlot === "morning" ? "08:00:00" : "12:00:00";
      const endHour = timeSlot === "morning" ? "12:00:00" : "16:00:00";
      
      const startDateTime = `${date}T${startHour}-05:00`; // Arkansas Central Time offset
      const endDateTime = `${date}T${endHour}-05:00`;

      const event = {
        summary: title || `River Valley Cleanup Crew - ${clientName}`,
        location: address,
        description: `${description || "No description provided."}\n\nClient Name: ${clientName}\nTime Slot: ${timeSlot}`,
        start: {
          dateTime: startDateTime,
          timeZone: "America/Chicago"
        },
        end: {
          dateTime: endDateTime,
          timeZone: "America/Chicago"
        }
      };

      const response = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${accessToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(event)
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error("Google Calendar API Error:", errText);
        throw new Error(`Google Calendar API response error: ${response.statusText}`);
      }

      const result = await response.json();
      return res.json({ success: true, eventId: result.id, message: "Successfully synced with Google Calendar!" });
    } catch (error: any) {
      console.error("Calendar Sync Error:", error);
      return res.status(500).json({ error: error.message || "Failed to sync event with Google Calendar." });
    }
  });

  // 2. API Endpoint: Create Shopify checkout cart via Storefront API
  app.post("/api/create-checkout-session", async (req, res) => {
    try {
      const { hours, estimatedLaborHours, total } = req.body;
      const quantity = Math.max(1, Math.round(Number(hours || estimatedLaborHours || (total ? Math.max(1, Math.round(total / 75)) : 2))));

      const shopifyEndpoint = "https://c0dejunky.com/api/2024-01/graphql.json";
      const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || "";

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
                quantity
              }
            ]
          }
        }
      };

      let checkoutUrl = `https://c0dejunky.com/cart/46871135060165:${quantity}`;

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
            const shopifyData: any = await shopifyRes.json();
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
          console.error("Shopify checkout request error:", shopifyErr);
        }
      }

      return res.json({
        checkoutUrl,
        url: checkoutUrl
      });
    } catch (error: any) {
      console.error("Shopify Checkout Error:", error);
      return res.status(500).json({ error: error.message || "Failed to initiate Shopify checkout" });
    }
  });

  // Serve static files / Vite middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.use("/assets", express.static(path.join(process.cwd(), "public", "assets")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
