import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import WorkEx from "@/components/WorkEx";
import React from "react";

const Work = () => {
  return (
    <main className="relative w-full bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5 pt-5">
      <Navbar />
      <div className="max-w-7xl w-full">
        <WorkEx />
      </div>
      <Footer />
    </main>
  );
};

export default Work;
