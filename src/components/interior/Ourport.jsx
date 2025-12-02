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

  const scrollLeft = () => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.firstChild?.offsetWidth || 280;
      scrollRef.current.scrollBy({ left: -(cardWidth + 25), behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.firstChild?.offsetWidth || 280;
      scrollRef.current.scrollBy({ left: cardWidth + 25, behavior: "smooth" });
    }
  };

  const services = [
    { title: "Modular Kitchens", icon: kitchen },
    { title: "Modular Wardrobes", icon: wardrobe },
    { title: "Electrical", icon: electrical },
    { title: "Civil Work", icon: construction },
    { title: "Lighting", icon: lamp },
    { title: "Wall Decor", icon: wall },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-[var(--color-body)] py-20 sm:py-24">

      {/* Heading */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-center text-gray-900">
          Our Services Portfolio
        </h2>
      </div>

      {/* Horizontal Scroller */}
      <div className="relative w-full px-4 sm:pl-16 z-20 mt-16 flex flex-col gap-4">

        <div
          ref={scrollRef}
          className="flex gap-5 sm:gap-8 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory pb-10"
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="flex-none 
              w-72              /* Bigger mobile width */
              sm:w-72 md:w-80    /* Large screens unchanged */
              bg-white rounded-3xl 
              p-8 sm:p-8         /* Slightly more padding on mobile */
              flex flex-col items-center text-center 
              transition-all duration-300
              hover:scale-105 hover:shadow-2xl snap-center"
              style={{ boxShadow: "0 12px 28px rgba(92,3,155,0.5)" }}
            >
              <div className="w-20 h-20 sm:w-20 sm:h-20 rounded-full bg-[#5C039B] flex items-center justify-center mb-6 shadow-lg">
                <img src={service.icon} alt={service.title} className="w-12 h-12 sm:w-10 sm:h-10" />
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                {service.title}
              </h3>
            </div>
          ))}
        </div>

        {/* Scroll Buttons */}
        <div className="flex gap-4 sm:gap-6">
          <button
            onClick={scrollLeft}
            className="bg-white rounded-md p-2 sm:p-3 shadow-lg hover:shadow-xl hover:bg-gray-50"
          >
            <ChevronLeft className="w-6 h-6 sm:w-6 sm:h-6 text-gray-700" />
          </button>

          <button
            onClick={scrollRight}
            className="bg-[#5C039B] rounded-md p-2 sm:p-3 shadow-xl hover:bg-purple-800"
          >
            <ChevronRight className="w-6 h-6 sm:w-6 sm:h-6 text-white" />
          </button>
        </div>
      </div>

      {/* Wave */}
      <div className="absolute -bottom-20 sm:-bottom-24 w-full z-0 pointer-events-none select-none">
        <img src={waveint2} alt="wave-bg" className="w-full object-cover" />
      </div>
    </section>
  );
}
