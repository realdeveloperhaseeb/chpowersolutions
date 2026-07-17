import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { q, isDbConfigured } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import {
  seedCategories,
  seedProducts,
  seedSettings,
  seedAdmin,
} from "@/lib/store/seed-data";

export const dynamic = "force-dynamic";

async function upsertCategories() {
  for (const c of seedCategories) {
    await q(
      `INSERT INTO categories (id, name, slug, tagline, description, meta_title, meta_desc, image)
       VALUES (?,?,?,?,?,?,?,?)
       ON DUPLICATE KEY UPDATE name=VALUES(name), tagline=VALUES(tagline), description=VALUES(description),
         meta_title=VALUES(meta_title), meta_desc=VALUES(meta_desc), image=VALUES(image)`,
      [c.id, c.name, c.slug, c.tagline, c.description, c.metaTitle, c.metaDesc, c.image]
    );
  }
}

async function upsertProducts() {
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
}

// One-time database seeding via URL (for hosts without terminal access).
//   /api/setup            → first run only: seeds everything + admin.
//   /api/setup?resync=1   → admin-only: refreshes catalog IMAGES + phone number
//                           from the latest code, WITHOUT touching your other
//                           settings (Web3Forms key, payment details) or users.
export async function GET(req) {
  if (!isDbConfigured()) {
    return NextResponse.json(
      { ok: false, error: "No database configured. Set DB_* env vars first." },
      { status: 400 }
    );
  }

  const resync = new URL(req.url).searchParams.get("resync") === "1";

  try {
    const admins = await q("SELECT id FROM users WHERE role = 'admin' LIMIT 1");

    // ---- Re-sync mode (admin only) ----
    if (resync) {
      const user = await getCurrentUser();
      if (!user || user.role !== "admin") {
        return NextResponse.json(
          { ok: false, error: "Log in as admin first, then open this URL again." },
          { status: 401 }
        );
      }
      await upsertCategories();
      await upsertProducts();
      for (const key of ["site_phone", "site_whatsapp"]) {
        await q(
          "INSERT INTO settings (`key`,`value`) VALUES (?,?) ON DUPLICATE KEY UPDATE `value`=VALUES(`value`)",
          [key, String(seedSettings[key])]
        );
      }
      return NextResponse.json({
        ok: true,
        resynced: true,
        message:
          "✅ Re-synced product images and phone number from the latest code. Your other settings (Web3Forms key, payment details) were preserved.",
      });
    }

    // ---- First-run seeding ----
    if (admins.length) {
      return NextResponse.json({
        ok: true,
        alreadySeeded: true,
        message:
          "Already set up. To refresh product images/phone after an update, log in as admin and open /api/setup?resync=1",
      });
    }

    await upsertCategories();
    await upsertProducts();

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
