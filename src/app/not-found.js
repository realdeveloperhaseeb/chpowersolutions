import Link from "next/link";
import { IconArrow } from "@/components/icons";

export default function NotFound() {
  return (
    <section className="container-x py-24 text-center">
      <p className="text-7xl font-extrabold text-brand-600">404</p>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">Page not found</h1>
      <p className="mt-2 text-slate-600">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Link href="/" className="btn-primary mt-8">
        Back home <IconArrow />
      </Link>
    </section>
  );
}
