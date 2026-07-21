import React from "react";
import { Link } from "react-router-dom";
import { Sunrise, Moon, UtensilsCrossed, Flame, Leaf, ShieldCheck, Award, BookOpen, ChevronRight, Star } from "lucide-react";
import { PRODUCTS } from "../data/products";
import { CAMPAIGN_POSTS, RITUALS, TESTIMONIALS } from "../data/content";
import SectionHeading from "../components/SectionHeading";
import ProductCard from "../components/ProductCard";
import FounderStory from "../components/FounderStory";
import HomeHighlights from "../components/HomeHighlights";
import NewsletterForm from "../components/NewsletterForm";
import Footer from "../components/Footer";

const RITUAL_ICONS: Record<string, React.ElementType> = { morning: Sunrise, night: Moon, food: UtensilsCrossed, pooja: Flame };
const RITUAL_COLORS: Record<string, string> = { morning: "#E8A33D", night: "#6B1E2B", food: "#C9962C", pooja: "#5C6B4A" };

export default function Home() {
  const founderBatch = PRODUCTS.slice(0, 6);
  const todayPost = CAMPAIGN_POSTS[0];

  return (
    <div className="pb-8 fade-in">
      <section className="relative px-5 pt-8 pb-10 overflow-hidden" style={{ background: "linear-gradient(160deg,#4A121C,#6B1E2B)" }}>
        <div className="absolute -right-10 -top-10 w-52 h-52 hex-clip opacity-20 bg-gold" aria-hidden="true" />
        <div className="relative">
          <div className="text-xs tracking-[0.2em] uppercase mb-3 font-bold text-amber">India's Ritual Wellness Brand</div>
          <h1 className="font-display text-4xl font-semibold text-white leading-tight">VENYALAY™</h1>
          <p className="font-display italic text-lg text-[#F1E9D8] mt-3 leading-snug">Not Just Honey — A Ritual Experience.</p>
          <p className="mt-3 text-sm text-[#E9DCC8]">Inspired by Ayurveda. Backed by Modern Science.</p>
          <div className="flex gap-3 mt-6">
            <Link to="/shop" className="px-5 py-3 rounded-full text-sm font-bold bg-amber text-charcoal">Explore Honey</Link>
            <Link to="/rituals" className="px-5 py-3 rounded-full text-sm font-bold text-white border border-white/40">Begin Your Ritual</Link>
          </div>
        </div>
      </section>

      <div className="mt-8">
        <SectionHeading eyebrow="Featured" title="Founder Batch" sub="Selected floral honey, released in limited quantities." />
        <div className="flex gap-3 overflow-x-auto no-scrollbar px-5 pb-3">
  {founderBatch.map((p) => (
    <div key={p.id} className="w-[150px] shrink-0">
      <ProductCard product={p} size="sm" />
    </div>
  ))}
</div>
      </div>

      <div className="mt-10">
        <SectionHeading eyebrow="Everyday Practice" title="Four Rituals. One Honey." />
        <div className="grid grid-cols-2 gap-3 px-5">
          {RITUALS.map((r) => {
            const Icon = RITUAL_ICONS[r.id];
            return (
              <Link key={r.id} to="/rituals" className="rounded-2xl p-4 text-left bg-cream-deep border border-line">
                <Icon size={20} style={{ color: RITUAL_COLORS[r.id] }} />
                <div className="font-bold text-sm text-charcoal mt-2">{r.name}</div>
                <div className="text-xs text-[#6b6560] mt-1">{r.desc}</div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="mt-10 px-5">
        <div className="rounded-3xl p-6 bg-charcoal">
          <h3 className="font-display text-xl font-semibold text-white">Why VENYALAY</h3>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {[
              [Leaf, "Floral-origin honey"],
              [ShieldCheck, "Raw and unheated"],
              [Award, "Founder-selected batches"],
              [BookOpen, "Science-backed education"],
            ].map(([Icon, label], i) => {
              const IconComp = Icon as React.ElementType;
              return (
                <div key={i} className="flex items-start gap-2">
                  <IconComp size={16} className="text-amber mt-0.5" />
                  <span className="text-[13px] text-[#E9DCC8]">{label as string}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-10">
        <SectionHeading eyebrow="Explore" title="Science and Education" sub="A new question every day, from bee behaviour to honey chemistry." />
        <div className="px-5">
          <Link to="/explore/campaign" className="w-full rounded-2xl p-5 flex items-center justify-between" style={{ background: "linear-gradient(120deg,#C9962C,#E8A33D)" }}>
            <div className="text-left">
              <div className="text-[13px] font-extrabold text-charcoal">DAY {todayPost.day} · 100-DAY HONEY BEE CAMPAIGN</div>
              <div className="font-display text-lg font-semibold text-white mt-1">{todayPost.question}</div>
            </div>
            <ChevronRight className="text-white shrink-0" />
          </Link>
        </div>
      </div>

      <div className="mt-10 px-5"><FounderStory /></div>
      <HomeHighlights />

      <div className="mt-10">
        <SectionHeading eyebrow="Community" title="What VENYALAYONS Say" />
        <div className="flex gap-4 overflow-x-auto no-scrollbar px-5 pb-2">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="rounded-2xl p-5 shrink-0 w-60 bg-cream-deep border border-line">
              <div className="flex gap-1 mb-3">{Array.from({ length: t.rating }).map((_, s) => <Star key={s} size={12} className="text-gold fill-gold" />)}</div>
              <p className="text-sm text-charcoal leading-relaxed">"{t.text}"</p>
              <div className="text-xs text-[#6b6560] mt-3 font-bold">{t.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 px-5">
        <div className="rounded-3xl p-6 text-center bg-maroon-dark" style={{ background: "#4A121C" }}>
          <h3 className="font-display text-xl font-semibold text-white">Join the VENYALAYON Community</h3>
          <p className="text-[13px] text-[#E9DCC8] mt-1">Receive science, rituals and honey stories.</p>
          <div className="mt-4"><NewsletterForm dark /></div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
