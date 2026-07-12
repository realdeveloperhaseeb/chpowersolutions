// Seeds the MySQL database with categories, products, settings and an admin user.
// Usage:  node db/seed.mjs   (run from the project root; reads the .env file)
// Requires a .env with DB_* vars and the schema already created (db/schema.sql).
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import {
  seedCategories,
  seedProducts,
  seedSettings,
  seedAdmin,
} from "../src/lib/store/seed-data.js";

// Minimal .env loader (no dependency) — works on any Node version / package manager.
function loadDotEnv() {
  const p = resolve(process.cwd(), ".env");
  if (!existsSync(p)) return;
  for (const line of readFileSync(p, "utf8").split("\n")) {
    const m = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (!m) continue;
    let val = (m[2] || "").trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (!(m[1] in process.env)) process.env[m[1]] = val;
  }
}
loadDotEnv();

if (!process.env.DB_HOST || !process.env.DB_NAME) {
  console.error("Missing DB_* env vars. Create a .env file in the project root first.");
  process.exit(1);
}

const conn = await mysql.createConnection({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true,
});

console.log("Seeding categories…");
for (const c of seedCategories) {
  await conn.execute(
    `INSERT INTO categories (id, name, slug, tagline, description, meta_title, meta_desc, image)
     VALUES (?,?,?,?,?,?,?,?)
     ON DUPLICATE KEY UPDATE name=VALUES(name), tagline=VALUES(tagline), description=VALUES(description),
       meta_title=VALUES(meta_title), meta_desc=VALUES(meta_desc), image=VALUES(image)`,
    [c.id, c.name, c.slug, c.tagline, c.description, c.metaTitle, c.metaDesc, c.image]
  );
}

console.log("Seeding products…");
for (const p of seedProducts) {
  await conn.execute(
    `INSERT INTO products (id, name, slug, category_id, price, old_price, stock, featured, short_desc, description, specs, meta_title, meta_desc, images)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)
     ON DUPLICATE KEY UPDATE name=VALUES(name), price=VALUES(price), old_price=VALUES(old_price),
       stock=VALUES(stock), featured=VALUES(featured), short_desc=VALUES(short_desc),
       description=VALUES(description), specs=VALUES(specs), meta_title=VALUES(meta_title),
       meta_desc=VALUES(meta_desc), images=VALUES(images)`,
    [p.id, p.name, p.slug, p.categoryId, p.price, p.oldPrice, p.stock, p.featured ? 1 : 0,
     p.shortDesc, p.description, JSON.stringify(p.specs), p.metaTitle, p.metaDesc, JSON.stringify(p.images)]
  );
}

console.log("Seeding settings…");
for (const [key, value] of Object.entries(seedSettings)) {
  await conn.execute(
    "INSERT INTO settings (`key`,`value`) VALUES (?,?) ON DUPLICATE KEY UPDATE `value`=VALUES(`value`)",
    [key, String(value)]
  );
}

console.log("Seeding admin user…");
const hash = await bcrypt.hash(seedAdmin.password, 10);
await conn.execute(
  `INSERT INTO users (name, email, password_hash, role) VALUES (?,?,?,?)
   ON DUPLICATE KEY UPDATE name=VALUES(name)`,
  [seedAdmin.name, seedAdmin.email.toLowerCase(), hash, seedAdmin.role]
);

console.log("\n✅ Done. Admin login:");
console.log(`   email:    ${seedAdmin.email}`);
console.log(`   password: ${seedAdmin.password}  (change after first login)`);
await conn.end();
