"use client";

import Link from "next/link";
import React from "react";
import GitHubCalendar from "react-github-calendar";

import { FaLocationArrow, FaLinkedin } from "react-icons/fa";

const Review = () => {
  const theme = {
    light: ["#f0f0f0", "#384259"],
    dark: [
      "#1f1f1f", //", // Deepest shade
      "#38265f", // Deeper shade
      "#291e4a", // Even darker shade
      "#1d1635", // Darker shade
      "#151030", // Your reference color
    ],
  };
  return (
    <section className="py-8">
      <div>
        <h4 className="text-white text-center font-black text-[30px] xs:text-[40px] sm:text-[50px] md:text-[50px] capitalize">
          Kind words from{" "}
          <span className="text-purple">satisfied colleagues!</span>
        </h4>

        <div className="mt-10 max-w-4xl mx-auto h-full bg-gray-800 reviewCard p-6 rounded-lg relative ">
          <div className="text-[12rem] leading-[0rem] absolute top-[4rem] left-[-3rem] -z-10 text-purple opacity-40 select-none">
            <span>{"“"}</span>
          </div>
          <p className="text-white">
            Lakshya Roy has been at LifeBonder since December 4, 2023, until May
            31, 2024. Lakshya has been very reliable all through his internship,
            and more skilled than you would expect from an intern. He has done a
            great job helping us improve and optimize our website. If there is
            something he does not know or have experience in, then he researches
            and finds a solution. Having Lakshya Roy with us has been a positive
            experience. He communicates clearly and is always responsive,
            something that is very important. Lakshya Roy has my warmest and
            sincerest recommendations.
          </p>
          <div className="flex  justify-between items-end">
            <div className="flex items-center mt-6 gap-5">
              <figure className="w-10 h-10 overflow-hidden rounded-full bg-white">
                <img
                  src="https://media.licdn.com/dms/image/C4E03AQFoTBqRz5iXgQ/profile-displayphoto-shrink_800_800/0/1650965484241?e=1724284800&v=beta&t=_adHLh_06sdq1zR-jIwrFz6wv77InucuxLMZxkfTFAU"
                  alt="Jesper Simonsen Profile Picture"
                  className="w-full h-full object-cover"
                />
              </figure>
              <blockquote className="text-white">
                <p className="font-bold flex gap-2 items-center">
                  Jesper Simonsen
                  <Link
                    href={
                      "https://www.linkedin.com/in/jesper-simonsen-4092915/"
                    }
                  >
                    <FaLinkedin className="text-blue-500 hover:text-blue-400" />
                  </Link>
                </p>
                <p>Founder of LifeBonder!</p>
              </blockquote>
            </div>
            <div>
              <Link
                href={"https://www.linkedin.com/in/lakshya-roy729/"}
                target="_blank"
              >
                <FaLocationArrow className=" hover:text-purple" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* days i code */}
      <div className="mt-16">
        <h4 className="text-white text-center font-black text-[30px] xs:text-[40px] sm:text-[50px] md:text-[50px] capitalize">
          Days I <span className="text-purple">Code!</span>
        </h4>

        <div className="mt-10 flex justify-center items-center ">
          <GitHubCalendar
            username="lakshyaroy"
            blockSize={15}
            blockMargin={5}
            fontSize={16}
            theme={theme}
            responsive={true}
            color="#38265f"
          />
        </div>
      </div>
    </section>
  );
};

export default Review;
