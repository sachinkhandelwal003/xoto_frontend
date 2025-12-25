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
import enbuy1 from './locales/en/buy1.json'
import enbuy2 from './locales/en/buy2.json'
import enbuy3 from './locales/en/buy3.json'
import enbuy4 from './locales/en/buy4.json'
import enbuy5 from './locales/en/buy5.json'


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
import hibuy1 from './locales/hi/buy1.json'
import hibuy2 from './locales/hi/buy2.json'
import hibuy3 from './locales/hi/buy3.json'
import hibuy4 from './locales/hi/buy4.json'
import hibuy5 from './locales/hi/buy5.json'

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
import debuy1 from './locales/de/buy1.json'
import debuy2 from './locales/de/buy2.json'
import debuy3 from './locales/de/buy3.json'
import debuy4 from './locales/de/buy4.json'
import debuy5 from './locales/de/buy5.json'

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
import esbuy1 from './locales/es/buy1.json'
import esbuy2 from './locales/es/buy2.json'
import esbuy3 from './locales/es/buy3.json'
import esbuy4 from './locales/es/buy4.json'
import esbuy5 from './locales/es/buy5.json'

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
import frbuy1 from './locales/fr/buy1.json'
import frbuy2 from './locales/fr/buy2.json'
import frbuy3 from './locales/fr/buy3.json'
import frbuy4 from './locales/fr/buy4.json'
import frbuy5 from './locales/fr/buy5.json'

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
import rubuy1 from './locales/ru/buy1.json'
import rubuy2 from './locales/ru/buy2.json'
import rubuy3 from './locales/ru/buy3.json'
import rubuy4 from './locales/ru/buy4.json'
import rubuy5 from './locales/ru/buy5.json'

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
import trbuy1 from './locales/tr/buy1.json'
import trbuy2 from './locales/tr/buy2.json'
import trbuy3 from './locales/tr/buy3.json'
import trbuy4 from './locales/tr/buy4.json'
import trbuy5 from './locales/tr/buy5.json'

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
import zhbuy1 from './locales/zh/buy1.json'
import zhbuy2 from './locales/zh/buy2.json'
import zhbuy3 from './locales/zh/buy3.json'
import zhbuy4 from './locales/zh/buy4.json'
import zhbuy5 from './locales/zh/buy5.json'

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
import tlbuy1 from './locales/tl/buy1.json'
import tlbuy2 from './locales/tl/buy2.json'
import tlbuy3 from './locales/tl/buy3.json'
import tlbuy4 from './locales/tl/buy4.json'
import tlbuy5 from './locales/tl/buy5.json'

/* =========================
   INIT
========================= */

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: enCommon, home: enHome, home1: enHome1, home2: enHome2, home3: enHome3, home4: enHome4, home5: enHome5, footer: enFooter, interior1: enInterior1, interior2: enInterior2, interior3: enInterior3, interior4: enInterior4, interior5: enInterior5, interior6: enInterior6, interior7: enInterior7, scape1: enScape1, scape2: enScape2, buy1: enbuy1, buy2: enbuy2, buy3: enbuy3, buy4: enbuy4, buy5: enbuy5  },
      hi: { common: hiCommon, home: hiHome, home1: hiHome1, home2: hiHome2, home3: hiHome3, home4: hiHome4, home5: hiHome5, footer: hiFooter, interior1: hiInterior1, interior2: hiInterior2, interior3: hiInterior3, interior4: hiInterior4, interior5: hiInterior5, interior6: hiInterior6, interior7: hiInterior7, scape1: hiScape1, scape2: hiScape2, buy1: hibuy1, buy2: hibuy2, buy3: hibuy3, buy4: hibuy4, buy5: hibuy5  },
      de: { common: deCommon, home: deHome, home1: deHome1, home2: deHome2, home3: deHome3, home4: deHome4, home5: deHome5, footer: deFooter, interior1: deInterior1, interior2: deInterior2, interior3: deInterior3, interior4: deInterior4, interior5: deInterior5, interior6: deInterior6, interior7: deInterior7, scape1: deScape1, scape2: deScape2, buy1: debuy1, buy2: debuy2, buy3: debuy3, buy4: debuy4, buy5: debuy5  },
      es: { common: esCommon, home: esHome, home1: esHome1, home2: esHome2, home3: esHome3, home4: esHome4, home5: esHome5, footer: esFooter, interior1: esInterior1, interior2: esInterior2, interior3: esInterior3, interior4: esInterior4, interior5: esInterior5, interior6: esInterior6, interior7: esInterior7, scape1: esScape1, scape2: esScape2, buy1: esbuy1, buy2: esbuy2, buy3: esbuy3, buy4: esbuy4, buy5: esbuy5  },
      fr: { common: frCommon, home: frHome, home1: frHome1, home2: frHome2, home3: frHome3, home4: frHome4, home5: frHome5, footer: frFooter, interior1: frInterior1, interior2: frInterior2, interior3: frInterior3, interior4: frInterior4, interior5: frInterior5, interior6: frInterior6, interior7: frInterior7, scape1: frScape1, scape2: frScape2, buy1: frbuy1, buy2: frbuy2, buy3: frbuy3, buy4: frbuy4, buy5: frbuy5  },
      ru: { common: ruCommon, home: ruHome, home1: ruHome1, home2: ruHome2, home3: ruHome3, home4: ruHome4, home5: ruHome5, footer: ruFooter, interior1: ruInterior1, interior2: ruInterior2, interior3: ruInterior3, interior4: ruInterior4, interior5: ruInterior5, interior6: ruInterior6, interior7: ruInterior7, scape1: ruScape1, scape2: ruScape2, buy1: rubuy1, buy2: rubuy2, buy3: rubuy3, buy4: rubuy4, buy5: rubuy5  },
      tr: { common: trCommon, home: trHome, home1: trHome1, home2: trHome2, home3: trHome3, home4: trHome4, home5: trHome5, footer: trFooter, interior1: trInterior1, interior2: trInterior2, interior3: trInterior3, interior4: trInterior4, interior5: trInterior5, interior6: trInterior6, interior7: trInterior7, scape1: trScape1, scape2: trScape2, buy1: trbuy1, buy2: trbuy2, buy3: trbuy3, buy4: trbuy4, buy5: trbuy5  },
      zh: { common: zhCommon, home: zhHome, home1: zhHome1, home2: zhHome2, home3: zhHome3, home4: zhHome4, home5: zhHome5, footer: zhFooter, interior1: zhInterior1, interior2: zhInterior2, interior3: zhInterior3, interior4: zhInterior4, interior5: zhInterior5, interior6: zhInterior6, interior7: zhInterior7, scape1: zhScape1, scape2: zhScape2, buy1: zhbuy1, buy2: zhbuy2, buy3: zhbuy3, buy4: zhbuy4, buy5: zhbuy5  },
      tl: { common: tlCommon, home: tlHome, home1: tlHome1, home2: tlHome2, home3: tlHome3, home4: tlHome4, home5: tlHome5, footer: tlFooter, interior1: tlInterior1, interior2: tlInterior2, interior3: tlInterior3, interior4: tlInterior4, interior5: tlInterior5, interior6: tlInterior6, interior7: tlInterior7, scape1: tlScape1, scape2: tlScape2, buy1: tlbuy1, buy2: tlbuy2, buy3: tlbuy3, buy4: tlbuy4, buy5: tlbuy5  }
    },
    fallbackLng: "en",
    supportedLngs: ["en", "hi", "de", "es", "fr", "ru", "tr", "zh", "tl"],
    ns: ["common","home","home1","home2","home3","home4","home5","footer","interior1","interior2","interior3","interior4","interior5","interior6","interior7","scape1","scape2"],
    defaultNS: "common",
    interpolation: { escapeValue: false }
  });

export default i18n;
  
