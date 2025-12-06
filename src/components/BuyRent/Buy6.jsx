import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import bgTestimonial from "../../assets/img/bgimage.png";

export default function TestimonialsSection() {
  const scrollContainerRef = useRef(null);

  // ⭐ Add active button state
  const [activeBtn, setActiveBtn] = useState("right");

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
      style={{ backgroundImage: `url(${bgTestimonial})` }}
    >
      <div className="relative w-full z-10 max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl text-center mb-12 text-white font-bold">
          What Our Clients Say
        </h2>

        {/* Scrollable Cards */}
        <div className="relative flex items-center justify-center w-full">
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory items-center w-full py-4"
          >
            {testimonials.map((t, index) => (
              <div
                key={index}
                className="flex-none w-64 sm:w-72 md:w-80 bg-white rounded-3xl shadow-xl p-8 
                flex flex-col items-center text-center snap-center hover:scale-[1.03] transition-transform duration-300"
              >
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-20 h-20 rounded-full object-cover ring-4 ring-purple-100 mb-4"
                />

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

        {/* ⭐ Navigation Buttons — EXACT STYLE YOU WANTED */}
        <div className="flex justify-center gap-3 mt-10">
          {/* LEFT */}
          <button
            onClick={() => {
              scrollLeft();
              setActiveBtn("left");
            }}
            className={`p-3 rounded-sm border transition 
              ${
                activeBtn === "left"
                  ? "bg-[var(--color-primary)] text-white border-transparent"
                  : "bg-white border-none hover:bg-[var(--color-primary)] hover:text-white"
              }`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* RIGHT */}
          <button
            onClick={() => {
              scrollRight();
              setActiveBtn("right");
            }}
            className={`p-3 rounded-sm border transition 
              ${
                activeBtn === "right"
                  ? "bg-[var(--color-primary)] text-white border-transparent"
                  : "bg-white border-none hover:bg-[var(--color-primary)] hover:text-white"
              }`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
