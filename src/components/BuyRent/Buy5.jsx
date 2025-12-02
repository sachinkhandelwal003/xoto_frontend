import React, { useState } from "react";
import {
  Heart,
  Bed,
  Bath,
  Square,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import waveint4 from "../../assets/img/wave/waveint.png";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const OurProperty = () => {
  const properties = [
    {
      id: 1,
      type: "Sell",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      name: "Sobha Solis",
      price: "$150,000",
      location: "Motor City, Dubai",
      bedrooms: 1,
      bathrooms: 1,
      area: "546.38 Sq.ft.",
    },
    {
      id: 2,
      type: "Rent",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      name: "City Apartment",
      price: "$180,000",
      location: "Texas",
      bedrooms: 2,
      bathrooms: 1,
      area: "85m²",
    },
    {
      id: 3,
      type: "Sell",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      name: "Luxury Apartment",
      price: "$220,000",
      location: "New York",
      bedrooms: 3,
      bathrooms: 2,
      area: "110m²",
    },
  ];

  const [selectedProperty, setSelectedProperty] = useState(null);

  const openPrevProperty = (currentId) => {
    const index = properties.findIndex((p) => p.id === currentId);
    const prev = index === 0 ? properties.length - 1 : index - 1;
    setSelectedProperty(properties[prev]);
  };

  const openNextProperty = (currentId) => {
    const index = properties.findIndex((p) => p.id === currentId);
    const next = index === properties.length - 1 ? 0 : index + 1;
    setSelectedProperty(properties[next]);
  };

  /* -----------------------------
      PROPERTY CARD (unchanged UI)
  ------------------------------ */
  const PropertyCard = ({ property }) => (
    <div className="relative z-30 bg-white rounded-[28px] shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">

      {/* IMAGE */}
      <div className="w-full h-[240px] rounded-t-[28px] overflow-hidden">
        <img
          src={property.image}
          alt={property.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="p-6 bg-gradient-to-b from-white to-[#f2edff]">

        <h3 className="text-[22px] font-semibold text-[#1a1a1a]">
          {property.name}
        </h3>

        <p className="text-gray-600 text-[14px] mt-1">
          {property.location}
        </p>

        {/* ICON INFO */}
        <div className="flex items-center gap-6 text-gray-700 text-[14px] mt-5">
          <span className="flex items-center gap-1">
            <Square className="w-4 h-4" /> {property.area}
          </span>

          <span className="flex items-center gap-1">
            <Bed className="w-4 h-4" /> {property.bedrooms} Beds
          </span>

          <span className="flex items-center gap-1">
            <Bath className="w-4 h-4" /> {property.bathrooms} Baths
          </span>
        </div>

        {/* BUTTON (unchanged design) */}
        <button
          onClick={() => setSelectedProperty(property)}
          className="
            w-full mt-7 py-3 
            rounded-full 
            bg-[#6A00C1] 
            text-white 
            font-medium 
            transition-all duration-300
            hover:bg-white hover:text-[#5C039B]
            hover:-translate-y-1
            hover:shadow-lg
          "
        >
          Schedule Visit
        </button>
      </div>
    </div>
  );

  return (
    <>
      <section className="relative pt-20 pb-40 bg-white overflow-hidden">

        {/* WAVE FIX — always bottom */}
        <img
          src={waveint4}
          alt="wave"
          className="absolute -bottom-[350px] left-0 w-full z-0 pointer-events-none select-none"
        />

        <div className="relative z-20 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

          {/* TITLE */}
          <h2 className="text-center text-4xl md:text-5xl font-bold text-gray-900 mb-16">
            Explore Property
          </h2>

          {/* MOBILE SWIPER */}
          <div className="block md:hidden">
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              loop
              autoplay={{ delay: 3500 }}
              navigation={{
                nextEl: ".mobile-next",
                prevEl: ".mobile-prev",
              }}
            >
              {properties.map((property) => (
                <SwiperSlide key={property.id}>
                  <PropertyCard property={property} />
                </SwiperSlide>
              ))}

              {/* NAV BUTTONS */}
              <button className="mobile-prev absolute left-3 top-1/2 -translate-y-1/2 z-40 bg-white text-[#6A00C1] w-11 h-11 rounded-full shadow-lg flex items-center justify-center">
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button className="mobile-next absolute right-3 top-1/2 -translate-y-1/2 z-40 bg-white text-[#6A00C1] w-11 h-11 rounded-full shadow-lg flex items-center justify-center">
                <ChevronRight className="w-6 h-6" />
              </button>
            </Swiper>
          </div>

          {/* DESKTOP GRID (perfect spacing) */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-10">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>

          {/* VIEW MORE BUTTON */}
          <div className="flex justify-center mt-16">
            <button className="bg-[#6A00C1] text-white px-10 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl">
              View More
            </button>
          </div>
        </div>
      </section>

      {/* MODAL — FIXED OVERFLOW ON MOBILE */}
      {selectedProperty && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl max-w-md w-full p-6 relative">

            {/* CLOSE */}
            <button
              onClick={() => setSelectedProperty(null)}
              className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200"
            >
              <X className="w-5 h-5" />
            </button>

            {/* IMAGE */}
            <img
              src={selectedProperty.image}
              alt={selectedProperty.name}
              className="w-full h-48 object-cover rounded-2xl mb-4"
            />

            {/* INFO */}
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              {selectedProperty.name}
            </h3>
            <p className="text-2xl font-bold text-[#6A00C1] mb-2">
              {selectedProperty.price}
            </p>
            <p className="text-sm text-gray-600 mb-3">
              {selectedProperty.location}
            </p>

            <div className="flex gap-4 text-sm text-gray-600 mb-6">
              <span className="flex items-center gap-1">
                <Bed className="w-4 h-4 text-[#6A00C1]" />
                {selectedProperty.bedrooms} Bed
              </span>
              <span className="flex items-center gap-1">
                <Bath className="w-4 h-4 text-[#6A00C1]" />
                {selectedProperty.bathrooms} Bath
              </span>
              <span className="flex items-center gap-1">
                <Square className="w-4 h-4 text-[#6A00C1]" />
                {selectedProperty.area}
              </span>
            </div>

            {/* MODAL CONTROLS */}
            <div className="flex gap-3">
              <button
                onClick={() => openPrevProperty(selectedProperty.id)}
                className="flex-1 bg-purple-100 text-purple-700 py-3 rounded-xl hover:bg-purple-200"
              >
                Previous
              </button>

              <button
                onClick={() => openNextProperty(selectedProperty.id)}
                className="flex-1 bg-[#6A00C1] text-white py-3 rounded-xl hover:bg-[#5A00A6]"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OurProperty;
