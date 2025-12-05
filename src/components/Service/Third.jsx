import React from "react";
import logo from "../../assets/img/xoto vault.png";
import maskgroup from "../../assets/img/Maskgroup1.png";
import rentimg from "../../assets/img/rental-home1.png";
import personimg from "../../assets/img/rent-person.png";

const dmSans = {
  fontFamily: "'DM Sans', sans-serif",
};

export default function Third() {
  return (
    <section
      aria-label="Four step mortgage flow"
      className="relative w-full min-h-screen overflow-hidden"
      style={{
        backgroundImage: `url(${maskgroup})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        ...dmSans,
      }}
    >
      {/* DM Sans */}
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-800/85 via-purple-700/45 to-cyan-500/30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-16 md:py-24">
        
        {/* Title */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 -mt-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-white font-bold leading-tight text-center md:text-left">
            Your Mortgage, <br /> Simplified in 4 Steps
          </h2>

          {/* Desktop Logo */}
          <div className="hidden md:flex items-center justify-center">
            <div className="w-24 h-24 md:w-40 md:h-40 rounded-full bg-[#5C039B] flex items-center justify-center shadow-xl">
              <img
                src={logo}
                alt="logo"
                className="w-20 h-20 md:w-28 md:h-28"
              />
            </div>
          </div>
        </div>

        {/* Timeline Wrapper */}
        <div className="relative w-full mt-16 md:mt-10 ">

          {/* HORIZONTAL LINE (Desktop) — passes through icons */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-[25px] w-full max-w-5xl">
            <div
              className="h-[4px] w-full rounded-full"
              style={{
                background: "linear-gradient(to right, #03A4F4, #64EF0A)",
              }}
            ></div>
          </div>

          {/* Steps Grid */}
          <div className="relative grid grid-cols-1 md:grid-cols-4 gap-14 md:gap-8 z-10 pl-26 md:pl-0 ">

            {/* VERTICAL LINE (Mobile) */}
            <div className="md:hidden absolute left-8 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#03A4F4] to-[#64EF0A] ml-26 md:ml-0 " />

            {/* STEP 1 */}
            <div className="flex md:flex-col items-start md:items-center gap-6 relative ">

              {/* Icon */}
              <div className="flex items-center justify-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#5C039B] flex items-center justify-center shadow-xl z-10">
                  <img src={rentimg} className="w-10 h-10 sm:w-14 sm:h-14" />
                </div>
              </div>

              {/* Text */}
              <div className="mt-2 md:mt-6 ml-2 md:ml-0 text-left md:text-center">
                <span className="text-green-300 font-semibold">STEP 01</span>
                <h3 className="text-white font-semibold text-lg mt-2 leading-tight">
                  Consultation & <br /> Pre-Check
                </h3>
                <p className="text-white/70 text-sm mt-2 max-w-[220px] md:max-w-none">
                  We assess your finances and suggest options.
                </p>
              </div>
            </div>

            {/* STEP 2 */}
            <div className="flex md:flex-col items-start md:items-center gap-6 relative">

              <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-[#5C039B] flex items-center justify-center shadow-xl z-10 ml-1 md:ml-0">
                <img src={personimg} className="w-7 h-7 sm:w-9 sm:h-9" />
              </div>

              <div className="mt-2 md:mt-6 ml-2 md:ml-0 text-left md:text-center">
                <span className="text-green-300 font-semibold">STEP 02</span>
                <h3 className="text-white font-semibold text-lg mt-2 leading-tight">
                  Offer <br /> Comparison
                </h3>
                <p className="text-white/70 text-sm mt-2 max-w-[220px] md:max-w-none">
                  Multiple lenders evaluated for best fit.
                </p>
              </div>
            </div>

            {/* STEP 3 */}
            <div className="flex md:flex-col items-start md:items-center gap-6 relative">

              <div className="w-6 h-6 sm:w-10 sm:h-10 rounded-full bg-[#5C039B] shadow-xl z-10 ml-3 md:ml-0" />

              <div className="mt-2 md:mt-6 ml-2 md:ml-0 text-left md:text-center">
                <span className="text-green-300 font-semibold">STEP 03</span>
                <h3 className="text-white font-semibold text-lg mt-2 leading-tight">
                  Select & <br /> Apply
                </h3>
                <p className="text-white/70 text-sm mt-2 max-w-[220px] md:max-w-none">
                  Choose your offer, we handle documentation.
                </p>
              </div>
            </div>

            {/* STEP 4 */}
            <div className="flex md:flex-col items-start md:items-center gap-6 relative">

              <div className="w-6 h-6 sm:w-10 sm:h-10 rounded-full bg-[#5C039B] shadow-xl z-10 ml-3 md:ml-0" />

              <div className="mt-2 md:mt-6 ml-2 md:ml-0 text-left md:text-center">
                <span className="text-green-300 font-semibold">STEP 04</span>
                <h3 className="text-white font-semibold text-lg mt-2 leading-tight">
                  Approval & <br /> Disbursement
                </h3>
                <p className="text-white/70 text-sm mt-2 max-w-[220px] md:max-w-none">
                  Funds released with our support.
                </p>
              </div>
            </div>

          </div>
        </div>

        <div className="mt-14" />
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute left-0 right-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-white/0" />
    </section>
  );
}
