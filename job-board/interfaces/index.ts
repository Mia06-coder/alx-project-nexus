// interfaces/index.ts
import { EmptyStateVariant } from "@/types";

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
export type ApplicationModalProps = ModalBaseProps;

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
  allJobs: JobProps[];
  id: string;
  title: string;
  subtitle?: string;
  showCount?: boolean;
}

// Represents a company associated with a job
export interface CompanyProps {
  id: number; // Unique company ID
  name: string; // Company name
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
}

export interface JobsContextType {
  jobs: JobProps[];
  featuredJobs: JobProps[];
  loading: boolean;
  error: string | null;
  refetchJobs: () => Promise<void>;
}
