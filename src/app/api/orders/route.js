import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getProductById, createOrder, getOrders } from "@/lib/store";
import { notifyNewOrder, confirmOrderToCustomer } from "@/lib/email";

export const dynamic = "force-dynamic";

// List the current user's orders.
export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const orders = (await getOrders()).filter((o) => o.userId === user.id);
  return NextResponse.json({ orders });
}

// Place an order.
export async function POST(req) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Please log in to place an order." }, { status: 401 });

  const b = await req.json();
  const { customerName, customerPhone, customerEmail, address, paymentMethod, paymentScreenshot } = b;

  if (!customerName || !customerPhone || !address) {
    return NextResponse.json({ error: "Name, phone and address are required." }, { status: 400 });
  }
  if (!["bank", "cod"].includes(paymentMethod)) {
    return NextResponse.json({ error: "Select a payment method." }, { status: 400 });
  }
  if (paymentMethod === "bank" && !paymentScreenshot) {
    return NextResponse.json({ error: "Please upload your payment screenshot." }, { status: 400 });
  }
  if (!Array.isArray(b.items) || b.items.length === 0) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  }

  // Re-derive prices/names from the store (never trust client totals).
  const items = [];
  for (const raw of b.items) {
    const p = await getProductById(raw.id);
    if (!p) continue;
    const qty = Math.max(1, Number(raw.qty) || 1);
    items.push({ id: p.id, name: p.name, slug: p.slug, price: p.price, qty, image: p.images?.[0] || null });
  }
  if (items.length === 0) {
    return NextResponse.json({ error: "No valid items in cart." }, { status: 400 });
  }
  const total = items.reduce((n, i) => n + i.price * i.qty, 0);

  const order = await createOrder({
    userId: user.id,
    customerName,
    customerPhone,
    customerEmail: customerEmail || user.email || "",
    address,
    paymentMethod: paymentMethod === "bank" ? "Bank transfer" : "Cash on delivery",
    paymentScreenshot: paymentScreenshot || null,
    items,
    total,
    status: "pending",
  });

  // Fire notifications (non-blocking failures shouldn't break the order).
  try {
    await Promise.all([notifyNewOrder(order), confirmOrderToCustomer(order)]);
  } catch (e) {
    console.error("[order email]", e?.message);
  }

  return NextResponse.json({ order: { id: order.id, total: order.total } });
}
