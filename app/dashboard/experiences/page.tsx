"use client";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import HeaderText from "@/components/MicroComponents/HeaderText";
import SearchInput from "@/components/MicroComponents/SearchInput";
import SortInput from "@/components/MicroComponents/SortInput";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import { useStore } from "@/zustand/store";
import { useRouter } from "next/navigation";
import { firestore } from "@/firebase/Firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { FaEdit, FaTrash } from "react-icons/fa";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";

interface CertificateOptions {
  isOpen: boolean;
  id: string;
  imageId: string;
  onClose: () => void;
  setFilteredData: (data: any) => void;
}

const CertificateOptionsMenu: React.FC<CertificateOptions> = ({
  isOpen,
  onClose,
  id,
  imageId,
  setFilteredData,
}) => {
  if (!isOpen) return null;

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    try {
      const docRef = doc(firestore, "experiences", id);
      await deleteDoc(docRef);
      setFilteredData((prevData) => prevData.filter((item) => item.id !== id));
      toast.success("Experience deleted successfully!");
    } catch (error) {
      console.error("Error during delete operation:", error);
      toast.error("Error deleting experience!");
    } finally {
      setTimeout(onClose, 100); // Delay closing the menu
    }
  };

  return (
    <div
      className="absolute right-7 md:right-20 top-0 mt-2 bg-[#333] border border-white/10 rounded-md shadow-lg z-20"
      onClick={(e) => e.stopPropagation()} // Prevent menu closing on self-click
    >
      <ul className="py-1">
        <Link
          href={`/add/experiences/${id}`}
          className="flex items-center gap-2 px-4 py-2 hover:bg-[#444] cursor-pointer text-white/80 hover:text-white"
          onClick={onClose}
        >
          <FaEdit /> Edit
        </Link>
        <li
          className="flex items-center gap-2 px-4 py-2 hover:bg-[#444] cursor-pointer text-red-400 hover:text-red-300"
          onClick={handleDelete}
        >
          <FaTrash /> Delete
        </li>
      </ul>
    </div>
  );
};

const Page = () => {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [filteredData, setFilteredData] = useState<any | []>([]);
  const { fetchExperience, experience } = useStore();
  const { data, loading } = experience;

  const experienceApi = async () => {
    if (!data.length) {
      await fetchExperience();
    }
  };

  useEffect(() => {
    experienceApi();
  }, []);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleSearchedData = (value: string) => {
    const filterData = data.filter((data) =>
      data.company_name.toLowerCase().includes(value.toLowerCase())
    );

    if (value.trim() === "") {
      setFilteredData(data);
      return;
    }
    setFilteredData(filterData);
  };

  const handleSortedData = (value: string) => {
    // Create a copy of the filtered data
    const sortedData = [...filteredData].sort((a: any, b: any) => {
      const timeA =
        a.createdAt.seconds * 1000 + a.createdAt.nanoseconds / 1000000;
      const timeB =
        b.createdAt.seconds * 1000 + b.createdAt.nanoseconds / 1000000;

      if (value === "newest") {
        return timeB - timeA; // Sort newest first
      } else if (value === "oldest") {
        return timeA - timeB; // Sort oldest first
      } else if (value === "a-z") {
        return a.name.localeCompare(b.name); // Alphabetical order
      } else if (value === "z-a") {
        return b.name.localeCompare(a.name); // Reverse alphabetical order
      }

      return 0;
    });

    // console.log("Sorted data:", sortedData);
    setFilteredData(sortedData);
  };

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

  return (
    <DashboardLayout>
      <div className="w-full max-w-7xl mx-auto ">
        <section className="mb-8 w-full h-full">
          <div className="w-full flex flex-wrap items-center justify-between gap-4">
            {/* Header Text */}
            <HeaderText name="All Experiences" className="w-full sm:w-1/3" />
            {/* Search and Sort */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-3/4">
              <div className="w-full sm:flex-1">
                <SearchInput onSearch={handleSearchedData} />
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
              {filteredData.length} Experiences
            </h2>
            <Link
              href="/add/experiences"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 rounded-md px-3 py-2 transition-colors"
            >
              <IoMdAdd className="text-white" />
              <span className="text-white text-sm">Add Experiences</span>
            </Link>
          </div>

          <div className="block w-full">
            <div className="hidden md:grid grid-cols-7 gap-4 py-3 bg-[#333] font-semibold border-b border-white/10 text-sm px-5">
              <div className="text-left">S No.</div>
              <div className="text-left">Icon</div>
              <div className="text-left">Company Name</div>
              <div className="text-left">Title</div>
              <div className="text-left">Date</div>
              <div className="text-left">Icon Colour</div>
              <div className="text-left">Actions</div>
            </div>

            {loading && (
              <div>
                <div className="w-full h-[50vh] flex items-center justify-center">
                  <div className="text-white text-lg">Loading...</div>
                </div>
              </div>
            )}

            {!loading && filteredData?.length === 0 && (
              <div className="w-full h-[50vh] flex items-center justify-center ">
                <div className="text-white text-lg">No Experiences found</div>
              </div>
            )}
            {/* desktop view */}
            {filteredData?.map((item: any, index: number) => (
              <div
                key={index}
                className=" hidden md:grid grid-cols-7 gap-4 py-3 border-b border-white/10 text-sm px-5 items-center "
              >
                <div className="text-left">{index + 1}</div>
                <div className="text-left ">
                  <Image
                    src={`${item.icon}`}
                    alt={item.icon}
                    className="w-10 h-10 rounded-md overflow-hidden object-cover"
                    width={50}
                    height={50}
                  />
                </div>
                <div className="text-left">{item.company_name}</div>
                <div className="text-left">{item.title}</div>
                <div className="text-left">
                  {new Date(item.createdAt.seconds * 1000).toLocaleDateString()}
                </div>
                <div
                  className="text-left w-fit p-2 rounded-lg"
                  style={{ backgroundColor: item.iconBg }}
                >
                  {item.iconBg}
                </div>
                <div className="hidden md:block relative">
                  <div
                    className="cursor-pointer text-white/50 hover:text-white"
                    onClick={() => toggleMenu(item?.id)}
                  >
                    <CiMenuKebab />
                    <CertificateOptionsMenu
                      isOpen={openMenuId === item.id}
                      onClose={() => setOpenMenuId(null)}
                      id={item.id}
                      imageId={item?.imageId}
                      setFilteredData={setFilteredData}
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* mobile view */}

            <div className="block md:hidden">
              {filteredData?.map((item: any) => (
                <div
                  key={item.id}
                  className="p-4 border-b border-white/10 relative"
                >
                  {/* Item header with icon and details */}
                  <div className="flex items-center space-x-4 justify-between">
                    {/* Icon Section */}
                    <Image
                      src={item.icon}
                      alt="Company Icon"
                      className="w-16 h-16 object-cover rounded-md"
                      width={50}
                      height={50}
                    />

                    {/* Details Section */}
                    <div className="flex flex-col w-full gap-2">
                      <h3 className="text-white font-semibold">
                        {item.company_name}
                      </h3>
                      <p className="text-white/50 text-sm">{item.title}</p>
                      <p
                        className="text-white/50 text-sm w-fit p-2 rounded-lg"
                        style={{ backgroundColor: item.iconBg }}
                      >
                        {item.iconBg}
                      </p>
                      <p className="text-white/50 text-sm">
                        {new Date(
                          item.createdAt?.seconds * 1000
                        ).toLocaleDateString()}{" "}
                      </p>
                    </div>

                    {/* Menu Button Section */}
                    <div
                      className="cursor-pointer text-white/50 hover:text-white relative"
                      onClick={() => toggleMenu(item.id)}
                    >
                      <CiMenuKebab />
                      <CertificateOptionsMenu
                        isOpen={openMenuId === item.id}
                        onClose={() => setOpenMenuId(null)}
                        id={item.id}
                        imageId={item.imageId}
                        setFilteredData={setFilteredData}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <ToastContainer theme="dark" />
    </DashboardLayout>
  );
};

export default Page;
