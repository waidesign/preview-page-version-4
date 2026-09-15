export type VehicleState = 
  | 'rich'
  | 'sparse'
  | 'negative_flag'
  | 'invalid'
  | 'loading'
  | 'returning_user';

export interface VehicleSpec {
  trim: string;
  engine: string;
  fuel: string;
  drive: string;
  transmission: string;
  body: string;
  doors: string;
  country: string;
}

export interface AuctionDetails {
  auctionDate: string;
  location: string;
  odometer: string;
  primaryDamage: string;
}

export interface AuctionListing {
  imageUrl: string;
  totalImages: number;
}

export interface ColorOption {
  hex: string;
  name: string;
}

export interface VehiclePreview {
  id: string;
  vin: string;
  plate?: string;
  plateState?: string;
  year: number;
  make: string;
  model: string;
  fullName: string;
  photoUrl: string;
  // The auction-site listing photo (e.g. bid.cars) — top priority for display when present.
  auctionListing?: AuctionListing;
  // Sales-history photos — shown when there's no auction listing photo (only the first is shown).
  auctionImages?: string[];
  // Shown as a left/right slider when there are no auction/sales-history photos.
  exteriorImages?: string[];
  interiorImages?: string[];
  auctionDetails?: AuctionDetails;
  // Factory exterior color options — shown as a swatch strip when there's no auction/sales-history record.
  colorOptions?: ColorOption[];
  statusType: VehicleState;
  specs: VehicleSpec;
  openRecallsCount: number;
  recallsSummary: string[];
  marketValueLow: number;
  marketValueHigh: number;
  nextMaintenance: string;
  nextMaintenanceMiles: number;
  historyRecordsCount: number;
  historyCategories: string[];
  titleBrandsCount: number;
  accidentCount: number;
  decodedSource: string;
  savedToGarage?: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface SavedGarageVehicle {
  id: string;
  vin: string;
  fullName: string;
  addedAt: string;
  mileage: number;
  estimatedValue: number;
  recallsCount: number;
  photoUrl: string;
}
