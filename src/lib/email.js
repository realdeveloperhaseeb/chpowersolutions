// Server-side email via SMTP (optional). The zero-config, no-SMTP path is
// Web3Forms, which runs CLIENT-side (see src/lib/web3forms.js) because its free
// tier only accepts browser submissions. This module handles SMTP when it's
// configured (and is required for customer-facing emails to arbitrary addresses).
// Without SMTP, these are skipped (logged) so the app still runs.
import nodemailer from "nodemailer";
import { getSettings } from "@/lib/store";
import { formatPrice } from "@/lib/site";

// ---------------------------------------------------------------- SMTP
let transporter;
function smtpConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD);
}
function getTransport() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 465),
      secure: Number(process.env.SMTP_PORT || 465) === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
    });
  }
  return transporter;
}
async function sendViaSmtp({ to, subject, html, replyTo }) {
  try {
    const from = process.env.SMTP_FROM || `CH Power Solutions <${process.env.SMTP_USER}>`;
    await getTransport().sendMail({ from, to, subject, html, replyTo });
    return { ok: true, via: "smtp" };
  } catch (e) {
    console.error("[smtp error]", e?.message);
    return { ok: false, error: e?.message };
  }
}

// ------------------------------------------------ delivery routers
// Owner/admin notification → SMTP if configured (else Web3Forms handles it
// client-side, so we just skip here).
async function notifyOwner({ subject, html, replyTo }) {
  const settings = await getSettings();
  if (smtpConfigured()) {
    return sendViaSmtp({ to: settings.notify_email, subject, html, replyTo });
  }
  console.log(`[owner email via SMTP skipped — Web3Forms client key handles this] ${subject}`);
  return { skipped: true };
}

// Customer email (arbitrary recipient) → SMTP only.
async function emailCustomer({ to, subject, html }) {
  if (!to) return { skipped: true };
  if (!smtpConfigured()) {
    console.log(`[customer email skipped — SMTP not configured] To: ${to} | ${subject}`);
    return { skipped: true };
  }
  return sendViaSmtp({ to, subject, html });
}

// ------------------------------------------------ HTML helpers (SMTP)
const wrap = (title, body) =>
  `<div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;color:#0f172a">
    <div style="background:#e11d22;color:#fff;padding:16px 20px;border-radius:12px 12px 0 0">
      <h2 style="margin:0;font-size:18px">CH Power Solutions</h2>
    </div>
    <div style="border:1px solid #e2e8f0;border-top:none;padding:20px;border-radius:0 0 12px 12px">
      <h3 style="margin-top:0">${title}</h3>${body}
    </div></div>`;

const itemsHtml = (items = []) =>
  items
    .map(
      (i) =>
        `<tr><td style="padding:6px 0">${i.name} × ${i.qty}</td><td style="padding:6px 0;text-align:right">${formatPrice(i.price * i.qty)}</td></tr>`
    )
    .join("");

// ------------------------------------------------ public API
export async function notifyNewOrder(order) {
  const html = wrap(
    "New order received",
    `<p><b>Order #${order.id}</b><br/>${order.customerName} · ${order.customerPhone}${order.customerEmail ? " · " + order.customerEmail : ""}<br/>Payment: <b>${order.paymentMethod}</b></p>
     <p style="white-space:pre-line"><b>Address:</b> ${order.address || "—"}</p>
     <table style="width:100%;border-top:1px solid #e2e8f0;margin-top:10px">${itemsHtml(order.items)}
       <tr><td style="padding-top:10px;font-weight:bold">Total</td><td style="padding-top:10px;text-align:right;font-weight:bold">${formatPrice(order.total)}</td></tr></table>
     ${order.paymentScreenshot ? `<p><a href="${order.paymentScreenshot}">View payment screenshot</a></p>` : ""}`
  );
  return notifyOwner({
    subject: `New order #${order.id} — ${formatPrice(order.total)}`,
    html,
    replyTo: order.customerEmail,
  });
}

export async function sendContactMessage(data) {
  const html = wrap(
    "Website contact enquiry",
    `<p><b>Name:</b> ${data.name}<br/><b>Phone:</b> ${data.phone || "—"}<br/><b>Email:</b> ${data.email}</p>
     <p style="white-space:pre-line">${data.message}</p>`
  );
  return notifyOwner({
    subject: `New enquiry from ${data.name}`,
    html,
    replyTo: data.email,
  });
}

export async function confirmOrderToCustomer(order) {
  return emailCustomer({
    to: order.customerEmail,
    subject: `Your CH Power order #${order.id}`,
    html: wrap(
      "Order received",
      `<p>Hi ${order.customerName}, thanks for your order!</p>
       <p>We've received <b>Order #${order.id}</b> and will verify your payment shortly.</p>
       <table style="width:100%;border-top:1px solid #e2e8f0;margin-top:10px">${itemsHtml(order.items)}
         <tr><td style="padding-top:10px;font-weight:bold">Total</td><td style="padding-top:10px;text-align:right;font-weight:bold">${formatPrice(order.total)}</td></tr></table>`
    ),
  });
}

export async function notifyOrderStatus(order) {
  const msg =
    order.status === "confirmed"
      ? "Good news — your payment is verified and your order is <b>confirmed</b>."
      : order.status === "rejected"
      ? "Unfortunately we couldn't verify your payment, so this order was <b>not approved</b>. Please contact us."
      : `Your order status is now <b>${order.status}</b>.`;
  return emailCustomer({
    to: order.customerEmail,
    subject: `Order #${order.id} — ${order.status}`,
    html: wrap(`Order #${order.id} update`, `<p>${msg}</p>`),
  });
}
