import React, { useState } from "react";
import jjjImage from "../../assets/img/jjj.png";
import wave1 from "../../assets/img/wave/wave1.png";

const features = [
  {
    id: 1,
    title: "All-in-One Platform",
    desc: "Connect with customers seamlessly.",
  },
  {
    id: 2,
    title: "AI-Powered Tools",
    desc: "Streamline workflows, track progress, and uncover revenue opportunities.",
  },
  {
    id: 3,
    title: "Grow Your Business",
    desc: "Expand your reach, accelerate deals, and maximize earnings.",
  },
  {
    id: 4,
    title: "Transparency & Control",
    desc: "Full visibility into projects, leads, and client interactions.",
  },
];

const WhyPartnerSection = () => {
  const [active, setActive] = useState(1);

  // Horizontal progress (desktop)
  const progressWidth = `${(active / features.length) * 100}%`;

  // Vertical progress (mobile)
  const progressHeight = `${(active / features.length) * 100}%`;

  return (
    <section className="relative w-full bg-white overflow-hidden py-20">

      {/* WAVE (responsive) */}
      <div className="absolute bottom-[-20px] md:bottom-[-200px] left-0 w-full z-0 ">
        <img
          src={wave1}
          alt=""
          className="w-full min-w-[130%] md:min-w-full scale-[1.7] md:scale-100 pointer-events-none select-none"
        />
      </div>

      {/* Heading */}
      <div className="text-center mb-10 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-black heading-dark-1">
          Why Partner With <span className="text-black">XOTO?</span>
        </h2>
      </div>

      {/* Image */}
      <div className="flex justify-center mb-16 relative z-10">
        <img
          src={jjjImage}
          alt="XOTO platform illustration"
          className="w-[380px] md:w-[480px] drop-shadow-2xl"
        />
      </div>

      {/* ========= DESKTOP PROGRESS (HORIZONTAL) ========= */}
      <div className="hidden sm:flex justify-center mb-2 relative z-10">
        <div className="relative w-[85%] h-[8px] bg-gray-200 rounded-full">
          <div
            className="absolute left-0 top-0 h-[8px] bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-500"
            style={{ width: progressWidth }}
          ></div>
        </div>
      </div>

      {/* ========= DESKTOP FEATURES ========= */}
      <div className="hidden md:flex relative z-10 justify-center items-start max-w-7xl mx-auto px-6 mb-20 space-x-10">
        {features.map((item) => (
          <div
            key={item.id}
            onClick={() => setActive(item.id)}
            className="w-[22%] cursor-pointer"
          >
            <p className="text-xs text-gray-400 mb-1">Feature {item.id}</p>

            <h3
              className={`text-2xl font-bold transition-all duration-300 ${
                active === item.id
                  ? "text-[var(--color-text-secondary)]"
                  : "text-gray-800"
              }`}
            >
              {item.title}
            </h3>

            <p
              className={`text-md mt-2 transition-opacity duration-300 ${
                active === item.id ? "text-gray-600" : "text-gray-500"
              }`}
            >
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* ========= MOBILE LAYOUT (VERTICAL PROGRESS + FEATURES) ========= */}
      <div className="md:hidden block relative z-10 px-6 mb-12">

        <div className="flex gap-5">

          {/* Vertical progress bar */}
          <div className="relative w-[6px] bg-gray-200 rounded-full h-full mt-2">
            <div
              className="absolute left-0 bottom-0 w-full bg-gradient-to-b from-green-400 to-green-500 rounded-full transition-all duration-500"
              style={{ height: progressHeight }}
            ></div>
          </div>

          {/* Features list */}
          <div className="flex flex-col gap-8 w-full">

            {features.map((item) => (
              <div
                key={item.id}
                onClick={() => setActive(item.id)}
                className="cursor-pointer"
              >
                <p className="text-xs text-gray-400 mb-1">Feature {item.id}</p>

                <h3
                  className={`text-xl font-bold transition-all duration-300 ${
                    active === item.id
                      ? "text-[var(--color-text-secondary)]"
                      : "text-gray-800"
                  }`}
                >
                  {item.title}
                </h3>

                <p
                  className={`text-sm mt-2 transition-opacity duration-300 ${
                    active === item.id ? "text-gray-600" : "text-gray-500"
                  }`}
                >
                  {item.desc}
                </p>
              </div>
            ))}

          </div>
        </div>

      </div>

    </section>
  );
};

export default WhyPartnerSection;
