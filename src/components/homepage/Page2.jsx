import React from "react";
import img1 from "../../assets/img/Image12.jpg";
import img2 from "../../assets/img/Image11.jpg";
import img3 from "../../assets/img/Image 10.jpg"
import img4 from '../../assets/img/Image9.jpg'

const properties = [
  {
    id: 1,
    title: "Modern Apartment",
    price: "$190,000",
    image: img1,
  },
  {
    id: 2,
    title: "City Apartment",
    price: "$180,000",
    image: img2,
  },
  {
    id: 3,
    title: "Luxury Apartment",
    price: "$220,000",
    image: img3,
  },
  {
    id: 4,
    title: "Modern Apartment",
    price: "$190,000",
    image: img1,
  },
  {
    id: 5,
    title: "City Apartment",
    price: "$180,000",
    image: img2,
  },
  {
    id: 6,
    title: "Luxury Apartment",
    price: "$220,000",
    image: img3,
  },
  {
    id: 7,
    title: "Modern Apartment",
    price: "$190,000",
    image: img1,
  },
  {
    id: 8,
    title: "City Apartment",
    price: "$180,000",
    image: img2,
  },
  {
    id: 9,
    title: "Luxury Apartment",
    price: "$220,000",
    image: img3,
  },
];

const Page2 = () => {
  return (
    <div>
     <section
            className="relative bg-cover bg-center h-[500px] flex items-center justify-center text-white"
            style={{ backgroundImage: `url(${img4})` }}
          >
           
            <div className="absolute inset-0 bg-black/40"></div>
    
            
            <div className="relative z-10 text-center max-w-2xl px-4">
              <h1 className="text-4xl md:text-5xl font-semibold mb-4">
                Contact XOTO
              </h1>
              <p className="text-lg md:text-xl leading-relaxed">
                Get in touch with our luxury real estate experts. We’re here to help you
                with all your property needs in the UAE.
              </p>
            </div>
          </section>


     <section className="py-16 bg-white flex flex-col items-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-10">Our Properties</h2>

      {/* Property Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-[90%] md:w-[80%]">
        {properties.map((property) => (
          <div
            key={property.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-2xl transition duration-300 group"
          >
            {/* Image Section with Hover Pop-out */}
            <div className="overflow-hidden relative">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-48 object-cover transform group-hover:scale-110 transition duration-500 ease-in-out"
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

              {/* Button with custom color */}
              <button className="w-full bg-[#5C039B] hover:bg-[#4b0281] active:scale-95 text-white py-2 mt-5 rounded-md transition font-medium">
                View More
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
    </div>
  );
};

export default Page2;
