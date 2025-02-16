"use client";
import { useEffect, useRef, useState } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/utils/cn";

export const TextGenerateEffect = ({
  words,
  className,
}: {
  words: string;
  className?: string;
}) => {
  const [scope, animate] = useAnimate();
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsArray = words.split(" ");

  // Intersection Observer setup
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        root: null, // Use viewport as root
        rootMargin: "0px",
        threshold: 0.1, // Trigger when 10% of component is visible
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // Animation trigger
  useEffect(() => {
    if (isVisible) {
      const startAnimation = async () => {
        await animate(
          scope.current.querySelectorAll("span"),
          {
            opacity: 1,
          },
          {
            duration: 2,
            delay: stagger(0.2),
          }
        );
      };
      startAnimation();
    }
  }, [animate, scope, isVisible]);

  const renderWords = () => (
    <motion.div ref={scope}>
      {wordsArray.map((word, idx) => (
        <motion.span
          key={word + idx}
          className={`${idx >= 4 ? "text-purple" : "text-white"} opacity-0
          }`}
        >
          {word}{" "}
        </motion.span>
      ))}
    </motion.div>
  );

  return (
    <div ref={containerRef} className={cn("font-bold", className)}>
      <div className="my-4">
        <div className="dark:text-white text-black leading-snug tracking-wide">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};

export default TextGenerateEffect;
