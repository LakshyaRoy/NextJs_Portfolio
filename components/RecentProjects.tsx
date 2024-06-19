import { Projects } from "@/data";
import React from "react";
import { PinContainer } from "./ui/3d-pin";
import Image from "next/image";
import Logo from "@/public/b4.svg";
import { FaLocationArrow } from "react-icons/fa";
import Link from "next/link";
import TailwindcssButtons from "./ui/tailwindcss-buttons";
import Cards from "./Cards";

const RecentProjects = () => {
  return (
    <section className="py-20">
      <h2 className="text-white  text-center font-black md:text-[50px] sm:text-[50px] xs:text-[40px] text-[30px]  ">
        A Small Selection Of{" "}
        <span className="text-purple">Recent Projects.</span>
      </h2>
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
  );
};

export default RecentProjects;
