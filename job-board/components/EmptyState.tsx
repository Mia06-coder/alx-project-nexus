// components/EmptyState.tsx
import Image from "next/image";
import { EmptyStateProps } from "@/interfaces";
import Button from "./Button";
import { EmptyStateVariant } from "@/types";

const VARIANT_DATA: Record<
  EmptyStateVariant,
  {
    imageSrc: string;
    imageAlt: string;
    heading: string;
    description: string;
    actionLabel?: string;
  }
> = {
  saved: {
    imageSrc: "/assets/illustrations/no-saved-jobs.svg",
    imageAlt: "Illustration showing no saved jobs",
    heading: "No saved jobs yet",
    description:
      "You haven’t saved any jobs. Start exploring opportunities and click the bookmark icon to keep track of roles that interest you.",

    actionLabel: "Browse Jobs",
  },
  applied: {
    imageSrc: "/assets/illustrations/no-applications.svg",
    imageAlt: "Illustration showing no applications",
    heading: "No applications yet",
    description:
      "You haven’t applied for any jobs. Once you apply, your applications will appear here so you can track their progress.",
    actionLabel: "Find a job to apply",
  },
  search: {
    imageSrc: "/assets/illustrations/no-jobs.svg",
    imageAlt: "Illustration showing no search results",
    heading: "No jobs found",
    description:
      "We couldn’t find any jobs that match your filters. Try broadening your search or adjusting your filters.",
  },
};

export default function EmptyState({
  variant,
  onActionClick,
}: EmptyStateProps) {
  const data = VARIANT_DATA[variant];

  return (
    <div className="flex flex-col justify-center items-center text-center">
      {/* Illustration */}
      <div className="relative w-full max-w-xs aspect-square mb-4">
        <Image
          src={data.imageSrc}
          alt={data.imageAlt}
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Heading */}
      <h2 className="text-3xl font-bold mb-2">{data.heading}</h2>

      {/* Description */}
      <p className="opacity-85 max-w-md mb-4">{data.description}</p>

      {/* Optional Action */}
      {data.actionLabel && onActionClick && (
        <Button
          type="button"
          onClick={onActionClick}
          className="bg-[var(--primary)] text-base text-white mt-4"
        >
          {data.actionLabel}
        </Button>
      )}
    </div>
  );
}
