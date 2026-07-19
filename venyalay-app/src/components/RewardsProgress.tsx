import React from "react";
import { RewardLevel } from "../types";

const LEVELS: { level: RewardLevel; threshold: number }[] = [
  { level: "Explorer", threshold: 0 },
  { level: "Ritual Member", threshold: 250 },
  { level: "Honey Guardian", threshold: 700 },
  { level: "VENYALAYON", threshold: 1500 },
];

export default function RewardsProgress({ points }: { points: number }) {
  const currentIndex = LEVELS.reduce((idx, l, i) => (points >= l.threshold ? i : idx), 0);
  const next = LEVELS[currentIndex + 1];
  const prev = LEVELS[currentIndex];
  const progress = next ? Math.min(100, Math.round(((points - prev.threshold) / (next.threshold - prev.threshold)) * 100)) : 100;

  return (
    <div>
      <div className="flex justify-between text-xs font-semibold text-[#6b6560] mb-2">
        <span>{prev.level}</span>
        <span>{next ? next.level : "Top tier"}</span>
      </div>
      <div className="h-2 rounded-full bg-line overflow-hidden" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
        <div className="h-full bg-gold" style={{ width: `${progress}%` }} />
      </div>
      <div className="text-xs text-[#9a938a] mt-2">
        {next ? `${next.threshold - points} points to ${next.level}` : "You've reached the highest tier"}
      </div>
    </div>
  );
}
