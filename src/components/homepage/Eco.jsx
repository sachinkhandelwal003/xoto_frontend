"use client";
import React from "react";
import xyzImage from "../../assets/img/xyz.png";

const EcoSmartSection = () => {
  const features = [
    {
      id: 1,
      title: "Smart Irrigation",
      desc: "Sensor-based watering systems that conserve water.",
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
      highlight: true,
    },
    {
      id: 2,
      title: "Solar Lightning",
      desc: "Harnessing solar energy for efficient outdoor lighting.",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      title: "Low Water Plant",
      desc: "Eco-friendly landscaping with drought-tolerant plants.",
      image:
        "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 4,
      title: "Eco Materials",
      desc: "Using sustainable and recyclable construction materials.",
      image:
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 5,
      title: "Automated Control",
      desc: "Smart control systems for seamless eco-management.",
      image:
        "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 6,
      title: "Future-Ready Design",
      desc: "Built with sustainability and future innovation in mind.",
      image:
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <section className="relative bg-white pt-20 pb-20 overflow-hidden">
      {/* Top section */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-10 items-center">
        {/* Left Text */}
        <div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            EcoSmart Living
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            At <span className="font-semibold">XOTO</span>, EcoSmart Living
            means creating landscapes that balance beauty, sustainability, and
            technology. Our designs use smart automation and eco-friendly
            solutions to make outdoor spaces efficient, self-sustaining, and
            effortlessly modern.
          </p>
        </div>

        {/* Right Image */}
        <div className="flex justify-center">
          <img
            src={xyzImage}
            alt="EcoSmart House"
            className="w-[85%] drop-shadow-xl hover:scale-105 transition-transform duration-700"
          />
        </div>
      </div>

      {/* Bottom section */}
      <div className="mt-20 text-center relative z-10">
        <h3 className="text-3xl font-bold text-gray-900 mb-10">
          How We Bring It to Life
        </h3>

        {/* Two rows of 3 circles each */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`relative mx-auto rounded-full overflow-hidden shadow-xl group w-52 h-52 sm:w-56 sm:h-56 md:w-60 md:h-60 flex items-center justify-center ${
                feature.highlight ? "ring-4 ring-purple-500" : ""
              }`}
            >
              <img
                src={feature.image}
                alt={feature.title}
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center px-4 group-hover:bg-black/70 rounded-full">
                <h4 className="text-white font-semibold text-lg mb-1">
                  {feature.title}
                </h4>
                <p className="text-gray-200 text-xs leading-snug">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EcoSmartSection;
