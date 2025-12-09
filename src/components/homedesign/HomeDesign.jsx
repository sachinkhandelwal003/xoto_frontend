import React from "react";
import { Link, useNavigate } from "react-router-dom";
import houseimage from "../../assets/img/home/houseimage1.png";
import wave1 from "../../assets/img/wave/wave1.png";
import interior from "../../assets/img/icons123/interior.png";
import exterior from "../../assets/img/icons123/extterior.png";
import landscaping from "../../assets/img/icons123/landscaping.png";
import virtual from "../../assets/img/icons123/virtual.png";
import image from "../../assets/img/icons123/image.png";
import smart from "../../assets/img/icons123/smart.png";

const HomeDesign = () => {
  const navigate = useNavigate();

  // ✅ ONLY BUTTON POSITIONS UPDATED
  const hotspots = [
    {
      label: "Exterior Upgrade",
      icon: exterior,
      link: "/exterior",
      style: "top-[4%] left-[75%] -translate-x-1/2",
    },
    {
      label: "Interior Transformation",
      icon: interior,
      link: "/interior",
      style: "top-[33%] right-[3%]",
    },
    {
      label: "Smart Furniture Swap",
      icon: smart,
      link: "/furniture",
      style: "bottom-[31%] right-[5%]",
    },
    {
      label: "Landscaping",
      icon: landscaping,
      link: "/landscaping",
      style: "bottom-[-7%] left-[60%] -translate-x-1/2",
    },
    {
      label: "Image Perfection",
      icon: image,
      link: "/image-perfection",
      style: "bottom-[24%] left-[29%]",
    },
    {
      label: "Virtual Design Studio",
      icon: virtual,
      link: "/landscaping",
      style: "top-[35%] left-[32%]",
    },
  ];

  return (
    <section
      className="
        relative bg-[var(--color-body)]
        pt-0 pb-10
        sm:pt-24 sm:pb-12
        md:pt-28 md:pb-14
        lg:pt-32 lg:pb-20
        xl:pt-36 xl:pb-24
        overflow-hidden
      "
    >
      <div className="w-full relative">
        {/* WAVE */}
        <div className="absolute bottom-[-180px] left-0 w-full z-0">
          <img
            src={wave1}
            alt=""
            className="w-full scale-[1.3] pointer-events-none select-none"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 items-center relative z-10">
          {/* LEFT TEXT */}
          <div className="space-y-8 flex flex-col items-center lg:items-start text-center lg:text-left px-20 ">
            <h2 className="heading-light text-black">
              Your Space, <br />
              <span>Redefined Instantly.</span>
            </h2>

            <p className="paragraph-light-1 text-gray-600">
              Upload your villa layout and let <span>Xoto AI</span> craft
              stunning outdoor and design options — tailored to your taste.
            </p>

            <Link
              to="/schedule/estimate"
              className="inline-block bg-[var(--color-primary)] text-white px-15 py-3 rounded-lg font-semibold"
            >
              Get Free Estimate Now
            </Link>
          </div>

          {/* RIGHT IMAGE WITH HOTSPOTS */}
          <div className="relative flex  w-full h-full justify-center lg:justify-end mt-10 lg:mt-0 px-10">
            <img
              src={houseimage}
              alt="3D House"
              className="h-[500px] w-auto max-w-none object-contain drop-shadow-2xl"
              style={{ transform: "translateX(170px)" }}
            />

            {/* HOTSPOT BUTTONS */}
            {hotspots.map((spot, index) => (
              <button
                key={index}
                onClick={() => navigate(spot.link)}
                className={`
                  absolute ${spot.style}
                  flex items-center gap-2
                  bg-white
                  px-3 py-1
                  rounded-lg
                  shadow-xl
                  font-semibold
                  text-gray-800
                  hover:bg-[#5C039B]
                  hover:text-white
                  transition
                  whitespace-nowrap
                `}
              >
                <span className="bg-green-500 p-2 rounded-full flex items-center justify-center shrink-0">
                  <img
                    src={spot.icon}
                    alt={spot.label}
                    className="w-4 h-4 object-contain"
                  />
                </span>

                <span className="text-sm font-semibold leading-none">
                  {spot.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeDesign;
