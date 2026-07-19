import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { BEE_AND_ME } from "../data/content";

export default function BeeAndMe() {
  return (
    <div className="pb-8 pt-6 px-5 fade-in">
      <Link to="/explore" className="inline-flex items-center gap-1 text-sm font-semibold text-maroon mb-3">
        <ChevronLeft size={16} /> Explore
      </Link>

      <div className="rounded-3xl p-6 mb-5 text-center bg-charcoal">
        <div className="font-display text-2xl font-semibold text-white">BEE & ME</div>
        <div className="text-xs mt-1 font-bold text-amber">NATURE'S INTELLIGENCE. THROUGH CURIOUS EYES.</div>
        <p className="text-xs mt-2 text-[#c9c2b6]">An Immersive Science Storytelling Series</p>
        <div className="text-xs mt-4 text-[#E9DCC8]">Discover the Incredible World of Nature, Science & Intelligence.</div>
      </div>

      <div className="space-y-3">
        {BEE_AND_ME.map((b) => (
          <div key={b.id} className="rounded-2xl p-4 bg-white border border-line">
            <div className="font-bold text-maroon text-sm">{b.pillar}</div>
            <div className="font-display text-base font-semibold text-charcoal mt-1">{b.title}</div>
            <div className="text-xs mt-1 text-[#6b6560]">{b.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
