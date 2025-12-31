import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import wave1 from "../../assets/img/wave/waveint2.png";
import wave2 from "../../assets/img/wave/wave2.png";

const dmSans = { fontFamily: "'DM Sans', sans-serif" };

export default function Sixth() {
  const { t } = useTranslation("mort6");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "+91",
    phone: "",
    lookingFor: "",
    city: "",
    budget: ""
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#F8F4FF] via-[#F4EEFF] to-[#E9F1FF] overflow-hidden" style={dmSans}>
      
      {/* WAVES */}
      <img src={wave2} className="absolute top-15 w-full -translate-y-2/3 opacity-90" alt="" />
      <img src={wave1} className="absolute bottom-0 w-full translate-y-2/4 opacity-90" alt="" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-10 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 ">

        {/* LEFT CONTENT */}
        <div className="w-full lg:max-w-[600px] text-center lg:text-left space-y-6 mx-auto lg:mx-0 lg:ms-10">

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0F172A] leading-tight lg:leading-extratight">
            {t("hero.title")}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-[#5A7BA1] leading-tight max-w-[360px] mx-auto lg:mx-0">
            {t("hero.subtitle")}
          </p>

          {/* CTA Buttons */}
         <div className="flex flex-col gap-3 pt-2 items-center lg:items-start">

            <button className="w-full sm:w-[240px] py-3 bg-[#5C039B] hover:bg-[#4a027c] rounded-lg text-white font-medium text-[14px] shadow-md transition">
              {t("hero.primaryCta")}
            </button>

            <button className="w-full sm:w-[240px] py-3 border border-[#5C039B] text-[#5C039B] rounded-lg font-medium text-[14px] hover:bg-purple-50 transition">
              {t("hero.secondaryCta")}
            </button>

          </div>
        </div>

        {/* FORM - Responsive Layout Matching PartnerEcosystemSection */}
        <div className="bg-white rounded-3xl shadow-2xl p-5 md:p-8 space-y-5 w-full">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-2">
            {t("form.heading")}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">

            {/* FIRST / LAST NAME (Forced 2 Columns on Mobile) */}
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="w-full min-w-0">
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                  {t("form.firstName")}*
                </label>
                <input
                  name="firstName"
                  onChange={handleChange}
                  required
                  className="w-full px-2 py-2 md:px-4 md:py-3 text-sm md:text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition"
                />
              </div>

              <div className="w-full min-w-0">
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                  {t("form.lastName")}*
                </label>
                <input
                  name="lastName"
                  onChange={handleChange}
                  required
                  className="w-full px-2 py-2 md:px-4 md:py-3 text-sm md:text-base border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition"
                />
              </div>
            </div>

            {/* EMAIL / PHONE (Forced 2 Columns on Mobile) */}
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="w-full min-w-0">
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                  {t("form.email")}*
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  required
                  className="w-full px-2 py-2 md:px-4 md:py-3 text-sm md:text-base border border-gray-300 rounded-xl outline-none"
                />
              </div>

              <div className="w-full min-w-0">
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                  {t("form.phone")}*
                </label>
                <div className="flex gap-1 md:gap-2">
                  <select
                    name="countryCode"
                    onChange={handleChange}
                    className="px-1 py-2 md:px-3 md:py-3 text-sm md:text-base border border-gray-300 rounded-xl w-[70px] md:w-24 outline-none"
                  >
                    <option value="+91">+91</option>
                    <option value="+971">+971</option>
                  </select>

                  <input
                    name="phone"
                    onChange={handleChange}
                    required
                    className="w-full px-2 py-2 md:px-4 md:py-3 text-sm md:text-base border border-gray-300 rounded-xl outline-none"
                  />
                </div>
              </div>
            </div>

            {/* LOOKING FOR / CITY (Forced 2 Columns on Mobile) */}
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="relative w-full min-w-0">
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                  {t("form.lookingFor")}*
                </label>
                <div className="relative">
                  <select
                    name="lookingFor"
                    onChange={handleChange}
                    required
                    className="w-full px-2 py-2 md:px-4 md:py-3 text-sm md:text-base border border-gray-300 rounded-xl appearance-none pr-6 md:pr-10 outline-none"
                  >
                    <option value="">{t("form.select")}</option>
                    <option value="homeLoan">{t("form.options.homeLoan")}</option>
                    <option value="refinance">{t("form.options.refinance")}</option>
                    <option value="personalLoan">{t("form.options.personalLoan")}</option>
                  </select>
                  <ChevronDown
                    className="absolute right-1 md:right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={16}
                  />
                </div>
              </div>

              <div className="w-full min-w-0">
                <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                  {t("form.city")}*
                </label>
                <input
                  name="city"
                  onChange={handleChange}
                  required
                  className="w-full px-2 py-2 md:px-4 md:py-3 text-sm md:text-base border border-gray-300 rounded-xl outline-none"
                />
              </div>
            </div>

            {/* BUDGET (Full width) */}
            <div className="w-full min-w-0">
              <label className="block text-xs md:text-sm font-medium text-gray-700 mb-1">
                {t("form.budget")}*
              </label>
              <input
                name="budget"
                onChange={handleChange}
                required
                className="w-full px-2 py-2 md:px-4 md:py-3 text-sm md:text-base border border-gray-300 rounded-xl outline-none"
              />
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="w-full py-3 md:py-4 text-sm md:text-lg bg-[#5C039B] hover:bg-[#5B21B6] text-white rounded-xl font-semibold shadow-lg transition"
            >
              {t("form.submit")}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}