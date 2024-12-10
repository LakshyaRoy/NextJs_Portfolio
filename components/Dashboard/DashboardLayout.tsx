"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { authentication } from "@/firebase/Firebase";
import DashboardNav from "@/components/Dashboard/DashboardNav";
import SideNav from "@/components/Dashboard/SideNav";
import { HiOutlineMenuAlt2 } from "react-icons/hi";

interface DashboardLayoutProps {
  children: React.ReactNode; // Content for each page
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authentication, (user) => {
      if (!user) {
        router.push("/login");
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe(); // Cleanup
  }, [router]);

  if (loading) {
    return <p>Loading...</p>; // Loader until auth state is resolved
  }

  return (
    <div className="w-full h-full min-h-screen flex overflow-hidden bg-[#101010] ">
      {/* Sidebar */}
      <div className={`w-[20%] p-5 h-full `}>
        {isMenuOpen && (
          <SideNav setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />
        )}
        {!isMenuOpen && (
          <div
            className="absolute top-7 left-6 text-white/50 hover:text-white cursor-pointer"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <HiOutlineMenuAlt2 size={35} />
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="w-[80%] h-full ">
        {/* Navigation Bar */}
        {/* <div className="w-full h-20">
          <DashboardNav />
        </div> */}

        {/* Dynamic Page Content */}
        <div className="w-full h-full p-5  mx-auto max-w-7xl">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;

// https://www.figma.com/design/D1Qr5o4rQM25rBdnYpXPZ9/Dashboard-(Community)?node-id=0-1&node-type=canvas&t=Mc4C3eDoCZDFQOCh-0
// https://www.figma.com/design/xUEfLxfaGZhoBjABWLq0MZ/CRM-Dashboard-Customers-List-(Community)?node-id=501-2&node-type=frame&t=mAQPBTYluDxq5bUQ-0
