import { VehiclePreview, FaqItem } from '../types';

// Real decode data, used as sample/preview content for this preview page.
export const FORD_FUSION_SAMPLE: VehiclePreview = {
  id: 'ford-fusion-2017',
  vin: '3FA6P0HD8HR352953',
  year: 2017,
  make: 'Ford',
  model: 'Fusion',
  fullName: '2017 Ford Fusion SE',
  photoUrl: 'https://vhr.nyc3.cdn.digitaloceanspaces.com/vehiclemedia/gallery/2017/ford/fusion/se-4dr-front-wheel-drive-sedan-automatic/ext-3231303031.jpg',
  auctionListing: {
    imageUrl: 'https://images.bid.cars/045150769_6a116f9019f1e/2017-Ford-Fusion-3FA6P0HD8HR352953-1.jpg',
    totalImages: 10,
  },
  auctionImages: [
    'https://vhr.nyc3.cdn.digitaloceanspaces.com/sales-history/2017/Ford/Fusion-15L/3FA6P0HD8HR352953/05/23/2026/13/6a116ff124b87e939ba53d8c-0-0.jpg',
    'https://vhr.nyc3.cdn.digitaloceanspaces.com/sales-history/2017/Ford/Fusion-15L/3FA6P0HD8HR352953/05/23/2026/13/6a116ff124b87e939ba53d8c-0-1.jpg',
    'https://vhr.nyc3.cdn.digitaloceanspaces.com/sales-history/2017/Ford/Fusion-15L/3FA6P0HD8HR352953/05/23/2026/13/6a116ff124b87e939ba53d8c-0-2.jpg',
    'https://vhr.nyc3.cdn.digitaloceanspaces.com/sales-history/2017/Ford/Fusion-15L/3FA6P0HD8HR352953/05/23/2026/13/6a116ff124b87e939ba53d8c-0-3.jpg',
    'https://vhr.nyc3.cdn.digitaloceanspaces.com/sales-history/2017/Ford/Fusion-15L/3FA6P0HD8HR352953/05/23/2026/13/6a116ff124b87e939ba53d8c-0-4.jpg',
    'https://vhr.nyc3.cdn.digitaloceanspaces.com/sales-history/2017/Ford/Fusion-15L/3FA6P0HD8HR352953/05/23/2026/13/6a116ff124b87e939ba53d8c-0-5.jpg',
    'https://vhr.nyc3.cdn.digitaloceanspaces.com/sales-history/2017/Ford/Fusion-15L/3FA6P0HD8HR352953/05/23/2026/13/6a116ff124b87e939ba53d8c-0-6.jpg',
    'https://vhr.nyc3.cdn.digitaloceanspaces.com/sales-history/2017/Ford/Fusion-15L/3FA6P0HD8HR352953/05/23/2026/13/6a116ff124b87e939ba53d8c-0-7.jpg',
    'https://vhr.nyc3.cdn.digitaloceanspaces.com/sales-history/2017/Ford/Fusion-15L/3FA6P0HD8HR352953/05/23/2026/13/6a116ff124b87e939ba53d8c-0-8.jpg',
    'https://vhr.nyc3.cdn.digitaloceanspaces.com/sales-history/2017/Ford/Fusion-15L/3FA6P0HD8HR352953/05/23/2026/13/6a116ff124b87e939ba53d8c-0-9.jpg',
  ],
  exteriorImages: [
    'https://vhr.nyc3.cdn.digitaloceanspaces.com/vehiclemedia/gallery/2017/ford/fusion/se-4dr-front-wheel-drive-sedan-automatic/ext-3231303031.jpg',
    'https://vhr.nyc3.cdn.digitaloceanspaces.com/vehiclemedia/gallery/2017/ford/fusion/se-4dr-front-wheel-drive-sedan-automatic/ext-3231303032.jpg',
    'https://vhr.nyc3.cdn.digitaloceanspaces.com/vehiclemedia/gallery/2017/ford/fusion/se-4dr-front-wheel-drive-sedan-automatic/ext-3231303033.jpg',
    'https://vhr.nyc3.cdn.digitaloceanspaces.com/vehiclemedia/gallery/2017/ford/fusion/se-4dr-front-wheel-drive-sedan-automatic/ext-3231303035.jpg',
    'https://vhr.nyc3.cdn.digitaloceanspaces.com/vehiclemedia/gallery/2017/ford/fusion/se-4dr-front-wheel-drive-sedan-automatic/ext-3231303036.jpg',
    'https://vhr.nyc3.cdn.digitaloceanspaces.com/vehiclemedia/gallery/2017/ford/fusion/se-4dr-front-wheel-drive-sedan-automatic/ext-3231303231.jpg',
    'https://vhr.nyc3.cdn.digitaloceanspaces.com/vehiclemedia/gallery/2017/ford/fusion/se-4dr-front-wheel-drive-sedan-automatic/ext-3231303234.jpg',
    'https://vhr.nyc3.cdn.digitaloceanspaces.com/vehiclemedia/gallery/2017/ford/fusion/se-4dr-front-wheel-drive-sedan-automatic/ext-3231303235.jpg',
  ],
  interiorImages: [
    'https://vhr.nyc3.cdn.digitaloceanspaces.com/vehiclemedia/gallery/2017/ford/fusion/se-4dr-front-wheel-drive-sedan-automatic/int-3031333530.jpg',
    'https://vhr.nyc3.cdn.digitaloceanspaces.com/vehiclemedia/gallery/2017/ford/fusion/se-4dr-front-wheel-drive-sedan-automatic/int-3231303131.jpg',
    'https://vhr.nyc3.cdn.digitaloceanspaces.com/vehiclemedia/gallery/2017/ford/fusion/se-4dr-front-wheel-drive-sedan-automatic/int-3231303132.jpg',
    'https://vhr.nyc3.cdn.digitaloceanspaces.com/vehiclemedia/gallery/2017/ford/fusion/se-4dr-front-wheel-drive-sedan-automatic/int-3231303133.jpg',
    'https://vhr.nyc3.cdn.digitaloceanspaces.com/vehiclemedia/gallery/2017/ford/fusion/se-4dr-front-wheel-drive-sedan-automatic/int-3231303138.jpg',
    'https://vhr.nyc3.cdn.digitaloceanspaces.com/vehiclemedia/gallery/2017/ford/fusion/se-4dr-front-wheel-drive-sedan-automatic/int-3231303238.jpg',
    'https://vhr.nyc3.cdn.digitaloceanspaces.com/vehiclemedia/gallery/2017/ford/fusion/se-4dr-front-wheel-drive-sedan-automatic/int-3231303434.jpg',
  ],
  auctionDetails: {
    auctionDate: '05-26-2026',
    location: 'Elkton (MD)',
    odometer: '146,032 mi',
    primaryDamage: 'Normal wear / tear',
  },
  colorOptions: [
    { hex: '#0a0a0c', name: 'Shadow Black' },
    { hex: '#a7a38e', name: 'White Gold' },
    { hex: '#454744', name: 'Magnetic' },
    { hex: '#163153', name: 'Lightning Blue' },
    { hex: '#a1a1a1', name: 'Ingot Silver' },
    { hex: '#e7e7e5', name: 'Oxford White' },
    { hex: '#300205', name: 'Burgundy Velvet Metallic Tinted Clearcoat' },
    { hex: '#570512', name: 'Ruby Red Metallic Tinted Clearcoat' },
    { hex: '#edeee8', name: 'White Platinum Metallic Tri-Coat' },
  ],
  statusType: 'rich',
  specs: {
    trim: 'SE FWD',
    engine: '1.5L I-4 DOHC 16V Turbo',
    fuel: 'Gasoline',
    drive: 'Front-Wheel Drive (FWD)',
    transmission: 'Automatic',
    body: '4-Door Sedan',
    doors: '4',
    country: 'Mexico (Hermosillo)',
  },
  openRecallsCount: 0,
  recallsSummary: [],
  marketValueLow: 6646,
  marketValueHigh: 8314,
  nextMaintenance: 'Serpentine Belt & Water Pump Inspection',
  nextMaintenanceMiles: 150000,
  historyRecordsCount: 32,
  historyCategories: ['Auction Records', 'Title History', 'Odometer Reading'],
  titleBrandsCount: 0,
  accidentCount: 0,
  decodedSource: 'NHTSA Official Database',
  savedToGarage: false
};

export const JEEP_CHEROKEE_SAMPLE: VehiclePreview = {
  id: 'jeep-cherokee-2019',
  vin: '1C4RJEAG2KC823978',
  year: 2019,
  make: 'Jeep',
  model: 'Cherokee',
  fullName: '2019 Jeep Cherokee Latitude',
  photoUrl: 'https://vhr.nyc3.cdn.digitaloceanspaces.com/vehiclemedia/gallery/2019/jeep/cherokee/latitude-4dr-front-wheel-drive-automatic/ext-3030315f33.jpg',
  // No auction/sales-history record for this vehicle — falls back to the exterior/interior photo slider.
  exteriorImages: [
    'https://vhr.nyc3.cdn.digitaloceanspaces.com/vehiclemedia/gallery/2019/jeep/cherokee/latitude-4dr-front-wheel-drive-automatic/ext-3030315f33.jpg',
    'https://vhr.nyc3.cdn.digitaloceanspaces.com/vehiclemedia/gallery/2019/jeep/cherokee/latitude-4dr-front-wheel-drive-automatic/ext-3030325f33.jpg',
    'https://vhr.nyc3.cdn.digitaloceanspaces.com/vehiclemedia/gallery/2019/jeep/cherokee/latitude-4dr-front-wheel-drive-automatic/ext-3030335f33.jpg',
    'https://vhr.nyc3.cdn.digitaloceanspaces.com/vehiclemedia/gallery/2019/jeep/cherokee/latitude-4dr-front-wheel-drive-automatic/ext-3030355f33.jpg',
    'https://vhr.nyc3.cdn.digitaloceanspaces.com/vehiclemedia/gallery/2019/jeep/cherokee/latitude-4dr-front-wheel-drive-automatic/ext-3030365f33.jpg',
    'https://vhr.nyc3.cdn.digitaloceanspaces.com/vehiclemedia/gallery/2019/jeep/cherokee/latitude-4dr-front-wheel-drive-automatic/ext-3030375f33.jpg',
    'https://vhr.nyc3.cdn.digitaloceanspaces.com/vehiclemedia/gallery/2019/jeep/cherokee/latitude-4dr-front-wheel-drive-automatic/ext-3030385f33.jpg',
    'https://vhr.nyc3.cdn.digitaloceanspaces.com/vehiclemedia/gallery/2019/jeep/cherokee/latitude-4dr-front-wheel-drive-automatic/ext-3030395f33.jpg',
    'https://vhr.nyc3.cdn.digitaloceanspaces.com/vehiclemedia/gallery/2019/jeep/cherokee/latitude-4dr-front-wheel-drive-automatic/ext-3031315f33.jpg',
    'https://vhr.nyc3.cdn.digitaloceanspaces.com/vehiclemedia/gallery/2019/jeep/cherokee/latitude-4dr-front-wheel-drive-automatic/ext-3031325f33.jpg',
    'https://vhr.nyc3.cdn.digitaloceanspaces.com/vehiclemedia/gallery/2019/jeep/cherokee/latitude-4dr-front-wheel-drive-automatic/ext-3031335f33.jpg',
    'https://vhr.nyc3.cdn.digitaloceanspaces.com/vehiclemedia/gallery/2019/jeep/cherokee/latitude-4dr-front-wheel-drive-automatic/ext-3031385f33.jpg',
    'https://vhr.nyc3.cdn.digitaloceanspaces.com/vehiclemedia/gallery/2019/jeep/cherokee/latitude-4dr-front-wheel-drive-automatic/ext-3032345f33.jpg',
    'https://vhr.nyc3.cdn.digitaloceanspaces.com/vehiclemedia/gallery/2019/jeep/cherokee/latitude-4dr-front-wheel-drive-automatic/ext-3032355f33.jpg',
    'https://vhr.nyc3.cdn.digitaloceanspaces.com/vehiclemedia/gallery/2019/jeep/cherokee/latitude-4dr-front-wheel-drive-automatic/ext-3032385f33.jpg',
    'https://vhr.nyc3.cdn.digitaloceanspaces.com/vehiclemedia/gallery/2019/jeep/cherokee/latitude-4dr-front-wheel-drive-automatic/ext-3034335f33.jpg',
    'https://vhr.nyc3.cdn.digitaloceanspaces.com/vehiclemedia/gallery/2019/jeep/cherokee/latitude-4dr-front-wheel-drive-automatic/ext-3034345f33.jpg',
    'https://vhr.nyc3.cdn.digitaloceanspaces.com/vehiclemedia/gallery/2019/jeep/cherokee/latitude-4dr-front-wheel-drive-automatic/ext-3231303231.jpg',
  ],
  interiorImages: [
    'https://vhr.nyc3.cdn.digitaloceanspaces.com/vehiclemedia/gallery/2019/jeep/cherokee/latitude-4dr-front-wheel-drive-automatic/int-3031315f33.jpg',
    'https://vhr.nyc3.cdn.digitaloceanspaces.com/vehiclemedia/gallery/2019/jeep/cherokee/latitude-4dr-front-wheel-drive-automatic/int-3031325f33.jpg',
    'https://vhr.nyc3.cdn.digitaloceanspaces.com/vehiclemedia/gallery/2019/jeep/cherokee/latitude-4dr-front-wheel-drive-automatic/int-3031333530.jpg',
    'https://vhr.nyc3.cdn.digitaloceanspaces.com/vehiclemedia/gallery/2019/jeep/cherokee/latitude-4dr-front-wheel-drive-automatic/int-3031333531.jpg',
    'https://vhr.nyc3.cdn.digitaloceanspaces.com/vehiclemedia/gallery/2019/jeep/cherokee/latitude-4dr-front-wheel-drive-automatic/int-3031333533.jpg',
    'https://vhr.nyc3.cdn.digitaloceanspaces.com/vehiclemedia/gallery/2019/jeep/cherokee/latitude-4dr-front-wheel-drive-automatic/int-3031335f33.jpg',
    'https://vhr.nyc3.cdn.digitaloceanspaces.com/vehiclemedia/gallery/2019/jeep/cherokee/latitude-4dr-front-wheel-drive-automatic/int-3031385f33.jpg',
    'https://vhr.nyc3.cdn.digitaloceanspaces.com/vehiclemedia/gallery/2019/jeep/cherokee/latitude-4dr-front-wheel-drive-automatic/int-3032385f33.jpg',
    'https://vhr.nyc3.cdn.digitaloceanspaces.com/vehiclemedia/gallery/2019/jeep/cherokee/latitude-4dr-front-wheel-drive-automatic/int-3034345f33.jpg',
  ],
  colorOptions: [
    { hex: '#828688', name: 'Billet Silver Metallic Clearcoat' },
    { hex: '#343f46', name: 'Blue Shade Pearlcoat' },
    { hex: '#e5e9e5', name: 'Bright White Clearcoat' },
    { hex: '#0b0b0b', name: 'Diamond Black Crystal Pearlcoat' },
    { hex: '#81776b', name: 'Light Brownstone Pearlcoat' },
    { hex: '#383b2f', name: 'Olive Green Pearlcoat' },
    { hex: '#31010d', name: 'Velvet Red Pearlcoat' },
  ],
  statusType: 'negative_flag',
  specs: {
    trim: 'Latitude 4x2',
    engine: '3.6L V-6',
    fuel: 'Gasoline',
    drive: 'Two-Wheel Drive (4x2)',
    transmission: 'Automatic',
    body: 'SUV / Multi-Purpose Vehicle',
    doors: '4',
    country: 'United States (Detroit, MI)',
  },
  openRecallsCount: 0,
  recallsSummary: [],
  marketValueLow: 10828,
  marketValueHigh: 13058,
  nextMaintenance: 'Accessory Belt & Water Pump Inspection',
  nextMaintenanceMiles: 90000,
  historyRecordsCount: 38,
  historyCategories: ['Salvage Auction', 'Rebuilt Title Brand', 'Accident Report'],
  titleBrandsCount: 1,
  accidentCount: 1,
  decodedSource: 'NHTSA + National Salvage Auction Database',
  savedToGarage: false
};

export const SAMPLE_VEHICLES: VehiclePreview[] = [FORD_FUSION_SAMPLE, JEEP_CHEROKEE_SAMPLE];

export const PRICING = {
  HISTORY_REPORT: {
    price: '$19.99',
    amount: 19.99,
    label: 'Get History Report — $19.99',
    shortLabel: 'History Report $19.99',
  },
  WINDOW_STICKER: {
    price: '$19.99',
    addonPrice: '$9.99',
    amount: 19.99,
    addonAmount: 9.99,
    label: 'Get Window Sticker — $19.99',
    addonLabel: 'Add Sticker +$9.99',
  },
  BUNDLE: {
    price: '$29.98',
    amount: 29.98,
    originalPrice: '$39.98',
    savings: '$10.00',
    discountPercent: '25%',
    label: 'Get Report + Sticker Bundle — $29.98',
  },
  CARFAX_COMPARISON: {
    carfaxPrice: '$44.99',
    ourPrice: '$19.99',
    savingsPercent: '55%',
  }
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What is included in this free vehicle preview?",
    answer: "This free preview decodes your vehicle's VIN to reveal core manufacturer specifications—including engine type, horsepower, transmission, drivetrain, exterior/interior dimensions, fuel economy ratings, standard equipment baseline, and open recall alerts."
  },
  {
    question: "What does the full Vehicle History Report reveal?",
    answer: "Our full report checks nationwide NMVTIS title records, state DMVs, insurance total loss databases, and police records. It uncovers accident and damage history, salvage or flood brands, frame damage checks, odometer rollback flags, ownership changes, service records, and open lien or theft records."
  },
  {
    question: "What is the Original Window Sticker and how does it help?",
    answer: "The Original Window Sticker is an authentic reproduction of the original factory Monroney label. It reveals the exact original MSRP, standard factory equipment, option packages, exterior/interior paint color codes, and port-installed accessories as delivered new from the manufacturer."
  },
  {
    question: "How much do the full history report and window sticker cost?",
    answer: "A complete Vehicle History Report is $19.99 (over 55% less than Carfax's $44.99). The Original Window Sticker is $19.99 standalone or $9.99 as an add-on. You can also bundle both for $29.98 ($10 total discount) with zero recurring subscriptions or hidden fees."
  },
  {
    question: "How quickly will I receive my reports after ordering?",
    answer: "Instantly. As soon as your order is confirmed, your full Vehicle History Report and Window Sticker are immediately displayed on screen and available for high-resolution PDF download. A permanent backup link is also sent straight to your email."
  },
  {
    question: "Where does this vehicle data come from and how accurate is it?",
    answer: "Our data is compiled in real-time from official government agencies including NMVTIS (National Motor Vehicle Title Information System), NHTSA, state DMVs, insurance carriers, auto salvage auctions, collision repair facilities, and direct OEM automaker build sheets."
  },
  {
    question: "What is My Garage and is it free to use?",
    answer: "Yes, My Garage is 100% free forever. It lets you save this vehicle and any others to track market valuation trends, receive automatic safety recall notifications, monitor recommended service schedules, and access your decoded specs anytime."
  },
  {
    question: "Is my personal data and search history kept confidential?",
    answer: "Strictly confidential. We respect your privacy and never sell your personal contact details, email address, or search queries to third-party dealerships, insurance brokers, or advertising networks."
  }
];


export const GARAGE_BENEFITS = [
  { label: 'Unlimited VIN & plate lookups', icon: 'Search' },
  { label: 'Save vehicles permanently to My Garage', icon: 'Bookmark' },
  { label: 'Complete technical decode data & specs', icon: 'Cpu' },
  { label: 'Automatic safety recall alerts', icon: 'AlertTriangle' },
  { label: 'Recommended maintenance schedule tracking', icon: 'Wrench' },
  { label: 'Live market value monitoring & depreciation', icon: 'TrendingUp' },
  { label: 'Original window stickers when available', icon: 'FileText' },
  { label: 'Full history reports accessible anytime', icon: 'ShieldCheck' },
];
