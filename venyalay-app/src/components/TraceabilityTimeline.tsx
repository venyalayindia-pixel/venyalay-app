import React from "react";
import { TRACE_STEPS } from "../data/content";
import HexBadge from "./HexBadge";

export default function TraceabilityTimeline({ activeStep = TRACE_STEPS.length }: { activeStep?: number }) {
  return (
    <div className="flex items-center justify-between overflow-x-auto no-scrollbar gap-1" role="list" aria-label="Honey traceability journey">
      {TRACE_STEPS.map((step, i) => (
        <React.Fragment key={step}>
          <div className="flex flex-col items-center gap-1 shrink-0" role="listitem">
            <HexBadge size={40} bg={i < activeStep ? "#6B1E2B" : "#E4D9C4"} fg={i < activeStep ? "#fff" : "#9a938a"}>
              {i + 1}
            </HexBadge>
            <span className="text-[10px] text-[#6b6560]">{step}</span>
          </div>
          {i < TRACE_STEPS.length - 1 && <div className="h-px flex-1 bg-line" />}
        </React.Fragment>
      ))}
    </div>
  );
}
