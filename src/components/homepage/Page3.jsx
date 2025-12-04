import React from "react";

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

import i1 from "../../assets/icons/Homeicons/xx1.png";
import i2 from "../../assets/icons/Homeicons/xx2.png";
import i3 from "../../assets/icons/Homeicons/xx3.png";
import i4 from "../../assets/icons/Homeicons/xx4.png";

const blogPosts = [
  { id: 1, date: "November 04, 2024", title: "Exploring Luxury Real Estate Markets", link: "#", image: BlogImg2 },
  { id: 2, date: "July 16, 2024", title: "A Guide to Buying Real Estate in Metropolitan Areas", link: "#", image: BlogImg3 },
  { id: 3, date: "November 04, 2024", title: "Eco-Friendly Practices in Residential Real Estate", link: "#", image: Blogimg4 },
  { id: 4, date: "September 20, 2024", title: "Renovating Historic Properties in Modern Deal", link: "#", image: Blogimg5 },
  { id: 5, date: "November 04, 2024", title: "Exploring Luxury Real Estate Markets", link: "#", image: Blogimg6 },
  { id: 6, date: "July 16, 2024", title: "A Guide to Buying Real Estate in Metropolitan Areas", link: "#", image: Blogimg7 },
  { id: 7, date: "November 04, 2024", title: "Exploring Luxury Real Estate Markets", link: "#", image: Blogimg8 },
  { id: 8, date: "July 16, 2024", title: "A Guide to Buying Real Estate in Metropolitan Areas", link: "#", image: Blogimg9 },
];

const categories = [
  { id: 1, title: "Landscaping Trends & Smart Homes", iconPath: i4 },
  { id: 2, title: "AI & PropTech", iconPath: i3 },
  { id: 3, title: "Home Financing Simplified", iconPath: i2 },
  { id: 4, title: "Sustainable Living in UAE", iconPath: i1 },
];

const CategoryIcon = ({ iconPath }) => (
  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#5C039B] flex items-center justify-center shadow-lg mx-auto mb-4 p-3 ring-4 ring-purple-100">
    <img src={iconPath} alt="" className="w-8 h-8 md:w-10 md:h-10 object-contain" />
  </div>
);

const Page3 = () => {
  return (
    <div className="w-full overflow-x-hidden">

      {/* ========================= HERO SECTION ========================= */}
      <section
        className="relative w-full bg-cover bg-center min-h-[500px] sm:min-h-[450px] md:min-h-[550px] flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${Picture})` }}
      >
        {/* Clipped shapes */}
        <div className="absolute bottom-0 left-0 w-40 sm:w-56 md:w-72 h-12 bg-[var(--color-body)] z-[5] clip-left-shape"></div>
        <div className="absolute bottom-0 right-0 w-40 sm:w-56 md:w-72 h-12 bg-[var(--color-body)] z-[5] clip-right-shape"></div>

        <style>{`
          .clip-left-shape { clip-path: polygon(0 0, 55% 0, 100% 100%, 0% 100%); }
          .clip-right-shape { clip-path: polygon(47% 0, 100% 0, 100% 100%, 0% 100%); }
        `}</style>

        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 text-center px-6 max-w-3xl w-full">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-snug break-words">
            Explore the Future of Living — Smarter, Greener, and AI-Driven.
          </h1>

          <p className="mt-6 text-sm sm:text-lg md:text-xl text-gray-200 leading-relaxed">
            Your hub for insights on PropTech, sustainable strategy, and<br /> intelligent design & construction.
          </p>

          <div className="mt-10 flex justify-center gap-4 flex-wrap w-full">
            <button className="bg-[#5C039B] px-8 py-3 rounded-md font-semibold text-lg sm:text-xl transition w-full sm:w-auto">
              Browse Categories
            </button>

            <a className="border border-white px-8 py-3 rounded-md text-lg sm:text-xl hover:bg-[#5C039B] transition w-full sm:w-auto text-center">
              Ask Xobia AI
            </a>
          </div>
        </div>
      </section>

      {/* ========================= BLOG LIST SECTION ========================= */}
      <section className="relative py-16 px-4 md:px-8 bg-[var(--color-body)]">

        <div className="max-w-7xl mx-auto relative z-10 w-full">

          <h2 className="text-3xl md:text-5xl text-center text-black font-semibold mb-12 break-words">
            Latest Blogs & Articles
          </h2>

          {/* Search Bar */}
          <div className="flex justify-center mb-10">
            <div className="relative w-full max-w-xl">
              <input
                type="text"
                placeholder="SEARCH ARTICLES ..."
                className="w-full pl-6 pr-12 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 shadow-md"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#5C039B] w-10 h-10 flex items-center justify-center rounded-md text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {blogPosts.map((post) => (
              <div key={post.id} className="flex gap-5 p-4 bg-white rounded-xl shadow hover:shadow-lg transition w-full">
                <img src={post.image} alt={post.title} className="w-32 h-28 sm:w-40 sm:h-32 rounded-lg object-cover flex-shrink-0" />

                <div className="flex flex-col justify-between w-full">
                  <p className="text-[#5C039B] text-lg font-medium">{post.date}</p>

                  <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 break-words">
                    {post.title}
                  </h3>

                  <a className="text-[#5C039B] mt-2 text-lg font-semibold hover:text-purple-800">
                    Read More
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="flex justify-center mt-10">
            <button className="bg-[#5C039B] hover:bg-purple-800 text-white px-10 py-3 rounded-md text-lg font-semibold shadow-md transition">
              Load More
            </button>
          </div>

        </div>
      </section>

      {/* ========================= CATEGORY SECTION ========================= */}
      <section className="relative py-20 px-4 md:px-8 bg-gradient-to-tl from-green-200 to-purple-300 overflow-hidden">

        <div className="absolute bottom-0 left-0 w-full sm:-bottom-40 md:-bottom-72 lg:-bottom-96 overflow-hidden">
          <img src={wave2} alt="" className="w-full pointer-events-none opacity-90" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10 w-full">

          {/* Header */}
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-black leading-snug break-words">
              Explore Insights That Redefine Modern Living
            </h2>

            <p className="text-gray-700 text-sm sm:text-lg md:text-2xl mt-8 max-w-3xl mx-auto break-words">
              From smart landscaping to sustainable design — dive into expert guides, trends,
              and innovations shaping the future of homes in the UAE.
            </p>
          </div>

          {/* Category Grid */}
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
