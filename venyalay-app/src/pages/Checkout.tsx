import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CheckCircle2, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import { getProductById } from "../data/products";
import { Address } from "../types";
import EmptyState from "../components/EmptyState";

type PaymentMethod = "upi" | "card" | "netbanking" | "cod";

const initialAddress: Address = { fullName: "", line1: "", city: "", state: "", pincode: "", phone: "" };

export default function Checkout() {
  const { items, subtotal, shipping, total, clearCart } = useCart();
  const { addOrder, addAddress } = useUser();
  const navigate = useNavigate();

  const [address, setAddress] = useState<Address>(initialAddress);
  const [errors, setErrors] = useState<Partial<Record<keyof Address, string>>>({});
  const [payment, setPayment] = useState<PaymentMethod>("cod");
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [placed, setPlaced] = useState(false);

  if (items.length === 0 && !placed) {
    return (
      <EmptyState
        icon={ShoppingBag}
        title="Nothing to check out yet"
        description="Add some honey to your cart first."
        action={<Link to="/shop" className="px-5 py-3 rounded-full text-sm font-bold bg-maroon text-white inline-block">Shop Honey</Link>}
      />
    );
  }

  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const grandTotal = total - discount;

  const validate = (): boolean => {
    const next: Partial<Record<keyof Address, string>> = {};
    if (!address.fullName.trim()) next.fullName = "Full name is required.";
    if (!address.line1.trim()) next.line1 = "Address line is required.";
    if (!address.city.trim()) next.city = "City is required.";
    if (!address.state.trim()) next.state = "State is required.";
    if (!/^\d{6}$/.test(address.pincode)) next.pincode = "Enter a valid 6-digit PIN code.";
    if (!/^[6-9]\d{9}$/.test(address.phone)) next.phone = "Enter a valid 10-digit phone number.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "VENYALAY10") setCouponApplied(true);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    addAddress(address);
    addOrder({
      id: `VNY${Date.now()}`,
      date: new Date().toISOString(),
      items: items.map((i) => {
        const p = getProductById(i.productId)!;
        return { productId: p.id, name: p.name, price: p.price, quantity: i.quantity };
      }),
      total: grandTotal,
      status: "Processing",
      address,
    });
    clearCart();
    setPlaced(true);
  };

  if (placed) {
    return (
      <div className="pb-8 pt-16 px-5 text-center fade-in">
        <CheckCircle2 size={48} className="text-leaf mx-auto" />
        <h1 className="font-display text-2xl font-semibold text-charcoal mt-4">Order Confirmed</h1>
        <p className="text-sm text-[#6b6560] mt-2">Thank you — your ritual batch is on its way. A confirmation has been saved to your order history.</p>
        <Link to="/profile" className="inline-block mt-6 px-5 py-3 rounded-full text-sm font-bold bg-maroon text-white">View Orders</Link>
      </div>
    );
  }

  return (
    <form onSubmit={handlePlaceOrder} noValidate className="pb-8 pt-6 px-5 fade-in">
      <h1 className="font-display text-2xl font-semibold text-charcoal mb-5">Checkout</h1>

      <fieldset className="space-y-3">
        <legend className="font-bold text-sm text-charcoal mb-1">Delivery Address</legend>
        {([
          ["fullName", "Full name", "text"],
          ["line1", "Address line", "text"],
          ["city", "City", "text"],
          ["state", "State", "text"],
          ["pincode", "PIN code", "text"],
          ["phone", "Phone number", "tel"],
        ] as [keyof Address, string, string][]).map(([key, label, type]) => (
          <div key={key}>
            <label htmlFor={key} className="text-xs font-semibold text-[#6b6560]">{label}</label>
            <input
              id={key}
              type={type}
              value={address[key]}
              onChange={(e) => setAddress((a) => ({ ...a, [key]: e.target.value }))}
              aria-invalid={!!errors[key]}
              aria-describedby={errors[key] ? `${key}-error` : undefined}
              className="w-full mt-1 rounded-xl px-4 py-3 text-sm bg-white border border-line outline-none"
            />
            {errors[key] && <p id={`${key}-error`} role="alert" className="text-xs text-maroon mt-1">{errors[key]}</p>}
          </div>
        ))}
      </fieldset>

      <div className="mt-5">
        <label htmlFor="coupon" className="text-xs font-semibold text-[#6b6560]">Coupon code</label>
        <div className="flex gap-2 mt-1">
          <input id="coupon" value={coupon} onChange={(e) => setCoupon(e.target.value)} className="flex-1 rounded-xl px-4 py-3 text-sm bg-white border border-line outline-none" placeholder="Try VENYALAY10" />
          <button type="button" onClick={applyCoupon} className="px-4 rounded-xl text-sm font-bold bg-cream-deep text-charcoal">Apply</button>
        </div>
        {couponApplied && <p className="text-xs text-leaf mt-1">10% discount applied.</p>}
      </div>

      <fieldset className="mt-5">
  <legend className="font-bold text-sm text-charcoal mb-2">
    Payment Method
  </legend>

  <label className="flex items-center gap-3 rounded-xl px-4 py-3 bg-white border border-line text-sm">
    <input
      type="radio"
      name="payment"
      value="cod"
      checked={payment === "cod"}
      onChange={() => setPayment("cod")}
    />

    <div>
      <p className="font-semibold text-charcoal">Cash on Delivery</p>
      <p className="text-xs text-[#6b6560]">
        Pay when your VENYALAY order is delivered.
      </p>
    </div>
  </label>

  <div className="mt-2 rounded-xl px-4 py-3 bg-cream-deep text-xs text-[#6b6560]">
    Online payments will be available soon.
  </div>
</fieldset>

      <div className="mt-5 rounded-2xl p-4 bg-cream-deep space-y-2">
        <div className="flex justify-between text-sm"><span className="text-[#6b6560]">Subtotal</span><span className="text-charcoal font-semibold">₹{subtotal}</span></div>
        {couponApplied && <div className="flex justify-between text-sm"><span className="text-[#6b6560]">Discount</span><span className="text-leaf font-semibold">-₹{discount}</span></div>}
        <div className="flex justify-between text-sm"><span className="text-[#6b6560]">Shipping</span><span className="text-charcoal font-semibold">{shipping === 0 ? "Free" : `₹${shipping}`}</span></div>
        <div className="flex justify-between text-base pt-2 border-t border-line"><span className="font-bold text-charcoal">Total</span><span className="font-extrabold text-charcoal">₹{grandTotal}</span></div>
      </div>

      <button type="submit" className="w-full mt-5 py-3 rounded-full text-sm font-bold bg-maroon text-white">Place Order</button>
      <p className="text-[11px] text-[#9a938a] mt-3 text-center">
  This is a mock checkout — no real payment is processed.
</p>
    </form>
  );
}
