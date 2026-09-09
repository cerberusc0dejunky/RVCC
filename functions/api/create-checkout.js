// functions/api/create-checkout.js
// Alias endpoint for /api/create-checkout forwarding to create-checkout-session handler
import { onRequestPost } from "./create-checkout-session.js";
export { onRequestPost };
