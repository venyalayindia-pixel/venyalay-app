import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, MapPin } from "lucide-react";
import { useUser } from "../context/UserContext";
import EmptyState from "../components/EmptyState";

export default function Addresses() {
  const { addresses } = useUser();

  return (
    <div className="pb-8 pt-6 px-5 fade-in">
      <Link to="/profile" className="inline-flex items-center gap-1 text-sm font-semibold text-maroon mb-3">
        <ChevronLeft size={16} /> Account
      </Link>
      <h1 className="font-display text-2xl font-semibold text-charcoal mb-5">Address Book</h1>

      {addresses.length === 0 ? (
        <EmptyState icon={MapPin} title="No saved addresses" description="Addresses you use at checkout will be saved here." />
      ) : (
        <div className="space-y-3">
          {addresses.map((a, i) => (
            <div key={i} className="rounded-2xl p-4 bg-white border border-line text-sm">
              <div className="font-bold text-charcoal">{a.fullName}</div>
              <div className="text-[#6b6560] mt-1">{a.line1}, {a.city}, {a.state} — {a.pincode}</div>
              <div className="text-[#6b6560]">{a.phone}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
