"use client";

import { useState } from "react";
import ImageUploader from "@/components/admin/ImageUploader";
import { specsToText } from "@/lib/utils";

const field =
  "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-brand-400 focus:ring-4 focus:ring-brand-50";
const label = "mb-1.5 block text-sm font-semibold text-slate-700";

export default function ProductForm({ product, categories, onSaved, onCancel }) {
  const editing = Boolean(product);
  const [images, setImages] = useState(product?.images || []);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: product?.name || "",
    categoryId: product?.categoryId || categories[0]?.id || "",
    price: product?.price ?? "",
    oldPrice: product?.oldPrice ?? "",
    stock: product?.stock ?? 0,
    featured: product?.featured || false,
    shortDesc: product?.shortDesc || "",
    description: product?.description || "",
    specs: product ? specsToText(product.specs) : "",
    metaTitle: product?.metaTitle || "",
    metaDesc: product?.metaDesc || "",
  });

  const set = (k) => (e) =>
    setForm((f) => ({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  async function submit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const payload = { ...form, images };
    const url = editing ? `/api/admin/products/${product.id}` : "/api/admin/products";
    const res = await fetch(url, {
      method: editing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    setSaving(false);
    if (!res.ok) return setError(data.error || "Save failed");
    onSaved(data.product);
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={label}>Product name *</label>
          <input required className={field} value={form.name} onChange={set("name")} placeholder="e.g. 6kW Solar Inverter" />
        </div>

        <div>
          <label className={label}>Category</label>
          <select className={field} value={form.categoryId} onChange={set("categoryId")}>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={label}>Stock</label>
          <input type="number" className={field} value={form.stock} onChange={set("stock")} />
        </div>

        <div>
          <label className={label}>Price (PKR) *</label>
          <input required type="number" className={field} value={form.price} onChange={set("price")} placeholder="185000" />
        </div>
        <div>
          <label className={label}>Old price (optional)</label>
          <input type="number" className={field} value={form.oldPrice} onChange={set("oldPrice")} placeholder="210000" />
        </div>
      </div>

      <div>
        <label className={label}>Product images</label>
        <ImageUploader images={images} onChange={setImages} />
      </div>

      <div>
        <label className={label}>Short description</label>
        <input className={field} value={form.shortDesc} onChange={set("shortDesc")} placeholder="One-line summary shown on cards" />
      </div>

      <div>
        <label className={label}>Full description</label>
        <textarea rows={4} className={field} value={form.description} onChange={set("description")} />
      </div>

      <div>
        <label className={label}>Specifications</label>
        <textarea
          rows={5}
          className={`${field} font-mono text-xs`}
          value={form.specs}
          onChange={set("specs")}
          placeholder={"Rated Power: 6000W\nOutput: Pure Sine Wave\nWarranty: 2 Years"}
        />
        <p className="mt-1 text-xs text-slate-400">One per line, as <code>Key: Value</code>.</p>
      </div>

      <div className="rounded-2xl bg-slate-50 p-4">
        <p className="mb-3 text-sm font-bold text-slate-700">SEO</p>
        <div className="space-y-4">
          <div>
            <label className={label}>Meta title</label>
            <input className={field} value={form.metaTitle} onChange={set("metaTitle")} placeholder="Defaults to product name" />
          </div>
          <div>
            <label className={label}>Meta description</label>
            <textarea rows={2} className={field} value={form.metaDesc} onChange={set("metaDesc")} />
          </div>
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
        <input type="checkbox" className="h-4 w-4 accent-brand-600" checked={form.featured} onChange={set("featured")} />
        Feature on homepage
      </label>

      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
          {saving ? "Saving…" : editing ? "Save changes" : "Create product"}
        </button>
        <button type="button" onClick={onCancel} className="btn-ghost">
          Cancel
        </button>
      </div>
    </form>
  );
}
