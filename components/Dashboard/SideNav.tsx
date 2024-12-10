import { authentication } from "@/firebase/Firebase";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { MdLogout } from "react-icons/md";

const SideNav = ({ isMenuOpen, setIsMenuOpen }) => {
  const pathname = usePathname();

  // console.log("Current pathname:", pathname);

  const linkArray = [
    {
      id: 1,
      title: "Home",
      href: "/dashboard/home",
    },
    {
      id: 2,
      title: "Certificates",
      href: "/dashboard/certificates",
    },
    {
      id: 3,
      title: "Projects",
      href: "/dashboard/projects",
    },
    {
      id: 4,
      title: "Testimonials",
      href: "/dashboard/testimonials",
    },
    {
      id: 5,
      title: "Experiences",
      href: "/dashboard/experiences",
    },
  ];
  const handleLogout = async () => {
    try {
      const auth = await signOut(authentication);
      console.log("Signed out successfully", auth);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed left-0 top-0 h-screen w-72  z-40  px-6 py-10 overflow-x-hidden border-r border-white/10">
      <div
        className="absolute top-6 right-6 text-white/50 hover:text-white cursor-pointer"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <HiOutlineMenuAlt2 size={35} />
      </div>
      <div className="flex flex-col justify-between h-full pt-1">
        <div className="flex flex-col justify-center items-start gap-2">
          <figure>
            <div className="bg-[#212121] w-16 h-16 rounded-md"></div>
          </figure>
          <h1 className=" text-2xl">Lakshya</h1>
          <h3 className=" text-sm text-white/50">LakshyaRoy848@gmail.com</h3>
        </div>
        <div className="flex flex-col justify-center items-start h-full">
          <ul className="text-white ">
            {linkArray.map((link) => (
              <li key={link.id}>
                <Link
                  href={link.href}
                  className={`block py-2 text-2xl ${
                    pathname === link.href
                      ? "text-white font-bold"
                      : "text-white/50"
                  } hover:text-white`}
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-white/50 hover:text-white cursor-pointer w-fit">
          <MdLogout size={35} onClick={handleLogout} title="Logout" />
        </div>
      </div>
    </div>
  );
};

export default SideNav;
