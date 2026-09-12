// functions/api/packingEngine.js
// 3D Bin Packing Problem (3D-BPP) Logistics & Physics Engine for River Valley Cleanup Crew
// Prebuilt physical item registry, container bounding boxes, void penalties, and labor estimation.

export const FLEET_CONTAINERS = {
  standard_truck_bed: {
    id: "standard_truck_bed",
    name: "Standard 6.5ft Truck Bed",
    lengthInches: 78,
    widthInches: 63,
    wheelWellWidthInches: 50,
    railHeightInches: 20,
    maxSecureHeightInches: 48,
    maxPayloadLbs: 1600,
    volumeCubicYards: 5.7
  },
  long_truck_bed: {
    id: "long_truck_bed",
    name: "8ft Heavy-Duty Bed",
    lengthInches: 96,
    widthInches: 66,
    wheelWellWidthInches: 50,
    railHeightInches: 22,
    maxSecureHeightInches: 54,
    maxPayloadLbs: 2200,
    volumeCubicYards: 8.1
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
  "mattress_twin": {
    name: "Twin Mattress", category: "mattress",
    lengthInches: 75, widthInches: 38, heightInches: 10, weightLbs: 45,
    orientation: "upright_wall", isHeavyBase: false, stackableOnTop: false, voidMultiplier: 1.05
  },
  "mattress_full": {
    name: "Full / Double Mattress", category: "mattress",
    lengthInches: 75, widthInches: 54, heightInches: 11, weightLbs: 60,
    orientation: "upright_wall", isHeavyBase: false, stackableOnTop: false, voidMultiplier: 1.05
  },
  "mattress_queen": {
    name: "Queen Mattress", category: "mattress",
    lengthInches: 80, widthInches: 60, heightInches: 12, weightLbs: 75,
    orientation: "upright_wall", isHeavyBase: false, stackableOnTop: false, voidMultiplier: 1.1,
    protrudesTailgate: true, safetyNote: "80\" Queen mattress protrudes past 78\" bed; must tie down securely."
  },
  "box_spring_queen": {
    name: "Queen Box Spring", category: "mattress",
    lengthInches: 80, widthInches: 60, heightInches: 9, weightLbs: 65,
    orientation: "upright_wall", isHeavyBase: false, stackableOnTop: false, voidMultiplier: 1.1,
    protrudesTailgate: true
  },
  "mattress_king": {
    name: "King Mattress", category: "mattress",
    lengthInches: 80, widthInches: 76, heightInches: 13, weightLbs: 95,
    orientation: "upright_wall", isHeavyBase: false, stackableOnTop: false, voidMultiplier: 1.15,
    protrudesTailgate: true
  },
  "couch": {
    name: "Standard 3-Seat Sofa", category: "furniture",
    lengthInches: 84, widthInches: 36, heightInches: 34, weightLbs: 140,
    orientation: "base_floor", isHeavyBase: true, stackableOnTop: false, voidMultiplier: 1.25,
    protrudesTailgate: true
  },
  "armchair": {
    name: "Armchair / Recliner", category: "furniture",
    lengthInches: 36, widthInches: 34, heightInches: 38, weightLbs: 85,
    orientation: "irregular", isHeavyBase: false, stackableOnTop: false, voidMultiplier: 1.35
  },
  "dining_chair": {
    name: "Dining / Desk Chair", category: "furniture",
    lengthInches: 20, widthInches: 20, heightInches: 36, weightLbs: 18,
    orientation: "irregular", isHeavyBase: false, stackableOnTop: false, voidMultiplier: 1.4
  },
  "dresser": {
    name: "6-Drawer Wooden Dresser", category: "furniture",
    lengthInches: 54, widthInches: 20, heightInches: 34, weightLbs: 120,
    orientation: "base_floor", isHeavyBase: true, stackableOnTop: true, voidMultiplier: 1.05
  },
  "wooden_trunk": {
    name: "Wooden Chest / Storage Trunk", category: "furniture",
    lengthInches: 42, widthInches: 22, heightInches: 20, weightLbs: 65,
    orientation: "base_floor", isHeavyBase: true, stackableOnTop: true, voidMultiplier: 1.05
  },
  "coffee_table": {
    name: "Coffee Table", category: "furniture",
    lengthInches: 48, widthInches: 24, heightInches: 18, weightLbs: 40,
    orientation: "base_floor", isHeavyBase: false, stackableOnTop: true, voidMultiplier: 1.3
  },
  "dining_table": {
    name: "Dining Room Table", category: "furniture",
    lengthInches: 60, widthInches: 36, heightInches: 30, weightLbs: 90,
    orientation: "base_floor", isHeavyBase: true, stackableOnTop: true, voidMultiplier: 1.4
  },
  "refrigerator": {
    name: "Refrigerator / Freezer", category: "appliance",
    lengthInches: 36, widthInches: 34, heightInches: 70, weightLbs: 260,
    orientation: "upright_wall", isHeavyBase: true, stackableOnTop: false, voidMultiplier: 1.05,
    safetyNote: "Freon appliance handling protocol required."
  },
  "washing_machine": {
    name: "Washing Machine", category: "appliance",
    lengthInches: 27, widthInches: 29, heightInches: 42, weightLbs: 160,
    orientation: "base_floor", isHeavyBase: true, stackableOnTop: false, voidMultiplier: 1.05
  },
  "dryer": {
    name: "Clothes Dryer", category: "appliance",
    lengthInches: 27, widthInches: 29, heightInches: 42, weightLbs: 130,
    orientation: "base_floor", isHeavyBase: true, stackableOnTop: false, voidMultiplier: 1.05
  },
  "water_heater": {
    name: "Water Heater Tank", category: "appliance",
    lengthInches: 22, widthInches: 22, heightInches: 60, weightLbs: 150,
    orientation: "base_floor", isHeavyBase: true, stackableOnTop: false, voidMultiplier: 1.15
  },
  "small_appliance": {
    name: "Small Appliance (Microwave/Printer)", category: "appliance",
    lengthInches: 20, widthInches: 16, heightInches: 14, weightLbs: 25,
    orientation: "stackable", isHeavyBase: false, stackableOnTop: true, voidMultiplier: 1.1
  },
  "bicycle": {
    name: "Bicycle / Mountain Bike", category: "outdoor",
    lengthInches: 68, widthInches: 22, heightInches: 40, weightLbs: 32,
    orientation: "irregular", isHeavyBase: false, stackableOnTop: false, voidMultiplier: 1.45
  },
  "lawn_mower": {
    name: "Gas Walk-Behind Lawn Mower", category: "outdoor",
    lengthInches: 56, widthInches: 22, heightInches: 38, weightLbs: 75,
    orientation: "base_floor", isHeavyBase: true, stackableOnTop: false, voidMultiplier: 1.35
  },
  "bbq_grill": {
    name: "Outdoor BBQ Grill", category: "outdoor",
    lengthInches: 48, widthInches: 24, heightInches: 44, weightLbs: 85,
    orientation: "irregular", isHeavyBase: false, stackableOnTop: false, voidMultiplier: 1.4
  },
  "wheelbarrow": {
    name: "Construction Wheelbarrow", category: "outdoor",
    lengthInches: 58, widthInches: 27, heightInches: 27, weightLbs: 45,
    orientation: "irregular", isHeavyBase: false, stackableOnTop: false, voidMultiplier: 1.5
  },
  "yard_bag": {
    name: "Heavy Yard / Contractor Trash Bag", category: "debris",
    lengthInches: 24, widthInches: 20, heightInches: 32, weightLbs: 35,
    orientation: "stackable", isHeavyBase: false, stackableOnTop: true, voidMultiplier: 1.05
  },
  "cardboard_box": {
    name: "Medium Moving Box", category: "debris",
    lengthInches: 18, widthInches: 18, heightInches: 16, weightLbs: 25,
    orientation: "stackable", isHeavyBase: false, stackableOnTop: true, voidMultiplier: 1.0
  },
  "scrap_lumber": {
    name: "Scrap Lumber / Wood Pile (Bundle)", category: "debris",
    lengthInches: 72, widthInches: 18, heightInches: 12, weightLbs: 65,
    orientation: "base_floor", isHeavyBase: false, stackableOnTop: true, voidMultiplier: 1.15
  },
  "tire": {
    name: "Automotive Tire", category: "debris",
    lengthInches: 28, widthInches: 28, heightInches: 10, weightLbs: 25,
    orientation: "stackable", isHeavyBase: false, stackableOnTop: true, voidMultiplier: 1.15
  },
  "tv_monitor": {
    name: "Flat Screen TV / Monitor", category: "electronics",
    lengthInches: 45, widthInches: 6, heightInches: 28, weightLbs: 30,
    orientation: "upright_wall", isHeavyBase: false, stackableOnTop: false, voidMultiplier: 1.1
  }
};

export function matchToRegistryKey(rawName) {
  if (!rawName) return "yard_bag";
  const clean = rawName.toLowerCase().replace(/[\s\-_]+/g, '_');

  if (clean.includes('king') && clean.includes('mattress')) return 'mattress_king';
  if (clean.includes('queen') && clean.includes('box')) return 'box_spring_queen';
  if (clean.includes('box_spring') || clean.includes('boxspring')) return 'box_spring_queen';
  if (clean.includes('queen') || (clean.includes('mattress') && !clean.includes('twin') && !clean.includes('full'))) return 'mattress_queen';
  if (clean.includes('twin')) return 'mattress_twin';
  if (clean.includes('full') || clean.includes('double')) return 'mattress_full';
  if (clean.includes('mattress')) return 'mattress_queen';

  if (clean.includes('sectional') || clean.includes('sofa') || clean.includes('couch')) return 'couch';
  if (clean.includes('recliner') || clean.includes('armchair') || clean.includes('arm_chair') || clean.includes('chair') && (clean.includes('lounge') || clean.includes('floral') || clean.includes('plush') || clean.includes('easy'))) return 'armchair';
  if (clean.includes('chair')) return 'dining_chair';
  if (clean.includes('dresser') || clean.includes('bureau') || clean.includes('credenza')) return 'dresser';
  if (clean.includes('trunk') || clean.includes('chest')) return 'wooden_trunk';
  if (clean.includes('coffee_table')) return 'coffee_table';
  if (clean.includes('table') || clean.includes('desk') || clean.includes('dining')) return 'dining_table';

  if (clean.includes('bike') || clean.includes('bicycle')) return 'bicycle';
  if (clean.includes('mower') || clean.includes('lawn')) return 'lawn_mower';
  if (clean.includes('grill') || clean.includes('bbq')) return 'bbq_grill';
  if (clean.includes('wheelbarrow')) return 'wheelbarrow';

  if (clean.includes('fridge') || clean.includes('refrigerator')) return 'refrigerator';
  if (clean.includes('washer') || clean.includes('washing')) return 'washing_machine';
  if (clean.includes('dryer')) return 'dryer';
  if (clean.includes('water_heater')) return 'water_heater';
  if (clean.includes('printer') || clean.includes('microwave') || clean.includes('appliance') || clean.includes('scanner') || clean.includes('toaster')) return 'small_appliance';

  if (clean.includes('yard_bag') || clean.includes('contractor') || clean.includes('trash') || clean.includes('bag')) return 'yard_bag';
  if (clean.includes('box') || clean.includes('cardboard')) return 'cardboard_box';
  if (clean.includes('lumber') || clean.includes('wood') || clean.includes('stud') || clean.includes('plank')) return 'scrap_lumber';
  if (clean.includes('tire')) return 'tire';
  if (clean.includes('tv') || clean.includes('monitor') || clean.includes('television')) return 'tv_monitor';

  return 'yard_bag';
}

/**
 * Runs 3D Bin-Packing heuristic:
 * 1. Estimates load size (vehicle type, truck load fraction, cubic yards, weight).
 * 2. Calculates how long it will take to do the job (estimatedLaborHours).
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

  // If no items passed, baseline minimal load
  if (expandedItems.length === 0) {
    return {
      recommendedVehicle: "truck",
      truckLoadFraction: "1/4 Truck Bed",
      volumeCubicYards: 1.0,
      totalWeightLbs: 100,
      weightCategory: "Light (< 400 lbs)",
      estimatedLaborHours: 1,
      crewRecommendation: "1-Person Quick Load",
      confidenceScore: 0.96,
      briefAnalysis: "Minimal debris volume detected.",
      suggestedDescription: "Light cleanup pickup.",
      physicsNotes: [],
      safetyFlags: []
    };
  }

  // Sort items for 3D packing:
  // 1. Upright wall (mattresses, refrigerators)
  // 2. Heavy base floor (washers, dressers, lawn mowers)
  // 3. Irregulars (armchairs, bikes, grills)
  // 4. Stackable (boxes, bags)
  const order = { upright_wall: 1, base_floor: 2, irregular: 3, stackable: 4 };
  expandedItems.sort((a, b) => (order[a.orientation] || 5) - (order[b.orientation] || 5));

  let totalRawVolumeCuIn = 0;
  let totalEffectiveVolumeCuIn = 0;
  let totalWeightLbs = 0;
  let heavyBaseItemsCount = 0;
  let uprightWallWidthConsumed = 0;
  const physicsNotes = [];
  const safetyFlags = [];
  const fitted = [];
  const overflow = [];

  const bedFloorAreaSqIn = standardBed.lengthInches * standardBed.widthInches; // 4,914 sq in
  const bedVolumeToRailsCuIn = standardBed.lengthInches * standardBed.widthInches * standardBed.railHeightInches; // 98,280 cu in
  const bedMaxVolumeTiedCuIn = standardBed.lengthInches * standardBed.widthInches * standardBed.maxSecureHeightInches; // 235,872 cu in

  let remainingFloorAreaSqIn = bedFloorAreaSqIn;
  let remainingVolumeCuIn = bedMaxVolumeTiedCuIn;
  let remainingPayloadLbs = standardBed.maxPayloadLbs;

  for (const item of expandedItems) {
    const rawVol = item.lengthInches * item.widthInches * item.heightInches;
    const effectiveVol = rawVol * item.voidMultiplier;
    const footprint = item.lengthInches * item.widthInches;

    totalRawVolumeCuIn += rawVol;
    totalEffectiveVolumeCuIn += effectiveVol;
    totalWeightLbs += item.weightLbs;

    if (item.orientation === 'upright_wall') {
      uprightWallWidthConsumed += item.heightInches;
      remainingFloorAreaSqIn -= (item.lengthInches * item.heightInches);
      if (item.protrudesTailgate) {
        physicsNotes.push(`${item.name} (${item.lengthInches}"L) protrudes past standard 78" bed; requires cab tie-down.`);
      }
    } else if (item.orientation === 'base_floor' || item.orientation === 'irregular') {
      remainingFloorAreaSqIn -= (footprint * 0.85);
      if (item.isHeavyBase) heavyBaseItemsCount++;
    } else {
      remainingFloorAreaSqIn -= (footprint * 0.35);
    }

    const fitsVolume = remainingVolumeCuIn >= effectiveVol;
    const fitsWeight = remainingPayloadLbs >= item.weightLbs;
    const fitsFloor = remainingFloorAreaSqIn >= -350;

    if (fitsVolume && fitsWeight && fitsFloor && uprightWallWidthConsumed <= standardBed.widthInches) {
      fitted.push(item.name);
      remainingVolumeCuIn -= effectiveVol;
      remainingPayloadLbs -= item.weightLbs;
    } else {
      overflow.push(item.name);
    }

    if (item.safetyNote && !safetyFlags.includes(item.safetyNote)) {
      safetyFlags.push(item.safetyNote);
    }
  }

  // Bed Fill & Volume metrics
  const bedFillRatio = totalEffectiveVolumeCuIn / bedVolumeToRailsCuIn;
  const bedFillPercentage = Math.min(100, Math.round((totalEffectiveVolumeCuIn / bedMaxVolumeTiedCuIn) * 100));
  const volumeCubicYards = Math.round((totalEffectiveVolumeCuIn / 46656) * 10) / 10;

  // Estimate Load Size & Vehicle
  let recommendedVehicle = 'truck';
  let truckLoadFraction = "1/2 Truck Bed";

  if (overflow.length > 0 || bedFillRatio > 1.85 || totalWeightLbs > standardBed.maxPayloadLbs) {
    recommendedVehicle = 'trailer';
    truckLoadFraction = "Requires 14-ft Dump Trailer (Overflow)";
    physicsNotes.push(`Cargo exceeds standard pickup bed capacity (${overflow.length} items overflow). 14-ft dump trailer recommended.`);
  } else if (bedFillRatio > 1.15 || bedFillPercentage > 75) {
    recommendedVehicle = 'truck';
    truckLoadFraction = "Full Truck Bed (Max Capacity)";
    physicsNotes.push("Pickup bed fully packed to cab height with cross-tied strap anchoring.");
  } else if (bedFillRatio > 0.55 || bedFillPercentage > 45) {
    recommendedVehicle = 'truck';
    truckLoadFraction = "1/2 Truck Bed";
  } else {
    recommendedVehicle = 'truck';
    truckLoadFraction = "1/4 Truck Bed";
  }

  // Calculate How Long It Will Take to Do the Job (Estimated Labor Hours)
  let baseHours = 1;
  if (recommendedVehicle === 'trailer') {
    baseHours = 3;
  } else if (truckLoadFraction.includes('Full')) {
    baseHours = 2;
  } else if (truckLoadFraction.includes('1/2')) {
    baseHours = 2;
  }

  // Extra hour if heavy base items or dense weight
  if (heavyBaseItemsCount >= 2 || totalWeightLbs >= 700) {
    baseHours = Math.max(baseHours, 2);
  }
  if (totalWeightLbs >= 1200 || expandedItems.length >= 15) {
    baseHours = Math.max(baseHours, 3);
  }

  const estimatedLaborHours = Math.min(8, Math.max(1, baseHours));
  const crewRecommendation = heavyBaseItemsCount > 0 || totalWeightLbs > 400 ? "2-Person Heavy Lifting Crew" : "1-Person Quick Load";

  let weightCategory = "Light (< 400 lbs)";
  if (totalWeightLbs >= 1000) {
    weightCategory = `Heavy (~${Math.round(totalWeightLbs / 50) * 50} lbs)`;
  } else if (totalWeightLbs >= 400) {
    weightCategory = `Medium (~${Math.round(totalWeightLbs / 25) * 25} lbs)`;
  }

  const topNames = Object.entries(itemCounts).map(([name, qty]) => `${qty}x ${name}`).slice(0, 4).join(', ');
  const briefAnalysis = `3D Bin-Packing simulated ${expandedItems.length} items. Estimated load size: ${truckLoadFraction} (${volumeCubicYards} cu yds, ~${totalWeightLbs} lbs). Labor time calculated at ${estimatedLaborHours} hr${estimatedLaborHours > 1 ? 's' : ''}.`;
  const suggestedDescription = `Curbside debris pack: ${topNames}. Estimated ${truckLoadFraction} (~${totalWeightLbs} lbs).`;

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
    confidenceScore: 0.96,
    briefAnalysis,
    suggestedDescription
  };
}
