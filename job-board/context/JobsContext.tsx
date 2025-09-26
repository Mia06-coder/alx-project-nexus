// context/JobsContext.tsx
import { CATEGORIES, EXPERIENCE_LEVELS } from "@/constants/filters";
import { Filters, JobProps, JobsContextType } from "@/interfaces";
import { getRandomJobs } from "@/utils/getRandomJobs";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const JobsContext = createContext<JobsContextType | undefined>(undefined);

export function JobsProvider({ children }: { children: ReactNode }) {
  const [jobs, setJobs] = useState<JobProps[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<JobProps[]>([]);
  const [featuredJobs, setFeaturedJobs] = useState<JobProps[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [companies, setCompanies] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [experienceLvls, setExperienceLvls] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<Filters>({
    location: null,
    company: null,
    category: null,
    experienceLvl: null,
  });

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
      setFilteredJobs(allJobs);

      const uniqueLocations = [
        ...new Set(allJobs.map((job: JobProps) => job.location)),
      ];
      const uniqueCompanies = [
        ...new Set(allJobs.map((job: JobProps) => job.company.name)),
      ];

      setLocations(uniqueLocations);
      setCompanies(uniqueCompanies);
      setCategories([...CATEGORIES]);
      setExperienceLvls([...EXPERIENCE_LEVELS]);

      // Handle featured jobs (session cached)
      const storedFeatured = sessionStorage.getItem("featuredJobs");
      if (storedFeatured) {
        setFeaturedJobs(JSON.parse(storedFeatured));
      } else {
        const featured = getRandomJobs(allJobs, 5);
        setFeaturedJobs(featured);
        sessionStorage.setItem("featuredJobs", JSON.stringify(featured));
      }

      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  // Apply filters locally
  function applyFilters(newFilters: Partial<Filters>) {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);

    const filtered = jobs.filter((job) => {
      const matchesLocation = updatedFilters.location
        ? job.location
            ?.toLowerCase()
            .includes(updatedFilters.location.value.toLowerCase())
        : true;

      const matchesCompany = updatedFilters.company
        ? job.company?.name.toLowerCase() ===
          updatedFilters.company.value.toLowerCase()
        : true;

      const matchesCategory = updatedFilters.category
        ? job.category
            ?.toLowerCase()
            .includes(updatedFilters.category.value.toLowerCase())
        : true;

      const matchesExperienceLevel = updatedFilters.experienceLvl
        ? job.experience
            ?.toLowerCase()
            .includes(updatedFilters.experienceLvl.value.toLowerCase())
        : true;

      return (
        matchesLocation &&
        matchesCompany &&
        matchesCategory &&
        matchesExperienceLevel
      );
    });

    setFilteredJobs(filtered);
  }

  function resetFilters() {
    setFilters({
      location: null,
      company: null,
      category: null,
      experienceLvl: null,
    });
    setFilteredJobs(jobs);
  }

  useEffect(() => {
    fetchAllJobs();

    // periodic refresh every 5 mins
    const interval = setInterval(() => fetchAllJobs(), 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <JobsContext.Provider
      value={{
        jobs,
        filteredJobs,
        featuredJobs,
        locations,
        companies,
        categories,
        experienceLvls,
        loading,
        error,
        filters,
        applyFilters,
        resetFilters,
        refetchJobs: fetchAllJobs,
      }}
    >
      {children}
    </JobsContext.Provider>
  );
}

export function useJobs() {
  const context = useContext(JobsContext);
  if (!context) throw new Error("useJobs must be used inside JobsProvider");
  return context;
}
