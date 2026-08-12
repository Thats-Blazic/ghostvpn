"use client";

import { useEffect, useState, useRef } from "react";
import { TerminalWindow } from "./terminal-window";

const TESTIMONIALS = [
  {
    quote: "I travel constantly for work and Ghost VPN is the only one that never drops on hotel WiFi. The kill switch actually works — I've tested it on purpose.",
    author: "s.chen",
    role: "freelance journalist",
  },
  {
    quote: "The browser extension alone is worth it. One click and every tab is encrypted, ads gone, trackers blocked. I barely open the desktop app anymore.",
    author: "m.webb",
    role: "software engineer",
  },
  {
    quote: "Switched from a big-name VPN after their 'no logs' claim turned out to be false. Ghost VPN publishes its audits. That's the difference that matters.",
    author: "e.rodriguez",
    role: "privacy researcher",
  },
  {
    quote: "Ghost Mode's multi-hop routing is genuinely different. Double encryption, rotating exit IPs, and it still feels fast.",
    author: "j.liu",
    role: "security consultant",
  },
];

export function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setActive(a => (a + 1) % TESTIMONIALS.length);
        setFading(false);
      }, 250);
    }, 5500);
    return () => clearInterval(id);
  }, []);

  const t = TESTIMONIALS[active];

  return (
    <section id="reviews" ref={ref} className="relative border-t border-[#211a30] scroll-mt-[88px]">
      <div className="max-w-[900px] mx-auto px-6">
        <div
          className={`border-b border-[#211a30] py-8 transition-all duration-700 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <span className="eyebrow mb-3 block">$ tail -f reviews.log</span>
          <h2 className="font-display text-4xl lg:text-6xl leading-[1.02] tracking-tight text-[#e8e6f0] uppercase">
            LOVED BY<br />
            <span className="text-gradient">THE INVISIBLE</span>
          </h2>
        </div>

        <div
          className={`py-10 lg:py-14 transition-all duration-700 delay-150 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <TerminalWindow title="reviews.log" status="TAIL -F" statusColor="#a855f7">
            <div className={`p-8 lg:p-12 text-center transition-all duration-250 ${fading ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}`}>
              <p className="text-[11px] text-[#4a3f5f] mb-6">
                [entry {String(active + 1).padStart(2, "0")}/{String(TESTIMONIALS.length).padStart(2, "0")}] user_review.append(&quot;{t.author}&quot;)
              </p>
              <blockquote>
                <p className="font-display text-xl lg:text-2xl leading-snug text-[#e8e6f0] mb-8 max-w-[620px] mx-auto">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer>
                  <p className="text-[13px] font-semibold text-[#39ff88]">@{t.author}</p>
                  <p className="text-[11px] text-[#4a3f5f] mt-0.5 tracking-wider">{t.role}</p>
                </footer>
              </blockquote>
            </div>

            <div className="flex items-center justify-center gap-2 pb-8">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setFading(true); setTimeout(() => { setActive(i); setFading(false); }, 250); }}
                  aria-label={`Show testimonial ${i + 1}`}
                  className={`h-1.5 transition-all duration-300 ${
                    i === active ? "w-7 bg-[#a855f7]" : "w-1.5 bg-[#211a30] hover:bg-[#4a3f5f]"
                  }`}
                />
              ))}
            </div>
          </TerminalWindow>
        </div>
      </div>
    </section>
  );
}
