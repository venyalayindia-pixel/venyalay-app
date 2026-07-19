import React from "react";

export default function Toast({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-24 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full z-[60] bg-charcoal text-white text-sm font-semibold shadow-lg fade-in"
    >
      {message}
    </div>
  );
}
