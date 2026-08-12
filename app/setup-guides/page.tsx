import { Monitor, Laptop, Smartphone, Chrome, Router, TerminalSquare } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { TerminalWindow } from "@/components/landing/terminal-window";

const GUIDES = [
  {
    platform: "windows",
    icon: Monitor,
    cmd: "winget install GhostVPN.Client",
    steps: [
      "Download the installer from your dashboard or run the winget command",
      "Sign in with your account email and password",
      "Pick a server and hit connect — or enable auto-connect on startup",
    ],
  },
  {
    platform: "macos",
    icon: Laptop,
    cmd: "brew install --cask ghost-vpn",
    steps: [
      "Install via Homebrew or download the .dmg from your dashboard",
      "Grant the VPN configuration permission when prompted",
      "Sign in and connect — menu bar icon shows live status",
    ],
  },
  {
    platform: "linux",
    icon: TerminalSquare,
    cmd: "curl -sSL ghostvpn.sh/install | sh",
    steps: [
      "Run the install script (supports Debian, Ubuntu, Fedora, Arch)",
      "Authenticate with `ghost-vpn login`",
      "Connect with `ghost-vpn connect --auto` or pick a region",
    ],
  },
  {
    platform: "ios",
    icon: Smartphone,
    cmd: "App Store → search \"Ghost VPN\"",
    steps: [
      "Install from the App Store and open the app",
      "Sign in, then tap \"Allow\" on the VPN configuration prompt",
      "Tap the big connect button — widget & Siri Shortcuts supported",
    ],
  },
  {
    platform: "android",
    icon: Smartphone,
    cmd: "Play Store → search \"Ghost VPN\"",
    steps: [
      "Install from the Play Store and open the app",
      "Sign in and accept the VPN connection request",
      "Enable \"always-on VPN\" in settings for extra leak protection",
    ],
  },
  {
    platform: "browser extension",
    icon: Chrome,
    cmd: "chrome://extensions → add Ghost VPN",
    steps: [
      "Install from the Chrome, Firefox, Edge, or Brave web store",
      "Pin the extension and sign in with your account",
      "Click the icon and toggle Ghost Mode on for that browser only",
    ],
  },
  {
    platform: "router",
    icon: Router,
    cmd: "ssh admin@router && ghost-vpn-router-setup",
    steps: [
      "Available on Premium & Ghost plans for supported router firmware",
      "SSH into your router and run the setup script from your dashboard",
      "Every device on your network is now protected automatically",
    ],
  },
];

export default function SetupGuidesPage() {
  return (
    <PageShell
      eyebrow="$ ls /docs/setup-guides"
      title={<>SETUP <span className="text-gradient">GUIDES</span></>}
      subtitle="Pick your platform below to get connected in under two minutes."
      maxWidth="1100px"
    >
      <div className="grid sm:grid-cols-2 gap-5">
        {GUIDES.map((g) => {
          const Icon = g.icon;
          return (
            <TerminalWindow key={g.platform} title={`setup_${g.platform.replace(/\s/g, "_")}.sh`} status="ready" statusColor="#39ff88">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 border border-[#211a30] flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-[#a855f7]" strokeWidth={1.75} />
                  </div>
                  <h3 className="font-display text-lg text-[#e8e6f0] uppercase">{g.platform}</h3>
                </div>

                <div className="bg-[#0a0712] border border-[#211a30] px-4 py-3 mb-5 font-mono text-[11.5px] text-[#39ff88] overflow-x-auto whitespace-nowrap">
                  $ {g.cmd}
                </div>

                <ol className="space-y-2.5">
                  {g.steps.map((s, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[12.5px] text-[#8f82a6] leading-snug">
                      <span className="text-[#4a3f5f] shrink-0">{i + 1}.</span>
                      {s}
                    </li>
                  ))}
                </ol>
              </div>
            </TerminalWindow>
          );
        })}
      </div>
    </PageShell>
  );
}
