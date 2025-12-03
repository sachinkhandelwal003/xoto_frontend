import React from "react";
import { Link } from "react-router-dom";

import calender from "../../assets/icons/Homeicons/Calendar.png";
import clock from "../../assets/icons/Homeicons/Clock.png";
import gurantee from "../../assets/icons/Homeicons/Guarantee.png";
import map from "../../assets/icons/Homeicons/Map-pin.png";
import video from "../../assets/video/mortage4.mp4";

import { ShoppingBag, Trees, Sparkles } from "lucide-react";

const HeroSection = () => {
  const featuresList = [
    { icon: gurantee, line1: "One Stop", line2: "Solution" },
    { icon: clock, line1: "Faster Turn", line2: "Around Time" },
    { icon: map, line1: "Professional", line2: "Teams" },
    { icon: calender, line1: "PAN UAE", line2: "Presence" },
  ];

  return (
    <section className="relative w-full overflow-hidden flex items-center justify-center text-white py-20 pb-20 md:py-20 lg:py-28 xl:py-36">

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 z-[1]" />

      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src={video} type="video/mp4" />
      </video>

      {/* Content Wrapper */}
      <div className="relative z-[2] w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col items-center lg:items-start text-center lg:text-left gap-10">

        {/* LEFT SECTION */}
        <div className="w-full max-w-3xl space-y-6">
          <h1 className="heading-light ">
            Redefining Living
            <span><br />From Landscapes to Homes</span>
          </h1>

          <p className="paragraph-light-1 text-base sm:text-lg md:text-xl">
            Discover AI-powered designs and curated <br className="hidden sm:block" />
            properties that elevate every corner of your world.
          </p>

     {/* Buttons */}
<div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4">

  <Link
    to="/aiPlanner"
    className="
      bg-[var(--color-primary)] 
      text-white 
     px-8 py-3 
      rounded-md 
      shadow-lg
    "
  >
    Design My Space
  </Link>

  <Link
    to="/marketplace"
    className="
      border-2 border-white 
      text-white 
    px-8 py-3 
      rounded-md 
      hover:bg-white 
      hover:text-black 
      transition-all
    "
  >
    Explore Homes
  </Link>

</div>


          {/* Features Grid */}
          <div className="w-full flex justify-center lg:justify-start mt-6">
            <div className="w-full max-w-[460px] grid grid-cols-2 gap-x-4 gap-y-6">
              {featuresList.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-primary)] flex items-center justify-center">
                    <img src={item.icon} alt="" className="w-5 h-5" />
                  </div>

                  <span className="font-semibold text-lg leading-tight">
                    {item.line1} <br /> {item.line2}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Bottom clipping shapes */}
      <div className="absolute bottom-0 left-0 w-72 h-12 bg-[var(--color-body)] z-[3] clip-left-shape" />
      <div className="absolute bottom-0 right-0 w-72 h-12 bg-[var(--color-body)] z-[3] clip-right-shape" />

      <style>{`
        .clip-left-shape {
          clip-path: polygon(0 0, 55% 0, 100% 100%, 0% 100%);
        }
        .clip-right-shape {
          clip-path: polygon(47% 0, 100% 0, 100% 100%, 0% 100%);
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
