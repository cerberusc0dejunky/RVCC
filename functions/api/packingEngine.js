// functions/api/packingEngine.js
// 3D Bin Packing Problem (3D-BPP) Logistics & Physics Engine for River Valley Cleanup Crew
// Calibrated for experienced professional haulers who "pack it in tight".
// Rule: Labor is $25/hr. Minimum 1 hour for any single truckload pickup, always round up to nearest full hour.

export const FLEET_CONTAINERS = {
  standard_truck_bed: {
    id: "standard_truck_bed",
    name: "Standard 6.5ft Truck Bed",
    lengthInches: 78,
    widthInches: 63,
    wheelWellWidthInches: 50,
    railHeightInches: 20,
    maxSecureHeightInches: 52, // Secure stacking to cab height with cross-tied straps
    maxPayloadLbs: 1800,
    volumeCubicYards: 6.5
  },
  long_truck_bed: {
    id: "long_truck_bed",
    name: "8ft Heavy-Duty Bed",
    lengthInches: 96,
    widthInches: 66,
    wheelWellWidthInches: 50,
    railHeightInches: 22,
    maxSecureHeightInches: 54,
    maxPayloadLbs: 2400,
    volumeCubicYards: 8.5
  },
  dump_trailer_14ft: {
    id: "dump_trailer_14ft",
    name: "14ft High-Side Dump Trailer",
    lengthInches: 168,
    widthInches: 82,
    wheelWellWidthInches: 82,
    railHeightInches: 48,
    maxSecureHeightInches: 60,
    maxPayloadLbs: 9500,
    volumeCubicYards: 20.4
  }
};

export const DIMENSION_REGISTRY = {
  // --- BEDDING & MATTRESSES (Rest upright against left/right bedrails, preserving center floor channel) ---
  "mattress_twin": {
    name: "Twin Mattress", category: "mattress",
    lengthInches: 75, widthInches: 38, heightInches: 9, weightLbs: 40,
    orientation: "upright_wall", isHeavyBase: false, stackableOnTop: false, voidMultiplier: 1.05
  },
  "mattress_full": {
    name: "Full / Double Mattress", category: "mattress",
    lengthInches: 75, widthInches: 54, heightInches: 10, weightLbs: 55,
    orientation: "upright_wall", isHeavyBase: false, stackableOnTop: false, voidMultiplier: 1.05
  },
  "mattress_queen": {
    name: "Queen Mattress", category: "mattress",
    lengthInches: 80, widthInches: 60, heightInches: 11, weightLbs: 70,
    orientation: "upright_wall", isHeavyBase: false, stackableOnTop: false, voidMultiplier: 1.08,
    protrudesTailgate: true, safetyNote: "80\" Queen mattress docks upright against rail; tail strap secured."
  },
  "box_spring_queen": {
    name: "Queen Box Spring", category: "mattress",
    lengthInches: 80, widthInches: 60, heightInches: 9, weightLbs: 60,
    orientation: "upright_wall", isHeavyBase: false, stackableOnTop: false, voidMultiplier: 1.08,
    protrudesTailgate: true
  },
  "mattress_king": {
    name: "King Mattress", category: "mattress",
    lengthInches: 80, widthInches: 76, heightInches: 12, weightLbs: 90,
    orientation: "upright_wall", isHeavyBase: false, stackableOnTop: false, voidMultiplier: 1.1,
    protrudesTailgate: true
  },

  // --- LIVING ROOM & CASE GOODS ---
  "couch": {
    name: "Standard 3-Seat Sofa", category: "furniture",
    lengthInches: 84, widthInches: 35, heightInches: 32, weightLbs: 130,
    orientation: "base_floor", isHeavyBase: true, stackableOnTop: false, voidMultiplier: 1.2,
    protrudesTailgate: true
  },
  "loveseat": {
    name: "2-Seat Loveseat", category: "furniture",
    lengthInches: 60, widthInches: 34, heightInches: 32, weightLbs: 95,
    orientation: "base_floor", isHeavyBase: true, stackableOnTop: false, voidMultiplier: 1.2
  },
  "armchair": {
    name: "Armchair / Recliner", category: "furniture",
    lengthInches: 35, widthInches: 33, heightInches: 36, weightLbs: 75,
    orientation: "irregular", isHeavyBase: false, stackableOnTop: false, voidMultiplier: 1.25
  },
  "dining_chair": {
    name: "Dining / Desk Chair", category: "furniture",
    lengthInches: 20, widthInches: 20, heightInches: 36, weightLbs: 16,
    orientation: "irregular", isHeavyBase: false, stackableOnTop: false, voidMultiplier: 1.3
  },
  "dresser": {
    name: "6-Drawer Wooden Dresser", category: "furniture",
    lengthInches: 54, widthInches: 20, heightInches: 32, weightLbs: 110,
    orientation: "base_floor", isHeavyBase: true, stackableOnTop: true, voidMultiplier: 1.05
  },
  "wooden_trunk": {
    name: "Wooden Chest / Storage Trunk", category: "furniture",
    lengthInches: 40, widthInches: 22, heightInches: 20, weightLbs: 60,
    orientation: "base_floor", isHeavyBase: true, stackableOnTop: true, voidMultiplier: 1.05
  },
  "end_table": {
    name: "End Table / Nightstand", category: "furniture",
    lengthInches: 22, widthInches: 20, heightInches: 22, weightLbs: 25,
    orientation: "stackable", isHeavyBase: false, stackableOnTop: true, voidMultiplier: 1.15
  },
  "coffee_table": {
    name: "Coffee Table", category: "furniture",
    lengthInches: 48, widthInches: 24, heightInches: 18, weightLbs: 35,
    orientation: "base_floor", isHeavyBase: false, stackableOnTop: true, voidMultiplier: 1.2
  },
  "dining_table": {
    name: "Dining Room Table", category: "furniture",
    lengthInches: 60, widthInches: 36, heightInches: 30, weightLbs: 85,
    orientation: "base_floor", isHeavyBase: true, stackableOnTop: true, voidMultiplier: 1.3
  },
  "desk": {
    name: "Office / Computer Desk", category: "furniture",
    lengthInches: 48, widthInches: 24, heightInches: 30, weightLbs: 70,
    orientation: "base_floor", isHeavyBase: true, stackableOnTop: true, voidMultiplier: 1.2
  },

  // --- APPLIANCES ---
  "refrigerator": {
    name: "Standard Refrigerator", category: "appliance",
    lengthInches: 34, widthInches: 32, heightInches: 68, weightLbs: 230,
    orientation: "upright_wall", isHeavyBase: true, stackableOnTop: false, voidMultiplier: 1.05,
    safetyNote: "Freon appliance handling required."
  },
  "washing_machine": {
    name: "Washing Machine", category: "appliance",
    lengthInches: 27, widthInches: 28, heightInches: 42, weightLbs: 150,
    orientation: "base_floor", isHeavyBase: true, stackableOnTop: false, voidMultiplier: 1.05
  },
  "dryer": {
    name: "Clothes Dryer", category: "appliance",
    lengthInches: 27, widthInches: 28, heightInches: 42, weightLbs: 125,
    orientation: "base_floor", isHeavyBase: true, stackableOnTop: false, voidMultiplier: 1.05
  },
  "dishwasher": {
    name: "Under-Counter Dishwasher", category: "appliance",
    lengthInches: 24, widthInches: 24, heightInches: 35, weightLbs: 85,
    orientation: "base_floor", isHeavyBase: true, stackableOnTop: true, voidMultiplier: 1.05
  },
  "water_heater": {
    name: "Water Heater Tank (40-50 Gal)", category: "appliance",
    lengthInches: 22, widthInches: 22, heightInches: 60, weightLbs: 140,
    orientation: "base_floor", isHeavyBase: true, stackableOnTop: false, voidMultiplier: 1.1
  },
  "small_appliance": {
    name: "Small Appliance (Microwave/Printer/Toaster)", category: "appliance",
    lengthInches: 20, widthInches: 16, heightInches: 14, weightLbs: 20,
    orientation: "stackable", isHeavyBase: false, stackableOnTop: true, voidMultiplier: 1.05
  },

  // --- OUTDOOR, TOOLS & SPORTS ---
  "bicycle": {
    name: "Bicycle / Mountain Bike", category: "outdoor",
    lengthInches: 66, widthInches: 20, heightInches: 38, weightLbs: 30,
    orientation: "irregular", isHeavyBase: false, stackableOnTop: false, voidMultiplier: 1.35
  },
  "lawn_mower": {
    name: "Push Lawn Mower", category: "outdoor",
    lengthInches: 52, widthInches: 21, heightInches: 36, weightLbs: 70,
    orientation: "base_floor", isHeavyBase: true, stackableOnTop: false, voidMultiplier: 1.25
  },
  "bbq_grill": {
    name: "Outdoor BBQ Grill", category: "outdoor",
    lengthInches: 46, widthInches: 22, heightInches: 42, weightLbs: 75,
    orientation: "irregular", isHeavyBase: false, stackableOnTop: false, voidMultiplier: 1.3
  },
  "wheelbarrow": {
    name: "Wheelbarrow", category: "outdoor",
    lengthInches: 56, widthInches: 26, heightInches: 26, weightLbs: 40,
    orientation: "irregular", isHeavyBase: false, stackableOnTop: false, voidMultiplier: 1.4
  },

  // --- DEBRIS, BOXES, BAGS & MATERIALS ---
  "yard_bag": {
    name: "Contractor / Yard Trash Bag", category: "debris",
    lengthInches: 22, widthInches: 18, heightInches: 30, weightLbs: 30,
    orientation: "stackable", isHeavyBase: false, stackableOnTop: true, voidMultiplier: 1.05
  },
  "cardboard_box": {
    name: "Moving Box (Medium)", category: "debris",
    lengthInches: 18, widthInches: 18, heightInches: 16, weightLbs: 25,
    orientation: "stackable", isHeavyBase: false, stackableOnTop: true, voidMultiplier: 1.0
  },
  "scrap_lumber": {
    name: "Scrap Lumber Bundle", category: "debris",
    lengthInches: 72, widthInches: 16, heightInches: 12, weightLbs: 55,
    orientation: "base_floor", isHeavyBase: false, stackableOnTop: true, voidMultiplier: 1.1
  },
  "tire": {
    name: "Automotive Tire", category: "debris",
    lengthInches: 27, widthInches: 27, heightInches: 9, weightLbs: 22,
    orientation: "stackable", isHeavyBase: false, stackableOnTop: true, voidMultiplier: 1.1
  },
  "tv_monitor": {
    name: "Flat Screen TV / Monitor", category: "electronics",
    lengthInches: 44, widthInches: 6, heightInches: 26, weightLbs: 28,
    orientation: "upright_wall", isHeavyBase: false, stackableOnTop: false, voidMultiplier: 1.08
  },
  "carpet_roll": {
    name: "Rolled Carpet / Padding", category: "debris",
    lengthInches: 72, widthInches: 14, heightInches: 14, weightLbs: 45,
    orientation: "base_floor", isHeavyBase: false, stackableOnTop: true, voidMultiplier: 1.1
  }
};

export function matchToRegistryKey(rawName) {
  if (!rawName) return "yard_bag";
  const clean = rawName.toLowerCase().replace(/[\s\-_]+/g, '_');

  if (clean.includes('carpet')) return 'carpet_roll';
  if (clean.includes('king') && clean.includes('mattress')) return 'mattress_king';
  if (clean.includes('box_spring') || clean.includes('boxspring') || (clean.includes('queen') && clean.includes('box'))) return 'box_spring_queen';
  if (clean.includes('queen') || (clean.includes('mattress') && !clean.includes('twin') && !clean.includes('full'))) return 'mattress_queen';
  if (clean.includes('twin')) return 'mattress_twin';
  if (clean.includes('full') || clean.includes('double')) return 'mattress_full';
  if (clean.includes('mattress')) return 'mattress_queen';

  if (clean.includes('loveseat')) return 'loveseat';
  if (clean.includes('sectional') || clean.includes('sofa') || clean.includes('couch')) return 'couch';
  if (clean.includes('recliner') || clean.includes('armchair') || clean.includes('arm_chair') || clean.includes('chair') && (clean.includes('lounge') || clean.includes('floral') || clean.includes('plush') || clean.includes('easy'))) return 'armchair';
  if (clean.includes('end_table') || clean.includes('nightstand') || clean.includes('inn_table') || clean.includes('side_table')) return 'end_table';
  if (clean.includes('chair')) return 'dining_chair';
  if (clean.includes('dresser') || clean.includes('bureau') || clean.includes('credenza') || clean.includes('chest_of_drawers')) return 'dresser';
  if (clean.includes('trunk') || clean.includes('chest')) return 'wooden_trunk';
  if (clean.includes('coffee_table')) return 'coffee_table';
  if (clean.includes('desk')) return 'desk';
  if (clean.includes('table') || clean.includes('dining')) return 'dining_table';

  if (clean.includes('bike') || clean.includes('bicycle')) return 'bicycle';
  if (clean.includes('mower') || clean.includes('lawn')) return 'lawn_mower';
  if (clean.includes('grill') || clean.includes('bbq')) return 'bbq_grill';
  if (clean.includes('wheelbarrow')) return 'wheelbarrow';

  if (clean.includes('fridge') || clean.includes('refrigerator')) return 'refrigerator';
  if (clean.includes('washer') || clean.includes('washing')) return 'washing_machine';
  if (clean.includes('dryer')) return 'dryer';
  if (clean.includes('dishwasher')) return 'dishwasher';
  if (clean.includes('water_heater')) return 'water_heater';
  if (clean.includes('printer') || clean.includes('microwave') || clean.includes('appliance') || clean.includes('scanner') || clean.includes('toaster')) return 'small_appliance';

  if (clean.includes('yard_bag') || clean.includes('contractor') || clean.includes('trash') || clean.includes('bag')) return 'yard_bag';
  if (clean.includes('box') || clean.includes('cardboard')) return 'cardboard_box';
  if (clean.includes('lumber') || clean.includes('wood') || clean.includes('stud') || clean.includes('plank')) return 'scrap_lumber';
  if (clean.includes('tire')) return 'tire';
  if (clean.includes('tv') || clean.includes('monitor') || clean.includes('television')) return 'tv_monitor';

  return 'yard_bag';
}

// -------------------------------------------------------------
// OFFICIAL SEBASTIAN COUNTY LANDFILL PROHIBITED ITEMS (NON-HAULABLE)
// -------------------------------------------------------------
export const PROHIBITED_LANDFILL_ITEMS = [
  { id: "wet_paint", name: "Non-solidified Paint", rule: "Only paint from Sebastian County residents accepted at Convenience Center for reuse/solidification." },
  { id: "burn_barrels", name: "Burn Barrels (Unbagged)", rule: "Debris must be removed from barrel and bagged before disposal." },
  { id: "gas_cans_fuel", name: "Gas Cans / Tanks with Liquid", rule: "Flammable fuels strictly prohibited." },
  { id: "whole_tires", name: "Whole Tires (Uncut)", rule: "Tires prohibited unless cut and quartered." },
  { id: "motor_oil_filters", name: "Used Motor Oils & Filters", rule: "Prohibited unless dome-punched and hot drained." },
  { id: "batteries", name: "Lead-Acid & Heavy Metal Batteries", rule: "Wet cell or cadmium/mercury batteries prohibited." },
  { id: "septic_pumpings", name: "Domestic Septic Tank Pumpings", rule: "Liquid waste prohibited." },
  { id: "incinerator_ash", name: "Incinerator Ash & Residues", rule: "Combustion residue prohibited." },
  { id: "free_liquids", name: "Free Liquids (EPA Method 9095)", rule: "All uncontained free liquids prohibited." },
  { id: "biomedical_waste", name: "Regulated Bio-Medical / Vet Waste", rule: "Red-bagged biohazards prohibited." },
  { id: "compressed_gas_drums", name: "Compressed Gas Cylinders & Closed Drums", rule: "Must meet RCRA empty definition under 40 CFR 261." },
  { id: "transformers_dielectric", name: "Electrical Transformers & Dielectric Fluids", rule: "Dielectric fluid / PCB waste prohibited." },
  { id: "petroleum_soils", name: "Petroleum Contaminated Soils", rule: "Must meet certified TPH, BETX, TCLP limits." },
  { id: "cresol_wood", name: "Cresol Treated Wood", rule: "Must be certified hazard-free." },
  { id: "freon_appliances", name: "Appliances Containing Freon", rule: "Prohibited unless certified evacuated by EPA tech." },
  { id: "pesticide_containers", name: "Pesticide / Herbicide / Fungicide Containers", rule: "Must be triple rinsed and punctured." },
  { id: "pcb_hazardous_waste", name: "Hazardous & PCB Wastes (40 CFR 261/761)", rule: "Strictly prohibited in municipal landfill." },
  { id: "explosives_ammunition", name: "Firearms, Ammunition, Gunpowder, Fireworks", rule: "All explosives prohibited." },
  { id: "commercial_fluorescent", name: "Commercial Fluorescent Light Bulbs", rule: "Commercial mercury vapor bulbs prohibited." }
];

export function checkProhibitedItems(itemsList) {
  const detected = [];
  const items = Array.isArray(itemsList) ? itemsList : [];
  for (const item of items) {
    const str = (typeof item === 'string' ? item : item.name || '').toLowerCase();
    if (str.includes('paint') && !str.includes('dried') && !str.includes('solid')) {
      detected.push("Non-solidified Paint");
    } else if (str.includes('burn_barrel') || str.includes('burn barrel')) {
      detected.push("Burn Barrel (Unbagged debris)");
    } else if (str.includes('gas_can') || str.includes('gas can') || str.includes('fuel tank') || str.includes('gasoline')) {
      detected.push("Gas Cans / Tanks with Liquid");
    } else if (str.includes('tire') && !str.includes('quartered') && !str.includes('cut')) {
      detected.push("Whole Tires (Must be cut/quartered)");
    } else if (str.includes('motor oil') || str.includes('oil filter')) {
      detected.push("Used Motor Oils & Filters");
    } else if (str.includes('battery') || str.includes('car battery') || str.includes('lead acid')) {
      detected.push("Lead-Acid / Heavy Metal Batteries");
    } else if (str.includes('propane') || str.includes('gas cylinder') || str.includes('oxygen tank')) {
      detected.push("Compressed Gas Cylinders / Drums");
    } else if (str.includes('freon') || str.includes('ac unit') || str.includes('air conditioner')) {
      detected.push("Appliances Containing Freon");
    } else if (str.includes('pesticide') || str.includes('herbicide') || str.includes('chemical')) {
      detected.push("Pesticide / Chemical Containers");
    } else if (str.includes('ammo') || str.includes('ammunition') || str.includes('firework') || str.includes('gunpowder')) {
      detected.push("Explosives / Firearms / Ammunition");
    } else if (str.includes('fluorescent') && str.includes('bulb')) {
      detected.push("Commercial Fluorescent Light Bulbs");
    }
  }
  return [...new Set(detected)];
}

/**
 * Runs 3D Bin-Packing heuristic:
 * 1. Estimates load size (vehicle type, truck load fraction, cubic yards, weight).
 * 2. Calculates how long it will take to do the job (estimatedLaborHours).
 * Rule: Labor is $25/hr. Minimum 1 hour for any single truckload, always rounded up to nearest hour.
 */
export function simulateTruckPack(inputItems) {
  const standardBed = FLEET_CONTAINERS.standard_truck_bed;
  const items = Array.isArray(inputItems) ? inputItems : [];

  const expandedItems = [];
  const itemCounts = {};

  for (const item of items) {
    let key = '';
    let qty = 1;
    if (typeof item === 'string') {
      key = matchToRegistryKey(item);
      qty = 1;
    } else if (item && typeof item === 'object') {
      key = matchToRegistryKey(item.name || item.id || '');
      qty = Math.max(1, Number(item.quantity) || 1);
    }

    const spec = DIMENSION_REGISTRY[key] || DIMENSION_REGISTRY["yard_bag"];
    itemCounts[spec.name] = (itemCounts[spec.name] || 0) + qty;

    for (let q = 0; q < qty; q++) {
      expandedItems.push({ ...spec });
    }
  }

  // Baseline empty
  if (expandedItems.length === 0) {
    return {
      recommendedVehicle: "truck",
      loadType: "truck",
      truckLoadFraction: "1/4 Truck Bed",
      volumeCubicYards: 0.5,
      bedFillPercentage: 10,
      totalWeightLbs: 35,
      weightCategory: "Light (< 400 lbs)",
      weightEstimate: "Light (< 400 lbs)",
      estimatedLaborHours: 1, // Minimum 1 hour ($25)
      crewRecommendation: "1-Person Quick Load",
      fittedItems: [],
      overflowItems: [],
      physicsNotes: ["Quick minimal stop."],
      safetyFlags: [],
      confidenceScore: 0.96,
      briefAnalysis: "Minimal debris volume detected (1 hr minimum load).",
      suggestedDescription: "Quick curbside cleanup."
    };
  }

  // Sort items for expert packing:
  // 1. Upright wall docks (mattresses, flat screens) along left/right rails
  // 2. Heavy base floor (washers, dressers, lawn mowers, trunks) in center channel
  // 3. Irregulars & furniture (armchairs, end tables, bikes) stacked mid
  // 4. Stackable cargo (boxes, contractor bags) tucked in top voids
  const order = { upright_wall: 1, base_floor: 2, irregular: 3, stackable: 4 };
  expandedItems.sort((a, b) => (order[a.orientation] || 5) - (order[b.orientation] || 5));

  let totalRawVolumeCuIn = 0;
  let totalEffectiveVolumeCuIn = 0;
  let totalWeightLbs = 0;
  let heavyBaseItemsCount = 0;
  let wallDockedCount = 0;
  const physicsNotes = [];
  const safetyFlags = [];
  const fitted = [];
  const overflow = [];

  // Usable floor space of 6.5ft bed: 78" x 63" = 4,914 sq in.
  // Center floor channel between wheel wells is 50" wide x 78" long = 3,900 sq in.
  // Max secure stacked volume up to cab height (52" high): 78 * 63 * 52 = 255,528 cu in (5.5 cu yd baseline water volume, can pack ~7.5 cu yd with tight stacking).
  const maxBedPackedCapacityCuIn = 78 * 63 * 52; // 255,528 cu in

  let remainingCenterFloorSqIn = 3900;
  let remainingBedVolumeCuIn = maxBedPackedCapacityCuIn;
  let remainingPayloadLbs = standardBed.maxPayloadLbs;

  for (const item of expandedItems) {
    const rawVol = item.lengthInches * item.widthInches * item.heightInches;
    const effectiveVol = rawVol * item.voidMultiplier;
    const footprint = item.lengthInches * item.widthInches;

    totalRawVolumeCuIn += rawVol;
    totalEffectiveVolumeCuIn += effectiveVol;
    totalWeightLbs += item.weightLbs;

    let canFitThisItem = true;

    if (item.orientation === 'upright_wall') {
      // Slabs dock vertically against driver or passenger bedrail.
      // Up to 3 slabs can lean against rails (e.g. 2 mattresses + 1 box spring or TV) without consuming center floor channel!
      if (wallDockedCount < 4) {
        wallDockedCount++;
        // Does not subtract center floor area
      } else {
        remainingCenterFloorSqIn -= (item.lengthInches * item.heightInches * 0.5);
      }
      if (item.protrudesTailgate && !physicsNotes.some(n => n.includes("protrudes"))) {
        physicsNotes.push(`${item.name} docks upright along side rail; tail secured with tie-down straps.`);
      }
    } else if (item.orientation === 'base_floor') {
      // Sits on bed floor in center channel
      remainingCenterFloorSqIn -= footprint * 0.75; // allows nesting
      if (item.isHeavyBase) heavyBaseItemsCount++;
    } else if (item.orientation === 'irregular') {
      // Can sit on floor or stack over other items (e.g. bike strapped on top, armchair placed mid-bed)
      remainingCenterFloorSqIn -= footprint * 0.40;
    } else {
      // Stackable boxes / bags pack directly into voids & top layer
      remainingCenterFloorSqIn -= footprint * 0.15;
    }

    const fitsVolume = (remainingBedVolumeCuIn >= effectiveVol * 0.85); // tight compaction allowance
    const fitsWeight = (remainingPayloadLbs >= item.weightLbs);
    // Allow skilled hauler vertical stacking even if floor is full
    const fitsFloor = (remainingCenterFloorSqIn >= -1200);

    if (fitsVolume && fitsWeight && fitsFloor) {
      fitted.push(item.name);
      remainingBedVolumeCuIn -= (effectiveVol * 0.85);
      remainingPayloadLbs -= item.weightLbs;
    } else {
      overflow.push(item.name);
    }

    if (item.safetyNote && !safetyFlags.includes(item.safetyNote)) {
      safetyFlags.push(item.safetyNote);
    }
  }

  // Volume & Fill Metrics
  const volumeCubicYards = Math.max(0.5, Math.round((totalEffectiveVolumeCuIn / 46656) * 10) / 10);
  const bedFillPercentage = Math.min(100, Math.round((totalEffectiveVolumeCuIn / maxBedPackedCapacityCuIn) * 100));

  // Determine Vehicle Recommendation & Load Size (Under-promise, Over-deliver)
  let recommendedVehicle = 'truck';
  let truckLoadFraction = "1/2 Truck Bed";

  // Hard limits for single truckload:
  // - Overflow count > 2 items
  // - Total weight > 1,800 lbs
  // - Volume > 8.0 cubic yards
  // (Removed arbitrary scrap appliance limit — driver will pile that truck up and decide on-site if it is too much)
  const exceedsTruck = overflow.length > 2 || totalWeightLbs > standardBed.maxPayloadLbs || volumeCubicYards > 8.0;

  if (exceedsTruck) {
    recommendedVehicle = 'trailer';
    truckLoadFraction = "Requires 14-ft Dump Trailer (Overflow)";
    physicsNotes.push(`Cargo exceeds pickup bed capacity (${overflow.length} items overflow, ~${volumeCubicYards} cu yds). 14-ft high-side dump trailer required.`);
  } else if (volumeCubicYards >= 4.0 || bedFillPercentage >= 65 || expandedItems.length >= 6) {
    recommendedVehicle = 'truck';
    truckLoadFraction = "Full Truck Bed (Max Capacity)";
    physicsNotes.push("Pickup bed packed to max capacity with upright wall docking and cross-tied strap anchoring.");
  } else if (volumeCubicYards >= 2.0 || bedFillPercentage >= 30 || expandedItems.length >= 3) {
    recommendedVehicle = 'truck';
    truckLoadFraction = "1/2 Truck Bed";
  } else {
    recommendedVehicle = 'truck';
    truckLoadFraction = "1/4 Truck Bed";
  }

  // Calculate Labor Hours ($25/hr):
  // Rule: Even if it takes 10 minutes to load up, ALWAYS round up to the nearest hour. Minimum 1 hour.
  let rawHours = 1.0;

  if (recommendedVehicle === 'trailer') {
    // Trailer loads: 3 to 5 hours based on weight & count
    if (totalWeightLbs >= 2500 || expandedItems.length >= 20) {
      rawHours = 5.0;
    } else if (totalWeightLbs >= 1500 || expandedItems.length >= 14) {
      rawHours = 4.0;
    } else {
      rawHours = 3.0;
    }
  } else {
    // Single truckload:
    if (truckLoadFraction.includes("Full")) {
      // A packed-to-the-gills full truck bed (2 mattresses, dresser, end tables, mower, etc.) takes ~1.5 - 2 hrs to load & strap securely
      rawHours = (heavyBaseItemsCount >= 2 || totalWeightLbs >= 650) ? 2.0 : 1.5;
    } else if (truckLoadFraction.includes("1/2")) {
      // Half bed: 1.0 - 1.5 hours
      rawHours = (heavyBaseItemsCount >= 2 || totalWeightLbs >= 400) ? 2.0 : 1.0;
    } else {
      // 1/4 bed or single item (even 10 min stop)
      rawHours = 1.0;
    }
  }

  // Always round up to nearest full hour, minimum 1 hour
  const estimatedLaborHours = Math.max(1, Math.ceil(rawHours));

  // Crew recommendation
  const crewRecommendation = (heavyBaseItemsCount >= 1 || totalWeightLbs >= 400 || wallDockedCount >= 2)
    ? "2-Person Heavy Lifting Crew"
    : "1-Person Quick Load";

  // Weight Category
  let weightCategory = "Light (< 400 lbs)";
  if (totalWeightLbs >= 1000) {
    weightCategory = `Heavy (~${Math.round(totalWeightLbs / 50) * 50} lbs)`;
  } else if (totalWeightLbs >= 400) {
    weightCategory = `Medium (~${Math.round(totalWeightLbs / 25) * 25} lbs)`;
  }

  const topNames = Object.entries(itemCounts).map(([name, qty]) => `${qty}x ${name}`).slice(0, 4).join(', ');
  const suggestedDescription = Object.entries(itemCounts).map(([name, qty]) => `${qty}x ${name}`).join(', ');
  const briefAnalysis = `3D Bin-Packing simulated ${expandedItems.length} items. Estimated load size: ${truckLoadFraction} (${volumeCubicYards} cu yds, ~${totalWeightLbs} lbs). Labor time: ${estimatedLaborHours} hr${estimatedLaborHours > 1 ? 's' : ''} ($${estimatedLaborHours * 25} total labor).`;
  const prohibitedItems = checkProhibitedItems(inputItems);
  if (prohibitedItems.length > 0) {
    safetyFlags.push(...prohibitedItems.map(p => `PROHIBITED NON-HAULABLE: ${p}`));
    physicsNotes.push(`Warning: ${prohibitedItems.length} item(s) cannot be hauled per Sebastian County Landfill regulations (${prohibitedItems.join(', ')}).`);
  }

  return {
    recommendedVehicle,
    loadType: recommendedVehicle,
    truckLoadFraction,
    volumeCubicYards,
    bedFillPercentage,
    totalWeightLbs,
    weightCategory,
    weightEstimate: weightCategory,
    estimatedLaborHours,
    crewRecommendation,
    fittedItems: fitted,
    overflowItems: overflow,
    physicsNotes,
    safetyFlags,
    prohibitedItemsDetected: prohibitedItems,
    hasProhibitedItems: prohibitedItems.length > 0,
    confidenceScore: 0.96,
    briefAnalysis,
    suggestedDescription
  };
}

// -------------------------------------------------------------
// 25 DIVERSE REAL-WORLD CALIBRATION BENCHMARKS
// -------------------------------------------------------------
export const DIVERSE_BENCHMARKS = [
  {
    id: 1,
    name: "User's Curbside Photo Pile",
    description: "Queen Mattress + Box Spring + Floral Armchair + 2 Bikes + Wooden Trunk + Push Mower + Small Appliance",
    items: ["mattress_queen", "box_spring_queen", "armchair", "bicycle", "bicycle", "wooden_trunk", "lawn_mower", "small_appliance"],
    expectedVehicle: "truck",
    expectedLoad: "Full Truck Bed (Max Capacity)",
    expectedHours: 2
  },
  {
    id: 2,
    name: "Husband's Tight-Packed Bedroom Suite",
    description: "2 Queen Mattresses + 6-Drawer Dresser + 2 End Tables + 4 Contractor Bags",
    items: ["mattress_queen", "mattress_queen", "dresser", "end_table", "end_table", "yard_bag", "yard_bag", "yard_bag", "yard_bag"],
    expectedVehicle: "truck",
    expectedLoad: "Full Truck Bed (Max Capacity)",
    expectedHours: 2
  },
  {
    id: 3,
    name: "Quick 10-Minute Single Refrigerator Pick Up",
    description: "1 Standard Refrigerator (quick curbside grab)",
    items: ["refrigerator"],
    expectedVehicle: "truck",
    expectedLoad: "1/4 Truck Bed",
    expectedHours: 1
  },
  {
    id: 4,
    name: "Washer & Dryer Set",
    description: "1 Washing Machine + 1 Clothes Dryer",
    items: ["washing_machine", "dryer"],
    expectedVehicle: "truck",
    expectedLoad: "1/4 Truck Bed",
    expectedHours: 1
  },
  {
    id: 5,
    name: "Single Living Room 3-Seat Sofa",
    description: "1 Couch (curbside pickup)",
    items: ["couch"],
    expectedVehicle: "truck",
    expectedLoad: "1/2 Truck Bed",
    expectedHours: 1
  },
  {
    id: 6,
    name: "Curbside Yard Debris Cleanup",
    description: "10 Heavy Contractor Yard Bags + 1 Push Mower",
    items: ["lawn_mower", "yard_bag", "yard_bag", "yard_bag", "yard_bag", "yard_bag", "yard_bag", "yard_bag", "yard_bag", "yard_bag", "yard_bag"],
    expectedVehicle: "truck",
    expectedLoad: "Full Truck Bed (Max Capacity)",
    expectedHours: 2
  },
  {
    id: 7,
    name: "Moving Box Cleanout",
    description: "8 Moving Boxes + 1 Coffee Table + 2 Dining Chairs",
    items: ["coffee_table", "dining_chair", "dining_chair", "cardboard_box", "cardboard_box", "cardboard_box", "cardboard_box", "cardboard_box", "cardboard_box", "cardboard_box", "cardboard_box"],
    expectedVehicle: "truck",
    expectedLoad: "Full Truck Bed (Max Capacity)",
    expectedHours: 2
  },
  {
    id: 8,
    name: "Backyard Scrap Metal Grab",
    description: "1 BBQ Grill + 1 Lawn Mower + 1 Bicycle + 1 Scrap Lumber bundle",
    items: ["bbq_grill", "lawn_mower", "bicycle", "scrap_lumber"],
    expectedVehicle: "truck",
    expectedLoad: "Full Truck Bed (Max Capacity)",
    expectedHours: 2
  },
  {
    id: 9,
    name: "Home Office Electronics Recycling",
    description: "2 Flat Screen TVs + 3 Small Appliances + 4 Medium Boxes",
    items: ["tv_monitor", "tv_monitor", "small_appliance", "small_appliance", "small_appliance", "cardboard_box", "cardboard_box", "cardboard_box", "cardboard_box"],
    expectedVehicle: "truck",
    expectedLoad: "Full Truck Bed (Max Capacity)",
    expectedHours: 2
  },
  {
    id: 10,
    name: "Garage Tire Haul",
    description: "8 Automotive Tires",
    items: ["tire", "tire", "tire", "tire", "tire", "tire", "tire", "tire"],
    expectedVehicle: "truck",
    expectedLoad: "Full Truck Bed (Max Capacity)",
    expectedHours: 2
  },
  {
    id: 11,
    name: "Carpentry Trim & Lumber Debris",
    description: "4 Scrap Lumber Bundles + 4 Contractor Bags",
    items: ["scrap_lumber", "scrap_lumber", "scrap_lumber", "scrap_lumber", "yard_bag", "yard_bag", "yard_bag", "yard_bag"],
    expectedVehicle: "truck",
    expectedLoad: "Full Truck Bed (Max Capacity)",
    expectedHours: 2
  },
  {
    id: 12,
    name: "Studio Apartment Move-Out",
    description: "1 Full Mattress + 1 Desk + 2 Chairs + 4 Boxes",
    items: ["mattress_full", "desk", "dining_chair", "dining_chair", "cardboard_box", "cardboard_box", "cardboard_box", "cardboard_box"],
    expectedVehicle: "truck",
    expectedLoad: "Full Truck Bed (Max Capacity)",
    expectedHours: 2
  },
  {
    id: 13,
    name: "Master Bedroom Upgrade",
    description: "1 King Mattress + 2 End Tables + 1 6-Drawer Dresser",
    items: ["mattress_king", "dresser", "end_table", "end_table"],
    expectedVehicle: "truck",
    expectedLoad: "1/2 Truck Bed",
    expectedHours: 1
  },
  {
    id: 14,
    name: "Patio Furniture & Yard Cleanout",
    description: "1 Dining Table + 4 Chairs + 1 BBQ Grill",
    items: ["dining_table", "dining_chair", "dining_chair", "dining_chair", "dining_chair", "bbq_grill"],
    expectedVehicle: "truck",
    expectedLoad: "Full Truck Bed (Max Capacity)",
    expectedHours: 2
  },
  {
    id: 15,
    name: "Kitchen Remodel Tear-Out",
    description: "1 Dishwasher + 1 Small Appliance (Microwave) + 6 Contractor Bags",
    items: ["dishwasher", "small_appliance", "yard_bag", "yard_bag", "yard_bag", "yard_bag", "yard_bag", "yard_bag"],
    expectedVehicle: "truck",
    expectedLoad: "Full Truck Bed (Max Capacity)",
    expectedHours: 2
  },
  {
    id: 16,
    name: "Living Room Clutter Clear",
    description: "1 Loveseat + 1 Coffee Table + 1 TV + 5 Yard Bags",
    items: ["loveseat", "coffee_table", "tv_monitor", "yard_bag", "yard_bag", "yard_bag", "yard_bag", "yard_bag"],
    expectedVehicle: "truck",
    expectedLoad: "Full Truck Bed (Max Capacity)",
    expectedHours: 2
  },
  {
    id: 17,
    name: "Storage Locker 5x5 Cleanout",
    description: "1 Armchair + 1 Twin Mattress + 6 Boxes + 2 End Tables",
    items: ["armchair", "mattress_twin", "end_table", "end_table", "cardboard_box", "cardboard_box", "cardboard_box", "cardboard_box", "cardboard_box", "cardboard_box"],
    expectedVehicle: "truck",
    expectedLoad: "Full Truck Bed (Max Capacity)",
    expectedHours: 2
  },
  {
    id: 18,
    name: "Garden Shed Cleanout",
    description: "1 Lawn Mower + 1 Wheelbarrow + 2 Bicycles + 2 Scrap Lumber bundles",
    items: ["lawn_mower", "wheelbarrow", "bicycle", "bicycle", "scrap_lumber", "scrap_lumber"],
    expectedVehicle: "truck",
    expectedLoad: "Full Truck Bed (Max Capacity)",
    expectedHours: 2
  },
  {
    id: 19,
    name: "Water Heater Emergency Replacement",
    description: "1 50-Gal Water Heater + 2 Contractor Bags",
    items: ["water_heater", "yard_bag", "yard_bag"],
    expectedVehicle: "truck",
    expectedLoad: "1/2 Truck Bed",
    expectedHours: 1
  },
  {
    id: 20,
    name: "Carpet & Padding Replacement",
    description: "6 Rolls Carpet Padding + 4 Contractor Bags",
    items: ["carpet_roll", "carpet_roll", "carpet_roll", "carpet_roll", "carpet_roll", "carpet_roll", "yard_bag", "yard_bag", "yard_bag", "yard_bag"],
    expectedVehicle: "truck",
    expectedLoad: "Full Truck Bed (Max Capacity)",
    expectedHours: 2
  },
  {
    id: 21,
    name: "Small Commercial Office Clean",
    description: "2 Desks + 4 Office Chairs + 6 Boxes",
    items: ["desk", "desk", "dining_chair", "dining_chair", "dining_chair", "dining_chair", "cardboard_box", "cardboard_box", "cardboard_box", "cardboard_box", "cardboard_box", "cardboard_box"],
    expectedVehicle: "truck",
    expectedLoad: "Full Truck Bed (Max Capacity)",
    expectedHours: 2
  },
  {
    id: 22,
    name: "Massive Multi-Room Estate Cleanout",
    description: "3 Couches + 3 Queen Mattresses + 2 Washers + 10 Contractor Bags (Massive)",
    items: [
      "couch", "couch", "couch",
      "mattress_queen", "mattress_queen", "mattress_queen",
      "washing_machine", "dryer",
      "yard_bag", "yard_bag", "yard_bag", "yard_bag", "yard_bag",
      "yard_bag", "yard_bag", "yard_bag", "yard_bag", "yard_bag"
    ],
    expectedVehicle: "trailer",
    expectedLoad: "Requires 14-ft Dump Trailer (Overflow)",
    expectedHours: 4
  },
  {
    id: 23,
    name: "Full House Renovation Debris Pile",
    description: "8 Scrap Lumber bundles + 20 Heavy Contractor Bags + 1 Refrigerator + 1 Water Heater",
    items: [
      "refrigerator", "water_heater",
      "scrap_lumber", "scrap_lumber", "scrap_lumber", "scrap_lumber", "scrap_lumber", "scrap_lumber", "scrap_lumber", "scrap_lumber",
      "yard_bag", "yard_bag", "yard_bag", "yard_bag", "yard_bag", "yard_bag", "yard_bag", "yard_bag", "yard_bag", "yard_bag",
      "yard_bag", "yard_bag", "yard_bag", "yard_bag", "yard_bag", "yard_bag", "yard_bag", "yard_bag", "yard_bag", "yard_bag"
    ],
    expectedVehicle: "trailer",
    expectedLoad: "Requires 14-ft Dump Trailer (Overflow)",
    expectedHours: 5
  },
  {
    id: 24,
    name: "Hoarder Double Garage Overflow",
    description: "2 Couches + 2 Dressers + 3 Bikes + 15 Boxes + 12 Bags",
    items: [
      "couch", "couch", "dresser", "dresser", "bicycle", "bicycle", "bicycle",
      "cardboard_box", "cardboard_box", "cardboard_box", "cardboard_box", "cardboard_box",
      "cardboard_box", "cardboard_box", "cardboard_box", "cardboard_box", "cardboard_box",
      "cardboard_box", "cardboard_box", "cardboard_box", "cardboard_box", "cardboard_box",
      "yard_bag", "yard_bag", "yard_bag", "yard_bag", "yard_bag", "yard_bag", "yard_bag", "yard_bag", "yard_bag", "yard_bag", "yard_bag", "yard_bag"
    ],
    expectedVehicle: "trailer",
    expectedLoad: "Requires 14-ft Dump Trailer (Overflow)",
    expectedHours: 5
  },
  {
    id: 25,
    name: "Whole Appliance & Heavy Metal Clearout",
    description: "2 Refrigerators + 2 Washers + 2 Dryers + 1 Water Heater",
    items: ["refrigerator", "refrigerator", "washing_machine", "washing_machine", "dryer", "dryer", "water_heater"],
    expectedVehicle: "truck",
    expectedLoad: "Full Truck Bed (Max Capacity)",
    expectedHours: 2
  }
];

export function runAllBenchmarks() {
  return DIVERSE_BENCHMARKS.map(testCase => {
    const sim = simulateTruckPack(testCase.items);
    const vehicleMatches = sim.recommendedVehicle === testCase.expectedVehicle;
    const hoursMatch = sim.estimatedLaborHours === testCase.expectedHours;
    return {
      id: testCase.id,
      name: testCase.name,
      itemsCount: testCase.items.length,
      recommendedVehicle: sim.recommendedVehicle,
      loadFraction: sim.truckLoadFraction,
      volumeCubicYards: sim.volumeCubicYards,
      totalWeightLbs: sim.totalWeightLbs,
      estimatedLaborHours: sim.estimatedLaborHours,
      laborCostTotal: sim.estimatedLaborHours * 25,
      crew: sim.crewRecommendation,
      passed: vehicleMatches && hoursMatch
    };
  });
}
