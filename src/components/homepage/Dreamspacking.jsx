import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import image from "../../assets/img/wave/waveint2.png";

const projects = [
  {
    title: "projects.kitchen",
    location: "projects.kitchenLocation",
    img: "https://images.unsplash.com/photo-1556912167-f556f1f39fdf?w=1200",
  },
  {
    title: "projects.penthouse",
    location: "projects.penthouseLocation",
    img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200",
  },
  {
    title: "projects.villa",
    location: "projects.villaLocation",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
  },
];

export default function DreamSpacesShowcase() {
  // 🔥 IMPORTANT
  const { t } = useTranslation("interior5");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoSlideRef = useRef(null);
  const [activeBtn, setActiveBtn] = useState("right");

  const next = () =>
    setCurrentIndex((prev) => (prev + 1) % projects.length);

  const prev = () =>
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);

  useEffect(() => {
    if (isPaused) return;
    autoSlideRef.current = setInterval(next, 2000);
    return () => clearInterval(autoSlideRef.current);
  }, [isPaused]);

  const getIndex = (offset) =>
    (currentIndex + offset + projects.length) % projects.length;

  return (
    <div className="relative overflow-hidden pb-24 bg-[var(--color-body)]">
      {/* Wave */}
      <div className="absolute left-0 w-full z-0 pointer-events-none select-none -bottom-20">
        <img src={image} alt="wave-bg" className="w-full object-cover" />
      </div>

      <div className="mx-auto pt-12 relative z-10 px-4">
        {/* Header */}
        <div className="flex flex-col lg:flex-row gap-8 px-6 lg:px-10 mb-16 text-center lg:text-left items-center lg:items-start w-full">

<h1 className="text-3xl sm:text-4xl lg:text-5xl heading-dark-1 text-black max-w-xl">
  {t("showcase.title")} <br />
  <span>{t("showcase.subtitle")}</span>
</h1>

<p className="text-base sm:text-lg text-[#547593] max-w-xl lg:ml-auto">
  {t("showcase.description")}
</p>

</div>

        {/* Slider */}
        <div
          className="relative w-full overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative flex justify-center items-center h-[450px]">
            {/* Left */}
            <div className="hidden md:block absolute left-0 w-[350px] opacity-70">
              <img
                src={projects[getIndex(-1)].img}
                alt={t(projects[getIndex(-1)].title)}
                className="h-64 w-full object-cover rounded-2xl"
              />
            </div>

            {/* Main */}
            <div className="absolute w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl z-30">
              <img
                src={projects[currentIndex].img}
                alt={t(projects[currentIndex].title)}
                className="h-[400px] w-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 p-6">
                <h3 className="text-3xl font-bold text-white">
                  {t(projects[currentIndex].title)}
                </h3>
                <p className="text-gray-300 mt-2">
                  {t(projects[currentIndex].location)}
                </p>
              </div>
            </div>

            {/* Right */}
            <div className="hidden md:block absolute right-0 w-[350px] opacity-70">
              <img
                src={projects[getIndex(1)].img}
                alt={t(projects[getIndex(1)].title)}
                className="h-64 w-full object-cover rounded-2xl"
              />
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-3 mt-8">
            <button onClick={prev} className="p-3 border rounded-sm bg-white">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={next} className="p-3 border rounded-sm bg-white">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
