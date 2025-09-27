import Button from "@/components/Button";
import JobsSection from "@/components/JobsSection";
import SEO from "@/components/SEO";
import { useApplications } from "@/hooks/useApplications";
import { DOMAIN } from "@/utils/constants";
import React, { useState } from "react";

export default function AppliedJobs() {
  const { appliedJobs, loading, error } = useApplications();
  const [visibleCount, setVisibleCount] = useState(10); // initially show 10 jobs

  if (loading) {
    return (
      <p className="flex justify-center items-center min-h-screen text-center font-black">
        Loading jobs...
      </p>
    );
  }

  if (error) {
    return (
      <p
        className="flex justify-center items-center min-h-screen text-center text-red-500"
        role="alert"
      >
        {error}
      </p>
    );
  }

  return (
    <>
      <SEO
        title="My Applications | JobBoardX"
        description="Track all the jobs you’ve applied for on JobBoardX. Stay updated on your career journey."
        url={`${DOMAIN}/applied`}
      />

      <div className="px-6 py-20 container mx-auto">
        <JobsSection
          sectionJobs={appliedJobs.slice(0, visibleCount)}
          totalJobs={appliedJobs.length}
          id="job-applied"
          title="My Applications"
          subtitle="Track jobs you’ve applied to and view their status."
          variant="applied"
          showCount={true}
        />
        {visibleCount < appliedJobs.length && (
          <>
            {/* Load more */}
            <div className="flex justify-center mt-12">
              <Button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + 10)} // load 10 more each time
                className="border-2 border-[var(--primary)] text-[var(--primary)]"
              >
                Load More
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
