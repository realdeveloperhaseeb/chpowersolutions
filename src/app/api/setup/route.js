import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { q, isDbConfigured } from "@/lib/db";
import {
  seedCategories,
  seedProducts,
  seedSettings,
  seedAdmin,
} from "@/lib/store/seed-data";

export const dynamic = "force-dynamic";

// One-time database seeding via URL (for hosts without terminal access).
// Visit /api/setup once after deploying. It is first-run only: once an admin
// user exists it refuses to run again, so it's safe to leave in place.
export async function GET() {
  if (!isDbConfigured()) {
    return NextResponse.json(
      { ok: false, error: "No database configured. Set DB_* env vars first." },
      { status: 400 }
    );
  }

  try {
    const admins = await q("SELECT id FROM users WHERE role = 'admin' LIMIT 1");
    if (admins.length) {
      return NextResponse.json({
        ok: true,
        alreadySeeded: true,
        message: "Already set up — nothing to do. You can log in at /login.",
      });
    }

    for (const c of seedCategories) {
      await q(
        `INSERT INTO categories (id, name, slug, tagline, description, meta_title, meta_desc, image)
         VALUES (?,?,?,?,?,?,?,?)
         ON DUPLICATE KEY UPDATE name=VALUES(name), tagline=VALUES(tagline), description=VALUES(description),
           meta_title=VALUES(meta_title), meta_desc=VALUES(meta_desc), image=VALUES(image)`,
        [c.id, c.name, c.slug, c.tagline, c.description, c.metaTitle, c.metaDesc, c.image]
      );
    }

    for (const p of seedProducts) {
      await q(
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

    for (const [key, value] of Object.entries(seedSettings)) {
      await q(
        "INSERT INTO settings (`key`,`value`) VALUES (?,?) ON DUPLICATE KEY UPDATE `value`=VALUES(`value`)",
        [key, String(value)]
      );
    }

    const hash = await bcrypt.hash(seedAdmin.password, 10);
    await q(
      "INSERT INTO users (name, email, password_hash, role) VALUES (?,?,?,?) ON DUPLICATE KEY UPDATE name=VALUES(name)",
      [seedAdmin.name, seedAdmin.email.toLowerCase(), hash, seedAdmin.role]
    );

    return NextResponse.json({
      ok: true,
      message: "✅ Seeded categories, products, settings and the admin user. Log in at /login.",
    });
  } catch (e) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}
