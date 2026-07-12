import { NextResponse } from "next/server";
import { getSettings } from "@/lib/store";

export const dynamic = "force-dynamic";

// Public, non-sensitive settings (contact + payment details). Excludes notify_email.
const PUBLIC_KEYS = [
  "site_name", "site_email", "site_phone", "site_whatsapp", "site_address",
  "payment_bank_name", "payment_account_title", "payment_account_number",
  "payment_iban", "payment_instructions", "cod_enabled",
  "support_email", "support_whatsapp",
];

export async function GET() {
  const all = await getSettings();
  const settings = Object.fromEntries(PUBLIC_KEYS.map((k) => [k, all[k] ?? ""]));
  return NextResponse.json({ settings });
}
