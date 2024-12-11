"use client";

import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import InputField from "@/components/MicroComponents/InputField";
import TailwindcssButtons from "@/components/ui/tailwindcss-buttons";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaLocationArrow } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";
const AddCertificates = () => {
  interface FormData {
    name: string;
    source: string;
  }

  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    source: "",
  });
  const [error, setError] = useState<Partial<FormData>>({});
  const [image, setImage] = useState<File | null>(null);
  const [imagepreview, setImagepreview] = useState<string | null>(null);

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImagepreview(reader.result as string);
    };
    reader.readAsDataURL(file as Blob);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleError = () => {
    let tempError: Partial<FormData> = {};
    let hasError = false;
    if (!formData.name.trim()) {
      tempError.name = "Certificate Name is required";
      hasError = true;
    }

    if (!formData.source.trim()) {
      tempError.source = "Certificate Source is required";
      hasError = true;
    }
    setError(tempError);
    return hasError;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (handleError() || !image) {
      return alert("Form submission failed due to validation errors");
    }

    const data = {
      name: formData.name,
      source: formData.source,
      image,
    };
    console.log(data);

    // Reset Form
    setFormData({ name: "", source: "" });
    setImage(null);
    setImagepreview(null);
    setError({});
  };

  const removeImage = () => {
    setImage(null);
    setImagepreview(null);
  };
  return (
    <DashboardLayout>
      <main className="w-full h-full flex items-center justify-center flex-col gap-5">
        <Link
          href={"/dashboard/certificates"}
          className="flex items-center justify-start w-full gap-3"
        >
          <IoArrowBack className="text-2xl cursor-pointer" />
          Back
        </Link>

        <section className="w-full max-w-5xl h-full min-h-[40vh] mb-10 bg-[#212121] rounded-lg  px-5 py-5">
          <form
            className="w-full h-full flex flex-col gap-5"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-5  mx-auto w-full">
              <div className="w-full h-full flex justify-center items-center flex-col gap-5">
                <div className="h-36 w-36 bg-black-300 rounded-full flex items-center justify-center mx-auto cursor-pointer ">
                  {imagepreview ? (
                    <Image
                      src={imagepreview}
                      alt="image"
                      width={100}
                      height={100}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center ">
                      <label htmlFor="imageUpload">Upload Image:</label>
                      <input
                        type="file"
                        id="imageUpload"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full border-2 border-white/10 rounded-md px-2 py-2 text-white-200 hidden"
                      />
                    </div>
                  )}
                </div>

                {imagepreview && (
                  <button
                    onClick={removeImage}
                    className="text-white-200 hover:text-red-100"
                  >
                    Remove Image
                  </button>
                )}
              </div>

              <InputField
                formValue={formData?.name}
                error={error.name}
                handleChange={handleChange}
                name={"name"}
              />
              <InputField
                formValue={formData?.source}
                error={error.source}
                handleChange={handleChange}
                name={"source"}
              />
            </div>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 border border-white/10 rounded-md px-2 py-2 hover:bg-black-300 w-28 mx-auto "
            >
              <IoMdAdd />
              <span className="text-white-200">Submit</span>
            </button>
          </form>
        </section>
      </main>
    </DashboardLayout>
  );
};

export default AddCertificates;
