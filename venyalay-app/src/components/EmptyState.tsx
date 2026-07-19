import React from "react";
import { LucideIcon } from "lucide-react";

export default function EmptyState({ icon: Icon, title, description, action }: {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center text-center py-14 px-6">
      <div className="w-14 h-14 rounded-full bg-cream-deep flex items-center justify-center mb-4">
        <Icon size={22} className="text-maroon" />
      </div>
      <h3 className="font-display text-lg font-semibold text-charcoal">{title}</h3>
      {description && <p className="text-sm text-[#6b6560] mt-2 max-w-xs">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
