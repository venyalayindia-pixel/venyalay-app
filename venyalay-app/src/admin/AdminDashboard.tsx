import React from "react";
import { Package, ShoppingBag, IndianRupee, Users } from "lucide-react";
import { useAdmin } from "../context/AdminContext";
import { useUser } from "../context/UserContext";

export default function AdminDashboard() {
  const { products } = useAdmin();
  const { orders } = useUser();

  const revenue = orders.reduce((sum, o) => sum + o.total, 0);
  const activeProducts = products.filter((p) => p.active).length;
  const lowStock = products.filter((p) => p.stock <= 10);

  const cards = [
    { icon: IndianRupee, label: "Total Revenue", value: `₹${revenue}` },
    { icon: ShoppingBag, label: "Orders", value: orders.length },
    { icon: Package, label: "Active Products", value: `${activeProducts}/${products.length}` },
    { icon: Users, label: "Newsletter Subscribers", value: 128 },
  ];

  return (
    <div className="fade-in">
      <h1 className="font-display text-2xl font-semibold text-charcoal">Overview</h1>
      <p className="text-sm text-[#6b6560] mt-1">A snapshot of your VENYALAY storefront.</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
        {cards.map((c) => (
          <div key={c.label} className="rounded-2xl p-4 bg-white border border-line">
            <c.icon size={16} className="text-maroon" />
            <div className="font-display text-xl font-semibold text-charcoal mt-2">{c.value}</div>
            <div className="text-xs text-[#6b6560] mt-1">{c.label}</div>
          </div>
        ))}
      </div>

      <h2 className="font-display text-lg font-semibold text-charcoal mt-8 mb-3">Recent Orders</h2>
      {orders.length === 0 ? (
        <p className="text-sm text-[#9a938a]">No orders placed yet.</p>
      ) : (
        <div className="rounded-2xl border border-line overflow-hidden bg-white">
          <table className="w-full text-sm">
            <thead className="bg-cream-deep text-[#6b6560] text-xs uppercase">
              <tr><th className="text-left px-4 py-2">Order</th><th className="text-left px-4 py-2">Status</th><th className="text-right px-4 py-2">Total</th></tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map((o) => (
                <tr key={o.id} className="border-t border-line">
                  <td className="px-4 py-2 font-mono text-xs">{o.id}</td>
                  <td className="px-4 py-2">{o.status}</td>
                  <td className="px-4 py-2 text-right font-semibold">₹{o.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <h2 className="font-display text-lg font-semibold text-charcoal mt-8 mb-3">Low Stock Alerts</h2>
      {lowStock.length === 0 ? (
        <p className="text-sm text-[#9a938a]">All products are sufficiently stocked.</p>
      ) : (
        <div className="space-y-2">
          {lowStock.map((p) => (
            <div key={p.id} className="flex justify-between rounded-xl p-3 bg-[#FBEFE9] text-sm">
              <span className="text-charcoal font-semibold">{p.name}</span>
              <span className="text-maroon-dark font-bold">{p.stock} units left</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
