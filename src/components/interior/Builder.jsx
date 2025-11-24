  "use client";

  import React from "react";
  import heImage from "../../assets/img/he.png";
  import waveint from "../../assets/img/wave/wave1.png";

  export default function InteractiveBuilderSection() {
    return (
      <section className="relative bg-white py-16 md:py-24 overflow-hidden">

        {/* CONTENT CONTAINER */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">

            {/* LEFT CONTENT */}
            <div className="space-y-6 text-center lg:text-left">

              <div className="inline-block ">
                <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl leading-tight">
                  Bring your vision to life with our{" "}
                  <span className="text-black">interactive builder</span>
                </h2>
              </div>

              <p className="text-base sm:text-lg text-gray-800 max-w-md mx-auto lg:mx-0">
                Upload your space or choose a template, and get instant AI-powered
                design previews.
              </p>

              {/* <p className="text-sm text-gray-500">531 x 165</p> */}

              <button className="rounded-xl bg-[#5C039B] px-10 py3 sm:px-8 sm:py-4 text-base sm:text-lg font-medium text-white">
                Take a first step
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
        <div className="absolute -bottom-180 left-0 w-full z-0 pointer-events-none select-none">
          <img
            src={waveint}
            alt=""
            className="w-full object-cover"
          />
        </div>

        {/* LEFT TOP LINE DECORATION */}

      </section>
    );
  }
