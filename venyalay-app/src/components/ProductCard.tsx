import React from "react";
import { Link } from "react-router-dom";
import { Heart, Plus } from "lucide-react";
import { Product } from "../types";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function ProductCard({ product, size = "md" }: { product: Product; size?: "sm" | "md" }) {
  const { addItem } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  return (
    <div className={`rounded-3xl overflow-hidden bg-white border border-line fade-in ${size === "sm" ? "w-52" : ""}`}>
      <Link to={`/product/${product.id}`} className="block" aria-label={`View ${product.name}`}>
        <div
  className="relative h-32 sm:h-36"
  style={{
    backgroundImage: product.image
      ? `url("${product.image}")`
      : "none",
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundColor: "#ffffff",
  }}
>
          {product.comingSoon && (
  <span className="absolute top-2 right-2 rounded-full bg-amber-500 text-white text-[10px] font-semibold px-2 py-1">
    COMING SOON
  </span>
)}
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); toggle(product.id); }}
            aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
            aria-pressed={wishlisted}
            className="absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center bg-white/90"
          >
            <Heart size={14} fill={wishlisted ? "#6B1E2B" : "none"} className="text-maroon" />
          </button>
        </div>
      </Link>
      <div className="p-3">
        <Link to={`/product/${product.id}`}>
          <div className="font-body font-bold text-sm text-charcoal">{product.name}</div>
          <div className="font-display italic text-xs text-gold mt-0.5">{product.tagline}</div>
        </Link>
        <div className="flex items-center justify-between mt-3">
          <span className="font-bold text-charcoal text-sm">₹{product.price}</span>
        <button
  type="button"
  onClick={() => {
    if (!product.comingSoon) {
      addItem(product);
    }
  }}
  disabled={product.comingSoon}
  title={product.comingSoon ? "Launching Soon" : "Add to Cart"}
  aria-label={
    product.comingSoon
      ? `${product.name} - Launching Soon`
      : `Add ${product.name} to cart`
  }
  className={`w-8 h-8 rounded-full flex items-center justify-center transition ${
    product.comingSoon
      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
      : "bg-maroon text-white hover:bg-maroon/90"
  }`}
>
  {product.comingSoon ? (
    <span className="text-[9px] font-semibold">SOON</span>
  ) : (
    <Plus size={15} className="text-white" />
  )}
</button>
        </div>
      </div>
    </div>
  );
}
