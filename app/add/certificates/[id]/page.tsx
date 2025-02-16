"use client";

import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import InputField from "@/components/MicroComponents/InputField";
import { firestore } from "@/firebase/Firebase";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoIosSend, IoMdAdd } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";
import { useStore } from "@/zustand/store";
import { useParams, useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
const AddCertificates: React.FC = () => {
  interface FormData {
    name: string;
    source: string;
  }
  const { fetchCertificates } = useStore();
  const certificateApi = async () => {
    await fetchCertificates();
  };

  const [formData, setFormData] = useState<FormData>({
    name: "",
    source: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Partial<FormData>>({});
  const [image, setImage] = useState<File | null>(null);
  const [imagepreview, setImagepreview] = useState<string | null>(null);
  const [imageId, setImageId] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const { id } = useParams();
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
        setImageError(null);
      };
      reader.readAsDataURL(file);
    }
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

    try {
      // Validate form inputs
      if (!image) {
        setImageError("Please enter an image");
        return;
      }

      if (handleError()) {
        toast.error("Form submission failed due to validation errors");
        return;
      }

      // Check environment variables
      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

      if (!uploadPreset || !cloudName) {
        throw new Error("Missing Cloudinary configuration");
      }

      // Handle image upload if there's a new image
      let imageDetails = null;
      if (!image) {
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
          throw new Error("Failed to upload image");
        }

        const data = await response.json();
        imageDetails = {
          secure_url: data.secure_url,
          public_id: data.public_id,
        };
      }

      // Prepare document data for Firestore
      const docData = {
        name: formData.name,
        source: formData.source,
        image: imageDetails?.secure_url || imagepreview, // Use new image URL or keep existing preview
        imageId: imageDetails?.public_id || imageId, // Keep track of existing image ID
        updatedAt: new Date(), // Add update timestamp
      };

      // Update the document directly using doc() reference
      try {
        setLoading(true);
        const docRef = doc(firestore, "certificates", id);
        await updateDoc(docRef, docData);
        toast.success("Document updated successfully");
        await certificateApi();
      } catch (e) {
        console.error("Error during update certificate:", error);
      } finally {
        setLoading(false);
      }

      // Reset form state
      setFormData({ name: "", source: "" });
      setImage(null);
      setImagepreview(null);
      setError({});
      router.push("/dashboard/certificates");
    } catch (error) {
      console.error("Error during form submission:", error);
      toast.error("Form submission failed");
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagepreview(null);
    setImageError(null);
  };

  useEffect(() => {
    if (id) {
      const fetchCertificateData = async () => {
        const docRef = doc(firestore, "certificates", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const certificateData = docSnap.data();
          // console.log(certificateData);
          setFormData({
            name: certificateData.name,
            source: certificateData.source,
          });
          setImage(certificateData.image);
          setImageId(certificateData.imageId);
          setImagepreview(certificateData.image);
        }
      };
      fetchCertificateData();
    }
  }, [id]);

  return (
    <DashboardLayout>
      <main className="w-full flex items-center justify-center h-full ">
        <div className="w-full max-w-7xl h-full ">
          <Link
            href="/dashboard/certificates"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors mb-6 group"
          >
            <IoArrowBack className="text-xl group-hover:transform group-hover:-translate-x-1 transition-transform" />
            Back to Certificates
          </Link>

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
                  {imageError && (
                    <p className="text-red-500 text-center w-full text-xs mt-4">
                      {imageError}
                    </p>
                  )}
                </div>

                {/* Input Fields */}
                <div className="w-full space-y-4">
                  <InputField
                    formValue={formData.name}
                    error={error.name}
                    handleChange={handleChange}
                    name="name"
                    placeholder="Enter certificate name"
                  />
                  <InputField
                    formValue={formData.source}
                    error={error.source}
                    handleChange={handleChange}
                    name="source"
                    placeholder="Enter certificate source"
                  />
                </div>

                {/* Submit Button */}
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
                  <span>Edit Certificate</span>
                  <IoIosSend />
                </button>
              </div>
            </form>
          </section>
        </div>
      </main>
      <ToastContainer theme="dark" />
    </DashboardLayout>
  );
};

export default AddCertificates;
