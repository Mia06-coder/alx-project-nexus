import Button from "@/components/Button";
import JobsSection from "@/components/JobsSection";
import SEO from "@/components/SEO";
import Spinner from "@/components/Spinner";
import { useFavorites } from "@/hooks/useFavorites";
import { DOMAIN } from "@/utils/constants";
import React, { useState } from "react";

export default function FavoriteJobs() {
  const { favoriteJobs, loading, error } = useFavorites();
  const [visibleCount, setVisibleCount] = useState(10); // initially show 10 jobs

  if (loading) return <Spinner />;

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
      {" "}
      <SEO
        title="My Favorite Jobs | JobBoardX"
        description="View and manage your saved jobs. Revisit opportunities you love and apply anytime on JobBoardX."
        url={`${DOMAIN}/favorites`}
      />
      <div className="px-6 py-20 container mx-auto">
        <JobsSection
          sectionJobs={favoriteJobs.slice(0, visibleCount)}
          totalJobs={favoriteJobs.length}
          id="favorites-jobs"
          title="Favorite Jobs"
          subtitle="Jobs you’ve saved for later."
          variant="saved"
          showCount={true}
        />
        {visibleCount < favoriteJobs.length && (
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
      </div>
    </>
  );
}
