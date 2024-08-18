"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import Contact_Image from "@/assets/Contact_Image2.png";
import React from "react";
import Image from "next/image";
import { AuroraBackground } from "@/components/ui/aurora-background";
import TailwindcssButtons from "@/components/ui/tailwindcss-buttons";
import { FaLocationArrow } from "react-icons/fa";

const Contact = () => {
  return (
    <>
      <div className="relative bg-black-100 overflow-hidden">
        <Navbar />
        <AuroraBackground className="h-full min-h-screen">
          <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 min-h-screen h-full">
            <section className="flex flex-col-reverse  md:flex-row items-center justify-between gap-8 mb-16 w-full">
              <div className="w-full md:w-1/2 text-left">
                <div className="bg-primary bg-opacity-30 backdrop-filter backdrop-blur-lg p-6 rounded-lg max-w-lg shadow-lg border border-white border-opacity-20">
                  <p className="text-lg text-secondary  mb-2">Get in Touch</p>
                  <h2 className="text-3xl font-bold text-blue-100 mb-6">
                    Contact Me!
                  </h2>
                  <form action="" className="space-y-4">
                    <div className="flex flex-col">
                      <label
                        htmlFor="name"
                        className="text-sm text-secondary mb-2"
                      >
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="What's your name?"
                        className=" bg-black-300 p-3 rounded-md border border-gray-700  text-white focus:outline-none focus:ring-2 focus:ring-[#CBACF9]"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label
                        htmlFor="email"
                        className="text-sm text-secondary mb-2"
                      >
                        Your Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="What's your email?"
                        className="p-3 rounded-md border border-gray-700 bg-black-300 text-secondary focus:outline-none focus:ring-2 focus:ring-[#CBACF9]"
                      />
                    </div>
                    <div className="flex flex-col">
                      <label
                        htmlFor="message"
                        className="text-sm text-secondary mb-2"
                      >
                        Your Message
                      </label>
                      <textarea
                        rows={5}
                        cols={30}
                        name="message"
                        id="message"
                        placeholder="What's on your mind? We'd love to hear from you!👍"
                        className="p-3 rounded-md border border-gray-700 bg-black-300 text-secondary focus:outline-none focus:ring-2 focus:ring-[#CBACF9]"
                      />
                    </div>
                    <TailwindcssButtons
                      otherClasses=""
                      title="Send Message"
                      icon={<FaLocationArrow />}
                      position="right"
                    />
                  </form>
                </div>
              </div>
              <div className="w-full md:w-1/2 mt-8 md:mt-0 flex items-center justify-center flex-col">
                <TextGenerateEffect
                  className="capitalize text-3xl sm:text-4xl md:text-5xl  text-blue-100"
                  words="Let's Make It Happen! Say Hello👋."
                />
                <figure>
                  <Image
                    src={Contact_Image}
                    alt="Contact illustration"
                    width={500}
                    height={500}
                    className="mx-auto md:mx-0 max-w-full h-auto"
                  />
                </figure>
              </div>
            </section>
          </main>
        </AuroraBackground>
        <Footer />
      </div>
    </>
  );
};

export default Contact;
