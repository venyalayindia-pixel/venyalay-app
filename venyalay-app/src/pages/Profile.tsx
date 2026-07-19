import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Heart, Award, BookOpen, Sunrise, MapPin, ChevronRight, Package } from "lucide-react";
import { useUser } from "../context/UserContext";
import { useWishlist } from "../context/WishlistContext";
import EmptyState from "../components/EmptyState";

export default function Profile() {
  const { name, setName, orders, rewardLevel, points } = useUser();
  const { productIds } = useWishlist();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(name);

  const rows = [
    { to: "/profile/orders", icon: ShoppingBag, label: "Order History", value: `${orders.length} orders` },
    { to: "/wishlist", icon: Heart, label: "Wishlist", value: `${productIds.length} items` },
    { to: "/rewards", icon: Award, label: "VENYALAYON Rewards", value: `${rewardLevel}` },
    { to: "/explore/campaign", icon: BookOpen, label: "Saved Articles" },
    { to: "/profile/ritual-tracker", icon: Sunrise, label: "Ritual Tracker" },
    { to: "/profile/addresses", icon: MapPin, label: "Address Book" },
  ];

  return (
    <div className="pb-8 pt-6 px-5 fade-in">
      <h1 className="font-display text-3xl font-semibold text-charcoal">Your Account</h1>

      <div className="rounded-3xl p-5 mt-5" style={{ background: "linear-gradient(135deg,#6B1E2B,#4A121C)" }}>
        {editing ? (
          <form
            onSubmit={(e) => { e.preventDefault(); setName(draft.trim() || "Guest VENYALAYON"); setEditing(false); }}
            className="flex gap-2"
          >
            <label htmlFor="display-name" className="sr-only">Display name</label>
            <input
              id="display-name"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              className="flex-1 rounded-full px-3 py-2 text-sm text-charcoal outline-none"
              autoFocus
            />
            <button type="submit" className="px-3 rounded-full text-xs font-bold bg-amber text-charcoal">Save</button>
          </form>
        ) : (
          <button onClick={() => { setDraft(name); setEditing(true); }} className="text-left w-full">
            <div className="text-white font-bold">{name}</div>
            <div className="text-xs mt-1 text-[#E9DCC8]">{rewardLevel} · {points} points</div>
          </button>
        )}
      </div>

      <div className="mt-5 space-y-2">
        {rows.map((r) => (
          <Link key={r.label} to={r.to} className="w-full flex items-center justify-between rounded-2xl p-4 bg-white border border-line">
            <div className="flex items-center gap-3">
              <r.icon size={16} className="text-maroon" />
              <span className="text-sm font-semibold text-charcoal">{r.label}</span>
            </div>
            <div className="flex items-center gap-2">
              {r.value && <span className="text-xs text-[#9a938a]">{r.value}</span>}
              <ChevronRight size={14} className="text-[#9a938a]" />
            </div>
          </Link>
        ))}
      </div>

      {orders.length === 0 && (
        <div className="mt-6">
          <EmptyState icon={Package} title="No orders yet" description="Your ritual batches will appear here once you place an order." />
        </div>
      )}
    </div>
  );
}
