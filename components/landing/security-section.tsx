"use client";

import { useEffect, useRef, useState } from "react";
import { HardDriveDownload, SplitSquareHorizontal, Radar, FileCheck2, type LucideIcon } from "lucide-react";

const BADGES = ["no-logs audited", "aes-256-gcm", "wireguard®", "gdpr ready", "dns leak proof"];

const FEATURES: { icon: LucideIcon; tag: string; title: string; desc: string }[] = [
  {
    icon: HardDriveDownload,
    tag: "isolation",
    title: "RAM-ONLY\nSERVERS",
    desc: "Every server runs entirely in volatile memory. A reboot wipes everything, permanently and instantly.",
  },
  {
    icon: SplitSquareHorizontal,
    tag: "access_control",
    title: "SPLIT\nTUNNELING",
    desc: "Choose exactly which apps and sites go through the tunnel. Full control, down to the process level.",
  },
  {
    icon: Radar,
    tag: "leak_protection",
    title: "DNS & IPV6\nSHIELD",
    desc: "All DNS requests route through encrypted resolvers, and IPv6 traffic is blocked outright.",
  },
  {
    icon: FileCheck2,
    tag: "compliance",
    title: "INDEPENDENTLY\nAUDITED",
    desc: "Our no-logs policy is verified annually by a third-party security firm. Reports published in full.",
  },
];

export function SecuritySection() {
  const [vis, setVis] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="security" ref={ref} className="relative border-t border-[#211a30] bg-[#050208] scroll-mt-[88px]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        <div
          className={`border-b border-[#211a30] py-8 transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <span className="eyebrow mb-3 block">$ ghost-vpn audit --verify</span>
          <h2 className="font-display text-4xl lg:text-6xl leading-[1.02] tracking-tight text-[#e8e6f0] uppercase mb-6">
            PRIVACY YOU<br />
            <span style={{ WebkitTextStroke: "1px #4a3f5f", color: "transparent" }}>CAN VERIFY</span>
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            {BADGES.map((b) => (
              <span key={b} className="text-[11px] text-[#8f82a6] border border-[#211a30] px-3 py-1.5">
                [{b}]
              </span>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className={`p-7 border-[#211a30] ${i % 2 === 0 ? "border-r" : ""} ${i < 2 ? "border-b sm:border-b lg:border-b-0" : ""} ${i !== FEATURES.length - 1 ? "lg:border-r" : ""} transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-10 h-10 border border-[#211a30] flex items-center justify-center mb-6">
                  <Icon className="w-[18px] h-[18px] text-[#a855f7]" strokeWidth={1.75} />
                </div>
                <span className="eyebrow mb-3 block text-[9px]">./{f.tag}</span>
                <h3 className="font-display text-lg text-[#e8e6f0] mb-3 whitespace-pre-line leading-snug">{f.title}</h3>
                <p className="text-[13px] text-[#8f82a6] leading-relaxed">
                  <span className="text-[#39ff88]">[OK]</span> {f.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
