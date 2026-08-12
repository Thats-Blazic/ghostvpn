import type { InputHTMLAttributes } from "react";

export function TerminalField({
  label,
  hint,
  className = "",
  ...props
}: { label: string; hint?: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between mb-2">
        <span className="text-[11px] text-[#4a3f5f] tracking-wider">
          <span className="text-[#a855f7]">$</span> {label}
        </span>
        {hint && <span className="text-[10px] text-[#4a3f5f]">{hint}</span>}
      </span>
      <input
        {...props}
        className={`w-full bg-[#0a0712] border border-[#211a30] focus:border-[#a855f7] outline-none px-4 py-3 text-[13px] text-[#e8e6f0] placeholder:text-[#4a3f5f] transition-colors ${className}`}
      />
    </label>
  );
}
