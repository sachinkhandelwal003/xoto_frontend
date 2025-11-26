import React, { useState } from "react";
import HouseChart from "../../assets/img/mortgage.png";
import Wave from '../../assets/img/Mask.png'
const MortgageCalculator = () => {
  const [active, setActive] = useState("borrow");
  return (
    <div>
      <section className="w-full py-15 bg-white relative overflow-hidden">
       <img
              src={Wave}
              alt=""
              className="absolute bottom-0 left-0 w-full pointer-events-none opacity-70 z-10"
              style={{ transform: "translateY(810px)" }} // keep your current position
            />
        {/* Title */}
        <h2 className="text-center text-4xl md:text-5xl font-bold text-[#020202] mb-12">
          Plan Your Mortgage with Confidence
        </h2>

        {/* Buttons (background sized to content and centered) */}
        <div
          className="w-max flex justify-center items-center gap-4
             bg-[linear-gradient(to_right,#03AAF4,#64EF0A)]
             py-2 px-2 rounded-lg mx-auto"
        >
          <button
            onClick={() => setActive("borrow")}
            className={`px-8 py-3 text-white font-medium rounded-xl border border-white transition-all duration-300
              ${active === "borrow" ? "bg-[#5C039B]" : "bg-[#5C039B]"}`}
          >
            How Much Can I Borrow?
          </button>

          <button
            onClick={() => setActive("estimate")}
            className={`px-8 py-3 text-white font-medium rounded-xl border border-white transition-all duration-300
              ${active === "estimate" ? "bg-[#5C039B]" : "bg-transparent hover:bg-[#5C039B]"}`}
          >
            Monthly Payment Estimate
          </button>

          <button
            onClick={() => setActive("check")}
            className={`px-8 py-3 text-white font-medium rounded-xl border border-white transition-all duration-300
              ${active === "check" ? "bg-[#5C039B]" : "bg-transparent hover:bg-[#5C039B]"}`}
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

        {/* Progress bar */}
        <div className="w-full max-w-4xl mx-auto h-2 bg-gray-200 rounded-full">
          <div className="h-2 w-1/4 bg-green-500 rounded-full"></div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 text-center mt-8 max-w-4xl mx-auto gap-6">
          <div>
            <p className="text-xs text-gray-400 mb-1">Feature 1</p>
            <h3 className="text-lg font-semibold text-purple-700 leading-tight">
              Property <br /> Value
            </h3>
          </div>

          <div>
            <p className="text-xs text-gray-400 mb-1">Feature 2</p>
            <h3 className="text-[20px] font-semibold text-[#020202] leading-[22px]">
              Down <br /> Payment
            </h3>
          </div>

          <div>
            <p className="text-xs text-gray-400 mb-1">Feature 3</p>
            <h3 className="text-lg font-semibold text-gray-700 leading-tight">
              Term
              
            </h3>
          </div>

          <div>
            <p className="text-xs text-gray-400 mb-1">Feature 4</p>
            <h3 className="text-lg font-semibold text-gray-700 leading-tight">
              Max Loan <br /> Output
            </h3>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-12">
          <button className="px-26 py-3 bg-purple-700 text-white font-semibold rounded-lg hover:bg-purple-800 transition-all z-[999]">
            Get Pre-Approved
          </button>
        </div>

        {/* Disclaimer */}
        <p className="text-center mt-4 text-sm italic text-purple-600 ">
          Estimates are indicative. Final terms subject to credit approval.
        </p>
      </section>
    </div>
  );
};

export default MortgageCalculator;
