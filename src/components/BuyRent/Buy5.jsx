// src/components/home/OurProperty.jsx
import React, { useState } from "react";
import { 
  Bed, 
  Bath, 
  Square, 
  X, 
  User, 
  Mail, 
  Phone, 
  Globe, 
  Briefcase, 
  MapPin 
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";
// 1. Import Ant Design Notification
import { notification } from 'antd';
import { apiService } from "../../manageApi/utils/custom.apiservice";
import { useTranslation } from "react-i18next";
import "swiper/css";
import "swiper/css/navigation";
import waveint4 from "../../assets/img/wave/waveint.png";

const OurProperty = () => {
  const { t } = useTranslation("buy5");
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // 2. Initialize Ant Design Notification Hook
  const [api, contextHolder] = notification.useNotification();

  // Country codes for Dubai, India, Russia
  const countryCodes = [
    { code: "+971", country: "UAE" },
    { code: "+91", country: "IN" },
    { code: "+7", country: "RU" },
  ];

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    country_code: "+971", // Default to UAE
    mobile: "",
    occupation: "",
    location: "",
    preferred_contact: "whatsapp"
  });

  const properties = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      name: "Sobha Solis",
      location: "Motor City, Dubai",
      bedrooms: 1,
      bathrooms: 1,
      area: "546.38 Sq.ft."
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800&q=80",
      name: "Green Villa",
      location: "California",
      bedrooms: 4,
      bathrooms: 3,
      area: "150m²"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
      name: "Urban Loft",
      location: "Chicago",
      bedrooms: 2,
      bathrooms: 2,
      area: "95m²"
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Mobile Validation: Allow only numbers
    if (name === "mobile") {
      const numericValue = value.replace(/\D/g, "");
      setFormData(prev => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // 3. Helper to trigger notification
  const openNotification = (type, title, description) => {
    api[type]({
      message: title,
      description: description,
      placement: 'topRight',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validation
    if (!formData.mobile || formData.mobile.length < 5) {
       openNotification('error', 'Validation Error', t("Please enter a valid mobile number"));
       setLoading(false);
       return;
    }

    const payload = {
      type: "schedule_visit",
      name: {
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim()
      },
      // Updated structure for backend
      mobile: { 
        country_code: formData.country_code,
        number: formData.mobile 
      },
      email: formData.email.toLowerCase().trim(),
      occupation: formData.occupation,
      location: formData.location,
      preferred_contact: formData.preferred_contact
    };

    try {
      const res = await apiService.post("/property/lead", payload);
      if (res.success) {
        // 4. Show Success Notification
        openNotification(
            'success', 
            'Request Submitted', 
            t("toast.success")
        );
        
        // 5. Close Modal & Reset
        setOpenModal(false);
        setFormData({
          first_name: "", last_name: "", email: "", mobile: "", country_code: "+971",
          occupation: "", location: "", preferred_contact: "whatsapp"
        });
      }
    } catch (err) {
      openNotification('error', 'Submission Failed', err.response?.data?.message || t("toast.error"));
    } finally {
      setLoading(false);
    }
  };

  const PropertyCard = ({ property }) => (
    <div className="relative z-20 bg-white rounded-[28px] shadow-xl overflow-hidden hover:-translate-y-2 transition">
      <div className="h-[240px]">
        <img src={property.image} alt={property.name} className="w-full h-full object-cover" />
      </div>

      <div className="p-6 bg-gradient-to-b from-white to-[#f2edff]">
        <h3 className="text-[22px] font-semibold">{property.name}</h3>
        <p className="text-gray-600 text-sm">{property.location}</p>

        <div className="flex gap-5 mt-4 text-sm text-gray-700">
          <span className="flex items-center gap-1">
            <Square size={16} className="text-purple-600" /> {property.area}
          </span>
          <span className="flex items-center gap-1">
            <Bed size={16} className="text-purple-600" /> {property.bedrooms} {t("card.bed")}
          </span>
          <span className="flex items-center gap-1">
            <Bath size={16} className="text-purple-600" /> {property.bathrooms} {t("card.bath")}
          </span>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="w-full mt-6 py-3 rounded-full bg-[var(--color-primary)] text-white hover:bg-white hover:text-[#6A00C1] border-2 border-transparent hover:border-[#6A00C1] transition"
        >
          {t("actions.schedule")}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* 6. Render Notification Holder */}
      {contextHolder}

      <section className="relative pt-10 pb-40 bg-[var(--color-body)] overflow-hidden z-20">
        <img src={waveint4} alt="" className="absolute -bottom-[350px] left-0 w-full" />

        <div className="max-w-7xl mx-auto px-5">
          <h2 className="text-center card-heading-1 mb-16">
            {t("heading.title")}
          </h2>

          <div className="block md:hidden">
            <Swiper modules={[Navigation, Autoplay]} slidesPerView={1} autoplay={{ delay: 3500 }} loop>
              {properties.map(p => (
                <SwiperSlide key={p.id}>
                  <PropertyCard property={p} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-10">
            {properties.map(p => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>

          <div className="flex justify-center mt-16 relative z-20">
            <button
              onClick={() => navigate("/properties")}
              className="bg-[var(--color-primary)] text-white px-10 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl"
            >
              {t("actions.viewMore")}
            </button>
          </div>
        </div>
      </section>

      {/* MODAL */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div className="relative w-full max-w-2xl bg-gradient-to-br from-white via-purple-50 to-violet-50 rounded-3xl shadow-2xl overflow-hidden border border-purple-100">
            <button 
                onClick={() => setOpenModal(false)} 
                className="absolute top-4 right-4 bg-red-500 text-white w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-all"
            >
                <X size={20} />
            </button>

            <div className="bg-gradient-to-r from-purple-600 to-violet-600 p-8 text-center">
              <h3 className="text-3xl font-bold text-white">{t("modal.title")}</h3>
              <p className="text-purple-100">{t("modal.subtitle")}</p>
            </div>

            <div className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                        <input name="first_name" value={formData.first_name} onChange={handleChange} placeholder={t("form.firstName")} required className="premium-input pl-12" />
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-600">
                            <User size={20} />
                        </div>
                    </div>
                    <div className="relative">
                        <input name="last_name" value={formData.last_name} onChange={handleChange} placeholder={t("form.lastName")} required className="premium-input pl-12" />
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-600">
                            <User size={20} />
                        </div>
                    </div>
                </div>

                {/* Email */}
                <div className="relative">
                    <input name="email" value={formData.email} onChange={handleChange} placeholder={t("form.email")} required className="premium-input pl-12" />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-600">
                        <Mail size={20} />
                    </div>
                </div>

                {/* Mobile Input with Country Code */}
                <div className="flex gap-3">
                    <div className="relative w-32">
                        <select
                            name="country_code"
                            value={formData.country_code}
                            onChange={handleChange}
                            className="premium-input pl-10 pr-2 appearance-none cursor-pointer"
                            style={{ backgroundImage: 'none' }} 
                        >
                            {countryCodes.map((item) => (
                                <option key={item.code} value={item.code}>
                                    {item.code} ({item.country})
                                </option>
                            ))}
                        </select>
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-600 pointer-events-none">
                            <Globe size={18} />
                        </div>
                    </div>

                    <div className="relative flex-1">
                        <input
                            name="mobile"
                            type="text"
                            inputMode="numeric"
                            value={formData.mobile}
                            onChange={handleChange}
                            placeholder={t("form.phone")}
                            required
                            className="premium-input pl-12"
                        />
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-600">
                            <Phone size={20} />
                        </div>
                    </div>
                </div>

                {/* Occupation */}
                <div className="relative">
                    <input name="occupation" value={formData.occupation} onChange={handleChange} placeholder={t("form.occupation")} required className="premium-input pl-12" />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-600">
                        <Briefcase size={20} />
                    </div>
                </div>

                {/* Location */}
                <div className="relative">
                    <input name="location" value={formData.location} onChange={handleChange} placeholder={t("form.location")} required className="premium-input pl-12" />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-600">
                        <MapPin size={20} />
                    </div>
                </div>

                <button type="submit" disabled={loading} className="w-full bg-purple-600 text-white py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-purple-700 transition">
                  {loading ? (
                    <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        {t("actions.loading")}
                    </>
                  ) : t("actions.submit")}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .premium-input {
          width: 100%;
          padding: 1rem 1.25rem 1rem 3rem;
          border-radius: 0.75rem;
          border: 2px solid #e9d5ff;
          background: white;
          outline: none;
          font-size: 1rem;
          transition: all 0.3s;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }
        .premium-input:focus {
          border-color: #9333ea;
          box-shadow: 0 0 0 4px rgba(147, 51, 234, 0.1);
          transform: translateY(-1px);
        }
        .premium-input::placeholder {
          color: #9ca3af;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f3e8ff;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #9333ea, #7c3aed);
          border-radius: 4px;
        }
      `}</style>
    </>
  );
};

export default OurProperty;