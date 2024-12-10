import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import RecentProjects from "@/components/RecentProjects";
import Overview from "@/components/Overview";
import Review from "@/components/Review";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import ContactUs from "@/components/ContactUs";
import WorkEx from "@/components/WorkEx";
import Techstacks from "@/components/Techstacks";

export default function Home() {
  return (
    <div className="w-full h-full">
      <Navbar />
      <main className="relative bg-black-100  overflow-hidden">
        <div className=" w-full container mx-auto">
          <Hero />
          <Overview />
          <ProjectCard />
          <WorkEx />
          <Techstacks />
          <Review />
          <ContactUs />
        </div>
      </main>
      <Footer />
    </div>
  );
}
