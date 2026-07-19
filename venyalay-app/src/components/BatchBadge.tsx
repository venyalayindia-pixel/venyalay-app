import React from "react";
import { Award } from "lucide-react";

export default function BatchBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-[10px] px-3 py-1.5 rounded-full bg-white text-maroon font-bold">
      <Award size={11} /> {label}
    </span>
  );
}
