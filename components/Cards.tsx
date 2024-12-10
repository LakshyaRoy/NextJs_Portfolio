"use client";

import React from "react";
import { Tilt } from "react-tilt";
import { FaGithub, FaLocationArrow } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

const Cards = ({
  name,
  description,
  tags,
  image,
  source_code_link,
  website_link,
  certificateName,
  CertificateDescription,
}: {
  name: string;
  description: string;
  tags: {
    name: string;
    color: string;
  }[];
  image: string;
  source_code_link: string;
  website_link: string;
  certificateName?: string;
  CertificateDescription?: string;
}) => {
  return (
    <Tilt
      options={{ max: 25, scale: 0.92, speed: 450 }}
      className="bg-tertiary p-3 sm:p-5 rounded-xl w-full max-w-[380px] relative border-2 border-gray-500 cursor-pointer SpecificCard mx-auto"
    >
      {website_link ? (
        <div>
          <div className="relative w-full h-[200px] sm:h-[230px]">
            <Image
              src={image}
              alt={name}
              className="w-full h-full object-cover rounded-xl"
              fill
            />

            <div className="absolute inset-0 flex justify-end m-2 sm:m-3 card-img_hover">
              <Link
                href={source_code_link}
                title="View Source Code"
                target="_blank"
                className="black-gradient rounded-full flex justify-center items-center cursor-pointer w-8 h-8 sm:w-10 sm:h-10"
              >
                <FaGithub className="text-white text-sm sm:text-base" />
              </Link>
            </div>
          </div>
          <div className="mt-3 sm:mt-5">
            <div className="flex justify-between items-center">
              <h3 className="text-white font-bold text-lg sm:text-[24px]">
                {name?.length > 15 ? `${name.slice(0, 18)}...` : name}
              </h3>
              <Link
                href={website_link}
                target="_blank"
                className="hover:text-[#CBACF9]"
                title="View Website"
              >
                <FaLocationArrow className="text-sm sm:text-base" />
              </Link>
            </div>
            <p className="mt-2 text-secondary text-xs sm:text-[14px]">
              {description}
            </p>
          </div>

          <div className="mt-3 sm:mt-4 flex flex-wrap gap-1 sm:gap-2">
            {tags.map((tag) => (
              <p
                key={tag.name}
                className={`text-xs sm:text-[14px] ${tag.color}`}
              >
                #{tag.name}
              </p>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="relative w-full h-[200px] sm:h-[230px]">
            <Image
              src={image}
              alt={name}
              className="w-full h-full object-cover rounded-xl"
              fill={true}
            />
          </div>
          <div className="flex flex-col justify-center items-left bg-opacity-50 rounded-xl pt-3 sm:pt-4">
            <h3 className="text-white font-bold text-lg sm:text-[24px]">
              {certificateName}
            </h3>
            <p className="mt-2 text-secondary text-xs sm:text-[14px]">
              {CertificateDescription}
            </p>
          </div>
        </>
      )}
    </Tilt>
  );
};

export default Cards;
