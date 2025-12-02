import React from "react";
import { FaBed, FaBath, FaRulerCombined } from "react-icons/fa";
import propertyImg from "../../assets/img/Property.png";

const Property = () => {
  const deals = [
    {
      id: 1,
      name: "Sobha Solis",
      location: "Motor City, Dubai",
      beds: 1,
      bathroom: 1,
      area: "546.38 Sq.ft.",
      imgUrl: propertyImg,
    },
    {
      id: 2,
      name: "Palm Residence",
      location: "Business Bay, Dubai",
      beds: 2,
      bathroom: 2,
      area: "680 Sq.ft.",
      imgUrl: propertyImg,
    },
    {
      id: 3,
      name: "Cayan Tower",
      location: "Dubai Marina",
      beds: 3,
      bathroom: 2,
      area: "720 Sq.ft.",
      imgUrl: propertyImg,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-12">
      
      {/* Heading */}
      <h2 className="text-center text-3xl sm:text-4xl font-bold mb-14 text-[#1A1A1A]">
        Our Property
      </h2>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {deals.map((deal) => (
          <PropertyCard key={deal.id} deal={deal} />
        ))}
      </div>

    </div>
  );
};

function PropertyCard({ deal }) {
  return (
    <div className="w-full bg-white rounded-[30px] shadow-lg overflow-hidden hover:scale-[1.02] transition-all duration-300">

      {/* Image */}
      <div className="h-[220px] sm:h-[250px] w-full overflow-hidden rounded-t-[30px]">
        <img
          src={deal.imgUrl}
          alt={deal.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Card Content */}
      <div className="p-6 bg-gradient-to-b from-[#F7F6F9] to-white">

        {/* Title */}
        <h3 className="text-[20px] sm:text-[22px] font-semibold text-[#1A1A1A]">
          {deal.name}
        </h3>

        {/* Location */}
        <p className="text-[#676767] text-[14px] sm:text-[15px] mt-1">
          {deal.location}
        </p>

        {/* Features Row */}
        <div className="flex items-center gap-5 sm:gap-6 mt-5 text-[#4A4A4A] text-[14px]">

          {/* Area */}
          <div className="flex items-center gap-2">
            <FaRulerCombined size={15} />
            <span>{deal.area}</span>
          </div>

          {/* Beds */}
          <div className="flex items-center gap-2">
            <FaBed size={15} />
            <span>{deal.beds} Beds</span>
          </div>

          {/* Baths */}
          <div className="flex items-center gap-2">
            <FaBath size={15} />
            <span>{deal.bathroom} Baths</span>
          </div>
        </div>

        {/* Button */}
        <button className="
          w-full bg-[#6A00D4] text-white font-semibold py-3 
          rounded-full mt-7 text-[15px] shadow-md
          transition-all border-2 border-transparent
          hover:bg-white hover:text-[#6A00D4] hover:border-[#6A00D4]
        ">
          Schedule Visit
        </button>

      </div>
    </div>
  );
}

export default Property;