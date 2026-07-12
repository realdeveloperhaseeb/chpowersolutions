"use client";

import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/site";

const statusStyles = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  completed: "bg-slate-200 text-slate-700",
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    const d = await fetch("/api/admin/orders").then((r) => r.json());
    setOrders(d.orders || []);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function setStatus(id, status) {
    await fetch(`/api/admin/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    load();
  }

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-slate-900">Orders</h1>
      <p className="mt-1 text-slate-500">Review payments and confirm orders.</p>

      {loading ? (
        <p className="mt-10 text-slate-500">Loading…</p>
      ) : orders.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="font-semibold text-slate-700">No orders yet</p>
          <p className="mt-1 text-sm text-slate-500">
            Orders appear here once customers check out. The full checkout &amp; payment
            flow ships in the next phase.
          </p>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {orders.map((o) => (
            <div key={o.id} className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-bold text-slate-900">Order #{o.id} — {o.customerName}</p>
                  <p className="text-sm text-slate-500">
                    {o.customerPhone}{o.customerEmail ? ` · ${o.customerEmail}` : ""} · {o.paymentMethod}
                  </p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[o.status] || ""}`}>
                  {o.status}
                </span>
              </div>

              {o.address && <p className="mt-2 whitespace-pre-line text-sm text-slate-600"><b>Address:</b> {o.address}</p>}

              <ul className="mt-3 space-y-1 text-sm text-slate-600">
                {o.items?.map((i, idx) => (
                  <li key={idx} className="flex justify-between">
                    <span>{i.name} × {i.qty}</span>
                    <span className="font-semibold text-slate-900">{formatPrice(i.price * i.qty)}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-2 flex items-center justify-between border-t border-slate-100 pt-2">
                <p className="font-extrabold text-slate-900">{formatPrice(o.total)}</p>
                {o.paymentScreenshot && (
                  <a href={o.paymentScreenshot} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold text-brand-600 hover:underline">
                    View payment screenshot →
                  </a>
                )}
              </div>

              <div className="mt-3 flex gap-2">
                <button onClick={() => setStatus(o.id, "confirmed")} className="rounded-lg bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700 hover:bg-green-100">
                  Accept
                </button>
                <button onClick={() => setStatus(o.id, "rejected")} className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100">
                  Reject
                </button>
                <button onClick={() => setStatus(o.id, "completed")} className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200">
                  Mark completed
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
