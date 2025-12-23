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
    style: `
      top-[8%] left-[50%] -translate-x-1/2
      sm:top-[10%] sm:left-[60%]
      md:top-[12%] md:left-[65%]
      lg:top-[10%] lg:left-[75%]
    `,
  },
  {
    key: "interior",
    icon: interior,
    link: "/interior",
    style: `
      top-[30%] right-[10%]
      sm:top-[32%] sm:right-[8%]
      md:top-[34%] md:right-[6%]
      lg:top-[33%] lg:right-[3%]
    `,
  },
  {
    key: "furniture",
    icon: smart,
    link: "/furniture",
    style: `
      bottom-[35%] right-[12%]
      sm:bottom-[33%] sm:right-[10%]
      md:bottom-[32%] md:right-[7%]
      lg:bottom-[31%] lg:right-[5%]
    `,
  },
  {
    key: "landscaping",
    icon: landscaping,
    link: "/landscaping",
    style: `
      bottom-[0%] left-[50%] -translate-x-1/2
      sm:bottom-[2%] sm:left-[60%]
      md:bottom-[3%] md:left-[65%]
      lg:bottom-[-1%] lg:left-[70%]
    `,
  },
  {
    key: "image",
    icon: image,
    link: "/image-perfection",
    style: `
      bottom-[20%] left-[20%]
      sm:bottom-[22%] sm:left-[24%]
      md:bottom-[23%] md:left-[26%]
      lg:bottom-[24%] lg:left-[29%]
    `,
  },
  {
    key: "virtual",
    icon: virtual,
    link: "/landscaping",
    style: `
      top-[38%] left-[20%]
      sm:top-[36%] sm:left-[25%]
      md:top-[35%] md:left-[28%]
      lg:top-[35%] lg:left-[32%]
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
  src="https://xoto.ae/api/uploads/1766498155933.jpg
"
  alt={t("homeDesign.title2")}
  className="
    h-[300px] sm:h-[400px] lg:h-[500px]
    object-contain
    drop-shadow-2xl
    mx-auto
    lg:translate-x-[170px]
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
