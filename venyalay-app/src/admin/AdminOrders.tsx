import React, { useState } from "react";
import { useUser } from "../context/UserContext";

export default function AdminOrders() {
  const { orders } = useUser();
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = statusFilter === "All" ? orders : orders.filter((o) => o.status === statusFilter);

  return (
    <div className="fade-in">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-charcoal">Orders</h1>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="text-xs rounded-full border border-line px-3 py-1.5 bg-white"
          aria-label="Filter by order status"
        >
          <option>All</option>
          <option>Processing</option>
          <option>Shipped</option>
          <option>Delivered</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-[#9a938a] mt-6">No orders match this filter.</p>
      ) : (
        <div className="mt-5 rounded-2xl border border-line overflow-hidden bg-white overflow-x-auto">
          <table className="w-full text-sm min-w-[480px]">
            <thead className="bg-cream-deep text-[#6b6560] text-xs uppercase">
              <tr>
                <th className="text-left px-4 py-2">Order ID</th>
                <th className="text-left px-4 py-2">Customer</th>
                <th className="text-left px-4 py-2">Status</th>
                <th className="text-right px-4 py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id} className="border-t border-line">
                  <td className="px-4 py-2 font-mono text-xs">{o.id}</td>
                  <td className="px-4 py-2">{o.address.fullName || "—"}</td>
                  <td className="px-4 py-2">{o.status}</td>
                  <td className="px-4 py-2 text-right font-semibold">₹{o.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
