import React from "react";

export default function SectionHeading({ eyebrow, title, sub }: { eyebrow?: string; title: string; sub?: string }) {
  return (
    <div className="mb-5 px-5">
      {eyebrow && (
        <div className="text-xs tracking-widest uppercase mb-2 font-bold text-gold" style={{ letterSpacing: "0.12em" }}>
          {eyebrow}
        </div>
      )}
      <h2 className="font-display text-2xl font-semibold text-charcoal leading-tight">{title}</h2>
      {sub && <p className="mt-2 text-sm text-[#6b6560]">{sub}</p>}
    </div>
  );
}
