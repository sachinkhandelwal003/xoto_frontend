import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const partners = [
  {
    title: "Contractors",
    subtitle: "Elite Contractors Network",
    icon: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png", // replace with your icon
  },
  {
    title: "Developers",
    subtitle: "Property Development Partners",
    icon: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  },
  {
    title: "Agents",
    subtitle: "Real Estate Professionals",
    icon: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  },
];

const PartnerEcosystem = () => {
  const [index, setIndex] = useState(0);

  const prev = () =>
    setIndex((prevIndex) =>
      prevIndex === 0 ? partners.length - 1 : prevIndex - 1
    );
  const next = () =>
    setIndex((prevIndex) =>
      prevIndex === partners.length - 1 ? 0 : prevIndex + 1
    );

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-white to-[#f5f1ff] pb-32">
      {/* Decorative wave background */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full"
        >
          <path
            fill="url(#grad)"
            fillOpacity="1"
            d="M0,256L60,229.3C120,203,240,149,360,122.7C480,96,600,96,720,106.7C840,117,960,139,1080,138.7C1200,139,1320,117,1380,106.7L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
          <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#03A4F4" />
              <stop offset="100%" stopColor="#64EF0A" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Heading */}
      <div className="text-center pt-20 mb-12 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
          Our Partner Ecosystem
        </h2>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-center gap-12 px-6">
        {/* Left Circular Graphic */}
        <div className="relative flex justify-center items-center">
          <div className="relative w-64 h-64 rounded-full bg-gradient-to-r from-[#03A4F4] to-[#64EF0A] flex items-center justify-center">
            <div className="w-28 h-28 bg-purple-700 rounded-full flex items-center justify-center">
              <img
                src={partners[index].icon}
                alt="Partner Icon"
                className="w-10 h-10 invert"
              />
            </div>
          </div>
          {/* circular ring */}
          <div className="absolute inset-0 border-[10px] border-transparent rounded-full border-t-[#03A4F4]/40 border-l-[#64EF0A]/40"></div>
        </div>

        {/* Right Cards */}
        <div className="flex items-center gap-4">
          <button
            onClick={prev}
            className="bg-white border border-gray-300 p-2 rounded-md shadow hover:bg-gray-50 transition"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>

          <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
            {partners.slice(index, index + 2).map((partner, idx) => (
              <div
                key={idx}
                className="min-w-[260px] bg-white border border-gray-200 rounded-xl p-6 flex justify-between items-center shadow-sm hover:shadow-md transition"
              >
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    {partner.title}
                  </h4>
                  <p className="text-sm text-blue-600 font-medium">
                    {partner.subtitle}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-[#03A4F4] to-[#64EF0A] rounded-full flex items-center justify-center">
                  <img
                    src={partner.icon}
                    alt="icon"
                    className="w-6 h-6 invert"
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={next}
            className="bg-purple-700 p-2 rounded-md text-white shadow hover:bg-purple-800 transition"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default PartnerEcosystem;
