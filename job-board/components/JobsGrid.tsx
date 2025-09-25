// components/JobsGrid.tsx
import JobCard from "./JobCard";
import { JobProps } from "@/interfaces";

export default function JobsGrid({ jobs }: { jobs: JobProps[] }) {
  return (
    <>
      {/* Job grid */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mx-auto w-fit mt-5"
        role="list"
      >
        {jobs.map((job) => (
          <JobCard key={job.id} {...job} />
        ))}
      </div>
    </>
  );
}
