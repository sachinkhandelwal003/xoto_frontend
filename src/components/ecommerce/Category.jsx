import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FaCouch, FaBed, FaChair, FaUtensils, 
  FaDoorClosed, FaShoePrints, FaBook, 
  FaTv, FaRecycle, FaUsers, FaPlus, FaFire
} from 'react-icons/fa';

const Category = () => {
  const navigate = useNavigate();

  const categories = [
    { id: 1, name: "New Arrivals", icon: <FaFire />, isNew: true, color: "from-[var(--color-primary)] to-pink-500" },
    { id: 2, name: "Sofas", icon: <FaCouch />, color: "from-blue-500 to-cyan-400" },
    { id: 3, name: "Beds", icon: <FaBed />, color: "from-emerald-500 to-teal-400" },
    { id: 4, name: "Dining", icon: <FaUtensils />, color: "from-amber-500 to-orange-400" },
    { id: 5, name: "Wardrobes", icon: <FaDoorClosed />, color: "from-rose-500 to-pink-400" },
    { id: 6, name: "Shoe Racks", icon: <FaShoePrints />, color: "from-indigo-500 to-purple-400" },
    { id: 7, name: "Bookshelves", icon: <FaBook />, color: "from-violet-500 to-purple-400" },
    { id: 8, name: "TV Units", icon: <FaTv />, color: "from-gray-600 to-gray-400" },
    { id: 9, name: "Recliners", icon: <FaRecycle />, color: "from-fuchsia-500 to-pink-400" },
    { id: 10, name: "Seating", icon: <FaChair />, color: "from-green-500 to-emerald-400" },
    { id: 11, name: "Coffee Tables", icon: <FaCouch />, color: "from-yellow-500 to-amber-400" },
    { id: 12, name: "Study", icon: <FaBook />, color: "from-red-500 to-orange-400" },
    { id: 13, name: "Deal Zone", icon: <FaFire />, isDeal: true, color: "from-red-500 to-pink-500" },
    { id: 14, name: "50+ Stores", icon: <FaUsers />, color: "from-purple-600 to-blue-500" },
    { id: 15, name: "See More", icon: <FaPlus />, color: "from-gray-700 to-gray-500" },
  ];

  const handleCategoryClick = (categoryName) => {
    navigate(`/ecommerce/filter?category=${categoryName.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 bg-white">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Shop by <span className="text-[var(--color-primary)]">Category</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Browse through our carefully curated furniture categories
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-6">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            onClick={() => handleCategoryClick(category.name)}
            whileHover={{ y: -5, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative"
          >
            <div className="flex flex-col items-center p-4 bg-white rounded-xl hover:shadow-2xl transition-all duration-300 border border-gray-100">
              {/* Icon Container */}
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                <div className="text-white text-2xl">
                  {category.icon}
                </div>
              </div>
              
              {/* Category Name */}
              <span className="text-sm font-semibold text-gray-800 group-hover:text-[var(--color-primary)] transition-colors text-center">
                {category.name}
              </span>
              
              {/* Badge */}
              {category.isNew && (
                <div className="absolute -top-1 -right-1 bg-[var(--color-primary)] text-white text-xs font-bold px-2 py-1 rounded">
                  NEW
                </div>
              )}
              
              {category.isDeal && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                  HOT
                </div>
              )}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default Category;