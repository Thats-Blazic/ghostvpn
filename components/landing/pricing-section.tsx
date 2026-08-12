"use client";

import { useState, useEffect, useRef } from "react";
import { Ghost, Check, Terminal } from "lucide-react";
import { PLANS } from "@/lib/plans";

export function PricingSection() {
  const [annual, setAnnual] = useState(true);
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
    <section id="pricing" ref={ref} className="relative border-t border-[#211a30] scroll-mt-[88px]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        <div
          className={`border-b border-[#211a30] py-8 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <div>
            <span className="eyebrow mb-3 block">$ apt list --packages ghost-vpn-*</span>
            <h2 className="font-display text-4xl lg:text-6xl leading-[1.02] tracking-tight text-[#e8e6f0] uppercase">
              PICK YOUR LEVEL<br />
              <span className="text-gradient">OF INVISIBLE</span>
            </h2>
          </div>

          {/* Billing toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <span className={`text-[12px] transition-colors ${!annual ? "text-[#e8e6f0]" : "text-[#4a3f5f]"}`}>monthly</span>
            <button
              onClick={() => setAnnual(!annual)}
              className="relative w-12 h-6 border border-[#211a30] bg-[#100b1a] flex items-center"
            >
              <div className={`w-[18px] h-[18px] bg-[#a855f7] transition-transform duration-300 mx-0.5 ${annual ? "translate-x-6" : "translate-x-0"}`} />
            </button>
            <span className={`text-[12px] transition-colors ${annual ? "text-[#e8e6f0]" : "text-[#4a3f5f]"}`}>annual</span>
            {annual && (
              <span className="text-[10px] text-[#39ff88] border border-[#39ff88]/30 px-2 py-1">
                -45%
              </span>
            )}
          </div>
        </div>

        {/* Plans grid */}
        <div className="grid md:grid-cols-3 border-b border-[#211a30]">
          {PLANS.map((p, i) => {
            const isGhost = p.style === "ghost";
            const isHighlight = p.style === "highlight";
            return (
              <div
                key={p.id}
                className={`relative flex flex-col border-[#211a30] transition-all duration-700 ${
                  i !== PLANS.length - 1 ? "md:border-r" : ""
                } ${i > 0 ? "border-t md:border-t-0" : ""} ${
                  isGhost
                    ? "bg-gradient-to-b from-[#1a0e2e] to-[#0a0712] glow-ghost relative z-10"
                    : isHighlight
                    ? "bg-[#0a0712]"
                    : "bg-transparent"
                } ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Titlebar */}
                <div className="terminal-titlebar !border-b-[#211a30]" style={isGhost ? { background: "rgba(255,95,241,0.06)" } : undefined}>
                  <span className="terminal-dot" style={{ background: "#ff5f56" }} />
                  <span className="terminal-dot" style={{ background: "#ffbd2e" }} />
                  <span className="terminal-dot" style={{ background: "#27c93f" }} />
                  <span className="ml-3 text-[10px] text-[#4a3f5f] truncate">{p.pkg}.pkg</span>
                  {isHighlight && (
                    <span className="ml-auto text-[9px] text-[#a855f7] tracking-wider shrink-0">POPULAR</span>
                  )}
                  {isGhost && (
                    <span className="ml-auto text-[9px] text-[#ff5ff1] tracking-wider shrink-0 flex items-center gap-1">
                      <Ghost className="w-3 h-3" /> ROOT ACCESS
                    </span>
                  )}
                </div>

                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Terminal className="w-4 h-4 text-[#4a3f5f]" />
                    <h3 className={`font-display text-2xl uppercase ${isGhost ? "ghost-text-gradient" : "text-[#e8e6f0]"}`}>
                      {p.name}
                    </h3>
                  </div>
                  <p className="text-[12.5px] text-[#8f82a6] mb-7">{p.tagline}</p>

                  <div className="flex items-baseline gap-1.5 mb-1">
                    <span className={`font-display text-5xl ${isGhost ? "text-[#ff5ff1]" : "text-[#e8e6f0]"}`}>
                      ${annual ? p.price.yr : p.price.mo}
                    </span>
                    <span className="text-[12px] text-[#4a3f5f]">/ month</span>
                  </div>
                  <p className="text-[11px] text-[#4a3f5f] mb-8">{annual ? "billed annually" : "billed monthly"}</p>

                  <a
                    href={`/checkout?plan=${p.id}&billing=${annual ? "annual" : "monthly"}`}
                    className={`w-full flex items-center justify-center text-[13px] font-bold py-4 mb-8 transition-all duration-200 ${
                      isGhost
                        ? "bg-[#ff5ff1] text-[#1a0a24] hover:bg-[#ff8ff5]"
                        : isHighlight
                        ? "bg-[#a855f7] text-[#030209] hover:bg-[#c084fc]"
                        : "border border-[#4a3f5f] text-[#e8e6f0] hover:border-[#a855f7] hover:text-[#a855f7]"
                    }`}
                  >
                    [ $ {p.cta} ]
                  </a>

                  <ul className="space-y-3.5 mt-auto">
                    {p.features.map(f => (
                      <li key={f} className="flex items-start gap-3">
                        <Check className={`w-4 h-4 mt-0.5 shrink-0 ${isGhost ? "text-[#ff5ff1]" : "text-[#a855f7]"}`} strokeWidth={2.25} />
                        <span className="text-[13px] text-[#8f82a6] leading-snug">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-center text-[11px] text-[#4a3f5f] py-6 tracking-wider">
          ALL PLANS INCLUDE AES-256 ENCRYPTION &nbsp;·&nbsp; 30-DAY MONEY-BACK GUARANTEE &nbsp;·&nbsp; NO-LOGS POLICY
        </p>
      </div>
    </section>
  );
}
