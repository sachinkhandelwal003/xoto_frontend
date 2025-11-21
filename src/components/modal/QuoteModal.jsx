import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Typography, message } from 'antd';
import { Form, Input, Select, Button as AntButton } from 'antd';
import { apiService } from '../../manageApi/utils/custom.apiservice';

const { Title, Text } = Typography;

const QuoteModal = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [fetchingSubcat, setFetchingSubcat] = useState(false);

  // Load Categories when modal opens
  useEffect(() => {
    if (!isOpen) return;

    const loadCategories = async () => {
      try {
        const res = await apiService.get("/freelancer/category?active=true");
        if (res.data?.length) {
          setCategories(res.data.map(c => ({ value: c._id, label: c.name })));
        }
      } catch (err) {
        message.error("Failed to load categories");
      }
    };
    loadCategories();
  }, [isOpen]);

  // Handle category change
  const handleCategoryChange = async (value) => {
    setSelectedCategory(value);
    setSubcategories([]);
    form.setFieldsValue({ subcategories: undefined });

    if (!value) return;

    setFetchingSubcat(true);
    try {
      const res = await apiService.get(`/freelancer/subcategory?category=${value}`);
      if (res.data?.length) {
        setSubcategories(res.data.map(s => ({ value: s._id, label: s.name })));
      }
    } catch (err) {
      message.error("Failed to load subcategories");
    } finally {
      setFetchingSubcat(false);
    }
  };

  // Close & reset
  const closeModal = () => {
    onClose?.();
    form.resetFields();
    setSubcategories([]);
    setSelectedCategory(null);
  };

  // Submit form
  const onFinish = async (values) => {
    setLoading(true);
    const payload = {
      customer_name: values.customer_name.trim(),
      customer_email: values.customer_email.trim().toLowerCase(),
      customer_mobile: values.customer_mobile.trim(),
      category: values.category,
      subcategories: values.subcategories || [],
      description: values.description?.trim() || "No details provided"
    };

    try {
      const res = await apiService.post("/estimates/submit", payload);
      console.log(res)
      if (res) {
        message.success("Thank you! Your request has been sent. We'll call you soon!");
        form.resetFields();
        setTimeout(closeModal, 1800);
      } else {
        throw new Error(res.data?.message || "Submission failed");
      }
    } catch (err) {
      message.error(err.response?.data?.message || "Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl mx-auto overflow-hidden relative"
            initial={{ scale: 0.9, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-2xl hover:bg-red-50 hover:text-red-600 transition"
              aria-label="Close"
            >
              ×
            </button>

            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-8 text-white text-center">
              <Title level={2} className="!text-white !text-3xl lg:!text-4xl !mb-2">
                Get Your Free Quote Now
              </Title>
              <Text className="!text-white/90 text-lg">
                100% Free • Response in 24 Hours
              </Text>
            </div>

            {/* Form Body */}
            <div className="p-6 lg:p-10 bg-gray-50">
              <div className="max-w-3xl mx-auto">
                <Form form={form} layout="vertical" onFinish={onFinish} className="space-y-5">

                  {/* Row 1: Name + Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Form.Item name="customer_name" label="Full Name" rules={[{ required: true }]}>
                      <Input placeholder="Your name" className="h-12 rounded-xl" />
                    </Form.Item>
                    <Form.Item name="customer_email" label="Email" rules={[{ required: true, type: 'email' }]}>
                      <Input placeholder="your@email.com" className="h-12 rounded-xl" />
                    </Form.Item>
                  </div>

                  {/* Row 2: Mobile + Category */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Form.Item name="customer_mobile" label="Mobile Number" rules={[{ required: true, pattern: /^[6-9]\d{9}$/, message: 'Invalid number' }]}>
                      <Input placeholder="10-digit number" maxLength={10} className="h-12 rounded-xl" />
                    </Form.Item>
                    <Form.Item name="category" label="Service Category" rules={[{ required: true }]}>
                      <Select
                        showSearch
                        placeholder="Select category"
                        options={categories}
                        onChange={handleCategoryChange}
                        loading={categories.length === 0}
                        className="h-12"
                      />
                    </Form.Item>
                  </div>

                  {/* Row 3: Subcategory + Description */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <Form.Item name="subcategories" label="Subcategories (Optional)">
                      <Select
                        mode="multiple"
                        placeholder="Select services"
                        options={subcategories}
                        loading={fetchingSubcat}
                        disabled={!selectedCategory}
                        allowClear
                        className="h-12"
                      />
                    </Form.Item>
                    <Form.Item name="description" label="Project Details">
                      <Input.TextArea
                        rows={3}
                        placeholder="e.g., 2BHK interior in Delhi, swimming pool, etc."
                        className="rounded-xl resize-none"
                      />
                    </Form.Item>
                  </div>

                  {/* Submit Button */}
                  <Form.Item className="mb-3">
                    <AntButton
                      type="primary"
                      htmlType="submit"
                      block
                      size="large"
                      loading={loading}
                      className="h-14 text-lg font-bold rounded-xl shadow-lg"
                      style={{
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        border: "none"
                      }}
                    >
                      {loading ? "Sending..." : "Get Free Quote Instantly"}
                    </AntButton>
                  </Form.Item>

                  <Text type="secondary" className="block text-center text-sm">
                    We never spam • Your info is 100% safe with us
                  </Text>
                </Form>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default QuoteModal;