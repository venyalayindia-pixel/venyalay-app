import React, { useState } from "react";
import { Bookmark, Share2, Play, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { CAMPAIGN_POSTS } from "../data/content";
import { useUser } from "../context/UserContext";
import HexBadge from "../components/HexBadge";

export default function Campaign() {
  const { savedArticles, toggleSavedArticle } = useUser();
  const [shared, setShared] = useState<number | null>(null);

  const handleShare = (day: number) => {
    setShared(day);
    window.setTimeout(() => setShared(null), 1500);
  };

  return (
    <div className="pb-8 pt-6 px-5 fade-in">
      <Link to="/explore" className="inline-flex items-center gap-1 text-sm font-semibold text-maroon mb-3">
        <ChevronLeft size={16} /> Explore
      </Link>
      <h1 className="font-display text-2xl font-semibold text-charcoal">100-Day Honey Bee Campaign</h1>
      <p className="text-sm mt-1 text-[#6b6560]">A tiny question today, a sweeter understanding tomorrow.</p>

      <div className="mt-5 space-y-3">
        {CAMPAIGN_POSTS.map((c) => {
          const articleId = `campaign-${c.day}`;
          const saved = savedArticles.includes(articleId);
          return (
            <div key={c.day} className="rounded-2xl p-4 flex gap-3 bg-white border border-line">
              <HexBadge size={44}>{c.day}</HexBadge>
              <div className="flex-1">
                <div className="text-[10px] uppercase tracking-wide font-bold text-gold">{c.tag}</div>
                <div className="font-display text-base font-semibold text-charcoal mt-0.5">{c.question}</div>
                <p className="text-xs mt-1 text-[#6b6560]">{c.answer}</p>
                <div className="flex gap-4 mt-3">
                  <button
                    onClick={() => toggleSavedArticle(articleId)}
                    aria-pressed={saved}
                    className="flex items-center gap-1 text-xs font-bold text-maroon"
                  >
                    <Bookmark size={12} fill={saved ? "#6B1E2B" : "none"} /> {saved ? "Saved" : "Save"}
                  </button>
                  <button onClick={() => handleShare(c.day)} className="flex items-center gap-1 text-xs font-bold text-maroon">
                    <Share2 size={12} /> {shared === c.day ? "Link copied" : "Share"}
                  </button>
                  <span className="flex items-center gap-1 text-xs font-bold text-[#b3ab9e]">
                    <Play size={12} /> Video coming soon
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
