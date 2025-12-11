import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import houseimage from "../../assets/img/home/houseimage1.png";
import wave1 from "../../assets/img/wave/wave1.png";
import interior from "../../assets/img/icons123/interior.png";
import exterior from "../../assets/img/icons123/extterior.png";
import landscaping from "../../assets/img/icons123/landscaping.png";
import virtual from "../../assets/img/icons123/virtual.png";
import image from "../../assets/img/icons123/image.png";
import smart from "../../assets/img/icons123/smart.png";

const HomeDesign = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("home1"); // ✅ FIXED

  const hotspots = [
    {
      key: "exterior",
      icon: exterior,
      link: "/exterior",
      style: "top-[4%] left-[75%] -translate-x-1/2",
    },
    {
      key: "interior",
      icon: interior,
      link: "/interior",
      style: "top-[33%] right-[3%]",
    },
    {
      key: "furniture",
      icon: smart,
      link: "/furniture",
      style: "bottom-[31%] right-[5%]",
    },
    {
      key: "landscaping",
      icon: landscaping,
      link: "/landscaping",
      style: "bottom-[-7%] left-[60%] -translate-x-1/2",
    },
    {
      key: "image",
      icon: image,
      link: "/image-perfection",
      style: "bottom-[24%] left-[29%]",
    },
    {
      key: "virtual",
      icon: virtual,
      link: "/landscaping",
      style: "top-[35%] left-[32%]",
    },
  ];

  return (
    <section className="relative bg-[var(--color-body)] overflow-hidden pb-10 sm:pt-24 sm:pb-12 lg:pt-32 lg:pb-20">
      <div className="relative w-full">
        {/* Wave */}
        <div className="absolute bottom-[-180px] left-0 w-full z-0">
          <img src={wave1} alt="" className="w-full scale-[1.3]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 items-center relative z-10">
          {/* LEFT */}
          <div className="space-y-8 flex flex-col items-center lg:items-start text-center lg:text-left px-20">
            <h2 className="heading-light text-black">
              {t("homeDesign.title1")} <br />
              <span>{t("homeDesign.title2")}</span>
            </h2>

            <p className="paragraph-light-1 text-gray-600">
              {t("homeDesign.description")}
            </p>

            <Link
              to="/schedule/estimate"
              className="bg-[var(--color-primary)] text-white px-14 py-3 rounded-lg font-semibold"
            >
              {t("homeDesign.cta")}
            </Link>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative flex justify-center lg:justify-end px-10 mt-10">
            <img
              src={houseimage}
              alt={t("homeDesign.title2")}
              className="h-[500px] object-contain drop-shadow-2xl"
              style={{ transform: "translateX(170px)" }}
            />

            {/* Hotspots */}
            {hotspots.map((spot) => (
              <button
                key={spot.key} // ✅ FIXED
                onClick={() => navigate(spot.link)}
                className={`absolute ${spot.style} flex items-center gap-2 bg-white px-3 py-1 rounded-lg shadow-xl hover:bg-[#5C039B] hover:text-white transition whitespace-nowrap`}
              >
                <span className="bg-green-500 p-2 rounded-full">
                  <img
                    src={spot.icon}
                    alt={t(`homeDesign.hotspots.${spot.key}`)}
                    className="w-4 h-4"
                  />
                </span>
                <span className="text-sm font-semibold">
                  {t(`homeDesign.hotspots.${spot.key}`)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeDesign;
