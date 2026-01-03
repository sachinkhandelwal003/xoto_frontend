import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import heroBg from '../../../assets/img/hero-bg.jpg';
import Category from '../Category';
import Products from '../Products';
import { Link } from 'react-router-dom';

const Ecommerce = () => {
    const { t, i18n } = useTranslation("ecommerce");

  const navigate = useNavigate();
  const isRTL = ["ar", "fa", "ur"].includes(i18n.language);
const formatNumber = (num) =>
  new Intl.NumberFormat(i18n.language).format(num);
  

  return (
    <div className="bg-gray-50  font-sans"dir={isRTL ? "rtl" : "ltr"}>
      
      {/* ================= HERO SECTION (Updated to Match Landscaping UI) ================= */}
      <section className="relative flex items-center py-28 justify-center overflow-hidden h-[70vh]">
        {/* Background Image & Gradient */}
        <div className="absolute inset-0">
          <img
            src={heroBg}
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>

        {/* Content Wrapper */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="heading-light mb-6"
          >
             {t("hero.title")}
          </motion.h1>

          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto">
{t("hero.subtitle")}     
     </p>

       


           <div className="flex flex-wrap gap-4 justify-center  pt-4">
                      <Link
                        to="/ecommerce/filter"
                        className="bg-[var(--color-primary)] px-8 py-3 rounded-md shadow-lg"
                      >
        {t("hero.explore")}
                      </Link>
          
                      <Link
                        to="/ecommerce/seller"
                        className="border-2 border-white px-8 py-3 rounded-md hover:bg-white hover:text-black transition"
                      >
        {t("hero.vendor")}
                      </Link>
                    </div>
        </div>
      </section>

      {/* ================= CATEGORIES & PRODUCTS ================= */}
      <Category />
      <Products />

      {/* ================= PROMO BANNER (AR Section) ================= */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-gray-100">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                 {t("ar.title")}
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
{t("ar.desc")} 
             </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Card 1: AR Preview */}
              <div className="bg-gradient-to-br from-[var(--color-primary)]/5 to-purple-50 rounded-xl p-6 border border-gray-200 hover:border-[var(--color-primary)]/30 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-[var(--color-primary)] to-purple-600 rounded-lg flex items-center justify-center mb-6 mx-auto">
                  <span className="text-2xl text-white">📱</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center"> {t("cards.arScan.title")}</h3>
                <p className="text-gray-600 mb-6 text-center">
                  {t("cards.arScan.desc")}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 bg-[var(--color-primary)] text-white font-semibold rounded-md hover:opacity-90 transition-all"
                >
                    {t("cards.arScan.btn")}
                </motion.button>
              </div>

              {/* Card 2: Virtual Staging */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-gray-200 hover:border-blue-300 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-6 mx-auto">
                  <span className="text-2xl text-white">🛋️</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">  {t("cards.virtual.title")}</h3>
                <p className="text-gray-600 mb-6 text-center">
  {t("cards.virtual.desc")}                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-md hover:opacity-90 transition-all"
                >
                   {t("cards.virtual.btn")}
                </motion.button>
              </div>

              {/* Card 3: Measurements */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-gray-200 hover:border-emerald-300 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center mb-6 mx-auto">
                  <span className="text-2xl text-white">📏</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center"> {t("cards.fit.title")}</h3>
                <p className="text-gray-600 mb-6 text-center">
                 {t("cards.fit.desc")}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-md hover:opacity-90 transition-all"
                >
                  {t("cards.fit.btn")}
                </motion.button>
              </div>
            </div>

            {/* Demo Video Section */}
            <div className="mt-16 bg-gradient-to-r from-gray-50 to-white rounded-xl p-8 border border-gray-200">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{t("how.title")}</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-[var(--color-primary)] font-bold">{formatNumber(1)}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{t("how.step1.title")}</p>
                        <p className="text-gray-600 text-sm">{t("how.step1.desc")}</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-[var(--color-primary)] font-bold">{formatNumber(2)}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{t("how.step2.title")}</p>
                        <p className="text-gray-600 text-sm">{t("how.step2.desc")}</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-[var(--color-primary)] font-bold">{formatNumber(3)}</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900"> {t("how.step3.title")}</p>
                        <p className="text-gray-600 text-sm">  {t("how.step3.desc")}</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-1">
                  <div className="bg-white rounded-xl p-6">
                    <div className="aspect-video bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-3xl text-[var(--color-primary)]">▶️</span>
                        </div>
                        <p className="text-gray-900 font-semibold">{t("demo.title")}</p>
                        <p className="text-gray-600 text-sm mt-1"> {t("demo.desc")}</p>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="mt-4 px-6 py-2 bg-[var(--color-primary)] text-white text-sm font-semibold rounded-md hover:opacity-90 transition-all"
                        >
                         {t("demo.btn")}
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Ecommerce;