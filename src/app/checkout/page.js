import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { IconArrow } from "@/components/icons";

export const metadata = {
  title: "Checkout",
  description: "Complete your solar inverter order with CH Power Solutions.",
  robots: { index: false },
};

// Placeholder — the full checkout flow (login gate, customer details,
// payment info, screenshot upload, email notifications) is built in Phase 3.
export default function CheckoutPage() {
  return (
    <>
      <PageHeader eyebrow="Checkout" title="Checkout coming up next" />
      <section className="container-x pb-20">
        <div className="card mx-auto max-w-xl p-8 text-center">
          <p className="text-slate-600">
            The full checkout — login, delivery details, payment information and
            screenshot upload — is part of the next build phase. Your cart is saved.
          </p>
          <Link href="/cart" className="btn-outline mt-6">
            Back to cart <IconArrow />
          </Link>
        </div>
      </section>
    </>
  );
}
