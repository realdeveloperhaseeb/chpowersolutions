// Email via SMTP (Hostinger-friendly). If SMTP env vars are missing, emails are
// skipped gracefully (logged) so the app runs fine in dev without a mail server.
import nodemailer from "nodemailer";
import { getSettings } from "@/lib/store";
import { formatPrice } from "@/lib/site";

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

export async function sendMail({ to, subject, html, replyTo }) {
  if (!to) return { skipped: true, reason: "no recipient" };
  if (!smtpConfigured()) {
    console.log(`[email skipped — SMTP not configured] To: ${to} | ${subject}`);
    return { skipped: true, reason: "smtp not configured" };
  }
  try {
    const from = process.env.SMTP_FROM || `CH Power Solutions <${process.env.SMTP_USER}>`;
    await getTransport().sendMail({ from, to, subject, html, replyTo });
    return { ok: true };
  } catch (e) {
    console.error("[email error]", e?.message);
    return { ok: false, error: e?.message };
  }
}

// --- templated notifications ---

const wrap = (title, body) =>
  `<div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;color:#0f172a">
    <div style="background:#e11d22;color:#fff;padding:16px 20px;border-radius:12px 12px 0 0">
      <h2 style="margin:0;font-size:18px">CH Power Solutions</h2>
    </div>
    <div style="border:1px solid #e2e8f0;border-top:none;padding:20px;border-radius:0 0 12px 12px">
      <h3 style="margin-top:0">${title}</h3>
      ${body}
    </div>
  </div>`;

function orderRows(items = []) {
  return items
    .map(
      (i) =>
        `<tr><td style="padding:6px 0">${i.name} × ${i.qty}</td>
         <td style="padding:6px 0;text-align:right">${formatPrice(i.price * i.qty)}</td></tr>`
    )
    .join("");
}

export async function notifyNewOrder(order) {
  const settings = await getSettings();
  const to = settings.notify_email;
  const body = `
    <p>A new order has been placed.</p>
    <p><b>Order #${order.id}</b><br/>
    ${order.customerName} · ${order.customerPhone}${order.customerEmail ? " · " + order.customerEmail : ""}<br/>
    Payment: <b>${order.paymentMethod}</b></p>
    <p style="white-space:pre-line"><b>Address:</b> ${order.address || "—"}</p>
    <table style="width:100%;border-top:1px solid #e2e8f0;margin-top:10px">${orderRows(order.items)}
      <tr><td style="padding-top:10px;font-weight:bold">Total</td>
      <td style="padding-top:10px;text-align:right;font-weight:bold">${formatPrice(order.total)}</td></tr>
    </table>
    ${order.paymentScreenshot ? `<p><a href="${order.paymentScreenshot}">View payment screenshot</a></p>` : ""}
    <p style="color:#64748b;font-size:13px">Review and confirm this order in the admin dashboard.</p>`;
  return sendMail({ to, subject: `New order #${order.id} — ${formatPrice(order.total)}`, html: wrap("New order received", body), replyTo: order.customerEmail });
}

export async function confirmOrderToCustomer(order) {
  if (!order.customerEmail) return { skipped: true };
  const body = `
    <p>Hi ${order.customerName}, thanks for your order!</p>
    <p>We've received <b>Order #${order.id}</b> and will verify your payment shortly.
    You'll get another email once it's confirmed.</p>
    <table style="width:100%;border-top:1px solid #e2e8f0;margin-top:10px">${orderRows(order.items)}
      <tr><td style="padding-top:10px;font-weight:bold">Total</td>
      <td style="padding-top:10px;text-align:right;font-weight:bold">${formatPrice(order.total)}</td></tr>
    </table>`;
  return sendMail({ to: order.customerEmail, subject: `Your CH Power order #${order.id}`, html: wrap("Order received", body) });
}

export async function notifyOrderStatus(order) {
  if (!order.customerEmail) return { skipped: true };
  const msg =
    order.status === "confirmed"
      ? "Good news — your payment is verified and your order is <b>confirmed</b>. We'll be in touch about delivery."
      : order.status === "rejected"
      ? "Unfortunately we couldn't verify your payment, so this order was <b>not approved</b>. Please contact us for help."
      : `Your order status is now <b>${order.status}</b>.`;
  return sendMail({
    to: order.customerEmail,
    subject: `Order #${order.id} — ${order.status}`,
    html: wrap(`Order #${order.id} update`, `<p>${msg}</p>`),
  });
}

export async function sendContactMessage(data) {
  const settings = await getSettings();
  const body = `
    <p><b>Name:</b> ${data.name}<br/>
    <b>Phone:</b> ${data.phone || "—"}<br/>
    <b>Email:</b> ${data.email}</p>
    <p style="white-space:pre-line">${data.message}</p>`;
  return sendMail({
    to: settings.notify_email,
    subject: `New enquiry from ${data.name}`,
    html: wrap("Website contact enquiry", body),
    replyTo: data.email,
  });
}
