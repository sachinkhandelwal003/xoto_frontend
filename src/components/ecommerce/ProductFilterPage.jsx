import React, { useState, useMemo } from 'react';
import { Layout, Card, Image, Button, Tag, Modal, Dropdown, Space, Avatar, Typography, Empty } from 'antd';
import { VideoCameraOutlined, DownOutlined } from '@ant-design/icons';
import bannerImage from '../../assets/img/ecommercebanner.png'; // Keep your banner or use placeholder
import Filters from './Filters';
import ProductGrid from './ProductGrid';

const { Content } = Layout;
const { Text } = Typography;

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
      currency: { symbol: '₹' },
    },
    color_variants: [
      {
        color_name: 'Natural Oak',
        color_code: '#D4A574',
        images: [
          { url: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c29mYXxlbnwwfHwwfHx8MA%3D%3D&fm=jpg&q=60&w=3000?w=800', is_primary: true },
        ],
      },
    ],
    tags: [{ _id: 't1', name: 'New' }],
    material: { name: 'Wood' },
    category: { name: 'Tables' },
    brand: { name: 'Sawtar' },
  },
  {
    _id: '2',
    name: 'Velvet Accent Armchair',
    short_description: 'Luxurious velvet upholstery with golden legs.',
    pricing: {
      sale_price: 24999,
      mrp: 34999,
      discount: { value: 29, type: 'percentage' },
      currency: { symbol: '₹' },
    },
    color_variants: [
      {
        color_name: 'Emerald Green',
        color_code: '#10B981',
        images: [
          { url: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c29mYXxlbnwwfHwwfHx8MA%3D%3D&fm=jpg&q=60&w=3000?w=800', is_primary: true },
        ],
      },
      {
        color_name: 'Royal Blue',
        color_code: '#3B82F6',
        images: [
          { url: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c29mYXxlbnwwfHwwfHx8MA%3D%3D&fm=jpg&q=60&w=3000?w=800', is_primary: true },
        ],
      },
    ],
    tags: [{ _id: 't2', name: 'Best Seller' }],
    material: { name: 'Fabric' },
    category: { name: 'Chairs' },
    brand: { name: 'Sawtar' },
  },
  {
    _id: '3',
    name: 'Marble Top Console',
    short_description: 'Italian Carrara marble with matte black steel frame.',
    pricing: {
      sale_price: 35999,
      mrp: 49999,
      discount: { value: 28, type: 'percentage' },
      currency: { symbol: '₹' },
    },
    color_variants: [
      {
        color_name: 'White Marble',
        color_code: '#F3F4F6',
        images: [
          { url: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c29mYXxlbnwwfHwwfHx8MA%3D%3D&fm=jpg&q=60&w=3000?w=800', is_primary: true },
        ],
      },
    ],
    tags: [{ _id: 't3', name: 'Premium' }],
    material: { name: 'Stone' },
    category: { name: 'Tables' },
    brand: { name: 'Sawtar' },
  },
   {
    _id: '4',
    name: 'Marble Top Console',
    short_description: 'Italian Carrara marble with matte black steel frame.',
    pricing: {
      sale_price: 35999,
      mrp: 49999,
      discount: { value: 28, type: 'percentage' },
      currency: { symbol: '₹' },
    },
    color_variants: [
      {
        color_name: 'White Marble',
        color_code: '#F3F4F6',
        images: [
          { url: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c29mYXxlbnwwfHwwfHx8MA%3D%3D&fm=jpg&q=60&w=3000?w=800', is_primary: true },
        ],
      },
    ],
    tags: [{ _id: 't3', name: 'Premium' }],
    material: { name: 'Stone' },
    category: { name: 'Tables' },
    brand: { name: 'Sawtar' },
  }, {
    _id: '5',
    name: 'Marble Top Console',
    short_description: 'Italian Carrara marble with matte black steel frame.',
    pricing: {
      sale_price: 35999,
      mrp: 49999,
      discount: { value: 28, type: 'percentage' },
      currency: { symbol: '₹' },
    },
    color_variants: [
      {
        color_name: 'White Marble',
        color_code: '#F3F4F6',
        images: [
          { url: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c29mYXxlbnwwfHwwfHx8MA%3D%3D&fm=jpg&q=60&w=3000?w=800', is_primary: true },
        ],
      },
    ],
    tags: [{ _id: 't3', name: 'Premium' }],
    material: { name: 'Stone' },
    category: { name: 'Tables' },
    brand: { name: 'Sawtar' },
  }, {
    _id: '6',
    name: 'Marble Top Console',
    short_description: 'Italian Carrara marble with matte black steel frame.',
    pricing: {
      sale_price: 35999,
      mrp: 49999,
      discount: { value: 28, type: 'percentage' },
      currency: { symbol: '₹' },
    },
    color_variants: [
      {
        color_name: 'White Marble',
        color_code: '#F3F4F6',
        images: [
          { url: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c29mYXxlbnwwfHwwfHx8MA%3D%3D&fm=jpg&q=60&w=3000?w=800', is_primary: true },
        ],
      },
    ],
    tags: [{ _id: 't3', name: 'Premium' }],
    material: { name: 'Stone' },
    category: { name: 'Tables' },
    brand: { name: 'Sawtar' },
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
  const [openDropdown, setOpenDropdown] = useState({
    categories: true,
    price: true,
    colors: true,
    styles: true,
    materials: true,
    sort: false,
  });

  const toggleFilter = (filterType, id) => {
    const setters = {
      category: setSelectedCategories,
      color: setSelectedColors,
      style: setSelectedStyles,
      material: setSelectedMaterials,
    };
    const setter = setters[filterType];
    if (setter) {
      setter((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
    }
  };

  const toggleDropdown = (dropdown) => {
    setOpenDropdown((prev) => ({ ...prev, [dropdown]: !prev[dropdown] }));
  };

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
    <Layout style={{ background: 'white', minHeight: '100vh' }}>
      <Content style={{ padding: '0 50px' }}>
        {/* Banner */}
        <Card
          style={{ margin: '16px 0', borderRadius: 12, overflow: 'hidden' }}
          bodyStyle={{ padding: 0 }}
        >
          <div style={{ position: 'relative', height: 200 }}>
            <Image
              src={bannerImage || 'https://images.unsplash.com/photo-1618221195710-dd030f2a2f1b?w=1600'}
              alt="Banner"
              preview={false}
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                color: 'white',
              }}
            >
              <h2 style={{ fontSize: 32, fontWeight: 700, margin: 0 }}>Discover Your Style</h2>
              <p style={{ fontSize: 16, margin: '8px 0 0' }}>Curated furniture for modern homes</p>
            </div>
          </div>
        </Card>

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
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
            toggleFilter={toggleFilter}
            toggleDropdown={toggleDropdown}
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