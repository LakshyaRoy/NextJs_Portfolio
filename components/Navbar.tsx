"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Logo from "@/public/logo.png";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pathname = usePathname();

  const navLinks = [
    { id: "about", title: "About" },
    { id: "work", title: "Work" },
    { id: "project", title: "Project" },
    { id: "techstack", title: "Tech Stack" },
    { id: "contact", title: "Contact" },
  ];

  useEffect(() => {
    const currentLink = navLinks.find((link) => pathname === `/${link.id}`);
    setActive(currentLink ? currentLink.title : "");
  }, [pathname]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <nav className="w-full h-fit py-5 fixed top-0 z-50 bg-primary">
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
                href={`/${link.id}`}
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
        <ul className="md:hidden mt-4 space-y-2">
          {navLinks.map((link) => (
            <li key={link.id}>
              <Link
                href={`/${link.id}`}
                className={`block py-2 text-[18px] font-medium transition-colors ${
                  active === link.title ? "text-white" : "text-secondary"
                } hover:text-white`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
