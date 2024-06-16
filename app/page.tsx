import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import RecentProjects from "@/components/RecentProjects";
import Overview from "@/components/Overview";

export default function Home() {
  return (
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <Navbar />
      <div className="max-w-7xl w-full">
        <Hero />
        <Overview />
        <RecentProjects />
      </div>
    </main>
  );
}
