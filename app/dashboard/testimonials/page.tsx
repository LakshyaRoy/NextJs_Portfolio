"use client";

import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import HeaderText from "@/components/MicroComponents/HeaderText";
import SearchInput from "@/components/MicroComponents/SearchInput";
import SortInput from "@/components/MicroComponents/SortInput";
import { firestore } from "@/firebase/Firebase";
import { useStore } from "@/zustand/store";
import { deleteDoc, doc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { FaEdit, FaTrash } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

const Page = () => {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const [filteredData, setFilteredData] = useState<any | []>([]);
  const { fetchTestimonial, testimonial } = useStore();
  const { data, loading } = testimonial;

  const fetchtestimonial = async () => {
    if (!data.length) {
      await fetchTestimonial();
    }
  };

  useEffect(() => {
    fetchtestimonial();
  }, []);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const toggleMenu = (id: number) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openMenuId) setOpenMenuId(null);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [openMenuId]);

  const handleSearchData = (value: string) => {
    const trimmedValue = value.trim().toLowerCase();

    if (trimmedValue === "") {
      setFilteredData(data);
      return;
    }

    const filterData = data.filter((item) => {
      return (
        item?.author?.name?.toLowerCase().includes(trimmedValue) ||
        item?.reviewee?.name?.toLowerCase().includes(trimmedValue)
      );
    });

    setFilteredData(filterData);
  };

  const handleSortedData = (value: string) => {
    const sortedData = [...filteredData].sort((a: any, b: any) => {
      const timeA =
        a.createdAt.seconds * 1000 + a.createdAt?.nanoseconds / 1000000;
      const timeB =
        b.createdAt.seconds * 1000 + b.createdAt?.nanoseconds / 1000000;

      if (value === "newest") {
        return timeB - timeA; // Sort newest first
      } else if (value === "oldest") {
        return timeA - timeB; // Sort oldest first
      } else if (value === "a-z") {
        return a?.author?.name.localeCompare(b?.author?.name);
      } else if (value === "z-a") {
        return b?.author?.name.localeCompare(a?.author?.name);
      }
      return 0;
    });
    console.log("Sorted data:", sortedData);
    setFilteredData(sortedData);
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
                <SearchInput onSearch={handleSearchData} />
              </div>
              <div className="w-full sm:flex-1">
                <SortInput onSortChange={handleSortedData} />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#212121] rounded-lg ">
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <h2 className="text-lg font-semibold text-white">
              {filteredData?.length || 0} Testimonials
            </h2>
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

            {loading && (
              <div>
                <div className="w-full h-[50vh] flex items-center justify-center">
                  <div className="text-white text-lg">Loading...</div>
                </div>
              </div>
            )}

            {/* Data Rows */}
            {filteredData?.length > 0 ? (
              filteredData?.map((item: any, index: number) => {
                return (
                  <div key={item.id} className="w-full">
                    {/* Desktop View */}
                    <div className="relative hidden md:grid  grid-cols-6 gap-4 py-3 text-sm px-5 border-b border-white/10 last:border-b-0 items-center md:grid-cols-6 md:gap-4 ">
                      <div className="hidden md:block text-white/80">
                        {index + 1}
                      </div>
                      <div className="hidden md:block">
                        <Image
                          width={50}
                          height={50}
                          src={item?.author?.image}
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
                          className="flex-shrink-0 cursor-pointer text-white/50 hover:text-white"
                          onClick={() => toggleMenu(item.id)}
                        >
                          <CiMenuKebab />
                          <TestimonialOptionsMenu
                            isOpen={openMenuId === item.id}
                            onClose={() => setOpenMenuId(null)}
                            id={item.id}
                            imageId={item.imageId}
                            setFilteredData={setFilteredData}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Mobile View */}
                    <div className="block md:hidden w-full p-4 relative">
                      <div className="flex items-center justify-between">
                        <div className="text-white font-semibold flex justify-start items-center gap-4 w-full">
                          <div className="w-10 h-10 overflow-hidden rounded-full bg-white border border-white-200">
                            <Image
                              width={50}
                              height={50}
                              src={item?.author?.image}
                              alt={item?.author?.name}
                              className="w-full h-full object-cover overflow-hidden"
                            />
                          </div>
                          <p className="w-full">{item?.author?.name}</p>
                        </div>
                        <div
                          className="flex-shrink-0 cursor-pointer text-white/50 hover:text-white"
                          onClick={() => toggleMenu(item.id)}
                        >
                          <CiMenuKebab />
                          <TestimonialOptionsMenu
                            isOpen={openMenuId === item.id}
                            onClose={() => setOpenMenuId(null)}
                            id={item.id}
                            imageId={item.imageId}
                            setFilteredData={setFilteredData}
                          />
                        </div>
                      </div>
                      <div className="mt-4 text-white/80 text-sm flex flex-col gap-2">
                        <div>
                          <span className="font-semibold">S No:</span>{" "}
                          {index + 1}
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
              })
            ) : (
              <div className="w-full h-[50vh] flex items-center justify-center ">
                <div className="text-white text-lg">No Testimonials found</div>
              </div>
            )}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

interface TestimonialOptions {
  isOpen: boolean;
  id: string;
  imageId: string;
  onClose: () => void;
  setFilteredData: (data: any) => void;
}

const TestimonialOptionsMenu: React.FC<TestimonialOptions> = ({
  isOpen,
  onClose,
  id,
  imageId,
  setFilteredData,
}) => {
  if (!isOpen) return null;

  const handleDelete = async (id: string, imageId: string) => {
    try {
      // Delete from Firestore
      const docRef = doc(firestore, "testimonials", id);
      await deleteDoc(docRef);
      setFilteredData((prevData: any) =>
        prevData.filter((item: any) => item.id !== id)
      );
    } catch (error) {
      console.error("Error during delete operation:", error);
    } finally {
      onClose();
    }
  };

  return (
    <div className="absolute top-10 right-10 md:top-0 md:right-0  lg:right-12 bg-[#333] border border-white/10 rounded-md shadow-lg z-20">
      <ul className="py-1">
        <Link
          href={`/add/testimonials/${id}`}
          className="flex items-center gap-2 px-4 py-2 hover:bg-[#444] cursor-pointer text-white/80 hover:text-white"
          onClick={onClose}
        >
          <FaEdit /> Edit
        </Link>
        <li
          className="flex items-center gap-2 px-4 py-2 hover:bg-[#444] cursor-pointer text-red-400 hover:text-red-300"
          onClick={() => handleDelete(id, imageId)}
        >
          <FaTrash /> Delete
        </li>
      </ul>
    </div>
  );
};

export default Page;
