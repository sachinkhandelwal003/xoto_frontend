import React, { useState } from "react";
import { Bed, Bath, Square, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { apiService } from "../../manageApi/utils/custom.apiservice";
import "swiper/css";
import "swiper/css/navigation";
import waveint4 from "../../assets/img/wave/waveint.png";

const OurProperty = () => {
  const navigate = useNavigate();
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

  const properties = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      name: "Sobha Solis",
      location: "Motor City, Dubai",
      bedrooms: 1,
      bathrooms: 1,
      area: "546.38 Sq.ft.",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800&q=80",
      name: "Green Villa",
      location: "California",
      bedrooms: 4,
      bathrooms: 3,
      area: "150m²",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
      name: "Urban Loft",
      location: "Chicago",
      bedrooms: 2,
      bathrooms: 2,
      area: "95m²",
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

  const PropertyCard = ({ property }) => (
    <div className="relative z-20 bg-white rounded-[28px] shadow-xl overflow-hidden hover:-translate-y-2 transition">
      <div className="h-[240px]">
        <img
          src={property.image}
          alt={property.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-6 bg-gradient-to-b from-white to-[#f2edff]">
        <h3 className="text-[22px] font-semibold">{property.name}</h3>
        <p className="text-gray-600 text-sm">{property.location}</p>

        <div className="flex gap-5 mt-4 text-sm text-gray-700">
          <span className="flex items-center gap-1">
            <Square size={16} /> {property.area}
          </span>
          <span className="flex items-center gap-1">
            <Bed size={16} /> {property.bedrooms} Bed
          </span>
          <span className="flex items-center gap-1">
            <Bath size={16} /> {property.bathrooms} Bath
          </span>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="w-full mt-6 py-3 rounded-full bg-[var(--color-primary)] text-white hover:bg-white hover:text-[#6A00C1] border-2 border-transparent hover:border-[#6A00C1] transition"
        >
          Schedule Visit
        </button>
      </div>
    </div>
  );

  return (
    <>
      <Toaster position="top-center" />

      <section className="relative pt-10 pb-40 bg-[var(--color-body)] overflow-hidden z-20">
        <img
          src={waveint4}
          alt=""
          className="absolute -bottom-[350px] left-0 w-full"
        />

        <div className="max-w-7xl mx-auto px-5">
          <h2 className="text-center card-heading-1 mb-16">
            Explore Properties
          </h2>

          {/* MOBILE */}
          <div className="block md:hidden">
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              autoplay={{ delay: 3500 }}
              loop
            >
              {properties.map((p) => (
                <SwiperSlide key={p.id}>
                  <PropertyCard property={p} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* DESKTOP */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-10">
            {properties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>

          {/* VIEW MORE → PAGE NAVIGATION */}
          <div className="flex justify-center mt-16 relative z-20">
            <button
              onClick={() => navigate("/properties")}
              className="bg-[var(--color-primary)] text-white px-10 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl"
            >
              View More
            </button>
          </div>
        </div>
      </section>

      {/* SCHEDULE VISIT MODAL */}
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

export default OurProperty;