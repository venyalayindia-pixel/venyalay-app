import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PRODUCTS } from "../data/products";
import { Product } from "../types";

interface Question {
  key: string;
  question: string;
  options: string[];
}

const QUESTIONS: Question[] = [
  { key: "flavour", question: "What flavour profile do you prefer?", options: ["Mild", "Bold", "Herbal", "Refreshing", "Earthy", "Balanced"] },
  { key: "use", question: "How do you plan to use honey?", options: ["Morning ritual", "Food", "Herbal drinks", "Pooja", "Gifting"] },
  { key: "rarity", question: "Do you prefer familiar or rare floral sources?", options: ["Familiar", "Rare"] },
];

const FLAVOUR_TO_PRODUCT: Record<string, string> = {
  Mild: "coriander-honey",
  Bold: "jamun-honey",
  Herbal: "tulsi-honey",
  Refreshing: "eucalyptus-honey",
  Earthy: "sidr-honey",
  Balanced: "multiflora-honey",
};

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const restart = () => { setStep(0); setAnswers({}); };

  if (step >= QUESTIONS.length) {
    const result: Product = PRODUCTS.find((p) => p.id === FLAVOUR_TO_PRODUCT[answers.flavour]) ?? PRODUCTS[5];
    return (
      <div className="pb-8 pt-6 px-5 fade-in">
        <h1 className="font-display text-2xl font-semibold text-charcoal">Your Ritual Match</h1>
        <p className="text-xs mt-2 text-[#9a938a]">Based on your taste and ritual preferences, this may suit you.</p>

        <div className="rounded-3xl overflow-hidden mt-4 border border-line">
          <div className="h-32" style={{ background: result.gradient }} />
          <div className="p-4">
            <div className="font-bold text-charcoal">{result.name}</div>
            <div className="font-display italic text-gold text-sm">{result.tagline}</div>
            <Link to={`/product/${result.id}`} className="block w-full mt-4 py-3 rounded-full text-sm font-bold bg-maroon text-white text-center">
              View Product
            </Link>
          </div>
        </div>

        <button onClick={restart} className="text-xs mt-4 font-bold text-maroon">Retake quiz</button>
      </div>
    );
  }

  const current = QUESTIONS[step];

  return (
    <div className="pb-8 pt-6 px-5 fade-in">
      <h1 className="font-display text-xl font-semibold text-charcoal mb-1">Find Your VENYALAY Ritual</h1>
      <div className="text-xs mb-4 text-[#9a938a]">Question {step + 1} of {QUESTIONS.length}</div>
      <h2 className="font-display text-lg font-semibold text-charcoal">{current.question}</h2>

      <div className="flex flex-col gap-2 mt-5" role="group" aria-label={current.question}>
        {current.options.map((option) => (
          <button
            key={option}
            onClick={() => { setAnswers((a) => ({ ...a, [current.key]: option })); setStep((s) => s + 1); }}
            className="text-left px-4 py-3 rounded-2xl text-sm font-semibold bg-white border border-line text-charcoal"
          >
            {option}
          </button>
        ))}
      </div>
      <p className="text-[11px] text-[#9a938a] mt-6">This quiz reflects taste and ritual preference only, not medical suitability.</p>
    </div>
  );
}
