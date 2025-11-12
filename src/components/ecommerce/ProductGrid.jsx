import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button, Tag, Modal, Dropdown, Space, Avatar, Typography } from 'antd';
import { EyeOutlined, DownOutlined,  VideoCameraOutlined 
 } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

const ProductGrid = ({ sortedProducts, showFilters, sortOption, setSortOption }) => {
  const navigate = useNavigate();
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [showDesignerModal, setShowDesignerModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const sortOptions = [
    { value: 'most-popular', label: 'Most Popular' },
    { value: 'price-low-high', label: 'Price: Low to High' },
    { value: 'price-high-low', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest' },
  ];

  const handleSortChange = ({ key }) => setSortOption(key);
  const sortMenuProps = { items: sortOptions.map((o) => ({ key: o.value, label: o.label })), onClick: handleSortChange };

  const totalProducts = sortedProducts.length;
  const totalPages = Math.ceil(totalProducts / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalProducts);
  const paginatedProducts = sortedProducts.slice(startIndex, endIndex);

  const designers = [
    { id: 1, name: 'Emma Wilson', specialty: 'Modern & Minimalist', rating: 4.9, experience: '8 years' },
    { id: 2, name: 'James Rodriguez', specialty: 'Industrial & Loft', rating: 4.7, experience: '6 years' },
  ];

  if (sortedProducts.length === 0) {
    return (
      <div className="my-16 text-center">
        <Typography.Text type="secondary">No products match your filters. Try adjusting them!</Typography.Text>
      </div>
    );
  }

  return (
    <div className={`p-2 ${showFilters ? 'lg:col-start-2' : 'col-span-full'}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
        <Text className="text-sm text-gray-600">
          Showing <strong>{totalProducts}</strong> products
        </Text>
        <Space>
          <Dropdown menu={sortMenuProps} placement="bottomRight">
            <Button>Sort By <DownOutlined className="ml-2" /></Button>
          </Dropdown>
          <Button type="primary" icon={<VideoCameraOutlined />} onClick={() => setShowDesignerModal(true)}>
            Consult Designer
          </Button>
        </Space>
      </div>

      {/* Grid */}
      <Row gutter={[24, 24]}>
        {paginatedProducts.map((product) => (
          <Col xs={24} sm={12} lg={8} key={product._id}>
            <div
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col cursor-pointer"
              onMouseEnter={() => setHoveredProduct(product._id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Image */}
              <div className="relative pt-[75%] overflow-hidden bg-gray-50">
                <img
                  src={product.color_variants[0].images[0].url}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                  {product.tags.map((tag) => (
                    <Tag key={tag._id} color={tag.name === 'New' ? 'green' : 'orange'}>
                      {tag.name}
                    </Tag>
                  ))}
                </div>

                {/* Hover Overlay */}
                <div
                  className={`absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity ${
                    hoveredProduct === product._id ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <Button
                    type="primary"
                    icon={<EyeOutlined />}
                    onClick={() => navigate(`/sawtar/ecommerce/product/${product._id}`)}
                  >
                    View Details
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col flex-grow">
                <Text className="font-semibold text-lg mb-1">{product.name}</Text>
                <div className="flex items-center gap-2 mb-2">
                  <Text className="text-xl font-bold text-orange-600">
                    ₹{product.pricing.sale_price.toLocaleString('en-IN')}
                  </Text>
                  {product.pricing.mrp > product.pricing.sale_price && (
                    <>
                      <Text className="text-sm text-gray-500 line-through">
                        ₹{product.pricing.mrp.toLocaleString('en-IN')}
                      </Text>
                      <Text className="text-xs text-green-600">
                        {Math.round(((product.pricing.mrp - product.pricing.sale_price) / product.pricing.mrp) * 100)}% OFF
                      </Text>
                    </>
                  )}
                </div>

                {/* Colors */}
                <div className="flex gap-2 mb-3">
                  {product.color_variants.map((variant) => (
                    <div
                      key={variant.color_name}
                      className="w-6 h-6 rounded-full border-2 border-gray-300"
                      style={{ backgroundColor: variant.color_code }}
                      title={variant.color_name}
                    />
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  <Tag>{product.material.name}</Tag>
                  <Tag>{product.category.name}</Tag>
                </div>

                <Text className="text-sm text-gray-600 mt-2 line-clamp-2">{product.short_description}</Text>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      {/* Pagination */}
      {totalProducts > 9 && (
        <div className="flex flex-col items-center mt-10 space-y-4">
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1 ? 'bg-orange-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <Text className="text-sm text-gray-600">
            Showing {startIndex + 1}-{endIndex} of {totalProducts}
          </Text>
        </div>
      )}

      {/* Designer Modal */}
      <Modal
        title="Consult With a Designer"
        open={showDesignerModal}
        onCancel={() => setShowDesignerModal(false)}
        footer={null}
        width={600}
      >
        <Text className="block mb-6 text-gray-600">
          Book a free video consultation with our expert designers.
        </Text>
        <Space direction="vertical" className="w-full" size="middle">
          {designers.map((d) => (
            <div key={d.id} className="flex justify-between items-center p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <Avatar size={48} className="bg-orange-500">
                  {d.name.split(' ').map((n) => n[0]).join('')}
                </Avatar>
                <div>
                  <Text strong>{d.name}</Text>
                  <Text type="secondary" className="block text-xs">{d.specialty}</Text>
                  <Text type="secondary" className="text-xs">
                    {d.rating} stars • {d.experience}
                  </Text>
                </div>
              </div>
              <Button type="primary">Book Now</Button>
            </div>
          ))}
        </Space>
      </Modal>
    </div>
  );
};

ProductGrid.propTypes = {
  sortedProducts: PropTypes.array.isRequired,
  showFilters: PropTypes.bool.isRequired,
  sortOption: PropTypes.string.isRequired,
  setSortOption: PropTypes.func.isRequired,
};

export default React.memo(ProductGrid);