import React, { useState } from "react";
import waveImg from "../../assets/img/wv1.png";
import missionImg from "../../assets/img/image 108.png";

const Check = () => (
  <span className="mt-1 inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#5C039B] shadow-md">
    <svg
      width="14"
      height="11"
      viewBox="0 0 14 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 5.5L5 9L13 1"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
);

const Article3 = () => {
  const [active, setActive] = useState("vision");

  const visionText = [
    "Democratizing Real Estate For Every Customer, With Every Agent,",
    "Powered by AI.",
  ];

  const missionText = [
    "Establish ourselves as one of the leading technology-driven distribution companies focusing on Home Upgrades, Real Estate & Mortgages in the UAE.",
    "Build and maintain the largest network of agents and freelancers in the market.",
    "Harness Technology & AI to drive scalability and enable seamless expansion.",
  ];

  return (
    <section className="relative overflow-hidden bg-[var(--color-body)] pb-20">
      {/* Toggle Buttons */}
      <div className="absolute left-1/2 top-4 z-20 -translate-x-1/2 rounded-lg bg-gradient-to-b from-[#03A4F4] to-[#64EF0A] p-2 shadow-xl">
        <div className="flex gap-3">
          {["vision", "mission"].map((item) => (
            <button
              key={item}
              onClick={() => setActive(item)}
              className={`min-w-[120px] rounded-lg border border-white px-6 py-3 text-sm font-medium uppercase tracking-wide text-white transition
                ${
                  active === item
                    ? "bg-[#5C039B]"
                    : "bg-transparent hover:bg-[#5C039B]/70"
                }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Wave */}
      <div className="pointer-events-none absolute bottom-0 left-0 w-full">
        <img src={waveImg} alt="" className="w-full object-cover" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 pt-24 sm:pt-28 lg:pt-32">
        <div className="flex flex-col items-center gap-14 lg:flex-row lg:items-start">
          {/* Circle Image */}
          <div className="flex w-full justify-center lg:w-2/5 lg:justify-start">
            <div className="relative aspect-square w-[260px] sm:w-[320px] lg:w-[380px] overflow-hidden rounded-full shadow-2xl">
              <img
                src={missionImg}
                alt=""
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 flex items-center justify-center">
                <h2 className="text-center text-3xl font-bold uppercase tracking-tight text-white drop-shadow-lg sm:text-4xl">
                  {active}
                </h2>
              </div>
            </div>
          </div>

          {/* Text List */}
          <div className="w-full lg:w-3/5">
            <ul className="space-y-8">
              {(active === "vision" ? visionText : missionText).map(
                (item, index) => (
                  <li key={index} className="flex gap-5">
                    <Check />
                    <p className="max-w-xl text-lg font-medium leading-relaxed text-[#547593] sm:text-xl">
                      {item}
                    </p>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Article3;
