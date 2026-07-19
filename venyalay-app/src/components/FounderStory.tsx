import React from "react";

export default function FounderStory() {
  return (
    <div className="rounded-3xl overflow-hidden border border-line">
      <div className="h-36" style={{ background: "linear-gradient(135deg,#6B1E2B,#231F1E)" }} />
      <div className="p-5">
        <div className="text-xs tracking-widest uppercase mb-2 font-bold text-gold">Founder Story</div>
        <h3 className="font-display text-lg font-semibold text-charcoal">From Beekeeping to Ritual Wellness</h3>
        <p className="mt-2 text-sm text-[#6b6560] leading-relaxed">
          The journey began in 2020, learning directly through beekeeping — understanding bees, honey, sourcing, purity and consumer
          confusion firsthand. VENYALAY grew from that experience: an education-first honey and wellness brand built on trust before sales.
        </p>
      </div>
    </div>
  );
}
