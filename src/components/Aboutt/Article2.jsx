import React, { useState } from "react";
import xotoLogo from "../../assets/img/image_109-removebg-preview.png";
import wave1 from "../../assets/img/wave/waveint2.png";

const Article2 = () => {
  const [active, setActive] = useState("vision");

  return (
    <div>
      <section className="relative w-full bg-[var(--color-body)] min-h-screen overflow-hidden pb-32 pt-20">
        {/* Wave Background */}

        <div>
          <div className="absolute bottom-0 lg:bottom-0 left-0 w-full z-0 overflow-hidden">
            <img
              src={wave1}
              alt=""
              className="w-full min-w-[140%] -ml-[20%] scale-[1.8] lg:scale-100 lg:min-w-full lg:ml-0 pointer-events-none select-none translate-y-3"
              style={{
                height: "400px",

                transform: "translateY(-5px)",
              }}
            />
          </div>
          {/* MAIN CONTENT */}
          <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-start justify-between gap-10 relative z-10">
            {/* LEFT CONTENT */}

            <div className="max-w-[595px] w-full">
              <h2
                className="
    font-dmSans 
    font-semibold
    text-[60px]
    leading-[55px]
    tracking-[-0.03em]
    text-[#020202]
    mt-[60px]
    mb-6
  "
              >
                About XOTO
              </h2>

              <p
                className="
    font-dmSans 
    font-medium 
    text-[24px] 
    leading-[33px] 
    tracking-[0em]
    text-[#547593]
    max-w-[595px]
    text-left
    mt-[50px]
  "
              >
                XOTO is an AI-powered platform that simplifies the entire
                property journey—from discovery and design to financing and
                landscaping—while connecting homeowners, agents, and
                freelancers. It creates a seamless, one-stop ecosystem that
                enhances experiences, boosts efficiency, and unlocks earning
                opportunities for all stakeholders.
              </p>
            </div>

            {/* RIGHT SIDE CIRCLE */}
            <div className="flex justify-center lg:justify-end w-full lg:w-auto">
              <div
                className="rounded-full flex items-center justify-center"
                style={{
                  width: "clamp(288px,45vw,380px)",
                  height: "clamp(288px,45vw,380px)",
                  padding: "2px",
                  background: "linear-gradient(180deg,#03A4F4 0%,#64EF0A 100%)",
                  boxShadow:
                    "0px 30px 80px rgba(92,3,155,0.28), 0 12px 30px rgba(0,0,0,0.18)",
                }}
              >
                <div
                  className="rounded-full flex items-center justify-center overflow-hidden"
                  style={{
                    width: "100%",
                    height: "100%",
                    background: "#5C039B",
                    boxShadow:
                      "inset 0 -6px 18px rgba(0,0,0,0.08), 0 8px 20px rgba(0,0,0,0.08)",
                  }}
                >
                  <img
                    src={xotoLogo}
                    alt="Xoto Logo"
                    className="object-contain"
                    style={{ width: "72%", height: "72%" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* BOTTOM BUTTON GROUP - EXACT SAME POSITION AS BEFORE */}

        <div
          className="p-3 max-w-xl bg-[linear-gradient(180deg,#03A4F4_0%,#64EF0A_100%)]
              absolute bottom-0 left-140 rounded-lg shadow-xl py-py-[8px] px-[16px] border-1"
        >
          <div
            className="
            flex flex-col sm:flex-row 
            justify-start items-start
            space-y-2 sm:space-y-0 sm:space-x-3
            rounded-lg"
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
      </section>
    </div>
  );
};

export default Article2;
