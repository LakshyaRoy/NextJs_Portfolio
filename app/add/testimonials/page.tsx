"use client";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import InputField from "@/components/MicroComponents/InputField";
import TextArea from "@/components/MicroComponents/TextArea";
import { authentication, firestore } from "@/firebase/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";

const Page = () => {
  const [imagepreview, setImagepreview] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
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

  const dbCollection = collection(firestore, "testimonials");

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
    if (handleError() || handleRevieweeError()) {
      // alert("Form submission failed due to validation errors");
      return;
    }
    if (!image) {
      return alert("Please select an image");
    }

    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    if (!uploadPreset) {
      console.error("Cloudinary upload preset is missing");
      return;
    }

    const cloudinaryFormData = new FormData();
    cloudinaryFormData.append("file", image);
    cloudinaryFormData.append("upload_preset", uploadPreset);

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
      const imageUrl = await uploadImage();
      if (!imageUrl) {
        alert("Failed to upload image");
        return;
      }

      const docData = {
        author: {
          name: author.name,
          designation: author.designation,
          linkedin: author.linkedin,
          image: imageUrl,
        },
        reviewee: {
          name: reviewee.reviewee_name,
          linkedin: reviewee.reviewee_linkedin,
        },
        quote: quote,
      };

      try {
        const addCertificate = await addDoc(dbCollection, docData);
        console.log("Document added", addCertificate);
      } catch (error) {
        console.error("Error adding document:", error);
      }
    } catch (err) {
      console.error("Error during image upload:", err);
      alert("Failed to add certificate");
    }

    // Reset form fields and errors
    setAuthor({ name: "", designation: "", linkedin: "" });
    setReviewee({ reviewee_name: "", reviewee_linkedin: "" });
    setQuote("");
    setImage(null);
    setImagepreview(null);
    setError({});

    // const newReview = {
    //   author: {
    //     name: author.name,
    //     designation: author.designation,
    //     linkedin: author.linkedin,
    //     image: image,
    //   },
    //   reviewee: {
    //     name: reviewee.reviewee_name,
    //     linkedin: reviewee.reviewee_linkedin,
    //   },
    //   quote: quote,
    // };

    // console.log(newReview);
  };

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

const data = {
  review: {
    quote:
      "Lakshya Roy has been at LifeBonder since December 4, 2023, until May 31, 2024. Lakshya has been very reliable all through his internship, and more skilled than you would expect from an intern. He has done a great job helping us improve and optimize our website. If there is something he does not know or have experience in, then he researches and finds a solution. Having Lakshya Roy with us has been a positive experience. He communicates clearly and is always responsive, something that is very important. Lakshya Roy has my warmest and sincerest recommendations.",
    author: {
      name: "Jesper Simonsen",
      designation: "Founder of LifeBonder!",
      profileImage: "Jesper",
      linkedin: "https://www.linkedin.com/in/jesper-simonsen-4092915/",
    },
    reviewee: {
      name: "Lakshya Roy",
      linkedin: "https://www.linkedin.com/in/lakshya-roy729/",
    },
  },
};
