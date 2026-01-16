import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { 
  FiEye, FiShoppingCart, FiHeart, 
  FiShare2, FiStar, FiChevronLeft, FiChevronRight 
} from "react-icons/fi";
import { MdLocalOffer } from "react-icons/md";
import { motion } from 'framer-motion';

// --- IMPORT CONTEXT ---
import { ProductProvider, useProductContext } from '../../context/ProductContext'; 

// --- Product Card Component ---
const ProductCard = ({ product, onViewClick, onAddToCart }) => {
  const [isLiked, setIsLiked] = useState(false);
  
  // Safe Discount Calculation
  const discount = (product.originalPrice && product.price) 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;
 
  return (
    <div className="group relative bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
      
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {product.isNew && (
          <span className="bg-[#7c3aed] text-white px-3 py-1 rounded-md text-xs font-bold shadow-md">
            NEW
          </span>
        )}
        {product.isPopular && (
          <span className="bg-orange-500 text-white px-3 py-1 rounded-md text-xs font-bold shadow-md">
            POPULAR
          </span>
        )}
        {discount > 0 && (
          <span className="bg-red-500 text-white px-3 py-1 rounded-md text-xs font-bold flex items-center gap-1 shadow-md">
            <MdLocalOffer className="text-xs" /> {discount}% OFF
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
        <button 
          onClick={(e) => { e.stopPropagation(); setIsLiked(!isLiked); }} 
          className="bg-white p-2 rounded-md shadow-md hover:bg-gray-50 transition-all"
        >
          <FiHeart className={`text-lg ${isLiked ? 'text-red-500 fill-red-500' : 'text-gray-600'}`} />
        </button>
      </div>

      {/* Product Image - WITH ERROR HANDLING */}
      <div 
        className="h-64 bg-gray-100 overflow-hidden cursor-pointer relative" 
        onClick={() => onViewClick(product)}
      >
        <img 
          src={product.image} 
          alt={product.name}
          // If image fails, show Placeholder
          onError={(e) => { 
            e.target.onerror = null; 
            e.target.src = "https://placehold.co/600x400/e0e0e0/808080?text=No+Image"; 
          }}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
        />
      </div>

      {/* Product Details */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
           <span className="text-xs font-bold text-[#7c3aed] bg-purple-50 px-2 py-1 rounded uppercase">
             {product.category}
           </span>
           <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
             <FiStar className="fill-current" /> {product.rating}
           </div>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1 hover:text-[#7c3aed] transition-colors cursor-pointer" onClick={() => onViewClick(product)}>
          {product.name}
        </h3>
        
        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        
        <div className="mt-auto border-t border-gray-100 pt-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900">AED {product.price}</span>
                {product.originalPrice && (
                  <span className="text-xs text-gray-400 line-through">AED {product.originalPrice}</span>
                )}
              </div>
            </div>

            <div className="flex gap-2">
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onViewClick(product)} 
                  className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-lg hover:bg-gray-50 text-sm font-bold flex items-center justify-center gap-2 transition-all"
                >
                  <FiEye /> View
                </motion.button>
                
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onAddToCart(product)} 
                  className="flex-1 bg-black text-white py-2.5 rounded-lg hover:bg-gray-800 text-sm font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
                >
                  <FiShoppingCart /> Add
                </motion.button>
            </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN CONTENT ---
const ProductsContent = () => {
  const { t } = useTranslation("ecommerce");
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  
  // Using Context Data
  const { products, loading } = useProductContext(); 

  const handleViewClick = (product) => navigate(`/ecommerce/product/${product.id}`);
  
  const handleAddToCart = (product) => {
    setCartItems([...cartItems, product]);
    alert(`${product.name} added to cart!`);
  };

  if (loading) return (
    <div className="h-screen flex flex-col justify-center items-center bg-white">
       <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#7c3aed]"></div>
       <p className="mt-4 text-gray-500 font-medium">Loading Collection...</p>
    </div>
  );

  // Filters
  const newArrivals = products.slice(0, 4); 
  const popularProducts = products.filter(p => p.isPopular); 
  const allProducts = products; 

  return (
    <div className="bg-gray-50 pb-20">
      
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=2070&q=80" 
            alt="Hero Banner" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8 }}
            >
              <span className="text-[#7c3aed] font-bold tracking-widest uppercase text-sm bg-white/10 px-4 py-2 rounded-full backdrop-blur-md border border-white/20">
                Premium Collection 2026
              </span>
              <h1 className="text-5xl md:text-7xl font-bold text-white mt-6 mb-6 leading-tight">
                Experience <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">XOTO Living</span>
              </h1>
              <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
                Discover furniture that blends modern aesthetics with timeless comfort. Transform your space today.
              </p>
              <button 
                onClick={() => navigate("/ecommerce/filter")} 
                className="px-8 py-4 bg-[#7c3aed] text-white text-lg font-bold rounded-full hover:bg-[#6d28d9] transition-all shadow-[0_0_20px_rgba(124,58,237,0.5)]"
              >
                Shop Now
              </button>
            </motion.div>
        </div>
      </section>

      {/* 1. New Arrivals Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">New Arrivals</h2>
              <p className="text-gray-500">Fresh designs just landed in our showroom.</p>
            </div>
            <button 
              onClick={() => navigate('/ecommerce/filter?sort=newest')} 
              className="text-[#7c3aed] font-bold hover:text-[#6d28d9] flex items-center gap-2 group"
            >
              View Collection <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {newArrivals.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onViewClick={handleViewClick} 
                  onAddToCart={handleAddToCart} 
                />
            ))}
          </div>
        </div>
      </section>

      {/* 2. Popular Products Section (CHANGED TO GRID LAYOUT) */}
      <section className="py-20 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">Popular Choices</h2>
              <p className="text-gray-500">Our most loved products by customers like you.</p>
            </div>
            <button 
              onClick={() => navigate('/ecommerce/filter?sort=popular')} 
              className="text-[#7c3aed] font-bold hover:text-[#6d28d9] flex items-center gap-2 group"
            >
              View All Popular <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
          
          {/* Using Grid Layout instead of Slider */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {popularProducts.slice(0, 4).map((product) => ( 
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onViewClick={handleViewClick} 
                  onAddToCart={handleAddToCart} 
                />
            ))}
          </div>
        </div>
      </section>

      {/* 3. All Products Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Complete Collection</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Explore our wide range of premium furniture designed to elevate every corner of your home.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {allProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onViewClick={handleViewClick} 
                  onAddToCart={handleAddToCart} 
                />
            ))}
          </div>

          <div className="text-center mt-16">
             <button 
                onClick={() => navigate('/ecommerce/filter')}
                className="px-8 py-3 border-2 border-black text-black font-bold rounded-lg hover:bg-black hover:text-white transition-all"
             >
                Load More Products
             </button>
          </div>
        </div>
      </section>

    </div>
  );
};

// --- MAIN EXPORT (WRAPPER) ---
const Products = () => {
  return (
    <ProductProvider>
      <ProductsContent />
    </ProductProvider>
  );
};

export default Products;