"use client";

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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
      <h1 className="capitalize text-[40px] md:text-5xl lg:text-6xl text-blue-100 text-center ">
        My {makeTextPurple("Work Experience")}
      </h1>
      <div className="mt-20 flex flex-col">
        <VerticalTimeline lineColor="#fff">
          {experiences.map((expo, i) => {
            return (
              <VerticalTimelineElement
                key={i}
                contentStyle={{
                  background: "#1d1836",
                  color: "#fff",
                  visibility: "visible",
                }}
                contentArrowStyle={{
                  borderRight: "7px solid #232631",
                }}
                date={expo.date}
                iconStyle={{ background: expo.iconBg, visibility: "visible" }}
                icon={
                  <div className="flex justify-center items-center w-full h-full  ">
                    <Image
                      // src={expo.icon}
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
                  <p
                    className="text-secondary text-[16px] font-semibold"
                    style={{ margin: 0 }}
                  >
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
            );
          })}
        </VerticalTimeline>
      </div>
    </section>
  );
};

export default WorkEx;
