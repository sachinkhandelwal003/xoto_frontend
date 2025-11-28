"use client";

import React from "react";
import heImage from "../../assets/img/he.png";
import waveint from "../../assets/img/wave/wave1.png";
import wave2 from "../../assets/img/wave/wave2.png";
import { ArrowRight } from "lucide-react";

export default function InteractiveBuilderSection() {
  return (
    <section className="relative bg-[var(--color-body)]  py-16 md:py-24 overflow-hidden">
      <div className="absolute bottom-[-20px] lg:bottom-[-605px] left-0 w-full z-0 overflow-hidden">
        <img
          src={wave2}
          alt=""
          className="w-full min-w-[140%] -ml-[20%] scale-[1.8] lg:scale-100 lg:min-w-full lg:ml-0 pointer-events-none select-none"
        />
      </div>
      {/* CONTENT CONTAINER */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8">

          {/* LEFT CONTENT */}
          <div className="space-y-6 text-center lg:text-left">

            <div className="inline-block max-w-[500px] ">
              <h2 className="text-3xl font-semibold text-gray-900 sm:text-4xl lg:text-5xl leading-tight">
                Bring your vision to life with our{" "}
                <span className="text-black">interactive builder</span>
              </h2>
            </div>

            <p className="text-2xl font-medium sm:text-lg text-[#547593] max-w-md mx-auto lg:mx-0">
              Upload your space or choose a template, and get instant AI-powered
              design previews.
            </p>

            {/* <p className="text-sm text-gray-500">531 x 165</p> */}

            <button className="group inline-flex items-center gap-3 rounded-md bg-[#5C039B] px-14 py-4 text-xl font-semibold text-white shadow-xl transition-all hover:bg-purple-700 hover:shadow-2xl hover:-translate-y-1">
              <span className="text-2xl sm:text-xl">Take a first step</span>
            </button>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-center lg:justify-end">
            <img
              src={heImage}
              alt="3D rendered modern living room"
              className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg drop-shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* BOTTOM WAVE BACKGROUND IMAGE */}


      {/* LEFT TOP LINE DECORATION */}

    </section>
  );
}