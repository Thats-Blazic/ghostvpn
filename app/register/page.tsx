"use client";

import { useState, type FormEvent, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { LogoMark } from "@/components/logo";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { TerminalWindow } from "@/components/landing/terminal-window";
import { TerminalField } from "@/components/terminal-field";
import { useAuth } from "@/lib/auth-context";

function RegisterForm() {
  const router = useRouter();
  const params = useSearchParams();
  const { register } = useAuth();
  const redirect = params.get("redirect") || "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (name.trim().length < 2) return setError("enter your name");
    if (password.length < 6) return setError("password must be at least 6 characters");
    if (password !== confirm) return setError("passwords do not match");
    if (!agree) return setError("you must accept the terms to continue");

    setBusy(true);
    setTimeout(() => {
      const res = register(name.trim(), email.trim(), password);
      if (!res.ok) {
        setError(res.error || "registration failed");
        setBusy(false);
        return;
      }
      router.push(redirect);
    }, 500);
  };

  return (
    <TerminalWindow title="register.sh" status={busy ? "CREATING" : "READY"} statusColor={busy ? "#ff5ff1" : "#39ff88"} className="glow-violet">
      <form onSubmit={onSubmit} className="p-7 lg:p-9">
        <p className="text-[12px] text-[#8f82a6] mb-7 leading-relaxed">
          $ ghost-vpn register --new-user<span className="caret text-[#39ff88]">█</span>
          <br />
          <span className="text-[#4a3f5f]">create an account to become invisible</span>
        </p>

        <div className="space-y-5">
          <TerminalField
            label="name"
            type="text"
            required
            autoComplete="name"
            placeholder="jane doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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

        <button
          type="button"
          onClick={() => setAgree(!agree)}
          className="mt-6 w-full flex items-center gap-3 text-left"
        >
          <span className={`w-4 h-4 border flex items-center justify-center shrink-0 transition-colors ${agree ? "border-[#39ff88] bg-[#39ff88]/10" : "border-[#211a30]"}`}>
            {agree && <Check className="w-3 h-3 text-[#39ff88]" strokeWidth={3} />}
          </span>
          <span className="text-[12px] text-[#8f82a6]">
            [{agree ? "x" : " "}] I agree to the <span className="text-[#a855f7]">terms of service</span> and <span className="text-[#a855f7]">no-logs privacy policy</span>
          </span>
        </button>

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
          {busy ? "[ creating_account... ]" : "[ $ create_account ]"}
          {!busy && <ArrowRight className="w-4 h-4" />}
        </button>

        <p className="mt-6 text-[12px] text-[#4a3f5f] text-center">
          already a ghost?{" "}
          <Link
            href={`/login${redirect !== "/" ? `?redirect=${encodeURIComponent(redirect)}` : ""}`}
            className="text-[#39ff88] hover:underline"
          >
            ./login
          </Link>
        </p>
      </form>
    </TerminalWindow>
  );
}

export default function RegisterPage() {
  return (
    <main className="relative min-h-dvh overflow-x-hidden bg-[#030209]">
      <Navigation />
      <section className="relative pt-[140px] pb-24 px-6 grid-bg">
        <div className="max-w-[480px] mx-auto">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex mb-6">
              <LogoMark size={40} />
            </Link>
            <span className="eyebrow justify-center mb-3">$ useradd --new</span>
            <h1 className="font-display text-3xl lg:text-4xl text-[#e8e6f0] uppercase tracking-tight">
              CREATE YOUR<br /><span className="text-gradient">GHOST ACCOUNT</span>
            </h1>
          </div>

          <Suspense fallback={null}>
            <RegisterForm />
          </Suspense>
        </div>
      </section>
      <FooterSection />
    </main>
  );
}
