// src/components/login/AdminLogin.jsx
import React, { useState, useContext, useEffect, useRef } from 'react';
import { Form, Input, Button, Card, Alert, Typography, Spin } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../manageApi/context/AuthContext.jsx';
import { toast } from 'react-toastify';
import styled from 'styled-components';

const { Title, Text } = Typography;

const StyledContainer = styled.div`
  display: flex;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #5C039B 0%, #03A4F4 100%);
  padding: 2rem;
  font-family: 'Poppins', sans-serif;
`;

const getDashboardPath = (roleCode) => {
  const map = { '0': '/superadmin', '1': '/admin' };
  return `/dashboard${map[roleCode] || ''}`;
};

const AdminLogin = () => {
  const [form] = Form.useForm();
  const [generalError, setGeneralError] = useState('');
  const [attemptCount, setAttemptCount] = useState(0);
  const [lockUntil, setLockUntil] = useState(null);
  const hasRedirected = useRef(false);

  const { login, isAuthenticated, user, token, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  // Lock countdown timer
  useEffect(() => {
    if (!lockUntil) return;
    const timer = setInterval(() => {
      if (Date.now() >= lockUntil) {
        setLockUntil(null);
        setAttemptCount(0);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [lockUntil]);

  // Auto redirect after successful login
  useEffect(() => {
    if (isAuthenticated && user && token && !hasRedirected.current) {
      hasRedirected.current = true;
      const roleCode = user?.role?.code?.toString() || user?.role;
      const roleName = roleCode === '0' ? 'SuperAdmin' : 'Admin';
      const userName = user?.name || user?.email?.split('@')[0] || 'Admin';

      // Epic Role-Based Toast
      toast.success(`Welcome back, ${roleName} ${userName}!`, {
        position: "top-center",
        autoClose: 4000,
        style: {
          background: roleCode === '0' 
            ? "linear-gradient(135deg, #5C039B, #8E44AD)" 
            : "#03A4F4",
          color: roleCode === '0' ? "#FFD700" : "#FFFFFF",
          fontSize: "18px",
          fontWeight: "bold",
          borderRadius: "16px",
          padding: "16px",
          boxShadow: `0 10px 30px rgba(${roleCode === '0' ? '92, 3, 155' : '3, 164, 244'}, 0.5)`,
        },
        icon: roleCode === '0' ? "Crown" : "Key",
      });

      setTimeout(() => {
        navigate(getDashboardPath(roleCode), { replace: true });
      }, 1500);
    }
  }, [isAuthenticated, user, token, navigate]);

  const onFinish = async (values) => {
    setGeneralError('');

    // Check lock
    if (lockUntil && Date.now() < lockUntil) {
      const seconds = Math.ceil((lockUntil - Date.now()) / 1000);
      toast.warn(`Too many attempts. Wait ${seconds}s`, {
        style: { background: "#ff4d4f", color: "white" },
      });
      return;
    }

    try {
      // Use the NEW flexible login with endpoint + payload
      await login("/auth/login", {
        email: values.email.trim(),
        password: values.password,
      });

      // Success → reset attempts
      setAttemptCount(0);
      setLockUntil(null);

    } catch (err) {
      const errorMsg = typeof err === 'string' ? err : err?.message || "Login failed";
      const newCount = attemptCount + 1;
      setAttemptCount(newCount);

      // Lock after 5 failed attempts
      if (newCount >= 5) {
        const lockTime = Date.now() + 5 * 60 * 1000; // 5 minutes
        setLockUntil(lockTime);
        toast.error('Account locked for 5 minutes due to too many attempts', {
          autoClose: 10000,
          style: { background: "#ff4d4f", color: "white", fontWeight: "bold" },
        });
        setGeneralError("Too many failed attempts. Account locked for 5 minutes.");
        return;
      }

      // Friendly error messages
      let displayError = "Invalid email or password";
      if (errorMsg.toLowerCase().includes("inactive") || errorMsg.toLowerCase().includes("deactivated")) {
        displayError = "Your account is deactivated. Contact support.";
      } else if (errorMsg.toLowerCase().includes("verify")) {
        displayError = "Please verify your email first.";
      } else if (errorMsg.toLowerCase().includes("not found") || errorMsg.toLowerCase().includes("credentials")) {
        displayError = "Incorrect email or password";
      } else if (errorMsg.includes("Network") || errorMsg.includes("failed to fetch")) {
        displayError = "No internet connection";
      }

      setGeneralError(displayError);
      toast.error(displayError);
    }
  };

  const getLockMessage = () => {
    if (!lockUntil) return null;
    const seconds = Math.ceil((lockUntil - Date.now()) / 1000);
    return `Too many attempts. Try again in ${seconds} seconds`;
  };

  return (
    <StyledContainer>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
        style={{ width: '100%', maxWidth: 460 }}
      >
        <Card
          style={{
            borderRadius: 24,
            overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
            border: '2px solid #5C039B',
          }}
        >
          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #5C039B, #03A4F4)',
            padding: '32px 24px',
            textAlign: 'center',
            color: 'white',
          }}>
            <Title level={2} style={{ color: '#fff', margin: 0, fontWeight: 800 }}>
              Admin Portal
            </Title>
            <Text style={{ color: '#e0f7ff', fontSize: 16 }}>
              Secure Access Only
            </Text>
          </div>

          <div style={{ padding: '40px 32px' }}>
            {/* Lock Alert */}
            {lockUntil && (
              <Alert
                message={getLockMessage()}
                type="warning"
                showIcon
                style={{ marginBottom: 20, borderRadius: 12, fontWeight: "bold" }}
              />
            )}

            {/* General Error */}
            {generalError && !lockUntil && (
              <Alert
                message={generalError}
                type="error"
                showIcon
                closable
                onClose={() => setGeneralError('')}
                style={{ marginBottom: 20, borderRadius: 12 }}
              />
            )}

            {/* Loading */}
            {loading && (
              <div style={{ textAlign: 'center', marginBottom: 20 }}>
                <Spin size="large" tip="Signing you in..." />
              </div>
            )}

            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              disabled={loading || !!lockUntil}
            >
              <Form.Item
                label={<span style={{ color: "#5C039B", fontWeight: 600 }}>Email Address</span>}
                name="email"
                rules={[
                  { required: true, message: 'Email is required' },
                  { type: 'email', message: 'Invalid email format' },
                ]}
              >
                <Input
                  size="large"
                  placeholder="admin@xoto.com"
                  style={{ borderRadius: 12, height: 50 }}
                />
              </Form.Item>

              <Form.Item
                label={<span style={{ color: "#5C039B", fontWeight: 600 }}>Password</span>}
                name="password"
                rules={[
                  { required: true, message: 'Password is required' },
                  { min: 6, message: 'Minimum 6 characters' },
                ]}
              >
                <Input.Password
                  size="large"
                  placeholder="Enter secure password"
                  style={{ borderRadius: 12, height: 50 }}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone twoToneColor="#5C039B" /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>

              <Form.Item style={{ marginBottom: 12 }}>
                <a href="/forgot-password" style={{ float: 'right', color: "#03A4F4", fontWeight: 600 }}>
                  Forgot Password?
                </a>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  block
                  loading={loading}
                  disabled={!!lockUntil}
                  style={{
                    height: 56,
                    fontSize: 18,
                    fontWeight: 'bold',
                    background: "#5C039B",
                    border: "none",
                    borderRadius: 16,
                    boxShadow: "0 8px 20px rgba(92, 3, 155, 0.4)",
                  }}
                >
                  {loading ? 'Signing In...' : 'Login as Admin'}
                </Button>
              </Form.Item>
            </Form>

            {/* Test Credentials - FIXED */}
            <Alert
              message={
                <div style={{ fontSize: 13, lineHeight: 1.8 }}>
                  <strong>Test Accounts:</strong><br />
                  SuperAdmin: <Text code>Super1@gmail.com</Text> → Password: <Text code>123456</Text><br />
                  Admin: <Text code>admin@xoto.com</Text> → Password: <Text code>admin123</Text>
                </div>
              }
              type="info"
              showIcon
              style={{ marginTop: 20, borderRadius: 12, fontSize: 13 }}
            />

            <div style={{ textAlign: 'center', marginTop: 24 }}>
              <a href="/login" style={{ color: "#03A4F4", fontWeight: 600 }}>
                ← Back to User Login
              </a>
            </div>
          </div>
        </Card>
      </motion.div>
    </StyledContainer>
  );
};

export default AdminLogin;