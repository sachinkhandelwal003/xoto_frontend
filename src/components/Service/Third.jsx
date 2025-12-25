import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import logo from "../../assets/img/xoto vault.png";
import maskgroup from "../../assets/img/Maskgroup1.png";
import rentimg from "../../assets/img/rental-home1.png";
import personimg from "../../assets/img/rent-person.png";

const dmSans = {
  fontFamily: "'DM Sans', sans-serif",
};

export default function Third() {
  const { t, i18n } = useTranslation("mort3");
  const [step, setStep] = useState(1);

  const progressWidth = ((step - 1) / 3) * 100;
  const isRTL = i18n.language === "fa";

  return (
    <section
      dir={isRTL ? "rtl" : "ltr"}
      className="relative w-full overflow-hidden"
      style={{
        backgroundImage: `url(${maskgroup})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        ...dmSans,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-purple-800/85 via-purple-700/45 to-cyan-500/30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-16 md:py-24">

        {/* TITLE */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 -mt-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-white font-bold leading-tight text-center md:text-left">
            {t("title.line1")} <br /> {t("title.line2")}
          </h2>

          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-[#5C039B] flex items-center justify-center shadow-xl">
            <img src={logo} className="h-20" />
          </div>
        </div>

        {/* DESKTOP TIMELINE */}
        <div className="relative hidden md:block w-full mt-20">
          <div className="relative w-full h-[4px] rounded-full bg-white/30">
            <div
              className="h-full bg-gradient-to-r from-[#03A4F4] to-[#64EF0A] rounded-full transition-all duration-500"
              style={{ width: `${progressWidth}%` }}
            />
          </div>

          <div className="absolute -top-14 left-0 w-full flex justify-between px-10">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="w-28 h-28 flex justify-center">
                <button
                  onClick={() => setStep(num)}
                  className={`rounded-full transition-all duration-300 
                    ${step >= num ? "bg-[#5C039B] scale-110 shadow-xl" : "bg-gray-500/50"}
                    ${num === 1 ? "w-28 h-28" : num === 2 ? "w-20 h-20" : "w-12 h-12"}`}
                >
                  {num === 1 && <img src={rentimg} className="w-14 h-14 mx-auto" />}
                  {num === 2 && <img src={personimg} className="w-10 h-10 mx-auto" />}
                </button>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-4 gap-10 mt-24">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} onClick={() => setStep(num)} className="cursor-pointer text-center">
                <span className="text-green-300 font-semibold">
                  {t(`steps.${num}.label`)}
                </span>
                <h3 className="text-white font-semibold text-lg mt-2">
                  {t(`steps.${num}.title`)}
                </h3>
                <p className="text-white/70 text-sm mt-2">
                  {t(`steps.${num}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* MOBILE */}
        <div className="md:hidden mt-20 px-6 relative">
          <div className="absolute left-10 top-4 bottom-0 w-[3px] bg-white/40"></div>

          <div className="flex flex-col gap-14">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="relative flex gap-6 items-start">
                <div
                  onClick={() => setStep(num)}
                  className={`z-10 rounded-full
                    ${step >= num ? "bg-[#5C039B] shadow-xl" : "bg-gray-500/50"}
                    ${num === 1 ? "w-14 h-14" : num === 2 ? "w-12 h-12" : "w-10 h-10"}`}
                >
                  {num === 1 && <img src={rentimg} className="w-8 h-8 mx-auto mt-3" />}
                  {num === 2 && <img src={personimg} className="w-6 h-6 mx-auto mt-3" />}
                </div>

                <div onClick={() => setStep(num)}>
                  <span className="text-green-300 font-semibold text-sm">
                    {t(`steps.${num}.label`)}
                  </span>
                  <h3 className="text-white font-semibold text-lg mt-1">
                    {t(`steps.${num}.title`)}
                  </h3>
                  <p className="text-white/70 text-sm mt-1">
                    {t(`steps.${num}.desc`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
