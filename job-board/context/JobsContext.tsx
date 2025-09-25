// context/JobsContext.tsx
import { JobProps, JobsContextType } from "@/interfaces";
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
  const [featuredJobs, setFeaturedJobs] = useState<JobProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

      // Handle featured jobs (session cached)
      const storedFeatured = sessionStorage.getItem("featuredJobs");
      if (storedFeatured) {
        setFeaturedJobs(JSON.parse(storedFeatured));
      } else {
        const featured = getRandomJobs(allJobs, 5);
        setFeaturedJobs(featured);
        sessionStorage.setItem("featuredJobs", JSON.stringify(featured));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAllJobs();

    // periodic refresh every 5 mins
    const interval = setInterval(() => fetchAllJobs(), 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <JobsContext.Provider
      value={{ jobs, featuredJobs, loading, error, refetchJobs: fetchAllJobs }}
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
