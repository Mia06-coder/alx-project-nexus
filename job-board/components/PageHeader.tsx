// components/PageHeader.tsx
import { PageHeaderProps } from "@/interfaces";
import React from "react";

function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="max-w-5xl mx-auto text-center">
      <h2 className="text-3xl font-bold">{title}</h2>
      <p className="opacity-80 mt-2">{subtitle}</p>
    </div>
  );
}

export default PageHeader;
