'use client';

import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import logoNewImage from "../../assets/img/logoNew.png";

const footerData = {
  company: {
    logo: logoNewImage,
    slogan: "Transforming spaces with stunning interior designs.",
    description:
      "We create beautiful, functional spaces tailored to your lifestyle and preferences.",
  },
  quickLinks: [
    { label: "Interior Design", path: "/services/interior-design" },
    { label: "Architecture", path: "/services/architecture" },
    { label: "Home Staging", path: "/services/home-staging" },
    { label: "Space Planning", path: "/services/space-planning" },
    { label: "3D Rendering", path: "/services/3d-rendering" },
  ],
  resources: [
    { label: "Xoto Properties", path: "/properties" },
    { label: "Explore Xoto", path: "/explore" },
    { label: "AI Driven", path: "/blog" },
    { label: "Free Consultation", path: "/consultation" },
    { label: "Hire Freelancers", path: "/freelancers" },
  ],
  ecommerce: [
    { label: "Furniture Shop", path: "/shop/furniture" },
    { label: "Lighting", path: "/shop/lighting" },
    { label: "Decor", path: "/shop/decor" },
    { label: "Materials", path: "/shop/materials" },
    { label: "Sale Items", path: "/shop/sale" },
  ],
  support: [
    { label: "Raise Issue", path: "/support/raise-issue" },
    { label: "My Issues", path: "/support/my-issues" },
    { label: "Contact Us", path: "/support/contact" },
    { label: "FAQ", path: "/support/faq" },
    { label: "Live Chat", path: "/support/chat" },
  ],
  legal: [
    { label: "Privacy Policy", path: "/privacy" },
    { label: "Terms & Conditions", path: "/terms" },
    { label: "Cookie Policy", path: "/cookies" },
    { label: "Shipping Policy", path: "/shipping" },
    { label: "Return Policy", path: "/returns" },
  ],
  social: [
    { name: "Facebook", icon: <Facebook size={18} />, url: "#" },
    { name: "Instagram", icon: <Instagram size={18} />, url: "#" },
    { name: "Twitter", icon: <Twitter size={18} />, url: "#" },
    { name: "Linkedin", icon: <Linkedin size={18} />, url: "#" },
  ],
};

const Footer = () => {
  const { company, quickLinks, resources, ecommerce, support, legal, social } = footerData;

  return (
    <footer
      className="pt-16 border-t border-purple-700/30"
      style={{
        background: "linear-gradient(174.96deg, #5C039B 4.05%, #1F0135 99.75%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 pb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={company.logo}
                alt="Company Logo"
                className="h-16 w-auto object-contain"
              />
              <h2 className="text-2xl font-bold text-white">
                {company.name}
              </h2>
            </div>

            <p className="text-purple-200 mt-3">{company.slogan}</p>
            <p className="text-purple-300 mt-2 text-sm">{company.description}</p>

            {/* Social Media */}
            <div className="mt-6">
              <h4 className="font-medium text-purple-100 mb-3">Follow Us</h4>
              <div className="flex gap-3">
                {social.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.url}
                    aria-label={item.name}
                    className="text-purple-300 hover:text-white transition-colors p-2 bg-white/10 rounded-full hover:bg-white/20 backdrop-blur-sm"
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Sections (Services, Resources, Shop, Support) */}
          {[
            { title: "Services", items: quickLinks },
            { title: "Resources", items: resources },
            { title: "Shop", items: ecommerce },
            { title: "Support", items: support },
          ].map((section, idx) => (
            <div key={idx}>
              <h4 className="font-semibold text-purple-100 mb-4 uppercase text-sm tracking-wider">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.items.map((item, i) => (
                  <li key={i}>
                    <Link
                      to={item.path}
                      className="text-purple-200 hover:text-[#C45A34] transition-colors text-sm"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-purple-500/30 py-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-purple-300 mb-4 md:mb-0">
            <p>
              © {new Date().getFullYear()} {company.name}. All rights reserved.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 text-sm">
            {legal.map((item, idx) => (
              <Link
                key={idx}
                to={item.path}
                className="text-purple-300 hover:text-[#C45A34] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
