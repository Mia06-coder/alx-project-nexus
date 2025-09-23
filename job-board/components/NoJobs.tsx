import React from "react";
import Button from "./Button";
import Image from "next/image";

function NoJobs() {
  return (
    <>
      {/* No results */}
      <section aria-labelledby="no-results-title" className="py-10">
        {/* Small count text */}
        <p className="text-sm opacity-70 mb-4" aria-live="polite">
          0 results
        </p>

        <div className="flex flex-col justify-center items-center text-center">
          {/* Illustration */}
          <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md aspect-square mb-4">
            <Image
              src="/assets/illustrations/no-jobs.svg"
              alt="Illustration showing no jobs available"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Heading */}
          <h3 id="no-results-title" className="text-xl font-semibold mb-2">
            No jobs found
          </h3>

          {/* Description */}
          <p className="text-sm opacity-85 max-w-md mb-4">
            We couldn’t find any jobs that match your filters. Try broadening
            your search or adjusting your filters.
          </p>

          {/* Action */}
          <Button
            type="button"
            onClick={() => window.location.reload()}
            className="bg-[var(--primary)] text-white mt-4"
          >
            Reset Filters
          </Button>
        </div>
      </section>
    </>
  );
}

export default NoJobs;
