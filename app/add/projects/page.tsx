"use client";

import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import InputField from "@/components/MicroComponents/InputField";
import TextArea from "@/components/MicroComponents/TextArea";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { IoIosSend } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";

const Page = () => {
  interface FormData {
    name: string;
    source_code_link: string;
    website_link: string;
    description: string;
  }

  interface TagsDetail {
    name: string;
    color: string;
  }

  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    source_code_link: "",
    website_link: "",
    description: "",
  });
  const [tags, setTags] = useState<TagsDetail[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [tagEditIndex, setTagEditIndex] = useState<number | null>(null);

  console.log(tags);

  const [tagsDetail, setTagsDetail] = useState<TagsDetail>({
    name: "",
    color: "",
  });
  const [errorTags, setErrorTags] = useState<Partial<TagsDetail>>({
    name: "",
    color: "",
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
      const reader = new FileReader();
      reader.onload = () => {
        setImagepreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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

  const handleEdit = (index: number) => {
    const data = tags[index];
    setTagEditIndex(index);
    setIsEditing(true);
    setTagsDetail({ name: data.name, color: data.color });
    console.log(data);
  };

  const handleTags = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTagsDetail((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrorTags((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateTags = () => {
    let tempError = {
      name: "",
      color: "",
    };
    let isValid = true;
    if (!tagsDetail.name.trim()) {
      tempError.name = "Tag Name is required";
      isValid = false;
    }
    if (!tagsDetail.color.trim()) {
      tempError.color = "Tag Color is required";
      isValid = false;
    }
    setErrorTags(tempError);
    return isValid;
  };

  const handleAddTags = () => {
    if (!validateTags()) {
      return; // Exit if validation fails
    }

    if (isEditing) {
      if (tagEditIndex !== null) {
        const updatedTags = tags.map((tag, index) =>
          index === tagEditIndex ? tagsDetail : tag
        );
        setTags(updatedTags);
        setTagEditIndex(null);
        setIsEditing(false);
      }
    } else {
      const updatedTags = [...tags, tagsDetail];
      setTags(updatedTags);
    }

    // Reset form states
    setTagsDetail({ name: "", color: "" });
    setErrorTags({ name: "", color: "" });
  };

  const deleteTags = (index: number) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
  };

  // console.log(tags);

  const handleError = () => {
    let tempError: Partial<FormData> = {};
    let hasError = false;
    if (!formData.name.trim()) {
      tempError.name = "Certificate Name is required";
      hasError = true;
    }

    if (!formData.source_code_link.trim()) {
      tempError.source_code_link = "Certificate Source is required";
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
      source_code_link: formData.source_code_link,
      website_link: formData.website_link,
      description: formData.description,
      image,
      tags,
    };
    console.log(data);

    // Reset Form
    setFormData({
      name: "",
      source_code_link: "",
      website_link: "",
      description: "",
    });
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
      <div className="w-full min-h-full space-y-6">
        <Link
          href="/dashboard/projects"
          className="flex w-fit items-center gap-2 text-sm sm:text-base hover:text-gray-300 transition-colors"
        >
          <IoArrowBack className="text-xl" />
          Back
        </Link>
        <div className="w-full max-w-7xl mx-auto flex justify-center items-center flex-col">
          <section className="w-full min-h-[30vh] bg-neutral-800 rounded-lg shadow-lg px-4 sm:px-6 py-6 max-w-xl mx-auto my-5">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="flex flex-col items-center space-y-6">
                {/* Image Upload Section */}
                <div className="w-full flex items-center justify-center flex-col gap-5">
                  <div className="w-28 h-28 sm:w-36 sm:h-36 bg-neutral-700 rounded-full flex items-center justify-center overflow-hidden">
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
                      className=" text-xs text-red-400 hover:text-red-300 transition-colors"
                    >
                      Remove Image
                    </button>
                  )}
                </div>

                {/* Input Fields */}
                <div className="w-full space-y-4">
                  <InputField
                    formValue={formData.name}
                    error={error.name}
                    handleChange={handleChange}
                    name="name"
                    placeholder="Enter Project name"
                  />
                  <InputField
                    formValue={formData.website_link}
                    error={error.website_link}
                    handleChange={handleChange}
                    name="website_link"
                    label="Live Link"
                    placeholder="Enter Project Live Link"
                  />
                  <InputField
                    formValue={formData.source_code_link}
                    error={error.source_code_link}
                    handleChange={handleChange}
                    name="source_code_link"
                    label="GitHub Link"
                    placeholder="Enter GitHub Project Link"
                  />
                  <TextArea
                    formValue={formData.description}
                    error={error.description}
                    handleChange={handleChange}
                    name="description"
                    placeholder="Enter A Small Description"
                    rows={4}
                    cols={30}
                  />

                  <div>
                    <input
                      type="text"
                      className=""
                      name="name"
                      id="name"
                      placeholder="Enter name"
                      onChange={handleTags}
                      value={tagsDetail.name}
                    />
                    {errorTags.name && (
                      <p className="text-red-500 text-sm">{errorTags.name}</p>
                    )}
                    <select
                      name="color"
                      id="color"
                      onChange={handleTags}
                      value={tagsDetail.color}
                    >
                      <option value="">Select color</option>
                      <option value="blue-text-gradient">Blue Gradient</option>
                      <option value="green-text-gradient">
                        Green Gradient
                      </option>
                      <option value="orange-text-gradient">
                        Orange Gradient
                      </option>
                      <option value="pink-text-gradient">Pink Gradient</option>
                    </select>
                    {errorTags.color && (
                      <p className="text-red-500 text-sm">{errorTags.color}</p>
                    )}

                    <button onClick={handleAddTags}>Add Tag</button>
                  </div>
                  <ul>
                    {tags.map((tag, index) => (
                      <li key={index} className={`text-sm ${tag.color}`}>
                        {tag.name} - {tag.color} -{" "}
                        <button onClick={() => handleEdit(index)}>Edit</button>{" "}
                        <button onClick={() => deleteTags(index)}>
                          delete
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 
                    bg-neutral-700 text-white 
                    px-4 py-2 rounded-md 
                    hover:bg-neutral-600 
                    transition-colors 
                    focus:outline-none 
                    focus:ring-2 focus:ring-neutral-500"
                >
                  <span>Submit</span>
                  <IoIosSend />
                </button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Page;
