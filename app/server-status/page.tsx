import { CheckCircle2 } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { TerminalWindow } from "@/components/landing/terminal-window";

const SERVICES = [
  { name: "vpn_gateway — amsterdam-nl", uptime: 99.99, latency: "8ms", status: "operational" },
  { name: "vpn_gateway — new-york-us",  uptime: 99.98, latency: "14ms", status: "operational" },
  { name: "vpn_gateway — london-uk",    uptime: 99.99, latency: "11ms", status: "operational" },
  { name: "vpn_gateway — singapore-sg", uptime: 99.95, latency: "22ms", status: "operational" },
  { name: "vpn_gateway — tokyo-jp",     uptime: 99.97, latency: "27ms", status: "operational" },
  { name: "auth & billing api",         uptime: 99.99, latency: "31ms", status: "operational" },
  { name: "browser extension sync",     uptime: 99.94, latency: "44ms", status: "operational" },
  { name: "dashboard",                  uptime: 99.98, latency: "38ms", status: "operational" },
];

const INCIDENTS = [
  {
    date: "2026-07-22",
    title: "Elevated latency on singapore-sg-06",
    status: "resolved",
    detail: "A upstream carrier issue caused ~180ms latency spikes for 40 minutes. Traffic was automatically rerouted through singapore-sg-04 while the issue was resolved.",
  },
  {
    date: "2026-06-03",
    title: "Dashboard brief downtime",
    status: "resolved",
    detail: "A deployment misconfiguration caused ~6 minutes of dashboard unavailability. VPN connections were unaffected throughout.",
  },
];

export default function ServerStatusPage() {
  const allOperational = SERVICES.every((s) => s.status === "operational");

  return (
    <PageShell
      eyebrow="$ ghost-vpn status --all"
      title={<>SERVER <span className="text-gradient">STATUS</span></>}
      subtitle="Live status of the Ghost VPN network and supporting services."
      maxWidth="980px"
    >
      <div className={`flex items-center gap-3 border px-6 py-5 mb-8 ${allOperational ? "border-[#39ff88]/30 bg-[#39ff88]/5" : "border-[#ff4d6d]/30 bg-[#ff4d6d]/5"}`}>
        <CheckCircle2 className={`w-5 h-5 shrink-0 ${allOperational ? "text-[#39ff88]" : "text-[#ff4d6d]"}`} />
        <span className={`text-[13px] font-bold tracking-wide ${allOperational ? "text-[#39ff88]" : "text-[#ff4d6d]"}`}>
          {allOperational ? "ALL SYSTEMS OPERATIONAL" : "SOME SYSTEMS DEGRADED"}
        </span>
        <span className="ml-auto text-[11px] text-[#4a3f5f]">last checked: just now</span>
      </div>

      <TerminalWindow title="status.log" status="LIVE" statusColor="#39ff88">
        <div className="hidden sm:grid grid-cols-[1fr_100px_80px_120px] gap-4 px-6 py-3 border-b border-[#211a30] text-[9px] tracking-widest text-[#4a3f5f]">
          <span>SERVICE</span>
          <span>UPTIME (90D)</span>
          <span>LATENCY</span>
          <span className="text-right">STATUS</span>
        </div>
        {SERVICES.map((s) => (
          <div key={s.name} className="grid grid-cols-2 sm:grid-cols-[1fr_100px_80px_120px] gap-4 px-6 py-4 border-b border-[#211a30] last:border-b-0 items-center row-hover">
            <span className="text-[13px] text-[#e8e6f0] truncate">{s.name}</span>
            <span className="text-[12px] text-[#8f82a6] tabular-nums">{s.uptime}%</span>
            <span className="hidden sm:inline text-[12px] text-[#a855f7] tabular-nums">{s.latency}</span>
            <span className="text-[10px] text-[#39ff88] text-right tracking-wider flex items-center justify-end gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#39ff88] rounded-full inline-block status-pulse" /> OPERATIONAL
            </span>
          </div>
        ))}
      </TerminalWindow>

      <div className="mt-10">
        <span className="eyebrow mb-4 block">$ tail -f incidents.log</span>
        <div className="space-y-4">
          {INCIDENTS.map((inc) => (
            <TerminalWindow key={inc.date} title={`incident_${inc.date}.log`} status={inc.status.toUpperCase()} statusColor="#39ff88">
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-[13px] font-bold text-[#e8e6f0]">{inc.title}</h3>
                  <span className="text-[11px] text-[#4a3f5f]">{inc.date}</span>
                </div>
                <p className="text-[12.5px] text-[#8f82a6] leading-relaxed">{inc.detail}</p>
              </div>
            </TerminalWindow>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
