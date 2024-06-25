import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Techstacks from "@/components/techstacks";
import React from "react";

const TechStack = () => {
  return (
    <main className="relative w-full bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5 pt-5">
      <Navbar />
      <div className="max-w-7xl w-full">
        <Techstacks />
      </div>
      <Footer />
    </main>
  );
};

export default TechStack;
