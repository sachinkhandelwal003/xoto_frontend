// src/pages/auth/CustomerLogin.jsx
import React, { useState, useEffect, useContext, useRef } from 'react';
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  Row,
  Col,
  Grid,
  ConfigProvider,
  Spin
} from 'antd';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../manageApi/context/AuthContext.jsx';
import { toast } from 'react-toastify';
import styled from 'styled-components';

// Assets
import loginimage from '../../assets/img/one.png';
import logoNew from '../../assets/img/logoNew.png';
import { 
  UserOutlined, 
  MobileOutlined, 
  SmileFilled,
  ArrowLeftOutlined 
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

// --- Styled Components ---

const PageWrapper = styled.div`
  min-height: 100vh;
  position: relative;
  font-family: 'Poppins', sans-serif;
  background: url(${props => props.$bgImage}) center/cover no-repeat fixed;
  overflow: hidden;
`;

// Blue-tinted overlay for Customer Theme
const GradientOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(3, 164, 244, 0.8), rgba(0, 31, 63, 0.85));
  backdrop-filter: blur(3px);
  z-index: 1;
`;

const ContentLayer = styled.div`
  position: relative;
  z-index: 2;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const GlassCard = styled(Card)`
  width: 100%;
  border-radius: 24px !important;
  border: 1px solid rgba(255, 255, 255, 0.3) !important;
  background: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(20px);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);

  .ant-card-body {
    padding: ${props => props.$isMobile ? "30px 20px" : "40px"} !important;
  }
`;

const CustomerLogin = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const hasRedirected = useRef(false);

  const { login, isAuthenticated, user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  // --- Auth Effect (Success Toast) ---
  useEffect(() => {
    if (isAuthenticated && user && token && !hasRedirected.current) {
      hasRedirected.current = true;
      const userName = user?.name || user?.firstName || 'Customer';

      toast.success(
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ 
            background: 'rgba(255,255,255,0.2)', 
            borderRadius: '50%', 
            width: 40, height: 40, 
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}>
            <SmileFilled style={{ color: '#fff', fontSize: 20 }} />
          </div>
          <div>
            <div style={{ fontWeight: 'bold', fontSize: '16px' }}>Welcome, {userName}!</div>
          </div>
        </div>, 
        {
          position: "top-center",
          autoClose: 2000,
          style: {
            background: "linear-gradient(135deg, #03A4F4, #0077b6)",
            color: "#fff",
            borderRadius: "16px",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.45)",
            border: "1px solid rgba(255,255,255,0.2)",
            padding: "16px"
          }
        }
      );

      setTimeout(() => {
        navigate("/dashboard/customer", { replace: true });
      }, 2000);
    }
  }, [isAuthenticated, user, token, navigate]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const mobile = values.mobile.toString();
      await login('/users/login/customer', { mobile });
      // Toast handled in useEffect
    } catch (err) {
      const errorMessage = err?.message || err?.status || 'Login failed';
      const displayMsg = errorMessage.includes('not found') 
        ? 'Account not found. Please register.' 
        : errorMessage;
      
      toast.error(displayMsg, { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#03A4F4', // Customer Blue Theme
          borderRadius: 8,
          fontFamily: 'Poppins, sans-serif',
        }
      }}
    >
      <PageWrapper $bgImage={loginimage}>
        <GradientOverlay />
        
        <ContentLayer>
          <Row style={{ width: '100%', maxWidth: 1200, padding: isMobile ? 16 : 0 }}>
            
            {/* Left Side: Branding */}
            <Col xs={24} lg={12} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: isMobile ? 'center' : 'flex-start', padding: 40 }}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                style={{ textAlign: isMobile ? 'center' : 'left' }}
              >
                <img 
                  src={logoNew} 
                  alt="Logo" 
                  style={{ width: isMobile ? 100 : 150, marginBottom: 24, filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.3))" }} 
                />
                
                <Title style={{ color: '#fff', fontSize: isMobile ? 32 : 48, fontWeight: 800, margin: 0, lineHeight: 1.1 }}>
                  Customer <br/>
                  <span style={{ color: '#03A4F4' }}>Login</span>
                </Title>
                
                <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 18, marginTop: 16, display: 'block', maxWidth: 400 }}>
                  Access your orders, wishlist, and profile with just your mobile number.
                </Text>
              </motion.div>
            </Col>

            {/* Right Side: Glass Card Form */}
            <Col xs={24} lg={12} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                style={{ width: '100%', maxWidth: 450 }}
              >
                <GlassCard bordered={false} $isMobile={isMobile}>
                  
                  {/* Back Link */}
                 

                  {/* Icon Header */}
                  <div style={{ textAlign: 'center', marginBottom: 32 }}>
                    <div style={{ 
                      width: 64, height: 64, margin: '0 auto 16px',
                      background: 'linear-gradient(135deg, #03A4F4, #0077b6)',
                      borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      boxShadow: '0 10px 20px rgba(3, 164, 244, 0.3)',
                      color: '#fff', fontSize: 28
                    }}>
                      <UserOutlined />
                    </div>
                    <Title level={3} style={{ margin: 0, color: '#333' }}>Welcome Back</Title>
                    <Text type="secondary">Login using your mobile number</Text>
                  </div>

                  {/* Form */}
                  <Form form={form} layout="vertical" onFinish={onFinish} size="large">
                    <Form.Item
                      name="mobile"
                      rules={[
                        { required: true, message: 'Please enter your mobile number' },
                        { pattern: /^\d{10}$/, message: 'Enter a valid 10-digit number' },
                      ]}
                    >
                      <Input 
                        prefix={<MobileOutlined style={{ color: '#bfbfbf' }} />} 
                        placeholder="Mobile Number (e.g. 9876543210)"
                        maxLength={10}
                        style={{ borderRadius: 12, height: 50 }}
                      />
                    </Form.Item>

                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                      block
                      style={{
                        height: 50,
                        borderRadius: 12,
                        fontSize: 16,
                        fontWeight: 'bold',
                        background: 'linear-gradient(135deg, #03A4F4 0%, #0077b6 100%)',
                        border: 'none',
                        boxShadow: '0 8px 20px rgba(3, 164, 244, 0.3)',
                        marginTop: 8
                      }}
                    >
                      {loading ? 'Verifying...' : 'Secure Login'}
                    </Button>
                  </Form>

                  <div style={{ textAlign: 'center', marginTop: 24 }}>
                    <Text type="secondary">Don't have an account? </Text>
                    <span
                      onClick={() => navigate('/customer/registration')}
                      style={{ 
                        color: '#03A4F4', fontWeight: 'bold', cursor: 'pointer',
                        textDecoration: 'underline', textUnderlineOffset: 4
                      }}
                    >
                      Register Now
                    </span>
                  </div>

                </GlassCard>
              </motion.div>
            </Col>
          </Row>
        </ContentLayer>
      </PageWrapper>
    </ConfigProvider>
  );
};

export default CustomerLogin;