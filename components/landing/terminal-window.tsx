import type { ReactNode } from "react";

export function TerminalWindow({
  title,
  status,
  statusColor = "#39ff88",
  children,
  className = "",
}: {
  title: string;
  status?: string;
  statusColor?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`terminal-window ${className}`}>
      <div className="terminal-titlebar">
        <span className="terminal-dot" style={{ background: "#ff5f56" }} />
        <span className="terminal-dot" style={{ background: "#ffbd2e" }} />
        <span className="terminal-dot" style={{ background: "#27c93f" }} />
        <span className="ml-3 text-[11px] text-[#6b6280] truncate">{title}</span>
        {status && (
          <span className="ml-auto flex items-center gap-1.5 text-[10px] shrink-0" style={{ color: statusColor }}>
            <span className="status-pulse w-1.5 h-1.5 rounded-full inline-block" style={{ background: statusColor }} />
            {status}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}
