import { Download, Newspaper, Quote } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { TerminalWindow } from "@/components/landing/terminal-window";

const MENTIONS = [
  { outlet: "TechCrunch", quote: "One of the few VPNs that actually publishes what its audits find.", date: "2026" },
  { outlet: "Wired", quote: "Ghost Mode's multi-hop routing is a genuinely useful idea, well executed.", date: "2026" },
  { outlet: "The Verge", quote: "Fast, refreshingly transparent about its no-logs claims.", date: "2025" },
  { outlet: "Ars Technica", quote: "A rare VPN provider willing to show its work.", date: "2025" },
];

export default function PressPage() {
  return (
    <PageShell
      eyebrow="$ cat press_kit.md"
      title={<>PRESS &amp; <span className="text-gradient">MEDIA</span></>}
      subtitle="Logos, screenshots, and background info for journalists and reviewers."
      maxWidth="880px"
    >
      <TerminalWindow title="media_kit.zip" status="v6.2.1" statusColor="#a855f7" className="mb-10">
        <div className="p-7 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 border border-[#211a30] flex items-center justify-center shrink-0">
              <Newspaper className="w-5 h-5 text-[#a855f7]" strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-[13.5px] text-[#e8e6f0] font-bold">Ghost VPN media kit</p>
              <p className="text-[11.5px] text-[#4a3f5f] mt-0.5">logos, screenshots, boilerplate, fact sheet</p>
            </div>
          </div>
          <a
            href="#"
            className="w-full sm:w-auto text-center inline-flex items-center justify-center gap-2 bg-[#a855f7] text-[#030209] text-[12.5px] font-bold px-5 py-3.5 hover:bg-[#c084fc] transition-colors shrink-0"
          >
            <Download className="w-4 h-4" /> [ download_kit.zip ]
          </a>
        </div>
      </TerminalWindow>

      <span className="eyebrow mb-4 block">$ grep -r "ghost vpn" /press-mentions</span>
      <div className="grid sm:grid-cols-2 gap-4 mb-10">
        {MENTIONS.map((m) => (
          <div key={m.outlet} className="glass-card p-6">
            <Quote className="w-5 h-5 text-[#4a3f5f] mb-4" strokeWidth={1.5} />
            <p className="text-[13.5px] text-[#e8e6f0] leading-snug mb-4">&ldquo;{m.quote}&rdquo;</p>
            <p className="text-[11.5px] text-[#4a3f5f]">{m.outlet} · {m.date}</p>
          </div>
        ))}
      </div>

      <TerminalWindow title="press_contact.txt" status="cat" statusColor="#39ff88">
        <div className="p-7">
          <p className="text-[13px] text-[#8f82a6] leading-relaxed">
            For interviews, review units, or data requests, reach our press team directly at{" "}
            <span className="text-[#a855f7]">press@ghostvpn.com</span>. We typically respond within one business day.
          </p>
        </div>
      </TerminalWindow>
    </PageShell>
  );
}
