"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Power,
  Shield,
  ShieldCheck,
  Laptop,
  Smartphone,
  Monitor,
  Zap,
  Eye,
  EyeOff,
  X,
  Ghost,
  ArrowRight,
} from "lucide-react";
import { Navigation } from "@/components/landing/navigation";
import { FooterSection } from "@/components/landing/footer-section";
import { TerminalWindow } from "@/components/landing/terminal-window";
import { useAuth } from "@/lib/auth-context";
import { getPlan, formatPrice } from "@/lib/plans";

const SERVERS = ["amsterdam-nl-04", "new_york-us-11", "frankfurt-de-02", "singapore-sg-06", "tokyo-jp-03"];

const DEVICE_LIMIT: Record<string, number> = { normal: 1, premium: 6, ghost: 10 };

const USAGE = [12, 18, 9, 24, 30, 15, 21];
const DAY_LABELS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

interface Device {
  id: number;
  name: string;
  type: "laptop" | "phone" | "desktop";
  location: string;
  lastActive: string;
  current?: boolean;
}

const INITIAL_DEVICES: Device[] = [
  { id: 1, name: "macbook-pro.local", type: "laptop", location: "Amsterdam, NL", lastActive: "active now", current: true },
  { id: 2, name: "iphone-15", type: "phone", location: "Amsterdam, NL", lastActive: "2h ago" },
  { id: 3, name: "desktop-win11", type: "desktop", location: "Belgrade, RS", lastActive: "1d ago" },
];

const ACTIVITY = [
  { t: "14:32:08", msg: "connected to amsterdam-nl-04 (8ms)" },
  { t: "14:31:55", msg: "kill switch armed" },
  { t: "12:10:02", msg: "342 trackers blocked this session" },
  { t: "09:44:17", msg: "auto-connect triggered on untrusted network" },
  { t: "yesterday", msg: "session ended — duration 6h 12m" },
  { t: "yesterday", msg: "connected to frankfurt-de-02 (16ms)" },
];

const DEVICE_ICON = { laptop: Laptop, phone: Smartphone, desktop: Monitor };

function fmtElapsed(sec: number) {
  const h = String(Math.floor(sec / 3600)).padStart(2, "0");
  const m = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
  const s = String(sec % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

function EmptyState() {
  return (
    <div className="max-w-[560px] mx-auto">
      <TerminalWindow title="dashboard.sh" status="NO_PLAN" statusColor="#ff4d6d">
        <div className="p-10 text-center">
          <Ghost className="w-9 h-9 text-[#4a3f5f] mx-auto mb-5" strokeWidth={1.5} />
          <p className="text-[13px] text-[#ff4d6d] mb-2">[WARN] no active subscription found</p>
          <p className="text-[13px] text-[#8f82a6] mb-8 leading-relaxed">
            Pick a plan to activate your dashboard, track usage, and start browsing invisible.
          </p>
          <Link
            href="/#pricing"
            className="inline-flex items-center gap-2 bg-[#a855f7] text-[#030209] text-[13px] font-bold px-6 py-3.5 hover:bg-[#c084fc] transition-colors"
          >
            [ $ view_plans ] <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </TerminalWindow>
    </div>
  );
}

function DashboardContent({ planId, email, name }: { planId: string; email: string; name: string }) {
  const router = useRouter();
  const { cancelPlan } = useAuth();
  const plan = getPlan(planId);
  const limit = DEVICE_LIMIT[planId] ?? 1;

  const [connected, setConnected] = useState(true);
  const [server, setServer] = useState(SERVERS[0]);
  const [showIp, setShowIp] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [threats, setThreats] = useState(1204);
  const [devices, setDevices] = useState<Device[]>(INITIAL_DEVICES);
  const [confirmCancel, setConfirmCancel] = useState(false);
  const startRef = useRef(Date.now());

  useEffect(() => {
    const id = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startRef.current) / 1000));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!connected) return;
    const id = setInterval(() => setThreats((t) => t + Math.floor(Math.random() * 3)), 4000);
    return () => clearInterval(id);
  }, [connected]);

  const toggleConnection = () => {
    setConnected((c) => !c);
    startRef.current = Date.now();
    setElapsed(0);
  };

  const removeDevice = (id: number) => setDevices((d) => d.filter((dev) => dev.id !== id));

  const renewDate = new Date();
  renewDate.setDate(renewDate.getDate() + 30);
  const renewStr = renewDate.toISOString().slice(0, 10);
  const monthlyPrice = plan.price.yr;

  return (
    <>
      <div className="mb-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div>
          <span className="eyebrow mb-3 block">$ ghost-vpn dashboard --whoami {email}</span>
          <h1 className="font-display text-3xl lg:text-5xl text-[#e8e6f0] uppercase tracking-tight">
            WELCOME BACK, <span className="text-gradient">{name.split(" ")[0]}</span>
          </h1>
        </div>
        <span className={`text-[11px] font-bold px-3 py-2 border tracking-widest shrink-0 ${plan.style === "ghost" ? "border-[#ff5ff1]/40 text-[#ff5ff1] bg-[#ff5ff1]/5" : "border-[#a855f7]/40 text-[#a855f7] bg-[#a855f7]/5"}`}>
          PLAN: {plan.name.toUpperCase()}
        </span>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 border border-[#211a30] mb-6">
        {[
          { label: "data_encrypted_mtd", value: "482 GB" },
          { label: "devices_connected", value: `${devices.length} / ${limit}` },
          { label: "session_uptime", value: connected ? fmtElapsed(elapsed) : "00:00:00" },
          { label: "threats_blocked_today", value: threats.toLocaleString() },
        ].map((s, i) => (
          <div key={s.label} className={`p-6 ${i % 2 === 0 ? "border-r" : ""} ${i < 2 ? "border-b lg:border-b-0" : ""} ${i !== 3 ? "lg:border-r" : ""} border-[#211a30]`}>
            <div className="font-display text-2xl lg:text-3xl text-[#e8e6f0] tabular-nums">{s.value}</div>
            <div className="text-[10px] text-[#4a3f5f] mt-1.5 tracking-wider">./{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1.1fr_1fr] gap-6 items-start mb-6">
        {/* Connection panel */}
        <TerminalWindow title="connection.status" status={connected ? "CONNECTED" : "DISCONNECTED"} statusColor={connected ? "#39ff88" : "#ff4d6d"}>
          <div className="p-7 lg:p-8">
            <div className="flex flex-col items-center py-6 border-b border-[#211a30] mb-6">
              <button
                onClick={toggleConnection}
                className={`w-20 h-20 border-2 flex items-center justify-center mb-5 transition-all duration-300 ${
                  connected ? "border-[#39ff88] bg-[#39ff88]/10 glow-green" : "border-[#4a3f5f] bg-transparent"
                }`}
              >
                <Power className={`w-8 h-8 ${connected ? "text-[#39ff88]" : "text-[#4a3f5f]"}`} strokeWidth={1.75} />
              </button>
              <p className={`text-[13px] font-bold tracking-wider ${connected ? "text-[#39ff88]" : "text-[#4a3f5f]"}`}>
                {connected ? "STATUS: PROTECTED" : "STATUS: EXPOSED"}
              </p>
              <p className="text-[11px] text-[#4a3f5f] mt-1">click to {connected ? "disconnect" : "connect"}</p>
            </div>

            <div className="space-y-4 font-mono text-[12px]">
              <div className="flex items-center justify-between">
                <span className="text-[#4a3f5f]">server</span>
                <select
                  value={server}
                  onChange={(e) => setServer(e.target.value)}
                  className="bg-[#0a0712] border border-[#211a30] text-[#e8e6f0] text-[12px] px-2 py-1.5 outline-none focus:border-[#a855f7]"
                >
                  {SERVERS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#4a3f5f]">ip_address</span>
                <button onClick={() => setShowIp(!showIp)} className="flex items-center gap-2 text-[#e8e6f0] hover:text-[#a855f7] transition-colors">
                  {connected ? (showIp ? "185.212.44.91" : "•••.•••.••.••") : "203.0.113.42 (real)"}
                  {showIp ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#4a3f5f]">protocol</span>
                <span className="text-[#e8e6f0]">WireGuard / AES-256</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#4a3f5f]">kill_switch</span>
                <span className="text-[#39ff88] flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> ARMED</span>
              </div>
              {plan.id === "ghost" && (
                <div className="flex items-center justify-between">
                  <span className="text-[#4a3f5f]">ghost_mode</span>
                  <span className="text-[#ff5ff1] flex items-center gap-1.5"><Zap className="w-3.5 h-3.5" /> AUTO-ROTATING</span>
                </div>
              )}
            </div>
          </div>
        </TerminalWindow>

        {/* Usage chart */}
        <TerminalWindow title="usage.chart" status="7D" statusColor="#a855f7">
          <div className="p-7 lg:p-8">
            <div className="flex items-center justify-between mb-6">
              <span className="text-[11px] text-[#4a3f5f] tracking-wider">data usage — last 7 days</span>
              <span className="text-[11px] text-[#e8e6f0]">{USAGE.reduce((a, b) => a + b, 0)} GB total</span>
            </div>
            <div className="flex items-end justify-between gap-2.5 h-[160px]">
              {USAGE.map((v, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <span className="text-[9px] text-[#4a3f5f]">{v}</span>
                  <div
                    className={`w-full ${i === USAGE.length - 1 ? "bg-[#a855f7]" : "bg-[#211a30]"}`}
                    style={{ height: `${(v / Math.max(...USAGE)) * 100}%` }}
                  />
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between mt-3">
              {DAY_LABELS.map((d) => (
                <span key={d} className="flex-1 text-center text-[9px] text-[#4a3f5f] tracking-wider">{d}</span>
              ))}
            </div>
          </div>
        </TerminalWindow>
      </div>

      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-6 items-start mb-6">
        {/* Devices */}
        <TerminalWindow title="devices.list" status={`${devices.length}/${limit}`} statusColor="#39ff88">
          <div className="p-2">
            {devices.map((d) => {
              const Icon = DEVICE_ICON[d.type];
              return (
                <div key={d.id} className="flex items-center gap-4 px-5 py-4 border-b border-[#211a30] last:border-b-0 row-hover">
                  <div className="w-9 h-9 border border-[#211a30] flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-[#a855f7]" strokeWidth={1.75} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] text-[#e8e6f0] truncate">
                      {d.name} {d.current && <span className="text-[10px] text-[#39ff88] ml-1">(this device)</span>}
                    </p>
                    <p className="text-[11px] text-[#4a3f5f]">{d.location} · {d.lastActive}</p>
                  </div>
                  {!d.current && (
                    <button
                      onClick={() => removeDevice(d.id)}
                      className="text-[#4a3f5f] hover:text-[#ff4d6d] transition-colors shrink-0"
                      title="disconnect device"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              );
            })}
            {devices.length < limit && (
              <div className="px-5 py-4 text-[11px] text-[#4a3f5f] flex items-center justify-between gap-3">
                <span>{limit - devices.length} device slot{limit - devices.length > 1 ? "s" : ""} available</span>
                <a href="/download" className="text-[#a855f7] hover:text-[#c084fc] transition-colors shrink-0">
                  + download_app
                </a>
              </div>
            )}
          </div>
        </TerminalWindow>

        {/* Activity log */}
        <TerminalWindow title="activity.log" status="TAIL" statusColor="#a855f7">
          <div className="p-6 font-mono text-[11.5px] space-y-2.5">
            {ACTIVITY.map((a, i) => (
              <div key={i} className="text-[#8f82a6]">
                <span className="text-[#4a3f5f]">[{a.t}]</span> {a.msg}
              </div>
            ))}
          </div>
        </TerminalWindow>
      </div>

      {/* Billing */}
      <TerminalWindow title="billing.json" status="ACTIVE" statusColor="#39ff88">
        <div className="p-7 lg:p-8">
          <div className="grid sm:grid-cols-3 gap-6 mb-7">
            <div>
              <span className="text-[10px] text-[#4a3f5f] tracking-wider block mb-1.5">current_plan</span>
              <span className={`text-[16px] font-bold uppercase ${plan.style === "ghost" ? "ghost-text-gradient" : "text-[#e8e6f0]"}`}>{plan.name}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#4a3f5f] tracking-wider block mb-1.5">price</span>
              <span className="text-[16px] font-bold text-[#e8e6f0]">${formatPrice(monthlyPrice)}<span className="text-[11px] text-[#4a3f5f] font-normal">/mo</span></span>
            </div>
            <div>
              <span className="text-[10px] text-[#4a3f5f] tracking-wider block mb-1.5">renews_on</span>
              <span className="text-[16px] font-bold text-[#e8e6f0]">{renewStr}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-6 border-t border-[#211a30]">
            <Link
              href="/#pricing"
              className="w-full sm:w-auto text-center bg-[#a855f7] text-[#030209] text-[12.5px] font-bold px-5 py-3 hover:bg-[#c084fc] transition-colors"
            >
              [ $ change_plan ]
            </Link>
            {!confirmCancel ? (
              <button
                onClick={() => setConfirmCancel(true)}
                className="w-full sm:w-auto text-center border border-[#4a3f5f] text-[#8f82a6] text-[12.5px] px-5 py-3 hover:border-[#ff4d6d]/50 hover:text-[#ff4d6d] transition-colors"
              >
                [ cancel_subscription ]
              </button>
            ) : (
              <div className="w-full sm:w-auto flex items-center gap-2">
                <span className="text-[11.5px] text-[#ff4d6d]">are you sure?</span>
                <button
                  onClick={() => { cancelPlan(); router.push("/dashboard"); }}
                  className="border border-[#ff4d6d] text-[#ff4d6d] text-[11.5px] px-3 py-2 hover:bg-[#ff4d6d]/10 transition-colors"
                >
                  yes, cancel
                </button>
                <button
                  onClick={() => setConfirmCancel(false)}
                  className="border border-[#211a30] text-[#4a3f5f] text-[11.5px] px-3 py-2 hover:text-[#8f82a6] transition-colors"
                >
                  nevermind
                </button>
              </div>
            )}
          </div>
        </div>
      </TerminalWindow>
    </>
  );
}

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace("/login?redirect=/dashboard");
  }, [loading, user, router]);

  return (
    <main className="relative min-h-dvh overflow-x-hidden bg-[#030209]">
      <Navigation />
      <section className="relative pt-[130px] pb-24 px-6 grid-bg min-h-dvh">
        <div className="max-w-[1300px] mx-auto">
          {loading || !user ? (
            <div className="text-center py-24 text-[13px] text-[#4a3f5f] flex items-center justify-center gap-2">
              <Shield className="w-4 h-4" /> $ authenticating session...
            </div>
          ) : !user.plan ? (
            <EmptyState />
          ) : (
            <DashboardContent planId={user.plan} email={user.email} name={user.name} />
          )}
        </div>
      </section>
      <FooterSection />
    </main>
  );
}
