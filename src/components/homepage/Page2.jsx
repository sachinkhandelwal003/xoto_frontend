import React, { useState } from "react";
import img1 from "../../assets/img/Image12.jpg";
import img2 from "../../assets/img/Image11.jpg";
import img3 from "../../assets/img/Image 10.jpg";
import img4 from "../../assets/img/IMG9.png";

const properties = [
  { id: 1, title: "Modern Apartment", price: "$190,000", image: img1 },
  { id: 2, title: "City Apartment", price: "$180,000", image: img2 },
  { id: 3, title: "Luxury Apartment", price: "$220,000", image: img3 },
  { id: 4, title: "Modern Apartment", price: "$190,000", image: img1 },
  { id: 5, title: "City Apartment", price: "$180,000", image: img2 },
  { id: 6, title: "Luxury Apartment", price: "$220,000", image: img3 },
  { id: 7, title: "Modern Apartment", price: "$190,000", image: img1 },
  { id: 8, title: "City Apartment", price: "$180,000", image: img2 },
  { id: 9, title: "Luxury Apartment", price: "$220,000", image: img3 },
];

const Page2 = () => {
  const [visibleCount, setVisibleCount] = useState(6);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const LOAD_STEP = 3;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(properties.length, prev + LOAD_STEP));
  };

  return (
    <div className="w-full">
      {/* HEADER */}
      <section
        className="relative bg-cover bg-center min-h-[620px] flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${img4})` }}
      >
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 text-center px-4 max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold">
            XOTO Properties
          </h1>
          <p className="mt-4 text-base sm:text-lg leading-relaxed">
            Get in touch with our luxury real estate experts.
            <br />
            We're here to help you with all your property needs.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-70 h-10 bg-[#f5f5f5] z-[5] clip-left-shape border-none "></div>
        <div className="absolute bottom-0 right-0 w-70 h-10 bg-[#f5f5f5] z-[5] clip-right-shape border-none"></div>

        {/* Custom clip paths */}
        <style>{`
        .clip-left-shape {
          clip-path: polygon(0 0, 55% 0, 100% 100%, 0% 100%);
        }
        .clip-right-shape {
          clip-path: polygon(47% 0, 100% 0, 100% 100%, 0% 100%);
        }
      `}</style>
      </section>

      {/* PROPERTY GRID */}
      <section className="py-16 bg-[var(--color-body)] flex flex-col items-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl text-black font-semibold mb-10">
          Our Properties
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-[92%] sm:w-[90%] md:w-[80%]">
          {properties.slice(0, visibleCount).map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-[22px] shadow-xl border border-gray-200 hover:shadow-2xl transition overflow-hidden"
            >
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-[220px] object-cover"
              />

              <div className="p-5 bg-gradient-to-b from-white to-[#f5f1ff]">
                <h3 className="text-xl font-semibold">{property.title}</h3>
                <p className="text-[#7800C8] font-bold text-lg mt-1">
                  {property.price}
                </p>

                <p className="text-gray-600 text-sm mt-2">Motor City, Dubai</p>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full mt-6 py-3 bg-[#7800C8] hover:bg-white hover:text-[#5C039B] border-2 border-transparent hover:border-[#5C039B] text-white font-medium rounded-md transition"
                >
                  Schedule Visit
                </button>
              </div>
            </div>
          ))}
        </div>

        {visibleCount < properties.length && (
          <button
            onClick={handleLoadMore}
            className="mt-12 px-10 py-3 rounded-md bg-[#5C039B] text-white font-medium hover:bg-[#4b0281] transition"
          >
            Load More
          </button>
        )}
      </section>

      {/* CALLBACK MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="relative w-full max-w-[520px] bg-gradient-to-br from-[#F6F2FF] to-[#EBE4FF] rounded-[34px] p-6 sm:p-8 shadow-2xl">
            {/* CLOSE */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-green-400 flex items-center justify-center text-black"
            >
              ✕
            </button>

            <h2 className="text-center text-2xl sm:text-3xl font-bold text-[#6A00D4]">
              GET A CALL BACK FROM US!
            </h2>
            <p className="text-center text-sm sm:text-base text-[#6A00D4] mt-2">
              Get Started by completing the form below.
            </p>

            <form className="mt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input className="form-input" placeholder="First name" />
                <input className="form-input" placeholder="Last name" />
              </div>

              <input className="form-input" placeholder="Your Email" />
              <input className="form-input" placeholder="Your phone number" />
              <input className="form-input" placeholder="Your occupation" />
              <input className="form-input" placeholder="Your location" />

              <label className="flex gap-2 text-xs sm:text-sm text-[#6A00D4]">
                <input type="checkbox" />I agree to receive newsletters and
                marketing communications.
              </label>

              <label className="flex gap-2 text-xs sm:text-sm text-[#6A00D4]">
                <input type="checkbox" defaultChecked />I accept the Terms &
                Conditions and Privacy Policy.
              </label>

              <button
                type="submit"
                className="w-full bg-[#6A00D4] text-white py-4 rounded-full font-semibold text-lg mt-4 hover:opacity-90 transition"
              >
                SUBMIT
              </button>
            </form>
          </div>

          <style>{`
            .form-input {
              width: 100%;
              padding: 14px 18px;
              border-radius: 999px;
              border: 1.5px solid #6A00D4;
              background: transparent;
              outline: none;
              font-size: 14px;
            }
          `}</style>
        </div>
      )}
    </div>
  );
};

export default Page2;
