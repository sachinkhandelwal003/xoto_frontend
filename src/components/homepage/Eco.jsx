import React from "react";
import waveBg from "../../assets/img/wave/wave2.png";

// ✅ Local image imports
import solarLighting from "../../assets/img/solar.png";
import lowWaterPlant from "../../assets/img/jungle.png";
import ecoMaterials from "../../assets/img/wooden.png";
import automatedControl from "../../assets/img/mobile.png";
import futureReady from "../../assets/img/something.png";

const features = [
  {
    title: "Smart Irrigation",
    text: "Sensor-based watering systems that conserve water.",
    gradient: true,
  },
  {
    title: "Solar Lighting",
    image: solarLighting,
  },
  {
    title: "Low Water Plant",
    image: lowWaterPlant,
  },
  {
    title: "Eco Materials",
    image: ecoMaterials,
  },
  {
    title: "Automated Control",
    image: automatedControl,
  },
  {
    title: "Future-Ready Design",
    image: futureReady,
  },
];

export default function EcoSmartLiving() {
  return (
    <section className="relative w-full overflow-hidden pb-20 bg-white min-h-screen">
      {/* Wave Background */}
      <div className="absolute -bottom-160 left-0 w-full z-0 pointer-events-none">
        <img
          src={waveBg}
          alt="wave-bg"
          className="w-full object-cover opacity-90"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center mt-16 px-6">
       <h1
  className="
    font-semibold
    text-[60px]
    leading-[48px]
    tracking-[-0.03em]
    text-[#020202]
    text-center
  "
>
  EcoSmart Living Interiors
</h1>


        <p
  className="
    mt-4
    font-medium
    text-[24px]
    leading-[33px]
    tracking-[0]
    text-[#547593]
    max-w-[968px]
    mx-auto
    text-center
  "
>
  At XOTO, EcoSmart Living means creating landscapes that balance
  beauty, sustainability, and technology. Our designs use smart
  automation and eco-friendly solutions to make outdoor spaces
  efficient, self-sustaining, and effortlessly modern.
</p>


      <h2
  className="
    font-[DM Sans]
    font-semibold
    text-[31px]
    leading-[55px]
    tracking-[-0.03em]
    text-[#020202]
    text-center
    mt-10
  "
>
  How We Bring It to Life
</h2>


        {/* Features Grid */}
        <div className="mt-14 flex flex-col items-center gap-10">
          {/* Row 1 */}
          <div className="flex flex-wrap justify-center gap-20">
            {/* Smart Irrigation (gradient card) */}
            <div className="rounded-full p-[12px] ring-4 ring-transparent hover:ring-[#5C039B] transition-all duration-300">
              <div className="w-[200px] h-[200px] rounded-full flex flex-col items-center justify-center text-center text-white font-semibold shadow-xl bg-gradient-to-br from-purple-600 via-blue-500 to-cyan-400 hover:scale-105 hover:shadow-2xl transition-all duration-300">
                <span className="text-lg font-bold">Smart Irrigation</span>
                <p className="text-xs mt-1 px-3 opacity-90">
                  Sensor-based watering systems that conserve water.
                </p>
              </div>
            </div>

            {/* Solar Lighting + Low Water Plant */}
            {features.slice(1, 3).map((item, i) => (
              <div
                key={i}
                className="rounded-full p-[12px] ring-4 ring-transparent hover:ring-[#5C039B] transition-all duration-300"
              >
                <div
                  className="w-[200px] h-[200px] rounded-full bg-cover bg-center shadow-lg flex items-center justify-center hover:scale-105 hover:shadow-2xl transition-all duration-300"
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
              <div
                key={i}
                className="rounded-full p-[12px] ring-4 ring-transparent hover:ring-[#5C039B] transition-all duration-300"
              >
                <div
                  className="w-[200px] h-[200px] rounded-full bg-cover bg-center shadow-lg flex items-center justify-center hover:scale-105 hover:shadow-2xl transition-all duration-300"
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