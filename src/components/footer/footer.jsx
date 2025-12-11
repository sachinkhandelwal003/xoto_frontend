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
import { useTranslation } from "react-i18next"; // ✅ ADDED
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
  const { t } = useTranslation("footer"); // ✅ NEW NAMESPACE

  const [open, setOpen] = useState(null);
  const toggle = (id) => setOpen(open === id ? null : id);

  const offerings = t("offerings", { returnObjects: true });
  const resources = t("resources", { returnObjects: true });
  const knowledge = t("knowledge", { returnObjects: true });
  const social = t("social", { returnObjects: true });
  const company = t("company", { returnObjects: true });

  return (
    <footer className="border-purple-700/30 main-gradient-color text-white relative">
      {/* MOBILE LOGO */}
      <div className="text-center pt-10 lg:hidden">
        <img
          src={logoNewImage}
          className="h-16 sm:h-20 object-contain mx-auto"
          alt="Xoto"
        />
        <p
          className="text-lg font-semibold mt-2"
          dangerouslySetInnerHTML={{ __html: company.slogan }}
        />
        <p className="text-purple-200 mt-2 text-sm">{company.description}</p>
      </div>

      {/* MOBILE ACCORDIONS */}
      <div className="px-6 sm:px-10 lg:hidden mt-10">
        <Accordion
          title={t("titles.offerings")}
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
          title={t("titles.resources")}
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
          title={t("titles.knowledge")}
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
          title={t("titles.location")}
          isOpen={open === 4}
          toggle={() => toggle(4)}
        >
          <p className="text-purple-200 text-sm">{t("location")}</p>
        </Accordion>

        <Accordion
          title={t("titles.email")}
          isOpen={open === 5}
          toggle={() => toggle(5)}
        >
          <p className="text-purple-200 text-sm">
            {t("email.partners")}{" "}
            <span className="text-white">sales.support@xoto.ae</span>
          </p>
          <p className="text-purple-200 text-sm mt-1">
            {t("email.customers")}{" "}
            <span className="text-white">info@xoto.ae</span>
          </p>
        </Accordion>
      </div>

      {/* DESKTOP */}
      <div className="hidden lg:block max-w-screen-2xl mx-auto px-24 pt-16">
        <div className="grid grid-cols-6 gap-10 pb-14">
          <div className="col-span-2">
            <img src={logoNewImage} className="h-20 mb-4" alt="logo" />
            <p
              className="text-xl font-semibold"
              dangerouslySetInnerHTML={{ __html: company.slogan }}
            />
            <p className="text-purple-200 mt-3">{company.description}</p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase">
              {t("titles.offerings")}
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
              {t("titles.resources")}
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
              {t("titles.knowledge")}
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
              {t("titles.contact")}
            </h4>
            <p className="text-purple-200 text-sm">{t("location")}</p>
            <p className="text-purple-200 text-sm mt-3">
              {t("email.partners")}{" "}
              <span className="text-white">sales.support@xoto.ae</span>
            </p>
            <p className="text-purple-200 text-sm mt-1">
              {t("email.customers")}{" "}
              <span className="text-white">info@xoto.ae</span>
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
          <p className="text-purple-300 text-sm">{t("bottom.copyright")}</p>

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
}
