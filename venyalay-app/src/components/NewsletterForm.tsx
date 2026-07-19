import React, { useState } from "react";

export default function NewsletterForm({ dark = false }: { dark?: boolean }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError(null);
    setSubmitted(true);
  };

  if (submitted) {
    return <p className={`text-sm font-semibold ${dark ? "text-amber" : "text-maroon"}`}>You're on the list — welcome to the VENYALAYON community.</p>;
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="flex gap-2">
        <label htmlFor="newsletter-email" className="sr-only">Email address</label>
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email address"
          aria-invalid={!!error}
          aria-describedby={error ? "newsletter-error" : undefined}
          className="flex-1 rounded-full px-4 py-3 text-sm outline-none text-charcoal"
        />
        <button type="submit" className="px-5 rounded-full text-sm font-bold bg-amber text-charcoal">Join</button>
      </div>
      {error && <p id="newsletter-error" role="alert" className={`text-xs mt-2 ${dark ? "text-amber" : "text-maroon"}`}>{error}</p>}
    </form>
  );
}
