"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import CategoryForm from "@/components/admin/CategoryForm";
import { IconTrash } from "@/components/icons";

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);

  async function load() {
    setLoading(true);
    const c = await fetch("/api/admin/categories").then((r) => r.json());
    setCategories(c.categories || []);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function remove(id) {
    if (!confirm("Delete this category? Products keep working but lose their category link.")) return;
    await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
    setCategories((list) => list.filter((c) => c.id !== id));
  }

  function onSaved() { setEditing(null); load(); }

  if (editing) {
    return (
      <div>
        <button onClick={() => setEditing(null)} className="mb-4 text-sm font-semibold text-slate-500 hover:text-brand-600">
          ← Back to categories
        </button>
        <h1 className="mb-6 text-2xl font-extrabold text-slate-900">
          {editing === "new" ? "New category" : "Edit category"}
        </h1>
        <div className="max-w-2xl rounded-2xl border border-slate-200 bg-white p-6">
          <CategoryForm
            category={editing === "new" ? null : editing}
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
          <h1 className="text-2xl font-extrabold text-slate-900">Categories</h1>
          <p className="mt-1 text-slate-500">{categories.length} categories</p>
        </div>
        <button onClick={() => setEditing("new")} className="btn-primary">＋ Add category</button>
      </div>

      {loading ? (
        <p className="mt-10 text-slate-500">Loading…</p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c) => (
            <div key={c.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <div className="relative aspect-[16/9] bg-slate-100">
                {c.image && <Image src={c.image} alt={c.name} fill sizes="300px" className="object-cover" />}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-slate-900">{c.name}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-slate-500">{c.tagline || c.description}</p>
                <div className="mt-3 flex gap-2">
                  <button onClick={() => setEditing(c)} className="rounded-lg bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-600 hover:bg-brand-100">
                    Edit
                  </button>
                  <button onClick={() => remove(c.id)} className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600">
                    <IconTrash className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {categories.length === 0 && <p className="text-slate-400">No categories yet.</p>}
        </div>
      )}
    </div>
  );
}
