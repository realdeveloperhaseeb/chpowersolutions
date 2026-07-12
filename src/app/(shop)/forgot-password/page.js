import Link from "next/link";
import Reveal from "@/components/Reveal";
import { getSettings } from "@/lib/store";
import { site } from "@/lib/site";
import { IconMail, IconPhone, IconArrow } from "@/components/icons";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Forgot Password",
  description: "Reset your CH Power Solutions account password by contacting support.",
};

export default async function ForgotPasswordPage() {
  const s = await getSettings();
  const email = s.support_email || site.email;
  const whatsapp = s.support_whatsapp || s.site_phone || site.phone;
  const waDigits = String(whatsapp).replace(/[^0-9]/g, "");
  const waMsg = encodeURIComponent(
    "Hello, I need help resetting my CH Power Solutions account password. My account email is: "
  );

  return (
    <section className="container-x flex justify-center py-16">
      <Reveal className="w-full max-w-md">
        <div className="card p-8 text-center">
          <h1 className="text-2xl font-extrabold text-slate-900">Reset your password</h1>
          <p className="mt-2 text-sm text-slate-600">
            To keep your account secure, password resets are handled by our support team.
            Contact us and we&apos;ll update your password right away.
          </p>

          <div className="mt-6 space-y-3 text-left">
            <a
              href={`mailto:${email}?subject=Password%20reset%20request`}
              className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 transition-colors hover:border-brand-300 hover:bg-brand-50"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600"><IconMail /></span>
              <span>
                <span className="block text-xs font-semibold uppercase tracking-wide text-slate-400">Email support</span>
                <span className="font-semibold text-slate-900">{email}</span>
              </span>
            </a>

            <a
              href={`https://wa.me/${waDigits}?text=${waMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 transition-colors hover:border-green-300 hover:bg-green-50"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-green-100 text-green-600"><IconPhone /></span>
              <span>
                <span className="block text-xs font-semibold uppercase tracking-wide text-slate-400">WhatsApp</span>
                <span className="font-semibold text-slate-900">{whatsapp}</span>
              </span>
            </a>
          </div>

          <Link href="/login" className="btn-ghost mt-6 w-full">
            Back to login <IconArrow />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
