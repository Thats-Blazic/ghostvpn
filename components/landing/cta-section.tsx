"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Chrome } from "lucide-react";
import { TerminalWindow } from "./terminal-window";

export function CtaSection() {
  const [vis, setVis] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="relative border-t border-[#211a30]">
      <div
        ref={ref}
        className={`max-w-[1400px] mx-auto px-6 lg:px-12 py-20 lg:py-28 transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div className="text-center max-w-[720px] mx-auto">
          <span className="eyebrow justify-center mb-6">$ echo &quot;ready to disappear?&quot;</span>

          <h2 className="font-display text-[clamp(2.25rem,6vw,4.25rem)] leading-[1.05] tracking-tight text-[#e8e6f0] uppercase mb-6">
            YOUR PRIVACY STARTS<br />
            <span className="text-gradient">RIGHT NOW</span>
          </h2>

          <p className="text-[14.5px] text-[#8f82a6] mb-10 max-w-lg mx-auto leading-relaxed">
            Join 3.8M+ people browsing invisibly with Ghost VPN. 30-day money-back guarantee. Cancel anytime, no questions asked.
          </p>
        </div>

        <div className="max-w-[640px] mx-auto mb-14">
          <TerminalWindow title="install.sh" status="READY" statusColor="#39ff88">
            <div className="p-6 font-mono text-[13px]">
              <div className="text-[#8f82a6] mb-4">
                $ curl -sSL ghostvpn.sh/install | sh<span className="caret text-[#39ff88]">█</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <a
                  href="#pricing"
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#a855f7] text-[#030209] text-[13px] font-bold px-7 py-4 hover:bg-[#c084fc] transition-colors duration-200"
                >
                  [ get_ghost_vpn ]
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <a
                  href="#extension"
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-[#4a3f5f] text-[#e8e6f0] text-[13px] px-7 py-4 hover:border-[#39ff88]/50 hover:text-[#39ff88] transition-colors duration-200"
                >
                  <Chrome className="w-4 h-4" />
                  [ add_extension ]
                </a>
              </div>
            </div>
          </TerminalWindow>
        </div>

        <div className="flex items-center justify-center gap-8 lg:gap-16 flex-wrap">
          {[
            { v: "3.8M+", l: "active ghosts" },
            { v: "6,512", l: "servers" },
            { v: "65",    l: "countries" },
            { v: "0",     l: "logs kept" },
          ].map(s => (
            <div key={s.l} className="text-center">
              <div className="font-display text-2xl text-[#e8e6f0]">{s.v}</div>
              <div className="text-[10px] text-[#4a3f5f] mt-0.5 tracking-wider">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
