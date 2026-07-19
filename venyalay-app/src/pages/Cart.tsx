import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { getProductById } from "../data/products";
import EmptyState from "../components/EmptyState";

export default function Cart() {
  const { items, updateQuantity, removeItem, subtotal, shipping, total } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <EmptyState
        icon={ShoppingBag}
        title="Your cart is empty"
        description="Explore the Founder Batch to begin your ritual."
        action={<Link to="/shop" className="px-5 py-3 rounded-full text-sm font-bold bg-maroon text-white inline-block">Shop Honey</Link>}
      />
    );
  }

  return (
    <div className="pb-8 pt-6 px-5 fade-in">
      <h1 className="font-display text-2xl font-semibold text-charcoal mb-5">Your Cart</h1>

      <div className="space-y-3">
        {items.map((item) => {
          const product = getProductById(item.productId);
          if (!product) return null;
          return (
            <div key={item.productId} className="flex items-center gap-3 rounded-2xl p-3 bg-white border border-line">
              <div className="w-14 h-14 rounded-xl shrink-0" style={{ background: product.gradient }} />
              <div className="flex-1 min-w-0">
                <div className="font-bold text-sm text-charcoal truncate">{product.name}</div>
                <div className="text-xs text-[#9a938a]">₹{product.price}</div>
                <div className="flex items-center gap-2 mt-1">
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    aria-label={`Decrease quantity of ${product.name}`}
                    className="w-6 h-6 rounded-full flex items-center justify-center border border-line"
                  >
                    <Minus size={10} />
                  </button>
                  <span className="text-xs w-4 text-center" aria-live="polite">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    aria-label={`Increase quantity of ${product.name}`}
                    className="w-6 h-6 rounded-full flex items-center justify-center border border-line"
                  >
                    <Plus size={10} />
                  </button>
                </div>
              </div>
              <button onClick={() => removeItem(item.productId)} aria-label={`Remove ${product.name} from cart`}>
                <X size={16} className="text-[#9a938a]" />
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-6 rounded-2xl p-4 bg-cream-deep space-y-2">
        <div className="flex justify-between text-sm"><span className="text-[#6b6560]">Subtotal</span><span className="font-semibold text-charcoal">₹{subtotal}</span></div>
        <div className="flex justify-between text-sm">
          <span className="text-[#6b6560]">Shipping</span>
          <span className="font-semibold text-charcoal">{shipping === 0 ? "Free" : `₹${shipping}`}</span>
        </div>
        {shipping > 0 && <p className="text-xs text-[#9a938a]">Add ₹{999 - subtotal} more for free shipping.</p>}
        <div className="flex justify-between text-base pt-2 border-t border-line"><span className="font-bold text-charcoal">Total</span><span className="font-extrabold text-charcoal">₹{total}</span></div>
      </div>

      <button onClick={() => navigate("/checkout")} className="w-full mt-5 py-3 rounded-full text-sm font-bold bg-maroon text-white">
        Proceed to Checkout
      </button>
    </div>
  );
}
