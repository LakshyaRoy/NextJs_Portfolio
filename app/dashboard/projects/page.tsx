"use client";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import HeaderText from "@/components/MicroComponents/HeaderText";
import SearchInput from "@/components/MicroComponents/SearchInput";
import SortInput from "@/components/MicroComponents/SortInput";
import Link from "next/link";
import React, { useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { FaEdit, FaTrash } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

const Page = () => {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const toggleMenu = (id: number) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  return (
    <DashboardLayout>
      <div className="w-full max-w-7xl mx-auto ">
        <section className="w-full h-full mb-8">
          <div className="w-full flex flex-wrap items-center justify-between gap-4">
            {/* Header Text */}

            <HeaderText name="All Projects" className="w-full sm:w-1/3" />
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-3/4">
              <div className="w-full sm:flex-1">
                <SearchInput />
              </div>
              <div className="w-full sm:flex-1">
                <SortInput />
              </div>
            </div>
          </div>
        </section>
        <section className="bg-[#212121] rounded-lg">
          {/* Header Section */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <h2 className="text-lg font-semibold text-white-200">Projects</h2>

            <Link
              href="/add/projects"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 rounded-md px-3 py-2 transition-colors"
            >
              <IoMdAdd className="text-white" />
              <span className="text-white text-sm">Add Project</span>
            </Link>
          </div>

          {/* Table Container */}
          <div className="w-full border border-white/10 rounded-md">
            {/* Table Head */}
            <div className="grid grid-cols-6 gap-4 py-2 font-semibold border-b border-white/10 text-sm md:text-base px-5 bg-[#333333]">
              <div className="text-left">S No.</div>
              <div className="text-left">Image</div>
              <div className="text-left">Name</div>
              <div className="text-left">Source</div>
              <div className="text-left">Website</div>
              <div className="text-left">Actions</div>
            </div>

            {/* Table Body */}
            <div className="relative grid grid-cols-6 gap-4 py-3 text-sm px-5 border-b border-white/10 last:border-b-0 items-center">
              {/* S No */}
              <div className="text-white/80">1</div>

              {/* Image */}
              <div className="text-left w-full flex items-center justify-between">
                <img
                  src="https://manage-pro.netlify.app/webpage.png"
                  alt="Disney+ Hotstar Clone"
                  className="w-10 h-10 object-cover rounded-md"
                />
              </div>

              {/* Name */}
              <div className="text-white">Disney+ Hotstar Clone</div>

              {/* Source */}
              <div className="text-white">
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
              <div className="text-white">
                <a
                  href="https://showtimeflicks.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  Visit
                </a>
              </div>
              <div className="relative">
                <div
                  className="cursor-pointer text-white/50 hover:text-white"
                  onClick={() => toggleMenu(1)}
                >
                  <CiMenuKebab />
                  <CertificateOptionsMenu
                    isOpen={null}
                    onClose={() => setOpenMenuId(1)}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

const CertificateOptionsMenu = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute right-7 md:right-20 top-0 mt-2 bg-[#333] border border-white/10 rounded-md shadow-lg z-10">
      <ul className="py-1">
        <li
          className="flex items-center gap-2 px-4 py-2 hover:bg-[#444] cursor-pointer text-white/80 hover:text-white"
          onClick={onClose}
        >
          <FaEdit /> Edit
        </li>
        <li
          className="flex items-center gap-2 px-4 py-2 hover:bg-[#444] cursor-pointer text-red-400 hover:text-red-300"
          onClick={onClose}
        >
          <FaTrash /> Delete
        </li>
      </ul>
    </div>
  );
};

export default Page;
