"use client";
import Link from "next/link";
import React, { useState } from "react";
import Logo from "@/public/logo.png";
import Image from "next/image";

const Navbar = () => {
  const [active, setActive] = useState("");
  const navLinks = [
    {
      id: "about",
      title: "About",
    },
    {
      id: "work",
      title: "Work",
    },
    {
      id: "project",
      title: "Project",
    },
    {
      id: "techstack",
      title: "Tech Stack",
    },
    {
      id: "contact",
      title: "Contact",
    },
  ];

  return (
    <nav className="w-full mx-auto sm:px-10 px-5 py-2 fixed top-0 z-20 flex justify-between items-center bg-primary ">
      <Link href={"/"} className="text-3xl font-bold text-blue-100">
        <div className="flex items-center gap-2 justify-center">
          <Image
            className="object-contain"
            src={Logo}
            alt="logo"
            width={100}
            height={100}
          />
          <p className=" text-white text-[18px] font-bold cursor-pointer flex">
            Front-End Developer
          </p>
        </div>
      </Link>

      <ul className=" list-none hidden md:flex flex-row gap-10">
        {navLinks.map((link) => {
          return (
            <li
              key={link.id}
              className={`${
                active === link.title ? " text-white" : "text-secondary"
              } hover:text-white text-[18px] font-medium cursor-pointer`}
              onClick={() => setActive(link.title)}
            >
              <Link href={`/${link.id}`}>{link.title}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
