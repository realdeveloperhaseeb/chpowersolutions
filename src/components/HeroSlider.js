"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { IconArrow } from "@/components/icons";

// Main rotating banners (our own images).
const slides = [
  {
    image: "/images/hero-solar.jpg",
    eyebrow: "Solar Inverters",
    title: "Reliable Power, 6kW to 20kW",
    subtitle: "High-efficiency on-grid & hybrid inverters for homes, shops and industry.",
    cta: "Shop Inverters",
    href: "/category/solar-inverters",
  },
  {
    image: "/images/about-solar.jpg",
    eyebrow: "Complete Solutions",
    title: "From Panels to Power",
    subtitle: "Trusted solar systems with nationwide delivery and expert support.",
    cta: "Explore Products",
    href: "/products",
  },
  {
    image: "/images/cat-solar-inverters.jpg",
    eyebrow: "Best Value",
    title: "Genuine & Warranty-Backed",
    subtitle: "Save more with our best-priced inverters and repair circuits.",
    cta: "View Deals",
    href: "/products",
  },
];

// Secondary promo cards.
const promos = [
  {
    image: "/images/cat-hybrid-inverters.jpg",
    title: "Hybrid Inverters",
    subtitle: "Battery backup ready",
    href: "/category/hybrid-inverters",
  },
  {
    image: "/images/promo-circuit.jpg",
    title: "Repair Circuits",
    subtitle: "3kW+ control boards",
    href: "/category/inverter-circuits",
  },
];

export default function HeroSlider() {
  const [i, setI] = useState(0);
  const n = slides.length;
  const go = useCallback((d) => setI((p) => (p + d + n) % n), [n]);

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % n), 5500);
    return () => clearInterval(t);
  }, [n]);

  const s = slides[i];

  return (
    <section className="container-x py-6">
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Main slider */}
        <div className="group relative overflow-hidden rounded-2xl lg:col-span-2">
          <div className="relative aspect-[16/10] sm:aspect-[2/1] lg:aspect-[16/7]">
            <AnimatePresence mode="wait">
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  priority
                  sizes="(max-width:1024px) 100vw, 66vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-900/45 to-transparent" />
                <div className="absolute inset-0 flex max-w-lg flex-col justify-center gap-3 p-6 sm:p-10">
                  <span className="w-fit rounded-full bg-white/15 px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-white backdrop-blur">
                    {s.eyebrow}
                  </span>
                  <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
                    {s.title}
                  </h1>
                  <p className="max-w-md text-sm text-white/85 sm:text-base">{s.subtitle}</p>
                  <Link href={s.href} className="btn-primary w-fit">
                    {s.cta} <IconArrow />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Arrows */}
          <button
            onClick={() => go(-1)}
            aria-label="Previous"
            className="absolute left-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/80 text-lg font-bold text-slate-800 opacity-0 transition-opacity hover:bg-white group-hover:opacity-100"
          >
            ‹
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next"
            className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/80 text-lg font-bold text-slate-800 opacity-0 transition-opacity hover:bg-white group-hover:opacity-100"
          >
            ›
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-6 flex gap-1.5 sm:left-10">
            {slides.map((_, k) => (
              <button
                key={k}
                onClick={() => setI(k)}
                aria-label={`Slide ${k + 1}`}
                className={`h-2 rounded-full transition-all ${k === i ? "w-6 bg-white" : "w-2 bg-white/50 hover:bg-white/80"}`}
              />
            ))}
          </div>
        </div>

        {/* Promo cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:grid-rows-2">
          {promos.map((p) => (
            <Link key={p.href} href={p.href} className="group relative overflow-hidden rounded-2xl">
              <div className="relative h-40 sm:h-44 lg:h-full lg:min-h-[8rem]">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(max-width:1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-4">
                  <h3 className="text-lg font-extrabold text-white">{p.title}</h3>
                  <p className="text-xs text-white/85">{p.subtitle}</p>
                  <span className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-white">
                    Shop now <IconArrow className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
