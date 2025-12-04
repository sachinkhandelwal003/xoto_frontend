import React, { useState } from "react";
import waveImg from "../../assets/img/wv1.png";
import missionImg from "../../assets/img/image 108.png";

const Check = ({ className = "" }) => (
  <span
    className={`inline-flex items-center justify-center rounded-full flex-shrink-0 ${className}`}
    style={{
      width: 28,
      height: 28,
      background: "#5C039B",
      boxShadow: "0 4px 10px rgba(92,3,155,0.18)",
      marginTop: 6,
    }}
  >
    <svg
      width="14"
      height="11"
      viewBox="0 0 14 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
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

  // TEXT DATA
  const visionText = [
    "Democratizing Real Estate For Every Customer, With Every Agent, ",
    "Powered by AI.",
  ];

  const missionText = [
    "Establish ourselves as one of the leading technology-driven distribution company focusing on Home Upgrades, Real Estate & Mortgages in the UAE",
    "Build and maintain the largest network of agents and freelancers in the market.",
    "Harness Technology & AI to drive scalability and enable seamless expansion",
  ];

  return (
    <section className="relative w-full bg-[var(--color-body)] overflow-hidden py-20">
      {/* Switch Buttons */}
      <div
        className="p-3 max-w-xl bg-[linear-gradient(180deg,#03A4F4_0%,#64EF0A_100%)]
        absolute top-0 left-140 rounded-lg shadow-xl py-[8px] px-[16px] border-1"
      >
        <div
          className="
            flex flex-col sm:flex-row 
            justify-start items-start
            space-y-2 sm:space-y-0 sm:space-x-3
            rounded-lg "
        >
          <button
            onClick={() => setActive("vision")}
            className={`px-8 sm:px-15 py-4 rounded-lg border border-white text-white font-medium
              transition-all duration-300 min-w-[140px]
            ${
              active === "vision"
                ? "bg-[#5C039B] shadow-md"
                : "bg-transparent hover:bg-[#5C039B]/70"
            }`}
          >
            Vision
          </button>

          <button
            onClick={() => setActive("mission")}
            className={`px-8 sm:px-15 py-4 rounded-lg border border-white text-white font-medium
              transition-all duration-300 min-w-[140px]
            ${
              active === "mission"
                ? "bg-[#5C039B] shadow-md"
                : "bg-transparent hover:bg-[#5C039B]/70"
            }`}
          >
            Mission
          </button>
        </div>
      </div>

      {/* Wave */}
      <div
        className="absolute left-0 bottom-0 w-full overflow-hidden pointer-events-none"
        style={{ height: 200, zIndex: 0 }}
      >
        <img
          src={waveImg}
          alt=""
          className="w-full object-cover"
          style={{ transform: "translateY(10px)" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
          
          {/* LEFT CIRCLE IMAGE + TEXT */}
          <div className="w-full lg:w-2/5 flex justify-center lg:justify-start mt-20">
            <div
              className="relative flex items-center justify-center overflow-hidden rounded-full"
              style={{
                width: "398px",
                height: "398px",
                borderRadius: "50%",
                boxShadow: "0px 25px 60px rgba(0,0,0,0.18)",
                flexShrink: 0,
              }}
            >
              {/* Image */}
              <img
                src={missionImg}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />

              {/* Dynamic Center Text */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  color: "#FFFFFF",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 700,
                  fontSize: "48px",
                  lineHeight: "55px",
                  letterSpacing: "-0.03em",
                  textShadow: "0px 4px 15px rgba(0,0,0,0.25)",
                  whiteSpace: "nowrap",
                }}
              >
                {active === "vision" ? "VISION" : "Mission"}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE LIST */}
          <div className="w-full lg:w-3/5 mt-20">
            <ul
              style={{ paddingLeft: 0, margin: 0 }}
              className="space-y-8 lg:space-y-10"
            >
              {(active === "vision" ? visionText : missionText).map(
                (item, index) => (
                  <li key={index} className="flex items-start gap-5 lg:gap-6">
                    <div style={{ marginTop: 6 }}>
                      <Check />
                    </div>

                    <p
                      style={{
                        margin: 0,
                        fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 500,
                        fontSize: "24px",
                        lineHeight: "33px",
                        letterSpacing: "0.012em",
                        color: "#547593",
                        maxWidth: "614px",
                        textAlign: "left",
                      }}
                    >
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
