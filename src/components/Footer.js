import Link from "next/link";
import { site } from "@/lib/site";
import { getCategories } from "@/lib/data";
import { IconBolt, IconMail, IconPhone, IconPin } from "@/components/icons";

export default function Footer() {
  const categories = getCategories();
  return (
    <footer className="mt-24 border-t border-slate-100 bg-slate-50">
      <div className="container-x grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <Link href="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-600 text-white">
              <IconBolt />
            </span>
            <span className="text-lg font-extrabold tracking-tight text-slate-900">
              CH <span className="text-brand-600">Power</span>
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-600">
            {site.description}
          </p>
        </div>

        <div>
          <h4 className="text-sm font-bold text-slate-900">Shop</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-slate-600">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/category/${c.slug}`} className="hover:text-brand-600">
                  {c.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/products" className="hover:text-brand-600">
                All Products
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold text-slate-900">Company</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-slate-600">
            <li><Link href="/about" className="hover:text-brand-600">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-brand-600">Contact</Link></li>
            <li><Link href="/cart" className="hover:text-brand-600">Cart</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold text-slate-900">Get in touch</h4>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li className="flex items-center gap-2">
              <IconPhone className="text-brand-600" />
              <a href={`tel:${site.phone}`} className="hover:text-brand-600">{site.phone}</a>
            </li>
            <li className="flex items-center gap-2">
              <IconMail className="text-brand-600" />
              <a href={`mailto:${site.email}`} className="hover:text-brand-600">{site.email}</a>
            </li>
            <li className="flex items-center gap-2">
              <IconPin className="text-brand-600" />
              {site.address}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-200">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-5 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>Solar Inverters • Hybrid Systems • Power Circuits</p>
        </div>
      </div>
    </footer>
  );
}
