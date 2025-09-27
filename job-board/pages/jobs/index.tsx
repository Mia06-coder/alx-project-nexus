// jobs/index.tsx
import Button from "@/components/Button";
import Carousel from "@/components/Carousel";
import FilterDrawer from "@/components/FilterDrawer";
import JobCard from "@/components/JobCard";
import PageHeader from "@/components/PageHeader";
import SearchBar from "@/components/SearchBar";
import SEO from "@/components/SEO";
import { useJobs } from "@/context/JobsContext";
import { DOMAIN } from "@/utils/constants";
import { useState } from "react";
import { FaSliders } from "react-icons/fa6";

export default function Home() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { jobs, featuredJobs, loading, error } = useJobs();

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

  if (jobs.length === 0) {
    return (
      <p
        className="flex justify-center items-center min-h-screen text-center text-gray-600"
        role="status"
      >
        No jobs available right now.
      </p>
    );
  }

  return (
    <>
      <SEO
        title="Browse Jobs | JobBoardX"
        description="Discover the latest job opportunities across industries. Filter, search, and apply to jobs directly on JobBoardX."
        url={`${DOMAIN}/jobs`}
      />

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

        {/* Recently Posted */}
        <Carousel title="Recently Posted" ariaLabel="recent job postings">
          {jobs.slice(0, 10).map((job) => (
            <li key={`recent-${job.id}`} className="flex">
              <JobCard job={job} />
            </li>
          ))}
        </Carousel>

        {/* Featured Jobs */}
        <Carousel title="Featured Jobs" ariaLabel="featured job postings">
          {featuredJobs.map((job) => (
            <li key={`popular-${job.id}`} className="flex">
              <JobCard job={job} />
            </li>
          ))}
        </Carousel>

        {/* Browse All */}
        <div className="flex justify-center mt-12">
          <Button
            type="button"
            onClick={() => (window.location.href = "/jobs/browse")}
            className="border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white"
          >
            Browse All Jobs
          </Button>
        </div>

        {/* Filter Drawer */}
        <FilterDrawer
          isOpen={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        />
      </div>
    </>
  );
}
