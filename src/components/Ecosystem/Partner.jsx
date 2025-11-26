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
  const [active, setActive] = useState(1); // default: Feature 1 active

  // progress bar width based on clicked feature
  const progressWidth = `${(active / features.length) * 100}%`;

  return (
    <section className="relative w-full bg-white overflow-hidden py-20">
       <div className="absolute bottom-[-20px] lg:bottom-[-210px] left-[-100px] w-full z-0 overflow-hidden">
                <img
                  src={wave1}
                  alt=""
                  className="w-full min-w-[140%] -ml-[20%] scale-[1.8] lg:scale-100 lg:min-w-full lg:ml-0 pointer-events-none select-none"
                />
              </div>
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
          Why Partner With <span className="text-black">XOTO?</span>
        </h2>
      </div>

      {/* Image */}
      <div className="flex justify-center mb-16">
        <img
          src={jjjImage}
          alt="XOTO platform illustration"
          className="w-[400px] md:w-[480px] drop-shadow-2xl"
        />
      </div>

      {/* Progress Bar */}
      <div className="flex justify-center mb-2">
        <div className="relative w-[85%] h-[8px] bg-gray-200 rounded-full">
          <div
            className="absolute left-0 top-0 h-[8px] bg-gradient-to-r from-green-400 to-green-500 rounded-full transition-all duration-500"
            style={{ width: progressWidth }}
          ></div>
        </div>
      </div>

      {/* Features */}
      <div className="relative z-10 flex justify-center items-start max-w-7xl mx-auto px-6 
        mb-20 space-x-10 flex-wrap md:flex-nowrap">

        {features.map((item, index) => (
          <div
            key={item.id}
            className="w-full sm:w-[45%] md:w-[22%] cursor-pointer"
            onClick={() => setActive(item.id)}
          >
            <p className="text-xs text-gray-400 mb-1">Feature {item.id}</p>

            {/* Title with active color */}
            <h3
              className={`text-2xl font-bold leading-snug transition-all duration-300 ${
                active === item.id ? "text-[var(--color-text-secondary)]" : "text-gray-800" 
              }`}
            >
              {item.title}
            </h3>

            {/* Description with subtle animation */}
            <p
              className={`text-md mt-2 leading-relaxed transition-opacity duration-300 ${
                active === item.id ? "text-gray-600" : "text-gray-500"
              }`}
            >
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyPartnerSection;
