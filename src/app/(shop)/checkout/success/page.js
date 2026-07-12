"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { IconCheck, IconArrow } from "@/components/icons";

function SuccessInner() {
  const orderId = useSearchParams().get("order");
  return (
    <section className="container-x py-24 text-center">
      <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-green-100 text-green-600">
        <IconCheck className="h-8 w-8" />
      </span>
      <h1 className="mt-6 text-3xl font-extrabold text-slate-900">Order placed!</h1>
      {orderId && <p className="mt-2 text-slate-600">Your order number is <b>#{orderId}</b>.</p>}
      <p className="mx-auto mt-2 max-w-md text-slate-600">
        Thanks for your order. We&apos;ve emailed you a confirmation and will verify your
        payment before dispatch. You can track it in your orders.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/orders" className="btn-primary">View my orders <IconArrow /></Link>
        <Link href="/products" className="btn-outline">Continue shopping</Link>
      </div>
    </section>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={null}>
      <SuccessInner />
    </Suspense>
  );
}
