// src/components/property/Property.jsx
import React, { useState } from "react";
import { FaBed, FaBath, FaRulerCombined } from "react-icons/fa";
import propertyImg from "../../assets/img/Property.png";
import bgImage from "../../assets/img/buy3bg.png";
import toast, { Toaster } from "react-hot-toast";
import { apiService } from "../../manageApi/utils/custom.apiservice";
import { useTranslation } from "react-i18next";

const Property = () => {
  const { t } = useTranslation("buy3");

  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      type: "schedule_visit",
      name: {
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
      },
      mobile: { number: formData.mobile.replace(/\D/g, "").slice(-10) },
      email: formData.email.toLowerCase().trim(),
      occupation: formData.occupation,
      location: formData.location,
      preferred_contact: formData.preferred_contact,
    };

    try {
      const res = await apiService.post("/property/lead", payload);

      if (res.success) {
        toast.success(t("toast.success"));
        setOpenModal(false);
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          mobile: "",
          occupation: "",
          location: "",
          preferred_contact: "whatsapp",
        });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || t("toast.error"));
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
              ✕
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder={t("form.firstName")}
                    required
                    className="premium-input"
                  />
                  <input
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    placeholder={t("form.lastName")}
                    required
                    className="premium-input"
                  />
                </div>

                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t("form.email")}
                  required
                  className="premium-input"
                />

                <input
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder={t("form.phone")}
                  required
                  className="premium-input"
                />

                <input
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  placeholder={t("form.occupation")}
                  required
                  className="premium-input"
                />

                <input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder={t("form.location")}
                  required
                  className="premium-input"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-violet-600 text-white py-5 rounded-xl text-lg font-bold hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                >
                  {loading ? t("actions.loading") : t("actions.submit")}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
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
            <FaRulerCombined /> {deal.area}
          </div>
          <div className="flex items-center gap-1">
            <FaBed /> {deal.beds} {t("card.bed")}
          </div>
          <div className="flex items-center gap-1">
            <FaBath /> {deal.bathroom} {t("card.bath")}
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
