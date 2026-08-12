"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Search } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { TerminalWindow } from "@/components/landing/terminal-window";

const FAQ = [
  {
    cat: "getting_started",
    items: [
      { q: "How do I install Ghost VPN?", a: "Download the app for your platform from the pricing page after checkout, or add the browser extension from the Chrome/Firefox store. Sign in with your account email and password, then hit connect." },
      { q: "Which platforms are supported?", a: "Windows, macOS, Linux, iOS, Android, and Chrome/Firefox/Edge/Brave browser extensions. Router-level setup is available on Premium and Ghost plans." },
      { q: "How many devices can I connect at once?", a: "Normal: 1 device. Premium: 6 devices. Ghost: 10 devices, simultaneously, across any platform." },
    ],
  },
  {
    cat: "billing",
    items: [
      { q: "Can I switch plans later?", a: "Yes — upgrade or downgrade anytime from your dashboard under billing → change plan. Changes are prorated automatically." },
      { q: "Do you offer a refund?", a: "Every plan includes a 30-day money-back guarantee, no questions asked. See our refund policy for full details." },
      { q: "Do you accept crypto payments?", a: "Yes. BTC, ETH, and USDT (TRC20) are supported at checkout alongside card payments." },
    ],
  },
  {
    cat: "troubleshooting",
    items: [
      { q: "Ghost VPN won't connect — what do I do?", a: "Try switching servers from your dashboard, toggle the kill switch off and on, or restart the app. If it persists, run `ghost-vpn diagnose` from the app menu and email us the report." },
      { q: "Why is my speed slower than expected?", a: "Try a server closer to your physical location, or switch protocol from WireGuard to a lighter mode in advanced settings. Peak-hour congestion on popular servers can also affect speed." },
      { q: "A website thinks I'm a bot / blocks my VPN IP.", a: "Switch to an obfuscated server (Ghost plan) or try a different exit location — some sites aggressively block known VPN ranges." },
    ],
  },
  {
    cat: "account",
    items: [
      { q: "How do I reset my password?", a: "Currently password resets are handled by contacting support@ghostvpn.com from your account email — self-service reset is coming soon." },
      { q: "How do I delete my account and data?", a: "Email privacy@ghostvpn.com from your account address. All account and billing data is permanently deleted within 30 days." },
    ],
  },
];

export default function HelpCenterPage() {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const filtered = FAQ.map((cat) => ({
    ...cat,
    items: cat.items.filter(
      (i) =>
        i.q.toLowerCase().includes(query.toLowerCase()) ||
        i.a.toLowerCase().includes(query.toLowerCase())
    ),
  })).filter((cat) => cat.items.length > 0);

  return (
    <PageShell
      eyebrow="$ man ghost-vpn --help"
      title={<>HELP <span className="text-gradient">CENTER</span></>}
      subtitle="Search the knowledge base, or browse by category below."
      maxWidth="820px"
    >
      <div className="relative mb-8">
        <Search className="w-4 h-4 text-[#4a3f5f] absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="grep -i 'your question here'"
          className="w-full bg-[#0a0712] border border-[#211a30] focus:border-[#a855f7] outline-none pl-11 pr-4 py-3.5 text-[13px] text-[#e8e6f0] placeholder:text-[#4a3f5f] transition-colors"
        />
      </div>

      <div className="space-y-6">
        {filtered.map((cat) => (
          <TerminalWindow key={cat.cat} title={`faq/${cat.cat}.md`} status="cat" statusColor="#a855f7">
            <div>
              {cat.items.map((item) => {
                const key = `${cat.cat}-${item.q}`;
                const open = openKey === key;
                return (
                  <div key={key} className="border-b border-[#211a30] last:border-b-0">
                    <button
                      onClick={() => setOpenKey(open ? null : key)}
                      className="w-full flex items-center justify-between gap-4 text-left px-6 py-5 hover:bg-[#0a0712] transition-colors"
                    >
                      <span className="text-[13px] text-[#e8e6f0]">
                        <span className="text-[#a855f7]">$</span> {item.q}
                      </span>
                      <ChevronDown className={`w-4 h-4 text-[#4a3f5f] shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
                    </button>
                    {open && (
                      <div className="px-6 pb-5 -mt-1">
                        <p className="text-[13px] text-[#8f82a6] leading-relaxed pl-4 border-l-2 border-[#211a30]">
                          {item.a}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </TerminalWindow>
        ))}
        {filtered.length === 0 && (
          <p className="text-center text-[13px] text-[#4a3f5f] py-10">
            [EMPTY] no results for &quot;{query}&quot; — try a different search
          </p>
        )}
      </div>

      <p className="text-center text-[11.5px] text-[#4a3f5f] mt-10">
        Still stuck? <Link href="/contact" className="text-[#a855f7] hover:underline">contact support</Link>
      </p>
    </PageShell>
  );
}
