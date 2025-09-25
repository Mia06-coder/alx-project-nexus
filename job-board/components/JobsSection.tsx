import React from "react";
import JobsGrid from "./JobsGrid";
import PageHeader from "./PageHeader";
import { JobsSectionProps } from "@/interfaces";
import EmptyState from "./EmptyState";

export default function JobsSection({
  sectionJobs,
  id,
  title,
  subtitle,
  variant,
  showCount = false,
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
        {sectionJobs.length === 0 ? (
          <EmptyState variant={variant} />
        ) : (
          <>
            {/* Count text (only when needed) */}
            {showCount && (
              <p className="text-sm opacity-70 mb-4" aria-live="polite">
                {sectionJobs.length} results
              </p>
            )}

            <JobsGrid jobs={sectionJobs} />
          </>
        )}
      </section>
    </>
  );
}
