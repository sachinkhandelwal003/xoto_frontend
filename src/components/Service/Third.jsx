import React, { useState } from "react";
import logo from "../../assets/img/xoto vault.png";
import maskgroup from "../../assets/img/Maskgroup1.png";
import rentimg from "../../assets/img/rental-home1.png";
import personimg from "../../assets/img/rent-person.png";

const dmSans = {
  fontFamily: "'DM Sans', sans-serif",
};

export default function Third() {
  const [step, setStep] = useState(1);

  // PROGRESS BAR WIDTH (desktop only)
  const progressWidth = ((step - 1) / 3) * 100;

  return (
    <section
      className="relative w-full overflow-hidden"
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
       {/* Title */}
<div className="flex flex-col md:flex-row items-center justify-between gap-8 -mt-10">
  <h2 className="text-3xl md:text-4xl lg:text-5xl text-white font-bold leading-tight text-center md:text-left">
    Your Mortgage, <br /> Simplified in 4 Steps
  </h2>

  <div className="sm:flex">
    <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-[#5C039B] flex items-center justify-center shadow-xl">
      <img src={logo} className="h-20" />
    </div>
  </div>
</div>


        {/* DESKTOP TIMELINE */}
        <div className="relative hidden md:block w-full mt-20">

          {/* PROGRESS LINE */}
          <div className="relative w-full h-[4px] rounded-full bg-white/30">
            <div
              className="h-full bg-gradient-to-r from-[#03A4F4] to-[#64EF0A] rounded-full transition-all duration-500"
              style={{ width: `${progressWidth}%` }}
            ></div>
          </div>

          {/* TIMELINE ICONS */}
          <div className="absolute -top-14 left-0 w-full flex justify-between px-10">

            {/* STEP 1 ICON */}
            <div className="w-28 h-28 flex justify-center">
              <button
                onClick={() => setStep(1)}
                className={`w-28 h-28 rounded-full flex items-center justify-center transition-all duration-300 
                ${step >= 1 ? "bg-[#5C039B] scale-110 shadow-xl" : "bg-gray-500/50"}`}
              >
                <img src={rentimg} className="w-14 h-14" />
              </button>
            </div>

            {/* STEP 2 ICON */}
            <div className="w-28 h-28 flex justify-center items-center">
              <button
                onClick={() => setStep(2)}
                className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 
                ${step >= 2 ? "bg-[#5C039B] scale-110 shadow-xl" : "bg-gray-500/50"}`}
              >
                <img src={personimg} className="w-10 h-10" />
              </button>
            </div>

            {/* STEP 3 ICON */}
            <div className="w-28 h-28 flex justify-center items-center">
              <button
                onClick={() => setStep(3)}
                className={`w-12 h-12 rounded-full transition-all duration-300 
                ${step >= 3 ? "bg-[#5C039B] scale-110 shadow-xl" : "bg-gray-500/50"}`}
              ></button>
            </div>

            {/* STEP 4 ICON */}
            <div className="w-28 h-28 flex justify-center items-center">
              <button
                onClick={() => setStep(4)}
                className={`w-12 h-12 rounded-full transition-all duration-300 
                ${step >= 4 ? "bg-[#5C039B] scale-110 shadow-xl" : "bg-gray-500/50"}`}
              ></button>
            </div>
          </div>

          {/* STEP CONTENT BELOW BAR */}
          <div className="grid grid-cols-4 gap-10 mt-24">

            <div onClick={() => setStep(1)} className="cursor-pointer text-center">
              <span className="text-green-300 font-semibold">STEP 01</span>
              <h3 className="text-white font-semibold text-lg mt-2">
                Consultation & <br /> Pre-Check
              </h3>
              <p className="text-white/70 text-sm mt-2">
                We assess your finances and suggest options.
              </p>
            </div>

            <div onClick={() => setStep(2)} className="cursor-pointer text-center">
              <span className="text-green-300 font-semibold">STEP 02</span>
              <h3 className="text-white font-semibold text-lg mt-2">
                Offer <br /> Comparison
              </h3>
              <p className="text-white/70 text-sm mt-2">
                Multiple lenders evaluated for best fit.
              </p>
            </div>

            <div onClick={() => setStep(3)} className="cursor-pointer text-center">
              <span className="text-green-300 font-semibold">STEP 03</span>
              <h3 className="text-white font-semibold text-lg mt-2">
                Select & <br /> Apply
              </h3>
              <p className="text-white/70 text-sm mt-2">
                Choose your offer, we handle documentation.
              </p>
            </div>

            <div onClick={() => setStep(4)} className="cursor-pointer text-center">
              <span className="text-green-300 font-semibold">STEP 04</span>
              <h3 className="text-white font-semibold text-lg mt-2">
                Approval & <br /> Disbursement
              </h3>
              <p className="text-white/70 text-sm mt-2">
                Funds released with our support.
              </p>
            </div>

          </div>
        </div>

        {/* MOBILE VERTICAL TIMELINE (Matches Your Screenshot) */}
        <div className="md:hidden mt-20 px-6 relative">

          {/* Vertical line */}
          <div className="absolute left-10 top-4 bottom-0 w-[3px] bg-white/40"></div>

          <div className="flex flex-col gap-14">

            {/* STEP 1 */}
            <div className="relative flex gap-6 flex justify-center items-center">
              <div
                onClick={() => setStep(1)}
                className={`w-14 h-14 rounded-full flex items-center justify-center z-10
                ${step >= 1 ? "bg-[#5C039B] shadow-xl" : "bg-gray-500/50"}`}
              >
                <img src={rentimg} className="w-8 h-8" />
              </div>

              <div className="flex flex-col" onClick={() => setStep(1)}>
                <span className="text-green-300 font-semibold text-sm">STEP 01</span>
                <h3 className="text-white font-semibold text-lg mt-1">Consultation & Pre-Check</h3>
                <p className="text-white/70 text-sm mt-1">
                  We assess your finances and suggest options.
                </p>
              </div>
            </div>

            {/* STEP 2 */}
            <div className="relative flex gap-6 items-start">
              <div
                onClick={() => setStep(2)}
                className={`w-12 h-12 rounded-full flex items-center justify-center z-10
                ${step >= 2 ? "bg-[#5C039B] shadow-xl" : "bg-gray-500/50"}`}
              >
                <img src={personimg} className="w-6 h-6" />
              </div>

              <div className="flex flex-col" onClick={() => setStep(2)}>
                <span className="text-green-300 font-semibold text-sm">STEP 02</span>
                <h3 className="text-white font-semibold text-lg mt-1">Offer Comparison</h3>
                <p className="text-white/70 text-sm mt-1">
                  Multiple lenders evaluated for best fit.
                </p>
              </div>
            </div>

            {/* STEP 3 */}
            <div className="relative flex gap-6 items-start">
              <div
                onClick={() => setStep(3)}
                className={`w-10 h-10 rounded-full z-10
                ${step >= 3 ? "bg-[#5C039B] shadow-xl" : "bg-gray-500/50"}`}
              ></div>

              <div className="flex flex-col" onClick={() => setStep(3)}>
                <span className="text-green-300 font-semibold text-sm">STEP 03</span>
                <h3 className="text-white font-semibold text-lg mt-1">Select & Apply</h3>
                <p className="text-white/70 text-sm mt-1">
                  Choose your offer, we handle documentation.
                </p>
              </div>
            </div>

            {/* STEP 4 */}
            <div className="relative flex gap-6 items-start">
              <div
                onClick={() => setStep(4)}
                className={`w-10 h-10 rounded-full z-10
                ${step >= 4 ? "bg-[#5C039B] shadow-xl" : "bg-gray-500/50"}`}
              ></div>

              <div className="flex flex-col" onClick={() => setStep(4)}>
                <span className="text-green-300 font-semibold text-sm">STEP 04</span>
                <h3 className="text-white font-semibold text-lg mt-1">Approval & Disbursement</h3>
                <p className="text-white/70 text-sm mt-1">
                  Funds released with our support.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
