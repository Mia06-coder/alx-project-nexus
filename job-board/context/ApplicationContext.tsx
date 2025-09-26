import { Application, ApplicationsContextType } from "@/interfaces";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useJobs } from "./JobsContext";

export const ApplicationsContext = createContext<
  ApplicationsContextType | undefined
>(undefined);

export function ApplicationProvider({ children }: { children: ReactNode }) {
  const { jobs } = useJobs(); // All jobs from JobsContext
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /*
   * Fetch all applications from backend
   */
  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/applications");
      if (!res.ok) throw new Error("Failed to fetch applications");
      const data = await res.json();
      setApplications(data.results || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  /**
   * Apply to a job
   */
  const applyToJob = useCallback(
    async (jobId: number, resume: string, cover_letter: string) => {
      try {
        const res = await fetch("/api/applications", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ job: jobId, resume, cover_letter }),
        });

        if (!res.ok) throw new Error("Failed to apply");

        const newApp = await res.json();
        setApplications((prev) => [...prev, newApp]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      }
    },
    []
  );

  /**
   * Remove an application (local only, DELETE API inexistent)
   */
  const removeApplication = useCallback((appId: number) => {
    setApplications((prev) => prev.filter((app) => app.id !== appId));
  }, []);

  /**
   * Clear all locally (useful for logout)
   */
  const clearApplications = useCallback(() => {
    setApplications([]);
  }, []);

  /**
   * Map applications to jobs
   */
  const appliedJobIds = applications.map((a) => a.job.toString());
  const appliedJobs = jobs.filter((job) =>
    appliedJobIds.includes(job.id.toString())
  );

  return (
    <ApplicationsContext.Provider
      value={{
        applications,
        appliedJobIds,
        appliedJobs,
        loading,
        error,
        fetchApplications,
        applyToJob,
        removeApplication,
        clearApplications,
      }}
    >
      {children}
    </ApplicationsContext.Provider>
  );
}
