"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, User } from "firebase/auth";
import { authentication } from "@/firebase/Firebase";
import SideNav from "@/components/Dashboard/SideNav";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import DogGif from "../../assets/Dog.gif";
import Image from "next/image";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authentication, (currentUser) => {
      if (!currentUser) {
        router.push("/login");
      } else {
        setUser(currentUser);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#101010] to-[#202020] text-white gap-4">
        <Image
          src={DogGif}
          alt="Loading Dog Animation"
          width={200}
          height={200}
          className="animate-bounce"
        />
        <p className="text-lg sm:text-xl font-semibold tracking-wide animate-pulse">
          Loading, please wait...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row w-full  bg-[#101010] overflow-hidden">
      {/* Mobile Menu Toggle */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-[#101010]">
        <h1 className="text-white text-xl font-bold">Dashboard</h1>
        <button
          className="text-white/50 hover:text-white focus:outline-none"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Toggle Menu"
        >
          <HiOutlineMenuAlt2 size={35} />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-40 w-72 transform transition-transform duration-300 ease-in-out
        md:relative md:w-1/5 md:translate-x-0
        ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
        bg-[#101010] border-r border-white/10
      `}
      >
        <SideNav
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          user={user}
        />
      </div>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <main
        className="flex-1 md:w-4/5 pt-20 p-4 md:p-5 overflow-y-auto h-screen"
        onClick={() => setIsMenuOpen(false)}
      >
        <div className="w-full ">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
