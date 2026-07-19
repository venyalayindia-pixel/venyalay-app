import React from "react";
import { Link } from "react-router-dom";
import { CalendarDays, Sparkles, HelpCircle, BookOpen, ChevronRight } from "lucide-react";

const HUBS = [
  { to: "/explore/campaign", icon: CalendarDays, title: "100-Day Honey Bee Campaign", desc: "A tiny question today, a sweeter understanding tomorrow." },
  { to: "/explore/did-you-know", icon: Sparkles, title: "Did You Know?", desc: "Science-backed facts about honey and bee behaviour." },
  { to: "/explore/faq", icon: HelpCircle, title: "Honey FAQ", desc: "Answers to the questions consumers ask most." },
  { to: "/explore/bee-and-me", icon: BookOpen, title: "BEE & ME", desc: "Nature's Intelligence. Through Curious Eyes." },
];

export default function Explore() {
  return (
    <div className="pb-8 pt-6 px-5 fade-in">
      <h1 className="font-display text-3xl font-semibold text-charcoal">Explore & Learn</h1>
      <p className="text-sm mt-1 text-[#6b6560]">A tiny question today, a sweeter understanding tomorrow.</p>

      <div className="mt-5 space-y-3">
        {HUBS.map((h) => (
          <Link key={h.to} to={h.to} className="flex items-center gap-3 rounded-2xl p-4 bg-white border border-line">
            <div className="w-11 h-11 rounded-full flex items-center justify-center bg-cream-deep shrink-0">
              <h.icon size={18} className="text-maroon" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-sm text-charcoal">{h.title}</div>
              <div className="text-xs text-[#6b6560] mt-0.5">{h.desc}</div>
            </div>
            <ChevronRight size={16} className="text-[#9a938a] shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  );
}
