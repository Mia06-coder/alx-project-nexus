// components/Pill.tsx
import { PillProps } from "@/interfaces";
import React from "react";

function Pill({ text, className = "" }: PillProps) {
  return (
    <span className={`px-2 py-0.5 text-[10px] rounded-full ${className}`}>
      {text}
    </span>
  );
}

export default Pill;
