// components/Button.tsx
import { ButtonProps } from "@/interfaces";
import React from "react";

export default function Button({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-full text-sm font-semibold cursor-pointer hover:opacity-90 transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 whitespace-nowrap ${className}`}
    >
      {children}
    </button>
  );
}
