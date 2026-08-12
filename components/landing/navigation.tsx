"use client";

import { useState, useEffect } from "react";
import { Menu, X, Ghost } from "lucide-react";

const navLinks = [
  { name: "features",     href: "#features" },
  { name: "how-it-works", href: "#how-it-works" },
  { name: "extension",    href: "#extension" },
  { name: "servers",      href: "#servers" },
  { name: "security",     href: "#security" },
  { name: "pricing",      href: "#pricing" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("en-US", { hour12: false }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-[#030209]/95 backdrop-blur-sm border-b border-[#211a30]" : "bg-transparent"
        }`}
      >
        {/* Top status bar */}
        <div className="border-b border-[#211a30] px-6 lg:px-12 h-8 flex items-center justify-between">
          <span className="text-[10px] text-[#4a3f5f] tracking-wider">
            root@ghostvpn:~$ <span className="text-[#6b6280]">uname -a</span> &nbsp;//&nbsp; GHOST-OS v6.2.1
          </span>
          <div className="hidden md:flex items-center gap-6">
            <span className="text-[10px] text-[#4a3f5f]">
              <span className="text-[#39ff88]">●</span>&nbsp;ALL_NODES_ENCRYPTED
            </span>
            <span className="text-[10px] text-[#4a3f5f] tabular-nums">{time} UTC</span>
          </div>
        </div>

        {/* Main nav */}
        <div className="px-6 lg:px-12 h-14 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="relative w-7 h-7 border border-[#a855f7] flex items-center justify-center">
              <Ghost className="w-4 h-4 text-[#a855f7]" strokeWidth={2} />
              <div className="absolute inset-0 bg-[#a855f7]/10 group-hover:bg-[#a855f7]/20 transition-colors" />
            </div>
            <span className="font-display text-lg tracking-tight text-[#e8e6f0]">
              ghost<span className="text-[#a855f7]">_</span>vpn
            </span>
          </a>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[12px] text-[#8f82a6] hover:text-[#39ff88] px-3 py-1.5 transition-colors duration-150"
              >
                <span className="text-[#4a3f5f]">./</span>{link.name}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a href="#" className="text-[12px] text-[#8f82a6] hover:text-[#e8e6f0] transition-colors">
              login
            </a>
            <a
              href="#pricing"
              className="text-[12px] bg-[#a855f7] text-[#030209] px-4 h-9 flex items-center hover:bg-[#c084fc] transition-colors font-bold"
            >
              [ get_ghost_vpn ]
            </a>
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-[#e8e6f0] p-1"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#030209] flex flex-col transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ paddingTop: "88px" }}
      >
        <div className="border-t border-[#211a30] flex flex-col">
          {navLinks.map((link, i) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`border-b border-[#211a30] px-8 py-6 font-display text-2xl text-[#e8e6f0] hover:text-[#39ff88] transition-all duration-300 flex items-center justify-between ${
                open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
              }`}
              style={{ transitionDelay: open ? `${i * 60}ms` : "0ms" }}
            >
              <span><span className="text-[#4a3f5f]">./</span>{link.name}</span>
              <span className="text-xs text-[#4a3f5f]">{String(i + 1).padStart(2, "0")}</span>
            </a>
          ))}
        </div>
        <div className="mt-auto p-8 border-t border-[#211a30]">
          <a
            href="#pricing"
            onClick={() => setOpen(false)}
            className="w-full block text-center text-sm bg-[#a855f7] text-[#030209] py-5 font-bold"
          >
            [ get_ghost_vpn ]
          </a>
        </div>
      </div>
    </>
  );
}
