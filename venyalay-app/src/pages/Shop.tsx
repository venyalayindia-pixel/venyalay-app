import React, { useMemo, useState } from "react";
import { Search, SearchX } from "lucide-react";
import { PRODUCTS } from "../data/products";
import ProductCard from "../components/ProductCard";
import Pill from "../components/Pill";
import EmptyState from "../components/EmptyState";

const FILTERS = ["All", "Founder Batch", "New Arrival", "Best Seller", "Rare Batch"] as const;

export default function Shop() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"default" | "price-asc" | "price-desc" | "rating">("default");

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter(
      (p) => (filter === "All" || p.badge === filter) && p.name.toLowerCase().includes(query.trim().toLowerCase())
    );
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [filter, query, sort]);

  return (
    <div className="pb-8 pt-6 fade-in">
      <div className="px-5">
        <h1 className="font-display text-3xl font-semibold text-charcoal">Shop Floral Honey</h1>

        <div className="flex items-center gap-2 mt-4 rounded-full px-4 py-3 bg-white border border-line">
          <Search size={16} className="text-[#9a938a]" />
          <label htmlFor="shop-search" className="sr-only">Search honey</label>
          <input
            id="shop-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search honey, ritual packs..."
            className="flex-1 outline-none text-sm bg-transparent"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar mt-4 pb-1">
          {FILTERS.map((f) => <Pill key={f} active={filter === f} onClick={() => setFilter(f)}>{f}</Pill>)}
        </div>

        <div className="flex items-center justify-between mt-3">
          <span className="text-xs text-[#9a938a]">{filtered.length} product{filtered.length !== 1 ? "s" : ""}</span>
          <label className="text-xs text-[#6b6560] flex items-center gap-2">
            Sort
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="text-xs rounded-full border border-line px-2 py-1 bg-white"
            >
              <option value="default">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </label>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={SearchX} title="No honey matches your search" description="Try a different keyword or clear your filters." />
      ) : (
        <div className="grid grid-cols-2 gap-4 px-5 mt-5">
          {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
