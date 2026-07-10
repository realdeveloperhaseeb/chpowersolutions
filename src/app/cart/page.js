"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/site";
import { IconTrash, IconArrow, IconCart } from "@/components/icons";

export default function CartPage() {
  const { items, total, count, setQty, remove, clear } = useCart();

  if (items.length === 0) {
    return (
      <section className="container-x py-24 text-center">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-brand-50 text-brand-600">
          <IconCart className="h-8 w-8" />
        </span>
        <h1 className="mt-6 text-2xl font-extrabold text-slate-900">Your cart is empty</h1>
        <p className="mt-2 text-slate-600">Browse our inverters and add something to get started.</p>
        <Link href="/products" className="btn-primary mt-8">
          Shop Products <IconArrow />
        </Link>
      </section>
    );
  }

  return (
    <section className="container-x py-12">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
        Your Cart <span className="text-lg font-medium text-slate-400">({count} items)</span>
      </h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Items */}
        <div className="lg:col-span-2">
          <ul className="space-y-4">
            <AnimatePresence initial={false}>
              {items.map((item) => (
                <motion.li
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="card flex gap-4 p-4"
                >
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                    {item.image && (
                      <Image src={item.image} alt={item.name} fill sizes="96px" className="object-cover" />
                    )}
                  </div>

                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex items-start justify-between gap-3">
                      <Link
                        href={`/products/${item.slug}`}
                        className="font-bold text-slate-900 hover:text-brand-600"
                      >
                        {item.name}
                      </Link>
                      <button
                        onClick={() => remove(item.id)}
                        className="text-slate-400 transition-colors hover:text-red-500"
                        aria-label="Remove"
                      >
                        <IconTrash />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-slate-200">
                        <button
                          onClick={() => setQty(item.id, item.qty - 1)}
                          className="grid h-9 w-9 place-items-center rounded-full text-slate-600 hover:text-brand-600"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm font-bold">{item.qty}</span>
                        <button
                          onClick={() => setQty(item.id, item.qty + 1)}
                          className="grid h-9 w-9 place-items-center rounded-full text-slate-600 hover:text-brand-600"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-extrabold text-slate-900">
                        {formatPrice(item.price * item.qty)}
                      </span>
                    </div>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>

          <button
            onClick={clear}
            className="mt-4 text-sm font-semibold text-slate-500 hover:text-red-500"
          >
            Clear cart
          </button>
        </div>

        {/* Summary */}
        <div>
          <div className="card sticky top-24 p-6">
            <h2 className="text-lg font-bold text-slate-900">Order Summary</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-slate-500">Subtotal</dt>
                <dd className="font-semibold text-slate-900">{formatPrice(total)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Delivery</dt>
                <dd className="font-semibold text-brand-600">Calculated at checkout</dd>
              </div>
              <div className="mt-4 flex justify-between border-t border-slate-100 pt-4">
                <dt className="text-base font-bold text-slate-900">Total</dt>
                <dd className="text-base font-extrabold text-slate-900">{formatPrice(total)}</dd>
              </div>
            </dl>

            <Link href="/checkout" className="btn-primary mt-6 w-full">
              Proceed to Checkout <IconArrow />
            </Link>
            <Link href="/products" className="btn-ghost mt-2 w-full">
              Continue shopping
            </Link>
            <p className="mt-4 text-center text-xs text-slate-400">
              Secure manual payment • Bank transfer or Cash on delivery
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
