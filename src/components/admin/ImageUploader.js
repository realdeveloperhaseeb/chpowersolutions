"use client";

import { useState } from "react";
import Image from "next/image";
import { IconTrash } from "@/components/icons";

// Uploads images to /api/upload and manages an ordered list of URLs.
export default function ImageUploader({ images = [], onChange }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function handleFiles(e) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setBusy(true);
    setError("");
    const urls = [];
    for (const file of files) {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (res.ok) urls.push(data.url);
      else setError(data.error || "Upload failed");
    }
    onChange([...images, ...urls]);
    setBusy(false);
    e.target.value = "";
  }

  function remove(i) {
    onChange(images.filter((_, idx) => idx !== i));
  }

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {images.map((src, i) => (
          <div key={i} className="group relative h-24 w-24 overflow-hidden rounded-xl border border-slate-200">
            <Image src={src} alt="" fill sizes="96px" className="object-cover" />
            <button
              type="button"
              onClick={() => remove(i)}
              className="absolute right-1 top-1 grid h-6 w-6 place-items-center rounded-full bg-white/90 text-red-600 opacity-0 shadow transition-opacity group-hover:opacity-100"
            >
              <IconTrash className="h-3.5 w-3.5" />
            </button>
            {i === 0 && (
              <span className="absolute bottom-1 left-1 rounded bg-brand-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
                main
              </span>
            )}
          </div>
        ))}

        <label className="grid h-24 w-24 cursor-pointer place-items-center rounded-xl border-2 border-dashed border-slate-300 text-center text-xs text-slate-500 hover:border-brand-400 hover:text-brand-600">
          {busy ? "Uploading…" : "＋ Add image"}
          <input type="file" accept="image/*" multiple className="hidden" onChange={handleFiles} disabled={busy} />
        </label>
      </div>
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
      <p className="mt-2 text-xs text-slate-400">First image is the main/thumbnail. Max 5MB each.</p>
    </div>
  );
}
