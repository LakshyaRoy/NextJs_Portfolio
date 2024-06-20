"use client";

import React from "react";
import Image from "next/image";
import LakshyaRoy from "@/assets/LakshyaRoy.png";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import { BackgroundGradient } from "./ui/background-gradient";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaCircleChevronRight, FaCircleChevronLeft } from "react-icons/fa6";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import Cards from "./Cards";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectCoverflow,
} from "swiper/modules";
import "@/app/globals.css";
import { commonStylesForComponents } from "@/data";
import { makeTextPurple } from "@/utils/makeTextPurple";

const AboutHero = () => {
  const aboutme = {
    description: ` Hi there! I'm Lakshya Roy, a front-end developer with a passion for
            creating user-friendly and interactive web applications. I have one
            year of experience working in the tech industry, and I'm skilled in
            React.js, TailwindCSS, and even learning TypeScript & NextJs. I'm always looking for new
            challenges and opportunities to learn and grow as a developer.`,
  };

  const certificates = [
    {
      CertificatesName: "Certificates",
      CertificatesDescription: "Here are some of my Certificates",
      image:
        "https://media.licdn.com/dms/image/D4D22AQGuw_qgQWeRtw/feedshare-shrink_2048_1536/0/1715679070105?e=1721865600&v=beta&t=Xv0NVRc7VL-wn2Rx5yKUZ88b9nekGahKgVx2Wwz9TlI",
    },
    {
      CertificatesName: "Certificates",
      CertificatesDescription: "Here are some of my Certificates",
      image:
        "https://media.licdn.com/dms/image/D4D22AQGuw_qgQWeRtw/feedshare-shrink_2048_1536/0/1715679070105?e=1721865600&v=beta&t=Xv0NVRc7VL-wn2Rx5yKUZ88b9nekGahKgVx2Wwz9TlI",
    },
    {
      CertificatesName: "Certificates",
      CertificatesDescription: "Here are some of my Certificates",
      image:
        "https://media.licdn.com/dms/image/D4D22AQGuw_qgQWeRtw/feedshare-shrink_2048_1536/0/1715679070105?e=1721865600&v=beta&t=Xv0NVRc7VL-wn2Rx5yKUZ88b9nekGahKgVx2Wwz9TlI",
    },
    {
      CertificatesName: "Certificates",
      CertificatesDescription: "Here are some of my Certificates",
      image:
        "https://media.licdn.com/dms/image/D4D22AQGuw_qgQWeRtw/feedshare-shrink_2048_1536/0/1715679070105?e=1721865600&v=beta&t=Xv0NVRc7VL-wn2Rx5yKUZ88b9nekGahKgVx2Wwz9TlI",
    },
    {
      CertificatesName: "Certificates",
      CertificatesDescription: "Here are some of my Certificates",
      image:
        "https://media.licdn.com/dms/image/D4D22AQGuw_qgQWeRtw/feedshare-shrink_2048_1536/0/1715679070105?e=1721865600&v=beta&t=Xv0NVRc7VL-wn2Rx5yKUZ88b9nekGahKgVx2Wwz9TlI",
    },
    {
      CertificatesName: "Certificates",
      CertificatesDescription: "Here are some of my Certificates",
      image:
        "https://media.licdn.com/dms/image/D4D22AQGuw_qgQWeRtw/feedshare-shrink_2048_1536/0/1715679070105?e=1721865600&v=beta&t=Xv0NVRc7VL-wn2Rx5yKUZ88b9nekGahKgVx2Wwz9TlI",
    },
    {
      CertificatesName: "Certificates",
      CertificatesDescription: "Here are some of my Certificates",
      image:
        "https://media.licdn.com/dms/image/D4D22AQGuw_qgQWeRtw/feedshare-shrink_2048_1536/0/1715679070105?e=1721865600&v=beta&t=Xv0NVRc7VL-wn2Rx5yKUZ88b9nekGahKgVx2Wwz9TlI",
    },
    {
      CertificatesName: "Certificates",
      CertificatesDescription: "Here are some of my Certificates",
      image:
        "https://media.licdn.com/dms/image/D4D22AQGuw_qgQWeRtw/feedshare-shrink_2048_1536/0/1715679070105?e=1721865600&v=beta&t=Xv0NVRc7VL-wn2Rx5yKUZ88b9nekGahKgVx2Wwz9TlI",
    },
  ];

  return (
    <section className="mt-36 md:mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="min-h-screen h-full flex flex-col md:flex-row items-center justify-around gap-10">
        <div className="w-fit">
          <BackgroundGradient className="rounded-[22px] max-w-sm bg-white dark:bg-zinc-900">
            <figure className="relative">
              <Image
                src={LakshyaRoy}
                alt="I am standing along a podium with a laptop"
                className="w-[350px] h-[460px] object-cover rounded-[22px]"
              />
            </figure>
          </BackgroundGradient>
        </div>
        <div className="mt-4 text-center md:w-1/2 md:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-blue-100">
            <TextGenerateEffect words="About Me" />
          </h1>
          <p className="mt-4 text-secondary text-lg md:text-xl text-left">
            {aboutme.description}
          </p>
        </div>
      </div>
      <div className="mx-auto capitalize my-10">
        <h2 className="text-white text-center font-black md:text-[50px] sm:text-[50px] xs:text-[40px] text-[30px]">
          Academic Milestones
        </h2>
        <p className="mt-4 text-secondary text-lg md:text-xl">
          I hold a Bachelor of Computer Application (BCA) degree from{" "}
          {makeTextPurple("Birla Institute of Technology, Mesra, Patna,")}
          graduating in 2024. Recently, I completed a six-month internship at
          {makeTextPurple(" LifeBonder")}, where I gained valuable experience in
          frontend development. During my academic journey, I also secured 2nd
          place in
          {makeTextPurple(" Citro Hack 2023")} among 56 projects from 49
          countries, served as {makeTextPurple(" Design Head and Webmaster")}
          for various clubs at BIT Patna, and hosted a two-day Bootcamp on
          frontend development for the {makeTextPurple(" Technical Club")}.
        </p>
      </div>
      <div>
        <h4 className="text-white text-center font-black text-[30px] xs:text-[40px] sm:text-[50px] md:text-[50px] capitalize py-5 md:py-10">
          Certificates
        </h4>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, EffectCoverflow]}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{ clickable: true, el: ".swiper-pagination" }}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          // slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 250,
            modifier: 1.5,
            slideShadows: true,
          }}
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 40 },
            1024: { slidesPerView: 3, spaceBetween: 45 },
          }}
          className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 "
        >
          {certificates.map((certificates, i) => (
            <SwiperSlide key={i}>
              <Cards
                name={certificates.CertificatesName}
                image={certificates.image}
                certificateName={certificates.CertificatesName}
                CertificateDescription={certificates.CertificatesDescription}
              />
            </SwiperSlide>
          ))}
          <div className="slider-controller">
            <div className="swiper-button-prev slider-arrow">
              <FaCircleChevronLeft name="arrow-back-outline" />
            </div>
            <div className="swiper-button-next slider-arrow">
              <FaCircleChevronRight name="arrow-forward-outline" />
            </div>
            <div className="swiper-pagination"></div>
          </div>
        </Swiper>
      </div>
    </section>
  );
};

export default AboutHero;
