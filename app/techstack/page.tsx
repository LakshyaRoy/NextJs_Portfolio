import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Techstacks from "@/components/Techstacks";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

import React from "react";

const TechStack = () => {
  return (
    <>
      <div className="relative bg-black-100 overflow-hidden">
        <Navbar />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
          <section className="text-center mb-16">
            <TextGenerateEffect
              className=" capitalize text-[40px] md:text-5xl lg:text-6xl text-blue-100 text-center"
              words="Tech Stacks, I use in my projects"
            />
          </section>
          <section className="mb-16">
            <Techstacks />
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default TechStack;
