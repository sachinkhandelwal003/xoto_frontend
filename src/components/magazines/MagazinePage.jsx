"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Users } from "lucide-react";

const BuiltForEveryone = () => {
  const cards = [
    {
      title: "For Customers",
      desc: "Reimagine your home and outdoors with effortless, AI-powered landscaping and upgrade solutions.",
    },
    {
      title: "For Professionals",
      desc: "Empower your business with intelligent tools to streamline client projects and collaboration.",
    },
    {
      title: "For Partners",
      desc: "Unlock new growth opportunities through seamless integrations and partner solutions.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // ✅ Detect screen width dynamically
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    const limit = isMobile ? cards.length - 1 : cards.length - 2;
    if (currentIndex < limit) setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  return (
    <section className="relative bg-gradient-to-b from-white to-purple-50 overflow-hidden py-16 px-6 sm:px-10">
      {/* Background Wave */}
      <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-green-300/40 to-transparent [mask-image:linear-gradient(to_top,black,transparent)]">
        <svg
          className="absolute bottom-0 w-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="none"
            stroke="#00C389"
            strokeWidth="1"
            d="M0,224 C360,160 1080,320 1440,256"
          />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-16">
          Built For Everyone
        </h2>

        {/* Main Row */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16">
          {/* Left SVG Circle */}
          <div className="relative w-60 h-60 sm:w-72 sm:h-72 flex-shrink-0">
            <svg
              viewBox="0 0 200 200"
              className="absolute inset-0 w-full h-full"
            >
              <defs>
                <radialGradient id="silverGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#6a00ff" />
                  <stop offset="50%" stopColor="#00c389" />
                  <stop offset="100%" stopColor="#00a0e3" />
                </radialGradient>
              </defs>
              <circle
                cx="100"
                cy="100"
                r="90"
                stroke="url(#silverGradient)"
                strokeWidth="10"
                fill="none"
                opacity="0.3"
              />
              <circle
                cx="100"
                cy="100"
                r="70"
                stroke="url(#silverGradient)"
                strokeWidth="10"
                fill="none"
                opacity="0.6"
              />
              <circle
                cx="100"
                cy="100"
                r="50"
                stroke="url(#silverGradient)"
                strokeWidth="10"
                fill="none"
              />
            </svg>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-green-400 to-blue-600 flex items-center justify-center">
                <div className="bg-purple-700 p-4 sm:p-5 rounded-full">
                  <Users className="text-white w-8 h-8 sm:w-10 sm:h-10" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Cards Section */}
          <div className="flex flex-col items-center">
            <div className="relative w-[90vw] sm:w-[30rem] lg:w-[36rem] overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentIndex * (isMobile ? 100 : 50)}%)`,
                }}
              >
                {cards.map((card, index) => (
                  <div
                    key={index}
                    className={`w-full sm:w-[18rem] flex-shrink-0 bg-white rounded-2xl shadow-md p-6 mx-2 text-left transition-all ${
                      currentIndex === index ||
                      (!isMobile && currentIndex + 1 === index)
                        ? "border-2 border-[#c0c0c0] shadow-lg scale-100"
                        : "opacity-70 scale-95"
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {card.title}
                        </h3>
                        <div className="bg-purple-700 p-2 rounded-full">
                          <Users className="text-white w-5 h-5" />
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {card.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-3 mt-6">
              <button
                onClick={prevSlide}
                className="p-2 rounded-md border border-gray-300 hover:bg-gray-100 transition disabled:opacity-40"
                disabled={currentIndex === 0}
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>
              <button
                onClick={nextSlide}
                className="p-2 rounded-md bg-purple-700 hover:bg-purple-800 transition disabled:opacity-40"
                disabled={
                  currentIndex >= (isMobile ? cards.length - 1 : cards.length - 2)
                }
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuiltForEveryone;
