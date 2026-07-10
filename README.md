# CH Power Solutions — Ecommerce (Next.js)

Ecommerce website for solar inverters & power circuits. Clean, light, SEO-first,
deployable on Hostinger Business (Node.js).

**Stack:** Next.js 14 (App Router, JS) · Tailwind CSS · Plus Jakarta Sans · Framer Motion.
Backend (MySQL + auth + admin + orders) is added in later phases.

## Build status — Phase 1 (Frontend UI) ✅

Public pages with dummy data + animations:

- **Home** — hero, features, categories, featured products, stats, CTA
- **About**, **Contact** (form)
- **Products** (category filter) · **Category** pages · **Product detail** (gallery, specs, add-to-cart)
- **Cart** (persists in `localStorage`)
- SEO: per-page metadata, dynamic product/category meta, `sitemap.xml`, `robots.txt`, JSON-LD Product schema

> Product images are **dummy placeholders** (picsum.photos) for the UI. Real product
> images are uploaded from the admin dashboard in a later phase.

## Getting started

```bash
pnpm install     # or: npm install
pnpm dev         # http://localhost:3000
pnpm build && pnpm start   # production
```

> This project was installed with **pnpm** (via `corepack pnpm`). `npm install` also works.

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

- **Phase 2** — MySQL (`mysql2`) + lightweight auth (bcrypt + JWT cookie) + Admin dashboard (products/categories CRUD, settings)
- **Phase 3** — Cart → Checkout (login gate, delivery details, payment info, screenshot upload) → Orders + email notifications (Nodemailer)
- **Phase 4** — Hostinger Business deploy guide

## Payments (planned)

Manual flow: **Bank transfer** or **Cash on delivery**. Customer submits order +
payment screenshot → admin reviews → accepts. Payment details editable from admin Settings.
Currency: **PKR**.
