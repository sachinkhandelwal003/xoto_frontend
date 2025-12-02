import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FiEye, FiShoppingCart, FiHeart, 
  FiShare2, FiStar, FiChevronLeft, FiChevronRight 
} from "react-icons/fi";
import { MdLocalOffer } from "react-icons/md";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from 'framer-motion';

// Sample product data
const furnitureProducts = [
  { 
    id: 1, 
    name: "Modern Sofa Set", 
    description: "Premium fabric sofa with ergonomic design and built-in storage", 
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop", 
    price: 899.99, 
    originalPrice: 1099.99,
    rating: 4.8,
    reviews: 124,
    isNew: true, 
    isPopular: true, 
    category: "Living Room",
    colors: 3,
    tags: ["Best Seller"]
  },
  { 
    id: 2, 
    name: "Wooden Dining Table", 
    description: "Solid oak table with extendable leaves for family gatherings", 
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&auto=format&fit=crop", 
    price: 599.99, 
    originalPrice: 749.99,
    rating: 4.5,
    reviews: 89,
    isPopular: true, 
    category: "Dining",
    colors: 2,
    tags: ["Sustainable Wood"]
  },
  { 
    id: 3, 
    name: "Leather Armchair", 
    description: "Premium leather with adjustable reclining feature", 
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop", 
    price: 349.99, 
    originalPrice: 449.99,
    rating: 4.7,
    reviews: 203,
    isNew: true, 
    category: "Living Room",
    colors: 4,
    tags: ["Premium Leather"]
  },
  { 
    id: 4, 
    name: "Bookshelf Unit", 
    description: "Modular design with built-in LED lighting", 
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop", 
    price: 249.99, 
    originalPrice: 299.99,
    rating: 4.3,
    reviews: 67,
    isPopular: true, 
    category: "Office",
    colors: 2,
    tags: ["Smart Storage"]
  },
  { 
    id: 5, 
    name: "Coffee Table", 
    description: "Modern design with tempered glass top and wooden legs", 
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800&auto=format&fit=crop", 
    price: 179.99, 
    originalPrice: 229.99,
    rating: 4.6,
    reviews: 142,
    isNew: true, 
    category: "Living Room",
    colors: 3,
    tags: ["Modern Design"]
  },
  { 
    id: 6, 
    name: "Bedside Table", 
    description: "With wireless charging and two spacious drawers", 
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&auto=format&fit=crop", 
    price: 129.99, 
    originalPrice: 169.99,
    rating: 4.4,
    reviews: 78,
    isNew: true, 
    category: "Bedroom",
    colors: 2,
    tags: ["Smart Home"]
  },
  { 
    id: 7, 
    name: "Study Desk", 
    description: "Ergonomic design with cable management system", 
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop", 
    price: 299.99, 
    originalPrice: 349.99,
    rating: 4.5,
    reviews: 56,
    category: "Office",
    colors: 3,
    tags: ["Ergonomic"]
  },
  { 
    id: 8, 
    name: "TV Cabinet", 
    description: "Modern TV unit with ample storage space", 
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800&auto=format&fit=crop", 
    price: 399.99, 
    originalPrice: 499.99,
    rating: 4.7,
    reviews: 91,
    category: "Living Room",
    colors: 2,
    tags: ["Modern"]
  },
];

// Custom Arrows
const NextArrow = ({ onClick }) => (
  <button 
    onClick={onClick} 
    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[var(--color-primary)] p-3 rounded-md text-white shadow-lg hover:opacity-90 transition-all"
  >
    <FiChevronRight className="text-xl" />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button 
    onClick={onClick} 
    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[var(--color-primary)] p-3 rounded-md text-white shadow-lg hover:opacity-90 transition-all"
  >
    <FiChevronLeft className="text-xl" />
  </button>
);

// Product Card Component
const ProductCard = ({ product, onViewClick, onAddToCart }) => {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  return (
    <div className="group relative bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {product.isNew && (
          <span className="bg-[var(--color-primary)] text-white px-3 py-1 rounded-md text-xs font-bold">
            NEW
          </span>
        )}
        {product.isPopular && (
          <span className="bg-orange-500 text-white px-3 py-1 rounded-md text-xs font-bold">
            POPULAR
          </span>
        )}
        {discount > 0 && (
          <span className="bg-red-500 text-white px-3 py-1 rounded-md text-xs font-bold flex items-center gap-1">
            <MdLocalOffer className="text-xs" /> {discount}% OFF
          </span>
        )}
      </div>

      {/* Action Buttons */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
        <button 
          onClick={() => setIsLiked(!isLiked)}
          className="bg-white p-2 rounded-md shadow-md hover:bg-gray-50 transition-all"
        >
          <FiHeart className={`text-lg ${isLiked ? 'text-red-500 fill-red-500' : 'text-gray-600'}`} />
        </button>
        <button className="bg-white p-2 rounded-md shadow-md hover:bg-gray-50 transition-all">
          <FiShare2 className="text-lg text-gray-600" />
        </button>
      </div>

      {/* Product Image */}
      <div 
        className="h-64 bg-gray-100 overflow-hidden cursor-pointer"
        onClick={() => navigate(`/ecommerce/product/${product.id}`)}
      >
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
      </div>

      {/* Product Info */}
      <div className="p-6">
        {/* Category */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">{product.category}</span>
          <div className="flex items-center text-amber-500">
            <FiStar className="fill-current" />
            <span className="ml-1 text-sm font-semibold">{product.rating}</span>
            <span className="ml-1 text-sm text-gray-400">({product.reviews})</span>
          </div>
        </div>

        {/* Product Name */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {product.tags.map((tag, index) => (
            <span key={index} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
              {tag}
            </span>
          ))}
          <span className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded">
            {product.colors} colors
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-2xl font-bold text-gray-900">${product.price}</span>
            {product.originalPrice && (
              <span className="ml-2 text-lg text-gray-400 line-through">${product.originalPrice}</span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(`/ecommerce/product/${product.id}`)}
            className=" bg-[var(--color-primary)] text-white font-semibold py-3 px-2 rounded-md hover:opacity-90 transition-all flex items-center justify-center gap-2"
          >
            <FiEye /> View
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onAddToCart(product)}
            className="flex-1 bg-gray-900 text-white  py-3 rounded-md hover:bg-black transition-all flex items-center justify-center gap-2"
          >
            <FiShoppingCart /> Add to Cart
          </motion.button>
        </div>
      </div>
    </div>
  );
};

const Products = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showCartNotification, setShowCartNotification] = useState(false);
  const navigate = useNavigate();

  const newArrivals = furnitureProducts.filter(p => p.isNew);
  const popularProducts = furnitureProducts.filter(p => p.isPopular);
  const allProducts = furnitureProducts;

  const handleViewClick = (product) => {
    navigate(`/ecommerce/product/${product.id}`);
  };

  const handleAddToCart = (product) => {
    setCartItems([...cartItems, product]);
    setShowCartNotification(true);
    setTimeout(() => setShowCartNotification(false), 3000);
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="bg-gray-50">
      {/* Cart Notification */}
      {showCartNotification && (
        <div className="fixed top-6 right-6 z-50 animate-slideIn">
          <div className="bg-green-600 text-white px-6 py-4 rounded-md shadow-2xl flex items-center gap-3">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            <span className="font-semibold">Item added to cart successfully!</span>
          </div>
        </div>
      )}

      {/* Hero Banner */}
    <section className="py-24 relative overflow-hidden">
  {/* Background with Parallax Effect */}
  <div className="absolute inset-0">
    <img 
      src="https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
      alt="Modern living room with XOTO furniture"
      className="w-full h-full object-cover transform scale-110"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/60"></div>
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
  </div>
  
  <div className="relative z-10 max-w-7xl mx-auto px-6">
    <div className="text-center mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
    
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          The <span className="text-[var(--color-primary)]">XOTO</span> Experience
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          Where innovation meets comfort. Our AI-driven designs create spaces that inspire.
        </p>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/ecommerce/filter")}
          className="px-10 py-4 bg-[var(--color-primary)] text-white text-lg font-bold rounded-md hover:opacity-90 transition-all shadow-2xl hover:shadow-3xl"
        >
          Discover XOTO Collection
        </motion.button>
      </motion.div>
    </div>
    
 
  </div>
</section>

      {/* New Arrivals - 4 products per row */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">New Arrivals</h2>
              <p className="text-gray-600">Fresh designs added this week</p>
            </div>
            <button 
              onClick={() => navigate('/ecommerce/filter?sort=newest')}
              className="text-[var(--color-primary)] font-semibold hover:underline"
            >
              View All →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {newArrivals.slice(0, 4).map((product) => (
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

      {/* Popular Products - Carousel */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Popular Products</h2>
              <p className="text-gray-600">Most loved by our customers</p>
            </div>
            <button 
              onClick={() => navigate('/ecommerce/filter?sort=popular')}
              className="text-[var(--color-primary)] font-semibold hover:underline"
            >
              View All →
            </button>
          </div>

          <div className="relative">
            <Slider {...sliderSettings}>
              {popularProducts.map((product) => (
                <div key={product.id} className="px-1">
                  <ProductCard 
                    product={product} 
                    onViewClick={handleViewClick} 
                    onAddToCart={handleAddToCart} 
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>

      {/* All Products - Grid Layout */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Browse Our <span className="text-[var(--color-primary)]">Complete</span> Collection
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover furniture for every room, style, and budget
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {allProducts.slice(0, 8).map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onViewClick={handleViewClick} 
                onAddToCart={handleAddToCart} 
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/ecommerce/filter')}
              className="px-10 py-4 bg-[var(--color-primary)] text-white font-bold rounded-md hover:opacity-90 transition-all"
            >
              View All Products
            </motion.button>
          </div>
        </div>
      </section>

      {/* Features Banner */}
      {/* <section className="py-20 bg-gradient-to-r from-[var(--color-primary)]/10 to-purple-600/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="w-16 h-16 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🚚</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Free Shipping</h3>
              <p className="text-gray-600">On orders over $500</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="w-16 h-16 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🤖</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI Design Assistant</h3>
              <p className="text-gray-600">Get personalized recommendations</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
              <div className="w-16 h-16 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">📱</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AR Preview</h3>
              <p className="text-gray-600">See furniture in your space</p>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default Products;