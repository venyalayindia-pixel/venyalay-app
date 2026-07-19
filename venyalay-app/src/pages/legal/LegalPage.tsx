import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export default function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="pb-8 pt-6 px-5 fade-in">
      <Link to="/" className="inline-flex items-center gap-1 text-sm font-semibold text-maroon mb-3">
        <ChevronLeft size={16} /> Home
      </Link>
      <h1 className="font-display text-2xl font-semibold text-charcoal mb-4">{title}</h1>
      <div className="text-sm text-[#4a453f] leading-relaxed space-y-3">{children}</div>
    </div>
  );
}
