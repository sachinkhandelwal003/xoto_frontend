import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TreePine, Home, Droplets, Tent } from "lucide-react"; // Updated icons
import interiorImage from "../../assets/img/interior.jpg";

export default function HeroSection() {

  // Top Row Data (Narrower Width)
  const servicesTop = [
    { icon: <TreePine className="w-5 h-5" />, title: "Landscape Design & Execution" },
    { icon: <Home className="w-5 h-5" />, title: "Hardscaping & Surface Works" },
  ];

  // Bottom Row Data (Wider Width)
  const servicesBottom = [
    { icon: <Tent className="w-5 h-5" />, title: "Outdoor Structures & Living Spaces" },
    { icon: <Droplets className="w-5 h-5" />, title: "Swimming Pools & Water Feature" },
  ];

  // Reusable Pill Component
  const ServicePill = ({ icon, title, delay }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      className="bg-white/10 backdrop-blur-md rounded-[15px] p-1 flex items-center justify-center shadow-lg hover:bg-white/30 transition-all cursor-default min-h-[40px]"
    >
      <h3 className="text-[10px] sm:text-sm md:text-lg font-medium text-white tracking-wide whitespace-normal text-center leading-tight">
        {title}
      </h3>
    </motion.div>
  );

  return (
    <section className="relative flex items-center py-24 lg:py-40 justify-center overflow-hidden min-h-[600px]">
      
      {/* Background Image & Overlay */}
      <div className="absolute inset-0">
        <img
          src={interiorImage}
          alt="Premium Outdoor Solution"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />
      </div>

      {/* Decorative Bottom Clips */}
     <div className="absolute bottom-0 left-0 w-70 h-10 bg-[var(--color-body)] z-[5] clip-left-shape border-none "></div>
      <div className="absolute bottom-0 right-0 w-70 h-10  bg-[var(--color-body)] z-[5] clip-right-shape border-none"></div>

      {/* Custom clip paths */}
      <style>{`
        .clip-left-shape {
          clip-path: polygon(0 0, 55% 0, 100% 100%, 0% 100%);
        }
        .clip-right-shape {
          clip-path: polygon(47% 0, 100% 0, 100% 100%, 0% 100%);
        }
      `}</style>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col items-center text-center text-white">
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 heading-light"
        >
          Transforming Homes With Premium <br />
          <span className="text-white">Outdoor Solution</span>
        </motion.h1>

        {/* Feature Pills Container */}
        <div className="w-full flex flex-col items-center gap-3 md:gap-5 mb-12">
          
          {/* TOP ROW: Always 2 Columns */}
          <div className="w-full max-w-[750px] grid grid-cols-2 gap-3 md:gap-4">
            {servicesTop.map((service, i) => (
              <ServicePill 
                key={i} 
                icon={service.icon} 
                title={service.title} 
                delay={0.3 + i * 0.1} 
              />
            ))}
          </div>

          {/* BOTTOM ROW: Always 2 Columns */}
          <div className="w-full max-w-[820px] grid grid-cols-2 gap-3 md:gap-4">
            {servicesBottom.map((service, i) => (
              <ServicePill 
                key={i} 
                icon={service.icon} 
                title={service.title} 
                delay={0.5 + i * 0.1} 
              />
            ))}
          </div>

        </div>

        {/* CTA Button */}
        <Link to="/estimate/calculator">
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[var(--color-primary)] text-white px-12 py-4 rounded-lg text-lg shadow-xl"
          >
            Get a free estimate
          </motion.button>
        </Link>

      </div>
    </section>
  );
}