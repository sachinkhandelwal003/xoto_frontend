import React, { useState } from "react";
import { FaBed, FaBath, FaRulerCombined, FaTimes } from "react-icons/fa";
import propertyImg from "../../assets/img/Property.png";
import bgImage from "../../assets/img/buy3bg.png";

const Property = () => {
  const [openModal, setOpenModal] = useState(false);

  const deals = [
    {
      id: 1,
      name: "Sobha Solis",
      location: "Motor City, Dubai",
      beds: 1,
      bathroom: 1,
      area: "546.38 Sq.ft.",
      imgUrl: propertyImg,
    },
    {
      id: 2,
      name: "Palm Residence",
      location: "Business Bay, Dubai",
      beds: 2,
      bathroom: 2,
      area: "680 Sq.ft.",
      imgUrl: propertyImg,
    },
    {
      id: 3,
      name: "Cayan Tower",
      location: "Dubai Marina",
      beds: 3,
      bathroom: 2,
      area: "720 Sq.ft.",
      imgUrl: propertyImg,
    },
  ];

  return (
    <>
      {/* Section */}
      <div
        className="min-h-screen py-16 px-4 sm:px-6 lg:px-12 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="max-w-5xl mx-auto text-center mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Hot Property Deals
          </h2>
          <p className="text-white text-lg sm:text-xl mt-4">
            Discover exclusive properties with the best value in Dubai
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {deals.map((deal) => (
            <PropertyCard
              key={deal.id}
              deal={deal}
              onClick={() => setOpenModal(true)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {openModal && <CallbackModal onClose={() => setOpenModal(false)} />}
    </>
  );
};

function PropertyCard({ deal, onClick }) {
  return (
    <div className="bg-white rounded-[30px] shadow-lg overflow-hidden hover:scale-[1.02] transition">
      <div className="h-[230px] w-full">
        <img
          src={deal.imgUrl}
          alt={deal.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-6 bg-gradient-to-b from-[#F7F6F9] to-white">
        <h3 className="text-xl font-semibold">{deal.name}</h3>
        <p className="text-gray-500 text-sm mt-1">{deal.location}</p>

        <div className="flex gap-4 mt-5 text-sm text-gray-700">
          <div className="flex items-center gap-1">
            <FaRulerCombined /> {deal.area}
          </div>
          <div className="flex items-center gap-1">
            <FaBed /> {deal.beds}
          </div>
          <div className="flex items-center gap-1">
            <FaBath /> {deal.bathroom}
          </div>
        </div>

        <button
          onClick={onClick}
          className="w-full mt-7 bg-[#6A00D4] text-white py-3 rounded-full font-semibold hover:bg-white hover:text-[#6A00D4] border-2 border-transparent hover:border-[#6A00D4] transition"
        >
          Schedule Visit
        </button>
      </div>
    </div>
  );
}

/* ================= MODAL ================= */

function CallbackModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="relative w-full max-w-[500px] bg-gradient-to-br from-[#F5EFFF] to-[#E8E0FF] rounded-[30px] p-6 sm:p-8 animate-scaleIn">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-green-400 w-8 h-8 rounded-full flex items-center justify-center"
        >
          <FaTimes size={14} />
        </button>

        <h3 className="text-center text-2xl sm:text-3xl font-bold text-[#6A00D4]">
          GET A CALL BACK FROM US!
        </h3>
        <p className="text-center text-sm sm:text-base mt-2 text-gray-700">
          Get Started by completing the form below.
        </p>

        <form className="mt-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input placeholder="First name" className="input" />
            <input placeholder="Last name" className="input" />
          </div>

          <input placeholder="Your Email" className="input" />
          <input placeholder="Your phone number" className="input" />
          <input placeholder="Your occupation" className="input" />
          <input placeholder="Your location" className="input" />

          <label className="flex gap-2 text-xs">
            <input type="checkbox" />
            <span>
              I agree to receive newsletters and marketing communications.
            </span>
          </label>

          <label className="flex gap-2 text-xs">
            <input type="checkbox" defaultChecked />
            <span>I accept the Terms & Conditions and Privacy Policy.</span>
          </label>

          <button className="w-full bg-[#6A00D4] text-white py-3 rounded-md font-bold mt-4">
            SUBMIT
          </button>
        </form>
      </div>

      {/* animation */}
      <style>{`
        .input {
          width: 100%;
          padding: 12px;
          border-radius: 999px;
          border: 1px solid #6A00D4;
          outline: none;
          background: transparent;
        }
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-scaleIn {
          animation: scaleIn 0.25s ease-out;
        }
      `}</style>
    </div>
  );
}

export default Property;
