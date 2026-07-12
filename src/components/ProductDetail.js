"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/site";
import { IconCart, IconCheck, IconStar, IconShield, IconTruck } from "@/components/icons";

export default function ProductDetail({ product }) {
  const { add } = useCart();
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const cartItem = {
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: product.price,
    image: product.images?.[0],
  };

  function handleAdd() {
    add(cartItem, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  }

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      {/* Gallery */}
      <div>
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-slate-100 bg-slate-50">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeImg}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Image
                src={product.images[activeImg]}
                alt={product.name}
                fill
                priority
                sizes="(max-width:1024px) 100vw, 50vw"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-4 flex gap-3">
          {product.images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActiveImg(i)}
              className={`relative aspect-square w-20 overflow-hidden rounded-xl border-2 transition-all ${
                activeImg === i ? "border-brand-600" : "border-slate-100 hover:border-brand-300"
              }`}
            >
              <Image src={src} alt={`${product.name} ${i + 1}`} fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Info */}
      <div>
        <Link
          href={`/category/${product.categorySlug}`}
          className="chip hover:bg-brand-100"
        >
          {product.categorySlug.replace(/-/g, " ")}
        </Link>

        <h1 className="mt-4 text-[2rem] font-extrabold tracking-[-0.03em] text-slate-900 sm:text-[2.5rem]">
          {product.name}
        </h1>

        <div className="mt-3 flex items-center gap-2 text-amber-400">
          {Array.from({ length: 5 }).map((_, i) => (
            <IconStar key={i} />
          ))}
          <span className="text-sm text-slate-500">In stock ({product.stock} available)</span>
        </div>

        <p className="mt-5 leading-relaxed text-slate-600">{product.description}</p>

        <div className="mt-6 flex items-end gap-3">
          <span className="text-3xl font-extrabold text-slate-900">
            {formatPrice(product.price)}
          </span>
          {product.oldPrice && (
            <span className="pb-1 text-lg text-slate-400 line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>

        {/* Qty + add */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <div className="flex items-center rounded-full border border-slate-200">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="grid h-11 w-11 place-items-center rounded-full text-lg text-slate-600 hover:text-brand-600"
              aria-label="Decrease"
            >
              −
            </button>
            <span className="w-8 text-center font-bold">{qty}</span>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="grid h-11 w-11 place-items-center rounded-full text-lg text-slate-600 hover:text-brand-600"
              aria-label="Increase"
            >
              +
            </button>
          </div>

          <button onClick={handleAdd} className="btn-primary flex-1 sm:flex-none">
            {added ? (
              <>
                <IconCheck className="h-5 w-5" /> Added to cart
              </>
            ) : (
              <>
                <IconCart /> Add to cart
              </>
            )}
          </button>
          <Link href="/cart" className="btn-outline">
            Go to cart
          </Link>
        </div>

        {/* trust row */}
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600">
          <span className="flex items-center gap-2">
            <IconShield className="h-5 w-5 text-brand-600" /> Genuine with warranty
          </span>
          <span className="flex items-center gap-2">
            <IconTruck className="h-5 w-5 text-brand-600" /> Nationwide delivery
          </span>
        </div>

        {/* Specs */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-100">
          <div className="border-b border-slate-100 bg-slate-50 px-5 py-3 text-sm font-bold text-slate-900">
            Specifications
          </div>
          <dl className="divide-y divide-slate-100">
            {Object.entries(product.specs).map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 px-5 py-3 text-sm">
                <dt className="text-slate-500">{k}</dt>
                <dd className="text-right font-semibold text-slate-900">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
