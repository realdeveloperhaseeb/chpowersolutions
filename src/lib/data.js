// ---------------------------------------------------------------------------
// DUMMY DATA for the UI phase. In Phase 2 this is replaced by MySQL queries.
// Shape mirrors the planned DB tables so swapping the source is painless.
// ---------------------------------------------------------------------------

// Deterministic dummy image (no random -> stable SSR). Swap for real uploads later.
export const img = (seed, w = 800, h = 600) =>
  `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`;

export const categories = [
  {
    id: 1,
    name: "Solar Inverters",
    slug: "solar-inverters",
    tagline: "On-grid & hybrid solar inverters",
    description:
      "High-efficiency solar inverters from 6kW to 20kW for homes, shops and industry. Pure sine wave output, MPPT charging and smart monitoring.",
    metaTitle: "Solar Inverters in Pakistan | 6kW–20kW Hybrid Inverters",
    metaDesc:
      "Buy reliable solar inverters online in Pakistan. On-grid & hybrid inverters 6kW to 20kW with MPPT, pure sine wave output and nationwide delivery.",
    image: img("solar-inverters-cat"),
  },
  {
    id: 2,
    name: "Hybrid Inverters",
    slug: "hybrid-inverters",
    tagline: "Battery-ready hybrid systems",
    description:
      "Hybrid inverters that combine solar, battery and grid power for uninterrupted energy — ideal for load-shedding and backup.",
    metaTitle: "Hybrid Solar Inverters | Battery Backup Inverters Pakistan",
    metaDesc:
      "Shop hybrid solar inverters with battery backup. Seamless switching between solar, battery and grid. 6kW–15kW models in stock.",
    image: img("hybrid-inverters-cat"),
  },
  {
    id: 3,
    name: "Inverter Circuits",
    slug: "inverter-circuits",
    tagline: "Repair boards & control circuits",
    description:
      "Genuine inverter circuit boards and control cards for 3kW and above — for repair, replacement and upgrades.",
    metaTitle: "Solar Inverter Circuit Boards | 3kW+ Control Cards",
    metaDesc:
      "Replacement solar inverter circuit boards and control cards from 3kW upwards. Genuine parts with warranty and fast shipping.",
    image: img("inverter-circuits-cat"),
  },
];

// specs is stored as JSON in DB; images as JSON array.
export const products = [
  {
    id: 1,
    name: "6kW Solar Inverter",
    slug: "6kw-solar-inverter",
    categorySlug: "solar-inverters",
    price: 185000,
    oldPrice: 210000,
    stock: 12,
    featured: true,
    shortDesc:
      "Pure sine wave 6kW on-grid solar inverter with dual MPPT — perfect for a 5–6kW home solar system.",
    description:
      "The 6kW Solar Inverter delivers clean, stable power for homes and small offices. With dual MPPT trackers, WiFi monitoring and a wide PV input range, it maximises energy harvest even in low-light conditions. Built-in protections keep your appliances and panels safe.",
    specs: {
      "Rated Power": "6000W",
      "Output": "Pure Sine Wave, 230V AC",
      "MPPT Trackers": "Dual MPPT",
      "Max PV Input": "500V DC",
      "Efficiency": "98.2%",
      "Monitoring": "WiFi / App",
      "Warranty": "2 Years",
    },
    metaTitle: "6kW Solar Inverter Price in Pakistan | Dual MPPT On-Grid",
    metaDesc:
      "Buy the 6kW solar inverter with dual MPPT and pure sine wave output. Ideal for 5–6kW home solar systems. Best price in Pakistan with warranty.",
    images: [img("6kw-1"), img("6kw-2"), img("6kw-3")],
  },
  {
    id: 2,
    name: "7kW Solar Inverter",
    slug: "7kw-solar-inverter",
    categorySlug: "solar-inverters",
    price: 215000,
    oldPrice: 245000,
    stock: 9,
    featured: true,
    shortDesc:
      "7kW high-efficiency solar inverter with smart grid support and app monitoring.",
    description:
      "The 7kW Solar Inverter is engineered for medium homes and shops needing extra headroom. It offers fast MPPT tracking, silent operation and real-time monitoring through a mobile app, so you always know how much you are saving.",
    specs: {
      "Rated Power": "7000W",
      "Output": "Pure Sine Wave, 230V AC",
      "MPPT Trackers": "Dual MPPT",
      "Max PV Input": "550V DC",
      "Efficiency": "98.4%",
      "Monitoring": "WiFi / App",
      "Warranty": "2 Years",
    },
    metaTitle: "7kW Solar Inverter Price in Pakistan | High-Efficiency",
    metaDesc:
      "7kW solar inverter with dual MPPT, 98.4% efficiency and app monitoring. Great for medium homes and shops. Order online with nationwide delivery.",
    images: [img("7kw-1"), img("7kw-2"), img("7kw-3")],
  },
  {
    id: 3,
    name: "10kW Solar Inverter",
    slug: "10kw-solar-inverter",
    categorySlug: "solar-inverters",
    price: 295000,
    oldPrice: 330000,
    stock: 7,
    featured: true,
    shortDesc:
      "Three-phase ready 10kW solar inverter for large homes and commercial use.",
    description:
      "The 10kW Solar Inverter is built for large residences and commercial setups. With robust thermal management and a wide operating range, it runs cool and reliable through long production days. Ideal for reducing heavy electricity bills.",
    specs: {
      "Rated Power": "10000W",
      "Output": "Pure Sine Wave, 230V/400V",
      "MPPT Trackers": "Dual MPPT",
      "Max PV Input": "600V DC",
      "Efficiency": "98.6%",
      "Monitoring": "WiFi / App",
      "Warranty": "2 Years",
    },
    metaTitle: "10kW Solar Inverter Price in Pakistan | Commercial Grade",
    metaDesc:
      "10kW solar inverter for large homes & commercial use. Three-phase ready, 98.6% efficiency, dual MPPT. Buy online at the best price in Pakistan.",
    images: [img("10kw-1"), img("10kw-2"), img("10kw-3")],
  },
  {
    id: 4,
    name: "15kW Solar Inverter",
    slug: "15kw-solar-inverter",
    categorySlug: "solar-inverters",
    price: 420000,
    oldPrice: 470000,
    stock: 5,
    featured: false,
    shortDesc:
      "Heavy-duty 15kW three-phase solar inverter for industrial and commercial loads.",
    description:
      "The 15kW Solar Inverter handles demanding commercial and industrial loads with ease. Multiple MPPT inputs let you design flexible arrays, while advanced protections and monitoring keep everything running smoothly.",
    specs: {
      "Rated Power": "15000W",
      "Output": "Pure Sine Wave, 400V 3-Phase",
      "MPPT Trackers": "Triple MPPT",
      "Max PV Input": "800V DC",
      "Efficiency": "98.7%",
      "Monitoring": "WiFi / App",
      "Warranty": "2 Years",
    },
    metaTitle: "15kW Solar Inverter Price in Pakistan | 3-Phase Industrial",
    metaDesc:
      "15kW three-phase solar inverter for industrial and commercial loads. Triple MPPT, 98.7% efficiency. Best price in Pakistan with warranty.",
    images: [img("15kw-1"), img("15kw-2"), img("15kw-3")],
  },
  {
    id: 5,
    name: "20kW Solar Inverter",
    slug: "20kw-solar-inverter",
    categorySlug: "solar-inverters",
    price: 560000,
    oldPrice: 620000,
    stock: 4,
    featured: true,
    shortDesc:
      "20kW industrial three-phase solar inverter with triple MPPT and smart cooling.",
    description:
      "The 20kW Solar Inverter is our flagship for factories, farms and large commercial rooftops. Designed for maximum uptime, it combines high efficiency with intelligent cooling and remote fleet monitoring.",
    specs: {
      "Rated Power": "20000W",
      "Output": "Pure Sine Wave, 400V 3-Phase",
      "MPPT Trackers": "Triple MPPT",
      "Max PV Input": "1000V DC",
      "Efficiency": "98.8%",
      "Monitoring": "WiFi / App / Cloud",
      "Warranty": "3 Years",
    },
    metaTitle: "20kW Solar Inverter Price in Pakistan | Industrial 3-Phase",
    metaDesc:
      "20kW industrial solar inverter with triple MPPT and smart cooling. Ideal for factories and large rooftops. Order online with 3-year warranty.",
    images: [img("20kw-1"), img("20kw-2"), img("20kw-3")],
  },
  {
    id: 6,
    name: "8kW Hybrid Inverter",
    slug: "8kw-hybrid-inverter",
    categorySlug: "hybrid-inverters",
    price: 265000,
    oldPrice: 300000,
    stock: 8,
    featured: true,
    shortDesc:
      "8kW hybrid inverter with battery backup and seamless UPS switching.",
    description:
      "The 8kW Hybrid Inverter blends solar, battery and grid power to keep you running through load-shedding. With fast switch-over and flexible battery support, it is the smart choice for uninterrupted energy.",
    specs: {
      "Rated Power": "8000W",
      "Output": "Pure Sine Wave, 230V AC",
      "Battery": "48V Li-ion / Lead-acid",
      "Switch Time": "<10ms UPS",
      "MPPT Trackers": "Dual MPPT",
      "Monitoring": "WiFi / App",
      "Warranty": "2 Years",
    },
    metaTitle: "8kW Hybrid Solar Inverter | Battery Backup Price Pakistan",
    metaDesc:
      "8kW hybrid solar inverter with battery backup and <10ms UPS switching. Beat load-shedding with reliable power. Buy online in Pakistan.",
    images: [img("8kwh-1"), img("8kwh-2"), img("8kwh-3")],
  },
  {
    id: 7,
    name: "12kW Hybrid Inverter",
    slug: "12kw-hybrid-inverter",
    categorySlug: "hybrid-inverters",
    price: 385000,
    oldPrice: 430000,
    stock: 6,
    featured: false,
    shortDesc:
      "12kW hybrid inverter for large homes needing solar + battery + grid.",
    description:
      "The 12kW Hybrid Inverter powers large homes and small businesses with a resilient mix of solar, battery and grid. Parallel-ready and app-monitored, it grows with your energy needs.",
    specs: {
      "Rated Power": "12000W",
      "Output": "Pure Sine Wave, 230V/400V",
      "Battery": "48V Li-ion / Lead-acid",
      "Switch Time": "<10ms UPS",
      "MPPT Trackers": "Dual MPPT",
      "Monitoring": "WiFi / App",
      "Warranty": "2 Years",
    },
    metaTitle: "12kW Hybrid Solar Inverter | Large Home Backup Pakistan",
    metaDesc:
      "12kW hybrid solar inverter with battery + grid support and parallel operation. Ideal for large homes. Best price in Pakistan with warranty.",
    images: [img("12kwh-1"), img("12kwh-2"), img("12kwh-3")],
  },
  {
    id: 8,
    name: "3kW Inverter Circuit Board",
    slug: "3kw-inverter-circuit",
    categorySlug: "inverter-circuits",
    price: 22000,
    oldPrice: 26000,
    stock: 20,
    featured: false,
    shortDesc:
      "Genuine 3kW solar inverter control circuit board for repair & replacement.",
    description:
      "This 3kW Inverter Circuit Board is a genuine replacement control card for common 3kW solar inverters. Ideal for technicians and repair shops — restore your inverter to full working order quickly.",
    specs: {
      "Compatible Power": "3000W",
      "Type": "Control / Main Board",
      "Condition": "New (Genuine)",
      "Application": "Repair / Replacement",
      "Warranty": "6 Months",
    },
    metaTitle: "3kW Inverter Circuit Board Price in Pakistan | Genuine Part",
    metaDesc:
      "Genuine 3kW solar inverter circuit board for repair and replacement. New control card with 6-month warranty. Order online in Pakistan.",
    images: [img("3kwc-1"), img("3kwc-2"), img("3kwc-3")],
  },
  {
    id: 9,
    name: "5kW Inverter Circuit Board",
    slug: "5kw-inverter-circuit",
    categorySlug: "inverter-circuits",
    price: 34000,
    oldPrice: 39000,
    stock: 15,
    featured: false,
    shortDesc:
      "5kW solar inverter main control board — genuine replacement part.",
    description:
      "The 5kW Inverter Circuit Board is a reliable replacement for 5kW solar inverters. Tested and ready to install, it helps repair shops turn around jobs faster with dependable performance.",
    specs: {
      "Compatible Power": "5000W",
      "Type": "Control / Main Board",
      "Condition": "New (Genuine)",
      "Application": "Repair / Replacement",
      "Warranty": "6 Months",
    },
    metaTitle: "5kW Inverter Circuit Board Price in Pakistan | Genuine Part",
    metaDesc:
      "Genuine 5kW solar inverter circuit board, tested and ready to install. New control card with warranty. Buy online in Pakistan.",
    images: [img("5kwc-1"), img("5kwc-2"), img("5kwc-3")],
  },
];

// ---- helpers (mirror future DB query functions) ----
export const getCategories = () => categories;
export const getCategoryBySlug = (slug) =>
  categories.find((c) => c.slug === slug) || null;
export const getProducts = () => products;
export const getFeaturedProducts = () => products.filter((p) => p.featured);
export const getProductBySlug = (slug) =>
  products.find((p) => p.slug === slug) || null;
export const getProductsByCategory = (slug) =>
  products.filter((p) => p.categorySlug === slug);
export const getCategoryName = (slug) =>
  getCategoryBySlug(slug)?.name || "Products";
