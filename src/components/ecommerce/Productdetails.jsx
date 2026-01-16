import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FaChevronLeft, FaChevronRight, FaShareAlt, FaHeart, FaShoppingCart, FaShoppingBag, 
  FaStar, FaPlus, FaMinus, FaCube, FaTruck, FaShieldAlt, FaSyncAlt, FaCreditCard, 
  FaRulerCombined, FaWeight, FaBoxOpen 
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { FiInfo, FiCheck, FiClock, FiPackage } from 'react-icons/fi';

// --- IMPORT CONTEXT ---
import { useProductContext } from '../../context/ProductContext'; 

// Static Similar Products (Kept to maintain UI layout as requested)
const similarProducts = [
  {
    _id: '2',
    name: 'Xoto Velvet Accent Chair',
    pricing: { sale_price: 2499, mrp: 3499 },
    color_variants: [{ images: [{ url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop', is_primary: true }] }],
    rent_available: true,
    tags: [{ name: 'Luxury' }],
    material: { name: 'Velvet' },
  },
  {
    _id: '3',
    name: 'Xoto Marble Console',
    pricing: { sale_price: 3599, mrp: 4999 },
    color_variants: [{ images: [{ url: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?w=800&auto=format&fit=crop', is_primary: true }] }],
    rent_available: false,
    tags: [{ name: 'Premium' }],
    material: { name: 'Marble' },
  },
  {
    _id: '4',
    name: 'Xoto Linen Sofa',
    pricing: { sale_price: 4499, mrp: 5999 },
    color_variants: [{ images: [{ url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop', is_primary: true }] }],
    rent_available: true,
    tags: [{ name: 'Comfort' }],
    material: { name: 'Linen' },
  },
];

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // --- 1. GET DATA FROM CONTEXT ---
  const { getSingleProduct } = useProductContext();

  // --- STATE ---
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [expandedSection, setExpandedSection] = useState(null);
  const [showARModal, setShowARModal] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(0);

  // --- 2. FETCH DATA ON LOAD ---
  useEffect(() => {
    const fetchDetails = async () => {
      if (id) {
        setLoading(true);
        const data = await getSingleProduct(id);
        setProduct(data);
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  // --- 3. LOADING STATE ---
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-600 border-opacity-75"></div>
    </div>
  );

  // --- 4. ERROR STATE ---
  if (!product) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-600">
      <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
      <button onClick={() => navigate(-1)} className="text-purple-600 hover:underline">Go Back</button>
    </div>
  );

  // --- 5. DATA MAPPING (Adapting API data to UI structure) ---
  const price = product.price || 0;
  const originalPrice = product.originalPrice || 0;
  const discountPercentage = originalPrice 
    ? Math.round(((originalPrice - price) / originalPrice) * 100) 
    : 0;

  // Handle Images: Ensure we always have an array
  const mainImage = product.image || "https://placehold.co/600x400/e0e0e0/808080?text=No+Image";
  const currentImages = [{ url: mainImage, alt_text: product.name }];

  // Fallback data for UI elements
  const materialName = product.material && product.material.length > 0 ? product.material.join(', ') : 'Premium Material';
  const categoryName = product.category || 'Furniture';
  const featuresList = product.fullFeatures && product.fullFeatures.length > 0 ? product.fullFeatures : ['Premium Quality', 'Durable', 'Modern Design'];
  
  // Construct Specifications Object
  const specifications = {
    'Material': materialName,
    'Brand': product.brand || 'XOTO',
    'Category': categoryName,
    'Warranty': '1 Year Standard',
    'Assembly': 'Required',
    'Care': 'Wipe with dry cloth'
  };

  const handleAddToCart = () => {
    alert(`Added ${quantity} × ${product.name} to cart!`);
  };

  const handlePrevImage = () => {
    setActiveImageIndex(prev => (prev === 0 ? currentImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveImageIndex(prev => (prev === currentImages.length - 1 ? 0 : prev + 1));
  };

  const toggleSection = (section) => {
    setExpandedSection(prev => prev === section ? null : section);
  };

  const handleARView = () => {
    setShowARModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header Navigation */}
    
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mt-10">
        {/* Main Product Details */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Image Gallery */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            {/* Main Image */}
            <div className="relative aspect-[4/3] bg-white rounded-2xl overflow-hidden shadow-xl mb-4">
              <motion.img
                key={activeImageIndex}
                src={currentImages[activeImageIndex]?.url}
                alt={product.name}
                // ERROR HANDLING ADDED HERE
                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/e0e0e0/808080?text=No+Image"; }}
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              />
              
              {/* Navigation Arrows (Hidden if only 1 image) */}
              {currentImages.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-lg hover:bg-purple-600 hover:text-white transition-all duration-300 group"
                  >
                    <FaChevronLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-lg hover:bg-purple-600 hover:text-white transition-all duration-300 group"
                  >
                    <FaChevronRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </button>
                </>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && (
                  <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
                    New Arrival
                  </span>
                )}
                {discountPercentage > 0 && (
                  <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
                    {discountPercentage}% OFF
                  </span>
                )}
              </div>

              {/* AR Button */}
              <button
                onClick={handleARView}
                className="absolute bottom-4 right-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
              >
                <FaCube className="w-4 h-4" />
                View in AR
              </button>
            </div>

            {/* Thumbnails (Only show if multiple images) */}
            {currentImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {currentImages.map((image, index) => (
                    <motion.button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                        activeImageIndex === index 
                        ? 'border-purple-600 shadow-lg scale-105' 
                        : 'border-gray-200 hover:border-purple-400'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    >
                    <img src={image.url} alt="thumbnail" className="w-full h-full object-cover" />
                    </motion.button>
                ))}
                </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex-1 space-y-6">
            {/* Product Header */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-medium text-gray-500">XOTO</span>
                <span className="text-gray-300">•</span>
                <span className="text-sm font-medium text-gray-500">{categoryName}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-3 mt-4">
                <div className="flex items-center bg-gradient-to-r from-amber-400 to-yellow-500 text-white px-3 py-1 rounded-lg">
                  <span className="font-bold text-lg">{product.rating}</span>
                  <FaStar className="w-4 h-4 ml-1 fill-current" />
                </div>
                <span className="text-gray-600">({product.reviews} reviews)</span>
              </div>
            </div>

            {/* Price Section */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6">
              <div className="flex items-end gap-4 mb-2">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Our Price</p>
                  <p className="text-4xl font-bold text-gray-900">
                    AED{price.toLocaleString()}
                  </p>
                </div>
                {originalPrice > 0 && (
                    <div>
                    <p className="text-sm text-gray-600 mb-1">MRP</p>
                    <p className="text-xl text-gray-500 line-through">
                        AED{originalPrice.toLocaleString()}
                    </p>
                    </div>
                )}
                {discountPercentage > 0 && (
                    <div className="ml-auto">
                    <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-lg font-bold">
                        Save {discountPercentage}%
                    </span>
                    </div>
                )}
              </div>
              <p className="text-sm text-gray-500">Inclusive of all taxes • EMI available</p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-3">
              {featuresList.slice(0, 4).map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 text-gray-700">
                  <FiCheck className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>

            {/* Quantity & Actions */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <div className="flex items-center w-40 border border-gray-300 rounded-xl overflow-hidden bg-white">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-4 hover:bg-gray-100 transition-colors"
                  >
                    <FaMinus className="w-4 h-4 text-gray-600" />
                  </button>
                  <div className="flex-1 text-center py-3 font-bold text-lg">{quantity}</div>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-4 hover:bg-gray-100 transition-colors"
                  >
                    <FaPlus className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={handleAddToCart}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-4 rounded-xl hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 group"
                >
                  <FaShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Add to Cart
                </button>
                <button
                  onClick={() => alert('Buy Now clicked!')}
                  className="bg-gradient-to-r from-gray-900 to-black text-white font-semibold py-4 rounded-xl hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 group"
                >
                  <FaShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Buy Now
                </button>
              </div>
            </div>

            {/* Delivery Check */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <FaTruck className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="font-medium text-gray-900">Free Delivery</p>
                  <p className="text-sm text-gray-600">Check delivery time for your location</p>
                </div>
              </div>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Enter your PIN code"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  maxLength={6}
                />
                <button
                  onClick={() => alert(`Delivery available for ${pincode || 'your area'}!`)}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all font-semibold"
                >
                  Check
                </button>
              </div>
            </div>

            {/* Key Highlights */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
                <FaShieldAlt className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">5 Year Warranty</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
                <FaSyncAlt className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">30 Day Returns</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
                <FaCreditCard className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">No Cost EMI</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
                <FaBoxOpen className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">Easy Assembly</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Product Details Sections */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Specifications */}
          <div className="lg:col-span-2 space-y-8">
            {/* Expandable Sections */}
            <div className="space-y-4">
              {[
                { 
                  key: 'description', 
                  title: 'Product Description', 
                  icon: '📝',
                  content: (
                    <div className="space-y-4">
                      <p className="text-gray-700">{product.description}</p>
                    </div>
                  ) 
                },
                { 
                  key: 'specifications', 
                  title: 'Specifications', 
                  icon: '📋',
                  content: (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between border-b border-gray-200 py-3">
                          <span className="text-gray-600">{key}</span>
                          <span className="font-medium text-gray-900">{value}</span>
                        </div>
                      ))}
                    </div>
                  ) 
                },
                { 
                  key: 'features', 
                  title: 'Key Features', 
                  icon: '⭐',
                  content: (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {featuresList.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          <FiCheck className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  ) 
                },
              ].map(section => (
                <div key={section.key} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                  <button
                    onClick={() => toggleSection(section.key)}
                    className="w-full flex justify-between items-center p-6 hover:bg-gray-50 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{section.icon}</span>
                      <span className="font-semibold text-lg text-gray-900">{section.title}</span>
                    </div>
                    {expandedSection === section.key ? <FaMinus className="text-gray-600" /> : <FaPlus className="text-gray-600" />}
                  </button>
                  <AnimatePresence>
                    {expandedSection === section.key && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-6 pb-6 text-gray-700 overflow-hidden border-t border-gray-200 pt-6"
                      >
                        {section.content}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Price Comparison */}
          <div className="space-y-6">
            {/* Price Guarantee Card */}
            <motion.div
              className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl p-6 shadow-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Best Price Guarantee</h3>
                <div className="flex items-center text-sm text-white/80 gap-1">
                  <FiInfo className="w-4 h-4" />
                  <span>Updated today</span>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3 text-white text-2xl font-bold">
                    X
                  </div>
                  <h4 className="text-lg font-bold text-white">XOTO Exclusive</h4>
                  <p className="text-sm text-white/80">Lowest price online</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-white mb-1">AED{price.toLocaleString()}</p>
                  <p className="text-sm text-white/80">Incl. all taxes</p>
                </div>
              </div>
              <div className="mt-6 text-center">
                <div className="flex items-center justify-center gap-2 text-sm text-white/90 mb-3">
                  <FiCheck className="w-4 h-4" />
                  <span>Price match guarantee within 7 days</span>
                </div>
                <button className="w-full bg-white text-purple-600 font-semibold py-3 rounded-lg hover:bg-gray-100 transition-all">
                  Compare Prices
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Similar Products (Static for now to preserve UI) */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">You May Also Like</h2>
            <button 
              onClick={() => navigate('/ecommerce/filter')}
              className="text-purple-600 font-medium hover:text-purple-700 transition-colors"
            >
              View All →
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarProducts.map((simProduct) => (
              <motion.div
                key={simProduct._id}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-200"
                whileHover={{ y: -8 }}
                // For now, these dummy items won't navigate to real pages unless they exist in DB
                onClick={() => navigate(`/ecommerce/product/${simProduct._id}`)} 
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={simProduct.color_variants[0].images[0].url}
                    alt={simProduct.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {simProduct.rent_available && (
                    <span className="absolute top-3 left-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                      <FaSyncAlt className="inline mr-1" /> Rent
                    </span>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-1">{simProduct.name}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <p className="text-xl font-bold text-gray-900">AED{simProduct.pricing.sale_price}</p>
                    <p className="text-sm text-gray-500 line-through">AED{simProduct.pricing.mrp}</p>
                  </div>
                  <button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2.5 rounded-lg hover:shadow-lg transition-all font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* AR Modal */}
        <AnimatePresence>
          {showARModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
              onClick={() => setShowARModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaCube className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">View in Your Space</h3>
                  <p className="text-gray-600">Use your camera to see how this product looks in your room</p>
                </div>
                
                <div className="bg-gradient-to-br from-gray-50 to-white border-2 border-dashed border-gray-300 rounded-xl h-48 flex flex-col items-center justify-center mb-6">
                  <div className="text-4xl mb-2">📱</div>
                  <p className="text-gray-700 font-medium">Point camera at floor</p>
                  <p className="text-sm text-gray-500">Tap to place furniture</p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => {
                      setShowARModal(false);
                      alert('AR View Launched!');
                    }}
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl hover:shadow-lg transition-all font-semibold flex items-center justify-center gap-2"
                  >
                    <FaCube className="w-5 h-5" />
                    Launch AR Experience
                  </button>
                  <button
                    onClick={() => setShowARModal(false)}
                    className="w-full bg-gray-100 text-gray-800 py-3 rounded-xl hover:bg-gray-200 transition-all font-medium"
                  >
                    Maybe Later
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProductDetails;