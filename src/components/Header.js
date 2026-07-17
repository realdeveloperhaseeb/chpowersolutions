"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { site } from "@/lib/site";
import Logo from "@/components/Logo";
import AccountMenu from "@/components/AccountMenu";
import { IconCart, IconMenu, IconClose, IconSearch, IconPhone } from "@/components/icons";

export default function Header({ categories = [] }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const { count } = useCart();

  // Lock body scroll while the slide-in menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Home · All Products · <categories…> · About · Contact
  const nav = [
    { href: "/", label: "Home" },
    { href: "/products", label: "All Products" },
    ...categories.map((c) => ({ href: `/category/${c.slug}`, label: c.name })),
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  function submitSearch(e) {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/products?q=${encodeURIComponent(q)}` : "/products");
    setOpen(false);
  }

  const searchInput = (
    <div className="relative w-full">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search inverters, circuits, products…"
        className="w-full rounded-full border border-slate-200 bg-slate-50 py-2.5 pl-5 pr-12 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-brand-400 focus:bg-white focus:ring-4 focus:ring-brand-50"
      />
      <button
        type="submit"
        className="absolute right-1.5 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-brand-600 text-white transition-colors hover:bg-brand-700"
        aria-label="Search"
      >
        <IconSearch />
      </button>
    </div>
  );

  return (
    <header className="sticky top-0 z-50">
      {/* Top utility bar */}
      <div className="bg-brand-600 text-white">
        <div className="container-x flex h-9 items-center justify-between gap-3 text-[0.72rem] font-medium sm:text-xs">
          <p className="truncate">
            🔥 Fast dispatch • 2–5 day delivery across Pakistan • Genuine products with warranty
          </p>
          <a href={`tel:${site.phone}`} className="flex shrink-0 items-center gap-1.5 font-bold">
            <IconPhone className="h-3.5 w-3.5" /> {site.phone}
          </a>
        </div>
      </div>

      {/* Main row */}
      <div className="border-b border-slate-100 bg-white/90 backdrop-blur-md">
        <div className="container-x flex h-16 items-center gap-4">
          {/* Logo + title + slogan (always visible) */}
          <Link href="/" className="flex shrink-0 items-center gap-2.5">
            <Logo size={44} />
            <span className="block leading-none">
              <span className="block text-[0.82rem] font-extrabold uppercase leading-tight tracking-tight text-slate-900 sm:text-[1.15rem]">
                CH <span className="text-brand-600">Power Solutions</span>
              </span>
              <span className="mt-1 block text-[0.5rem] font-bold uppercase tracking-[0.16em] text-slate-400 sm:text-[0.6rem]">
                {site.slogan}
              </span>
            </span>
          </Link>

          {/* Search (desktop, center) */}
          <form onSubmit={submitSearch} className="mx-auto hidden w-full max-w-xl md:block">
            {searchInput}
          </form>

          {/* Actions */}
          <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2">
            <AccountMenu />
            <Link
              href="/cart"
              className="relative grid h-10 w-10 place-items-center rounded-full text-slate-700 transition-colors hover:bg-slate-100 hover:text-brand-600"
              aria-label="Cart"
            >
              <IconCart />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-brand-600 px-1 text-[11px] font-bold text-white">
                  {count}
                </span>
              )}
            </Link>
            <button
              className="grid h-10 w-10 place-items-center rounded-full text-slate-700 hover:bg-slate-100 md:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
            >
              {open ? <IconClose /> : <IconMenu />}
            </button>
          </div>
        </div>

        {/* Search (mobile) */}
        <form onSubmit={submitSearch} className="container-x pb-3 md:hidden">
          {searchInput}
        </form>
      </div>

      {/* Category nav bar (desktop) */}
      <nav className="hidden border-b border-slate-100 bg-white md:block">
        <div className="container-x flex h-11 items-center gap-1 overflow-x-auto">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-[0.9rem] font-semibold transition-colors ${
                isActive(n.href)
                  ? "bg-brand-50 text-brand-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-brand-600"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile slide-in menu */}
      <AnimatePresence>
        {open && (
          <div className="md:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[60] bg-slate-900/50"
            />
            {/* Panel */}
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.28, ease: "easeOut" }}
              className="fixed right-0 top-0 z-[70] flex h-full w-[82%] max-w-xs flex-col bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-slate-100 p-4">
                <Logo size={36} />
                <button
                  onClick={() => setOpen(false)}
                  className="grid h-9 w-9 place-items-center rounded-full text-slate-600 hover:bg-slate-100"
                  aria-label="Close menu"
                >
                  <IconClose />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-3">
                {nav.map((n) => (
                  <Link
                    key={n.href}
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-lg px-3 py-3 text-sm font-semibold ${
                      isActive(n.href)
                        ? "bg-brand-50 text-brand-700"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {n.label}
                  </Link>
                ))}
              </div>
              <div className="border-t border-slate-100 p-4">
                <a href={`tel:${site.phone}`} className="flex items-center gap-2 text-sm font-bold text-brand-600">
                  <IconPhone className="h-4 w-4" /> {site.phone}
                </a>
              </div>
            </motion.nav>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
