import { useRef } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

export default function TestimonialsSection() {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.firstChild?.offsetWidth || 300;
      scrollContainerRef.current.scrollBy({
        left: -cardWidth - 24, // 24 = gap-6 (1.5rem)
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.firstChild?.offsetWidth || 300;
      scrollContainerRef.current.scrollBy({
        left: cardWidth + 24,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative bg-gradient-to-b from-purple-50 to-pink-50 py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <svg viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
          <path
            fill="url(#wave-gradient)"
            fillOpacity="0.2"
            d="M0,100 C300,200 400,50 720,100 C1000,150 1140,50 1440,100 L1440,0 L0,0 Z"
          />
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-4xl md:text-5xl font-bold text-gray-900 mb-16">
          What Our Clients Say
        </h2>

        {/* Scrollable Container */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* Hide scrollbar */}
            <style jsx>{`
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
            `}</style>

            {/* Card 1 */}
            <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex-shrink-0 w-80 snap-center">
              <h3 className="font-semibold text-gray-900 text-lg mb-2">Seamless Design Experience</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                The team at XOTO transformed our outdated apartment into a modern masterpiece. Their attention to detail and use of premium materials exceeded expectations.
              </p>
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <div className="h-1 bg-gradient-to-r from-cyan-400 to-green-400 rounded-full mb-3"></div>
              <p className="font-semibold text-gray-800">Priya Sharma</p>
              <p className="text-sm text-gray-500">Dubai Marina</p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex-shrink-0 w-80 snap-center">
              <h3 className="font-semibold text-gray-900 text-lg mb-2">On-Time & On-Budget</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                From concept to completion, the project was delivered on schedule and within budget. The 3D previews helped us visualize the final outcome perfectly.
              </p>
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <div className="h-1 bg-gradient-to-r from-cyan-400 to-green-400 rounded-full mb-3"></div>
              <p className="font-semibold text-gray-800">Ahmed Al-Mansoori</p>
              <p className="text-sm text-gray-500">Jumeirah, Dubai</p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex-shrink-0 w-80 snap-center">
              <h3 className="font-semibold text-gray-900 text-lg mb-2">Luxury Redefined</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                Our villa now feels like a 5-star resort. The smart home integration and sustainable materials make it both luxurious and eco-friendly.
              </p>
              <div className="flex gap-1 mb-3">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <Star className="w-4 h-4 text-gray-300" />
              </div>
              <div className="h-1 bg-gradient-to-r from-cyan-400 to-green-400 rounded-full mb-3"></div>
              <p className="font-semibold text-gray-800">Fatima Khan</p>
              <p className="text-sm text-gray-500">Palm Jumeirah</p>
            </div>

            {/* Card 4 */}
            <div className="relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex-shrink-0 w-80 snap-center">
              <div className="absolute -top-10 right-4 w-16 h-16 rounded-full overflow-hidden ring-4 ring-white shadow-xl">
                <img
                //   src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Rahul"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-gray-900 text-lg mb-2 mt-6">Dream Home Realized</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                The modular kitchen and wardrobe solutions are both beautiful and functional. XOTO made our dream home a reality with zero stress.
              </p>
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <div className="h-1 bg-gradient-to-r from-cyan-400 to-green-400 rounded-full mb-3"></div>
              <p className="font-semibold text-gray-800">Rahul Desai</p>
              <p className="text-sm text-gray-500">Abu Dhabi</p>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all z-10"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-purple-600 rounded-full p-2 shadow-md hover:shadow-lg transition-all z-10"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Optional: Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-gray-300 transition-all"
              // You can add active state with more logic
            />
          ))}
        </div>
      </div>
    </section>
  );
}