import React, { useState } from "react";
import xotoLogo from "../../assets/img/image_109-removebg-preview.png";
import waveUrl from "../../assets/img/Mask group.png";
import wave1 from "../../assets/img/wave/wave1.png";

const Article2 = () => {
  const [active, setActive] = useState("vision");

  return (
    <div>
      <section className="relative w-full bg-[var(--color-body)]  overflow-hidden pb-32 pt-20">
        {/* Wave Background */}
       
       <div>
  <div className="absolute bottom-0 lg:bottom-0 left-0 w-full z-0 overflow-hidden">
          <img
            src={wave1}
            alt=""
            className="w-full min-w-[140%] -ml-[20%] scale-[1.8] lg:scale-100 lg:min-w-full lg:ml-0 pointer-events-none select-none"
          />
        </div>
        {/* MAIN CONTENT */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-start justify-between gap-10 relative z-10">
          {/* LEFT CONTENT */}
         
        <div className="max-w-[595px] w-full">
  <h2
    className="
      font-semibold 
      mt-[60px] mb-6
      text-[#020202]
      leading-[1.1]
      tracking-[-0.03em]
      font-dmSans
      text-5xl
    "
  >
    About XOTO
  </h2>

  <p
    className="
      font-medium 
      text-center lg:text-left
      text-[#547593]
      leading-[1.4]
      font-dmSans
      text-xl
      mt-[50px]
    "
  >
    XOTO is an AI-powered platform that simplifies the entire property
    journey—from discovery and design to financing and landscaping—while
    connecting homeowners, agents, and freelancers. It creates a seamless,
    one-stop ecosystem that enhances experiences, boosts efficiency, and
    unlocks earning opportunities for all stakeholders.
  </p>
</div>


          {/* RIGHT SIDE CIRCLE */}
          <div className="flex justify-center lg:justify-end w-full lg:w-auto">
            <div
              className="rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                width: "clamp(280px, 45vw, 380px)",
                height: "clamp(280px, 45vw, 380px)",
                background: "#4F0FA4",
                borderRadius: "50%",
                boxShadow:
                  "0px 30px 80px rgba(79,15,164,0.3), 0 12px 30px rgba(0,0,0,0.2)",
                marginBottom: "130px",
              }}
            >
              <img
                src={xotoLogo}
                alt="Xoto Logo"
                className="object-contain"
                style={{ width: "75%", height: "75%" }}
              />
            </div>
          </div>
        </div>
</div>
        {/* BOTTOM BUTTON GROUP - EXACT SAME POSITION AS BEFORE */}
 
  

   <div className="p-2 max-w-xl  bg-gradient-to-r from-[#03A4F4] to-[#64EF0A] absolute bottom-0 left-140 rounded-lg shadow-xl py-2 px-2">
  <div 
    className="
      flex flex-col sm:flex-row 
      justify-start items-start
      space-y-2 sm:space-y-0 sm:space-x-3
      bg-gradient-to-r from-[#03A4F4] to-[#64EF0A]
      rounded-lg
    "
  >
    <button
      onClick={() => setActive("vision")}
      className={`px-8 sm:px-10 py-3 rounded-lg border border-white text-white font-medium
        transition-all duration-300 min-w-[140px]
        ${active === "vision"
          ? "bg-[#5C039B] shadow-md"
          : "bg-transparent hover:bg-[#5C039B]/70"
        }`}
    >
      Vision
    </button>

    <button
      onClick={() => setActive("mission")}
      className={`px-8 sm:px-10 py-3 rounded-lg border border-white text-white font-medium
        transition-all duration-300 min-w-[140px]
        ${active === "mission"
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