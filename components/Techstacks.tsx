"use client";

import React from "react";
import { BackgroundGradient } from "./ui/background-gradient";
import ReactImage from "../assets/react.png";
import Image from "next/image";
import { TextGenerateEffect } from "./ui/text-generate-effect";

const Techstacks = () => {
  const techStackInfos = [
    {
      name: "React JS",
      description: "JavaScript Library",
      image: ReactImage,
    },
    {
      name: "Next.js",
      description: "React Framework",
      image: ReactImage, // Replace with Next.js image
    },
    {
      name: "TypeScript",
      description: "Typed JavaScript",
      image: ReactImage, // Replace with TypeScript image
    },
    {
      name: "Tailwind CSS",
      description: "Utility-first CSS",
      image: ReactImage, // Replace with Tailwind image
    },
    {
      name: "Node.js",
      description: "JavaScript Runtime",
      image: ReactImage, // Replace with Node.js image
    },
    {
      name: "GraphQL",
      description: "Query Language",
      image: ReactImage, // Replace with GraphQL image
    },
  ];

  return (
    <div className="w-full h-full my-12" id="techstack">
      <section className="text-center mb-16">
        <TextGenerateEffect
          className="text-white font-black  sm:text-[50px] text-[30px] capitalize"
          words="Tech Stacks, I use in my projects"
        />
      </section>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {techStackInfos.map((tech, index) => (
          <div
            key={index}
            className=" border border-white   mt-10 w-full bg-gray-800 reviewCard  rounded-lg relative p-5 hover:bg-black-300 cursor-pointer transition-all duration-300"
          >
            <div className="flex flex-col items-center">
              <Image
                src={tech.image}
                alt={`${tech.name} logo`}
                height={100}
                width={100}
                className="object-contain mb-4"
              />
              <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
                {tech.name}
              </h3>
              <span className="px-3 py-1 bg-gray-200 dark:bg-zinc-700 rounded-full text-sm text-gray-800 dark:text-gray-200">
                {tech.description}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Techstacks;
