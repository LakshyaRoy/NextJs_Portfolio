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
      id: 1,
      title: "Web Developer",
      company_name: "LifeBonder",
      icon: "LifeBonder",
      iconBg: "#383E56",
      date: "Dec 2023 to Current",
      points: [
        "Managed Lifebonder's site for optimal function and user experience. Oversaw updates, design, and performance, utilizing FileZilla FTP for precise version updates and efficient feature integration.",
        "Guided website version control, ensured accurate updates, and secure deployments via FileZilla FTP. Collaborated for streamlined procedures, maintaining current tech and content.",
      ],
    },
  ];

  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const toggleMenu = (id: number) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  return (
    <DashboardLayout>
      <div className="w-full max-w-7xl mx-auto ">
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
            <h2 className="text-lg font-semibold text-white">2 Experiences</h2>
            <Link
              href="/add/experiences"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 rounded-md px-3 py-2 transition-colors"
            >
              <IoMdAdd className="text-white" />
              <span className="text-white text-sm">Add Experiences</span>
            </Link>
          </div>

          <div className="block w-full">
            <div className="hidden md:grid grid-cols-6 gap-4 py-3 bg-[#333] font-semibold border-b border-white/10 text-sm px-5">
              <div className="text-left">S No.</div>
              <div className="text-left">Title</div>
              <div className="text-left">Company Name</div>
              <div className="text-left">Icon</div>
              <div className="text-left">Date</div>
              <div className="text-left">Actions</div>
            </div>
            {data?.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-6 gap-4 py-3 border-b border-white/10 text-sm px-5 "
              >
                <div className="text-left">{index + 1}</div>
                <div className="text-left">
                  <img
                    src={`${item.icon}`}
                    alt={item.icon}
                    className="w-10 h-10 rounded-md overflow-hidden object-cover border border-white-100"
                  />
                </div>
                <div className="text-left">{item.company_name}</div>
                <div className="text-left">{item.title}</div>
                <div className="text-left">{item.date}</div>
                <div className="hidden md:block relative">
                  <div
                    className="cursor-pointer text-white/50 hover:text-white"
                    onClick={() => toggleMenu(item?.id)}
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

export default Page;
