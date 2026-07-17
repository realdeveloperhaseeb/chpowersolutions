import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { IconArrow } from "@/components/icons";

// Horizontal scrolling product carousel with a heading + "View all" link.
export default function ProductRow({ title, subtitle, href = "/products", products }) {
  if (!products?.length) return null;
  return (
    <section className="container-x py-8">
      <Reveal className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">{title}</h2>
          {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
        </div>
        <Link href={href} className="inline-flex shrink-0 items-center gap-1 text-sm font-bold text-brand-600 hover:underline">
          View all <IconArrow className="h-4 w-4" />
        </Link>
      </Reveal>

      <div className="mt-6 flex snap-x gap-4 overflow-x-auto pb-4">
        {products.map((p, i) => (
          <div key={p.id} className="w-[46%] shrink-0 snap-start sm:w-[31%] lg:w-[23%]">
            <ProductCard product={p} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
