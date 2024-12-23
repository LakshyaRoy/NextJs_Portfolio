"use client";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import HeaderText from "@/components/MicroComponents/HeaderText";
import SearchInput from "@/components/MicroComponents/SearchInput";
import SortInput from "@/components/MicroComponents/SortInput";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CiMenuKebab, CiSearch } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useStore } from "@/zustand/store";

// Mock data - replace with actual data fetching logic
const certificateData = [
  {
    id: 1,
    image: "https://manage-pro.netlify.app/webpage.png",
    name: "Technical Club",
    source: "Bit Mesra",
    date: "Jan 2023",
  },
  {
    id: 2,
    image: "https://manage-pro.netlify.app/webpage.png",
    name: "Technical Club",
    source: "Bit Mesra",
    date: "Jan 2023",
  },
  {
    id: 3,
    image: "https://manage-pro.netlify.app/webpage.png",
    name: "Technical Club",
    source: "Bit Mesra",
    date: "Jan 2023",
  },
];

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

const Certificates = () => {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const {
    certificate,
    techstack,
    experience,
    testimonial,
    projects,
    fetchData,
  } = useStore();

  useEffect(() => {
    if (
      !certificate.data.length ||
      !techstack.data.length ||
      !experience.data.length ||
      !testimonial.data.length ||
      !projects.data.length
    )
      fetchData();
  }, []);

  const { data, loading } = certificate;

  const toggleMenu = (id: number) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  return (
    <DashboardLayout>
      <div className="w-full max-w-7xl mx-auto">
        {/* Header Section */}
        <section className="mb-8 w-full h-full">
          <div className="w-full flex flex-wrap items-center justify-between gap-4">
            {/* Header Text */}
            <HeaderText name="All Certificates" className="w-full sm:w-1/3" />
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

        {/* Certificates Section */}
        <section className="bg-[#212121] rounded-lg ">
          {/* Section Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <h2 className="text-lg font-semibold text-white">
              {data.length} Certificates
            </h2>
            <Link
              href="/add/certificates"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 rounded-md px-3 py-2 transition-colors"
            >
              <IoMdAdd className="text-white" />
              <span className="text-white text-sm">Add Certificate</span>
            </Link>
          </div>

          {/* Mobile View - Card Layout */}
          <div className="block sm:hidden">
            {data?.map((cert) => (
              <div
                key={cert.id}
                className="p-4 border-b border-white/10 relative"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={cert.image}
                    alt={cert.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-grow">
                    <h3 className="text-white font-semibold">{cert.name}</h3>
                    <p className="text-white/50 text-sm">{cert.source}</p>
                    <p className="text-white/50 text-sm">
                      {cert.createdAt?.seconds}
                    </p>
                  </div>
                  <div
                    className="cursor-pointer text-white/50 hover:text-white relative "
                    onClick={() => toggleMenu(cert.id)}
                  >
                    <CiMenuKebab />
                    <CertificateOptionsMenu
                      isOpen={openMenuId === cert.id}
                      onClose={() => setOpenMenuId(null)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View - Table Layout */}
          <div className="hidden sm:block overflow-x-auto">
            {/* Table Header */}
            <div className="grid grid-cols-5 gap-4 py-3 bg-[#333] font-semibold border-b border-white/10 text-sm px-5">
              <div className="text-left">S No.</div>
              <div className="text-left">Image</div>
              <div className="text-left">Name</div>
              <div className="text-left">Source</div>
              <div className="text-left">Actions</div>
            </div>

            {loading && (
              <div>
                <div className="w-full h-100 flex items-center justify-center">
                  <div className="text-white text-lg">Loading...</div>
                </div>
              </div>
            )}

            {/* Table Body */}
            {data?.map((cert, index) => (
              <div
                key={cert.id}
                className="relative grid grid-cols-5 gap-4 py-3 text-sm px-5 border-b border-white/10 last:border-b-0 items-center"
              >
                <div className="text-white/80">{index + 1}</div>
                <div>
                  <img
                    src={cert.image}
                    alt={cert.name}
                    className="w-10 h-10 object-cover rounded-md"
                  />
                </div>

                <div className="text-white">{cert.name}</div>
                <div className="text-white/80">{cert.source}</div>
                <div className="relative">
                  <div
                    className="cursor-pointer text-white/50 hover:text-white"
                    onClick={() => toggleMenu(cert.id)}
                  >
                    <CiMenuKebab />
                    <CertificateOptionsMenu
                      isOpen={openMenuId === cert.id}
                      onClose={() => setOpenMenuId(null)}
                    />
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

export default Certificates;
