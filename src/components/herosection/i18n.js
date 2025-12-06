// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Don't use Backend if using local resources
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    
    // Define your resources directly
    resources: {
      en: {
        translation: {
          common: {
            poweredBy: "Powered by AI. Inspired by you."
          },
          nav: {
            home: "Home",
            landscaping: "Landscaping",
            interiors: "Interiors",
            properties: "Properties",
            services: "Services",
            partnerEcosystem: "Partner Eco-System",
            xotoStore: "Xoto Store",
            blogs: "Blogs",
            contactUs: "Contact Us",
            login: "Login"
          },
          hero: {
            title1: "Redefining Living",
            title2: "From Landscapes to Homes",
            description: "Discover AI-powered designs and curated properties that elevate every corner of your world.",
            designMySpace: "Design My Space",
            exploreHomes: "Explore Homes",
            features: {
              oneStop: "One Stop",
              solution: "Solution",
              fasterTurn: "Faster Turn",
              aroundTime: "Around Time",
              professional: "Professional",
              teams: "Teams",
              panUae: "PAN UAE",
              presence: "Presence"
            }
          }
        }
      },
      hi: {
        translation: {
          common: {
            poweredBy: "AI द्वारा संचालित। आपसे प्रेरित।"
          },
          nav: {
            home: "होम",
            landscaping: "लैंडस्केपिंग",
            interiors: "इंटीरियर",
            properties: "संपत्ति",
            services: "सेवाएं",
            partnerEcosystem: "पार्टनर इको-सिस्टम",
            xotoStore: "ज़ोटो स्टोर",
            blogs: "ब्लॉग",
            contactUs: "संपर्क करें",
            login: "लॉगिन"
          },
          hero: {
            title1: "जीवन को नए रूप में परिभाषित करना",
            title2: "लैंडस्केप से लेकर घरों तक",
            description: "एआई-संचालित डिजाइन और क्यूरेटेड संपत्तियां खोजें जो आपकी दुनिया के हर कोने को उन्नत करती हैं।",
            designMySpace: "मेरी जगह डिजाइन करें",
            exploreHomes: "घरों का अन्वेषण करें",
            features: {
              oneStop: "वन स्टॉप",
              solution: "समाधान",
              fasterTurn: "तेज टर्न",
              aroundTime: "अराउंड टाइम",
              professional: "पेशेवर",
              teams: "टीमें",
              panUae: "पैन यूएई",
              presence: "उपस्थिति"
            }
          }
        }
      },
      ar: {
        translation: {
          common: {
            poweredBy: "مدعوم بالذكاء الاصطناعي. من إلهامك."
          },
          nav: {
            home: "الرئيسية",
            landscaping: "تنسيق الحدائق",
            interiors: "الداخلية",
            properties: "العقارات",
            services: "الخدمات",
            partnerEcosystem: "النظام البيئي للشركاء",
            xotoStore: "متجر Xoto",
            blogs: "المدونات",
            contactUs: "اتصل بنا",
            login: "تسجيل الدخول"
          },
          hero: {
            title1: "إعادة تعريف المعيشة",
            title2: "من المناظر الطبيعية إلى المنازل",
            description: "اكتشف التصميمات المدعومة بالذكاء الاصطناعي والعقارات المختارة التي ترفع مستوى كل ركن من أركان عالمك.",
            designMySpace: "صمم مساحتي",
            exploreHomes: "استكشاف المنازل",
            features: {
              oneStop: "محطة واحدة",
              solution: "حل",
              fasterTurn: "أسرع دوران",
              aroundTime: "حول الوقت",
              professional: "محترف",
              teams: "فرق",
              panUae: "وجود عموم الإمارات",
              presence: "الحضور"
            }
          }
        }
      }
    },
    
    interpolation: {
      escapeValue: false,
    },
    
    detection: {
      order: ['localStorage', 'cookie', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage', 'cookie'],
    },
  });

export default i18n;