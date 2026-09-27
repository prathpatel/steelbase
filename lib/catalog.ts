// Catalogue data. Prices and specs are indicative placeholders — replace them with
// confirmed manufacturer figures before taking orders.

export type TierId = "core" | "pro" | "build";

export type Tier = {
  id: TierId;
  number: string;
  name: string;
  range: string;
  title: string;
  summary: string;
  href: string;
  cta: string;
};

export const tiers: Tier[] = [
  {
    id: "core",
    number: "01",
    name: "Core",
    range: "₹25k – ₹50k",
    title: "Home & starter equipment",
    summary:
      "The pieces every serious home setup starts with. Dumbbells, benches, racks and cardio — sized for a spare room, built to be used daily.",
    href: "/equipment?tier=core",
    cta: "Shop Core",
  },
  {
    id: "pro",
    number: "02",
    name: "Pro",
    range: "₹1L – ₹2L",
    title: "Commercial-grade machines",
    summary:
      "Heavier frames, bigger stacks and cardio built for hours of use a day. For studios, trainers and home gyms that want the real thing.",
    href: "/equipment?tier=pro",
    cta: "Shop Pro",
  },
  {
    id: "build",
    number: "03",
    name: "Build",
    range: "Custom quote",
    title: "Complete gym setups",
    summary:
      "Home, corporate, commercial, society, hotel or studio. We plan the equipment list around your floor and budget, then coordinate delivery and installation.",
    href: "/setups",
    cta: "Plan a setup",
  },
];

export const categories = ["Free weights", "Racks & machines", "Benches", "Cardio"] as const;
export type Category = (typeof categories)[number];

export type DrawingKind =
  | "adjustable-dumbbells"
  | "bench"
  | "barbell-set"
  | "half-rack"
  | "spin-bike"
  | "kettlebells"
  | "power-rack"
  | "functional-trainer"
  | "smith-machine"
  | "treadmill"
  | "leg-press"
  | "dumbbell-rack";

export type Product = {
  slug: string;
  code: string;
  name: string;
  tier: Exclude<TierId, "build">;
  category: Category;
  price: number;
  callout: string;
  summary: string;
  highlights: string[];
  specs: [string, string][];
  idealFor: string[];
  drawing: DrawingKind;
};

export const products: Product[] = [
  // Tier 01 — Core
  {
    slug: "adjustable-dumbbells-24",
    code: "SB-C01",
    name: "Adjustable Dumbbells 24",
    tier: "core",
    category: "Free weights",
    price: 34900,
    callout: "2.5 – 24 kg / pair",
    summary: "A full dumbbell rack in the footprint of two. Dial the weight, lift, put it back in the tray.",
    highlights: [
      "Quick-select dial changes weight in seconds",
      "Replaces 15 pairs of fixed dumbbells",
      "Steel plates with moulded trays",
    ],
    specs: [
      ["Weight range", "2.5 – 24 kg per dumbbell"],
      ["Increments", "15 settings"],
      ["Handle", "Knurled steel, rubber-lined"],
      ["Includes", "Pair + storage trays"],
    ],
    idealFor: ["Home gym", "Apartments", "Hotel rooms"],
    drawing: "adjustable-dumbbells",
  },
  {
    slug: "adjustable-bench-fid",
    code: "SB-C02",
    name: "Adjustable Bench FID",
    tier: "core",
    category: "Benches",
    price: 26500,
    callout: "Flat / incline / decline",
    summary: "One bench, every angle. Press, row, curl and step up from a single stable frame.",
    highlights: [
      "Flat, incline and decline positions",
      "Heavy-gauge steel frame with wheels",
      "Dense foam pads with grip-finish cover",
    ],
    specs: [
      ["Back positions", "7 (decline to 85°)"],
      ["Seat positions", "3"],
      ["Max user load", "300 kg (typical)"],
      ["Frame", "Powder-coated steel"],
    ],
    idealFor: ["Home gym", "PT studio"],
    drawing: "bench",
  },
  {
    slug: "olympic-barbell-set-100",
    code: "SB-C03",
    name: "Olympic Barbell Set 100",
    tier: "core",
    category: "Free weights",
    price: 42000,
    callout: "20 kg bar + 100 kg plates",
    summary: "A 7 ft Olympic bar with a full set of rubber plates. Squat, bench, deadlift — the whole program.",
    highlights: [
      "7 ft, 20 kg Olympic bar with rotating sleeves",
      "100 kg of rubber-coated plates",
      "Spring collars included",
    ],
    specs: [
      ["Bar", "2.2 m / 20 kg / 50 mm sleeves"],
      ["Plates", "2×20, 2×15, 2×10, 2×5 kg"],
      ["Plate finish", "Rubber-coated"],
      ["Collars", "Spring clip, pair"],
    ],
    idealFor: ["Home gym", "Garage gym", "Studios"],
    drawing: "barbell-set",
  },
  {
    slug: "half-rack-hr1",
    code: "SB-C04",
    name: "Half Rack HR1",
    tier: "core",
    category: "Racks & machines",
    price: 48500,
    callout: "Pull-up bar + J-hooks",
    summary: "The centre of a home strength setup. Squat, press and pull up safely — without the footprint of a full cage.",
    highlights: [
      "Adjustable J-hooks and safety arms",
      "Multi-grip pull-up bar",
      "Plate storage pegs on the rear",
    ],
    specs: [
      ["Uprights", "60 × 60 mm steel"],
      ["Height", "~2.1 m"],
      ["Footprint", "~1.2 × 1.4 m"],
      ["Rated load", "300 kg (typical)"],
    ],
    idealFor: ["Home gym", "Garage gym"],
    drawing: "half-rack",
  },
  {
    slug: "spin-bike-s1",
    code: "SB-C05",
    name: "Spin Bike S1",
    tier: "core",
    category: "Cardio",
    price: 29900,
    callout: "Magnetic resistance",
    summary: "Quiet, smooth and adjustable. A studio-style bike for daily cardio at home.",
    highlights: [
      "Magnetic resistance — near-silent",
      "Heavy flywheel for a smooth ride",
      "Adjustable seat and handlebars",
    ],
    specs: [
      ["Resistance", "Magnetic, stepless"],
      ["Flywheel", "~13 kg"],
      ["Display", "Time, speed, distance, calories"],
      ["Max user", "130 kg (typical)"],
    ],
    idealFor: ["Home gym", "Apartments", "Corporate"],
    drawing: "spin-bike",
  },
  {
    slug: "kettlebell-set-5",
    code: "SB-C06",
    name: "Kettlebell Set",
    tier: "core",
    category: "Free weights",
    price: 27500,
    callout: "8 · 12 · 16 · 20 · 24 kg",
    summary: "Five cast-iron kettlebells covering swings, carries, presses and conditioning work.",
    highlights: [
      "Cast iron with a single-piece body",
      "Wide handles for two-hand work",
      "Flat base for stable storage",
    ],
    specs: [
      ["Weights", "8, 12, 16, 20, 24 kg"],
      ["Material", "Cast iron"],
      ["Finish", "Powder coat"],
      ["Total", "80 kg"],
    ],
    idealFor: ["Home gym", "Functional studio"],
    drawing: "kettlebells",
  },

  // Tier 02 — Pro
  {
    slug: "power-rack-prx",
    code: "SB-P01",
    name: "Power Rack PRX",
    tier: "pro",
    category: "Racks & machines",
    price: 165000,
    callout: "Lat / low row + 90 kg stack",
    summary: "A full four-post cage with a selectorised lat pulldown and low row. A complete strength station in one frame.",
    highlights: [
      "Four-post cage with full-length safeties",
      "Lat pulldown and low row on a 90 kg stack",
      "Band pegs, plate storage and pull-up bar",
    ],
    specs: [
      ["Uprights", "75 × 75 mm, 3 mm wall"],
      ["Weight stack", "90 kg selectorised"],
      ["Height", "~2.3 m"],
      ["Footprint", "~1.8 × 1.6 m"],
    ],
    idealFor: ["Premium home gym", "PT studio", "Commercial"],
    drawing: "power-rack",
  },
  {
    slug: "functional-trainer-ft2",
    code: "SB-P02",
    name: "Functional Trainer FT2",
    tier: "pro",
    category: "Racks & machines",
    price: 185000,
    callout: "Dual 80 kg stacks",
    summary: "Two independent cable columns with adjustable pulleys. Hundreds of exercises from one machine.",
    highlights: [
      "Dual weight stacks, independently adjustable",
      "Full-height pulley carriages",
      "Integrated multi-grip pull-up bar",
    ],
    specs: [
      ["Weight stacks", "2 × 80 kg"],
      ["Pulley positions", "~20 per side"],
      ["Height", "~2.2 m"],
      ["Footprint", "~1.6 × 1.0 m"],
    ],
    idealFor: ["Corporate", "Hotel", "Commercial"],
    drawing: "functional-trainer",
  },
  {
    slug: "smith-machine-sm3",
    code: "SB-P03",
    name: "Smith Machine SM3",
    tier: "pro",
    category: "Racks & machines",
    price: 145000,
    callout: "Guided bar + safety stops",
    summary: "A guided bar path for heavy, controlled work — the safest way to train alone.",
    highlights: [
      "Linear bearings for a smooth bar path",
      "Rotating hooks with safety catches",
      "Adjustable stop bars",
    ],
    specs: [
      ["Bar weight", "~15 kg (counterbalanced)"],
      ["Guide rods", "Hard-chrome steel"],
      ["Height", "~2.2 m"],
      ["Rated load", "300 kg (typical)"],
    ],
    idealFor: ["Society gym", "Corporate", "Commercial"],
    drawing: "smith-machine",
  },
  {
    slug: "treadmill-c3",
    code: "SB-P04",
    name: "Commercial Treadmill C3",
    tier: "pro",
    category: "Cardio",
    price: 195000,
    callout: "3 HP AC motor",
    summary: "A continuous-duty AC motor and a wide cushioned deck, built for hours of use every day.",
    highlights: [
      "3 HP continuous-duty AC motor",
      "Wide belt with shock-absorbing deck",
      "Auto-incline and preset programs",
    ],
    specs: [
      ["Motor", "3 HP AC, continuous duty"],
      ["Speed", "1 – 20 km/h"],
      ["Incline", "0 – 15%"],
      ["Belt", "~560 × 1500 mm"],
    ],
    idealFor: ["Corporate", "Hotel", "Society gym", "Commercial"],
    drawing: "treadmill",
  },
  {
    slug: "leg-press-lp45",
    code: "SB-P05",
    name: "Leg Press LP45",
    tier: "pro",
    category: "Racks & machines",
    price: 135000,
    callout: "45° plate-loaded",
    summary: "A 45° sled for heavy lower-body work with far less load on the spine than a squat.",
    highlights: [
      "45° sled on linear bearings",
      "Large, angled footplate",
      "Adjustable back pad and safety stops",
    ],
    specs: [
      ["Angle", "45°"],
      ["Loading", "Plate-loaded, 4 horns"],
      ["Max load", "400 kg (typical)"],
      ["Footprint", "~2.2 × 1.6 m"],
    ],
    idealFor: ["PT studio", "Commercial"],
    drawing: "leg-press",
  },
  {
    slug: "dumbbell-set-rack-25",
    code: "SB-P06",
    name: "Dumbbell Set + Rack",
    tier: "pro",
    category: "Free weights",
    price: 110000,
    callout: "2.5 – 25 kg / 10 pairs",
    summary: "Ten pairs of rubber hex dumbbells on a two-tier rack. The backbone of any free-weight floor.",
    highlights: [
      "10 pairs, 2.5 – 25 kg in 2.5 kg steps",
      "Rubber hex heads — won't roll",
      "Two-tier steel rack included",
    ],
    specs: [
      ["Range", "2.5 – 25 kg, 10 pairs"],
      ["Total weight", "275 kg"],
      ["Heads", "Rubber hex"],
      ["Rack", "2-tier, powder-coated"],
    ],
    idealFor: ["Society gym", "Corporate", "Commercial"],
    drawing: "dumbbell-rack",
  },
];

export type Setup = {
  slug: string;
  name: string;
  headline: string;
  summary: string;
  area: string;
  budget: string;
  photo: string;
  zones: { name: string; items: string[] }[];
  starters: string[];
  considerations: string[];
};

// Budgets are typical ranges for planning conversations, not quotes.
export const setups: Setup[] = [
  {
    slug: "home",
    name: "Home gym",
    headline: "Your own gym. No waiting for the rack.",
    summary:
      "A spare room, a garage or a terrace — we plan a setup around the space you have and the way you actually train.",
    area: "150 – 500 sq ft",
    budget: "₹2L – ₹8L",
    photo: "hero",
    zones: [
      { name: "Strength", items: ["Half rack or power rack", "Adjustable bench", "Barbell + plate set"] },
      { name: "Free weights", items: ["Adjustable dumbbells or fixed set", "Kettlebells"] },
      { name: "Cardio", items: ["Spin bike or treadmill"] },
      { name: "Floor", items: ["Rubber flooring", "Mirror + storage"] },
    ],
    starters: ["half-rack-hr1", "adjustable-bench-fid", "olympic-barbell-set-100", "adjustable-dumbbells-24"],
    considerations: [
      "Ceiling height for pull-ups and overhead pressing",
      "Floor loading and protection for dropped weights",
      "Access — stairs, lifts and door widths for delivery",
    ],
  },
  {
    slug: "corporate",
    name: "Corporate gym",
    headline: "A gym your team actually uses.",
    summary:
      "Low-maintenance equipment that suits every fitness level, in a space that fits between meetings.",
    area: "500 – 2,000 sq ft",
    budget: "₹6L – ₹20L",
    photo: "gym",
    zones: [
      { name: "Cardio", items: ["Commercial treadmills", "Spin bikes"] },
      { name: "Strength", items: ["Functional trainer", "Smith machine", "Dumbbell set + rack"] },
      { name: "Functional", items: ["Kettlebells", "Mats and stretching area"] },
      { name: "Facilities", items: ["Rubber flooring", "Mirrors", "Storage"] },
    ],
    starters: ["treadmill-c3", "functional-trainer-ft2", "dumbbell-set-rack-25", "spin-bike-s1"],
    considerations: [
      "Equipment that is safe for beginners without a trainer",
      "Noise and vibration near workspaces",
      "Service and maintenance arrangements",
    ],
  },
  {
    slug: "commercial",
    name: "Commercial gym",
    headline: "A floor members want to train on.",
    summary:
      "Full strength, cardio and free-weight floors for gyms that open every day. Planned around member traffic, not a catalogue.",
    area: "2,500 sq ft +",
    budget: "₹25L +",
    photo: "gym",
    zones: [
      { name: "Strength floor", items: ["Power racks", "Smith machines", "Plate-loaded machines"] },
      { name: "Free weights", items: ["Dumbbell sets + racks", "Benches", "Olympic bars and plates"] },
      { name: "Cardio line", items: ["Commercial treadmills", "Bikes and cross-trainers"] },
      { name: "Functional", items: ["Functional trainers", "Kettlebells", "Turf and open space"] },
    ],
    starters: ["power-rack-prx", "leg-press-lp45", "dumbbell-set-rack-25", "treadmill-c3"],
    considerations: [
      "Layout for peak-hour member flow",
      "Commercial-duty ratings on every piece",
      "Phased purchasing if you're opening in stages",
    ],
  },
  {
    slug: "society",
    name: "Society & apartment gym",
    headline: "Built for every resident.",
    summary:
      "Durable, easy-to-use equipment for a shared residential space — from first-timers to regular lifters.",
    area: "600 – 1,500 sq ft",
    budget: "₹8L – ₹20L",
    photo: "hero",
    zones: [
      { name: "Cardio", items: ["Treadmills", "Spin bikes"] },
      { name: "Strength", items: ["Smith machine", "Functional trainer"] },
      { name: "Free weights", items: ["Dumbbell set + rack", "Adjustable benches"] },
      { name: "Facilities", items: ["Rubber flooring", "Mirrors", "Safety signage"] },
    ],
    starters: ["smith-machine-sm3", "treadmill-c3", "dumbbell-set-rack-25", "adjustable-bench-fid"],
    considerations: [
      "Equipment that's safe to use unsupervised",
      "Committee approval — we prepare a clear equipment list and quote",
      "Low-maintenance finishes for heavy shared use",
    ],
  },
  {
    slug: "hotel",
    name: "Hotel gym",
    headline: "Compact, premium, always ready.",
    summary:
      "A small, well-equipped room that guests are glad to find — cardio, cables and dumbbells in a tidy footprint.",
    area: "300 – 800 sq ft",
    budget: "₹5L – ₹12L",
    photo: "gym",
    zones: [
      { name: "Cardio", items: ["Commercial treadmill", "Spin bike"] },
      { name: "Strength", items: ["Functional trainer"] },
      { name: "Free weights", items: ["Dumbbell set + rack", "Adjustable bench"] },
    ],
    starters: ["treadmill-c3", "functional-trainer-ft2", "dumbbell-set-rack-25", "adjustable-bench-fid"],
    considerations: [
      "Premium finish that matches the property",
      "Quiet operation near guest rooms",
      "Minimal footprint per station",
    ],
  },
  {
    slug: "studio",
    name: "Strength & PT studio",
    headline: "Focused space for focused work.",
    summary:
      "Racks, platforms, sleds and cables for personal-training and strength studios where every square foot is programmed.",
    area: "1,000 – 3,000 sq ft",
    budget: "₹10L – ₹30L",
    photo: "fabrication",
    zones: [
      { name: "Racks", items: ["Power racks", "Half racks", "Platforms"] },
      { name: "Free weights", items: ["Olympic bars and plates", "Dumbbell set + rack", "Kettlebells"] },
      { name: "Machines", items: ["Functional trainer", "Leg press"] },
      { name: "Conditioning", items: ["Spin bikes", "Open turf"] },
    ],
    starters: ["power-rack-prx", "olympic-barbell-set-100", "leg-press-lp45", "kettlebell-set-5"],
    considerations: [
      "Rack count for your busiest class or session",
      "Heavy-duty flooring for dropped weights",
      "Room to grow as your client base does",
    ],
  },
];

export function getTier(id: TierId) {
  return tiers.find((t) => t.id === id)!;
}

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getSetup(slug: string) {
  return setups.find((s) => s.slug === slug);
}

export function formatPrice(value: number) {
  // Indian digit grouping (1,65,000), done by hand so server and browser always agree.
  const digits = String(Math.round(value));
  const last3 = digits.slice(-3);
  const rest = digits.slice(0, -3);
  return "₹" + (rest ? rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + last3 : last3);
}
