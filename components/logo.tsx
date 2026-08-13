import { Ghost } from "lucide-react";

export function LogoMark({ size = 32, className = "" }: { size?: number; className?: string }) {
  const radius = Math.round(size * 0.28);
  const border = Math.max(1.5, size * 0.05);
  return (
    <div
      className={`relative flex items-center justify-center shrink-0 ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        border: `${border}px solid #A855F7`,
        background: "linear-gradient(180deg, #150c26 0%, #030209 100%)",
        boxShadow: "0 0 14px -2px rgba(168,85,247,0.55), inset 0 0 10px rgba(168,85,247,0.08)",
      }}
    >
      <Ghost className="text-[#a855f7]" style={{ width: size * 0.56, height: size * 0.56 }} strokeWidth={2} />
    </div>
  );
}

export function Logo({
  size = 28,
  withText = true,
  textClassName = "text-lg",
  className = "",
}: {
  size?: number;
  withText?: boolean;
  textClassName?: string;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark size={size} />
      {withText && (
        <span className={`font-display tracking-tight text-[#e8e6f0] ${textClassName}`}>
          ghost<span className="text-[#a855f7]">_</span>vpn
        </span>
      )}
    </span>
  );
}
