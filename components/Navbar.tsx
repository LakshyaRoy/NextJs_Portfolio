"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Logo from "@/public/logo.png";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const navLinks = [
    { id: "about", title: "About" },
    { id: "project", title: "Project" },
    { id: "experience", title: "Experience" },
    { id: "techstack", title: "Tech Stack" },
    { id: "contact", title: "Contact" },
  ];

  useEffect(() => {
    const currentLink = navLinks.find((link) => pathname === `/${link.id}`);
    setActive(currentLink ? currentLink.title : "");
  }, [pathname]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  gsap.registerPlugin(useGSAP);
  const container = useRef(null);

  useEffect(() => {
    if (container.current) {
      // Set initial state for opening
      gsap.set(container.current, {
        display: "block",
        opacity: 0,
        y: -100,
      });

      // Menu is opening
      gsap.to(container.current, {
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        y: 0,
        stagger: 0.8,
      });
    }
  }, [isMenuOpen]);

  return (
    <nav className="w-full h-fit py-2 fixed top-0 z-50 bg-primary">
      <div className="flex justify-between items-center container mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <Image
            className="object-contain"
            src={Logo}
            alt="logo"
            width={100}
            height={100}
            priority={true} // Ensures the image is optimized for SSR
          />
          <p className="text-white text-lg font-bold">Front-End Developer</p>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <li key={link.id}>
              <Link
                href={`#${link.id}`}
                className={`text-[18px] font-medium transition-colors ${
                  active === link.title ? "text-white" : "text-secondary"
                } hover:text-white`}
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className="md:hidden mt-4 space-y-2 h-screen px-10 flex flex-col items-start justify-start gap-10 py-5"
          ref={container}
        >
          <ul>
            {navLinks.map((link) => (
              <li key={link.id}>
                <Link
                  href={`/${link.id}`}
                  className={`block py-2 text-3xl  font-medium transition-colors ${
                    active === link.title ? "text-white" : "text-secondary"
                  } hover:text-white`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>

          <p className=" text-[#CBACF9] text-xl w-[70%] ">
            {" "}
            ● I love working with passionate people and brands
          </p>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
