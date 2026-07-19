import React from "react";

export function SkeletonCard() {
  return (
    <div className="rounded-3xl overflow-hidden border border-line bg-white animate-pulse" aria-hidden="true">
      <div className="h-32 bg-cream-deep" />
      <div className="p-3 space-y-2">
        <div className="h-3 w-3/4 bg-cream-deep rounded" />
        <div className="h-3 w-1/2 bg-cream-deep rounded" />
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 gap-4 px-5" role="status" aria-label="Loading products">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
