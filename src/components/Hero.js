"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { IconArrow, IconBolt, IconCheck } from "@/components/icons";
import { img } from "@/lib/data";

const points = ["Up to 98.8% efficiency", "2–3 year warranty", "Nationwide delivery"];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="glow pointer-events-none absolute inset-0" />
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-70" />

      <div className="container-x relative grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="chip"
          >
            <IconBolt className="h-4 w-4" /> Powering homes & industry
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-5 text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
          >
            Reliable{" "}
            <span className="relative text-brand-600">
              Solar Inverters
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 8" fill="none">
                <path d="M2 5c40-4 156-4 196 0" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>{" "}
            for every need
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-6 max-w-lg text-lg leading-relaxed text-slate-600"
          >
            From 6kW home systems to 20kW industrial power — plus hybrid inverters
            and repair circuits. Clean energy, lower bills, uninterrupted power.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.19 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link href="/products" className="btn-primary">
              Explore Products <IconArrow />
            </Link>
            <Link href="/contact" className="btn-outline">
              Get a Quote
            </Link>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="mt-8 flex flex-wrap gap-x-6 gap-y-2"
          >
            {points.map((p) => (
              <li key={p} className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-brand-50 text-brand-600">
                  <IconCheck className="h-3.5 w-3.5" />
                </span>
                {p}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-[2rem] bg-brand-600/10 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-slate-100 bg-white shadow-card">
            <div className="relative aspect-[4/3]">
              <Image
                src={img("hero-inverter", 900, 700)}
                alt="Solar inverter"
                fill
                priority
                sizes="(max-width:1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* floating stat cards */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-4 bottom-8 rounded-2xl border border-slate-100 bg-white p-4 shadow-card"
          >
            <p className="text-2xl font-extrabold text-brand-600">20kW</p>
            <p className="text-xs text-slate-500">Max power range</p>
          </motion.div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-3 top-8 rounded-2xl border border-slate-100 bg-white p-4 shadow-card"
          >
            <p className="text-2xl font-extrabold text-slate-900">98.8%</p>
            <p className="text-xs text-slate-500">Peak efficiency</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
