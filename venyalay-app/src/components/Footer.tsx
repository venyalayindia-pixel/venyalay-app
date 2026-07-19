import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook } from "lucide-react";

const LEGAL_LINKS = [
  { to: "/legal/privacy", label: "Privacy Policy" },
  { to: "/legal/terms", label: "Terms & Conditions" },
  { to: "/legal/shipping", label: "Shipping Policy" },
  { to: "/legal/returns", label: "Return & Refund Policy" },
  { to: "/legal/cancellation", label: "Cancellation Policy" },
  { to: "/legal/disclaimer", label: "Disclaimer" },
];

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white px-5 py-8 mt-4">
      <div className="font-display text-lg font-semibold">VENYALAY™</div>
      <p className="text-xs text-[#c9c2b6] mt-1">Not Just Honey — A Ritual Experience.</p>

      <div className="grid grid-cols-2 gap-2 mt-5">
        {LEGAL_LINKS.map((l) => (
          <Link key={l.to} to={l.to} className="text-xs text-[#c9c2b6] py-1">{l.label}</Link>
        ))}
        <Link to="/contact" className="text-xs text-[#c9c2b6] py-1">Contact Us</Link>
      </div>

      <div className="flex items-center gap-3 mt-5">
        <a href="#" aria-label="VENYALAY on Instagram" className="text-[#c9c2b6]"><Instagram size={16} /></a>
        <a href="#" aria-label="VENYALAY on Facebook" className="text-[#c9c2b6]"><Facebook size={16} /></a>
      </div>

      <p className="text-[11px] text-[#8a8378] mt-5 leading-relaxed">
        Honey is a natural food. Colour, flavour, aroma and crystallisation may vary by floral source, geography, season and storage
        conditions. Not suitable for infants below 12 months.
      </p>
      <p className="text-[11px] text-[#8a8378] mt-3">VENYA SCIENCES LLP · Mahabubnagar, Telangana, India</p>
      <p className="text-[11px] text-[#8a8378] mt-4">© {new Date().getFullYear()} VENYALAY. All rights reserved.</p>
    </footer>
  );
}
