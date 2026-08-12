import { CheckCircle2, Download, FileCheck2 } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { TerminalWindow } from "@/components/landing/terminal-window";

const FINDINGS = [
  "No IP addresses, connection timestamps, or session durations are logged on any VPN server",
  "No DNS queries are stored — all resolvers run in-memory only",
  "No traffic content, destination, or bandwidth data is retained per-user",
  "Servers confirmed to run in RAM-only mode; disk images contain no persistent user data",
  "Account database isolated from VPN infrastructure — billing data cannot be correlated with connection activity",
  "Kill switch and DNS leak protection verified effective under simulated network failure",
];

const HISTORY = [
  { year: "2026", firm: "NorthBridge Security Labs", scope: "Full infrastructure & no-logs audit", result: "PASSED" },
  { year: "2025", firm: "NorthBridge Security Labs", scope: "Full infrastructure & no-logs audit", result: "PASSED" },
  { year: "2024", firm: "Ferrous Cybersecurity", scope: "No-logs policy verification", result: "PASSED" },
];

export default function NoLogsAuditPage() {
  return (
    <PageShell
      eyebrow="$ cat audit_report_2026.txt"
      title={<>NO-LOGS <span className="text-gradient">AUDIT</span></>}
      subtitle="Our no-logs claim isn't marketing — it's independently verified, every year, in full."
      maxWidth="880px"
    >
      <TerminalWindow title="audit_report_2026.pdf" status="VERIFIED" statusColor="#39ff88" className="mb-8">
        <div className="p-7 lg:p-10">
          <div className="grid sm:grid-cols-3 gap-6 mb-8 pb-8 border-b border-[#211a30]">
            <div>
              <span className="text-[10px] text-[#4a3f5f] tracking-wider block mb-1.5">auditor</span>
              <span className="text-[14px] text-[#e8e6f0] font-bold">NorthBridge Security Labs</span>
            </div>
            <div>
              <span className="text-[10px] text-[#4a3f5f] tracking-wider block mb-1.5">audit_date</span>
              <span className="text-[14px] text-[#e8e6f0] font-bold">June 14, 2026</span>
            </div>
            <div>
              <span className="text-[10px] text-[#4a3f5f] tracking-wider block mb-1.5">result</span>
              <span className="text-[14px] text-[#39ff88] font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> PASSED
              </span>
            </div>
          </div>

          <p className="text-[13px] text-[#8f82a6] leading-relaxed mb-8">
            NorthBridge Security Labs conducted an independent review of Ghost VPN&apos;s server infrastructure,
            source code, and operational logging practices. The audit included on-site server inspection, source
            code review of the connection handling pipeline, and simulated law-enforcement data requests to confirm
            no identifying data could be produced.
          </p>

          <span className="text-[11px] text-[#4a3f5f] tracking-wider block mb-4">key findings</span>
          <ul className="space-y-3 mb-8">
            {FINDINGS.map((f) => (
              <li key={f} className="flex items-start gap-3">
                <span className="text-[#39ff88] text-[11px] mt-0.5 shrink-0">[PASS]</span>
                <span className="text-[13px] text-[#8f82a6] leading-snug">{f}</span>
              </li>
            ))}
          </ul>

          <a
            href="#"
            className="inline-flex items-center gap-2 bg-[#a855f7] text-[#030209] text-[12.5px] font-bold px-5 py-3.5 hover:bg-[#c084fc] transition-colors"
          >
            <Download className="w-4 h-4" /> [ download_full_report.pdf ]
          </a>
        </div>
      </TerminalWindow>

      <span className="eyebrow mb-4 block">$ ls -la /audits/history</span>
      <TerminalWindow title="audit_history.log" status="cat" statusColor="#a855f7">
        <div className="hidden sm:grid grid-cols-[80px_1fr_1fr_100px] gap-4 px-6 py-3 border-b border-[#211a30] text-[9px] tracking-widest text-[#4a3f5f]">
          <span>YEAR</span>
          <span>FIRM</span>
          <span>SCOPE</span>
          <span className="text-right">RESULT</span>
        </div>
        {HISTORY.map((h) => (
          <div key={h.year} className="grid grid-cols-2 sm:grid-cols-[80px_1fr_1fr_100px] gap-4 px-6 py-4 border-b border-[#211a30] last:border-b-0 items-center row-hover">
            <span className="text-[13px] text-[#e8e6f0]">{h.year}</span>
            <span className="text-[12px] text-[#8f82a6] flex items-center gap-2"><FileCheck2 className="w-3.5 h-3.5 text-[#a855f7] shrink-0" />{h.firm}</span>
            <span className="hidden sm:inline text-[12px] text-[#8f82a6]">{h.scope}</span>
            <span className="text-[10px] text-[#39ff88] text-right tracking-wider">{h.result}</span>
          </div>
        ))}
      </TerminalWindow>
    </PageShell>
  );
}
