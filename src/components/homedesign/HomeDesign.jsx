import React from "react";
import { Link } from "react-router-dom";
import houseimage from "../../assets/img/home/house1.png";
import wave1 from "../../assets/img/wave/wave1.png";

const HomeDesign = () => {
  return (
<section
  className="
    relative bg-[var(--color-body)] 
    pt-0 pb-10         /* mobile */
    sm:pt-24 sm:pb-12   /* small screens */
    md:pt-28 md:pb-14   /* medium screens */
    lg:pt-32 lg:pb-20   /* large screens */
    xl:pt-36 xl:pb-24   /* extra large */
    overflow-hidden
  "
>

      <div className="w-full relative">

        {/* ---------- WAVE BEHIND EVERYTHING ---------- */}
       <div
  className="
    absolute 
    bottom-[-20px]        /* mobile */
    sm:bottom-[-40px]     /* small screens */
    md:bottom-[-70px]     /* medium screens */
    lg:bottom-[-110px]    /* large screens */
    xl:bottom-[-150px]    /* extra large */
    left-0 w-full z-0 overflow-hidden
  "
>
  <img
    src={wave1}
    alt=""
    className="
      w-[180%]            /* mobile wider */
      sm:w-[160%]
      md:w-[150%]
      lg:w-full           /* normal on large screens */

      -ml-[20%]           /* mobile adjustment */
      sm:-ml-[12%]
      md:-ml-[8%]
      lg:ml-0

      scale-[1.6]         /* mobile scale */
      sm:scale-[1.4]
      md:scale-[1.2]
      lg:scale-100

      pointer-events-none 
      select-none
    "
  />
</div>


        {/* ---------- GRID LAYOUT ---------- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center relative z-10">

          {/* LEFT CONTENT */}
          <div className="
            space-y-8  
            flex flex-col lg:ps-25  sm:ps-0
            items-center lg:items-start 
            text-center lg:text-left
          ">
            <h2 className="heading-light text-black">
              Your Space, <br />
              <span>Redefined Instantly.</span>
            </h2>

            <p
              className="paragraph-light-1 max-w-max"
              style={{ color: "var(--color-grey)" }}
            >
              Upload your villa layout and let <span>Xoto AI</span> craft <br />
              stunning outdoor and design options — tailored <br /> to your taste.
            </p>

            <Link
              to="/estimate/calculator"
              className="relative z-20 inline-block bg-[var(--color-primary)] text-white px-15 py-3 rounded-lg font-semibold"
            >
              Get Free Estimate Now
            </Link>
          </div>

          {/* RIGHT IMAGE */}
          <div className="
            order-last lg:order-none 
            flex justify-center lg:justify-end md:justify-center sm:justify-center
            w-full relative z-10 
            mt-10 lg:mt-0 
            px-4 sm:px-8 lg:px-0
          ">
            <img
              src={houseimage}
              alt="3D House"
              className="w-full max-w-5xl object-cover drop-shadow-2xl select-none"
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default HomeDesign;
