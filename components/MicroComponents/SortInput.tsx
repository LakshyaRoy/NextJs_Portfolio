"use client";

import React, { useState } from "react";

// Define the type for sort options
type SortOption = "newest" | "oldest" | "a-z" | "z-a";

// Define props interface
interface SortInputProps {
  onSortChange?: (sortValue: SortOption) => void;
  defaultSort?: SortOption;
  className?: string;
}

const SortInput: React.FC<SortInputProps> = ({
  onSortChange,
  defaultSort = "newest",
  className = "",
}) => {
  // Manage internal state for the selected sort option
  const [selectedSort, setSelectedSort] = useState<SortOption>(defaultSort);

  // Handle sort change
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = event.target.value as SortOption;
    setSelectedSort(newSort);
    console.log("Sort changed to:", newSort); // Debug log
    // Call the onSortChange callback if provided
    if (onSortChange) {
      onSortChange(newSort);
    }
  };

  return (
    <div className={`flex items-center gap-2 w-full ${className}`}>
      <div className="text-lg w-20 text-white-200">Sort by</div>
      <select
        name="sort"
        id="sort"
        value={selectedSort}
        onChange={handleSortChange}
        className="w-full bg-black-300 px-4 py-2 min-h-12 rounded-lg placeholder:text-white-500 text-lg text-white-800 shadow-black-200 shadow-2xl focus:outline-none"
      >
        <option value="newest" className="text-black-200">
          Newest
        </option>
        <option value="oldest" className="text-black-200">
          Oldest
        </option>
        <option value="a-z" className="text-black-200">
          A-Z
        </option>
        <option value="z-a" className="text-black-200">
          Z-A
        </option>
      </select>
    </div>
  );
};

export default SortInput;
