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
      <img src={wave2} className="absolute top-28 w-full -translate-y-2/3 opacity-90" />
      <img src={wave1} className="absolute bottom-0 w-full translate-y-2/4 opacity-90" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 grid lg:grid-cols-2 gap-16 items-center">

   {/* LEFT CONTENT */}
<div className="max-w-[470px] -mx- text-left space-y-6 -mt-19">

  {/* Title */}
  <h1 className="text-5xl  font-bold text-[#0F172A] leading-extratight">
    {t("hero.title")}
  </h1>

  {/* Subtitle */}
  <p className="text-lg text-[#5A7BA1] leading-tight max-w-[360px]">
    {t("hero.subtitle")}
  </p>

  {/* CTA Buttons */}
  <div className="flex flex-col gap-3 pt-2">

    <button className="w-[240px] py-3 bg-[#5C039B] hover:bg-[#4a027c] rounded-lg text-white font-medium text-[14px] shadow-md transition">
      {t("hero.primaryCta")}
    </button>

    <button className="w-[240px] py-3 border border-[#5C039B] text-[#5C039B] rounded-lg font-medium text-[14px] hover:bg-purple-50 transition">
      {t("hero.secondaryCta")}
    </button>

  </div>
</div>



       {/* FORM */}
<div className="bg-white rounded-3xl shadow-2xl p-8 space-y-6">
  <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">
    {t("form.heading")}
  </h3>

  <form onSubmit={handleSubmit} className="space-y-6">

    {/* FIRST / LAST NAME */}
    <div className="grid sm:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t("form.firstName")}*
        </label>
        <input
          name="firstName"
          placeholder={t("form.firstName")}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t("form.lastName")}*
        </label>
        <input
          name="lastName"
          placeholder={t("form.lastName")}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
        />
      </div>
    </div>

    {/* EMAIL / PHONE */}
    <div className="grid sm:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t("form.email")}*
        </label>
        <input
          type="email"
          name="email"
          placeholder={t("form.email")}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t("form.phone")}*
        </label>
        <div className="flex gap-2">
          <select
            name="countryCode"
            onChange={handleChange}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none w-24"
          >
            <option value="+91">+91</option>
            <option value="+971">+971</option>
          </select>

          <input
            name="phone"
            placeholder={t("form.phone")}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
          />
        </div>
      </div>
    </div>

    {/* LOOKING FOR / CITY */}
    <div className="grid sm:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t("form.lookingFor")}*
        </label>
        <div className="relative">
          <select
            name="lookingFor"
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none appearance-none pr-10"
          >
            <option value="">{t("form.select")}</option>
            <option value="homeLoan">{t("form.options.homeLoan")}</option>
            <option value="refinance">{t("form.options.refinance")}</option>
            <option value="personalLoan">{t("form.options.personalLoan")}</option>
          </select>

          <ChevronDown
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t("form.city")}*
        </label>
        <input
          name="city"
          placeholder={t("form.city")}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
        />
      </div>
    </div>

    {/* BUDGET */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {t("form.budget")}*
      </label>
      <input
        name="budget"
        placeholder={t("form.budget")}
        onChange={handleChange}
        required
        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
      />
    </div>

    {/* SUBMIT BUTTON */}
    <button
      type="submit"
      className="w-full py-4 bg-[#5C039B] hover:bg-[#5B21B6] text-white rounded-xl text-lg font-semibold shadow-lg transition duration-300 mt-4"
    >
      {t("form.submit")}
    </button>
  </form>
</div>

        
      </div>
    </div>
  );
}