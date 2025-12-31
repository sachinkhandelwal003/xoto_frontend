import React from "react";
import { useTranslation } from "react-i18next";
import waveBg from "../../assets/img/wave/wave2.png";

// images
import solarLighting from "../../assets/img/solar.png";
import lowWaterPlant from "../../assets/img/jungle.png";
import ecoMaterials from "../../assets/img/wooden.png";
import automatedControl from "../../assets/img/mobile.png";
import futureReady from "../../assets/img/something.png";

export default function EcoSmartLiving() {
  const { t } = useTranslation("scape1"); // 👈 namespace same as locale file

  const features = [
    {
      type: "smart",
      title: t("features.smartIrrigation.title"),
      text: t("features.smartIrrigation.text"),
      gradient: true,
    },
    {
      title: t("features.solarLighting"),
      image: solarLighting,
    },
    {
      title: t("features.lowWaterPlant"),
      image: lowWaterPlant,
    },
    {
      title: t("features.ecoMaterials"),
      image: ecoMaterials,
    },
    {
      title: t("features.automatedControl"),
      image: automatedControl,
    },
    {
      title: t("features.futureReady"),
      image: futureReady,
    },
  ];

  return (
    <section className="relative w-full overflow-hidden pb-20 bg-white">
      {/* Wave */}
      <div className="absolute -bottom-160 left-0 w-full z-0">
        <img src={waveBg} alt="wave" className="w-full object-cover" />
      </div>

      <div className="relative z-10 text-center mt-16 px-6">
        {/* Heading */}
        <h1 className="font-semibold text-[60px] leading-[48px] text-[#020202]">
          {t("heading")}
        </h1>

        {/* Description */}
        <p className="mt-4 text-[24px] leading-[33px] text-[#547593] max-w-[968px] mx-auto">
          {t("description")}
        </p>

        {/* Subheading */}
        <h2 className="mt-10 font-semibold text-[31px] leading-[55px] text-[#020202]">
          {t("subheading")}
        </h2>

        {/* Features */}
        <div className="mt-14 flex flex-col items-center gap-10">
          {/* Row 1 */}
          <div className="flex flex-wrap justify-center gap-20">
            {/* Smart Irrigation */}
            <div className="rounded-full p-[12px]">
              <div className="w-[200px] h-[200px] rounded-full flex flex-col items-center justify-center text-white bg-gradient-to-br from-purple-600 via-blue-500 to-cyan-400">
                <span className="text-lg font-bold text-center">
                  {features[0].title}
                </span>
                <p className="text-xs mt-1 px-3 text-center opacity-90">
                  {features[0].text}
                </p>
              </div>
            </div>

            {/* Next two */}
            {features.slice(1, 3).map((item, i) => (
              <CircleCard key={i} title={item.title} image={item.image} />
            ))}
          </div>

          {/* Row 2 */}
          <div className="flex flex-wrap justify-center gap-20">
            {features.slice(3).map((item, i) => (
              <CircleCard key={i} title={item.title} image={item.image} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* 🔹 Reusable Card */
function CircleCard({ title, image }) {
  return (
    <div className="rounded-full p-[12px]">
      <div
        className="w-[200px] h-[200px] rounded-full bg-cover bg-center shadow-lg flex items-center justify-center"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="bg-black/40 w-full h-full rounded-full flex items-center justify-center px-2 text-white font-semibold text-center">
          {title}
        </div>
      </div>
    </div>
  );
}
