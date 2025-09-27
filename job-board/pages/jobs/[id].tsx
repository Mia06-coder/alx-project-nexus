import { useRouter } from "next/router";
import { FaShareAlt, FaMapMarkerAlt, FaMoneyBillWave } from "react-icons/fa";
import Image from "next/image";
import Button from "@/components/Button";
import { useState, useEffect } from "react";
import ApplicationModal from "@/components/ApplicationModal";
import { useJobs } from "@/context/JobsContext";
import { timeAgo } from "@/utils/timeAgo";
import BackButton from "@/components/BackButton";
import { useApplications } from "@/hooks/useApplications";
import { useFavorites } from "@/hooks/useFavorites";
import SEO from "@/components/SEO";
import { DOMAIN } from "@/utils/constants";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function JobDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { jobs, loading, error } = useJobs();
  const { appliedJobs } = useApplications();
  const { addFavorite, favoriteJobs } = useFavorites();
  const [job, setJob] = useState<(typeof jobs)[0] | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Fetch job from context when jobs are loaded
  useEffect(() => {
    if (jobs.length && id) {
      const found = jobs.find((j) => j.id.toString() === id.toString());
      setJob(found || null);
    }
  }, [jobs, id]);

  if (loading) return <p className="text-center py-20">Loading job...</p>;
  if (error) return <p className="text-center py-20 text-red-500">{error}</p>;
  if (!job) return <p className="text-center py-20">Job not found</p>;

  const application = appliedJobs.find((a) => a.id === job.id);
  const favorite = favoriteJobs.find((f) => f.id === job.id);

  return (
    <>
      <SEO
        title={`${job.title} at ${job.company.name} | JobBoardX`}
        description={`Apply now for ${job.title} at ${
          job.company.name
        }. Posted on ${formatDate(
          job.created_at
        )}. Find more job opportunities on JobBoardX.`}
        url={`${DOMAIN}/${job.id}`}
        ogImage={job.company.logo || "/default-og.png"}
      />
      <main className="max-w-5xl mx-auto px-6 pt-10 pb-20">
        <BackButton />
        {/* Header */}
        <header className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <Image
              src={job.company.logo || "/assets/images/default-logo.png"}
              alt={`${job.company.name} logo`}
              width={64}
              height={64}
              className="rounded-full object-contain"
            />
            <div>
              <p className="font-semibold">{job.company.name}</p>
              <p className="flex items-center text-sm text-gray-600">
                <FaMapMarkerAlt className="mr-1" /> {job.location}
              </p>
            </div>
          </div>
          <Button
            onClick={() => alert("Shared job listing")}
            aria-label="Share job"
          >
            <FaShareAlt size={20} className="text-gray-600" />
          </Button>
        </header>

        {/* Job title */}
        <h2 className="text-2xl font-bold">{job.title}</h2>

        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-2 text-sm font-medium">
          <span>Posted {timeAgo(job.created_at)}</span>
          <span className="w-1 h-1 rounded-full bg-black"></span>
          <span>{job.mode_display}</span>
          <span className="w-1 h-1 rounded-full bg-black"></span>
          <span>{job.experience_display}</span>
        </div>
        {application && (
          <p className="opacity-75 text-xs">
            ✅ Applied on {formatDate(application.created_at)}
          </p>
        )}

        {/* Salary */}
        {job.salary && (
          <div className="flex items-center gap-2 text-sm">
            <FaMoneyBillWave className="text-green-600" />
            {job.salary}/hr
          </div>
        )}

        {/* Actions */}

        <div className="flex gap-4 mt-6 mb-10 max-w-md">
          {application ? (
            <Button className="bg-[var(--primary)] text-white flex-1" disabled>
              Applied
            </Button>
          ) : (
            <Button
              className="bg-[var(--primary)] text-white flex-1"
              onClick={() => setIsOpen(true)}
            >
              Apply Now
            </Button>
          )}

          {favorite ? (
            <Button className="border-2 border-green-600 bg-green-600 text-white flex-1">
              Saved
            </Button>
          ) : (
            <Button
              onClick={() => addFavorite(job.id)}
              className="border-2 border-[var(--primary)] text-[var(--primary)] flex-1"
            >
              Save
            </Button>
          )}
        </div>

        <ApplicationModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          job={job}
        />

        {/* Job description */}
        <section className="prose max-w-none mb-10">
          <h3 className="text-2xl font-bold mb-2">About the Job</h3>
          <p>{job.description}</p>
        </section>

        {/* Responsibilities, skills, candidate, benefits */}

        <section className="prose max-w-none mb-10">
          <h3 className="text-xl font-semibold mb-2">Responsibilities</h3>
          <ul className="list-disc list-inside">
            <li>
              Develop and maintain web applications with React and Next.js
            </li>
            <li>Collaborate with designers and backend engineers</li>
            <li>Write clean, reusable, and testable code</li>
          </ul>
        </section>

        <section className="prose max-w-none mb-10">
          <h3 className="text-xl font-semibold mb-2">Required Skills</h3>
          <ul className="list-disc list-inside">
            <li>Proficiency in React, Next.js, and TypeScript</li>
            <li>Strong understanding of Tailwind CSS</li>
            <li>Knowledge of accessibility best practices</li>
          </ul>
        </section>

        <section className="prose max-w-none mb-10">
          <h3 className="text-xl font-semibold mb-2">The Ideal Candidate</h3>
          <ul className="list-disc list-inside">
            <li>Has 3+ years of frontend experience</li>
            <li>Thrives in a collaborative environment</li>
            <li>Enjoys solving complex UI challenges</li>
          </ul>
        </section>

        <section className="prose max-w-none mb-10">
          <h3 className="text-xl font-semibold mb-2">Benefits</h3>
          <ul className="list-disc list-inside">
            <li>Health, dental, and vision insurance</li>
            <li>Flexible working hours</li>
            <li>Remote-first culture</li>
          </ul>
        </section>
      </main>
    </>
  );
}
