import React, { useState } from "react";
import HouseChart from "../../assets/img/mortgage.png";
import Wave from "../../assets/img/Mask.png";



const MortgageCalculator = () => {
  const [active, setActive] = useState("borrow");

  const dmSans = {
  fontFamily: "'DM Sans', sans-serif",
};

  return (

      <section className="w-full   py-15 bg-[var(--color-body)] relative overflow-hidden">
        
        {/* WAVE IMAGE */}
        <div className="absolute bottom-[-20px] lg:bottom-[-705px] left-0 w-full z-0 overflow-hidden">
               <img
                 src={Wave}
                 alt=""
                 className="w-full min-w-[140%] -ml-[20%] scale-[1.8] lg:scale-100 lg:min-w-full lg:ml-0 pointer-events-none select-none"
               />
             </div>

        {/* TITLE */}
        <h2
          className="text-center text-4xl md:text-5xl heading-dark-1 text-black mb-12"
          style={dmSans}
        >
          Plan Your Mortgage with Confidence
        </h2>

        {/* MODE BUTTONS */}
        <div
          className="w-max flex  gap-4
             bg-[linear-gradient(to_right,#03AAF4,#64EF0A)]
             py-2 px-2 rounded-lg mx-auto"
          style={dmSans}
        >
          <button
            onClick={() => setActive("borrow")}
            className={`px-13 py-3  text-white font-medium rounded-xl border border-white transition-all duration-300
            ${active === "borrow" ? "bg-[var(--color-primary)]" : "bg-[#5C039B]"}`}
            style={dmSans}
          >
            How Much Can I Borrow?
          </button>

          <button
            onClick={() => setActive("estimate")}
            className={`px-13 py-3 text-white font-medium rounded-xl border border-white transition-all duration-300
            ${active === "estimate" ? "bg-[#5C039B]" : "bg-transparent hover:bg-[#5C039B]"}`}
            style={dmSans}
          >
            Monthly Payment Estimate
          </button>

          <button
            onClick={() => setActive("check")}
            className={`px-13 py-3 text-white font-medium rounded-xl border border-white transition-all duration-300
            ${active === "check" ? "bg-[#5C039B]" : "bg-transparent hover:bg-[#5C039B]"}`}
            style={dmSans}
          >
            Affordability Check
          </button>
        </div>

        {/* IMAGE */}
        <div className="flex justify-center mb-12 mt-10">
          <img
            src={HouseChart}
            alt="Mortgage Illustration"
            className="w-64 md:w-80 object-contain"
          />
        </div>

        {/* PROGRESS BAR */}
        <div className="w-full max-w-4xl mx-auto h-2 bg-gray-200 rounded-full">
          <div className="h-2 w-1/4 bg-green-500 rounded-full"></div>
        </div>

        {/* FEATURES */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 relative z-20 text-center mt-8 max-w-4xl mx-auto gap-6"
          style={dmSans}
        >
          <div>
            <p className="text-xs text-gray-400 mb-1">Feature 1</p>
            <h3 className="text-lg font-semibold text-purple-700 leading-tight ">
              Property <br /> Value
            </h3>
          </div>

          <div>
            <p className="text-xs text-gray-400 mb-1">Feature 2</p>
            <h3 className="text-[20px] font-bold text-[#020202] leading-[22px]">
              Down <br /> Payment
            </h3>
          </div>

          <div>
            <p className="text-xs text-gray-400 mb-1">Feature 3</p>
            <h3 className="text-lg font-bold text-black leading-tight">
              Term
            </h3>
          </div>

          <div>
            <p className="text-xs text-black mb-1">Feature 4</p>
            <h3 className="text-lg font-bold text-black  leading-tight">
              Max Loan <br /> Output
            </h3>
          </div>
        </div>

        {/* CTA BUTTON */}
        <div className="flex justify-center mt-12">
          <button
            className="px-32 py-3 bg-[var(--color-primary)] text-white font-semibold rounded-lg hover:bg-purple-800 transition-all z-[999]"
            style={dmSans}
          >
            Get Pre-Approved
          </button>
        </div>

        {/* DISCLAIMER */}
        <p className="text-center relative z-20  mt-4 text-md italic text-[var(--color-primary)]" style={dmSans}>
          Estimates are indicative. Final terms subject to credit approval.
        </p>
        
      </section>
    
  );
};

export default MortgageCalculator;
