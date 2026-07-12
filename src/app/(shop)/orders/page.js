import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getOrders } from "@/lib/store";
import { formatPrice } from "@/lib/site";
import { IconArrow } from "@/components/icons";

export const dynamic = "force-dynamic";

export const metadata = { title: "My Orders", robots: { index: false } };

const statusStyles = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
  completed: "bg-slate-200 text-slate-700",
};

export default async function MyOrdersPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/orders");

  const orders = (await getOrders())
    .filter((o) => o.userId === user.id)
    .sort((a, b) => b.id - a.id);

  return (
    <section className="container-x py-12">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">My Orders</h1>

      {orders.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="font-semibold text-slate-700">No orders yet</p>
          <Link href="/products" className="btn-primary mt-6">Start shopping <IconArrow /></Link>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {orders.map((o) => (
            <div key={o.id} className="card p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-bold text-slate-900">Order #{o.id}</p>
                  <p className="text-sm text-slate-500">{o.paymentMethod}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[o.status] || ""}`}>
                  {o.status}
                </span>
              </div>
              <ul className="mt-4 space-y-1.5 text-sm text-slate-600">
                {o.items.map((i, idx) => (
                  <li key={idx} className="flex justify-between">
                    <span>{i.name} × {i.qty}</span>
                    <span className="font-semibold text-slate-900">{formatPrice(i.price * i.qty)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex justify-between border-t border-slate-100 pt-3">
                <span className="font-bold text-slate-900">Total</span>
                <span className="font-extrabold text-slate-900">{formatPrice(o.total)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
