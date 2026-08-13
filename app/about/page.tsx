import { EyeOff, ShieldCheck, Globe2 } from "lucide-react";
import { LogoMark } from "@/components/logo";
import { PageShell } from "@/components/page-shell";
import { TerminalWindow } from "@/components/landing/terminal-window";

const STATS = [
  { v: "2019", l: "founded" },
  { v: "3.8M+", l: "active ghosts" },
  { v: "65", l: "countries" },
  { v: "41", l: "team members" },
];

const VALUES = [
  { icon: EyeOff, title: "privacy is a default, not a feature", desc: "We build as if every log we don't collect is a promise we don't have to break." },
  { icon: ShieldCheck, title: "verify, don't just claim", desc: "Every privacy claim we make is independently audited, annually, and published in full." },
  { icon: Globe2, title: "the internet should be open", desc: "Censorship and geo-blocking are bugs, not features. We build tools to route around them." },
];

export default function AboutPage() {
  return (
    <PageShell
      eyebrow="$ cat about.txt"
      title={<>ABOUT <span className="text-gradient">GHOST VPN</span></>}
      maxWidth="880px"
    >
      <TerminalWindow title="manifesto.txt" status="cat" statusColor="#a855f7" className="mb-8">
        <div className="p-7 lg:p-10">
          <div className="flex items-center gap-3 mb-6">
            <LogoMark size={36} />
            <p className="text-[12px] text-[#4a3f5f]">$ whoami</p>
          </div>
          <p className="text-[14px] text-[#8f82a6] leading-relaxed mb-5">
            Ghost VPN started in 2019 as a side project between three engineers who were tired of VPN providers
            that logged &quot;anonymously,&quot; sold to ad networks quietly, and folded the moment a subpoena
            showed up. We wanted a VPN we&apos;d actually trust with our own traffic — so we built one, ran it
            in RAM-only mode from day one, and published the source of our connection handler for anyone to read.
          </p>
          <p className="text-[14px] text-[#8f82a6] leading-relaxed mb-5">
            Today Ghost VPN protects millions of people across 65 countries — journalists filing stories from
            hostile networks, travelers on hotel WiFi, and regular people who just don&apos;t think their ISP
            needs to know everything they do online. We&apos;re still a privacy company first. Everything else,
            including the terminal-flavored dashboard, is just us having fun building it.
          </p>
          <p className="text-[14px] text-[#8f82a6] leading-relaxed">
            We&apos;re fully remote, independently funded, and we don&apos;t answer to advertisers — because we
            don&apos;t have any.
          </p>
        </div>
      </TerminalWindow>

      <div className="grid grid-cols-2 sm:grid-cols-4 border border-[#211a30] mb-8">
        {STATS.map((s, i) => (
          <div key={s.l} className={`p-6 text-center ${i % 2 === 0 ? "border-r" : ""} ${i < 2 ? "border-b sm:border-b-0" : ""} ${i !== STATS.length - 1 ? "sm:border-r" : ""} border-[#211a30]`}>
            <div className="font-display text-2xl lg:text-3xl text-[#e8e6f0]">{s.v}</div>
            <div className="text-[10px] text-[#4a3f5f] mt-1.5 tracking-wider">{s.l}</div>
          </div>
        ))}
      </div>

      <span className="eyebrow mb-4 block">$ cat values.json</span>
      <div className="grid sm:grid-cols-3 gap-4">
        {VALUES.map((v) => {
          const Icon = v.icon;
          return (
            <div key={v.title} className="glass-card p-6">
              <div className="w-9 h-9 border border-[#211a30] flex items-center justify-center mb-5">
                <Icon className="w-4 h-4 text-[#a855f7]" strokeWidth={1.75} />
              </div>
              <h3 className="text-[13px] font-bold text-[#e8e6f0] mb-2 uppercase leading-snug">{v.title}</h3>
              <p className="text-[12.5px] text-[#8f82a6] leading-relaxed">{v.desc}</p>
            </div>
          );
        })}
      </div>
    </PageShell>
  );
}
