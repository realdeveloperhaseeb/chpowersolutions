import Link from "next/link";
import { getProducts, getCategories, getOrders, getUsers } from "@/lib/store";
import { formatPrice } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [products, categories, orders, users] = await Promise.all([
    getProducts(),
    getCategories(),
    getOrders(),
    getUsers(),
  ]);

  const pending = orders.filter((o) => o.status === "pending").length;

  // Revenue: confirmed = accepted + completed orders (verified sales).
  const earned = orders.filter((o) => o.status === "confirmed" || o.status === "completed");
  const revenue = earned.reduce((n, o) => n + Number(o.total || 0), 0);
  const pendingRevenue = orders
    .filter((o) => o.status === "pending")
    .reduce((n, o) => n + Number(o.total || 0), 0);
  const allValue = orders.reduce((n, o) => n + Number(o.total || 0), 0);

  const cards = [
    { label: "Products", value: products.length, href: "/admin/products" },
    { label: "Categories", value: categories.length, href: "/admin/categories" },
    { label: "Orders", value: orders.length, href: "/admin/orders" },
    { label: "Pending orders", value: pending, href: "/admin/orders" },
    { label: "Users", value: users.length, href: "/admin/users" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-slate-900">Dashboard</h1>
      <p className="mt-1 text-slate-500">Manage your store content and orders.</p>

      {/* Revenue */}
      <Link
        href="/admin/orders"
        className="mt-8 block overflow-hidden rounded-2xl bg-brand-600 p-6 text-white transition-all hover:-translate-y-0.5 hover:shadow-soft sm:p-8"
      >
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-100">
          Confirmed revenue
        </p>
        <p className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
          {formatPrice(revenue)}
        </p>
        <div className="mt-5 flex flex-wrap gap-x-8 gap-y-3 text-sm">
          <span className="text-brand-100">
            Paid orders: <b className="text-white">{earned.length}</b>
          </span>
          <span className="text-brand-100">
            Pending: <b className="text-white">{formatPrice(pendingRevenue)}</b>
          </span>
          <span className="text-brand-100">
            All orders value: <b className="text-white">{formatPrice(allValue)}</b>
          </span>
        </div>
      </Link>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-card"
          >
            <p className="text-sm text-slate-500">{c.label}</p>
            <p className="mt-2 text-3xl font-extrabold text-slate-900">{c.value}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link href="/admin/products" className="rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-card">
          <h3 className="font-bold text-slate-900">＋ Add a product</h3>
          <p className="mt-1 text-sm text-slate-500">Upload an inverter or circuit with images, price and SEO meta.</p>
        </Link>
        <Link href="/admin/settings" className="rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-card">
          <h3 className="font-bold text-slate-900">⚙ Payment & site settings</h3>
          <p className="mt-1 text-sm text-slate-500">Update bank details shown to customers at checkout.</p>
        </Link>
      </div>
    </div>
  );
}
