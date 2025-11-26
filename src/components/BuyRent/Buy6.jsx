import { useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import image from "../../assets/img/wave/waveint3.png";
import bgTestimonial from "../../assets/img/bgimage.png"; // <-- ADD YOUR IMAGE HERE

export default function TestimonialsSection() {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.firstChild?.offsetWidth || 320;
      scrollContainerRef.current.scrollBy({
        left: -(cardWidth + 24),
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.firstChild?.offsetWidth || 320;
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
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    },
    {
      title: "Found amazing place",
      text: "RentBro made it so easy for me to settle in new city, with fair price and amazing neighborhood, recommending it to everyone.",
      name: "Punit",
      location: "Pune, Maharashtra",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    },
    {
      title: "Amazing neighborhood!",
      text: "RentBro made it so easy for me to settle in new city, with fair price and amazing neighborhood, recommending it to everyone.",
      name: "Harsh",
      location: "HSR Layout, Bangalore",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
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
      title: "Amazing place",
      text: "RentBro made it so easy for me to settle in new city, with fair price and amazing neighborhood, recommending it to everyone.",
      name: "Jai Mathur",
      location: "Pune, Maharashtra",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    },
    {
      title: "Amazing place",
      text: "RentBro made it so easy for me to settle in new city, with fair price and amazing neighborhood, recommending it to everyone.",
      name: "Madhur",
      location: "Pune, Maharashtra",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    },
    {
      title: "Amazing place",
      text: "RentBro made it so easy for me to settle in new city, with fair price and amazing neighborhood, recommending it to everyone.",
      name: "Avn",
      location: "Pune, Maharashtra",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    },
    {
      title: "Amazing place",
      text: "RentBro made it so easy for me to settle in new city, with fair price and amazing neighborhood, recommending it to everyone.",
      name: "Sam",
      location: "Pune, Maharashtra",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    },
  ];

  return (
    <section
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat min-h-screen w-full flex items-center"
      style={{
        backgroundImage: `url(${bgTestimonial})`,
      }}
    >
      <div className="relative w-full z-10 px-20 box-border">

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
          What Our Clients Say
        </h2>

        {/* Scrollable Wrapper */}
        <div className="relative h-[420px] flex items-center justify-center">
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory h-full items-center w-full"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {testimonials.map((t, index) => (
              <div
                key={index}
                className="flex-none w-80 bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center text-center snap-center hover:scale-100 transition-transform duration-300"
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

                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-3">{t.title}</h3>
                <p className="text-black text-sm leading-relaxed mb-6 flex-grow">
                  {t.text}
                </p>

                {/* Footer */}
                <div className="border-t border-gray-200 pt-4 w-full">
                  <p className="font-semibold text-gray-900">{t.name}</p>
                  <p className="text-sm text-black">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="flex justify-center gap-6 mt-10">
          <button
            onClick={scrollLeft}
            className="bg-white shadow-xl rounded-full p-3 hover:bg-gray-100 transition-all"
          >
            <ChevronLeft className="w-7 h-7 text-black" />
          </button>

          <button
            onClick={scrollRight}
            className="bg-[#5C039B] shadow-xl rounded-full p-3 hover:bg-[#5C039B] transition-all"
          >
            <ChevronRight className="w-7 h-7 text-white" />
          </button>
        </div>
      </div>

   
    </section>
  );
}
