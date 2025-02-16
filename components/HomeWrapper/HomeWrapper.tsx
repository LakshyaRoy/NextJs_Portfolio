"use client";
import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Navbar";
import Hero from "../Hero";
import Overview from "../Overview";
import ProjectCard from "../ProjectCard";
import WorkEx from "../WorkEx";
import Techstacks from "../Techstacks";
import Review from "../Review";
import ContactUs from "../ContactUs";
import Footer from "../Footer";
import LoadingScreen from "../LoadingScreen";
import { useStore } from "@/zustand/store";

const HomeWrapper = () => {
  const [apiLoaded, setApiLoaded] = useState<boolean>(false);

  const {
    fetchCertificates,
    fetchExperience,
    fetchProjects,
    fetchTechstack,
    fetchTestimonial,
    certificate,
    techstack,
    experience,
    testimonial,
    projects,
  } = useStore();

  const { data: certificateData, loading: certificateLoading } = certificate;
  const { data: testimonialData, loading: testimonialLoading } = testimonial;
  const { data: projectsData, loading: projectsLoading } = projects;
  const { data: techstackData, loading: techstackLoading } = techstack;
  const { data: experienceData, loading: experienceLoading } = experience;

  interface FetchResults {
    certificates?: any;
    experience?: any;
    projects?: any;
    techstack?: any;
    testimonials?: any;
  }

  const fetchData: () => Promise<FetchResults> = async () => {
    return new Promise(async (resolve: any, reject: any) => {
      try {
        // Run all fetch functions and wait for their results
        const certificates = await fetchCertificates();
        const experience = await fetchExperience();
        const projects = await fetchProjects();
        const techstack = await fetchTechstack();
        const testimonials = await fetchTestimonial();
        const ifLoaded = setApiLoaded(true);

        // Resolve with all data if successful
        resolve({
          certificates,
          experience,
          projects,
          techstack,
          testimonials,
          ifLoaded,
        });
      } catch (error) {
        // Reject if any fetch function fails
        reject(error);
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const allApiCalled =
    !certificateLoading &&
    !testimonialLoading &&
    !projectsLoading &&
    !techstackLoading &&
    !experienceLoading;

  console.log("ResponseFalse", allApiCalled);

  const sortedProjects = projectsData?.sort((a: any, b: any) => {
    const timeA = new Date(a.createdAt).getTime();
    const timeB = new Date(b.createdAt).getTime();
    return timeA - timeB;
  });

  //   createdAt
  // :
  // Timestamp
  // nanoseconds
  // :
  // 769000000
  // seconds
  // :
  // 1739722371

  const sortedExperiences = experienceData.sort((a: any, b: any) => {
    const timeA =
      a.createdAt.seconds * 1000 + a.createdAt.nanoseconds / 1000000;
    const timeB =
      b.createdAt.seconds * 1000 + b.createdAt.nanoseconds / 1000000;
    return timeB - timeA;
  });

  return (
    <div className="w-full h-full">
      <LoadingScreen isLoaded={apiLoaded} allApiCalled={allApiCalled} />
      <Navbar />
      <main className="relative bg-black-100  overflow-hidden">
        <div className=" w-full container mx-auto p-5">
          <Hero />
          <Overview certificates={certificateData} />
          <ProjectCard Projects={sortedProjects} />
          <WorkEx experiences={sortedExperiences} />
          <Techstacks techstacks={techstackData} />
          <Review testimonials={testimonialData} />
          <ContactUs />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomeWrapper;
