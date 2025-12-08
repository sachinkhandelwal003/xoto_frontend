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
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
          <div className="bg-gradient-to-br from-[#F5EFFF] to-[#E8E0FF] rounded-[30px] p-6 max-w-md w-full relative animate-scaleIn">
            <button
              onClick={() => setOpenModal(false)}
              className="absolute top-4 right-4 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-600 transition"
            >
              <X size={16} />
            </button>

            <h3 className="text-center text-2xl font-bold text-[#6A00C1] mb-2">
              SCHEDULE A PROPERTY VISIT
            </h3>
            <p className="text-center text-sm text-gray-700 mb-6">
              Fill in your details and we'll arrange a visit for you!
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                <p className="text-[#6A00C1] font-semibold mb-3 text-sm">How should we contact you?</p>
                <div className="flex justify-center gap-4">
                  {["call", "whatsapp", "email"].map((type) => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="preferred_contact"
                        value={type}
                        checked={formData.preferred_contact === type}
                        onChange={handleChange}
                        className="w-4 h-4 text-[#6A00C1]"
                      />
                      <span className="bg-[#6A00C1] text-white px-4 py-1.5 rounded-full text-xs font-medium capitalize">
                        {type}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <label className="flex gap-2">
                  <input type="checkbox" />
                  <span>
                    I agree to receive newsletters and marketing communications.
                  </span>
                </label>

                <label className="flex gap-2">
                  <input type="checkbox" required />
                  <span>I accept the Terms & Conditions and Privacy Policy.</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#6A00C1] text-white py-3 rounded-full font-bold hover:bg-[#5A00B8] transition-all disabled:opacity-70"
              >
                {loading ? "Scheduling..." : "SCHEDULE VISIT"}
              </button>
            </form>
          </div>

          <style jsx>{`
            .input {
              width: 100%;
              padding: 12px 16px;
              border-radius: 999px;
              border: 2px solid #6A00C1;
              background: white;
              outline: none;
              font-size: 0.9rem;
              transition: all 0.2s;
            }
            .input:focus {
              border-color: #5A00B8;
              box-shadow: 0 0 0 4px rgba(106, 0, 193, 0.15);
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

export default OurProperty;