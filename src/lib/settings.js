// Server-side helper to read editable contact/payment info, falling back to the
// static defaults in site.js when a setting is empty.
import { getSettings } from "@/lib/store";
import { site } from "@/lib/site";

export async function getContactInfo() {
  const s = await getSettings();
  return {
    name: s.site_name || site.name,
    email: s.site_email || site.email,
    phone: s.site_phone || site.phone,
    whatsapp: s.site_whatsapp || s.site_phone || site.whatsapp,
    address: s.site_address || site.address,
  };
}
