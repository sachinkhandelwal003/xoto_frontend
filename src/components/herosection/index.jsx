import React, { useState } from "react";
import { Link } from "react-router-dom";
import calender from "../../assets/icons/Homeicons/Calendar.png";
import clock from "../../assets/icons/Homeicons/Clock.png";
import gurantee from "../../assets/icons/Homeicons/Guarantee.png";
import map from "../../assets/icons/Homeicons/Map-pin.png";
import video from "../../assets/video/mortgage2.mp4";

import { 
  ShoppingBag, 
  Trees, 
  Sparkles
} from "lucide-react";

const HeroSection = () => {
  const features = [
    {
      id: 1,
      title: "Interior E-commerce",
      description: "Shop premium furniture, décor, and design accessories — all in one place.",
      icon: <ShoppingBag className="w-10 h-10 text-purple-400" />,
      link: "/ecommerce/b2c",
      buttonText: "Start Shopping",
    },
    {
      id: 2,
      title: "Landscaping Solutions",
      description: "Plan and execute beautiful outdoor spaces with expert design and AI-guided tools.",
      icon: <Trees className="w-10 h-10 text-green-400" />,
      link: "/landscaping",
      buttonText: "Explore Landscaping",
    },
    {
      id: 3,
      title: "AI Interior",
      description: "Redesign any room instantly using advanced AI visualization tools.",
      icon: <Sparkles className="w-10 h-10 text-yellow-400" />,
      link: "/aiInterior",
      buttonText: "Try AI Design",
    },
  ];

  const [expanded, setExpanded] = useState(false);

  return (
    <section className="relative w-full min-h-screen overflow-hidden flex items-center justify-center text-white py-8 lg:py-0">

  <div className="absolute inset-0 w-full h-full bg-black/5 shadow-inner pointer-events-none z-[5]" />
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={video} type="video/mp4" />
      </video>


      <div className="relative z-10  items-center gap-8 px-4 sm:px-6 lg:px-20 w-full max-w-8xl mx-auto mt-16 lg:mt-0">

        {/* LEFT SECTION */}
        <div className="max-w-4xl space-y-4 lg:space-y-6 text-center lg:text-left " >
          <h1 className="heading-light">
            Redefining Living
            <span className="text-amber-50"> <br />From Landscapes to Homes</span>
          </h1>

          <p className="paragraph-light">
            Discover AI-powered designs and curated <br/> properties that elevate every corner of your world.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
            <Link
              to="/aiPlanner"
              className="bg-[var(--color-primary)] text-white font-semibold px-8 py-4 rounded-md shadow-lg"
            >
              Design My Space
            </Link>

            <Link
              to="/marketplace"
              className="border-2 border-white text-white font-semibold px-8 py-4 rounded-md hover:bg-white hover:text-black transition-all"
            >
              Explore Homes
            </Link>
          </div>

          {/* Features Grid */}
        <div className="flex flex-wrap w-[460px] justify-between mt-4 lg:mt-10">
  {[
    { icon: gurantee, line1: "One Stop", line2: "Solution" },
    { icon: clock, line1: "Faster Turn", line2: "Around Time" },
    { icon: map, line1: "Professional", line2: "Teams" },
    { icon: calender, line1: "PAN UAE", line2: "Presence" },
  ].map((item, idx) => (
    <div
      key={idx}
      className="flex items-center gap-3 w-1/2 mb-4"
    >
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

        {/* RIGHT SECTION */}
        
      </div>
       <div className="absolute bottom-0 left-0 w-70 h-10 bg-[var(--color-body)] z-[5] clip-left-shape "></div>
      <div className="absolute bottom-0 right-0 w-70 h-10 bg-[var(--color-body)] z-[5] clip-right-shape"></div>

      {/* Custom clip paths */}
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
