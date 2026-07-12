"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/site";
import { IconCart } from "@/components/icons";

export default function ProductCard({ product, index = 0 }) {
  const { add } = useCart();

  const cartItem = {
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: product.price,
    image: product.images?.[0],
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
      className="group card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-soft"
    >
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width:768px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {product.oldPrice && (
            <span className="absolute left-3 top-3 rounded-full bg-brand-600 px-2.5 py-1 text-[11px] font-bold text-white">
              Save {formatPrice(product.oldPrice - product.price)}
            </span>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/products/${product.slug}`}>
          <h3 className="line-clamp-1 text-[1.05rem] font-bold tracking-tight text-slate-900 group-hover:text-brand-600">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 line-clamp-2 text-[0.9rem] text-slate-500">{product.shortDesc}</p>

        <div className="mt-3 flex items-end justify-between">
          <div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">
              {formatPrice(product.price)}
            </span>
            {product.oldPrice && (
              <span className="ml-2 text-sm text-slate-400 line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>
          <button
            onClick={() => add(cartItem, 1)}
            className="grid h-10 w-10 place-items-center rounded-full bg-brand-50 text-brand-600 transition-all hover:bg-brand-600 hover:text-white active:scale-90"
            aria-label={`Add ${product.name} to cart`}
          >
            <IconCart />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
