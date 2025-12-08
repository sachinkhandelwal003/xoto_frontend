// src/components/property/Property.jsx
import React, { useState } from "react";
import { FaBed, FaBath, FaRulerCombined, FaTimes } from "react-icons/fa";
import propertyImg from "../../assets/img/Property.png";
import bgImage from "../../assets/img/buy3bg.png";
import toast, { Toaster } from "react-hot-toast";
import { apiService } from "../../manageApi/utils/custom.apiservice";

const Property = () => {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    occupation: "",
    location: "",
    preferred_contact: "whatsapp"
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      type: "schedule_visit",
      name: {
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim()
      },
      mobile: { number: formData.mobile.replace(/\D/g, "").slice(-10) },
      email: formData.email.toLowerCase().trim(),
      occupation: formData.occupation,
      location: formData.location,
      preferred_contact: formData.preferred_contact
    };

    try {
      const res = await apiService.post("/property/lead", payload);

      if (res.success) {
        toast.success("Visit scheduled! We'll contact you shortly.");
        setOpenModal(false);
        setFormData({
          first_name: "", last_name: "", email: "", mobile: "",
          occupation: "", location: "", preferred_contact: "whatsapp"
        });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to schedule visit. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" />

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

      {/* Schedule Visit Modal */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="relative w-full max-w-[500px] bg-gradient-to-br from-[#F5EFFF] to-[#E8E0FF] rounded-[30px] p-6 sm:p-8 animate-scaleIn">
            <button
              onClick={() => setOpenModal(false)}
              className="absolute top-4 right-4 bg-red-500 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-red-600 transition"
            >
              <FaTimes size={16} />
            </button>

            <h3 className="text-center text-2xl sm:text-3xl font-bold text-[#6A00D4] mb-2">
              SCHEDULE A PROPERTY VISIT
            </h3>
            <p className="text-center text-sm sm:text-base text-gray-700 mb-6">
              Fill in your details and we'll arrange a visit for you!
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="First Name"
                  required
                  className="input"
                />
                <input
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="Last Name"
                  required
                  className="input"
                />
              </div>

              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                className="input"
              />

              <input
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Phone Number (e.g. 501234567)"
                required
                className="input"
              />

              <input
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                placeholder="Your Occupation"
                required
                className="input"
              />

              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Preferred Location / Community"
                required
                className="input"
              />

              <div>
                <p className="text-[#6A00D4] font-semibold mb-3">How should we contact you?</p>
                <div className="flex justify-center gap-6">
                  {["call", "whatsapp", "email"].map((type) => (
                    <label key={type} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="preferred_contact"
                        value={type}
                        checked={formData.preferred_contact === type}
                        onChange={handleChange}
                        className="w-5 h-5 text-[#6A00D4]"
                      />
                      <span className="bg-[#6A00D4] text-white px-5 py-2 rounded-full font-medium capitalize">
                        {type}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#6A00D4] text-white py-4 rounded-full font-bold text-lg hover:bg-[#5A00B8] transition-all disabled:opacity-70"
              >
                {loading ? "Scheduling..." : "SCHEDULE VISIT"}
              </button>
            </form>
          </div>

          <style jsx>{`
            .input {
              width: 100%;
              padding: 14px 16px;
              border-radius: 999px;
              border: 2px solid #6A00D4;
              outline: none;
              font-size: 1rem;
              background: white;
              transition: all 0.2s;
            }
            .input:focus {
              border-color: #5A00B8;
              box-shadow: 0 0 0 4px rgba(106, 0, 212, 0.15);
            }
            @keyframes scaleIn {
              from { transform: scale(0.9); opacity: 0; }
              to { transform: scale(1); opacity: 1; }
            }
            .animate-scaleIn {
              animation: scaleIn 0.3s ease-out;
            }
          `}</style>
        </div>
      )}
    </>
  );
};

function PropertyCard({ deal, onClick }) {
  return (
    <div className="bg-white rounded-[30px] shadow-lg overflow-hidden hover:scale-[1.02] transition transform duration-300">
      <div className="h-[230px] w-full">
        <img
          src={deal.imgUrl}
          alt={deal.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-6 bg-gradient-to-b from-[#F7F6F9] to-white">
        <h3 className="text-xl font-semibold text-gray-900">{deal.name}</h3>
        <p className="text-gray-500 text-sm mt-1">{deal.location}</p>

        <div className="flex gap-4 mt-5 text-sm text-gray-700">
          <div className="flex items-center gap-1">
            <FaRulerCombined className="text-gray-600" /> {deal.area}
          </div>
          <div className="flex items-center gap-1">
            <FaBed className="text-gray-600" /> {deal.beds} Bed
          </div>
          <div className="flex items-center gap-1">
            <FaBath className="text-gray-600" /> {deal.bathroom} Bath
          </div>
        </div>

         <button
          onClick={onClick}
          className="w-full mt-7       bg-[var(--color-primary)] 
 text-white py-3 rounded-full font-semibold hover:bg-white hover:text-[#6A00D4] border-2 border-transparent hover:border-[#6A00D4] transition"
        >
          Schedule Visit
        </button>
      </div>
    </div>
  );
}

export default Property;