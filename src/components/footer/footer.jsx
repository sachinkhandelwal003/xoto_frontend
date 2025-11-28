'use client';

import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin, Phone } from 'lucide-react';
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
        Scalable. AI–powered. <br />Asset–light.
      </p>
    ),
  },

  offerings: [
    { label: "Landscaping", path: "/landscaping" },
    { label: "Interiors", path: "/interiors" },
    { label: "Rentals", path: "/rentals" },
    { label: "Buy", path: "/buy" },
    { label: "Sell", path: "/sell" },
    { label: "Mortgages", path: "/mortgages" },
    { label: "Maintenance", path: "/maintenance" },
  ],

  resources: [
    { label: "Xoto Properties", path: "/properties" },
    { label: "Explore Xoto", path: "/explore" },
    { label: "AI Driven", path: "/ai" },
    { label: "Free Consultation", path: "/consultation" },
    { label: "Hire Freelancers", path: "/freelancers" },
  ],

  knowledge: [
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

const Footer = () => {
  const { company, offerings, resources, knowledge, social } = footerData;

  return (
    <footer className="border-purple-700/30 main-gradient-color overflow-hidden">
      <div className="max-w-screen-2xl mx-auto px-6 sm:px-10 lg:px-24 xl:px-36 pt-12">

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 pb-14">

          {/* Company Section */}
          <div className="lg:col-span-2">
            <img
              src={company.logo}
              className="h-16 sm:h-20 object-contain mb-4"
              alt="Xoto logo"
            />

            <p className="text-white font-semibold text-lg sm:text-xl leading-tight">
              {company.slogan}
            </p>
            <p className="text-purple-200 mt-3 text-sm leading-relaxed">
              {company.description}
            </p>
          </div>

          {/* Our Offerings */}
          <div>
            <h4 className="text-white mb-4 font-semibold text-sm uppercase">
              Our Offerings
            </h4>
            <ul className="space-y-2">
              {offerings.map((item, i) => (
                <li key={i}>
                  <Link to={item.path} className="text-purple-200 hover:text-[#C45A34] text-sm">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Partner Ecosystem */}
          <div>
            <h4 className="text-white mb-4 font-semibold text-sm uppercase">
              Partner Ecosystem
            </h4>
            <ul className="space-y-2">
              {resources.map((item, i) => (
                <li key={i}>
                  <Link to={item.path} className="text-purple-200 hover:text-[#C45A34] text-sm">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Knowledge / About Us */}
          <div>
            <h4 className="text-white mb-4 font-semibold text-sm uppercase">About Us</h4>
            <ul className="space-y-2">
              {knowledge.map((item, i) => (
                <li key={i}>
                  <Link to={item.path} className="text-purple-200 hover:text-[#C45A34] text-sm">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Icons */}
          <div className="flex flex-col gap-6">
            {/* Locations */}
            <div>
              <h4 className="text-white mb-2 font-semibold text-sm uppercase">Locations</h4>
              <p className="text-purple-200 text-sm">India | UAE | Saudi Arabia</p>
            </div>

            {/* Email */}
            <div>
              <h4 className="text-white mb-2 font-semibold text-sm uppercase">Email</h4>
              <p className="text-purple-200 text-sm">
                For Partners: <span className="text-white">connect@xoto.ae</span>
              </p>
              <p className="text-purple-200 text-sm mt-1">
                For Customers: <span className="text-white">care@xoto.ae</span>
              </p>
            </div>

            {/* Contact Buttons */}
            <div className="flex sm:flex-row lg:flex-col items-start lg:items-end gap-4 mt-3">
              <a
                href="https://wa.me/1234567890"
                className="bg-green-500 p-3 rounded-full shadow-md text-white hover:bg-green-600"
              >
                <FaWhatsapp size={20} />
              </a>

              <a
                href="tel:1234567890"
                className="bg-blue-500 p-3 rounded-full shadow-md text-white hover:bg-blue-600"
              >
                <Phone size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="w-full border-t border-purple-500/20">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-10 lg:px-20 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-purple-300 text-sm">
            ©2025 Xoto. All rights reserved
          </p>

          <div className="flex gap-5">
            {social.map((item, i) => (
              <a key={i} href={item.url} className="text-purple-300 hover:text-white transition">
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