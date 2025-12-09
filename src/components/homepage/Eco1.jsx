import React from "react";
import waveBg from "../../assets/img/wave/wave2.png";

// Local image imports
import solarLighting from "../../assets/img/light.png";
import lowWaterPlant from "../../assets/img/chowk.png";
import ecoMaterials from "../../assets/img/plant.png";
import automatedControl from "../../assets/img/tab.png";
import futureReady from "../../assets/img/men.png";

const features = [
  {
    title: "Smart Climate Control",
    text: "Automated temperature and ventilation systems for energy savings.",
    gradient: true,
  },
  {
    title: "LED & Solar Lighting",
    text: "Low-energy, ambient lighting solutions throughout your home.",
    image: solarLighting,
  },
  {
    title: "Sustainable Materials",
    text: "Eco-friendly wood, stone, and finishes with minimal carbon footprint.",
    image: ecoMaterials,
  },
  {
    title: "Water-Efficient Fixtures",
    text: "Modern taps, showers, and appliances designed to reduce water usage.",
    image: lowWaterPlant,
  },
  {
    title: "Automated Home Management",
    text: "Control lighting, HVAC, and appliances via app or voice commands.",
    image: automatedControl,
  },
  {
    title: "Future-Ready Interiors",
    text: "Flexible, modular designs ready for evolving green technologies.",
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
        <h1 className="text-4xl md:text-5xl card-heading-1 text-black">
          EcoSmart Living
        </h1>

        <p className="mt-4 text-[#547593] paragraph-light-1 max-w-3xl mx-auto text-lg">
          At XOTO, EcoSmart Living means creating landscapes that balance
          beauty, sustainability, and technology. Our designs use smart
          automation and eco-friendly solutions to make outdoor spaces
          efficient, self-sustaining, and effortlessly modern.
        </p>

        <h2 className="text-3xl font-semibold mt-12 text-black leading-tight">
          How We Bring It to Life
        </h2>

        {/* Features Grid */}
        <div className="mt-14 flex flex-col items-center gap-12">
          {/* Row 1 */}
          <div className="flex flex-wrap justify-center gap-20">
            {/* Gradient Card */}
            <div className="rounded-full p-[12px] ring-4 ring-transparent hover:ring-[#5C039B] transition-all duration-300">
              <div className="w-[200px] h-[200px] rounded-full flex flex-col items-center justify-center text-center text-white shadow-xl bg-gradient-to-br from-purple-600 via-blue-500 to-cyan-400 hover:scale-105 hover:shadow-2xl transition-all duration-300 px-4">
                <span className="text-sm font-bold">{features[0].title}</span>
                <p className="text-[11px] mt-2 opacity-90">
                  {features[0].text}
                </p>
              </div>
            </div>

            {/* Next Two Cards */}
            {features.slice(1, 3).map((item, i) => (
              <div
                key={i}
                className="rounded-full p-[12px] ring-4 ring-transparent hover:ring-[#5C039B] transition-all duration-300"
              >
                <div
                  className="w-[200px] h-[200px] rounded-full bg-cover bg-center shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300"
                  style={{ backgroundImage: `url(${item.image})` }}
                >
                  <div className="bg-black/50 w-full h-full rounded-full flex flex-col items-center justify-center px-4 text-center text-white">
                    <span className="text-sm font-semibold">{item.title}</span>
                    <span className="text-[11px] mt-2 opacity-90">
                      {item.text}
                    </span>
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
                  className="w-[200px] h-[200px] rounded-full bg-cover bg-center shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300"
                  style={{ backgroundImage: `url(${item.image})` }}
                >
                  <div className="bg-black/50 w-full h-full rounded-full flex flex-col items-center justify-center px-4 text-center text-white">
                    <span className="text-sm font-semibold">{item.title}</span>
                    <span className="text-[11px] mt-2 opacity-90">
                      {item.text}
                    </span>
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
