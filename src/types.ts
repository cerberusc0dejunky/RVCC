export interface ScrapItem {
  id: string;
  label: string;
  icon: string;
  category: 'appliance' | 'metal' | 'structure' | 'other';
}

export interface PickupRequest {
  ticketNumber: string;
  createdAt: string;
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  zipCode: string;
  locationOnProperty: string;
  preferredDate: string;
  preferredTimeWindow: 'morning' | 'afternoon' | 'anytime';
  selectedItems: { [id: string]: number }; // item id -> quantity or 1 for checked
  customItemDescription?: string;
  estimatedLoadSize: 'small' | 'medium' | 'large_trailer';
  specialInstructions: string;
  dispatchEmail: string;
  
  // Custom cleanup and cost calculations added for general cleanup service
  serviceType: 'scrap' | 'cleanup';
  distanceMiles: number;
  isUncovered: boolean;
  wasteType: 'trash' | 'yard' | 'special' | 'none';
  estimatedWeightTons: number;
  isResidentFLAT: boolean;
  truckMpg: number;
  gasPricePerGallon: number;
  baseLaborRate: number;
  calculatedGasCost: number;
  calculatedDumpFee: number;
  calculatedLaborFee: number;
  calculatedTotal: number;
}

export const SCRAP_ITEMS_CATALOG: ScrapItem[] = [
  { id: 'refrigerator', label: 'Refrigerator / Freezer', icon: 'Refrigerator', category: 'appliance' },
  { id: 'washer', label: 'Washing Machine', icon: 'WashingMachine', category: 'appliance' },
  { id: 'dryer', label: 'Clothes Dryer', icon: 'Wind', category: 'appliance' },
  { id: 'oven', label: 'Stove / Oven / Range', icon: 'Flame', category: 'appliance' },
  { id: 'dishwasher', label: 'Dishwasher', icon: 'Droplets', category: 'appliance' },
  { id: 'water_heater', label: 'Water Heater / Tank', icon: 'Gauge', category: 'appliance' },
  { id: 'ac_unit', label: 'A/C Unit / HVAC', icon: 'Snowflake', category: 'appliance' },
  { id: 'microwave', label: 'Microwave / Small Appliances', icon: 'Zap', category: 'appliance' },
  { id: 'grill_mower', label: 'BBQ Grill / Lawnmower', icon: 'Wrench', category: 'metal' },
  { id: 'random_metal', label: 'Random Scrap Metal / Pipes', icon: 'Anvil', category: 'metal' },
  { id: 'shed_structure', label: 'Old Shed / Metal Structure', icon: 'Home', category: 'structure' },
  { id: 'other', label: 'Other Metal Items', icon: 'Box', category: 'other' }
];
