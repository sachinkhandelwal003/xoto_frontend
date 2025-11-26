import React, { useState } from "react";
import { Heart, Bed, Bath, Square, ChevronLeft, ChevronRight, X } from "lucide-react";
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
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      name: "Modern Apartment",
      price: "$150,000",
      location: "California",
      bedrooms: 2,
      bathrooms: 1,
      area: "85m²",
    },
    {
      id: 2,
      type: "Rent",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      name: "City Apartment",
      price: "$180,000",
      location: "Texas",
      bedrooms: 3,
      bathrooms: 2,
      area: "110m²",
    },
    {
      id: 3,
      type: "Sell",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      name: "Luxury Apartment",
      price: "$220,000",
      location: "New York",
      bedrooms: 4,
      bathrooms: 3,
      area: "140m²",
    },
  ];

  const [selectedProperty, setSelectedProperty] = useState(null);

  // Fixed: No TypeScript
  const openPrevProperty = (currentId) => {
    const currentIndex = properties.findIndex(p => p.id === currentId);
    const prevIndex = currentIndex === 0 ? properties.length - 1 : currentIndex - 1;
    setSelectedProperty(properties[prevIndex]);
  };

  const openNextProperty = (currentId) => {
    const currentIndex = properties.findIndex(p => p.id === currentId);
    const nextIndex = currentIndex === properties.length - 1 ? 0 : currentIndex + 1;
    setSelectedProperty(properties[nextIndex]);
  };

  const PropertyCard = ({ property, showPrev }) => (
    <div className="  relative z-10 bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
      <div className="relative">
        <img src={property.image} alt={property.name} className="w-full h-56 sm:h-64 object-cover" />
        <span
          className={`absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full text-white ${
            property.type === "Sell" ? "bg-[#5C039B]" : "bg-teal-500"
          }`}
        >
          {property.type}
        </span>
        <button className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition">
          <Heart className="w-5 h-5 text-[#5C039B]" />
        </button>
      </div>

      <div className="p-5 sm:p-6 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{property.name}</h3>
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-gray-900">{property.price}</span>
          <span className="text-sm text-[#5C039B]  px-3 py-1 rounded-full">
            {property.location}
          </span>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
          <span className="flex items-center gap-1">
            <Bed className="w-4 h-4 text-purple-600" />
            {property.bedrooms} Bedrooms
          </span>
          <span className="flex items-center gap-1">
            <Bath className="w-4 h-4 text-purple-600" />
            {property.bathrooms} Bathroom
          </span>
          <span className="flex items-center gap-1">
            <Square className="w-4 h-4 text-purple-600" />
            {property.area}
          </span>
        </div>

        <button
          onClick={() => showPrev ? openPrevProperty(property.id) : openNextProperty(property.id)}
          className=" mt-auto w-full bg-[#5C039B] text-white font-medium py-3 rounded-xl transition-all duration-300"
        >
          Show Details
        </button>
      </div>
    </div>
  );

  return (
    <>
      <section className=" relative z-20  py-16 md:py-20 lg:py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-12">
            Explore Property
          </h2>

          {/* Mobile Slider */}
          <div className="block md:hidden">
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              loop={true}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              className="relative"
            >
              {properties.map((property) => (
                <SwiperSlide key={property.id}>
                  <PropertyCard property={property} showPrev={true} />
                </SwiperSlide>
              ))}

              <button className="swiper-button-prev !text-[#5C039B] !w-10 !h-10 !mt-0 !top-1/2 !-left-4 bg-white rounded-full shadow-lg flex items-center justify-center">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button className="swiper-button-next !text-[#5C039B] !w-10 !h-10 !mt-0 !top-1/2 !-right-4 bg-white rounded-full shadow-lg flex items-center justify-center">
                <ChevronRight className="w-6 h-6" />
              </button>
            </Swiper>
          </div>
 {/* BOTTOM WAVE BACKGROUND IMAGE */}
                    <div className="absolute  left-0 w-full z-0 pointer-events-none select-none">
                      <img
                        src={waveint4}
                        alt=""
                        className="w-full object-cover"
                      />
                    </div>
          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} showPrev={true} />
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <button
              onClick={() => openNextProperty(properties[properties.length - 1].id)}
              className="relative z-10 bg-[#5C039B] text-white font-medium px-8 w-xs py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              View More
            </button>
          </div>
        </div>

        {/* Wave */}
        
      </section>

      {/* Modal */}
      {selectedProperty && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setSelectedProperty(null)}
              className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <img
              src={selectedProperty.image}
              alt={selectedProperty.name}
              className="w-full h-48 object-cover rounded-2xl mb-4"
            />

            <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedProperty.name}</h3>
            <p className="text-2xl font-bold text-[#5C039B] mb-3">{selectedProperty.price}</p>
            <p className="text-sm text-gray-600 mb-4">{selectedProperty.location}</p>

            <div className="flex gap-3 text-sm text-gray-600 mb-6">
              <span className="flex items-center gap-1">
                <Bed className="w-4 h-4 text-[#5C039B]" />
                {selectedProperty.bedrooms} Bed
              </span>
              <span className="flex items-center gap-1">
                <Bath className="w-4 h-4 text-[#5C039B]" />
                {selectedProperty.bathrooms} Bath
              </span>
              <span className="flex items-center gap-1">
                <Square className="w-4 h-4 text-[#5C039B]" />
                {selectedProperty.area}
              </span>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => openPrevProperty(selectedProperty.id)}
                className="flex-1 bg-purple-100 text-purple-700 font-medium py-3 rounded-xl hover:bg-purple-200 transition"
              >
                Previous
              </button>
              <button
                onClick={() => openNextProperty(selectedProperty.id)}
                className="flex-1 bg-[#5C039B] text-white font-medium py-3 rounded-xl hover:bg-[#5C039B] transition"
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

export default OurProperty;