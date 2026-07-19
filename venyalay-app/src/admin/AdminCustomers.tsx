import React from "react";
import { useUser } from "../context/UserContext";

export default function AdminCustomers() {
  const { addresses, orders, name, points, rewardLevel } = useUser();

  return (
    <div className="fade-in">
      <h1 className="font-display text-2xl font-semibold text-charcoal">Customers</h1>
      <p className="text-sm text-[#6b6560] mt-1">Prototype view based on this session's local data.</p>

      <div className="mt-5 rounded-2xl p-4 bg-white border border-line">
        <div className="font-bold text-charcoal">{name}</div>
        <div className="text-xs text-[#6b6560] mt-1">{rewardLevel} · {points} points · {orders.length} orders</div>
      </div>

      <h2 className="font-display text-lg font-semibold text-charcoal mt-8 mb-3">Saved Addresses</h2>
      {addresses.length === 0 ? (
        <p className="text-sm text-[#9a938a]">No saved addresses yet.</p>
      ) : (
        <div className="space-y-2">
          {addresses.map((a, i) => (
            <div key={i} className="rounded-xl p-3 bg-cream-deep text-sm">
              <div className="font-semibold text-charcoal">{a.fullName}</div>
              <div className="text-[#6b6560]">{a.city}, {a.state} — {a.pincode}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
