"use client";

import { useState } from "react";
import ImageUploader from "@/components/admin/ImageUploader";

const field =
  "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-brand-400 focus:ring-4 focus:ring-brand-50";
const label = "mb-1.5 block text-sm font-semibold text-slate-700";

export default function CategoryForm({ category, onSaved, onCancel }) {
  const editing = Boolean(category);
  const [image, setImage] = useState(category?.image ? [category.image] : []);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: category?.name || "",
    tagline: category?.tagline || "",
    description: category?.description || "",
    metaTitle: category?.metaTitle || "",
    metaDesc: category?.metaDesc || "",
  });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function submit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const payload = { ...form, image: image[0] || "" };
    const url = editing ? `/api/admin/categories/${category.id}` : "/api/admin/categories";
    const res = await fetch(url, {
      method: editing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    setSaving(false);
    if (!res.ok) return setError(data.error || "Save failed");
    onSaved(data.category);
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label className={label}>Category name *</label>
        <input required className={field} value={form.name} onChange={set("name")} placeholder="e.g. Solar Inverters" />
      </div>
      <div>
        <label className={label}>Tagline</label>
        <input className={field} value={form.tagline} onChange={set("tagline")} placeholder="Short subtitle" />
      </div>
      <div>
        <label className={label}>Description</label>
        <textarea rows={3} className={field} value={form.description} onChange={set("description")} />
      </div>
      <div>
        <label className={label}>Category image</label>
        <ImageUploader images={image} onChange={(imgs) => setImage(imgs.slice(-1))} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label}>Meta title</label>
          <input className={field} value={form.metaTitle} onChange={set("metaTitle")} />
        </div>
        <div>
          <label className={label}>Meta description</label>
          <input className={field} value={form.metaDesc} onChange={set("metaDesc")} />
        </div>
      </div>

      {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

      <div className="flex gap-3 pt-1">
        <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
          {saving ? "Saving…" : editing ? "Save changes" : "Create category"}
        </button>
        <button type="button" onClick={onCancel} className="btn-ghost">Cancel</button>
      </div>
    </form>
  );
}
