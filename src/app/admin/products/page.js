"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ProductForm from "@/components/admin/ProductForm";
import { formatPrice } from "@/lib/site";
import { IconTrash } from "@/components/icons";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // product | "new" | null

  async function load() {
    setLoading(true);
    const [p, c] = await Promise.all([
      fetch("/api/admin/products").then((r) => r.json()),
      fetch("/api/admin/categories").then((r) => r.json()),
    ]);
    setProducts(p.products || []);
    setCategories(c.categories || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function remove(id) {
    if (!confirm("Delete this product?")) return;
    await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    setProducts((list) => list.filter((p) => p.id !== id));
  }

  function onSaved() {
    setEditing(null);
    load();
  }

  if (editing) {
    return (
      <div>
        <button onClick={() => setEditing(null)} className="mb-4 text-sm font-semibold text-slate-500 hover:text-brand-600">
          ← Back to products
        </button>
        <h1 className="mb-6 text-2xl font-extrabold text-slate-900">
          {editing === "new" ? "New product" : "Edit product"}
        </h1>
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <ProductForm
            product={editing === "new" ? null : editing}
            categories={categories}
            onSaved={onSaved}
            onCancel={() => setEditing(null)}
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Products</h1>
          <p className="mt-1 text-slate-500">{products.length} products</p>
        </div>
        <button onClick={() => setEditing("new")} className="btn-primary">＋ Add product</button>
      </div>

      {loading ? (
        <p className="mt-10 text-slate-500">Loading…</p>
      ) : (
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-100 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-400">
              <tr>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Price</th>
                <th className="hidden px-4 py-3 sm:table-cell">Stock</th>
                <th className="hidden px-4 py-3 sm:table-cell">Featured</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                        {p.images?.[0] && <Image src={p.images[0]} alt="" fill sizes="44px" className="object-cover" />}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{p.name}</p>
                        <p className="text-xs text-slate-400">{p.categorySlug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-semibold text-slate-900">{formatPrice(p.price)}</td>
                  <td className="hidden px-4 py-3 sm:table-cell">{p.stock}</td>
                  <td className="hidden px-4 py-3 sm:table-cell">
                    {p.featured ? <span className="chip">Featured</span> : <span className="text-slate-300">—</span>}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setEditing(p)} className="rounded-lg px-3 py-1.5 text-xs font-semibold text-brand-600 hover:bg-brand-50">
                        Edit
                      </button>
                      <button onClick={() => remove(p.id)} className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600">
                        <IconTrash className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-10 text-center text-slate-400">No products yet. Add your first one.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
