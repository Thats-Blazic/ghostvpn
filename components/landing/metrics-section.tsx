"use client";

import { useEffect, useRef, useState } from "react";

function AnimCounter({
  end,
  suffix = "",
  prefix = "",
}: {
  end: number;
  suffix?: string;
  prefix?: string;
}) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const done = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !done.current) {
          done.current = true;
          const start = performance.now();
          const dur = 1800;
          const tick = (now: number) => {
            const p = Math.min((now - start) / dur, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            setN(Math.floor(ease * end));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end]);

  return (
    <div ref={ref} className="font-display text-[clamp(1.75rem,4vw,3rem)] leading-none tracking-tight text-[#e8e6f0] tabular-nums">
      {prefix}
      {n.toLocaleString()}
      {suffix}
    </div>
  );
}

const METRICS = [
  { end: 9,       suffix: "PB+", label: "encrypted_daily" },
  { end: 128000,  suffix: "+",   label: "threats_blocked_per_day" },
  { end: 2,       suffix: "s",   label: "avg_connect_time" },
  { end: 3800000, suffix: "+",   label: "active_ghosts" },
];

export function MetricsSection() {
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
    <section id="metrics" ref={ref} className="relative border-t border-[#211a30]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between py-3 border-b border-[#211a30]">
          <span className="text-[10px] text-[#4a3f5f] tracking-wider">$ cat /proc/ghostvpn/system.status</span>
          <span className="text-[10px] text-[#39ff88] flex items-center gap-1.5">
            <span className="status-pulse w-1.5 h-1.5 bg-[#39ff88] inline-block rounded-full" /> LIVE
          </span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {METRICS.map((m, i) => (
            <div
              key={m.label}
              className={`p-8 lg:p-10 border-[#211a30] transition-all duration-700 ${
                vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              } ${i % 2 === 0 ? "border-r" : ""} ${i < 2 ? "border-b lg:border-b-0" : ""} ${i !== METRICS.length - 1 ? "lg:border-r" : ""}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <AnimCounter end={m.end} suffix={m.suffix} />
              <div className="mt-2.5 text-[11px] text-[#4a3f5f] tracking-wider">./{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
