"use client";

import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import InputField from "@/components/MicroComponents/InputField";
import TextArea from "@/components/MicroComponents/TextArea";
import { firestore } from "@/firebase/Firebase";
import { useStore } from "@/zustand/store";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoIosSend, IoMdCreate, IoMdTrash } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";
import { toast, ToastContainer } from "react-toastify";

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

  // console.log(tags);

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
  const [imageId, setImageId] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const { id } = useParams();
  const { fetchProjects } = useStore();
  const router = useRouter();

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
    // console.log(data);
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

    const urlRegex =
      /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;

    if (!formData.name.trim()) {
      tempError.name = "Certificate Name is required";
      hasError = true;
    }

    if (!formData.source_code_link.trim()) {
      tempError.source_code_link = "Certificate Source is required";
      hasError = true;
    } else if (!formData.source_code_link.match(urlRegex)) {
      tempError.source_code_link = "Invalid URL";
      hasError = true;
    }

    if (!formData.website_link.trim()) {
      tempError.website_link = "Website Link is required";
      hasError = true;
    } else if (!formData.website_link.match(urlRegex)) {
      tempError.website_link = "Invalid URL";
      hasError = true;
    }

    if (!formData.description.trim()) {
      tempError.description = "Description is required";
      hasError = true;
    } else if (formData.description.trim().length < 20) {
      tempError.description = "Description should be at least 20 characters";
      hasError = true;
    }

    setError(tempError);
    return hasError;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log("function is running");

    try {
      if (handleError()) {
        return toast.error("Form submission failed due to validation errors");
      }
      if (!imagepreview) {
        return toast.error("Image is required");
      }

      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

      if (!uploadPreset || !cloudName) {
        throw new Error("Missing Cloudinary configuration");
      }

      // Handle image upload only if there's a new image
      let imageDetails = null;
      if (image) {
        try {
          const cloudinaryFormData = new FormData();
          cloudinaryFormData.append("file", image);
          cloudinaryFormData.append("upload_preset", uploadPreset);

          const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            {
              method: "POST",
              body: cloudinaryFormData,
            }
          );

          if (!response.ok) {
            throw new Error(`Failed to upload image: ${await response.text()}`);
          }

          const data = await response.json();
          imageDetails = {
            secure_url: data.secure_url,
            public_id: data.public_id,
          };
        } catch (uploadError) {
          // console.error("Image upload error:", uploadError);
          throw uploadError;
        }
      }

      const docData = {
        name: formData.name,
        source_code_link: formData.source_code_link,
        website_link: formData.website_link,
        description: formData.description,
        image: imageDetails?.secure_url || imagepreview,
        imageId: imageDetails?.public_id || imageId,
        tags,
        updatedAt: new Date(),
      };
      // console.log("Document data to be updated:", docData);

      try {
        setLoading(true);
        const docRef = doc(firestore, "projects", id);
        await updateDoc(docRef, docData);
        await fetchProjects();
        toast.success("Project updated successfully!");
        router.push("/dashboard/projects");
      } catch (firestoreError) {
        console.error("Firestore operation error:", firestoreError);
        toast.error("Failed to update project");
        throw firestoreError;
      } finally {
        setLoading(false);
      }
    } catch (error) {
      alert("Failed to update project. Please check console for details.");
      return;
    }

    // Only reset form if everything succeeded
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      source_code_link: "",
      website_link: "",
      description: "",
    });
    setTags([]);
    setTagsDetail({ name: "", color: "" });
    setImage(null);
    setImagepreview(null);
    setError({});
  };

  const removeImage = () => {
    setImage(null);
    setImagepreview(null);
  };

  useEffect(() => {
    if (id) {
      const fetchProjects = async () => {
        const docRef = doc(firestore, "projects", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormData({
            name: data.name,
            source_code_link: data.source_code_link,
            website_link: data.website_link,
            description: data.description,
          });
          setImagepreview(data.image);
          setImageId(data?.imageId || "");
          setTags(data.tags);
        }
      };
      fetchProjects();
    }
  }, [id]);

  return (
    <DashboardLayout>
      <div className="w-full flex items-center justify-center h-full">
        <div className="w-full max-w-7xl h-full ">
          <Link
            href="/dashboard/projects"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors  group"
          >
            <IoArrowBack className="text-xl group-hover:transform group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm">Back to Projects</span>
          </Link>

          <section className="w-full min-h-[30vh] bg-neutral-800 rounded-lg shadow-lg px-4 sm:px-6 py-6 max-w-xl mx-auto my-5">
            <form className=" space-y-8" onSubmit={handleSubmit}>
              {/* Image Upload Section */}
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
                </div>

                {/* Input Fields */}
                <div className="w-full max-w-lg space-y-6">
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

                  {/* Tags Section */}
                  <div className="space-y-4">
                    <div className="flex items-start justify-center  gap-2">
                      <div className="flex-grow flex items-center space-x-4">
                        <input
                          type="text"
                          className="w-full bg-black-300 px-5 py-2 rounded-lg placeholder:text-white-500 text-lg text-white-800 shadow-black-200 shadow-2xl focus:outline-none"
                          name="name"
                          id="name"
                          placeholder="Enter tag name"
                          onChange={handleTags}
                          value={tagsDetail.name}
                        />

                        <select
                          name="color"
                          id="color"
                          className="w-full bg-black-300 px-5 py-2 rounded-lg placeholder:text-white-500 text-lg text-white-800 shadow-black-200 shadow-2xl focus:outline-none"
                          onChange={handleTags}
                          value={tagsDetail.color}
                        >
                          <option className="text-black-200" value="">
                            Select color
                          </option>
                          <option
                            className="text-black-200"
                            value="blue-text-gradient"
                          >
                            Blue Gradient
                          </option>
                          <option
                            className="text-black-200"
                            value="green-text-gradient"
                          >
                            Green Gradient
                          </option>
                          <option
                            className="text-black-200"
                            value="orange-text-gradient"
                          >
                            Orange Gradient
                          </option>
                          <option
                            className="text-black-200"
                            value="pink-text-gradient"
                          >
                            Pink Gradient
                          </option>
                        </select>
                      </div>
                      <button
                        type="button"
                        onClick={handleAddTags}
                        className="flex items-center justify-center gap-2 bg-neutral-700 text-white px-4 py-2 rounded-md hover:bg-neutral-600 transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-500"
                      >
                        Add
                      </button>
                    </div>
                    {errorTags.name && (
                      <p className="text-red-500 text-sm">{errorTags.name}</p>
                    )}
                    {errorTags.color && (
                      <p className="text-red-500 text-sm">{errorTags.color}</p>
                    )}

                    {/* Tags List */}
                    <ul className="space-y-3">
                      {tags.map((tag, index) => (
                        <li
                          key={index}
                          className={`flex justify-between items-center p-3 rounded-lg ${tag.color} bg-opacity-10 border border-opacity-20 border-white text-sm`}
                        >
                          <div className="flex items-center space-x-3">
                            <span
                              className={`w-3 h-3 rounded-full ${tag.color}`}
                            ></span>
                            <span className="font-medium text-white">
                              {tag.name}
                            </span>
                            <span className="text-xs text-gray-400">
                              ({tag.color})
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              type="button"
                              onClick={() => handleEdit(index)}
                              className="flex items-center justify-center w-9 h-9 bg-neutral-700/50 text-blue-400 rounded-full hover:bg-neutral-600/50 hover:text-blue-300 transition-all"
                            >
                              <IoMdCreate className="text-lg" />
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteTags(index)}
                              className="flex items-center justify-center w-9 h-9 bg-neutral-700/50 text-red-400 rounded-full hover:bg-neutral-600/50 hover:text-red-300 transition-all"
                            >
                              <IoMdTrash className="text-lg" />
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-center">
                    <button
                      disabled={loading}
                      type="submit"
                      className="flex items-center justify-center gap-2 
                    bg-neutral-700 text-white 
                    px-4 py-2 rounded-md 
                    hover:bg-neutral-600 
                    transition-colors 
                    focus:outline-none 
                    focus:ring-2 focus:ring-neutral-500 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <span>Submit Project</span>
                      <IoIosSend className="text-xl" />
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </section>
        </div>
      </div>
      <ToastContainer theme="dark" />
    </DashboardLayout>
  );
};

export default Page;
