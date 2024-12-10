"use client";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import Link from "next/link";
import { CiMenuKebab, CiSearch } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";

const Certificates = () => {
  return (
    <DashboardLayout>
      <main className="w-full h-full flex items-center justify-center flex-col gap-5">
        <section className="w-full h-full mb-10">
          <div className="flex flex-col sm:flex-row items-center sm:justify-between w-full gap-4 sm:gap-0">
            <div className="text-lg sm:text-2xl font-semibold bg-gradient-to-r from-[#BEC1CF] via-[#D5D8EA] to-[#D5D8EA] bg-clip-text text-transparent relative z-10 w-full sm:w-1/3 text-center sm:text-left">
              All Certificates
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-5 w-full sm:w-2/3">
              {/* Search Input */}
              <div className="relative w-full sm:w-[40%]">
                <input
                  type="search"
                  className="w-full bg-black-300 pl-8 pr-5 py-2 min-h-12 rounded-lg placeholder:text-white-500 text-lg text-white-800 shadow-black-200 shadow-2xl focus:outline-none"
                  placeholder="Search"
                />
                <CiSearch className="absolute left-2 top-[14px] text-white/50 text-xl" />
              </div>
              {/* Sort Dropdown */}
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
            </div>
          </div>
        </section>
        {/* table */}
        <section className="w-full h-full mb-10 bg-[#212121] rounded-lg  px-5 py-3">
          <div className="w-full flex items-center justify-between py-2">
            <h2 className="text-lg font-semibold text-white-200">
              12 Certificates
            </h2>
            <div className="flex items-center gap-2 border border-white/10 rounded-md px-2 py-2 hover:bg-black-300">
              <Link
                href={"/add/certificates"}
                className="flex items-center gap-2"
              >
                <IoMdAdd />
                <span className="text-white-200">Add Certificate</span>
              </Link>
            </div>
          </div>
          <div className="w-full border border-white/10 rounded-md ">
            {/* Table Container */}
            <div className="grid grid-cols-5 gap-4 py-2 font-semibold border-b border-white/10 text-sm md:text-base px-5">
              <div className="text-left">S No.</div>
              <div className="text-left">Image</div>
              <div className="text-left">Name</div>
              <div className="text-left">Source</div>
              <div className="text-left">Date</div>
            </div>
            {/* Table Body */}
            <div className="grid grid-cols-5 gap-4 py-2 text-sm md:text-base px-5">
              <div className="text-left">1</div>
              <div className="text-left">Image</div>
              <div className="text-left">Technical Club</div>
              <div className="text-left">Bit Mesra</div>
              <div className="text-left flex items-center justify-between">
                <p className="text-left">Date</p>
                <div className="cursor-pointer text-white-200">
                  <CiMenuKebab />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </DashboardLayout>
  );
};

export default Certificates;
