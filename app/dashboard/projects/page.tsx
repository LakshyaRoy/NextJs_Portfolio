import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import HeaderText from "@/components/MicroComponents/HeaderText";
import SearchInput from "@/components/MicroComponents/SearchInput";
import SortInput from "@/components/MicroComponents/SortInput";
import Link from "next/link";
import React from "react";
import { CiMenuKebab } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";

const page = () => {
  return (
    <DashboardLayout>
      <main className="w-full h-full flex items-center justify-center flex-col gap-5">
        <section className="w-full h-full mb-10">
          <div className="flex flex-col sm:flex-row items-center sm:justify-between w-full gap-4 sm:gap-0">
            {/* Header Text */}
            <HeaderText name={"All Projects"} />
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-5 w-full sm:w-2/3">
              {/* Search Input */}
              <SearchInput />
              {/* Sort Dropdown */}
              <SortInput />
            </div>
          </div>
        </section>

        <section className="w-full h-full mb-10 bg-[#212121] rounded-lg px-5 py-3">
          {/* Header Section */}
          <div className="w-full flex items-center justify-between py-2">
            <h2 className="text-lg font-semibold text-white-200">Projects</h2>
            <div className="flex items-center gap-2 border border-white/10 rounded-md px-2 py-2 hover:bg-black-300">
              <Link href={"/add/projects"} className="flex items-center gap-2">
                <IoMdAdd />
                <span className="text-white-200">Add Project</span>
              </Link>
            </div>
          </div>

          {/* Table Container */}
          <div className="w-full border border-white/10 rounded-md">
            {/* Table Head */}
            <div className="grid grid-cols-5 gap-4 py-2 font-semibold border-b border-white/10 text-sm md:text-base px-5 bg-[#333333]">
              <div className="text-left">S No.</div>
              <div className="text-left">Image</div>
              <div className="text-left">Name</div>
              <div className="text-left">Source</div>
              <div className="text-left">Website</div>
            </div>

            {/* Table Body */}
            <div className="grid grid-cols-5 gap-4 py-2 text-sm md:text-base px-5 bg-[#212121]">
              {/* S No */}
              <div className="text-left w-full flex items-center justify-between">
                1
              </div>

              {/* Image */}
              <div className="text-left w-full flex items-center justify-between">
                <img
                  src="https://manage-pro.netlify.app/webpage.png"
                  alt="Disney+ Hotstar Clone"
                  className="w-10 h-10 object-cover rounded-md"
                />
              </div>

              {/* Name */}
              <div className="text-left w-full flex items-center justify-between">
                Disney+ Hotstar Clone
              </div>

              {/* Source */}
              <div className="text-left w-full flex items-center justify-between">
                <a
                  href="https://github.com/LakshyaRoy/DisneyPlus-Clone"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  Source Code
                </a>
              </div>

              {/* Website */}
              <div className="text-left w-full flex items-center justify-between">
                <a
                  href="https://showtimeflicks.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  Visit
                </a>
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

export default page;
