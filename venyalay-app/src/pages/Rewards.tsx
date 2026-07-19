import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Gift, Ticket, BookOpen, CalendarCheck, Package } from "lucide-react";
import { useUser } from "../context/UserContext";
import RewardsProgress from "../components/RewardsProgress";

const WAYS_TO_EARN = [
  "Purchases",
  "Reading educational content",
  "Completing the Honey Finder quiz",
  "Referrals",
  "Product reviews",
  "Ritual streaks",
  "Sharing campaign content",
];

const PERKS = [
  { icon: Ticket, label: "Discounts on future orders" },
  { icon: Package, label: "Early Founder Batch access" },
  { icon: BookOpen, label: "Ritual guides & educational downloads" },
  { icon: CalendarCheck, label: "Event invitations" },
  { icon: Gift, label: "Special gift packaging" },
];

export default function Rewards() {
  const { points, rewardLevel, addPoints } = useUser();

  return (
    <div className="pb-8 pt-6 px-5 fade-in">
      <Link to="/profile" className="inline-flex items-center gap-1 text-sm font-semibold text-maroon mb-3">
        <ChevronLeft size={16} /> Account
      </Link>
      <h1 className="font-display text-2xl font-semibold text-charcoal">VENYALAYON Rewards</h1>

      <div className="rounded-3xl p-5 mt-4 bg-white border border-line">
        <div className="flex justify-between items-baseline">
          <span className="font-display text-2xl font-semibold text-charcoal">{points} pts</span>
          <span className="text-sm font-bold text-gold">{rewardLevel}</span>
        </div>
        <div className="mt-4"><RewardsProgress points={points} /></div>
      </div>

      <button
        onClick={() => addPoints(20)}
        className="mt-4 w-full py-3 rounded-full text-sm font-bold bg-maroon text-white"
      >
        Complete a quiz (+20 points demo)
      </button>

      <h2 className="font-display text-lg font-semibold text-charcoal mt-8 mb-3">Ways to Earn</h2>
      <div className="grid grid-cols-2 gap-2">
        {WAYS_TO_EARN.map((w) => (
          <div key={w} className="rounded-xl p-3 text-xs font-semibold bg-cream-deep text-charcoal">{w}</div>
        ))}
      </div>

      <h2 className="font-display text-lg font-semibold text-charcoal mt-8 mb-3">Reward Perks</h2>
      <div className="space-y-2">
        {PERKS.map((p) => (
          <div key={p.label} className="flex items-center gap-3 rounded-xl p-3 bg-white border border-line">
            <p.icon size={16} className="text-maroon" />
            <span className="text-sm text-charcoal font-semibold">{p.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
