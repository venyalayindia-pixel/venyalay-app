import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import { getProductById } from "../data/products";
import { Address } from "../types";
import EmptyState from "../components/EmptyState";

type RazorpayResponse = {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

type RazorpayOrder = {
  id: string;
  amount: number;
  currency: string;
};

type CreateOrderResponse = {
  success: boolean;
  order?: RazorpayOrder;
  keyId?: string;
  message?: string;
};

type VerifyPaymentResponse = {
  success: boolean;
  message?: string;
  paymentId?: string;
  orderId?: string;
};

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image?: string;
  order_id: string;
  handler: (response: RazorpayResponse) => Promise<void>;
  prefill: {
    name: string;
    contact: string;
  };
  notes: {
    address: string;
  };
  theme: {
    color: string;
  };
  modal: {
    ondismiss: () => void;
  };
};

type RazorpayInstance = {
  open: () => void;
  on: (
    event: "payment.failed",
    callback: (response: {
      error?: {
        description?: string;
      };
    }) => void
  ) => void;
};

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

const initialAddress: Address = {
  fullName: "",
  line1: "",
  city: "",
  state: "",
  pincode: "",
  phone: "",
};

const loadRazorpayScript = (): Promise<boolean> =>
  new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const existingScript = document.querySelector(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
    );

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(true));
      existingScript.addEventListener("error", () => resolve(false));
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });

export default function Checkout() {
  const { items, subtotal, shipping, total, clearCart } = useCart();
  const { addOrder, addAddress } = useUser();

  const [address, setAddress] = useState<Address>(initialAddress);
  const [errors, setErrors] =
    useState<Partial<Record<keyof Address, string>>>({});
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [placed, setPlaced] = useState(false);
  const [paymentId, setPaymentId] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  if (items.length === 0 && !placed) {
    return (
      <EmptyState
        icon={ShoppingBag}
        title="Nothing to check out yet"
        description="Add some honey to your cart first."
        action={
          <Link
            to="/shop"
            className="px-5 py-3 rounded-full text-sm font-bold bg-maroon text-white inline-block"
          >
            Shop Honey
          </Link>
        }
      />
    );
  }

  const discount = couponApplied ? Math.round(subtotal * 0.1) : 0;
  const grandTotal = Math.max(total - discount, 0);

  const validate = (): boolean => {
    const next: Partial<Record<keyof Address, string>> = {};

    if (!address.fullName.trim()) {
      next.fullName = "Full name is required.";
    }

    if (!address.line1.trim()) {
      next.line1 = "Address line is required.";
    }

    if (!address.city.trim()) {
      next.city = "City is required.";
    }

    if (!address.state.trim()) {
      next.state = "State is required.";
    }

    if (!/^\d{6}$/.test(address.pincode.trim())) {
      next.pincode = "Enter a valid 6-digit PIN code.";
    }

    if (!/^[6-9]\d{9}$/.test(address.phone.trim())) {
      next.phone = "Enter a valid 10-digit phone number.";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "VENYALAY10") {
      setCouponApplied(true);
      setPaymentError("");
    } else {
      setCouponApplied(false);
      setPaymentError("Invalid coupon code.");
    }
  };

  const saveSuccessfulOrder = (
    razorpayPaymentId: string,
    razorpayOrderId: string
  ) => {
    const orderItems = items.map((item) => {
      const product = getProductById(item.productId);

      if (!product) {
        throw new Error(`Product not found: ${item.productId}`);
      }

      return {
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
      };
    });

    addAddress(address);

    addOrder({
      id: razorpayOrderId,
      date: new Date().toISOString(),
      items: orderItems,
      total: grandTotal,
      status: "Processing",
      address,
    });

    setPaymentId(razorpayPaymentId);
    clearCart();
    setPlaced(true);
  };

  const handlePlaceOrder = async (event: React.FormEvent) => {
    event.preventDefault();
    setPaymentError("");

    if (!validate()) return;

    setIsProcessing(true);

    try {
      const scriptLoaded = await loadRazorpayScript();

      if (!scriptLoaded || !window.Razorpay) {
        throw new Error(
          "Razorpay Checkout could not be loaded. Check your internet connection."
        );
      }

      const createOrderResponse = await fetch("/api/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: grandTotal,
          receipt: `venyalay_${Date.now()}`,
        }),
      });

      const createOrderData =
        (await createOrderResponse.json()) as CreateOrderResponse;

      if (
        !createOrderResponse.ok ||
        !createOrderData.success ||
        !createOrderData.order ||
        !createOrderData.keyId
      ) {
        throw new Error(
          createOrderData.message || "Unable to create Razorpay order."
        );
      }

      const serverOrder = createOrderData.order;

      const options: RazorpayOptions = {
        key: createOrderData.keyId,
        amount: serverOrder.amount,
        currency: serverOrder.currency,
        name: "VENYALAY",
        description: "VENYALAY Honey Order",
        image: "/assets/venyalay-logo.png",
        order_id: serverOrder.id,

        handler: async (response: RazorpayResponse) => {
          try {
            if (response.razorpay_order_id !== serverOrder.id) {
              throw new Error("Payment order validation failed.");
            }

            const verifyResponse = await fetch("/api/verify-payment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_order_id: serverOrder.id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData =
              (await verifyResponse.json()) as VerifyPaymentResponse;

            if (!verifyResponse.ok || !verifyData.success) {
              throw new Error(
                verifyData.message || "Payment verification failed."
              );
            }

            saveSuccessfulOrder(
              response.razorpay_payment_id,
              serverOrder.id
            );
          } catch (error) {
            const message =
              error instanceof Error
                ? error.message
                : "Unable to verify your payment.";

            setPaymentError(
              `${message} Do not pay again until the transaction is checked.`
            );
          } finally {
            setIsProcessing(false);
          }
        },

        prefill: {
          name: address.fullName.trim(),
          contact: address.phone.trim(),
        },

        notes: {
          address: `${address.line1}, ${address.city}, ${address.state} - ${address.pincode}`,
        },

        theme: {
          color: "#7a1f2b",
        },

        modal: {
          ondismiss: () => {
            setIsProcessing(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", (response) => {
        setIsProcessing(false);
        setPaymentError(
          response.error?.description ||
            "Payment failed. No order has been placed."
        );
      });

      razorpay.open();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong while starting the payment.";

      setPaymentError(message);
      setIsProcessing(false);
    }
  };

  if (placed) {
    return (
      <div className="pb-8 pt-16 px-5 text-center fade-in">
        <CheckCircle2 size={48} className="text-leaf mx-auto" />

        <h1 className="font-display text-2xl font-semibold text-charcoal mt-4">
          Payment Successful
        </h1>

        <p className="text-sm text-[#6b6560] mt-2">
          Thank you. Your VENYALAY order has been placed successfully.
        </p>

        {paymentId && (
          <p className="text-xs text-[#6b6560] mt-2 break-all">
            Payment ID: {paymentId}
          </p>
        )}

        <Link
          to="/profile"
          className="inline-block mt-6 px-5 py-3 rounded-full text-sm font-bold bg-maroon text-white"
        >
          View Orders
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={handlePlaceOrder}
      noValidate
      className="pb-8 pt-6 px-5 fade-in"
    >
      <h1 className="font-display text-2xl font-semibold text-charcoal mb-5">
        Checkout
      </h1>

      <fieldset className="space-y-3">
        <legend className="font-bold text-sm text-charcoal mb-1">
          Delivery Address
        </legend>

        {(
          [
            ["fullName", "Full name", "text"],
            ["line1", "Address line", "text"],
            ["city", "City", "text"],
            ["state", "State", "text"],
            ["pincode", "PIN code", "text"],
            ["phone", "Phone number", "tel"],
          ] as [keyof Address, string, string][]
        ).map(([key, label, type]) => (
          <div key={key}>
            <label
              htmlFor={key}
              className="text-xs font-semibold text-[#6b6560]"
            >
              {label}
            </label>

            <input
              id={key}
              type={type}
              value={address[key]}
              onChange={(event) =>
                setAddress((currentAddress) => ({
                  ...currentAddress,
                  [key]: event.target.value,
                }))
              }
              aria-invalid={Boolean(errors[key])}
              aria-describedby={errors[key] ? `${key}-error` : undefined}
              className="w-full mt-1 rounded-xl px-4 py-3 text-sm bg-white border border-line outline-none"
            />

            {errors[key] && (
              <p
                id={`${key}-error`}
                role="alert"
                className="text-xs text-maroon mt-1"
              >
                {errors[key]}
              </p>
            )}
          </div>
        ))}
      </fieldset>

      <div className="mt-5">
        <label
          htmlFor="coupon"
          className="text-xs font-semibold text-[#6b6560]"
        >
          Coupon code
        </label>

        <div className="flex gap-2 mt-1">
          <input
            id="coupon"
            value={coupon}
            onChange={(event) => setCoupon(event.target.value)}
            className="flex-1 rounded-xl px-4 py-3 text-sm bg-white border border-line outline-none"
            placeholder="Try VENYALAY10"
          />

          <button
            type="button"
            onClick={applyCoupon}
            className="px-4 rounded-xl text-sm font-bold bg-cream-deep text-charcoal"
          >
            Apply
          </button>
        </div>

        {couponApplied && (
          <p className="text-xs text-leaf mt-1">
            10% discount applied.
          </p>
        )}
      </div>

      <fieldset className="mt-5">
        <legend className="font-bold text-sm text-charcoal mb-2">
          Payment Method
        </legend>

        <div className="rounded-xl px-4 py-3 bg-white border border-line">
          <p className="font-semibold text-sm text-charcoal">
            Secure Online Payment
          </p>

          <p className="text-xs text-[#6b6560] mt-1">
            Pay securely using UPI, debit card, credit card, net banking or
            other methods available through Razorpay.
          </p>
        </div>
      </fieldset>

      <div className="mt-5 rounded-2xl p-4 bg-cream-deep space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-[#6b6560]">Subtotal</span>
          <span className="text-charcoal font-semibold">₹{subtotal}</span>
        </div>

        {couponApplied && (
          <div className="flex justify-between text-sm">
            <span className="text-[#6b6560]">Discount</span>
            <span className="text-leaf font-semibold">-₹{discount}</span>
          </div>
        )}

        <div className="flex justify-between text-sm">
          <span className="text-[#6b6560]">Shipping</span>
          <span className="text-charcoal font-semibold">
            {shipping === 0 ? "Free" : `₹${shipping}`}
          </span>
        </div>

        <div className="flex justify-between text-base pt-2 border-t border-line">
          <span className="font-bold text-charcoal">Total</span>
          <span className="font-extrabold text-charcoal">
            ₹{grandTotal}
          </span>
        </div>
      </div>

      {paymentError && (
        <div
          role="alert"
          className="mt-4 rounded-xl border border-maroon/20 bg-white px-4 py-3 text-sm text-maroon"
        >
          {paymentError}
        </div>
      )}

      <button
        type="submit"
        disabled={isProcessing}
        className="w-full mt-5 py-3 rounded-full text-sm font-bold bg-maroon text-white disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isProcessing
          ? "Opening Secure Payment..."
          : `Pay ₹${grandTotal} Securely`}
      </button>

      <p className="text-[11px] text-[#9a938a] mt-3 text-center">
        Payments are securely processed through Razorpay.
      </p>
    </form>
  );
}