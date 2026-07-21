import React, { useState } from "react";
import { Sunrise, Moon, UtensilsCrossed, Flame, Check } from "lucide-react";
import { RITUALS, POOJA_USES } from "../data/content";
import Pill from "../components/Pill";
import { useUser } from "../context/UserContext";
import { RitualLog } from "../types";

const ICONS: Record<string, React.ElementType> = { morning: Sunrise, night: Moon, food: UtensilsCrossed, pooja: Flame };
const COLORS: Record<string, string> = { morning: "#E8A33D", night: "#6B1E2B", food: "#C9962C", pooja: "#5C6B4A" };

export default function Rituals() {
  const [active, setActive] = useState<(typeof RITUALS)[number]["id"]>("morning");
  const current = RITUALS.find((r) => r.id === active)!;
  const Icon = ICONS[active];
  const { logRitual, todayLogged } = useUser();
  const logged = todayLogged(active as RitualLog["ritual"]);

  return (
    <div className="pb-8 pt-6 fade-in">
      <div className="px-5">
        <h1 className="font-display text-3xl font-semibold text-charcoal">Ritual Hub</h1>
        <p className="text-sm mt-1 text-[#6b6560]">Four ways to bring honey into everyday life.</p>
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar px-5 mt-5 pb-1">
        {RITUALS.map((r) => (
  <div key={r.id} className="shrink-0">
    <Pill
      active={active === r.id}
      onClick={() => setActive(r.id)}
    >
      {r.name}
    </Pill>
  </div>
))}
      </div>

      <div className="px-5 mt-5">
        <div className="rounded-3xl p-6 border border-line" style={{ background: `linear-gradient(135deg, ${COLORS[active]}22, #FAF6EE)` }}>
          <Icon size={26} style={{ color: COLORS[active] }} />
          <h2 className="font-display text-xl font-semibold text-charcoal mt-3">{current.name}</h2>
          <p className="text-sm mt-2 text-[#4a453f]">{current.desc}</p>

          <button
            onClick={() => logRitual(active as RitualLog["ritual"])}
            disabled={logged}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold bg-maroon text-white disabled:opacity-50"
          >
            <Check size={14} /> {logged ? "Logged today" : "Log this ritual"}
          </button>
        </div>

        {active === "pooja" && (
          <div className="grid grid-cols-2 gap-3 mt-4">
            {POOJA_USES.map((p) => (
              <div key={p} className="rounded-xl p-3 text-sm bg-white border border-line text-charcoal font-semibold">{p}</div>
            ))}
          </div>
        )}
        {active === "night" && (
          <p className="text-xs mt-4 text-[#9a938a]">A gentle wind-down practice, not a sleep treatment — best paired with your own evening routine.</p>
        )}
      </div>
    </div>
  );
}
