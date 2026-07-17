// Canonical seed data. Used to seed MySQL (db/seed.mjs) AND as the initial
// dataset for the in-memory store when no database is configured.

export const img = (seed, w = 800, h = 600) =>
  `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`;

export const seedCategories = [
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
    image: "/images/cat-solar-inverters.jpg",
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
    image: "/images/cat-hybrid-inverters.jpg",
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
    image: "/images/cat-inverter-circuits.jpg",
  },
  {
    id: 4,
    name: "Solar Panels",
    slug: "solar-panels",
    tagline: "Mono & bifacial PV modules",
    description:
      "High-efficiency mono-crystalline and bifacial solar panels from 350W to 585W — tier-1 quality for rooftop and ground-mount systems.",
    metaTitle: "Solar Panels in Pakistan | 350W–585W Mono & Bifacial",
    metaDesc:
      "Buy tier-1 solar panels online in Pakistan. Mono-crystalline & bifacial modules 350W to 585W with high efficiency and long warranty.",
    image: "/images/cat-solar-panels.jpg",
  },
  {
    id: 5,
    name: "Lithium Batteries",
    slug: "lithium-batteries",
    tagline: "LiFePO4 storage batteries",
    description:
      "Long-life LiFePO4 lithium batteries for solar storage and backup — 48V wall-mount and rack modules from 5kWh to 10kWh.",
    metaTitle: "Lithium Batteries for Solar | LiFePO4 48V Storage Pakistan",
    metaDesc:
      "Shop LiFePO4 lithium batteries for solar storage in Pakistan. 48V, 5kWh–10kWh, long cycle life with BMS protection.",
    image: "/images/cat-lithium-batteries.jpg",
  },
  {
    id: 6,
    name: "Breakers & Distribution",
    slug: "breakers-distribution",
    tagline: "MCBs, DBs & surge protection",
    description:
      "AC/DC circuit breakers, solar distribution boxes and surge protection devices (SPDs) to keep your solar system safe and compliant.",
    metaTitle: "Circuit Breakers, Distribution Boxes & SPDs | Solar Protection",
    metaDesc:
      "Buy AC/DC circuit breakers, solar distribution boxes and surge protection devices online in Pakistan. Genuine electrical protection parts.",
    image: "/images/cat-breakers.jpg",
  },
];

export const seedProducts = [
  {
    id: 1, name: "6kW Solar Inverter", slug: "6kw-solar-inverter", categoryId: 1,
    categorySlug: "solar-inverters", price: 185000, oldPrice: 210000, stock: 12, featured: true,
    shortDesc: "Pure sine wave 6kW on-grid solar inverter with dual MPPT — perfect for a 5–6kW home solar system.",
    description: "The 6kW Solar Inverter delivers clean, stable power for homes and small offices. With dual MPPT trackers, WiFi monitoring and a wide PV input range, it maximises energy harvest even in low-light conditions. Built-in protections keep your appliances and panels safe.",
    specs: { "Rated Power": "6000W", "Output": "Pure Sine Wave, 230V AC", "MPPT Trackers": "Dual MPPT", "Max PV Input": "500V DC", "Efficiency": "98.2%", "Monitoring": "WiFi / App", "Warranty": "2 Years" },
    metaTitle: "6kW Solar Inverter Price in Pakistan | Dual MPPT On-Grid",
    metaDesc: "Buy the 6kW solar inverter with dual MPPT and pure sine wave output. Ideal for 5–6kW home solar systems. Best price in Pakistan with warranty.",
    images: [img("6kw-1"), img("6kw-2"), img("6kw-3")],
  },
  {
    id: 2, name: "7kW Solar Inverter", slug: "7kw-solar-inverter", categoryId: 1,
    categorySlug: "solar-inverters", price: 215000, oldPrice: 245000, stock: 9, featured: true,
    shortDesc: "7kW high-efficiency solar inverter with smart grid support and app monitoring.",
    description: "The 7kW Solar Inverter is engineered for medium homes and shops needing extra headroom. It offers fast MPPT tracking, silent operation and real-time monitoring through a mobile app, so you always know how much you are saving.",
    specs: { "Rated Power": "7000W", "Output": "Pure Sine Wave, 230V AC", "MPPT Trackers": "Dual MPPT", "Max PV Input": "550V DC", "Efficiency": "98.4%", "Monitoring": "WiFi / App", "Warranty": "2 Years" },
    metaTitle: "7kW Solar Inverter Price in Pakistan | High-Efficiency",
    metaDesc: "7kW solar inverter with dual MPPT, 98.4% efficiency and app monitoring. Great for medium homes and shops. Order online with nationwide delivery.",
    images: [img("7kw-1"), img("7kw-2"), img("7kw-3")],
  },
  {
    id: 3, name: "10kW Solar Inverter", slug: "10kw-solar-inverter", categoryId: 1,
    categorySlug: "solar-inverters", price: 295000, oldPrice: 330000, stock: 7, featured: true,
    shortDesc: "Three-phase ready 10kW solar inverter for large homes and commercial use.",
    description: "The 10kW Solar Inverter is built for large residences and commercial setups. With robust thermal management and a wide operating range, it runs cool and reliable through long production days. Ideal for reducing heavy electricity bills.",
    specs: { "Rated Power": "10000W", "Output": "Pure Sine Wave, 230V/400V", "MPPT Trackers": "Dual MPPT", "Max PV Input": "600V DC", "Efficiency": "98.6%", "Monitoring": "WiFi / App", "Warranty": "2 Years" },
    metaTitle: "10kW Solar Inverter Price in Pakistan | Commercial Grade",
    metaDesc: "10kW solar inverter for large homes & commercial use. Three-phase ready, 98.6% efficiency, dual MPPT. Buy online at the best price in Pakistan.",
    images: [img("10kw-1"), img("10kw-2"), img("10kw-3")],
  },
  {
    id: 4, name: "15kW Solar Inverter", slug: "15kw-solar-inverter", categoryId: 1,
    categorySlug: "solar-inverters", price: 420000, oldPrice: 470000, stock: 5, featured: false,
    shortDesc: "Heavy-duty 15kW three-phase solar inverter for industrial and commercial loads.",
    description: "The 15kW Solar Inverter handles demanding commercial and industrial loads with ease. Multiple MPPT inputs let you design flexible arrays, while advanced protections and monitoring keep everything running smoothly.",
    specs: { "Rated Power": "15000W", "Output": "Pure Sine Wave, 400V 3-Phase", "MPPT Trackers": "Triple MPPT", "Max PV Input": "800V DC", "Efficiency": "98.7%", "Monitoring": "WiFi / App", "Warranty": "2 Years" },
    metaTitle: "15kW Solar Inverter Price in Pakistan | 3-Phase Industrial",
    metaDesc: "15kW three-phase solar inverter for industrial and commercial loads. Triple MPPT, 98.7% efficiency. Best price in Pakistan with warranty.",
    images: [img("15kw-1"), img("15kw-2"), img("15kw-3")],
  },
  {
    id: 5, name: "20kW Solar Inverter", slug: "20kw-solar-inverter", categoryId: 1,
    categorySlug: "solar-inverters", price: 560000, oldPrice: 620000, stock: 4, featured: true,
    shortDesc: "20kW industrial three-phase solar inverter with triple MPPT and smart cooling.",
    description: "The 20kW Solar Inverter is our flagship for factories, farms and large commercial rooftops. Designed for maximum uptime, it combines high efficiency with intelligent cooling and remote fleet monitoring.",
    specs: { "Rated Power": "20000W", "Output": "Pure Sine Wave, 400V 3-Phase", "MPPT Trackers": "Triple MPPT", "Max PV Input": "1000V DC", "Efficiency": "98.8%", "Monitoring": "WiFi / App / Cloud", "Warranty": "3 Years" },
    metaTitle: "20kW Solar Inverter Price in Pakistan | Industrial 3-Phase",
    metaDesc: "20kW industrial solar inverter with triple MPPT and smart cooling. Ideal for factories and large rooftops. Order online with 3-year warranty.",
    images: [img("20kw-1"), img("20kw-2"), img("20kw-3")],
  },
  {
    id: 6, name: "8kW Hybrid Inverter", slug: "8kw-hybrid-inverter", categoryId: 2,
    categorySlug: "hybrid-inverters", price: 265000, oldPrice: 300000, stock: 8, featured: true,
    shortDesc: "8kW hybrid inverter with battery backup and seamless UPS switching.",
    description: "The 8kW Hybrid Inverter blends solar, battery and grid power to keep you running through load-shedding. With fast switch-over and flexible battery support, it is the smart choice for uninterrupted energy.",
    specs: { "Rated Power": "8000W", "Output": "Pure Sine Wave, 230V AC", "Battery": "48V Li-ion / Lead-acid", "Switch Time": "<10ms UPS", "MPPT Trackers": "Dual MPPT", "Monitoring": "WiFi / App", "Warranty": "2 Years" },
    metaTitle: "8kW Hybrid Solar Inverter | Battery Backup Price Pakistan",
    metaDesc: "8kW hybrid solar inverter with battery backup and <10ms UPS switching. Beat load-shedding with reliable power. Buy online in Pakistan.",
    images: [img("8kwh-1"), img("8kwh-2"), img("8kwh-3")],
  },
  {
    id: 7, name: "12kW Hybrid Inverter", slug: "12kw-hybrid-inverter", categoryId: 2,
    categorySlug: "hybrid-inverters", price: 385000, oldPrice: 430000, stock: 6, featured: false,
    shortDesc: "12kW hybrid inverter for large homes needing solar + battery + grid.",
    description: "The 12kW Hybrid Inverter powers large homes and small businesses with a resilient mix of solar, battery and grid. Parallel-ready and app-monitored, it grows with your energy needs.",
    specs: { "Rated Power": "12000W", "Output": "Pure Sine Wave, 230V/400V", "Battery": "48V Li-ion / Lead-acid", "Switch Time": "<10ms UPS", "MPPT Trackers": "Dual MPPT", "Monitoring": "WiFi / App", "Warranty": "2 Years" },
    metaTitle: "12kW Hybrid Solar Inverter | Large Home Backup Pakistan",
    metaDesc: "12kW hybrid solar inverter with battery + grid support and parallel operation. Ideal for large homes. Best price in Pakistan with warranty.",
    images: [img("12kwh-1"), img("12kwh-2"), img("12kwh-3")],
  },
  {
    id: 8, name: "3kW Inverter Circuit Board", slug: "3kw-inverter-circuit", categoryId: 3,
    categorySlug: "inverter-circuits", price: 22000, oldPrice: 26000, stock: 20, featured: false,
    shortDesc: "Genuine 3kW solar inverter control circuit board for repair & replacement.",
    description: "This 3kW Inverter Circuit Board is a genuine replacement control card for common 3kW solar inverters. Ideal for technicians and repair shops — restore your inverter to full working order quickly.",
    specs: { "Compatible Power": "3000W", "Type": "Control / Main Board", "Condition": "New (Genuine)", "Application": "Repair / Replacement", "Warranty": "6 Months" },
    metaTitle: "3kW Inverter Circuit Board Price in Pakistan | Genuine Part",
    metaDesc: "Genuine 3kW solar inverter circuit board for repair and replacement. New control card with 6-month warranty. Order online in Pakistan.",
    images: [img("3kwc-1"), img("3kwc-2"), img("3kwc-3")],
  },
  {
    id: 9, name: "5kW Inverter Circuit Board", slug: "5kw-inverter-circuit", categoryId: 3,
    categorySlug: "inverter-circuits", price: 34000, oldPrice: 39000, stock: 15, featured: false,
    shortDesc: "5kW solar inverter main control board — genuine replacement part.",
    description: "The 5kW Inverter Circuit Board is a reliable replacement for 5kW solar inverters. Tested and ready to install, it helps repair shops turn around jobs faster with dependable performance.",
    specs: { "Compatible Power": "5000W", "Type": "Control / Main Board", "Condition": "New (Genuine)", "Application": "Repair / Replacement", "Warranty": "6 Months" },
    metaTitle: "5kW Inverter Circuit Board Price in Pakistan | Genuine Part",
    metaDesc: "Genuine 5kW solar inverter circuit board, tested and ready to install. New control card with warranty. Buy online in Pakistan.",
    images: [img("5kwc-1"), img("5kwc-2"), img("5kwc-3")],
  },

  // ---- Solar Panels (category 4) ----
  {
    id: 10, name: "550W Mono Solar Panel", slug: "550w-mono-solar-panel", categoryId: 4,
    categorySlug: "solar-panels", price: 18500, oldPrice: 21000, stock: 40, featured: true,
    shortDesc: "Tier-1 550W mono-crystalline half-cut solar panel with high efficiency and PID resistance.",
    description: "The 550W Mono Solar Panel uses half-cut mono-crystalline cells for excellent performance in real-world conditions. Anti-PID, salt-mist and ammonia resistant, it's built to deliver reliable output for 25+ years on rooftop and ground-mount systems.",
    specs: { "Power": "550W", "Cell Type": "Mono PERC Half-Cut", "Efficiency": "21.3%", "Voltage (Vmp)": "41.8V", "Frame": "Anodised Aluminium", "Warranty": "12 yr product / 25 yr performance" },
    metaTitle: "550W Mono Solar Panel Price in Pakistan | Tier-1 Half-Cut",
    metaDesc: "Buy 550W mono-crystalline half-cut solar panel in Pakistan. 21.3% efficiency, anti-PID, 25-year performance warranty. Best price online.",
    images: [],
  },
  {
    id: 11, name: "450W Solar Panel", slug: "450w-solar-panel", categoryId: 4,
    categorySlug: "solar-panels", price: 15000, oldPrice: 17500, stock: 55, featured: false,
    shortDesc: "Efficient 450W mono solar panel — a great fit for residential rooftop arrays.",
    description: "The 450W Solar Panel balances size and output for home solar systems. Its mono-crystalline cells and durable tempered-glass build make it a dependable choice for lowering your electricity bills.",
    specs: { "Power": "450W", "Cell Type": "Mono PERC", "Efficiency": "20.7%", "Voltage (Vmp)": "34.2V", "Frame": "Anodised Aluminium", "Warranty": "12 yr product / 25 yr performance" },
    metaTitle: "450W Solar Panel Price in Pakistan | Mono Crystalline",
    metaDesc: "450W mono solar panel for home rooftop systems. High efficiency, tempered glass, 25-year warranty. Order online in Pakistan.",
    images: [],
  },
  {
    id: 12, name: "585W Bifacial Solar Panel", slug: "585w-bifacial-solar-panel", categoryId: 4,
    categorySlug: "solar-panels", price: 24000, oldPrice: 27500, stock: 25, featured: true,
    shortDesc: "585W bifacial panel that harvests light from both sides for up to 20% more energy.",
    description: "The 585W Bifacial Solar Panel captures reflected light on its rear side, boosting yield on bright ground and rooftop installs. Dual-glass construction gives it superior durability and a longer service life.",
    specs: { "Power": "585W", "Cell Type": "Bifacial Mono", "Bifaciality": "Up to +20%", "Efficiency": "22.5%", "Build": "Dual Glass", "Warranty": "15 yr product / 30 yr performance" },
    metaTitle: "585W Bifacial Solar Panel Price in Pakistan | Dual Glass",
    metaDesc: "585W bifacial dual-glass solar panel with up to 20% extra yield. 22.5% efficiency, 30-year performance warranty. Buy online in Pakistan.",
    images: [],
  },

  // ---- Lithium Batteries (category 5) ----
  {
    id: 13, name: "5kWh Lithium Battery (48V)", slug: "5kwh-lithium-battery", categoryId: 5,
    categorySlug: "lithium-batteries", price: 345000, oldPrice: 390000, stock: 14, featured: true,
    shortDesc: "48V 5kWh wall-mount LiFePO4 battery with built-in BMS and long cycle life.",
    description: "The 5kWh Lithium Battery stores your solar energy for use at night or during load-shedding. LiFePO4 chemistry and an intelligent BMS deliver 6000+ cycles, safe operation and a compact wall-mount design.",
    specs: { "Capacity": "5.12kWh", "Voltage": "48V (51.2V)", "Chemistry": "LiFePO4", "Cycles": "6000+ @ 80% DoD", "Comms": "RS485 / CAN", "Warranty": "5 Years" },
    metaTitle: "5kWh Lithium Battery Price in Pakistan | 48V LiFePO4",
    metaDesc: "48V 5kWh LiFePO4 lithium battery for solar storage. 6000+ cycles, built-in BMS, wall-mount. Best price in Pakistan with warranty.",
    images: [],
  },
  {
    id: 14, name: "10kWh Lithium Battery (48V)", slug: "10kwh-lithium-battery", categoryId: 5,
    categorySlug: "lithium-batteries", price: 650000, oldPrice: 720000, stock: 8, featured: false,
    shortDesc: "High-capacity 48V 10kWh LiFePO4 battery for whole-home backup and storage.",
    description: "The 10kWh Lithium Battery gives large homes and businesses ample overnight storage. Stackable and parallel-ready, it scales with your energy needs while its BMS keeps every cell safe and balanced.",
    specs: { "Capacity": "10.24kWh", "Voltage": "48V (51.2V)", "Chemistry": "LiFePO4", "Cycles": "6000+ @ 80% DoD", "Comms": "RS485 / CAN", "Warranty": "5 Years" },
    metaTitle: "10kWh Lithium Battery Price in Pakistan | 48V LiFePO4",
    metaDesc: "48V 10kWh LiFePO4 lithium battery for whole-home solar backup. Stackable, 6000+ cycles, BMS. Order online in Pakistan.",
    images: [],
  },
  {
    id: 15, name: "48V 100Ah LiFePO4 Battery", slug: "48v-100ah-lifepo4-battery", categoryId: 5,
    categorySlug: "lithium-batteries", price: 185000, oldPrice: 210000, stock: 20, featured: false,
    shortDesc: "Rack-mount 48V 100Ah LiFePO4 module — reliable storage for solar and UPS.",
    description: "The 48V 100Ah LiFePO4 Battery is a versatile rack-mount storage module for solar and backup systems. With a robust BMS and stable chemistry, it delivers dependable power cycle after cycle.",
    specs: { "Capacity": "5.12kWh (100Ah)", "Voltage": "48V (51.2V)", "Chemistry": "LiFePO4", "Form Factor": "Rack Mount", "Cycles": "6000+", "Warranty": "5 Years" },
    metaTitle: "48V 100Ah LiFePO4 Battery Price in Pakistan | Rack Mount",
    metaDesc: "48V 100Ah LiFePO4 rack-mount lithium battery for solar & UPS. 6000+ cycles, integrated BMS. Buy online in Pakistan.",
    images: [],
  },

  // ---- Breakers & Distribution (category 6) ----
  {
    id: 16, name: "DC Circuit Breaker 2P", slug: "dc-circuit-breaker-2p", categoryId: 6,
    categorySlug: "breakers-distribution", price: 1800, oldPrice: 2300, stock: 120, featured: false,
    shortDesc: "2-pole DC MCB for solar arrays — safe isolation and overload protection.",
    description: "The DC Circuit Breaker 2P protects your PV strings from overload and short circuit, and provides safe manual isolation for maintenance. Rated for solar DC voltages with reliable trip performance.",
    specs: { "Type": "DC MCB", "Poles": "2P", "Rated Current": "63A", "Voltage": "500V DC", "Breaking Capacity": "6kA", "Warranty": "1 Year" },
    metaTitle: "DC Circuit Breaker 2P Price in Pakistan | Solar MCB 500V",
    metaDesc: "2-pole DC circuit breaker (MCB) for solar arrays. 63A, 500V DC, 6kA breaking capacity. Genuine solar protection part.",
    images: [],
  },
  {
    id: 17, name: "AC Circuit Breaker 63A", slug: "ac-circuit-breaker-63a", categoryId: 6,
    categorySlug: "breakers-distribution", price: 1200, oldPrice: 1500, stock: 150, featured: false,
    shortDesc: "63A AC MCB for inverter output and main distribution boards.",
    description: "The AC Circuit Breaker 63A provides overload and short-circuit protection on the AC side of your solar system. Built to standard DIN-rail mounting for easy installation in any distribution board.",
    specs: { "Type": "AC MCB", "Poles": "2P", "Rated Current": "63A", "Voltage": "230/400V AC", "Breaking Capacity": "6kA", "Warranty": "1 Year" },
    metaTitle: "AC Circuit Breaker 63A Price in Pakistan | MCB DIN Rail",
    metaDesc: "63A AC circuit breaker (MCB) for inverter output and distribution boards. 6kA breaking capacity, DIN-rail mount. Buy online in Pakistan.",
    images: [],
  },
  {
    id: 18, name: "Solar Distribution Box", slug: "solar-distribution-box", categoryId: 6,
    categorySlug: "breakers-distribution", price: 8500, oldPrice: 10500, stock: 35, featured: true,
    shortDesc: "Pre-wired AC/DC combiner box with breakers and SPD for solar systems.",
    description: "The Solar Distribution Box combines DC and AC protection in one weatherproof enclosure — pre-wired with breakers and surge protection to keep your installation safe, tidy and compliant.",
    specs: { "Enclosure": "IP65 Weatherproof", "Includes": "DC MCB + AC MCB + SPD", "Config": "1 in / 1 out", "Mounting": "Wall", "Warranty": "1 Year" },
    metaTitle: "Solar Distribution Box Price in Pakistan | AC/DC Combiner",
    metaDesc: "Pre-wired solar distribution/combiner box with breakers and surge protection. IP65 weatherproof. Best price in Pakistan.",
    images: [],
  },
  {
    id: 19, name: "Surge Protection Device (SPD)", slug: "surge-protection-device-spd", categoryId: 6,
    categorySlug: "breakers-distribution", price: 3500, oldPrice: 4200, stock: 60, featured: false,
    shortDesc: "Type 2 SPD to protect inverters and appliances from voltage spikes and lightning surges.",
    description: "The Surge Protection Device (SPD) guards your inverter and connected appliances against damaging voltage spikes and induced lightning surges. A must-have for protecting your solar investment.",
    specs: { "Type": "Type 2 SPD", "Poles": "2P", "Max Voltage": "385V", "Discharge Current": "40kA", "Response": "<25ns", "Warranty": "1 Year" },
    metaTitle: "Surge Protection Device (SPD) Price in Pakistan | Type 2",
    metaDesc: "Type 2 surge protection device (SPD) for solar systems. 40kA discharge, protects inverters & appliances. Buy online in Pakistan.",
    images: [],
  },
];

// Use the curated local images for every product (grouped by category) until real
// product photos are uploaded from the admin. Overrides the placeholders above.
const PRODUCT_IMAGES = {
  "solar-inverters": ["/images/cat-solar-inverters.jpg", "/images/hero-solar.jpg", "/images/banner-solar-field.jpg"],
  "hybrid-inverters": ["/images/cat-hybrid-inverters.jpg", "/images/cat-solar-inverters.jpg", "/images/hero-solar.jpg"],
  "inverter-circuits": ["/images/cat-inverter-circuits.jpg", "/images/promo-circuit.jpg", "/images/cat-inverter-circuits.jpg"],
  "solar-panels": ["/images/cat-solar-panels.jpg", "/images/banner-solar-field.jpg", "/images/hero-solar.jpg"],
  "lithium-batteries": ["/images/cat-lithium-batteries.jpg", "/images/promo-circuit.jpg", "/images/cat-lithium-batteries.jpg"],
  "breakers-distribution": ["/images/cat-breakers.jpg", "/images/promo-circuit.jpg", "/images/cat-inverter-circuits.jpg"],
};
for (const p of seedProducts) {
  p.images = PRODUCT_IMAGES[p.categorySlug] || p.images;
}

// Store settings (editable from admin). Payment: Bank transfer + Cash on delivery.
export const seedSettings = {
  site_name: "CH Power Solutions",
  site_email: "sales@chpowersolutions.com",
  site_phone: "+92 317 4591992",
  site_whatsapp: "+92 317 4591992",
  site_address: "Lahore, Pakistan",
  payment_bank_name: "Meezan Bank",
  payment_account_title: "CH Power Solutions",
  payment_account_number: "0123-4567890123",
  payment_iban: "PK00MEZN0000000123456789",
  payment_instructions:
    "Transfer the total amount to the bank account above, then upload your payment screenshot at checkout. We confirm your order once payment is verified. Cash on Delivery is also available.",
  cod_enabled: "true",
  // Where order & contact notifications are delivered (admin inbox).
  notify_email: "arslanarain1514@gmail.com",
  // Shown on the "forgot password" page for manual password reset requests.
  support_email: "arslanarain1514@gmail.com",
  support_whatsapp: "+92 317 4591992",
  // No-SMTP email delivery: paste a free Web3Forms access key (created with the
  // notify email) and order/enquiry notifications are delivered without any SMTP.
  web3forms_key: "",
};

// Default admin (password is hashed by the seed script / memory store on boot).
export const seedAdmin = {
  name: "Administrator",
  email: "arslanarain1514@gmail.com",
  password: "1514arslanarain", // change after first login
  role: "admin",
};
