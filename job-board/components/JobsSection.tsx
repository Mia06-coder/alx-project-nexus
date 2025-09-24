import React from "react";
import JobsGrid from "./JobsGrid";
import PageHeader from "./PageHeader";
import { JobsSectionProps } from "@/interfaces";

export default function JobsSection({
  id,
  title,
  subtitle,
  showCount = false,
  count,
}: JobsSectionProps) {
  return (
    <>
      {/* Optional header */}
      {subtitle ? (
        <PageHeader title={title} subtitle={subtitle} />
      ) : (
        <h3 id={`${id}-title`} className="sr-only">
          {title}
        </h3>
      )}

      <section
        aria-labelledby={`${id}-title`}
        className="py-10 max-w-6xl mx-auto"
      >
        {/* Count text (only when needed) */}
        {showCount && typeof count === "number" && (
          <p className="text-sm opacity-70 mb-4" aria-live="polite">
            {count} results
          </p>
        )}

        <JobsGrid />
      </section>
    </>
  );
}
