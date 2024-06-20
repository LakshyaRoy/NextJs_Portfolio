"use client";

import { makeTextPurple } from "@/utils/makeTextPurple"; // Ensure this path is correct
import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

const WorkEx = () => {
  const expo = {
    title: "Web Developer",
    company_name: "LifeBonder",
    icon: "https://lifebonder.com/images/logo-logotext-small.webp", // Ensure this is a valid image path
    iconBg: "#383E56",
    date: "Dec 2023 to Current",
    points: [
      "Managed Lifebonder's site for optimal function and user experience. Oversaw updates, design, and performance, utilizing FileZilla FTP for precise version updates and efficient feature integration.",
      "Guided website version control, ensured accurate updates, and secure deployments via FileZilla FTP. Collaborated for streamlined procedures, maintaining current tech and content.",
    ],
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
      <h1 className="text-3xl text-white capitalize text-center">
        My {makeTextPurple("Work Experience")}
      </h1>
      <div className="mt-20 flex flex-col">
        <VerticalTimeline lineColor="#fff">
          <VerticalTimelineElement
            contentStyle={{ background: "#1d1836", color: "#fff" }}
            contentArrowStyle={{ borderRight: "7px solid #232631" }}
            date={expo.date}
            iconStyle={{ background: expo.iconBg }}
            icon={
              <div className="flex justify-center items-center w-full h-full">
                <img
                  src={expo.icon}
                  alt={expo.company_name}
                  className="w-[60%] h-[60%] object-contain"
                />
              </div>
            }
          >
            <div>
              <h3 className="text-white text-[24px] font-bold">{expo.title}</h3>
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
        </VerticalTimeline>
      </div>
    </section>
  );
};

export default WorkEx;
