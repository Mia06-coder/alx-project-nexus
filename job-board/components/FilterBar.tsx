// components/FilterBar.tsx
import Select from "react-select"; // great for searchable dropdowns
import Button from "./Button";
import { Option } from "@/interfaces";
import { useJobs } from "@/context/JobsContext";

export default function FilterBar() {
  const { locations, companies, filters, applyFilters, resetFilters } =
    useJobs();

  const locationOptions: Option[] = locations.map((location) => ({
    value: location.toLowerCase(),
    label: location,
  }));

  const companyOptions: Option[] = companies.map((company) => ({
    value: company.toLowerCase(),
    label: company,
  }));

  return (
    <form
      className="flex flex-wrap gap-4 items-center mt-15"
      aria-label="Job filters"
      onSubmit={(e) => {
        e.preventDefault();
        applyFilters(filters);
      }}
    >
      {/* Location Dropdown */}
      <div className="min-w-50 flex-1">
        <Select
          options={locationOptions}
          placeholder="Location"
          aria-label="Filter by location"
          value={filters.location}
          onChange={(opt) => applyFilters({ location: opt })}
          isClearable
          isSearchable
        />
      </div>

      {/* Company */}
      <div className="min-w-50 flex-1">
        <Select
          options={companyOptions}
          placeholder="Company"
          aria-label="Filter by company"
          value={filters.company}
          onChange={(opt) => applyFilters({ company: opt })}
          isClearable
          isSearchable
        />
      </div>

      {/* Buttons */}
      <div className="mt-6 flex gap-3 w-full">
        <Button
          type="reset"
          onClick={resetFilters}
          className="flex-1/2 text-gray-600 border-2 border-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-gray-400"
        >
          RESET
        </Button>
        <Button
          type="submit"
          className="bg-[var(--foreground)] text-white flex-1/2 focus:ring-[var(--foreground)]"
        >
          APPLY
        </Button>
      </div>
    </form>
  );
}
