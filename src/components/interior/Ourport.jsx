"use client";
import waveint2 from "../../assets/img/wave/wave1.png";
import React, { useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Shirt,
  Lightbulb,
  Square,
  Layers,
  Palette,
} from "lucide-react";

export default function ServicesPortfolio() {
  const scrollRef = useRef(null);

  const services = [
    { title: "Modular Kitchens", icon: Home },
    { title: "Modular Wardrobes", icon: Shirt },
    { title: "Lighting", icon: Lightbulb },
    { title: "Flooring", icon: Square },
    { title: "False Ceiling", icon: Layers },
    { title: "Wall Decor", icon: Palette },
  ];

  const scrollLeft = () => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.firstChild?.offsetWidth || 280;
      scrollRef.current.scrollBy({ left: -(cardWidth + 32), behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.firstChild?.offsetWidth || 280;
      scrollRef.current.scrollBy({ left: cardWidth + 32, behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-24">

      {/* HEADING CENTERED */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900">
          Our Services Portfolio
        </h2>
      </div>

      {/* FULL-WIDTH SCROLLER */}
      <div className="relative w-full px-25 z-20">

        {/* Cards */}
        <div
          ref={scrollRef}
          className="relative z-20 flex gap-6 sm:gap-8 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory pb-12"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="flex-none w-72 sm:w-80 bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl snap-center"
              >
                <div className="w-20 h-20 rounded-full bg-[#5C039B] flex items-center justify-center mb-6 shadow-lg">
                  <Icon className="w-10 h-10 text-teal-300" strokeWidth={2} />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                  {service.title}
                </h3>
              </div>
            );
          })}
        </div>

        {/* Scroll Arrows */}
        <div className="absolute -bottom-2 left-4 flex gap-3 px-25 z-30">
          <button
            onClick={scrollLeft}
            className="bg-white rounded-full p-3 shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all duration-200"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          <button
            onClick={scrollRight}
            className=" bg-[#5C039B] rounded-full p-3 shadow-xl transition-all duration-200"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>

      </div>

      {/* BACKGROUND WAVE */}
      <div className="absolute -bottom-40 left-0 w-full z-0 pointer-events-none select-none">
        <img src={waveint2} alt="wave-bg" className="w-full object-cover" />
      </div>
      
    </section>
  );
}
