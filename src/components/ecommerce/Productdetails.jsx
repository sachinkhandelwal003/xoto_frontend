import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaShareAlt, FaHeart, FaShoppingCart, FaShoppingBag, FaStar, FaPlus, FaMinus, FaCube } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { FiInfo }  from 'react-icons/fi';

// Dummy Product Data
const dummyProduct = {
  _id: '1',
  name: 'Xoto Nordic Oak Coffee Table',
  description: 'Handcrafted from premium Scandinavian oak with a minimalist design. Perfect centerpiece for modern living rooms.',
  short_description: 'Designer Note: "Inspired by Nordic winters and clean lines." – Emma Wilson',
  pricing: {
    sale_price: 12999,
    mrp: 18999,
    discount: { percentage: 32 },
  },
  shipping: {
    dimensions: { length: 48, width: 24, height: 18 },
  },
  material: { name: 'Solid Oak Wood' },
  tags: [{ name: 'Scandinavian' }],
  createdAt: new Date().toISOString(),
  rent_available: true,
  color_variants: [
    {
      color_name: 'Natural Oak',
      images: [
        { url: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c29mYXxlbnwwfHwwfHx8MA%3D%3D&fm=jpg&q=60&w=3000?w=800', is_primary: true, alt_text: 'Nordic Oak Table - Front' },
        { url: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c29mYXxlbnwwfHwwfHx8MA%3D%3D&fm=jpg&q=60&w=3000?w=800&flip', is_primary: false, alt_text: 'Side View' },
        { url: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c29mYXxlbnwwfHwwfHx8MA%3D%3D&fm=jpg&q=60&w=3000?w=800&blur', is_primary: false, alt_text: 'Top View' },
      ],
    },
    {
      color_name: 'Walnut Brown',
      images: [
        { url: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c29mYXxlbnwwfHwwfHx8MA%3D%3D&fm=jpg&q=60&w=3000?w=800', is_primary: true, alt_text: 'Walnut Coffee Table' },
      ],
    },
  ],
};

const similarProducts = [
  {
    _id: '2',
    name: 'Xoto Velvet Accent Chair',
    pricing: { sale_price: 24999 },
    color_variants: [{
      images: [{ url: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c29mYXxlbnwwfHwwfHx8MA%3D%3D&fm=jpg&q=60&w=3000?w=800', is_primary: true }]
    }],
    rent_available: true,
    tags: [{ name: 'Luxury' }],
    material: { name: 'Velvet' },
  },
  {
    _id: '3',
    name: 'Xoto Marble Console',
    pricing: { sale_price: 35999 },
    color_variants: [{
      images: [{ url: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c29mYXxlbnwwfHwwfHx8MA%3D%3D&fm=jpg&q=60&w=3000?w=800', is_primary: true }]
    }],
    rent_available: false,
    tags: [{ name: 'Premium' }],
    material: { name: 'Marble' },
  },
  {
    _id: '4',
    name: 'Xoto Linen Sofa',
    pricing: { sale_price: 44999 },
    color_variants: [{
      images: [{ url: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c29mYXxlbnwwfHwwfHx8MA%3D%3D&fm=jpg&q=60&w=3000?w=800', is_primary: true }]
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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl bg-gradient-to-b from-gray-50 to-white">
      {/* Main Product Details */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Image Gallery */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="flex flex-row gap-4">
            {/* Thumbnails */}
            <div className="hidden md:flex flex-col gap-3 max-h-[600px] overflow-y-auto scrollbar-thin">
              {currentImages.map((image, index) => (
                <motion.img
                  key={index}
                  src={image.url}
                  alt={image.alt_text}
                  className={`w-16 h-16 object-cover rounded-lg border-2 cursor-pointer transition-all
                    ${activeImageIndex === index ? 'border-[#D26C44] shadow-lg' : 'border-gray-200 hover:border-[#D26C44]'}`}
                  onClick={() => setActiveImageIndex(index)}
                  whileHover={{ scale: 1.05 }}
                />
              ))}
            </div>

            {/* Main Image */}
            <div className="relative flex-1 aspect-[4/3] bg-white rounded-xl overflow-hidden shadow-xl">
              <motion.img
                key={activeImageIndex}
                src={currentImages[activeImageIndex]?.url}
                alt={currentImages[activeImageIndex]?.alt_text}
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              />
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg hover:bg-white hover:text-[#D26C44] transition-all"
              >
                <FaChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg hover:bg-white hover:text-[#D26C44] transition-all"
              >
                <FaChevronRight className="w-5 h-5" />
              </button>

              {rentAvailable && (
                <span className="absolute top-4 left-4 bg-teal-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                  Rent Available
                </span>
              )}
              {isNew && (
                <span className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                  New Arrival
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{currentProduct.name}</h1>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-1">
                {[0, 1, 2, 3, 4].map(i => (
                  <FaStar key={i} className={`w-5 h-5 ${i < 4.5 ? 'text-amber-400' : 'text-gray-300'} fill-current`} />
                ))}
                <span className="ml-2 text-sm text-gray-600">(128 reviews)</span>
              </div>
              <div className="flex gap-4 text-gray-600">
                <button className="hover:text-[#D26C44] transition-colors">
                  <FaShareAlt className="w-5 h-5" />
                </button>
                <button className="hover:text-red-600 transition-colors">
                  <FaHeart className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Color Variants */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Color</p>
            <div className="flex gap-3">
              {currentProduct.color_variants.map((variant, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedVariant(idx);
                    setActiveImageIndex(0);
                  }}
                  className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all
                    ${selectedVariant === idx ? 'border-[#D26C44] shadow-md' : 'border-gray-300 hover:border-[#D26C44]'}`}
                >
                  <img src={variant.images[0].url} alt={variant.color_name} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div>
            <p className="text-3xl font-bold text-gray-900">
              ₹{price.toLocaleString('en-IN')}
              <span className="text-lg text-gray-500 line-through ml-2">₹{originalPrice.toLocaleString('en-IN')}</span>
              <span className="text-sm text-green-600 ml-2">({discountPercentage}% OFF)</span>
            </p>
            <p className="text-sm text-gray-500 mt-1">Inclusive of all taxes</p>
          </div>

          {/* EMI & Offers */}
          <div className="bg-orange-50 p-4 rounded-xl flex justify-between text-sm">
            <div>
              <p className="font-medium">No Cost EMI from ₹{Math.round(price / 12).toLocaleString('en-IN')}/mo</p>
              <button className="text-[#D26C44] hover:underline">View plans →</button>
            </div>
            <div>
              <p className="font-medium">Extra ₹750 OFF on prepaid</p>
              <button className="text-[#D26C44] hover:underline">View offers →</button>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed">{description}</p>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
            <div className="flex items-center w-32 border border-gray-300 rounded-lg overflow-hidden">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-gray-100">
                <FaMinus className="w-4 h-4" />
              </button>
              <input type="text" value={quantity} readOnly className="w-full text-center py-2 font-medium" />
              <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-gray-100">
                <FaPlus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={handleAddToCart}
              className="bg-[#D26C44] text-white font-medium py-3 rounded-lg hover:bg-[#c45a34] transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <FaShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>
            <button
              onClick={() => alert('Buy Now clicked!')}
              className="border-2 border-[#D26C44] text-[#D26C44] font-medium py-3 rounded-lg hover:bg-[#D26C44]/10 transition-all flex items-center justify-center gap-2"
            >
              <FaShoppingBag className="w-5 h-5" />
              Buy Now
            </button>
          </div>

          {/* Pincode Checker */}
          <div className="bg-gray-50 p-4 rounded-xl">
            <label className="block text-sm font-medium text-gray-700 mb-2">Check Delivery</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter Pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D26C44] focus:border-transparent"
              />
              <button
                onClick={() => alert(`Delivery available for ${pincode || 'your area'}!`)}
                className="bg-[#D26C44] text-white px-6 py-2 rounded-lg hover:bg-[#c45a34] transition-all font-medium"
              >
                Check
              </button>
            </div>
          </div>

          {/* Expandable Sections */}
          <div className="space-y-3">
            {[
              { key: 'overview', title: 'Overview', content: <p>{description}</p> },
              { key: 'details', title: 'Details & Dimensions', content: (
                <>
                  <p><strong>Dimensions:</strong> {dimensions}</p>
                  <p><strong>Material:</strong> {material}</p>
                  <p><strong>Style:</strong> {style}</p>
                </>
              )},
              { key: 'care', title: 'Care & Maintenance', content: (
                <p>Clean with a soft, dry cloth. Avoid direct sunlight. Use coasters to prevent water rings.</p>
              )},
              { key: 'additional', title: 'Additional Info', content: (
                <>
                  <p className="italic text-gray-600">{designerNote}</p>
                  <p><strong>Rent Available:</strong> {rentAvailable ? 'Yes' : 'No'}</p>
                </>
              )},
            ].map(section => (
              <div key={section.key}>
                <button
                  onClick={() => toggleSection(section.key)}
                  className="w-full flex justify-between items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all"
                >
                  <span className="font-medium text-gray-800">{section.title}</span>
                  {expandedSection === section.key ? <FaMinus /> : <FaPlus />}
                </button>
                <AnimatePresence>
                  {expandedSection === section.key && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-4 pb-4 text-gray-700 overflow-hidden"
                    >
                      {section.content}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Price Comparison */}
      <motion.div
        className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Best Price Guaranteed</h2>
          <div className="flex items-center text-sm text-gray-600 gap-1">
            <FiInfo className="w-4 h-4" />
            Updated {new Date().toLocaleDateString('en-IN')}
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#D26C44] to-orange-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                X
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Xoto Exclusive Price</h3>
                <p className="text-sm text-gray-600">Lowest price online</p>
              </div>
            </div>
            <p className="text-3xl font-bold text-[#D26C44]">₹{price.toLocaleString('en-IN')}</p>
          </div>
        </div>
      </motion.div>

      {/* Similar Products */}
      <motion.div
        className="mt-16"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-8">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {similarProducts.map((product) => (
            <motion.div
              key={product._id}
              className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300"
              whileHover={{ y: -8 }}
              onClick={() => navigate(`/ecommerce/product/${product._id}`)}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <img
                  src={product.color_variants[0].images[0].url}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {product.rent_available && (
                  <span className="absolute top-3 left-3 bg-teal-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    Rent
                  </span>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{product.name}</h3>
                <p className="text-xl font-bold text-gray-900 mb-2">₹{product.pricing.sale_price.toLocaleString('en-IN')}</p>
                <div className="flex gap-2 text-xs">
                  <span className="px-3 py-1 bg-gray-100 rounded-full">{product.tags[0].name}</span>
                  <span className="px-3 py-1 bg-gray-100 rounded-full">{product.material.name}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* AR Modal */}
      {showARModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <motion.div
            className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">View in Your Space</h3>
            <p className="text-gray-600 mb-6">Point your camera at a flat surface to see this product in AR.</p>
            <div className="bg-gray-200 border-2 border-dashed rounded-xl h-48 flex items-center justify-center mb-6">
              <FaCube className="w-16 h-16 text-gray-400" />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowARModal(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-all font-medium"
              >
                Close
              </button>
              <button
                onClick={() => alert('AR View Launched!')}
                className="flex-1 bg-[#D26C44] text-white py-3 rounded-lg hover:bg-[#c45a34] transition-all font-medium"
              >
                Open AR
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;