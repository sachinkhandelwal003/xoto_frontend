// src/pages/auth/CustomerLogin.jsx
import React, { useState, useContext } from 'react';
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
} from 'antd';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../manageApi/context/AuthContext.jsx';
import loginimage from '../../assets/img/one.png';
import logoNew from '../../assets/img/logoNew.png';
import { UserOutlined, ArrowLeftOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const CustomerLogin = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    setGeneralError('');
    try {
      const mobile = values.mobile.toString();
      await login('/users/login/customer', { mobile });
      message.success('Login successful!');
      // Navigation will be handled by AuthContext useEffect
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
    <div style={{
      minHeight: '100vh',
      background: `url(${loginimage}) center/cover no-repeat fixed`,
      position: 'relative',
      fontFamily: "'Poppins', sans-serif",
    }}>
      {/* Dark Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(5px)',
      }} />

      <Row style={{ minHeight: '100vh', position: 'relative', zIndex: 10 }}>
        {/* Left Side - Branding */}
        <Col xs={0} md={12} lg={14}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            padding: '3rem',
            color: 'white',
          }}>
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              style={{
                maxWidth: '600px',
                textAlign: 'center',
              }}
            >
              <img
                src={logoNew}
                alt="Logo"
                style={{
                  width: '150px',
                  height: 'auto',
                  marginBottom: '2rem',
                  filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.4))',
                }}
              />
              <Title level={1} style={{ color: '#03A4F4', fontSize: '3.5rem', fontWeight: 800, marginBottom: '1rem' }}>
                Customer Login
              </Title>
              <Text style={{ fontSize: '1.3rem', opacity: 0.9, color: 'white', display: 'block' }}>
                Welcome back! Enter your mobile number to access your account
              </Text>
              <div style={{ marginTop: '3rem', textAlign: 'left', background: 'rgba(255,255,255,0.1)', padding: '1.5rem', borderRadius: '15px' }}>
                <Title level={4} style={{ color: 'white', marginBottom: '1rem' }}>Why Shop With Us?</Title>
                <ul style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px', paddingLeft: '1rem' }}>
                  <li>Wide selection of products</li>
                  <li>Secure & easy payments</li>
                  <li>Fast delivery options</li>
                  <li>24/7 customer support</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </Col>

        {/* Right Side - Form */}
        <Col xs={24} md={12} lg={10}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            padding: '2rem',
          }}>
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              style={{ width: '100%', maxWidth: '450px' }}
            >
              <Card
                style={{
                  width: '100%',
                  borderRadius: '20px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                  background: 'rgba(255,255,255,0.98)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
                bodyStyle={{ padding: '2.5rem' }}
              >
                {/* Back Button */}
                <Button
                  type="text"
                  onClick={() => navigate('/auth')}
                  style={{
                    color: '#5C039B',
                    padding: '4px 8px',
                    height: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '1.5rem',
                  }}
                >
                  <ArrowLeftOutlined />
                  Back to Selection
                </Button>

                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <div style={{
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
                  }}>
                    <UserOutlined />
                  </div>
                  <Title level={3} style={{ color: '#5C039B', margin: 0 }}>
                    Customer Login
                  </Title>
                  <Text type="secondary" style={{ display: 'block', marginTop: '0.5rem' }}>
                    Enter your mobile number to continue
                  </Text>
                </div>

                {/* Error Alert */}
                {generalError && (
                  <Alert
                    message={generalError}
                    type="error"
                    showIcon
                    closable
                    onClose={() => setGeneralError('')}
                    style={{
                      marginBottom: '1.5rem',
                      borderRadius: '10px',
                    }}
                  />
                )}

                {/* Login Form */}
                <Form form={form} onFinish={onFinish} layout="vertical">
                  <Form.Item
                    name="mobile"
                    label={<span style={{ color: '#5C039B', fontWeight: 600 }}>Mobile Number</span>}
                    rules={[
                      { required: true, message: 'Please enter your mobile number' },
                      { pattern: /^\d{10}$/, message: 'Please enter a valid 10-digit mobile number' }
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
                      border: 'none',
                      boxShadow: '0 4px 15px rgba(24,144,255,0.3)',
                    }}
                  >
                    {loading ? 'Signing In...' : 'Login Now'}
                  </Button>
                </Form>

                {/* Register Link */}
                <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                  <Text type="secondary">
                    Don't have an account?{' '}
                    <Link to="/customer/registration" style={{ color: '#1890ff', fontWeight: 'bold' }}>
                      Register Here
                    </Link>
                  </Text>
                </div>

                {/* Divider */}
                <div style={{ margin: '1.5rem 0', display: 'flex', alignItems: 'center' }}>
                  <div style={{ flex: 1, height: '1px', background: '#f0f0f0' }} />
                  <Text type="secondary" style={{ margin: '0 1rem' }}>OR</Text>
                  <div style={{ flex: 1, height: '1px', background: '#f0f0f0' }} />
                </div>

                {/* Alternative Login Option */}
                <Button
                  type="default"
                  block
                  onClick={() => navigate('/auth/partner/login')}
                  style={{
                    height: '48px',
                    borderRadius: '10px',
                    fontSize: '16px',
                    fontWeight: '600',
                  }}
                >
                  Login as Partner
                </Button>
              </Card>
            </motion.div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CustomerLogin;