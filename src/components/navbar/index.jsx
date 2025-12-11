"use client";

import React, { useState, useRef, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import logoNew from "../../assets/img/logoNew.png";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";

/* ------------------- LANGUAGE DATA ------------------- */
export const languages = [
  {
    code: "en",
    name: "EN",
    Flag: () => (
      <svg viewBox="0 0 20 15" className="w-full h-full">
        <rect width="20" height="15" fill="#012169" />
        <path
          fill="#FFF"
          d="M0,0 L20,15 M0,15 L20,0 M8,0 L8,15 M0,7.5 L20,7.5"
        />
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
    name: "HI",
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
    name: "AR",
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
    name: "RU",
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
    name: "ZH",
    Flag: () => (
      <svg viewBox="0 0 20 15" className="w-full h-full">
        <rect width="20" height="15" fill="#EE1C25" />
        <polygon fill="#FFFF00" points="3,2 4,4.5 1.5,3.5 4.5,3.5 2,4.5" />
      </svg>
    ),
  },

  {
    code: "fa",
    name: "FA",
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
    name: "TR",
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
    name: "ES",
    Flag: () => (
      <svg viewBox="0 0 20 15" className="w-full h-full">
        <rect width="20" height="15" fill="#AA151B" />
        <rect y="4" width="20" height="7" fill="#F1BF00" />
      </svg>
    ),
  },

  {
    code: "pa",
    name: "PA",
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
    name: "FR",
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
    name: "DE",
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
    name: "TL",
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
    name: "UR",
    Flag: () => (
      <svg viewBox="0 0 20 15" className="w-full h-full">
        <rect width="20" height="15" fill="#01411C" />
        <rect width="5" height="15" fill="#FFF" />
        <path fill="#FFF" d="M13,7.5a3,3 0 1,1 -1,-5a2,2 0 1,0 1,5Z" />
        <circle cx="14" cy="5.5" r="0.8" fill="#FFF" />
      </svg>
    ),
  },
];

/* ------------------- NAV ITEMS ------------------- */
const navItems = [
  { key: "home", path: "/" },
  { key: "landscaping", path: "/landscaping" },
  { key: "interiors", path: "/services/interior" },
  { key: "mortgages", path: "/mortgage/services" },
  { key: "ecosystem", path: "/ecosystem" },
  { key: "store", path: "/ecommerce/b2c" },
  { key: "properties", path: "/marketplace" },
  { key: "blogs", path: "/explore" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const [scrolled, setScrolled] = useState(false);

  const { t, i18n } = useTranslation("common");

  const langRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target) &&
        !e.target.closest("button")
      ) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-sm shadow-lg" : "bg-white"
        }`}
      >
        <div className="max-w-8xl mx-auto px-4 py-5">
          <div className="flex items-center justify-between h-12">
            {/* Logo */}
            <Link to="/" className="flex flex-col items-center">
              <img src={logoNew} alt="Logo" className="h-14 w-auto" />
              <span className="text-gray-900 text-[10px]">
                {t("nav.tagline")}
              </span>
            </Link>

            {/* ---------------- DESKTOP NAV ---------------- */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  to={item.path}
                  className="px-4 py-2 text-sm font-medium text-gray-700 rounded-lg transition-all hover:bg-purple-50 hover:text-[#5C039B]"
                >
                  {t(`nav.${item.key}`)}
                </Link>
              ))}
            </div>

            {/* ---------------- DESKTOP RIGHT ---------------- */}
            <div className="hidden lg:flex items-center space-x-4">
              <div ref={langRef} className="relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-50 border rounded-xl"
                >
                  <div className="w-5 h-5">
                    <selectedLang.Flag />
                  </div>
                  <span className="text-sm font-semibold">
                    {selectedLang.name}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 ${langOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {langOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-xl">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setSelectedLang(lang);
                          i18n.changeLanguage(lang.code); // 🔥 STEP 5
                          setLangOpen(false);
                        }}
                        className="flex w-full items-center gap-3 px-4 py-3 hover:bg-purple-50"
                      >
                        <div className="w-5 h-5">
                          <lang.Flag />
                        </div>
                        {lang.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <Link to="/contact">
                <button className="px-6 py-2 bg-[#5C039B] text-white rounded-xl">
                  {t("nav.contact")}
                </button>
              </Link>
              <Link to="/login">
                <button className="px-6 py-2 bg-[#5C039B] text-white rounded-xl">
                  {t("nav.login")}
                </button>
              </Link>
            </div>

            {/* ---------------- MOBILE TOGGLE ---------------- */}
            <div className="lg:hidden">
              <button onClick={() => setMobileOpen(!mobileOpen)}>
                {mobileOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* ---------------- MOBILE MENU ---------------- */}
        <div
          ref={mobileMenuRef}
          className={`lg:hidden fixed inset-x-0 top-16 bg-white transition-all duration-300 ${
            mobileOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 hover:bg-purple-50"
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Spacer */}
      <div className="h-20" />
    </>
  );
};

export default Navbar;

// ("use client");

// import React, { useState, useRef, useEffect } from "react";
// import { FaBars, FaTimes } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import logoNew from "../../assets/img/logoNew.png";
// import { ChevronDown } from "lucide-react";

// /* ------------------- LANGUAGE DATA ------------------- */
// export const languages = [
//   { code: "en", name: "EN", Flag: () => (<svg viewBox="0 0 20 15" className="w-full h-full"><rect width="20" height="15" fill="#012169"/></svg>) },
//   { code: "hi", name: "HI", Flag: () => (<svg viewBox="0 0 20 15" className="w-full h-full"><rect width="20" height="15" fill="#FF9933"/></svg>) },
//   { code: "ar", name: "AR", Flag: () => (<svg viewBox="0 0 20 15" className="w-full h-full"><rect width="20" height="15" fill="#007A3D"/></svg>) },
//   { code: "ru", name: "RU", Flag: () => (<svg viewBox="0 0 20 15" className="w-full h-full"><rect width="20" height="15" fill="#0039A6"/></svg>) },
// ];

// /* ------------------- NAV ITEMS ------------------- */
// const navItems = [
//   { title: "Home", path: "/" },
//   { title: "Landscaping", path: "/landscaping" },
//   { title: "Interiors", path: "/services/interior" },
//   { title: "Partner Eco-System", path: "/ecosystem" },
//   { title: "Xoto Store", path: "/ecommerce/b2c" },
//   { title: "Blogs", path: "/explore" },
//   { title: "Properties", path: "/marketplace" },
// ];

// const Navbar = () => {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [langOpen, setLangOpen] = useState(false);
//   const [selectedLang, setSelectedLang] = useState(languages[0]);
//   const [scrolled, setScrolled] = useState(false);

//   const langRef = useRef(null);
//   const mobileMenuRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (langRef.current && !langRef.current.contains(e.target)) {
//         setLangOpen(false);
//       }
//       if (
//         mobileMenuRef.current &&
//         !mobileMenuRef.current.contains(e.target) &&
//         !e.target.closest("button")
//       ) {
//         setMobileOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 10);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <>
//       <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-sm shadow-lg" : "bg-white"}`}>
//         <div className="max-w-8xl mx-auto px-4 py-5">
//           <div className="flex items-center justify-between h-12">

//             {/* Logo */}
//             <Link to="/" className="flex flex-col items-center">
//               <img src={logoNew} alt="Logo" className="h-14 w-auto" />
//               <span className="text-gray-900 text-[10px]">Powered by AI. Inspired by you.</span>
//             </Link>

//             {/* Desktop Nav */}
//             <div className="hidden lg:flex items-center space-x-1">
//               {navItems.map((item) => (
//                 <Link
//                   key={item.title}
//                   to={item.path}
//                   className="px-4 py-2 text-sm font-medium text-gray-700 rounded-lg transition-all hover:bg-purple-50 hover:text-purple-700"
//                 >
//                   {item.title}
//                 </Link>
//               ))}

//               {/* ✅ Mortgage (no dropdown) */}
//               <Link
//                 to="/mortgage/services"
//                 className="px-4 py-2 text-sm font-medium text-gray-700 rounded-lg transition-all hover:bg-purple-50 hover:text-purple-700"
//               >
//                 Mortgage
//               </Link>
//             </div>

//             {/* Desktop Right */}
//             <div className="hidden lg:flex items-center space-x-4">
//               <div ref={langRef} className="relative">
//                 <button
//                   onClick={() => setLangOpen(!langOpen)}
//                   className="flex items-center gap-2 px-3 py-2 bg-gray-50 border rounded-xl"
//                 >
//                   <div className="w-5 h-5"><selectedLang.Flag /></div>
//                   <span className="text-sm font-semibold">{selectedLang.name}</span>
//                   <ChevronDown className={`w-4 h-4 ${langOpen ? "rotate-180" : ""}`} />
//                 </button>

//                 {langOpen && (
//                   <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-xl">
//                     {languages.map((lang) => (
//                       <button
//                         key={lang.code}
//                         onClick={() => { setSelectedLang(lang); setLangOpen(false); }}
//                         className="flex w-full items-center gap-3 px-4 py-3 hover:bg-purple-50"
//                       >
//                         <div className="w-5 h-5"><lang.Flag /></div>
//                         {lang.name}
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               <Link to="/contact"><button className="px-6 py-2 bg-purple-600 text-white rounded-xl">Contact Us</button></Link>
//               <Link to="/login"><button className="px-6 py-2 bg-purple-600 text-white rounded-xl">Login</button></Link>
//             </div>

//             {/* Mobile */}
//             <div className="lg:hidden flex items-center gap-2">
//               <button onClick={() => setMobileOpen(!mobileOpen)}>
//                 {mobileOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         <div
//           ref={mobileMenuRef}
//           className={`lg:hidden fixed inset-x-0 top-16 bg-white transition-all ${mobileOpen ? "translate-y-0" : "-translate-y-full"}`}
//         >
//           <div className="px-4 py-4 space-y-1">
//             {navItems.map((item) => (
//               <Link key={item.title} to={item.path} onClick={() => setMobileOpen(false)} className="block px-4 py-3 hover:bg-purple-50">
//                 {item.title}
//               </Link>
//             ))}

//             {/* ✅ Mobile Mortgage */}
//             <Link
//               to="/mortgage/services"
//               onClick={() => setMobileOpen(false)}
//               className="block px-4 py-3 hover:bg-purple-50"
//             >
//               Mortgage
//             </Link>
//           </div>
//         </div>
//       </nav>

//       <div className="h-20" />
//     </>
//   );
// };

// export default Navbar;
