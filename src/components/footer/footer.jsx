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
import logoNewImage from "../../assets/img/logoNew.png";

const footerData = {
  company: {
    logo: logoNewImage,
    slogan: (
      <p>
        A Unified Ecosystem <br />
        Creating life time <br /> property Value.
      </p>
    ),
    description: (
      <p>
        Scalable. AI–powered. <br />
        Asset–light.
      </p>
    ),
  },

  offerings: [
    { label: "Landscaping", path: "/landscaping" },
    { label: "Interiors", path: "/interiors" },
    { label: "Rentals", path: "/rentals" },
    { label: "Buy", path: "/buy" },
    { label: "Sell", path: "/sell" },
    { label: "Mortgages", path: "/mortgage/services" },
    // { label: "Maintenance", path: "/maintenance" },
  ],

  resources: [
    { label: "Xoto Properties", path: "/properties" },
    { label: "Explore Xoto", path: "/explore" },
    { label: "AI Driven", path: "/ai" },
    { label: "Free Consultation", path: "/consultation" },
    { label: "Hire Freelancers", path: "/freelancers" },
  ],

  knowledge: [
    { label: "About Us", path: "/about" },
    { label: "Knowledge Centre", path: "/knowledge-centre" },
    { label: "Our Sustainability Focus", path: "/sustainability" },
    { label: "Submit Your Feedback", path: "/feedback" },
    { label: "Contact Us", path: "/contact" },
    { label: "Privacy Policy", path: "/privacy" },
    { label: "Terms Of Use", path: "/terms" },
  ],

  social: [
    { name: "Facebook", icon: <Facebook size={18} />, url: "#" },
    { name: "Instagram", icon: <Instagram size={18} />, url: "#" },
    { name: "Twitter", icon: <Twitter size={18} />, url: "#" },
    { name: "Linkedin", icon: <Linkedin size={18} />, url: "#" },
  ],
};

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

const Footer = () => {
  const { company, offerings, resources, knowledge, social } = footerData;

  const [open, setOpen] = useState(null);
  const toggle = (id) => setOpen(open === id ? null : id);

  return (
    <footer className="border-purple-700/30 main-gradient-color text-white relative">
      {/* MOBILE LOGO */}
      <div className="text-center pt-10 lg:hidden">
        <img
          src={company.logo}
          className="h-16 sm:h-20 object-contain mx-auto"
          alt="Xoto logo"
        />
        <p className="text-lg font-semibold mt-2">{company.slogan}</p>
        <p className="text-purple-200 mt-2 text-sm">{company.description}</p>
      </div>

      {/* MOBILE ACCORDIONS */}
      <div className="px-6 sm:px-10 lg:hidden mt-10">
        <Accordion
          title="Our Offerings"
          isOpen={open === 1}
          toggle={() => toggle(1)}
        >
          <ul className="space-y-2 text-purple-200 text-sm">
            {offerings.map((item, i) => (
              <li key={i}>
                <Link to={item.path}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </Accordion>

        <Accordion
          title="Partner Ecosystem"
          isOpen={open === 2}
          toggle={() => toggle(2)}
        >
          <ul className="space-y-2 text-purple-200 text-sm">
            {resources.map((item, i) => (
              <li key={i}>
                <Link to={item.path}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </Accordion>

        <Accordion
          title="About Us"
          isOpen={open === 3}
          toggle={() => toggle(3)}
        >
          <ul className="space-y-2 text-purple-200 text-sm">
            {knowledge.map((item, i) => (
              <li key={i}>
                <Link to={item.path}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </Accordion>

        <Accordion
          title="Location"
          isOpen={open === 4}
          toggle={() => toggle(4)}
        >
          <p className="text-purple-200 text-sm">UAE</p>
        </Accordion>

        <Accordion title="Email" isOpen={open === 5} toggle={() => toggle(5)}>
          <p className="text-purple-200 text-sm">
            For Partners:{" "}
            <span className="text-white">sales.support@xoto.ae</span>
          </p>
          <p className="text-purple-200 text-sm mt-1">
            For Customers: <span className="text-white">info@xoto.ae</span>
          </p>
        </Accordion>
      </div>

      {/* DESKTOP */}
      <div className="hidden lg:block max-w-screen-2xl mx-auto px-24 pt-16">
        <div className="grid grid-cols-6 gap-10 pb-14">
          <div className="col-span-2">
            <img src={company.logo} className="h-20 mb-4" alt="logo" />
            <p className="text-xl font-semibold">{company.slogan}</p>
            <p className="text-purple-200 mt-3">{company.description}</p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase">
              Our Offerings
            </h4>
            <ul className="space-y-2">
              {offerings.map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.path}
                    className="text-purple-200 hover:text-[#C45A34]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase">
              Partner Ecosystem
            </h4>
            <ul className="space-y-2">
              {resources.map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.path}
                    className="text-purple-200 hover:text-[#C45A34]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase">
              About Us
            </h4>
            <ul className="space-y-2">
              {knowledge.map((item, i) => (
                <li key={i}>
                  <Link
                    to={item.path}
                    className="text-purple-200 hover:text-[#C45A34]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase">
              Contact
            </h4>
            <p className="text-purple-200 text-sm">UAE</p>
            <p className="text-purple-200 text-sm mt-3">
              Partners:{" "}
              <span className="text-white">sales.support@xoto.ae</span>
            </p>
            <p className="text-purple-200 text-sm mt-1">
              Customers: <span className="text-white">info@xoto.ae</span>
            </p>

            <div className="flex flex-col gap-4 mt-4 items-end">
              <a className="bg-green-500 p-3 rounded-full" href="#">
                <FaWhatsapp size={20} />
              </a>
              <a className="bg-blue-500 p-3 rounded-full" href="#">
                <Phone size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="w-full border-t border-purple-500/20 mt-6">
        <div className="max-w-screen-xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-purple-300 text-sm">
            ©2025 Xoto. All rights reserved
          </p>

          <div className="flex gap-5">
            {social.map((item, i) => (
              <a
                key={i}
                href={item.url}
                className="text-purple-300 hover:text-white"
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
