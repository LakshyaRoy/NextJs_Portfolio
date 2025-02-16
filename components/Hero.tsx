import React from "react";
import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import TailwindcssButtons from "./ui/tailwindcss-buttons";
import { FaLocationArrow, FaLinkedin, FaGithub } from "react-icons/fa";
import Image from "next/image";
import "@/app/globals.css";
import Link from "next/link";
import LakshyaRoy from "@/assets/LakshyaRoy.png";

const Hero = () => {
  return (
    <div className=" pt-16 sm:pt-20 relative" id="home">
      <div>
        <Spotlight
          className="top-[5rem] left-[4rem] sm:-top-40 sm:-left-10 md:-left-32 md:-top-20 h-screen"
          fill="white"
        />
        <Spotlight
          className="top-[6rem] sm:top-28 sm:left-80 md:left-auto md:right-80 h-[80vh] w-[125vw] sm:w-[50vw]"
          fill="blue"
        />
        <Spotlight
          className="top-[10rem] sm:top-0 sm:left-20 md:left-auto md:right-20 h-[80vh] w-[200vh]  sm:w-[50vw]"
          fill="white"
        />
      </div>
      <div className="h-full w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.04] bg-grid-black/[0.3] flex items-center justify-center absolute top-0 left-0">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>
      <div className="flex justify-center relative my-20 z-10 items-center gap-10">
        {/* left */}
        <div className=" w-full sm:w-1/2 md:max-w-2xl flex flex-row lg:max-w-[60vw] items-start justify-start sm:justify-center gap-2 sm:gap-10">
          <div className="flex flex-col justify-center items-center mt-5">
            <div className="w-5 h-5 rounded-full bg-[#915eff]"></div>
            <div className="w-1 sm:h-80 h-40 bg-violet-gradient"></div>
          </div>
          <div>
            <TextGenerateEffect
              className="text-left capitalize text-3xl sm:text-[40px] md:text-5xl  text-blue-100"
              words="with figma wireframes in hand i bring website to life!"
            />
            <p className="text-left capitalize md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl">
              hi, I&apos;m Lakshya Roy, a Frontend Developer from India.
            </p>
            <div className=" flex flex-col sm:flex-row  justify-start items-start sm:items-center gap-4">
              <Link href="/about" className="w-72 sm:w-fit">
                <TailwindcssButtons
                  title="Know About me!"
                  icon={<FaLocationArrow />}
                  position="right"
                />
              </Link>
              <Link href="/contact" className="w-72 sm:w-fit">
                <TailwindcssButtons
                  title="Let's Talk!"
                  icon={<FaLocationArrow />}
                  position="right"
                />
              </Link>
            </div>
          </div>
        </div>
        {/* right */}
        <div className="w-1/2 md:max-w-2xl lg:max-w-[60vw] sm:flex justify-center items-center hidden">
          <div className="heroImage relative bg-cover rounded-[130px]  ">
            <div className="beforeImg " />
            <div className="afterImg" />
            <div className="flex justify-center items-center w-[220px]  h-[70px] text-[#141414]  absolute BouncingCard ">
              <FaLinkedin size={30} className="w-2/6" />
              <Link
                href="https://www.linkedin.com/in/lakshya-roy729/"
                target="_blank"
                className=" flex flex-col w-2/3"
              >
                <span className="font-bold text-xl">LinkedIn</span>
                <span className="text-sm">@lakshya-roy729</span>
              </Link>
            </div>
            <div className="flex justify-center items-center w-[220px]  h-[70px] text-[#141414]  absolute  movingCard  ">
              <FaGithub size={30} className="w-2/6" />
              <Link
                href="https://github.com/LakshyaRoy"
                target="_blank"
                className=" flex flex-col w-2/3"
              >
                <span className="font-bold text-xl">GitHub</span>
                <span className="text-sm">@LakshyaRoy </span>
              </Link>
            </div>
            <Image
              src={LakshyaRoy}
              alt="I am standing along a podium with a laptop"
              className="rounded-[100px] w-[350px] h-[460px] object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
