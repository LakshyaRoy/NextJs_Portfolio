"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import Logo from "@/public/logo.png";
import Image from "next/image";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { IoMail } from "react-icons/io5";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { CgMenuLeftAlt } from "react-icons/cg";
import { IoIosCloseCircleOutline } from "react-icons/io";
const Navbar = () => {
  const [active, setActive] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const navLinks = [
    { id: "about", title: "About" },
    { id: "project", title: "Project" },
    { id: "experience", title: "Experience" },
    { id: "techstack", title: "Tech Stack" },
    { id: "contact", title: "Contact" },
  ];

  // Handle active link based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map((link) => document.getElementById(link.id));
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        if (!section) return;

        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          setActive(section.id);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Mobile menu animation
  useEffect(() => {
    if (!menuRef.current) return;

    if (isMenuOpen) {
      // Reset menu position
      gsap.set(menuRef.current, {
        display: "flex",
        opacity: 0,
        y: -20,
      });

      // Animate menu items
      gsap.to(menuRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });

      // Animate individual menu items
      gsap.from(menuRef.current.querySelectorAll("li"), {
        opacity: 0,
        y: -20,
        stagger: 0.1,
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      gsap.to(menuRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(menuRef.current, { display: "none" });
        },
      });
    }
  }, [isMenuOpen]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !event.target.closest("button")
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    // Cleanup on unmount
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <nav className="w-full fixed top-0 z-20 bg-primary shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo and Title */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              className="w-20 h-auto object-contain"
              src={Logo}
              alt="logo"
              width={100}
              height={100}
              priority={true}
            />
            <p className="text-white text-base md:text-lg font-bold">
              Front-End Developer
            </p>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <li key={link.id}>
                <Link
                  href={`#${link.id}`}
                  className={`text-base lg:text-lg font-medium transition-all duration-300 ${
                    active === link.id ? "text-white" : "text-secondary"
                  } hover:text-white`}
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {/* <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg> */}

            {isMenuOpen ? (
              <IoIosCloseCircleOutline
                size={25}
                className="hover:text-secondary text-white"
              />
            ) : (
              <CgMenuLeftAlt
                size={25}
                className="hover:text-secondary text-white"
              />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          ref={menuRef}
          className={`md:hidden fixed  inset-0 h-full  top-[72px] bg-primary shadow-lg
          ${
            isMenuOpen ? "flex" : "hidden"
          } flex-col items-center justify-between py-4`}
          style={{ maxHeight: "calc(100vh - 72px)", overflowY: "auto" }}
        >
          <ul className="w-full h-full flex flex-col justify-center items-center">
            {navLinks.map((link) => (
              <li key={link.id}>
                <Link
                  href={`#${link.id}`}
                  className={`block py-3 px-6 text-lg font-medium transition-colors
                  ${active === link.id ? "text-white" : "text-secondary"}
                  hover:text-white`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>

          {/* Contact Email Section */}
          <div className="mt-4 px-6 py-3 w-full flex justify-between items-center">
            <Link
              href="mailto:lakshyaroy848@gmail.com"
              className="
              text-base font-medium text-secondary hover:text-white flex justify-center items-center gap-2"
            >
              <IoMail size={30} />
              Email Me
            </Link>
            <div className="flex gap-4">
              <Link href="https://github.com/LakshyaRoy" target="_blank">
                <FaGithub
                  size={30}
                  className="text-secondary hover:text-white"
                />
              </Link>
              <Link
                href="https://www.instagram.com/just_lakshyaroy/"
                target="_blank"
              >
                <FaInstagram
                  size={30}
                  className="text-secondary hover:text-white"
                />
              </Link>
              <Link
                href="https://www.linkedin.com/in/lakshya-roy729/"
                target="_blank"
              >
                <FaLinkedin
                  size={30}
                  className="text-secondary hover:text-white"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
