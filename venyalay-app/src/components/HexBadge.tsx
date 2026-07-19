import React from "react";

export default function HexBadge({ children, size = 44, bg = "#6B1E2B", fg = "#fff" }: { children: React.ReactNode; size?: number; bg?: string; fg?: string }) {
  return (
    <div
      className="hex-clip flex items-center justify-center shrink-0"
      style={{ width: size, height: size, background: bg, color: fg }}
      aria-hidden="true"
    >
      <span className="font-mono font-semibold" style={{ fontSize: size * 0.28 }}>{children}</span>
    </div>
  );
}
