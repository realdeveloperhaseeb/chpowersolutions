import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import ProductCard from "@/components/ProductCard";
import {
  getCategories,
  getCategoryBySlug,
  getProductsByCategory,
} from "@/lib/data";

export function generateStaticParams() {
  return getCategories().map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }) {
  const cat = getCategoryBySlug(params.slug);
  if (!cat) return {};
  return {
    title: cat.metaTitle,
    description: cat.metaDesc,
    alternates: { canonical: `/category/${cat.slug}` },
  };
}

export default function CategoryPage({ params }) {
  const cat = getCategoryBySlug(params.slug);
  if (!cat) notFound();

  const products = getProductsByCategory(cat.slug);

  return (
    <>
      <PageHeader eyebrow="Category" title={cat.name} subtitle={cat.description} />
      <section className="container-x py-12">
        {products.length ? (
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {products.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        ) : (
          <p className="text-center text-slate-500">No products in this category yet.</p>
        )}
      </section>
    </>
  );
}
