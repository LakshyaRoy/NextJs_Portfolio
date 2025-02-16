"use client";
import Link from "next/link";
import React, { useRef } from "react";
import GitHubCalendar from "react-github-calendar";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import "./styles.css";
// import required modules
import {
  Autoplay,
  EffectCoverflow,
  Mousewheel,
  Navigation,
  Pagination,
} from "swiper/modules";
import {
  FaLocationArrow,
  FaLinkedin,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import Image from "next/image";
import TextGenerateEffect from "./ui/text-generate-effect";

const Review = ({ testimonials }: { testimonials: any }) => {
  const theme = {
    light: ["#f0f0f0", "#384259"],
    dark: [
      "#1f1f1f", //", // Deepest shade
      "#38265f", // Deeper shade
      "#291e4a", // Even darker shade
      "#1d1635", // Darker shade
      "#151030", // Your reference color
    ],
  };

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
    <section className="py-8">
      <div>
        <TextGenerateEffect
          className="text-center capitalize text-3xl sm:text-[40px] md:text-5xl  text-blue-100"
          words="Kind words from Satisfied Colleagues!"
        />

        <Swiper
          ref={swiperRef}
          modules={[Autoplay, Navigation]}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          spaceBetween={30}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 40,
            },
            768: {
              slidesPerView: 1,
              spaceBetween: 30,
            },
          }}
          className="w-full h-full"
        >
          {testimonials?.map((item) => (
            <SwiperSlide key={item?.id} className="!h-auto pb-12">
              <div className="mt-10 max-w-5xl mx-auto h-fit bg-gray-800 reviewCard rounded-lg relative p-4 sm:p-10">
                <p className="text-white relative">
                  <span className="font-serif hidden sm:block font-bold text-[50px] leading-[0rem] text-purple opacity-40 select-none absolute top-0 left-0">
                    {"“"}
                  </span>
                  {item?.quote}
                </p>
                <div className="flex justify-between items-center md:items-end mt-6">
                  <div className="flex items-center gap-5">
                    <figure className="w-10 h-10 overflow-hidden rounded-full bg-white">
                      <Image
                        src={item?.author?.image}
                        alt={item?.author?.name}
                        className="w-full h-full object-cover"
                        width={100}
                        height={100}
                      />
                    </figure>
                    <blockquote className="text-white">
                      <p className="font-bold flex gap-2 items-center">
                        {item?.author?.name}
                        <Link href={item?.author?.linkedin} target="_blank">
                          <FaLinkedin className="text-blue-500 hover:text-blue-400" />
                        </Link>
                      </p>
                      <p>{item?.author?.designation}</p>
                    </blockquote>
                  </div>
                  <Link href={item?.reviewee?.linkedin} target="_blank">
                    <FaLocationArrow className="hover:text-purple" />
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex justify-end items-center mt-4 gap-5 max-w-5xl mx-auto">
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
      {/* days i code */}
      <div className="mt-16">
        <h4 className="text-white text-center font-black text-[30px] xs:text-[40px] sm:text-[50px] md:text-[50px] capitalize">
          Days I <span className="text-purple">Code!</span>
        </h4>

        <div className="mt-10 flex justify-center items-center ">
          <GitHubCalendar
            username="LakshyaRoy"
            blockSize={15}
            blockMargin={5}
            fontSize={16}
            theme={{
              light: ["#f0f0f0", "#384259"],
              dark: [
                "#1f1f1f", //", // Deepest shade
                "#38265f", // Deeper shade
                "#291e4a", // Even darker shade
                "#1d1635", // Darker shade
                "#151030", // Your reference color
              ],
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Review;
