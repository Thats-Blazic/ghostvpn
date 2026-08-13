import type { ReactNode } from "react";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";

export function PageShell({
  eyebrow,
  title,
  subtitle,
  maxWidth = "900px",
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
  maxWidth?: string;
  children: ReactNode;
}) {
  return (
    <main className="relative min-h-dvh overflow-x-hidden bg-[#030209]">
      <Navigation />
      <section className="relative pt-[130px] pb-24 px-6 grid-bg">
        <div className="mx-auto" style={{ maxWidth }}>
          <div className="mb-10">
            <span className="eyebrow mb-3 block">{eyebrow}</span>
            <h1 className="font-display text-3xl lg:text-5xl text-[#e8e6f0] uppercase tracking-tight leading-[1.05]">
              {title}
            </h1>
            {subtitle && <p className="text-[13px] text-[#8f82a6] mt-4 max-w-xl leading-relaxed">{subtitle}</p>}
          </div>
          {children}
        </div>
      </section>
      <FooterSection />
    </main>
  );
}
