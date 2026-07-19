import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Sparkles, Menu, X } from "lucide-react";
import { useCart } from "../context/CartContext";

const MENU_LINKS = [
  { to: "/shop", label: "Shop" },
  { to: "/rituals", label: "Rituals" },
  { to: "/explore", label: "Explore" },
  { to: "/quiz", label: "Honey Finder" },
  { to: "/trace", label: "Trace Your Honey" },
  { to: "/rewards", label: "Rewards" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const { itemCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-cream border-b border-line">
      <div className="flex items-center justify-between px-5 py-3">
<Link to="/" className="flex items-center">
  <img
    src="/assets/venyalay-logo.png"
    alt="VENYALAY"
    className="h-16 w-auto object-contain"
  />
</Link>
        <div className="flex items-center gap-4">
          <Link to="/quiz" aria-label="Honey Finder Quiz" className="hidden sm:block">
            <Sparkles size={18} className="text-charcoal" />
          </Link>
          <Link to="/cart" className="relative" aria-label={`Cart, ${itemCount} items`}>
            <ShoppingCart size={18} className="text-charcoal" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full flex items-center justify-center text-[9px] bg-maroon text-white font-bold">
                {itemCount}
              </span>
            )}
          </Link>
          <button
            type="button"
            className="hidden md:inline-flex"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav aria-label="Secondary" className="hidden md:flex gap-5 px-5 pb-3">
          {MENU_LINKS.map((l) => (
            <Link key={l.to} to={l.to} className="text-sm font-semibold text-charcoal" onClick={() => setMenuOpen(false)}>
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
