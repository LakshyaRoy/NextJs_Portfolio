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
    return <p>Loading...</p>;
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
      <div className="w-full bg-[#212121] min-h-[40vh] rounded-lg p-5">
        <p className="text-lg sm:text-2xl font-semibold bg-gradient-to-r from-[#BEC1CF] via-[#D5D8EA] to-[#D5D8EA] bg-clip-text text-transparent relative z-10 w-full sm:w-1/3 text-center sm:text-left">
          Hello Lakshya,
        </p>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
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
    <div className="flex items-center gap-5  w-fit p-2 mx-auto">
      <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center text-3xl">
        <Icon className="text-green-500" />
      </div>
      <div className="flex flex-col ">
        <div className="text-3xl font-bold text-white/90">{value}</div>
        <div className="text-lg text-white-200">{name}</div>
      </div>
    </div>
  );
};

export default Page;
