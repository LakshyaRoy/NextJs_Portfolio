import AboutHero from "@/components/AboutHero";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";

const About = () => {
  return (
    <main className="relative  w-full bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <Navbar />
      <div className=" max-w-7xl w-full  ">
        <AboutHero />
      </div>
      <Footer />
    </main>
  );
};

export default About;
