"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { IconUser } from "@/components/icons";

export default function AccountMenu() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  // Re-check the session on every navigation (the header stays mounted across
  // client-side routes, so a one-time check would miss login/logout).
  useEffect(() => {
    let active = true;
    fetch("/api/auth/me", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => { if (active) setUser(d.user); })
      .catch(() => {});
    return () => { active = false; };
  }, [pathname]);

  useEffect(() => {
    function onClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    setOpen(false);
    router.refresh();
  }

  if (!user) {
    return (
      <Link
        href="/login"
        className="grid h-10 w-10 place-items-center rounded-full text-slate-700 transition-colors hover:bg-slate-100 hover:text-brand-600"
        aria-label="Log in"
      >
        <IconUser />
      </Link>
    );
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="grid h-10 w-10 place-items-center rounded-full text-brand-600 transition-colors hover:bg-brand-50"
        aria-label="Account"
      >
        <IconUser />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 overflow-hidden rounded-xl border border-slate-100 bg-white py-1 shadow-card">
          <div className="border-b border-slate-100 px-4 py-2">
            <p className="text-sm font-semibold text-slate-900">{user.name}</p>
            <p className="truncate text-xs text-slate-400">{user.email}</p>
          </div>
          <Link href="/account" onClick={() => setOpen(false)} className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
            My account
          </Link>
          <Link href="/orders" onClick={() => setOpen(false)} className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
            My orders
          </Link>
          {user.role === "admin" && (
            <Link href="/admin" onClick={() => setOpen(false)} className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
              Admin dashboard
            </Link>
          )}
          <button onClick={logout} className="block w-full px-4 py-2 text-left text-sm font-semibold text-red-600 hover:bg-red-50">
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
