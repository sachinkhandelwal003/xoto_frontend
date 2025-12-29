// src/components/property/Property.jsx
import React, { useState } from "react";
import { 
  BedDouble, 
  Bath, 
  Ruler, 
  X, 
  User, 
  Mail, 
  Phone, 
  Globe, 
  Briefcase, 
  MapPin 
} from "lucide-react";
import propertyImg from "../../assets/img/Property.png";
import bgImage from "../../assets/img/buy3bg.png";
// 1. Import Ant Design Notification
import { notification } from 'antd';
import { apiService } from "../../manageApi/utils/custom.apiservice";
import { useTranslation } from "react-i18next";

const Property = () => {
  const { t } = useTranslation("buy3");

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
    preferred_contact: "whatsapp",
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
    // Mobile Validation: Allow only numbers
    if (name === "mobile") {
      const numericValue = value.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
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
        last_name: formData.last_name.trim(),
      },
      // Updated structure for backend
      mobile: { 
        country_code: formData.country_code,
        number: formData.mobile 
      },
      email: formData.email.toLowerCase().trim(),
      occupation: formData.occupation,
      location: formData.location,
      preferred_contact: formData.preferred_contact,
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
        
        // 5. Close Modal
        setOpenModal(false);
        
        // Reset Form
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          country_code: "+971",
          mobile: "",
          occupation: "",
          location: "",
          preferred_contact: "whatsapp",
        });
      }
    } catch (err) {
      console.error(err);
      openNotification('error', 'Submission Failed', err.response?.data?.message || t("toast.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* 6. Render Notification Holder */}
      {contextHolder}

      {/* Section */}
      <div
        className="min-h-screen py-16 px-4 sm:px-6 lg:px-12 bg-cover bg-center relative font-dm"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="max-w-5xl mx-auto text-center mb-14">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            {t("heading.title")}
          </h2>
          <p className="text-white text-lg sm:text-xl mt-4">
            {t("heading.subtitle")}
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
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div className="relative w-full max-w-2xl bg-gradient-to-br from-white via-purple-50 to-violet-50 rounded-3xl shadow-2xl overflow-hidden border border-purple-100">

            <button
              onClick={() => setOpenModal(false)}
              className="absolute top-4 right-4 z-20 bg-gradient-to-r from-red-500 to-pink-500 text-white w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg"
            >
              <X size={24} />
            </button>

            <div className="bg-gradient-to-r from-purple-600 to-violet-600 p-8 text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                {t("modal.title")}
              </h3>
              <p className="text-purple-100 text-lg font-medium">
                {t("modal.subtitle")}
              </p>
            </div>

            <div className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <input
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        placeholder={t("form.firstName")}
                        required
                        className="premium-input pl-12"
                    />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-600">
                        <User size={20} />
                    </div>
                  </div>
                  <div className="relative">
                    <input
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        placeholder={t("form.lastName")}
                        required
                        className="premium-input pl-12"
                    />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-600">
                        <User size={20} />
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="relative">
                    <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t("form.email")}
                        required
                        className="premium-input pl-12"
                    />
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
                    <input
                        name="occupation"
                        value={formData.occupation}
                        onChange={handleChange}
                        placeholder={t("form.occupation")}
                        required
                        className="premium-input pl-12"
                    />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-600">
                        <Briefcase size={20} />
                    </div>
                </div>

                {/* Location */}
                <div className="relative">
                    <input
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder={t("form.location")}
                        required
                        className="premium-input pl-12"
                    />
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-600">
                        <MapPin size={20} />
                    </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-violet-600 text-white py-5 rounded-xl text-lg font-bold hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
                >
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
          padding: 1rem 1.25rem 1rem 3rem; /* Left padding space for icon */
          border-radius: 0.75rem;
          border: 2px solid #e9d5ff; /* Light purple border */
          background: white;
          outline: none;
          font-size: 1rem;
          transition: all 0.3s;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }
        .premium-input:focus {
          border-color: #9333ea; /* Purple-600 */
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
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #7e22ce, #6d28d9);
        }
      `}</style>
    </>
  );
};

function PropertyCard({ deal, onClick }) {
  const { t } = useTranslation("buy3");

  return (
    <div className="bg-white rounded-[30px] shadow-lg overflow-hidden hover:scale-[1.02] transition duration-300">
      <img src={deal.imgUrl} alt={deal.name} className="h-[230px] w-full object-cover" />

      <div className="p-6 bg-gradient-to-b from-[#F7F6F9] to-white">
        <h3 className="text-xl font-semibold text-gray-900">{deal.name}</h3>
        <p className="text-gray-500 text-sm mt-1">{deal.location}</p>

        <div className="flex gap-4 mt-5 text-sm text-gray-700">
          <div className="flex items-center gap-1">
            <Ruler size={16} className="text-purple-600"/> {deal.area}
          </div>
          <div className="flex items-center gap-1">
            <BedDouble size={18} className="text-purple-600"/> {deal.beds} {t("card.bed")}
          </div>
          <div className="flex items-center gap-1">
            <Bath size={16} className="text-purple-600"/> {deal.bathroom} {t("card.bath")}
          </div>
        </div>

        <button
          onClick={onClick}
          className="w-full mt-7 bg-[var(--color-primary)] text-white py-3 rounded-full font-semibold hover:bg-white hover:text-[#6A00D4] border-2 border-transparent hover:border-[#6A00D4] transition"
        >
          {t("card.schedule")}
        </button>
      </div>
    </div>
  );
}

export default Property;