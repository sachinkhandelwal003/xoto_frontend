import React, { useState } from 'react';
import { Sparkles, User, Mail, Phone, Lock, X } from 'lucide-react';
import { Button, Modal, Form, Input, Typography, notification } from 'antd';
import Cookies from 'js-cookie';

const { Text } = Typography;

const AI_BACKGROUND_IMAGES = [
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1678727173100-0d44fa5e57b3?q=80&w=2070&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2065&auto=format&fit=crop',
];

const BRAND_PURPLE = "#5C039B";

const LeadGenerationModal = ({ 
  visible, 
  onCancel, 
  onSubmit,
  selectedImage 
}) => {
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    
    try {
      // Save to cookies (30 days persistence)
      const cookieOptions = {
        expires: 30,
        path: '/',
        secure: false, // false for localhost
        sameSite: 'Lax'
      };
      
      Cookies.set('xoto_user_data', JSON.stringify(values), cookieOptions);
      Cookies.set('xoto_user_signed', 'true', cookieOptions);
      
      // ALSO save to sessionStorage for immediate use in current session
      sessionStorage.setItem('xoto_session_user', JSON.stringify(values));
      sessionStorage.setItem('xoto_session_signed', 'true');
      
      // Save to localStorage as backup
      localStorage.setItem('xoto_user_info', JSON.stringify(values));
      localStorage.setItem('xoto_user_signed_up', 'true');
      
      console.log('✅ User data saved to ALL storage systems');
      console.log('- SessionStorage:', sessionStorage.getItem('xoto_session_signed'));
      console.log('- Cookies:', Cookies.get('xoto_user_signed'));
      console.log('- LocalStorage:', localStorage.getItem('xoto_user_signed_up'));
      
      notification.success({
        message: 'Preferences Saved!',
        description: 'Your information has been saved for future visits.',
        duration: 2,
      });
      
      // Submit to parent and close modal
      onSubmit(values);
      form.resetFields();
      
    } catch (error) {
      console.error('❌ Error saving user data:', error);
      notification.error({
        message: 'Error',
        description: 'Could not save your preferences. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      open={visible}
      footer={null}
      onCancel={onCancel}
      width={950}
      centered
      closable={false}
      bodyStyle={{ padding: 0, borderRadius: '20px', overflow: 'hidden' }}
      className="lead-generation-modal"
    >
      <div className="flex flex-col lg:flex-row h-[550px] relative">
        {/* Close button */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 z-50 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 hover:bg-white shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200 hover:border-gray-300"
          aria-label="Close modal"
        >
          <X size={16} className="text-gray-600 hover:text-gray-800" />
        </button>

        {/* Left Side: Signup Form */}
        <div className="lg:w-1/2 p-6 lg:p-8 bg-white flex flex-col justify-center">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-purple-600 to-purple-800">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="m-0 text-xl font-bold text-gray-900">Access Your AI Design</h2>
                <Text className="m-0 text-xs text-gray-500 mt-1">
                  Enter your details to download your generated vision
                </Text>
              </div>
            </div>
            
            <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-semibold text-purple-800">
                  ✓ AI Design Ready
                </span>
              </div>
            </div>
          </div>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="space-y-3"
            size="middle"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <Form.Item
                name="firstName"
                rules={[{ required: true, message: 'First name required' }]}
                className="mb-2"
              >
                <Input 
                  prefix={<User size={14} className="text-gray-400" />} 
                  placeholder="First Name" 
                  className="rounded-lg h-10"
                />
              </Form.Item>

              <Form.Item
                name="lastName"
                rules={[{ required: true, message: 'Last name required' }]}
                className="mb-2"
              >
                <Input 
                  placeholder="Last Name" 
                  className="rounded-lg h-10"
                />
              </Form.Item>
            </div>

            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Email required' },
                { type: 'email', message: 'Valid email required' }
              ]}
              className="mb-2"
            >
              <Input 
                prefix={<Mail size={14} className="text-gray-400" />} 
                placeholder="Email Address" 
                className="rounded-lg h-10"
              />
            </Form.Item>

            <Form.Item
              name="phone"
              rules={[
                { required: true, message: 'Phone required' },
                { pattern: /^[+]?[\d\s-]+$/, message: 'Valid phone required' }
              ]}
              className="mb-2"
            >
              <Input 
                prefix={<Phone size={14} className="text-gray-400" />} 
                placeholder="Phone Number" 
                className="rounded-lg h-10"
              />
            </Form.Item>

            <div className="flex items-center gap-2 mb-2">
              <input 
                type="checkbox" 
                id="rememberSession"
                defaultChecked
                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <label htmlFor="rememberSession" className="text-xs text-gray-600">
                Remember me for this session
              </label>
            </div>

            <div className="pt-2">
              <Button 
                type="primary" 
                size="large" 
                htmlType="submit"
                loading={isSubmitting}
                disabled={isSubmitting}
                style={{ 
                  background: 'linear-gradient(135deg, #5C039B 0%, #8E2DE2 100%)',
                  border: 'none'
                }}
                className="w-full h-12 rounded-lg font-semibold text-sm shadow-lg shadow-purple-300 hover:shadow-xl hover:shadow-purple-400 transition-all duration-300"
                icon={<Sparkles size={16} />}
              >
                {isSubmitting ? 'Saving...' : 'Get My Design & Save'}
              </Button>
            </div>
            
            <Text className="block text-center text-xs text-gray-400 mt-1">
              Your information will be saved for future visits
            </Text>
          </Form>

          <div className="mt-4 pt-3 border-t border-gray-100">
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
              <Lock size={10} />
              <span>Secure & Encrypted</span>
            </div>
          </div>
        </div>

        {/* Right Side: AI Background */}
        <div 
          className="lg:w-1/2 relative hidden lg:block"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(92, 3, 155, 0.85) 0%, rgba(142, 45, 226, 0.75) 100%), url(${AI_BACKGROUND_IMAGES[1]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/70 via-purple-800/50 to-transparent" />
          
          <div className="relative z-10 h-full flex flex-col justify-center items-center p-6 text-center text-white">
            <div className="max-w-xs">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4">
                  <Sparkles className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold mb-3">
                  Your Vision<br />Is Ready!
                </h3>
                <p className="text-sm text-white/90 leading-relaxed">
                  Xoto AI has transformed your space. Enter your details to download your personalized landscape design.
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-sm">Instant Download</h4>
                    <p className="text-white/80 text-xs">Get your high-res AI render</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-sm">Expert Tips</h4>
                    <p className="text-white/80 text-xs">Receive professional insights</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <h4 className="font-bold text-sm">Session Memory</h4>
                    <p className="text-white/80 text-xs">No signup needed for multiple designs</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile view */}
        <div className="lg:hidden p-4 bg-gradient-to-br from-purple-600 to-purple-800 text-white">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/20 mb-2">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold mb-2">
              Your Design Is Ready!
            </h3>
            <p className="text-xs text-white/90">
              Enter your details to download your AI-generated landscape.
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default LeadGenerationModal;