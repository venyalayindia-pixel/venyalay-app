import React, { useState } from "react";
import { Mail, Phone, MapPin, Instagram, Facebook, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Please enter a valid email address.";
    if (!form.message.trim()) next.message = "Please enter a message.";
    setErrors(next);
    if (Object.keys(next).length === 0) setSent(true);
  };

  return (
    <div className="pb-8 pt-6 px-5 fade-in">
      <h1 className="font-display text-3xl font-semibold text-charcoal">Contact Us</h1>
      <p className="text-sm mt-1 text-[#6b6560]">We'd love to hear from you.</p>

      <div className="mt-5 space-y-3">
        <div className="flex items-center gap-3 rounded-xl p-3 bg-cream-deep text-sm">
          <MapPin size={15} className="text-maroon shrink-0" />
          <span className="text-charcoal">
  <strong>Reg. Office:</strong><br />
  VENYA SCIENCES LLP<br />
  8-5-66/103, Dhanalaxmi Colony,<br />
  Teachers Colony,<br />
  Mahabubnagar-509001,<br />
  Telangana, India
</span>
        </div>
        <div className="flex items-center gap-3 rounded-xl p-3 bg-cream-deep text-sm">
          <Mail size={15} className="text-maroon shrink-0" />
          <a
  href="mailto:venyalayindia@gmail.com"
  className="text-charcoal hover:text-maroon"
>
  venyalayindia@gmail.com
</a>
        </div>
        <div className="flex items-center gap-3 rounded-xl p-3 bg-cream-deep text-sm">
          <Phone size={15} className="text-maroon shrink-0" />
          <a
  href="tel:+919505111596"
  className="text-charcoal hover:text-maroon"
>
  +91 95051 11596
</a>
        </div>
        <div className="flex items-center gap-4 px-1">
          
           <a
  href="https://www.instagram.com/venyalayindia"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Instagram"
  className="text-maroon"
>
  <Instagram size={18} />
</a>
          <a href="#" aria-label="Facebook" className="text-maroon"><Facebook size={18} /></a>
        </div>
      </div>

      <h2 className="font-display text-lg font-semibold text-charcoal mt-8 mb-3">Send a Message</h2>
      {sent ? (
        <div className="rounded-2xl p-5 bg-cream-deep text-center">
          <CheckCircle2 size={28} className="text-leaf mx-auto" />
          <p className="text-sm text-charcoal mt-2 font-semibold">Thank you — we'll be in touch soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-3">
          <div>
            <label htmlFor="c-name" className="text-xs font-semibold text-[#6b6560]">Name</label>
            <input id="c-name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              aria-invalid={!!errors.name} className="w-full mt-1 rounded-xl px-4 py-3 text-sm bg-white border border-line outline-none" />
            {errors.name && <p role="alert" className="text-xs text-maroon mt-1">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="c-email" className="text-xs font-semibold text-[#6b6560]">Email</label>
            <input id="c-email" type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              aria-invalid={!!errors.email} className="w-full mt-1 rounded-xl px-4 py-3 text-sm bg-white border border-line outline-none" />
            {errors.email && <p role="alert" className="text-xs text-maroon mt-1">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="c-message" className="text-xs font-semibold text-[#6b6560]">Message</label>
            <textarea id="c-message" value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              aria-invalid={!!errors.message} rows={4} className="w-full mt-1 rounded-xl px-4 py-3 text-sm bg-white border border-line outline-none" />
            {errors.message && <p role="alert" className="text-xs text-maroon mt-1">{errors.message}</p>}
          </div>
          <button type="submit" className="w-full py-3 rounded-full text-sm font-bold bg-maroon text-white">Send Message</button>
        </form>
      )}
    </div>
  );
}
