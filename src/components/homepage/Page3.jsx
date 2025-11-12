import React from 'react'
  
import Picture from "../../assets/img/photo-1477959858617-67f85cf4f1df.jpeg"

import BlogImg2 from'../../assets/img/data_Looks_3.jpg'
import BlogImg3 from'../../assets/img/4-min-800x450.jpg'
import Blogimg4 from'../../assets/img/Bedroom-ideas-3.jpg'
import Blogimg5 from'../../assets/img/mbr-34-1758275303-UtAr4.avif'
import Blogimg6 from'../../assets/img/pexels-fotoaibe-1571460.jpg'

import Blogimg7 from'../../assets/img/4-min-800x450.jpg'
import Blogimg8 from'../../assets/img/cozy-modern-living-room-interior-600nw-2449524995.webp'

import Blogimg9 from'../../assets/img/beige_living_room.webp'
// import Icon1 from '....//assets/download.jpeg'

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
    iconPath: 'M4 21v-8l8-4 8 4v8M4 13l8-4 8 4'
  },
  {
    id: 2,
    title: 'AI & PropTech',
    iconPath: 'M3 21V9l9-6 9 6v12M9 21v-6h6v6M9 9h6v3H9z' 
  },
  {
    id: 3,
    title: 'Home Financing Simplified',
    iconPath: 'M3 12l9-9 9 9M4.5 10.5v9h15v-9M9 21h6M12 13v4m-2-2h4'
  },
  {
    id: 4,
    title: 'Sustainable Living in UAE',
    iconPath: 'M12 2C8 2 4 6 4 10c0 6 8 12 8 12s8-6 8-12c0-4-4-8-8-8zm0 6a2 2 0 110 4 2 2 0 010-4z'
  },
];


const CategoryIcon = ({ iconPath }) => (
  <div className="w-16 h-16 rounded-full bg-purple-700 flex items-center justify-center shadow-lg mx-auto mb-4 p-2 ring-4 ring-purple-100">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
   
      <path strokeLinecap="round" strokeLineLinejoin="round" strokeWidth={2} d={iconPath} />
    </svg>
  </div>
);

const Page3 = () => {
  return (
    <div>
      <section
      
        className="relative bg-cover bg-center h-[450px] md:h-[550px] flex items-center justify-center text-white"
        style={{ 
            backgroundImage: `url(${Picture})`, 
          
            backgroundPosition: 'center bottom' 
        }}
      >
      
        <div className="absolute inset-0 bg-indigo-900/40"></div>
       
        <div className="absolute inset-0 bg-[#4e3a89]/70"></div> 

 
        <div className="relative z-10 text-center max-w-4xl px-4">
          
        
          <h1 className="text-3xl md:text-4xl font-light mb-5 leading-normal">
            Explore the Future of Living — Smarter, 
            <br className="hidden sm:inline" />Greener, and AI-Driven.
          </h1>
          
          <p className="text-sm md:text-base font-normal mb-8 text-gray-200 px-4 md:px-0">
            Your hub for insights on PropTech, sustainable strategy, and
            <br className="hidden sm:inline" /> intelligent design & construction.
          </p>

          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
         
            <button className="bg-[#7B1FA2] hover:bg-[#6A1B9A] px-8 py-3 rounded-md font-semibold text-sm transition tracking-wider w-full sm:w-auto">
              Browse Categories
            </button>
            
          
            <a href="#watch-video" className="text-white text-sm font-semibold hover:opacity-80 transition py-3">
              Watch Video
            </a>
          </div>
        </div>
      </section>

      
  <section className="relative py-16 px-4 md:px-8 bg-gray-50 overflow-hidden">
      
   
      <div 
        className="absolute top-1/4 -left-20 w-48 h-48 bg-gradient-to-br from-purple-200 to-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob" 
        style={{ transform: 'rotate(-45deg)' }}
      ></div>
      <div 
        className="absolute bottom-1/4 -right-20 w-48 h-48 bg-gradient-to-tl from-green-200 to-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-2000"
        style={{ transform: 'rotate(45deg)' }}
      ></div>
     
      <div className="absolute top-20 left-0 w-32 h-64 bg-gradient-to-r from-blue-100 to-transparent opacity-50 transform -skew-y-12 rotate-45 -translate-x-1/2"></div>
      <div className="absolute bottom-20 right-0 w-32 h-64 bg-gradient-to-l from-green-100 to-transparent opacity-50 transform skew-y-12 -rotate-45 translate-x-1/2"></div>


      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          Latest Blogs & Articles
        </h2>

        {/* Search Bar */}
        <div className="flex justify-center mb-12">
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              placeholder="SEARCH ARTICLES"
              className="w-full pl-6 pr-12 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400 text-gray-700 bg-white shadow-sm"
            />
            <button className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 hover:text-purple-600">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <p className="text-sm text-gray-500 mb-2">{post.date}</p>
                <h3 className="text-lg font-semibold text-gray-800 mb-3 leading-tight">
                  {post.title}
                </h3>
                <a href={post.link} className="text-purple-600 hover:text-purple-800 text-sm font-medium transition-colors duration-200">
                  Read Story
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="relative py-20 px-4 md:px-8 bg-white overflow-hidden">
      
      {/* Background Wavy/Organic Element (Light Green/Purple) */}
      {/* This element attempts to replicate the gentle, flowing lines on the right and bottom */}
      <div className="absolute inset-0 z-0 opacity-40">
        <svg 
            className="absolute bottom-0 left-0 w-full h-auto" 
            viewBox="0 0 1440 320" 
            xmlns="http://www.w3.org/2000/svg"
            style={{ 
                transform: 'translateY(15%)', 
                pointerEvents: 'none' 
            }}
        >
          {/* Light Green Wave */}
          <path 
            fill="#dcfce7" 
            fillOpacity="0.7" 
            d="M0,192L48,176C96,160,192,128,288,101.3C384,75,480,53,576,64C672,75,768,128,864,138.7C960,149,1056,117,1152,101.3C1248,85,1344,85,1392,85L1440,85L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
          {/* Light Purple Wave (or just use the green one) */}
          <path 
            fill="#f3e8ff" 
            fillOpacity="0.5" 
            d="M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,176C672,181,768,139,864,128C960,117,1056,139,1152,149.3C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header Text */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 leading-snug">
            Explore Insights That Redefine <br />Modern Living
          </h2>
          <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
            From smart landscaping to sustainable design — dive into expert guides, 
            trends, and innovations shaping the future of homes in the UAE.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div 
              key={category.id} 
              className="bg-white p-6 rounded-xl border border-gray-100 shadow-md 
                         text-center cursor-pointer transform hover:scale-[1.03] 
                         transition-all duration-300 hover:shadow-lg"
              // The subtle white border/glow around the card is achieved with the subtle shadow and border-gray-100
            >
              <CategoryIcon iconPath={category.iconPath} />
              <h3 className="text-base font-semibold text-gray-800 mt-2">
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