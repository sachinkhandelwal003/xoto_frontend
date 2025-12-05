// WhatAreYouLookingFor.jsx
import React from "react";
import avatarSrc from "../../assets/img/girlimage.png";
import waveint4 from "../../assets/img/wave/waveint4.png";

export default function WhatAreYouLookingFor() {
  return (
    <section className="relative bg-[var(--color-body)] overflow-hidden pt-15">
      {/* BOTTOM WAVE BACKGROUND IMAGE */}
      <div
        className="
    absolute 
    -bottom-10 
    sm:-bottom-20 
    lg:-bottom-48 
    left-0 
    w-full 
    sm:mx-0 
    lg:mx-[-80px]
    z-0 
    pointer-events-none 
    select-none
  "
      >
        <img
          src={waveint4}
          alt="Decorative wave"
          className="w-full object-cover"
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* HEADING + SUBTEXT */}
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-bold text-[#020202] text-3xl sm:text-4xl lg:text-5xl leading-tight">
            What are you looking for
          </h2>

          <p className="mt-4 text-[16px] sm:text-[18px] lg:text-[20px] text-[#547593]">
            Let Xobia guide you through your perfect property journey with
            personalized recommendations.
          </p>

          {/* BUTTONS */}
          <div className="mt-8 flex justify-center">
            <div
              className="rounded-xl p-1 bg-gradient-to-b from-[#03A4F4] to-[#64EF0A] 
                         max-w-[380px] sm:max-w-none mx-auto"
            >
              <div className="flex flex-row items-center justify-center gap-2 sm:gap-5 px-2 py-1">
                <button className="whitespace-nowrap w-auto rounded-lg px-6 sm:px-10 py-3 sm:py-4 text-sm sm:text-base font-semibold bg-[#5C039B] text-white shadow-md">
                  Rent Home
                </button>

                <button className="whitespace-nowrap w-auto rounded-lg px-6 sm:px-10 py-3 sm:py-4 text-sm sm:text-base font-semibold bg-white/10 text-white border border-white/40 hover:bg-[#5C039B] hover:text-white transition">
                  Buy Home
                </button>

                <button className="whitespace-nowrap w-auto rounded-lg px-6 sm:px-10 py-3 sm:py-4 text-sm sm:text-base font-semibold bg-white/10 text-white border border-white/40 hover:bg-[#5C039B] hover:text-white transition">
                  Sell Home
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* TEXT + AVATAR ROW (desktop-aligned) */}
        <div className="max-w-5xl mx-auto mt-10 lg:mt-14 grid grid-cols-2 gap-4 sm:gap-6 lg:gap-10 items-center">
          {/* LEFT CONTENT */}
          <div className="max-w-[320px] lg:max-w-2xl h-full flex flex-col mt-10 md:mt-8 lg:mt-0 lg:justify-center lg:ml-[150px]">
            <h3
              className="font-semibold mt-10 text-[#000000]
                 text-[22px] sm:text-[24px] lg:text-[26px]
                 leading-[32px] text-left"
              style={{ fontFamily: "DM Sans" }}
            >
              Rent Home
            </h3>

            <p
              className="font-medium text-[#547593] mt-2
                 text-[15px] sm:text-[16px]
                 text-left max-w-[503px]"
            >
              Curated rentals with flexible terms, verified listings, and smart
              match recommendations.
            </p>
          </div>

          {/* RIGHT AVATAR */}
          <div className="w-full flex mx-4 sm:mx-8 lg:mx-0 justify-center lg:justify-end mt-6 lg:mt-0">
            <div className="relative">
              <img
                src={avatarSrc}
                alt="Xobia assistant"
                className="max-w-[180px] sm:max-w-[220px] md:max-w-sm lg:max-w-md"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
