// src/pages/auth/CustomerLogin.jsx
import React, { useState, useEffect, useContext } from 'react';
import {
  Form,
  InputNumber,
  Button,
  Card,
  Typography,
  Alert,
  message,
  Row,
  Col,
  Grid,
} from 'antd';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../manageApi/context/AuthContext.jsx';
import loginimage from '../../assets/img/one.png';
import logoNew from '../../assets/img/logoNew.png';
import { UserOutlined, CheckCircleFilled, ArrowLeftOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const CustomerLogin = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [welcomeUser, setWelcomeUser] = useState(null);

  const { login, isAuthenticated, user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  // Auto redirect after successful login (same logic as Partner Login)
  useEffect(() => {
    if (isAuthenticated && user && token) {
      const userName = user?.name || user?.firstName || user?.mobile || 'Customer';
      const roleName = user?.role?.name || 'Customer';

      setWelcomeUser({ name: userName, role: roleName });
      setShowSuccessBanner(true);

      const timer = setTimeout(() => {
        const roleCode = user?.role?.code?.toString() || user?.role;
        const rolePathMap = {
          "2": "/dashboard/customer",     // Customer role
          // Add more if you have sub-roles under customer
        };
        const path = rolePathMap[roleCode] || "/dashboard/customer";
        navigate(path, { replace: true });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, user, token, navigate]);

  const onFinish = async (values) => {
    setLoading(true);
    setGeneralError('');

    try {
      const mobile = values.mobile.toString();
      await login('/users/login/customer', { mobile });
      message.success('Login successful!');
    } catch (err) {
      const errorMessage = typeof err === 'object'
        ? err.message || err.status || 'Login failed'
        : err || 'Login failed';

      const msg = errorMessage.includes('not found')
        ? 'Customer not found. Please register first.'
        : errorMessage;

      setGeneralError(msg);
      message.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: `url(${loginimage}) center/cover no-repeat fixed`,
        position: 'relative',
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Dark Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(5px)',
        }}
      />

      {/* Success Banner */}
      {showSuccessBanner && welcomeUser && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
            padding: isMobile ? '0.8rem' : '1rem',
            background: '#ffffff',
            color: '#1f1f1f',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: isMobile ? '0.9rem' : '1.3rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            borderBottom: '4px solid #64EF0A',
          }}
        >
          <CheckCircleFilled
            style={{
              fontSize: isMobile ? '1.2rem' : '1.8rem',
              marginRight: isMobile ? '6px' : '12px',
              color: '#64EF0A',
            }}
          />
          Welcome back, {welcomeUser.name}! ({welcomeUser.role})
          <br />
          <Text style={{ fontSize: isMobile ? '0.75rem' : '1rem', opacity: 0.8, color: '#333' }}>
            Redirecting you to your dashboard...
          </Text>
        </motion.div>
      )}

      <Row style={{ minHeight: '100vh', position: 'relative', zIndex: 10 }}>
        {/* Left Side - Branding (Desktop) */}
        {!isMobile && (
          <Col xs={0} lg={12}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                padding: '3rem',
                color: 'white',
              }}
            >
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                style={{ maxWidth: '600px', textAlign: 'center' }}
              >
                <img
                  src={logoNew}
                  alt="Logo"
                  style={{
                    width: '140px',
                    marginBottom: '2rem',
                    filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.4))',
                  }}
                />
                <Title level={1} style={{ color: '#03A4F4', fontSize: '3.5rem', fontWeight: 800 }}>
                  Customer Login
                </Title>
                <Text style={{ fontSize: '1.4rem', opacity: 0.9 }}>
                  Enter your mobile number to access your account
                </Text>
              </motion.div>
            </div>
          </Col>
        )}

        {/* Right Side - Form */}
        <Col xs={24} lg={isMobile ? 24 : 12}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
              padding: '2rem',
            }}
          >
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              style={{ width: '100%', maxWidth: '450px' }}
            >
              <Card
                style={{
                  borderRadius: '20px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                  background: 'rgba(255,255,255,0.98)',
                }}
                bodyStyle={{ padding: '2.5rem' }}
              >
                {/* Back Button */}
             

                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '16px',
                      background: '#1890ff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontSize: '28px',
                      margin: '0 auto 1rem',
                    }}
                  >
                    <UserOutlined />
                  </div>
                  <Title level={3} style={{ color: '#5C039B', margin: 0 }}>
                    Customer Login
                  </Title>
                  <Text type="secondary">
                    Enter your registered mobile number
                  </Text>
                </div>

                {/* Error */}
                {generalError && (
                  <Alert
                    message={generalError}
                    type="error"
                    showIcon
                    closable
                    onClose={() => setGeneralError('')}
                    style={{ marginBottom: '1.5rem', borderRadius: '10px' }}
                  />
                )}

                {/* Form */}
                <Form form={form} onFinish={onFinish} layout="vertical">
                  <Form.Item
                    name="mobile"
                    label={<span style={{ color: '#5C039B', fontWeight: 600 }}>Mobile Number</span>}
                    rules={[
                      { required: true, message: 'Please enter your mobile number' },
                      { pattern: /^\d{10}$/, message: 'Enter a valid 10-digit number' },
                    ]}
                  >
                    <InputNumber
                      controls={false}
                      placeholder="9876543210"
                      style={{
                        width: '100%',
                        height: '48px',
                        borderRadius: '10px',
                        fontSize: '16px',
                      }}
                    />
                  </Form.Item>

                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    block
                    style={{
                      height: '48px',
                      background: '#1890ff',
                      borderRadius: '10px',
                      fontSize: '16px',
                      fontWeight: '600',
                      boxShadow: '0 4px 15px rgba(24,144,255,0.3)',
                    }}
                  >
                    {loading ? 'Signing In...' : 'Login Now'}
                  </Button>
                </Form>

                <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                  <Text type="secondary">
                    New here?{' '}
                    <span
                      onClick={() => navigate('/customer/registration')}
                      style={{ color: '#1890ff', fontWeight: 'bold', cursor: 'pointer' }}
                    >
                      Register Now
                    </span>
                  </Text>
                </div>
              </Card>
            </motion.div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CustomerLogin;