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
import { useStore } from "@/zustand/store";
const Page = () => {
  const [mainLoading, setMainLoading] = useState<boolean>(true);
  const router = useRouter();

  const {
    fetchCertificates,
    certificate,
    fetchTechstack,
    techstack,
    fetchExperience,
    experience,
    fetchTestimonial,
    testimonial,
    fetchProjects,
    projects,
  } = useStore();

  const { data: certificateData, loading: certificateLoading } = certificate;
  const { data: testimonialData, loading: testimonialLoading } = testimonial;
  const { data: projectsData, loading: projectsLoading } = projects;
  const { data: techstackData, loading: techstackLoading } = techstack;
  const { data: experienceData, loading: experienceLoading } = experience;
  const certificateApi = async () => {
    if (!certificateData?.length) {
      await fetchCertificates();
    }
  };

  const techstackApi = async () => {
    if (!techstackData?.length) {
      await fetchTechstack();
    }
  };

  const experienceApi = async () => {
    if (!experienceData?.length) {
      await fetchExperience();
    }
  };

  const testimonialApi = async () => {
    if (!testimonialData?.length) {
      await fetchTestimonial();
    }
  };

  const projectsApi = async () => {
    if (!projectsData?.length) {
      await fetchProjects();
    }
  };

  useEffect(() => {
    certificateApi();
    techstackApi();
    experienceApi();
    testimonialApi();
    projectsApi();
  }, []);

  // console.log(
  //   certificateData,
  //   techstackData,
  //   experienceData,
  //   testimonialData,
  //   projectsData
  // );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authentication, (user) => {
      // console.log(user);

      if (!user) {
        router.push("/login");
      } else {
        setMainLoading(false);
      }
    });

    return () => unsubscribe(); // Cleanup
  }, [router]);

  if (mainLoading) {
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
      value: certificateData?.length || 0,
      icon: GrCertificate,
    },
    {
      name: "Projects",
      value: projectsData?.length || 0,
      icon: GrProjects,
    },
    {
      name: "Testimonials",
      value: testimonialData?.length || 0,
      icon: IoMdPeople,
    },
    {
      name: "Experiences",
      value: experienceData?.length || 0,
      icon: FiBriefcase,
    },
    {
      name: "Techstacks",
      value: techstackData?.length || 0,
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
