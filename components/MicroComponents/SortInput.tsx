import React from "react";

const SortInput = () => {
  return (
    <div className="flex items-center gap-2 w-full sm:w-1/2">
      <div className="text-lg w-20 text-white-200">Sort by</div>
      <select
        name="sort"
        id="sort"
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
