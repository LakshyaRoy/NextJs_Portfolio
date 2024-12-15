import { authentication } from "@/firebase/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
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

  return <div>Experience</div>;
};

const data = {
  title: "Web Developer",
  company_name: "LifeBonder",
  icon: "LifeBonder",
  iconBg: "#383E56",
  date: "Dec 2023 to Current",
  points: [
    "Managed Lifebonder's site for optimal function and user experience. Oversaw updates, design, and performance, utilizing FileZilla FTP for precise version updates and efficient feature integration.",
    "Guided website version control, ensured accurate updates, and secure deployments via FileZilla FTP. Collaborated for streamlined procedures, maintaining current tech and content.",
  ],
};

export default Page;
