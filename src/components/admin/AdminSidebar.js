"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { IconMenu, IconClose } from "@/components/icons";

const nav = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/settings", label: "Settings" },
];

export default function AdminSidebar({ user, mode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const active = (n) => (n.exact ? pathname === n.href : pathname.startsWith(n.href));

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <>
      {/* Mobile top bar */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
        <Link href="/admin" className="flex items-center gap-2">
          <Image src="/logo.jpeg" alt="CH Power" width={70} height={38} className="rounded-lg" />
          <span className="font-bold">Admin</span>
        </Link>
        <button onClick={() => setOpen((v) => !v)} className="rounded-lg p-2 hover:bg-slate-100">
          {open ? <IconClose /> : <IconMenu />}
        </button>
      </div>

      <aside
        className={`${
          open ? "block" : "hidden"
        } fixed inset-y-0 left-0 z-40 w-64 border-r border-slate-200 bg-white lg:block`}
      >
        <div className="flex h-full flex-col">
          <div className="hidden items-center gap-2 border-b border-slate-100 px-5 py-4 lg:flex">
            <Image src="/logo.jpeg" alt="CH Power" width={80} height={43} className="rounded-lg ring-1 ring-slate-200" />
          </div>

          <nav className="flex-1 space-y-1 p-3">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className={`block rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                  active(n)
                    ? "bg-brand-600 text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="border-t border-slate-100 p-3">
            <div className="mb-2 rounded-xl bg-slate-50 px-4 py-2 text-xs">
              <p className="font-semibold text-slate-700">{user.name}</p>
              <p className="text-slate-400">{user.email}</p>
              <p className="mt-1 inline-flex rounded-full bg-amber-100 px-2 py-0.5 font-medium text-amber-700">
                store: {mode}
              </p>
            </div>
            <Link href="/" className="block rounded-lg px-4 py-2 text-sm text-slate-500 hover:bg-slate-100">
              ← View store
            </Link>
            <button
              onClick={logout}
              className="mt-1 block w-full rounded-lg px-4 py-2 text-left text-sm font-semibold text-red-600 hover:bg-red-50"
            >
              Log out
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
