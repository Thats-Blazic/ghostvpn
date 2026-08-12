"use client";

import { useState, type FormEvent, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Ghost, ArrowRight } from "lucide-react";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { TerminalWindow } from "@/components/landing/terminal-window";
import { TerminalField } from "@/components/terminal-field";
import { useAuth } from "@/lib/auth-context";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const { login } = useAuth();
  const redirect = params.get("redirect") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setBusy(true);
    setTimeout(() => {
      const res = login(email.trim(), password);
      if (!res.ok) {
        setError(res.error || "login failed");
        setBusy(false);
        return;
      }
      router.push(redirect);
    }, 500);
  };

  return (
    <TerminalWindow title="login.sh" status={busy ? "AUTHENTICATING" : "READY"} statusColor={busy ? "#ff5ff1" : "#39ff88"} className="glow-violet">
      <form onSubmit={onSubmit} className="p-7 lg:p-9">
        <p className="text-[12px] text-[#8f82a6] mb-7 leading-relaxed">
          $ ghost-vpn login<span className="caret text-[#39ff88]">█</span>
          <br />
          <span className="text-[#4a3f5f]">enter credentials to access your account</span>
        </p>

        <div className="space-y-5">
          <TerminalField
            label="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TerminalField
            label="password"
            type="password"
            required
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex justify-end mt-3">
          <Link href="/forgot-password" className="text-[11px] text-[#4a3f5f] hover:text-[#a855f7] transition-colors">
            forgot password?
          </Link>
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
          {busy ? "[ authenticating... ]" : "[ $ authenticate ]"}
          {!busy && <ArrowRight className="w-4 h-4" />}
        </button>

        <p className="mt-6 text-[12px] text-[#4a3f5f] text-center">
          don&apos;t have an account?{" "}
          <Link
            href={`/register${redirect !== "/" ? `?redirect=${encodeURIComponent(redirect)}` : ""}`}
            className="text-[#39ff88] hover:underline"
          >
            ./register
          </Link>
        </p>
      </form>
    </TerminalWindow>
  );
}

export default function LoginPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#030209]">
      <Navigation />
      <section className="relative pt-[140px] pb-24 px-6 grid-bg">
        <div className="max-w-[480px] mx-auto">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-6">
              <div className="w-8 h-8 border border-[#a855f7] flex items-center justify-center">
                <Ghost className="w-4 h-4 text-[#a855f7]" strokeWidth={2} />
              </div>
            </Link>
            <span className="eyebrow justify-center mb-3">$ whoami</span>
            <h1 className="font-display text-3xl lg:text-4xl text-[#e8e6f0] uppercase tracking-tight">
              ACCESS YOUR<br /><span className="text-gradient">GHOST ACCOUNT</span>
            </h1>
          </div>

          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </div>
      </section>
      <FooterSection />
    </main>
  );
}
