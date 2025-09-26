import React, {
  createContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import { FavoritesContextType, FavoriteJob, JobProps } from "@/interfaces";
import { useJobs } from "./JobsContext";

export const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { jobs } = useJobs(); // All jobs from JobsContext
  const [favorites, setFavorites] = useState<FavoriteJob[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch favorites from API
  const fetchFavorites = useCallback(async (page?: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/favorites${page ? `?page=${page}` : ""}`);
      if (!res.ok) throw new Error("Failed to fetch favorites");
      const data = await res.json();
      setFavorites(data.results || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  // Add favorite
  const addFavorite = useCallback(async (jobId: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/favorites`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ job: jobId }),
      });
      if (!res.ok) throw new Error("Failed to add favorite");
      const newFav = await res.json();
      setFavorites((prev) => [...prev, newFav]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  // Remove favorite
  const removeFavorite = useCallback(async (favoriteId: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/favorites/${favoriteId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to remove favorite");
      setFavorites((prev) => prev.filter((fav) => fav.id !== favoriteId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  // Compute full job details for favorites
  const favoriteJobs: JobProps[] = useMemo(() => {
    return jobs.filter((job) =>
      favorites.some((fav) => {
        const jobString = `${job.title} - ${job.company.name}`
          .trim()
          .toLowerCase();
        const favString = (fav.job || "").trim().toLowerCase();
        return jobString === favString;
      })
    );
  }, [favorites, jobs]);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        favoriteJobs,
        loading,
        error,
        fetchFavorites,
        addFavorite,
        removeFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
