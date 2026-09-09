// functions/api/create-checkout-session.js
// Cloudflare Pages Function: Create Shopify Checkout Cart using Storefront API at the edge

export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const body = await request.json().catch(() => ({}));
    const hours = Math.max(1, Math.round(Number(body.hours || body.estimatedLaborHours || 1)));

    const shopifyEndpoint = "https://c0dejunky.com/api/2024-01/graphql.json";
    const storefrontAccessToken = env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || env.X_SHOPIFY_STOREFRONT_ACCESS_TOKEN || "YOUR_SHOPIFY_STOREFRONT_ACCESS_TOKEN";

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
              quantity: hours
            }
          ]
        }
      }
    };

    let checkoutUrl = `https://c0dejunky.com/cart/46871135060165:${hours}`;

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
        console.error("Shopify Storefront API Error:", shopifyRes.status, errText);
      }
    } catch (shopifyErr) {
      console.error("Shopify cart creation error:", shopifyErr);
    }

    return Response.json({
      checkoutUrl,
      url: checkoutUrl
    });
  } catch (err) {
    console.error("Shopify checkout function error:", err);
    return Response.json({ error: err.message || "Failed to create Shopify checkout session" }, { status: 500 });
  }
}

