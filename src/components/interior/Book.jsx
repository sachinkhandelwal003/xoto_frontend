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
  const { t } = useTranslation("book");
  console.log("LANG:", i18n.language);
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
          <h2 className="mt-9 text-3xl sm:text-4xl md:text-5xl lg:text-6xl heading-dark-1 text-white">
            {t("title")}
          </h2>
          <p className="mt-5 text-xl md:text-2xl paragraph-light-1">
            {t("description")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full max-w-2xl"
        >
          <div className="rounded-2xl bg-white p-6 sm:p-8 shadow-2xl">
            {/* FORM UNCHANGED */}
            {/* (no layout or responsiveness changes at all) */}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
