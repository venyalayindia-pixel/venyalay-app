import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, ChevronLeft } from "lucide-react";
import { DID_YOU_KNOW } from "../data/content";

export default function DidYouKnow() {
  return (
    <div className="pb-8 pt-6 px-5 fade-in">
      <Link to="/explore" className="inline-flex items-center gap-1 text-sm font-semibold text-maroon mb-3">
        <ChevronLeft size={16} /> Explore
      </Link>
      <h1 className="font-display text-2xl font-semibold text-charcoal">Did You Know?</h1>
      <p className="text-sm mt-1 text-[#6b6560]">Science-backed facts about honey, floral sources, and bee behaviour.</p>

      <div className="mt-5 space-y-3">
        {DID_YOU_KNOW.map((fact, i) => (
          <div key={i} className="rounded-2xl p-4 bg-cream-deep">
            <Sparkles size={14} className="text-gold" />
            <p className="text-sm mt-2 text-charcoal">{fact}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
