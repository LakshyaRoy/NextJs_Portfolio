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
    <div className="relative bg-black-100 overflow-hidden">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <section className="text-center mb-16">
          <TextGenerateEffect
            className="capitalize text-[40px] md:text-5xl lg:text-6xl text-blue-100"
            words="A small selection of recent projects"
          />
        </section>

        <section className="mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Projects.map((project, index) => (
              <Cards key={index} {...project} />
            ))}
          </div>
        </section>

        <section className="flex justify-end">
          <Link href="/project">
            <TailwindcssButtons
              title="More Projects"
              icon={<FaLocationArrow />}
              position="right"
            />
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Project;
