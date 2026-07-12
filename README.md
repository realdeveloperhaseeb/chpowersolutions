# CH Power Solutions — Ecommerce (Next.js)

Ecommerce website for solar inverters & power circuits. Clean, light, SEO-first,
deployable on Hostinger Business (Node.js).

**Stack:** Next.js 14 (App Router, JS) · Tailwind CSS · Plus Jakarta Sans · Framer Motion.
Backend (MySQL + auth + admin + orders) is added in later phases.

## Build status

**Phase 1 — Frontend UI ✅** · **Phase 2 — Database + Auth + Admin ✅** · **Phase 3 — Checkout + Orders + Email ✅** · **Phase 4 — Hostinger deploy guide ✅**

> **Deploying?** See **[DEPLOY.md](DEPLOY.md)** for the full Hostinger Business walkthrough.

Storefront: Home · About · Contact · Products (category filter) · Category pages ·
Product detail (gallery, specs, add-to-cart) · Cart (`localStorage`) · Login/Register.
SEO: per-page metadata, dynamic product/category meta, `sitemap.xml`, `robots.txt`, JSON-LD.

Admin dashboard (`/admin`, admin-only): Dashboard · **Products CRUD** (image upload,
specs, SEO meta) · **Categories CRUD** · **Settings** (bank details, site info) · Orders (Phase 3).

Auth: bcrypt + JWT httpOnly cookie, `admin`/`user` roles, middleware-gated `/admin`.
Forgot-password routes users to support email + WhatsApp (manual reset).

Checkout (login-gated): delivery details · Bank transfer (with payment details from
settings + screenshot upload) or Cash on delivery · server-validated totals · order
confirmation. Customers track orders at `/orders`; admins accept/reject at `/admin/orders`.

**Emails** — two paths:
- **No SMTP (recommended):** paste a free **Web3Forms** access key in Admin → Settings.
  New-order + enquiry notifications are delivered to your inbox from the browser — no
  mail server. (Orders are always saved in Admin → Orders regardless.)
- **SMTP (optional):** set `SMTP_*` env vars to also email customers (order received /
  confirmed / rejected). Notify inbox = `notify_email` (**arslanarain1514@gmail.com**,
  editable in Admin → Settings).

Contact details in the footer/contact page are editable from Admin → Settings.

Accent is the logo **red**; brand mark uses `public/logo.jpeg`.

## Data store — MySQL with automatic in-memory fallback

The app reads/writes through `src/lib/store`. If `DB_HOST`/`DB_NAME` are **set**, it uses
**MySQL** (`mysql2`). If not, it falls back to an **in-memory store** seeded from
`src/lib/store/seed-data.js` — so the site + admin are fully usable locally without a
database (data resets on restart). The active mode is shown in the admin sidebar.

### Default admin login (seed)

```
email:    arslanarain1514@gmail.com
password: 1514arslanarain      (change after first login)
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

## Deployment

Hostinger Business (Node.js app). Startup file is **`server.js`**; build with
`npm run build`, seed with `npm run db:seed`. Full step-by-step: **[DEPLOY.md](DEPLOY.md)**.

## Payments (planned)

Manual flow: **Bank transfer** or **Cash on delivery**. Customer submits order +
payment screenshot → admin reviews → accepts. Payment details editable from admin Settings.
Currency: **PKR**.
