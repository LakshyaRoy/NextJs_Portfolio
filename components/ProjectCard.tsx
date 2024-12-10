"use client";

import React, { useEffect } from "react";
import TailwindcssButtons from "./ui/tailwindcss-buttons";
import { FaGithub, FaLocationArrow } from "react-icons/fa";
import Image from "next/image";
import { Projects } from "@/data";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const ProjectCard = () => {
  const showNumberings = (index: number) => {
    const num = index + 1;
    if (num < 10) {
      return `0${num}`;
    }
    return num;
  };

  useEffect(() => {
    const media = gsap.matchMedia();

    // Desktop view
    media.add("(min-width: 768px)", () => {
      gsap.utils.toArray(".card").forEach((card: any) => {
        gsap.to(card, {
          scale: 0.5,
          opacity: 0,
          scrollTrigger: {
            trigger: card,
            start: "top 30%",
            end: "bottom 50%",
            scrub: true,
            //  markers: true,
          },
        });
      });
    });

    // Mobile view (426px - 767px)
    media.add("(min-width: 426px) and (max-width: 767px)", () => {
      gsap.utils.toArray(".card").forEach((card: any) => {
        gsap.to(card, {
          scale: 0.5,
          opacity: 0,
          scrollTrigger: {
            trigger: card,
            start: "top 50%",
            end: "bottom 70%",
            scrub: true,
            //  markers: true,
          },
        });
      });
    });

    // Smallest mobile view (0px - 425px)
    media.add("(max-width: 425px)", () => {
      gsap.utils.toArray(".card").forEach((card: any) => {
        gsap.to(card, {
          scale: 0.5,
          opacity: 0,
          scrollTrigger: {
            trigger: card,
            start: "top 15%",
            end: "bottom 60%",
            scrub: true,
            //  markers: true,
          },
        });
      });
    });

    return () => media.revert(); // Cleanup on component unmount
  }, []);

  return (
    <div className="w-full h-full" id="project">
      <section className="text-center mb-16">
        <TextGenerateEffect
          className="text-white font-black  sm:text-[50px] text-[30px]"
          words="A Small Selection of Recent Projects"
        />
      </section>
      {Projects.map((project, index) => {
        return (
          <div
            key={index}
            className="card sticky top-[10vh] md:top-[30vh] w-full border-b-2 border-gray-500 pb-8 mb-8"
          >
            <div className="w-full flex flex-col md:flex-row justify-between items-center gap-8">
              {/* Left Section */}
              <div className="w-full md:w-[33%] flex flex-col">
                <h2 className="text-5xl font-bold italic ">
                  <span className="text-purple">{showNumberings(index)}</span>
                </h2>
                <p className="text-xl md:text-3xl font-semibold mt-2 ">
                  {project.name}
                </p>

                <div className="flex gap-4 w-full mt-4 md:mt-0">
                  <TailwindcssButtons
                    position="left"
                    icon={<FaGithub size={20} color="#fff" />}
                    title="GitHub Repo"
                  />
                  <TailwindcssButtons
                    icon={
                      <FaLocationArrow className="hover:text-purple text-inherit transition-all duration-200" />
                    }
                    position="right"
                    title="Live Preview"
                  />
                </div>
              </div>

              {/* Middle Section */}
              <div className="w-full md:w-[33%] flex justify-center">
                <Image
                  src={project.image}
                  alt="Project Image"
                  width={500}
                  height={500}
                  className="w-full md:w-[90%] h-auto rounded-2xl shadow-lg"
                />
              </div>

              {/* Right Section */}
              <div className="w-full md:w-[33%] flex flex-col gap-4">
                <p className=" leading-relaxed">
                  This repository contains the source code and assets for a
                  React-based Single Page Application (SPA) that allows users to
                  select TV shows, view detailed information about them, and
                  book movie tickets.
                </p>

                <div className="flex gap-2 mt-4 flex-wrap">
                  {project?.tags.map((tech, index) => (
                    <div
                      key={index}
                      className={`rounded-full border-2 border-gray-500 py-1 px-4 w-fit text-sm font-medium ${tech.color}`}
                    >
                      {tech.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <section className="flex justify-end">
        <Link href="/project">
          <TailwindcssButtons
            title="More Projects"
            icon={<FaLocationArrow />}
            position="right"
          />
        </Link>
      </section>
    </div>
  );
};

export default ProjectCard;
