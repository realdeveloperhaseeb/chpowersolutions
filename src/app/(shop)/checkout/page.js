"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/site";
import { IconArrow, IconCheck } from "@/components/icons";

const field =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-brand-400 focus:ring-4 focus:ring-brand-50";
const label = "mb-1.5 block text-sm font-semibold text-slate-700";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clear } = useCart();
  const [user, setUser] = useState(undefined); // undefined=loading, null=guest
  const [settings, setSettings] = useState(null);
  const [method, setMethod] = useState("bank");
  const [screenshot, setScreenshot] = useState("");
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({ customerName: "", customerPhone: "", customerEmail: "", address: "" });
  const [error, setError] = useState("");
  const [placing, setPlacing] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me").then((r) => r.json()).then((d) => {
      setUser(d.user);
      if (d.user) setForm((f) => ({ ...f, customerName: d.user.name, customerEmail: d.user.email }));
    });
    fetch("/api/settings").then((r) => r.json()).then((d) => {
      setSettings(d.settings);
      if (d.settings?.cod_enabled !== "true") setMethod("bank");
    });
  }, []);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function uploadScreenshot(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    setUploading(false);
    if (res.ok) setScreenshot(data.url);
    else setError(data.error || "Upload failed");
  }

  async function placeOrder(e) {
    e.preventDefault();
    setError("");
    if (method === "bank" && !screenshot) return setError("Please upload your payment screenshot.");
    setPlacing(true);
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        paymentMethod: method,
        paymentScreenshot: screenshot,
        items: items.map((i) => ({ id: i.id, qty: i.qty })),
      }),
    });
    const data = await res.json();
    setPlacing(false);
    if (!res.ok) return setError(data.error || "Could not place order.");
    clear();
    router.push(`/checkout/success?order=${data.order.id}`);
  }

  // ---- states ----
  if (user === undefined || settings === null) {
    return <section className="container-x py-24 text-center text-slate-500">Loading…</section>;
  }

  if (!user) {
    return (
      <section className="container-x py-24 text-center">
        <h1 className="text-2xl font-extrabold text-slate-900">Please log in to check out</h1>
        <p className="mt-2 text-slate-600">You need an account to place and track your order.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/login?next=/checkout" className="btn-primary">Log in <IconArrow /></Link>
          <Link href="/register?next=/checkout" className="btn-outline">Create account</Link>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="container-x py-24 text-center">
        <h1 className="text-2xl font-extrabold text-slate-900">Your cart is empty</h1>
        <Link href="/products" className="btn-primary mt-6">Shop products <IconArrow /></Link>
      </section>
    );
  }

  const codEnabled = settings.cod_enabled === "true";

  return (
    <section className="container-x py-12">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Checkout</h1>

      <form onSubmit={placeOrder} className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Left: details + payment */}
        <div className="space-y-6 lg:col-span-2">
          <div className="card p-6">
            <h2 className="font-bold text-slate-900">Delivery details</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div>
                <label className={label}>Full name *</label>
                <input required className={field} value={form.customerName} onChange={set("customerName")} />
              </div>
              <div>
                <label className={label}>Phone *</label>
                <input required className={field} value={form.customerPhone} onChange={set("customerPhone")} placeholder="03xx-xxxxxxx" />
              </div>
              <div className="sm:col-span-2">
                <label className={label}>Email</label>
                <input type="email" className={field} value={form.customerEmail} onChange={set("customerEmail")} />
              </div>
              <div className="sm:col-span-2">
                <label className={label}>Delivery address *</label>
                <textarea required rows={3} className={field} value={form.address} onChange={set("address")} placeholder="House, street, area, city" />
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h2 className="font-bold text-slate-900">Payment method</h2>
            <div className="mt-4 space-y-3">
              <label className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 ${method === "bank" ? "border-brand-400 bg-brand-50" : "border-slate-200"}`}>
                <input type="radio" name="method" checked={method === "bank"} onChange={() => setMethod("bank")} className="h-4 w-4 accent-brand-600" />
                <span className="font-semibold text-slate-800">Bank transfer</span>
              </label>
              {codEnabled && (
                <label className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 ${method === "cod" ? "border-brand-400 bg-brand-50" : "border-slate-200"}`}>
                  <input type="radio" name="method" checked={method === "cod"} onChange={() => setMethod("cod")} className="h-4 w-4 accent-brand-600" />
                  <span className="font-semibold text-slate-800">Cash on delivery</span>
                </label>
              )}
            </div>

            {method === "bank" && (
              <div className="mt-5 rounded-xl bg-slate-50 p-4 text-sm">
                <p className="font-bold text-slate-900">Transfer to:</p>
                <dl className="mt-2 space-y-1 text-slate-600">
                  <div className="flex justify-between"><dt>Bank</dt><dd className="font-semibold text-slate-900">{settings.payment_bank_name}</dd></div>
                  <div className="flex justify-between"><dt>Account title</dt><dd className="font-semibold text-slate-900">{settings.payment_account_title}</dd></div>
                  <div className="flex justify-between"><dt>Account #</dt><dd className="font-semibold text-slate-900">{settings.payment_account_number}</dd></div>
                  {settings.payment_iban && <div className="flex justify-between"><dt>IBAN</dt><dd className="font-semibold text-slate-900">{settings.payment_iban}</dd></div>}
                </dl>
                {settings.payment_instructions && <p className="mt-3 text-xs text-slate-500">{settings.payment_instructions}</p>}

                <div className="mt-4">
                  <label className={label}>Upload payment screenshot *</label>
                  {screenshot ? (
                    <div className="flex items-center gap-3">
                      <div className="relative h-20 w-20 overflow-hidden rounded-lg border border-slate-200">
                        <Image src={screenshot} alt="Payment" fill sizes="80px" className="object-cover" />
                      </div>
                      <button type="button" onClick={() => setScreenshot("")} className="text-sm font-semibold text-red-600 hover:underline">Remove</button>
                    </div>
                  ) : (
                    <label className="flex h-20 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-slate-300 text-sm text-slate-500 hover:border-brand-400 hover:text-brand-600">
                      {uploading ? "Uploading…" : "＋ Choose screenshot"}
                      <input type="file" accept="image/*" className="hidden" onChange={uploadScreenshot} disabled={uploading} />
                    </label>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: summary */}
        <div>
          <div className="card sticky top-24 p-6">
            <h2 className="font-bold text-slate-900">Your order</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {items.map((i) => (
                <li key={i.id} className="flex justify-between gap-3">
                  <span className="text-slate-600">{i.name} × {i.qty}</span>
                  <span className="font-semibold text-slate-900">{formatPrice(i.price * i.qty)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-between border-t border-slate-100 pt-4">
              <span className="font-bold text-slate-900">Total</span>
              <span className="text-lg font-extrabold text-slate-900">{formatPrice(total)}</span>
            </div>

            {error && <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

            <button type="submit" disabled={placing || uploading} className="btn-primary mt-6 w-full disabled:opacity-60">
              {placing ? "Placing order…" : <>Place order <IconCheck className="h-5 w-5" /></>}
            </button>
            <p className="mt-3 text-center text-xs text-slate-400">
              You&apos;ll get an email confirmation. We verify payment before dispatch.
            </p>
          </div>
        </div>
      </form>
    </section>
  );
}
