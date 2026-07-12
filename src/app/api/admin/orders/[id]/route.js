import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { updateOrderStatus } from "@/lib/store";
import { notifyOrderStatus } from "@/lib/email";

export const dynamic = "force-dynamic";

export async function PUT(req, { params }) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { status } = await req.json();
  const allowed = ["pending", "confirmed", "rejected", "completed"];
  if (!allowed.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }
  const order = await updateOrderStatus(params.id, status);
  if (!order) return NextResponse.json({ error: "Not found" }, { status: 404 });
  // Notify the customer of the status change (skipped if SMTP unset / no email).
  try {
    await notifyOrderStatus(order);
  } catch (e) {
    console.error("[status email]", e?.message);
  }
  return NextResponse.json({ order });
}
