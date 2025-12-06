import React, { useState } from "react";
import { Bed, Bath, Square, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import waveint4 from "../../assets/img/wave/waveint.png";

const OurProperty = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  const properties = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      name: "Sobha Solis",
      location: "Motor City, Dubai",
      bedrooms: 1,
      bathrooms: 1,
      area: "546.38 Sq.ft.",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=800&q=80",
      name: "Green Villa",
      location: "California",
      bedrooms: 4,
      bathrooms: 3,
      area: "150m²",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
      name: "Urban Loft",
      location: "Chicago",
      bedrooms: 2,
      bathrooms: 2,
      area: "95m²",
    },
  ];

  const PropertyCard = ({ property }) => (
    <div className=" relative z-20 bg-white rounded-[28px] shadow-xl overflow-hidden hover:-translate-y-2 transition">
      <div className="h-[240px]">
        <img
          src={property.image}
          alt={property.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-6 bg-gradient-to-b from-white to-[#f2edff]">
        <h3 className="text-[22px] font-semibold">{property.name}</h3>
        <p className="text-gray-600 text-sm">{property.location}</p>

        <div className="flex gap-5 mt-4 text-sm text-gray-700">
          <span className="flex items-center gap-1">
            <Square size={16} /> {property.area}
          </span>
          <span className="flex items-center gap-1">
            <Bed size={16} /> {property.bedrooms}
          </span>
          <span className="flex items-center gap-1">
            <Bath size={16} /> {property.bathrooms}
          </span>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="w-full mt-6 py-3 rounded-full       bg-[var(--color-primary)] 
 text-white hover:bg-white hover:text-[#6A00C1] border-2 border-transparent hover:border-[#6A00C1] transition"
        >
          Schedule Visit
        </button>
      </div>
    </div>
  );

  return (
    <>
      <section className="relative pt-10 pb-40 bg-[var(--color-body)] overflow-hidden z-20">
        <img
          src={waveint4}
          alt=""
          className="absolute -bottom-[350px] left-0 w-full"
        />

        <div className="max-w-7xl mx-auto px-5">
          <h2 className="text-center card-heading-1 mb-16">
            Explore Properties
          </h2>

          {/* MOBILE */}
          <div className="block md:hidden">
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              autoplay={{ delay: 3500 }}
              loop
            >
              {properties.map((p) => (
                <SwiperSlide key={p.id}>
                  <PropertyCard property={p} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* DESKTOP */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-10">
            {properties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>

          {/* VIEW MORE → PAGE NAVIGATION */}
          <div className="flex justify-center mt-16 relative z-20">
            <button
              onClick={() => navigate("/properties")}
              className="      bg-[var(--color-primary)] 
 text-white px-10 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl"
            >
              View More
            </button>
          </div>
        </div>
      </section>

      {/* CALLBACK MODAL */}
      {openModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
          <div className="bg-gradient-to-br from-[#F5EFFF] to-[#E8E0FF] rounded-[30px] p-6 max-w-md w-full relative">
            <button
              onClick={() => setOpenModal(false)}
              className="absolute top-4 right-4 bg-green-400 w-8 h-8 rounded-full flex items-center justify-center"
            >
              <X size={16} />
            </button>

            <h3 className="text-center text-2xl font-bold text-[var(--color-primary)] 
">
              GET A CALL BACK FROM US!
            </h3>
            <p className="text-center text-sm mt-2">
              Get Started by completing the form below.
            </p>

            <form className="mt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input className="input" placeholder="First name" />
                <input className="input" placeholder="Last name" />
              </div>
              <input className="input" placeholder="Your Email" />
              <input className="input" placeholder="Your phone number" />
              <input className="input" placeholder="Your occupation" />
              <input className="input" placeholder="Your location" />

              <label className="flex gap-2 text-xs">
                <input type="checkbox" />
                <span>
                  I agree to receive newsletters and marketing communications.
                </span>
              </label>

              <label className="flex gap-2 text-xs">
                <input type="checkbox" defaultChecked />
                <span>I accept the Terms & Conditions and Privacy Policy.</span>
              </label>
              <button className="w-full       bg-[var(--color-primary)] 
 text-white py-3 rounded-md font-bold mt-2">
                SUBMIT
              </button>
            </form>
          </div>

          <style>{`
            .input {
              width: 100%;
              padding: 12px;
              border-radius: 999px;
              border: 1px solid #6A00C1;
              background: transparent;
              outline: none;
            }
          `}</style>
        </div>
      )}
    </>
  );
};

export default OurProperty;
