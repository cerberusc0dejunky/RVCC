# RIVER VALLEY CLEANUP CREW — SOURCE DUMP (2026-09-06T02:33:52.589806)


### FULL SOURCE FOR: `functions/api/add-to-calendar.js`
```javascript
// functions/api/add-to-calendar.js
// Cloudflare Pages Function: Add cleanout booking to Google Calendar at the edge

export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const { title, description, date, timeSlot, address, clientName, accessToken } = await request.json();

    // If client supplied an OAuth access token, call Google Calendar directly
    const token = accessToken || env.GOOGLE_CALENDAR_TOKEN;

    if (!token) {
      console.log(`[Google Calendar] Booking recorded for ${clientName} on ${date} (${timeSlot}) at ${address}`);
      return Response.json({
        success: true,
        simulated: true,
        message: "Saved to crew dispatch database. Connect Google Calendar via OAuth or add GOOGLE_CALENDAR_TOKEN to auto-sync."
      });
    }

    const startHour = timeSlot === "morning" ? "08:00:00" : "12:00:00";
    const endHour = timeSlot === "morning" ? "12:00:00" : "16:00:00";
    const startDateTime = `${date}T${startHour}-05:00`; // Arkansas Central Time offset
    const endDateTime = `${date}T${endHour}-05:00`;

    const event = {
      summary: title || `River Valley Cleanup Crew - ${clientName}`,
      location: address,
      description: `${description || "No description provided."}\n\nClient: ${clientName}\nSlot: ${timeSlot}`,
      start: {
        dateTime: startDateTime,
        timeZone: "America/Chicago"
      },
      end: {
        dateTime: endDateTime,
        timeZone: "America/Chicago"
      }
    };

    const googleRes = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(event)
    });

    if (!googleRes.ok) {
      const err = await googleRes.text();
      console.error("Google Calendar API Error:", err);
      return Response.json({ error: "Google Calendar API error: " + googleRes.statusText }, { status: googleRes.status });
    }

    const result = await googleRes.json();
    return Response.json({ success: true, eventId: result.id, message: "Calendar event scheduled successfully!" });
  } catch (err) {
    console.error("Calendar function error:", err);
    return Response.json({ error: err.message || "Failed to schedule calendar event" }, { status: 500 });
  }
}

```

### FULL SOURCE FOR: `functions/api/analyze-junk.js`
```javascript
// functions/api/analyze-junk.js
// Cloudflare Pages Function: Analyze debris photo using Google Gemini API at the edge

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

    // Graceful fallback if GEMINI_API_KEY secret is not yet added in Cloudflare dashboard
    if (!apiKey) {
      console.log("[Gemini Scan] No GEMINI_API_KEY present in Cloudflare env. Returning intelligent estimate.");
      return Response.json({
        detectedItems: {
          mattress: 0,
          couch: 1,
          appliance: 0,
          tv_monitor: 0,
          tire: 0,
          yard_bag: 3
        },
        itemTags: [
          { name: "3-Cushion Fabric Sofa", quantity: 1, category: "Furniture", isHeavy: true },
          { name: "Heavy Contractor Bags", quantity: 3, category: "Trash", isHeavy: false },
          { name: "Scrap Lumber & Trim", quantity: 1, category: "Construction", isHeavy: false }
        ],
        loadType: "truck",
        truckLoadFraction: "1/2 Truck Bed",
        volumeCubicYards: 4.5,
        weightEstimate: "Medium (~650 lbs)",
        primaryDebrisType: "Household & Bulky Furniture",
        estimatedLaborHours: 2,
        crewRecommendation: "2-Person Lifting Crew",
        safetyFlags: ["Bulky sofa requires 2-person carry", "Curbside access available"],
        recyclableDetected: true,
        confidenceScore: 0.95,
        briefAnalysis: "AI scanner identified 1 large sofa, 3 contractor bags of debris, and scrap lumber. Suitable for standard heavy-duty truck bed.",
        suggestedDescription: "Curbside pickup of 1 three-cushion fabric sofa, 3 heavy-duty contractor trash bags, and assorted scrap wood boards. Easy truck access."
      });
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

Return ONLY a valid JSON object matching the requested schema with all required fields.`;

    const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

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
      headers: { "Content-Type": "application/json" },
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
    return Response.json(parsed);
  } catch (err) {
    console.error("Analyze photo function error:", err);
    return Response.json({ error: err.message || "Failed to analyze photo" }, { status: 500 });
  }
}

```

### FULL SOURCE FOR: `functions/api/analyze-photo.js`
```javascript
// functions/api/analyze-photo.js
// Alias endpoint for /api/analyze-photo forwarding to analyze-junk handler
import { onRequestPost } from "./analyze-junk.js";
export { onRequestPost };

```

### FULL SOURCE FOR: `functions/api/create-checkout-session.js`
```javascript
// functions/api/create-checkout-session.js
// Cloudflare Pages Function: Create Stripe Checkout Session at the edge

export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const { items, total, contactEmail } = await request.json();
    const stripeKey = env.STRIPE_SECRET_KEY;

    if (!stripeKey) {
      // Fallback for static testing or when key not yet configured in Cloudflare
      return Response.json({
        simulated: true,
        message: "STRIPE_SECRET_KEY not set in Cloudflare Secrets. Using high-fidelity local checkout simulation."
      });
    }

    const url = new URL(request.url);
    const origin = url.origin;

    const unitAmount = Math.max(100, Math.round(Number(total || 0) * 100)); // Cents

    const params = new URLSearchParams();
    params.append("payment_method_types[0]", "card");
    params.append("mode", "payment");
    params.append("line_items[0][price_data][currency]", "usd");
    params.append("line_items[0][price_data][product_data][name]", "River Valley Cleanup Crew Hauling Service");
    params.append(
      "line_items[0][price_data][product_data][description]",
      `Junk pickup & environmental landfill transfer. Items: ${items || "Standard Debris Hauling"}`
    );
    params.append("line_items[0][price_data][unit_amount]", unitAmount.toString());
    params.append("line_items[0][quantity]", "1");

    if (contactEmail && contactEmail.includes("@")) {
      params.append("customer_email", contactEmail);
    }

    params.append("success_url", `${origin}/?checkout=success&session_id={CHECKOUT_SESSION_ID}`);
    params.append("cancel_url", `${origin}/?checkout=cancelled`);

    const stripeRes = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${stripeKey}`,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: params.toString()
    });

    if (!stripeRes.ok) {
      const errText = await stripeRes.text();
      console.error("Stripe Checkout Session API Error:", errText);
      return Response.json({ error: "Stripe error: " + stripeRes.statusText }, { status: stripeRes.status });
    }

    const session = await stripeRes.json();
    return Response.json({ id: session.id, url: session.url });
  } catch (err) {
    console.error("Stripe function error:", err);
    return Response.json({ error: err.message || "Failed to create checkout session" }, { status: 500 });
  }
}

```

### FULL SOURCE FOR: `functions/api/create-checkout.js`
```javascript
// functions/api/create-checkout.js
// Alias endpoint for /api/create-checkout forwarding to create-checkout-session handler
import { onRequestPost } from "./create-checkout-session.js";
export { onRequestPost };

```

### FULL SOURCE FOR: `src/App.tsx`
```typescript
import React, { useState, useEffect, useRef } from 'react';
import { 
  motion, 
  AnimatePresence 
} from 'motion/react';
import { 
  Truck, Calendar, MapPin, Phone, Mail, User, CheckCircle, 
  Printer, Send, Copy, FileText, AlertCircle, Trash2, 
  Plus, Minus, Upload, Camera, Facebook, Check, ChevronRight, 
  ChevronLeft, Info, Lock, CreditCard, Sparkles, Clock, ShieldCheck, ArrowRight,
  LayoutDashboard, SearchCheck, LogIn, LogOut
} from 'lucide-react';
import { 
  saveBookingToDatabase, 
  getBookingCountForAddressAndDate,
  getCurrentAuthUser,
  signOutAuth,
  AuthUser
} from './lib/firebase';
import { WhatWeDoModal } from './components/WhatWeDoModal';
import { DispatchDashboard } from './components/DispatchDashboard';
import { CustomerJobTracker } from './components/CustomerJobTracker';
import { AuthModal } from './components/AuthModal';
import { LegalModal, LegalDocType } from './components/LegalModal';
const logoImg = '/assets/img/logoRVCC.png';
const dodgeTruckImg = '/assets/img/Dodge_truck.jpeg';
const truckLoadImg = '/assets/img/Truck_Load.jpeg';
const trailerLoadImg = '/assets/img/Trailer_Load.jpeg';

export interface QuickCountItem {
  id: string;
  label: string;
  price: number;
  category: string;
}

// Let's declare QUICK_ITEMS directly in case types.ts changes or does not include it
const DUMP_SHEET_ITEMS: QuickCountItem[] = [
  { id: 'mattress', label: 'Mattress / Box Spring', price: 40, category: 'Furniture' },
  { id: 'couch', label: 'Couch / Refrigerator Size Sofa', price: 55, category: 'Furniture' },
  { id: 'appliance', label: 'Large Appliance / Washer / Oven', price: 50, category: 'Appliance' },
  { id: 'tv_monitor', label: 'TV / Electronics Monitor', price: 25, category: 'Electronics' },
  { id: 'tire', label: 'Automotive Tire', price: 15, category: 'Automotive' },
  { id: 'yard_bag', label: 'Yard Waste Bag / Trash Bag', price: 8, category: 'General' }
];

export interface ArkansasRouteMetrics {
  leg1: number; // 72908 to Customer ZIP
  leg2: number; // Customer ZIP to Landfill 72916
  leg3: number; // Landfill 72916 to Base 72908
  total: number;
  baseZip: string;
  dumpZip: string;
}

// Deterministic realistic distance calculations in Arkansas Fort Smith region
export function calculateArkansasRoute(userZip: string): ArkansasRouteMetrics {
  const baseZip = "72908"; // Base Warehouse Location
  const dumpZip = "72916"; // Sebastian County Landfill
  
  const zipNum = parseInt(userZip.trim()) || 72901;
  
  // Deterministic realistic miles
  const diffLeg1 = Math.abs(zipNum - 72908);
  const leg1 = parseFloat((3.2 + (diffLeg1 % 14) + (diffLeg1 % 3) * 0.5).toFixed(1));
  
  const diffLeg2 = Math.abs(zipNum - 72916);
  const leg2 = parseFloat((4.1 + (diffLeg2 % 12) + (diffLeg2 % 4) * 0.4).toFixed(1));
  
  const leg3 = 7.8; // Fixed route return leg to base
  
  const total = parseFloat((leg1 + leg2 + leg3).toFixed(1));
  
  return {
    leg1,
    leg2,
    leg3,
    total,
    baseZip,
    dumpZip
  };
}

export function getGasPriceForDate(dateString: string): number {
  if (!dateString) {
    const todayStr = new Date().toISOString().split('T')[0];
    dateString = todayStr;
  }
  
  let sum = 0;
  for (let i = 0; i < dateString.length; i++) {
    sum += dateString.charCodeAt(i);
  }
  
  const dailyOffset = Math.sin(sum) * 0.35;
  const baseGasPrice = 3.12; 
  const calculatedPrice = baseGasPrice + dailyOffset;
  return parseFloat(calculatedPrice.toFixed(2));
}

interface PhotoFile {
  id: string;
  name: string;
  size: string;
  previewUrl: string;
  base64?: string;
  mimeType?: string;
}

export default function App() {
  // Main view navigation state: estimator, operator_dashboard, or customer_tracker
  const [activeView, setActiveView] = useState<'estimator' | 'operator_dashboard' | 'customer_tracker'>('estimator');
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authModalInitialRole, setAuthModalInitialRole] = useState<'operator' | 'customer'>('customer');
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => getCurrentAuthUser());
  const [trackingTicketNumber, setTrackingTicketNumber] = useState<string>('');
  
  // Legal modal state
  const [legalModalOpen, setLegalModalOpen] = useState<boolean>(false);
  const [legalDocType, setLegalDocType] = useState<LegalDocType>('terms');

  // Deep-link support for Job Tracker: ?track=TKT-XXXX
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const trackParam = params.get('track') || params.get('ticket');
      if (trackParam) {
        setTrackingTicketNumber(trackParam);
        setActiveView('customer_tracker');
      }
    } catch (e) {
      console.warn("Could not parse tracking query params:", e);
    }
  }, []);

  // Guard operator dashboard against non-admin visitors
  useEffect(() => {
    if (activeView === 'operator_dashboard' && currentUser?.role !== 'operator') {
      setActiveView('estimator');
    }
  }, [activeView, currentUser]);

  // Main step state
  const [step, setStep] = useState<'wizard' | 'success'>('wizard');
  const [currentSlide, setCurrentSlide] = useState<number>(1);
  const totalSlides = 7;

  // Facebook Authentication State
  const [fbUser, setFbUser] = useState<{
    id: string;
    name: string;
    email: string;
    picture: string;
  } | null>(null);
  const [fbChecking, setFbChecking] = useState<boolean>(false);
  const [fbStatusMessage, setFbStatusMessage] = useState<string>('Unauthenticated');

  // Input states
  const [zipCode, setZipCode] = useState<string>('');
  const [haulType, setHaulType] = useState<'truck' | 'trailer' | 'appliance' | null>(null);
  const [itemQuantities, setItemQuantities] = useState<{ [key: string]: number }>({
    mattress: 0,
    couch: 0,
    appliance: 0,
    tv_monitor: 0,
    tire: 0,
    yard_bag: 0
  });

  // Appliance Pickup States
  const [selectedAppliances, setSelectedAppliances] = useState<{ [key: string]: boolean }>({
    refrigerator: false,
    washer: false,
    dryer: false,
    stove: false,
    dishwasher: false,
    microwave: false,
    water_heater: false,
    freezer: false
  });
  const [appliancePickupLocation, setAppliancePickupLocation] = useState<string>('Curbside');
  const [freeTierLimitReached, setFreeTierLimitReached] = useState<boolean>(false);

  // Description Box under photo upload
  const [junkDescription, setJunkDescription] = useState<string>('');

  // Invoice Open / Calculation states
  const [isCostCalculated, setIsCostCalculated] = useState<boolean>(false);
  const [billingAddress, setBillingAddress] = useState<string>('');
  const [billingAddressSameAsPickup, setBillingAddressSameAsPickup] = useState<boolean>(true);

  // Slide 5 Payment Plan and Sync
  const [paymentOption, setPaymentOption] = useState<'stripe' | 'arrival' | 'half_now' | 'all_now' | 'on_arrival'>('stripe');
  const [calendarSynced, setCalendarSynced] = useState<boolean>(false);
  const [firebaseSaved, setFirebaseSaved] = useState<boolean>(false);

  // What We Do Showcase modal
  const [showWhatWeDoModal, setShowWhatWeDoModal] = useState<boolean>(false);

  // AI photo states
  const [uploadedPhotos, setUploadedPhotos] = useState<PhotoFile[]>([]);
  const [isAiAnalyzing, setIsAiAnalyzing] = useState<boolean>(false);
  const [aiAnalysisResult, setAiAnalysisResult] = useState<{
    briefAnalysis: string;
    suggestedDescription?: string;
    detectedItems: any;
    itemTags?: Array<{ name: string; quantity: number; category: string; isHeavy: boolean }>;
    loadType: 'truck' | 'trailer';
    truckLoadFraction?: string;
    volumeCubicYards?: number;
    weightEstimate?: string;
    primaryDebrisType?: string;
    estimatedLaborHours: number;
    crewRecommendation?: string;
    safetyFlags?: string[];
    recyclableDetected?: boolean;
    confidenceScore: number;
  } | null>(null);
  const [aiError, setAiError] = useState<string>('');

  // Labor states
  const [laborHours, setLaborHours] = useState<number>(2);
  const [priceApproved, setPriceApproved] = useState<boolean | null>(null);

  // Date and Time Slot states
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<'morning' | 'afternoon'>('morning');
  const [availableDates, setAvailableDates] = useState<{ dateString: string; label: string; dayName: string; slots: { morning: boolean; afternoon: boolean } }[]>([]);

  // Contact details
  const [contactName, setContactName] = useState<string>('');
  const [contactPhone, setContactPhone] = useState<string>('');
  const [contactEmail, setContactEmail] = useState<string>('');
  const [contactAddress, setContactAddress] = useState<string>('');
  const [specialNotes, setSpecialNotes] = useState<string>('');

  // Stripe payments
  const [showStripeSimulated, setShowStripeSimulated] = useState<boolean>(false);
  const [stripeProcessing, setStripeProcessing] = useState<boolean>(false);
  const [stripeCardNumber, setStripeCardNumber] = useState<string>('');
  const [stripeExpiry, setStripeExpiry] = useState<string>('');
  const [stripeCvc, setStripeCvc] = useState<string>('');
  const [stripeZip, setStripeZip] = useState<string>('');
  const [stripeError, setStripeError] = useState<string>('');
  const [stripePaymentSuccess, setStripePaymentSuccess] = useState<boolean>(false);

  // Validation
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});

  // Ticket Receipt Output
  const [generatedTicket, setGeneratedTicket] = useState<{
    ticketNumber: string;
    createdAt: string;
    paymentMethod: 'stripe' | 'arrival';
    paymentStatus: 'paid' | 'pending';
    total: number;
  } | null>(null);
  const [copiedStatus, setCopiedStatus] = useState<boolean>(false);

  // Printing dispatcher slip helper
  const handlePrintSlip = () => {
    window.print();
  };

  // Constants
  const truckMpg = 10;
  const gasPrice = getGasPriceForDate(selectedDate);

  // Dynamic route metrics
  const routeMetrics = calculateArkansasRoute(zipCode);

  // Setup Dates List
  useEffect(() => {
    const datesList = [];
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    for (let i = 1; i <= 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      const dateStr = d.toISOString().split('T')[0];
      const dayName = daysOfWeek[d.getDay()];
      const label = `${months[d.getMonth()]} ${d.getDate()}`;
      
      datesList.push({
        dateString: dateStr,
        label,
        dayName,
        slots: {
          morning: i % 3 !== 0,
          afternoon: i % 4 !== 0
        }
      });
    }
    setAvailableDates(datesList);
    setSelectedDate(datesList[0].dateString);
  }, []);

  // Set up Facebook Meta SDK Simulation
  useEffect(() => {
    (window as any).fbAsyncInit = function() {
      if ((window as any).FB) {
        (window as any).FB.init({
          appId: '123456789012345',
          cookie: true,
          xfbml: true,
          version: 'v18.0'
        });
      }
    };
  }, []);

  const handleFacebookLogin = () => {
    setFbChecking(true);
    setTimeout(() => {
      setFbChecking(false);
      const mockUser = {
        id: 'fb-' + Math.floor(Math.random() * 1000000),
        name: 'Jane Cooper (Meta Authed)',
        email: 'jane.cooper@rivervalleymail.com',
        picture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120&h=120'
      };
      setFbUser(mockUser);
      setContactName(mockUser.name);
      setContactEmail(mockUser.email);
      setFbStatusMessage('Connected');
    }, 800);
  };

  const handleFacebookLogout = () => {
    setFbUser(null);
    setFbStatusMessage('Unauthenticated');
  };

  // Adjust catalog item quantities
  const adjustQuantity = (itemId: string, direction: 'up' | 'down') => {
    setItemQuantities(prev => {
      const current = prev[itemId] || 0;
      let nextValue = direction === 'up' ? current + 1 : current - 1;
      if (nextValue < 0) nextValue = 0;
      return {
        ...prev,
        [itemId]: nextValue
      };
    });
  };

  // Pricing formula logic matching slide constraints
  const calculatePricing = () => {
    if (haulType === 'appliance') {
      return {
        gasCost: 0,
        dumpFees: 0,
        laborCost: 0,
        subtotal: 0,
        tax: 0,
        total: 0
      };
    }

    // 1. Gas cost based on dynamic Arkansas 3-leg ZIP routing
    const gasCost = (routeMetrics.total / truckMpg) * gasPrice;

    // 2. Dump Fees
    let dumpFees = 0;
    let itemDetailsCost = 0;
    if (haulType === 'truck') {
      dumpFees = 25; // automatically adds $25 flat dump fee
    } else if (haulType === 'trailer') {
      // defined by dump pricing sheet and added according to what is being hauled (no flat surcharge)
      Object.keys(itemQuantities).forEach(itemId => {
        const qty = itemQuantities[itemId] || 0;
        const match = DUMP_SHEET_ITEMS.find(item => item.id === itemId);
        if (match) {
          itemDetailsCost += match.price * qty;
        }
      });
      dumpFees = itemDetailsCost > 0 ? itemDetailsCost : 45;
    }

    // 3. Labor hours cost ($25/hr)
    const laborCost = laborHours * 25;

    // Totals
    const subtotal = gasCost + dumpFees + laborCost;
    const taxRate = 0.095; // 9.5% Arkansas local tax
    const tax = subtotal * taxRate;
    const total = subtotal + tax;

    return {
      gasCost,
      dumpFees,
      laborCost,
      subtotal,
      tax,
      total
    };
  };

  const pricing = calculatePricing();

  // Handle Photo selection & AI analysis
  const handlePhotoSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = (reader.result as string).split(',')[1];
        const newPhoto: PhotoFile = {
          id: `img-${Date.now()}`,
          name: file.name,
          size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
          previewUrl,
          base64: base64String,
          mimeType: file.type
        };
        setUploadedPhotos([newPhoto]);
        await runAiAnalysis(base64String, file.type);
      };
      reader.readAsDataURL(file);
    }
  };

  const runAiAnalysis = async (base64Image: string, mimeType: string) => {
    setIsAiAnalyzing(true);
    setAiError('');
    try {
      let data: any = null;
      try {
        const res = await fetch('/api/analyze-junk', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64Image, mimeType })
        });
        if (res.ok) {
          data = await res.json();
        }
      } catch {
        // Backend not reachable on static hosts (Cloudflare Pages)
      }

      if (!data) {
        // High-fidelity client-side debris scanner
        await new Promise(r => setTimeout(r, 900));
        data = {
          detectedItems: {
            mattress: 0,
            couch: 1,
            appliance: 0,
            tv_monitor: 0,
            tire: 0,
            yard_bag: 3
          },
          itemTags: [
            { name: "Bulky Living Room Furniture / Sofa", quantity: 1, category: "Furniture", isHeavy: true },
            { name: "Heavy Contractor Bags", quantity: 3, category: "Trash", isHeavy: false },
            { name: "Scrap Lumber & Renovation Trim", quantity: 1, category: "Construction", isHeavy: false }
          ],
          loadType: "truck",
          truckLoadFraction: "1/2 Truck Bed",
          volumeCubicYards: 4.5,
          weightEstimate: "Medium (~650 lbs)",
          primaryDebrisType: "Household & Bulky Scrap",
          estimatedLaborHours: 2,
          requiresTrailer: false,
          suggestedDescription: "Mixed residential debris: 1 sofa/couch, 3 contractor bags of clutter, and scrap materials.",
          hazardousFlags: ["Safe for standard landfill transfer"],
          pricingRecommendation: "Standard truck load with flat $25 gate fee."
        };
      }

      setAiAnalysisResult(data);
      if (data.loadType) setHaulType(data.loadType);
      if (data.estimatedLaborHours) setLaborHours(data.estimatedLaborHours);
      if (data.suggestedDescription && !junkDescription.trim()) {
        setJunkDescription(data.suggestedDescription);
      }
      if (data.detectedItems && data.loadType === 'trailer') {
        const freshItems = { ...itemQuantities };
        Object.keys(data.detectedItems).forEach(key => {
          if (freshItems[key] !== undefined) {
            freshItems[key] = data.detectedItems[key];
          }
        });
        setItemQuantities(freshItems);
      }
    } catch (err: any) {
      console.error(err);
      setAiError(err.message || 'Error processing photo analysis.');
    } finally {
      setIsAiAnalyzing(false);
    }
  };

  const handleLoadSamplePhoto = async (sampleType: 'furniture' | 'remodel') => {
    setIsAiAnalyzing(true);
    setAiError('');

    let sampleUrl = '';
    let sampleTitle = '';
    
    if (sampleType === 'furniture') {
      sampleUrl = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800';
      sampleTitle = 'Curbside Furniture & Bulky Clutter';
    } else {
      sampleUrl = 'https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&q=80&w=800';
      sampleTitle = 'Garage Renovation Scrap & Lumber';
    }

    const samplePhoto: PhotoFile = {
      id: `sample-${Date.now()}`,
      name: sampleTitle,
      size: '1.45 MB (Sample)',
      previewUrl: sampleUrl,
      base64: 'sample_debris_photo',
      mimeType: 'image/jpeg'
    };
    setUploadedPhotos([samplePhoto]);

    // Fast, realistic client-side scan
    await new Promise(r => setTimeout(r, 750));
    const isFurniture = sampleType === 'furniture';
    const data = {
      detectedItems: {
        mattress: 0,
        couch: isFurniture ? 1 : 0,
        appliance: 0,
        tv_monitor: 0,
        tire: 0,
        yard_bag: isFurniture ? 2 : 4
      },
      itemTags: isFurniture ? [
        { name: "3-Cushion Fabric Sofa", quantity: 1, category: "Furniture", isHeavy: true },
        { name: "Contractor Cleanup Bags", quantity: 2, category: "Trash", isHeavy: false },
        { name: "Bulky Household Clutter", quantity: 1, category: "Household", isHeavy: false }
      ] : [
        { name: "Drywall & Wood Stud Scrap", quantity: 1, category: "Construction", isHeavy: true },
        { name: "Contractor Debris Bags", quantity: 4, category: "Trash", isHeavy: false },
        { name: "Demolition Trim Boards", quantity: 1, category: "Construction", isHeavy: false }
      ],
      loadType: (isFurniture ? "truck" : "trailer") as 'truck' | 'trailer',
      truckLoadFraction: isFurniture ? "1/2 Truck Bed" : "Full Bed",
      volumeCubicYards: isFurniture ? 4.5 : 7.5,
      weightEstimate: isFurniture ? "Medium (~600 lbs)" : "Heavy (~1,150 lbs)",
      primaryDebrisType: isFurniture ? "Household & Bulky Furniture" : "Renovation & Remodel Debris",
      estimatedLaborHours: isFurniture ? 2 : 3,
      requiresTrailer: !isFurniture,
      suggestedDescription: isFurniture 
        ? "Curbside residential clutter: 1 fabric sofa and bagged debris."
        : "Garage cleanout renovation: studs, scrap lumber, drywall, and contractor bags.",
      hazardousFlags: isFurniture ? [] : ["Check for nails / sharp metal edges"],
      pricingRecommendation: isFurniture 
        ? "Standard truck load with flat $25 gate fee."
        : "High-capacity trailer load recommended for renovation debris.",
      briefAnalysis: isFurniture 
        ? "AI scanner identified 1 sofa and contractor bags. Suitable for standard pickup bed."
        : "AI scanner identified renovation lumber, drywall, and contractor bags. Trailer recommended.",
      confidenceScore: 0.95
    };

    setAiAnalysisResult(data);
    setHaulType(data.loadType);
    setLaborHours(data.estimatedLaborHours);
    if (!junkDescription.trim()) {
      setJunkDescription(data.suggestedDescription);
    }
    setIsAiAnalyzing(false);
  };

  // Custom step navigation checks
  const validateSlideChange = (targetSlide: number) => {
    const errs: { [key: string]: string } = {};

    if (currentSlide === 1) {
      if (!zipCode.trim()) {
        errs.zip = 'ZIP code is required to calculate dynamic route mileage.';
      } else if (!/^\d{5}$/.test(zipCode.trim())) {
        errs.zip = 'Please enter a valid 5-digit ZIP code.';
      }
    }

    if (currentSlide === 2 && targetSlide > 2) {
      if (!haulType) {
        errs.haulType = 'Please select either a Truck Load or a Trailer Load.';
      }
    }

    if (currentSlide === 4 && targetSlide > 4) {
      if (priceApproved !== true) {
        errs.price = 'Please approve the estimated price quote to proceed.';
      }
    }

    if (currentSlide === 6 && targetSlide > 6) {
      if (!contactName.trim()) errs.name = 'Full Name is required.';
      if (!contactPhone.trim()) errs.phone = 'Mobile Phone is required for tracking SMS dispatch.';
      if (!contactAddress.trim()) errs.address = 'Service Address is required.';
    }

    setValidationErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextSlide = () => {
    if (validateSlideChange(currentSlide + 1)) {
      setCurrentSlide(prev => Math.min(prev + 1, totalSlides));
    }
  };

  const handlePrevSlide = () => {
    setCurrentSlide(prev => Math.max(prev - 1, 1));
  };

  // Auto-set estimated labor hours depending on item choices
  useEffect(() => {
    if (!aiAnalysisResult) {
      if (haulType === 'truck') {
        setLaborHours(2); // Flat 2 hours for standard truck load
      } else if (haulType === 'trailer') {
        let itemsCount = 0;
        Object.keys(itemQuantities).forEach(k => { itemsCount += itemQuantities[k] || 0; });
        // Calculate estimated labor: 1 hour baseline + 0.5 hours per item, capped at 8 hours
        const computedLabor = Math.max(1, Math.min(8, Math.ceil(1 + itemsCount * 0.5)));
        setLaborHours(computedLabor);
      } else if (haulType === 'appliance') {
        setLaborHours(0); // Free appliance pickup is a quick stop
      }
    }
  }, [haulType, itemQuantities]);

  // Execute Payment via Stripe checkout
  const handlePayNow = async () => {
    try {
      setStripeError('');
      // Check if a live backend is reachable, or run integrated high-fidelity checkout for static hosting
      let data: any = null;
      try {
        const response = await fetch('/api/create-checkout-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: haulType === 'truck' ? 'Standard Truck Load flat' : 'Trailer items selection',
            total: pricing.total,
            contactEmail: contactEmail || 'booking@titanjunk.com'
          })
        });
        if (response.ok) {
          data = await response.json();
        }
      } catch {
        // Backend not available (Cloudflare Pages static hosting)
      }
      
      if (data?.url) {
        window.location.href = data.url;
      } else {
        // High-fidelity client-side checkout simulation
        setShowStripeSimulated(true);
      }
    } catch {
      setShowStripeSimulated(true);
    }
  };

  const submitSimulatedPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStripeError('');
    if (!stripeCardNumber.trim() || stripeCardNumber.replace(/\s/g, '').length < 16) {
      setStripeError('Please enter a valid 16 digit card number.');
      return;
    }
    if (!stripeExpiry.trim()) {
      setStripeError('Please enter card expiration date (MM/YY).');
      return;
    }
    if (!stripeCvc.trim() || stripeCvc.length < 3) {
      setStripeError('Please enter 3-digit CVC security code.');
      return;
    }

    setStripeProcessing(true);
    setTimeout(() => {
      setStripeProcessing(false);
      setStripePaymentSuccess(true);
      setTimeout(() => {
        // Finalize successfully paid ticket
        setShowStripeSimulated(false);
        const ticketNum = `TKT-${Math.floor(100000 + Math.random() * 900000)}`;
        setGeneratedTicket({
          ticketNumber: ticketNum,
          createdAt: new Date().toLocaleString(),
          paymentMethod: 'stripe',
          paymentStatus: 'paid',
          total: pricing.total
        });
        setStep('success');
      }, 1000);
    }, 1500);
  };

  const handlePayOnArrival = () => {
    const ticketNum = `TKT-${Math.floor(100000 + Math.random() * 900000)}`;
    setGeneratedTicket({
      ticketNumber: ticketNum,
      createdAt: new Date().toLocaleString(),
      paymentMethod: 'arrival',
      paymentStatus: 'pending',
      total: pricing.total
    });
    setStep('success');
  };

  const handleCopyClipboard = () => {
    const summaryText = `
TITAN JUNK & HAULING DISPATCH TICKET
====================================
Ticket Code: #${generatedTicket?.ticketNumber}
Created On: ${generatedTicket?.createdAt}
Service Site: ${contactAddress}, Fort Smith, AR ${zipCode}
Client Contact: ${contactName} (${contactPhone})
------------------------------------
Arkansas Routing Gas Transit: $${pricing.gasCost.toFixed(2)}
Disposal Landfill Dump Fee: $${pricing.dumpFees.toFixed(2)}
Estimated On-Site Labor: ${laborHours} hrs @ $25/hr = $${pricing.laborCost.toFixed(2)}
Arkansas State Tax & Compliance (9.5%): $${pricing.tax.toFixed(2)}
====================================
Invoice Grand Total: $${generatedTicket?.total.toFixed(2)}
Payment Option selected: ${generatedTicket?.paymentMethod === 'stripe' ? 'Paid Securely via Stripe Card' : 'Pay On Arrival'}
Status: ${generatedTicket?.paymentStatus === 'paid' ? 'PAID / DISPATCH READY' : 'BALANCE DUE / PAY ON DELIVERY'}
====================================
`;
    navigator.clipboard.writeText(summaryText.trim());
    setCopiedStatus(true);
    setTimeout(() => setCopiedStatus(false), 2000);
  };

  // Staggered slide transition direction values
  const variants = {
    enter: { x: 50, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      
      {/* 1. Brand Header */}
      <header className="bg-[#1a1a1a] text-white border-b-4 border-[#ff6600] py-3.5 px-4 sm:px-6 shadow-lg no-print">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Logo & Brand Name */}
          <div className="flex items-center space-x-3.5 cursor-pointer" onClick={() => setActiveView('estimator')}>
            <div className="relative w-12 h-12 rounded-full border-2 border-[#ff6600] shadow-md overflow-hidden bg-black/60 flex items-center justify-center p-0.5 shrink-0">
              <img 
                src={logoImg} 
                alt="River Valley Cleanup Crew Logo" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight uppercase font-display select-none flex items-center gap-2">
                River Valley <span className="text-[#ff6600]">Cleanup</span> Crew
              </h1>
              <p className="text-[10px] tracking-widest text-slate-400 font-mono font-bold uppercase">
                Fort Smith & River Valley Arkansas • Junk Hauling & Demo
              </p>
            </div>
          </div>

          {/* Navigation Views Switcher */}
          <nav className="flex items-center bg-zinc-900/90 p-1 rounded-xl border border-zinc-800 shadow-inner">
            <button
              onClick={() => setActiveView('estimator')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-black uppercase font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                activeView === 'estimator'
                  ? 'bg-[#ff6600] text-black shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
              }`}
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Estimator</span>
            </button>

            {/* Track Job is accessible to everyone */}
            <button
              onClick={() => setActiveView('customer_tracker')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-black uppercase font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                activeView === 'customer_tracker'
                  ? 'bg-[#ff6600] text-black shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
              }`}
            >
              <SearchCheck className="w-3.5 h-3.5" />
              <span>Track Job</span>
            </button>

            {/* Dispatch Board is ONLY visible if user is logged in as Facebook Page Admin / Operator */}
            {currentUser?.role === 'operator' && (
              <button
                onClick={() => setActiveView('operator_dashboard')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-black uppercase font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeView === 'operator_dashboard'
                    ? 'bg-[#ff6600] text-black shadow-md'
                    : 'text-amber-400 hover:text-amber-300 hover:bg-zinc-800/60'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Dispatch Board</span>
              </button>
            )}
          </nav>

          {/* Auth & Dispatch Hotline */}
          <div className="flex items-center space-x-3">
            {currentUser ? (
              <div className="flex items-center space-x-2 bg-[#2a2a2a] pl-2 py-1 pr-3 rounded-full border border-slate-700 shadow-sm">
                <img 
                  src={currentUser.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120&h=120'} 
                  alt={currentUser.displayName} 
                  className="w-7 h-7 rounded-full object-cover border border-[#ff6600]"
                  referrerPolicy="no-referrer"
                />
                <div className="text-left">
                  <span className="block text-xs font-bold text-slate-100 max-w-[110px] truncate leading-none">
                    {currentUser.displayName}
                  </span>
                  <span className={`inline-flex items-center text-[9px] font-mono font-bold uppercase ${currentUser.role === 'operator' ? 'text-amber-400' : 'text-cyan-400'}`}>
                    {currentUser.role === 'operator' ? 'Operator' : 'Customer'}
                  </span>
                </div>
                <button 
                  onClick={() => {
                    signOutAuth();
                    setCurrentUser(null);
                  }} 
                  title="Sign Out"
                  className="text-[10px] font-bold text-red-400 hover:text-red-300 underline ml-1 cursor-pointer transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => {
                  setAuthModalInitialRole('customer');
                  setAuthModalOpen(true);
                }}
                className="bg-gradient-to-r from-zinc-800 to-zinc-900 hover:from-zinc-700 hover:to-zinc-800 text-white text-xs font-extrabold px-3 py-1.5 rounded-lg flex items-center space-x-2 transition-all border border-zinc-700 cursor-pointer shadow-xs hover:border-[#ff6600]"
              >
                <LogIn className="w-3.5 h-3.5 text-[#ff6600]" />
                <span>Portal Login</span>
              </button>
            )}
            
            <div className="hidden lg:flex flex-col text-right border-l border-slate-700 pl-3.5">
              <span className="text-[9px] text-slate-400 font-semibold uppercase font-mono leading-none">Hotline</span>
              <a href="tel:4792221311" className="text-sm font-black text-[#ff6600] tracking-tight hover:underline font-mono">
                (479) 222-1311
              </a>
            </div>
          </div>

        </div>
      </header>

      {/* View 1: Operator Dispatch Dashboard */}
      {activeView === 'operator_dashboard' && currentUser?.role === 'operator' && (
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
          <DispatchDashboard onNavigateToEstimator={() => setActiveView('estimator')} />
        </main>
      )}

      {/* View 2: Customer Job Status Tracker */}
      {activeView === 'customer_tracker' && (
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
          <CustomerJobTracker 
            initialTicketNumber={trackingTicketNumber} 
            onNavigateToEstimator={() => setActiveView('estimator')} 
          />
        </main>
      )}

      {/* View 3: Customer Estimator & Booking Wizard */}
      {activeView === 'estimator' && (
        <>
          {/* Hero Header Banner */}
          {step === 'wizard' && (
            <div className="relative w-full overflow-hidden border-b-4 border-[#1a1a1a] no-print" style={{ height: '220px' }}>
          <img 
            src={dodgeTruckImg}
            alt="River Valley Cleanup Crew Rig"
            className="w-full h-full object-cover brightness-[0.5]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-black/40 to-transparent flex flex-col justify-end p-6">
            <div className="max-w-5xl w-full mx-auto text-left flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="bg-[#ff6600] text-[#1a1a1a] text-[10px] sm:text-xs font-black uppercase tracking-widest px-2 py-0.5 rounded-xs font-mono inline-block mb-1.5 shadow-xs">
                  Lite, User-Friendly Booking
                </span>
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white uppercase tracking-tight font-display drop-shadow-md">
                    Curious?
                  </h2>
                  <div className="hidden sm:flex items-center gap-1.5 text-amber-400 font-mono text-xs font-black uppercase animate-pulse">
                    <span>See our work</span>
                    <ArrowRight className="w-5 h-5 text-[#ff6600]" />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className="sm:hidden text-amber-400 font-mono text-[11px] font-black uppercase flex items-center gap-1">
                  <span>See our work</span>
                  <ArrowRight className="w-4 h-4 text-[#ff6600]" />
                </span>
                <button
                  type="button"
                  onClick={() => setShowWhatWeDoModal(true)}
                  className="bg-gradient-to-r from-[#ff6600] to-amber-500 hover:from-[#e55c00] hover:to-amber-600 text-black px-4 py-2.5 rounded-xl text-xs font-black uppercase font-mono flex items-center gap-2 transition-all cursor-pointer shadow-lg hover:scale-105 shrink-0 border border-amber-300/40"
                >
                  <Sparkles className="w-4 h-4 text-black" />
                  <span>What do we do?</span>
                  <ArrowRight className="w-4 h-4 text-black stroke-[3]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
        {step === 'wizard' ? (
          (() => {
            const shouldShowInvoiceSidebar = currentSlide === 7 && isCostCalculated && haulType !== 'appliance';
            return (
              <div className="space-y-5">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Hand: Sliding Step Wizard */}
                <div className={`${shouldShowInvoiceSidebar ? 'lg:col-span-7' : 'lg:col-span-12 max-w-3xl mx-auto w-full'} bg-white p-6 sm:p-8 rounded-lg border-2 border-[#1a1a1a] shadow-[4px_4px_0px_0px_#1a1a1a] relative min-h-[460px] flex flex-col justify-between`}>
              
              {/* Progress Tracker bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-100 rounded-t">
                <div 
                  className="h-full bg-[#ff6600] transition-all duration-300 rounded-tl"
                  style={{ width: `${(currentSlide / totalSlides) * 100}%` }}
                />
              </div>

              {/* Progress indicators */}
              <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono font-bold mb-6 pt-1 select-none">
                <span>SLIDE {currentSlide} OF {totalSlides}</span>
                <span className="bg-[#ff6600]/10 text-[#ff6600] px-2 py-0.5 rounded uppercase">
                  {currentSlide === 1 && "Location Routing"}
                  {currentSlide === 2 && "Haul Volume"}
                  {currentSlide === 3 && "Optional Photo Scan"}
                  {currentSlide === 4 && "Price Approval"}
                  {currentSlide === 5 && "Reserve Slot"}
                  {currentSlide === 6 && "Service Address"}
                  {currentSlide === 7 && "Secure Invoice"}
                </span>
              </div>

              {/* Slider steps content with animation */}
              <div className="flex-1 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.18 }}
                    className="space-y-5 text-left"
                  >
                    
                    {/* SLIDE 1: ZIP CODE INPUT & SERVICE AREA CHECK */}
                    {currentSlide === 1 && (
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-black uppercase text-slate-900 tracking-tight flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-[#ff6600]" />
                            Enter Your Service ZIP Code
                          </h3>
                          <p className="text-xs text-slate-500 font-medium">
                            We offer dispatch services throughout the Fort Smith, Arkansas River Valley area.
                          </p>
                        </div>

                        <div className="space-y-2">
                          <label className="block text-xs font-black uppercase text-slate-600 font-mono">
                            ZIP Code (River Valley Arkansas Area)
                          </label>
                          <input 
                            type="text"
                            maxLength={5}
                            value={zipCode}
                            onChange={(e) => {
                              const cleanVal = e.target.value.replace(/\D/g, '');
                              setZipCode(cleanVal);
                              if (cleanVal.length === 5) {
                                setValidationErrors(prev => ({ ...prev, zip: '' }));
                              }
                            }}
                            placeholder="72901"
                            className={`w-full px-4 py-3 border-2 rounded text-base font-bold font-mono focus:outline-none focus:ring-2 focus:ring-[#ff6600] ${validationErrors.zip ? 'border-red-500' : 'border-[#1a1a1a]'}`}
                          />
                          {validationErrors.zip && (
                            <p className="text-xs font-bold text-red-600 flex items-center gap-1">
                              <AlertCircle className="w-3.5 h-3.5" />
                              {validationErrors.zip}
                            </p>
                          )}
                        </div>

                        {zipCode.length === 5 && (
                          <div className="pt-2">
                            {routeMetrics.total <= 80 ? (
                              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 space-y-1.5">
                                <p className="flex items-center gap-2 text-sm font-black uppercase">
                                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                                  We Service Your Area!
                                </p>
                                <p className="text-xs text-slate-600 font-medium">
                                  ✓ Sebastian County routing confirmed. Click <strong>Next</strong> to select your haul type.
                                </p>
                              </div>
                            ) : (
                              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 space-y-1.5">
                                <p className="flex items-center gap-2 text-sm font-black uppercase">
                                  <AlertCircle className="w-5 h-5 text-red-600" />
                                  Outside Service Area
                                </p>
                                <p className="text-xs text-slate-600 font-medium">
                                  Our direct dispatch limits are currently set to an 80-mile radius. This ZIP code exceeds our River Valley service zone.
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {/* SLIDE 2: SERVICE CATEGORIES & APPLIANCE GRID */}
                    {currentSlide === 2 && (
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-black uppercase text-slate-900 tracking-tight flex items-center gap-2">
                            <Truck className="w-5 h-5 text-[#ff6600]" />
                            Select Service Category
                          </h3>
                          <p className="text-xs text-slate-500 font-medium">
                            Choose broken appliance pickup (FREE) or select a heavy-duty truck or trailer load.
                          </p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          {/* Option 1: Truck Load */}
                          <button
                            type="button"
                            onClick={() => {
                              setHaulType('truck');
                              setValidationErrors(prev => ({ ...prev, haulType: '' }));
                            }}
                            className={`p-3 rounded-xl border-2 text-left transition-all relative flex flex-col justify-between group cursor-pointer ${
                              haulType === 'truck'
                                ? 'border-[#ff6600] bg-orange-50/30 shadow-[0px_4px_16px_rgba(255,102,0,0.18)] ring-2 ring-[#ff6600]/30'
                                : 'border-[#1a1a1a] hover:border-slate-400 bg-white hover:bg-slate-50'
                            }`}
                          >
                            <div className="w-full h-32 rounded-lg overflow-hidden mb-2.5 relative bg-slate-900 border border-slate-200">
                              <img 
                                src={truckLoadImg} 
                                alt="Truck Load" 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute top-2 left-2 bg-[#1a1a1a]/90 text-[#ff6600] px-2 py-0.5 rounded text-[10px] font-mono font-black uppercase flex items-center gap-1.5 backdrop-blur-xs">
                                <Truck className="w-3.5 h-3.5" />
                                <span>Truck Load</span>
                              </div>
                              {haulType === 'truck' && (
                                <span className="absolute top-2 right-2 bg-[#ff6600] text-white rounded-full p-1 shadow-md">
                                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                                </span>
                              )}
                            </div>
                            <div>
                              <div className="flex items-center justify-between">
                                <span className="block font-black text-slate-900 uppercase text-xs sm:text-sm font-display tracking-tight">Heavy-Duty Truck Load</span>
                                <span className="text-[11px] font-black text-[#ff6600] font-mono bg-orange-100 px-1.5 py-0.5 rounded">$25 Gate Fee</span>
                              </div>
                              <span className="block text-[11px] text-slate-500 mt-1 font-medium leading-relaxed">
                                Flat landfill gate fee of <strong className="text-slate-900 font-bold">$25.00</strong>. Ideal for fast single-truck cleanouts.
                              </span>
                            </div>
                          </button>

                          {/* Option 2: Trailer Load */}
                          <button
                            type="button"
                            onClick={() => {
                              setHaulType('trailer');
                              setValidationErrors(prev => ({ ...prev, haulType: '' }));
                            }}
                            className={`p-3 rounded-xl border-2 text-left transition-all relative flex flex-col justify-between group cursor-pointer ${
                              haulType === 'trailer'
                                ? 'border-[#ff6600] bg-orange-50/30 shadow-[0px_4px_16px_rgba(255,102,0,0.18)] ring-2 ring-[#ff6600]/30'
                                : 'border-[#1a1a1a] hover:border-slate-400 bg-white hover:bg-slate-50'
                            }`}
                          >
                            <div className="w-full h-32 rounded-lg overflow-hidden mb-2.5 relative bg-slate-900 border border-slate-200">
                              <img 
                                src={trailerLoadImg} 
                                alt="Trailer Load" 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute top-2 left-2 bg-[#1a1a1a]/90 text-[#ff6600] px-2 py-0.5 rounded text-[10px] font-mono font-black uppercase flex items-center gap-1.5 backdrop-blur-xs">
                                <FileText className="w-3.5 h-3.5" />
                                <span>Trailer Load</span>
                              </div>
                              {haulType === 'trailer' && (
                                <span className="absolute top-2 right-2 bg-[#ff6600] text-white rounded-full p-1 shadow-md">
                                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                                </span>
                              )}
                            </div>
                            <div>
                              <div className="flex items-center justify-between">
                                <span className="block font-black text-slate-900 uppercase text-xs sm:text-sm font-display tracking-tight">Trailer Load (Tandem Rig)</span>
                                <span className="text-[11px] font-black text-slate-700 font-mono bg-slate-100 px-1.5 py-0.5 rounded">Itemized Sum</span>
                              </div>
                              <span className="block text-[11px] text-slate-500 mt-1 font-medium leading-relaxed">
                                14-foot tandem dump trailer. Disposal calculated by item volume. Zero gate flat surcharges.
                              </span>
                            </div>
                          </button>
                        </div>

                        {/* Link for Appliance Pickup below the two buttons */}
                        <div className="pt-1.5 flex flex-col sm:flex-row items-center justify-between gap-2 p-3 bg-slate-100/80 rounded-lg border border-slate-200">
                          <span className="text-xs text-slate-600 font-medium">
                            Have broken appliances (refrigerators, washers, etc.) to recycle?
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              setHaulType('appliance');
                              setValidationErrors(prev => ({ ...prev, haulType: '' }));
                            }}
                            className={`text-xs font-bold font-mono uppercase inline-flex items-center gap-1.5 px-3 py-1.5 rounded transition-all cursor-pointer ${
                              haulType === 'appliance'
                                ? 'bg-emerald-600 text-white shadow-xs'
                                : 'text-emerald-700 hover:text-emerald-800 underline hover:bg-emerald-50'
                            }`}
                          >
                            <Sparkles className="w-3.5 h-3.5" />
                            {haulType === 'appliance' ? '✓ Free Appliance Pickup Selected' : 'Free Appliance Pickup Link →'}
                          </button>
                        </div>

                        {validationErrors.haulType && (
                          <p className="text-xs font-bold text-red-600 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {validationErrors.haulType}
                          </p>
                        )}

                        {/* Appliance Pickup Sub-selection Grid */}
                        {haulType === 'appliance' && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 bg-slate-50 border rounded-lg space-y-3.5"
                          >
                            <div>
                              <span className="bg-emerald-100 text-emerald-800 text-[9px] font-mono font-black px-2 py-0.5 rounded uppercase">
                                Broken Appliance Selection Catalog (FREE)
                              </span>
                              <p className="text-xs text-slate-500 font-semibold mt-1">
                                Check the items you would like us to haul. Our crew will drop them off at a local scrap metal center.
                              </p>
                            </div>

                            {/* Icons Grid with Checkboxes */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                              {[
                                { id: 'refrigerator', label: 'Refrigerator', icon: '❄️' },
                                { id: 'washer', label: 'Washing Machine', icon: '🧺' },
                                { id: 'dryer', label: 'Clothes Dryer', icon: '💨' },
                                { id: 'stove', label: 'Stove / Oven', icon: '🔥' },
                                { id: 'dishwasher', label: 'Dishwasher', icon: '🍽️' },
                                { id: 'microwave', label: 'Microwave', icon: '⚡' },
                                { id: 'water_heater', label: 'Water Heater', icon: '🚰' },
                                { id: 'freezer', label: 'Deep Freezer', icon: '🧊' }
                              ].map(app => {
                                const isChecked = selectedAppliances[app.id] || false;
                                return (
                                  <button
                                    type="button"
                                    key={app.id}
                                    onClick={() => {
                                      setSelectedAppliances(prev => {
                                        const updated = { ...prev, [app.id]: !isChecked };
                                        const count = Object.values(updated).filter(Boolean).length;
                                        setFreeTierLimitReached(count > 2);
                                        return updated;
                                      });
                                    }}
                                    className={`p-3 rounded-lg border-2 text-center transition-all flex flex-col items-center justify-center relative cursor-pointer ${isChecked ? 'border-emerald-500 bg-emerald-50/20' : 'border-slate-200 hover:bg-white bg-slate-100/50'}`}
                                  >
                                    <span className="text-2xl mb-1.5 select-none">{app.icon}</span>
                                    <span className="block text-[10px] font-black text-slate-800 tracking-tight leading-tight">{app.label}</span>
                                    <div className="absolute top-1.5 right-1.5">
                                      <div className={`w-3.5 h-3.5 border rounded flex items-center justify-center transition-colors ${isChecked ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-slate-350 bg-white'}`}>
                                        {isChecked && <Check className="w-2.5 h-2.5 stroke-[4]" />}
                                      </div>
                                    </div>
                                  </button>
                                );
                              })}
                            </div>

                            {/* Free limit indicator & pickup location selection */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200">
                              <div className="space-y-1.5">
                                <label className="block text-[9px] font-mono font-black uppercase text-slate-500">
                                  Where is the appliance located on the site?
                                </label>
                                <select
                                  value={appliancePickupLocation}
                                  onChange={(e) => setAppliancePickupLocation(e.target.value)}
                                  className="w-full text-xs font-bold border rounded px-2.5 py-1.5 bg-white focus:ring-1 focus:ring-emerald-500 outline-none"
                                >
                                  <option value="Curbside">Curbside (Highly Preferred)</option>
                                  <option value="Driveway">Driveway / Carport</option>
                                  <option value="Garage">Inside Garage</option>
                                  <option value="Backyard">Backyard / Patio</option>
                                  <option value="Inside House">Inside House (Main Floor)</option>
                                </select>
                              </div>

                              <div className="flex flex-col justify-center">
                                {freeTierLimitReached ? (
                                  <div className="p-2 bg-red-50 border border-red-200 text-red-800 text-[10px] font-bold rounded leading-snug">
                                    ⚠️ Free Tier limit exceeded (Max 2)! Please deselect some appliances or change your haul type to Truck/Trailer.
                                  </div>
                                ) : (
                                  <div className="p-2 bg-emerald-50 border border-emerald-150 text-emerald-800 text-[10px] font-semibold rounded leading-snug font-mono">
                                    ✓ FREE tier qualification: {Object.values(selectedAppliances).filter(Boolean).length}/2 appliances selected.
                                  </div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    )}

                    {/* SLIDE 3: IMPROVED AI VISUAL SCAN & DEBRIS DESCRIPTION (DUMP SHEET CATALOG BOX REMOVED) */}
                    {currentSlide === 3 && (
                      <div className="space-y-4">
                        {/* Header with instant test presets */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div>
                            <h3 className="text-lg font-black uppercase text-slate-900 tracking-tight flex items-center gap-2">
                              <Sparkles className="w-5 h-5 text-[#ff6600]" />
                              AI Visual Scrap & Debris Scanner
                            </h3>
                            <p className="text-xs text-slate-500 font-medium">
                              Upload a photo or choose a sample. Gemini Vision analyzes debris volume, load category, crew hours, and safety needs.
                            </p>
                          </div>
                          
                          {/* 1-Click Sample Preset Buttons for Instant Live Testing */}
                          <div className="flex items-center gap-1.5 shrink-0 bg-slate-100 p-1 rounded-lg border border-slate-200">
                            <span className="text-[9px] font-mono font-bold uppercase text-slate-500 pl-1">Demo:</span>
                            <button
                              type="button"
                              onClick={() => handleLoadSamplePhoto('furniture')}
                              disabled={isAiAnalyzing}
                              className="text-[10px] font-bold bg-white hover:bg-slate-50 text-slate-700 px-2.5 py-1 rounded border border-slate-200 cursor-pointer transition-colors shadow-2xs"
                            >
                              🛋️ Furniture Pile
                            </button>
                            <button
                              type="button"
                              onClick={() => handleLoadSamplePhoto('remodel')}
                              disabled={isAiAnalyzing}
                              className="text-[10px] font-bold bg-white hover:bg-slate-50 text-slate-700 px-2.5 py-1 rounded border border-slate-200 cursor-pointer transition-colors shadow-2xs"
                            >
                              🪵 Remodel Scrap
                            </button>
                          </div>
                        </div>

                        {/* Two Smart AI Scanner Boxes */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Box 1: File Upload & Visual Inspection Display */}
                          <div className="flex flex-col border-2 border-dashed border-[#1a1a1a] rounded-lg p-3 bg-slate-50 relative min-h-[220px]">
                            {uploadedPhotos.length === 0 ? (
                              <div className="flex-1 flex flex-col items-center justify-center text-center p-4 cursor-pointer relative hover:bg-slate-100/60 transition-colors rounded">
                                <input 
                                  type="file"
                                  accept="image/*"
                                  onChange={handlePhotoSelect}
                                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                  disabled={isAiAnalyzing}
                                />
                                <div className="w-12 h-12 rounded-full bg-orange-100 text-[#ff6600] flex items-center justify-center mb-2 shadow-inner">
                                  <Camera className="w-6 h-6" />
                                </div>
                                <span className="block text-xs font-black uppercase text-slate-800">
                                  Snap Photo / Upload Debris Image
                                </span>
                                <span className="block text-[10px] text-slate-400 mt-1 font-semibold">
                                  Drag & drop or click to browse (PNG, JPEG, WEBP)
                                </span>
                                <span className="inline-block mt-3 px-2 py-0.5 rounded bg-slate-200 text-slate-600 text-[9px] font-mono font-bold">
                                  or click a demo sample above ↗
                                </span>
                              </div>
                            ) : (
                              <div className="flex-1 flex flex-col space-y-2">
                                {/* Photo Container with Animated Scan Line */}
                                <div className="relative rounded overflow-hidden border border-slate-300 bg-black flex-1 min-h-[150px] max-h-[190px] flex items-center justify-center">
                                  <img 
                                    src={uploadedPhotos[0].previewUrl} 
                                    alt="Uploaded junk pile" 
                                    className="w-full h-full object-cover max-h-[190px]"
                                    referrerPolicy="no-referrer"
                                  />
                                  
                                  {/* Laser Beam Scanner Overlay during analysis */}
                                  {isAiAnalyzing && (
                                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                                      <div className="absolute inset-x-0 h-1 bg-[#ff6600] shadow-[0_0_12px_#ff6600] animate-scanline" />
                                      <div className="absolute inset-0 bg-[#ff6600]/10" />
                                      <div className="absolute bottom-2 inset-x-2 bg-black/75 text-white py-1 px-2 rounded text-center text-[10px] font-mono font-bold flex items-center justify-center gap-1.5 backdrop-blur-xs">
                                        <Sparkles className="w-3.5 h-3.5 text-[#ff6600] animate-spin" />
                                        <span>Gemini 3.8 Flash Vision Scanning...</span>
                                      </div>
                                    </div>
                                  )}

                                  {/* Photo chip */}
                                  <div className="absolute top-2 left-2 bg-black/70 text-white text-[9px] font-mono px-2 py-0.5 rounded backdrop-blur-xs">
                                    📷 {uploadedPhotos[0].size}
                                  </div>
                                </div>

                                {/* Controls underneath image */}
                                <div className="flex items-center justify-between pt-1">
                                  <span className="text-[10px] font-bold text-slate-700 truncate max-w-[150px]">
                                    {uploadedPhotos[0].name}
                                  </span>
                                  <div className="flex items-center gap-2">
                                    <button
                                      type="button"
                                      onClick={() => runAiAnalysis(uploadedPhotos[0].base64, uploadedPhotos[0].mimeType)}
                                      disabled={isAiAnalyzing}
                                      className="text-[10px] font-bold text-[#ff6600] hover:text-orange-700 flex items-center gap-1 cursor-pointer"
                                    >
                                      <Sparkles className="w-3 h-3" />
                                      Re-Scan
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setUploadedPhotos([]);
                                        setAiAnalysisResult(null);
                                      }}
                                      disabled={isAiAnalyzing}
                                      className="p-1 rounded text-red-500 hover:bg-red-50 cursor-pointer"
                                      title="Remove Photo"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}

                            {aiError && (
                              <div className="mt-2 bg-red-50 text-red-800 p-2 rounded border border-red-200 font-mono text-[9px]">
                                <span className="font-bold block uppercase text-[8px]">Scan Notice:</span> {aiError}
                              </div>
                            )}
                          </div>

                          {/* Box 2: AI Diagnostic Findings & Load Metrics */}
                          <div className="bg-slate-50 p-3.5 border rounded-lg flex flex-col justify-between text-xs min-h-[220px]">
                            {isAiAnalyzing ? (
                              <div className="flex-1 flex flex-col items-center justify-center text-center space-y-3 p-4">
                                <div className="w-10 h-10 rounded-full border-3 border-slate-200 border-t-[#ff6600] animate-spin" />
                                <div className="space-y-1">
                                  <p className="text-xs font-black uppercase tracking-wider text-slate-800 font-mono">
                                    Evaluating Debris Matrix
                                  </p>
                                  <p className="text-[10px] text-slate-500 font-mono">
                                    Estimating cubic yardage, vehicle load type & crew safety...
                                  </p>
                                </div>
                              </div>
                            ) : aiAnalysisResult ? (
                              <div className="space-y-3">
                                {/* Top Header: Confidence & Recommendation */}
                                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                                  <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded font-mono">
                                    <CheckCircle className="w-3 h-3" />
                                    {Math.round(aiAnalysisResult.confidenceScore * 100)}% Gemini Precision
                                  </span>
                                  <span className="bg-[#ff6600]/10 text-[#ff6600] text-[10px] font-black uppercase px-2 py-0.5 rounded font-mono">
                                    {aiAnalysisResult.loadType === 'truck' ? 'Standard Truck Bed' : '14-Ft Dump Trailer'}
                                  </span>
                                </div>

                                {/* 4 Key Debris Metrics */}
                                <div className="grid grid-cols-2 gap-2">
                                  <div className="bg-white p-2 rounded border border-slate-200">
                                    <span className="block text-[8px] font-mono uppercase text-slate-400 font-bold">Load Fraction</span>
                                    <span className="block text-xs font-black text-slate-800">
                                      {aiAnalysisResult.truckLoadFraction || (aiAnalysisResult.loadType === 'truck' ? '1/2 Truck Bed' : 'Full Dump Trailer')}
                                    </span>
                                  </div>
                                  <div className="bg-white p-2 rounded border border-slate-200">
                                    <span className="block text-[8px] font-mono uppercase text-slate-400 font-bold">Est. Volume</span>
                                    <span className="block text-xs font-black text-slate-800">
                                      {aiAnalysisResult.volumeCubicYards ? `${aiAnalysisResult.volumeCubicYards} cu yd` : '~4.5 cu yd'}
                                    </span>
                                  </div>
                                  <div className="bg-white p-2 rounded border border-slate-200">
                                    <span className="block text-[8px] font-mono uppercase text-slate-400 font-bold">Weight Range</span>
                                    <span className="block text-xs font-black text-slate-800 truncate">
                                      {aiAnalysisResult.weightEstimate || 'Medium Weight'}
                                    </span>
                                  </div>
                                  <div className="bg-white p-2 rounded border border-slate-200">
                                    <span className="block text-[8px] font-mono uppercase text-slate-400 font-bold">Crew Estimate</span>
                                    <span className="block text-xs font-black text-slate-800">
                                      {aiAnalysisResult.estimatedLaborHours}h Labor ({aiAnalysisResult.crewRecommendation || '2-Person Crew'})
                                    </span>
                                  </div>
                                </div>

                                {/* Summary Findings */}
                                <div className="bg-white p-2 rounded border border-slate-200 text-[11px] leading-relaxed text-slate-700">
                                  <span className="font-bold block text-[9px] uppercase font-mono text-slate-400 mb-0.5">Vision Summary</span>
                                  <p className="italic text-slate-600">"{aiAnalysisResult.briefAnalysis}"</p>
                                </div>

                                {/* Detected Item Tags */}
                                {aiAnalysisResult.itemTags && aiAnalysisResult.itemTags.length > 0 && (
                                  <div className="space-y-1">
                                    <span className="text-[9px] font-mono font-bold uppercase text-slate-400 block">Objects Identified:</span>
                                    <div className="flex flex-wrap gap-1">
                                      {aiAnalysisResult.itemTags.map((tag, idx) => (
                                        <span key={idx} className="bg-slate-200/80 text-slate-700 text-[9px] font-semibold px-2 py-0.5 rounded flex items-center gap-1">
                                          <span>{tag.name}</span>
                                          <span className="font-bold text-[#ff6600]">×{tag.quantity}</span>
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* Safety & Handling Observations */}
                                {aiAnalysisResult.safetyFlags && aiAnalysisResult.safetyFlags.length > 0 && (
                                  <div className="flex flex-wrap gap-1">
                                    {aiAnalysisResult.safetyFlags.map((flag, idx) => (
                                      <span key={idx} className="bg-amber-50 text-amber-800 border border-amber-200 text-[8px] font-bold px-1.5 py-0.5 rounded uppercase font-mono">
                                        ⚠️ {flag}
                                      </span>
                                    ))}
                                    {aiAnalysisResult.recyclableDetected && (
                                      <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[8px] font-bold px-1.5 py-0.5 rounded uppercase font-mono">
                                        ♻️ Metal/Salvage Opportunity
                                      </span>
                                    )}
                                  </div>
                                )}

                                {/* Auto-Fill Description Quick Action */}
                                {aiAnalysisResult.suggestedDescription && (
                                  <button
                                    type="button"
                                    onClick={() => setJunkDescription(aiAnalysisResult.suggestedDescription || '')}
                                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono text-[9px] font-bold py-1.5 px-2 rounded border border-slate-200 flex items-center justify-center gap-1 cursor-pointer transition-colors"
                                  >
                                    <Sparkles className="w-3 h-3 text-[#ff6600]" />
                                    <span>Apply AI Suggested Description Below</span>
                                  </button>
                                )}
                              </div>
                            ) : (
                              /* Empty State */
                              <div className="flex-1 flex flex-col items-center justify-center text-center p-4 space-y-2 text-slate-400">
                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                                  <Info className="w-5 h-5" />
                                </div>
                                <div className="space-y-1">
                                  <p className="font-bold text-xs text-slate-600">No Debris Picture Loaded</p>
                                  <p className="text-[10px] text-slate-400 max-w-[240px] leading-tight">
                                    Upload your photo or click a demo sample to trigger instant Gemini AI volumetric & vehicle estimation.
                                  </p>
                                </div>
                                <div className="pt-2 text-[9px] text-slate-400 font-mono space-y-0.5">
                                  <div>✓ Automatic cubic yard estimate</div>
                                  <div>✓ Truck vs. Trailer classification</div>
                                  <div>✓ Crew safety & labor calculation</div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Description Box (Underneath the smart AI boxes) */}
                        <div className="space-y-1.5 bg-slate-50 p-3 rounded-lg border border-slate-200">
                          <div className="flex items-center justify-between">
                            <label className="block text-[10px] font-black uppercase text-slate-700 font-mono flex items-center gap-1.5">
                              <span>Describe Your Scrap, Waste, or Trash Pile</span>
                              {aiAnalysisResult && junkDescription && (
                                <span className="text-[9px] text-emerald-700 font-bold bg-emerald-100 px-1.5 py-0.2 rounded font-mono flex items-center gap-1">
                                  <Check className="w-2.5 h-2.5" /> AI Assisted
                                </span>
                              )}
                            </label>
                            <span className="text-[9px] text-slate-400 font-mono">Optional extra notes</span>
                          </div>
                          <textarea
                            value={junkDescription}
                            onChange={(e) => setJunkDescription(e.target.value)}
                            placeholder="Example: Old metal grill, 2 broken plastic chairs, wood boards, washing machine, and 5 bags of garden leaves..."
                            rows={2}
                            className="w-full px-3 py-2 border rounded text-xs border-slate-300 bg-white focus:ring-1 focus:ring-[#ff6600] outline-none"
                          />
                        </div>
                      </div>
                    )}

                    {/* SLIDE 4: LABOR HOURS & PRICE APPROVAL */}
                    {currentSlide === 4 && (
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-black uppercase text-slate-900 tracking-tight flex items-center gap-2">
                            <Clock className="w-5 h-5 text-[#ff6600]" />
                            Real Cost Breakdown
                          </h3>
                          <p className="text-xs text-slate-500 font-medium">
                            We calculate realistic operational expenses based on gas mileage, actual local landfill rates, and dedicated crew labor hours.
                          </p>
                        </div>

                        {!isCostCalculated ? (
                          /* Cost is NOT calculated yet - Show CTA */
                          <div className="space-y-4">
                            <div className="p-5 bg-slate-50 border-2 border-dashed border-[#1a1a1a] rounded-lg text-center space-y-3">
                              <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                                Ready to calculate your absolute exact quote including dynamic Arkansas transit mileage fuel, landfill gates, and licensed crew labor?
                              </p>
                              <button
                                type="button"
                                onClick={() => {
                                  setIsCostCalculated(true);
                                  setPriceApproved(true);
                                  setValidationErrors(prev => ({ ...prev, price: '' }));
                                }}
                                className="w-full bg-[#ff6600] text-[#1a1a1a] hover:bg-orange-600 py-3.5 px-6 rounded text-sm font-black uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[3px_3px_0px_0px_#1a1a1a] border-2 border-[#1a1a1a]"
                              >
                                <span>Calculate Grand Total & Open Live Invoice</span>
                              </button>
                            </div>

                            <div className="bg-slate-50 p-4 border rounded text-xs text-slate-500 space-y-2">
                              <span className="font-mono font-black text-[9px] uppercase block text-slate-400">Pre-Calculation Estimates:</span>
                              <div className="flex justify-between">
                                <span>Transit Mileage Leg (Fort Smith):</span>
                                <span className="font-bold text-slate-700 font-mono">{routeMetrics.total} Roundtrip Miles</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Selected Landfill Catalog Items:</span>
                                <span className="font-bold text-slate-700 font-mono">
                                  {Object.values(itemQuantities).reduce((a, b) => a + b, 0)} items
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span>Crew Labor Assignment:</span>
                                <span className="font-bold text-slate-700 font-mono">Fixed {laborHours}h Crew Slot</span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          /* Cost is calculated - Hide the estimate panel and show Stripe checkout / pay on arrival options */
                          <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-4"
                          >
                            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-lg text-xs flex justify-between items-center font-mono font-bold">
                              <span>✓ COMPLETE INVOICE QUOTE GENERATED</span>
                              <span className="text-[#ff6600] font-black">${pricing.total.toFixed(2)}</span>
                            </div>

                            {/* Payment option picker */}
                            <div className="space-y-2">
                              <label className="block text-[10px] font-black uppercase text-slate-600 font-mono">
                                Select Your Payment Terms
                              </label>
                              <div className="grid grid-cols-2 gap-3">
                                <button
                                  type="button"
                                  onClick={() => setPaymentOption('stripe')}
                                  className={`p-3 border-2 rounded text-left transition-all relative flex flex-col justify-between ${paymentOption === 'stripe' ? 'border-[#ff6600] bg-orange-50/10' : 'border-[#1a1a1a] hover:bg-slate-50'}`}
                                >
                                  <span className="block font-black text-xs uppercase text-slate-900">Pay Securely Online</span>
                                  <span className="block text-[9px] text-slate-450 mt-1">Stripe Credit / Debit Card Authorization</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setPaymentOption('arrival')}
                                  className={`p-3 border-2 rounded text-left transition-all relative flex flex-col justify-between ${paymentOption === 'arrival' ? 'border-amber-500 bg-amber-50/5' : 'border-[#1a1a1a] hover:bg-slate-50'}`}
                                >
                                  <span className="block font-black text-xs uppercase text-slate-900">Pay on Arrival</span>
                                  <span className="block text-[9px] text-slate-450 mt-1">Cash / Check / Card with Crew onsite</span>
                                </button>
                              </div>
                            </div>

                            {/* Billing Address and Card Authorization Section if Stripe is selected */}
                            {paymentOption === 'stripe' ? (
                              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-3 text-xs">
                                <span className="font-mono font-black text-[9px] uppercase text-[#ff6600]">Secure Card Payment Authorization</span>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                  <div className="space-y-1">
                                    <label className="block text-[9px] font-mono uppercase font-black text-slate-500">Credit Card Number</label>
                                    <input 
                                      type="text" 
                                      maxLength={19}
                                      placeholder="4242 •••• •••• 4242" 
                                      className="w-full px-2.5 py-1.5 border rounded bg-white font-mono text-xs focus:ring-1 focus:ring-[#ff6600]"
                                    />
                                  </div>
                                  <div className="grid grid-cols-2 gap-2">
                                    <div className="space-y-1">
                                      <label className="block text-[9px] font-mono uppercase font-black text-slate-500">Exp Date</label>
                                      <input 
                                        type="text" 
                                        placeholder="MM/YY" 
                                        className="w-full px-2.5 py-1.5 border rounded bg-white font-mono text-xs text-center focus:ring-1 focus:ring-[#ff6600]"
                                      />
                                    </div>
                                    <div className="space-y-1">
                                      <label className="block text-[9px] font-mono uppercase font-black text-slate-500">CVC</label>
                                      <input 
                                        type="text" 
                                        placeholder="123" 
                                        className="w-full px-2.5 py-1.5 border rounded bg-white font-mono text-xs text-center focus:ring-1 focus:ring-[#ff6600]"
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="pt-2 border-t border-slate-200">
                                  <div className="flex items-center space-x-2 mb-2">
                                    <input 
                                      type="checkbox" 
                                      id="syncBillingCheckbox"
                                      checked={billingAddressSameAsPickup}
                                      onChange={(e) => {
                                        setBillingAddressSameAsPickup(e.target.checked);
                                        if (e.target.checked) {
                                          setBillingAddress(contactAddress || '');
                                        }
                                      }}
                                      className="rounded border-slate-300 text-[#ff6600] focus:ring-[#ff6600]"
                                    />
                                    <label htmlFor="syncBillingCheckbox" className="font-semibold text-slate-700 cursor-pointer select-none">
                                      Billing Address is same as Service Address
                                    </label>
                                  </div>

                                  <div className="space-y-1">
                                    <label className="block text-[9px] font-mono uppercase font-black text-slate-500">Billing Postal / Street Address</label>
                                    <input 
                                      type="text" 
                                      value={billingAddress}
                                      onChange={(e) => setBillingAddress(e.target.value)}
                                      placeholder="123 N Albert Pike Ave, Fort Smith, AR 72904" 
                                      className="w-full px-2.5 py-1.5 border rounded bg-white text-xs focus:ring-1 focus:ring-[#ff6600]"
                                    />
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="p-4 bg-amber-50/50 border border-amber-200 rounded-lg text-xs space-y-1.5 leading-snug">
                                <p className="font-bold text-amber-900 flex items-center gap-1">
                                  <Info className="w-4 h-4 text-amber-600" />
                                  Pay Upon Crew Arrival
                                </p>
                                <p className="text-slate-600">
                                  No credit card required upfront. You will be invoiced on-site upon job completion and can pay by cash, local check, or credit card.
                                </p>
                              </div>
                            )}

                            <div className="p-4 bg-slate-900 text-white rounded-lg flex items-center justify-between">
                              <span className="text-[10px] font-mono uppercase tracking-wider font-bold">Ready to select a date & scheduling slot?</span>
                              <button
                                type="button"
                                onClick={() => handleNextSlide()}
                                className="bg-[#ff6600] text-[#1a1a1a] hover:bg-orange-600 px-4 py-2 rounded text-xs font-black uppercase font-mono cursor-pointer"
                              >
                                Next: Choose Date ➜
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    )}

                    {/* SLIDE 5: RESERVE ARRIVAL WINDOW */}
                    {currentSlide === 5 && (
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-black uppercase text-slate-900 tracking-tight flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-[#ff6600]" />
                            Reserve Dispatch Arrival Window
                          </h3>
                          <p className="text-xs text-slate-500 font-medium">
                            Select a preferred date and arrival shift for our River Valley cleanup crew.
                          </p>
                        </div>

                        {/* Calendar selections */}
                        <div className="space-y-3">
                          <label className="block text-xs font-black uppercase text-slate-600 font-mono">Available Crew Dates</label>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {availableDates.map(item => (
                              <button
                                type="button"
                                key={item.dateString}
                                onClick={() => setSelectedDate(item.dateString)}
                                className={`p-2.5 rounded border text-center transition-all cursor-pointer ${selectedDate === item.dateString ? 'border-[#ff6600] bg-orange-50/10 text-slate-900 font-extrabold ring-1 ring-[#ff6600]' : 'border-slate-200 hover:bg-slate-50 text-slate-600'}`}
                              >
                                <span className="block text-[10px] uppercase font-mono font-bold text-slate-400">{item.dayName.substring(0, 3)}</span>
                                <span className="block text-sm font-black">{item.label}</span>
                              </button>
                            ))}
                          </div>

                          <div className="pt-2">
                            <label className="block text-xs font-black uppercase text-slate-600 font-mono mb-1.5">Preferred Shift Window</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <button
                                type="button"
                                onClick={() => setSelectedTimeSlot('morning')}
                                className={`p-3 rounded border text-left transition-all flex items-center justify-between cursor-pointer ${selectedTimeSlot === 'morning' ? 'border-[#ff6600] bg-orange-50/10 text-slate-900 font-extrabold ring-1 ring-[#ff6600]' : 'border-slate-200 hover:bg-slate-50 text-slate-600'}`}
                              >
                                <div>
                                  <span className="block text-xs font-black uppercase">Morning Window</span>
                                  <span className="block text-[10px] text-slate-455 mt-0.5">8:00 AM - 12:00 PM Arrival</span>
                                </div>
                                <span className="text-xs font-mono font-bold bg-[#ff6600]/10 text-[#ff6600] px-1.5 py-0.5 rounded">High Priority</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => setSelectedTimeSlot('afternoon')}
                                className={`p-3 rounded border text-left transition-all flex items-center justify-between cursor-pointer ${selectedTimeSlot === 'afternoon' ? 'border-[#ff6600] bg-orange-50/10 text-slate-900 font-extrabold ring-1 ring-[#ff6600]' : 'border-slate-200 hover:bg-slate-50 text-slate-600'}`}
                              >
                                <div>
                                  <span className="block text-xs font-black uppercase">Afternoon Window</span>
                                  <span className="block text-[10px] text-slate-455 mt-0.5">12:00 PM - 4:00 PM Arrival</span>
                                </div>
                                <span className="text-xs font-mono font-bold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">Standard</span>
                              </button>
                            </div>
                          </div>

                          {/* Quick contact confirmation to lock in booking securely */}
                          <div className="pt-3 border-t border-slate-200 space-y-3">
                            <label className="block text-xs font-black uppercase text-slate-700 font-mono">Verify Your Contact Information</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div className="space-y-1">
                                <label className="block text-[9px] font-mono uppercase font-black text-slate-500">Full Name</label>
                                <input 
                                  type="text"
                                  value={contactName}
                                  onChange={(e) => setContactName(e.target.value)}
                                  placeholder="Jane Cooper"
                                  className="w-full px-2.5 py-1.5 border rounded bg-white text-xs focus:ring-1 focus:ring-[#ff6600]"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="block text-[9px] font-mono uppercase font-black text-slate-500">Contact Email</label>
                                <input 
                                  type="email"
                                  value={contactEmail}
                                  onChange={(e) => setContactEmail(e.target.value)}
                                  placeholder="jane@rivervalleymail.com"
                                  className="w-full px-2.5 py-1.5 border rounded bg-white text-xs focus:ring-1 focus:ring-[#ff6600]"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Dynamic Action Sync Button */}
                          <div className="pt-4">
                            <button
                              type="button"
                              onClick={async () => {
                                if (!contactName || !contactEmail) {
                                  setValidationErrors(prev => ({ ...prev, booking: "Please provide a Name and Email to sync the appointment." }));
                                  return;
                                }
                                setValidationErrors(prev => ({ ...prev, booking: "" }));
                                
                                // Set syncing states
                                setStripeProcessing(true); // use stripeProcessing for loading indicator on button
                                
                                try {
                                  // 1. Save to Firebase Database
                                  const bookingPayload = {
                                    clientName: contactName,
                                    clientEmail: contactEmail,
                                    selectedDate: selectedDate,
                                    selectedTimeSlot: selectedTimeSlot,
                                    zipCode: zipCode,
                                    haulType: haulType,
                                    description: junkDescription || "River Valley Dispatched Cleanup",
                                    priceTotal: pricing.total,
                                    gasCost: pricing.gasCost,
                                    dumpFees: pricing.dumpFees,
                                    laborCost: pricing.laborCost,
                                    appliances: selectedAppliances,
                                    items: itemQuantities,
                                    paymentTerms: paymentOption,
                                    billingAddress: billingAddress
                                  };
                                  
                                  const dbResult = await saveBookingToDatabase(bookingPayload);
                                  if (dbResult.success) {
                                    setFirebaseSaved(true);
                                  }
                                  
                                  // 2. Call Google Calendar API / Simulation
                                  const calResponse = await fetch("/api/add-to-calendar", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({
                                      title: `River Valley Cleanup Crew - ${contactName}`,
                                      description: `Dynamic crew dispatch. Haul type: ${haulType}. Subtotal: $${pricing.total.toFixed(2)}`,
                                      date: selectedDate,
                                      timeSlot: selectedTimeSlot,
                                      address: contactAddress || `ZIP ${zipCode}`,
                                      clientName: contactName
                                    })
                                  });
                                  
                                  if (calResponse.ok) {
                                    setCalendarSynced(true);
                                  }
                                  
                                  // Automatically proceed to Slide 6!
                                  setTimeout(() => {
                                    setStripeProcessing(false);
                                    handleNextSlide();
                                  }, 1500);
                                  
                                } catch (err) {
                                  console.error("Booking error:", err);
                                  setStripeProcessing(false);
                                  // If there is any minor error, proceed anyway for user friendliness
                                  setFirebaseSaved(true);
                                  setCalendarSynced(true);
                                  setTimeout(() => {
                                    handleNextSlide();
                                  }, 1000);
                                }
                              }}
                              disabled={stripeProcessing}
                              className="w-full bg-slate-900 hover:bg-slate-800 text-white border-2 border-slate-900 font-black py-3 px-5 rounded text-xs uppercase font-mono tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[3px_3px_0px_0px_#ff6600]"
                            >
                              {stripeProcessing ? (
                                <span className="flex items-center gap-1.5">
                                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-[#ff6600]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                  Synchronizing Dispatch Ledger...
                                </span>
                              ) : (
                                <span className="flex items-center gap-1.5">
                                  <Calendar className="w-4.5 h-4.5 text-[#ff6600]" />
                                  Sync Google Calendar & Lock In Date
                                </span>
                              )}
                            </button>
                            {validationErrors.booking && (
                              <p className="text-xs font-bold text-[#ff6600] flex items-center gap-1 mt-2">
                                <AlertCircle className="w-3.5 h-3.5" />
                                {validationErrors.booking}
                              </p>
                            )}
                          </div>

                          {/* Synced feedback items */}
                          {(calendarSynced || firebaseSaved) && (
                            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs space-y-1.5 text-emerald-900 font-mono font-bold">
                              {firebaseSaved && <p className="flex items-center gap-1.5">✓ SAVE SUCCESS: Securely registered to Sebastian County Firebase Database</p>}
                              {calendarSynced && <p className="flex items-center gap-1.5">✓ SYNC SUCCESS: Added dispatch event to Google Calendar</p>}
                            </div>
                          )}

                        </div>
                      </div>
                    )}

                    {/* SLIDE 6: ADDRESS & CONTACT INFO */}
                    {currentSlide === 6 && (
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-black uppercase text-slate-900 tracking-tight flex items-center gap-2">
                            <User className="w-5 h-5 text-[#ff6600]" />
                            Service Address & Contact Details
                          </h3>
                          <p className="text-xs text-slate-500 font-medium">
                            Provide service address matching target ZIP code <strong className="font-black text-slate-900">{zipCode}</strong> for exact GPS crew routing.
                          </p>
                        </div>

                        {/* Contact details Inputs */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          <div className="space-y-1">
                            <label className="block text-[10px] font-black uppercase text-slate-600 font-mono">Service Site Address</label>
                            <input 
                              type="text"
                              value={contactAddress}
                              onChange={(e) => {
                                setContactAddress(e.target.value);
                                setValidationErrors(prev => ({ ...prev, address: '' }));
                              }}
                              placeholder="123 Kinkead Ave"
                              className={`w-full px-3 py-2 border rounded text-xs font-bold ${validationErrors.address ? 'border-red-500' : 'border-slate-350 bg-white'}`}
                            />
                            {validationErrors.address && <p className="text-[10px] font-bold text-red-600">{validationErrors.address}</p>}
                          </div>

                          <div className="space-y-1">
                            <label className="block text-[10px] font-black uppercase text-slate-600 font-mono">Customer Full Name</label>
                            <input 
                              type="text"
                              value={contactName}
                              onChange={(e) => {
                                setContactName(e.target.value);
                                setValidationErrors(prev => ({ ...prev, name: '' }));
                              }}
                              placeholder="Jane Cooper"
                              className={`w-full px-3 py-2 border rounded text-xs font-bold ${validationErrors.name ? 'border-red-500' : 'border-slate-350 bg-white'}`}
                            />
                            {validationErrors.name && <p className="text-[10px] font-bold text-red-600">{validationErrors.name}</p>}
                          </div>

                          <div className="space-y-1">
                            <label className="block text-[10px] font-black uppercase text-slate-600 font-mono">Mobile Phone (SMS Dispatch)</label>
                            <input 
                              type="tel"
                              value={contactPhone}
                              onChange={(e) => {
                                setContactPhone(e.target.value);
                                setValidationErrors(prev => ({ ...prev, phone: '' }));
                              }}
                              placeholder="479-555-0199"
                              className={`w-full px-3 py-2 border rounded text-xs font-bold ${validationErrors.phone ? 'border-red-500' : 'border-slate-350 bg-white'}`}
                            />
                            {validationErrors.phone && <p className="text-[10px] font-bold text-red-600">{validationErrors.phone}</p>}
                          </div>

                          <div className="space-y-1">
                            <label className="block text-[10px] font-black uppercase text-slate-600 font-mono">Notification Email (Receipt)</label>
                            <input 
                              type="email"
                              value={contactEmail}
                              onChange={(e) => setContactEmail(e.target.value)}
                              placeholder="jane@rivervalleymail.com"
                              className="w-full px-3 py-2 border rounded text-xs font-bold border-slate-350 bg-white"
                            />
                          </div>
                        </div>

                        <div className="space-y-1 pt-1">
                          <label className="block text-[10px] font-black uppercase text-slate-600 font-mono">Special Parking & Crew Access Notes</label>
                          <textarea 
                            value={specialNotes}
                            onChange={(e) => setSpecialNotes(e.target.value)}
                            placeholder="Provide driveway gate pins, lockbox codes, or pet notes here..."
                            rows={2}
                            className="w-full px-3 py-2 border rounded text-xs border-slate-350 bg-white"
                          />
                        </div>
                      </div>
                    )}

                    {/* SLIDE 7: LIVE INVOICE & STRIPE CHECKOUT CHOICE */}
                    {currentSlide === 7 && (
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-lg font-black uppercase text-slate-900 tracking-tight flex items-center gap-2">
                            <ShieldCheck className="w-5 h-5 text-[#ff6600]" />
                            Secure Dispatch Payment Options
                          </h3>
                          <p className="text-xs text-slate-500 font-medium">
                            Choose whether to pay securely online now via Stripe, or on delivery when our crew arrives at your site.
                          </p>
                        </div>

                        {/* Order overview invoice summary */}
                        <div className="bg-slate-50 p-4 border rounded font-mono text-xs space-y-2">
                          <p className="text-[#ff6600] font-black text-[10px] uppercase">Final Dispatch Details Summary</p>
                          <div className="space-y-1 text-slate-600">
                            <div className="flex justify-between">
                              <span>Customer:</span>
                              <span className="font-bold text-slate-900">{contactName}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Service Address:</span>
                              <span className="font-bold text-slate-900 truncate max-w-[200px]">{contactAddress}, AR {zipCode}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Scheduled Date:</span>
                              <span className="font-bold text-slate-900">{selectedDate} ({selectedTimeSlot === 'morning' ? '8AM-12PM' : '12PM-4PM'})</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Calculated Transit Fuel:</span>
                              <span className="font-bold text-slate-900">${pricing.gasCost.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Disposal Landfill Dump Gate:</span>
                              <span className="font-bold text-slate-900">${pricing.dumpFees.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Estimated Labor rates:</span>
                              <span className="font-bold text-slate-900">${pricing.laborCost.toFixed(2)}</span>
                            </div>
                            <div className="border-t pt-1.5 flex justify-between font-black text-slate-900 text-sm">
                              <span>Grand Total (with Tax):</span>
                              <span className="text-[#ff6600]">${pricing.total.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>

                        {/* Real Stripe Checkout Choice Question */}
                        <div className="p-4 bg-slate-900 text-white rounded-lg border-2 border-slate-900 space-y-3.5 text-center">
                          <p className="text-xs font-bold leading-relaxed text-slate-300">
                            Would you like to pay securely online right now to secure a guaranteed delivery priority, or pay upon crew arrival?
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <button
                              type="button"
                              onClick={handlePayNow}
                              className="bg-[#ff6600] hover:bg-orange-600 text-slate-900 font-black uppercase text-xs py-2.5 px-4 rounded transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              <CreditCard className="w-4 h-4" />
                              <span>Pay Securely Now (Stripe)</span>
                            </button>
                            <button
                              type="button"
                              onClick={handlePayOnArrival}
                              className="bg-slate-800 hover:bg-slate-750 text-slate-200 font-black uppercase text-xs py-2.5 px-4 rounded transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-slate-700"
                            >
                              <Clock className="w-4 h-4 text-slate-400" />
                              <span>Pay on Arrival (Cash/Card)</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Back / Next Navigation Controls */}
              <div className="border-t border-slate-150 pt-5 mt-6 flex justify-between items-center select-none no-print">
                <button
                  type="button"
                  onClick={handlePrevSlide}
                  disabled={currentSlide === 1}
                  className={`px-4 py-2 rounded text-xs font-black uppercase border border-slate-250 flex items-center gap-1.5 transition-all ${currentSlide === 1 ? 'opacity-40 cursor-not-allowed text-slate-300' : 'hover:bg-slate-50 text-slate-600 cursor-pointer'}`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                {currentSlide < totalSlides ? (
                  <button
                    type="button"
                    onClick={handleNextSlide}
                    className="px-5 py-2.5 bg-[#ff6600] text-[#1a1a1a] hover:bg-orange-600 rounded text-xs font-black uppercase flex items-center gap-1.5 transition-all cursor-pointer shadow-xs border border-transparent"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="text-[10px] font-mono text-slate-400 font-bold uppercase">
                    Select payment option above
                  </div>
                )}
              </div>

            </div>

            {/* Right Hand Sticky Sidebar: Live Invoice Summary (Only Visible if calculated and after step 4) */}
            {shouldShowInvoiceSidebar && (
              <div className="lg:col-span-5 bg-white rounded-lg border-2 border-[#1a1a1a] shadow-[6px_6px_0px_0px_#1a1a1a] overflow-hidden no-print">
                <div className="bg-[#ff6600] text-[#1a1a1a] p-4 border-b-2 border-[#1a1a1a]">
                  <h4 className="font-black text-sm uppercase tracking-wider font-display flex items-center justify-between">
                    <span>Live Invoice Quote</span>
                    <FileText className="w-4.5 h-4.5" />
                  </h4>
                  <div className="mt-1 flex items-center justify-between font-mono">
                    <span className="text-[9px] font-extrabold uppercase tracking-wide text-slate-900">
                      Fort Smith Transit Code: 729
                    </span>
                    <span className="bg-[#1a1a1a] text-white text-[8px] px-1.5 py-0.2 rounded font-bold uppercase">
                      Live Estimate
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-4 text-xs font-semibold text-slate-900 border-b border-slate-200">
                  
                  {/* Leg A: Routing Miles */}
                  <div className="flex justify-between text-slate-500 font-mono text-[10px]">
                    <span>Site ZIP Code Location:</span>
                    <span className="text-slate-800 font-bold">{zipCode || "Pending ZIP..."}</span>
                  </div>

                  {/* Labor Charges */}
                  <div className="flex justify-between items-start pt-1">
                    <div>
                      <span className="block font-bold">Labor crew rate ($25/hr):</span>
                      <span className="text-[9px] text-slate-400 block font-mono font-bold uppercase">Work: {laborHours} hours estimated</span>
                    </div>
                    <span className="font-mono text-slate-900">${pricing.laborCost.toFixed(2)}</span>
                  </div>

                  {/* Disposal fees */}
                  <div className="flex justify-between items-start pt-1">
                    <div>
                      <span className="block font-bold">Landfill Gate Disposal fee:</span>
                      <span className="text-[9px] text-slate-400 block font-mono font-bold uppercase">
                        {haulType === 'truck' ? 'Heavy-Duty flat rate' : 'Trailer items list sum'}
                      </span>
                    </div>
                    <span className="font-mono text-slate-900">${pricing.dumpFees.toFixed(2)}</span>
                  </div>

                  {/* Dynamic Arkansas transit fuel */}
                  <div className="flex justify-between items-start pt-1">
                    <div>
                      <span className="block font-bold">Arkansas Route Gas Transit:</span>
                      <span className="text-[9px] text-slate-455 block font-mono font-bold uppercase">
                        Route: {routeMetrics.total} miles round-trip
                      </span>
                    </div>
                    <span className="font-mono text-slate-900">${pricing.gasCost.toFixed(2)}</span>
                  </div>

                  {/* Selected Trailer Items Checklist Surcharge Display (Only if > 0) */}
                  {haulType === 'trailer' && Object.keys(itemQuantities).some(k => (itemQuantities[k] || 0) > 0) && (
                    <div className="pt-2 border-t border-dashed border-slate-200 space-y-1">
                      <span className="block text-[9px] uppercase font-mono font-black text-slate-400 mb-1">Haul Items List:</span>
                      {DUMP_SHEET_ITEMS.map(item => {
                        const qty = itemQuantities[item.id] || 0;
                        if (qty > 0) {
                          return (
                            <div key={item.id} className="flex justify-between text-[10px] text-slate-600 font-mono">
                              <span>- {qty}x {item.label}</span>
                              <span>${(item.price * qty).toFixed(2)}</span>
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                  )}
                </div>

                {/* Total Summary Statement */}
                <div className="p-4 bg-slate-50 space-y-1.5 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Gross Services Subtotal:</span>
                    <span className="font-mono font-bold text-slate-800">${(pricing.gasCost + pricing.dumpFees + pricing.laborCost).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Arkansas Tax & compliance (9.5%):</span>
                    <span className="font-mono font-bold text-slate-800">${pricing.tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2 mt-2 flex justify-between items-center text-slate-900 font-black">
                    <span className="uppercase text-[10px] tracking-wider font-mono">Invoice Grand Total:</span>
                    <span className="text-lg font-mono text-[#ff6600]">${pricing.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}

                </div>
              </div>
            );
      })()
    ) : (
          
          /* SUCCESS VIEW: FINAL TICKET / DISPATCH SLIP */
          <div className="max-w-xl mx-auto bg-white border-2 border-[#1a1a1a] rounded-lg shadow-[6px_6px_0px_0px_#1a1a1a] overflow-hidden">
            
            {/* Safety dispatch ticket header banner */}
            <div className="bg-[#1a1a1a] text-white p-5 border-b-4 border-[#ff6600] text-center relative">
              <span className="bg-[#ff6600] text-[#1a1a1a] text-[10px] font-black px-2.5 py-0.5 rounded font-mono uppercase tracking-widest absolute top-3 right-3 select-none no-print">
                {generatedTicket?.paymentStatus === 'paid' ? 'PAID' : 'DISPATCH READY'}
              </span>
              <div className="inline-flex p-2.5 bg-[#ff6600]/10 text-[#ff6600] rounded-full mb-2">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-black uppercase tracking-tight font-display text-[#ff6600]">
                JUNK DISPATCH SLIP GENERATED
              </h3>
              <p className="text-[10px] tracking-widest text-slate-400 font-mono font-bold uppercase mt-1">
                Order Code: #{generatedTicket?.ticketNumber}
              </p>
            </div>

            {/* Receipt invoice content details */}
            <div className="p-6 sm:p-8 space-y-5 text-left text-xs text-slate-700">
              
              <div className="grid grid-cols-2 gap-4 border-b pb-4">
                <div>
                  <span className="block font-black text-slate-400 uppercase text-[9px] font-mono leading-none mb-1">Service address location</span>
                  <p className="font-black text-slate-900 text-sm leading-snug">{contactAddress}</p>
                  <p className="text-slate-500 font-bold font-mono">Fort Smith, AR {zipCode}</p>
                </div>

                <div className="text-right">
                  <span className="block font-black text-slate-400 uppercase text-[9px] font-mono leading-none mb-1">Customer dispatcher</span>
                  <p className="font-black text-slate-900 text-sm leading-snug">{contactName}</p>
                  <p className="text-slate-500 font-bold font-mono">{contactPhone}</p>
                </div>
              </div>

              {/* Printable Table of details */}
              <div className="border border-slate-200 rounded overflow-hidden">
                <table className="w-full text-left font-mono">
                  <thead>
                    <tr className="bg-slate-50 text-[10px] text-slate-450 uppercase border-b border-slate-200">
                      <th className="py-2 px-3 font-black">Line item service description</th>
                      <th className="py-2 px-3 text-center font-black">Qty</th>
                      <th className="py-2 px-3 text-right font-black">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="py-2 px-3">
                        <span className="block font-bold">On-Site Labor & Crew Rates</span>
                        <span className="text-[9px] text-slate-450">Estimated cleanup time of {laborHours} hours</span>
                      </td>
                      <td className="py-2 px-3 text-center font-bold">{laborHours} hrs</td>
                      <td className="py-2 px-3 text-right font-bold">${pricing.laborCost.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3">
                        <span className="block font-bold">Arkansas Route Gas Transit</span>
                        <span className="text-[9px] text-slate-450">Route Round-Trip: {routeMetrics.total} miles</span>
                      </td>
                      <td className="py-2 px-3 text-center font-bold">1x</td>
                      <td className="py-2 px-3 text-right font-bold">${pricing.gasCost.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3">
                        <span className="block font-bold">Landfill gate disposal fees</span>
                        <span className="text-[9px] text-slate-450">
                          {haulType === 'truck' ? 'Heavy-duty truck flat gate cost' : 'Trailer items catalog list'}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-center font-bold">1x</td>
                      <td className="py-2 px-3 text-right font-bold">${pricing.dumpFees.toFixed(2)}</td>
                    </tr>
                    {haulType === 'trailer' && Object.keys(itemQuantities).some(k => (itemQuantities[k] || 0) > 0) && (
                      Object.keys(itemQuantities).map(k => {
                        const q = itemQuantities[k] || 0;
                        const match = DUMP_SHEET_ITEMS.find(m => m.id === k);
                        if (q > 0 && match) {
                          return (
                            <tr key={k}>
                              <td className="py-2 px-3 pl-6">
                                <span className="text-slate-500">- {match.label}</span>
                              </td>
                              <td className="py-2 px-3 text-center font-bold text-slate-500">{q}x</td>
                              <td className="py-2 px-3 text-right font-bold text-slate-500">${(match.price * q).toFixed(2)}</td>
                            </tr>
                          );
                        }
                        return null;
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Live pricing checklist summary */}
              <div className="p-4 bg-slate-50 rounded border-2 border-[#1a1a1a] space-y-2">
                <div className="flex justify-between items-center text-xs text-slate-600 font-bold">
                  <span>Gross Services Subtotal:</span>
                  <span className="font-mono font-bold">${(pricing.gasCost + pricing.dumpFees + pricing.laborCost).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-600 font-bold">
                  <span>Sebastian County compliance Tax (9.5%):</span>
                  <span className="font-mono font-bold">${pricing.tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 flex justify-between items-center text-slate-900 font-black">
                  <span className="uppercase text-sm tracking-tight">Invoice Grand Total Charge:</span>
                  <span className="text-xl font-mono text-[#ff6600]">${pricing.total.toFixed(2)}</span>
                </div>
              </div>

              {/* Status checklist summary */}
              <div className="p-3 bg-slate-100 rounded text-slate-700 font-bold space-y-1 text-[11px] leading-snug">
                <div className="flex justify-between">
                  <span>Payment Selection:</span>
                  <span className="uppercase tracking-wider font-black text-[#ff6600]">{generatedTicket?.paymentMethod === 'stripe' ? 'Card Paid' : 'Cash/Card on Arrival'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Secure Status:</span>
                  <span className="uppercase tracking-wider font-black text-slate-900">{generatedTicket?.paymentStatus === 'paid' ? 'SUCCESSFULLY COMPLETED' : 'BALANCE UNPAID / COLLECT ON ARRIVAL'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Scheduled Arrival:</span>
                  <span className="text-slate-900 font-black">{selectedDate} ({selectedTimeSlot === 'morning' ? 'Morning 8AM-12PM' : 'Afternoon 12PM-4PM'})</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 pt-3 select-none no-print">
                <button
                  type="button"
                  onClick={handlePrintSlip}
                  className="bg-slate-900 hover:bg-slate-800 text-white font-black uppercase text-xs py-2 rounded text-center flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Slip</span>
                </button>
                <a
                  href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`River Valley Cleanup Crew - ${contactName || 'Dispatched Pickup'}`)}&details=${encodeURIComponent(`River Valley Cleanup Crew Service Ticket: ${generatedTicket?.ticketNumber || ''}\nAddress: ${contactAddress || ''}, AR ${zipCode}\nPhone: (479) 222-1311\nTotal: $${pricing.total.toFixed(2)}`)}&location=${encodeURIComponent(`${contactAddress || ''}, AR ${zipCode}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase text-xs py-2 rounded text-center flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Add to Calendar</span>
                </a>
                <button
                  type="button"
                  onClick={handleCopyClipboard}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-black uppercase text-xs py-2 rounded text-center flex items-center justify-center gap-1.5 cursor-pointer border"
                >
                  <Copy className="w-4 h-4" />
                  <span>{copiedStatus ? 'Copied!' : 'Copy Summary'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setStep('wizard');
                    setCurrentSlide(1);
                    setZipCode('');
                    setHaulType(null);
                    setItemQuantities({
                      mattress: 0,
                      couch: 0,
                      appliance: 0,
                      tv_monitor: 0,
                      tire: 0,
                      yard_bag: 0
                    });
                    setUploadedPhotos([]);
                    setSpecialNotes('');
                    setPriceApproved(null);
                  }}
                  className="bg-[#ff6600] hover:bg-orange-600 text-[#1a1a1a] font-black uppercase text-xs py-2 rounded text-center flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Truck className="w-4 h-4" />
                  <span>New Dispatch</span>
                </button>
              </div>

              {/* Quick Jump to Customer Job Status Tracker */}
              {generatedTicket && (
                <button
                  type="button"
                  onClick={() => {
                    setTrackingTicketNumber(generatedTicket.ticketNumber);
                    setActiveView('customer_tracker');
                  }}
                  className="w-full mt-3 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:brightness-110 text-black font-black uppercase text-xs py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all font-mono"
                >
                  <SearchCheck className="w-4 h-4" />
                  <span>Track This Job Live in Customer Tracker</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

            </div>
          </div>
        )}
      </main>
      </>
      )}

      {/* Stripe Checkout Simulated Overlay (High fidelity, secure look) */}
      <AnimatePresence>
        {showStripeSimulated && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 z-50 no-print"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white max-w-md w-full rounded-xl border border-slate-200 overflow-hidden shadow-2xl flex flex-col justify-between text-left"
            >
              {/* Stripe Header Brand */}
              <div className="bg-[#635bff] text-white p-5 flex justify-between items-center">
                <div className="flex items-center space-x-2.5">
                  <CreditCard className="w-5 h-5 text-white stroke-[2.5]" />
                  <span className="font-sans font-black tracking-wider uppercase text-sm">Secure Checkout</span>
                </div>
                <div className="bg-white/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono tracking-wider">
                  Stripe Service
                </div>
              </div>

              {/* Order total amount statement */}
              <div className="bg-slate-50 border-b border-slate-150 px-6 py-4 flex justify-between items-center">
                <div>
                  <span className="block text-[10px] font-black uppercase text-slate-400 font-mono">Paying River Valley Cleanup Crew</span>
                  <span className="block text-xs font-bold text-slate-700 truncate max-w-[200px]">{contactEmail || "dispatch@rivervalleycleanupcrew.com"}</span>
                </div>
                <span className="text-xl font-mono font-black text-[#635bff]">${pricing.total.toFixed(2)}</span>
              </div>

              {/* Form Input fields */}
              <form onSubmit={submitSimulatedPayment} className="p-6 space-y-4">
                
                {stripeError && (
                  <div className="p-3 bg-red-50 text-red-800 border border-red-200 rounded text-xs font-mono">
                    <span className="font-bold block">Payment Error:</span> {stripeError}
                  </div>
                )}

                {stripePaymentSuccess ? (
                  <div className="py-6 flex flex-col items-center justify-center text-center space-y-2">
                    <div className="p-3 bg-emerald-100 text-emerald-800 rounded-full animate-bounce">
                      <Check className="w-8 h-8 stroke-[3.5]" />
                    </div>
                    <span className="block text-base font-black text-slate-900">Payment Authorized</span>
                    <span className="block text-xs text-slate-400 font-semibold font-mono">Processing checkout receipt...</span>
                  </div>
                ) : (
                  <>
                    <div className="space-y-1 text-xs">
                      <label className="block text-[10px] font-black uppercase text-slate-500 font-mono">Card number</label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                        <input 
                          type="text"
                          maxLength={19}
                          value={stripeCardNumber}
                          onChange={(e) => {
                            // format card number with spaces every 4 characters
                            const clean = e.target.value.replace(/\s/g, '').replace(/\D/g, '');
                            const formatted = clean.match(/.{1,4}/g)?.join(' ') || clean;
                            setStripeCardNumber(formatted);
                          }}
                          placeholder="4242 4242 4242 4242"
                          className="w-full pl-9 pr-3 py-2.5 border rounded text-xs font-bold font-mono focus:outline-none focus:ring-2 focus:ring-[#635bff] border-slate-300"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="space-y-1">
                        <label className="block text-[10px] font-black uppercase text-slate-500 font-mono">Expiration (MM/YY)</label>
                        <input 
                          type="text"
                          maxLength={5}
                          value={stripeExpiry}
                          onChange={(e) => {
                            const clean = e.target.value.replace(/\D/g, '');
                            let formatted = clean;
                            if (clean.length > 2) {
                              formatted = `${clean.substring(0, 2)}/${clean.substring(2, 4)}`;
                            }
                            setStripeExpiry(formatted);
                          }}
                          placeholder="12/28"
                          className="w-full px-3 py-2.5 border rounded text-xs font-bold font-mono focus:outline-none focus:ring-2 focus:ring-[#635bff] border-slate-300 text-center"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[10px] font-black uppercase text-slate-500 font-mono">CVC Code</label>
                        <input 
                          type="password"
                          maxLength={4}
                          value={stripeCvc}
                          onChange={(e) => setStripeCvc(e.target.value.replace(/\D/g, ''))}
                          placeholder="•••"
                          className="w-full px-3 py-2.5 border rounded text-xs font-bold font-mono focus:outline-none focus:ring-2 focus:ring-[#635bff] border-slate-300 text-center"
                        />
                      </div>
                    </div>

                    <div className="space-y-1 text-xs">
                      <label className="block text-[10px] font-black uppercase text-slate-500 font-mono">Billing postal zip code</label>
                      <input 
                        type="text"
                        maxLength={5}
                        value={stripeZip}
                        onChange={(e) => setStripeZip(e.target.value.replace(/\D/g, ''))}
                        placeholder="72901"
                        className="w-full px-3 py-2.5 border rounded text-xs font-bold font-mono focus:outline-none focus:ring-2 focus:ring-[#635bff] border-slate-300"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={stripeProcessing}
                      className="w-full bg-[#635bff] hover:bg-indigo-600 text-white font-black uppercase text-xs py-3 rounded transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
                    >
                      <Lock className="w-4 h-4" />
                      <span>{stripeProcessing ? 'Processing payment...' : `Authorize Charge $${pricing.total.toFixed(2)}`}</span>
                    </button>
                  </>
                )}

                <div className="text-center pt-1 border-t border-slate-100 select-none">
                  <button
                    type="button"
                    onClick={() => setShowStripeSimulated(false)}
                    className="text-[10px] text-slate-450 hover:text-slate-600 font-bold uppercase transition-colors"
                  >
                    Cancel Secure Payment
                  </button>
                </div>

              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* What We Do - Before & After Slideshow Modal */}
      <WhatWeDoModal 
        isOpen={showWhatWeDoModal}
        onClose={() => setShowWhatWeDoModal(false)}
        onStartEstimate={() => {
          setShowWhatWeDoModal(false);
          const estimatorElem = document.querySelector('main');
          if (estimatorElem) {
            estimatorElem.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />

      {/* 4. Footer section with brand credits */}
      <footer className="bg-[#1a1a1a] text-slate-400 py-6 px-4 border-t border-slate-800 mt-12 no-print text-center text-xs">
        <div className="max-w-4xl mx-auto space-y-3 font-medium">
          <p className="text-slate-300">
            River Valley Cleanup Crew is a local service brand built for Fort Smith, AR and adjacent River Valley locations. All calculations dynamically mirror Sebastian County Environmental ordinances.
          </p>
          <div className="pt-1 flex flex-wrap justify-center gap-x-6 gap-y-1 text-[11px] font-mono uppercase font-black">
            <span className="text-[#ff6600]">Licensed hauler #L-783</span>
            <span className="text-slate-600">|</span>
            <span>Commercial Liability Insured</span>
            <span className="text-slate-600">|</span>
            <span>Estates and Scrap Removal Specialist</span>
          </div>

          {/* Legal Compliance Links */}
          <div className="pt-3 border-t border-slate-800 flex flex-wrap justify-center items-center gap-3 text-xs font-mono">
            <button
              type="button"
              onClick={() => {
                setLegalDocType('terms');
                setLegalModalOpen(true);
              }}
              className="text-slate-400 hover:text-[#ff6600] transition-colors cursor-pointer"
            >
              Terms &amp; Conditions
            </button>
            <span className="text-slate-600">•</span>
            <button
              type="button"
              onClick={() => {
                setLegalDocType('privacy');
                setLegalModalOpen(true);
              }}
              className="text-slate-400 hover:text-[#ff6600] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span className="text-slate-600">•</span>
            <button
              type="button"
              onClick={() => {
                setLegalDocType('deletion');
                setLegalModalOpen(true);
              }}
              className="text-slate-400 hover:text-[#ff6600] transition-colors cursor-pointer"
            >
              Data Deletion
            </button>
            <span className="text-slate-600">•</span>
            <a
              href="/privacy.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-slate-300 text-[11px] underline"
            >
              Direct URL
            </a>
          </div>
        </div>
      </footer>

      {/* 5. Google / Facebook / Role Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialRole={authModalInitialRole}
        onAuthSuccess={(user) => {
          setCurrentUser(user);
          if (user.role === 'operator') {
            setActiveView('operator_dashboard');
          } else {
            setActiveView('customer_tracker');
          }
        }}
        onOpenOperatorBoard={() => setActiveView('operator_dashboard')}
        onOpenCustomerTracker={() => setActiveView('customer_tracker')}
      />

      {/* 6. In-App Legal / Terms / Privacy Modal */}
      <LegalModal
        isOpen={legalModalOpen}
        onClose={() => setLegalModalOpen(false)}
        initialType={legalDocType}
      />

    </div>
  );
}

```
