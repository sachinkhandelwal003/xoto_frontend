import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import interiorImage from "../../assets/img/interior.jpg";
import interImage from "../../assets/img/inter.png";
import wave2 from "../../assets/img/wave/wave2.png";

import {
  TreePine,
  Home,
  Droplets,
  Sparkles,
} from "lucide-react";

import Dreamspacking from "./Dreamspacking";
import Eco from "./Eco";
import Servicelandspacing from "./Servicelandspacing";
import Consultation from "./Consultation";
import TestimonialsSection from "../Service/Fifth";
import QuoteModal from "../modal/QuoteModal";

export default function Landspackng() {
  const { t } = useTranslation(["scape1", "scape2"]);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  /* ================= SERVICES ================= */
  const services = [
    {
      icon: <TreePine className="w-5 h-5" />,
      title: t("services.design", { ns: "scape1" }),
    },
    {
      icon: <Home className="w-5 h-5" />,
      title: t("services.hardscape", { ns: "scape1" }),
    },
  ];

  const services2 = [
    {
      icon: <Droplets className="w-5 h-5" />,
      title: t("services.pool", { ns: "scape1" }),
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      title: t("services.outdoor", { ns: "scape1" }),
    },
  ];

  return (
    <>
      <QuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
      />

      {/* ================= HERO ================= */}
      <section className="relative flex items-center py-28 justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={interiorImage}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6 heading-light"
          >
            {t("hero.title", { ns: "scape1" })}
            <br />
            <span>{t("hero.subtitle", { ns: "scape1" })}</span>
          </motion.h1>

          {/* SERVICES ROW 1 */}
          <div className="grid grid-cols-2 gap-3 max-w-[780px] mx-auto mb-5">
            {services.map((item, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur border border-white/20 rounded-xl py-3"
              >
                <h3 className="text-sm sm:text-base md:text-xl">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>

          {/* SERVICES ROW 2 */}
          <div className="grid grid-cols-2 gap-3 max-w-[850px] mx-auto mb-10">
            {services2.map((item, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur border border-white/20 rounded-xl py-3"
              >
                <h3 className="text-sm sm:text-base md:text-xl">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>

          <Link to="/estimate/calculator">
            <button className="bg-[var(--color-primary)] px-10 py-3 rounded-md text-lg font-bold">
              {t("cta.estimate", { ns: "scape1" })}
            </button>
          </Link>
        </div>
      </section>

      {/* ================= INTERACTIVE BUILDER ================= */}
      <section className="relative bg-[#f5f5f5] pt-24 overflow-hidden">
        <div className="absolute bottom-[-600px] left-0 w-full">
          <img src={wave2} alt="" className="w-full" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl md:text-5xl heading-dark-1">
              {t("services.builder.title", { ns: "scape2" })}
            </h2>

            <p className="text-lg text-[#547593] max-w-md mx-auto lg:mx-0">
              {t("services.builder.description", { ns: "scape2" })}
            </p>

            <Link to="/aiPlanner">
              <button className="bg-[var(--color-primary)] px-10 py-3 rounded-md text-white">
                {t("services.builder.button", { ns: "scape2" })}
              </button>
            </Link>
          </div>

          <img
            src={interImage}
            alt=""
            className="w-full h-full object-cover drop-shadow-2xl"
          />
        </div>
      </section>

      {/* ================= OTHER SECTIONS ================= */}
      <Consultation />
      <Servicelandspacing />
      <Dreamspacking />
      <TestimonialsSection />
      <Eco />
    </>
  );
}
