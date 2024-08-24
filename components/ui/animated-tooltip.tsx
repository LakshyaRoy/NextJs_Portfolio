"use client";
import Image from "next/image";
import React, { useState } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Link from "next/link";

export const AnimatedTooltip = ({
  items,
}: {
  items: {
    id: number;
    name: string;
    image?: any;
    link: string;
  }[];
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0); // going to set this value on mouse move
  // rotate the tooltip
  // const rotate = useSpring(
  //   useTransform(x, [-100, 100], [-45, 45]),
  //   springConfig
  // );

  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  );
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );
  // translate the tooltip
  // const translateX = useSpring(
  //   useTransform(x, [-100, 100], [-50, 50]),
  //   springConfig
  // );
  // const handleMouseMove = (event: any) => {
  //   const halfWidth = event.target.offsetWidth / 2;
  //   x.set(event.nativeEvent.offsetX - halfWidth); // set the x value, which is then used in transform and rotate
  // };
  // const handleMouseMove = (event: any) => {
  //   const halfWidth = event.target.offsetWidth / 2;
  //   x.set(event.nativeEvent.offsetX - halfWidth);
  // };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    // console.log(
    //   "Mouse moved",
    //   event.nativeEvent.offsetX,
    //   event.nativeEvent.offsetY
    // );
    const halfWidth = event.currentTarget.offsetWidth / 2;
    const newX = event.nativeEvent.offsetX - halfWidth;
    // console.log("Setting x to", newX);
    x.set(newX);
  };

  // In the component body
  // console.log("Current hoveredIndex:", hoveredIndex);
  // console.log("Current x value:", x.get());

  return (
    <>
      {items.map((item, idx) => (
        // <div
        //   className="relative group"
        //   key={item.name}
        //   onMouseEnter={() => setHoveredIndex(item.id)}
        //   onMouseLeave={() => setHoveredIndex(null)}
        // >
        //   <AnimatePresence mode="popLayout">
        //     {hoveredIndex === item.id && (
        //       <motion.div
        //         initial={{ opacity: 0, y: 20, scale: 0.6 }}
        //         animate={{
        //           opacity: 1,
        //           y: 0,
        //           scale: 1,
        //           transition: {
        //             type: "spring",
        //             stiffness: 260,
        //             damping: 10,
        //           },
        //         }}
        //         exit={{ opacity: 0, y: 20, scale: 0.6 }}
        //         style={{
        //           translateX: translateX,
        //           rotate: rotate,
        //           whiteSpace: "nowrap",
        //         }}
        //         className="absolute -top-16 -left-5  flex text-xs  flex-col items-center justify-center rounded-md bg-black z-50 shadow-xl px-4 py-2"
        //       >
        //         <div className="absolute inset-x-10 z-30 w-[20%] -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px " />
        //         <div className="absolute left-10 w-[40%] z-30 -bottom-px bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px " />
        //         <div className="font-bold text-white relative z-30 text-base">
        //           {item.name}
        //         </div>
        //       </motion.div>
        //     )}
        //   </AnimatePresence>
        //   <Link
        //     className="object-cover h-14 w-14 group-hover:scale-110 group-hover:z-30 border-white relative transition duration-500 flex items-center justify-center"
        //     key={item.id}
        //     href={item.link}
        //     target="_blank"
        //     rel="noopener noreferrer"
        //   >
        //     <motion.div onMouseMove={handleMouseMove} className="w-full h-full">
        //       {item.image}
        //     </motion.div>
        //   </Link>
        // </div>
        <Link
          key={item.id}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="relative group"
        >
          <div
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setHoveredIndex(item.id)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="w-14 h-14 relative"
          >
            <div className="object-cover h-14 w-14 group-hover:scale-110 group-hover:z-30 relative transition duration-500 flex items-center justify-center rounded-full overflow-hidden">
              {item.image}
            </div>
            <AnimatePresence mode="popLayout">
              {hoveredIndex === item.id && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.6 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 260,
                      damping: 10,
                    },
                  }}
                  exit={{ opacity: 0, y: 20, scale: 0.6 }}
                  style={{
                    translateX: translateX,
                    rotate: rotate,
                    whiteSpace: "nowrap",
                  }}
                  className="absolute -top-16 -left-5 flex text-xs flex-col items-center justify-center rounded-md bg-[#CBACF9] z-50 shadow-xl px-4 py-2"
                >
                  <div className="absolute inset-x-10 z-30 w-[20%] -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px " />
                  <div className="absolute left-10 w-[40%] z-30 -bottom-px bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px " />
                  <div className="font-bold text-[#0D0D0D] relative z-30 text-base">
                    {item.name}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Link>
      ))}
    </>
  );
};
