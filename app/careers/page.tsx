import { Globe2, HeartHandshake, Laptop, Palmtree, ArrowRight } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { TerminalWindow } from "@/components/landing/terminal-window";

const ROLES = [
  { title: "Senior Rust Engineer — VPN Core", team: "infrastructure", location: "remote (any timezone)", type: "full-time" },
  { title: "Security Researcher", team: "security", location: "remote (EU/US overlap)", type: "full-time" },
  { title: "Product Designer", team: "product", location: "remote (any timezone)", type: "full-time" },
  { title: "Growth Marketer", team: "marketing", location: "remote (any timezone)", type: "full-time" },
  { title: "Customer Support Engineer", team: "support", location: "remote (any timezone)", type: "contract" },
];

const PERKS = [
  { icon: Globe2, title: "remote-first, always", desc: "We've been fully distributed since day one — work from anywhere, on any timezone." },
  { icon: HeartHandshake, title: "real equity", desc: "Every full-time hire gets meaningful equity. If Ghost VPN wins, you win." },
  { icon: Laptop, title: "top-tier gear", desc: "Whatever hardware and software you need to do your best work, no questions asked." },
  { icon: Palmtree, title: "unlimited PTO", desc: "We track output, not hours in a chair. Take the time you need to recharge." },
];

export default function CareersPage() {
  return (
    <PageShell
      eyebrow="$ ghost-vpn careers --list-open-roles"
      title={<>JOIN THE <span className="text-gradient">GHOST TEAM</span></>}
      subtitle="We're a small, remote, independently-funded team building the VPN we'd want to use ourselves."
      maxWidth="900px"
    >
      <span className="eyebrow mb-4 block">why work here</span>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {PERKS.map((p) => {
          const Icon = p.icon;
          return (
            <div key={p.title} className="glass-card p-6">
              <div className="w-9 h-9 border border-[#211a30] flex items-center justify-center mb-5">
                <Icon className="w-4 h-4 text-[#a855f7]" strokeWidth={1.75} />
              </div>
              <h3 className="text-[12.5px] font-bold text-[#e8e6f0] mb-2 uppercase leading-snug">{p.title}</h3>
              <p className="text-[12px] text-[#8f82a6] leading-relaxed">{p.desc}</p>
            </div>
          );
        })}
      </div>

      <span className="eyebrow mb-4 block">$ cat open_roles.json</span>
      <TerminalWindow title="open_roles.json" status={`${ROLES.length} OPEN`} statusColor="#39ff88">
        <div>
          {ROLES.map((r) => (
            <a
              key={r.title}
              href={`mailto:careers@ghostvpn.com?subject=${encodeURIComponent("Application: " + r.title)}`}
              className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 px-6 py-5 border-b border-[#211a30] last:border-b-0 row-hover group"
            >
              <div className="flex-1 min-w-0">
                <p className="text-[13.5px] text-[#e8e6f0] group-hover:text-[#a855f7] transition-colors">{r.title}</p>
                <p className="text-[11px] text-[#4a3f5f] mt-1">./{r.team} · {r.location} · {r.type}</p>
              </div>
              <span className="text-[11px] text-[#39ff88] flex items-center gap-1.5 shrink-0">
                apply <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </a>
          ))}
        </div>
      </TerminalWindow>

      <p className="text-center text-[11.5px] text-[#4a3f5f] mt-8">
        Don&apos;t see your role? Email us anyway at <span className="text-[#a855f7]">careers@ghostvpn.com</span>
      </p>
    </PageShell>
  );
}
