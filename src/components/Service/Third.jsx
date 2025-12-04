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
        {/* Title Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0 -mt-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-white font-bold leading-tight text-center md:text-left">
            Your Mortgage, <br /> Simplified in 4 Steps
          </h2>

          {/* Logo circle */}
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

        {/* Timeline */}
        <div className="relative w-full mt-16 md:mt-20">
          {/* Line */}
          <div className="hidden md:flex absolute top-20 left-0 right-0 justify-center">
            <div
              className="w-full max-w-5xl h-[3px] rounded-full"
              style={{
                background: "linear-gradient(to right, #03A4F4, #64EF0A)",
              }}
            ></div>
          </div>

          {/* Steps */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {/* STEP 01 */}
            <div className="flex flex-col items-center">
              <span className="text-green-300 font-semibold tracking-wider mb-3">
                STEP 01
              </span>

              <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full bg-[#5C039B] flex items-center justify-center shadow-xl">
                <img
                  src={rentimg}
                  alt="step1"
                  className="w-12 h-12 sm:w-16 sm:h-16"
                />
              </div>

              <div className="mt-4 text-left">
                <h3 className="text-white font-semibold text-lg">
                  Consultation &<br /> Pre-Check
                </h3>
                <p className="text-white/70 text-sm mt-2 leading-relaxed max-w-[200px]">
                  We assess your finances and suggest options.
                </p>
              </div>
            </div>

            {/* STEP 02 */}
            <div className="flex flex-col items-center">
              <span className="text-green-300 font-semibold tracking-wider mb-3">
                STEP 02
              </span>

              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#5C039B] flex items-center justify-center shadow-lg">
                <img
                  src={personimg}
                  alt="step2"
                  className="w-7 h-7 sm:w-9 sm:h-9"
                />
              </div>

              <div className="mt-4 text-left">
                <h3 className="text-white font-semibold text-lg">
                  Offer <br /> Comparison
                </h3>
                <p className="text-white/70 text-sm mt-2 leading-relaxed max-w-[200px]">
                  Multiple lenders evaluated for best fit.
                </p>
              </div>
            </div>

            {/* STEP 03 */}
            <div className="flex flex-col items-center">
              <span className="text-green-300 font-semibold tracking-wider mb-3">
                STEP 03
              </span>

              <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-[#5C039B] shadow-lg"></div>

              <div className="mt-4 text-left">
                <h3 className="text-white font-semibold text-lg">
                  Select &<br /> Apply
                </h3>
                <p className="text-white/70 text-sm mt-2 leading-relaxed max-w-[200px]">
                  Choose your offer, we handle documentation.
                </p>
              </div>
            </div>

            {/* STEP 04 */}
            <div className="flex flex-col items-center">
              <span className="text-green-300 font-semibold tracking-wider mb-3">
                STEP 04
              </span>

              <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-[#5C039B] shadow-lg"></div>

              <div className="mt-4 text-left">
                <h3 className="text-white font-semibold text-lg">
                  Approval &<br /> Disbursement
                </h3>
                <p className="text-white/70 text-sm mt-2 leading-relaxed max-w-[200px]">
                  Funds released with our support.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* bottom spacing */}
        <div className="mt-10 md:mt-14" />
      </div>

      {/* bottom fade */}
      <div className="absolute left-0 right-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-white/0" />
    </section>
  );
}
