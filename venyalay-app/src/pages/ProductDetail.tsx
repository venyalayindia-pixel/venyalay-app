import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ChevronLeft, Heart, MapPin, Check } from "lucide-react";
import { getProductById, REVIEWS } from "../data/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import QuantitySelector from "../components/QuantitySelector";
import Pill from "../components/Pill";
import TraceabilityTimeline from "../components/TraceabilityTimeline";
import ReviewCard from "../components/ReviewCard";
import EmptyState from "../components/EmptyState";
import { PackageX } from "lucide-react";

type Tab = "story" | "ritual" | "nutrition" | "trace" | "reviews";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = getProductById(id);
  useEffect(() => {
  if (!product || typeof (window as any).fbq !== "function") return;

  (window as any).fbq("track", "ViewContent", {
    content_ids: [product.id],
    content_name: product.name,
    content_type: "product",
    value: product.price,
    currency: "INR",
  });
}, [product]);
  const { addItem } = useCart();
  const { toggle, isWishlisted } = useWishlist();
  const [qty, setQty] = useState(1);
  const [pin, setPin] = useState("");
  const [pinResult, setPinResult] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("story");
  const galleryImages =
  product?.images?.length
    ? product.images
    : product?.image
      ? [product.image]
      : [];

const [selectedImage, setSelectedImage] = useState(
  galleryImages[0] ?? ""
);

  if (!product) {
    return (
      <EmptyState
        icon={PackageX}
        title="Product not found"
        description="This honey may no longer be available."
        action={<Link to="/shop" className="text-sm font-bold text-maroon">Back to Shop</Link>}
      />
    );
  }

  const wishlisted = isWishlisted(product.id);
  const reviews = REVIEWS.filter((r) => r.productId === product.id);

  const checkPin = () => {
    if (!/^\d{6}$/.test(pin)) {
      setPinResult("Enter a valid 6-digit PIN code.");
      return;
    }
    setPinResult("Estimated delivery: 3–5 business days.");
  };

  return (
    <div className="pb-8 fade-in">
     <div className="relative h-[340px] sm:h-[380px]" style={{
  backgroundImage: selectedImage
  ? `url("${selectedImage}")`
  : product.gradient,
backgroundSize: selectedImage ? "contain" : "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundColor: "#ffffff",
}}>
        <button onClick={() => navigate(-1)} aria-label="Go back" className="absolute top-5 left-5 w-9 h-9 rounded-full flex items-center justify-center bg-white/90">
          <ChevronLeft size={18} className="text-charcoal" />
        </button>
        <button
          onClick={() => toggle(product.id)}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={wishlisted}
          className="absolute top-5 right-5 w-9 h-9 rounded-full flex items-center justify-center bg-white/90"
        >
          <Heart size={16} fill={wishlisted ? "#6B1E2B" : "none"} className="text-maroon" />
        </button>
        <span className="absolute bottom-4 left-5 text-[10px] px-3 py-1.5 rounded-full bg-white text-maroon font-bold">{product.badge}</span>
      </div>
{galleryImages.length > 1 && (
  <div className="flex gap-3 px-4 py-4 overflow-x-auto bg-white">
    {galleryImages.map((image, index) => (
      <button
        key={image}
        type="button"
        onClick={() => setSelectedImage(image)}
        aria-label={`View product image ${index + 1}`}
        className={`h-20 w-20 shrink-0 rounded-xl overflow-hidden border-2 bg-white ${
          selectedImage === image ? "border-gold" : "border-line"
        }`}
      >
        <img
          src={image}
          alt={`${product.name} view ${index + 1}`}
          className="h-full w-full object-contain"
        />
      </button>
    ))}
  </div>
)}
      <div className="px-5 pt-5">
        <h1 className="font-display text-3xl font-semibold text-charcoal">{product.name}</h1>
        <p className="font-display italic text-base text-gold mt-1">{product.tagline}</p>
        <div className="flex items-center gap-3 mt-3">
          <span className="font-extrabold text-2xl text-charcoal">₹{product.price}</span>
          <span className="text-xs text-[#9a938a]">{product.netQuantity} · Raw · Unheated · Pure</span>
        </div>

        <div className="flex items-center gap-3 mt-5">
          <QuantitySelector value={qty} onChange={setQty} />
          <button
            onClick={() => { addItem(product, qty); }}
            className="flex-1 py-3 rounded-full text-sm font-bold bg-charcoal text-white"
          >
            Add to Cart
          </button>
        </div>
        <button
  onClick={() => {
    if (!product.comingSoon) {
      addItem(product, qty);
      navigate("/checkout");
    }
  }}
  disabled={product.comingSoon}
  className={`w-full mt-2 py-3 rounded-full text-sm font-bold ${
    product.comingSoon
      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
      : "bg-gold text-white"
  }`}
>
  {product.comingSoon ? "Coming Soon" : "Buy Now"}
</button>

        <div className="flex items-center gap-2 mt-5 rounded-full px-4 py-3 bg-cream-deep">
          <MapPin size={15} className="text-maroon" />
          <label htmlFor="pincode" className="sr-only">PIN code</label>
          <input
            id="pincode"
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
            placeholder="Enter PIN code"
            inputMode="numeric"
            maxLength={6}
            className="flex-1 bg-transparent outline-none text-sm"
          />
          <button onClick={checkPin} className="font-bold text-maroon text-sm">Check</button>
        </div>
        {pinResult && <p className="text-xs mt-2 text-[#6b6560]" role="status">{pinResult}</p>}

        <div className="flex gap-2 mt-6 overflow-x-auto no-scrollbar">
          {([
            ["story", "Product Story"],
            ["ritual", "Ritual Usage"],
            ["nutrition", "Nutrition"],
            ["trace", "Traceability"],
            ["reviews", `Reviews (${reviews.length})`],
          ] as [Tab, string][]).map(([k, l]) => (
            <Pill key={k} active={tab === k} onClick={() => setTab(k)}>{l}</Pill>
          ))}
        </div>

        <div className="mt-5">
          {tab === "story" && (
            <div>
              <p className="text-sm text-[#4a453f] leading-relaxed">{product.story}</p>
              <div className="grid grid-cols-2 gap-3 mt-4">
                {[["Region", product.region], ["Colour", product.colour], ["Aroma", product.aroma], ["Taste", product.taste]].map(([k, v]) => (
                  <div key={k} className="rounded-xl p-3 bg-cream-deep">
                    <div className="text-[11px] uppercase tracking-wide text-[#9a938a] font-bold">{k}</div>
                    <div className="text-sm mt-1 text-charcoal font-semibold">{v}</div>
                  </div>
                ))}
              </div>
              <p className="text-xs mt-4 text-[#9a938a]">
                Crystallisation is natural and may occur over time depending on floral source and storage temperature — it does not affect purity.
              </p>
            </div>
          )}

          {tab === "ritual" && (
            <div>
              <ul className="space-y-2 text-sm text-[#4a453f]">
                {[
                  "Take 1–2 teaspoons directly",
                  "Mix into lukewarm water",
                  "Stir into herbal infusions",
                  "Add to foods after cooking",
                  "Use in morning or evening rituals",
                  "Offer respectfully in pooja or naivedyam where appropriate",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2"><Check size={14} className="text-leaf mt-0.5 shrink-0" /> {t}</li>
                ))}
              </ul>
              <div role="note" className="rounded-xl p-3 mt-4 text-xs bg-[#FBEFE9] text-maroon-dark">
                Do not add honey to boiling-hot liquids. Not suitable for infants below 12 months.
              </div>
            </div>
          )}

          {tab === "nutrition" && (
            <div className="font-mono">
              <div className="text-xs mb-3 font-body text-[#9a938a]">Per 100 g</div>
              {[
                ["Energy", `${product.nutrition.energyKcal} kcal`],
                ["Protein", `${product.nutrition.proteinG} g`],
                ["Carbohydrate", `${product.nutrition.carbohydrateG} g`],
                ["Total Sugars", `${product.nutrition.totalSugarsG} g`],
                ["Added Sugars", `${product.nutrition.addedSugarsG} g`],
                ["Fat", `${product.nutrition.fatG} g`],
                ["Sodium", `${product.nutrition.sodiumMg} mg`],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between py-2 text-sm border-b border-line">
                  <span className="text-[#6b6560] font-body">{k}</span><span className="text-charcoal font-semibold">{v}</span>
                </div>
              ))}
            </div>
          )}

          {tab === "trace" && (
            <div>
              <div className="rounded-xl p-3 mb-4 bg-cream-deep">
                <div className="text-[11px] uppercase tracking-wide text-[#9a938a] font-bold">Batch Code</div>
                <div className="text-sm mt-1 font-mono text-charcoal">{product.batchCode}</div>
              </div>
              <TraceabilityTimeline />
              <div className="grid grid-cols-2 gap-3 mt-5">
                {[["Packaging Date", product.packagingDate], ["Best Before", product.bestBefore]].map(([k, v]) => (
                  <div key={k} className="rounded-xl p-3 bg-cream-deep">
                    <div className="text-[11px] uppercase tracking-wide text-[#9a938a] font-bold">{k}</div>
                    <div className="text-sm mt-1 text-charcoal font-semibold">{v}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "reviews" && (
            <div className="space-y-3">
              {reviews.length === 0 ? (
                <p className="text-sm text-[#9a938a]">No reviews yet for this variant.</p>
              ) : (
                reviews.map((r) => <ReviewCard key={r.id} review={r} />)
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
