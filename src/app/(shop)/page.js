import Link from "next/link";
import Image from "next/image";
import HeroSlider from "@/components/HeroSlider";
import Reveal from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";
import ProductRow from "@/components/ProductRow";
import {
  getCategories,
  getFeaturedProducts,
  getProducts,
  getProductsByCategory,
} from "@/lib/store";
import { site } from "@/lib/site";
import {
  IconArrow,
  IconBolt,
  IconShield,
  IconTruck,
  IconHeadset,
} from "@/components/icons";

export const dynamic = "force-dynamic";

const trending = ["6kW Inverter", "10kW Inverter", "Hybrid", "20kW", "Circuit Board", "Solar"];

const features = [
  { icon: IconBolt, title: "High Efficiency", text: "Up to 98.8% conversion so you get more usable power from every panel." },
  { icon: IconShield, title: "Trusted Warranty", text: "2–3 year warranty on inverters and 6 months on repair circuits." },
  { icon: IconTruck, title: "Nationwide Delivery", text: "Safe, insured shipping to every city across Pakistan." },
  { icon: IconHeadset, title: "Expert Support", text: "Guidance on sizing, installation and after-sales help." },
];

const stats = [
  { value: "5,000+", label: "Systems delivered" },
  { value: "6–20kW", label: "Power range" },
  { value: "98.8%", label: "Peak efficiency" },
  { value: "24/7", label: "Support" },
];

export const metadata = {
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
};

const discountPct = (p) => (p.oldPrice > p.price ? (p.oldPrice - p.price) / p.oldPrice : 0);

export default async function HomePage() {
  const [categories, featured, allProducts] = await Promise.all([
    getCategories(),
    getFeaturedProducts(),
    getProducts(),
  ]);

  const deals = allProducts
    .filter((p) => p.oldPrice > p.price)
    .sort((a, b) => discountPct(b) - discountPct(a))
    .slice(0, 8);

  const categoryRows = await Promise.all(
    categories.map(async (c) => ({ category: c, products: await getProductsByCategory(c.slug) }))
  );

  return (
    <>
      <HeroSlider />

      {/* Trending searches */}
      <section className="border-b border-slate-100 bg-slate-50">
        <div className="container-x flex flex-wrap items-center gap-2 py-3">
          <span className="text-sm font-bold text-slate-700">Trending:</span>
          {trending.map((t) => (
            <Link
              key={t}
              href={`/products?q=${encodeURIComponent(t)}`}
              className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 transition-colors hover:border-brand-300 hover:text-brand-600"
            >
              {t}
            </Link>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container-x py-12">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="chip">Shop by category</span>
          <h2 className="section-title mt-4">Find the right power solution</h2>
          <p className="mt-3 text-slate-600">
            Browse our range of solar inverters, hybrid systems and repair circuits.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {categories.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.1}>
              <Link
                href={`/category/${c.slug}`}
                className="group card block overflow-hidden transition-all hover:-translate-y-1 hover:shadow-soft"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={c.image}
                    alt={c.name}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white">{c.name}</h3>
                    <p className="text-sm text-white/80">{c.tagline}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4">
                  <p className="line-clamp-1 text-sm text-slate-500">{c.description}</p>
                  <span className="text-brand-600 transition-transform group-hover:translate-x-1">
                    <IconArrow />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Hot deals carousel */}
      <div className="border-y border-slate-100 bg-white">
        <ProductRow
          title="🔥 Hot Deals"
          subtitle="Biggest savings this week"
          href="/products"
          products={deals}
        />
      </div>

      {/* Featured products */}
      <section className="container-x py-12">
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="chip">Best sellers</span>
            <h2 className="section-title mt-4">Featured inverters</h2>
          </div>
          <Link href="/products" className="btn-outline">
            View all <IconArrow />
          </Link>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* Per-category product rows */}
      {categoryRows.map(({ category, products }) => (
        <ProductRow
          key={category.slug}
          title={category.name}
          subtitle={category.tagline}
          href={`/category/${category.slug}`}
          products={products}
        />
      ))}

      {/* Trust band */}
      <section className="border-t border-slate-100 bg-slate-50">
        <div className="container-x grid gap-5 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <div className="flex items-start gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white text-brand-600 shadow-sm">
                  <f.icon />
                </span>
                <div>
                  <h3 className="font-bold text-slate-900">{f.title}</h3>
                  <p className="mt-0.5 text-sm leading-relaxed text-slate-500">{f.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Stats band */}
      <section className="bg-brand-600">
        <div className="container-x grid grid-cols-2 gap-8 py-14 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="text-center">
              <p className="text-3xl font-extrabold text-white sm:text-4xl">{s.value}</p>
              <p className="mt-1 text-sm text-brand-100">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-x py-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-slate-100 bg-slate-50 p-10 text-center sm:p-16">
            <div className="glow pointer-events-none absolute inset-0" />
            <div className="relative">
              <h2 className="section-title">Ready to power up with solar?</h2>
              <p className="mx-auto mt-3 max-w-xl text-slate-600">
                Tell us your load and roof size — we&apos;ll recommend the right
                inverter and give you a same-day quote.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/products" className="btn-primary">
                  Shop Inverters <IconArrow />
                </Link>
                <Link href="/contact" className="btn-outline">
                  Talk to an expert
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
