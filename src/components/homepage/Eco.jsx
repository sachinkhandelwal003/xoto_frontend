import React from "react";
import waveBg from "../../assets/img/wave/wave2.png";

const features = [
  {
    title: "Smart Irrigation",
    text: "Sensor-based watering systems that conserve water.",
    gradient: true,
  },
  {
    title: "Solar Lightning",
    image:
      "https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=400&q=80",
  },
  {
    title: "Low Water Plant",
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=400&q=80",
  },
  {
    title: "Eco Materials",
    image:
      "https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?w=400&q=80",
  },
  {
    title: "Automated Control",
    image:
      "https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?w=400&q=80",
  },
  {
    title: "Future-Ready Design",
    image:
      "https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?w=400&q=80",
  },
];

export default function EcoSmartLiving() {
  return (
    <section className="relative w-full overflow-hidden pb-20 bg-white min-h-screen">

      {/* Wave Background */}
      <div className="absolute -bottom-160 left-0 w-full z-0 pointer-events-none">
        <img src={waveBg} alt="wave-bg" className="w-full object-cover opacity-90" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center mt-16 px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          EcoSmart Living
        </h1>

        <p className="mt-4 text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
          At XOTO, EcoSmart Living means creating landscapes that balance
          beauty, sustainability, and technology.
        </p>

        <h2 className="text-4xl font-semibold mt-10 text-black">
          How We Bring It to Life
        </h2>

        {/* Features Grid */}
        <div className="mt-14 flex flex-col items-center gap-10">

          {/* Row 1 */}
          <div className="flex flex-wrap justify-center gap-20">

            {/* Smart Irrigation */}
            <div className="
              rounded-full p-[12px] 
              ring-4 ring-transparent
              hover:ring-[#5C039B]
              hover:ring-4
              transition-all duration-300
            ">
              <div
                className="
                  w-[200px] h-[200px] rounded-full 
                  flex flex-col items-center justify-center text-center
                  text-white font-semibold shadow-xl
                  bg-gradient-to-br from-purple-600 via-blue-500 to-cyan-400
                  hover:scale-105 hover:shadow-2xl transition-all duration-300
                "
              >
                <span className="text-lg font-bold">Smart Irrigation</span>
                <p className="text-xs mt-1 px-3 opacity-90">
                  Sensor-based watering systems that conserve water.
                </p>
              </div>
            </div>

            {/* Solar + Low Water */}
            {features.slice(1, 3).map((item, i) => (
              <div key={i}
                className="
                  rounded-full p-[12px]
                  ring-4 ring-transparent
                  hover:ring-[#5C039B]
                  hover:ring-4
                  transition-all duration-300
                ">
                <div
                  className="
                    w-[200px] h-[200px] rounded-full bg-cover bg-center shadow-lg
                    flex items-center justify-center
                    hover:scale-105 hover:shadow-2xl transition-all duration-300
                  "
                  style={{ backgroundImage: `url(${item.image})` }}
                >
                  <div className="bg-black/40 w-full h-full rounded-full flex items-center justify-center px-2 text-center text-white font-semibold">
                    {item.title}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Row 2 */}
          <div className="flex flex-wrap justify-center gap-20">
            {features.slice(3).map((item, i) => (
              <div key={i}
                className="
                  rounded-full p-[12px]
                  ring-4 ring-transparent
                  hover:ring-[#5C039B]
                  hover:ring-4
                  transition-all duration-300
                ">
                <div
                  className="
                    w-[200px] h-[200px] rounded-full bg-cover bg-center shadow-lg
                    flex items-center justify-center
                    hover:scale-105 hover:shadow-2xl transition-all duration-300
                  "
                  style={{ backgroundImage: `url(${item.image})` }}
                >
                  <div className="bg-black/40 w-full h-full rounded-full flex items-center justify-center px-2 text-center text-white font-semibold">
                    {item.title}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}