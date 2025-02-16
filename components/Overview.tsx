"use client";

import { makeTextPurple } from "@/utils/makeTextPurple";
import React, { useRef } from "react";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import Cards from "./Cards";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectCoverflow,
  Autoplay,
} from "swiper/modules";
import "@/app/globals.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Computer from "./Model/Computer";
// import { certificates } from "@/data";

const Overview = ({ certificates }: { certificates: any }) => {
  const styles = {
    sectionHeadText: "text-white font-black  sm:text-[50px] text-[30px]",
    sectionSubText:
      "sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider",
    paraStyles: " mt-4 text-secondary text-[17px]  leading-[30px] ",
  };
  return (
    <section
      className="flex items-start justify-start gap-5 flex-col xl:flex-row mb-12 "
      id="about"
    >
      <div className="flex flex-col items-start justify-start gap-5 w-full xl:w-[70%]">
        <OverviewContainer styles={styles} classes={``} />
        <AcademicContainer styles={styles} classes={`hidden xl:block`} />
        <div className="mt-10 w-full h-full xl:h-[28rem] bg-gray-800 reviewCard  rounded-lg relative p-5 hover:bg-black-300 cursor-pointer transition-all duration-300 block xl:hidden">
          <CertificateContainer certificates={certificates} />
        </div>
      </div>
      <div className="flex flex-col items-start justify-start gap-5 w-full xl:w-[30%]">
        <div className="mt-10 w-full h-full xl:h-[28rem] bg-gray-800 reviewCard  rounded-lg relative p-5 hover:bg-black-300 cursor-pointer transition-all duration-300 hidden xl:block">
          <CertificateContainer certificates={certificates} />
        </div>
        <AcademicContainer styles={styles} classes={`block xl:hidden`} />
        <div className=" w-full h-full xl:h-96 bg-gray-800 reviewCard  rounded-lg relative p-5 hover:bg-black-300 cursor-pointer transition-all duration-300">
          <Computer />
        </div>
      </div>
    </section>
  );
};

export default Overview;

const OverviewContainer = ({
  styles,
  classes,
}: {
  styles: any;
  classes: string;
}) => {
  return (
    <div
      className={`mt-10 w-full h-full xl:h-96 bg-gray-800 reviewCard  rounded-lg relative p-5 xl:p-10  hover:bg-black-300 cursor-pointer transition-all duration-300 ${classes}`}
    >
      <p className={styles.sectionSubText}>Introduction</p>
      <h2 className={styles.sectionHeadText}>Overview.</h2>
      <div className={styles.paraStyles}>
        Hi there! I'm {makeTextPurple("Lakshya Roy")}, a{" "}
        {makeTextPurple("front-end developer")} with a strong passion for
        creating {makeTextPurple("intuitive")},{" "}
        {makeTextPurple("user-friendly")}, and{" "}
        {makeTextPurple("interactive web applications")}. With more than{" "}
        {makeTextPurple("one year of experience")} in the{" "}
        {makeTextPurple("tech industry")}, I have honed my skills in{" "}
        {makeTextPurple("React.js")} and {makeTextPurple("TailwindCSS")}, and am
        currently expanding my expertise by learning{" "}
        {makeTextPurple("TypeScript")} and {makeTextPurple("Next.js")}. I am
        driven to craft {makeTextPurple("clean")},{" "}
        {makeTextPurple("responsive designs")} that align with{" "}
        {makeTextPurple("modern web standards")} and contribute to{" "}
        {makeTextPurple("impactful projects")}. Always eager for{" "}
        {makeTextPurple("new challenges")}, I thrive on{" "}
        {makeTextPurple("collaboration")} and{" "}
        {makeTextPurple("continuous learning")} to grow as a developer.
      </div>
    </div>
  );
};

const AcademicContainer = ({
  styles,
  classes,
}: {
  styles: any;
  classes: string;
}) => {
  return (
    <div
      className={`mt-5 w-full h-full xl:h-[27rem] bg-gray-800 reviewCard  rounded-lg relative p-5 xl:p-10 hover:bg-black-300 cursor-pointer transition-all duration-300 ${classes}`}
    >
      <h2 className={styles.sectionHeadText}>Academic Milestones.</h2>
      <p className={styles.paraStyles}>
        I graduated with a Bachelor of Computer Applications (BCA) from{" "}
        {makeTextPurple("Birla Institute of Technology, Mesra, Patna")} in{" "}
        {makeTextPurple("2024")}. Presently, I am employed as a{" "}
        {makeTextPurple("frontend developer")} at{" "}
        {makeTextPurple("Unified Mentor")}, where I have refined my ability to
        build responsive and functional user interfaces. During my academic
        tenure, I earned recognition by securing {makeTextPurple("2nd place")}{" "}
        in {makeTextPurple("Citro Hack 2023")}, competing on a global platform
        with {makeTextPurple("56 projects from 49 countries")}. I also led
        creative and technical initiatives as the{" "}
        {makeTextPurple("Design Head")} for clubs such as the{" "}
        {makeTextPurple("Technical Club and Esports Club")} at{" "}
        {makeTextPurple("BIT Patna")}. Furthermore, I managed web operations for
        my college’s flagship event {makeTextPurple("Technika")} as a{" "}
        {makeTextPurple("webmaster")} and conducted a hands-on Bootcamp on{" "}
        {makeTextPurple("frontend development")} for aspiring developers in my{" "}
        {makeTextPurple("Technical Club")}.
      </p>
    </div>
  );
};

const CertificateContainer = ({ certificates }: { certificates: any }) => {
  const swiperRef = useRef(null);
  const goPrev = () => {
    if (swiperRef.current) {
      const swiperInstance = swiperRef.current.swiper;
      if (swiperInstance) {
        // Ensure it works across all breakpoints
        swiperInstance.slidePrev();
      }
    }
  };

  const goNext = () => {
    if (swiperRef.current) {
      const swiperInstance = swiperRef.current.swiper;
      if (swiperInstance) {
        // Ensure it works across all breakpoints
        swiperInstance.slideNext();
      }
    }
  };

  return (
    <div className="w-full h-full">
      <Swiper
        ref={swiperRef}
        modules={[Pagination, EffectCoverflow, Autoplay, Navigation]}
        pagination={{ clickable: true, el: ".swiper-pagination" }}
        navigation={false}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        className="w-full"
        breakpoints={{
          // Default for mobile
          0: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          // Tablet
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          // Desktop
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          // Large Desktop
          1280: {
            slidesPerView: 1,
            spaceBetween: 40,
          },
        }}
      >
        {certificates.map((certificate: any, i: number) => (
          <SwiperSlide key={i}>
            <Cards
              image={certificate.image}
              certificateName={certificate.name}
              CertificateDescription={certificate.source}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Custom Navigation Buttons */}
      <div className="flex justify-end items-center mt-4 gap-5">
        <button
          onClick={goPrev}
          className="bg-black-300 w-8 h-8 flex justify-center items-center rounded-full text-white hover:bg-black-200"
        >
          <FaChevronLeft size={20} />
        </button>
        <button
          onClick={goNext}
          className="bg-black-300 w-8 h-8 flex justify-center items-center rounded-full text-white hover:bg-black-200"
        >
          <FaChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};
