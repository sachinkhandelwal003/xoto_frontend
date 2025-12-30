import React, { useState, useContext } from 'react';
import { 
  Sparkles, X, User, Mail, Lock, 
  ArrowRight, CheckCircle2, MapPin, Smartphone
} from 'lucide-react';
import { 
  Button, Modal, Form, Input, Select, 
  notification, ConfigProvider, Typography 
} from 'antd';
import { AuthContext } from '../../manageApi/context/AuthContext';
import { apiService } from '../../manageApi/utils/custom.apiservice';

const { Option } = Select;
const { Text, Title } = Typography;

const BRAND_PURPLE = "#5C039B";
const BRAND_PURPLE_DARK = "#4a027d";

const LeadGenerationModal = ({ 
  visible, 
  onCancel, 
  onAuthSuccess 
}) => {
  const [form] = Form.useForm();
  const { login } = useContext(AuthContext); 
  
  const [activeTab, setActiveTab] = useState('signin'); 
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- UI Components ---

  // Custom Country Selector
  const prefixSelector = (
    <Form.Item name="country_code" noStyle initialValue="+91">
      <Select 
        style={{ width: 90 }} 
        dropdownMatchSelectWidth={false}
        bordered={false}
        className="font-medium text-gray-700"
      >
        <Option value="+91">🇮🇳 +91</Option>
        <Option value="+971">🇦🇪 +971</Option>
        <Option value="+1">🇺🇸 +1</Option>
        <Option value="+44">🇬🇧 +44</Option>
        <Option value="+966">🇸🇦 +966</Option>
      </Select>
    </Form.Item>
  );

  // --- Logic ---

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      
      // ==========================
      // 1. SIGN IN LOGIC
      // ==========================
      if (activeTab === 'signin') {
        const mobile = values.mobile.toString();
        
        // Login via Context
        const loginData = await login('/users/login/customer', { mobile });

        // notification.success({
        //   message: 'Welcome Back!',
        //   description: 'Login successful. Preparing your vision...',
        //   icon: <CheckCircle2 className="text-green-500" />,
        //   placement: 'topRight'
        // });

        // Pass data back to parent (AIPlanner) to update Redux/State immediately
        if (onAuthSuccess) onAuthSuccess(loginData);
        onCancel();
      } 
      
      // ==========================
      // 2. SIGN UP LOGIC (+ AUTO LOGIN)
      // ==========================
      else {
        const payload = {
          name: {
            first_name: values.first_name,
            last_name: values.last_name
          },
          email: values.email,
          comingFromAiPage: true,
          mobile: {
            country_code: values.country_code,
            number: values.mobile.toString()
          },
          location: {
            country: values.country_code === '+91' ? 'India' : 'UAE',
            state: values.state,
            city: values.city,
            address: ''
          }
        };

        // A. Create Account
        const response = await apiService.post('/users/signup/customer', payload);

        if (response?.success) {
          
          notification.success({
             message: 'Account Created!',
             description: 'Logging you in automatically...',
             duration: 2,
          });

          // B. Direct Login (Auto-Login)
          // We immediately use the mobile number to log them in
          try {
              const mobile = values.mobile.toString();
              const loginData = await login('/users/login/customer', { mobile });

              // Success Notification
              notification.success({
                message: 'You are now logged in',
                description: 'Starting your design generation...',
                icon: <CheckCircle2 className="text-green-500" />,
                placement: 'topRight'
              });

              // Pass data back to parent and close
              if (onAuthSuccess) onAuthSuccess(loginData);
              onCancel();
              
              // Clean up form
              form.resetFields();

          } catch (loginError) {
              console.error("Auto-login failed:", loginError);
              // Fallback: If signup worked but login failed, send them to signin tab
              notification.warning({
                  message: 'Account Created',
                  description: 'Please sign in manually.',
              });
              setActiveTab('signin');
              form.setFieldsValue({ mobile: values.mobile });
          }
        }
      }

    } catch (error) {
      console.error("Auth Error:", error);
      const errorMessage = error?.response?.data?.message || error?.message || 'Authentication failed';
      
      if (error.response?.data?.errors) {
         const serverErrors = error.response.data.errors.map(err => ({
           name: err.field === 'mobile.number' ? 'mobile' : err.field,
           errors: [err.message]
         }));
         form.setFields(serverErrors);
      } else {
        const displayMsg = errorMessage.includes('not found') 
        ? 'Account not found. Please create an account.' 
        : errorMessage;

        notification.error({ message: 'Error', description: displayMsg });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: BRAND_PURPLE,
          borderRadius: 12,
          controlHeight: 45,
          fontFamily: "'Inter', sans-serif",
        },
        components: {
          Input: {
            colorBorder: '#E5E7EB',
            hoverBorderColor: BRAND_PURPLE,
            activeBorderColor: BRAND_PURPLE,
            colorBgContainer: '#F9FAFB',
          },
          Button: {
            fontWeight: 600,
          }
        }
      }}
    >
      <Modal
        open={visible}
        footer={null}
        onCancel={onCancel}
        width={1000}
        centered
        closable={false}
        bodyStyle={{ padding: 0, borderRadius: '24px', overflow: 'hidden' }}
        maskStyle={{ backdropFilter: 'blur(8px)', background: 'rgba(0,0,0,0.6)' }}
      >
        <div className="flex flex-col lg:flex-row min-h-[600px] bg-white">
          
          {/* --- LEFT SIDE: BRANDING & VISUALS --- */}
          <div className="lg:w-5/12 relative hidden lg:flex flex-col justify-between p-10 text-white overflow-hidden bg-gray-900">
             {/* Background */}
             <div className="absolute inset-0 z-0">
               <img 
                 src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop" 
                 alt="Login bg" 
                 className="w-full h-full object-cover opacity-60"
               />
               <div className="absolute inset-0 bg-gradient-to-br from-purple-900/90 to-black/80" />
             </div>

             {/* Content */}
             <div className="relative z-10">
               <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 mb-8 shadow-xl">
                 <Sparkles className="text-purple-300 w-7 h-7" />
               </div>
               <h2 className="text-4xl font-extrabold leading-tight mb-4 tracking-tight">
                 Design Your<br/>
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200">Dream Space</span>
               </h2>
               <p className="text-purple-100/80 text-base leading-relaxed">
                 Unlock the power of AI landscape architecture. Transform your outdoors in seconds.
               </p>
             </div>

             <div className="relative z-10 space-y-5">
               {[
                 "Unlimited AI Generations",
                 "High-Resolution Downloads",
                 "Save Your Designs"
               ].map((item, idx) => (
                 <div key={idx} className="flex items-center gap-3 text-sm font-medium text-white/90">
                   <div className="bg-green-500/20 p-1 rounded-full">
                     <CheckCircle2 size={14} className="text-green-400" />
                   </div>
                   <span>{item}</span>
                 </div>
               ))}
             </div>
          </div>

          {/* --- RIGHT SIDE: FORM --- */}
          <div className="lg:w-7/12 p-8 lg:p-12 flex flex-col relative bg-white">
            <button 
              onClick={onCancel}
              className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-all"
            >
              <X size={24} />
            </button>

            {/* Header */}
            <div className="mb-8 text-center lg:text-left">
              <Title level={2} style={{ margin: 0, fontWeight: 700, color: '#111827' }}>
                {activeTab === 'signin' ? 'Welcome Back' : 'Create Account'}
              </Title>
              <Text className="text-gray-500 mt-2 block text-base">
                {activeTab === 'signin' 
                  ? 'Access your saved designs and generate new ideas.' 
                  : 'Join Xoto AI to start generating your dream gardens.'}
              </Text>
            </div>

            {/* Custom Tabs */}
            <div className="flex p-1.5 bg-gray-100 rounded-xl mb-8 w-full">
              <button
                onClick={() => { setActiveTab('signin'); form.resetFields(); }}
                className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all duration-200 ${
                  activeTab === 'signin' 
                    ? 'bg-white text-purple-800 shadow-md transform scale-[1.02]' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => { setActiveTab('signup'); form.resetFields(); }}
                className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all duration-200 ${
                  activeTab === 'signup' 
                    ? 'bg-white text-purple-800 shadow-md transform scale-[1.02]' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Form */}
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              className="flex-1 flex flex-col"
              size="sm"
              initialValues={{ country_code: '+91' }}
              requiredMark={false} 
            >
              {/* --- SIGN UP FIELDS --- */}
              {activeTab === 'signup' && (
                <div className="grid grid-cols-2 gap-2">
                  <Form.Item 
                    label={<span className="font-semibold text-gray-700">First Name</span>}
                    name="first_name" 
                    rules={[{ required: true, message: 'Required' }]}
                  >
                    <Input prefix={<User size={18} className="text-gray-400 mr-1"/>} placeholder="John" />
                  </Form.Item>
                  <Form.Item 
                    label={<span className="font-semibold text-gray-700">Last Name</span>}
                    name="last_name" 
                    rules={[{ required: true, message: 'Required' }]}
                  >
                    <Input placeholder="Doe" />
                  </Form.Item>
                </div>
              )}

              {activeTab === 'signup' && (
                <Form.Item 
                  label={<span className="font-semibold text-gray-700">Email Address</span>}
                  name="email" 
                  rules={[{ required: true, message: 'Email required' }, { type: 'email', message: 'Invalid email' }]}
                >
                  <Input prefix={<Mail size={18} className="text-gray-400 mr-1"/>} placeholder="john@example.com" />
                </Form.Item>
              )}

              {/* --- SHARED MOBILE FIELD --- */}
              <Form.Item
                label={<span className="font-semibold text-gray-700">Mobile Number</span>}
                name="mobile"
                rules={[
                  { required: true, message: 'Mobile number is required' },
                  { pattern: /^[0-9]{7,15}$/, message: 'Invalid number format' }
                ]}
              >
                <Input 
                  addonBefore={prefixSelector} 
                  prefix={<Smartphone size={18} className="text-gray-400 mr-1"/>}
                  placeholder="9876543210" 
                  className="w-full"
                />
              </Form.Item>

              {/* --- SIGN UP LOCATION FIELDS --- */}
              {activeTab === 'signup' && (
                 <div className="grid grid-cols-2 gap-4">
                  <Form.Item 
                    label={<span className="font-semibold text-gray-700">State/Emirate</span>}
                    name="state" 
                    rules={[{ required: true, message: 'Required' }]}
                  >
                    <Input prefix={<MapPin size={18} className="text-gray-400 mr-1"/>} placeholder="California" />
                  </Form.Item>
                  <Form.Item 
                    label={<span className="font-semibold text-gray-700">City</span>}
                    name="city" 
                    rules={[{ required: true, message: 'Required' }]}
                  >
                    <Input placeholder="Los Angeles" />
                  </Form.Item>
                </div>
              )}

              <div className="mt-8">
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  block 
                  size="large"
                  loading={isSubmitting}
                  className="h-14 text-base rounded-xl shadow-lg shadow-purple-200 hover:shadow-purple-300 transition-all duration-300"
                  style={{ 
                    background: `linear-gradient(135deg, ${BRAND_PURPLE} 0%, ${BRAND_PURPLE_DARK} 100%)`, 
                    border: 'none' 
                  }}
                >
                   {activeTab === 'signin' ? (
                     <span className="flex items-center justify-center gap-2">Secure Login <ArrowRight size={18} /></span>
                   ) : (
                     <span className="flex items-center justify-center gap-2">Create Account <Sparkles size={18} /></span>
                   )}
                </Button>
                
                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400 bg-gray-50 py-2 rounded-lg border border-gray-100">
                  <Lock size={12} />
                  <span>256-bit SSL Encrypted Connection</span>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </Modal>
    </ConfigProvider>
  );
};

export default LeadGenerationModal;