import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FaqItem } from "../types";

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="space-y-2">
      {items.map((item) => {
        const open = openId === item.id;
        return (
          <div key={item.id} className="rounded-2xl overflow-hidden bg-white border border-line">
            <button
              type="button"
              onClick={() => setOpenId(open ? null : item.id)}
              aria-expanded={open}
              aria-controls={`faq-panel-${item.id}`}
              className="w-full flex items-center justify-between p-4 text-left"
            >
              <span className="font-bold text-sm text-charcoal pr-3">{item.question}</span>
              <ChevronDown size={16} className={`text-maroon shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
            </button>
            {open && (
              <div id={`faq-panel-${item.id}`} className="px-4 pb-4 text-sm text-[#6b6560]">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
