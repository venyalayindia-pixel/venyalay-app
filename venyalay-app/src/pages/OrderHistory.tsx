import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Package } from "lucide-react";
import { useUser } from "../context/UserContext";
import EmptyState from "../components/EmptyState";

export default function OrderHistory() {
  const { orders } = useUser();

  return (
    <div className="pb-8 pt-6 px-5 fade-in">
      <Link to="/profile" className="inline-flex items-center gap-1 text-sm font-semibold text-maroon mb-3">
        <ChevronLeft size={16} /> Account
      </Link>
      <h1 className="font-display text-2xl font-semibold text-charcoal mb-5">Order History</h1>

      {orders.length === 0 ? (
        <EmptyState icon={Package} title="No orders yet" description="Your ritual batches will appear here once you place an order." />
      ) : (
        <div className="space-y-3">
          {orders.map((o) => (
            <div key={o.id} className="rounded-2xl p-4 bg-white border border-line">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-bold text-sm text-charcoal">{o.id}</div>
                  <div className="text-xs text-[#9a938a]">{new Date(o.date).toLocaleDateString()}</div>
                </div>
                <span className="text-[10px] px-2 py-1 rounded-full bg-cream-deep font-bold text-charcoal">{o.status}</span>
              </div>
              <div className="mt-3 space-y-1">
                {o.items.map((it) => (
                  <div key={it.productId} className="flex justify-between text-xs text-[#6b6560]">
                    <span>{it.name} × {it.quantity}</span>
                    <span>₹{it.price * it.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-sm mt-3 pt-3 border-t border-line font-bold text-charcoal">
                <span>Total</span><span>₹{o.total}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
