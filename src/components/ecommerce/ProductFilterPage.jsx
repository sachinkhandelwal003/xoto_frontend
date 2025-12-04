import React, { useState, useMemo } from 'react';
import { Layout, Card, Image, Button, Tag, Modal, Dropdown, Space, Avatar, Typography, Input, Select, Form, message } from 'antd';
import { VideoCameraOutlined, DownOutlined, StarFilled, CheckCircleFilled, CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import bannerImage from '../../assets/img/ecommercebanner.png';
import Filters from './Filters';
import ProductGrid from './ProductGrid';

const { Content } = Layout;
const { Text, Title } = Typography;
const { TextArea } = Input;

// Dummy Product Data
const dummyProducts = [
  {
    _id: '1',
    name: 'Nordic Oak Coffee Table',
    short_description: 'Minimalist Scandinavian design with solid oak legs.',
    pricing: {
      sale_price: 12999,
      mrp: 18999,
      discount: { value: 32, type: 'percentage' },
      currency: { symbol: 'AED' },
    },
    color_variants: [
      {
        color_name: 'Natural Oak',
        color_code: '#D4A574',
        images: [
          { url: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800&auto=format&fit=crop', is_primary: true },
        ],
      },
    ],
    tags: [{ _id: 't1', name: 'New' }],
    material: { name: 'Wood' },
    category: { name: 'Tables' },
    brand: { name: 'xoto' },
  },
  {
    _id: '2',
    name: 'Velvet Accent Armchair',
    short_description: 'Luxurious velvet upholstery with golden legs.',
    pricing: {
      sale_price: 24999,
      mrp: 34999,
      discount: { value: 29, type: 'percentage' },
      currency: { symbol: 'AED' },
    },
    color_variants: [
      {
        color_name: 'Emerald Green',
        color_code: '#10B981',
        images: [
          { url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop', is_primary: true },
        ],
      },
    ],
    tags: [{ _id: 't2', name: 'Best Seller' }],
    material: { name: 'Fabric' },
    category: { name: 'Chairs' },
    brand: { name: 'xoto' },
  },
  {
    _id: '3',
    name: 'Marble Top Console',
    short_description: 'Italian Carrara marble with matte black steel frame.',
    pricing: {
      sale_price: 35999,
      mrp: 49999,
      discount: { value: 28, type: 'percentage' },
      currency: { symbol: 'AED' },
    },
    color_variants: [
      {
        color_name: 'White Marble',
        color_code: '#F3F4F6',
        images: [
          { url: 'https://images.unsplash.com/photo-1611262588024-d12430b98920?w=800&auto=format&fit=crop', is_primary: true },
        ],
      },
    ],
    tags: [{ _id: 't3', name: 'Premium' }],
    material: { name: 'Stone' },
    category: { name: 'Tables' },
    brand: { name: 'xoto' },
  },
  {
    _id: '4',
    name: 'Modern Sectional Sofa',
    short_description: 'Modular design with premium fabric and memory foam cushions.',
    pricing: {
      sale_price: 45999,
      mrp: 59999,
      discount: { value: 23, type: 'percentage' },
      currency: { symbol: 'AED' },
    },
    color_variants: [
      {
        color_name: 'Charcoal Gray',
        color_code: '#4B5563',
        images: [
          { url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&auto=format&fit=crop', is_primary: true },
        ],
      },
    ],
    tags: [{ _id: 't4', name: 'Hot Deal' }],
    material: { name: 'Fabric' },
    category: { name: 'Sofas' },
    brand: { name: 'xoto' },
  },
  {
    _id: '5',
    name: 'Industrial Bookshelf',
    short_description: 'Steel frame with reclaimed wood shelves.',
    pricing: {
      sale_price: 18999,
      mrp: 24999,
      discount: { value: 24, type: 'percentage' },
      currency: { symbol: 'AED' },
    },
    color_variants: [
      {
        color_name: 'Rustic Brown',
        color_code: '#92400E',
        images: [
          { url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop', is_primary: true },
        ],
      },
    ],
    tags: [{ _id: 't5', name: 'New' }],
    material: { name: 'Metal' },
    category: { name: 'Storage' },
    brand: { name: 'xoto' },
  },
  {
    _id: '6',
    name: 'Minimalist Dining Table',
    short_description: 'Clean lines with solid oak top and powder-coated legs.',
    pricing: {
      sale_price: 32999,
      mrp: 42999,
      discount: { value: 23, type: 'percentage' },
      currency: { symbol: 'AED' },
    },
    color_variants: [
      {
        color_name: 'Natural Wood',
        color_code: '#D4A574',
        images: [
          { url: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&auto=format&fit=crop', is_primary: true },
        ],
      },
    ],
    tags: [{ _id: 't6', name: 'Premium' }],
    material: { name: 'Wood' },
    category: { name: 'Dining' },
    brand: { name: 'xoto' },
  },
];

const ProductFilterPage = () => {
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedStyles, setSelectedStyles] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const [sortOption, setSortOption] = useState('most-popular');

  const filteredProducts = useMemo(() => {
    return dummyProducts.filter((product) => {
      const price = product.pricing.sale_price;
      const colors = product.color_variants.map((v) => v.color_name.toLowerCase());
      const category = product.category.name;
      const material = product.material.name;

      return (
        (selectedCategories.length === 0 || selectedCategories.includes(category)) &&
        (selectedColors.length === 0 || selectedColors.some((c) => colors.includes(c.toLowerCase()))) &&
        (selectedStyles.length === 0 || selectedStyles.includes('all')) &&
        (selectedMaterials.length === 0 || selectedMaterials.includes(material)) &&
        price >= priceRange[0] &&
        price <= priceRange[1]
      );
    });
  }, [selectedCategories, selectedColors, selectedStyles, selectedMaterials, priceRange]);

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      const priceA = a.pricing.sale_price;
      const priceB = b.pricing.sale_price;

      switch (sortOption) {
        case 'price-low-high':
          return priceA - priceB;
        case 'price-high-low':
          return priceB - priceA;
        case 'newest':
          return b._id - a._id;
        default:
          return 0;
      }
    });
  }, [filteredProducts, sortOption]);

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedColors([]);
    setSelectedStyles([]);
    setSelectedMaterials([]);
    setPriceRange([0, 50000]);
  };

  return (
    <Layout style={{ background: '#f8fafc', minHeight: '100vh' }}>
      <Content style={{ padding: '0 24px' }}>
        {/* Hero Banner with Gradient */}
        <div 
          className="relative rounded-2xl overflow-hidden mb-8 mt-6 shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            height: '400px',
          }}
        >
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute top-6 right-6">
            <Tag color="gold" style={{ fontSize: '14px', fontWeight: 'bold', padding: '4px 12px' }}>
              New Collection
            </Tag>
          </div>
          
          <div className="relative z-10 h-full flex flex-col md:flex-row items-center justify-between p-8 md:p-16">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Discover Your <span className="text-yellow-300">Perfect</span> Space
                </h1>
                <p className="text-xl text-white/90 mb-8 max-w-xl">
                  AI-curated furniture collections that blend modern design with timeless elegance.
                  Transform your home with pieces that tell your story.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button 
                    type="primary" 
                    size="large"
                    style={{
                      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                      border: 'none',
                      fontWeight: 'bold',
                      padding: '0 32px',
                      height: '48px',
                      borderRadius: '8px',
                    }}
                  >
                    Shop New Arrivals
                  </Button>
                  <Button 
                    size="large"
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      color: 'white',
                      fontWeight: 'bold',
                      padding: '0 32px',
                      height: '48px',
                      borderRadius: '8px',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    <VideoCameraOutlined className="mr-2" />
                    AR Preview
                  </Button>
                </div>
              </motion.div>
            </div>
            
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-64 h-64 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl opacity-50"></div>
                <img 
                  src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=500&auto=format&fit=crop" 
                  alt="Featured Furniture"
                  className="relative w-72 h-72 object-cover rounded-2xl shadow-2xl"
                  style={{ transform: 'rotate(3deg)' }}
                />
                <div 
                  className="absolute -bottom-4 -right-4 bg-white p-4 rounded-xl shadow-2xl"
                  style={{ transform: 'rotate(-2deg)' }}
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">4.8</div>
                    <div className="flex items-center justify-center">
                      {[...Array(5)].map((_, i) => (
                        <StarFilled key={i} className="text-yellow-500 text-sm" />
                      ))}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">Customer Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: showFilters ? '280px 1fr' : '1fr',
            gap: 24,
            marginBottom: 40,
          }}
        >
          <Filters
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            selectedColors={selectedColors}
            setSelectedColors={setSelectedColors}
            selectedStyles={selectedStyles}
            setSelectedStyles={setSelectedStyles}
            selectedMaterials={selectedMaterials}
            setSelectedMaterials={setSelectedMaterials}
            mobileFiltersOpen={mobileFiltersOpen}
            setMobileFiltersOpen={setMobileFiltersOpen}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            resetFilters={resetFilters}
          />

          <ProductGrid
            sortedProducts={sortedProducts}
            showFilters={showFilters}
            sortOption={sortOption}
            setSortOption={setSortOption}
          />
        </div>
      </Content>
    </Layout>
  );
};

export default ProductFilterPage;