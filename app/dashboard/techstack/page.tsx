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
  const { fetchTechstack, techstack } = useStore();
  const { data, loading } = techstack;
  const [filteredData, setFilteredData] = useState<any | []>([]);
  const techstackApi = async () => {
    if (!data.length) {
      await fetchTechstack();
    }
  };

  useEffect(() => {
    techstackApi();
  }, []);

  console.log(data);
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
      const timeA =
        a.createdAt.seconds * 1000 + a.createdAt?.nanoseconds / 1000000;
      const timeB =
        b.createdAt.seconds * 1000 + b.createdAt?.nanoseconds / 1000000;

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

          <div className=" hidden sm:block w-full border border-white/10 rounded-md">
            <div className="grid grid-cols-5 gap-4 py-2 font-semibold border-b border-white/10 text-sm md:text-base px-5 bg-[#333333] min-w-[640px]">
              <div className="text-left">S No.</div>
              <div className="text-left">Name</div>
              <div className="text-left">Image</div>
              <div className="text-left">Description</div>
              <div className="text-left">Actions</div>
            </div>

            {filteredData?.map((data: any, i: number) => {
              return (
                <div
                  key={i}
                  className="relative grid grid-cols-5 gap-4 py-3 text-sm px-5 border-b border-white/10 last:border-b-0 items-center min-w-[640px]"
                >
                  <div className="text-white/80">{i + 1}</div>
                  <div className="text-left text-white/80">{data.name}</div>
                  <div className="text-left text-white/80">
                    <Image
                      width={50}
                      height={50}
                      src={data.image}
                      alt={data.name}
                    />
                  </div>
                  <div className="text-left text-white/80">
                    {data.description}
                  </div>
                  <div
                    className="flex-shrink-0 cursor-pointer text-white/50 hover:text-white"
                    onClick={() => toggleMenu(data.id)}
                  >
                    <CiMenuKebab />
                    <TechstackOptionsMenu
                      isOpen={openMenuId === data.id}
                      onClose={() => setOpenMenuId(null)}
                      id={data.id}
                      imageId={data.imageId}
                      setFilteredData={setFilteredData}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* mobile */}
          <div className="block sm:hidden">
            {filteredData.map((data: any, i: number) => (
              <div key={i} className="p-4 border-b border-white/10 relative">
                <div className="flex items-center space-x-4">
                  <Image
                    src={data.image}
                    alt={data.name}
                    className="object-cover rounded-md"
                    width={50}
                    height={50}
                  />
                  <div className="flex-grow">
                    <h3 className="text-white font-semibold">{data.name}</h3>
                    <p className="text-white/50 text-sm">{data.name}</p>
                    <p className="text-white/50 text-sm">{data.description}</p>
                  </div>
                  <div
                    className="flex-shrink-0 cursor-pointer text-white/50 hover:text-white"
                    onClick={() => toggleMenu(data.id)}
                  >
                    <CiMenuKebab />
                    <TechstackOptionsMenu
                      isOpen={openMenuId === data.id}
                      onClose={() => setOpenMenuId(null)}
                      id={data.id}
                      imageId={data.imageId}
                      setFilteredData={setFilteredData}
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

interface TechStackOptions {
  isOpen: boolean;
  id: string;
  imageId: string;
  onClose: () => void;
  setFilteredData: (data: any) => void;
}

const TechstackOptionsMenu: React.FC<TechStackOptions> = ({
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
      const docRef = doc(firestore, "techstacks", id);
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
    <div className="absolute right-8 md:right-28 top-10 md:top-8 mt-2 bg-[#333] border border-white/10 rounded-md shadow-lg z-20">
      <ul className="py-1">
        <Link
          href={`/add/techstack/${id}`}
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
