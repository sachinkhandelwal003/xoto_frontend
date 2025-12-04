import React from 'react'
  
import Picture from "../../assets/img/photo-1477959858617-67f85cf4f1df.png"
import wave2 from "../../assets/img/wave/wave2.png";

import BlogImg2 from'../../assets/img/data_Looks_3.jpg'
import BlogImg3 from'../../assets/img/4-min-800x450.jpg'
import Blogimg4 from'../../assets/img/Bedroom-ideas-3.jpg'
import Blogimg5 from'../../assets/img/mbr-34-1758275303-UtAr4.avif'
import Blogimg6 from'../../assets/img/pexels-fotoaibe-1571460.jpg'

import Blogimg7 from'../../assets/img/4-min-800x450.jpg'
import Blogimg8 from'../../assets/img/cozy-modern-living-room-interior-600nw-2449524995.webp'

import Blogimg9 from'../../assets/img/beige_living_room.webp'
// import Icon1 from '....//assets/download.jpeg'
import i1 from "../../assets/icons/Homeicons/xx1.png"
import i2 from "../../assets/icons/Homeicons/xx2.png"
import i3 from "../../assets/icons/Homeicons/xx3.png"
import i4 from "../../assets/icons/Homeicons/xx4.png"

const blogPosts = [
  {
    id: 1,
    date: 'November 04, 2024',
    title: 'Exploring Luxury Real Estate Markets',
    link: '#',
    image: BlogImg2, 
    category: 'luxury'
  },
  {
    id: 2,
    date: 'July 16, 2024',
    title: 'A Guide to Buying Real Estate in Metropolitan Areas',
    link: '#',
    image: BlogImg3, 
    category: 'buying guide'
  },
  {
    id: 3,
    date: 'November 04, 2024',
    title: 'Eco-Friendly Practices in Residential Real Estate',
    link: '#',
    image: Blogimg4, 
    category: 'eco-friendly'
  },
  {
    id: 4,
    date: 'September 20, 2024',
    title: 'Renovating Historic Properties in Modern Deal',
    link: '#',
    image: Blogimg5, 
    category: 'renovation'
  },
  {
    id: 5,
    date: 'November 04, 2024',
    title: 'Exploring Luxury Real Estate Markets',
    link: '#',
    image: Blogimg6 , 
    category: 'luxury'
  },
  {
    id: 6,
    date: 'July 16, 2024',
    title: 'A Guide to Buying Real Estate in Metropolitan Areas',
    link: '#',
    image: Blogimg7, 
    category: 'buying guide'
  },

  {
    id: 7,
    date: 'November 04, 2024',
    title: 'Exploring Luxury Real Estate Markets',
    link: '#',
    image:  Blogimg8, 
    category: 'luxury'
  },
  {
    id: 8,
    date: 'July 16, 2024',
    title: 'A Guide to Buying Real Estate in Metropolitan Areas',
    link: '#',
    image: Blogimg9 , 
    category: 'buying guide'
  },
];

const categories = [
  {
    id: 1,
    title: 'Landscaping Trends & Smart Homes',
    iconPath: i4,
  },
  {
    id: 2,
    title: 'AI & PropTech',
    iconPath: i3, 
  },
  {
    id: 3,
    title: 'Home Financing Simplified',
    iconPath: i2,
  },
  {
    id: 4,
    title: 'Sustainable Living in UAE',
    iconPath: i1,
  },
];


const CategoryIcon = ({ iconPath }) => (
  <div className="w-16 h-16 rounded-full bg-[#5C039B] flex items-center justify-center shadow-lg mx-auto mb-4 p-2 ring-4 ring-purple-100">
     <img 
      src={iconPath} 
      alt="" 
      className="w-10 h-10 object-contain"
    />
  </div>
);

const Page3 = () => {
  return (
    <div>
     <section
  className="relative w-full bg-cover bg-center h-[710px]  flex items-center justify-center"
  style={{ backgroundImage: `url(${Picture})` }}
>
  {/* Bottom decorative shapes (same as HomeLoanHero) */}
  <div className="absolute bottom-0 left-0 w-70 h-10 bg-[var(--color-body)] z-[5] clip-left-shape"></div>
  <div className="absolute bottom-0 right-0 w-70 h-10 bg-[var(--color-body)] z-[5] clip-right-shape"></div>

  {/* Clip Path Definitions */}
  <style>{`
    .clip-left-shape {
      clip-path: polygon(0 0, 55% 0, 100% 100%, 0% 100%);
    }
    .clip-right-shape {
      clip-path: polygon(47% 0, 100% 0, 100% 100%, 0% 100%);
    }
  `}</style>

  {/* Overlay Layers (same as second hero) */}
  {/* <div className="absolute inset-0 bg-black/50"></div> */}

  {/* Content */}
  <div className="relative -mt-24 z-10 max-w-7xl text-center mx-auto px-6 text-white py-20 md:py-28">
    <h1 className="text-3xl md:text-5xl heading-light-1 drop-shadow-sm leading-snug">
      Explore the Future of Living — Smarter, <br /> Greener, and AI-Driven.
    </h1>

    <p className="mt-10 md:w-3/4 mx-auto text-sm  paragraph-light-1 md:text-2xl text-gray-200">
      Your hub for insights on PropTech, sustainable strategy, and<br/> 
      intelligent design & construction.
    </p>

    <div className="mt-18 flex justify-center gap-4 flex-wrap">
      <button className="bg-[#5C039B]  px-12 py-4  rounded-md font-semibold text-2xl transition tracking-wider">
        Browse Categories
      </button>

      <a href="#watch-video" className="text-white text-xl font-semibold hover:border-none hover:bg-[#5C039B] py-4 px-12 rounded-md transition tracking-wider border-1 ">
        Ask Xobia Ai
      </a>
    </div>
  </div>
</section>


      
  <section className="relative py-16 px-4 md:px-8 bg-[var(--color-body)]  overflow-hidden">
      
   
      <div 
        className="absolute top-1/4 -left-20 w-48 h-48 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob" 
        style={{ transform: 'rotate(-45deg)' }}
      ></div>
      <div 
        className="absolute bottom-1/4 -right-20 w-48 h-48  rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-2000"
        style={{ transform: 'rotate(45deg)' }}
      ></div>
     
      <div className="absolute top-20 left-0 w-32 h-64  opacity-50 transform -skew-y-12 rotate-45 -translate-x-1/2"></div>
      <div className="absolute bottom-20 right-0 w-32 h-64  opacity-50 transform skew-y-12 -rotate-45 translate-x-1/2"></div>


      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-6xl  text-center text-black hrading-dark-1 mb-12">
          Latest Blogs & Articles
        </h2>

        {/* Search Bar */}
        <div className="flex justify-center mb-12">
          <div className="relative w-full max-w">
            <input
              type="text"
              placeholder="SEARCH ARTICLES ..."
              className="w-full pl-6 pr-12 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400 text-gray-700 bg-white shadow-lg"
            />
            <button className="absolute inset-y-0 right-0 flex items-center justify-center 
  bg-[#5C039B] hover:bg-purple-800 text-white 
  w-12 h-10 rounded-lg mr-2 mt-1 transition">
              {/* Search Icon (e.g., from Heroicons or simple SVG) */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Blog Posts Grid */}
      {/* Blog List – 2 Column Layout Like Screenshot */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">
  {blogPosts.map((post) => (
    <div
      key={post.id}
      className="flex gap-8 p-4 hover:shadow-lg transition"
    >
      {/* Image */}
      <img
        src={post.image}
        alt={post.title}
        className="w-32 h-28 rounded-lg object-cover md:w-90 md:h-55"
      />

      {/* Content */}
      <div className="flex flex-col justify-between w-auto">
        <div>
          <p className="text-xl font-2xl text-[#5C039B] mb-1">
            {post.date}
          </p>

          <h3 className="text-base md:text-2xl font-semibold text-gray-900 leading-snug">
            {post.title}
          </h3>
        </div>

        <a
          href={post.link}
          className="text-[#5C039B] font-medium text-xl hover:text-purple-800 mt-2"
        >
          Read More
        </a>
      </div>
    </div>
  ))}
</div>

{/* Load More Button */}
<div className="flex justify-center mt-10">
  <button className="bg-[#5C039B] hover:bg-purple-800 text-white px-17 py-3 rounded-md font-semibold md:text-xl shadow-md transition">
    Load More
  </button>
</div>

      </div>
    </section>



    <section className="relative py-20 px-4 md:px-8 bg-gradient-to-tl from-green-200 to-purple-300 overflow-hidden">
      
      {/* Background Wavy/Organic Element (Light Green/Purple) */}
      {/* This element attempts to replicate the gentle, flowing lines on the right and bottom */}
     <div className="absolute bottom-[-20px] lg:bottom-[-695px] left-0 w-full z-0 overflow-hidden">
            <img
              src={wave2}
              alt=""
              className="w-full min-w-[140%] -ml-[20%] scale-[1.8] lg:scale-100 lg:min-w-full lg:ml-0 pointer-events-none select-none"
            />
          </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header Text */}
        <div className="text-center">
          <h2 className="text-3xl md:text-6xl font-bold text-black heading-dark-1 -mt-10 leading-snug">
            Explore Insights That Redefine <br />Modern Living
          </h2>
          <p className="text-gray-600 text-base md:text-2xl paragraph-light-1 mt-10 max-w-4xl mx-auto">
            From smart landscaping to sustainable design — dive into expert guides,<br/> 
            trends, and innovations shaping the future of homes in the UAE.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-19">
          {categories.map((category) => (
            <div 
              key={category.id} 
              className="bg-white p-6 rounded-xl border border-gray-100 shadow-xl 
                         text-center cursor-pointer transform hover:scale-[1.03] 
                         transition-all duration-300 hover:shadow-lg"
              // The subtle white border/glow around the card is achieved with the subtle shadow and border-gray-100
            >
              <CategoryIcon iconPath={category.iconPath} />
              <h3 className="text-base md:text-2xl font-semibold text-gray-800 mt-2">
                {category.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>

    
    </div>
  )
}

export default Page3