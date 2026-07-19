import React from "react";
import { NavLink } from "react-router-dom";
import { Home, ShoppingBag, Compass, Sparkles, User } from "lucide-react";

const NAV_ITEMS = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/shop", label: "Shop", icon: ShoppingBag },
  { to: "/explore", label: "Explore", icon: Compass },
  { to: "/rituals", label: "Rituals", icon: Sparkles },
  { to: "/profile", label: "Profile", icon: User },
];

export default function BottomNav() {
  return (
    <nav
      aria-label="Primary"
      className="sticky bottom-0 z-40 flex items-center justify-around py-2 bg-white border-t border-line"
    >
      {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className="flex flex-col items-center gap-1 px-3 py-1"
        >
          {({ isActive }) => (
            <>
              <Icon size={20} className={isActive ? "text-maroon" : "text-[#b3ab9e]"} />
              <span className={`text-[10px] font-bold ${isActive ? "text-maroon" : "text-[#b3ab9e]"}`}>{label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
