import React from "react";
import { Star } from "lucide-react";
import { Review } from "../types";

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="rounded-2xl p-4 bg-cream border border-line">
      <div className="flex gap-1 mb-2" aria-label={`Rated ${review.rating} out of 5`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={12} className={i < review.rating ? "text-gold fill-gold" : "text-line"} />
        ))}
      </div>
      <p className="text-sm text-charcoal leading-relaxed">"{review.text}"</p>
      <div className="text-xs text-[#6b6560] mt-2 font-semibold">{review.author}</div>
    </div>
  );
}
