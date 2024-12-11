"use client";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import HeaderText from "@/components/MicroComponents/HeaderText";
import SearchInput from "@/components/MicroComponents/SearchInput";
import SortInput from "@/components/MicroComponents/SortInput";
import Link from "next/link";
import { CiMenuKebab, CiSearch } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";

const Certificates = () => {
  return (
    <DashboardLayout>
      <main className="w-full h-full flex items-center justify-center flex-col gap-5">
        <section className="w-full h-full mb-10">
          <div className="flex flex-col sm:flex-row items-center sm:justify-between w-full gap-4 sm:gap-0">
            {/* Header Text */}
            <HeaderText name={"All Certificates"} />
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-5 w-full sm:w-2/3">
              {/* Search Input */}
              <SearchInput />
              {/* Sort Dropdown */}
              <SortInput />
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
            <div className="grid grid-cols-5 gap-4 py-2 bg-[#333] font-semibold border-b border-white/10 text-sm md:text-base px-5">
              <div className="text-left">S No.</div>
              <div className="text-left">Image</div>
              <div className="text-left">Name</div>
              <div className="text-left">Source</div>
              <div className="text-left">Date</div>
            </div>
            {/* Table Body */}
            <div className="grid grid-cols-5 gap-4 py-2 text-sm md:text-base px-5">
              <div className="text-left  w-full flex items-center justify-between">
                1
              </div>
              <div className="text-left w-full flex items-center justify-between">
                <img
                  src="https://manage-pro.netlify.app/webpage.png"
                  alt="Disney+ Hotstar Clone"
                  className="w-10 h-10 object-cover rounded-md"
                />
              </div>
              <div className="text-left  w-full flex items-center justify-between">
                Technical Club
              </div>
              <div className="text-left  w-full flex items-center justify-between">
                Bit Mesra
              </div>
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
