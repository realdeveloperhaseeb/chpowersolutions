import Link from "next/link";
import Image from "next/image";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";
import { getCategories, getFeaturedProducts } from "@/lib/store";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";
import {
  IconArrow,
  IconBolt,
  IconShield,
  IconTruck,
  IconHeadset,
} from "@/components/icons";

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

export default async function HomePage() {
  const [categories, featured] = await Promise.all([
    getCategories(),
    getFeaturedProducts(),
  ]);

  return (
    <>
      <Hero />

      {/* Features */}
      <section className="container-x py-16">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <div className="card h-full p-6 transition-all hover:-translate-y-1 hover:shadow-soft">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <f.icon />
                </span>
                <h3 className="mt-4 font-bold text-slate-900">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{f.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container-x py-8">
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

      {/* Featured products */}
      <section className="container-x py-16">
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
