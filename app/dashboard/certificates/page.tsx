"use client";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import HeaderText from "@/components/MicroComponents/HeaderText";
import SearchInput from "@/components/MicroComponents/SearchInput";
import SortInput from "@/components/MicroComponents/SortInput";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CiMenuKebab, CiSearch } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useStore } from "@/zustand/store";
import { deleteDoc, doc } from "firebase/firestore";
import { firestore } from "@/firebase/Firebase";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";

// Mock data - replace with actual data fetching logic

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

  const handleDelete = async (id: string, imageId: string) => {
    try {
      // Delete from Firestore
      const docRef = doc(firestore, "certificates", id);
      await deleteDoc(docRef);
      setFilteredData((prevData: any) =>
        prevData.filter((item: any) => item.id !== id)
      );
      toast.success("Certificate deleted successfully!");
    } catch (error) {
      console.error("Error during delete operation:", error);
      toast.error("Error deleting certificate!");
    } finally {
      onClose();
    }
  };

  return (
    <div className="absolute right-7 md:right-20 top-0 mt-2 bg-[#333] border border-white/10 rounded-md shadow-lg z-20">
      <ul className="py-1">
        <Link
          href={`/add/certificates/${id}`}
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

const Certificates = () => {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [filteredData, setFilteredData] = useState<any | []>([]);
  const { fetchCertificates, certificate } = useStore();
  const { data, loading } = certificate;

  // console.log(filteredData);
  const certificateApi = async () => {
    if (!data.length) {
      await fetchCertificates();
    }
  };

  useEffect(() => {
    certificateApi();
  }, []);

  const toggleMenu = (id: number) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleSearchedData = (value: string) => {
    const filterData = data.filter((data) =>
      data.name.toLowerCase().includes(value.toLowerCase())
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
      <div className="w-full max-w-7xl mx-auto">
        {/* Header Section */}
        <section className="mb-8 w-full h-full">
          <div className="w-full flex flex-wrap items-center justify-between gap-4">
            {/* Header Text */}
            <HeaderText name="All Certificates" className="w-full sm:w-1/3" />
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

        {/* Certificates Section */}
        <section className="bg-[#212121] rounded-lg ">
          {/* Section Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <h2 className="text-lg font-semibold text-white">
              {filteredData.length} Certificates
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
            {filteredData?.map((cert) => (
              <div
                key={cert.id}
                className="p-4 border-b border-white/10 relative"
              >
                <div className="flex items-center space-x-4">
                  <Image
                    src={cert.image}
                    alt={cert.name}
                    className="w-16 h-16 object-cover rounded-md"
                    width={200}
                    height={200}
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
                      id={cert.id}
                      imageId={cert.imageId}
                      setFilteredData={setFilteredData}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View - Table Layout */}
          <div className="hidden sm:block h-full">
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
                <div className="w-full h-[50vh] flex items-center justify-center">
                  <div className="text-white text-lg">Loading...</div>
                </div>
              </div>
            )}

            {!loading && filteredData?.length === 0 && (
              <div className="w-full h-[50vh] flex items-center justify-center ">
                <div className="text-white text-lg">No certificates found</div>
              </div>
            )}

            {/* Table Body */}
            {filteredData?.map((cert, index) => (
              <div
                key={cert.id}
                className="relative grid grid-cols-5 gap-4 py-3 text-sm px-5 border-b border-white/10 last:border-b-0 items-center "
              >
                <div className="text-white/80">{index + 1}</div>
                <div>
                  <Image
                    src={cert.image}
                    alt={cert.name}
                    className="w-10 h-10 object-cover rounded-md"
                    width={200}
                    height={200}
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
                      id={cert.id}
                      imageId={cert?.imageId}
                      setFilteredData={setFilteredData}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <ToastContainer autoClose={2000} theme="dark" />
    </DashboardLayout>
  );
};

export default Certificates;
