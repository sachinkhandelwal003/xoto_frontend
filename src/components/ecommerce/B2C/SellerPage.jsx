import React, { useState, useEffect } from 'react';
import { 
  Form, 
  Input, 
  Select, 
  Button, 
  Steps, 
  Card, 
  Row, 
  Col, 
  Checkbox,
  Typography,
  Alert,
  Spin,
  message
} from 'antd';
import { 
  UserOutlined, 
  ShopOutlined, 
  FileTextOutlined,
  CheckCircleOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  SafetyOutlined
} from '@ant-design/icons';
import { apiService } from '../../../manageApi/utils/custom.apiservice';

const { Title, Text, Paragraph } = Typography;
const { Step } = Steps;
const { TextArea } = Input;

const SellerPage = () => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  // Sample data for testing
  const sampleData = {
    first_name: "",
    last_name: "Sharma",
    email: "rahul@example.com",
    mobile: {
      country_code: "+91",
      number: "9876543210"
    },
    password: "secret123",
    confirmPassword: "secret123",
    store_details: {
      store_name: "Rahul Fashion Store",
      store_description: "Best clothes in town",
      store_type: "Individual / Sole Proprietor",
      store_address: "123 MG Road",
      city: "Mumbai",
      country: "India",
      pincode: "400001",
      categories: ["68ef95060d671000edce65ab", "68ef95770d671000edce65b4"]
    },
    registration: {
      pan_number: "ABCDE1234F",
      gstin: "27ABCDE1234F1Z5"
    },
    meta: {
      agreed_to_terms: true
    }
  };

  const businessTypes = [
    { label: 'Individual / Sole Proprietor', value: 'Individual / Sole Proprietor' },
    { label: 'Partnership', value: 'Partnership' },
    { label: 'Limited Liability Partnership (LLP)', value: 'Limited Liability Partnership (LLP)' },
    { label: 'Private Limited Company', value: 'Private Limited Company' },
    { label: 'Public Limited Company', value: 'Public Limited Company' },
    { label: 'Non-profit Organization', value: 'Non-profit Organization' }
  ];

  const countries = [
    { label: 'India', value: 'India' },
    { label: 'United Arab Emirates', value: 'United Arab Emirates' },
    { label: 'United States', value: 'United States' },
    { label: 'United Kingdom', value: 'United Kingdom' },
    { label: 'Canada', value: 'Canada' },
    { label: 'Australia', value: 'Australia' }
  ];

  // City options based on selected country
  const cityOptions = {
    'India': [
      'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 
      'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow'
    ],
    'United Arab Emirates': [
      'Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah',
      'Fujairah', 'Umm Al Quwain', 'Al Ain'
    ],
    'United States': [
      'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix',
      'Philadelphia', 'San Antonio', 'San Diego', 'Dallas'
    ],
    'United Kingdom': [
      'London', 'Manchester', 'Birmingham', 'Liverpool', 'Leeds',
      'Glasgow', 'Bristol', 'Sheffield', 'Edinburgh'
    ],
    'Canada': [
      'Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Edmonton',
      'Ottawa', 'Winnipeg', 'Quebec City', 'Hamilton'
    ],
    'Australia': [
      'Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide',
      'Gold Coast', 'Canberra', 'Hobart', 'Darwin'
    ]
  };

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
    // Populate form with sample data (for testing/demo purposes)
    populateFormWithSampleData();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await apiService.get('categories');
      if (response.success) {
        const categoryOptions = response.categories.map(category => ({
          label: category.parent ? `${category.name} (${category.parent.name})` : category.name,
          value: category._id
        }));
        setCategories(categoryOptions);
      } else {
        console.error('Failed to fetch categories:', response.message);
        message.error('Failed to load categories');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      message.error('Error loading categories');
    } finally {
      setLoading(false);
    }
  };

  // Populate form with sample data
  const populateFormWithSampleData = () => {
    // Simulate API response with sample data
    setTimeout(() => {
      form.setFieldsValue(sampleData);
    }, 1000);
  };

  // Password validation rules
  const passwordRules = [
    { required: true, message: 'Please input your password!' },
    { min: 6, message: 'Password must be at least 6 characters!' }
  ];

  // Email validation rules
  const emailRules = [
    { required: true, message: 'Please input your email!' },
    { type: 'email', message: 'Please enter a valid email address!' }
  ];

  // Mobile validation rules
  const mobileRules = [
    { required: true, message: 'Please input your mobile number!' },
    { pattern: /^\d{10}$/, message: 'Mobile number must be 10 digits!' }
  ];

  // Step 1: Personal Information
  const Step1 = () => (
    <>
      <Title level={4} style={{ marginBottom: 24 }}>
        <UserOutlined /> Personal Information
      </Title>
      
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="First Name"
            name="first_name"
            rules={[{ required: true, message: 'Please input your first name!' }]}
          >
            <Input placeholder="Enter first name" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Last Name"
            name="last_name"
            rules={[{ required: true, message: 'Please input your last name!' }]}
          >
            <Input placeholder="Enter last name" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        label="Email Address"
        name="email"
        rules={emailRules}
      >
        <Input type="email" placeholder="Enter email address" />
      </Form.Item>

      <Row gutter={16}>
        <Col span={6}>
          <Form.Item
            label="Country Code"
            name={['mobile', 'country_code']}
            initialValue="+91"
          >
            <Select>
              <Select.Option value="+91">India (+91)</Select.Option>
              <Select.Option value="+971">UAE (+971)</Select.Option>
              <Select.Option value="+1">USA (+1)</Select.Option>
              <Select.Option value="+44">UK (+44)</Select.Option>
              <Select.Option value="+61">Australia (+61)</Select.Option>
              <Select.Option value="+1">Canada (+1)</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={18}>
          <Form.Item
            label="Phone Number"
            name={['mobile', 'number']}
            rules={mobileRules}
          >
            <Input placeholder="9876543210" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Password"
            name="password"
            rules={passwordRules}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match!'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm password" />
          </Form.Item>
        </Col>
      </Row>

      {/* Demo Data Button */}
      <div style={{ marginTop: 24, textAlign: 'center' }}>
        <Button 
          type="dashed" 
          onClick={() => form.setFieldsValue(sampleData)}
          size="small"
        >
          Load Sample Data
        </Button>
        <Text type="secondary" style={{ display: 'block', marginTop: 8, fontSize: 12 }}>
          Click to populate form with sample data for testing
        </Text>
      </div>
    </>
  );

  // Step 2: Store Information
  const Step2 = () => {
    const country = Form.useWatch(['store_details', 'country'], form);
    
    return (
      <>
        <Title level={4} style={{ marginBottom: 24 }}>
          <ShopOutlined /> Store Information
        </Title>

        <Form.Item
          label="Store Name"
          name={['store_details', 'store_name']}
          rules={[{ required: true, message: 'Please input your store name!' }]}
        >
          <Input placeholder="Enter store name" />
        </Form.Item>

        <Form.Item
          label="Business Type"
          name={['store_details', 'store_type']}
          rules={[{ required: true, message: 'Please select business type!' }]}
        >
          <Select placeholder="Select business type" options={businessTypes} />
        </Form.Item>

        <Form.Item
          label="Store Categories"
          name={['store_details', 'categories']}
          rules={[{ required: true, message: 'Please select at least one category!' }]}
        >
          <Select
            mode="multiple"
            placeholder="Select categories"
            options={categories}
            loading={loading}
            optionFilterProp="label"
            showSearch
            allowClear
          />
        </Form.Item>

        <Form.Item
          label="Store Description"
          name={['store_details', 'store_description']}
        >
          <TextArea 
            rows={4} 
            placeholder="Tell customers about your store, products, and brand story..." 
            maxLength={500}
            showCount
          />
        </Form.Item>
      </>
    );
  };

  // Step 3: Business Details
  const Step3 = () => {
    const country = Form.useWatch(['store_details', 'country'], form);
    
    return (
      <>
        <Title level={4} style={{ marginBottom: 24 }}>
          <FileTextOutlined /> Business Details
        </Title>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="PAN Number"
              name={['registration', 'pan_number']}
              rules={[{ required: true, message: 'Please input your PAN number!' }]}
            >
              <Input placeholder="ABCDE1234F" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="GSTIN (Optional)"
              name={['registration', 'gstin']}
            >
              <Input placeholder="27ABCDE1234F1Z5" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Business Address"
          name={['store_details', 'store_address']}
          rules={[{ required: true, message: 'Please input your business address!' }]}
        >
          <Input placeholder="Street address, P.O. box, company name" />
        </Form.Item>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="Country"
              name={['store_details', 'country']}
              rules={[{ required: true, message: 'Please select your country!' }]}
            >
              <Select 
                placeholder="Select country" 
                options={countries}
                onChange={() => {
                  // Clear city when country changes
                  form.setFieldsValue({ store_details: { city: undefined } });
                }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="City"
              name={['store_details', 'city']}
              rules={[{ required: true, message: 'Please select your city!' }]}
            >
              <Select 
                placeholder={country ? "Select city" : "Select country first"}
                disabled={!country}
                options={country && cityOptions[country] 
                  ? cityOptions[country].map(city => ({ label: city, value: city }))
                  : []
                }
                showSearch
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="PIN Code"
              name={['store_details', 'pincode']}
              rules={[{ required: true, message: 'Please input your PIN code!' }]}
            >
              <Input placeholder="Enter PIN code" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name={['meta', 'agreed_to_terms']}
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value ? Promise.resolve() : Promise.reject(new Error('You must agree to the terms and conditions')),
            },
          ]}
        >
          <Checkbox>
            I agree to the{' '}
            <a href="/terms" target="_blank" rel="noopener noreferrer">
              Terms and Conditions
            </a>
            {' '}and{' '}
            <a href="/privacy" target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </a>
            . I confirm that all information provided is accurate and complete.
          </Checkbox>
        </Form.Item>

        {/* JSON Preview */}
        <div style={{ marginTop: 32, padding: 16, background: '#f6ffed', border: '1px solid #b7eb8f', borderRadius: 6 }}>
          <Title level={5} style={{ marginBottom: 12 }}>
            <FileTextOutlined /> Form Data Preview
          </Title>
          <pre style={{ 
            background: '#fafafa', 
            padding: 16, 
            borderRadius: 4,
            fontSize: 12,
            maxHeight: 200,
            overflow: 'auto'
          }}>
            {JSON.stringify(form.getFieldsValue(true), null, 2)}
          </pre>
          <Button 
            type="dashed" 
            onClick={() => {
              const data = form.getFieldsValue(true);
              console.log('Form Data:', data);
              message.success('Data logged to console');
            }}
            size="small"
            style={{ marginTop: 8 }}
          >
            Log Form Data to Console
          </Button>
        </div>
      </>
    );
  };

  // Steps configuration
  const steps = [
    {
      title: 'Personal Info',
      content: <Step1 />,
      icon: <UserOutlined />,
    },
    {
      title: 'Store Setup',
      content: <Step2 />,
      icon: <ShopOutlined />,
    },
    {
      title: 'Business Details',
      content: <Step3 />,
      icon: <FileTextOutlined />,
    },
  ];

  // Handle next step
  const handleNext = async () => {
    try {
      // Validate current step fields
      const fields = getStepFields(currentStep);
      await form.validateFields(fields);
      
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  // Handle previous step
  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Get fields for current step
  const getStepFields = (stepIndex) => {
    const stepFields = {
      0: ['first_name', 'last_name', 'email', ['mobile', 'country_code'], ['mobile', 'number'], 'password', 'confirmPassword'],
      1: [['store_details', 'store_name'], ['store_details', 'store_type'], ['store_details', 'categories']],
      2: [['registration', 'pan_number'], ['store_details', 'store_address'], ['store_details', 'city'], ['store_details', 'country'], ['store_details', 'pincode'], ['meta', 'agreed_to_terms']]
    };
    return stepFields[stepIndex] || [];
  };

  // Handle form submission
  const handleSubmit = async (values) => {
  setSubmitting(true);

  try {
    const payload = {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      mobile: {
        country_code: values.mobile.country_code,
        number: values.mobile.number
      },
      password: values.password,
      confirmPassword: values.confirmPassword,
      store_details: {
        store_name: values.store_details.store_name,
        store_description: values.store_details.store_description,
        store_type: values.store_details.store_type,
        store_address: values.store_details.store_address,
        city: values.store_details.city,
        country: values.store_details.country,
        pincode: values.store_details.pincode,
        categories: values.store_details.categories
      },
      registration: {
        pan_number: values.registration.pan_number,
        gstin: values.registration.gstin || ''
      },
      meta: {
        agreed_to_terms: values.meta.agreed_to_terms
      }
    };

    console.log("📦 FINAL API PAYLOAD →", JSON.parse(JSON.stringify(payload)));
    console.log("📌 Categories sent →", payload.store_details.categories);

    const response = await apiService.post('vendor/b2c', payload);

    if (response.success) {
      message.success("Registration submitted successfully!");
      form.resetFields();
      setCurrentStep(0);
    }
  } catch (error) {
    console.error("❌ Registration Error:", error);
    message.error("An error occurred. Please try again.");
  } finally {
    setSubmitting(false);
  }
};


  // Determine which step an error belongs to
  const determineErrorStep = (fieldName) => {
    const fieldNameStr = Array.isArray(fieldName) ? fieldName.join('.') : fieldName;
    
    if (['first_name', 'last_name', 'email', 'mobile', 'password', 'confirmPassword'].includes(fieldNameStr) || 
        fieldNameStr.includes('mobile.')) {
      return 0; // Step 1
    } else if (fieldNameStr.includes('store_details.store_name') || 
               fieldNameStr.includes('store_details.store_type') || 
               fieldNameStr.includes('store_details.categories')) {
      return 1; // Step 2
    } else {
      return 2; // Step 3
    }
  };

  // Handle form submission failure
  const handleFinishFailed = (errorInfo) => {
    console.log('Form submission failed:', errorInfo);
    message.error('Please fill in all required fields correctly.');
  };

  // Function to load sample Dubai data
  const loadDubaiData = () => {
    const dubaiData = {
      first_name: "Ahmed",
      last_name: "Al Mansoori",
      email: "ahmed@example.com",
      mobile: {
        country_code: "+971",
        number: "501234567"
      },
      password: "dubai123",
      confirmPassword: "dubai123",
      store_details: {
        store_name: "Dubai Luxury Store",
        store_description: "Premium products from Dubai",
        store_type: "Individual / Sole Proprietor",
        store_address: "Sheikh Zayed Road",
        city: "Dubai",
        country: "United Arab Emirates",
        pincode: "00000",
        categories: sampleData.store_details.categories
      },
      registration: {
        pan_number: "TRN123456789",
        gstin: ""
      },
      meta: {
        agreed_to_terms: true
      }
    };
    
    form.setFieldsValue(dubaiData);
    message.success('Loaded Dubai sample data');
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px'
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 80,
            height: 80,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '50%',
            marginBottom: 20
          }}>
            <ShopOutlined style={{ fontSize: 36, color: '#fff' }} />
          </div>
          <Title level={2} style={{ color: '#fff', marginBottom: 8 }}>
            Vendor Registration
          </Title>
          <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16 }}>
            Complete your registration in 3 simple steps to start selling on our platform
          </Text>
        </div>

        <Row gutter={[32, 32]}>
          {/* Left Sidebar - Steps */}
          <Col xs={24} lg={8}>
            <Card
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                border: 'none',
                height: '100%'
              }}
              bodyStyle={{ padding: 32, height: '100%' }}
            >
              <Title level={3} style={{ color: '#fff', marginBottom: 24 }}>
                Become a Vendor
              </Title>
              
              <Steps
                direction="vertical"
                current={currentStep}
                style={{ marginBottom: 40 }}
                items={steps.map((step, index) => ({
                  title: (
                    <Text style={{ 
                      color: currentStep >= index ? '#fff' : 'rgba(255,255,255,0.7)',
                      fontSize: 16,
                      fontWeight: currentStep >= index ? 600 : 400
                    }}>
                      {step.title}
                    </Text>
                  ),
                  description: (
                    <Text style={{ 
                      color: currentStep >= index ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.5)',
                      fontSize: 14
                    }}>
                      {index === 0 && 'Provide your personal details and contact information'}
                      {index === 1 && 'Tell us about your store name and what you\'ll be selling'}
                      {index === 2 && 'Enter your business registration and tax information'}
                    </Text>
                  ),
                  icon: (
                    <div style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: currentStep >= index ? '#fff' : 'rgba(255,255,255,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: currentStep >= index ? '#667eea' : 'rgba(255,255,255,0.7)'
                    }}>
                      {currentStep > index ? <CheckCircleOutlined /> : step.icon}
                    </div>
                  ),
                  status: currentStep >= index ? 'finish' : 'wait'
                }))}
              />

              {/* Progress Section */}
              <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.2)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <Text style={{ color: 'rgba(255,255,255,0.9)' }}>Progress</Text>
                  <Text style={{ color: 'rgba(255,255,255,0.9)' }}>
                    {Math.round(((currentStep + 1) / steps.length) * 100)}%
                  </Text>
                </div>
                <div style={{
                  height: 6,
                  background: 'rgba(255,255,255,0.2)',
                  borderRadius: 3,
                  overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%',
                    background: '#fff',
                    borderRadius: 3,
                    width: `${((currentStep + 1) / steps.length) * 100}%`,
                    transition: 'width 0.3s ease'
                  }} />
                </div>
              </div>

              {/* Benefits Section */}
              <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.2)' }}>
                <Title level={5} style={{ color: '#fff', marginBottom: 16 }}>
                  Why Join Us?
                </Title>
                <div style={{ color: 'rgba(255,255,255,0.9)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                    <CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} />
                    <Text>Zero commission for first 3 months</Text>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: 12 }}>
                    <CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} />
                    <Text>Marketing support & promotion</Text>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} />
                    <Text>Real-time analytics dashboard</Text>
                  </div>
                </div>
              </div>

              {/* Demo Data Buttons */}
              <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.2)' }}>
                <Title level={5} style={{ color: '#fff', marginBottom: 16 }}>
                  Demo Data
                </Title>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <Button 
                    type="dashed" 
                    onClick={() => form.setFieldsValue(sampleData)}
                    style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}
                  >
                    Load Sample Data
                  </Button>
                  <Button 
                    type="dashed" 
                    onClick={loadDubaiData}
                    style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}
                  >
                    Load Dubai Data
                  </Button>
                </div>
              </div>
            </Card>
          </Col>

          {/* Right Side - Form */}
          <Col xs={24} lg={16}>
            <Card
              style={{
                borderRadius: 12,
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                height: '100%'
              }}
              bodyStyle={{ padding: 40 }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                <div>
                  <span style={{
                    display: 'inline-block',
                    padding: '4px 16px',
                    background: '#f0f5ff',
                    color: '#2f54eb',
                    borderRadius: 20,
                    fontSize: 14,
                    fontWeight: 500
                  }}>
                    Step {currentStep + 1} of {steps.length}
                  </span>
                </div>
                <div>
                  <Button 
                    type="link" 
                    onClick={() => console.log('Form Data:', form.getFieldsValue(true))}
                    size="small"
                  >
                    View Data
                  </Button>
                </div>
              </div>

              <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                onFinishFailed={handleFinishFailed}
                initialValues={{
                  mobile: { country_code: '+91' },
                  meta: { agreed_to_terms: false }
                }}
                scrollToFirstError
              >
                {/* Current Step Content */}
                <div style={{ marginBottom: 40 }}>
                  {steps[currentStep].content}
                </div>

                {/* Navigation Buttons */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingTop: 32,
                  borderTop: '1px solid #f0f0f0'
                }}>
                  <Button
                    icon={<ArrowLeftOutlined />}
                    onClick={handlePrev}
                    disabled={currentStep === 0}
                    size="large"
                  >
                    Back
                  </Button>
                  
                  {currentStep < steps.length - 1 ? (
                    <Button
                      type="primary"
                      icon={<ArrowRightOutlined />}
                      onClick={handleNext}
                      size="large"
                    >
                      Continue
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      icon={<CheckCircleOutlined />}
                      htmlType="submit"
                      loading={submitting}
                      size="large"
                    >
                      Complete Registration
                    </Button>
                  )}
                </div>

                {/* Footer */}
                <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid #f0f0f0' }}>
                  <Row justify="space-between" align="middle">
                    <Col>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <SafetyOutlined style={{ color: '#52c41a', marginRight: 8 }} />
                        <Text type="secondary">Your information is secure and encrypted</Text>
                      </div>
                    </Col>
                    <Col>
                      <div style={{ textAlign: 'right' }}>
                        <Text type="secondary">
                          Already have an account?{' '}
                          <a href="/login" style={{ fontWeight: 500 }}>Sign in</a>
                        </Text>
                        <div style={{ fontSize: 12, color: '#bfbfbf', marginTop: 4 }}>
                          By registering, you agree to our Terms & Privacy Policy
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default SellerPage;