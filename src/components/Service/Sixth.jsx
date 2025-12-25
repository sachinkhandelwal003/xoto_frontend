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
    <div className="relative min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 overflow-hidden" style={dmSans}>
      
      {/* WAVES */}
      <img src={wave2} className="absolute top-0 w-full -translate-y-1/2 opacity-90" />
      <img src={wave1} className="absolute bottom-0 w-full translate-y-1/3 opacity-90" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <div className="text-center lg:text-left space-y-6">
          <h1 className="text-4xl sm:text-5xl font-bold">
            {t("hero.title")}
          </h1>

          <p className="text-lg text-[#547593]">
            {t("hero.subtitle")}
          </p>

          <div className="grid gap-4 justify-center lg:justify-start">
            <button className="px-6 py-3 bg-[var(--color-primary)] rounded-lg text-white font-semibold">
              {t("hero.primaryCta")}
            </button>
            <button className="px-6 py-3 border-2 border-purple-600 text-purple-700 rounded-lg">
              {t("hero.secondaryCta")}
            </button>
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl p-8 space-y-5">

          <h3 className="text-2xl font-semibold">
            {t("form.heading")}
          </h3>

          {/* FIRST / LAST NAME */}
          <div className="grid sm:grid-cols-2 gap-4">
            <input name="firstName" placeholder={t("form.firstName")} onChange={handleChange} required className="input" />
            <input name="lastName" placeholder={t("form.lastName")} onChange={handleChange} required className="input" />
          </div>

          {/* EMAIL / PHONE */}
          <div className="grid sm:grid-cols-2 gap-4">
            <input type="email" name="email" placeholder={t("form.email")} onChange={handleChange} required className="input" />

            <div className="flex gap-2">
              <select name="countryCode" onChange={handleChange} className="input">
                <option value="+91">+91</option>
                <option value="+971">+971</option>
              </select>
              <input name="phone" placeholder={t("form.phone")} onChange={handleChange} required className="input w-full" />
            </div>
          </div>

          {/* LOOKING FOR / CITY */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="relative">
              <select name="lookingFor" onChange={handleChange} required className="input pr-10">
                <option value="">{t("form.lookingFor")}</option>
                <option>{t("form.options.homeLoan")}</option>
                <option>{t("form.options.refinance")}</option>
                <option>{t("form.options.personalLoan")}</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2" />
            </div>

            <input name="city" placeholder={t("form.city")} onChange={handleChange} required className="input" />
          </div>

          {/* BUDGET */}
          <input name="budget" placeholder={t("form.budget")} onChange={handleChange} required className="input" />

          <button type="submit" className="w-full py-4 bg-[var(--color-primary)] text-white rounded-lg text-lg font-semibold">
            {t("form.submit")}
          </button>
        </form>
      </div>
    </div>
  );
}
