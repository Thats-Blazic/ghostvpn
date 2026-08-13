export type PlanId = "normal" | "premium" | "ghost";

export interface Plan {
  id: PlanId;
  name: string;
  pkg: string;
  tagline: string;
  price: { mo: number; yr: number };
  features: string[];
  cta: string;
  style: "plain" | "highlight" | "ghost";
}

export const PLANS: Plan[] = [
  {
    id: "normal",
    name: "normal",
    pkg: "ghost-vpn-normal",
    tagline: "Basic protection to get started",
    price: { mo: 9.99, yr: 4.99 },
    features: [
      "1 device connected",
      "Access to 30 countries",
      "AES-256 encryption",
      "Basic ad blocker",
      "Email support",
    ],
    cta: "install normal",
    style: "plain",
  },
  {
    id: "ghost",
    name: "ghost",
    pkg: "ghost-vpn-ghost --root",
    tagline: "Disappear completely. No compromises.",
    price: { mo: 16.99, yr: 10.99 },
    features: [
      "Everything in Premium, plus:",
      "10 devices connected simultaneously",
      "Ghost Mode™ — auto-rotating IP every 10 min",
      "Double VPN · multi-hop encryption",
      "Obfuscated servers to bypass VPN blocks",
      "Dedicated IP address option",
      "Dark web monitoring & breach alerts",
      "Priority 10 Gbps servers, zero throttling",
    ],
    cta: "sudo install ghost",
    style: "ghost",
  },
  {
    id: "premium",
    name: "premium",
    pkg: "ghost-vpn-premium",
    tagline: "Full protection, every device",
    price: { mo: 12.99, yr: 7.99 },
    features: [
      "Up to 6 devices at once",
      "All 65 countries · 6,500+ servers",
      "AES-256 + WireGuard® protocol",
      "Automatic kill switch",
      "Browser extension included",
      "Streaming & torrenting unblocked",
      "24/7 live chat support",
    ],
    cta: "install premium",
    style: "highlight",
  },
];

export function getPlan(id: string | null | undefined): Plan {
  return PLANS.find((p) => p.id === id) ?? PLANS.find((p) => p.id === "premium") ?? PLANS[0];
}

export function formatPrice(n: number): string {
  return n.toFixed(2);
}
