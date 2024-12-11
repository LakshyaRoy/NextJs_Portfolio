import React from "react";
import { CiSearch } from "react-icons/ci";

const SearchInput = () => {
  return (
    <div className="relative w-full sm:w-[40%]">
      <input
        type="search"
        className="w-full bg-black-300 pl-8 pr-5 py-2 min-h-12 rounded-lg placeholder:text-white-500 text-lg text-white-800 shadow-black-200 shadow-2xl focus:outline-none"
        placeholder="Search"
      />
      <CiSearch className="absolute left-2 top-[14px] text-white/50 text-xl" />
    </div>
  );
};

export default SearchInput;
