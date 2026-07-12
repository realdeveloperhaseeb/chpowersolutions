import Link from "next/link";
import { getProducts, getCategories, getOrders } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [products, categories, orders] = await Promise.all([
    getProducts(),
    getCategories(),
    getOrders(),
  ]);

  const pending = orders.filter((o) => o.status === "pending").length;

  const cards = [
    { label: "Products", value: products.length, href: "/admin/products" },
    { label: "Categories", value: categories.length, href: "/admin/categories" },
    { label: "Orders", value: orders.length, href: "/admin/orders" },
    { label: "Pending orders", value: pending, href: "/admin/orders" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-slate-900">Dashboard</h1>
      <p className="mt-1 text-slate-500">Manage your store content and orders.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
