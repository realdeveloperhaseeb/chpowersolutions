import { notFound } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import {
  getProducts,
  getProductBySlug,
  getProductsByCategory,
} from "@/lib/data";
import { site, formatPrice } from "@/lib/site";

export function generateStaticParams() {
  return getProducts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const p = getProductBySlug(params.slug);
  if (!p) return {};
  return {
    title: p.metaTitle,
    description: p.metaDesc,
    alternates: { canonical: `/products/${p.slug}` },
    openGraph: {
      title: p.metaTitle,
      description: p.metaDesc,
      images: [p.images[0]],
    },
  };
}

export default function ProductPage({ params }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const related = getProductsByCategory(product.categorySlug)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  // JSON-LD Product schema for rich results.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.metaDesc,
    image: product.images,
    brand: { "@type": "Brand", name: site.name },
    offers: {
      "@type": "Offer",
      priceCurrency: site.currency,
      price: product.price,
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="container-x py-12">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-slate-500">
          <a href="/" className="hover:text-brand-600">Home</a>
          <span className="mx-2">/</span>
          <a href="/products" className="hover:text-brand-600">Products</a>
          <span className="mx-2">/</span>
          <span className="text-slate-700">{product.name}</span>
        </nav>

        <ProductDetail product={product} />
      </section>

      {related.length > 0 && (
        <section className="container-x pb-16">
          <Reveal>
            <h2 className="section-title">Related products</h2>
          </Reveal>
          <div className="mt-8 grid grid-cols-2 gap-5 lg:grid-cols-4">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
