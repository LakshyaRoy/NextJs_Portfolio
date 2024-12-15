import { authentication } from "@/firebase/Firebase";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { MdLogout } from "react-icons/md";
import { User } from "firebase/auth";

interface SideNavProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  user: User | null;
}

const SideNav: React.FC<SideNavProps> = ({
  isMenuOpen,
  setIsMenuOpen,
  user,
}) => {
  const pathname = usePathname();

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
    {
      id: 6,
      title: "Tech Stack",
      href: "/dashboard/techstack",
    },
  ];

  const handleLogout = async () => {
    try {
      await signOut(authentication);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="h-full w-full px-6 py-10 overflow-y-auto">
      {/* Mobile Close Button */}
      <button
        className="md:hidden absolute top-6 right-6 text-white/50 hover:text-white"
        onClick={() => setIsMenuOpen(false)}
        aria-label="Close Menu"
      >
        <HiOutlineMenuAlt2 size={35} />
      </button>

      <div className="flex flex-col justify-between h-full pt-8 md:pt-1">
        {/* User Profile Section */}
        <div className="flex flex-col justify-center items-start gap-3 mb-8">
          <figure>
            <div className="bg-[#212121] w-16 h-16 rounded-md flex items-center justify-center text-white">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                user?.displayName?.[0] || "👤"
              )}
            </div>
          </figure>
          <h1 className="text-2xl text-white">{user?.displayName || "User"}</h1>
          <h3 className="text-sm text-white/50">{user?.email || "No email"}</h3>
        </div>

        {/* Navigation Links */}
        <nav className="flex-grow h-full">
          <ul className="h-full flex items-start justify-center gap-2 flex-col">
            {linkArray.map((link) => (
              <li key={link.id}>
                <Link
                  href={link.href}
                  className={`
                    block py-2 text-lg transition-colors duration-200
                    ${
                      pathname === link.href
                        ? "text-white font-bold"
                        : "text-white/50 hover:text-white"
                    }
                  `}
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout Button */}
        <div
          className="mt-8 text-white/50 hover:text-white cursor-pointer w-fit"
          onClick={handleLogout}
        >
          <button className="flex items-center space-x-2" aria-label="Logout">
            <MdLogout size={25} />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
