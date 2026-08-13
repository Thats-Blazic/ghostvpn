"use client";

import { useEffect, useState } from "react";
import { MatrixRain } from "./matrix-rain";
import { TerminalWindow } from "./terminal-window";

const BOOT_LINES = [
  { text: "$ ghost-vpn --init", pause: 300 },
  { text: "> loading encryption modules ... OK", pause: 250 },
  { text: "> scanning 6,512 servers across 65 countries ...", pause: 400 },
  { text: "> best node found: Amsterdam-NL-04 (8ms)", pause: 250 },
  { text: "> negotiating WireGuard® handshake ...", pause: 350 },
  { text: "> tunnel established. AES-256 encryption ACTIVE", pause: 300 },
  { text: "> real IP hidden. logs: NONE.", pause: 300 },
  { text: "$ status: INVISIBLE ✔", pause: 1400 },
];

function useTypewriter(lines: typeof BOOT_LINES) {
  const [output, setOutput] = useState<string[]>([]);
  const [current, setCurrent] = useState("");

  useEffect(() => {
    let lineIdx = 0;
    let charIdx = 0;
    let cancelled = false;
    let timeout: ReturnType<typeof setTimeout>;

    const typeChar = () => {
      if (cancelled) return;
      const line = lines[lineIdx];
      if (charIdx <= line.text.length) {
        setCurrent(line.text.slice(0, charIdx));
        charIdx++;
        timeout = setTimeout(typeChar, 16 + Math.random() * 20);
      } else {
        timeout = setTimeout(() => {
          setOutput((prev) => [...prev, line.text]);
          setCurrent("");
          charIdx = 0;
          lineIdx = (lineIdx + 1) % lines.length;
          if (lineIdx === 0) setOutput([]);
          typeChar();
        }, line.pause);
      }
    };

    timeout = setTimeout(typeChar, 500);
    return () => { cancelled = true; clearTimeout(timeout); };
  }, [lines]);

  return { output, current };
}

export function HeroSection() {
  const [visible, setVisible] = useState(false);
  const { output, current } = useTypewriter(BOOT_LINES);

  useEffect(() => { setVisible(true); }, []);

  return (
    <section className="relative min-h-dvh flex flex-col justify-center overflow-hidden grid-bg pt-[110px] pb-16">
      {/* Matrix rain background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.22]">
        <MatrixRain className="w-full h-full" />
      </div>
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#030209] via-transparent to-[#030209]" />

      <div className="relative z-10 max-w-[1100px] mx-auto px-6 w-full">
        <div
          className={`text-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <p className="text-[12px] tracking-[0.15em] text-[#39ff88] mb-6">
            $ whoami <span className="text-[#4a3f5f]">→</span> anonymous
          </p>

          <div className="glitch-wrap">
            <h1 className="font-display text-[clamp(2.5rem,8vw,6rem)] leading-[1.02] tracking-tight text-[#e8e6f0] uppercase">
              BROWSE THE WEB<br />
              <span className="text-gradient">COMPLETELY INVISIBLE</span>
            </h1>
            <span aria-hidden className="glitch-layer g1 font-display text-[clamp(2.5rem,8vw,6rem)] leading-[1.02] tracking-tight uppercase">
              BROWSE THE WEB<br />COMPLETELY INVISIBLE
            </span>
            <span aria-hidden className="glitch-layer g2 font-display text-[clamp(2.5rem,8vw,6rem)] leading-[1.02] tracking-tight uppercase">
              BROWSE THE WEB<br />COMPLETELY INVISIBLE
            </span>
          </div>

          <p className="mt-8 text-[15px] text-[#8f82a6] leading-relaxed max-w-xl mx-auto">
            Ghost VPN encrypts every packet you send and routes it through 6,500+ servers in 65 countries. One app, one browser extension, a strict no-logs policy. Your ISP sees nothing.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-9">
            <a
              href="/download"
              className="w-full sm:w-auto text-center text-[14px] font-bold bg-[#a855f7] text-[#030209] px-7 py-4 hover:bg-[#c084fc] transition-colors"
            >
              [ ./install-ghost-vpn.sh ] — free
            </a>
            <a
              href="#extension"
              className="w-full sm:w-auto text-center text-[14px] border border-[#4a3f5f] text-[#e8e6f0] px-7 py-4 hover:border-[#39ff88]/50 hover:text-[#39ff88] transition-colors"
            >
              [ add_browser_extension ]
            </a>
          </div>
        </div>

        {/* Terminal boot sequence */}
        <div
          className={`mt-14 max-w-[640px] mx-auto transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <TerminalWindow title="ghost@vpn:~" status="LIVE" statusColor="#39ff88" className="glow-violet">
            <div className="p-5 font-mono text-[12.5px] min-h-[220px]">
              {output.map((line, i) => (
                <div key={i} className="leading-7 text-[#8f82a6]">
                  {line}
                </div>
              ))}
              <div className="leading-7 text-[#8f82a6]">
                {current}
                <span className="caret text-[#39ff88]">█</span>
              </div>
            </div>
          </TerminalWindow>
        </div>

        {/* Ticker */}
        <div
          className={`mt-14 border-t border-[#211a30] pt-6 transition-all duration-700 delay-500 ${visible ? "opacity-100" : "opacity-0"}`}
        >
          <div className="overflow-hidden">
            <div className="marquee-fast whitespace-nowrap flex gap-16">
              {[...Array(2)].map((_, rep) => (
                <span key={rep} className="inline-flex items-center gap-16">
                  {[
                    "AES-256 + WIREGUARD",
                    "ZERO-LOG POLICY",
                    "KILL SWITCH ARMED",
                    "6,512 SERVERS / 65 COUNTRIES",
                    "AUDITED ANNUALLY",
                    "CHROME + FIREFOX EXTENSION",
                    "NO DNS LEAKS",
                    "GHOST MODE™ MULTI-HOP",
                  ].map(item => (
                    <span key={item} className="flex items-center gap-3 text-[10px] tracking-[0.15em] text-[#4a3f5f]">
                      <span className="w-1 h-1 bg-[#a855f7] inline-block shrink-0" />
                      {item}
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
