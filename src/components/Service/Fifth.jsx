import { useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import image from "../../assets/img/wave/wave2.png";;

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
    // cardWidth is calculated to include the gap (24px for gap-6)
    const cardWidth = scrollRef.current.firstChild.offsetWidth + 24; 
    scrollRef.current.scrollBy({ left: direction * cardWidth, behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 min-h-screen w-full flex items-center pt-16">
      <div className="relative w-full z-10 px-6 md:px-20">

        <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 text-gray-900">
          What Our Clients Say
        </h2>

        {/* SCROLL AREA */}
        <div className="relative h-[420px] flex items-center">
          <div
            ref={scrollRef}
            className="flex overflow-x-scroll gap-6 snap-x snap-mandatory scroll-smooth w-full scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="snap-start bg-white flex-none w-[22%] min-w-[220px] rounded-2xl p-6 text-center 
                         transition-transform duration-300
                         
                         /* Custom Shadow using 5C039B */
                         shadow-[0_4px_15px_rgba(92,3,155,0.2)] 
                         hover:shadow-[0_8px_25px_rgba(92,3,155,0.3)]
                         hover:-translate-y-2"
              >
                {/* IMAGE */}
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto border-4 border-white shadow-md mb-4"
                />

                {/* TITLE */}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.title}</h3>

                {/* TEXT */}
                <p className="text-[#547593] text-sm mb-4 leading-relaxed">
                  {t.text}
                </p>

                {/* STARS */}
                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      // Changed logic slightly: fill 4 stars, leave 5th unfilled (common pattern)
                      className={`w-4 h-4 ${j < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>

                {/* COLOR LINE */}
                <div className="w-full h-[4px] rounded-full bg-gradient-to-r from-[#03A4F4] to-[#64EF0A]" />

                {/* NAME */}
                <div className="pt-3">
                  <p className="font-medium text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-center gap-6 mt-12 mb-4">
          <button
            onClick={() => slide(-1)}
            className="bg-white border rounded-md p-3 shadow-md hover:scale-110 transition-transform"
          >
            <ChevronLeft className="w-7 h-7 text-black" />
          </button>

          <button
            onClick={() => slide(1)}
            className="bg-[#5C039B] rounded-md p-3 shadow-md hover:bg-purple-700 hover:scale-110 transition-transform"
          >
            <ChevronRight className="w-7 h-7 text-white" />
          </button>
        </div>
      </div>

      {/* BACKGROUND */}
      <div className="absolute -bottom-90 left-0 w-full z-0">
        <img src={image} alt="wave-bg" className="w-full object-cover" />
      </div>
    </section>
  );
}