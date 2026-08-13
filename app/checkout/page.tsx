"use client";

import { Suspense, useEffect, useRef, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CreditCard,
  Bitcoin,
  Check,
  CheckCircle2,
  Copy,
  ShieldCheck,
  ArrowRight,
  Lock,
} from "lucide-react";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { TerminalWindow } from "@/components/landing/terminal-window";
import { TerminalField } from "@/components/terminal-field";
import { useAuth } from "@/lib/auth-context";
import { getPlan, formatPrice, type Plan } from "@/lib/plans";

type Method = "card" | "crypto";
type Step = "form" | "processing" | "success";

const CRYPTO_OPTIONS = [
  { id: "btc", name: "Bitcoin", ticker: "BTC", address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh", rate: 0.0000116 },
  { id: "eth", name: "Ethereum", ticker: "ETH", address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976", rate: 0.00029 },
  { id: "usdt", name: "Tether (TRC20)", ticker: "USDT", address: "TXYZ9F4b1cKq7v2mLpNq3sVeD6rGhWZAaFakeAddr", rate: 1 },
];

function formatCardNumber(v: string) {
  return v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}
function formatExpiry(v: string) {
  const digits = v.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

function orderTotal(plan: Plan, billing: "monthly" | "annual") {
  return billing === "annual" ? plan.price.yr * 12 : plan.price.mo;
}

function AuthGate({ redirect }: { redirect: string }) {
  return (
    <TerminalWindow title="access_denied.log" status="LOCKED" statusColor="#ff4d6d">
      <div className="p-10 text-center">
        <Lock className="w-8 h-8 text-[#ff4d6d] mx-auto mb-5" strokeWidth={1.5} />
        <p className="text-[13px] text-[#ff4d6d] mb-2">[ERROR] authentication required</p>
        <p className="text-[13px] text-[#8f82a6] mb-8 max-w-sm mx-auto leading-relaxed">
          You need a Ghost VPN account before checking out. Log in or create one — it takes a few seconds.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href={`/login?redirect=${encodeURIComponent(redirect)}`}
            className="w-full sm:w-auto text-center bg-[#a855f7] text-[#030209] text-[13px] font-bold px-6 py-3.5 hover:bg-[#c084fc] transition-colors"
          >
            [ $ login ]
          </Link>
          <Link
            href={`/register?redirect=${encodeURIComponent(redirect)}`}
            className="w-full sm:w-auto text-center border border-[#4a3f5f] text-[#e8e6f0] text-[13px] px-6 py-3.5 hover:border-[#39ff88]/50 hover:text-[#39ff88] transition-colors"
          >
            [ $ register ]
          </Link>
        </div>
      </div>
    </TerminalWindow>
  );
}

function ProcessingPanel({ method, plan, total }: { method: Method; plan: Plan; total: string }) {
  const lines =
    method === "card"
      ? [
          "$ ghost-vpn billing --charge-card",
          "> contacting payment processor ...",
          "> verifying card details ...",
          `> charging $${total} ...`,
          "> payment approved ✔",
          `> activating ${plan.name} plan ...`,
          "$ done.",
        ]
      : [
          "$ ghost-vpn billing --verify-crypto",
          "> scanning blockchain for transaction ...",
          "> 1 confirmation received ...",
          "> 3 confirmations received ...",
          "> payment verified ✔",
          `> activating ${plan.name} plan ...`,
          "$ done.",
        ];

  const [shown, setShown] = useState(1);

  useEffect(() => {
    if (shown >= lines.length) return;
    const t = setTimeout(() => setShown((s) => s + 1), 450);
    return () => clearTimeout(t);
  }, [shown, lines.length]);

  return (
    <TerminalWindow title="billing.sh" status="PROCESSING" statusColor="#ff5ff1">
      <div className="p-8 lg:p-10 font-mono text-[12.5px] min-h-[260px]">
        {lines.slice(0, shown).map((l, i) => (
          <div key={i} className="leading-7 text-[#8f82a6]">
            {l}
            {i === shown - 1 && shown < lines.length && <span className="caret text-[#39ff88] ml-1">█</span>}
          </div>
        ))}
      </div>
    </TerminalWindow>
  );
}

function CheckoutContent() {
  const router = useRouter();
  const params = useSearchParams();
  const { user, loading, activatePlan } = useAuth();

  const plan = getPlan(params.get("plan"));
  const [billing, setBilling] = useState<"monthly" | "annual">(
    params.get("billing") === "monthly" ? "monthly" : "annual"
  );

  const redirectHere = `/checkout?plan=${plan.id}&billing=${billing}`;

  const [method, setMethod] = useState<Method>("card");
  const [step, setStep] = useState<Step>("form");
  const [error, setError] = useState<string | null>(null);

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  const [coin, setCoin] = useState(CRYPTO_OPTIONS[0].id);
  const [copied, setCopied] = useState(false);
  const successFired = useRef(false);

  const total = orderTotal(plan, billing);
  const selectedCoin = CRYPTO_OPTIONS.find((c) => c.id === coin)!;
  const cryptoAmount = (total * selectedCoin.rate).toFixed(selectedCoin.ticker === "USDT" ? 2 : 6);

  useEffect(() => {
    if (step === "processing" && !successFired.current) {
      successFired.current = true;
      const t = setTimeout(() => {
        activatePlan(plan.id);
        setStep("success");
      }, 3400);
      return () => clearTimeout(t);
    }
  }, [step, plan.id, activatePlan]);

  const onSubmitCard = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (cardName.trim().length < 2) return setError("enter the name on your card");
    if (cardNumber.replace(/\s/g, "").length !== 16) return setError("card number must be 16 digits");
    if (!/^\d{2}\/\d{2}$/.test(expiry)) return setError("expiry must be in MM/YY format");
    if (cvc.length < 3) return setError("cvc must be 3-4 digits");
    successFired.current = false;
    setStep("processing");
  };

  const confirmCrypto = () => {
    successFired.current = false;
    setStep("processing");
  };

  const copyAddress = () => {
    navigator.clipboard?.writeText(selectedCoin.address).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  if (loading) {
    return (
      <div className="text-center py-24 text-[13px] text-[#4a3f5f]">$ loading session...</div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-[520px] mx-auto">
        <AuthGate redirect={redirectHere} />
      </div>
    );
  }

  if (step === "success") {
    return (
      <div className="max-w-[560px] mx-auto">
        <TerminalWindow title="success.log" status="CONFIRMED" statusColor="#39ff88" className="glow-green">
          <div className="p-9 lg:p-12 text-center">
            <CheckCircle2 className="w-12 h-12 text-[#39ff88] mx-auto mb-6" strokeWidth={1.5} />
            <p className="eyebrow justify-center mb-4">payment confirmed</p>
            <h2 className="font-display text-2xl lg:text-3xl text-[#e8e6f0] uppercase mb-4">
              WELCOME TO <span className="text-gradient">GHOST {plan.name}</span>
            </h2>
            <p className="text-[13px] text-[#8f82a6] mb-8 leading-relaxed">
              Your account (<span className="text-[#e8e6f0]">{user.email}</span>) has been upgraded.
              Download the app or add the browser extension to start browsing invisible.
            </p>

            <div className="text-left border border-[#211a30] p-5 mb-8 font-mono text-[11.5px] text-[#8f82a6] space-y-1.5">
              <div>plan: <span className="text-[#e8e6f0]">{plan.name}</span></div>
              <div>billing: <span className="text-[#e8e6f0]">{billing}</span></div>
              <div>total_charged: <span className="text-[#39ff88]">${formatPrice(total)}</span></div>
              <div>method: <span className="text-[#e8e6f0]">{method === "card" ? "card" : `crypto (${selectedCoin.ticker})`}</span></div>
              <div>status: <span className="text-[#39ff88]">ACTIVE</span></div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => router.push("/dashboard")}
                className="w-full sm:w-auto bg-[#a855f7] text-[#030209] text-[13px] font-bold px-6 py-3.5 hover:bg-[#c084fc] transition-colors"
              >
                [ $ go_to_dashboard ]
              </button>
              <Link
                href="/#extension"
                className="w-full sm:w-auto text-center border border-[#4a3f5f] text-[#e8e6f0] text-[13px] px-6 py-3.5 hover:border-[#39ff88]/50 hover:text-[#39ff88] transition-colors"
              >
                [ add_extension ]
              </Link>
            </div>
          </div>
        </TerminalWindow>
      </div>
    );
  }

  if (step === "processing") {
    return (
      <div className="max-w-[560px] mx-auto">
        <ProcessingPanel method={method} plan={plan} total={formatPrice(total)} />
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-[1fr_1.2fr] gap-6 items-start">
      {/* Order summary */}
      <div>
        <TerminalWindow title="order.json" status="DRAFT" statusColor="#a855f7">
          <div className="p-7">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] text-[#4a3f5f] tracking-wider">plan</span>
            </div>
            <h2 className={`font-display text-3xl uppercase mb-1 ${plan.style === "ghost" ? "ghost-text-gradient" : "text-[#e8e6f0]"}`}>
              {plan.name}
            </h2>
            <p className="text-[12.5px] text-[#8f82a6] mb-6">{plan.tagline}</p>

            {/* Billing toggle */}
            <div className="flex items-center gap-3 mb-7">
              <button
                onClick={() => setBilling("monthly")}
                className={`flex-1 text-[12px] py-2.5 border transition-colors ${billing === "monthly" ? "border-[#a855f7] text-[#e8e6f0] bg-[#a855f7]/10" : "border-[#211a30] text-[#4a3f5f]"}`}
              >
                monthly
              </button>
              <button
                onClick={() => setBilling("annual")}
                className={`flex-1 text-[12px] py-2.5 border transition-colors ${billing === "annual" ? "border-[#a855f7] text-[#e8e6f0] bg-[#a855f7]/10" : "border-[#211a30] text-[#4a3f5f]"}`}
              >
                annual <span className="text-[#39ff88]">-45%</span>
              </button>
            </div>

            <div className="border-t border-[#211a30] pt-5 space-y-2.5 font-mono text-[12px]">
              <div className="flex items-center justify-between text-[#8f82a6]">
                <span>price / month</span>
                <span className="text-[#e8e6f0]">${formatPrice(billing === "annual" ? plan.price.yr : plan.price.mo)}</span>
              </div>
              <div className="flex items-center justify-between text-[#8f82a6]">
                <span>billing cycle</span>
                <span className="text-[#e8e6f0]">{billing === "annual" ? "12 months" : "1 month"}</span>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-[#211a30] text-[13px]">
                <span className="text-[#e8e6f0] font-bold">total due today</span>
                <span className="text-[#39ff88] font-bold">${formatPrice(total)}</span>
              </div>
            </div>

            <ul className="mt-7 pt-6 border-t border-[#211a30] space-y-3">
              {plan.features.slice(0, 5).map((f) => (
                <li key={f} className="flex items-start gap-2.5">
                  <Check className="w-3.5 h-3.5 mt-0.5 text-[#a855f7] shrink-0" strokeWidth={2.5} />
                  <span className="text-[12px] text-[#8f82a6] leading-snug">{f}</span>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex items-center gap-2 text-[10.5px] text-[#4a3f5f]">
              <ShieldCheck className="w-3.5 h-3.5" />
              30-day money-back guarantee · cancel anytime
            </div>
          </div>
        </TerminalWindow>
      </div>

      {/* Payment */}
      <div>
        <TerminalWindow title="payment.sh" status="AWAITING_INPUT" statusColor="#39ff88">
          <div className="p-7">
            {/* Method tabs */}
            <div className="flex gap-2 mb-7">
              <button
                onClick={() => setMethod("card")}
                className={`flex-1 flex items-center justify-center gap-2 text-[12px] py-3 border transition-colors ${method === "card" ? "border-[#a855f7] text-[#e8e6f0] bg-[#a855f7]/10" : "border-[#211a30] text-[#4a3f5f] hover:text-[#8f82a6]"}`}
              >
                <CreditCard className="w-3.5 h-3.5" /> [ card ]
              </button>
              <button
                onClick={() => setMethod("crypto")}
                className={`flex-1 flex items-center justify-center gap-2 text-[12px] py-3 border transition-colors ${method === "crypto" ? "border-[#a855f7] text-[#e8e6f0] bg-[#a855f7]/10" : "border-[#211a30] text-[#4a3f5f] hover:text-[#8f82a6]"}`}
              >
                <Bitcoin className="w-3.5 h-3.5" /> [ crypto ]
              </button>
            </div>

            {method === "card" ? (
              <form onSubmit={onSubmitCard} className="space-y-5">
                <TerminalField
                  label="name_on_card"
                  placeholder="Jane Doe"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                />
                <TerminalField
                  label="card_number"
                  placeholder="4242 4242 4242 4242"
                  inputMode="numeric"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                />
                <div className="grid grid-cols-2 gap-4">
                  <TerminalField
                    label="expiry"
                    placeholder="MM/YY"
                    inputMode="numeric"
                    value={expiry}
                    onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                  />
                  <TerminalField
                    label="cvc"
                    placeholder="123"
                    inputMode="numeric"
                    maxLength={4}
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
                  />
                </div>

                {error && (
                  <p className="text-[12px] text-[#ff4d6d] border border-[#ff4d6d]/30 bg-[#ff4d6d]/5 px-4 py-3">
                    [ERROR] {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-[#a855f7] text-[#030209] text-[13px] font-bold py-4 hover:bg-[#c084fc] transition-colors"
                >
                  [ $ pay ${formatPrice(total)} ]
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[10.5px] text-[#4a3f5f] flex items-center gap-1.5 justify-center">
                  <Lock className="w-3 h-3" /> encrypted &amp; PCI-compliant checkout (demo)
                </p>
              </form>
            ) : (
              <div className="space-y-5">
                <div>
                  <span className="block text-[11px] text-[#4a3f5f] tracking-wider mb-2">
                    <span className="text-[#a855f7]">$</span> select_currency
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {CRYPTO_OPTIONS.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setCoin(c.id)}
                        className={`text-[11px] py-2.5 border transition-colors ${coin === c.id ? "border-[#a855f7] text-[#e8e6f0] bg-[#a855f7]/10" : "border-[#211a30] text-[#4a3f5f]"}`}
                      >
                        {c.ticker}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border border-[#211a30] p-5">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] text-[#4a3f5f]">amount due</span>
                    <span className="text-[14px] text-[#39ff88] font-bold">{cryptoAmount} {selectedCoin.ticker}</span>
                  </div>

                  <div className="flex items-center justify-center py-6 border-y border-[#211a30] mb-4">
                    <div
                      className="w-28 h-28 shrink-0"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(0deg, #a855f7 0 3px, transparent 3px 6px), repeating-linear-gradient(90deg, #a855f7 0 3px, transparent 3px 6px)",
                        backgroundBlendMode: "screen",
                        backgroundColor: "#0a0712",
                        opacity: 0.85,
                      }}
                      aria-label="QR code placeholder"
                    />
                  </div>

                  <span className="block text-[10px] text-[#4a3f5f] tracking-wider mb-2">send to address</span>
                  <button
                    onClick={copyAddress}
                    className="w-full flex items-center justify-between gap-2 bg-[#0a0712] border border-[#211a30] hover:border-[#a855f7] px-4 py-3 transition-colors group"
                  >
                    <span className="text-[11px] text-[#8f82a6] truncate">{selectedCoin.address}</span>
                    {copied ? (
                      <Check className="w-3.5 h-3.5 text-[#39ff88] shrink-0" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-[#4a3f5f] group-hover:text-[#a855f7] shrink-0" />
                    )}
                  </button>
                </div>

                <button
                  onClick={confirmCrypto}
                  className="w-full flex items-center justify-center gap-2 bg-[#a855f7] text-[#030209] text-[13px] font-bold py-4 hover:bg-[#c084fc] transition-colors"
                >
                  [ $ i_sent_the_payment ]
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[10.5px] text-[#4a3f5f] text-center">
                  network confirmations are verified automatically after you confirm
                </p>
              </div>
            )}
          </div>
        </TerminalWindow>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <main className="relative min-h-dvh overflow-x-hidden bg-[#030209]">
      <Navigation />
      <section className="relative pt-[130px] pb-24 px-6 grid-bg min-h-dvh">
        <div className="max-w-[1100px] mx-auto">
          <div className="mb-10">
            <span className="eyebrow mb-3 block">$ ghost-vpn checkout</span>
            <h1 className="font-display text-3xl lg:text-5xl text-[#e8e6f0] uppercase tracking-tight">
              SECURE <span className="text-gradient">CHECKOUT</span>
            </h1>
          </div>
          <Suspense fallback={<div className="text-center py-24 text-[13px] text-[#4a3f5f]">$ loading checkout...</div>}>
            <CheckoutContent />
          </Suspense>
        </div>
      </section>
      <FooterSection />
    </main>
  );
}
