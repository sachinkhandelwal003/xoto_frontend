"use client";
import React, { useRef } from "react";
import Slider from "react-slick";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const DreamSpacesSection = () => {
  const sliderRef = useRef(null);

  const projects = [
    {
      id: 1,
      title: "Seamless Indoor–Outdoor Lounge & Pool",
      location: "California, Seaside",
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 2,
      title: "Modern Minimalist Villa",
      location: "Dubai, Palm Jumeirah",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 3,
      title: "Luxury Coastal Retreat",
      location: "Malibu, USA",
      image:
        "https://images.unsplash.com/photo-1598300184018-1e0f01398952?auto=format&fit=crop&w=1200&q=80",
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false, // custom buttons instead
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="grid md:grid-cols-2 gap-10 mb-10 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 leading-tight">
              Explore our curated <br /> dream spaces
            </h2>
          </div>
          <div>
            <p className="text-lg text-blue-700 leading-relaxed">
              Our portfolio showcases our passion for crafting extraordinary
              spaces that redefine sustainable living. As a trusted prop-tech in
              UAE, we bring each client’s unique vision to life, transforming
              spaces into timeless expressions of elegance.
            </p>
          </div>
        </div>

        {/* Slider */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg">
          <Slider ref={sliderRef} {...settings}>
            {projects.map((project) => (
              <div key={project.id} className="relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-[420px] object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent text-white rounded-b-2xl">
                  <h3 className="text-2xl font-semibold mb-1">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-200 flex items-center gap-1">
                    <span>📍</span> {project.location}
                  </p>
                </div>
              </div>
            ))}
          </Slider>

          {/* Custom Arrows Below */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={() => sliderRef.current.slickPrev()}
              className="bg-white shadow-md text-gray-800 w-10 h-10 rounded-md flex items-center justify-center hover:bg-gray-100 transition"
            >
              <FaArrowLeft size={16} />
            </button>
            <button
              onClick={() => sliderRef.current.slickNext()}
              className="bg-purple-700 shadow-md text-white w-10 h-10 rounded-md flex items-center justify-center hover:bg-purple-800 transition"
            >
              <FaArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DreamSpacesSection;
