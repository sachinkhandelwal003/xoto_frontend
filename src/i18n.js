import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

/* =========================
   EN
========================= */
import enCommon from "./locales/en/common.json";
import enHome from "./locales/en/home.json";
import enHome1 from "./locales/en/home1.json";
import enHome2 from "./locales/en/home2.json";
import enHome3 from "./locales/en/home3.json";
import enHome4 from "./locales/en/home4.json";
import enHome5 from "./locales/en/home5.json";
import enFooter from "./locales/en/footer.json";
import enInterior1 from "./locales/en/interior1.json";
import enInterior2 from "./locales/en/interior2.json";
import enInterior3 from "./locales/en/interior3.json";
import enInterior4 from "./locales/en/interior4.json";
import enInterior5 from "./locales/en/interior5.json";
import enInterior6 from "./locales/en/interior6.json";
import enInterior7 from "./locales/en/interior7.json";
import enScape1 from "./locales/en/scape1.json";
import enScape2 from "./locales/en/scape2.json";
import enMort1 from "./locales/en/mort1.json";
import enMort2 from "./locales/en/mort2.json";
import enMort3 from "./locales/en/mort3.json";
import enMort5 from "./locales/en/mort5.json";
import enMort6 from "./locales/en/mort6.json";

/* =========================
   HI
========================= */
import hiCommon from "./locales/hi/common.json";
import hiHome from "./locales/hi/home.json";
import hiHome1 from "./locales/hi/home1.json";
import hiHome2 from "./locales/hi/home2.json";
import hiHome3 from "./locales/hi/home3.json";
import hiHome4 from "./locales/hi/home4.json";
import hiHome5 from "./locales/hi/home5.json";
import hiFooter from "./locales/hi/footer.json";
import hiInterior1 from "./locales/hi/interior1.json";
import hiInterior2 from "./locales/hi/interior2.json";
import hiInterior3 from "./locales/hi/interior3.json";
import hiInterior4 from "./locales/hi/interior4.json";
import hiInterior5 from "./locales/hi/interior5.json";
import hiInterior6 from "./locales/hi/interior6.json";
import hiInterior7 from "./locales/hi/interior7.json";
import hiScape1 from "./locales/hi/scape1.json";
import hiScape2 from "./locales/hi/scape2.json";
import hiMort1 from "./locales/hi/mort1.json";
import hiMort2 from "./locales/hi/mort2.json";
import hiMort3 from "./locales/hi/mort3.json";
import hiMort5 from "./locales/hi/mort5.json";
import hiMort6 from "./locales/hi/mort6.json";

/* =========================
   DE
========================= */
import deCommon from "./locales/de/common.json";
import deHome from "./locales/de/home.json";
import deHome1 from "./locales/de/home1.json";
import deHome2 from "./locales/de/home2.json";
import deHome3 from "./locales/de/home3.json";
import deHome4 from "./locales/de/home4.json";
import deHome5 from "./locales/de/home5.json";
import deFooter from "./locales/de/footer.json";
import deInterior1 from "./locales/de/interior1.json";
import deInterior2 from "./locales/de/interior2.json";
import deInterior3 from "./locales/de/interior3.json";
import deInterior4 from "./locales/de/interior4.json";
import deInterior5 from "./locales/de/interior5.json";
import deInterior6 from "./locales/de/interior6.json";
import deInterior7 from "./locales/de/interior7.json";
import deScape1 from "./locales/de/scape1.json";
import deScape2 from "./locales/de/scape2.json";
import deMort1 from "./locales/de/mort1.json";
import deMort2 from "./locales/de/mort2.json";
import deMort3 from "./locales/de/mort3.json";
import deMort5 from "./locales/de/mort5.json";
import deMort6 from "./locales/de/mort6.json";

/* =========================
   ES
========================= */
import esCommon from "./locales/es/common.json";
import esHome from "./locales/es/home.json";
import esHome1 from "./locales/es/home1.json";
import esHome2 from "./locales/es/home2.json";
import esHome3 from "./locales/es/home3.json";
import esHome4 from "./locales/es/home4.json";
import esHome5 from "./locales/es/home5.json";
import esFooter from "./locales/es/footer.json";
import esInterior1 from "./locales/es/interior1.json";
import esInterior2 from "./locales/es/interior2.json";
import esInterior3 from "./locales/es/interior3.json";
import esInterior4 from "./locales/es/interior4.json";
import esInterior5 from "./locales/es/interior5.json";
import esInterior6 from "./locales/es/interior6.json";
import esInterior7 from "./locales/es/interior7.json";
import esScape1 from "./locales/es/scape1.json";
import esScape2 from "./locales/es/scape2.json";
import esMort1 from "./locales/es/mort1.json";
import esMort2 from "./locales/es/mort2.json";
import esMort3 from "./locales/es/mort3.json";
import esMort5 from "./locales/es/mort5.json";
import esMort6 from "./locales/es/mort6.json";

/* =========================
   FR
========================= */
import frCommon from "./locales/fr/common.json";
import frHome from "./locales/fr/home.json";
import frHome1 from "./locales/fr/home1.json";
import frHome2 from "./locales/fr/home2.json";
import frHome3 from "./locales/fr/home3.json";
import frHome4 from "./locales/fr/home4.json";
import frHome5 from "./locales/fr/home5.json";
import frFooter from "./locales/fr/footer.json";
import frInterior1 from "./locales/fr/interior1.json";
import frInterior2 from "./locales/fr/interior2.json";
import frInterior3 from "./locales/fr/interior3.json";
import frInterior4 from "./locales/fr/interior4.json";
import frInterior5 from "./locales/fr/interior5.json";
import frInterior6 from "./locales/fr/interior6.json";
import frInterior7 from "./locales/fr/interior7.json";
import frScape1 from "./locales/fr/scape1.json";
import frScape2 from "./locales/fr/scape2.json";
import frMort1 from "./locales/fr/mort1.json";
import frMort2 from "./locales/fr/mort2.json";
import frMort3 from "./locales/fr/mort3.json";
import frMort5 from "./locales/fr/mort5.json";
import frMort6 from "./locales/fr/mort6.json";

/* =========================
   RU
========================= */
import ruCommon from "./locales/ru/common.json";
import ruHome from "./locales/ru/home.json";
import ruHome1 from "./locales/ru/home1.json";
import ruHome2 from "./locales/ru/home2.json";
import ruHome3 from "./locales/ru/home3.json";
import ruHome4 from "./locales/ru/home4.json";
import ruHome5 from "./locales/ru/home5.json";
import ruFooter from "./locales/ru/footer.json";
import ruInterior1 from "./locales/ru/interior1.json";
import ruInterior2 from "./locales/ru/interior2.json";
import ruInterior3 from "./locales/ru/interior3.json";
import ruInterior4 from "./locales/ru/interior4.json";
import ruInterior5 from "./locales/ru/interior5.json";
import ruInterior6 from "./locales/ru/interior6.json";
import ruInterior7 from "./locales/ru/interior7.json";
import ruScape1 from "./locales/ru/scape1.json";
import ruScape2 from "./locales/ru/scape2.json";
import ruMort1 from "./locales/ru/mort1.json";
import ruMort2 from "./locales/ru/mort2.json";
import ruMort3 from "./locales/ru/mort3.json";
import ruMort5 from "./locales/ru/mort5.json";
import ruMort6 from "./locales/ru/mort6.json";

/* =========================
   TR
========================= */
import trCommon from "./locales/tr/common.json";
import trHome from "./locales/tr/home.json";
import trHome1 from "./locales/tr/home1.json";
import trHome2 from "./locales/tr/home2.json";
import trHome3 from "./locales/tr/home3.json";
import trHome4 from "./locales/tr/home4.json";
import trHome5 from "./locales/tr/home5.json";
import trFooter from "./locales/tr/footer.json";
import trInterior1 from "./locales/tr/interior1.json";
import trInterior2 from "./locales/tr/interior2.json";
import trInterior3 from "./locales/tr/interior3.json";
import trInterior4 from "./locales/tr/interior4.json";
import trInterior5 from "./locales/tr/interior5.json";
import trInterior6 from "./locales/tr/interior6.json";
import trInterior7 from "./locales/tr/interior7.json";
import trScape1 from "./locales/tr/scape1.json";
import trScape2 from "./locales/tr/scape2.json";
import trMort1 from "./locales/tr/mort1.json";
import trMort2 from "./locales/tr/mort2.json";
import trMort3 from "./locales/tr/mort3.json";
import trMort5 from "./locales/tr/mort5.json";
import trMort6 from "./locales/tr/mort6.json";

/* =========================
   ZH
========================= */
import zhCommon from "./locales/zh/common.json";
import zhHome from "./locales/zh/home.json";
import zhHome1 from "./locales/zh/home1.json";
import zhHome2 from "./locales/zh/home2.json";
import zhHome3 from "./locales/zh/home3.json";
import zhHome4 from "./locales/zh/home4.json";
import zhHome5 from "./locales/zh/home5.json";
import zhFooter from "./locales/zh/footer.json";
import zhInterior1 from "./locales/zh/interior1.json";
import zhInterior2 from "./locales/zh/interior2.json";
import zhInterior3 from "./locales/zh/interior3.json";
import zhInterior4 from "./locales/zh/interior4.json";
import zhInterior5 from "./locales/zh/interior5.json";
import zhInterior6 from "./locales/zh/interior6.json";
import zhInterior7 from "./locales/zh/interior7.json";
import zhScape1 from "./locales/zh/scape1.json";
import zhScape2 from "./locales/zh/scape2.json";
import zhMort1 from "./locales/zh/mort1.json";
import zhMort2 from "./locales/zh/mort2.json";
import zhMort3 from "./locales/zh/mort3.json";
import zhMort5 from "./locales/zh/mort5.json";
import zhMort6 from "./locales/zh/mort6.json";

/* =========================
   TL
========================= */
import tlCommon from "./locales/tl/common.json";
import tlHome from "./locales/tl/home.json";
import tlHome1 from "./locales/tl/home1.json";
import tlHome2 from "./locales/tl/home2.json";
import tlHome3 from "./locales/tl/home3.json";
import tlHome4 from "./locales/tl/home4.json";
import tlHome5 from "./locales/tl/home5.json";
import tlFooter from "./locales/tl/footer.json";
import tlInterior1 from "./locales/tl/interior1.json";
import tlInterior2 from "./locales/tl/interior2.json";
import tlInterior3 from "./locales/tl/interior3.json";
import tlInterior4 from "./locales/tl/interior4.json";
import tlInterior5 from "./locales/tl/interior5.json";
import tlInterior6 from "./locales/tl/interior6.json";
import tlInterior7 from "./locales/tl/interior7.json";
import tlScape1 from "./locales/tl/scape1.json";
import tlScape2 from "./locales/tl/scape2.json";
import tlMort1 from "./locales/tl/mort1.json";
import tlMort2 from "./locales/tl/mort2.json";
import tlMort3 from "./locales/tl/mort3.json";
import tlMort5 from "./locales/tl/mort5.json";
import tlMort6 from "./locales/tl/mort6.json";

/* =========================
   FA
========================= */
import faMort1 from "./locales/fa/mort1.json";
import faMort2 from "./locales/fa/mort2.json";
import faMort3 from "./locales/fa/mort3.json";
import faMort5 from "./locales/fa/mort5.json";
import faMort6 from "./locales/fa/mort6.json";

/* =========================
   INIT
========================= */

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: enCommon, home: enHome, home1: enHome1, home2: enHome2, home3: enHome3, home4: enHome4, home5: enHome5, footer: enFooter, interior1: enInterior1, interior2: enInterior2, interior3: enInterior3, interior4: enInterior4, interior5: enInterior5, interior6: enInterior6, interior7: enInterior7, scape1: enScape1, scape2: enScape2, mort1: enMort1, mort2: enMort2, mort3: enMort3, mort5: enMort5, mort6: enMort6 },
      hi: { common: hiCommon, home: hiHome, home1: hiHome1, home2: hiHome2, home3: hiHome3, home4: hiHome4, home5: hiHome5, footer: hiFooter, interior1: hiInterior1, interior2: hiInterior2, interior3: hiInterior3, interior4: hiInterior4, interior5: hiInterior5, interior6: hiInterior6, interior7: hiInterior7, scape1: hiScape1, scape2: hiScape2, mort1: hiMort1, mort2: hiMort2, mort3: hiMort3, mort5: hiMort5, mort6: hiMort6 },
      de: { common: deCommon, home: deHome, home1: deHome1, home2: deHome2, home3: deHome3, home4: deHome4, home5: deHome5, footer: deFooter, interior1: deInterior1, interior2: deInterior2, interior3: deInterior3, interior4: deInterior4, interior5: deInterior5, interior6: deInterior6, interior7: deInterior7, scape1: deScape1, scape2: deScape2, mort1: deMort1, mort2: deMort2, mort3: deMort3, mort5: deMort5, mort6: deMort6 },
      es: { common: esCommon, home: esHome, home1: esHome1, home2: esHome2, home3: esHome3, home4: esHome4, home5: esHome5, footer: esFooter, interior1: esInterior1, interior2: esInterior2, interior3: esInterior3, interior4: esInterior4, interior5: esInterior5, interior6: esInterior6, interior7: esInterior7, scape1: esScape1, scape2: esScape2, mort1: esMort1, mort2: esMort2, mort3: esMort3, mort5: esMort5, mort6: esMort6 },
      fr: { common: frCommon, home: frHome, home1: frHome1, home2: frHome2, home3: frHome3, home4: frHome4, home5: frHome5, footer: frFooter, interior1: frInterior1, interior2: frInterior2, interior3: frInterior3, interior4: frInterior4, interior5: frInterior5, interior6: frInterior6, interior7: frInterior7, scape1: frScape1, scape2: frScape2, mort1: frMort1, mort2: frMort2, mort3: frMort3, mort5: frMort5, mort6: frMort6 },
      ru: { common: ruCommon, home: ruHome, home1: ruHome1, home2: ruHome2, home3: ruHome3, home4: ruHome4, home5: ruHome5, footer: ruFooter, interior1: ruInterior1, interior2: ruInterior2, interior3: ruInterior3, interior4: ruInterior4, interior5: ruInterior5, interior6: ruInterior6, interior7: ruInterior7, scape1: ruScape1, scape2: ruScape2, mort1: ruMort1, mort2: ruMort2, mort3: ruMort3, mort5: ruMort5, mort6: ruMort6 },
      tr: { common: trCommon, home: trHome, home1: trHome1, home2: trHome2, home3: trHome3, home4: trHome4, home5: trHome5, footer: trFooter, interior1: trInterior1, interior2: trInterior2, interior3: trInterior3, interior4: trInterior4, interior5: trInterior5, interior6: trInterior6, interior7: trInterior7, scape1: trScape1, scape2: trScape2, mort1: trMort1, mort2: trMort2, mort3: trMort3, mort5: trMort5, mort6: trMort6 },
      zh: { common: zhCommon, home: zhHome, home1: zhHome1, home2: zhHome2, home3: zhHome3, home4: zhHome4, home5: zhHome5, footer: zhFooter, interior1: zhInterior1, interior2: zhInterior2, interior3: zhInterior3, interior4: zhInterior4, interior5: zhInterior5, interior6: zhInterior6, interior7: zhInterior7, scape1: zhScape1, scape2: zhScape2, mort1: zhMort1, mort2: zhMort2, mort3: zhMort3, mort5: zhMort5, mort6: zhMort6 },
      tl: { common: tlCommon, home: tlHome, home1: tlHome1, home2: tlHome2, home3: tlHome3, home4: tlHome4, home5: tlHome5, footer: tlFooter, interior1: tlInterior1, interior2: tlInterior2, interior3: tlInterior3, interior4: tlInterior4, interior5: tlInterior5, interior6: tlInterior6, interior7: tlInterior7, scape1: tlScape1, scape2: tlScape2, mort1: tlMort1, mort2: tlMort2, mort3: tlMort3, mort5: tlMort5, mort6: tlMort6 },
      fa: { mort1: faMort1, mort2: faMort2, mort3: faMort3, mort5: faMort5, mort6: faMort6 }
    },

    fallbackLng: "en",

    supportedLngs: ["en","hi","de","es","fr","ru","tr","zh","tl","fa"],

    ns: [
      "common",
      "home",
      "home1",
      "home2",
      "home3",
      "home4",
      "home5",
      "footer",
      "interior1",
      "interior2",
      "interior3",
      "interior4",
      "interior5",
      "interior6",
      "interior7",
      "scape1",
      "scape2",
      "mort1",
      "mort2",
      "mort3",
      "mort5",
      "mort6"
    ],

    defaultNS: "common",

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
