import Link from "next/link";
import React from "react";
import {
  FaLinkedin,
  FaGithub,
  FaWhatsapp,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  const links = {
    linkedin: {
      icon: <FaLinkedin />,
      link: "https://www.linkedin.com/in/lakshya-roy729/",
    },
    github: {
      icon: <FaGithub />,
      link: "https://github.com/LakshyaRoy",
    },
    whatsapp: {
      icon: <FaWhatsapp />,
      link: "https://wa.me/+918294402319",
    },
    instagram: {
      icon: <FaInstagram />,
      link: "https://www.instagram.com/just_lakshyaroy?igsh=M3MwNXppOTlma2Zp&utm_source=qr",
    },
    twitter: {
      icon: <FaTwitter />,
      link: "https://x.com/lakshya729",
    },
  };

  return (
    <footer className=" text-white p-4 w-full flex justify-between pt-10 pb-5">
      <div className="text-center mb-4">Copyright &copy; 2024 Lakshya Roy</div>
      <div className="flex justify-center gap-4">
        {Object.values(links).map((link, index) => (
          <Link
            key={index}
            href={link.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl"
          >
            {link.icon}
          </Link>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
