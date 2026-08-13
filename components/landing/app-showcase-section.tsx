"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { LayoutDashboard, Server, TerminalSquare, Activity, ScrollText, Settings } from "lucide-react";

const SCREENS = [
  { id: "dashboard", label: "dashboard",   file: "dashboard.png", icon: LayoutDashboard, desc: "One-click connect, live session state, and real-time throughput — all on one screen." },
  { id: "servers",   label: "servers",     file: "servers.png",   icon: Server,          desc: "6,512 servers across 65 countries. Search, favorite, or import your own .ovpn profiles." },
  { id: "terminal",  label: "terminal",    file: "terminal.png",  icon: TerminalSquare,  desc: "A real embedded terminal for power users who'd rather type than click." },
  { id: "network",   label: "network",     file: "network.png",   icon: Activity,        desc: "Public/VPN IP, DNS, protocol, and live download/upload graphs at a glance." },
  { id: "logs",      label: "logs",        file: "logs.png",      icon: ScrollText,      desc: "Full, searchable history of every connection, firewall, and network event." },
  { id: "settings",  label: "settings",    file: "settings.png",  icon: Settings,        desc: "Kill switch, auto-connect, protocol, and account — tuned exactly how you like it." },
];

export function AppShowcaseSection() {
  const [active, setActive] = useState(0);
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

  const screen = SCREENS[active];

  return (
    <section id="app" ref={ref} className="relative border-t border-[#211a30] bg-[#050208] scroll-mt-[88px]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div
          className={`border-b border-[#211a30] py-8 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <div>
            <span className="eyebrow mb-3 block">$ ./ghost-vpn.exe --screenshot</span>
            <h2 className="font-display text-4xl lg:text-6xl leading-[1.02] tracking-tight text-[#e8e6f0] uppercase">
              INSIDE<br />
              <span className="text-gradient">THE APP</span>
            </h2>
          </div>
          <p className="text-[10px] text-[#4a3f5f] tracking-widest max-w-[220px] lg:text-right">
            REAL PRODUCT UI · WINDOWS 10/11 · v1.0.0
          </p>
        </div>

        <div
          className={`grid lg:grid-cols-[240px_1fr] border-b border-[#211a30] transition-all duration-700 delay-150 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {/* Tab list */}
          <div className="border-r border-[#211a30] hidden lg:block">
            {SCREENS.map((s, i) => {
              const Icon = s.icon;
              const isActive = i === active;
              return (
                <button
                  key={s.id}
                  onClick={() => setActive(i)}
                  className={`w-full text-left flex items-center gap-3 px-6 py-5 border-b border-[#211a30] transition-colors duration-150 ${
                    isActive ? "bg-[#0a0712] text-[#e8e6f0]" : "text-[#8f82a6] hover:bg-[#070510] hover:text-[#e8e6f0]"
                  }`}
                >
                  <span className={`w-1 h-4 shrink-0 ${isActive ? "bg-[#a855f7]" : "bg-transparent"}`} />
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-[#a855f7]" : "text-[#4a3f5f]"}`} strokeWidth={1.75} />
                  <span className="text-[13px]">
                    <span className="text-[#4a3f5f]">./</span>{s.label}
                  </span>
                </button>
              );
            })}
            <div className="px-6 py-5 text-[11px] text-[#4a3f5f] leading-relaxed">
              $ cat ./{screen.file}
              <p className="mt-2 text-[12px] text-[#8f82a6] leading-relaxed">{screen.desc}</p>
            </div>
          </div>

          {/* Mobile tabs */}
          <div className="lg:hidden flex overflow-x-auto border-b border-[#211a30] no-scrollbar">
            {SCREENS.map((s, i) => {
              const Icon = s.icon;
              const isActive = i === active;
              return (
                <button
                  key={s.id}
                  onClick={() => setActive(i)}
                  className={`shrink-0 flex items-center gap-2 px-4 py-3.5 border-r border-[#211a30] transition-colors duration-150 ${
                    isActive ? "bg-[#0a0712] text-[#e8e6f0]" : "text-[#8f82a6]"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-[#a855f7]" : "text-[#4a3f5f]"}`} strokeWidth={1.75} />
                  <span className="text-[12px] whitespace-nowrap">{s.label}</span>
                </button>
              );
            })}
          </div>

          {/* Screenshot */}
          <div className="bg-[#030209] p-4 lg:p-8">
            <div className="terminal-window glow-violet">
              <div className="terminal-titlebar">
                <span className="terminal-dot" style={{ background: "#ff5f56" }} />
                <span className="terminal-dot" style={{ background: "#ffbd2e" }} />
                <span className="terminal-dot" style={{ background: "#27c93f" }} />
                <span className="ml-3 text-[11px] text-[#6b6280] truncate">ghost-vpn.exe — {screen.label}</span>
                <span className="ml-auto flex items-center gap-1.5 text-[10px] shrink-0 text-[#39ff88]">
                  <span className="status-pulse w-1.5 h-1.5 rounded-full inline-block bg-[#39ff88]" />
                  LIVE
                </span>
              </div>
              <div className="relative w-full aspect-[1024/645] bg-[#030209]">
                <Image
                  key={screen.file}
                  src={`/app-screenshots/${screen.file}`}
                  alt={`Ghost VPN app — ${screen.label} screen`}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 900px"
                />
              </div>
            </div>
            <p className="lg:hidden mt-4 text-[12px] text-[#8f82a6] leading-relaxed">
              <span className="text-[#4a3f5f]">#</span> {screen.desc}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 border-b border-[#211a30]">
          {[
            { l: "encryption", v: "AES-256-GCM" },
            { l: "backend",    v: "rust" },
            { l: "install",    v: "2.8 MB" },
            { l: "platform",   v: "win 10/11" },
          ].map((s, i) => (
            <div key={s.l} className={`p-5 text-center border-[#211a30] ${i % 4 !== 3 ? "border-r" : ""}`}>
              <div className="font-display text-lg text-[#e8e6f0]">{s.v}</div>
              <div className="text-[9px] text-[#4a3f5f] mt-1 tracking-widest">{s.l}</div>
            </div>
          ))}
          <a
            href="/download"
            className="col-span-2 flex items-center justify-center gap-2 text-[12px] text-[#39ff88] hover:underline tracking-wider p-5 border-[#211a30] border-t sm:border-t-0 sm:border-l"
          >
            $ download_free →
          </a>
        </div>
      </div>
    </section>
  );
}
