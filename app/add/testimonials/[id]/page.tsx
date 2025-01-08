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
import { IoIosSend } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";

const Page = () => {
  const [imagepreview, setImagepreview] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const router = useRouter();
  const { id } = useParams();
  interface authorData {
    name: string;
    designation: string;
    linkedin: string;
  }
  const [author, setAuthor] = useState<authorData>({
    name: "",
    designation: "",
    linkedin: "",
  });

  interface revieweeData {
    reviewee_name: string;
    reviewee_linkedin: string;
  }
  const [reviewee, setReviewee] = useState<revieweeData>({
    reviewee_name: "",
    reviewee_linkedin: "",
  });
  const [errorReviewee, setErrorReviewee] = useState<revieweeData>({
    reviewee_name: "",
    reviewee_linkedin: "",
  });

  console.log(errorReviewee);
  const [quote, setQuote] = useState<string>("");
  const [error, setError] = useState<Partial<authorData>>({});
  const [quoteError, setQuoteError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [imageId, setImageId] = useState<string>("");
  const dbCollection = collection(firestore, "testimonials");
  const { fetchTestimonial } = useStore();

  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Update Author fields
    if (["name", "designation", "linkedin"].includes(name)) {
      setAuthor((prev) => ({
        ...prev,
        [name]: value,
      }));
      setError((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };
  const handleRevieweeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Correctly map input names to state keys
    if (name === "reviewee_name" || name === "reviewee_linkedin") {
      setReviewee((prev) => ({
        ...prev,
        [name]: value,
      }));
      setErrorReviewee((prev) => ({
        ...prev,
        [name]: "", // Clear the error for the corresponding field
      }));
    }
  };

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
  const removeImage = () => {
    setImage(null);
    setImagepreview(null);
  };

  const handleError = () => {
    let tempError: authorData = {
      name: "",
      designation: "",
      linkedin: "",
    };
    let isError = false;
    const urlRegex =
      /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
    if (!author.name) {
      tempError.name = "Name is required";
      isError = true;
    }
    if (!author.designation) {
      tempError.designation = "Designation is required";
      isError = true;
    }
    if (!author.linkedin) {
      tempError.linkedin = "LinkedIn URL is required";
      isError = true;
    } else if (!author.linkedin.match(urlRegex)) {
      tempError.linkedin = "Invalid URL";
      isError = true;
    }

    if (!quote) {
      setQuoteError("Quote is required");
      isError = true;
    }
    setError(tempError);
    return isError;
  };

  const handleRevieweeError = () => {
    let isError = false;
    let tempError: revieweeData = {
      reviewee_name: "",
      reviewee_linkedin: "",
    };

    const urlRegex =
      /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;

    if (!reviewee.reviewee_name) {
      tempError.reviewee_name = "Name is required";
      isError = true;
    }
    if (!reviewee.reviewee_linkedin) {
      tempError.reviewee_linkedin = "LinkedIn URL is required";
      isError = true;
    } else if (!reviewee.reviewee_linkedin.match(urlRegex)) {
      tempError.reviewee_linkedin = "Invalid URL";
      isError = true;
    } else if (reviewee?.reviewee_linkedin.trim().length < 2) {
      tempError.reviewee_linkedin =
        "LinkedIn URL should be at least 2 characters";
      isError = true;
    }

    setErrorReviewee(tempError); // Set errors
    return isError; // Return error status
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (handleError() || handleRevieweeError()) {
        return alert("Please fill in all the required fields.");
      }
      if (!image) {
        return alert("Please select an image");
      }

      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

      if (!uploadPreset || !cloudName) {
        throw new Error("Missing Cloudinary configuration");
      }

      let imageDetails = null;
      if (!image) {
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
          console.error("Image upload error:", uploadError);
          throw uploadError;
        }
      }

      const docData = {
        author: {
          name: author.name,
          designation: author.designation,
          linkedin: author.linkedin,
          image: imageDetails?.secure_url || imagepreview,
          image_id: imageDetails?.public_id || imageId || "",
        },
        reviewee: {
          name: reviewee.reviewee_name,
          linkedin: reviewee.reviewee_linkedin,
        },
        quote: quote,
        createdAt: new Date(),
      };

      try {
        setLoading(true);
        const docRef = doc(firestore, "testimonials", id);
        await updateDoc(docRef, docData);
        await fetchTestimonial();
        router.push("/dashboard/testimonials");
      } catch (firestoreError) {
        console.error("Firestore operation error:", firestoreError);
        throw firestoreError;
      } finally {
        setLoading(false);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Form submission failed due to validation errors");
    }

    // Reset form fields and errors
    setAuthor({ name: "", designation: "", linkedin: "" });
    setReviewee({ reviewee_name: "", reviewee_linkedin: "" });
    setQuote("");
    setImage(null);
    setImagepreview(null);
    setError({});
  };

  useEffect(() => {
    if (id) {
      const fetchProjects = async () => {
        const docRef = doc(firestore, "testimonials", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setAuthor({
            name: data?.author?.name,
            designation: data?.author?.designation,
            linkedin: data?.author?.linkedin,
          });
          setReviewee({
            reviewee_name: data?.reviewee?.name,
            reviewee_linkedin: data?.reviewee?.linkedin,
          });
          setQuote(data?.quote);
          setImage(data?.author?.image);
          setImagepreview(data?.author?.image);
          setImageId(data?.author?.image_id);
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
            href="/dashboard/testimonials"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors  group"
          >
            <IoArrowBack className="text-xl group-hover:transform group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm">Back to Testimonials</span>
          </Link>

          <section className="w-full min-h-[30vh] bg-neutral-800 rounded-lg shadow-lg px-4 sm:px-6 py-6 max-w-xl mx-auto my-5">
            <form className="space-y-8" onSubmit={handleSubmit}>
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
                  <h1>Author</h1>
                  <InputField
                    formValue={author.name}
                    error={error.name}
                    handleChange={handleAuthorChange}
                    name="name"
                    placeholder="Enter Project name"
                  />
                  <InputField
                    formValue={author?.designation}
                    error={error.designation}
                    handleChange={handleAuthorChange}
                    name="designation"
                    label="Designation"
                    placeholder="Enter his Designation"
                  />
                  <InputField
                    formValue={author.linkedin}
                    error={error.linkedin}
                    handleChange={handleAuthorChange}
                    name="linkedin"
                    label="Linkedin Url"
                    placeholder="Enter his Linkedin Url"
                  />
                  <h2>Reviewee</h2>
                  <InputField
                    formValue={reviewee?.reviewee_name}
                    error={errorReviewee?.reviewee_name}
                    handleChange={handleRevieweeChange}
                    name="reviewee_name"
                    label="Reviewee Name"
                    placeholder="Enter his Reviewee Name"
                  />
                  <InputField
                    formValue={reviewee?.reviewee_linkedin}
                    error={errorReviewee?.reviewee_linkedin}
                    handleChange={handleRevieweeChange}
                    name="reviewee_linkedin"
                    label="Reviewee Linkedin Url"
                    placeholder="Enter his Reviewee Linkedin Url"
                  />

                  <TextArea
                    formValue={quote}
                    error={quoteError}
                    handleChange={(e) => setQuote(e.target.value)}
                    name="quote"
                    placeholder="Enter a Quote"
                    rows={4}
                    cols={30}
                  />

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
                      <span>Submit</span>
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
