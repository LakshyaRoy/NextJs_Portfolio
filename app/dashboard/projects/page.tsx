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
  const { fetchProjects, projects } = useStore();
  const [filteredData, setFilteredData] = useState<any | []>([]);
  const { data, loading } = projects;

  const projectApi = async () => {
    if (!data.length) {
      await fetchProjects();
    }
  };

  useEffect(() => {
    projectApi();
  }, []);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const toggleMenu = (id: number) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleSearchData = (value: string) => {
    const filterData = data.filter((data) => {
      return data.name.toLowerCase().includes(value.toLowerCase());
    });

    if (value.trim() === "") {
      setFilteredData(data);
      return;
    }
    setFilteredData(filterData);
  };

  const handleSortedData = (value: string) => {
    const sortedData = [...filteredData].sort((a: any, b: any) => {
      const timeA = new Date(a.createdAt).getTime();
      const timeB = new Date(b.createdAt).getTime();

      if (value === "newest") {
        return timeB - timeA; // Sort newest first
      } else if (value === "oldest") {
        return timeA - timeB; // Sort oldest first
      } else if (value === "a-z") {
        return a.name.localeCompare(b.name);
      } else if (value === "z-a") {
        return b.name.localeCompare(a.name);
      }
      return 0;
    });
    console.log("Sorted data:", sortedData);
    setFilteredData(sortedData);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openMenuId) setOpenMenuId(null);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [openMenuId]);

  return (
    <DashboardLayout>
      <div className="w-full max-w-7xl mx-auto ">
        <section className="w-full h-full mb-8">
          <div className="w-full flex flex-wrap items-center justify-between gap-4">
            {/* Header Text */}

            <HeaderText name="All Projects" className="w-full sm:w-1/3" />
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
            <div className="hidden md:grid grid-cols-6 gap-4 py-3 bg-[#333] font-semibold border-b border-white/10 text-sm px-5">
              <div className="text-left">S No.</div>
              <div className="text-left">Image</div>
              <div className="text-left">Name</div>
              <div className="text-left">Source</div>
              <div className="text-left">Website</div>
              <div className="text-left">Actions</div>
            </div>

            {loading && (
              <div>
                <div className="w-full h-[50vh] flex items-center justify-center">
                  <div className="text-white text-lg">Loading...</div>
                </div>
              </div>
            )}

            {/* desktop view */}
            {filteredData.length > 0 ? (
              filteredData.map((item: any, index: number) => (
                <div
                  key={index}
                  className=" hidden md:grid grid-cols-6 gap-4 py-3 border-b border-white/10 text-sm px-5 items-center "
                >
                  {/* S No */}
                  <div className="text-white/80">{index + 1}</div>

                  {/* Image */}
                  <div className="text-left w-full flex items-center justify-between">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="w-10 h-10 object-cover rounded-md"
                    />
                  </div>

                  {/* Name */}
                  <div className="text-white">{item.name}</div>

                  {/* Source */}
                  <div className="text-white">
                    <a
                      href={item.source_code_link}
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
                      href={item.website_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      Visit
                    </a>
                  </div>
                  <div className="relative">
                    <div
                      className="cursor-pointer text-white/50 hover:text-white relative "
                      onClick={() => toggleMenu(item.id)}
                    >
                      <CiMenuKebab />
                      <ProjectsOptionsMenu
                        isOpen={openMenuId === item.id}
                        onClose={() => setOpenMenuId(null)}
                        id={item.id}
                        imageId={item.imageId}
                        setFilteredData={setFilteredData}
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full h-[50vh] flex items-center justify-center ">
                <div className="text-white text-lg">No Projects found</div>
              </div>
            )}

            {/* mobile view */}
            <div className="block md:hidden">
              {filteredData?.map((item: any) => (
                <div key={item.id} className="p-4 border-b border-white/10">
                  {/* Container with max-width and overflow control */}
                  <div className="flex items-start w-full">
                    {/* Image Section */}
                    <Image
                      src={item.image}
                      alt="Company Icon"
                      width={64}
                      height={64}
                      className="object-cover rounded-md flex-shrink-0 mr-4"
                    />

                    {/* Content Section - use flex-grow to take available space */}
                    <div className="flex-grow min-w-0">
                      {" "}
                      {/* min-w-0 prevents flex item from overflowing */}
                      <div className="flex justify-between items-start">
                        {/* Title and content */}
                        <div className="flex flex-col w-full pr-8">
                          {" "}
                          {/* Add padding for menu button */}
                          <h3 className="text-white font-semibold truncate">
                            {item.name}
                          </h3>
                          <p className="text-white/50 text-sm line-clamp-2">
                            {item.description}
                          </p>
                          <p className="text-white/50 text-sm">
                            {new Date(item.createdAt).toLocaleDateString()}
                          </p>
                          {/* Tags section */}
                          <div className="w-full overflow-x-auto no-scrollbar">
                            <div className="flex whitespace-nowrap">
                              {item?.tags?.map((tag: any) => (
                                <span
                                  key={tag.id}
                                  className={`text-sm mr-2 ${tag.color} w-fit inline-block flex-shrink-0`}
                                >
                                  {tag.name}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Menu Button - Absolute positioning removed */}
                        <div
                          className="flex-shrink-0 cursor-pointer text-white/50 hover:text-white"
                          onClick={() => toggleMenu(item.id)}
                        >
                          <CiMenuKebab />
                          <ProjectsOptionsMenu
                            isOpen={openMenuId === item.id}
                            onClose={() => setOpenMenuId(null)}
                            id={item.id}
                            imageId={item.imageId}
                            setFilteredData={setFilteredData}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

interface ProjectOptions {
  isOpen: boolean;
  id: string;
  imageId: string;
  onClose: () => void;
  setFilteredData: (data: any) => void;
}

const ProjectsOptionsMenu: React.FC<ProjectOptions> = ({
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
      const docRef = doc(firestore, "projects", id);
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
    <div className="absolute right-7 md:right-20 top-0 mt-2 bg-[#333] border border-white/10 rounded-md shadow-lg z-20">
      <ul className="py-1">
        <Link
          href={`/add/projects/${id}`}
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
