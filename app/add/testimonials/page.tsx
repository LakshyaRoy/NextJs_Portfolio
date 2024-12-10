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

export default Page;
