import type { ReactNode } from "react";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { TerminalWindow } from "@/components/landing/terminal-window";

export interface LegalSection {
  heading: string;
  body: ReactNode;
}

export function LegalPage({
  file,
  eyebrow,
  title,
  updated,
  sections,
}: {
  file: string;
  eyebrow: string;
  title: ReactNode;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#030209]">
      <Navigation />
      <section className="relative pt-[130px] pb-24 px-6 grid-bg">
        <div className="max-w-[820px] mx-auto">
          <div className="mb-10">
            <span className="eyebrow mb-3 block">{eyebrow}</span>
            <h1 className="font-display text-3xl lg:text-5xl text-[#e8e6f0] uppercase tracking-tight leading-[1.05]">
              {title}
            </h1>
            <p className="text-[11px] text-[#4a3f5f] mt-4 tracking-wider">last_updated: {updated}</p>
          </div>

          <TerminalWindow title={file} status="cat" statusColor="#a855f7">
            <div className="p-7 lg:p-10">
              {sections.map((s, i) => (
                <div key={s.heading} className={i !== 0 ? "mt-9 pt-9 border-t border-[#211a30]" : ""}>
                  <h2 className="flex items-baseline gap-2 text-[15px] font-bold text-[#39ff88] mb-3">
                    <span className="text-[#4a3f5f]">{String(i + 1).padStart(2, "0")}.</span>
                    {s.heading}
                  </h2>
                  <div className="text-[13px] text-[#8f82a6] leading-relaxed space-y-3">{s.body}</div>
                </div>
              ))}
            </div>
          </TerminalWindow>

          <p className="text-center text-[11.5px] text-[#4a3f5f] mt-8">
            Questions? <span className="text-[#a855f7]">privacy@ghostvpn.com</span>
          </p>
        </div>
      </section>
      <FooterSection />
    </main>
  );
}
