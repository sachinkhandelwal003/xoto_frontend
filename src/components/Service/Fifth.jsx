import { useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import image from "../../assets/img/wave/wave2.png";

export default function TestimonialsSection() {
  const scrollRef = useRef(null);

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

  const slide = (direction) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.firstChild.offsetWidth + 24; // gap-6 = 24px
    scrollRef.current.scrollBy({ left: direction * cardWidth, behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 w-full flex flex-col items-center pt-12 md:pt-16">
      <div className="relative w-full z-10 px-4 sm:px-10 md:px-20">

        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center card-heading-1">
          What Our Clients Say
        </h2>

        {/* SCROLL AREA */}
        <div className=" mt-5 relative flex items-center h-auto sm:h-[380px] md:h-[420px]">
          <div
            ref={scrollRef}
            className="flex overflow-x-scroll gap-4 sm:gap-6 snap-x snap-mandatory scroll-smooth w-full scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="snap-start bg-white flex-none w-[70%] sm:w-[45%] md:w-[30%] lg:w-[22%] min-w-[220px] rounded-2xl p-4 sm:p-6 text-center transition-transform duration-300
                          shadow-[0_4px_15px_rgba(92,3,155,0.2)] 
                          hover:shadow-[0_8px_25px_rgba(92,3,155,0.3)]
                          hover:-translate-y-2"
              >
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover mx-auto border-4 border-white shadow-md mb-3 sm:mb-4"
                />

                <h3 className="text-sm sm:text-lg font-semibold text-gray-900 mb-2">{t.title}</h3>

                <p className="text-xs sm:text-sm text-[#547593] mb-3 sm:mb-4 leading-relaxed">
                  {t.text}
                </p>

                <div className="flex justify-center gap-1 mb-2 sm:mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      className={`w-3 h-3 sm:w-4 sm:h-4 ${j < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>

                <div className="w-full h-[3px] sm:h-[4px] rounded-full bg-gradient-to-r from-[#03A4F4] to-[#64EF0A]" />

                <div className="pt-2 sm:pt-3">
                  <p className="font-medium text-gray-900 text-sm sm:text-base">{t.name}</p>
                  <p className="text-xs sm:text-sm text-gray-500">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-center gap-4 sm:gap-6 mt-6 sm:mt-8 md:mt-12 mb-4 z-10 relative">
          <button
            onClick={() => slide(-1)}
            className="bg-white border rounded-md p-2 sm:p-3 shadow-md hover:scale-110 transition-transform"
          >
            <ChevronLeft className="w-5 sm:w-7 h-5 sm:h-7 text-black" />
          </button>

          <button
            onClick={() => slide(1)}
            className="bg-[#5C039B] rounded-md p-2 sm:p-3 shadow-md hover:bg-purple-700 hover:scale-110 transition-transform"
          >
            <ChevronRight className="w-5 sm:w-7 h-5 sm:h-7 text-white" />
          </button>
        </div>
      </div>

      {/* BACKGROUND WAVE */}
      <div className="absolute left-0 w-full z-0 -bottom-8 sm:-bottom-12 md:-bottom-20 lg:-bottom-100">
        <img src={image} alt="wave-bg" className="w-full object-cover" />
      </div>
    </section>
  );
}
