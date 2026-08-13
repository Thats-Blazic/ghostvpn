"use client";

import { Suspense, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldAlert } from "lucide-react";
import { LogoMark } from "@/components/logo";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { TerminalWindow } from "@/components/landing/terminal-window";
import { TerminalField } from "@/components/terminal-field";
import { useAuth } from "@/lib/auth-context";

function ResetForm() {
  const router = useRouter();
  const params = useSearchParams();
  const { resetPassword } = useAuth();

  const email = params.get("email") || "";
  const token = params.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  if (!email || !token) {
    return (
      <TerminalWindow title="reset-password.sh" status="INVALID" statusColor="#ff4d6d">
        <div className="p-9 text-center">
          <ShieldAlert className="w-9 h-9 text-[#ff4d6d] mx-auto mb-5" strokeWidth={1.5} />
          <p className="text-[13px] text-[#ff4d6d] font-bold mb-2">[ERROR] missing or malformed reset link</p>
          <p className="text-[13px] text-[#8f82a6] mb-7">Request a new password reset link to continue.</p>
          <Link
            href="/forgot-password"
            className="inline-flex items-center gap-2 bg-[#a855f7] text-[#030209] text-[13px] font-bold px-6 py-3.5 hover:bg-[#c084fc] transition-colors"
          >
            [ $ request_new_link ]
          </Link>
        </div>
      </TerminalWindow>
    );
  }

  if (done) {
    return (
      <TerminalWindow title="reset-password.sh" status="COMPLETE" statusColor="#39ff88" className="glow-green">
        <div className="p-9 text-center">
          <CheckCircle2 className="w-9 h-9 text-[#39ff88] mx-auto mb-5" strokeWidth={1.5} />
          <p className="text-[13px] text-[#39ff88] font-bold mb-2">[OK] password updated</p>
          <p className="text-[13px] text-[#8f82a6] mb-7">Your password has been changed. Sign in with your new credentials.</p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 bg-[#a855f7] text-[#030209] text-[13px] font-bold px-6 py-3.5 hover:bg-[#c084fc] transition-colors"
          >
            [ $ go_to_login ] <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </TerminalWindow>
    );
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password.length < 6) return setError("password must be at least 6 characters");
    if (password !== confirm) return setError("passwords do not match");

    setBusy(true);
    setTimeout(() => {
      const res = resetPassword(email, token, password);
      setBusy(false);
      if (!res.ok) {
        setError(res.error || "reset failed");
        return;
      }
      setDone(true);
      setTimeout(() => router.push("/login"), 2500);
    }, 500);
  };

  return (
    <TerminalWindow title="reset-password.sh" status="READY" statusColor="#39ff88" className="glow-violet">
      <form onSubmit={onSubmit} className="p-7 lg:p-9">
        <p className="text-[12px] text-[#8f82a6] mb-7 leading-relaxed">
          $ ghost-vpn passwd --reset --email {email}<span className="caret text-[#39ff88]">█</span>
          <br />
          <span className="text-[#4a3f5f]">choose a new password for your account</span>
        </p>

        <div className="space-y-5">
          <TerminalField
            label="new_password"
            hint="min. 6 chars"
            type="password"
            required
            autoComplete="new-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TerminalField
            label="confirm_password"
            type="password"
            required
            autoComplete="new-password"
            placeholder="••••••••"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>

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
          {busy ? "[ updating_password... ]" : "[ $ update_password ]"}
          {!busy && <ArrowRight className="w-4 h-4" />}
        </button>
      </form>
    </TerminalWindow>
  );
}

export default function ResetPasswordPage() {
  return (
    <main className="relative min-h-dvh overflow-x-hidden bg-[#030209]">
      <Navigation />
      <section className="relative pt-[140px] pb-24 px-6 grid-bg">
        <div className="max-w-[480px] mx-auto">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex mb-6">
              <LogoMark size={40} />
            </Link>
            <span className="eyebrow justify-center mb-3">$ passwd --reset</span>
            <h1 className="font-display text-3xl lg:text-4xl text-[#e8e6f0] uppercase tracking-tight">
              NEW<br /><span className="text-gradient">PASSWORD</span>
            </h1>
          </div>

          <Suspense fallback={null}>
            <ResetForm />
          </Suspense>
        </div>
      </section>
      <FooterSection />
    </main>
  );
}
