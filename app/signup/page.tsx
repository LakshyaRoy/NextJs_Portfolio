"use client";
import Image from "next/image";
import Spotlight from "@/assets/spotlight1.png";
import { FaEye, FaEyeSlash, FaLocationArrow } from "react-icons/fa";
import { useState } from "react";
import TailwindcssButtons from "@/components/ui/tailwindcss-buttons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { authentication } from "@/firebase/Firebase";
import Link from "next/link";

// import { useRouter } from "next/router";

interface FormData {
  email: string;
  password: string;
}

const Page = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
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

  const handleShowPassword = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  const handleError = (): boolean => {
    let tempError: Partial<FormData> = {};
    let hasError = false;

    if (!formData.email.trim()) {
      tempError.email = "Email is required";
      hasError = true;
    }

    if (!formData.password.trim()) {
      tempError.password = "Password is required";
      hasError = true;
    }

    setError(tempError);
    return hasError;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (handleError()) {
      alert("Form submission failed due to validation errors");
      return;
    }

    try {
      setLoading(true);
      // const userCredential = await createUserWithEmailAndPassword(
      //   authentication,
      //   formData.email,
      //   formData.password
      // );
      // console.log("User has been created", userCredential);

      setFormData({
        email: "",
        password: "",
      });
    } catch (error: any) {
      alert(error.message || "An error occurred during sign up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full min-h-screen bg-primary relative flex justify-center items-center">
      <div className="flex flex-col gap-5 relative sm:p-10 py-10 px-5 shadow-2xl shadow-black-200 w-full max-w-[90vw] md:max-w-[70vw] lg:max-w-[35vw] h-full   border-white-100 border rounded-lg">
        <Image
          src={Spotlight}
          alt="spotlights"
          className="absolute w-full h-full top-0 left-0 "
          width={500}
          height={500}
        />

        <h1 className="sm:text-4xl text-3xl font-semibold bg-gradient-to-r from-[#BEC1CF] from-60% via-[#D5D8EA] via-60% to-[#D5D8EA] to-100% bg-clip-text text-transparent relative z-10">
          Sign Up
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 justify-center items-center w-full h-full relative z-10"
        >
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="email" className="text-lg text-white-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full bg-black-300 px-5 py-2 min-h-14 rounded-lg placeholder:text-white-500 text-lg text-white-800 shadow-black-200 shadow-2xl focus:outline-none"
              placeholder="Enter your email"
              required
              onChange={handleChange}
              value={formData.email}
            />
            {error.email && <p className="text-red-500">{error.email}</p>}
          </div>
          <div className="flex flex-col gap-2 w-full relative">
            <label htmlFor="password" className="text-lg text-white-600">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="w-full bg-black-300 px-5 py-2 min-h-14 rounded-lg placeholder:text-white-500 text-lg text-white-800 shadow-black-200 shadow-2xl focus:outline-none"
              placeholder="Enter your password"
              required
              onChange={handleChange}
              value={formData.password}
            />
            {error.password && <p className="text-red-500">{error.password}</p>}
            <div className="absolute bottom-[10%] right-3 -translate-y-1/2">
              {showPassword ? (
                <FaEye
                  className="text-xl text-white-600 cursor-pointer"
                  onClick={handleShowPassword}
                  aria-label="Show password"
                />
              ) : (
                <FaEyeSlash
                  className="text-xl text-white-600 cursor-pointer"
                  onClick={handleShowPassword}
                  aria-label="Hide password"
                />
              )}
            </div>
          </div>

          <p className="text-lg text-white-600 w-full text-center">
            Already have an account?{" "}
            <Link href="/login" className=" text-purple underline">
              Login
            </Link>
          </p>

          <TailwindcssButtons
            title={loading ? "Loading..." : "Sign Up"}
            icon={<FaLocationArrow />}
            position="right"
            submit={true}
            disabled={loading}
          />
        </form>
      </div>
    </div>
  );
};

export default Page;
