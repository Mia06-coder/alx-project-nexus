// interfaces/index.ts
import {
  EmptyStateVariant,
  ExperienceLevel,
  ModeType,
  SalaryCurrency,
} from "@/types";

// interfaces/Index.ts
export interface PillProps {
  text: string;
  className?: string;
}

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}

export interface CarouselProps {
  title: string;
  ariaLabel: string;
  children: React.ReactNode;
}

export interface Option {
  value: string;
  label: string;
}

// Base interface for shared props
interface ModalBaseProps {
  isOpen: boolean;
  onClose: () => void;
}

export type FilterDrawerProps = ModalBaseProps;
export interface ApplicationModalProps extends ModalBaseProps {
  job: JobProps;
}

export interface ShareButtonProps {
  url: string;
  title: string;
  text?: string;
}

export interface EmptyStateProps {
  variant: EmptyStateVariant;
  onActionClick?: () => void;
}

export interface PageHeaderProps {
  title: string;
  subtitle: string;
}

export interface JobsSectionProps {
  sectionJobs: JobProps[];
  totalJobs: number;
  id: string;
  title: string;
  subtitle?: string;
  variant: EmptyStateVariant;
  showCount?: boolean;
}

// Represents a company associated with a job
export interface CompanyProps {
  id: number; // Unique company ID
  name: string; // Company name
  logo?: string;
  description: string; // Company description
  website?: string; // Optional company website
  owner: number; // Owner of the company
  created_at: string; // ISO timestamp when company was created
}

// Represents a job listing
export interface JobProps {
  id: number; // Unique job ID (read-only from API)
  title: string; // Job title (max 200 chars)
  description: string; // Job description
  company: CompanyProps; // Company details
  location: string; // Job location (max 100 chars)
  posted_by: string; // User who posted the job (read-only from API)
  created_at: string; // ISO timestamp (read-only)
  updated_at: string; // ISO timestamp (read-only)
  is_active: boolean; // Job status (active/inactive)
  experience: ExperienceLevel;
  min_experience_years: number | null;
  max_experience_years: number | null;
  mode: ModeType;
  salary: number | null;
  salary_currency: SalaryCurrency;
  category: string;
  experience_display: string;
  mode_display: string;
  salary_currency_display: string;
}

export interface Filters {
  location: Option | null;
  company: Option | null;
  category: Option | null;
  experienceLvl: Option | null;
}

export interface JobsContextType {
  jobs: JobProps[];
  filteredJobs: JobProps[];
  featuredJobs: JobProps[];
  locations: string[];
  companies: string[];
  categories: string[];
  experienceLvls: string[];
  loading: boolean;
  error: string | null;
  filters: Filters;
  applyFilters: (newFilters: Partial<Filters>) => void;
  resetFilters: () => void;
  refetchJobs: () => Promise<void>;
}

export interface Application {
  id: number;
  job: number;
  applicant: string;
  cover_letter: string;
  status: string;
  created_at: string;
}

export interface ApplicationsContextType {
  applications: Application[];
  appliedJobIds: string[]; // store job IDs only
  appliedJobs: JobProps[]; // derived from JobsContext
  loading: boolean;
  error: string | null;
  fetchApplications: () => void;
  applyToJob: (jobId: number, resume: string, cover_letter: string) => void;
  removeApplication: (jobId: number) => void;
  clearApplications: () => void;
}
