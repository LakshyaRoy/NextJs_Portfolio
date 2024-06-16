import { projects } from "@/data";
import React from "react";
import { PinContainer } from "./ui/3d-pin";
import Image from "next/image";
import Logo from "@/public/b4.svg";
import { FaLocationArrow } from "react-icons/fa";
import Link from "next/link";
import TailwindcssButtons from "./ui/tailwindcss-buttons";

const RecentProjects = () => {
  return (
    <section className="py-20">
      <h2 className="text-white font-black md:text-[50px] sm:text-[50px] xs:text-[40px] text-[30px]  ">
        A Small Selection Of{" "}
        <span className="text-purple">Recent Projects.</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 mt-10 justify-center">
        {projects.map(({ id, title, des, img, iconLists, link }) => (
          <div
            className="flex flex-col items-center justify-center  rounded-3xl p-6 overflow-hidden"
            key={id}
            style={{
              minWidth: "280px",
              maxWidth: "576px",
              minHeight: "32.5rem",
            }}
          >
            <PinContainer href={link} title={link}>
              <div className="relative w-80 h-56 mb-6 overflow-hidden">
                <img src={img} alt={title} />
              </div>
              <h3 className="font-bold text-lg  line-clamp-1">{title}</h3>
              <p className="font-light text-sm  line-clamp-4">{des}</p>
              <div className="flex items-center justify-between mt-4">
                <div className="flex gap-3">
                  {iconLists.map((icon, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 bg-black-100 rounded-full border border-white/[0.2] flex items-center justify-center"
                      style={{ transform: `translateX(-${5 * i * 4}px)` }}
                    >
                      <Image src={icon} alt={icon} width={20} height={20} />
                    </div>
                  ))}
                </div>
                <div className="flex items-center">
                  <p className="text-purple lg:text-xs">Check Live Site</p>
                  <FaLocationArrow className="ms-3" color="#cbace9" />
                </div>
              </div>
            </PinContainer>
          </div>
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
