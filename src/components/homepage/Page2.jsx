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

  return (
    <div>
      {/* HEADER */}
      <section
        className="relative bg-cover bg-center h-[500px] flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${img4})` }}
      >
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4">
          <h1 className="font-dmSans font-extrabold text-[50px]">XOTO Properties</h1>
          <p className="mt-6 text-[24px] max-w-[814px] text-center">
            Get in touch with our luxury real estate experts.
          </p>
        </div>
      </section>

      {/* PROPERTY SECTION */}
      <section className="py-16 bg-[var(--color-body)] flex flex-col items-center">
        <h2 className="text-5xl font-semibold mb-10">Our Properties</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-[90%] md:w-[80%]">
          {properties.map((property, index) => (
            <div
              key={property.id}
              className="bg-white rounded-2xl shadow-lg border overflow-hidden"
            >
              <img src={property.image} alt={property.title} className="w-full h-70 object-cover" />

              <div className="p-5">
                <h3 className="font-semibold text-lg">{property.title}</h3>
                <p className="text-[#5C039B] font-bold text-xl mt-1">{property.price}</p>

                {/* UNIFORM CARD BUTTON */}
                <button
                  onClick={() => openModal(property, index)}
                  className="
                    w-full 
                    h-14 
                    bg-[#5C039B] 
                    hover:bg-[#4b0281] 
                    text-white 
                    rounded-md 
                    text-lg 
                    flex items-center justify-center 
                    mt-5
                  "
                >
                  Show Details
                </button>
              </div>
            </div>
          ))}
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

            {/* BUTTONS INSIDE MODAL */}
            <div className="flex justify-between gap-3">
              <button
                onClick={goPrev}
                disabled={currentIndex === 0}
                className={`
                  w-1/2 h-14 rounded-md text-white font-medium
                  ${
                    currentIndex === 0
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#5C039B] hover:bg-[#4b0281]"
                  }
                `}
              >
                Previous
              </button>

              <button
                onClick={goNext}
                disabled={currentIndex === properties.length - 1}
                className={`
                  w-1/2 h-14 rounded-md text-white font-medium
                  ${
                    currentIndex === properties.length - 1
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#5C039B] hover:bg-[#4b0281]"
                  }
                `}
              >
                Next
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Page2;