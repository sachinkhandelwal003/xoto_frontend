import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaShareAlt, FaHeart, FaShoppingCart, FaShoppingBag, FaStar, FaPlus, FaMinus, FaCube, FaTruck, FaShieldAlt, FaSyncAlt, FaCreditCard, FaRulerCombined, FaWeight, FaBoxOpen } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { FiInfo, FiCheck, FiClock, FiPackage } from 'react-icons/fi';

// Dummy Product Data
const dummyProduct = {
  _id: '1',
  name: 'Xoto Nordic Oak Coffee Table',
  description: 'Handcrafted from premium Scandinavian oak with a minimalist design. This coffee table features clean lines, smooth finish, and sustainable materials. Perfect centerpiece for modern living rooms, blending functionality with timeless elegance.',
  short_description: 'Designer Note: "Inspired by Nordic winters and clean lines. This piece embodies simplicity and warmth in modern living." – Emma Wilson',
  pricing: {
    sale_price: 12999,
    mrp: 18999,
    discount: { percentage: 32 },
  },
  shipping: {
    dimensions: { length: 48, width: 24, height: 18 },
    weight: 35,
    delivery_time: '3-5 days',
  },
  material: { name: 'Solid Oak Wood' },
  tags: [{ name: 'Scandinavian' }, { name: 'Modern' }, { name: 'Sustainable' }],
  createdAt: new Date().toISOString(),
  rent_available: true,
  color_variants: [
    {
      color_name: 'Natural Oak',
      color_code: '#D4A574',
      images: [
        { url: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800&auto=format&fit=crop', is_primary: true, alt_text: 'Nordic Oak Table - Front' },
        { url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop', is_primary: false, alt_text: 'Side View' },
        { url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop', is_primary: false, alt_text: 'Top View' },
        { url: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?w=800&auto=format&fit=crop', is_primary: false, alt_text: 'In Living Room' },
      ],
    },
    {
      color_name: 'Walnut Brown',
      color_code: '#5C4033',
      images: [
        { url: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&auto=format&fit=crop', is_primary: true, alt_text: 'Walnut Coffee Table' },
      ],
    },
    {
      color_name: 'White Wash',
      color_code: '#F5F5F5',
      images: [
        { url: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?w=800&auto=format&fit=crop', is_primary: true, alt_text: 'White Wash Table' },
      ],
    },
  ],
  features: [
    'Solid oak construction',
    'Hand-finished surface',
    'Water-resistant coating',
    'Easy assembly',
    'Sustainable materials',
    '5-year warranty'
  ],
  specifications: {
    'Material': 'Solid Oak Wood',
    'Finish': 'Natural Oil',
    'Assembly': 'Required (tools included)',
    'Care': 'Wipe with damp cloth',
    'Warranty': '5 years',
    'Origin': 'Made in India'
  }
};

const similarProducts = [
  {
    _id: '2',
    name: 'Xoto Velvet Accent Chair',
    pricing: { sale_price: 24999, mrp: 34999 },
    color_variants: [{
      images: [{ url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop', is_primary: true }]
    }],
    rent_available: true,
    tags: [{ name: 'Luxury' }],
    material: { name: 'Velvet' },
  },
  {
    _id: '3',
    name: 'Xoto Marble Console',
    pricing: { sale_price: 35999, mrp: 49999 },
    color_variants: [{
      images: [{ url: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?w=800&auto=format&fit=crop', is_primary: true }]
    }],
    rent_available: false,
    tags: [{ name: 'Premium' }],
    material: { name: 'Marble' },
  },
  {
    _id: '4',
    name: 'Xoto Linen Sofa',
    pricing: { sale_price: 44999, mrp: 59999 },
    color_variants: [{
      images: [{ url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop', is_primary: true }]
    }],
    rent_available: true,
    tags: [{ name: 'Comfort' }],
    material: { name: 'Linen' },
  },
];

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [expandedSection, setExpandedSection] = useState(null);
  const [showARModal, setShowARModal] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Static product (in real app, fetch by id)
  const currentProduct = dummyProduct;
  const currentImages = currentProduct.color_variants[selectedVariant]?.images || [];
  const price = currentProduct.pricing.sale_price;
  const originalPrice = currentProduct.pricing.mrp;
  const discountPercentage = currentProduct.pricing.discount.percentage;
  const dimensions = `${currentProduct.shipping.dimensions.length}"W x ${currentProduct.shipping.dimensions.width}"D x ${currentProduct.shipping.dimensions.height}"H`;
  const material = currentProduct.material.name;
  const style = currentProduct.tags[0].name;
  const description = currentProduct.description;
  const designerNote = currentProduct.short_description;
  const isNew = true;
  const rentAvailable = currentProduct.rent_available;

  const handleAddToCart = () => {
    alert(`Added ${quantity} × ${currentProduct.name} to cart!`);
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
                alt={currentImages[activeImageIndex]?.alt_text}
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              />
              
              {/* Navigation Arrows */}
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

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {rentAvailable && (
                  <span className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
                    <FaSyncAlt className="inline mr-1" /> Rent Available
                  </span>
                )}
                {isNew && (
                  <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
                    New Arrival
                  </span>
                )}
                <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg">
                  {discountPercentage}% OFF
                </span>
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

            {/* Thumbnails */}
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
                  <img src={image.url} alt={image.alt_text} className="w-full h-full object-cover" />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex-1 space-y-6">
            {/* Product Header */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-medium text-gray-500">XOTO</span>
                <span className="text-gray-300">•</span>
                <span className="text-sm font-medium text-gray-500">{currentProduct.tags.map(t => t.name).join(', ')}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">{currentProduct.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-3 mt-4">
                <div className="flex items-center bg-gradient-to-r from-amber-400 to-yellow-500 text-white px-3 py-1 rounded-lg">
                  <span className="font-bold text-lg">4.8</span>
                  <FaStar className="w-4 h-4 ml-1 fill-current" />
                </div>
                <span className="text-gray-600">(128 reviews)</span>
               
              </div>
            </div>

            {/* Price Section */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6">
              <div className="flex items-end gap-4 mb-2">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Our Price</p>
                  <p className="text-4xl font-bold text-gray-900">
                    AED{price.toLocaleString('en-IN')}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">MRP</p>
                  <p className="text-xl text-gray-500 line-through">
                    AED{originalPrice.toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="ml-auto">
                  <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-4 py-2 rounded-lg font-bold">
                    Save {discountPercentage}%
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-500">Inclusive of all taxes • EMI available</p>
            </div>

            {/* Color Variants */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">Select Color</p>
              <div className="flex gap-3">
                {currentProduct.color_variants.map((variant, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedVariant(idx);
                      setActiveImageIndex(0);
                    }}
                    className={`relative flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-300 ${
                      selectedVariant === idx 
                        ? 'border-purple-600 bg-purple-50' 
                        : 'border-gray-200 hover:border-purple-400 hover:bg-gray-50'
                    }`}
                  >
                    <div 
                      className="w-16 h-16 rounded-lg border border-gray-300"
                      style={{ backgroundColor: variant.color_code }}
                    />
                    <span className="text-sm font-medium text-gray-700">{variant.color_name}</span>
                    {selectedVariant === idx && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                        <FiCheck className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-3">
              {currentProduct.features.slice(0, 4).map((feature, idx) => (
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
                  onClick={() => alert(`Delivery available in ${currentProduct.shipping.delivery_time} for ${pincode || 'your area'}!`)}
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
                      <p className="text-gray-700">{description}</p>
                      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4">
                        <p className="italic text-gray-600">{designerNote}</p>
                      </div>
                    </div>
                  ) 
                },
                { 
                  key: 'specifications', 
                  title: 'Specifications', 
                  icon: '📋',
                  content: (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(currentProduct.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between border-b border-gray-200 py-3">
                          <span className="text-gray-600">{key}</span>
                          <span className="font-medium text-gray-900">{value}</span>
                        </div>
                      ))}
                    </div>
                  ) 
                },
                { 
                  key: 'dimensions', 
                  title: 'Dimensions & Details', 
                  icon: '📏',
                  content: (
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="bg-white p-4 rounded-xl border border-gray-200">
                          <FaRulerCombined className="w-6 h-6 text-purple-600 mb-2" />
                          <p className="text-sm text-gray-600">Dimensions</p>
                          <p className="font-bold text-gray-900">{dimensions}</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-gray-200">
                          <FaWeight className="w-6 h-6 text-purple-600 mb-2" />
                          <p className="text-sm text-gray-600">Weight</p>
                          <p className="font-bold text-gray-900">{currentProduct.shipping.weight} kg</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-gray-200">
                          <FiPackage className="w-6 h-6 text-purple-600 mb-2" />
                          <p className="text-sm text-gray-600">Delivery</p>
                          <p className="font-bold text-gray-900">{currentProduct.shipping.delivery_time}</p>
                        </div>
                      </div>
                    </div>
                  ) 
                },
                { 
                  key: 'features', 
                  title: 'Key Features', 
                  icon: '⭐',
                  content: (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {currentProduct.features.map((feature, idx) => (
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
                  <p className="text-4xl font-bold text-white mb-1">AED{price.toLocaleString('en-IN')}</p>
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

         

            {/* Need Help */}
           
          </div>
        </div>

        {/* Similar Products */}
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
            {similarProducts.map((product) => (
              <motion.div
                key={product._id}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-200"
                whileHover={{ y: -8 }}
                onClick={() => navigate(`/ecommerce/product/${product._id}`)}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={product.color_variants[0].images[0].url}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {product.rent_available && (
                    <span className="absolute top-3 left-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                      <FaSyncAlt className="inline mr-1" /> Rent
                    </span>
                  )}
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                    {Math.round(((product.pricing.mrp - product.pricing.sale_price) / product.pricing.mrp) * 100)}% OFF
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-1">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <p className="text-xl font-bold text-gray-900">AED{product.pricing.sale_price.toLocaleString('en-IN')}</p>
                    <p className="text-sm text-gray-500 line-through">AED{product.pricing.mrp.toLocaleString('en-IN')}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full">{product.tags[0].name}</span>
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full">{product.material.name}</span>
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