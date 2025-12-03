import React, { useState } from "react";
import img1 from "../../assets/img/Image12.jpg";
import img2 from "../../assets/img/Image11.jpg";
import img3 from "../../assets/img/Image 10.jpg";
import img4 from "../../assets/img/IMG9.png";
import wave1 from "../../assets/img/wave/wave2.png";

const properties = [
  { id: 1, title: "Modern Apartment", price: "$190,000", image: img1, label: "Sell" },
  { id: 2, title: "City Apartment", price: "$180,000", image: img2, label: "Rent" },
  { id: 3, title: "Luxury Apartment", price: "$220,000", image: img3, label: "Sell" },
  { id: 4, title: "Modern Apartment", price: "$190,000", image: img1, label: "Sell" },
  { id: 5, title: "City Apartment", price: "$180,000", image: img2, label: "Rent" },
  { id: 6, title: "Luxury Apartment", price: "$220,000", image: img3, label: "Sell" },
  { id: 7, title: "Modern Apartment", price: "$190,000", image: img1, label: "Sell" },
  { id: 8, title: "City Apartment", price: "$180,000", image: img2, label: "Rent" },
  { id: 9, title: "Luxury Apartment", price: "$220,000", image: img3, label: "Sell" },
];

const Page2 = () => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  // NEW: visible count + load more
  const [visibleCount, setVisibleCount] = useState(6); // show 6 initially
  const LOAD_STEP = 3;

  const openModal = (property, index) => {
    setSelectedProperty(property);
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProperty(null);
  };

  const goNext = () => {
    if (currentIndex < properties.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setSelectedProperty(properties[nextIndex]);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      setSelectedProperty(properties[prevIndex]);
    }
  };

  // NEW: load more handler
  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(properties.length, prev + LOAD_STEP));
  };

  // NEW: optional - if you want "show less" functionality, you could add a button to reset visibleCount

  return (
    <div>
      {/* HEADER */}
      <section
        className="relative bg-cover bg-center h-[500px] flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${img4})` }}
      >

        <div className="absolute bottom-0 left-0 w-70 h-10 bg-[var(--color-body)] z-[5] clip-left-shape "></div>
      <div className="absolute bottom-0 right-0 w-70 h-10 bg-[var(--color-body)] z-[5] clip-right-shape"></div>

      {/* Custom clip paths */}
      <style>{`
        .clip-left-shape {
          clip-path: polygon(0 0, 55% 0, 100% 100%, 0% 100%);
        }
        .clip-right-shape {
          clip-path: polygon(47% 0, 100% 0, 100% 100%, 0% 100%);
        }
      `}</style>
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4">
          <h1 className="font-dmSans heading-light-1 text-[50px]">XOTO Properties</h1>
          <p className="mt-6 text-[24px] max-w-[814px] paragraph-light-1 text-center">
            Get in touch with our luxury real estate experts.We're here to help you<br/> with all your property needs in the UAE.
          </p>
        </div>
      </section>

      {/* PROPERTY SECTION */}
      <section className="py-16 bg-[var(--color-body)] flex flex-col items-center">
        <h2 className="text-5xl hrading-dark-1 text-black  font-semibold  mb-10">Our Properties</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-[90%] md:w-[80%]">
          {properties.slice(0, visibleCount).map((property, index) => (
            <div
              key={property.id}
              className="w-full bg-white rounded-[22px] shadow-xl overflow-hidden border border-gray-200"
            >
              {/* IMAGE */}
              <div className="w-full h-[210px] overflow-hidden rounded-t-[22px]">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* CONTENT */}
              <div className="p-5 bg-gradient-to-b from-white to-[#f5f1ff]">
                {/* TITLE */}
                <h3 className="text-[22px] font-semibold text-[#1a1a1a]">
                  {property.title}
                </h3>

                {/* LOCATION */}
                <p className="text-gray-600 text-[14px] mt-1">
                  Motor City, Dubai
                </p>

                {/* ICON DETAILS */}
                <div className="flex items-center gap-6 mt-4 text-gray-700 text-sm">
                  <div className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-[18px] w-[18px]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 3h18v18H3V3z"
                      />
                    </svg>
                    <span>546.38 Sq.ft.</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4 10V7a3 3 0 0 1 6 0v3h4V7a3 3 0 0 1 6 0v3h1a1 1 0 0 1 1 1v6h-2v-2H4v2H2v-6a1 1 0 0 1 1-1h1Zm2 0h4V7a2 2 0 1 0-4 0v3Zm10 0h4V7a2 2 0 1 0-4 0v3Z"></path>
                    </svg>
                    <span>1 Beds</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-[18px] w-[18px]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7 3a5 5 0 0 1 9 3v4h1a3 3 0 0 1 3 3v5H3v-5a3 3 0 0 1 3-3h1V6a5 5 0 0 1 0-.17A5 5 0 0 1 7 3Zm2 4v4h6V7a3 3 0 1 0-6 0Z"></path>
                    </svg>
                    <span>1 Baths</span>
                  </div>
                </div>

                {/* CTA BUTTON */}
                <button
                  onClick={() => openModal(property, index)}
                  className="w-full mt-6 py-3 bg-[#7800C8] hover:bg-[#ffffff] hover:text-[#5C039B] text-white font-medium rounded-md transition"
                >
                  Schedule Visit
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* LOAD MORE BUTTON */}
        <div className="mt-10 flex justify-center w-full">
          {visibleCount < properties.length && (
            <button
              onClick={handleLoadMore}
              className="px-8 py-3 rounded-md bg-[#5C039B] text-white font-medium hover:bg-[#4b0281] transition"
            >
              Load More
            </button>
          )}
        </div>
      </section>

      {/* MODAL */}
      {isModalOpen && selectedProperty && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-[90%] max-w-lg rounded-xl p-6 relative shadow-xl">
            {/* CLOSE BUTTON */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-600 text-xl"
            >
              ✕
            </button>

            {/* IMAGE */}
            <img
              src={selectedProperty.image}
              alt={selectedProperty.title}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />

            {/* CONTENT */}
            <h2 className="text-2xl font-semibold mb-2">{selectedProperty.title}</h2>
            <p className="text-[#5C039B] font-bold text-xl mb-4">{selectedProperty.price}</p>

            <p className="text-gray-600 mb-6">
              Beautiful modern apartment located in the heart of the city.
            </p>

            {/* BUTTONS */}
            <div className="flex justify-between gap-3">
              <button
                onClick={goPrev}
                disabled={currentIndex === 0}
                className={`w-1/2 h-14 rounded-md text-white font-medium ${
                  currentIndex === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#5C039B] hover:bg-[#4b0281]"
                }`}
              >
                Previous
              </button>

              <button
                onClick={goNext}
                disabled={currentIndex === properties.length - 1}
                className={`w-1/2 h-14 rounded-md text-white font-medium ${
                  currentIndex === properties.length - 1
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#5C039B] hover:bg-[#4b0281]"
                }`}
              >
                Next
              </button>
               {/* Wave Background - Mobile Friendly */}
                <div className="absolute left-0 w-full z-0 overflow-visible bottom-[-120px] sm:bottom-[-100px] md:bottom-[-60px] lg:bottom-[-500px]">
                  <img
                    src={wave1}
                    alt=""
                    className="pointer-events-none select-none w-full scale-[1.4] sm:scale-[1.2] md:scale-[1.05] lg:scale-100"
                  />
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page2;