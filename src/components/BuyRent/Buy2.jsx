// WhatAreYouLookingFor.jsx
import React from "react";
import avatarSrc from "../../assets/img/girlimage.png";
import waveint4 from "../../assets/img/wave/waveint4.png";

export default function WhatAreYouLookingFor() {
  return (
    <section className="relative bg-[var(--color-body)] overflow-hidden  pt-15 ">
      {/* BOTTOM WAVE BACKGROUND IMAGE - Fixed positioning */}
      <div className="absolute -bottom-50 left-0 w-full z-0 pointer-events-none select-none">
        <img
          src={waveint4}
          alt="Decorative wave"
          className="w-full object-cover"
        />
      </div>
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">

        {/* Heading */}
        <div className="max-w-5xl mx-auto text-center">
        <h2
  className="font-semibold text-[#020202] "
  style={{
    fontFamily: "DM Sans",
    fontSize: "60px",
    fontWeight: 600,         // SemiBold
    letterSpacing: "-0.03em", 
    lineHeight: "55px",
  }}
>
  What are you looking for
</h2>


      <p className="text-[24px] leading-[33px] font-medium text-[#547593] whitespace-nowrap py-5">
  Let Xobia guide you through your perfect property journey with personalized recommendations.
</p>


          {/* Buttons */}
        <div className="mt-8 flex justify-center">
  <div className="rounded-xl p-1 bg-gradient-to-b from-[#03A4F4] to-[#64EF0A]">
    <div className="flex items-center gap-5 px-2 py-1 backdrop-blur-sm">
      <button className="rounded-lg px-10 py-4 text-sm sm:text-base font-semibold bg-[#5C039B] text-white shadow-md">
        Rent Home
      </button>

      <button className="rounded-lg px-10 py-4 text-sm sm:text-base font-semibold bg-white/10 text-white border border-white/40 hover:bg-[#5C039B] hover:text-white transition">
        Buy Home
      </button>

      <button className="rounded-lg px-10 py-4 text-sm sm:text-base font-semibold bg-white/10 text-white border border-white/40 hover:bg-[#5C039B] hover:text-white transition">
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

  {/* Heading */}
  <h3
    className="font-semibold text-[#000000]"
    style={{
      fontFamily: "DM Sans",
      fontSize: "31px",
      lineHeight: "32px",
      letterSpacing: "0px",
      marginLeft:"65px"
    }}
  >
    Rent Home
  </h3>

  {/* Paragraph */}
  <p
    className="font-medium text-[#547593] mt-2"
    style={{
      fontFamily: "DM Sans",
      fontSize: "24px",
      lineHeight: "33px",
      letterSpacing: "0px",
      maxWidth: "503px",
      marginLeft:"65px"
    }}
  >
    Curated rentals with flexible terms, verified listings, and smart match
    recommendations.
  </p>

</div>


  {/* RIGHT IMAGE */}
  <div className="w-full flex justify-center lg:justify-end">
    <div className="relative">
      <img
        src={avatarSrc}
        alt="Xobia assistant"
        className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg mr-15"
      />
    </div>
  </div>

</div>



      </div>
    </section>
  );
}