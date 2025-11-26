// HotPropertyDeals.tsx
import React, { useState } from "react";
import { Heart, Bed, Bath, Square, X } from "lucide-react";
import BgImage from "../../assets/img/buybg.jpg";


const HotPropertyDeals = () => {
  const [selectedProperty, setSelectedProperty] = useState(null);

  const properties = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80",
      price: "$2,095 /month",
      name: "Palm Harbor",
      address: "2699 Green Valley, Highland Lake, FL",
      beds: 3,
      baths: 2,
      size: "5x7 m²",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80",
      price: "$2,700 /month",
      name: "Beverly Springfield",
      address: "2821 Lake Sevilla, Palm Harbor, TX",
      beds: 4,
      baths: 2,
      size: "6x7.5 m²",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      price: "$4,550 /month",
      name: "Faulkner Ave",
      address: "909 Woodland St, Michigan, IN",
      beds: 4,
      baths: 3,
      size: "8x10 m²",
    },
  ];

  return (
    <section
      className="relative py-16 md:py-20 lg:py-24 overflow-hidden"
      style={{
        backgroundImage: `url(${BgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      
      {/* Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180.01deg, rgba(92, 3, 155, 0.8) 0.01%, rgba(3, 164, 244, 0.8) 92.06%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 text-white">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold drop-shadow-md">
            Hot Property Deals
          </h2>
          <p className="text-sm sm:text-base md:text-lg max-w-md drop-shadow">
            Discover exclusive properties with the best value in Dubai's premium locations.
          </p>
        </div>

        {/* Property Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {properties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="relative">
                <img
                  src={property.image}
                  alt={property.name}
                  className="w-full h-48 sm:h-56 object-cover"
                />
                <span className="absolute top-4 left-4 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  POPULAR
                </span>
                <button className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-white transition">
                  <Heart className="w-5 h-5 text-purple-600" />
                </button>
              </div>

              {/* Card Content */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col">
                <span className="text-2xl font-bold text-gray-900 mb-1">
                  {property.price}
                </span>
                <h3 className="text-lg font-semibold text-gray-900">{property.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{property.address}</p>

                <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                  <span className="flex items-center gap-1">
                    <Bed className="w-4 h-4 text-purple-600" />
                    {property.beds} Beds
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath className="w-4 h-4 text-purple-600" />
                    {property.baths} Bathrooms
                  </span>
                  <span className="flex items-center gap-1">
                    <Square className="w-4 h-4 text-purple-600" />
                    {property.size}
                  </span>
                </div>

                <button
                  className="mt-auto w-full bg-[#5C039B] text-white py-3 rounded-xl transition-all duration-300"
                  onClick={() => setSelectedProperty(property)}
                >
                  Show Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* MODAL */}
      {/* ------------------------------------------------------------- */}
      {selectedProperty && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[999] px-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative animate-fadeIn">

            {/* Close Button */}
            <button
              onClick={() => setSelectedProperty(null)}
              className="absolute top-4 right-4 p-2 bg-gray-200 hover:bg-gray-300 rounded-full"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>

            {/* Modal Content */}
            <img
              src={selectedProperty.image}
              alt={selectedProperty.name}
              className="rounded-xl w-full h-56 object-cover mb-4"
            />

            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              {selectedProperty.name}
            </h2>

            <p className="text-gray-600 mb-2">{selectedProperty.address}</p>

            <div className="flex items-center gap-4 text-sm text-gray-600 my-4">
              <span className="flex items-center gap-1">
                <Bed className="w-4 h-4 text-purple-600" />
                {selectedProperty.beds} Beds
              </span>
              <span className="flex items-center gap-1">
                <Bath className="w-4 h-4 text-purple-600" />
                {selectedProperty.baths} Baths
              </span>
              <span className="flex items-center gap-1">
                <Square className="w-4 h-4 text-purple-600" />
                {selectedProperty.size}
              </span>
            </div>

            <p className="text-2xl font-bold text-purple-700 mb-6">
              {selectedProperty.price}
            </p>

            <button className="w-full py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition">
              Contact Agent
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default HotPropertyDeals;
