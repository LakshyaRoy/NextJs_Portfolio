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
  const data = [
    {
      quote:
        "Lakshya Roy has been at LifeBonder since December 4, 2023, until May 31, 2024. Lakshya has been very reliable all through his internship, and more skilled than you would expect from an intern. He has done a great job helping us improve and optimize our website. If there is something he does not know or have experience in, then he researches and finds a solution. Having Lakshya Roy with us has been a positive experience. He communicates clearly and is always responsive, something that is very important. Lakshya Roy has my warmest and sincerest recommendations.",
      author: {
        name: "Jesper Simonsen",
        designation: "Founder of LifeBonder!",
        profileImage:
          "https://images.unsplash.com/photo-1541516160071-4bb0c5af65ba?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBob3RvZ3JhcGh5fGVufDB8fDB8fHwy",
        linkedin: "https://www.linkedin.com/in/jesper-simonsen-4092915/",
      },
      reviewee: {
        name: "Lakshya Roy",
        linkedin: "https://www.linkedin.com/in/lakshya-roy729/",
      },
      id: 1,
    },
  ];
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const toggleMenu = (id: number) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };
  return (
    <DashboardLayout>
      <div className="w-full max-w-7xl mx-auto ">
        {/* Header Section */}
        <section className="mb-8 w-full h-full">
          <div className="w-full flex flex-wrap items-center justify-between gap-4">
            {/* Header Text */}
            <HeaderText name="All Testimonials" className="w-full sm:w-1/3" />
            {/* Search and Sort */}
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

        <section className="bg-[#212121] rounded-lg ">
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <h2 className="text-lg font-semibold text-white">2 Testimonials</h2>
            <Link
              href="/add/testimonials"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 rounded-md px-3 py-2 transition-colors"
            >
              <IoMdAdd className="text-white" />
              <span className="text-white text-sm">Add Testimonial</span>
            </Link>
          </div>

          <div className="block w-full">
            {/* Header */}
            <div className="hidden md:grid grid-cols-6 gap-4 py-3 bg-[#333] font-semibold border-b border-white/10 text-sm px-5">
              <div className="text-left">S No.</div>
              <div className="text-left">Image</div>
              <div className="text-left">Author Name</div>
              <div className="text-left">Author Designation</div>
              <div className="text-left">Reviewee</div>
              <div className="text-left">Actions</div>
            </div>

            {/* Data Rows */}
            {data?.map((item, index) => {
              return (
                <div key={item.id} className="w-full">
                  {/* Desktop View */}
                  <div className="relative hidden md:grid  grid-cols-6 gap-4 py-3 text-sm px-5 border-b border-white/10 last:border-b-0 items-center md:grid-cols-6 md:gap-4 ">
                    <div className="hidden md:block text-white/80">
                      {index + 1}
                    </div>
                    <div className="hidden md:block">
                      <img
                        src={item?.author?.profileImage}
                        alt={item?.author?.name}
                        className="w-10 h-10 object-cover rounded-md"
                      />
                    </div>
                    <div className="hidden md:block text-white">
                      {item?.author?.name}
                    </div>
                    <div className="hidden md:block text-white/80">
                      {item?.author?.designation}
                    </div>
                    <div className="hidden md:block text-white/80">
                      {item?.reviewee?.name}
                    </div>
                    <div className="hidden md:block relative">
                      <div
                        className="cursor-pointer text-white/50 hover:text-white"
                        onClick={() => toggleMenu(item?.id)}
                      >
                        <CiMenuKebab />
                      </div>
                    </div>
                  </div>

                  {/* Mobile View */}
                  <div className="block md:hidden w-full p-4">
                    <div className="flex items-center justify-between">
                      <div className="text-white font-semibold flex justify-start items-center gap-4 w-full">
                        <div className="w-10 h-10 overflow-hidden rounded-full bg-white border border-white-200">
                          <img
                            src={item?.author?.profileImage}
                            alt={item?.author?.name}
                            className="w-full h-full object-cover overflow-hidden"
                          />
                        </div>
                        <p className="w-full">{item?.author?.name}</p>
                      </div>
                      <div className="cursor-pointer text-white/50 hover:text-white">
                        <CiMenuKebab />
                      </div>
                    </div>
                    <div className="mt-2 text-white/80 text-sm">
                      <div>
                        <span className="font-semibold">S No:</span> {index + 1}
                      </div>
                      <div>
                        <span className="font-semibold">Reviewee:</span>{" "}
                        {item?.reviewee?.name}
                      </div>
                      <div>
                        <span className="font-semibold">Designation:</span>{" "}
                        {item?.author?.designation}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default Page;
