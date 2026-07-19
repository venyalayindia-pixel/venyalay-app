import React, { useState } from "react";
import { Award } from "lucide-react";
import { useAdmin } from "../context/AdminContext";

export default function AdminProducts() {
  const { products, updateProduct, toggleActive } = useAdmin();
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <div className="fade-in">
      <h1 className="font-display text-2xl font-semibold text-charcoal">Products</h1>
      <p className="text-sm text-[#6b6560] mt-1">Manage price, stock, and batch status for each variant.</p>

      <div className="mt-6 space-y-3">
        {products.map((p) => (
          <div key={p.id} className="rounded-2xl p-4 bg-white border border-line">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl shrink-0" style={{ background: p.gradient }} />
              <div className="flex-1 min-w-0">
                <div className="font-bold text-sm text-charcoal">{p.name}</div>
                <div className="text-xs text-[#9a938a]">{p.batchCode}</div>
              </div>
              <label className="flex items-center gap-2 text-xs font-semibold text-[#6b6560]">
                <input type="checkbox" checked={p.active} onChange={() => toggleActive(p.id)} />
                Active
              </label>
            </div>

            {editingId === p.id ? (
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div>
                  <label htmlFor={`price-${p.id}`} className="text-xs font-semibold text-[#6b6560]">Price (₹)</label>
                  <input
                    id={`price-${p.id}`}
                    type="number"
                    min={0}
                    value={p.price}
                    onChange={(e) => updateProduct(p.id, { price: Number(e.target.value) })}
                    className="w-full mt-1 rounded-lg px-3 py-2 text-sm bg-cream-deep outline-none"
                  />
                </div>
                <div>
                  <label htmlFor={`stock-${p.id}`} className="text-xs font-semibold text-[#6b6560]">Stock</label>
                  <input
                    id={`stock-${p.id}`}
                    type="number"
                    min={0}
                    value={p.stock}
                    onChange={(e) => updateProduct(p.id, { stock: Number(e.target.value) })}
                    className="w-full mt-1 rounded-lg px-3 py-2 text-sm bg-cream-deep outline-none"
                  />
                </div>
                <div className="col-span-2">
                  <label htmlFor={`badge-${p.id}`} className="text-xs font-semibold text-[#6b6560]">Badge</label>
                  <select
                    id={`badge-${p.id}`}
                    value={p.badge}
                    onChange={(e) => updateProduct(p.id, { badge: e.target.value as typeof p.badge })}
                    className="w-full mt-1 rounded-lg px-3 py-2 text-sm bg-cream-deep outline-none"
                  >
                    <option>Founder Batch</option>
                    <option>New Arrival</option>
                    <option>Best Seller</option>
                    <option>Rare Batch</option>
                  </select>
                </div>
                <button onClick={() => setEditingId(null)} className="col-span-2 mt-1 py-2 rounded-full text-xs font-bold bg-maroon text-white">
                  Done
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-3 text-xs text-[#6b6560]">
                  <span className="font-bold text-charcoal">₹{p.price}</span>
                  <span>Stock: {p.stock}</span>
                  <span className="inline-flex items-center gap-1"><Award size={11} /> {p.badge}</span>
                </div>
                <button onClick={() => setEditingId(p.id)} className="text-xs font-bold text-maroon">Edit</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
