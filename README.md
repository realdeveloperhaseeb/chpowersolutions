# CH Power Solutions — Ecommerce (Next.js)

Ecommerce website for solar inverters & power circuits. Clean, light, SEO-first,
deployable on Hostinger Business (Node.js).

**Stack:** Next.js 14 (App Router, JS) · Tailwind CSS · Plus Jakarta Sans · Framer Motion.
Backend (MySQL + auth + admin + orders) is added in later phases.

## Build status

**Phase 1 — Frontend UI ✅** · **Phase 2 — Database + Auth + Admin ✅**

Storefront: Home · About · Contact · Products (category filter) · Category pages ·
Product detail (gallery, specs, add-to-cart) · Cart (`localStorage`) · Login/Register.
SEO: per-page metadata, dynamic product/category meta, `sitemap.xml`, `robots.txt`, JSON-LD.

Admin dashboard (`/admin`, admin-only): Dashboard · **Products CRUD** (image upload,
specs, SEO meta) · **Categories CRUD** · **Settings** (bank details, site info) · Orders (Phase 3).

Auth: bcrypt + JWT httpOnly cookie, `admin`/`user` roles, middleware-gated `/admin`.

Accent is the logo **red**; brand mark uses `public/logo.jpeg`.

## Data store — MySQL with automatic in-memory fallback

The app reads/writes through `src/lib/store`. If `DB_HOST`/`DB_NAME` are **set**, it uses
**MySQL** (`mysql2`). If not, it falls back to an **in-memory store** seeded from
`src/lib/store/seed-data.js` — so the site + admin are fully usable locally without a
database (data resets on restart). The active mode is shown in the admin sidebar.

### Default admin login (seed)

```
email:    admin@chpowersolutions.com
password: admin12345      (change after first login)
```

## Getting started

```bash
pnpm install                 # or: npm install
cp .env.example .env         # optional — leave DB_* blank to use the in-memory store
pnpm dev                     # http://localhost:3000
pnpm build && pnpm start     # production
```

> Installed with **pnpm** (via `corepack pnpm`). `npm install` also works.

### Using MySQL (local or Hostinger)

1. Create a database, fill `DB_*` and `JWT_SECRET` in `.env`.
2. Load the schema:  `mysql -u USER -p DB_NAME < db/schema.sql`
3. Seed it:          `node --env-file=.env db/seed.mjs`
4. `pnpm build && pnpm start` — the app now uses MySQL.

## Design tokens

- Font: Plus Jakarta Sans
- Accent: blue (`brand-600` = #2563eb) · white background · near-black text
- Config in `tailwind.config.js`; global components in `src/app/globals.css`

## Project structure

```
src/
  app/            # routes (home, about, contact, products, category, cart, checkout)
  components/     # Header, Footer, Hero, ProductCard, ProductDetail, icons, ...
  context/        # CartContext (localStorage cart)
  lib/            # site.js (config), data.js (dummy products/categories)
```

## Roadmap

- **Phase 3** — Cart → Checkout (login gate, delivery details, payment info, screenshot upload) → Orders + email notifications (Nodemailer). Order tables/APIs already scaffolded.
- **Phase 4** — Hostinger Business deploy guide

## Payments (planned)

Manual flow: **Bank transfer** or **Cash on delivery**. Customer submits order +
payment screenshot → admin reviews → accepts. Payment details editable from admin Settings.
Currency: **PKR**.
