import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Picture from "../../assets/img/photo-1477959858617-67f85cf4f1df.png";
import wave2 from "../../assets/img/wave/wave2.png";

import BlogImg2 from "../../assets/img/data_Looks_3.jpg";
import BlogImg3 from "../../assets/img/4-min-800x450.jpg";
import Blogimg4 from "../../assets/img/Bedroom-ideas-3.jpg";
import Blogimg5 from "../../assets/img/mbr-34-1758275303-UtAr4.avif";
import Blogimg6 from "../../assets/img/pexels-fotoaibe-1571460.jpg";
import Blogimg7 from "../../assets/img/4-min-800x450.jpg";
import Blogimg8 from "../../assets/img/cozy-modern-living-room-interior-600nw-2449524995.webp";
import Blogimg9 from "../../assets/img/beige_living_room.webp";
import { FiSearch } from "react-icons/fi";

import i1 from "../../assets/icons/Homeicons/xx1.png";
import i2 from "../../assets/icons/Homeicons/xx2.png";
import i3 from "../../assets/icons/Homeicons/xx3.png";
import i4 from "../../assets/icons/Homeicons/xx4.png";

const Page3 = () => {
  const { t } = useTranslation("page3");

  const blogPosts = [
    { id: 1, date: t("blogs.1.date"), title: t("blogs.1.title"), link: "#", image: BlogImg2 },
    { id: 2, date: t("blogs.2.date"), title: t("blogs.2.title"), link: "#", image: BlogImg3 },
    { id: 3, date: t("blogs.3.date"), title: t("blogs.3.title"), link: "#", image: Blogimg4 },
    { id: 4, date: t("blogs.4.date"), title: t("blogs.4.title"), link: "#", image: Blogimg5 },
    { id: 5, date: t("blogs.5.date"), title: t("blogs.5.title"), link: "#", image: Blogimg6 },
    { id: 6, date: t("blogs.6.date"), title: t("blogs.6.title"), link: "#", image: Blogimg7 },
    { id: 7, date: t("blogs.7.date"), title: t("blogs.7.title"), link: "#", image: Blogimg8 },
    { id: 8, date: t("blogs.8.date"), title: t("blogs.8.title"), link: "#", image: Blogimg9 },
  ];

  const categories = [
    { id: 1, title: t("categories.1"), iconPath: i4 },
    { id: 2, title: t("categories.2"), iconPath: i3 },
    { id: 3, title: t("categories.3"), iconPath: i2 },
    { id: 4, title: t("categories.4"), iconPath: i1 },
  ];

  const CategoryIcon = ({ iconPath }) => (
    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#5C039B] flex items-center justify-center shadow-lg mx-auto mb-4 p-3 ring-4 ring-purple-100">
      <img src={iconPath} alt="" className="w-8 h-8 md:w-10 md:h-10 object-contain" />
    </div>
  );

  return (
    <div className="w-full overflow-x-hidden">

      {/* HERO SECTION */}
      <section
        className="relative w-full bg-cover bg-center min-h-[500px] sm:min-h-[450px] md:min-h-[550px] flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${Picture})` }}
      >
        <div className="absolute bottom-0 left-0 w-40 sm:w-56 md:w-72 h-12 bg-[var(--color-body)] z-[5] clip-left-shape"></div>
        <div className="absolute bottom-0 right-0 w-40 sm:w-56 md:w-72 h-12 bg-[var(--color-body)] z-[5] clip-right-shape"></div>

        <style>{`
          .clip-left-shape { clip-path: polygon(0 0, 55% 0, 100% 100%, 0% 100%); }
          .clip-right-shape { clip-path: polygon(47% 0, 100% 0, 100% 100%, 0% 100%); }
        `}</style>

        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 text-center px-6 max-w-5xl w-full">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-snug break-words">
            {t("hero.title")}
          </h1>

          <p className="mt-6 text-sm max-w-2xl mx-auto w-full sm:text-lg md:text-xl text-gray-200 leading-relaxed">
            {t("hero.subtitle")}
          </p>

          <div className="mt-8 flex justify-center">
           
               <div
      className="
        flex flex-row items-center
        justify-center
        gap-3 sm:gap-4
        w-full max-w-full
      "
    >
      {/* PRIMARY BUTTON */}
      <button
        className="
          flex-1 sm:flex-none
          px-3 sm:px-8
          py-2.5 sm:py-3
          bg-[var(--color-primary)]
          text-white
          rounded-lg
          shadow-md
          transition-all duration-300
          whitespace-nowrap
        "
      >
              {t("hero.buttons.categories")}
      </button>

      {/* OUTLINE BUTTON */}
      <button
        className="
          flex-1 sm:flex-none
          px-3 sm:px-8
          py-2.5 sm:py-3
          border-1 border-white/70
          text-white
          rounded-lg
          transition-all duration-300
          hover:bg-[var(--color-primary)]
          hover:border-[#5C039B]
          hover:shadow-lg
          whitespace-nowrap
        "
      >
              {t("hero.buttons.ai")}
      </button>
    </div>
          </div>





          
        </div>
      </section>

      {/* BLOG LIST */}
      <section className="relative py-16 px-4 md:px-8 bg-[var(--color-body)]">
        <div className="max-w-7xl mx-auto relative z-10 w-full">

          <h2 className="text-3xl md:text-5xl text-center text-black font-semibold mb-12 break-words">
            {t("blogs.title")}
          </h2>

          {/* Search */}
         {/* Search */}
<div className="flex justify-center mb-10">
  <div className="relative w-full max-w-6xl">
    <input
      type="text"
      placeholder={t("search.placeholder")}
      className="
        w-full
        pl-6 pr-12 py-3
        border border-gray-300
        rounded-md
        focus:ring-2 focus:ring-purple-500
        shadow-md
      "
    />

              <button
      className="
        absolute right-2 top-1/2 -translate-y-1/2
        bg-[#5C039B]
        w-10 h-10
        flex items-center justify-center
        rounded-md
        text-white
      "
    >
      <FiSearch className="text-lg" />
    </button>
  </div>
</div>


          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl mx-auto">
            {blogPosts.map((post) => (
              <div key={post.id} className="flex gap-5 p-4 bg-white rounded-xl shadow hover:shadow-lg transition w-full">
                <img src={post.image} alt={post.title} className="w-32 h-28 sm:w-40 sm:h-32 rounded-lg object-cover flex-shrink-0" />

                <div className="flex flex-col justify-between w-full">
                  <p className="text-[#5C039B] text-lg font-medium">{post.date}</p>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 break-words">
                    {post.title}
                  </h3>
                  <Link to="/Ai" className="text-[#5C039B] mt-2 text-lg font-semibold hover:text-purple-800">
                    {t("blogs.readMore")}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <button className="bg-[#5C039B] hover:bg-purple-800 text-white px-10 py-3 rounded-md text-lg font-semibold shadow-md transition">
              {t("blogs.loadMore")}
            </button>
          </div>

        </div>
      </section>

      {/* CATEGORY SECTION */}
      <section className="relative py-20 px-4 md:px-8 bg-[var(--color-body)]  overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full sm:-bottom-40 md:-bottom-72 lg:-bottom-130 overflow-hidden">
          <img src={wave2} alt="" className="w-full pointer-events-none opacity-90" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10 w-full">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl max-w-3xl mx-auto font-semibold text-black leading-snug break-words">
              {t("categories.title")}
            </h2>

            <p className="text-[#547593] text-sm sm:text-lg md:text-2xl mt-8 max-w-3xl mx-auto break-words">
              {t("categories.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16 w-full">
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-white p-6 rounded-xl border border-gray-200 shadow-md hover:shadow-xl hover:scale-105 transition cursor-pointer text-center w-full"
              >
                <CategoryIcon iconPath={category.iconPath} />
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 mt-2 break-words">
                  {category.title}
                </h3>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};

export default Page3;
