import React from "react";
import { Link } from "react-router-dom";
import houseimage from "../../assets/img/home/house1.png";
import wave1 from "../../assets/img/wave/wave1.png";

const HomeDesign = () => {
  return (
    <section className="relative bg-[var(--color-body)] pt-24 pb-10 overflow-hidden">
      
      <div className="w-full relative">

        {/* ---------- WAVE BEHIND EVERYTHING ---------- */}
        <div className="absolute bottom-[-20px] lg:bottom-[-130px] left-0 w-full z-0 overflow-hidden">
          <img
            src={wave1}
            alt=""
            className="w-full min-w-[140%] -ml-[20%] scale-[1.8] lg:scale-100 lg:min-w-full lg:ml-0 pointer-events-none select-none"
          />
        </div>

        {/* ---------- GRID LAYOUT ---------- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center relative z-10">

          {/* LEFT CONTENT (should appear first on mobile) */}
          <div className="order-first lg:order-none space-y-6 px-4 sm:px-8 lg:ps-25 lg:pr-10">
            <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight text-black">
              Your Space, <br />
              <span className="text-black">Redefined Instantly.</span>
            </h2>

            <p className="text-gray-700 text-lg leading-relaxed max-w-md">
              Upload your villa layout and let{" "}
              <span className="font-semibold">Xoto AI</span> craft stunning
              outdoor and interior design options — tailored perfectly to your
              taste.
            </p>

            <Link
              to=""
              className="relative z-20 inline-block bg-[var(--color-primary)] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#5533d8] transition-all shadow-md"
            >
              Get Free Estimate Now
            </Link>
          </div>

          {/* RIGHT IMAGE (should appear below content on mobile) */}
          <div className="order-last lg:order-none flex justify-end w-full relative z-10 mt-10 lg:mt-0 px-4 sm:px-8 lg:px-0">
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