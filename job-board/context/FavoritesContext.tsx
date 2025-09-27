// context/FavoritesContext.tsx
import React, {
  createContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import {
  FavoritesContextType,
  FavoriteJob,
  JobProps,
  NormalizedFavoriteJob,
} from "@/interfaces";
import { useJobs } from "./JobsContext";

export const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { jobs } = useJobs(); // All jobs from JobsContext
  const [favorites, setFavorites] = useState<NormalizedFavoriteJob[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch favorites from API
  const fetchFavorites = useCallback(
    async (page?: number) => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/favorites${page ? `?page=${page}` : ""}`);
        if (!res.ok) throw new Error("Failed to fetch favorites");
        const data = await res.json();

        const nomarlized: NormalizedFavoriteJob[] = (data.results || []).map(
          (fav: FavoriteJob) => {
            const matchedJob = jobs.find(
              (job) =>
                `${job.title} - ${job.company.name}`.toLowerCase() ===
                (fav.job || "").toLowerCase()
            );
            return {
              id: fav.id,
              jobId: matchedJob ? matchedJob.id : -1,
              user: fav.user,
              created_at: fav.created_at,
            };
          }
        );

        setFavorites(nomarlized);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    },
    [jobs]
  );

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
        body: JSON.stringify({ job_id: jobId }),
      });
      if (!res.ok) throw new Error("Failed to add favorite");
      const newFav = await res.json();

      const normalized: NormalizedFavoriteJob = {
        id: newFav.id,
        jobId,
        user: newFav.user,
        created_at: newFav.created_at,
      };

      setFavorites((prev) => [...prev, normalized]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  // Remove favorite
  const removeFavorite = useCallback(
    async (jobId: number) => {
      const favorite = favorites.find((f) => f.jobId === jobId);
      if (!favorite) return; // Not in favorites

      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/favorites/${favorite.id}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Failed to remove favorite");
        setFavorites((prev) => prev.filter((fav) => fav.id !== favorite.id));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    },
    [favorites]
  );

  // Check if a job is favorited
  const isFavorite = useCallback(
    (jobId: number) => favorites.some((f) => f.jobId === jobId),
    [favorites]
  );

  // Compute full job details for favorites
  const favoriteJobs: JobProps[] = useMemo(() => {
    return jobs.filter((job) => favorites.some((fav) => fav.jobId === job.id));
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
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
