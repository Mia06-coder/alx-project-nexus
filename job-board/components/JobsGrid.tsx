// components/JobsGrid.tsx
import React from "react";
import JobCard from "./JobCard";
import Button from "./Button";

export default function JobsGrid() {
  return (
    <>
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
    </>
  );
}
