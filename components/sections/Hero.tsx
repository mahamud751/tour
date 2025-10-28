"use client";

import Image from "next/image";
// import { SearchBar } from "@/components/shared/SearchBar";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center gradient-hero overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-coral-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="relative container-custom section-padding">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-6">
              <h1 className="heading-primary leading-tight">
                Go where your{" "}
                <span className="text-coral-500 relative">
                  heart
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 200 20"
                  >
                    <path
                      d="M0,10 Q100,0 200,10"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-coral-300"
                    />
                  </svg>
                </span>{" "}
                roams
              </h1>

              <p className="body-large max-w-2xl mx-auto lg:mx-0">
                Discover Bangladesh&apos;s hidden gems with Next Go. Explore
                stunning beaches, lush hills, and vibrant cultures, plan
                seamlessly, and embark on journeys of a lifetime. Your next
                local adventure starts here.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="btn-primary text-base px-8 py-3">
                Discover Bangladesh
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-base px-8 py-3"
              >
                <Play className="w-4 h-4 mr-2" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 max-w-md mx-auto lg:mx-0">
              <div className="text-center">
                <div className="text-2xl font-heading font-bold text-primary-600">
                  8+
                </div>
                <div className="text-sm text-neutral-600">
                  Divisions Covered
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-heading font-bold text-primary-600">
                  5K+
                </div>
                <div className="text-sm text-neutral-600">Happy Travelers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-heading font-bold text-primary-600">
                  4.8/5
                </div>
                <div className="text-sm text-neutral-600">Average Rating</div>
              </div>
            </div>
          </div>

          {/* Image Grid and Search */}
          <div className="space-y-8 mt-12">
            {/* Image Grid */}
            <div className="grid grid-cols-3 gap-4 min-h-[300px]">
              <div className="rounded-2xl overflow-hidden shadow-lg relative h-[300px]">
                <Image
                  src="/images/hero/02.jpg"
                  alt="Beautiful beach destination"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                  priority
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg mt-8 relative h-[300px]">
                <Image
                  src="/images/hero/01.png"
                  alt="Mountain adventure"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                  priority
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg relative h-[300px]">
                <Image
                  src="/images/hero/03.jpg"
                  alt="City exploration"
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                  priority
                />
              </div>
            </div>

            {/* Search Bar */}
            {/* <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
              <SearchBar />
            </div> */}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary-400 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};
