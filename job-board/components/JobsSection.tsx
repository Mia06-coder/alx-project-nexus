import React from "react";
import JobsGrid from "./JobsGrid";
import PageHeader from "./PageHeader";
import { JobsSectionProps } from "@/interfaces";
import EmptyState from "./EmptyState";

export default function JobsSection({
  sectionJobs,
  totalJobs,
  id,
  title,
  subtitle,
  variant,
  showCount = false,
}: JobsSectionProps) {
  console.log(sectionJobs);
  return (
    <>
      <section aria-labelledby={`${id}-title`} className="max-w-6xl mx-auto">
        {sectionJobs.length === 0 ? (
          <EmptyState variant={variant} />
        ) : (
          <>
            {" "}
            {/* Optional header */}
            {subtitle ? (
              <PageHeader title={title} subtitle={subtitle} />
            ) : (
              <h3 id={`${id}-title`} className="sr-only">
                {title}
              </h3>
            )}
            {/* Count text (only when needed) */}
            {showCount && (
              <p className="text-sm opacity-70 mb-4 pt-10" aria-live="polite">
                {totalJobs} results
              </p>
            )}
            <JobsGrid jobs={sectionJobs} />
          </>
        )}
      </section>
    </>
  );
}
