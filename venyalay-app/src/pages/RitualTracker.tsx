import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Flame, Sunrise, Moon, UtensilsCrossed } from "lucide-react";
import { useUser } from "../context/UserContext";

const RITUAL_ICONS: Record<string, React.ElementType> = { morning: Sunrise, night: Moon, food: UtensilsCrossed, pooja: Flame };

function last7Days(): string[] {
  const days: string[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().slice(0, 10));
  }
  return days;
}

export default function RitualTracker() {
  const { ritualLogs, streak } = useUser();
  const days = last7Days();

  return (
    <div className="pb-8 pt-6 px-5 fade-in">
      <Link to="/profile" className="inline-flex items-center gap-1 text-sm font-semibold text-maroon mb-3">
        <ChevronLeft size={16} /> Account
      </Link>
      <h1 className="font-display text-2xl font-semibold text-charcoal">Ritual Tracker</h1>

      <div className="rounded-3xl p-5 mt-4 flex items-center gap-4 bg-white border border-line">
        <div className="w-14 h-14 rounded-full flex items-center justify-center bg-cream-deep">
          <Flame size={22} className="text-amber" />
        </div>
        <div>
          <div className="font-display text-2xl font-semibold text-charcoal">{streak} day{streak !== 1 ? "s" : ""}</div>
          <div className="text-xs text-[#6b6560]">Current ritual streak</div>
        </div>
      </div>

      <h2 className="font-display text-lg font-semibold text-charcoal mt-8 mb-3">This Week</h2>
      <div className="space-y-2">
        {days.map((day) => {
          const dayLogs = ritualLogs.filter((l) => l.date === day);
          return (
            <div key={day} className="flex items-center justify-between rounded-xl p-3 bg-cream-deep">
              <span className="text-xs font-semibold text-[#6b6560]">
                {new Date(day).toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short" })}
              </span>
              <div className="flex gap-2">
                {dayLogs.length === 0 ? (
                  <span className="text-[11px] text-[#b3ab9e]">No ritual logged</span>
                ) : (
                  dayLogs.map((l) => {
                    const Icon = RITUAL_ICONS[l.ritual];
                    return (
                      <span key={l.ritual} className="w-6 h-6 rounded-full flex items-center justify-center bg-white">
                        <Icon size={12} className="text-maroon" />
                      </span>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-xs mt-6 text-[#9a938a]">
        Ritual tracking reflects your own practice and preferences only — it is not a health or medical record.
      </p>
    </div>
  );
}
