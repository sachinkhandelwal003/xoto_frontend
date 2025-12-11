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
  message,
  Spin
} from 'antd';
import { 
  UserOutlined, 
  ShopOutlined, 
  FileTextOutlined,
  CheckCircleOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  SafetyOutlined,
  CheckCircleFilled // Used for success screen
} from '@ant-design/icons';
import { apiService } from '../../../manageApi/utils/custom.apiservice'; // Ensure path is correct

const { Title, Text } = Typography;
const { TextArea } = Input;

const SellerPage = () => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false); // New Success State
  
  // Design Constants using your CSS Variable
  const themeColor = 'var(--color-primary)';

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
    { label: 'United States', value: 'United States' },
    { label: 'United Kingdom', value: 'United Kingdom' },
    { label: 'Canada', value: 'Canada' },
    { label: 'Australia', value: 'Australia' }
  ];

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await apiService.get('/categories'); // Adjusted to match apiService pattern
      // Check if response is the data directly or if it has a data property (depends on your axios interceptor)
      const categoryData = response.data || response; 
      
      if (categoryData.categories) {
        const categoryOptions = categoryData.categories.map(category => ({
          label: category.parent ? `${category.name} (${category.parent.name})` : category.name,
          value: category._id
        }));
        setCategories(categoryOptions);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  // --- STEPS COMPONENTS ---
  
  const Step1 = () => (
    <>
      <Title level={4} style={{ marginBottom: 24, color: '#333' }}>
        <UserOutlined style={{ color: themeColor }} /> Personal Information
      </Title>
      
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="First Name"
            name="first_name"
            rules={[{ required: true, message: 'Required' }]}
          >
            <Input size="large" placeholder="Enter first name" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Last Name"
            name="last_name"
            rules={[{ required: true, message: 'Required' }]}
          >
            <Input size="large" placeholder="Enter last name" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        label="Email Address"
        name="email"
        rules={[{ required: true, type: 'email', message: 'Valid email required' }]}
      >
        <Input size="large" placeholder="Enter email address" />
      </Form.Item>

      <Row gutter={16}>
        <Col span={6}>
          <Form.Item
            label="Code"
            name={['mobile', 'country_code']}
            initialValue="+91"
          >
            <Select size="large">
              <Select.Option value="+91">+91 (IN)</Select.Option>
              <Select.Option value="+1">+1 (US)</Select.Option>
              <Select.Option value="+44">+44 (UK)</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={18}>
          <Form.Item
            label="Phone Number"
            name={['mobile', 'number']}
            rules={[{ required: true, pattern: /^\d{10}$/, message: '10 digits required' }]}
          >
            <Input size="large" placeholder="9876543210" style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, min: 6 }]}
          >
            <Input.Password size="large" placeholder="Password" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Confirm"
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) return Promise.resolve();
                  return Promise.reject(new Error('Mismatch!'));
                },
              }),
            ]}
          >
            <Input.Password size="large" placeholder="Confirm" />
          </Form.Item>
        </Col>
      </Row>
    </>
  );

  const Step2 = () => (
    <>
      <Title level={4} style={{ marginBottom: 24, color: '#333' }}>
        <ShopOutlined style={{ color: themeColor }} /> Store Information
      </Title>

      <Form.Item
        label="Store Name"
        name={['store_details', 'store_name']}
        rules={[{ required: true }]}
      >
        <Input size="large" placeholder="Enter store name" />
      </Form.Item>

      <Form.Item
        label="Business Type"
        name={['store_details', 'store_type']}
        rules={[{ required: true }]}
      >
        <Select size="large" placeholder="Select type" options={businessTypes} />
      </Form.Item>

      <Form.Item
        label="Categories"
        name={['store_details', 'categories']}
        rules={[{ required: true }]}
      >
        <Select
          mode="multiple"
          size="large"
          placeholder="Select categories"
          options={categories}
          loading={loading}
          optionFilterProp="label"
        />
      </Form.Item>

      <Form.Item
        label="Description"
        name={['store_details', 'store_description']}
      >
        <TextArea rows={4} placeholder="Describe your store..." showCount maxLength={500} />
      </Form.Item>
    </>
  );

  const Step3 = () => (
    <>
      <Title level={4} style={{ marginBottom: 24, color: '#333' }}>
        <FileTextOutlined style={{ color: themeColor }} /> Business Details
      </Title>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="PAN Number"
            name={['registration', 'pan_number']}
            rules={[{ required: true }]}
          >
            <Input size="large" placeholder="ABCDE1234F" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="GSTIN (Optional)"
            name={['registration', 'gstin']}
          >
            <Input size="large" placeholder="GSTIN" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        label="Address"
        name={['store_details', 'store_address']}
        rules={[{ required: true }]}
      >
        <Input size="large" placeholder="Full address" />
      </Form.Item>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            label="City"
            name={['store_details', 'city']}
            rules={[{ required: true }]}
          >
            <Input size="large" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="Country"
            name={['store_details', 'country']}
            rules={[{ required: true }]}
          >
            <Select size="large" options={countries} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label="PIN Code"
            name={['store_details', 'pincode']}
            rules={[{ required: true }]}
          >
            <Input size="large" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name={['meta', 'agreed_to_terms']}
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject(new Error('Required')),
          },
        ]}
      >
        <Checkbox>I agree to the Terms and Conditions</Checkbox>
      </Form.Item>
    </>
  );

  const steps = [
    { title: 'Personal', content: <Step1 />, icon: <UserOutlined /> },
    { title: 'Store', content: <Step2 />, icon: <ShopOutlined /> },
    { title: 'Business', content: <Step3 />, icon: <FileTextOutlined /> },
  ];

  // --- LOGIC ---

  const handleNext = async () => {
    try {
      const fields = getStepFields(currentStep);
      await form.validateFields(fields);
      if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
    } catch (error) {
      console.log('Validation Failed:', error);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const getStepFields = (stepIndex) => {
    const stepFields = {
      0: ['first_name', 'last_name', 'email', ['mobile', 'country_code'], ['mobile', 'number'], 'password', 'confirmPassword'],
      1: [['store_details', 'store_name'], [['store_details', 'store_type']], [['store_details', 'categories']]],
      2: [['registration', 'pan_number'], ['store_details', 'store_address'], ['store_details', 'city'], ['store_details', 'country'], ['store_details', 'pincode'], ['meta', 'agreed_to_terms']]
    };
    return stepFields[stepIndex] || [];
  };

  // --- MAIN SUBMISSION HANDLER ---
  const handleSubmit = async () => {
    setSubmitting(true);
    
    try {
      // 1. Get all values (including hidden steps)
      const allValues = form.getFieldsValue(true);

      // 2. Construct Payload
      const payload = {
        first_name: allValues.first_name,
        last_name: allValues.last_name,
        email: allValues.email,
        mobile: {
          country_code: allValues.mobile?.country_code || '+91',
          number: allValues.mobile?.number || ''
        },
        password: allValues.password,
        confirmPassword: allValues.confirmPassword,
        store_details: {
          store_name: allValues.store_details?.store_name,
          store_description: allValues.store_details?.store_description || '',
          store_type: allValues.store_details?.store_type,
          store_address: allValues.store_details?.store_address,
          city: allValues.store_details?.city,
          country: allValues.store_details?.country,
          pincode: allValues.store_details?.pincode,
          categories: allValues.store_details?.categories || []
        },
        registration: {
          pan_number: allValues.registration?.pan_number,
          gstin: allValues.registration?.gstin || ''
        },
        meta: {
          agreed_to_terms: allValues.meta?.agreed_to_terms
        }
      };

      console.log('Submitting Payload:', JSON.stringify(payload, null, 2));

      // 3. Use apiService
      await apiService.post('/vendor/b2c', payload);

      // 4. Success State
      setSuccess(true);
      message.success('Registration successful! Awaiting approval.');
      form.resetFields();

    } catch (err) {
      console.error('Submission Error:', err);
      
      const res = err.response?.data;
      
      // Handle Validation Errors from API (e.g., "store_details.store_name": "Required")
      if (res?.errors) {
        const formErrors = [];
        
        // Convert API error format to Ant Design error format
        if (Array.isArray(res.errors)) {
            // If errors is an array of objects: [{field: 'email', message: 'invalid'}]
            res.errors.forEach(e => {
                // Split dot notation for Ant Design (e.g. 'store_details.store_name' -> ['store_details', 'store_name'])
                const namePath = e.field.includes('.') ? e.field.split('.') : e.field;
                formErrors.push({
                    name: namePath,
                    errors: [e.message]
                });
            });
        }
        
        if (formErrors.length > 0) {
            form.setFields(formErrors);
            message.error('Please fix the highlighted errors.');
        } else {
            message.error(res.message || 'Registration failed.');
        }
      } else {
        message.error(res?.message || 'An error occurred. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  // --- RENDER SUCCESS SCREEN ---
  if (success) {
    return (
      <div className="min-h-screen bg-[var(--color-primary)] flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircleFilled style={{ fontSize: '48px', color: '#52c41a' }} />
          </div>
          <Title level={2} style={{ marginBottom: '16px' }}>Registration Successful!</Title>
          <Text type="secondary" style={{ fontSize: '16px', display: 'block', marginBottom: '32px' }}>
            Your request has been sent to the <strong>Admin</strong>.<br />
            You will receive an email once approved.
          </Text>
          <Button 
            type="primary" 
            size="large" 
            href="/login" 
            block
            style={{ height: '48px', fontSize: '16px', backgroundColor: themeColor, borderColor: themeColor }}
          >
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  // --- RENDER FORM SCREEN ---
  return (
    <div className="min-h-screen bg-[var(--color-primary)] flex items-center justify-center py-10 px-4">
      <div style={{ maxWidth: 1200, width: '100%' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40, color: 'white' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 80,
            height: 80,
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '50%',
            marginBottom: 20,
            backdropFilter: 'blur(10px)'
          }}>
            <ShopOutlined style={{ fontSize: 36, color: '#fff' }} />
          </div>
          <Title level={2} style={{ color: '#fff', margin: 0 }}>Vendor Registration</Title>
          <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16 }}>
            Join our marketplace in 3 simple steps
          </Text>
        </div>

        <Row gutter={[32, 32]}>
          {/* Left Sidebar - Steps */}
          <Col xs={24} lg={8}>
            <Card
              bordered={false}
              style={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                height: '100%',
                color: 'white'
              }}
              bodyStyle={{ padding: 32 }}
            >
              <Steps
                direction="vertical"
                current={currentStep}
                items={steps.map((step, index) => ({
                  title: <span style={{ color: currentStep >= index ? '#fff' : 'rgba(255,255,255,0.5)', fontWeight: 'bold' }}>{step.title}</span>,
                  icon: (
                    <div style={{
                      background: currentStep >= index ? '#fff' : 'transparent',
                      color: currentStep >= index ? themeColor : 'rgba(255,255,255,0.5)',
                      border: `1px solid ${currentStep >= index ? '#fff' : 'rgba(255,255,255,0.5)'}`,
                      width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      {currentStep > index ? <CheckCircleOutlined /> : step.icon}
                    </div>
                  )
                }))}
              />
              
              <div style={{ marginTop: 40, borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: 20 }}>
                <Text style={{ color: '#fff', display: 'block', marginBottom: 10 }}><CheckCircleOutlined /> Fast Approval</Text>
                <Text style={{ color: '#fff', display: 'block', marginBottom: 10 }}><CheckCircleOutlined /> Low Commission</Text>
                <Text style={{ color: '#fff', display: 'block' }}><CheckCircleOutlined /> 24/7 Support</Text>
              </div>
            </Card>
          </Col>

          {/* Right Side - Form */}
          <Col xs={24} lg={16}>
            <Card
              bordered={false}
              style={{
                borderRadius: 16,
                boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                background: '#fff',
                height: '100%'
              }}
              bodyStyle={{ padding: 40 }}
            >
               <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                initialValues={{ mobile: { country_code: '+91' } }}
              >
                {/* Content Area */}
                <div style={{ minHeight: 400 }}>
                  {steps[currentStep].content}
                </div>

                {/* Footer Buttons */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32, paddingTop: 24, borderTop: '1px solid #f0f0f0' }}>
                  <Button 
                    size="large" 
                    onClick={handlePrev} 
                    disabled={currentStep === 0}
                    icon={<ArrowLeftOutlined />}
                  >
                    Back
                  </Button>
                  
                  {currentStep < steps.length - 1 ? (
                    <Button 
                      type="primary" 
                      size="large" 
                      onClick={handleNext}
                      style={{ background: themeColor, borderColor: themeColor }}
                      icon={<ArrowRightOutlined />}
                    >
                      Continue
                    </Button>
                  ) : (
                    <Button 
                      type="primary" 
                      size="large" 
                      htmlType="submit" 
                      loading={submitting}
                      style={{ background: themeColor, borderColor: themeColor }}
                      icon={<CheckCircleOutlined />}
                    >
                      Register Vendor
                    </Button>
                  )}
                </div>
              </Form>
              
              <div style={{ marginTop: 20, textAlign: 'center' }}>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  <SafetyOutlined style={{ color: '#52c41a' }} /> Your data is encrypted and secure.
                </Text>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default SellerPage;