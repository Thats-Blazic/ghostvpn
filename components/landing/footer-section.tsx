"use client";

import { Ghost } from "lucide-react";

const LINKS = {
  product: [
    { name: "features",          href: "#features" },
    { name: "how-it-works",      href: "#how-it-works" },
    { name: "server-network",    href: "#servers" },
    { name: "browser-extension", href: "#extension" },
    { name: "pricing",           href: "#pricing" },
  ],
  resources: [
    { name: "help-center",   href: "#" },
    { name: "setup-guides",  href: "#" },
    { name: "server-status", href: "#" },
    { name: "no-logs-audit", href: "#security" },
  ],
  company: [
    { name: "about",   href: "#" },
    { name: "careers", href: "#" },
    { name: "press",   href: "#" },
    { name: "contact", href: "#" },
  ],
  legal: [
    { name: "privacy-policy",   href: "#" },
    { name: "terms-of-service", href: "#" },
    { name: "refund-policy",    href: "#" },
  ],
};

export function FooterSection() {
  return (
    <footer className="relative border-t border-[#211a30]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-[1.2fr_2fr] border-b border-[#211a30]">
          <div className="p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-[#211a30]">
            <a href="#" className="inline-flex items-center gap-2.5 mb-5 group">
              <div className="w-7 h-7 border border-[#a855f7] flex items-center justify-center">
                <Ghost className="w-4 h-4 text-[#a855f7]" strokeWidth={2} />
              </div>
              <span className="font-display text-lg text-[#e8e6f0]">
                ghost<span className="text-[#a855f7]">_</span>vpn
              </span>
            </a>
            <p className="text-[13px] text-[#8f82a6] leading-relaxed max-w-xs">
              Military-grade encryption, a strict no-logs policy, and a one-click browser extension. Browse invisible, everywhere.
            </p>
            <div className="flex gap-5 mt-7">
              {["twitter", "reddit", "discord"].map(s => (
                <a key={s} href="#" className="text-[12px] text-[#8f82a6] hover:text-[#39ff88] transition-colors">
                  ./{s}
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4">
            {Object.entries(LINKS).map(([section, links], i) => (
              <div key={section} className={`p-8 ${i % 4 !== 3 ? "md:border-r" : ""} ${i < 2 ? "border-b md:border-b-0" : ""} border-[#211a30]`}>
                <h3 className="text-[11px] text-[#4a3f5f] tracking-widest mb-4">/{section}</h3>
                <ul className="space-y-3">
                  {links.map(l => (
                    <li key={l.name}>
                      <a href={l.href} className="text-[12.5px] text-[#8f82a6] hover:text-[#a855f7] transition-colors">
                        {l.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-5">
          <p className="text-[11.5px] text-[#4a3f5f]">© 2026 ghost_vpn — all rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="pulse-soft w-1.5 h-1.5 bg-[#39ff88] inline-block rounded-full" />
            <span className="text-[11.5px] text-[#4a3f5f]">all servers operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
