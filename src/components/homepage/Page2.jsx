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

  // visible count + load more
  const [visibleCount, setVisibleCount] = useState(6);
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

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(properties.length, prev + LOAD_STEP));
  };

  return (
    <div className="w-full">

      {/* HEADER */}
      <section
        className="relative bg-cover bg-center min-h-[350px] sm:min-h-[420px] md:min-h-[500px] flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${img4})` }}
      >
        {/* clipped shapes */}
        <div className="absolute bottom-0 left-0 w-40 sm:w-56 md:w-72 h-10 bg-[var(--color-body)] z-[5] clip-left-shape"></div>
        <div className="absolute bottom-0 right-0 w-40 sm:w-56 md:w-72 h-10 bg-[var(--color-body)] z-[5] clip-right-shape"></div>

        <style>{`
          .clip-left-shape {
            clip-path: polygon(0 0, 55% 0, 100% 100%, 0% 100%);
          }
          .clip-right-shape {
            clip-path: polygon(47% 0, 100% 0, 100% 100%, 0% 100%);
          }
        `}</style>

        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 text-center px-4 max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold">XOTO Properties</h1>
          <p className="mt-4 text-base sm:text-lg md:text-xl leading-relaxed">
            Get in touch with our luxury real estate experts. We're here to help you with<br />
            all your property needs in the UAE.
          </p>
        </div>
      </section>

      {/* PROPERTY SECTION */}
      <section className="py-16 bg-[var(--color-body)] flex flex-col items-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl text-black font-semibold mb-10">
          Our Properties
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-[92%] sm:w-[90%] md:w-[80%]">
          {properties.slice(0, visibleCount).map((property, index) => (
            <div
              key={property.id}
              className="w-full bg-white rounded-[22px] shadow-xl border border-gray-200 hover:shadow-2xl transition overflow-hidden"
            >
              {/* IMAGE */}
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-[220px] object-cover"
              />

              {/* CARD CONTENT */}
              <div className="p-5 bg-gradient-to-b from-white to-[#f5f1ff]">

                <h3 className="text-xl font-semibold text-black">{property.title}</h3>

                <p className="text-gray-600 text-sm mt-1">Motor City, Dubai</p>

                {/* DETAILS */}
                <div className="flex items-center gap-5 mt-4 text-gray-700 text-sm">

                  <div className="flex items-center gap-1">
                    <span>546.38 Sq.ft.</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <span>1 Bed</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <span>1 Bath</span>
                  </div>
                </div>

                {/* BUTTON */}
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
        {visibleCount < properties.length && (
          <button
            onClick={handleLoadMore}
            className="mt-10 px-8 py-3 rounded-md bg-[#5C039B] text-white font-medium hover:bg-[#4b0281] transition"
          >
            Load More
          </button>
        )}
      </section>

      {/* MODAL */}
      {isModalOpen && selectedProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md sm:max-w-lg rounded-xl p-6 relative shadow-xl">

            {/* close */}
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
              className="w-full h-56 sm:h-64 object-cover rounded-lg mb-4"
            />

            <h2 className="text-2xl font-semibold">{selectedProperty.title}</h2>
            <p className="text-[#5C039B] font-bold text-xl mt-2">{selectedProperty.price}</p>

            <p className="text-gray-600 mt-4">
              Beautiful modern apartment located in the heart of the city.
            </p>

            {/* BUTTONS */}
            <div className="flex gap-4 mt-6">
              <button
                onClick={goPrev}
                disabled={currentIndex === 0}
                className={`w-1/2 h-12 rounded-md text-white font-medium transition ${
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
                className={`w-1/2 h-12 rounded-md text-white font-medium transition ${
                  currentIndex === properties.length - 1
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#5C039B] hover:bg-[#4b0281]"
                }`}
              >
                Next
              </button>
            </div>

           
            {/* </div> */}
          </div>
        </div>
      )}

    </div>
  );
};

export default Page2;
