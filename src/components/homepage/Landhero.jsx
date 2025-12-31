import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TreePine, Home, Droplets, Sparkles } from "lucide-react";
import interiorImage from "../../assets/img/interior.jpg";
import { useTranslation } from "react-i18next";
// import wave2 from "../../assets/img/wave/wave2.png";

export default function HeroSection() {
  const { t } = useTranslation(["scape1"]);

  const services = [
    { icon: <TreePine className="w-5 h-5" />, title: t("services.design") },
    { icon: <Home className="w-5 h-5" />, title: t("services.hardscape") },
  ];

  const services2 = [
    { icon: <Droplets className="w-5 h-5" />, title: t("services.pool") },
    { icon: <Sparkles className="w-5 h-5" />, title: t("services.outdoor") },
  ];

  return (
    <section className="relative flex items-center py-20 lg:py-36 justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={interiorImage}
          alt="Premium rooftop garden"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Clip Shapes */}
      <div className="absolute bottom-0 left-0 w-70 h-10 bg-[var(--color-body)] z-[5] clip-left-shape" />
      <div className="absolute bottom-0 right-0 w-70 h-10 bg-[var(--color-body)] z-[5] clip-right-shape" />

      <style>{`
        .clip-left-shape {
          clip-path: polygon(0 0, 55% 0, 100% 100%, 0% 100%);
        }
        .clip-right-shape {
          clip-path: polygon(47% 0, 100% 0, 100% 100%, 0% 100%);
        }
      `}</style>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 heading-light"
        >
          Transforming Homes With Premium <br />
          <span className="text-white">Outdoor Solution</span>
        </motion.h1>

        {/* Services */}
        {[services, services2].map((group, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 gap-3 max-w-[850px] mx-auto mb-5"
          >
            {group.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 0.9 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl py-2"
              >
                <h3 className="text-sm md:text-xl text-center">
                  {service.title}
                </h3>
              </motion.div>
            ))}
          </motion.div>
        ))}
        {/* CTA */}
        <Link to="/estimate/calculator">
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 }}
            whileHover={{ scale: 1.05 }}
            className="bg-[var(--color-primary)] px-10 py-3 rounded-md text-lg font-bold shadow-xl"
          >
            Get a free estimate
          </motion.button>
        </Link>
      </div>
    </section>
  );
}