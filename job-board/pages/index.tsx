// pages/index.tsx
import Button from "@/components/Button";
import Carousel from "@/components/Carousel";
import FilterDrawer from "@/components/FilterDrawer";
import JobCard from "@/components/JobCard";
import SearchBar from "@/components/SearchBar";
import { useState } from "react";
import { FaSliders } from "react-icons/fa6";

export default function Home() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <div className="px-6 py-20 container mx-auto">
        {/* Header */}
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold">Browse Jobs</h2>
          <p className="opacity-80 mt-2">
            Find your next opportunity among thousands of openings.
          </p>
        </div>

        {/* Search + Filter */}
        <div className="mx-auto mt-6 flex justify-center items-center gap-2">
          <SearchBar />

          <Button onClick={() => setDrawerOpen(true)} aria-label="Open filters">
            <FaSliders size={20} />
          </Button>
        </div>

        {/* Recently Posted */}
        <Carousel title="Recently Posted" ariaLabel="recent job postings">
          {[...Array(5)].map((_, i) => (
            <li key={`recent-${i}`}>
              <JobCard />
            </li>
          ))}
        </Carousel>

        {/* Popular Jobs */}
        <Carousel title="Popular Jobs" ariaLabel="popular job postings">
          {[...Array(5)].map((_, i) => (
            <li key={`popular-${i}`}>
              <JobCard />
            </li>
          ))}
        </Carousel>

        {/* Filter Drawer */}
        <FilterDrawer
          isOpen={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        />
      </div>
    </>
  );
}
