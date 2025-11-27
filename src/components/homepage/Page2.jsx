import React from "react";
import img1 from "../../assets/img/Image12.jpg";
import img2 from "../../assets/img/Image11.jpg";
import img3 from "../../assets/img/Image 10.jpg";
import img4 from "../../assets/img/IMG9.png";
import wave1 from "../../assets/img/wave/wave2.png";

const properties = [
  {
    id: 1,
    title: "Modern Apartment",
    price: "$190,000",
    image: img1,
    label: "Sell",
  },
  {
    id: 2,
    title: "City Apartment",
    price: "$180,000",
    image: img2,
    label: "Rent",
  },
  {
    id: 3,
    title: "Luxury Apartment",
    price: "$220,000",
    image: img3,
    label: "Sell",
  },
  {
    id: 4,
    title: "Modern Apartment",
    price: "$190,000",
    image: img1,
    label: "Sell",
  },
  {
    id: 5,
    title: "City Apartment",
    price: "$180,000",
    image: img2,
    label: "Rent",
  },
  {
    id: 6,
    title: "Luxury Apartment",
    price: "$220,000",
    image: img3,
    label: "Sell",
  },
  {
    id: 7,
    title: "Modern Apartment",
    price: "$190,000",
    image: img1,
    label: "Sell",
  },
  {
    id: 8,
    title: "City Apartment",
    price: "$180,000",
    image: img2,
    label: "Rent",
  },
  {
    id: 9,
    title: "Luxury Apartment",
    price: "$220,000",
    image: img3,
    label: "Sell",
  },
];

const Page2 = () => {
  return (
    <div>
      <section
        className="relative bg-cover bg-center h-[500px] flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${img4})` }}
      >
        <div className="hidden lg:block absolute bottom-0 left-0 w-70 h-10 bg-[var(--color-body)] z-[5] clip-left-shape"></div>
        <div className="hidden lg:block absolute bottom-0 right-0 w-70 h-10 bg-[var(--color-body)] z-[5] clip-right-shape"></div>

        <style>{`
          .clip-left-shape {
            clip-path: polygon(0 0, 55% 0, 100% 100%, 0% 100%);
          }
          .clip-right-shape {
            clip-path: polygon(47% 0, 100% 0, 100% 100%, 0% 100%);
          }
        `}</style>

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4">
          <h1 className="font-dmSans font-extrabold text-[50px] leading-[76px] text-white text-center">
            XOTO Properties
          </h1>

          <p className="mt-6 text-white font-semibold text-[24px] leading-[30px] max-w-[814px] w-full text-center">
            Get in touch with our luxury real estate experts. We’re here to{" "}
            <span className="whitespace-nowrap">help you</span> with all your
            property needs in the UAE.
          </p>
        </div>
      </section>

      <section className="py-16 bg-[var(--color-body)] flex flex-col items-center">
        <h2
          className="
            font-dmSans font-semibold text-5xl 
            leading-[55px] tracking-[-0.03em]
            text-[#020202] text-center mb-10
          "
        >
          Our Properties
        </h2>

        {/* Property Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-[90%] md:w-[80%]">
          {properties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition duration-300 group"
            >
              {/* IMAGE + LABELS (SELL / RENT + HEART ICON) */}
              <div className="overflow-hidden relative">
                {/* Sell Badge */}
                <span className="absolute top-3 left-3 bg-white px-3 py-1 rounded-md text-sm font-medium shadow z-20">
                  Sell
                </span>

                {/* Like Icon */}
            <button className="absolute top-3 right-3 bg-white w-10 h-10 flex items-center justify-center rounded-md shadow z-20">
  <i className="fa-solid fa-heart text-[#5C039B] text-lg"></i>
</button>


                {/* Image */}
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-70 object-cover transform group-hover:scale-110 transition duration-500 ease-in-out relative z-10"
                />
              </div>

              {/* Property Content */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800">
                  {property.title}
                </h3>

                <p className="text-[#5C039B] font-bold text-xl mt-1">
                  {property.price}
                </p>

                {/* Info Row */}
                <div className="flex justify-between text-gray-600 text-sm mt-3">
                  <div className="flex items-center gap-1">
                    <i className="fa-solid fa-bed"></i>
                    <span>2 Bed</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <i className="fa-solid fa-bath"></i>
                    <span>2 Bath</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <i className="fa-solid fa-ruler-combined"></i>
                    <span>2500 sqft</span>
                  </div>
                </div>

                {/* Button */}
                <button className="w-full bg-[#5C039B] hover:bg-[#4b0281] active:scale-95 text-white py-4 mt-5 rounded-md text-lg transition font-medium">
                  Show Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* WAVE BACKGROUND */}
        <div className="py-8 relative w-full flex justify-center">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <img
              src={wave1}
              alt=""
              className="absolute left-1/2 -translate-x-1/2 translate-y-[150px] w-[140%] min-w-[140%] lg:min-w-full lg:scale-100 -z-20 select-none"
            />
          </div>

          <button className="bg-[#5C039B] hover:bg-[#4b0281] active:scale-95 text-white px-25 py-4 mt-5 rounded-md transition text-lg font-medium">
            Load More
          </button>
        </div>
      </section>
    </div>
  );
};

export default Page2;
