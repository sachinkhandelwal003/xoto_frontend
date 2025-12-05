"use client";

import React from "react";
import heImage from "../../assets/img/he.png";
import wave2 from "../../assets/img/wave/wave2.png";
import { Link } from "react-router-dom";

export default function InteractiveBuilderSection() {
  return (
    <section className="relative bg-[var(--color-body)] py-16 md:py-24 overflow-hidden">

      {/* Bottom Wave for small screens */}
      <div className="absolute bottom-[-180px] sm:bottom-[-180px] md:bottom-[-100px] lg:bottom-[-605px] left-0 w-full z-0 overflow-hidden">
        <img
          src={wave2}
          alt=""
          className="w-full scale-[1.4] sm:scale-[1.2] md:scale-[1.05] lg:scale-100 pointer-events-none select-none"
        />
      </div>

      {/* CONTENT CONTAINER */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8">

          {/* LEFT CONTENT */}
          <div className="space-y-6 text-center lg:text-left">

            <div className="inline-block max-w-[90%] sm:max-w-[400px] md:max-w-[500px] mx-auto lg:mx-0">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl heading-dark-1  text-black">
                Bring your vision to life with our{" "}
                <span className="text-black">interactive builder</span>
              </h2>
            </div>

            <p className="text-lg sm:text-xl md:text-2xl paragraph-light-1 text-[#547593] max-w-lg mx-auto lg:mx-0">
              Upload your space or choose a template, and get instant AI-powered
              design previews.
            </p>

           <Link to={'/aiPlanner/interior'}>
  <button className="group inline-flex items-center justify-center gap-3 rounded-md bg-[#5C039B] px-10 sm:px-14 py-3 sm:py-4 text-lg sm:text-xl font-semibold text-white shadow-xl transition-all hover:bg-purple-700 hover:shadow-2xl hover:-translate-y-1 mx-auto lg:mx-0">
    <span className="text-lg sm:text-xl">Take a first step</span>
  </button>
</Link>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-center mt-6 lg:mt-0 lg:justify-end">
            <img
              src={heImage}
              alt="3D rendered modern living room"
              className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
