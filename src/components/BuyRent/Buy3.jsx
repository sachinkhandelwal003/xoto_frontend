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
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
    <div className="relative w-full max-w-2xl bg-gradient-to-br from-white via-purple-50 to-violet-50 rounded-3xl shadow-2xl overflow-hidden border border-purple-100">
      {/* Close Button */}
      <button
        onClick={() => setOpenModal(false)}
        className="absolute top-4 right-4 z-20 bg-gradient-to-r from-red-500 to-pink-500 text-white w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Modal Header with Gradient */}
      <div className="bg-gradient-to-r from-purple-600 to-violet-600 p-8 text-center">
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
          Schedule Property Visit
        </h3>
        <p className="text-purple-100 text-lg font-medium">
          Fill in your details and we'll arrange a private viewing for you!
        </p>
      </div>

      {/* Modal Content */}
      <div className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <input
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="First Name"
                required
                className="premium-input pl-12"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
            <div className="relative">
              <input
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Last Name"
                required
                className="premium-input pl-12"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Email Field */}
          <div className="relative">
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email Address"
              required
              className="premium-input pl-12"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>

          {/* Phone Field */}
          <div className="relative">
            <input
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Phone Number (e.g. 501234567)"
              required
              className="premium-input pl-12"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
          </div>

          {/* Occupation Field */}
          <div className="relative">
            <input
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              placeholder="Your Occupation"
              required
              className="premium-input pl-12"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
          </div>

          {/* Location Field */}
          <div className="relative">
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Preferred Location / Community"
              required
              className="premium-input pl-12"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-600">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>

          {/* Contact Method */}
          <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-6 rounded-2xl border border-purple-100">
            <p className="text-purple-800 font-bold text-lg mb-4 text-center">How should we contact you?</p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { value: "call", label: "Phone Call", icon: "📞" },
                { value: "whatsapp", label: "WhatsApp", icon: "💬" },
                { value: "email", label: "Email", icon: "✉️" }
              ].map(({ value, label, icon }) => (
                <label key={value} className="relative">
                  <input
                    type="radio"
                    name="preferred_contact"
                    value={value}
                    checked={formData.preferred_contact === value}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="p-4 rounded-xl border-2 border-purple-200 bg-white cursor-pointer transition-all duration-300 hover:border-purple-400 hover:shadow-md peer-checked:border-purple-600 peer-checked:bg-gradient-to-r peer-checked:from-purple-50 peer-checked:to-violet-50 peer-checked:shadow-lg">
                    <div className="flex flex-col items-center gap-2">
                      <div className={`text-2xl ${formData.preferred_contact === value ? 'text-purple-600' : 'text-purple-400'}`}>
                        {icon}
                      </div>
                      <span className="text-sm font-medium text-purple-800">{label}</span>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="space-y-4">
            <label className="flex items-start gap-3 text-gray-700 text-sm p-4 rounded-xl bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-100">
              <input type="checkbox" className="mt-1 text-purple-600 focus:ring-purple-500" />
              <span>I agree to receive newsletters and marketing communications via digital media, and understand I can unsubscribe at any time.</span>
            </label>

            <label className="flex items-start gap-3 text-gray-700 text-sm p-4 rounded-xl bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-100">
              <input type="checkbox" required className="mt-1 text-purple-600 focus:ring-purple-500" />
              <span>I accept the Terms & Conditions and Privacy Policy.</span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="group w-full bg-gradient-to-r from-purple-600 to-violet-600 text-white py-5 rounded-xl text-lg font-bold hover:shadow-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-violet-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative flex items-center justify-center gap-3">
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Scheduling Visit...
                </>
              ) : (
                <>
                  Schedule Property Visit
                  <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </span>
          </button>
        </form>
      </div>
    </div>

    <style jsx>{`
      .premium-input {
        width: 100%;
        padding: 1rem 1.25rem 1rem 3rem;
        border-radius: 0.75rem;
        border: 2px solid #e2e8f0;
        background: white;
        outline: none;
        font-size: 1rem;
        transition: all 0.3s;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      }
      .premium-input:focus {
        border-color: #8b5cf6;
        box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.1);
        transform: translateY(-1px);
      }
      .premium-input::placeholder {
        color: #94a3b8;
      }
      
      /* Custom Scrollbar */
      .custom-scrollbar::-webkit-scrollbar {
        width: 8px;
      }
      .custom-scrollbar::-webkit-scrollbar-track {
        background: #f1f5f9;
        border-radius: 4px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: linear-gradient(to bottom, #8b5cf6, #7c3aed);
        border-radius: 4px;
      }
      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(to bottom, #7c3aed, #6d28d9);
      }
      
      /* Animation for modal */
      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateY(-20px) scale(0.95);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }
      
      .fixed.inset-0 {
        animation: slideIn 0.3s ease-out;
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