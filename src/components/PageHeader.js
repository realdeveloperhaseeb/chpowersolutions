import Reveal from "@/components/Reveal";

// Reusable slim page banner for inner pages.
export default function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <section className="relative overflow-hidden border-b border-slate-100">
      <div className="glow pointer-events-none absolute inset-0" />
      <div className="container-x relative py-14 text-center">
        <Reveal>
          {eyebrow && <span className="chip">{eyebrow}</span>}
          <h1 className="mx-auto mt-4 max-w-3xl text-[2.4rem] font-extrabold tracking-[-0.03em] text-slate-900 sm:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl">{subtitle}</p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
