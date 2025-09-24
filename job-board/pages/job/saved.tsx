// pages/job/saved.tsx
import EmptyState from "@/components/EmptyState";
import React from "react";

export default function saved() {
  return (
    <>
      <div className="px-6 py-20 container mx-auto">
        <EmptyState
          variant="saved"
          onActionClick={() => (window.location.href = "/")}
        />
      </div>
    </>
  );
}
