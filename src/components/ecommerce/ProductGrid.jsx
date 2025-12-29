import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Button,
  Tag,
  Modal,
  Dropdown,
  Space,
  Avatar,
  Typography,
  Form,
  Input,
  Select,
  DatePicker,
  TimePicker,
  message,
} from "antd";
import {
  EyeOutlined,
  DownOutlined,
  VideoCameraOutlined,
  StarFilled,
  CheckCircleFilled,
  CalendarOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const { Text, Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const ProductGrid = ({
  sortedProducts,
  showFilters,
  sortOption,
  setSortOption,
}) => {
  const navigate = useNavigate();
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [showDesignerModal, setShowDesignerModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const [bookingForm] = Form.useForm();

  const sortOptions = [
    { value: "most-popular", label: "Most Popular" },
    { value: "price-low-high", label: "Price: Low to High" },
    { value: "price-high-low", label: "Price: High to Low" },
    { value: "newest", label: "Newest" },
  ];

  const handleSortChange = ({ key }) => setSortOption(key);
  const sortMenuProps = {
    items: sortOptions.map((o) => ({ key: o.value, label: o.label })),
    onClick: handleSortChange,
  };

  const totalProducts = sortedProducts.length;
  const totalPages = Math.ceil(totalProducts / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalProducts);
  const paginatedProducts = sortedProducts.slice(startIndex, endIndex);

  const designers = [
    {
      id: 1,
      name: "Sarah Chen",
      specialty: "Modern & Minimalist",
      rating: 4.9,
      experience: "8 years",
      projects: "120+",
      avatarColor: "#8b5cf6",
      description:
        "Specializes in creating functional yet beautiful modern spaces.",
    },
    {
      id: 2,
      name: "Marcus Johnson",
      specialty: "Industrial & Loft",
      rating: 4.7,
      experience: "6 years",
      projects: "85+",
      avatarColor: "#6366f1",
      description: "Expert in transforming industrial spaces into cozy homes.",
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      specialty: "Scandinavian & Bohemian",
      rating: 4.8,
      experience: "7 years",
      projects: "95+",
      avatarColor: "#ec4899",
      description:
        "Creates harmonious spaces blending Scandinavian minimalism with boho warmth.",
    },
  ];

  const handleBookingSubmit = (values) => {
    console.log("Booking submitted:", values);
    message.success(
      "Consultation booked successfully! Our designer will contact you shortly."
    );
    setShowDesignerModal(false);
    bookingForm.resetFields();
  };

  if (sortedProducts.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-4xl mb-4">😔</div>
        <Title level={4} style={{ color: "#64748b" }}>
          No products match your filters
        </Title>
        <Text type="secondary">
          Try adjusting your filters to see more products
        </Text>
      </div>
    );
  }

  return (
    <div className={`p-4 ${showFilters ? "lg:col-start-2" : "col-span-full"}`}>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-6 border-b border-gray-200">
        <div>
          <Text className="text-sm text-gray-600">
            Showing{" "}
            <strong>
              {startIndex + 1}-{endIndex}
            </strong>{" "}
            of <strong>{totalProducts}</strong> products
          </Text>
          {totalProducts > 0 && (
            <Text className="block text-sm text-green-600 mt-1">
              <CheckCircleFilled className="mr-2" />
              {totalProducts} products available
            </Text>
          )}
        </div>
        <Space className="mt-4 md:mt-0" size="middle">
          <Dropdown menu={sortMenuProps} placement="bottomRight">
            <Button
              size="large"
              style={{ borderRadius: "8px", padding: "8px 16px" }}
            >
              Sort By <DownOutlined className="ml-2" />
            </Button>
          </Dropdown>
       
        </Space>
      </div>

      {/* Grid */}
      <Row gutter={[24, 32]}>
        {paginatedProducts.map((product, index) => (
          <Col xs={24} sm={12} lg={8} key={product._id}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <div
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col cursor-pointer border border-gray-100"
                onMouseEnter={() => setHoveredProduct(product._id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                {/* Image */}
                <div className="relative pt-[75%] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                  <img
                    src={product.color_variants[0].images[0].url}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.tags.map((tag) => (
                      <Tag
                        key={tag._id}
                        color={
                          tag.name === "New"
                            ? "green"
                            : tag.name === "Premium"
                              ? "gold"
                              : "purple"
                        }
                        style={{
                          borderRadius: "6px",
                          fontWeight: "600",
                          padding: "2px 10px",
                          border: "none",
                        }}
                      >
                        {tag.name}
                      </Tag>
                    ))}
                  </div>

                  {/* Hover Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end justify-center transition-all duration-300 ${
                      hoveredProduct === product._id
                        ? "opacity-100"
                        : "opacity-0"
                    }`}
                  >
                    {/* <div className="p-4 w-full">
                      <Button
                        type="primary"
                        icon={<EyeOutlined />}
                        onClick={() =>
                          navigate(`/ecommerce/product/${product._id}`)
                        }
                        style={{
                          background: "white",
                          border: "none",
                          color: "#8b5cf6",
                          width: "100%",
                          fontWeight: "600",
                          borderRadius: "8px",
                          padding: "10px 0",
                        }}
                      >
                        View Details
                      </Button>
                    </div> */}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-grow">
                  <Text className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">
                    {product.name}
                  </Text>
                  <Text className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {product.short_description}
                  </Text>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-4">
                    <Text className="text-2xl font-bold text-gray-900">
                      AED{product.pricing.sale_price.toLocaleString("en-IN")}
                    </Text>
                    {product.pricing.mrp > product.pricing.sale_price && (
                      <>
                        <Text className="text-sm text-gray-500 line-through">
                          AED{product.pricing.mrp.toLocaleString("en-IN")}
                        </Text>
                        <Tag
                          color="green"
                          style={{ borderRadius: "4px", fontWeight: "600" }}
                        >
                          {product.pricing.discount.value}% OFF
                        </Tag>
                      </>
                    )}
                  </div>

                  {/* Colors */}
                  <div className="flex items-center gap-3 mb-4">
                    <Text className="text-sm text-gray-600">Colors:</Text>
                    <div className="flex gap-2">
                      {product.color_variants.map((variant) => (
                        <div
                          key={variant.color_name}
                          className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                          style={{ backgroundColor: variant.color_code }}
                          title={variant.color_name}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Tag
                      style={{
                        background: "#f3f4f6",
                        color: "#4b5563",
                        border: "none",
                        borderRadius: "6px",
                      }}
                    >
                      {product.material.name}
                    </Tag>
                    <Tag
                      style={{
                        background: "#fef3c7",
                        color: "#92400e",
                        border: "none",
                        borderRadius: "6px",
                      }}
                    >
                      {product.category.name}
                    </Tag>
                    <Tag
                      style={{
                        background: "#e0e7ff",
                        color: "#3730a3",
                        border: "none",
                        borderRadius: "6px",
                      }}
                    >
                      {product.brand.name}
                    </Tag>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-auto">
                    <Button
                      type="primary"
                      onClick={() =>
                        navigate(`/ecommerce/product/${product._id}`)
                      }
                      style={{
                        flex: 1,
                        background:
                          "linear-gradient(135deg, #5C039B 0%, #6366f1 100%)",
                        border: "none",
                        borderRadius: "8px",
                        fontWeight: "600",
                      }}
                    >
                      <EyeOutlined className="mr-2" />
                      View Details
                    </Button>
                    <Button
                      style={{
                        flex: 1,
                        background: "#f8fafc",
                        border: "1px solid #e2e8f0",
                        color: "#475569",
                        borderRadius: "8px",
                        fontWeight: "600",
                      }}
                    >
                      <VideoCameraOutlined className="mr-2" />
                      AR Preview
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </Col>
        ))}
      </Row>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col items-center mt-12 space-y-6">
          <div className="flex gap-2">
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              style={{ borderRadius: "8px" }}
            >
              Previous
            </Button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    currentPage === pageNum
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <Button
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
              style={{ borderRadius: "8px" }}
            >
              Next
            </Button>
          </div>
          <Text className="text-sm text-gray-600">
            Page {currentPage} of {totalPages} • {totalProducts} products
          </Text>
        </div>
      )}

      {/* Designer Consultation Modal */}
      <Modal
        title={
          <div className="text-center">
            <Title level={3} style={{ color: "#4f46e5", marginBottom: "4px" }}>
              <VideoCameraOutlined className="mr-3" />
              Book a Design Consultation
            </Title>
            <Text type="secondary">
              Free 30-minute session with our expert designers
            </Text>
          </div>
        }
        open={showDesignerModal}
        onCancel={() => setShowDesignerModal(false)}
        footer={null}
        width={800}
        centered
        style={{ borderRadius: "12px", overflow: "hidden" }}
      >
        <div className="p-2">
          {/* Designer Selection */}
          <div className="mb-8">
            <Title level={5} style={{ color: "#334155", marginBottom: "16px" }}>
              Choose a Designer
            </Title>
            <Row gutter={[16, 16]}>
              {designers.map((designer) => (
                <Col span={24} md={8} key={designer.id}>
                  <div
                    className="border border-gray-200 rounded-xl p-4 hover:border-purple-300 hover:shadow-md transition-all cursor-pointer"
                    onClick={() =>
                      bookingForm.setFieldValue("designerId", designer.id)
                    }
                  >
                    <div className="flex items-start gap-3">
                      <Avatar
                        size={48}
                        style={{
                          background: designer.avatarColor,
                          fontSize: "18px",
                          fontWeight: "bold",
                        }}
                      >
                        {designer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <Text strong className="block">
                              {designer.name}
                            </Text>
                            <Text type="secondary" className="text-xs">
                              {designer.specialty}
                            </Text>
                          </div>
                          <div className="flex items-center gap-1">
                            <StarFilled className="text-yellow-500" />
                            <Text strong>{designer.rating}</Text>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 mt-2">
                          <Text className="text-xs text-gray-600">
                            <CheckCircleFilled className="mr-1" />
                            {designer.experience}
                          </Text>
                          <Text className="text-xs text-gray-600">
                            📋 {designer.projects}
                          </Text>
                        </div>
                        <Text className="text-xs text-gray-600 mt-2">
                          {designer.description}
                        </Text>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </div>

          {/* Booking Form */}
          <Form
            form={bookingForm}
            layout="vertical"
            onFinish={handleBookingSubmit}
            className="mt-6"
          >
            <Row gutter={[24, 16]}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="Your Name"
                  rules={[
                    { required: true, message: "Please enter your name" },
                  ]}
                >
                  <Input size="large" placeholder="Enter your full name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label="Email Address"
                  rules={[
                    { required: true, message: "Please enter your email" },
                    { type: "email", message: "Please enter a valid email" },
                  ]}
                >
                  <Input size="large" placeholder="Enter your email" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="phone"
                  label="Phone Number"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your phone number",
                    },
                  ]}
                >
                  <Input size="large" placeholder="Enter your phone number" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="designerId"
                  label="Preferred Designer"
                  rules={[
                    { required: true, message: "Please select a designer" },
                  ]}
                >
                  <Select size="large" placeholder="Select a designer">
                    {designers.map((d) => (
                      <Option key={d.id} value={d.id}>
                        {d.name} - {d.specialty}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="date"
                  label="Preferred Date"
                  rules={[{ required: true, message: "Please select a date" }]}
                >
                  <DatePicker
                    size="large"
                    style={{ width: "100%" }}
                    suffixIcon={<CalendarOutlined />}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="time"
                  label="Preferred Time"
                  rules={[{ required: true, message: "Please select a time" }]}
                >
                  <TimePicker
                    size="large"
                    style={{ width: "100%" }}
                    format="HH:mm"
                    minuteStep={15}
                    suffixIcon={<ClockCircleOutlined />}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="requirements" label="Project Requirements">
                  <TextArea
                    rows={4}
                    placeholder="Tell us about your space, style preferences, budget, and any specific requirements..."
                  />
                </Form.Item>
              </Col>
            </Row>

            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
              <div>
                <Text className="text-sm text-gray-600">
                  <CheckCircleFilled className="mr-2 text-green-600" />
                  Free consultation • 30 minutes • No obligation
                </Text>
              </div>
              <Space>
                <Button
                  onClick={() => setShowDesignerModal(false)}
                  size="large"
                >
                  Cancel
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  style={{
                    background:
                      "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
                    border: "none",
                    padding: "0 32px",
                    fontWeight: "600",
                  }}
                >
                  Book Consultation
                </Button>
              </Space>
            </div>
          </Form>
        </div>
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
