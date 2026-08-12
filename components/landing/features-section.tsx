"use client";

import { useEffect, useRef, useState } from "react";

const FEATURES = [
  {
    id: "01",
    tag: "encryption.sh",
    title: "MILITARY-GRADE\nAES-256",
    desc: "Every byte you send is wrapped in AES-256 encryption over the WireGuard® protocol. Intercepted traffic is unreadable noise — nothing more.",
    stat: { v: "256-BIT", l: "cipher strength" },
  },
  {
    id: "02",
    tag: "no_logs.sh",
    title: "STRICT\nNO-LOGS POLICY",
    desc: "We never record your history, IP, or DNS queries. Servers run diskless, RAM-only — wiped clean on every reboot.",
    stat: { v: "0x00", l: "logs kept, ever" },
  },
  {
    id: "03",
    tag: "killswitch.sh",
    title: "AUTOMATIC\nKILL SWITCH",
    desc: "If the tunnel drops for even a second, all traffic is blocked instantly. Protected, or offline — never exposed.",
    stat: { v: "<1ms", l: "trigger latency" },
  },
  {
    id: "04",
    tag: "extension.sh",
    title: "ONE-CLICK\nBROWSER GHOST MODE",
    desc: "Encrypt your browser traffic, block trackers, and spoof your location from Chrome, Firefox, Edge, or Brave — no app required.",
    stat: { v: "1-CLICK", l: "activation" },
  },
];

function FeatureRow({ f, index }: { f: typeof FEATURES[0]; index: number }) {
  const [vis, setVis] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`group border-b border-[#211a30] transition-all duration-500 row-hover ${
        vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="grid grid-cols-[56px_1fr] lg:grid-cols-[56px_260px_1fr_160px] gap-0">
        <div className="border-r border-[#211a30] p-5 flex items-start pt-6">
          <span className="text-[10px] text-[#4a3f5f]">{f.id}</span>
        </div>

        <div className="border-r border-[#211a30] p-6 flex flex-col gap-3">
          <span className="eyebrow text-[9px]">./{f.tag}</span>
          <h3 className="font-display text-2xl lg:text-3xl leading-[1.05] text-[#e8e6f0] group-hover:text-[#39ff88] transition-colors duration-300 whitespace-pre-line">
            {f.title}
          </h3>
        </div>

        <div className="col-span-2 lg:col-span-1 border-r border-[#211a30] p-6 flex items-center">
          <p className="text-[13.5px] text-[#8f82a6] leading-relaxed max-w-lg">
            <span className="text-[#4a3f5f]">#</span> {f.desc}
          </p>
        </div>

        <div className="hidden lg:flex flex-col items-end justify-center p-6">
          <div className="font-display text-3xl text-[#a855f7]">{f.stat.v}</div>
          <div className="text-[9px] text-[#4a3f5f] tracking-widest mt-1 text-right">{f.stat.l}</div>
        </div>
      </div>
    </div>
  );
}

export function FeaturesSection() {
  const [vis, setVis] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.05 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="features" className="relative border-t border-[#211a30] scroll-mt-[88px]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div
          ref={ref}
          className={`grid grid-cols-[56px_1fr] lg:grid-cols-[56px_260px_1fr_160px] border-b border-[#211a30] transition-all duration-500 ${
            vis ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="border-r border-[#211a30] p-5" />
          <div className="col-span-2 lg:col-span-3 p-6 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div>
              <span className="eyebrow mb-4 block">$ ls -la /features</span>
              <h2 className="font-display text-4xl lg:text-6xl text-[#e8e6f0] leading-[1.02] tracking-tight uppercase">
                WHAT GHOST VPN<br />
                <span className="text-[#2a2340]" style={{ WebkitTextStroke: "1px #4a3f5f", color: "transparent" }}>
                  DOES FOR YOU
                </span>
              </h2>
            </div>
            <p className="text-[10px] text-[#4a3f5f] tracking-widest max-w-[200px] text-right hidden lg:block">
              4 MODULES LOADED &nbsp;/ &nbsp;AUDITED &nbsp;/ &nbsp;ALWAYS ON
            </p>
          </div>
        </div>

        {FEATURES.map((f, i) => (
          <FeatureRow key={f.id} f={f} index={i} />
        ))}

        <div className="grid grid-cols-[56px_1fr] border-b border-[#211a30]">
          <div className="border-r border-[#211a30]" />
          <div className="p-6 flex items-center justify-between">
            <span className="text-[10px] text-[#4a3f5f]">$ cat full-feature-list.txt →</span>
            <a href="#pricing" className="text-xs text-[#39ff88] hover:underline tracking-wider">view_plans</a>
          </div>
        </div>
      </div>
    </section>
  );
}
