import React, { useState } from "react";
import HouseChart from "../../assets/img/mortgage.png";
// import Wave from "../../assets/img/Mask.png";

const MortgageCalculator = () => {
  const [active, setActive] = useState("borrow");

  const dmSans = { fontFamily: "'DM Sans', sans-serif" };

  return (
    <section className=" relative z-20 w-full py-12 bg-[var(--color-body)]  overflow-hidden">
      {/* WAVE IMAGE
      <div className="  absolute bottom-0 left-0 w-full z-0 pointer-events-none select-none">
        <img
          src={Wave}
          alt=""
          className="w-full object-cover scale-150 sm:scale-100"
        />
      </div> */}

      {/* TITLE */}
      <h2
        className="text-center text-3xl md:text-5xl font-bold text-black mb-10 px-4"
        style={dmSans}
      >
        Plan Your Mortgage with Confidence
      </h2>

      {/* MODE BUTTONS */}
      <div
        className="flex flex-wrap justify-center items-center gap-3
        bg-[linear-gradient(to_right,#03AAF4,#64EF0A)]
        p-2 rounded-lg w-full max-w-[95%] sm:max-w-max mx-auto"
      >
        <button
          onClick={() => setActive("borrow")}
          className={`px-6 py-3 text-sm sm:text-base text-white font-medium rounded-xl border border-white transition-all duration-300
            ${active === "borrow" ? "bg-[var(--color-primary)]" : "bg-[#5C039B]"}`}
        >
          How Much Can I Borrow?
        </button>

        <button
          onClick={() => setActive("estimate")}
          className={`px-6 py-3 text-sm sm:text-base text-white font-medium rounded-xl border border-white transition-all duration-300
            ${active === "estimate" ? "bg-[#5C039B]" : "bg-transparent hover:bg-[#5C039B]"}`}
        >
          Monthly Payment Estimate
        </button>

        <button
          onClick={() => setActive("check")}
          className={`px-6 py-3 text-sm sm:text-base text-white font-medium rounded-xl border border-white transition-all duration-300
            ${active === "check" ? "bg-[#5C039B]" : "bg-transparent hover:bg-[#5C039B]"}`}
        >
          Affordability Check
        </button>
      </div>

      {/* IMAGE */}
      <div className="flex justify-center mb-10 mt-10">
        <img
          src={HouseChart}
          alt="Mortgage Illustration"
          className="w-48 sm:w-72 md:w-80 object-contain"
        />
      </div>

      {/* PROGRESS BAR */}
      <div className="w-full max-w-xl mx-auto h-2 bg-gray-200 rounded-full overflow-hidden px-4">
        <div className="h-2 w-1/4 bg-green-500 rounded-full"></div>
      </div>

      {/* FEATURES */}
      <div
        className="grid grid-cols-2 sm:grid-cols-4 text-center gap-8 mt-10 max-w-4xl mx-auto px-4"
        style={dmSans}
      >
        <div>
          <p className="text-xs text-gray-400 mb-1">Feature 1</p>
          <h3 className="text-lg font-semibold text-purple-700 leading-tight">
            Property <br /> Value
          </h3>
        </div>

        <div>
          <p className="text-xs text-gray-400 mb-1">Feature 2</p>
          <h3 className="text-lg font-bold text-black leading-tight">
            Down <br /> Payment
          </h3>
        </div>

        <div>
          <p className="text-xs text-gray-400 mb-1">Feature 3</p>
          <h3 className="text-lg font-bold text-black leading-tight">Term</h3>
        </div>

        <div>
          <p className="text-xs text-gray-400 mb-1">Feature 4</p>
          <h3 className="text-lg font-bold text-black leading-tight">
            Max Loan <br /> Output
          </h3>
        </div>
      </div>

      {/* CTA BUTTON */}
      <div className="flex justify-center mt-12 px-4">
        <button
          className="w-full sm:w-auto px-10 py-3 bg-[var(--color-primary)] text-white font-semibold rounded-lg hover:bg-purple-800 transition-all z-[999]"
          style={dmSans}
        >
          Get Pre-Approved
        </button>
      </div>

      {/* DISCLAIMER */}
      <p
        className="text-center mt-4 text-sm sm:text-md italic text-[var(--color-primary)] relative z-20 px-4"
        style={dmSans}
      >
        Estimates are indicative. Final terms subject to credit approval.
      </p>
    </section>
  );
};

export default MortgageCalculator;
