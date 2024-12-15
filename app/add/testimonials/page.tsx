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

  return <div>testimonials</div>;
};

const data = {
  review: {
    quote:
      "Lakshya Roy has been at LifeBonder since December 4, 2023, until May 31, 2024. Lakshya has been very reliable all through his internship, and more skilled than you would expect from an intern. He has done a great job helping us improve and optimize our website. If there is something he does not know or have experience in, then he researches and finds a solution. Having Lakshya Roy with us has been a positive experience. He communicates clearly and is always responsive, something that is very important. Lakshya Roy has my warmest and sincerest recommendations.",
    author: {
      name: "Jesper Simonsen",
      designation: "Founder of LifeBonder!",
      profileImage: "Jesper",
      linkedin: "https://www.linkedin.com/in/jesper-simonsen-4092915/",
    },
    reviewee: {
      name: "Lakshya Roy",
      linkedin: "https://www.linkedin.com/in/lakshya-roy729/",
    },
  },
};

export default Page;
