import React from "react";

export default function Pill({ children, active, onClick }: { children: React.ReactNode; active?: boolean; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={!!active}
      className={`px-4 py-2 rounded-full text-sm font-semibold shrink-0 transition-colors border ${
        active ? "bg-maroon text-white border-maroon" : "bg-white text-charcoal border-line"
      }`}
    >
      {children}
    </button>
  );
}
