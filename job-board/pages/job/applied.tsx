// pages/job/applied.tsx
import EmptyState from "@/components/EmptyState";
import React from "react";

export default function applied() {
  return (
    <>
      <div className="px-6 py-20 container mx-auto">
        <EmptyState
          variant="applied"
          onActionClick={() => (window.location.href = "/")}
        />
      </div>
    </>
  );
}
