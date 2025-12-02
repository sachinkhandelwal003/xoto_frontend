// src/components/homepage/AiPlanner/GardenCalculator.jsx
import React, { useState, useEffect } from 'react';
import {
  Card,
  Button,
  Typography,
  Form,
  Input,
  Select,
  Space,
  Divider,
  Row,
  Col,
  message,
  Radio,
  Progress,
  Result,
  Image
} from 'antd';
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  CheckCircleOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  SmileOutlined,
  FileTextOutlined,
  HomeOutlined,
  BuildOutlined,
  EnvironmentOutlined,
  CalculatorOutlined,
  PhoneFilled,
  FileDoneOutlined
} from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import { apiService } from '../../../manageApi/utils/custom.apiservice';
import { showSuccessAlert } from '../../../manageApi/utils/sweetAlert';
import logoNew from "../../../assets/img/logoNew.png";

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const landscapeCategories = [
  { id: 'residential', label: 'Residential Gardens', description: 'Home gardens, backyards, patios' },
  { id: 'commercial', label: 'Commercial Landscaping', description: 'Office complexes, retail spaces' },
  { id: 'hardscape', label: 'Hardscape Design', description: 'Patios, walkways, retaining walls' },
  { id: 'irrigation', label: 'Irrigation Systems', description: 'Smart watering, drip systems' },
  { id: 'lighting', label: 'Outdoor Lighting', description: 'Garden lights, path lighting' },
  { id: 'maintenance', label: 'Garden Maintenance', description: 'Regular upkeep, seasonal care' },
];

const gardenTypes = [
  { id: 'modern', label: 'Modern Minimal', description: 'Clean lines, gravel, succulents & lighting' },
  { id: 'tropical', label: 'Tropical Oasis', description: 'Lush plants, palms, water features' },
  { id: 'english', label: 'English Cottage', description: 'Flowers, hedges, curved paths' },
  { id: 'xeriscape', label: 'Desert / Xeriscape', description: 'Drought-resistant plants & rocks' },
  { id: 'family', label: 'Family-Friendly', description: 'Lawn, play area, shade trees' },
  { id: 'zen', label: 'Zen Japanese', description: 'Rocks, bamboo, sand, tranquility' },
];

const packages = [
  { 
    id: 'basic', 
    name: 'Basic Refresh', 
    price: 3499, 
    features: ['Basic planting', 'Mulching', 'Simple layout', 'Standard materials'],
    description: 'Perfect for small garden updates'
  },
  { 
    id: 'premium', 
    name: 'Premium Garden', 
    price: 7999, 
    features: ['Custom design', 'Quality plants', 'Irrigation system', 'Lighting'],
    description: 'Complete garden transformation'
  },
  { 
    id: 'luxury', 
    name: 'Luxury Landscape', 
    price: 14999, 
    features: ['Full custom design', 'Water features', 'Pergola/Patio', 'Smart irrigation', 'Premium plants'],
    description: 'Luxury outdoor living space'
  },
];

const countryCodes = [
  { value: "+91", label: "+91 India" },
  { value: "+971", label: "+971 UAE" },
  { value: "+966", label: "+966 Saudi Arabia" },
  { value: "+1", label: "+1 USA/Canada" },
  { value: "+44", label: "+44 UK" },
  { value: "+61", label: "+61 Australia" },
];

const steps = [
  { 
    title: 'Landscaping Type', 
    description: 'Choose your category',
    icon: <EnvironmentOutlined />
  },
  { 
    title: 'Garden Style', 
    description: 'Choose your garden style',
    icon: <HomeOutlined />
  },
  { 
    title: 'Area Size', 
    description: 'Enter garden dimensions',
    icon: <CalculatorOutlined />
  },
  { 
    title: 'Package', 
    description: 'Select your package',
    icon: <BuildOutlined />
  },
  { 
    title: 'Contact Details', 
    description: 'Share your information',
    icon: <PhoneFilled />
  },
  { 
    title: 'Quote Ready', 
    description: 'Receive your estimate',
    icon: <FileDoneOutlined />
  }
];

const Calculator = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedLandscapeCategory, setSelectedLandscapeCategory] = useState('');
  const [selectedGardenType, setSelectedGardenType] = useState('');
  const [selectedPackage, setSelectedPackage] = useState('');
  const [areaSqFt, setAreaSqFt] = useState('');
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [fetchingSubcat, setFetchingSubcat] = useState(false);
  const [countryCode, setCountryCode] = useState("+971");
  const [mobileNumber, setMobileNumber] = useState("");
  const [estimateSubmitted, setEstimateSubmitted] = useState(false);

  // Load Categories
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await apiService.get("/freelancer/category?active=true");
        if (res.data?.length) {
          setCategories(res.data.map(c => ({ value: c._id, label: c.name })));
        }
      } catch (err) {
        console.log("Failed to load categories");
      }
    };
    loadCategories();
  }, []);

  // Load Subcategories
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

  const onFinish = async (values) => {
    if (!mobileNumber || mobileNumber.length < 8) {
      return message.error("Please enter a valid mobile number");
    }

    setLoading(true);

    const payload = {
      customer_name: values.customer_name.trim(),
      customer_email: values.customer_email.trim().toLowerCase(),
      customer_mobile: {
        country_code: countryCode,
        number: mobileNumber.replace(/\D/g, "").slice(0, 15)
      },
      category: values.category,
      subcategories: values.subcategories || [],
      description: values.description?.trim() || "No details provided",
      landscape_category: selectedLandscapeCategory,
      garden_style: selectedGardenType,
      area_sqft: areaSqFt,
      package: selectedPackage,
      estimated_price: calculateTotalPrice()
    };

    try {
      const res = await apiService.post("/estimates/submit", payload);

      // Show success and move to success step
      setEstimateSubmitted(true);
      setActiveStep(5); // Move to success step (step 6)

      // Show success alert
      showSuccessAlert(
        "Success!",
        "Your estimate request has been submitted successfully! We will reach you soon with your detailed quote."
      );

    } catch (err) {
      const errorMsg = err.response?.data?.message || "Submission failed. Please try again.";
      message.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) setActiveStep(prev => prev + 1);
  };

  const handleBack = () => {
    if (activeStep > 0) setActiveStep(prev => prev - 1);
  };

  const handleGetFreeQuote = () => {
    // Move to contact details step when "Get Free Quote" is clicked
    setActiveStep(4); // Move to step 4 (contact details)
  };

  const handleCreateNewEstimate = () => {
    // Reset everything and go back to step 0
    setActiveStep(0);
    setEstimateSubmitted(false);
    form.resetFields();
    setMobileNumber("");
    setSelectedLandscapeCategory('');
    setSelectedGardenType('');
    setSelectedPackage('');
    setAreaSqFt('');
  };

  const calculateTotalPrice = () => {
    if (!selectedPackage) return 0;
    const pkg = packages.find(p => p.id === selectedPackage);
    if (!pkg) return 0;
    
    // Optional: Add area-based pricing
    const basePrice = pkg.price;
    const areaMultiplier = areaSqFt ? Math.max(1, areaSqFt / 1000) : 1;
    return Math.round(basePrice * areaMultiplier);
  };

  const isStepValid = () => {
    switch (activeStep) {
      case 0: return !!selectedLandscapeCategory;
      case 1: return !!selectedGardenType;
      case 2: return areaSqFt && areaSqFt >= 100;
      case 3: return !!selectedPackage;
      case 4: return true; // Form validation will handle this
      case 5: return true; // Success step
      default: return false;
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div className="text-center">
            <Title level={2} className="mb-4 text-purple-700">
              What Type of Landscaping Do You Need?
            </Title>
            <Text type="secondary" className="text-lg mb-8 block">
              Select the category that best describes your project
            </Text>

            <Radio.Group 
              value={selectedLandscapeCategory} 
              onChange={(e) => setSelectedLandscapeCategory(e.target.value)}
              className="w-full"
            >
              <Row gutter={[24, 24]}>
                {landscapeCategories.map((category) => (
                  <Col xs={24} sm={12} md={8} key={category.id}>
                    <Card
                      hoverable
                      className={`h-full cursor-pointer transition-all duration-300 ${
                        selectedLandscapeCategory === category.id
                          ? 'border-2 border-purple-600 shadow-lg shadow-purple-200'
                          : 'border border-gray-200 hover:border-purple-400 hover:shadow-md'
                      }`}
                      onClick={() => setSelectedLandscapeCategory(category.id)}
                      bodyStyle={{ padding: '24px 16px', textAlign: 'center' }}
                    >
                      <Radio value={category.id} className="absolute top-3 right-3" />
                      
                      <div className="h-32 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg flex items-center justify-center mb-4">
                        <div className="text-5xl text-purple-600 font-bold">
                          {category.label[0]}
                        </div>
                      </div>
                      
                      <Title level={4} className="mb-2 text-gray-800">{category.label}</Title>
                      <Text type="secondary" className="text-sm">{category.description}</Text>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Radio.Group>
          </div>
        );

      case 1:
        return (
          <div className="text-center">
            <Title level={2} className="mb-4 text-purple-700">
              What Style of Garden Do You Dream Of?
            </Title>
            <Text type="secondary" className="text-lg mb-8 block">
              Choose the vibe that matches your vision
            </Text>

            <Radio.Group 
              value={selectedGardenType} 
              onChange={(e) => setSelectedGardenType(e.target.value)}
              className="w-full"
            >
              <Row gutter={[24, 24]}>
                {gardenTypes.map((type) => (
                  <Col xs={24} sm={12} md={8} key={type.id}>
                    <Card
                      hoverable
                      className={`h-full cursor-pointer transition-all duration-300 ${
                        selectedGardenType === type.id
                          ? 'border-2 border-purple-600 shadow-lg shadow-purple-200'
                          : 'border border-gray-200 hover:border-purple-400 hover:shadow-md'
                      }`}
                      onClick={() => setSelectedGardenType(type.id)}
                      bodyStyle={{ padding: '24px 16px', textAlign: 'center' }}
                    >
                      <Radio value={type.id} className="absolute top-3 right-3" />
                      
                      <div className="h-32 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg flex items-center justify-center mb-4">
                        <div className="text-5xl text-green-600 font-bold">
                          {type.label[0]}
                        </div>
                      </div>
                      
                      <Title level={4} className="mb-2 text-gray-800">{type.label}</Title>
                      <Text type="secondary" className="text-sm">{type.description}</Text>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Radio.Group>
          </div>
        );

      case 2:
        return (
          <div className="text-center">
            <Title level={2} className="mb-4 text-purple-700">
              What's the Size of Your Garden?
            </Title>
            <Text type="secondary" className="text-lg mb-8 block">
              Enter total area in square feet (e.g., 90×90 = 8100 sq ft)
            </Text>

            <div className="max-w-md mx-auto">
              <Form.Item
                label="Total Garden Area (sq ft)"
                className="text-left"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input
                  type="number"
                  size="large"
                  value={areaSqFt}
                  onChange={(e) => setAreaSqFt(e.target.value)}
                  placeholder="Enter area in square feet"
                  min="100"
                  max="50000"
                  className="rounded-lg border-purple-300 focus:border-purple-500 focus:shadow-purple-200"
                  suffix={<span className="text-gray-500">sq ft</span>}
                />
              </Form.Item>
              
              <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                <Text strong className="text-purple-700 block mb-2">Common Garden Sizes:</Text>
                <Row gutter={[16, 8]} className="text-sm">
                  <Col span={8}>
                    <Button 
                      type="dashed" 
                      size="small" 
                      onClick={() => setAreaSqFt(500)}
                      className="w-full"
                    >
                      Small (500 sq ft)
                    </Button>
                  </Col>
                  <Col span={8}>
                    <Button 
                      type="dashed" 
                      size="small" 
                      onClick={() => setAreaSqFt(1500)}
                      className="w-full"
                    >
                      Medium (1500 sq ft)
                    </Button>
                  </Col>
                  <Col span={8}>
                    <Button 
                      type="dashed" 
                      size="small" 
                      onClick={() => setAreaSqFt(3000)}
                      className="w-full"
                    >
                      Large (3000 sq ft)
                    </Button>
                  </Col>
                </Row>
              </div>
              
              {areaSqFt && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <Text className="text-green-700">
                    <CalculatorOutlined className="mr-2" />
                    Example: {Math.sqrt(areaSqFt).toFixed(1)} ft × {Math.sqrt(areaSqFt).toFixed(1)} ft = <strong>{areaSqFt} sq ft</strong>
                  </Text>
                </div>
              )}
              
              {areaSqFt && areaSqFt < 100 && (
                <Text type="warning" className="block mt-2">
                  ⚠️ Minimum 100 sq ft recommended for proper landscaping
                </Text>
              )}
            </div>
          </div>
        );

      case 3:
        const selectedPkg = packages.find(p => p.id === selectedPackage);
        const totalPrice = calculateTotalPrice();

        return (
          <div className="text-center">
            <Title level={2} className="mb-4 text-purple-700">
              Choose Your Landscaping Package
            </Title>
            <Text type="secondary" className="text-lg mb-8 block">
              From simple refresh to luxury outdoor living
            </Text>

            <Radio.Group 
              value={selectedPackage} 
              onChange={(e) => setSelectedPackage(e.target.value)}
              className="w-full"
            >
              <Row gutter={[24, 24]}>
                {packages.map((pkg) => (
                  <Col xs={24} md={8} key={pkg.id}>
                    <Card
                      hoverable
                      className={`h-full cursor-pointer transition-all duration-300 ${
                        selectedPackage === pkg.id
                          ? 'border-2 border-purple-600 shadow-lg shadow-purple-200 transform scale-105'
                          : 'border border-gray-200 hover:border-purple-400 hover:shadow-md'
                      }`}
                      onClick={() => setSelectedPackage(pkg.id)}
                      bodyStyle={{ padding: '24px 16px' }}
                    >
                      <Radio value={pkg.id} className="mb-4" />
                      <Title level={3} className="mb-2 text-gray-800">{pkg.name}</Title>
                      <Title level={2} className="text-purple-600 mb-4">
                        ${pkg.price.toLocaleString()}
                        <Text className="text-sm text-gray-500 ml-2">starting from</Text>
                      </Title>
                      <Text type="secondary" className="block mb-4 italic">
                        {pkg.description}
                      </Text>
                      <div className="text-left">
                        {pkg.features.map((feature, index) => (
                          <div key={index} className="flex items-start mb-2">
                            <CheckCircleOutlined className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                            <Text type="secondary">{feature}</Text>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Radio.Group>

            {/* Quote Preview */}
            {selectedPackage && (
              <Card className="mt-8 max-w-2xl mx-auto bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-300">
                <Space direction="vertical" className="w-full text-center" size="middle">
                  <Title level={3} className="text-purple-700">Your Estimated Cost</Title>
                  <Title level={1} className="text-purple-600 m-0">
                    ${totalPrice.toLocaleString()}
                  </Title>
                  <Text type="secondary" className="text-sm">
                    For {areaSqFt} sq ft • {gardenTypes.find(t => t.id === selectedGardenType)?.label}
                  </Text>
                  <Button
                    type="primary"
                    size="large"
                    onClick={handleGetFreeQuote}
                    className="mt-4 h-12 text-lg font-bold"
                    icon={<FileTextOutlined />}
                    style={{
                      backgroundColor: '#7e22ce',
                      borderColor: '#7e22ce',
                      borderRadius: '8px',
                    }}
                  >
                    Get Free Detailed Quote
                  </Button>
                </Space>
              </Card>
            )}
          </div>
        );

      case 4:
        const currentPkg = packages.find(p => p.id === selectedPackage);
        const currentTotalPrice = calculateTotalPrice();

        return (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <Title level={2} className="text-purple-700">Complete Your Estimate Request</Title>
              <Text type="secondary" className="text-lg">
                Share your details to receive your detailed garden quote
              </Text>
            </div>

            <Row gutter={[32, 32]}>
              {/* Estimate Summary */}
              <Col xs={24} lg={10}>
                <Card 
                  title={
                    <Space>
                      <FileTextOutlined className="text-purple-600" />
                      <span className="text-purple-700">Your Garden Plan</span>
                    </Space>
                  } 
                  className="shadow-lg h-full border-purple-200"
                  headStyle={{ 
                    backgroundColor: '#faf5ff', 
                    borderBottom: '2px solid #e9d5ff',
                    borderRadius: '8px 8px 0 0'
                  }}
                >
                  <Space direction="vertical" className="w-full" size="large">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-2 hover:bg-purple-50 rounded">
                        <Text strong>Landscaping Type:</Text>
                        <Text>{landscapeCategories.find(t => t.id === selectedLandscapeCategory)?.label}</Text>
                      </div>
                      <div className="flex justify-between items-center p-2 hover:bg-purple-50 rounded">
                        <Text strong>Garden Style:</Text>
                        <Text>{gardenTypes.find(t => t.id === selectedGardenType)?.label}</Text>
                      </div>
                      <div className="flex justify-between items-center p-2 hover:bg-purple-50 rounded">
                        <Text strong>Garden Area:</Text>
                        <Text>{areaSqFt} sq ft</Text>
                      </div>
                      <div className="flex justify-between items-center p-2 hover:bg-purple-50 rounded">
                        <Text strong>Package:</Text>
                        <Text className="font-semibold text-purple-600">{currentPkg?.name}</Text>
                      </div>
                      <Divider className="my-2" />
                      <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                        <Text strong className="text-lg">Estimated Price:</Text>
                        <Title level={3} className="text-purple-600 m-0">
                          ${currentTotalPrice.toLocaleString()}
                        </Title>
                      </div>
                    </div>
                    
                    <Card size="small" className="bg-blue-50 border-blue-200">
                      <Space direction="vertical" size="small">
                        <Text strong className="text-blue-800">
                          💡 What's included in your detailed quote:
                        </Text>
                        <Text type="secondary" className="text-sm">
                          • Complete itemized breakdown<br/>
                          • Material options & samples<br/>
                          • Timeline & project phases<br/>
                          • 3D design visualization
                        </Text>
                      </Space>
                    </Card>
                  </Space>
                </Card>
              </Col>

              {/* Contact Form */}
              <Col xs={24} lg={14}>
                <Card 
                  title={
                    <Space>
                      <UserOutlined className="text-purple-600" />
                      <span className="text-purple-700">Contact Information</span>
                    </Space>
                  } 
                  className="shadow-lg h-full border-purple-200"
                  headStyle={{ 
                    backgroundColor: '#faf5ff', 
                    borderBottom: '2px solid #e9d5ff',
                    borderRadius: '8px 8px 0 0'
                  }}
                >
                  <Form 
                    form={form} 
                    layout="vertical" 
                    onFinish={onFinish}
                    size="large"
                  >
                    <Row gutter={[16, 16]}>
                      <Col xs={24} md={12}>
                        <Form.Item 
                          name="customer_name" 
                          label="Full Name" 
                          rules={[{ required: true, message: "Please enter your full name" }]}
                        >
                          <Input 
                            placeholder="John Doe" 
                            prefix={<UserOutlined className="text-purple-400" />}
                            className="rounded-lg border-purple-300 focus:border-purple-500 focus:shadow-purple-200"
                            allowClear
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={12}>
                        <Form.Item 
                          name="customer_email" 
                          label="Email Address" 
                          rules={[
                            { required: true, message: "Please enter your email" },
                            { type: 'email', message: "Please enter a valid email address" }
                          ]}
                        >
                          <Input 
                            placeholder="john@example.com" 
                            prefix={<MailOutlined className="text-purple-400" />}
                            className="rounded-lg border-purple-300 focus:border-purple-500 focus:shadow-purple-200"
                            allowClear
                          />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Form.Item label="Mobile Number" required>
                      <Space.Compact className="w-full">
                        <Select
                          value={countryCode}
                          onChange={setCountryCode}
                          style={{ width: '120px' }}
                          showSearch
                          optionFilterProp="children"
                          className="border-purple-300 focus:border-purple-500"
                        >
                          {countryCodes.map(c => (
                            <Option key={c.value} value={c.value}>
                              {c.label}
                            </Option>
                          ))}
                        </Select>
                        <Input
                          value={mobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ""))}
                          placeholder="501234567"
                          maxLength={15}
                          prefix={<PhoneOutlined className="text-purple-400" />}
                          className="rounded-lg flex-1 border-purple-300 focus:border-purple-500 focus:shadow-purple-200"
                          allowClear
                        />
                      </Space.Compact>
                      {mobileNumber && mobileNumber.length < 8 && (
                        <Text type="warning" className="text-xs mt-1">
                          Mobile number should be at least 8 digits
                        </Text>
                      )}
                    </Form.Item>

                    <Form.Item 
                      name="category" 
                      label="Service Category" 
                      rules={[{ required: true, message: "Please select a service category" }]}
                    >
                      <Select
                        showSearch
                        placeholder="Select service category"
                        optionFilterProp="label"
                        onChange={handleCategoryChange}
                        loading={categories.length === 0}
                        className="rounded-lg border-purple-300 focus:border-purple-500 focus:shadow-purple-200"
                        allowClear
                      >
                        {categories.map(category => (
                          <Option key={category.value} value={category.value} label={category.label}>
                            {category.label}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>

                    <Form.Item 
                      name="subcategories" 
                      label="Specific Services"
                    >
                      <Select
                        mode="multiple"
                        placeholder="Choose relevant services"
                        className="rounded-lg border-purple-300 focus:border-purple-500 focus:shadow-purple-200"
                        loading={fetchingSubcat}
                        disabled={!selectedCategory}
                        allowClear
                        maxTagCount="responsive"
                      >
                        {subcategories.map(subcategory => (
                          <Option key={subcategory.value} value={subcategory.value}>
                            {subcategory.label}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>

                    <Form.Item 
                      name="description" 
                      label="Project Details & Additional Requirements"
                      rules={[{ required: true, message: "Please describe your project" }]}
                    >
                      <TextArea
                        placeholder="Please describe your garden project in detail. Include any specific plants, features, or special requirements you have in mind..."
                        className="rounded-lg resize-none border-purple-300 focus:border-purple-500 focus:shadow-purple-200"
                        rows={4}
                        showCount
                        maxLength={500}
                      />
                    </Form.Item>

                    <Form.Item className="mb-0 text-center">
                      <Button
                        type="primary"
                        htmlType="submit"
                        size="large"
                        loading={loading}
                        icon={<CheckCircleOutlined />}
                        className="h-12 text-lg font-bold rounded-lg shadow-lg w-full"
                        style={{
                          backgroundColor: '#7e22ce',
                          borderColor: '#7e22ce',
                          borderRadius: '8px',
                        }}
                      >
                        {loading ? "Submitting Your Request..." : "Submit & Get Detailed Quote"}
                      </Button>
                    </Form.Item>
                  </Form>
                </Card>
              </Col>
            </Row>
          </div>
        );

      case 5:
        return (
          <div className="max-w-4xl mx-auto text-center">
            <Result
              icon={<SmileOutlined style={{ color: '#7e22ce', fontSize: '72px' }} />}
              status="success"
              title={
                <Title level={2} className="text-purple-700">
                  Your Request Has Been Submitted to Xoto!
                </Title>
              }
              subTitle={
                <Text className="text-lg text-gray-600">
                  Thank you for reaching out. Our team at Xoto has received your details and will get in touch within 24 hours with your customized estimate.
                </Text>
              }
              extra={[
                <Button 
                  type="primary" 
                  key="new-estimate"
                  onClick={handleCreateNewEstimate}
                  size="large"
                  icon={<FileTextOutlined />}
                  style={{
                    backgroundColor: '#7e22ce',
                    borderColor: '#7e22ce',
                    borderRadius: '8px',
                  }}
                >
                  Create Another Estimate
                </Button>,
                <Button 
                  key="home"
                  onClick={() => window.location.href = '/'}
                  size="large"
                  icon={<HomeOutlined />}
                  className="border-purple-300 text-purple-600 hover:text-purple-700 hover:border-purple-400"
                >
                  Back to Homepage
                </Button>,
              ]}
            />
            
            <Card className="mt-8 bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
              <Row gutter={[32, 32]} align="middle">
                <Col xs={24} md={12}>
                  <Space direction="vertical" size="large" className="text-left">
                    <Title level={3} className="text-purple-700">What Happens Next?</Title>
                    <div className="space-y-3">
                      <div className="flex items-start p-3 bg-white rounded-lg shadow-sm">
                        <CheckCircleOutlined className="text-green-600 text-lg mt-1 mr-3 flex-shrink-0" />
                        <div>
                          <Text strong className="text-gray-800">Expert Review</Text>
                          <br />
                          <Text type="secondary">Our garden specialist will review your requirements</Text>
                        </div>
                      </div>
                      <div className="flex items-start p-3 bg-white rounded-lg shadow-sm">
                        <CheckCircleOutlined className="text-green-600 text-lg mt-1 mr-3 flex-shrink-0" />
                        <div>
                          <Text strong className="text-gray-800">Detailed Quote</Text>
                          <br />
                          <Text type="secondary">We'll prepare a comprehensive quote with design options</Text>
                        </div>
                      </div>
                      <div className="flex items-start p-3 bg-white rounded-lg shadow-sm">
                        <CheckCircleOutlined className="text-green-600 text-lg mt-1 mr-3 flex-shrink-0" />
                        <div>
                          <Text strong className="text-gray-800">Free Consultation</Text>
                          <br />
                          <Text type="secondary">Schedule a free consultation to discuss your vision</Text>
                        </div>
                      </div>
                      <div className="flex items-start p-3 bg-white rounded-lg shadow-sm">
                        <CheckCircleOutlined className="text-green-600 text-lg mt-1 mr-3 flex-shrink-0" />
                        <div>
                          <Text strong className="text-gray-800">24-Hour Response</Text>
                          <br />
                          <Text type="secondary">You'll hear from us within 24 hours</Text>
                        </div>
                      </div>
                    </div>
                  </Space>
                </Col>
                <Col xs={24} md={12}>
                  <div className="bg-white p-6 rounded-lg shadow-lg border border-purple-100">
                    <Title level={4} className="text-purple-600 mb-4">Your Garden Plan Summary</Title>
                    <div className="space-y-2 text-left">
                      <div className="flex justify-between items-center p-2 hover:bg-purple-50 rounded">
                        <Text>Landscaping Type:</Text>
                        <Text strong>{landscapeCategories.find(t => t.id === selectedLandscapeCategory)?.label}</Text>
                      </div>
                      <div className="flex justify-between items-center p-2 hover:bg-purple-50 rounded">
                        <Text>Garden Style:</Text>
                        <Text strong>{gardenTypes.find(t => t.id === selectedGardenType)?.label}</Text>
                      </div>
                      <div className="flex justify-between items-center p-2 hover:bg-purple-50 rounded">
                        <Text>Area Size:</Text>
                        <Text strong>{areaSqFt} sq ft</Text>
                      </div>
                      <div className="flex justify-between items-center p-2 hover:bg-purple-50 rounded">
                        <Text>Package:</Text>
                        <Text strong>{packages.find(p => p.id === selectedPackage)?.name}</Text>
                      </div>
                      <Divider className="my-2" />
                      <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                        <Text strong className="text-lg">Estimated Investment:</Text>
                        <Text strong className="text-purple-600 text-xl">
                          ${calculateTotalPrice().toLocaleString()}
                        </Text>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  const progressPercentage = ((activeStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-purple-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <img src={logoNew} alt="Logo" className="h-10" />
            <div className="text-right">
              <Text strong className="text-purple-600">
                Step {activeStep + 1} of {steps.length}
              </Text>
            </div>
          </div>
          
          <Progress 
            percent={progressPercentage} 
            showInfo={false} 
            strokeColor={{
              '0%': '#8b5cf6',
              '100%': '#7c3aed',
            }}
            strokeWidth={4}
            className="mb-2"
          />
          
          {/* Steps Indicator */}
          <div className="flex justify-between mt-4">
            {steps.map((step, index) => (
              <div key={index} className="text-center flex-1 relative">
                {/* Connecting line */}
                {index < steps.length - 1 && (
                  <div className="absolute top-4 left-1/2 w-full h-0.5 bg-gray-300 -z-10"></div>
                )}
                
                <div className={`flex items-center justify-center w-10 h-10 rounded-full mx-auto relative z-10 transition-all duration-300 ${
                  index === activeStep 
                    ? 'bg-gradient-to-r from-purple-600 to-purple-800 text-white shadow-lg shadow-purple-300 transform scale-110' 
                    : index < activeStep 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-600 border-2 border-gray-300'
                }`}>
                  {index < activeStep ? step.icon : step.icon}
                </div>
                <Text 
                  strong 
                  className={`text-sm mt-2 block transition-colors duration-300 ${
                    index === activeStep ? 'text-purple-700' : 
                    index < activeStep ? 'text-green-600' : 'text-gray-500'
                  }`}
                >
                  {step.title}
                </Text>
                <Text 
                  type="secondary" 
                  className="text-xs hidden md:block mt-1"
                >
                  {step.description}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStepContent(activeStep)}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons - Hide on step 4 (has submit button) and step 5 (success) */}
      {activeStep !== 4 && activeStep !== 5 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-purple-200 py-4 shadow-lg">
          <div className="max-w-4xl mx-auto px-6 flex justify-between items-center">
            <Button
              type="default"
              size="large"
              icon={<ArrowLeftOutlined />}
              onClick={handleBack}
              disabled={activeStep === 0}
              className="flex items-center border-purple-300 text-purple-600 hover:text-purple-700 hover:border-purple-400 rounded-lg"
            >
              Back
            </Button>

            <Button
              type="primary"
              size="large"
              icon={<ArrowRightOutlined />}
              onClick={handleNext}
              disabled={!isStepValid()}
              className="flex items-center rounded-lg shadow-lg"
              style={{
                backgroundColor: '#7e22ce',
                borderColor: '#7e22ce',
                borderRadius: '8px',
              }}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calculator;