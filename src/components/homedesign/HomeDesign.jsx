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
    link: "/",
    style: `
      top-[20%] left-[50%] -translate-x-1/2
      sm:top-[10%] sm:left-[60%]
      md:top-[1%] md:left-[55%]
      lg:top-[12%] lg:left-[75%]
    `,
  },
  {
    key: "interior",
    icon: interior,
    link: "/services/interior",
    style: `
      top-[35%] right-[5%]
      sm:top-[32%] sm:right-[8%]
      md:top-[27%] md:right-[14%]
      lg:top-[33%] lg:right-[0%]
    `,
  },
  {
    key: "furniture",
    icon: smart,
    link: "/",
    style: `
      bottom-[35%] right-[8%]
      sm:bottom-[33%] sm:right-[10%]
      md:bottom-[27%] md:right-[18%]
      lg:bottom-[33%] lg:right-[1%]
    `,
  },
  {
    key: "landscaping",
    icon: landscaping,
    link: "/landscaping",
    style: `
      bottom-[11%] left-[50%] -translate-x-1/2
      sm:bottom-[2%] sm:left-[60%]
      md:bottom-[-6%] md:left-[55%]
      lg:bottom-[5%] lg:left-[65%]
    `,
  },
  {
    key: "image",
    icon: image,
    link: "/",
    style: `
      bottom-[33%] left-[7%]
      sm:bottom-[22%] sm:left-[24%]
      md:bottom-[23%] md:left-[15%]
      lg:bottom-[30%] lg:left-[24%]
    `,
  },
  {
    key: "virtual",
    icon: virtual,
    link: "/",
    style: `
      top-[38%] left-[5%]
      sm:top-[36%] sm:left-[25%]
      md:top-[30%] md:left-[16%]
      lg:top-[37%] lg:left-[34%]
    `,
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
          <div className="space-y-8 flex flex-col items-center lg:items-start text-center  lg:text-left px-20">
            <h2 className="heading-light text-black ">
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
          <div className="relative flex  lg:justify-center md:justify-center sm:justify-center px-10 mt-10">
            <div>
          <img
  src={houseimage}
  alt={t("homeDesign.title2")}
  className="
    h-[300px] sm:h-[400px] lg:h-[500px]
    object-contain
    drop-shadow-2xl
    mx-auto
    lg:translate-x-[110px]
  "
/>


{/* Hotspots */}
{hotspots.map((spot) => (
  <button
    key={spot.key}
    onClick={() => navigate(spot.link)}
    className={`
      absolute ${spot.style}
      flex items-center gap-1 sm:gap-2
      bg-white
      px-2 sm:px-3 md:px-4
      py-1 sm:py-1.5 md:py-2
      rounded-md sm:rounded-lg
      shadow-md sm:shadow-lg md:shadow-xl
      hover:bg-[#5C039B] hover:text-white
      transition-all duration-200
      whitespace-nowrap
      text-[10px] sm:text-xs md:text-sm lg:text-sm
      scale-90 sm:scale-95 md:scale-100
    `}
  >
    {/* Icon */}
    <span
      className="
        bg-green-500
        p-1 sm:p-1.5 md:p-2
        rounded-full
        flex items-center justify-center
      "
    >
      <img
        src={spot.icon}
        alt={t(`homeDesign.hotspots.${spot.key}`)}
        className="w-3 h-3 sm:w-4 sm:h-4"
      />
    </span>

    {/* Text (always visible) */}
    <span className="font-semibold leading-tight">
      {t(`homeDesign.hotspots.${spot.key}`)}
    </span>
  </button>
))}


            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeDesign;
