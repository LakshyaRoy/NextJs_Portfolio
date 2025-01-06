"use client";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import InputField from "@/components/MicroComponents/InputField";
import { firestore } from "@/firebase/Firebase";
import { useStore } from "@/zustand/store";
import { addDoc, collection } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { IoIosSend } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";

const Page = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imagepreview, setImagepreview] = useState<string | null>(null);
  const [loading, setLaoding] = useState<boolean>(false);
  const { fetchTechstack } = useStore();
  const dbCollection = collection(firestore, "techstacks");
  interface FormData {
    name: string;
    description: string;
  }

  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
  });
  const [error, setError] = useState<Partial<FormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevs) => ({
      ...prevs,
      [name]: value,
    }));

    setError((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagepreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImage(null);
      setImagepreview(null);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagepreview(null);
  };

  const validation = () => {
    let isValid = true;
    let tempError: Partial<FormData> = {};

    if (!formData.name.trim()) {
      tempError.name = "Name is required";
      isValid = false;
    }
    if (!formData.description.trim()) {
      tempError.description = "Description is required";
      isValid = false;
    }
    setError(tempError);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!image) {
      return alert("Please select an image");
    }

    if (!validation()) {
      return;
    }

    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    if (!uploadPreset) {
      console.error("Cloudinary upload preset is missing");
      return;
    }

    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append("file", image);
    cloudinaryFormData.append("upload_preset", uploadPreset);

    // Function to upload image to Cloudinary
    const uploadImage = () =>
      new Promise<string>(async (resolve, reject) => {
        try {
          const response = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
              method: "POST",
              body: cloudinaryFormData,
            }
          );

          if (!response.ok) {
            throw new Error("Failed to upload image");
          }

          const data = await response.json();
          resolve(data.secure_url); // Return the image URL
        } catch (err) {
          reject(err); // Reject with the error
        }
      });

    try {
      // Upload image and get the URL
      const imageLink = await uploadImage();

      if (!imageLink) {
        alert("Failed to upload image");
        return;
      }

      // Prepare document data
      const docData = {
        name: formData.name,
        description: formData.description,
        image: imageLink,
        createdAt: new Date(),
      };

      // Add data to Firebase
      try {
        setLaoding(true);
        const addTeckStack = await addDoc(dbCollection, docData);
        await fetchTechstack();
        console.log("Document added", addTeckStack);
      } catch (error) {
        console.error("Error adding document:", error);
      } finally {
        setLaoding(false);
      }
      resetForm(); // Reset the form after successful submission
    } catch (err) {
      console.error("Error during submission:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  const resetForm = () => {
    setFormData({ name: "", description: "" });
    setImage(null);
    setImagepreview(null);
    setError({});
  };

  return (
    <DashboardLayout>
      <div className="w-full flex items-center justify-center h-full">
        <div className="w-full max-w-7xl h-full ">
          <Link
            href="/dashboard/techstack"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors  group"
          >
            <IoArrowBack className="text-xl group-hover:transform group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm">Back to TechStack</span>
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
                </div>

                <div className="w-full max-w-lg space-y-6">
                  <InputField
                    formValue={formData.name}
                    error={error.name}
                    handleChange={handleChange}
                    name="name"
                    placeholder="Enter TechStack Name"
                  />
                  <InputField
                    formValue={formData.description}
                    error={error.description}
                    handleChange={handleChange}
                    name="description"
                    placeholder="Enter TechStack Description"
                  />

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
                      <span>Submit Techstack</span>
                      <IoIosSend className="text-xl" />
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Page;
