"use client";

import React from "react";
import { Tilt } from "react-tilt";
import { FaGithub } from "react-icons/fa";
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
      options={{ max: 45, scale: 1, speed: 450 }}
      className="bg-tertiary p-5 rounded-xl sm:w-[360px] w-full relative border-2 border-gray-500 cursor-pointer SpecificCard"
    >
      {website_link ? (
        <Link href={website_link} target="_blank">
          <div className="relative w-full h-[230px] ">
            <Image
              src={image}
              alt={name}
              className="w-full h-full object-cover rounded-2xl"
              fill
            />

            <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
              <Link
                href={source_code_link}
                target="_blank"
                className="black-gradient rounded-full flex justify-center items-center cursor-pointer w-10 h-10"
              >
                <FaGithub className="text-white" size={20} />
              </Link>
            </div>
          </div>
          <div className="mt-5">
            <h3 className="text-white font-bold text-[24px]">{name}</h3>
            <p className="mt-2 text-secondary text-[14px]">{description}</p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <p key={tag.name} className={`text-[14px] ${tag.color}`}>
                #{tag.name}
              </p>
            ))}
          </div>
        </Link>
      ) : (
        <>
          <div className="relative w-full h-[230px]">
            <Image
              src={image}
              alt={name}
              className="w-full h-full object-cover rounded-2xl"
              fill={true}
            />
          </div>
          <div className=" flex flex-col justify-center items-left  bg-opacity-50 rounded-2xl pt-4">
            <h3 className="text-white font-bold text-[24px]">
              {certificateName}
            </h3>
            <p className="mt-2 text-secondary text-[14px]">
              {CertificateDescription}
            </p>
          </div>
        </>
      )}
    </Tilt>
  );
};

export default Cards;
