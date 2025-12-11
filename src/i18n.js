import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

/* -----------------------------
   ENGLISH
------------------------------ */
import enCommon from "./locales/en/common.json";
import enHome from "./locales/en/home.json";
import enHome1 from "./locales/en/home1.json";
import enHome2 from "./locales/en/home2.json";
import enHome3 from "./locales/en/home3.json";
import enHome4 from "./locales/en/home4.json";
import enHome5 from "./locales/en/home5.json";
import enFooter from "./locales/en/footer.json";

/* -----------------------------
   HINDI
------------------------------ */
import hiCommon from "./locales/hi/common.json";
import hiHome from "./locales/hi/home.json";
import hiHome1 from "./locales/hi/home1.json";
import hiHome2 from "./locales/hi/home2.json";
import hiHome3 from "./locales/hi/home3.json";
import hiHome4 from "./locales/hi/home4.json";
import hiHome5 from "./locales/hi/home5.json";
import hiFooter from "./locales/hi/footer.json";

/* -----------------------------
   FRENCH
------------------------------ */
import frCommon from "./locales/fr/common.json";
import frHome from "./locales/fr/home.json";
import frHome1 from "./locales/fr/home1.json";
import frHome2 from "./locales/fr/home2.json";
import frHome3 from "./locales/fr/home3.json";
import frHome4 from "./locales/fr/home4.json";
import frHome5 from "./locales/fr/home5.json";
import frFooter from "./locales/fr/footer.json";

/* -----------------------------
   CHINESE (ZH)
------------------------------ */
import zhCommon from "./locales/zh/common.json";
import zhHome from "./locales/zh/home.json";
import zhHome1 from "./locales/zh/home1.json";
import zhHome2 from "./locales/zh/home2.json";
import zhHome3 from "./locales/zh/home3.json";
import zhHome4 from "./locales/zh/home4.json";
import zhHome5 from "./locales/zh/home5.json";
import zhFooter from "./locales/zh/footer.json";

/* -----------------------------
   TURKISH (TR)
------------------------------ */
import trCommon from "./locales/tr/common.json";
import trHome from "./locales/tr/home.json";
import trHome1 from "./locales/tr/home1.json";
import trHome2 from "./locales/tr/home2.json";
import trHome3 from "./locales/tr/home3.json";
import trHome4 from "./locales/tr/home4.json";
import trHome5 from "./locales/tr/home5.json";
import trFooter from "./locales/tr/footer.json";

/* -----------------------------
   RUSSIAN (RU)addad
------------------------------ */
import ruHome3 from "./locales/ru/home3.json";
import ruHome4 from "./locales/ru/home4.json";
import ruHome5 from "./locales/ru/home5.json";
import ruHome from "./locales/ru/home.json";

import ruCommon from "./locales/ru/common.json";
import ruHome1 from "./locales/ru/home1.json";
import ruHome2 from "./locales/ru/home2.json";

import ruFooter from "./locales/ru/footer.json";

/* -----------------------------
   SPANISH (ES)
------------------------------ */
import esCommon from "./locales/es/common.json";
import esHome from "./locales/es/home.json";
import esHome1 from "./locales/es/home1.json";
import esHome2 from "./locales/es/home2.json";
import esHome3 from "./locales/es/home3.json";
import esHome4 from "./locales/es/home4.json";
import esHome5 from "./locales/es/home5.json";
import esFooter from "./locales/es/footer.json";

/* -----------------------------
   GERMAN (DE)
------------------------------ */
import deCommon from "./locales/de/common.json";
import deHome from "./locales/de/home.json";
import deHome1 from "./locales/de/home1.json";
import deHome2 from "./locales/de/home2.json";
import deHome3 from "./locales/de/home3.json";
import deHome4 from "./locales/de/home4.json";
import deHome5 from "./locales/de/home5.json";
import deFooter from "./locales/de/footer.json";

/* -----------------------------
   TAGALOG / FILIPINO (TL)
------------------------------ */
import tlCommon from "./locales/tl/common.json";
import tlHome from "./locales/tl/home.json";
import tlHome1 from "./locales/tl/home1.json";
import tlHome2 from "./locales/tl/home2.json";
import tlHome3 from "./locales/tl/home3.json";
import tlHome4 from "./locales/tl/home4.json";
import tlHome5 from "./locales/tl/home5.json";
import tlFooter from "./locales/tl/footer.json";

/* -----------------------------
   INIT
------------------------------ */

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: enCommon,
        home: enHome,
        home1: enHome1,
        home2: enHome2,
        home3: enHome3,
        home4: enHome4,
        home5: enHome5,
        footer: enFooter,
      },
      hi: {
        common: hiCommon,
        home: hiHome,
        home1: hiHome1,
        home2: hiHome2,
        home3: hiHome3,
        home4: hiHome4,
        home5: hiHome5,
        footer: hiFooter,
      },
      fr: {
        common: frCommon,
        home: frHome,
        home1: frHome1,
        home2: frHome2,
        home3: frHome3,
        home4: frHome4,
        home5: frHome5,
        footer: frFooter,
      },
      zh: {
        common: zhCommon,
        home: zhHome,
        home1: zhHome1,
        home2: zhHome2,
        home3: zhHome3,
        home4: zhHome4,
        home5: zhHome5,
        footer: zhFooter,
      },
      tr: {
        common: trCommon,
        home: trHome,
        home1: trHome1,
        home2: trHome2,
        home3: trHome3,
        home4: trHome4,
        home5: trHome5,
        footer: trFooter,
      },
      ru: {
        common: ruCommon,
        home: ruHome,
        home1: ruHome1,
        home2: ruHome2,
        home3: ruHome3,
        home4: ruHome4,
        home5: ruHome5,
        footer: ruFooter,
      },
      es: {
        common: esCommon,
        home: esHome,
        home1: esHome1,
        home2: esHome2,
        home3: esHome3,
        home4: esHome4,
        home5: esHome5,
        footer: esFooter,
      },
      de: {
        common: deCommon,
        home: deHome,
        home1: deHome1,
        home2: deHome2,
        home3: deHome3,
        home4: deHome4,
        home5: deHome5,
        footer: deFooter,
      },
      tl: {
        common: tlCommon,
        home: tlHome,
        home1: tlHome1,
        home2: tlHome2,
        home3: tlHome3,
        home4: tlHome4,
        home5: tlHome5,
        footer: tlFooter,
      },
    },

    fallbackLng: "en",

    supportedLngs: ["en", "hi", "fr", "zh", "tr", "ru", "es", "de", "tl"],

    ns: [
      "common",
      "home",
      "home1",
      "home2",
      "home3",
      "home4",
      "home5",
      "footer",
    ],

    defaultNS: "common",

    interpolation: { escapeValue: false },
  });

export default i18n;
