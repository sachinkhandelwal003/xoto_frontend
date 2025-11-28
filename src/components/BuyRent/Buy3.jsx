// HotPropertyDeals.tsx
import React, { useState } from "react";
import { Heart, Bed, Bath, Square } from "lucide-react";
import BgImage from "../../assets/img/buybg.jpg";

const HotPropertyDeals = () => {
  const [selectedProperty, setSelectedProperty] = useState(null);

  const properties = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&q=80&auto=format&fit=crop",
      price: "$2,095",
      frequency: "/month",
      name: "Palm Harbor",
      address: "2699 Green Valley, Highland Lake, FL",
      beds: 3,
      baths: 2,
      size: "5x7 m²",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80&auto=format&fit=crop",
      price: "$2,700",
      frequency: "/month",
      name: "Beverly Springfield",
      address: "2821 Lake Sevilla, Palm Harbor, TX",
      beds: 4,
      baths: 2,
      size: "6x7.5 m²",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80&auto=format&fit=crop",
      price: "$4,550",
      frequency: "/month",
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
      {/* dark gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180.01deg, rgba(92, 3, 155, 0.85) 0%, rgba(3,164,244,0.85) 92%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 text-white">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold drop-shadow-md">
            Hot Property Deals
          </h2>
          <p className="text-sm sm:text-base md:text-lg max-w-md drop-shadow mt-3 md:mt-0">
            Discover exclusive properties with the best value in Dubai's premium
            locations.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {properties.map((p) => (
            <article
              key={p.id}
              className="bg-white rounded-3xl shadow-xl  flex flex-col transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-white/40"
            >
              {/* image + badge + heart */}
              <div className="relative">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-56 sm:h-64 md:h-64 object-cover rounded-t-2xl"
                />

                {/* Popular pill */}
                <div className="absolute right-70 top-62 flex items-center space-x-3">
                  <div
                    className="relative bg-gradient-to-r from-[#03A4F4] to-[#64EF0A] text-white px-3 py-2 rounded-full text-xs font-semibold flex items-center"
                    style={{ boxShadow: "0 6px 18px rgba(100,239,10,0.18)", }}
                  >
                    {/* small sparkle (svg) */}
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2"
                    >
                      <path
                        d="M12 2L13.79 8.26L20 9.27L15 13.14L16.18 19.4L12 16.77L7.82 19.4L9 13.14L4 9.27L10.21 8.26L12 2Z"
                        fill="white"
                      />
                    </svg>
                    <span>POPULAR</span>

                 
                  </div>
                </div>

                {/* Heart circle */}
                <button className="absolute top-70 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition border border-purple-100">
                  <Heart className="w-5 h-5 text-[#5C039B]" />
                </button>
              </div>

              {/* content */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col">
                {/* Price row */}
                <div className="flex items-baseline justify-between gap-4">
                  <div>
                    <div className="text-3xl sm:text-4xl font-extrabold text-[#5C039B] leading-tight">
                      <span>{p.price}</span>{" "}
                      <span className="text-base font-medium text-gray-500">
                        {p.frequency}
                      </span>
                    </div>
                    <h3 className="mt-3 text-xl sm:text-2xl font-bold text-gray-900">
                      {p.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">{p.address}</p>
                  </div>

                  {/* heart outline big circle alternatively duplicate - kept only top-right */}
                </div>

                {/* divider */}
                <div className="border-t border-gray-100 my-4" />

                {/* icons row */}
                <div className="flex items-center gap-6 text-sm text-gray-600 mb-6">
                  <span className="flex items-center gap-2 text-green-500">
                    <Bed className="w-5 h-5" />
                    <span className="text-gray-700 font-medium">{p.beds} Beds</span>
                  </span>

                  <span className="flex items-center gap-2 text-green-500">
                    <Bath className="w-5 h-5" />
                    <span className="text-gray-700 font-medium">{p.baths} Bathrooms</span>
                  </span>

                  <span className="flex items-center gap-2 text-green-500">
                    <Square className="w-5 h-5" />
                    <span className="text-gray-700 font-medium">{p.size}</span>
                  </span>
                </div>

                {/* CTA */}
                <button
                  className="mt-auto w-full bg-[#5C039B] text-white py-3 rounded-xl text-lg font-semibold transition-transform duration-200 hover:translate-y-[-2px]"
                  onClick={() => setSelectedProperty(p)}
                >
                  Show Details
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* modal (same as before) */}
      {selectedProperty && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[999] px-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative animate-fadeIn">
            <button
              onClick={() => setSelectedProperty(null)}
              className="absolute top-4 right-4 p-2 bg-gray-200 hover:bg-gray-300 rounded-full"
            >
              X
            </button>

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
              {selectedProperty.price} {selectedProperty.frequency}
            </p>

            <button className="w-full py-3 bg-[#5C039B] text-white rounded-xl hover:bg-purple-700 transition">
              Contact Agent
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default HotPropertyDeals;
