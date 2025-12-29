"use client";

import React, { useState, useRef, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import logoNew from "../../assets/img/logonew2.png";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

/* ------------------- LANGUAGE DATA ------------------- */
export const languages = [
  { code: "en", name: "EN", Flag: () => (<svg viewBox="0 0 20 15"><rect width="20" height="15" fill="#012169" /></svg>) },
  { code: "hi", name: "HI", Flag: () => (<svg viewBox="0 0 20 15"><rect width="20" height="5" fill="#FF9933"/><rect y="5" width="20" height="5" fill="#FFF"/><rect y="10" width="20" height="5" fill="#138808"/></svg>) },
  { code: "ar", name: "AR", Flag: () => (<svg viewBox="0 0 20 15"><rect width="20" height="15" fill="#007A3D"/></svg>) },
  { code: "ru", name: "RU", Flag: () => (<svg viewBox="0 0 20 15"><rect width="20" height="5" fill="#FFF"/><rect y="5" width="20" height="5" fill="#0039A6"/><rect y="10" width="20" height="5" fill="#D52B1E"/></svg>) },
  { code: "zh", name: "ZH", Flag: () => (<svg viewBox="0 0 20 15"><rect width="20" height="15" fill="#EE1C25"/></svg>) },
  { code: "fa", name: "FA", Flag: () => (<svg viewBox="0 0 20 15"><rect width="20" height="5" fill="#239F40"/><rect y="5" width="20" height="5" fill="#FFF"/><rect y="10" width="20" height="5" fill="#DA0000"/></svg>) },
  { code: "tr", name: "TR", Flag: () => (<svg viewBox="0 0 20 15"><rect width="20" height="15" fill="#E30A17"/></svg>) },
  { code: "es", name: "ES", Flag: () => (<svg viewBox="0 0 20 15"><rect width="20" height="15" fill="#AA151B"/></svg>) },
  { code: "pa", name: "PA", Flag: () => (<svg viewBox="0 0 20 15"><rect width="20" height="5" fill="#FF9933"/><rect y="5" width="20" height="5" fill="#FFF"/><rect y="10" width="20" height="5" fill="#138808"/></svg>) },
  { code: "fr", name: "FR", Flag: () => (<svg viewBox="0 0 20 15"><rect width="6.67" height="15" fill="#002395"/><rect x="6.67" width="6.66" height="15" fill="#FFF"/><rect x="13.33" width="6.67" height="15" fill="#ED2939"/></svg>) },
  { code: "de", name: "DE", Flag: () => (<svg viewBox="0 0 20 15"><rect width="20" height="5" fill="#000"/><rect y="5" width="20" height="5" fill="#DD0000"/><rect y="10" width="20" height="5" fill="#FFCE00"/></svg>) },
  { code: "tl", name: "TL", Flag: () => (<svg viewBox="0 0 20 15"><rect width="20" height="7.5" fill="#0038A8"/><rect y="7.5" width="20" height="7.5" fill="#CE1126"/></svg>) },
  { code: "ur", name: "UR", Flag: () => (<svg viewBox="0 0 20 15"><rect width="20" height="15" fill="#01411C"/></svg>) },
];

/* ------------------- NAV ITEMS ------------------- */
const navItems = [
  { key: "home", path: "/" },
  {
    key: "homeUpgrade",
    children: [
      { key: "landscaping", path: "/landscaping" },
      { key: "interiors", path: "/services/interior" },
    ],
  },
  {
    key: "homeOwnership",
    children: [
      { key: "mortgages", path: "/mortgage/services" },
      { key: "properties", path: "/marketplace" },
    ],
  },
  { key: "store", path: "/ecommerce/b2c" },
  {
    key: "knowledgeHub",
    children: [
      { key: "blogs", path: "/explore" },
      { key: "caseStudies", path: "/case-studies" },
      { key: "training", path: "/training" },
    ],
  },
  { key: "ecosystem", path: "/ecosystem" },
  { key: "about", path: "/about" },
];

const Navbar = () => {
  const { t, i18n } = useTranslation("common");

  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedLang, setSelectedLang] = useState(languages[0]);

  const langRef = useRef(null);

  useEffect(() => {
    const current = languages.find(l => l.code === i18n.language);
    if (current) setSelectedLang(current);
  }, [i18n.language]);

  useEffect(() => {
    const close = e => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow">
      <div className="max-w-[1440px] mx-auto px-6 py-1">

        {/* TOP BAR */}
        <div className="flex items-center justify-between h-20">

          {/* LOGO */}
          <Link to="/" className="flex flex-col">
            <img src={logoNew} alt="Logo" className="h-15 " />
         
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden xl:flex items-center gap-2 text-sm">
            {navItems.map(item =>
              item.children ? (
                <div key={item.key} className="relative group">
                  <button className="px-3 py-2 flex items-center gap-1">
                    {t(`nav.${item.key}`)}
                    <ChevronDown size={14} />
                  </button>
                  <div className="absolute top-full left-0 bg-white shadow rounded opacity-0 group-hover:opacity-100">
                    {item.children.map(child => (
                      <Link
                        key={child.key}
                        to={child.path}
                        className="block px-4 py-2 hover:bg-purple-50"
                      >
                        {t(`nav.${child.key}`)}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link key={item.key} to={item.path} className="px-3 py-2">
                  {t(`nav.${item.key}`)}
                </Link>
              )
            )}
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">

            {/* LANGUAGE */}
            <div ref={langRef} className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-2 border px-3 py-2 rounded-lg"
              >
                <div className="w-4 h-3">
                  <selectedLang.Flag />
                </div>
                {selectedLang.name}
                <ChevronDown size={12} />
              </button>

              {langOpen && (
                <div className="absolute right-0 mt-2 bg-white shadow rounded z-50">
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        i18n.changeLanguage(lang.code);
                        setLangOpen(false);
                      }}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-purple-50 w-full"
                    >
                      <div className="w-4 h-3">
                        <lang.Flag />
                      </div>
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* DESKTOP CONTACT */}
            <Link to="/contact" className="hidden lg:block">
              <button className="px-4 py-2 bg-[#5C039B] text-white rounded-lg">
                {t("nav.contact")}
              </button>
            </Link>

            {/* DESKTOP LOGIN */}
            <Link to="/login" className="hidden lg:block">
              <button className="px-4 py-2 border border-[#5C039B] text-[#5C039B] rounded-lg">
                {t("nav.login")}
              </button>
            </Link>

            {/* MOBILE TOGGLE */}
            <button
              className="xl:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileOpen && (
          <div className="xl:hidden border-t py-4 space-y-3">

            {navItems.map(item =>
              item.children ? (
                <div key={item.key}>
                  <button
                    onClick={() =>
                      setOpenDropdown(openDropdown === item.key ? null : item.key)
                    }
                    className="flex justify-between w-full py-2"
                  >
                    {t(`nav.${item.key}`)}
                    <ChevronDown size={14} />
                  </button>

                  {openDropdown === item.key && (
                    <div className="pl-4 space-y-2">
                      {item.children.map(child => (
                        <Link
                          key={child.key}
                          to={child.path}
                          onClick={() => setMobileOpen(false)}
                          className="block py-2"
                        >
                          {t(`nav.${child.key}`)}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.key}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className="block py-2"
                >
                  {t(`nav.${item.key}`)}
                </Link>
              )
            )}

            {/* MOBILE LOGIN & CONTACT */}
    <div className="pt-5 border-t space-y-3">
  <Link to="/contact" className="block">
    <button className="w-full px-4 py-2 bg-[#5C039B] text-white rounded-lg">
      {t("nav.contact")}
    </button>
  </Link>

  <Link to="/login" className="block">
    <button className="w-full px-4 py-2 border border-[#5C039B] text-[#5C039B] rounded-lg">
      {t("nav.login")}
    </button>
  </Link>
</div>

          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
