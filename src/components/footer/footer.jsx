"use client";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import whatsappIcon from "../../assets/icons/Homeicons/whatsapp-svgrepo-com (2) 1.png";
import chatIcon from "../../assets/icons/Homeicons/chat-svgrepo-com 1.png";
import facebookIcon from '../../assets/icons/Homeicons/facebook-f 1.png'
import instagramIcon from '../../assets/icons/Homeicons/instagram 1.png'
import twitterIcon from '../../assets/icons/Homeicons/twitter 1.png'
import linkedinIcon from '../../assets/icons/Homeicons/linkedin 1.png'
import {
  ChevronDown,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Phone,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import logoNewImage from "../../assets/img/logoNew.png";

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
          className="text-lg  font-bold mt-2 "
          dangerouslySetInnerHTML={{ __html: company.slogan }}
        />

        <p className="text-purple-200 mt-2 text-sm">{company.description}</p>

        {/* Mobile social icons */}
      <div className="flex justify-center gap-7 mt-4 py-5">
  <img
    src={facebookIcon}
    alt="Facebook"
    className="w-[22px] h-[22px] cursor-pointer"
  />
  <img
    src={instagramIcon}
    alt="Instagram"
    className="w-[22px] h-[22px] cursor-pointer"
  />
  <img
    src={twitterIcon}
    alt="Twitter"
    className="w-[22px] h-[22px] cursor-pointer"
  />
  <img
    src={linkedinIcon}
    alt="LinkedIn"
    className="w-[22px] h-[22px] cursor-pointer"
  />
</div>

        {/* Mobile WhatsApp + Chat icons */}
<div className="absolute right-6 top-44 flex flex-col gap-[14px]">
  {/* WhatsApp */}
  <div className="w-[53px] h-[53px] rounded-full bg-[#03A4F4] flex items-center justify-center">
    <img
      src={whatsappIcon}
      alt="WhatsApp"
      className="w-[32px] h-[32px]"
    />
  </div>

  {/* Chat */}
  <div className="w-[53px] h-[53px] rounded-full bg-[#32CD32] flex items-center justify-center">
    <img
      src={chatIcon}
      alt="Chat"
      className="w-[28px] h-[28px]"
    />
  </div>
</div>

     
      </div>

      {/* ================= MOBILE ACCORDIONS ================= */}
      <div className="px-6 lg:hidden mt-10">
        <Accordion
          title="Our Offerings"
          isOpen={open === 1}
          toggle={() => toggle(1)}
        >
          <ul className="space-y-2 text-purple-200 text-sm text-bold">
            {offerings.map((i, k) => (
              <li key={k}>
                <Link to={i.path}>{i.label}</Link>
              </li>
            ))}
          </ul>
        </Accordion>

        <Accordion
          title="Partner Ecosystem"
          isOpen={open === 2}
          toggle={() => toggle(2)}
        >
          <ul className="space-y-2 text-purple-200 text-sm text-bold">
            {resources.map((i, k) => (
              <li key={k}>
                <Link to={i.path}>{i.label}</Link>
              </li>
            ))}
          </ul>
        </Accordion>

        <Accordion
          title="About Us"
          isOpen={open === 3}
          toggle={() => toggle(3)}
        >
          <ul className="space-y-2 text-purple-200 text-bold text-sm">
            {knowledge.map((i, k) => (
              <li key={k}>
                <Link to={i.path}>{i.label}</Link>
              </li>
            ))}
          </ul>
        </Accordion>

        <Accordion
          title="Location"
          isOpen={open === 4}
          toggle={() => toggle(4)}
        >
          <p className="text-purple-200 text-sm text-bold">UAE</p>
        </Accordion>

        <Accordion title="Email" isOpen={open === 5} toggle={() => toggle(5)}>
          <p className="text-purple-200 text-sm text-bold">
            For Partners: <span className="text-white">connect@xoto.ae</span>
          </p>
          <p className="text-purple-200 text-sm mt-1">
            For Customers: <span className="text-white">care@xoto.ae</span>
          </p>
        </Accordion>
      </div>

      {/* ================= DESKTOP FOOTER ================= */}
      <div className="hidden lg:block max-w-screen-2xl mx-auto px-24 pt-20">
        <div className="grid grid-cols-5 gap-14 pb-16">
          {/* Logo */}
          <div>
            <img
              src={logoNewImage}
              alt="Xoto logo"
              className="w-[163px] h-[65px] mb-4 object-contain"
            />

            <p
              className="font-bold text-[24px] leading-[140%] tracking-[-0.01em] text-white max-w-[270px]  "
              dangerouslySetInnerHTML={{ __html: company.slogan }}
            />

            <p className="mt-3 max-w-[243px] text-[20px] leading-[24px] font-medium text-white/70">
              {company.description}
            </p>
          </div>

          {/* Offerings */}
          <div>
            <h4 className="font-bold text-[24px] leading-[36px] text-white mb-4">
              Our Offerings
            </h4>

            {offerings.map((i, k) => (
              <p
                key={k}
                className="text-[20px] leading-[38px] font-medium text-white/70"
              >
                {i.label}
              </p>
            ))}
          </div>

          {/* Partner */}
          <div>
            <h4 className="font-bold text-[24px] leading-[36px] text-white mb-4">
              Partner Ecosystem
            </h4>
            {resources.map((i, k) => (
              <p
                key={k}
                className="text-[20px] leading-[38px] font-medium text-white/70"
              >
                {i.label}
              </p>
            ))}
          </div>

          {/* About */}
          <div>
            <h4 className="font-bold text-[24px] leading-[36px] text-white mb-4">
              About Us
            </h4>
            {knowledge.map((i, k) => (
              <p
                key={k}
                className="text-[20px] leading-[38px] font-medium text-white/70"
              >
                {i.label}
              </p>
            ))}
          </div>

          {/* Location + Email */}
          <div className="relative">
            <h4 className="font-bold text-[24px] leading-[36px] text-white mb-4">
              Locations
            </h4>
            <p className="text-[20px] leading-[38px] font-extrabold text-white whitespace-nowrap">
              India&nbsp;|&nbsp;UAE&nbsp;|&nbsp;Saudi Arabia
            </p>

            <h4 className="mt-6 mb-2 font-bold text-[24px] leading-[36px] text-white">
              Email
            </h4>

            <p className="text-[20px] leading-[38px] text-white whitespace-nowrap">
              <span className="font-medium">For Partners:</span>{" "}
              <span className="font-bold">connect@xoto.ae</span>
            </p>

            <p className="text-[20px] leading-[38px] text-white whitespace-nowrap">
              <span className="font-medium">For Customers:</span>{" "}
              <span className="font-bold">care@xoto.ae</span>
            </p>

           <div className="flex flex-col gap-[14px] mt-6 items-end">
  {/* WhatsApp */}
  <div className="w-[53px] h-[53px] rounded-full bg-[#03A4F4] flex items-center justify-center">
    <img
      src={whatsappIcon}
      alt="WhatsApp"
      className="w-[32px] h-[32px]"
    />
  </div>

  {/* Chat / Call */}
  <div className="w-[53px] h-[53px] rounded-full bg-[#32CD32] flex items-center justify-center">
    <img
      src={chatIcon}
      alt="Chat"
      className="w-[28px] h-[28px]"
    />
  </div>
</div>

          </div>
        </div>
      </div>

    {/* ================= COPYRIGHT + SOCIALS (DESKTOP) ================= */}

{/* ================= COPYRIGHT + SOCIALS ================= */}
<div className="border-t py-10 border-purple-500/20">
  {/* Desktop */}
  <div className="max-w-screen-2xl mx-auto px-24 h-[26px] hidden lg:flex items-center justify-between">
    {/* Left */}
    <p className="text-white/50 text-[16px] leading-[26px]">
      ©2021 XOTO. All rights reserved
    </p>

    {/* Right */}
    <div className="flex items-center gap-[40px] h-[24px]">
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

  {/* Mobile */}
  <div className="lg:hidden py-6 text-center text-white/50 text-sm">
    ©2021 XOTO. All rights reserved
  </div>
</div>
    

    </footer>
  );
}
