"use client";

import { useEffect, useRef, useState } from "react";
import { TerminalWindow } from "./terminal-window";

const STEPS = [
  {
    id: "01",
    tag: "install",
    title: "GET THE\nAPP OR EXTENSION",
    desc: "Download the Ghost VPN app for Windows, macOS, Linux, iOS, or Android — or add the browser extension to Chrome, Firefox, Edge, or Brave. One login, everywhere.",
    file: "install.sh",
    code: `$ curl -sSL ghostvpn.sh/install | sh

> detecting platform ... Windows 11
> downloading ghost-vpn v6.2.1 ...
> installing browser extension: Chrome
> installing browser extension: Firefox

[OK] ghost-vpn installed
$ sign in to activate your plan_`,
  },
  {
    id: "02",
    tag: "connect",
    title: "PICK A SERVER\nOR GO AUTO",
    desc: "Run quick-connect for the fastest server near you, or choose from 65 countries manually. Specialty servers for streaming, torrenting, and censorship bypass are one flag away.",
    file: "connect.sh",
    code: `$ ghost-vpn connect --auto

> scanning 6,512 servers ...
> best match: Amsterdam-NL-04 (8ms)
> negotiating WireGuard handshake ...
> tunnel established ✔

STATUS: CONNECTED
IP: 91.xxx.xxx.xxx → HIDDEN_`,
  },
  {
    id: "03",
    tag: "browse",
    title: "GO INVISIBLE\nON EVERY SITE",
    desc: "Your real IP, location, and ISP disappear the moment you connect. Kill switch, ad + tracker blocking, and DNS leak protection all run silently in the background.",
    file: "status.sh",
    code: `$ ghost-vpn status

kill_switch ....... ARMED
dns_leak_check ..... PASSED
ad_tracker_block ... 1,204 blocked
encryption ......... AES-256 / WireGuard
logs_kept .......... NONE

$ you are invisible._`,
  },
];

export function HowItWorksSection() {
  const [active, setActive]   = useState(0);
  const [vis, setVis]         = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const id = setInterval(() => setActive(a => (a + 1) % STEPS.length), 5000);
    return () => clearInterval(id);
  }, []);

  const step = STEPS[active];

  return (
    <section id="how-it-works" ref={ref} className="relative border-t border-[#211a30] bg-[#050208] scroll-mt-[88px]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        <div
          className={`border-b border-[#211a30] py-8 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 transition-all duration-500 ${vis ? "opacity-100" : "opacity-0"}`}
        >
          <div>
            <span className="eyebrow mb-3 block">$ man ghost-vpn</span>
            <h2 className="font-display text-4xl lg:text-6xl leading-[1.02] tracking-tight text-[#e8e6f0] uppercase">
              INVISIBLE IN<br />
              <span style={{ WebkitTextStroke: "1px #4a3f5f", color: "transparent" }}>THREE COMMANDS</span>
            </h2>
          </div>
          <span className="text-[10px] text-[#4a3f5f] tracking-widest">
            INSTALL &nbsp;·&nbsp; CONNECT &nbsp;·&nbsp; BROWSE
          </span>
        </div>

        <div className="grid lg:grid-cols-[280px_1fr] border-b border-[#211a30]">
          {/* Step nav */}
          <div className="border-r border-[#211a30]">
            {STEPS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActive(i)}
                className={`w-full text-left border-b border-[#211a30] p-6 transition-all duration-200 group ${
                  active === i ? "bg-[#0a0712]" : "hover:bg-[#070510]"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[9px] text-[#4a3f5f] tracking-widest">./{s.tag}</span>
                  <span className="text-[10px] text-[#4a3f5f]">{s.id}</span>
                </div>
                <h3 className={`font-display text-xl leading-[1.05] transition-colors uppercase ${
                  active === i ? "text-[#39ff88]" : "text-[#4a3f5f] group-hover:text-[#6b6280]"
                }`}>
                  {s.title}
                </h3>
                {active === i && (
                  <div className="mt-4 h-px bg-[#211a30] overflow-hidden">
                    <div
                      key={active}
                      className="h-full bg-[#39ff88]"
                      style={{ width: 0, animation: "draw-line 5s linear forwards" }}
                    />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Content panel */}
          <div className="grid lg:grid-cols-2">
            <div className="border-r border-[#211a30] p-8 flex flex-col justify-between">
              <div>
                <p className="text-[13.5px] text-[#8f82a6] leading-relaxed mb-8">{step.desc}</p>
                <a href="#pricing" className="inline-flex items-center gap-2 text-[11px] text-[#39ff88] tracking-wider hover:underline">
                  $ get_started →
                </a>
              </div>
              <div className="mt-8 text-[10px] text-[#4a3f5f] border-t border-[#211a30] pt-4">
                STEP &nbsp;{step.id} &nbsp;OF &nbsp;03
              </div>
            </div>

            <div className="bg-[#030209] p-6 lg:p-8">
              <TerminalWindow title={step.file} status="OK" statusColor="#39ff88">
                <div className="p-6 font-mono text-[12px] min-h-[240px]">
                  <pre>
                    {step.code.split("\n").map((line, li) => (
                      <div
                        key={`${active}-${li}`}
                        className="leading-7"
                        style={{ animation: `fade-up 0.3s ease ${li * 60}ms both` }}
                      >
                        <span className="text-[#8f82a6]">{line}</span>
                      </div>
                    ))}
                  </pre>
                </div>
              </TerminalWindow>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
