import React, { useEffect, useMemo, useState } from "react";
import { CalendarDays, Camera, Check, MapPin, Truck, FileText, Printer, CheckCircle2, Clock } from "lucide-react";
import { saveBookingToDatabase } from "../lib/firebase";


const BASE_ZIP = "72908";
const DEFAULT_DUMP_ZIP = "72032";
const FALLBACK_GAS_PRICE = 3.95;
const MPG = 18;

const APPLIANCE_ITEMS = [
  { id: "fridge", label: "Refrigerator" },
  { id: "washer", label: "Washer / Dryer" },
  { id: "stove", label: "Stove / Oven" },
  { id: "dishwasher", label: "Dishwasher" },
  { id: "microwave", label: "Microwave" },
  { id: "hot_water", label: "Water Heater" }
] as const;

const TRAILER_ITEMS = [
  { id: "furniture", label: "Furniture", fee: 45 },
  { id: "appliances", label: "Appliances", fee: 55 },
  { id: "yard_waste", label: "Yard Waste", fee: 35 },
  { id: "construction", label: "Construction Debris", fee: 50 },
  { id: "electronics", label: "Electronics / E-Waste", fee: 60 },
  { id: "mixed", label: "Mixed Load", fee: 40 },
  { id: "metal", label: "Metal Scrap", fee: 30 }
] as const;

type LoadType = "appliance" | "truck" | "trailer";

type ServiceAreaResult =
  | { success: true; distanceMiles: number }
  | { success: false; message: string };

type RouteEstimateResult =
  | { success: true; distanceMiles: number; gasPrice: number }
  | { success: false; message: string };

function clampZip(zip: string) {
  return zip.replace(/[^0-9]/g, "").slice(0, 5);
}

function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const toRad = (value: number) => (value * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return 3958.8 * c; // miles
}

async function fetchZipCoords(zip: string) {
  try {
    const response = await fetch(`https://api.zippopotam.us/us/${zip}`);
    if (!response.ok) return null;
    const data = await response.json();
    const place = data.places?.[0];
    if (!place?.latitude || !place?.longitude) return null;
    return {
      lat: Number(place.latitude),
      lng: Number(place.longitude)
    };
  } catch {
    return null;
  }
}

async function fetchCurrentGasPrice() {
  try {
    const response = await fetch("https://www.fueleconomy.gov/ws/rest/fuelprices");
    if (!response.ok) throw new Error("Gas API unavailable");
    const text = await response.text();
    const match = text.match(/<regular>([0-9.]+)<\/regular>/);
    return match ? Number(match[1]) : FALLBACK_GAS_PRICE;
  } catch {
    return FALLBACK_GAS_PRICE;
  }
}

export default function ServiceQuoteWizard() {
  const [step, setStep] = useState(1);
  const [customerZip, setCustomerZip] = useState("");
  const [dumpZip, setDumpZip] = useState(DEFAULT_DUMP_ZIP);
  const [loadType, setLoadType] = useState<LoadType | null>(null);
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({});
  const [selectedAppliances, setSelectedAppliances] = useState<Record<string, boolean>>({});
  const [uploadedPhoto, setUploadedPhoto] = useState<File | null>(null);
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string | null>(null);
  const [photoAdjustment, setPhotoAdjustment] = useState(0);
  const [imageAnalysis, setImageAnalysis] = useState("");
  const [gasPrice, setGasPrice] = useState<number | null>(null);
  const [distanceMiles, setDistanceMiles] = useState<number | null>(null);
  const [serviceAreaMiles, setServiceAreaMiles] = useState<number | null>(null);
  const [serviceAreaStatus, setServiceAreaStatus] = useState("Awaiting zipcode entry to verify service area.");
  const [laborApproved, setLaborApproved] = useState(false);
  const [reservationSlot, setReservationSlot] = useState("Tomorrow 10:00 AM - 12:00 PM");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [serviceAddress, setServiceAddress] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [autoFilledContact, setAutoFilledContact] = useState(false);
  const [paymentChoice, setPaymentChoice] = useState<"now" | "later" | null>(null);
  const [statusMessage, setStatusMessage] = useState("Enter zip code to estimate route and gas.");

  useEffect(() => {
    if (customerZip) {
      setServiceAddress(`Service address near ${customerZip}, AR`);
      setAutoFilledContact(false);
    }
  }, [customerZip]);

  useEffect(() => {
    if (step === 6 && !autoFilledContact) {
      setServiceAddress((current) => current || `Service address near ${customerZip}, AR`);
      setCustomerName((current) => current || "Scrap Pickup Dispatch");
      setCustomerPhone((current) => current || "(479) 555-0101");
      setCustomerEmail((current) => current || "dispatch@scrappickup.com");
      setAutoFilledContact(true);
    }
  }, [step, customerZip, autoFilledContact]);

  const isCustomerZipValid = /^\d{5}$/.test(customerZip);
  const isDumpZipValid = /^\d{5}$/.test(dumpZip);
  const selectedTrailerItems = useMemo(
    () => TRAILER_ITEMS.filter((item) => selectedItems[item.id]),
    [selectedItems]
  );
  const selectedApplianceItems = useMemo(
    () => APPLIANCE_ITEMS.filter((item) => selectedAppliances[item.id]),
    [selectedAppliances]
  );

  const dumpFee = useMemo(() => {
    if (loadType === "truck") return 25;
    if (loadType === "trailer") return selectedTrailerItems.reduce((sum, item) => sum + item.fee, 0);
    return 0;
  }, [loadType, selectedTrailerItems]);

  const gasCost = useMemo(() => {
    if (!gasPrice || !distanceMiles || loadType === "appliance") return 0;
    return Number(((distanceMiles / MPG) * gasPrice).toFixed(2));
  }, [gasPrice, distanceMiles, loadType]);

  const estimatedMinutes = useMemo(() => {
    if (loadType === "appliance") return 0;
    const base = 20;
    const distanceMinutes = distanceMiles ? Math.max(0, distanceMiles / 20) * 15 : 0;
    const loadMinutes = loadType === "truck" ? 20 : loadType === "trailer" ? 30 : 15;
    const itemMinutes = loadType === "trailer" ? selectedTrailerItems.length * 8 : 0;
    const photoMinutes = uploadedPhoto ? 10 : 0;
    return Math.ceil(base + distanceMinutes + loadMinutes + itemMinutes + photoMinutes);
  }, [distanceMiles, loadType, selectedTrailerItems.length, uploadedPhoto]);

  const laborCost = useMemo(() => {
    if (loadType === "appliance") return 0;
    const ratePerHour = 75;
    const hours = Math.max(1, Math.ceil(estimatedMinutes / 60));
    return hours * ratePerHour;
  }, [estimatedMinutes, loadType]);

  const totalEstimate = useMemo(
    () => (loadType === "appliance" ? 0 : Number((gasCost + dumpFee + photoAdjustment + laborCost).toFixed(2))),
    [gasCost, dumpFee, photoAdjustment, laborCost, loadType]
  );

  useEffect(() => {
    if (step === 1 && isCustomerZipValid) {
      setServiceAreaStatus("Verifying service area based on customer zipcode...");
      verifyServiceArea(customerZip).then((result) => {
        if (result.success) {
          setServiceAreaMiles(result.distanceMiles);
          setServiceAreaStatus(
            result.distanceMiles <= 80
              ? `Service area confirmed: ${result.distanceMiles.toFixed(1)} miles from base.`
              : `Outside service area: ${result.distanceMiles.toFixed(1)} miles from base.`
          );
        } else if ("message" in result) {
          setServiceAreaMiles(null);
          setServiceAreaStatus(result.message);
        }
      });
    }
  }, [step, customerZip, isCustomerZipValid]);

  useEffect(() => {
    if (step === 2 && loadType && isCustomerZipValid) {
      if (loadType === "appliance") {
        setStatusMessage("Appliance pickup selected. No dump fee applies. Confirm details and continue.");
        setDistanceMiles(null);
        setGasPrice(null);
        return;
      }
      if (isDumpZipValid) {
        setStatusMessage("Fetching current gas price and estimating route...");
        estimateRouteAndGas(customerZip, dumpZip).then((result) => {
          if (result.success) {
            setDistanceMiles(result.distanceMiles);
            setGasPrice(result.gasPrice);
            setStatusMessage(`Estimated route ${result.distanceMiles.toFixed(1)} miles at $${result.gasPrice.toFixed(2)}/gal.`);
          } else if ("message" in result) {
            setStatusMessage(result.message);
          }
        });
      }
    }
  }, [step, loadType, customerZip, dumpZip, isCustomerZipValid, isDumpZipValid]);

  async function verifyServiceArea(userZip: string): Promise<ServiceAreaResult> {
    const startCoords = await fetchZipCoords(BASE_ZIP);
    const customerCoords = await fetchZipCoords(userZip);

    if (!startCoords || !customerCoords) {
      return { success: false, message: "Unable to resolve the customer zip code. Please verify 5 digits." };
    }

    const distance = haversineDistance(startCoords.lat, startCoords.lng, customerCoords.lat, customerCoords.lng);
    return { success: true, distanceMiles: distance };
  }

  async function estimateRouteAndGas(userZip: string, dumpZipCode: string): Promise<RouteEstimateResult> {
    const startCoords = await fetchZipCoords(BASE_ZIP);
    const customerCoords = await fetchZipCoords(userZip);
    const dumpCoords = await fetchZipCoords(dumpZipCode);

    if (!startCoords || !customerCoords || !dumpCoords) {
      return { success: false, message: "Unable to resolve one or more zip codes. Please verify 5 digits." };
    }

    const firstLeg = haversineDistance(startCoords.lat, startCoords.lng, customerCoords.lat, customerCoords.lng);
    const secondLeg = haversineDistance(customerCoords.lat, customerCoords.lng, dumpCoords.lat, dumpCoords.lng);
    const gasPriceValue = await fetchCurrentGasPrice();
    return {
      success: true,
      distanceMiles: firstLeg + secondLeg,
      gasPrice: gasPriceValue
    };
  }

  const handlePhotoChange = (file: File | null) => {
    if (!file) {
      setUploadedPhoto(null);
      setPhotoPreviewUrl(null);
      setImageAnalysis("");
      setPhotoAdjustment(0);
      return;
    }
    setUploadedPhoto(file);
    setPhotoPreviewUrl(URL.createObjectURL(file));
    setImageAnalysis("");
    setPhotoAdjustment(0);
  };

  const handleAnalyzePhoto = () => {
    if (!uploadedPhoto) {
      setImageAnalysis("Upload a photo first to get pricing guidance.");
      return;
    }
    const sizeInKb = Math.round(uploadedPhoto.size / 1024);
    if (sizeInKb > 1200) {
      setImageAnalysis("Photo looks like a large package or bulky load; applying a handling price of $25.");
      setPhotoAdjustment(25);
    } else {
      setImageAnalysis("Photo shows a standard pickup load; applying a handling price of $10.");
      setPhotoAdjustment(10);
    }
  };

  const goNext = () => {
    if (step === 1) {
      if (!isCustomerZipValid) {
        setStatusMessage("Please enter a valid 5-digit customer zipcode.");
        return;
      }
      if (serviceAreaMiles === null || serviceAreaMiles > 80) {
        setStatusMessage("This zipcode is outside our service area. Please use a different address.");
        return;
      }
    }
    if (step === 2) {
      if (!loadType) {
        setStatusMessage("Choose an appliance pickup, truck load, or trailer load before continuing.");
        return;
      }
      if (loadType !== "appliance" && !isDumpZipValid) {
        setStatusMessage("Please enter a valid 5-digit dump zipcode.");
        return;
      }
      if (loadType !== "appliance" && (distanceMiles === null || gasPrice === null)) {
        setStatusMessage("Wait until the route estimate completes or verify the dump zipcode.");
        return;
      }
    }
    if (step === 3) {
      if (loadType === "trailer" && selectedTrailerItems.length === 0) {
        setStatusMessage("Select at least one trailer cargo type to determine dump fees.");
        return;
      }
      if (loadType === "appliance" && selectedApplianceItems.length === 0) {
        setStatusMessage("Select at least one appliance type for pickup.");
        return;
      }
    }
    if (step === 5 && !laborApproved) {
      setStatusMessage("Approve the labor estimate before selecting a service window.");
      return;
    }
    setStatusMessage("");
    setStep((prev) => Math.min(prev + 1, 7));
  };

  const goBack = () => {
    if (step > 1) {
      setPaymentChoice(null);
      setStep((prev) => prev - 1);
    }
  };

  const [isRedirecting, setIsRedirecting] = useState(false);
  const [savedTicketNumber, setSavedTicketNumber] = useState<string | null>(null);

  const saveDraftBooking = async (paymentMode: "shopify" | "arrival"): Promise<string> => {
    try {
      const generatedTicket = `TKT-${Math.floor(100000 + Math.random() * 900000)}`;
      const bookingData = {
        ticketNumber: generatedTicket,
        clientName: customerName || "Customer Near " + (customerZip || "Fort Smith"),
        clientPhone: customerPhone || "(479) 555-0101",
        clientEmail: customerEmail || "rvcc@c0dejunky.com",
        address: serviceAddress || `Service near ${customerZip || "72901"}, AR`,
        zipCode: customerZip || "72901",
        selectedDate: new Date().toISOString().split("T")[0],
        timeSlot: (reservationSlot?.toLowerCase().includes("afternoon") ? "afternoon" : "morning") as "morning" | "afternoon",
        haulType: (loadType || "truck") as "truck" | "trailer" | "appliance",
        status: "scheduled" as const,
        priceTotal: totalEstimate,
        paymentTerms: paymentMode === "shopify" ? "shopify" : "arrival",
        paymentStatus: (paymentMode === "shopify" ? "paid" : "pending") as "paid" | "pending",
        timestamp: new Date().toISOString(),
        notes: `Gas: $${gasCost.toFixed(2)} | Dump Fee: $${dumpFee.toFixed(2)} | Photo Adj: $${photoAdjustment.toFixed(2)} | Labor: $${laborCost.toFixed(2)} | Window: ${reservationSlot}`
      };

      const result = await saveBookingToDatabase(bookingData);
      const ticket = result?.ticketNumber || generatedTicket;
      setSavedTicketNumber(ticket);
      return ticket;
    } catch (err) {
      console.warn("Could not save booking draft to database:", err);
      const fallbackTicket = `TKT-${Math.floor(100000 + Math.random() * 900000)}`;
      setSavedTicketNumber(fallbackTicket);
      return fallbackTicket;
    }
  };

  const handlePayNow = async () => {
    setPaymentChoice("now");
    setIsRedirecting(true);
    await saveDraftBooking("shopify");
    const hours = Math.max(1, Math.ceil(estimatedMinutes / 60));
    const fallbackCartUrl = `https://c0dejunky.com/cart/46871135060165:${hours}`;
    let targetCheckoutUrl = fallbackCartUrl;

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          hours,
          estimatedLaborHours: hours,
          totalEstimate,
          customerZip,
          serviceAddress,
          customerName,
          customerPhone,
          customerEmail
        })
      });
      if (response.ok) {
        const data = await response.json();
        if (data?.checkoutUrl || data?.url) {
          targetCheckoutUrl = data.checkoutUrl || data.url;
        }
      }
    } catch (err) {
      console.warn("Edge checkout session endpoint unavailable, falling back to direct Shopify cart:", err);
    }

    setIsRedirecting(false);

    // If embedded inside Shopify iframe (e.g. on c0dejunky.com), breakout to top window
    const isEmbeddedInIframe = window.top && window.top !== window;
    if (isEmbeddedInIframe) {
      try {
        window.top!.location.href = targetCheckoutUrl;
        return;
      } catch (e) {
        console.warn("Cross-origin top window navigation prevented; opening in new tab:", e);
      }
    }

    window.open(targetCheckoutUrl, "_blank", "noopener,noreferrer");
  };

  const handlePayLater = async () => {
    setPaymentChoice("later");
    await saveDraftBooking("arrival");
  };



  const stepLabels = [
    "Zip Code",
    "Load Type",
    "Cargo Items",
    "Photo",
    "Labor",
    "Reserve",
    "Invoice"
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="bg-slate-50/80 border-b border-slate-200 px-6 py-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-base font-semibold text-slate-900">Service Quote Wizard</h2>
            <p className="text-sm text-slate-500">Advance through the worksheet in order; the invoice will appear only at the end.</p>
          </div>
          <div className="text-xs font-mono text-slate-500 uppercase tracking-[0.18em]">Step {step} of 7</div>
        </div>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
          {stepLabels.map((label, index) => (
            <div
              key={label}
              className={`rounded-2xl px-3 py-2 text-center transition-all ${
                index + 1 === step
                  ? "bg-indigo-600 text-white"
                  : index + 1 < step
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              {label}
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="rounded-3xl bg-slate-50 p-4 border border-slate-200">
          <p className="text-sm text-slate-600">{statusMessage}</p>
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <div className="rounded-3xl border border-slate-200 p-5 bg-white shadow-sm">
              <h3 className="font-semibold text-slate-900">1. Customer Zipcode</h3>
              <p className="text-sm text-slate-500 mt-1">Enter the customer's zipcode so we can estimate route distance from {BASE_ZIP}.</p>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block text-xs font-semibold text-slate-500">Customer Zip Code</label>
                <input
                  value={customerZip}
                  onChange={(e) => setCustomerZip(clampZip(e.target.value))}
                  maxLength={5}
                  placeholder="e.g. 72701"
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="mt-5 rounded-3xl bg-slate-50 border border-slate-200 p-4 text-sm text-slate-700">
                {serviceAreaStatus}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="rounded-3xl border border-slate-200 p-5 bg-white shadow-sm">
              <h3 className="font-semibold text-slate-900">2. Load Type & Dump Destination</h3>
              <p className="text-sm text-slate-500 mt-1">Choose whether this is an appliance pickup, truck load, or trailer load, then enter any required details.</p>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setLoadType("truck")}
                  className={`rounded-3xl border px-5 py-5 text-left transition-all ${
                    loadType === "truck"
                      ? "border-indigo-500 bg-indigo-50 text-slate-900 ring-2 ring-indigo-500/20"
                      : "border-slate-200 bg-white text-slate-600 hover:border-indigo-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Truck className="h-5 w-5 text-indigo-600" />
                    <div>
                      <div className="text-sm font-semibold">Truck Load</div>
                      <div className="text-xs text-slate-500 mt-1">Flat $25 dump fee. Best for quick full truck pickups.</div>
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setLoadType("trailer")}
                  className={`rounded-3xl border px-5 py-5 text-left transition-all ${
                    loadType === "trailer"
                      ? "border-indigo-500 bg-indigo-50 text-slate-900 ring-2 ring-indigo-500/20"
                      : "border-slate-200 bg-white text-slate-600 hover:border-indigo-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-indigo-600" />
                    <div>
                      <div className="text-sm font-semibold">Trailer Load</div>
                      <div className="text-xs text-slate-500 mt-1">Dump pricing set by item categories selected next.</div>
                    </div>
                  </div>
                </button>
              </div>

              <div className="mt-3 text-center sm:text-left pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">Need only broken metal appliances picked up?</span>
                <button
                  type="button"
                  onClick={() => setLoadType("appliance")}
                  className={`text-xs font-semibold underline cursor-pointer ${
                    loadType === "appliance" ? "text-indigo-600 font-bold" : "text-slate-600 hover:text-indigo-600"
                  }`}
                >
                  {loadType === "appliance" ? "✓ Free Appliance Pickup Selected" : "Free Appliance Pickup (Click Here)"}
                </button>
              </div>

              {loadType !== "appliance" ? (
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className="block text-xs font-semibold text-slate-500">Dump Zip Code</label>
                  <input
                    value={dumpZip}
                    onChange={(e) => setDumpZip(clampZip(e.target.value))}
                    maxLength={5}
                    placeholder="Enter dump zipcode"
                    className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              ) : (
                <div className="mt-5 rounded-3xl bg-emerald-50 border border-emerald-200 p-4 text-slate-700">
                  Appliance pickup selected. No dump destination or gas estimate is required for this path.
                </div>
              )}

              {loadType !== "appliance" && distanceMiles !== null && gasPrice !== null ? (
                <div className="mt-5 rounded-3xl bg-slate-50 border border-slate-200 p-4">
                  <p className="text-sm text-slate-600">Estimated total route distance:</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">{distanceMiles.toFixed(1)} miles</p>
                  <p className="text-sm text-slate-500">Using current regular gas price ${gasPrice.toFixed(2)} / gallon.</p>
                  <p className="mt-3 text-sm text-slate-700">Base gas cost: <span className="font-semibold text-slate-900">${gasCost.toFixed(2)}</span> (assumes {MPG} MPG).</p>
                </div>
              ) : null}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="rounded-3xl border border-slate-200 p-5 bg-white shadow-sm">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold text-slate-900">3. Load Details</h3>
                <span className="rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 text-[11px] font-semibold">
                  {loadType === "appliance" ? "Appliance pickup path" : loadType === "truck" ? "Truck load path" : "Trailer load path"}
                </span>
              </div>
              <p className="text-sm text-slate-500 mt-1">
                {loadType === "appliance" && "Select the appliance(s) being picked up. This path has no dump fee and no gas charge."}
                {loadType === "truck" && "Truck loads automatically receive the flat dump fee. No item selection is required."}
                {loadType === "trailer" && "Choose the trailer cargo types. Dump pricing is based on the categories selected."}
              </p>

              {loadType === "appliance" ? (
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {APPLIANCE_ITEMS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedAppliances((prev) => ({ ...prev, [item.id]: !prev[item.id] }))}
                      className={`rounded-3xl border p-4 text-left transition-all ${
                        selectedAppliances[item.id]
                          ? "border-indigo-500 bg-indigo-50 text-slate-900"
                          : "border-slate-200 bg-white text-slate-600 hover:border-indigo-300"
                      }`}
                    >
                      <span className="font-semibold text-sm">{item.label}</span>
                    </button>
                  ))}
                </div>
              ) : loadType === "trailer" ? (
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {TRAILER_ITEMS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedItems((prev) => ({ ...prev, [item.id]: !prev[item.id] }))}
                      className={`rounded-3xl border p-4 text-left transition-all ${
                        selectedItems[item.id]
                          ? "border-indigo-500 bg-indigo-50 text-slate-900"
                          : "border-slate-200 bg-white text-slate-600 hover:border-indigo-300"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span className="font-semibold text-sm">{item.label}</span>
                        <span className="text-xs font-semibold text-slate-500">${item.fee}</span>
                      </div>
                    </button>
                  ))}
                </div>
              ) : loadType === "truck" ? (
                <div className="mt-5 rounded-3xl bg-emerald-50 border border-emerald-200 p-4 text-slate-700">
                  Truck load path selected. The pickup includes a flat $25 dump fee and no item selection is required.
                </div>
              ) : null}

              <div className="mt-5 rounded-3xl bg-slate-50 border border-slate-200 p-4">
                <p className="text-sm text-slate-600">Current dump fee estimate:</p>
                <p className="mt-1 text-lg font-semibold text-slate-900">${dumpFee.toFixed(2)}</p>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4">
            <div className="rounded-3xl border border-slate-200 p-5 bg-white shadow-sm">
              <div className="flex items-center gap-3">
                <Camera className="h-5 w-5 text-indigo-600" />
                <h3 className="font-semibold text-slate-900">4. Optional Photo Analysis</h3>
              </div>
              <p className="text-sm text-slate-500 mt-1">Upload a photo of the load or site, and the app will suggest handling pricing based on the image size.</p>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handlePhotoChange(e.target.files?.[0] ?? null)}
                  className="rounded-3xl border border-slate-200 px-4 py-3 text-sm"
                />
                <button
                  type="button"
                  onClick={handleAnalyzePhoto}
                  className="rounded-3xl bg-indigo-600 text-white px-5 py-3 text-sm font-semibold hover:bg-indigo-700 transition-all"
                >
                  Analyze Photo
                </button>
              </div>

              {photoPreviewUrl ? (
                <div className="mt-5 grid gap-3">
                  <img src={photoPreviewUrl} alt="Upload preview" className="h-44 w-full rounded-3xl object-cover border border-slate-200" />
                  <div className="rounded-3xl bg-slate-50 border border-slate-200 p-4 text-sm text-slate-700">
                    {imageAnalysis || "Tap Analyze Photo to get a pricing suggestion."}
                  </div>
                </div>
              ) : null}

              {photoAdjustment > 0 ? (
                <div className="mt-4 rounded-3xl bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-800">
                  Photo handling adjustment: <span className="font-semibold">${photoAdjustment}</span>
                </div>
              ) : null}
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="space-y-4">
            <div className="rounded-3xl border border-slate-200 p-5 bg-white shadow-sm">
              <div className="flex items-center gap-3">
                <CalendarDays className="h-5 w-5 text-indigo-600" />
                <h3 className="font-semibold text-slate-900">5. Calculated Labor & Invoice</h3>
              </div>
              <p className="text-sm text-slate-500 mt-1">Labor has been calculated from the route distance and load requirements. Here is your itemized invoice breakdown:</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-50 border border-slate-200 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Estimate</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-900">{estimatedMinutes} min</p>
                </div>
                <div className="rounded-3xl bg-slate-50 border border-slate-200 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Suggested Labor Charge</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-900">${laborCost}</p>
                </div>
              </div>

              {/* Itemized Invoice Breakdown */}
              <div className="mt-5 rounded-3xl bg-slate-50 border border-slate-200 p-5 space-y-3 font-mono text-xs">
                <div className="flex justify-between text-slate-700">
                  <span>Crew Labor:</span>
                  <span className="font-bold text-slate-900">${laborCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>Landfill / Dump Fee:</span>
                  <span className="font-bold text-slate-900">${dumpFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>Fuel / Route Transit ({distanceMiles?.toFixed(1) || 0} mi):</span>
                  <span className="font-bold text-slate-900">${gasCost.toFixed(2)}</span>
                </div>
                {photoAdjustment > 0 && (
                  <div className="flex justify-between text-slate-700">
                    <span>Photo Handling Fee:</span>
                    <span className="font-bold text-slate-900">${photoAdjustment.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-bold text-indigo-900 pt-3 border-t border-slate-200">
                  <span>Grand Total:</span>
                  <span className="text-indigo-600">${totalEstimate.toFixed(2)}</span>
                </div>
              </div>

              {/* Two buttons: Nevermind and Continue */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setLoadType(null);
                    setSelectedItems({});
                    setSelectedAppliances({});
                    setLaborApproved(false);
                  }}
                  className="rounded-3xl border border-slate-300 bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-200 transition-all cursor-pointer text-center"
                >
                  Nevermind
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLaborApproved(true);
                    setStep(6);
                  }}
                  className="rounded-3xl bg-indigo-600 text-white px-5 py-3 text-sm font-semibold hover:bg-indigo-700 transition-all cursor-pointer text-center"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="space-y-4">
            <div className="rounded-3xl border border-slate-200 p-5 bg-white shadow-sm">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-indigo-600" />
                <h3 className="font-semibold text-slate-900">6. Reserve Arrival Slot</h3>
              </div>
              <p className="text-sm text-slate-500 mt-1">Confirm the service window and verify the customer contact information.</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="block text-xs font-semibold text-slate-500">Service Window</label>
                <select
                  value={reservationSlot}
                  onChange={(e) => setReservationSlot(e.target.value)}
                  className="w-full rounded-3xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option>Tomorrow 10:00 AM - 12:00 PM</option>
                  <option>Tomorrow 1:00 PM - 3:00 PM</option>
                  <option>Day After Tomorrow 8:00 AM - 10:00 AM</option>
                  <option>Day After Tomorrow 2:00 PM - 4:00 PM</option>
                </select>
                <label className="block text-xs font-semibold text-slate-500">Service Address</label>
                <input
                  value={serviceAddress}
                  onChange={(e) => setServiceAddress(e.target.value)}
                  className="w-full rounded-3xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <label className="block text-xs font-semibold text-slate-500">Customer Name</label>
                <input
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Full name"
                  className="w-full rounded-3xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <label className="block text-xs font-semibold text-slate-500">Phone</label>
                <input
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="(555) 123-4567"
                  className="w-full rounded-3xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <label className="block text-xs font-semibold text-slate-500">Email</label>
                <input
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="customer@example.com"
                  className="w-full rounded-3xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="mt-5 rounded-3xl bg-slate-50 border border-slate-200 p-4 text-sm text-slate-700">
                The service address and contact info are prefilled from the zipcode entry and customer details, then confirmed here before final invoice.
              </div>
            </div>
          </div>
        )}

        {step === 7 && (
          <div className="space-y-4">
            <div className="rounded-3xl border border-slate-200 p-5 bg-white shadow-sm">
              <h3 className="font-semibold text-slate-900 mb-3">7. Final Live Invoice</h3>
              <div className="grid gap-3">
                <div className="rounded-3xl bg-slate-50 border border-slate-200 p-4">
                  <div className="flex justify-between text-sm text-slate-500">
                    <span>Base gas cost</span>
                    <span>${gasCost.toFixed(2)}</span>
                  </div>
                </div>
                {loadType !== "appliance" && (
                  <div className="rounded-3xl bg-slate-50 border border-slate-200 p-4">
                    <div className="flex justify-between text-sm text-slate-500">
                      <span>Base gas cost</span>
                      <span>${gasCost.toFixed(2)}</span>
                    </div>
                  </div>
                )}
                <div className="rounded-3xl bg-slate-50 border border-slate-200 p-4">
                  <div className="flex justify-between text-sm text-slate-500">
                    <span>{loadType === "appliance" ? "Appliance pickup fee" : loadType === "truck" ? "Truck dump fee" : "Trailer dump fee"}</span>
                    <span>${dumpFee.toFixed(2)}</span>
                  </div>
                </div>
                {photoAdjustment > 0 && loadType !== "appliance" ? (
                  <div className="rounded-3xl bg-slate-50 border border-slate-200 p-4">
                    <div className="flex justify-between text-sm text-slate-500">
                      <span>Photo handling adjustment</span>
                      <span>${photoAdjustment.toFixed(2)}</span>
                    </div>
                  </div>
                ) : null}
                <div className="rounded-3xl bg-slate-50 border border-slate-200 p-4">
                  <div className="flex justify-between text-sm text-slate-500">
                    <span>Labor charge</span>
                    <span>${laborCost.toFixed(2)}</span>
                  </div>
                </div>
                <div className="rounded-3xl bg-indigo-600 text-white border border-indigo-700 p-4">
                  <div className="flex justify-between text-sm uppercase tracking-[0.18em] opacity-80">
                    <span>Total estimate</span>
                    <span>${totalEstimate.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={handlePayNow}
                  disabled={isRedirecting}
                  className="rounded-3xl bg-green-600 text-white px-5 py-4 text-sm font-semibold hover:bg-green-700 transition-all cursor-pointer disabled:opacity-60"
                >
                  {isRedirecting ? "Preparing Checkout..." : "Pay Online Now (Shopify)"}
                </button>
                <button
                  type="button"
                  onClick={handlePayLater}
                  className="rounded-3xl border border-slate-200 bg-white px-5 py-4 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all cursor-pointer"
                >
                  Pay When Driver Arrives (Shopify POS / Cash / Card)
                </button>
              </div>

              {savedTicketNumber && (
                <div className="mt-5 rounded-3xl bg-emerald-50 border-2 border-emerald-500/40 p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span className="font-bold text-sm text-emerald-950">Invoice Saved to Drafts</span>
                    </div>
                    <span className="text-xs font-mono font-black bg-emerald-200/80 text-emerald-900 px-2.5 py-1 rounded-full">
                      {savedTicketNumber}
                    </span>
                  </div>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    This work order estimate is saved and ready in your dispatch records. The driver or crew can pull this up on-site via phone/tablet or complete payment through Shopify POS.
                  </p>
                  <div className="flex items-center gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white text-emerald-900 border border-emerald-300 rounded-xl text-xs font-bold hover:bg-emerald-100 transition cursor-pointer shadow-xs"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Print / Save Invoice Slip</span>
                    </button>
                  </div>
                </div>
              )}

              {paymentChoice === "now" && !savedTicketNumber && (
                <div className="mt-4 rounded-3xl bg-emerald-50 border border-emerald-200 p-4 text-sm text-emerald-800">
                  Payment mode selected: pay now. Secure Shopify checkout will open in a new tab.
                </div>
              )}
              {paymentChoice === "later" && !savedTicketNumber && (
                <div className="mt-4 rounded-3xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-800">
                  Payment mode selected: pay when the driver arrives. The invoice is ready for the customer on site.
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between items-stretch">
          <button
            type="button"
            onClick={goBack}
            disabled={step === 1}
            className="rounded-3xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-all disabled:opacity-50"
          >
            Back
          </button>
          <button
            type="button"
            onClick={goNext}
            disabled={step === 7}
            className="rounded-3xl bg-indigo-600 text-white px-5 py-3 text-sm font-semibold hover:bg-indigo-700 transition-all disabled:opacity-50"
          >
            {step === 6 ? "Review Invoice" : "Next Step"}
          </button>
        </div>
      </div>
    </div>
  );
}

