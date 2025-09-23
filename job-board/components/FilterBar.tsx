// components/FilterBar.tsx
import Select from "react-select"; // great for searchable dropdowns
import Button from "./Button";
import { Option } from "@/interfaces";

export default function FilterBar() {
  // Example options
  const locationOptions: Option[] = [
    { value: "san-francisco", label: "San Francisco, CA" },
    { value: "new-york", label: "New York, NY" },
    { value: "remote", label: "Remote" },
  ];

  const categoryOptions: Option[] = [
    { value: "design", label: "Design" },
    { value: "development", label: "Development" },
    { value: "marketing", label: "Marketing" },
  ];

  const expOptions: Option[] = [
    { value: "junior", label: "Junior" },
    { value: "mid", label: "Mid-level" },
    { value: "senior", label: "Senior" },
  ];

  const modeOptions: Option[] = [
    { value: "remote", label: "Remote" },
    { value: "onsite", label: "On-site" },
    { value: "hybrid", label: "Hybrid" },
  ];

  const companyOptions: Option[] = [
    { value: "nike", label: "Nike" },
    { value: "google", label: "Google" },
    { value: "microsoft", label: "Microsoft" },
  ];

  const dateOptions: Option[] = [
    { value: "any", label: "Anytime" },
    { value: "week", label: "This week" },
    { value: "month", label: "Last month" },
  ];

  const jobTypeOptions: Option[] = [
    { value: "fulltime", label: "Full-time" },
    { value: "parttime", label: "Part-time" },
    { value: "contract", label: "Contract" },
    { value: "internship", label: "Internship" },
  ];

  return (
    <form
      className="flex flex-wrap gap-4 items-center mt-15"
      aria-label="Job filters"
    >
      {/* Location Dropdown */}
      <div className="min-w-50 flex-1">
        <Select
          options={locationOptions}
          placeholder="Location"
          aria-label="Filter by location"
          isClearable
          isSearchable
        />
      </div>

      {/* Category Dropdown */}
      <div className="min-w-50 flex-1">
        <Select
          options={categoryOptions}
          placeholder="Category"
          aria-label="Filter by category"
          isClearable
          isSearchable
        />
      </div>

      {/* Experience */}
      <div className="min-w-38 flex-1">
        <Select
          options={expOptions}
          placeholder="Experience"
          aria-label="Filter by experience level"
          isClearable
        />
      </div>

      {/* Mode */}
      <div className="min-w-38 flex-1">
        <Select
          options={modeOptions}
          placeholder="Mode"
          aria-label="Filter by work mode"
          isClearable
        />
      </div>

      {/* Salary Range */}
      <div className="flex items-center gap-2 min-w-50">
        <label htmlFor="min-salary" className="sr-only">
          Minimum salary
        </label>
        <input
          id="min-salary"
          type="number"
          min={0}
          placeholder="Min"
          className="w-20 px-2 py-1 rounded-md border border-gray-300 focus:ring-2 focus:ring-[var(--primary)]"
        />
        <span>-</span>
        <label htmlFor="max-salary" className="sr-only">
          Maximum salary
        </label>
        <input
          id="max-salary"
          type="number"
          placeholder="Max"
          className="w-20 px-2 py-1 rounded-md border border-gray-300 focus:ring-2 focus:ring-[var(--primary)]"
        />
      </div>

      {/* Company */}
      <div className="min-w-50 flex-1">
        <Select
          options={companyOptions}
          placeholder="Company"
          aria-label="Filter by company"
          isClearable
          isSearchable
        />
      </div>

      {/* Date Posted */}
      <div className="min-w-38 flex-1">
        <Select
          options={dateOptions}
          placeholder="Date posted"
          aria-label="Filter by date posted"
          isClearable
        />
      </div>

      {/* Job Type */}
      <div className="min-w-38 flex-1">
        <Select
          options={jobTypeOptions}
          placeholder="Job type"
          aria-label="Filter by job type"
          isClearable
        />
      </div>

      {/* Buttons */}
      <div className="mt-6 flex gap-3 w-full">
        <Button
          type="reset"
          onClick={() => alert("Filters reset!")}
          className="flex-1/2 text-gray-600 border-2 border-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-gray-400"
        >
          RESET
        </Button>
        <Button
          type="submit"
          onClick={() => alert("Filters applied!")}
          className="bg-[var(--foreground)] text-white flex-1/2 focus:ring-[var(--foreground)]"
        >
          APPLY
        </Button>
      </div>
    </form>
  );
}
