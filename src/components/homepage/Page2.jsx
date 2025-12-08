import React, { useState } from "react";
import img1 from "../../assets/img/Image12.jpg";
import img2 from "../../assets/img/Image11.jpg";
import img3 from "../../assets/img/Image 10.jpg";
import img4 from "../../assets/img/IMG9.png";
import toast, { Toaster } from "react-hot-toast";
import { apiService } from "../../manageApi/utils/custom.apiservice";

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
  const [loading, setLoading] = useState(false);
  const LOAD_STEP = 3;

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    occupation: "",
    location: "",
    preferred_contact: "whatsapp"
  });

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(properties.length, prev + LOAD_STEP));
  };

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
        setIsModalOpen(false);
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
    <div className="w-full">
      <Toaster position="top-center" />

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

      {/* SCHEDULE VISIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="relative w-full max-w-[520px] bg-gradient-to-br from-[#F6F2FF] to-[#EBE4FF] rounded-[34px] p-6 sm:p-8 shadow-2xl animate-scaleIn">
            {/* CLOSE */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-red-500 flex items-center justify-center text-white hover:bg-red-600 transition"
            >
              ✕
            </button>

            <h2 className="text-center text-2xl sm:text-3xl font-bold text-[#6A00D4]">
              SCHEDULE A PROPERTY VISIT
            </h2>
            <p className="text-center text-sm sm:text-base text-[#6A00D4] mt-2">
              Fill in your details and we'll arrange a visit for you!
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input 
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="First name" 
                  required 
                  className="form-input" 
                />
                <input 
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="Last name" 
                  required 
                  className="form-input" 
                />
              </div>

              <input 
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email" 
                required 
                className="form-input" 
              />
              
              <input 
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Your phone number (e.g. 501234567)" 
                required 
                className="form-input" 
              />
              
              <input 
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                placeholder="Your occupation" 
                required 
                className="form-input" 
              />
              
              <input 
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Your location" 
                required 
                className="form-input" 
              />

              <div>
                <p className="text-[#6A00D4] font-semibold mb-3 text-sm">How should we contact you?</p>
                <div className="flex justify-center gap-4">
                  {["call", "whatsapp", "email"].map((type) => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="preferred_contact"
                        value={type}
                        checked={formData.preferred_contact === type}
                        onChange={handleChange}
                        className="w-4 h-4 text-[#6A00D4]"
                      />
                      <span className="bg-[#6A00D4] text-white px-4 py-1.5 rounded-full text-xs font-medium capitalize">
                        {type}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <label className="flex gap-2 text-xs sm:text-sm text-[#6A00D4]">
                <input type="checkbox" />I agree to receive newsletters and
                marketing communications.
              </label>

              <label className="flex gap-2 text-xs sm:text-sm text-[#6A00D4]">
                <input type="checkbox" required />I accept the Terms &
                Conditions and Privacy Policy.
              </label>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#6A00D4] text-white py-4 rounded-full font-semibold text-lg mt-4 hover:opacity-90 transition disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? "Scheduling..." : "SCHEDULE VISIT"}
              </button>
            </form>
          </div>

          <style jsx>{`
            .form-input {
              width: 100%;
              padding: 14px 18px;
              border-radius: 999px;
              border: 1.5px solid #6A00D4;
              background: white;
              outline: none;
              font-size: 14px;
              transition: all 0.2s;
            }
            .form-input:focus {
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
    </div>
  );
};

export default Page2;