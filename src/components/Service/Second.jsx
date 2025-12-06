import React, { useState } from "react";
import HouseChart from "../../assets/img/mortgage.png";

const MortgageCalculator = () => {
  const [active, setActive] = useState("borrow");

  // NEW: Feature progress + active feature highlight
  const [feature, setFeature] = useState(1);
  const progress = feature * 25; // 4 steps → 25% each

  const dmSans = { fontFamily: "'DM Sans', sans-serif" };

  return (
    <section className="relative z-20 w-full py-12 bg-[var(--color-body)] overflow-hidden">
      {/* TITLE */}
      <h2
        className="text-center text-3xl md:text-5xl font-bold text-black mb-10 px-4"
        style={dmSans}
      >
        Plan Your Mortgage with Confidence
      </h2>

      {/* MODE BUTTONS */}
      <div
        className="
          flex flex-nowrap overflow-x-auto scrollbar-hide gap-3
          bg-[linear-gradient(to_right,#03AAF4,#64EF0A)]
          p-6 lg:p-2 rounded-lg w-full max-w-[95%] mx-auto
          sm:flex-wrap sm:overflow-visible sm:max-w-max
        "
      >
        <button
          onClick={() => setActive("borrow")}
          className={`
            flex-shrink-0 px-6 py-3 text-sm sm:text-base font-semibold rounded-xl
            border border-white text-white transition-all duration-300
            ${
              active === "borrow"
                ? "bg-[var(--color-primary)] shadow-lg scale-[1.03]"
                : "bg-transparent hover:bg-[#5C039B]"
            }
          `}
        >
          How Much Can I Borrow?
        </button>

        <button
          onClick={() => setActive("estimate")}
          className={`
            flex-shrink-0 px-6 py-3 text-sm sm:text-base font-semibold rounded-xl
            border border-white text-white transition-all duration-300
            ${
              active === "estimate"
                ? "bg-[var(--color-primary)] shadow-lg scale-[1.03]"
                : "bg-transparent hover:bg-[#5C039B]"
            }
          `}
        >
          Monthly Payment Estimate
        </button>

        <button
          onClick={() => setActive("check")}
          className={`
            flex-shrink-0 px-6 py-3 text-sm sm:text-base font-semibold rounded-xl
            border border-white text-white transition-all duration-300
            ${
              active === "check"
                ? "bg-[var(--color-primary)] shadow-lg scale-[1.03]"
                : "bg-transparent hover:bg-[#5C039B]"
            }
          `}
        >
          Affordability Check
        </button>
      </div>

      {/* IMAGE & PROGRESS */}
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-col gap-6 lg:gap-10 mt-10 px-4 sm:px-6">

        {/* IMAGE */}
        <div className="w-full flex justify-center mb-6">
          <img
            src={HouseChart}
            alt="Mortgage Illustration"
            className="w-48 sm:w-72 md:w-80 object-contain"
          />
        </div>

        {/* Desktop Horizontal Progress */}
        <div className="hidden lg:block w-full max-w-4xl mx-auto h-2 bg-gray-200 rounded-full overflow-hidden mb-6">
          <div
            className="h-2 bg-green-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="flex flex-row sm:flex-col lg:flex-row gap-6 justify-center">

          {/* Mobile Vertical Progress */}
          <div className="flex justify-center sm:justify-start mb-6 sm:mb-0 lg:hidden">
            <div className="w-3 h-60 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="bg-green-500 w-full transition-all duration-500"
                style={{ height: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* FEATURES */}
          <div className="flex w-full px-20 flex-col sm:items-start gap-4 text-center lg:flex-row lg:justify-between lg:text-left">

            {/* Feature 1 */}
            <div
              onClick={() => setFeature(1)}
              className={`cursor-pointer transition-all duration-300 ${
                feature === 1 ? "scale-[1.05]" : ""
              }`}
            >
              <p
                className={`text-xs mb-1 ${
                  feature === 1 ? "text-[var(--color-primary)] " : "text-gray-400"
                }`}
              >
                Feature 1
              </p>
              <h3
                className={`text-lg font-semibold leading-tight ${
                  feature === 1 ? "text-[var(--color-primary)] " : "text-black"
                }`}
              >
                Property Value
              </h3>
            </div>

            {/* Feature 2 */}
            <div
              onClick={() => setFeature(2)}
              className={`cursor-pointer transition-all duration-300 ${
                feature === 2 ? "scale-[1.05]" : ""
              }`}
            >
              <p
                className={`text-xs mb-1 ${
                  feature === 2 ? "text-[var(--color-primary)] " : "text-gray-400"
                }`}
              >
                Feature 2
              </p>
              <h3
                className={`text-lg font-semibold leading-tight ${
                  feature === 2 ? "text-[var(--color-primary)] " : "text-black"
                }`}
              >
                Down Payment
              </h3>
            </div>

            {/* Feature 3 */}
            <div
              onClick={() => setFeature(3)}
              className={`cursor-pointer transition-all duration-300 ${
                feature === 3 ? "scale-[1.05]" : ""
              }`}
            >
              <p
                className={`text-xs mb-1 ${
                  feature === 3 ? "text-[var(--color-primary)] " : "text-gray-400"
                }`}
              >
                Feature 3
              </p>
              <h3
                className={`text-lg font-semibold leading-tight ${
                  feature === 3 ? "text-[var(--color-primary)] " : "text-black"
                }`}
              >
                Term
              </h3>
            </div>

            {/* Feature 4 */}
            <div
              onClick={() => setFeature(4)}
              className={`cursor-pointer transition-all duration-300 ${
                feature === 4 ? "scale-[1.05]" : ""
              }`}
            >
              <p
                className={`text-xs mb-1 ${
                  feature === 4 ? "text-[var(--color-primary)] " : "text-gray-400"
                }`}
              >
                Feature 4
              </p>
              <h3
                className={`text-lg font-semibold leading-tight ${
                  feature === 4 ? "text-[var(--color-primary)] " : "text-black"
                }`}
              >
                Max Loan <br /> Output
              </h3>
            </div>

          </div>

        </div>
      </div>

      {/* CTA BUTTON */}
      <div className="flex justify-center mt-12 px-4">
        <button
          className="w-full sm:w-auto max-w-xs px-10 py-3 bg-[var(--color-primary)] text-white font-semibold rounded-lg hover:bg-purple-800 transition-all"
          style={dmSans}
        >
          Get Pre-Approved
        </button>
      </div>

      {/* DISCLAIMER */}
      <p
        className="text-center mt-4 text-sm sm:text-md text-[var(--color-primary)]"
        style={dmSans}
      >
        Estimates are indicative. Final terms subject to credit approval.
      </p>
    </section>
  );
};

export default MortgageCalculator;
