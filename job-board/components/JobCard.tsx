// components/JobCard.tsx
import Image from "next/image";
import { FaRegBookmark } from "react-icons/fa";
import Pill from "./Pill";
import Button from "./Button";
import { JobProps } from "@/interfaces";
import { timeAgo } from "@/utils/timeAgo";
import { useRouter } from "next/router";

export default function JobCard({ job }: { job: JobProps }) {
  const router = useRouter();
  return (
    <>
      {/* Glass card */}
      <article
        className="relative z-10 shrink-0 min-w-65 overflow-hidden rounded-2xl bg-white backdrop-blur-xl border border-gray-200 shadow-lg shadow-black/30
        [box-shadow:inset_1px_1px_2px_rgba(255,255,255,0.3)]
      "
        aria-labelledby="job-title"
        aria-describedby="job-meta"
        role="region"
      >
        <div className="bg-gradient-to-br from-[var(--primary)]/80 via-transparent to-[var(--secondary)]/60 p-6">
          {/* Top row: salary + bookmark */}
          <div className="flex justify-between items-center">
            {job.salary ? (
              <span className="text-sm font-semibold opacity-90">
                {job.salary_currency}
                {job.salary}/hr
              </span>
            ) : (
              <span></span>
            )}
            <Button
              className="opacity-70 pr-0"
              aria-label="Save job for later"
              aria-pressed="false"
            >
              <FaRegBookmark size={16} aria-hidden="true" />
            </Button>
          </div>
          {/* Company logo + name + category + job title */}
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
              <Image
                src="/assets/images/default-logo.png"
                alt="Nike company logo"
                className="object-contain "
                fill
                sizes="32px"
                priority
              />
            </div>
            <div>
              <h4 id="job-title" className="font-bold mt-3">
                {job.title}
              </h4>
              <p id="job-meta" className="text-sm flex flex-col">
                {job.company.name}
                <span className="text-xs opacity-90">{job.location}</span>
                <span className="text-xs opacity-70">{job.category}</span>
              </p>
            </div>
          </div>
          {/* Tags */}
          <ul className="flex flex-wrap gap-2 mt-2" aria-label="Job tags">
            <li>
              <Pill
                text={job.mode_display}
                className=" bg-white/20 backdrop-blur-md border border-white/30 text-gray-900 shadow-sm
  [box-shadow:inset_1px_1px_2px_rgba(255,255,255,0.4)]"
              />
            </li>
            <li>
              <Pill
                text={job.experience_display}
                className=" bg-white/20 backdrop-blur-md border border-white/30 text-gray-900 shadow-sm
  [box-shadow:inset_1px_1px_2px_rgba(255,255,255,0.4)]"
              />
            </li>
          </ul>
        </div>

        {/* Bottom row: date + CTA */}
        <div className="flex justify-between items-center p-6">
          <time className="text-xs opacity-70" dateTime="2025-09-15">
            Posted {timeAgo(job.created_at)}
          </time>

          <Button
            onClick={() => router.push(`/jobs/${job.id}`)}
            className=" bg-[var(--foreground)] text-white text-xs shadow"
            aria-label={`Apply for ${job.title} role at ${job.company.name}`}
          >
            View Details
          </Button>
        </div>
      </article>
    </>
  );
}
