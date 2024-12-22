"use client";
import React, { useEffect, useState } from "react";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import Image from "next/image";
import InputField from "@/components/MicroComponents/InputField";
import TextArea from "@/components/MicroComponents/TextArea";
import { IoIosSend } from "react-icons/io";
const Page = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imagepreview, setImagepreview] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);

  interface FormData {
    title: string;
    company_name: string;
    iconBg: string;
    date: string;
    points: string;
  }

  const [formData, setFormData] = useState<FormData>({
    title: "",
    company_name: "",
    iconBg: "",
    date: "",
    points: "",
  });

  const [error, setError] = useState<Partial<FormData>>({});

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagepreview(reader.result as string);
        setImageError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagepreview(null);
    setImageError(null);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    setError((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleError = () => {
    let tempError: Partial<FormData> = {};
    let hasError = false;
    if (!formData.title.trim()) {
      tempError.title = "Title is required";
      hasError = true;
    }
    if (!formData.company_name.trim()) {
      tempError.company_name = "Company Name is required";
      hasError = true;
    }
    if (!formData.iconBg.trim()) {
      tempError.iconBg = "Icon Background Color is required";
      hasError = true;
    } else if (!formData.iconBg.match(/^#([A-Fa-f0-9]{6})$/)) {
      tempError.iconBg = "Icon Background Color is invalid";
      hasError = true;
    }
    if (!formData.date.trim()) {
      tempError.date = "Date is required";
      hasError = true;
    }
    if (!formData.points.trim()) {
      tempError.points = "Points is required";
      hasError = true;
    }
    setError(tempError);
    return hasError;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      setImageError("Please enter an image");
      return;
    }

    if (handleError()) {
      console.log(error);
      return;
    }

    const convertInPoints = (desc: string) => {
      let points = [];
      if (!desc) return [];
      const descArray = desc.split("\n");
      points.push(descArray);
      return points;
    };

    const data = {
      title: formData.title,
      company_name: formData.company_name,
      icon: image,
      iconBg: formData.iconBg,
      date: formData.date,
      points: convertInPoints(formData.points),
    };

    console.log(data);
  };

  return (
    <DashboardLayout>
      <div className="w-full flex items-center justify-center h-full">
        <div className="w-full max-w-7xl h-full ">
          <Link
            href="/dashboard/experiences"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors  group"
          >
            <IoArrowBack className="text-xl group-hover:transform group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm">Back to Experiences</span>
          </Link>

          <section className="w-full min-h-[30vh] bg-neutral-800 rounded-lg shadow-lg px-4 sm:px-6 py-6 max-w-xl mx-auto my-5">
            <form className=" space-y-8" onSubmit={handleSubmit}>
              <div className="flex flex-col items-center space-y-6">
                <div className="relative group">
                  <div className="w-36 h-36 bg-gradient-to-br from-neutral-700 to-neutral-800 rounded-full flex items-center justify-center overflow-hidden shadow-lg transition-all group-hover:scale-105">
                    {imagepreview ? (
                      <Image
                        src={imagepreview}
                        alt="Certificate preview"
                        objectFit="cover"
                        className="rounded-full object-cover w-full h-full"
                        width={200}
                        height={200}
                      />
                    ) : (
                      <div className="text-center">
                        <label
                          htmlFor="imageUpload"
                          className="cursor-pointer text-sm text-gray-400 hover:text-white transition-colors"
                        >
                          Upload Image
                        </label>
                        <input
                          type="file"
                          id="imageUpload"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </div>
                    )}
                  </div>

                  {imagepreview && (
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-xs w-32 bg-red-500/20 text-red-400 px-2 py-1 rounded-full hover:bg-red-500/30 transition-all"
                    >
                      Remove Image
                    </button>
                  )}
                  {imageError && (
                    <p className="text-red-500 text-center w-full text-xs mt-4">
                      {imageError}
                    </p>
                  )}
                </div>
                <div className="w-full max-w-lg space-y-6">
                  <InputField
                    formValue={formData.company_name}
                    error={error.company_name}
                    handleChange={handleChange}
                    name="company_name"
                    label="Company Name"
                    placeholder="Enter Company Name"
                  />
                  <InputField
                    formValue={formData.title}
                    error={error.title}
                    handleChange={handleChange}
                    name="title"
                    label="Title"
                    placeholder="Enter Title"
                  />
                  <InputField
                    formValue={formData.iconBg}
                    error={error.iconBg}
                    handleChange={handleChange}
                    name="iconBg"
                    label="Icon Background"
                    placeholder="Enter Icon Background With # eg. #383E56"
                  />
                  <InputField
                    formValue={formData.date}
                    error={error.date}
                    handleChange={handleChange}
                    name="date"
                    label="Date"
                    placeholder="Enter Date eg. Dec 2023 to Current"
                  />
                  <TextArea
                    formValue={formData.points}
                    error={error.points}
                    handleChange={handleChange}
                    name="points"
                    placeholder="Enter the Description here! and press Enter for new Line"
                    rows={4}
                    cols={30}
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2   bg-neutral-700 text-white    px-4 py-2 rounded-md  hover:bg-neutral-600 transition-colors  focus:outline-none  focus:ring-2 focus:ring-neutral-500"
                  >
                    <span>Submit Experience</span>
                    <IoIosSend className="text-xl" />
                  </button>
                </div>
              </div>
            </form>
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
};

const data = {
  title: "Web Developer",
  company_name: "LifeBonder",
  icon: "LifeBonder",
  iconBg: "#383E56",
  date: "Dec 2023 to Current",
  points: [
    "Managed Lifebonder's site for optimal function and user experience. Oversaw updates, design, and performance, utilizing FileZilla FTP for precise version updates and efficient feature integration.",
    "Guided website version control, ensured accurate updates, and secure deployments via FileZilla FTP. Collaborated for streamlined procedures, maintaining current tech and content.",
  ],
};

export default Page;
