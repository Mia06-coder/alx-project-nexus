// components/SearchBar.tsx
import { FaSearch } from "react-icons/fa";

export default function SearchBar() {
  return (
    <form
      role="search"
      aria-label="Job search"
      className="flex items-center gap-2 bg-white rounded-xl p-3 shadow-sm w-full max-w-lg"
    >
      {/* Search icon */}
      <FaSearch className="text-gray-500" aria-hidden="true" />

      {/* Input field */}
      <input
        type="search"
        name="search"
        placeholder="Search jobs, companies, or keywords..."
        className="flex-1 outline-none text-gray-700 placeholder-gray-400"
        aria-label="Search jobs"
      />
    </form>
  );
}
