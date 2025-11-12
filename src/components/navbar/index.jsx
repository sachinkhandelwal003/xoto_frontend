'use client';

import React, { useState, useRef, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import logoNew from "../../assets/img/logoNew.png";
import { ChevronDown } from "lucide-react";

/* ------------------- LANGUAGE DATA ------------------- */
export const languages = [
  {
    code: "en",
    name: "English",
    Flag: () => (
      <svg viewBox="0 0 20 15" className="w-full h-full">
        <rect width="20" height="15" fill="#012169" />
        <path fill="#FFF" d="M0,0 L20,15 M0,15 L20,0 M8,0 L8,15 M0,7.5 L20,7.5" />
        <path
          fill="#C8102E"
          d="M0,0 L8,0 L20,7 L20,8 L12,8 L0,1 M0,14 L8,15 L20,8 L20,7 L12,7 L0,14"
          transform="scale(1,0.8)"
        />
      </svg>
    ),
  },

  {
    code: "hi",
    name: "Hindi",
    Flag: () => (
      <svg viewBox="0 0 20 15" className="w-full h-full">
        <rect width="20" height="5" fill="#FF9933" />
        <rect y="5" width="20" height="5" fill="#FFF" />
        <rect y="10" width="20" height="5" fill="#138808" />
        <circle
          cx="10"
          cy="7.5"
          r="1.3"
          stroke="#000080"
          strokeWidth="0.4"
          fill="none"
        />
      </svg>
    ),
  },

  {
    code: "ar",
    name: "Arabic",
    Flag: () => (
      <svg viewBox="0 0 20 15" className="w-full h-full">
        <rect width="20" height="15" fill="#007A3D" />
        <rect width="20" height="10" fill="#FFF" />
        <rect width="20" height="5" fill="#CE1126" />
        <polygon points="0,0 7,7.5 0,15" fill="#000" />
      </svg>
    ),
  },

  {
    code: "ru",
    name: "Russian",
    Flag: () => (
      <svg viewBox="0 0 20 15" className="w-full h-full">
        <rect width="20" height="5" fill="#FFF" />
        <rect y="5" width="20" height="5" fill="#0039A6" />
        <rect y="10" width="20" height="5" fill="#D52B1E" />
      </svg>
    ),
  },

  {
    code: "zh",
    name: "Chinese",
    Flag: () => (
      <svg viewBox="0 0 20 15" className="w-full h-full">
        <rect width="20" height="15" fill="#EE1C25" />
        <polygon
          fill="#FFFF00"
          points="3,2 4,4.5 1.5,3.5 4.5,3.5 2,4.5"
        />
      </svg>
    ),
  },

  {
    code: "fa",
    name: "Persian",
    Flag: () => (
      <svg viewBox="0 0 20 15" className="w-full h-full">
        <rect width="20" height="5" fill="#239F40" />
        <rect y="5" width="20" height="5" fill="#FFF" />
        <rect y="10" width="20" height="5" fill="#DA0000" />
      </svg>
    ),
  },

  {
    code: "tr",
    name: "Turkish",
    Flag: () => (
      <svg viewBox="0 0 20 15" className="w-full h-full">
        <rect width="20" height="15" fill="#E30A17" />
        <circle cx="7" cy="7.5" r="3" fill="#fff" />
        <circle cx="8" cy="7.5" r="2.2" fill="#E30A17" />
        <polygon fill="#fff" points="10,7.5 12,6.3 12,8.7" />
      </svg>
    ),
  },

  {
    code: "es",
    name: "Spanish",
    Flag: () => (
      <svg viewBox="0 0 20 15" className="w-full h-full">
        <rect width="20" height="15" fill="#AA151B" />
        <rect y="4" width="20" height="7" fill="#F1BF00" />
      </svg>
    ),
  },

  {
    code: "pa",
    name: "Punjabi",
    Flag: () => (
      <svg viewBox="0 0 20 15" className="w-full h-full">
        <rect width="20" height="5" fill="#FF9933" />
        <rect y="5" width="20" height="5" fill="#FFF" />
        <rect y="10" width="20" height="5" fill="#138808" />
        <circle
          cx="10"
          cy="7.5"
          r="1.3"
          stroke="#000080"
          strokeWidth="0.4"
          fill="none"
        />
      </svg>
    ),
  },

  {
    code: "fr",
    name: "French",
    Flag: () => (
      <svg viewBox="0 0 20 15" className="w-full h-full">
        <rect width="6.67" height="15" fill="#002395" />
        <rect x="6.67" width="6.66" height="15" fill="#FFF" />
        <rect x="13.33" width="6.67" height="15" fill="#ED2939" />
      </svg>
    ),
  },

  {
    code: "de",
    name: "German",
    Flag: () => (
      <svg viewBox="0 0 20 15" className="w-full h-full">
        <rect width="20" height="5" fill="#000" />
        <rect y="5" width="20" height="5" fill="#DD0000" />
        <rect y="10" width="20" height="5" fill="#FFCE00" />
      </svg>
    ),
  },

  {
    code: "tl",
    name: "Tagalog (PH)",
    Flag: () => (
      <svg viewBox="0 0 20 15" className="w-full h-full">
        <rect width="20" height="7.5" fill="#0038A8" />
        <rect y="7.5" width="20" height="7.5" fill="#CE1126" />
        <polygon points="0,0 8,7.5 0,15" fill="#FFF" />
        <circle cx="3" cy="7.5" r="1" fill="#FCD116" />
      </svg>
    ),
  },

  {
    code: "ur",
    name: "Urdu",
    Flag: () => (
      <svg viewBox="0 0 20 15" className="w-full h-full">
        <rect width="20" height="15" fill="#01411C" />
        <rect width="5" height="15" fill="#FFF" />
        <path
          fill="#FFF"
          d="M13,7.5a3,3 0 1,1 -1,-5a2,2 0 1,0 1,5Z"
        />
        <circle cx="14" cy="5.5" r="0.8" fill="#FFF" />
      </svg>
    ),
  },
];

/* ------------------- NAV ITEMS ------------------- */
const navItems = [
  { title: "Home", path: "/" },
  { title: "Landscaping", path: "/landscaping" },
  { title: "Interior", path: "/services/interior" },
  { title: "Rent/Buy/Sell", path: "/marketplace" },
  { title: "Services", path: "/Services" },
  { title: "Eco-System", path: "/ecosystem" },
  { title: "About Us", path: "/about" },
];

/* ------------------- MAIN NAVBAR ------------------- */
const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const [scrolled, setScrolled] = useState(false);
  const langRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false);
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target) && !e.target.closest('button')) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Shadow on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLangSelect = (lang) => {
    setSelectedLang(lang);
    setLangOpen(false);
  };

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <>
      {/* Sticky Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-sm shadow-lg" : "bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <img
                src={logoNew}
                alt="Sawtar Logo"
                className="h-10 w-auto transition-transform group-hover:scale-105"
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.path}
                  className="px-4 py-2 text-sm font-medium text-gray-700 rounded-lg transition-all duration-200 hover:bg-purple-50 hover:text-purple-700"
                >
                  {item.title}
                </Link>
              ))}
            </div>

            {/* Desktop: Language + Contact */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Language Dropdown */}
              <div ref={langRef} className="relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl hover:border-purple-400 transition-all duration-200 group"
                >
                  <div className="w-5 h-5 rounded-full overflow-hidden ring-2 ring-white">
                    <selectedLang.Flag />
                  </div>
                  <span className="text-sm font-semibold text-gray-800">{selectedLang.name}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${langOpen ? "rotate-180" : ""}`} />
                </button>

                {langOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    {languages.map((lang) => {
                      const isActive = selectedLang.code === lang.code;
                      return (
                        <button
                          key={lang.code}
                          onClick={() => handleLangSelect(lang)}
                          className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all ${
                            isActive ? "bg-purple-50 text-purple-700 font-semibold" : "hover:bg-gray-50 text-gray-700"
                          }`}
                        >
                          <div className="w-6 h-6 rounded-full overflow-hidden ring-2 ring-white">
                            <lang.Flag />
                          </div>
                          <span className="text-sm">{lang.name}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <Link to="/contact">
                <button className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold text-sm rounded-xl shadow-md hover:shadow-xl hover:from-purple-700 hover:to-purple-800 transform hover:scale-105 transition-all duration-200">
                  Contact Us
                </button>
              </Link>
            </div>

            {/* Mobile: Country Selector + Menu Icon */}
            <div className="flex items-center gap-2 lg:hidden">
              {/* Country Selector (Mobile) */}
              <div ref={langRef} className="relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1.5 px-2 py-1.5 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all"
                  aria-label="Select Language"
                >
                  <div className="w-6 h-6 rounded-full overflow-hidden ring-1 ring-white shadow-sm">
                    <selectedLang.Flag />
                  </div>
                  <ChevronDown className={`w-3.5 h-3.5 text-gray-600 transition-transform ${langOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Mobile Language Dropdown */}
                {langOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    {languages.map((lang) => {
                      const isActive = selectedLang.code === lang.code;
                      return (
                        <button
                          key={lang.code}
                          onClick={() => handleLangSelect(lang)}
                          className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all ${
                            isActive ? "bg-purple-50 text-purple-700 font-semibold" : "hover:bg-gray-50 text-gray-700"
                          }`}
                        >
                          <div className="w-6 h-6 rounded-full overflow-hidden ring-2 ring-white">
                            <lang.Flag />
                          </div>
                          <span className="text-sm">{lang.name}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Full Slide In */}
        <div
          ref={mobileMenuRef}
          className={`lg:hidden fixed inset-x-0 top-16 bg-white shadow-2xl border-t border-gray-100 transition-all duration-300 ease-out ${
            mobileOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
          }`}
        >
          <div className="px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.title}
                to={item.path}
                onClick={closeMobileMenu}
                className="block px-4 py-3 text-base font-medium text-gray-700 rounded-lg hover:bg-purple-50 hover:text-purple-700 transition"
              >
                {item.title}
              </Link>
            ))}

            {/* Contact Button in Mobile Menu */}
            <Link to="/contact" onClick={closeMobileMenu} className="block mt-4 px-4">
              <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
};

export default Navbar;