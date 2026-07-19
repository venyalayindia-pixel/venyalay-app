import React from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, Heart } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { getProductById } from "../data/products";
import ProductCard from "../components/ProductCard";
import EmptyState from "../components/EmptyState";

export default function Wishlist() {
  const { productIds } = useWishlist();
  const products = productIds.map((id) => getProductById(id)).filter(Boolean);

  return (
    <div className="pb-8 pt-6 fade-in">
      <div className="px-5">
        <Link to="/profile" className="inline-flex items-center gap-1 text-sm font-semibold text-maroon mb-3">
          <ChevronLeft size={16} /> Account
        </Link>
        <h1 className="font-display text-2xl font-semibold text-charcoal mb-5">Wishlist</h1>
      </div>

      {products.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="Your wishlist is empty"
          description="Tap the heart on any product to save it here."
          action={<Link to="/shop" className="px-5 py-3 rounded-full text-sm font-bold bg-maroon text-white inline-block">Shop Honey</Link>}
        />
      ) : (
        <div className="grid grid-cols-2 gap-4 px-5">
          {products.map((p) => p && <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
