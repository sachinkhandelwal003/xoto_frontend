// src/components/homepage/AiPlanner/GardenCalculator.jsx
import React, { useState, useEffect } from 'react';
import {
  Card, Button, Typography, Form, Input, Select, Space, Row, Col, message, Spin, Result
} from 'antd';
import {
  UserOutlined, MailOutlined, CheckCircleOutlined,
  SmileOutlined, HomeOutlined, BuildOutlined,
  EnvironmentOutlined, CalculatorOutlined, PhoneFilled, 
  ArrowRightOutlined, ArrowLeftOutlined, CheckOutlined
} from '@ant-design/icons';
import { motion, AnimatePresence } from 'framer-motion';
import { apiService } from '../../../manageApi/utils/custom.apiservice';
import { showSuccessAlert } from '../../../manageApi/utils/sweetAlert';
import logoNew from "../../../assets/img/logoNew.png";

const { Title, Text } = Typography;
const { TextArea } = Input;

const countryCodes = [
  { value: "+91", label: "🇮🇳 +91" },
  { value: "+971", label: "🇦🇪 +971" },
  { value: "+966", label: "🇸🇦 +966" },
  { value: "+1", label: "🇺🇸 +1" },
  { value: "+44", label: "🇬🇧 +44" },
  { value: "+61", label: "🇦🇺 +61" },
];

// Simplified steps for cleaner UI header
const steps = [
  { title: 'Type', icon: <EnvironmentOutlined /> },
  { title: 'Style', icon: <HomeOutlined /> },
  { title: 'Area', icon: <CalculatorOutlined /> },
  { title: 'Package', icon: <BuildOutlined /> },
  { title: 'Contact', icon: <PhoneFilled /> },
];

const Calculator = () => {
  // --- STATE (Unchanged) ---
  const [activeStep, setActiveStep] = useState(0);
  
  const [subcategories, setSubcategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [packages, setPackages] = useState([]);

  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedPackage, setSelectedPackage] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');

  const [loadingSubcat, setLoadingSubcat] = useState(true);
  const [loadingTypes, setLoadingTypes] = useState(false);
  const [loadingPackages, setLoadingPackages] = useState(true);

  const [form] = Form.useForm();
  const [countryCode, setCountryCode] = useState("+971");
  const [mobileNumber, setMobileNumber] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const areaSqFt = length && width ? Math.round(parseFloat(length) * parseFloat(width)) : 0;

  // --- API CALLS (Unchanged) ---
  useEffect(() => {
    const fetchSubcategories = async () => {
      setLoadingSubcat(true);
      try {
        const res = await apiService.get("/estimate/master/category/name/Interior/subcategories");
        if (res.success) setSubcategories(res.data || []);
      } catch (err) {
        message.error("Failed to load interior types");
      } finally {
        setLoadingSubcat(false);
      }
    };
    fetchSubcategories();
  }, []);

  useEffect(() => {
    if (!selectedSubcategory) {
      setTypes([]);
      setSelectedType('');
      return;
    }
    const fetchTypes = async () => {
      setLoadingTypes(true);
      try {
        const subcat = subcategories.find(s => s._id === selectedSubcategory);
        if (!subcat) return;
        const res = await apiService.get(`/estimate/master/category/${subcat.category}/subcategories/${selectedSubcategory}/types`);
        if (res.success) setTypes(res.data || []);
      } catch (err) {
        message.error("Failed to load styles");
      } finally {
        setLoadingTypes(false);
      }
    };
    fetchTypes();
  }, [selectedSubcategory, subcategories]);

  useEffect(() => {
    const fetchPackages = async () => {
      setLoadingPackages(true);
      try {
        const res = await apiService.get("/packages");
        if (res.success && res.packages) {
          setPackages(res.packages.filter(p => p.isActive));
        }
      } catch (err) {
        message.error("Failed to load packages");
      } finally {
        setLoadingPackages(false);
      }
    };
    fetchPackages();
  }, []);

  // --- HANDLERS (Unchanged) ---
  const onFinish = async (values) => {
    if (!mobileNumber || mobileNumber.length < 8) {
      return message.error("Please enter a valid mobile number");
    }
    setSubmitting(true);

    const payload = {
      service_type: "interior",
      customer_name: values.customer_name.trim(),
      customer_email: values.customer_email.trim().toLowerCase(),
      customer_mobile: { country_code: countryCode, number: mobileNumber.replace(/\D/g, "").slice(0, 15) },
      subcategory: selectedSubcategory,
      type: selectedType,
      package: selectedPackage,
      area_length: parseFloat(length),
      area_width: parseFloat(width),
      area_sqft: areaSqFt,
      description: values.description?.trim() || "Interior project via Kitchen Calculator"
    };

    try {
      await apiService.post("/estimates/submit", payload);
      showSuccessAlert("Success!", "Your request has been submitted! We'll contact you soon.");
      setActiveStep(5);
      setTimeout(() => setActiveStep(6), 9000);
    } catch (err) {
      message.error(err.response?.data?.message || "Failed to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleNext = () => setActiveStep(prev => prev + 1);
  const handleBack = () => setActiveStep(prev => prev - 1);
  const handleGetQuote = () => setActiveStep(4);

  const isStepValid = () => {
    switch (activeStep) {
      case 0: return !!selectedSubcategory;
      case 1: return !!selectedType;
      case 2: return length > 0 && width > 0 && areaSqFt >= 100;
      case 3: return !!selectedPackage;
      default: return true;
    }
  };

  // --- HELPER COMPONENT FOR UI ---
  const SelectionCard = ({ item, isSelected, onClick, iconColor = "text-purple-600" }) => (
    <div 
      onClick={onClick}
      className={`relative h-full p-6 rounded-2xl  cursor-pointer transition-all duration-300 border-2 group
        ${isSelected 
          ? 'border-purple-600 bg-purple-50 shadow-xl shadow-purple-100 transform -translate-y-1' 
          : 'border-white bg-gray-200 hover:border-purple-300 hover:shadow-lg'
        }`}
    >
      {isSelected && (
        <div className="absolute top-4 right-4 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
          <CheckOutlined className="text-white text-xs" />
        </div>
      )}
      
      <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center text-4xl mb-4 transition-colors
        ${isSelected ? 'bg-white shadow-sm' : 'bg-purple-50 group-hover:bg-purple-100'}`}>
        <span className={iconColor}>{item.label[0]}</span>
      </div>
      
      <Title level={4} className={`text-center mb-2 ${isSelected ? 'text-purple-800' : 'text-gray-700'}`}>
        {item.label}
      </Title>
      {item.description && (
        <Text type="secondary" className="text-center block text-sm line-clamp-2">
          {item.description}
        </Text>
      )}
    </div>
  );

  const renderStepContent = (step) => {
    const fadeIn = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 } };

    switch (step) {
      case 0: // Subcategory
        return (
          <motion.div {...fadeIn} className="text-center">
            <Title level={2} className="mb-2 text-purple-900 ">What are you creating?</Title>
            <Text type="secondary" className="text-lg mb-10 block">Select the type of interior project</Text>
            {loadingSubcat ? <Spin size="large" className="mt-10" /> : (
              <Row gutter={[24, 24]}>
                {subcategories.map((sub) => (
                  <Col xs={24} sm={12} md={8} key={sub._id} >
                    <SelectionCard 
                      item={sub} 
                      isSelected={selectedSubcategory === sub._id} 
                      onClick={() => setSelectedSubcategory(sub._id)}
                    />
                  </Col>
                ))}
              </Row>
            )}
          </motion.div>
        );

      case 1: // Style
        return (
          <motion.div {...fadeIn} className="text-center">
            <Title level={2} className="mb-2 text-purple-900">Choose your Style</Title>
            <Text type="secondary" className="text-lg mb-10 block">Select the aesthetic that matches your home</Text>
            {loadingTypes ? <Spin size="large" className="mt-10" /> : (
              <Row gutter={[24, 24]}>
                {types.map((type) => (
                  <Col xs={24} sm={12} md={8} key={type._id}>
                    <SelectionCard 
                      item={type} 
                      isSelected={selectedType === type._id} 
                      onClick={() => setSelectedType(type._id)}
                      iconColor="text-emerald-600"
                    />
                  </Col>
                ))}
              </Row>
            )}
          </motion.div>
        );

      case 2: // Area
        return (
          <motion.div {...fadeIn} className="text-center max-w-lg mx-auto">
            <Title level={2} className="mb-2 text-purple-900">Dimensions</Title>
            <Text type="secondary" className="text-lg mb-10 block">Enter the size of your garden area</Text>
            
            <Card className="shadow-2xl border-0 rounded-3xl overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-indigo-700 p-8 text-white">
                <Text className="text-purple-100 uppercase tracking-widest text-xs font-bold">Total Area</Text>
                <div className="text-5xl font-bold my-2">{areaSqFt.toLocaleString()}</div>
                <Text className="text-purple-100">Square Feet</Text>
              </div>
              <div className="p-8 bg-white">
                <Row gutter={16}>
                  <Col span={12}>
                    <Text strong className="block mb-2 text-gray-500">Length</Text>
                    <Input type="number" size="large" value={length} onChange={(e) => setLength(e.target.value)} suffix="ft" className="rounded-lg" />
                  </Col>
                  <Col span={12}>
                    <Text strong className="block mb-2 text-gray-500">Width</Text>
                    <Input type="number" size="large" value={width} onChange={(e) => setWidth(e.target.value)} suffix="ft" className="rounded-lg" />
                  </Col>
                </Row>
              </div>
            </Card>
          </motion.div>
        );

      case 3: // Package
        return (
          <motion.div {...fadeIn} className="text-center">
            <Title level={2} className="mb-10 text-purple-900">Select a Package</Title>
            {loadingPackages ? <Spin size="large" className="mt-20" /> : (
              <Row gutter={[24, 24]}>
                {packages.map((pkg) => {
                  const isSel = selectedPackage === pkg._id;
                  return (
                    <Col xs={24} md={8} key={pkg._id}>
                      <div 
                        onClick={() => setSelectedPackage(pkg._id)}
                        className={`cursor-pointer h-full rounded-3xl border-2 transition-all duration-300 relative overflow-hidden flex flex-col text-left
                          ${isSel ? 'border-purple-600 shadow-2xl scale-105 z-10 bg-white' : 'border-transparent bg-white shadow-lg hover:shadow-xl'}`}
                      >
                         {pkg.popular && <div className="absolute top-0 right-0 bg-gradient-to-l from-purple-600 to-indigo-600 text-white text-xs px-4 py-1 rounded-bl-xl font-bold">POPULAR</div>}
                         <div className={`p-6 ${isSel ? 'bg-purple-50' : 'bg-white'}`}>
                            <Title level={3} className={`m-0 ${isSel ? 'text-purple-700' : 'text-gray-800'}`}>{pkg.name}</Title>
                            <Text type="secondary" className="text-xs uppercase tracking-wide font-bold mt-2 block">{pkg.price} AED Est.</Text>
                         </div>
                         <div className="p-6 pt-2 flex-1">
                            <Text type="secondary" className="block mb-4 text-sm min-h-[40px]">{pkg.description}</Text>
                            {pkg.features.map((f, i) => (
                              <div key={i} className="flex items-start mb-2 text-sm text-gray-600">
                                <CheckCircleOutlined className="text-green-500 mr-2 mt-1 flex-shrink-0" /> {f}
                              </div>
                            ))}
                         </div>
                         <div className={`p-4 text-center border-t ${isSel ? 'bg-purple-600 text-white' : 'bg-gray-50 text-gray-400'}`}>
                            {isSel ? 'Selected Package' : 'Click to Select'}
                         </div>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            )}
          </motion.div>
        );

      case 4: // Contact
        const pkg = packages.find(p => p._id === selectedPackage);
        return (
          <motion.div {...fadeIn} className="max-w-5xl mx-auto">
            <Row gutter={[40, 40]}>
              <Col xs={24} lg={10}>
                <div className="bg-gradient-to-br from-purple-800 to-indigo-900 rounded-3xl p-8 text-white h-full shadow-2xl relative overflow-hidden">
                  <div className="relative z-10">
                    <Title level={3} className="text-white mb-6">Summary</Title>
                    <div className="space-y-4">
                        <div><div className="text-purple-300 text-xs uppercase">Type</div><div className="text-lg font-medium">{subcategories.find(s => s._id === selectedSubcategory)?.label}</div></div>
                        <div><div className="text-purple-300 text-xs uppercase">Style</div><div className="text-lg font-medium">{types.find(t => t._id === selectedType)?.label}</div></div>
                        <div><div className="text-purple-300 text-xs uppercase">Size</div><div className="text-lg font-medium">{areaSqFt.toLocaleString()} sq ft</div></div>
                        <div className="pt-4 border-t border-purple-600/50">
                            <div className="text-purple-300 text-xs uppercase">Package</div>
                            <div className="text-2xl font-bold text-yellow-400">{pkg?.name}</div>
                            <div className="opacity-80">{pkg?.price} AED</div>
                        </div>
                    </div>
                  </div>
                  {/* Decor elements */}
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl opacity-20"></div>
                </div>
              </Col>
              <Col xs={24} lg={14}>
                <Card className="rounded-3xl shadow-xl border-0">
                  <Title level={3} className="mb-6">Final Step</Title>
                  <Form form={form} layout="vertical" onFinish={onFinish} size="large">
                    <Row gutter={16}>
                      <Col span={12}><Form.Item name="customer_name" rules={[{ required: true }]}><Input prefix={<UserOutlined className="text-gray-400" />} placeholder="Full Name" className="rounded-xl" /></Form.Item></Col>
                      <Col span={12}><Form.Item name="customer_email" rules={[{ required: true, type: 'email' }]}><Input prefix={<MailOutlined className="text-gray-400" />} placeholder="Email" className="rounded-xl" /></Form.Item></Col>
                    </Row>
                    <Form.Item>
                      <Space.Compact className="w-full">
                        <Select value={countryCode} onChange={setCountryCode} style={{ width: 120 }}>{countryCodes.map(c => <Select.Option key={c.value} value={c.value}>{c.label}</Select.Option>)}</Select>
                        <Input value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ""))} placeholder="Mobile Number" className="rounded-r-xl" />
                      </Space.Compact>
                    </Form.Item>
                    <Form.Item name="description"><TextArea rows={4} placeholder="Specific requirements..." className="rounded-xl" /></Form.Item>
                    <Button type="primary" htmlType="submit" loading={submitting} block size="large" className="h-12 rounded-xl bg-purple-700 hover:bg-purple-800 border-none shadow-lg shadow-purple-200">
                       Submit Request <ArrowRightOutlined />
                    </Button>
                  </Form>
                </Card>
              </Col>
            </Row>
          </motion.div>
        );

      // --- STEP 5: REDESIGNED PREMIUM ESTIMATE SCREEN ---
      case 5:
        const selectedPkgObj = packages.find(p => p._id === selectedPackage);
        const selectedStyleName = types.find(t => t._id === selectedType)?.label || "Premium Garden";
        const selectedProjectName = subcategories.find(s => s._id === selectedSubcategory)?.label || "Interior";
        const finalPrice = selectedPkgObj?.price || "25,000";

        return (
          <div className="min-h-[60vh] flex items-center justify-center py-10">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              transition={{ duration: 0.6, type: "spring" }} 
              className="max-w-3xl w-full"
            >
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4 animate-bounce">
                  <SmileOutlined className="text-4xl text-green-600" />
                </div>
                <Title level={2} className="text-purple-900 m-0">Estimate Generated Successfully!</Title>
                <Text type="secondary">Here is the preliminary breakdown of your project</Text>
              </div>

              {/* TICKET STYLE CARD */}
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                {/* Purple Header Part */}
                <div className="bg-gradient-to-r from-indigo-900 via-purple-800 to-purple-900 p-10 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <Text className="text-purple-200 uppercase tracking-widest text-sm font-semibold">Estimated Project Cost</Text>
                    <h1 className="text-6xl md:text-7xl font-bold text-white m-0 mt-2 mb-4 drop-shadow-lg">
                        {finalPrice} <span className="text-2xl font-normal text-purple-200">AED</span>
                    </h1>
                    <div className="inline-block px-4 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-sm">
                        Includes VAT & Premium Features
                    </div>
                </div>

                {/* White Details Part */}
                <div className="p-8 md:p-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center border-b border-gray-100 pb-8 mb-8">
                        <div>
                            <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-2"><EnvironmentOutlined className="text-purple-600" /></div>
                            <div className="text-xs text-gray-400 uppercase">Type</div>
                            <div className="font-semibold text-gray-800">{selectedProjectName}</div>
                        </div>
                        <div>
                            <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-2"><HomeOutlined className="text-purple-600" /></div>
                            <div className="text-xs text-gray-400 uppercase">Style</div>
                            <div className="font-semibold text-gray-800">{selectedStyleName}</div>
                        </div>
                        <div>
                            <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-2"><CalculatorOutlined className="text-purple-600" /></div>
                            <div className="text-xs text-gray-400 uppercase">Size</div>
                            <div className="font-semibold text-gray-800">{areaSqFt.toLocaleString()} sq ft</div>
                        </div>
                        <div>
                            <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-2"><BuildOutlined className="text-purple-600" /></div>
                            <div className="text-xs text-gray-400 uppercase">Package</div>
                            <div className="font-semibold text-gray-800">{selectedPkgObj?.name}</div>
                        </div>
                    </div>

                    <div className="text-center">
                        <Title level={4} className="text-gray-800 mb-6">What happens next?</Title>
                        <div className="flex flex-col md:flex-row justify-center gap-4 text-sm text-gray-500">
                             <span className="flex items-center"><CheckCircleOutlined className="text-green-500 mr-2" /> Expert review within 24 hours</span>
                             <span className="flex items-center"><CheckCircleOutlined className="text-green-500 mr-2" /> Final Site Visit</span>
                             <span className="flex items-center"><CheckCircleOutlined className="text-green-500 mr-2" /> Formal Proposal</span>
                        </div>

                        <div className="mt-10">
                            <Button 
                                type="primary" 
                                size="large" 
                                className="h-14 px-12 rounded-full text-lg shadow-xl shadow-purple-200 border-none bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-105 transition-transform"
                                onClick={() => setActiveStep(6)}
                            >
                                Continue to Confirmation
                            </Button>
                        </div>
                        <Text type="secondary" className="block mt-4 text-xs">Redirecting automatically in 9 seconds...</Text>
                    </div>
                </div>
              </div>
            </motion.div>
          </div>
        );

      case 6: // Thank You
        return (
          <div className="text-center max-w-2xl mx-auto py-20 bg-white rounded-3xl shadow-xl mt-10">
            <Result
              status="success"
              title={<span className="text-3xl font-bold text-gray-800">Request Submitted Successfully!</span>}
              subTitle={<span className="text-lg text-gray-500">Thank you for choosing us. Our interior team has received your details and will contact you shortly.</span>}
              extra={[
                <Button type="primary" size="large" key="new" onClick={() => window.location.reload()} className="bg-purple-600 border-none rounded-xl px-8 h-12">
                  Start New Request
                </Button>,
                <Button size="large" key="home" onClick={() => window.location.href = '/'} className="rounded-xl px-8 h-12">
                  Back to Home
                </Button>
              ]}
            />
          </div>
        );

      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F4F5] pb-32 font-sans   ">
        {/* Background Gradients */}
        <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-b from-purple-50/50 via-white to-white -z-10 pointer-events-none"></div>

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <img src={logoNew} alt="Logo" className="h-10" />
            
            {/* Desktop Stepper */}
            <div className="hidden md:flex space-x-12">
                {steps.map((s, i) => (
                    <div key={i} className={`flex items-center ${i <= activeStep ? 'text-purple-700' : 'text-gray-300'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 border-2 text-sm font-bold
                            ${i === activeStep ? 'border-purple-600 bg-purple-600 text-white' : 
                              i < activeStep ? 'border-purple-600 bg-white text-purple-600' : 'border-gray-200'}`}>
                            {i < activeStep ? <CheckOutlined /> : i + 1}
                        </div>
                        <span className="font-medium">{s.title}</span>
                    </div>
                ))}
            </div>
            
             {/* Mobile Indicator */}
             <div className="md:hidden text-purple-700 font-bold">Step {activeStep + 1}/5</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl bg-white mx-auto  mt-5 p-2">
        <AnimatePresence mode="wait">
          <motion.div key={activeStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
            {renderStepContent(activeStep)}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating Footer Navigation */}
      {activeStep < 5 && (
        <div className="fixed bottom-0 left-0 right-0 p-6 z-40 pointer-events-none">
          <div className="max-w-4xl mx-auto pointer-events-auto">
            <div className="bg-white/90 backdrop-blur-xl border border-purple-100 shadow-2xl rounded-2xl p-4 flex justify-between items-center">
                
                <Button 
                    size="large" 
                    type="text"
                    icon={<ArrowLeftOutlined />} 
                    onClick={handleBack} 
                    disabled={activeStep === 0}
                    className="text-gray-500 hover:bg-gray-100 rounded-xl"
                >
                    Back
                </Button>

                <div className="flex items-center gap-4">
                    {activeStep === 3 && (
                        <div className="hidden sm:block text-right mr-2">
                            <div className="text-xs text-gray-400 uppercase">Estimated Total</div>
                            <div className="text-purple-700 font-bold text-lg">{packages.find(p => p._id === selectedPackage)?.price || 0} AED</div>
                        </div>
                    )}

                    {activeStep === 4 ? (
                       <span className="text-sm text-gray-400 italic mr-2">Fill the form to submit</span>
                    ) : (
                       <Button 
  type="primary" 
  size="large" 
  onClick={activeStep === 3 ? handleGetQuote : handleNext} 
  disabled={!isStepValid()} 
  className={`
    h-12 px-8 rounded-xl text-lg shadow-lg border-none transition-all
    ${!isStepValid() 
      ? 'bg-gray-300 cursor-not-allowed' 
      : 'bg-[var(--color-primary)] hover:bg-purple-800 hover:scale-105 text-white'
    }
  `}
>
  {activeStep === 3 ? "Get Quote" : "Next Step"} 
  <ArrowRightOutlined className="ml-2" />
</Button>

                    )}
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calculator;