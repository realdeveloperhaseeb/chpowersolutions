"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";

// Client-side category filter + search over the passed product list.
export default function ProductsExplorer({ products, categories, query = "" }) {
  const [active, setActive] = useState("all");

  const filters = [{ slug: "all", name: "All" }, ...categories.map((c) => ({ slug: c.slug, name: c.name }))];

  const q = query.trim().toLowerCase();
  const visible = useMemo(() => {
    let list = active === "all" ? products : products.filter((p) => p.categorySlug === active);
    if (q) {
      list = list.filter((p) =>
        `${p.name} ${p.shortDesc || ""} ${p.description || ""}`.toLowerCase().includes(q)
      );
    }
    return list;
  }, [active, products, q]);

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => {
          const on = active === f.slug;
          return (
            <button
              key={f.slug}
              onClick={() => setActive(f.slug)}
              className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                on ? "text-white" : "text-slate-600 hover:text-brand-600"
              }`}
            >
              {on && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-full bg-brand-600"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative">{f.name}</span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="mt-8 grid grid-cols-2 gap-5 lg:grid-cols-4">
        {visible.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>

      {visible.length === 0 && (
        <p className="mt-12 text-center text-slate-500">
          {q ? `No products match “${query}”.` : "No products in this category yet."}
        </p>
      )}
    </div>
  );
}
