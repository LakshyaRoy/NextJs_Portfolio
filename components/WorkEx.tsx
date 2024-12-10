"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { experiences } from "@/data";
import { makeTextPurple } from "@/utils/makeTextPurple";
import Image from "next/image";
import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component/dist-es6";
import "react-vertical-timeline-component/style.min.css";

const WorkEx = () => {
  return (
    <section
      className="w-full mx-auto px-4 sm:px-6 lg:px-8 pt-24"
      id="experience"
    >
      <h1 className="text-white font-black  sm:text-[50px] text-[30px] text-center">
        My {makeTextPurple("Work Experience")}
      </h1>
      <div className="mt-20 flex flex-col">
        <VerticalTimeline lineColor="#fff">
          {experiences.map((expo, i) => {
            return (
              <AnimatedTimelineElement key={i} i={i}>
                <VerticalTimelineElement
                  className={
                    i % 2 === 0 ? "" : "vertical-timeline-element--right w-full"
                  }
                  contentStyle={{
                    background: "#1d1836",
                    color: "#fff",
                    visibility: "visible",
                  }}
                  contentArrowStyle={{
                    borderRight: i % 2 === 0 ? "7px solid #232631" : "none",
                    borderLeft: i % 2 === 1 ? "7px solid #232631" : "none",
                  }}
                  date={expo.date}
                  iconStyle={{ background: expo.iconBg, visibility: "visible" }}
                  icon={
                    <div className="flex justify-center items-center w-full h-full  ">
                      <Image
                        src="https://lifebonder.com/images/logo-logotext-small.webp"
                        alt={expo.company_name}
                        className="w-[60%] h-[60%] object-contain "
                        width={100}
                        height={100}
                      />
                    </div>
                  }
                >
                  <div>
                    <h3 className="text-white text-[24px] font-bold">
                      {expo.title}
                    </h3>
                    <p className="text-secondary text-[16px] font-semibold m-0">
                      {expo.company_name}
                    </p>
                  </div>
                  <ul className="mt-5 list-disc ml-5 space-y-2">
                    {expo.points.map((point, index) => (
                      <li
                        key={index}
                        className="text-white-100 text-[14px] pl-1 tracking-wider"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </VerticalTimelineElement>
              </AnimatedTimelineElement>
            );
          })}
        </VerticalTimeline>
      </div>
    </section>
  );
};

export default WorkEx;

const AnimatedTimelineElement = ({ children, i }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const variants = {
    hidden: {
      opacity: 0,
      x: i % 2 === 0 ? -50 : 50,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      className="my-10"
    >
      {children}
    </motion.div>
  );
};
