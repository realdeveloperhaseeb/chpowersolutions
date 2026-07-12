import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { getContactInfo } from "@/lib/settings";
import { IconPhone, IconMail, IconPin } from "@/components/icons";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Contact Us",
  description:
    "Get in touch with CH Power Solutions for solar inverter pricing, sizing advice and support. Call, email or send us a message.",
};

export default async function ContactPage() {
  const contact = await getContactInfo();
  const details = [
    { icon: IconPhone, label: "Phone", value: contact.phone, href: `tel:${contact.phone}` },
    { icon: IconMail, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    { icon: IconPin, label: "Location", value: contact.address, href: null },
  ];
  return (
    <>
      <section className="relative overflow-hidden border-b border-slate-100">
        <div className="glow pointer-events-none absolute inset-0" />
        <div className="container-x relative py-16 text-center">
          <Reveal>
            <span className="chip">Contact</span>
            <h1 className="mx-auto mt-4 max-w-2xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              We&apos;re here to help
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600">
              Questions about a product, sizing or an order? Reach out and our team will
              respond quickly.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-x grid gap-10 py-16 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Reveal>
            <h2 className="text-2xl font-bold text-slate-900">Get in touch</h2>
            <p className="mt-2 text-slate-600">
              Prefer to talk directly? Use any of the options below.
            </p>
            <ul className="mt-8 space-y-4">
              {details.map((d) => (
                <li key={d.label} className="card flex items-center gap-4 p-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                    <d.icon />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      {d.label}
                    </p>
                    {d.href ? (
                      <a href={d.href} className="font-semibold text-slate-900 hover:text-brand-600">
                        {d.value}
                      </a>
                    ) : (
                      <p className="font-semibold text-slate-900">{d.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="lg:col-span-3">
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
