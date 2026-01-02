"use client";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";

import whatsappIcon from "../../assets/icons/Homeicons/whatsapp-svgrepo-com (2) 1.png";
import chatIcon from "../../assets/icons/Homeicons/chat-svgrepo-com 1.png";
import facebookIcon from "../../assets/icons/Homeicons/facebook-f 1.png";
import instagramIcon from "../../assets/icons/Homeicons/instagram 1.png";
import twitterIcon from "../../assets/icons/Homeicons/twitter 1.png";
import linkedinIcon from "../../assets/icons/Homeicons/linkedin 1.png";
import logoNewImage from "../../assets/img/logoNew.png";

/* ---------------- ACCORDION ---------------- */
const Accordion = ({ title, children, isOpen, toggle }) => (
  <div className="border-b border-purple-500/20 py-2">
    <button
      onClick={toggle}
      className="w-full flex justify-between items-center py-3 text-white text-lg"
    >
      {title}
      <ChevronDown
        className={`transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
      />
    </button>
    <div
      className={`overflow-hidden transition-all duration-300 ${
        isOpen ? "max-h-96 mt-2" : "max-h-0"
      }`}
    >
      {children}
    </div>
  </div>
);

/* ---------------- FOOTER ---------------- */
export default function Footer() {
  const { t } = useTranslation("footer");
  const [open, setOpen] = useState(null);

  const toggle = (id) => setOpen(open === id ? null : id);

  const offerings = t("offerings", { returnObjects: true });
  const resources = t("resources", { returnObjects: true });
  const knowledge = t("knowledge", { returnObjects: true });
  const company = t("company", { returnObjects: true });

  return (
    <footer className="main-gradient-color text-white relative">

      {/* ================= MOBILE TOP ================= */}
      <div className="relative text-center pt-10 lg:hidden px-6">
        <img src={logoNewImage} className="h-16 mx-auto" alt="Xoto" />

        <p
          className="text-lg font-bold mt-2"
          dangerouslySetInnerHTML={{ __html: company.slogan }}
        />

        <p className="text-purple-200 mt-2 text-sm">
          {company.description}
        </p>

        {/* Mobile Social Icons */}
        <div className="flex justify-center gap-7 mt-4 py-5">
          <img src={facebookIcon} alt="Facebook" className="w-[22px] h-[22px]" />
          <img src={instagramIcon} alt="Instagram" className="w-[22px] h-[22px]" />
          <img src={twitterIcon} alt="Twitter" className="w-[22px] h-[22px]" />
          <img src={linkedinIcon} alt="LinkedIn" className="w-[22px] h-[22px]" />
        </div>

        {/* Floating WhatsApp + Chat */}
        <div className="absolute right-2 top-12 flex flex-col gap-[14px]">
          <div className="w-[53px] h-[53px] rounded-full bg-[#03A4F4] flex items-center justify-center">
            <img src={whatsappIcon} alt="WhatsApp" className="w-[32px] h-[32px]" />
          </div>
          <div className="w-[53px] h-[53px] rounded-full bg-[#32CD32] flex items-center justify-center">
            <img src={chatIcon} alt="Chat" className="w-[28px] h-[28px]" />
          </div>
        </div>
      </div>

      {/* ================= MOBILE ACCORDIONS ================= */}
      <div className="px-6 lg:hidden mt-10">
        <Accordion title={t("titles.offerings")} isOpen={open === 1} toggle={() => toggle(1)}>
          {offerings.map((i, k) => (
            <p key={k} className="text-purple-200 text-sm font-bold">
              {i.label}
            </p>
          ))}
        </Accordion>

        <Accordion title={t("titles.resources")} isOpen={open === 2} toggle={() => toggle(2)}>
          {resources.map((i, k) => (
            <p key={k} className="text-purple-200 text-sm font-bold">
              {i.label}
            </p>
          ))}
        </Accordion>

        <Accordion title={t("titles.knowledge")} isOpen={open === 3} toggle={() => toggle(3)}>
          {knowledge.map((i, k) => (
            <p key={k} className="text-purple-200 text-sm font-bold">
              {i.label}
            </p>
          ))}
        </Accordion>

        <Accordion title={t("titles.location")} isOpen={open === 4} toggle={() => toggle(4)}>
          <p className="text-purple-200 text-sm">{t("locations")}</p>
        </Accordion>

        <Accordion title={t("titles.email")} isOpen={open === 5} toggle={() => toggle(5)}>
          <p className="text-purple-200 text-sm">
            {t("email.labels.partners")}:{" "}
            <span className="text-white">{t("email.partners")}</span>
          </p>
          <p className="text-purple-200 text-sm mt-1">
            {t("email.labels.customers")}:{" "}
            <span className="text-white">{t("email.customers")}</span>
          </p>
        </Accordion>
      </div>

      {/* ================= DESKTOP FOOTER ================= */}
      <div className="hidden lg:block max-w-screen-2xl mx-auto px-14 pt-20">
        <div className="grid grid-cols-5 gap-14 pb-10">

          {/* Logo */}
          <div>
            <img src={logoNewImage} className="w-[163px] h-[65px] mb-4" />
            <p
              className="font-bold text-[20px]"
              dangerouslySetInnerHTML={{ __html: company.slogan }}
            />
            <p className="mt-3 text-white/70">{company.description}</p>
          </div>

          {/* Offerings */}
          <div>
            <h4 className="font-bold text-[24px] mb-4">
              {t("titles.offerings")}
            </h4>
            {offerings.map((i, k) => (
              <p key={k} className="text-white/70">{i.label}</p>
            ))}
          </div>

          {/* Partner */}
          <div>
            <h4 className="font-bold text-[24px] mb-4">
              {t("titles.resources")}
            </h4>
            {resources.map((i, k) => (
              <p key={k} className="text-white/70">{i.label}</p>
            ))}
          </div>

          {/* About */}
          <div>
            <h4 className="font-bold text-[24px] mb-4">
              {t("titles.knowledge")}
            </h4>
            {knowledge.map((i, k) => (
              <p key={k} className="text-white/70">{i.label}</p>
            ))}
          </div>

          {/* Location + Email */}
          <div className="relative">
            <h4 className="font-bold text-[24px] mb-4">
              {t("titles.location")}
            </h4>
            <p>{t("locations")}</p>

            <h4 className="mt-6 mb-2 font-bold">
              {t("titles.email")}
            </h4>

            <p>
              {t("For Partners")}:{" "}
              <strong>{t("email.partners")}</strong>
            </p>
            <p>
              {t("For Customers")}:{" "}
              <strong>{t("email.customers")}</strong>
            </p>

            {/* Floating Icons */}
            <div className="flex flex-col gap-4 mt-6 items-end">
              <div className="w-[53px] h-[53px] bg-[#03A4F4] rounded-full flex items-center justify-center">
                <img src={whatsappIcon} className="w-[32px]" />
              </div>
              <div className="w-[53px] h-[53px] bg-[#32CD32] rounded-full flex items-center justify-center">
                <img src={chatIcon} className="w-[28px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
{/* ================= COPYRIGHT + SOCIALS (DESKTOP) ================= */}
<div className="border-t py-10 border-purple-500/20">
  <div className="max-w-screen-2xl mx-auto px-24 hidden lg:flex items-center justify-between">

    {/* LEFT : Copyright */}
    <p className="text-white/50 text-[16px] leading-[26px]">
      {t("bottom.copyright")}
    </p>

    {/* RIGHT : Social Icons */}
    <div className="flex items-center gap-[40px]">
      <img
        src={facebookIcon}
        alt="Facebook"
        className="w-[24px] h-[24px] cursor-pointer"
      />
      <img
        src={instagramIcon}
        alt="Instagram"
        className="w-[24px] h-[24px] cursor-pointer"
      />
      <img
        src={twitterIcon}
        alt="Twitter"
        className="w-[24px] h-[24px] cursor-pointer"
      />
      <img
        src={linkedinIcon}
        alt="LinkedIn"
        className="w-[24px] h-[24px] cursor-pointer"
      />
    </div>

  </div>

  {/* MOBILE */}
  <div className="lg:hidden py-6 text-center text-white/50 text-sm">
    {t("bottom.copyright")}
  </div>
</div>


    </footer>
  );
}
