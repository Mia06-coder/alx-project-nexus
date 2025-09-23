import React from "react";
import Button from "./Button";
import JobCard from "./JobCard";

function JobsFound() {
  return (
    <>
      {/* Job results */}
      <section
        aria-labelledby="job-results-title"
        className="py-10 max-w-6xl mx-auto"
      >
        {/* Section heading (visually hidden for screen readers) */}
        <h3 id="job-results-title" className="sr-only">
          Job Results
        </h3>

        {/* Small count text */}
        <p className="text-sm opacity-70 mb-4" aria-live="polite">
          6 results
        </p>

        {/* Job grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mx-auto w-fit mt-5"
          role="list"
        >
          <JobCard />
          <JobCard />
          <JobCard />
          <JobCard />
          <JobCard />
          <JobCard />
          <JobCard />
        </div>

        {/* Load more */}
        <div className="flex justify-center mt-12">
          <Button
            type="button"
            onClick={() => alert("Loading more jobs...")}
            className="border-2 border-[var(--primary)] text-[var(--primary)]"
          >
            Load More
          </Button>
        </div>
      </section>
    </>
  );
}

export default JobsFound;
