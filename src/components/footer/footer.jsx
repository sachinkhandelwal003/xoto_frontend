"use client";

import React, { useState } from "react";
import { Link } from "react-router-dom";
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
        className={`transition-transform ${
          isOpen ? "rotate-180" : "rotate-0"
        }`}
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

        <p className="text-purple-200 mt-2 text-sm">
          {company.description}
        </p>

        {/* Mobile social icons */}
        <div className="flex justify-center gap-7 mt-4">
          <Facebook size={18} className="text-green-400" />
          <Instagram size={18} className="text-green-400" />
          <Twitter size={18} className="text-green-400" />
          <Linkedin size={18} className="text-green-400" />
        </div>

        {/* Mobile WP + Call */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
            <FaWhatsapp size={18} />
          </div>
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
            <Phone size={18} />
          </div>
        </div>
      </div>

      {/* ================= MOBILE ACCORDIONS ================= */}
      <div className="px-6 lg:hidden mt-10">
        <Accordion title="Our Offerings" isOpen={open === 1} toggle={() => toggle(1)}>
          <ul className="space-y-2 text-purple-200 text-sm text-bold">
            {offerings.map((i, k) => (
              <li key={k}><Link to={i.path}>{i.label}</Link></li>
            ))}
          </ul>
        </Accordion>

        <Accordion title="Partner Ecosystem" isOpen={open === 2} toggle={() => toggle(2)}>
          <ul className="space-y-2 text-purple-200 text-sm text-bold">
            {resources.map((i, k) => (
              <li key={k}><Link to={i.path}>{i.label}</Link></li>
            ))}
          </ul>
        </Accordion>

        <Accordion title="About Us" isOpen={open === 3} toggle={() => toggle(3)}>
          <ul className="space-y-2 text-purple-200 text-bold text-sm">
            {knowledge.map((i, k) => (
              <li key={k}><Link to={i.path}>{i.label}</Link></li>
            ))}
          </ul>
        </Accordion>

        <Accordion title="Location" isOpen={open === 4} toggle={() => toggle(4)}>
          <p className="text-purple-200 text-sm text-bold">
           UAE
          </p>
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
            <img src={logoNewImage} className="h-20 mb-4" alt="logo" />
            <p
              className="text-xl font-semibold"
              dangerouslySetInnerHTML={{ __html: company.slogan }}
            />
            <p className="text-purple-200 mt-3">
              {company.description}
            </p>
          </div>

          {/* Offerings */}
          <div>
            <h4 className="font-semibold mb-4">Our Offerings</h4>
            {offerings.map((i, k) => (
              <p key={k} className="text-purple-200">{i.label}</p>
            ))}
          </div>

          {/* Partner */}
          <div>
            <h4 className="font-semibold mb-4">Partner Ecosystem</h4>
            {resources.map((i, k) => (
              <p key={k} className="text-purple-200">{i.label}</p>
            ))}
          </div>

          {/* About */}
          <div>
            <h4 className="font-semibold mb-4">About Us</h4>
            {knowledge.map((i, k) => (
              <p key={k} className="text-purple-200">{i.label}</p>
            ))}
          </div>

          {/* Location + Email */}
          <div className="relative">
            <h4 className="font-semibold mb-4">Locations</h4>
            <p className="text-purple-200">UAE </p>

            <h4 className="font-semibold mt-6 mb-2">Email</h4>
            <p className="text-purple-200">For Partners: connect@xoto.ae</p>
            <p className="text-purple-200">For Customers: care@xoto.ae</p>

            <div className="flex flex-col gap-4 mt-6 items-end">
              <div className="bg-green-500 p-3 rounded-full">
                <FaWhatsapp />
              </div>
              <div className="bg-green-500 p-3 rounded-full">
                <Phone />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= COPYRIGHT ================= */}
      <div className="border-t border-purple-500/20 py-6 text-center text-purple-300 text-sm">
        ©2021 XOTO. All rights reserved
      </div>
    </footer>
  );
}
