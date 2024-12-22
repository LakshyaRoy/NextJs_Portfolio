"use client";

import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import HeaderText from "@/components/MicroComponents/HeaderText";
import SearchInput from "@/components/MicroComponents/SearchInput";
import SortInput from "@/components/MicroComponents/SortInput";
import Link from "next/link";
import React, { useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
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
          <div className="flex flex-wrap items-center justify-between p-4 border-b border-white/10">
            <h2 className="text-lg font-semibold text-white">TechStack</h2>
            <Link
              href="/add/techstack"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 rounded-md px-3 py-2 transition-colors"
            >
              <IoMdAdd className="text-white" />
              <span className="text-white text-sm">Add TechStack</span>
            </Link>
          </div>

          <div className=" hidden sm:block w-full border border-white/10 rounded-md overflow-x-auto">
            <div className="grid grid-cols-5 gap-4 py-2 font-semibold border-b border-white/10 text-sm md:text-base px-5 bg-[#333333] min-w-[640px]">
              <div className="text-left">S No.</div>
              <div className="text-left">Name</div>
              <div className="text-left">Image</div>
              <div className="text-left">Description</div>
              <div className="text-left">Actions</div>
            </div>

            {data?.map((data, i) => {
              return (
                <div
                  key={i}
                  className="relative grid grid-cols-5 gap-4 py-3 text-sm px-5 border-b border-white/10 last:border-b-0 items-center min-w-[640px]"
                >
                  <div className="text-white/80">{i + 1}</div>
                  <div className="text-left text-white/80">{data.name}</div>
                  <div className="text-left text-white/80">{data.image}</div>
                  <div className="text-left text-white/80">
                    {data.description}
                  </div>
                  <div className="text-left flex items-center gap-2 justify-start w-full ">
                    <CiMenuKebab className="text-white/80 cursor-pointer hover:text-white " />
                  </div>
                </div>
              );
            })}
          </div>

          {/* mobile */}
          <div className="block sm:hidden">
            {data.map((data, i) => (
              <div key={i} className="p-4 border-b border-white/10 relative">
                <div className="flex items-center space-x-4">
                  <img
                    src={data.image}
                    alt={data.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-grow">
                    <h3 className="text-white font-semibold">{data.name}</h3>
                    <p className="text-white/50 text-sm">{data.name}</p>
                    <p className="text-white/50 text-sm">{data.description}</p>
                  </div>
                  <div
                    className="cursor-pointer text-white/50 hover:text-white relative "
                    onClick={() => toggleMenu(i)}
                  >
                    <CiMenuKebab />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

const data = [
  {
    name: "React JS",
    description: "JavaScript Library",
    image: "image",
  },
  {
    name: "React JS",
    description: "JavaScript Library",
    image: "image",
  },
];
export default Page;
