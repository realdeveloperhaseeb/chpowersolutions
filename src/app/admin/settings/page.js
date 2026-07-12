"use client";

import { useEffect, useState } from "react";

const field =
  "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-brand-400 focus:ring-4 focus:ring-brand-50";
const label = "mb-1.5 block text-sm font-semibold text-slate-700";

const groups = [
  {
    title: "Store details (shown in footer & contact page)",
    fields: [
      ["site_name", "Store name"],
      ["site_email", "Contact email"],
      ["site_phone", "Contact phone"],
      ["site_whatsapp", "WhatsApp number"],
      ["site_address", "Address"],
    ],
  },
  {
    title: "Notifications & support",
    fields: [
      ["notify_email", "Order/enquiry notifications go to"],
      ["support_email", "Password-reset support email"],
      ["support_whatsapp", "Password-reset support WhatsApp"],
    ],
  },
  {
    title: "Bank transfer details (shown at checkout)",
    fields: [
      ["payment_bank_name", "Bank name"],
      ["payment_account_title", "Account title"],
      ["payment_account_number", "Account number"],
      ["payment_iban", "IBAN"],
    ],
  },
];

export default function AdminSettings() {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((r) => r.json())
      .then((d) => {
        setSettings(d.settings || {});
        setLoading(false);
      });
  }, []);

  const set = (k) => (e) => {
    const v = e.target.type === "checkbox" ? String(e.target.checked) : e.target.value;
    setSettings((s) => ({ ...s, [k]: v }));
    setSaved(false);
  };

  async function save(e) {
    e.preventDefault();
    setSaving(true);
    await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    setSaving(false);
    setSaved(true);
  }

  if (loading) return <p className="text-slate-500">Loading…</p>;

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-extrabold text-slate-900">Settings</h1>
      <p className="mt-1 text-slate-500">These details appear on the storefront and at checkout.</p>

      <form onSubmit={save} className="mt-8 space-y-8">
        {groups.map((g) => (
          <div key={g.title} className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="mb-4 font-bold text-slate-900">{g.title}</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {g.fields.map(([key, lbl]) => (
                <div key={key}>
                  <label className={label}>{lbl}</label>
                  <input className={field} value={settings[key] || ""} onChange={set(key)} />
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="font-bold text-slate-900">Email delivery — no SMTP needed</h2>
          <p className="mt-1 text-sm text-slate-500">
            Paste a free <b>Web3Forms</b> access key and order &amp; enquiry emails are
            delivered to your notify inbox — no mail server or password required.
          </p>
          <ol className="mt-3 list-decimal space-y-1 pl-5 text-sm text-slate-600">
            <li>Go to <a href="https://web3forms.com/" target="_blank" rel="noopener noreferrer" className="font-semibold text-brand-600 hover:underline">web3forms.com</a> and enter your email (<b>{settings.notify_email || "your notify email"}</b>).</li>
            <li>Check that inbox for the access key and paste it below.</li>
          </ol>
          <label className={`${label} mt-4`}>Web3Forms access key</label>
          <input className={field} value={settings.web3forms_key || ""} onChange={set("web3forms_key")} placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" />
          <p className="mt-2 text-xs text-slate-400">
            Delivers owner notifications. Customer confirmation emails need SMTP (optional).
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="mb-4 font-bold text-slate-900">Payment instructions</h2>
          <textarea rows={4} className={field} value={settings.payment_instructions || ""} onChange={set("payment_instructions")} />
          <label className="mt-4 flex items-center gap-2 text-sm font-medium text-slate-700">
            <input
              type="checkbox"
              className="h-4 w-4 accent-brand-600"
              checked={settings.cod_enabled === "true"}
              onChange={set("cod_enabled")}
            />
            Enable Cash on Delivery
          </label>
        </div>

        <div className="flex items-center gap-3">
          <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
            {saving ? "Saving…" : "Save settings"}
          </button>
          {saved && <span className="text-sm font-semibold text-green-600">✓ Saved</span>}
        </div>
      </form>
    </div>
  );
}
