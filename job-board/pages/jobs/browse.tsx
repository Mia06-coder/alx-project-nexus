// pages/jobs/browse.tsx
import Button from "@/components/Button";
import FilterDrawer from "@/components/FilterDrawer";
import JobsSection from "@/components/JobsSection";
import PageHeader from "@/components/PageHeader";
import SearchBar from "@/components/SearchBar";
import { useJobs } from "@/context/JobsContext";
import React, { useState } from "react";
import { FaSliders } from "react-icons/fa6";

export default function JobsPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { filteredJobs, loading, error } = useJobs();
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
      <div className="px-6 py-20 container mx-auto">
        {/* Header */}
        <PageHeader
          title="Browse Jobs"
          subtitle="Find your next opportunity among thousands of openings."
        />
        {/* Search + Filter */}
        <div className="mx-auto mt-6 flex justify-center items-center gap-2">
          <SearchBar />

          <Button onClick={() => setDrawerOpen(true)} aria-label="Open filters">
            <FaSliders size={20} />
          </Button>
        </div>

        <JobsSection
          sectionJobs={filteredJobs.slice(0, visibleCount)}
          totalJobs={filteredJobs.length}
          id="job-results"
          title="Job Results"
          variant="search"
          showCount={true}
        />

        {visibleCount < filteredJobs.length && (
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

        {/* Filter Drawer */}
        <FilterDrawer
          isOpen={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        />
      </div>
    </>
  );
}
