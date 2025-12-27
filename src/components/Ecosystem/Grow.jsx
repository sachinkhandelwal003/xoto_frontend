"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import GrowImage from "../../assets/img/Grow.png";
import wave1 from "../../assets/img/wave/wave1.png";

const CtaSection = () => {
  const { t } = useTranslation("cta");

  const [openModal, setOpenModal] = useState(false);
  const [toast, setToast] = useState(null);

  const [name, setName] = useState("");
  const [inquiryType, setInquiryType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !inquiryType.trim()) {
      setToast(t("toast.error"));
      setTimeout(() => setToast(null), 3000);
      return;
    }

    setToast(
      t("toast.success", {
        name,
        inquiryType,
      })
    );

    setOpenModal(false);
    setName("");
    setInquiryType("");

    setTimeout(() => setToast(null), 3500);
  };

  return (
    <>
      <section className="relative w-full flex justify-center items-center py-12 px-6 md:h-[450px]">
        <div className="absolute bottom-[-20px] lg:bottom-[-70px] left-0 w-full z-0 overflow-hidden">
          <img
            src={wave1}
            alt=""
            className="w-full min-w-[140%] -ml-[20%] scale-[1.8] lg:scale-100 lg:min-w-full lg:ml-0 pointer-events-none select-none"
          />
        </div>

        <div className="max-w-6xl relative banner-gradient-color rounded-2xl text-white flex flex-col md:flex-row justify-between items-center md:items-start p-8 md:p-14 gap-6 text-center md:text-left">
          <div className="md:w-2/3 relative z-10">
            <h2 className="text-3xl md:text-5xl font-extrabold leading-snug heading-light mb-6">
              {t("title")}
            </h2>

            <button
              onClick={() => setOpenModal(true)}
              className="bg-[#5C039B] px-6 py-3 rounded-md font-semibold text-white shadow-md transition"
            >
              {t("ctaButton")}
            </button>
          </div>

          <div className="mt-6 md:mt-0 md:absolute md:bottom-0 md:right-0">
            <img
              src={GrowImage}
              alt=""
              className="object-contain h-56 md:h-80 drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      {openModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[999]">
          <div className="bg-white w-[90%] max-w-md p-6 rounded-xl shadow-xl relative">
            <button
              onClick={() => setOpenModal(false)}
              className="absolute right-3 top-3 text-gray-500 hover:text-black text-xl"
            >
              ×
            </button>

            <h2 className="text-2xl font-bold mb-4 text-center">
              {t("modal.title")}
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="text-sm font-medium">{t("form.name")} *</label>
                <input
                  className="w-full border px-3 py-2 rounded-md"
                  placeholder={t("form.namePlaceholder")}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="text-sm font-medium">{t("form.email")}</label>
                <input
                  type="email"
                  className="w-full border px-3 py-2 rounded-md"
                  placeholder={t("form.emailPlaceholder")}
                />
              </div>

              <div>
                <label className="text-sm font-medium">{t("form.phone")}</label>
                <div className="flex gap-2">
                  <select className="border px-3 py-2 rounded-md">
                    <option value="+971">🇦🇪 UAE +971</option>
                    <option value="+91">🇮🇳 India +91</option>
                  </select>
                  <input
                    type="tel"
                    className="w-full border px-3 py-2 rounded-md"
                    placeholder={t("form.phonePlaceholder")}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">
                  {t("form.inquiry")} *
                </label>
                <select
                  className="w-full border px-3 py-2 rounded-md"
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value)}
                >
                  <option value="">{t("form.select")}</option>
                  {t("form.options", { returnObjects: true }).map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">
                  {t("form.message")}
                </label>
                <textarea
                  className="w-full border px-3 py-2 rounded-md"
                  rows="4"
                  placeholder={t("form.messagePlaceholder")}
                />
              </div>

              <button
                type="submit"
                className="bg-[#5C039B] w-full py-3 rounded-md text-white font-semibold"
              >
                {t("form.submit")}
              </button>
            </form>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed top-0 left-1/2 -translate-x-1/2 bg-[#5C039B] text-white px-5 py-4 rounded-lg shadow-lg whitespace-pre-line text-sm font-medium z-[9999]">
          {toast}
        </div>
      )}
    </>
  );
};

export default CtaSection;
