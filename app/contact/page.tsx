"use client";

import { useState, type FormEvent } from "react";
import { Mail, ShieldAlert, Newspaper, CreditCard, CheckCircle2, ArrowRight } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { TerminalWindow } from "@/components/landing/terminal-window";
import { TerminalField } from "@/components/terminal-field";

const CONTACTS = [
  { icon: Mail, label: "general support", email: "support@ghostvpn.com" },
  { icon: ShieldAlert, label: "report a vulnerability", email: "security@ghostvpn.com" },
  { icon: CreditCard, label: "billing & refunds", email: "billing@ghostvpn.com" },
  { icon: Newspaper, label: "press & media", email: "press@ghostvpn.com" },
];

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      setSent(true);
    }, 700);
  };

  if (sent) {
    return (
      <div className="p-10 text-center">
        <CheckCircle2 className="w-9 h-9 text-[#39ff88] mx-auto mb-4" strokeWidth={1.5} />
        <p className="text-[13px] text-[#39ff88] font-bold mb-2">[OK] message queued for delivery</p>
        <p className="text-[13px] text-[#8f82a6]">Thanks, {name.split(" ")[0]} — we usually reply within one business day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="p-7 lg:p-9 space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <TerminalField label="name" required placeholder="Jane Doe" value={name} onChange={(e) => setName(e.target.value)} />
        <TerminalField label="email" type="email" required placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <TerminalField label="subject" placeholder="What's this about?" value={subject} onChange={(e) => setSubject(e.target.value)} />
      <label className="block">
        <span className="block text-[11px] text-[#4a3f5f] tracking-wider mb-2">
          <span className="text-[#a855f7]">$</span> message
        </span>
        <textarea
          required
          rows={6}
          placeholder="Tell us what's going on..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full bg-[#0a0712] border border-[#211a30] focus:border-[#a855f7] outline-none px-4 py-3 text-[13px] text-[#e8e6f0] placeholder:text-[#4a3f5f] transition-colors resize-none"
        />
      </label>
      <button
        type="submit"
        disabled={busy}
        className="w-full flex items-center justify-center gap-2 bg-[#a855f7] text-[#030209] text-[13px] font-bold py-4 hover:bg-[#c084fc] transition-colors disabled:opacity-60"
      >
        {busy ? "[ sending... ]" : "[ $ send_message ]"}
        {!busy && <ArrowRight className="w-4 h-4" />}
      </button>
    </form>
  );
}

export default function ContactPage() {
  return (
    <PageShell
      eyebrow="$ ghost-vpn contact --new"
      title={<>GET IN <span className="text-gradient">TOUCH</span></>}
      subtitle="Questions, bug reports, partnership ideas — we read everything."
      maxWidth="980px"
    >
      <div className="grid lg:grid-cols-[1fr_1.1fr] gap-6 items-start">
        <div className="space-y-4">
          {CONTACTS.map((c) => {
            const Icon = c.icon;
            return (
              <a
                key={c.label}
                href={`mailto:${c.email}`}
                className="glass-card flex items-center gap-4 p-5 group"
              >
                <div className="w-10 h-10 border border-[#211a30] flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-[#a855f7]" strokeWidth={1.75} />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] text-[#4a3f5f] tracking-wider">./{c.label.replace(/\s/g, "_")}</p>
                  <p className="text-[13px] text-[#e8e6f0] group-hover:text-[#39ff88] transition-colors truncate">{c.email}</p>
                </div>
              </a>
            );
          })}

          <div className="glass-panel p-5">
            <p className="text-[11px] text-[#4a3f5f] tracking-wider mb-2">pgp_fingerprint (security reports)</p>
            <p className="text-[11px] text-[#8f82a6] font-mono break-all leading-relaxed">
              4A2F 8C1E 03B7 91D4  6E5A 2C8F 71B0 F3D9  9E4C 0A2B
            </p>
          </div>
        </div>

        <TerminalWindow title="contact.sh" status="AWAITING_INPUT" statusColor="#39ff88">
          <ContactForm />
        </TerminalWindow>
      </div>
    </PageShell>
  );
}
