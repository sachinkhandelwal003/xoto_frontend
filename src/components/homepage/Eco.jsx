import React, { useState } from "react";
import waveBg from "../../assets/img/wave/wave2.png";

const features = [
  { title: "Smart Irrigation", text: "Sensor-based watering systems that conserve water.", gradient: true },
  { title: "Solar Lightning", image: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=400&q=80" },
  { title: "Low Water Plant", image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=400&q=80" },
  { title: "Eco Materials", image: "https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?w=400&q=80" },
  { title: "Automated Control", image: "https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?w=400&q=80" },
  { title: "Future-Ready Design", image: "https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?w=400&q=80" },
];

export default function EcoSmartLiving() {
  const [activeIndex, setActiveIndex] = useState(0); // First circle active initially

  return (
    <section className="relative w-full overflow-hidden pb-20 bg-white min-h-screen">

      {/* Wave Background */}
      <div className="absolute left-0 w-full z-0 pointer-events-none 
        lg:-bottom-130 md:-bottom-28 sm:-bottom-20 -bottom-10">
        <img src={waveBg} alt="wave-bg" className="w-full object-cover opacity-90" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 mt-12 md:mt-16">
        <h1 className="text-2xl md:text-5xl font-semibold text-gray-900">
          EcoSmart Living
        </h1>

        <p className="mt-3 md:mt-4 text-gray-600 max-w-3xl mx-auto text-xl md:text-lg leading-relaxed">
          At XOTO, EcoSmart Living for interiors means designing homes that blend style, sustainability, and smart technology. Our spaces are thoughtfully crafted to be energy-efficient, environmentally friendly, and effortlessly modern.
        </p>

        <h2 className="text-2xl md:text-4xl font-semibold mt-8 md:mt-10 text-black">
          How We Bring It to Life
        </h2>

        {/* Features Grid */}
        <div className="mt-10 md:mt-14 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8 justify-items-center">

          {/* Smart Irrigation (index 0) */}
          <div
            onMouseEnter={() => setActiveIndex(0)}
            className={`rounded-full p-[10px] transition-all duration-300
            ring-4 ${
              activeIndex === 0
                ? "ring-[#5C039B] scale-[1.15]"
                : "ring-transparent hover:ring-[#5C039B]"
            }`}
          >
            <div className={`
              w-[150px] h-[150px] md:w-[200px] md:h-[200px]
              rounded-full flex flex-col items-center justify-center text-center
              text-white font-semibold shadow-xl bg-gradient-to-br
              from-purple-600 via-blue-500 to-cyan-400 transition-all duration-300
              ${activeIndex === 0 ? "scale-[1.25] md:scale-[1.18] shadow-2xl" : "hover:scale-105"}
            `}>
              <span className="text-sm md:text-lg font-bold">Smart Irrigation</span>
              <p className="text-[10px] md:text-xs mt-1 px-2 opacity-90">
                Sensor-based watering systems that conserve water.
              </p>
            </div>
          </div>

          {/* Remaining Features */}
          {features.slice(1).map((item, i) => (
            <div
              key={i + 1}
              onMouseEnter={() => setActiveIndex(i + 1)}
              className={`rounded-full p-[10px] transition-all duration-300 ring-4 ${
                activeIndex === i + 1
                  ? "ring-[#5C039B] scale-[1.15]"
                  : "ring-transparent hover:ring-[#5C039B]"
              }`}
            >
              <div
                className={`
                  w-[150px] h-[150px] md:w-[200px] md:h-[200px]
                  rounded-full bg-cover bg-center shadow-lg flex items-center justify-center
                  transition-all duration-300
                  ${activeIndex === i + 1
                    ? "scale-[1.25] md:scale-[1.18] shadow-2xl"
                    : "hover:scale-105"}
                `}
                style={{ backgroundImage: `url(${item.image})` }}
              >
                <div className="bg-black/40 w-full h-full rounded-full flex items-center justify-center px-2 text-center text-white font-semibold text-xs md:text-base">
                  {item.title}
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}

