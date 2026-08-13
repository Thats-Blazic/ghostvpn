"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowRight, MailCheck, TerminalSquare } from "lucide-react";
import { LogoMark } from "@/components/logo";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { TerminalWindow } from "@/components/landing/terminal-window";
import { TerminalField } from "@/components/terminal-field";
import { useAuth } from "@/lib/auth-context";

export default function ForgotPasswordPage() {
  const { requestPasswordReset } = useAuth();

  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [demoLink, setDemoLink] = useState<string | null>(null);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    setTimeout(() => {
      const res = requestPasswordReset(email.trim());
      setBusy(false);
      if (!res.ok) {
        setError(res.error || "something went wrong");
        return;
      }
      setDemoLink(`/reset-password?email=${encodeURIComponent(email.trim())}&token=${res.token}`);
      setSent(true);
    }, 500);
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#030209]">
      <Navigation />
      <section className="relative pt-[140px] pb-24 px-6 grid-bg">
        <div className="max-w-[480px] mx-auto">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex mb-6">
              <LogoMark size={40} />
            </Link>
            <span className="eyebrow justify-center mb-3">$ passwd --recover</span>
            <h1 className="font-display text-3xl lg:text-4xl text-[#e8e6f0] uppercase tracking-tight">
              RESET YOUR<br /><span className="text-gradient">PASSWORD</span>
            </h1>
          </div>

          {sent ? (
            <TerminalWindow title="forgot-password.sh" status="SENT" statusColor="#39ff88" className="glow-violet">
              <div className="p-8 text-center">
                <MailCheck className="w-9 h-9 text-[#39ff88] mx-auto mb-5" strokeWidth={1.5} />
                <p className="text-[13px] text-[#39ff88] font-bold mb-2">[OK] reset link sent</p>
                <p className="text-[13px] text-[#8f82a6] leading-relaxed mb-6">
                  If an account exists for <span className="text-[#e8e6f0]">{email}</span>, a password reset link
                  is on its way. It expires in 1 hour.
                </p>

                {demoLink && (
                  <div className="text-left border border-[#211a30] bg-[#0a0712] p-4 mb-2">
                    <p className="text-[10px] text-[#4a3f5f] tracking-wider mb-2 flex items-center gap-1.5">
                      <TerminalSquare className="w-3 h-3" /> [DEMO MODE] no email server configured — use this link:
                    </p>
                    <Link href={demoLink} className="text-[11.5px] text-[#a855f7] hover:underline break-all">
                      {demoLink}
                    </Link>
                  </div>
                )}
              </div>
            </TerminalWindow>
          ) : (
            <TerminalWindow title="forgot-password.sh" status="READY" statusColor="#39ff88" className="glow-violet">
              <form onSubmit={onSubmit} className="p-7 lg:p-9">
                <p className="text-[12px] text-[#8f82a6] mb-7 leading-relaxed">
                  $ ghost-vpn passwd --recover<span className="caret text-[#39ff88]">█</span>
                  <br />
                  <span className="text-[#4a3f5f]">enter your account email to receive a reset link</span>
                </p>

                <TerminalField
                  label="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                {error && (
                  <p className="mt-5 text-[12px] text-[#ff4d6d] border border-[#ff4d6d]/30 bg-[#ff4d6d]/5 px-4 py-3">
                    [ERROR] {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={busy}
                  className="mt-7 w-full flex items-center justify-center gap-2 bg-[#a855f7] text-[#030209] text-[13px] font-bold py-4 hover:bg-[#c084fc] transition-colors disabled:opacity-60"
                >
                  {busy ? "[ sending_link... ]" : "[ $ send_reset_link ]"}
                  {!busy && <ArrowRight className="w-4 h-4" />}
                </button>

                <p className="mt-6 text-[12px] text-[#4a3f5f] text-center">
                  remembered it? <Link href="/login" className="text-[#39ff88] hover:underline">./login</Link>
                </p>
              </form>
            </TerminalWindow>
          )}
        </div>
      </section>
      <FooterSection />
    </main>
  );
}
