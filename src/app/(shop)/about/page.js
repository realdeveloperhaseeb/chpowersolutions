import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { img } from "@/lib/store/seed-data";
import { site } from "@/lib/site";
import { IconArrow, IconCheck, IconBolt, IconShield, IconHeadset } from "@/components/icons";

export const metadata = {
  title: "About Us",
  description:
    "CH Power Solutions is a Pakistan-based supplier of solar inverters, hybrid systems and power circuits. Learn about our mission to deliver reliable, affordable clean energy.",
};

const values = [
  { icon: IconBolt, title: "Efficiency first", text: "We source inverters with the highest conversion rates so customers save more." },
  { icon: IconShield, title: "Built to last", text: "Every product is tested and backed by a genuine warranty." },
  { icon: IconHeadset, title: "People-first support", text: "From sizing to after-sales, real humans help you at every step." },
];

const checklist = [
  "Genuine, tested products",
  "Transparent pricing in PKR",
  "Nationwide insured delivery",
  "Expert sizing advice",
  "After-sales & warranty support",
  "Solutions for home, shop & industry",
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-100">
        <div className="glow pointer-events-none absolute inset-0" />
        <div className="container-x relative py-16 text-center sm:py-20">
          <Reveal>
            <span className="chip">About {site.short}</span>
            <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Clean, reliable power for every home and business
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
              {site.name} helps families and businesses across Pakistan cut electricity
              bills and beat load-shedding with dependable solar and hybrid inverters.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="container-x grid items-center gap-12 py-16 lg:grid-cols-2">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-slate-100 shadow-card">
            <div className="relative aspect-[4/3]">
              <Image
                src={img("about-story", 900, 700)}
                alt="Solar power installation"
                fill
                sizes="(max-width:1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <span className="chip">Our story</span>
          <h2 className="section-title mt-4">Making solar simple and affordable</h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            We started {site.name} with one goal: make quality solar power accessible.
            Rising energy costs and frequent outages push families and businesses to
            look for a better solution — but the market is confusing and full of
            unreliable products.
          </p>
          <p className="mt-4 leading-relaxed text-slate-600">
            We fix that by offering a focused range of trusted inverters — from 6kW home
            systems to 20kW industrial units — with honest pricing, real specifications
            and support you can actually reach.
          </p>
          <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {checklist.map((c) => (
              <li key={c} className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-brand-50 text-brand-600">
                  <IconCheck className="h-3.5 w-3.5" />
                </span>
                {c}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* Values */}
      <section className="bg-slate-50">
        <div className="container-x py-16">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="chip">What we stand for</span>
            <h2 className="section-title mt-4">Our values</h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1}>
                <div className="card h-full p-6">
                  <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-600">
                    <v.icon />
                  </span>
                  <h3 className="mt-4 font-bold text-slate-900">{v.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-x py-20">
        <Reveal className="text-center">
          <h2 className="section-title">Let&apos;s build your power solution</h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-600">
            Browse our inverters or reach out for a tailored recommendation.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/products" className="btn-primary">
              View Products <IconArrow />
            </Link>
            <Link href="/contact" className="btn-outline">
              Contact Us
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
