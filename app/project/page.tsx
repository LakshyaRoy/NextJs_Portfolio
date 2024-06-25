import Cards from "@/components/Cards";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import TailwindcssButtons from "@/components/ui/tailwindcss-buttons";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Projects } from "@/data";
import Link from "next/link";
import React from "react";
import { FaLocationArrow } from "react-icons/fa";

const Project = () => {
  return (
    <main className="relative w-full bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5 pt-5 ">
      <Navbar />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 ">
        <TextGenerateEffect
          className=" capitalize text-[40px] md:text-5xl lg:text-6xl text-blue-100 text-center"
          words="A small selection of recent projects"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 mt-10 justify-center">
          {Projects.map((project, i) => (
            <Cards key={i} {...project} />
          ))}
        </div>
        <div className="flex justify-end">
          <Link href={"/project"}>
            <TailwindcssButtons
              title="More Projects"
              icon={<FaLocationArrow />}
              position="right"
            />
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Project;
