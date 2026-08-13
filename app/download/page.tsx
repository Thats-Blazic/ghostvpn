"use client";

import { Download, Monitor, Laptop, Smartphone, Chrome, TerminalSquare, ShieldCheck, CheckCircle2 } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { TerminalWindow } from "@/components/landing/terminal-window";

const WINDOWS_FILE = {
  href: "/downloads/Ghost-VPN-Setup.exe",
  name: "Ghost-VPN-Setup.exe",
  version: "v6.2.1",
  size: "2.8 MB",
};

const OTHER_PLATFORMS = [
  { platform: "macOS",             icon: Laptop,         cmd: "brew install --cask ghost-vpn" },
  { platform: "Linux",             icon: TerminalSquare, cmd: "curl -sSL ghostvpn.sh/install | sh" },
  { platform: "iOS",               icon: Smartphone,     cmd: "App Store → \"Ghost VPN\"" },
  { platform: "Android",           icon: Smartphone,     cmd: "Play Store → \"Ghost VPN\"" },
  { platform: "Browser Extension", icon: Chrome,         cmd: "chrome://extensions → add Ghost VPN" },
];

export default function DownloadPage() {
  return (
    <PageShell
      eyebrow="$ curl -O https://ghostvpn.sh/download"
      title={<>DOWNLOAD <span className="text-gradient">GHOST VPN</span></>}
      subtitle="Free to download. Connect on the Normal plan at no cost, or unlock every server and Ghost Mode™ with Premium or Ghost."
      maxWidth="900px"
    >
      <TerminalWindow title="download.sh" status="FREE" statusColor="#39ff88" className="glow-violet">
        <div className="p-7 lg:p-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-14 h-14 border border-[#a855f7] flex items-center justify-center shrink-0">
              <Monitor className="w-6 h-6 text-[#a855f7]" strokeWidth={1.75} />
            </div>
            <div className="flex-1">
              <h2 className="font-display text-xl text-[#e8e6f0] uppercase tracking-tight mb-1">
                Ghost VPN for Windows
              </h2>
              <p className="text-[12.5px] text-[#8f82a6]">
                {WINDOWS_FILE.version} &middot; {WINDOWS_FILE.size} &middot; Windows 10/11 (64-bit)
              </p>
            </div>
          </div>

          <a
            href={WINDOWS_FILE.href}
            download
            className="group mt-7 w-full inline-flex items-center justify-center gap-2 bg-[#a855f7] text-[#030209] text-[14px] font-bold px-7 py-4 hover:bg-[#c084fc] transition-colors duration-200"
          >
            <Download className="w-4 h-4" />
            [ download_{WINDOWS_FILE.name.toLowerCase()} ] — it&apos;s free
          </a>

          <p className="text-[11px] text-[#4a3f5f] mt-4">
            $ sha256sum {WINDOWS_FILE.name} <span className="text-[#39ff88]">→ verified &amp; signed build</span>
          </p>
        </div>
      </TerminalWindow>

      <div className="grid sm:grid-cols-3 gap-4 mt-6">
        {[
          { icon: ShieldCheck,   label: "no account required to install" },
          { icon: CheckCircle2,  label: "free forever on the Normal plan" },
          { icon: CheckCircle2,  label: "upgrade anytime from the app" },
        ].map((f) => (
          <div key={f.label} className="flex items-center gap-2.5 border border-[#211a30] px-4 py-3.5">
            <f.icon className="w-4 h-4 text-[#39ff88] shrink-0" strokeWidth={1.75} />
            <span className="text-[12px] text-[#8f82a6]">{f.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-14">
        <span className="eyebrow mb-4 block">$ ls /downloads/other-platforms</span>
        <div className="grid sm:grid-cols-2 gap-4">
          {OTHER_PLATFORMS.map((p) => (
            <div key={p.platform} className="flex items-center gap-4 border border-[#211a30] px-5 py-4">
              <div className="w-9 h-9 border border-[#211a30] flex items-center justify-center shrink-0">
                <p.icon className="w-4 h-4 text-[#a855f7]" strokeWidth={1.75} />
              </div>
              <div className="min-w-0">
                <p className="text-[12.5px] text-[#e8e6f0] font-bold">{p.platform}</p>
                <p className="text-[11px] text-[#8f82a6] font-mono truncate">{p.cmd}</p>
              </div>
            </div>
          ))}
        </div>
        <a
          href="/setup-guides"
          className="inline-flex mt-6 text-[12.5px] text-[#a855f7] hover:text-[#c084fc] transition-colors"
        >
          ./view_full_setup_guides →
        </a>
      </div>
    </PageShell>
  );
}
