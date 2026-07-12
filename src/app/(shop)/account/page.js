import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { getOrders } from "@/lib/store";
import { formatPrice } from "@/lib/site";
import LogoutButton from "@/components/LogoutButton";
import { IconUser, IconArrow } from "@/components/icons";

export const dynamic = "force-dynamic";

export const metadata = { title: "My Account", robots: { index: false } };

export default async function AccountPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?next=/account");

  const orders = (await getOrders()).filter((o) => o.userId === user.id);
  const spent = orders
    .filter((o) => o.status === "confirmed" || o.status === "completed")
    .reduce((n, o) => n + o.total, 0);

  return (
    <section className="container-x py-12">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">My Account</h1>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Profile card */}
        <div className="card p-6 lg:col-span-1">
          <div className="flex items-center gap-4">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-600">
              <IconUser className="h-7 w-7" />
            </span>
            <div>
              <p className="text-lg font-bold text-slate-900">{user.name}</p>
              <p className="text-sm text-slate-500">{user.email}</p>
            </div>
          </div>

          <dl className="mt-6 space-y-3 border-t border-slate-100 pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-500">Account type</dt>
              <dd className="font-semibold capitalize text-slate-900">{user.role}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Orders placed</dt>
              <dd className="font-semibold text-slate-900">{orders.length}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Confirmed spend</dt>
              <dd className="font-semibold text-slate-900">{formatPrice(spent)}</dd>
            </div>
          </dl>

          <div className="mt-6 space-y-2">
            {user.role === "admin" && (
              <Link href="/admin" className="btn-outline w-full">Admin dashboard</Link>
            )}
            <LogoutButton className="btn-ghost w-full text-red-600 hover:bg-red-50" />
          </div>

          <p className="mt-4 text-center text-xs text-slate-400">
            To change your password, <Link href="/forgot-password" className="text-brand-600 hover:underline">contact support</Link>.
          </p>
        </div>

        {/* Recent orders */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Recent orders</h2>
            <Link href="/orders" className="text-sm font-semibold text-brand-600 hover:underline">View all</Link>
          </div>

          {orders.length === 0 ? (
            <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
              <p className="font-semibold text-slate-700">No orders yet</p>
              <Link href="/products" className="btn-primary mt-5">Start shopping <IconArrow /></Link>
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              {orders.sort((a, b) => b.id - a.id).slice(0, 5).map((o) => (
                <Link key={o.id} href="/orders" className="card flex items-center justify-between p-4 hover:shadow-soft">
                  <div>
                    <p className="font-bold text-slate-900">Order #{o.id}</p>
                    <p className="text-sm text-slate-500">{o.items?.length || 0} item(s) · {o.paymentMethod}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-extrabold text-slate-900">{formatPrice(o.total)}</p>
                    <p className="text-xs capitalize text-slate-500">{o.status}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
