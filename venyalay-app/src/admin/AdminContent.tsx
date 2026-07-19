import React, { useState } from "react";
import { useAdmin } from "../context/AdminContext";
import { CAMPAIGN_POSTS, BEE_AND_ME } from "../data/content";

export default function AdminContent() {
  const { faqs, addFaq, removeFaq } = useAdmin();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || !answer.trim()) {
      setError("Both a question and an answer are required.");
      return;
    }
    setError(null);
    addFaq({ id: `f${Date.now()}`, question: question.trim(), answer: answer.trim() });
    setQuestion("");
    setAnswer("");
  };

  return (
    <div className="fade-in">
      <h1 className="font-display text-2xl font-semibold text-charcoal">Content</h1>
      <p className="text-sm text-[#6b6560] mt-1">Manage FAQs directly. Campaign and BEE & ME posts are shown below for reference.</p>

      <h2 className="font-display text-lg font-semibold text-charcoal mt-6 mb-3">Honey FAQ</h2>
      <form onSubmit={handleAdd} noValidate className="rounded-2xl p-4 bg-white border border-line space-y-2">
        <div>
          <label htmlFor="faq-q" className="text-xs font-semibold text-[#6b6560]">Question</label>
          <input id="faq-q" value={question} onChange={(e) => setQuestion(e.target.value)} className="w-full mt-1 rounded-lg px-3 py-2 text-sm bg-cream-deep outline-none" />
        </div>
        <div>
          <label htmlFor="faq-a" className="text-xs font-semibold text-[#6b6560]">Answer</label>
          <textarea id="faq-a" value={answer} onChange={(e) => setAnswer(e.target.value)} rows={2} className="w-full mt-1 rounded-lg px-3 py-2 text-sm bg-cream-deep outline-none" />
        </div>
        {error && <p role="alert" className="text-xs text-maroon">{error}</p>}
        <button type="submit" className="px-4 py-2 rounded-full text-xs font-bold bg-maroon text-white">Add FAQ</button>
      </form>

      <div className="mt-3 space-y-2">
        {faqs.map((f) => (
          <div key={f.id} className="flex items-start justify-between rounded-xl p-3 bg-cream-deep">
            <div className="pr-3">
              <div className="text-sm font-semibold text-charcoal">{f.question}</div>
              <div className="text-xs text-[#6b6560] mt-1">{f.answer}</div>
            </div>
            <button onClick={() => removeFaq(f.id)} className="text-xs font-bold text-maroon shrink-0">Remove</button>
          </div>
        ))}
      </div>

      <h2 className="font-display text-lg font-semibold text-charcoal mt-8 mb-3">100-Day Campaign (reference)</h2>
      <div className="space-y-2">
        {CAMPAIGN_POSTS.map((c) => (
          <div key={c.day} className="rounded-xl p-3 bg-white border border-line text-sm">
            <span className="font-mono text-xs text-[#9a938a]">Day {c.day}</span> — <span className="font-semibold text-charcoal">{c.question}</span>
          </div>
        ))}
      </div>

      <h2 className="font-display text-lg font-semibold text-charcoal mt-8 mb-3">BEE & ME Episodes (reference)</h2>
      <div className="space-y-2">
        {BEE_AND_ME.map((b) => (
          <div key={b.id} className="rounded-xl p-3 bg-white border border-line text-sm">
            <span className="font-semibold text-maroon">{b.pillar}</span> — {b.title}
          </div>
        ))}
      </div>
    </div>
  );
}
