import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { AuroraBackground } from "./ui/aurora-background";

interface LoadingScreen {
  isLoaded: boolean;
}
const LoadingScreen = ({
  isLoaded,
  allApiCalled,
}: {
  isLoaded: boolean;
  allApiCalled: boolean;
}) => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (loading) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    // Cleanup on unmount
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [loading]);

  const [percentage, setPercentage] = useState(0);
  const loadingRef = useRef(null);
  const startRef = useRef(null);
  const starttextRef = useRef(null);
  const containerRef = useRef(null);
  useEffect(() => {
    const interval = setInterval(() => {
      if (allApiCalled === true) {
        setPercentage((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 1; // Increment by 1
        });
      }
    }, 5);

    return () => clearInterval(interval);
  }, [allApiCalled]);

  useEffect(() => {
    if (!loadingRef.current) return;
    if (!startRef.current) return;
    if (isLoaded) {
      if (percentage === 100) {
        gsap.to(loadingRef.current, {
          opacity: 0,
          duration: 1,
          ease: "power4.out",
        });
        gsap.to(startRef.current, {
          opacity: 1,
          display: "block",
          duration: 1,
          ease: "power4.in",
        });
      }
    }
  }, [percentage, isLoaded]);

  const onClick = () => {
    if (!containerRef?.current) return;
    gsap.to(containerRef.current, {
      y: "-100%",
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        setLoading(false);
      },
    });
  };

  return (
    <>
      {loading && (
        <div
          ref={containerRef}
          className="fixed inset-0 w-full h-full z-50 bg-black-100"
        >
          <AuroraBackground>
            <div
              className="absolute bottom-5 md:bottom-10 left-5 md:left-10 flex justify-end items-start md:items-end flex-col md:flex-row gap-y-5"
              ref={loadingRef}
            >
              {/* circle */}
              <div
                className="w-[210px] h-[210px] rounded-full flex justify-center items-center"
                style={{
                  background: `conic-gradient(#CBACF9 ${
                    percentage * 3.6
                  }deg, #f1f5f9 0deg)`, // Dynamic ring background
                }}
              >
                <div className="w-[200px] h-[200px] border bg-primary border-white-200 rounded-full flex justify-center items-center font-mono text-5xl text-white">
                  {`${percentage}%`}
                </div>
              </div>
              <div className="text-xl font-mono font-bold text-white/90 md:ml-6 md:mb-5">
                Hi, I'm Lakshya Roy, <br /> a Frontend Developer from India.{" "}
                <br /> Hold On the Website is Loading...
              </div>
            </div>
            <div
              ref={startRef}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 hidden "
            >
              <div className="group relative w-[360px] h-[360px] rounded-full flex justify-center items-center">
                {/* Back Circle */}
                <div className="absolute w-[360px] h-[360px] border border-dashed border-purple rounded-full opacity-0 group-hover:opacity-30  transition-all duration-500"></div>

                {/* Inner Circle with Start Text */}
                <div className="relative z-10 w-72 h-72 border border-white-200 rounded-full flex justify-center items-center shadow-glow animate-glow">
                  <h1
                    onClick={onClick}
                    ref={starttextRef}
                    className="text-4xl cursor-pointer hover:underline hover:underline-offset-8 decoration-thin decoration-purple font-bold text-white font-mono"
                  >
                    Start
                  </h1>
                </div>
              </div>
            </div>
          </AuroraBackground>
        </div>
      )}
    </>
  );
};

export default LoadingScreen;
