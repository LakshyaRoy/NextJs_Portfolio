"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { authentication } from "@/firebase/Firebase";
import DashboardNav from "@/components/Dashboard/DashboardNav";
import SideNav from "@/components/Dashboard/SideNav";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import { GrCertificate, GrProjects } from "react-icons/gr";
import { IoMdPeople } from "react-icons/io";
import { FiBriefcase } from "react-icons/fi";
import DogGif from "@/assets/Dog.gif";
import Image from "next/image";
const Page = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authentication, (user) => {
      console.log(user);

      if (!user) {
        router.push("/login");
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe(); // Cleanup
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

  const dashboardArray = [
    {
      name: "Certificates",
      value: "2",
      icon: GrCertificate,
    },
    {
      name: "Projects",
      value: "12",
      icon: GrProjects,
    },
    {
      name: "Testimonials",
      value: "15",
      icon: IoMdPeople,
    },
    {
      name: "Experiences",
      value: "12",
      icon: FiBriefcase,
    },
  ];

  return (
    <DashboardLayout>
      <div className="w-full bg-[#212121] min-h-[35vh] max-w-7xl mx-auto rounded-lg p-5">
        <p className="text-lg sm:text-2xl font-semibold bg-gradient-to-r from-[#BEC1CF] via-[#D5D8EA] to-[#D5D8EA] bg-clip-text text-transparent relative z-10 w-full text-center sm:w-auto sm:text-left">
          Hello Lakshya,
        </p>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {dashboardArray.map((item, index) => (
            <DashBoardCard
              key={index}
              name={item.name}
              value={item.value}
              icon={item.icon}
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

interface DashBoardCardProps {
  name: string;
  value: string | number;
  icon: React.ElementType;
}

const DashBoardCard: React.FC<DashBoardCardProps> = ({
  name,
  value,
  icon: Icon,
}) => {
  return (
    <div className="flex items-center gap-4 w-full max-w-sm p-4 mx-auto bg-[#323232] rounded-lg">
      <div className="h-14 w-14 bg-green-100 rounded-full flex items-center justify-center text-3xl">
        <Icon className="text-green-500" />
      </div>
      <div className="flex flex-col">
        <div className="text-2xl font-bold text-white/90">{value}</div>
        <div className="text-base text-white/70">{name}</div>
      </div>
    </div>
  );
};

export default Page;
