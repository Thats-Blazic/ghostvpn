"use client";

import { useEffect, useRef, useState } from "react";
import { Chrome, ShieldCheck, EyeOff, Gauge, Sparkles } from "lucide-react";

const EXT_PROPS = [
  { icon: Sparkles,    k: "1-click ghost mode",  v: "Encrypt your browser traffic instantly, no app required." },
  { icon: ShieldCheck, k: "built-in ad blocker",  v: "Strip ads, trackers, and cross-site fingerprinting scripts." },
  { icon: EyeOff,      k: "webrtc leak lock",     v: "Prevents sites from ever seeing your real IP address." },
  { icon: Gauge,       k: "~900kb install",       v: "Featherlight. Chrome, Firefox, Edge & Brave supported." },
];

export function DevelopersSection() {
  const [vis, setVis] = useState(false);
  const [on, setOn]   = useState(true);
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
    <section id="extension" ref={ref} className="relative border-t border-[#211a30] scroll-mt-[88px]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        <div
          className={`border-b border-[#211a30] py-8 transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <span className="eyebrow mb-3 block">$ chrome://extensions --add ghost-vpn</span>
          <h2 className="font-display text-4xl lg:text-6xl leading-[1.02] tracking-tight text-[#e8e6f0] uppercase">
            GHOST MODE,<br />
            <span className="text-gradient">ONE CLICK AWAY</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 border-b border-[#211a30]">
          {/* Left — properties */}
          <div
            className={`border-r border-[#211a30] p-8 lg:p-12 flex flex-col justify-center transition-all duration-700 ${
              vis ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
            }`}
          >
            <p className="text-[13.5px] text-[#8f82a6] leading-relaxed mb-9 max-w-md">
              <span className="text-[#4a3f5f]">#</span> The Ghost VPN extension lives in your toolbar. Encrypt traffic, block ads and trackers, and spoof your location — without opening the desktop app.
            </p>

            <div className="space-y-0">
              {EXT_PROPS.map((p, i) => {
                const Icon = p.icon;
                return (
                  <div key={p.k} className={`flex items-start gap-4 py-4 ${i !== 0 ? "border-t border-[#211a30]" : ""}`}>
                    <div className="w-9 h-9 border border-[#211a30] flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4 text-[#a855f7]" strokeWidth={1.75} />
                    </div>
                    <div>
                      <p className="text-[13.5px] font-semibold text-[#e8e6f0]">./{p.k}</p>
                      <p className="text-[13px] text-[#8f82a6] mt-0.5">{p.v}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <a
              href="#pricing"
              className="group inline-flex items-center gap-2 mt-9 w-fit bg-[#a855f7] text-[#030209] text-[13px] font-bold px-6 py-4 hover:bg-[#c084fc] transition-colors duration-200"
            >
              <Chrome className="w-4 h-4" />
              [ add_to_browser --free-trial ]
            </a>
          </div>

          {/* Right — terminal + browser hybrid mockup */}
          <div
            className={`relative bg-[#050208] p-6 lg:p-10 flex items-center justify-center transition-all duration-700 delay-150 ${
              vis ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"
            }`}
          >
            <div className="w-full max-w-[340px] terminal-window">
              {/* Browser-style titlebar */}
              <div className="terminal-titlebar">
                <span className="terminal-dot" style={{ background: "#ff5f56" }} />
                <span className="terminal-dot" style={{ background: "#ffbd2e" }} />
                <span className="terminal-dot" style={{ background: "#27c93f" }} />
                <div className="ml-3 flex-1 h-5 bg-[#100b1a] border border-[#211a30] flex items-center px-2">
                  <span className="text-[10px] text-[#4a3f5f]">ghostvpn.com</span>
                </div>
              </div>

              {/* Extension popup */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[12px] font-bold text-[#e8e6f0]">ghost_vpn.ext</span>
                  <button
                    onClick={() => setOn(!on)}
                    className={`relative w-11 h-6 border transition-colors duration-300 ${on ? "bg-[#a855f7]/20 border-[#a855f7]" : "bg-[#100b1a] border-[#211a30]"}`}
                  >
                    <span className={`absolute top-[3px] w-3.5 h-3.5 transition-transform duration-300 ${on ? "translate-x-[22px] bg-[#a855f7]" : "translate-x-1 bg-[#4a3f5f]"}`} />
                  </button>
                </div>

                <div className="flex flex-col items-center py-6 border-y border-[#211a30]">
                  <div className={`w-16 h-16 border flex items-center justify-center mb-4 transition-all duration-500 ${on ? "border-[#39ff88]/40 bg-[#39ff88]/5 glow-green" : "border-[#211a30] bg-transparent"}`}>
                    <ShieldCheck className={`w-7 h-7 transition-colors duration-500 ${on ? "text-[#39ff88]" : "text-[#4a3f5f]"}`} strokeWidth={1.5} />
                  </div>
                  <p className={`text-[12px] font-bold tracking-wider transition-colors duration-500 ${on ? "text-[#39ff88]" : "text-[#4a3f5f]"}`}>
                    {on ? "STATUS: PROTECTED" : "STATUS: UNPROTECTED"}
                  </p>
                  <p className="text-[10px] text-[#4a3f5f] mt-1">{on ? "amsterdam-nl-04 · 8ms" : "click to connect"}</p>
                </div>

                <div className="grid grid-cols-2 gap-0 mt-0 border-t border-[#211a30]">
                  <div className="p-4 text-center border-r border-[#211a30]">
                    <p className="font-display text-xl text-[#e8e6f0]">342</p>
                    <p className="text-[9px] text-[#4a3f5f] mt-0.5 tracking-wider">TRACKERS BLOCKED</p>
                  </div>
                  <div className="p-4 text-center">
                    <p className="font-display text-xl text-[#e8e6f0]">811</p>
                    <p className="text-[9px] text-[#4a3f5f] mt-0.5 tracking-wider">ADS BLOCKED</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
