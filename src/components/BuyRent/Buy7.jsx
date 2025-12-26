import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { apiService } from "../../manageApi/utils/custom.apiservice";

import waveint6 from "../../assets/img/wave/waveint6.png";
import waveint from "../../assets/img/wave/waveint4.png";
import image from "../../assets/img/bggg.png";

export default function HeroSection() {
  const { t, i18n } = useTranslation("buy7");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "",
    phone: "",
    country: "",
    lookingFor: "",
    city: "",
    budget: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // allow digits only for phone
    if (name === "phone" && value && !/^\d*$/.test(value)) return;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validate all fields
    if (Object.values(form).some((v) => !v.trim())) {
      toast.error(t("error"));
      return;
    }

    setLoading(true);

    try {
      const res = await apiService.post("/property/lead", {
        type: form.lookingFor.toLowerCase(),
        name: {
          first_name: form.firstName.trim(),
          last_name: form.lastName.trim(),
        },
        mobile: {
          country_code: form.countryCode,
          number: form.phone,
        },
        email: form.email.trim().toLowerCase(),
        country: form.country === "Dubai" ? "UAE" : form.country,
        preferred_city: form.city,
        budget: form.budget,
      });

      if (res.success) {
        toast.success(t("success"));
        setForm({
          firstName: "",
          lastName: "",
          email: "",
          countryCode: "",
          phone: "",
          country: "",
          lookingFor: "",
          city: "",
          budget: "",
        });
      }
    } catch {
      toast.error(t("genericError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" />

 

      <section className="relative w-full bg-[var(--color-body)] py-16 overflow-hidden">
        {/* Background waves */}
        <div className="absolute top-0 left-0 w-full z-0">
          <img src={waveint6} alt="" className="w-full" />
        </div>
        <div className="absolute -bottom-30 left-0 w-full z-0">
          <img src={waveint} alt="" className="w-full" />
        </div>

        <div className="max-w-8xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT CONTENT */}
          <div className="space-y-10 z-20">
            <h1 className="text-5xl card-heading-1 text-gray-900 ps-20 leading-tight">
              {t("heroTitle")}
            </h1>
            <p className="text-lg text-gray-600 ps-20">
              {t("heroSub")}
            </p>
            <img src={image} alt="" className="w-full max-w-3xl mt-8" />
          </div>

          {/* RIGHT FORM */}
          <div className="z-20">
            <div className="bg-white shadow-[0_0_30px_rgba(92,3,155,0.3)] rounded-3xl p-8 max-w-lg mx-auto border border-purple-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {t("formTitle")}
              </h2>
              <p className="text-gray-700 mb-8">{t("formSub")}</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder={t("firstName")}
                    className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:ring-4 focus:ring-purple-100"
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder={t("lastName")}
                    className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:ring-4 focus:ring-purple-100"
                  />
                </div>

                {/* Email */}
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder={t("email")}
                  className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:ring-4 focus:ring-purple-100"
                />

                {/* Phone */}
                <div className="grid grid-cols-3 gap-3">
                  <select
                    name="countryCode"
                    value={form.countryCode}
                    onChange={handleChange}
                    className="px-4 py-4 rounded-xl border border-gray-300"
                  >
                    <option value="">{t("countryCode")}</option>
                    <option value="+91">+91</option>
                    <option value="+971">+971</option>
                  </select>

                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder={t("phone")}
                    className="col-span-2 px-5 py-4 rounded-xl border border-gray-300"
                  />
                </div>

                {/* Country & Looking For */}
                <div className="grid grid-cols-2 gap-4">
                  <select
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-xl border border-gray-300"
                  >
                    <option value="">{t("country")}</option>
                    <option value="India">India</option>
                    <option value="Dubai">UAE / Dubai</option>
                  </select>

                  <select
                    name="lookingFor"
                    value={form.lookingFor}
                    onChange={handleChange}
                    className="w-full px-5 py-4 rounded-xl border border-gray-300"
                  >
                    <option value="">{t("lookingFor")}</option>
                    <option value="Buy">Buy</option>
                    <option value="Sell">Sell</option>
                    <option value="Rent">Rent</option>
                  </select>
                </div>

                {/* City */}
                <select
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-xl border border-gray-300"
                >
                  <option value="">{t("city")}</option>
                  <option>Pune</option>
                  <option>Mumbai</option>
                  <option>Bangalore</option>
                  <option>Dubai</option>
                  <option>Abu Dhabi</option>
                </select>

                {/* Budget */}
                <input
                  type="text"
                  name="budget"
                  value={form.budget}
                  onChange={handleChange}
                  placeholder={t("budget")}
                  className="w-full px-5 py-4 rounded-xl border border-gray-300"
                />

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[var(--color-primary)] text-white font-bold py-5 rounded-xl"
                >
                  {loading ? t("submitting") : t("submit")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
