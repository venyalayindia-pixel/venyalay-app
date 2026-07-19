import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { FAQS } from "../data/content";
import FaqAccordion from "../components/FaqAccordion";

export default function Faq() {
  return (
    <div className="pb-8 pt-6 px-5 fade-in">
      <Link to="/explore" className="inline-flex items-center gap-1 text-sm font-semibold text-maroon mb-3">
        <ChevronLeft size={16} /> Explore
      </Link>
      <h1 className="font-display text-2xl font-semibold text-charcoal">Honey FAQ</h1>
      <p className="text-sm mt-1 text-[#6b6560] mb-5">Consumer awareness questions, answered plainly.</p>
      <FaqAccordion items={FAQS} />
    </div>
  );
}
