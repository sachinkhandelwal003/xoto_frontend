"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { notification } from "antd";
import { useTranslation } from "react-i18next";
import { apiService } from "../../manageApi/utils/custom.apiservice";
import helloImage from "../../assets/img/hello.jpg";

const countryCodes = [
  { value: "+91", label: "+91 India" },
  { value: "+971", label: "+971 UAE" },
  { value: "+966", label: "+966 Saudi Arabia" },
  { value: "+1", label: "+1 USA/Canada" },
  { value: "+44", label: "+44 UK" },
  { value: "+61", label: "+61 Australia" }
];

export default function ConsultationSection() {
  const { t, i18n } = useTranslation("book");

  // console.log("LANG:", i18n.language);
console.log("BOOK TITLE:", t("title"));
  const [loading, setLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    country_code: "+971",
    number: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCountryCode = (value) => {
    setFormData((prev) => ({ ...prev, country_code: value }));
  };

  const handleNumber = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 15);
    setFormData((prev) => ({ ...prev, number: value }));
  };

  const openNotification = (type, title, description) => {
    api[type]({
      message: title,
      description,
      placement: "topRight",
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const validationTitle = t("errors.validationTitle");

    if (!formData.first_name.trim())
      return openNotification("error", validationTitle, t("errors.firstName"));

    if (!formData.last_name.trim())
      return openNotification("error", validationTitle, t("errors.lastName"));

    if (!formData.email.includes("@"))
      return openNotification("error", validationTitle, t("errors.email"));

    if (formData.number.length < 8)
      return openNotification("error", validationTitle, t("errors.mobile"));

    if (!formData.message.trim())
      return openNotification("error", validationTitle, t("errors.message"));

    setLoading(true);

    const payload = {
      type: "consultation",
      consultant_type: "interior",
      name: {
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
      },
      mobile: {
        country_code: formData.country_code,
        number: formData.number,
      },
      email: formData.email.trim().toLowerCase(),
      message: formData.message.trim(),
    };

    try {
      await apiService.post("/property/lead", payload);

      openNotification(
        "success",
        t("success.title"),
        t("success.message")
      );

      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        country_code: "+971",
        number: "",
        message: "",
      });
    } catch (err) {
      openNotification(
        "error",
        t("errors.submitTitle"),
        err.response?.data?.message || t("errors.submit")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-gray-900">
      {contextHolder}

      <img
        src={helloImage}
        alt={t("imageAlt")}
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(92, 3, 155, 0.85) 20%, rgba(3, 164, 244, 0.85) 95%)",
        }}
      />

      <div className="relative z-10 mx-auto flex flex-col lg:flex-row items-start justify-start max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-16 gap-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl text-white text-center lg:text-left"
        >
                 <h2
  className={`
    consultation-title
    mt-9
    text-white
    text-3xl sm:text-4xl md:text-5xl lg:text-6xl
    ${["ru", "tl", "es" , "fr", "de", "pa", "hi", "en", "tr", "ar", "ur", "fa"].includes(i18n.language)
      ? "whitespace-normal"
      : "whitespace-nowrap"}
  `}
>
            {t("title")}
          </h2>
          <p className="mt-5 text-xl md:text-2xl paragraph-light-1">
            {t("description")}
          </p>
        </motion.div>

        {/* Form */}
              <motion.div
                 initial={{ opacity: 0, y: 50 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.8, delay: 0.3 }}
                 className="w-full max-w-2xl"
               >
                 <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-2xl">
                   <form onSubmit={onSubmit} className="space-y-4">
       
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                       <div>
                         <label className="block text-sm font-semibold text-gray-700 mb-1">
                           {t("form.firstName")} <sup className="text-purple-600">*</sup>
                         </label>
                         <input
                           type="text"
                           name="first_name"
                           value={formData.first_name}
                           onChange={handleChange}
                           className="w-full rounded-xl border border-gray-300 px-4 py-2.5"
                            placeholder={t("form.firstName")}
                         />
                       </div>
       
                       <div>
                         <label className="block text-sm font-semibold text-gray-700 mb-1">
                           {t("form.lastName")} <sup className="text-purple-600">*</sup>
                         </label>
                         <input
                           type="text"
                           name="last_name"
                           value={formData.last_name}
                           onChange={handleChange}
                           className="w-full rounded-xl border border-gray-300 px-4 py-2.5"
                           placeholder={t("form.lastName")}
                         />
                       </div>
                     </div>
       
                     <div>
                       <label className="block text-sm font-semibold text-gray-700 mb-1">
                         {t("form.email")} <sup className="text-purple-600">*</sup>
                       </label>
                       <input
                         type="email"
                         name="email"
                         value={formData.email}
                         onChange={handleChange}
                         className="w-full rounded-xl border border-gray-300 px-4 py-2.5"
                         placeholder={t("form.email")}
                       />
                     </div>
       
                     <div>
                       <label className="block text-sm font-semibold text-gray-700 mb-1">
                         {t("form.mobile")} <sup className="text-purple-600">*</sup>
                       </label>
                       <div className="flex gap-2">
                         <select
                           value={formData.country_code}
                           onChange={(e) => handleCountryCode(e.target.value)}
                           className="rounded-xl border border-gray-300 px-3 py-2.5"
                         >
                           {countryCodes.map((c) => (
                             <option key={c.value} value={c.value}>
                               {c.label}
                             </option>
                           ))}
                         </select>
                         <input
                           type="text"
                           value={formData.number}
                           onChange={handleNumber}
                           className="flex-1 rounded-xl border border-gray-300 px-4 py-2.5"
                           placeholder={t("form.mobile")}
                         />
                       </div>
                     </div>
       
                     <div>
                       <label className="block text-sm font-semibold text-gray-700 mb-1">
                         {t("form.message")} <sup className="text-purple-600">*</sup>
                       </label>
                       <textarea
                         name="message"
                         value={formData.message}
                         onChange={handleChange}
                         rows={5}
                         className="w-full rounded-xl border border-gray-300 px-5 py-2"
                         placeholder={t("form.message")}
                       />
                     </div>
       
                     <motion.button
                       type="submit"
                       disabled={loading}
                       className="w-full rounded-xl bg-gradient-to-r from-purple-700 to-purple-900 py-3.5 text-lg font-bold text-white"
                     >
                       {loading ? t("buttons.submitting") : t("buttons.submit")}
                     </motion.button>
                   </form>
       
                   <p className="text-center text-sm text-gray-500 mt-4">
                     {t("privacy")}
                   </p>
                 </div>
               </motion.div>
      </div>
    </section>
  );
}
