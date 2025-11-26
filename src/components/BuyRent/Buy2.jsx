// WhatAreYouLookingFor.jsx
import React from "react";
import avatarSrc from "../../assets/img/girlimage.png";
import waveint4 from "../../assets/img/wave/waveint4.png";

export default function WhatAreYouLookingFor() {
  return (
    <section className="relative bg-[var(--color-body)] overflow-visible  pt-15 ">
      {/* BOTTOM WAVE BACKGROUND IMAGE - Fixed positioning */}
      <div className="absolute -bottom-40 left-0 w-full z-0 pointer-events-none select-none">
        <img
          src={waveint4}
          alt="Decorative wave"
          className="w-full object-cover"
        />
      </div>
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">

        {/* Heading */}
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-gray-900">
            What are you looking for
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-500 font-medium whitespace-nowrap">
            Let Xobia guide you through your perfect property journey with personalized recommendations.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex justify-center">
            <div className="rounded-xl p-1 bg-gradient-to-r from-[#03A4F4] to-[#64EF0A]">
              <div className="flex items-center gap-5 px-2 py-1 backdrop-blur-sm">
                <button className="rounded-lg px-5 py-2 text-sm sm:text-base font-semibold bg-[#5C039B] text-white shadow-md">
                  Rent Home
                </button>
                <button className="rounded-lg px-5 py-2 text-sm sm:text-base font-semibold bg-white/10 text-white border border-white/40 hover:bg-[#5C039B] hover:text-white transition">
                  Buy Home
                </button>
                <button className="rounded-lg px-5 py-2 text-sm sm:text-base font-semibold bg-white/10 text-white border border-white/40 hover:bg-[#5C039B] hover:text-white transition">
                  Sell Home
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Text + Avatar Container */}
<div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

  {/* LEFT CONTENT */}
  <div className="max-w-2xl h-full flex flex-col lg:justify-center">
    <h3 className="text-4xl font-semibold text-gray-900">
      Rent Home
    </h3>

    <p className="mt-2 text-md text-slate-500 font-medium">
      Curated rentals with flexible terms, verified listings,
      <br />
      and smart match recommendations.
    </p>
  </div>

  {/* RIGHT IMAGE */}
  <div className="w-full flex justify-center lg:justify-end">
    <div className="relative">
      <img
        src={avatarSrc}
        alt="Xobia assistant"
        className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
      />
    </div>
  </div>

</div>



      </div>
    </section>
  );
}