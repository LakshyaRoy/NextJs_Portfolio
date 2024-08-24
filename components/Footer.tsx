import Link from "next/link";
import React from "react";
import {
  FaLinkedin,
  FaGithub,
  FaWhatsapp,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { AnimatedTooltip } from "./ui/animated-tooltip";

const Footer = () => {
  const links = {
    linkedin: {
      id: 1,
      name: "LinkedIn",
      image: <FaLinkedin size={30} />,
      link: "https://www.linkedin.com/in/lakshya-roy729/",
    },
    github: {
      id: 2,
      name: "Github",
      image: <FaGithub size={30} />,
      link: "https://github.com/LakshyaRoy",
    },
    whatsapp: {
      id: 3,
      name: "Whatsapp",
      image: <FaWhatsapp size={30} />,
      link: "https://wa.me/+918294402319",
    },
    instagram: {
      id: 4,
      name: "Instagram",
      image: <FaInstagram size={30} />,
      link: "https://www.instagram.com/just_lakshyaroy?igsh=M3MwNXppOTlma2Zp&utm_source=qr",
    },
    twitter: {
      id: 5,
      name: "Twitter",
      image: <FaTwitter size={30} />,
      link: "https://x.com/lakshya729",
    },
  };

  return (
    <footer className="p-4 w-full">
      <div className="w-full flex justify-between items-center pt-10 text-white flex-col sm:flex-row container">
        <div className="text-center">Copyright &copy; 2024 Lakshya Roy</div>
        <div className="flex items-center justify-end">
          <AnimatedTooltip items={Object.values(links)} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
