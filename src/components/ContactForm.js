"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconCheck, IconArrow } from "@/components/icons";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const form = e.target;
    const payload = {
      name: form.name.value,
      phone: form.phone.value,
      email: form.email.value,
      message: form.message.value,
    };
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setBusy(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return setError(data.error || "Could not send. Please try again.");
    }
    setSent(true);
    form.reset();
    setTimeout(() => setSent(false), 6000);
  }

  const field =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-brand-400 focus:ring-4 focus:ring-brand-50";

  return (
    <form onSubmit={onSubmit} className="card p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-slate-700">Name</label>
          <input required name="name" placeholder="Your name" className={field} />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-slate-700">Phone</label>
          <input required name="phone" placeholder="03xx-xxxxxxx" className={field} />
        </div>
      </div>
      <div className="mt-4">
        <label className="mb-1.5 block text-sm font-semibold text-slate-700">Email</label>
        <input required type="email" name="email" placeholder="you@example.com" className={field} />
      </div>
      <div className="mt-4">
        <label className="mb-1.5 block text-sm font-semibold text-slate-700">Message</label>
        <textarea
          required
          name="message"
          rows={5}
          placeholder="Tell us your load, roof size, or the product you need…"
          className={field}
        />
      </div>

      <button type="submit" disabled={busy} className="btn-primary mt-6 w-full disabled:opacity-60 sm:w-auto">
        {busy ? "Sending…" : "Send Message"} <IconArrow />
      </button>

      {error && <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

      <AnimatePresence>
        {sent && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-4 flex items-center gap-2 rounded-xl bg-brand-50 px-4 py-3 text-sm font-medium text-brand-700"
          >
            <IconCheck className="h-5 w-5" />
            Thanks! We&apos;ve received your message and will get back to you shortly.
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
