import { useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import bgTestimonial from "../../assets/img/bgimage.png";

export default function TestimonialsSection() {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth =
        scrollContainerRef.current.firstChild?.offsetWidth || 300;
      scrollContainerRef.current.scrollBy({
        left: -(cardWidth + 24),
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth =
        scrollContainerRef.current.firstChild?.offsetWidth || 300;
      scrollContainerRef.current.scrollBy({
        left: cardWidth + 24,
        behavior: "smooth",
      });
    }
  };

  const testimonials = [
    {
      title: "Found amazing place",
      text: "RentBro made it so easy for me to settle in new city, with fair price and amazing neighborhood, recommending it to everyone.",
      name: "Shubham",
      location: "Pune, Maharashtra",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    },
    {
      title: "Found amazing place",
      text: "RentBro made it so easy for me to settle in new city, with fair price and amazing neighborhood, recommending it to everyone.",
      name: "Shubham",
      location: "Pune, Maharashtra",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    },
    {
      title: "Found amazing place",
      text: "RentBro made it so easy for me to settle in new city, with fair price and amazing neighborhood, recommending it to everyone.",
      name: "Shubham",
      location: "Pune, Maharashtra",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    },
    {
      title: "Found amazing place",
      text: "RentBro made it so easy for me to settle in new city, with fair price and amazing neighborhood, recommending it to everyone.",
      name: "Shubham",
      location: "Pune, Maharashtra",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    },
    {
      title: "Found amazing place",
      text: "RentBro made it so easy for me to settle in new city, with fair price and amazing neighborhood, recommending it to everyone.",
      name: "Punit",
      location: "Pune, Maharashtra",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    },
    {
      title: "Amazing neighborhood!",
      text: "RentBro made it so easy for me to settle in new city, with fair price and amazing neighborhood, recommending it to everyone.",
      name: "Harsh",
      location: "HSR Layout, Bangalore",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    },
  ];

  return (
    <section
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat py-20 px-4 sm:px-8 lg:px-16"
      style={{
        backgroundImage: `url(${bgTestimonial})`,
      }}
    >
      <div className="relative w-full z-10 max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl text-center mb-12 text-white font-bold">
          What Our Clients Say
        </h2>

        {/* Scrollable CARD WRAPPER */}
        <div className="relative flex items-center justify-center w-full">
          <div
            ref={scrollContainerRef}
            className="
              flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth snap-x
              snap-mandatory items-center w-full py-4
            "
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {testimonials.map((t, index) => (
              <div
                key={index}
                className="
                  flex-none w-64 sm:w-72 md:w-80 bg-white rounded-3xl shadow-xl p-8 
                  flex flex-col items-center text-center snap-center 
                  hover:scale-[1.03] transition-transform duration-300
                "
              >
                {t.image ? (
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-20 h-20 rounded-full object-cover ring-4 ring-purple-100 mb-4"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-teal-400 mb-4" />
                )}

                {/* Star Rating */}
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < 4
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {t.title}
                </h3>

                <p className="text-gray-700 text-sm leading-relaxed mb-6 flex-grow">
                  {t.text}
                </p>

                <div className="border-t border-gray-200 pt-4 w-full">
                  <p className="font-semibold text-gray-900">{t.name}</p>
                  <p className="text-sm text-gray-600">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Navigation Buttons */}
        <div className="flex justify-center gap-4 mt-10">
          <button
            onClick={scrollLeft}
            className="
              bg-white shadow-xl rounded-full p-3 hover:bg-gray-100 
              transition-all flex items-center justify-center
            "
          >
            <ChevronLeft className="w-6 h-6 text-black" />
          </button>

          <button
            onClick={scrollRight}
            className="
              bg-[#5C039B] shadow-xl rounded-full p-3 hover:bg-[#6B00E5] 
              transition-all flex items-center justify-center
            "
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </section>
  );
}
