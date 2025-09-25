// pages/index.tsx
import Button from "@/components/Button";
import Carousel from "@/components/Carousel";
import FilterDrawer from "@/components/FilterDrawer";
import JobCard from "@/components/JobCard";
import PageHeader from "@/components/PageHeader";
import SearchBar from "@/components/SearchBar";
import { JobProps } from "@/interfaces";
import { getRandomJobs } from "@/utils/getRandomJobs";
import { useEffect, useState } from "react";
import { FaSliders } from "react-icons/fa6";

export default function Home() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [jobs, setJobs] = useState<JobProps[]>([]);
  const [featuredJobs, setFeaturedJobs] = useState<JobProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAllJobs() {
      setLoading(true);
      let allJobs: JobProps[] = [];
      let page = 1;
      let hasNext = true;

      try {
        while (hasNext) {
          const res = await fetch(`/api/jobs/?page=${page}`);
          if (!res.ok) throw new Error("Failed to fetch jobs");
          const data = await res.json();

          allJobs = [...allJobs, ...data.results];

          if (data.next) {
            page += 1;
          } else {
            hasNext = false;
          }
        }

        setJobs(allJobs);
        console.log(allJobs.length);

        // Handle featured jobs with session storage
        const storedFeatured = sessionStorage.getItem("featuredJobs");
        if (storedFeatured) {
          setFeaturedJobs(JSON.parse(storedFeatured));
        } else {
          const featured = getRandomJobs(allJobs, 5);
          setFeaturedJobs(featured);
          sessionStorage.setItem("featuredJobs", JSON.stringify(featured));
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
          console.error("Error fetching jobs:", error);
        } else {
          setError("Something went wrong");
          console.error("Unknown error:", error);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchAllJobs();
  }, []);

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
          {jobs.map((job) => (
            <li key={`recent-${job.id}`}>
              <JobCard {...job} />
            </li>
          ))}
        </Carousel>

        {/* Featured Jobs */}
        <Carousel title="Featured Jobs" ariaLabel="featured job postings">
          {featuredJobs.map((job) => (
            <li key={`popular-${job.id}`}>
              <JobCard {...job} />
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
