import { CATEGORIES, EXPERIENCE_LEVELS } from "@/constants/filters";

// types/index.ts
export type EmptyStateVariant = "saved" | "applied" | "search" | "notFound";
export type ExperienceLevel = "intern" | "entry" | "mid" | "senior" | "lead";
export type ModeType =
  | "remote"
  | "onsite"
  | "hybrid"
  | "full-time"
  | "contract"
  | "part-time";
export type SalaryCurrency = "USD" | "KES" | "NGN";
export type Category = (typeof CATEGORIES)[number];
export type ExperienceLvl = (typeof EXPERIENCE_LEVELS)[number];
