import React, { useState } from "react";
import { QrCode, MapPin } from "lucide-react";
import { PRODUCTS, getProductById } from "../data/products";
import TraceabilityTimeline from "../components/TraceabilityTimeline";
import EmptyState from "../components/EmptyState";
import { PackageSearch } from "lucide-react";

export default function TraceHoney() {
  const [batchCode, setBatchCode] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    const match = PRODUCTS.find((p) => p.batchCode.toLowerCase() === batchCode.trim().toLowerCase());
    if (!match) {
      setError("No batch found for that code. Try one from a product's Traceability tab.");
      setSelectedId(null);
      return;
    }
    setError(null);
    setSelectedId(match.id);
  };

  const product = getProductById(selectedId ?? undefined);

  return (
    <div className="pb-8 pt-6 px-5 fade-in">
      <h1 className="font-display text-3xl font-semibold text-charcoal">Trace Your Honey</h1>
      <p className="text-sm mt-1 text-[#6b6560]">Follow the journey from flower to ritual.</p>

      <form onSubmit={handleLookup} noValidate className="mt-5">
        <label htmlFor="batch" className="text-xs font-semibold text-[#6b6560]">Batch code</label>
        <div className="flex gap-2 mt-1">
          <div className="flex-1 flex items-center gap-2 rounded-xl px-4 py-3 bg-white border border-line">
            <QrCode size={15} className="text-maroon" />
            <input
              id="batch"
              value={batchCode}
              onChange={(e) => setBatchCode(e.target.value)}
              placeholder="e.g. VNY-TUL-2408"
              className="flex-1 outline-none text-sm bg-transparent"
            />
          </div>
          <button type="submit" className="px-4 rounded-xl text-sm font-bold bg-maroon text-white">Trace</button>
        </div>
        {error && <p role="alert" className="text-xs text-maroon mt-2">{error}</p>}
      </form>

      <div className="grid grid-cols-3 gap-2 mt-4">
        {PRODUCTS.map((p) => (
          <button
            key={p.id}
            onClick={() => { setSelectedId(p.id); setBatchCode(p.batchCode); setError(null); }}
            className="text-[11px] rounded-lg px-2 py-2 bg-cream-deep text-charcoal font-semibold"
          >
            {p.batchCode}
          </button>
        ))}
      </div>

      {!product ? (
        <div className="mt-6">
          <EmptyState icon={PackageSearch} title="Enter or select a batch code" description="Every jar carries a traceable journey from flower to ritual." />
        </div>
      ) : (
        <div className="mt-6 rounded-3xl p-5 border border-line bg-white fade-in">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl shrink-0" style={{ background: product.gradient }} />
            <div>
              <div className="font-bold text-charcoal">{product.name}</div>
              <div className="text-xs text-[#9a938a] flex items-center gap-1"><MapPin size={11} /> {product.region}</div>
            </div>
          </div>
          <div className="mt-5"><TraceabilityTimeline /></div>
          <div className="grid grid-cols-2 gap-3 mt-5">
            {[["Batch Code", product.batchCode], ["Packaging Date", product.packagingDate], ["Best Before", product.bestBefore], ["Floral Source", product.name]].map(([k, v]) => (
              <div key={k} className="rounded-xl p-3 bg-cream-deep">
                <div className="text-[11px] uppercase tracking-wide text-[#9a938a] font-bold">{k}</div>
                <div className="text-sm mt-1 text-charcoal font-semibold">{v}</div>
              </div>
            ))}
          </div>
          <p className="text-xs mt-4 text-[#6b6560]">
            Founder note: every batch is selected and packed in small runs, so quality can be checked closely before it reaches you.
          </p>
        </div>
      )}
    </div>
  );
}
