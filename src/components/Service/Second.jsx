import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import HouseChart from "../../assets/img/mortgage.png";

const MortgageCalculator = () => {
  const { t } = useTranslation("mort2");

  const [active, setActive] = useState("borrow");
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
        {t("title")}
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
          {t("modes.borrow")}
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
          {t("modes.estimate")}
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
          {t("modes.check")}
        </button>
      </div>

      {/* IMAGE & PROGRESS */}
      <div className="max-w-6xl mx-auto flex flex-col gap-6 mt-10 px-4 sm:px-6">

        {/* IMAGE */}
        <div className="w-full flex justify-center mb-6">
          <img
            src={HouseChart}
            alt="Mortgage Illustration"
            className="w-48 sm:w-72 md:w-80 object-contain"
          />
        </div>

        {/* Desktop Progress */}
        <div className="hidden lg:block w-full max-w-4xl mx-auto h-2 bg-gray-200 rounded-full overflow-hidden mb-6">
          <div
            className="h-2 bg-green-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex flex-row sm:flex-col lg:flex-row gap-6 justify-center">

          {/* Mobile Progress */}
          <div className="flex justify-center lg:hidden">
            <div className="w-3 h-60 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="bg-green-500 w-full transition-all duration-500"
                style={{ height: `${progress}%` }}
              />
            </div>
          </div>

          {/* FEATURES */}
          <div className="flex w-full px-20 flex-col gap-4 text-center lg:flex-row lg:justify-between lg:text-left">

            {[1, 2, 3, 4].map((num) => (
              <div
                key={num}
                onClick={() => setFeature(num)}
                className={`cursor-pointer transition-all duration-300 ${
                  feature === num ? "scale-[1.05]" : ""
                }`}
              >
                <p
                  className={`text-xs mb-1 ${
                    feature === num
                      ? "text-[var(--color-primary)]"
                      : "text-gray-400"
                  }`}
                >
                  {t(`features.${num}.label`)}
                </p>

                <h3
                  className={`text-lg font-semibold leading-tight ${
                    feature === num
                      ? "text-[var(--color-primary)]"
                      : "text-black"
                  }`}
                >
                  {t(`features.${num}.title`)}
                </h3>
              </div>
            ))}

          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="flex justify-center mt-12 px-4">
        <button
          className="w-full sm:w-auto max-w-xs px-10 py-3 bg-[var(--color-primary)] text-white font-semibold rounded-lg hover:bg-purple-800 transition-all"
          style={dmSans}
        >
          {t("cta")}
        </button>
      </div>

      {/* DISCLAIMER */}
      <p
        className="text-center mt-4 text-sm sm:text-md text-[var(--color-primary)]"
        style={dmSans}
      >
        {t("disclaimer")}
      </p>
    </section>
  );
};

export default MortgageCalculator;
