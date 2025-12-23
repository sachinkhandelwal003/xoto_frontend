import React from "react";
import { useTranslation } from "react-i18next";
import waveBg from "../../assets/img/wave/wave2.png";

// Images
import solarLighting from "../../assets/img/light.png";
import lowWaterPlant from "../../assets/img/chowk.png";
import ecoMaterials from "../../assets/img/plant.png";
import automatedControl from "../../assets/img/tab.png";
import futureReady from "../../assets/img/men.png";

export default function EcoSmartLiving() {
  const { t } = useTranslation("interior7");

  const features = [
    { title: "features.smartClimate.title", text: "features.smartClimate.text", gradient: true },
    { title: "features.lighting.title", text: "features.lighting.text", image: solarLighting },
    { title: "features.materials.title", text: "features.materials.text", image: ecoMaterials },
    { title: "features.water.title", text: "features.water.text", image: lowWaterPlant },
    { title: "features.automation.title", text: "features.automation.text", image: automatedControl },
    { title: "features.future.title", text: "features.future.text", image: futureReady }
  ];

  return (
    <section className="relative w-full overflow-hidden pb-20 bg-white min-h-screen">
      {/* Wave */}
      <div className="absolute -bottom-160 left-0 w-full z-0 pointer-events-none">
        <img src={waveBg} alt="wave-bg" className="w-full object-cover opacity-90" />
      </div>

      <div className="relative z-10 text-center mt-16 px-6">
        <h1 className="text-4xl md:text-5xl card-heading-1 text-black">
          {t("heading")}
        </h1>

        <p className="mt-4 text-[#547593] paragraph-light-1 max-w-3xl mx-auto text-lg">
          {t("description")}
        </p>

        <h2 className="text-3xl font-semibold mt-12 text-black">
          {t("subheading")}
        </h2>

        {/* FEATURES */}
        <div className="mt-14 flex flex-col items-center gap-12">
          {/* Row 1 */}
          <div className="flex flex-wrap justify-center gap-20">
            {/* Gradient Card */}
            <div className="rounded-full p-[12px] ring-4 ring-transparent hover:ring-[#5C039B] transition-all">
              <div className="w-[200px] h-[200px] rounded-full flex flex-col items-center justify-center text-center text-white bg-gradient-to-br from-purple-600 via-blue-500 to-cyan-400 shadow-xl hover:scale-105 transition-all px-4">
                <span className="text-sm font-bold">{t(features[0].title)}</span>
                <p className="text-[11px] mt-2 opacity-90">
                  {t(features[0].text)}
                </p>
              </div>
            </div>

            {features.slice(1, 3).map((item, i) => (
              <div key={i} className="rounded-full p-[12px] ring-4 ring-transparent hover:ring-[#5C039B] transition-all">
                <div
                  className="w-[200px] h-[200px] rounded-full bg-cover bg-center shadow-lg hover:scale-105 transition-all"
                  style={{ backgroundImage: `url(${item.image})` }}
                >
                  <div className="bg-black/50 w-full h-full rounded-full flex flex-col items-center justify-center px-4 text-center text-white">
                    <span className="text-sm font-semibold">{t(item.title)}</span>
                    <span className="text-[11px] mt-2 opacity-90">{t(item.text)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Row 2 */}
          <div className="flex flex-wrap justify-center gap-20">
            {features.slice(3).map((item, i) => (
              <div key={i} className="rounded-full p-[12px] ring-4 ring-transparent hover:ring-[#5C039B] transition-all">
                <div
                  className="w-[200px] h-[200px] rounded-full bg-cover bg-center shadow-lg hover:scale-105 transition-all"
                  style={{ backgroundImage: `url(${item.image})` }}
                >
                  <div className="bg-black/50 w-full h-full rounded-full flex flex-col items-center justify-center px-4 text-center text-white">
                    <span className="text-sm font-semibold">{t(item.title)}</span>
                    <span className="text-[11px] mt-2 opacity-90">{t(item.text)}</span>
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
