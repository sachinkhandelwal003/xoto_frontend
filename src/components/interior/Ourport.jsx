import waveint2 from "../../assets/img/service/wave4.png";
import React, { useRef } from "react";

import construction from "../../assets/img/service/construction-worker.png";
import electrical from "../../assets/img/service/electrical.png";
import kitchen from "../../assets/img/service/kitchen123.png";
import lamp from "../../assets/img/service/lamp.png";
import wall from "../../assets/img/service/wall.png";
import wardrobe from "../../assets/img/service/wardrobe123.png";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ServicesPortfolio() {
  const scrollRef = useRef(null);

  const services = [
    { title: "Modular Kitchens", icon: kitchen },
    { title: "Modular Wardrobes", icon: wardrobe },
    { title: "Electrical", icon: electrical },
    { title: "Civil Work", icon: construction },
    { title: "Lighting", icon: lamp },
    { title: "Wall Decor", icon: wall },
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
    <section className="relative w-full overflow-hidden bg-[var(--color-body)] py-24">

      {/* Heading */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-center text-gray-900">
          Our Services Portfolio
        </h2>
      </div>

      {/* Horizontal Scroller with vertical spacing */}
      <div className="relative w-full pl-16 z-20 mt-20 flex flex-col gap-2">
        {/* Service Cards */}
        <div
          ref={scrollRef}
          className="relative z-20 flex gap-6 sm:gap-8 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory pb-12"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="flex-none w-72 sm:w-80 bg-white rounded-3xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl snap-center"
              style={{
                boxShadow: "0 10px 25px rgba(92,3,155,0.5)", // colored shadow #5C039B
              }}
            >
              {/* Icon */}
              <div className="w-20 h-20 rounded-full bg-[#5C039B] flex items-center justify-center mb-6 shadow-lg">
                <img
                  src={service.icon}
                  alt={service.title}
                  className="w-10 h-10"
                />
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                {service.title}
              </h3>
            </div>
          ))}
        </div>

        {/* Scroll Buttons in flow */}
        <div className="flex gap-6 ">
          <button
            onClick={scrollLeft}
            className="bg-white rounded-md p-3 shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all duration-200"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          <button
            onClick={scrollRight}
            className="bg-[#5C039B] rounded-md p-3 shadow-xl hover:bg-purple-800 transition-all duration-200"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>

      {/* Background Wave */}
      <div className="absolute -bottom-30 left-0 w-full z-0 pointer-events-none select-none">
        <img src={waveint2} alt="wave-bg" className="w-full object-cover" />
      </div>
    </section>
  );
}