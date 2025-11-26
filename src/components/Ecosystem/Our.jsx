"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import wave1 from "../../assets/img/wave/wave1.png";
import round from "../../assets/img/home/round.png";
import rating from "../../assets/icons/Homeicons/rating.png";
import partner from "../../assets/icons/Homeicons/partners.png";
import vector from "../../assets/icons/Homeicons/Vector.png";
import dollar from "../../assets/icons/Homeicons/dollar.png";
import finance from "../../assets/icons/Homeicons/finance.png";
import target from "../../assets/icons/Homeicons/target.png";

const PartnerEcosystem = () => {
  const cards = [
    {
      icon: rating,
      title: "For Customers",
      desc: "Reimagine your home and outdoors with effortless, AI-powered landscaping and upgrade solutions.",
    },
    {
      icon: vector,
      title: "For Business Associates",
      desc: "Reimagine your home and outdoors with effortless, AI-powered landscaping and upgrade solutions.",
    },
    {
      icon: partner,
      title: "For Execution Partner",
      desc: "Unlock new growth opportunities through seamless integrations and partner solutions.",
    },
    {
      icon: dollar,
      title: "For Strategic Alliances",
      desc: "Reimagine your home and outdoors with effortless, AI-powered landscaping and upgrade solutions.",
    },
    {
      icon: target,
      title: "For Developers",
      desc: "Reimagine your home and outdoors with effortless, AI-powered landscaping and upgrade solutions.",
    },
    {
      icon: finance,
      title: "For Financial Institutions",
      desc: "Reimagine your home and outdoors with effortless, AI-powered landscaping and upgrade solutions.",
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
    <section className="relative bg-[var(--color-body)]  overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
         <div className="absolute bottom-[-20px] lg:bottom-[-130px] left-0 w-full z-0 overflow-hidden">
               <img
                 src={wave1}
                 alt=""
                 className="w-full min-w-[140%] -ml-[20%] scale-[1.8] lg:scale-100 lg:min-w-full lg:ml-0 pointer-events-none select-none"
               />
             </div>
      <div className="relative z-10 max-w-7xl mx-auto">
     
        {/* Section Title */}
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-12 lg:mb-16">
Our Partner Ecosystem        </h2>

        {/* Main Content - Round image on left, slider on right */}
        <div className="flex flex-col lg:flex-row items-center justify-between   ">
          
          {/* Left: Round Image */}
          <div className="w-full lg:w-1/2 flex justify-start items-start lg:justify-start  mb-10">
            <div className="relative w-60 h-60 sm:w-80 sm:h-80 lg:w-96 lg:h-96 mx-auto">
              <img 
                src={round} 
                alt="Round decoration" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Right: Cards Slider */}
          <div className="w-full lg:w-1/2 flex flex-col ">
            <div className="relative w-full max-w-sm lg:max-w-lg overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentIndex * (isMobile ? 100 : 50)}%)`,
                }}
              >
                {cards.map((card, index) => (
                  <div
                    key={index}
                    className={`w-full flex-shrink-0 bg-white rounded-xl  p-6 mx-2 transition-all ${
                      currentIndex === index ||
                      (!isMobile && currentIndex + 1 === index)
                        ? " shadow-xl scale-100"
                        : "opacity-70 scale-95"
                    }`}
                    style={{
                      width: isMobile ? '100%' : 'calc(90% - 100px)'
                    }}
                  >
                    <div>
                      <div className="flex justify-between items-center ">
                        <h3 className="text-2xl font-bold text-gray-900">
                          {card.title}
                        </h3>
                        <div className="bg-[var(--color-primary)] p-2 rounded-full">
                          <img 
                            src={card.icon} 
                            alt={`${card.title} icon`}
                            className="w-6 h-6 object-contain"
                          />
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

            {/* Navigation Arrows */}
            <div className="flex gap-3 mt-8">
              <button
                onClick={prevSlide}
                className="p-3 rounded-sm border border-gray-300 hover:bg-gray-100 transition disabled:opacity-40"
                disabled={currentIndex === 0}
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>
              <button
                onClick={nextSlide}
                className="p-3 rounded-sm bg-[var(--color-primary)] hover:bg-purple-800 transition disabled:opacity-40"
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

export default PartnerEcosystem;