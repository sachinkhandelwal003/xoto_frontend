import React from "react";
import { useTranslation } from "react-i18next";
import waveBg from "../../assets/img/wave/wave2.png";

// Local image imports
import solarLighting from "../../assets/img/solar.png";
import lowWaterPlant from "../../assets/img/jungle.png";
import ecoMaterials from "../../assets/img/wooden.png";
import automatedControl from "../../assets/img/mobile.png";
import futureReady from "../../assets/img/something.png";

export default function EcoSmartLiving() {
  // 🔥 scape1 namespace
  const { t } = useTranslation("scape1");

  const features = [
    {
      key: "smartIrrigation",
      gradient: true,
    },
    {
      key: "solarLighting",
      image: solarLighting,
    },
    {
      key: "lowWaterPlant",
      image: lowWaterPlant,
    },
    {
      key: "ecoMaterials",
      image: ecoMaterials,
    },
    {
      key: "automatedControl",
      image: automatedControl,
    },
    {
      key: "futureReady",
      image: futureReady,
    },
  ];

  return (
    <section className="relative w-full overflow-hidden pb-20 bg-white min-h-screen">
      {/* Wave Background */}
      <div className="absolute -bottom-160 left-0 w-full z-0 pointer-events-none">
        <img
          src={waveBg}
          alt="wave-bg"
          className="w-full object-cover opacity-90"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center mt-16 px-6">
        {/* MAIN HEADING */}
        <h1 className="text-4xl md:text-5xl card-heading-1 text-black">
          {t("heading")}
        </h1>

        {/* DESCRIPTION */}
        <p className="mt-4 text-[#547593] paragraph-light-1 max-w-3xl mx-auto text-lg">
          {t("description")}
        </p>

        {/* SUB HEADING */}
        <h2 className="text-3xl font-semibold mt-10 text-black leading-tight">
          {t("subheading")}
        </h2>

        {/* FEATURES GRID */}
        <div className="mt-14 flex flex-col items-center gap-10">
          {/* ROW 1 */}
          <div className="flex flex-wrap justify-center gap-20">
            {/* GRADIENT CARD */}
            <div className="rounded-full p-[12px] ring-4 ring-transparent hover:ring-[#5C039B] transition-all duration-300">
              <div className="w-[200px] h-[200px] rounded-full flex flex-col items-center justify-center text-center text-white shadow-xl bg-gradient-to-br from-purple-600 via-blue-500 to-cyan-400 hover:scale-105 hover:shadow-2xl transition-all duration-300">
                <span className="text-lg font-bold">
                  {t("features.smartIrrigation.title")}
                </span>
                <p className="text-xs mt-1 px-3 opacity-90">
                  {t("features.smartIrrigation.text")}
                </p>
              </div>
            </div>

            {/* NEXT TWO */}
            {features.slice(1, 3).map((item, i) => (
              <div
                key={i}
                className="rounded-full p-[12px] ring-4 ring-transparent hover:ring-[#5C039B] transition-all duration-300"
              >
                <div
                  className="w-[200px] h-[200px] rounded-full bg-cover bg-center shadow-lg flex items-center justify-center hover:scale-105 hover:shadow-2xl transition-all duration-300"
                  style={{ backgroundImage: `url(${item.image})` }}
                >
                  <div className="bg-black/40 w-full h-full rounded-full flex items-center justify-center px-2 text-center text-white font-semibold">
                    {t(`features.${item.key}`)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ROW 2 */}
          <div className="flex flex-wrap justify-center gap-20">
            {features.slice(3).map((item, i) => (
              <div
                key={i}
                className="rounded-full p-[12px] ring-4 ring-transparent hover:ring-[#5C039B] transition-all duration-300"
              >
                <div
                  className="w-[200px] h-[200px] rounded-full bg-cover bg-center shadow-lg flex items-center justify-center hover:scale-105 hover:shadow-2xl transition-all duration-300"
                  style={{ backgroundImage: `url(${item.image})` }}
                >
                  <div className="bg-black/40 w-full h-full rounded-full flex items-center justify-center px-2 text-center text-white font-semibold">
                    {t(`features.${item.key}`)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
