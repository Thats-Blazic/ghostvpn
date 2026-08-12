"use client";

import { useEffect, useRef, useState } from "react";
import { Globe2, Server, Gauge } from "lucide-react";

const STATS = [
  { icon: Globe2, v: "65",     l: "countries covered" },
  { icon: Server, v: "6,512",  l: "servers online" },
  { icon: Gauge,  v: "<15ms",  l: "average latency" },
];

const LOCATIONS = [
  { city: "Amsterdam", country: "NL", ping: 8,  load: 34 },
  { city: "New York",  country: "US", ping: 14, load: 58 },
  { city: "London",    country: "UK", ping: 11, load: 41 },
  { city: "Frankfurt",  country: "DE", ping: 16, load: 22 },
  { city: "Singapore",  country: "SG", ping: 22, load: 67 },
  { city: "Tokyo",      country: "JP", ping: 27, load: 45 },
  { city: "Toronto",    country: "CA", ping: 19, load: 30 },
  { city: "Zurich",     country: "CH", ping: 13, load: 18 },
];

export function InfrastructureSection() {
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
    <section id="servers" ref={ref} className="relative border-t border-[#211a30] scroll-mt-[88px]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        <div
          className={`border-b border-[#211a30] py-8 transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <span className="eyebrow mb-3 block">$ ghost-vpn --list-servers</span>
          <h2 className="font-display text-4xl lg:text-6xl leading-[1.02] tracking-tight text-[#e8e6f0] uppercase">
            A GLOBAL<br />
            <span className="text-gradient">GHOST NETWORK</span>
          </h2>
        </div>

        {/* Stat cards */}
        <div className="grid sm:grid-cols-3 border-b border-[#211a30]">
          {STATS.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.l}
                className={`p-7 text-center transition-all duration-700 ${i !== STATS.length - 1 ? "border-r border-[#211a30]" : ""} ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <Icon className="w-5 h-5 text-[#a855f7] mx-auto mb-4" strokeWidth={1.75} />
                <div className="font-display text-4xl text-[#e8e6f0]">{s.v}</div>
                <div className="text-[11px] text-[#4a3f5f] mt-1.5 tracking-wider">{s.l}</div>
              </div>
            );
          })}
        </div>

        {/* ASCII-style ping table */}
        <div
          className={`transition-all duration-700 delay-200 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <div className="flex items-center justify-between px-1 py-4 border-b border-[#211a30]">
            <span className="text-[11px] text-[#4a3f5f] tracking-wider">$ ping --sweep --top=8</span>
            <span className="text-[11px] text-[#4a3f5f]">8 / 65 COUNTRIES SHOWN</span>
          </div>

          {/* Table header */}
          <div className="hidden sm:grid grid-cols-[1fr_80px_140px_60px] gap-4 px-1 py-3 border-b border-[#211a30] text-[9px] tracking-widest text-[#4a3f5f]">
            <span>LOCATION</span>
            <span>PING</span>
            <span>LOAD</span>
            <span className="text-right">STATUS</span>
          </div>

          {LOCATIONS.map((loc, i) => (
            <div
              key={loc.city}
              className={`row-hover grid grid-cols-2 sm:grid-cols-[1fr_80px_140px_60px] gap-4 px-1 py-3.5 border-b border-[#211a30] items-center transition-all duration-500 ${
                vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: `${300 + i * 50}ms` }}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="w-1.5 h-1.5 bg-[#39ff88] shrink-0" />
                <p className="text-[13px] text-[#e8e6f0] truncate">
                  {loc.city} <span className="text-[#4a3f5f]">/{loc.country}</span>
                </p>
              </div>
              <span className="text-[12px] text-[#a855f7] tabular-nums">{loc.ping}ms</span>
              <div className="hidden sm:flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-[#100b1a] border border-[#211a30]">
                  <div className="h-full bg-[#a855f7]" style={{ width: `${loc.load}%` }} />
                </div>
                <span className="text-[10px] text-[#4a3f5f] w-8 tabular-nums">{loc.load}%</span>
              </div>
              <span className="text-[10px] text-[#39ff88] text-right tracking-wider">ONLINE</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
