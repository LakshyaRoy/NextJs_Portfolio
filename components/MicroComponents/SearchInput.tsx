"use client";

import React, { useState, ChangeEvent } from "react";
import { CiSearch } from "react-icons/ci";

// Define props interface
interface SearchInputProps {
  onSearch?: (searchTerm: string) => void;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  onSearch,
  placeholder = "Search",
  defaultValue = "",
  className = "",
}) => {
  // Manage internal state for the search input
  const [searchTerm, setSearchTerm] = useState<string>(defaultValue);

  // Handle input change
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);

    // Call the onSearch callback if provided
    if (onSearch) {
      onSearch(value);
    }
  };

  // Handle clear search

  return (
    <div className={`relative w-full ${className}`}>
      <input
        type="search"
        value={searchTerm}
        onChange={handleInputChange}
        className="w-full bg-black-300 pl-8 pr-5 py-2 min-h-12 rounded-lg placeholder:text-white-500 text-lg text-white-800 shadow-black-200 shadow-2xl focus:outline-none"
        placeholder={placeholder}
      />
      <CiSearch className="absolute left-2 top-[14px] text-white/50 text-xl" />
    </div>
  );
};

export default SearchInput;
