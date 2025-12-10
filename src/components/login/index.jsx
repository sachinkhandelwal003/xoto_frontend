// src/pages/auth/Login.jsx
import React, { useState, useEffect, useContext } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  Alert,
  message,
  Row,
  Col,
  Divider,
  Grid,
} from "antd";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../manageApi/context/AuthContext.jsx";
import loginimage from "../../assets/img/one.png";
import logoNew from "../../assets/img/logoNew.png";
import { 
  CheckCircleFilled, 
  ShopOutlined, 
  UserOutlined,
  ArrowLeftOutlined
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const Login = () => {
  const [form] = Form.useForm();
  const [selectedPartnerType, setSelectedPartnerType] = useState(null); // null, 'freelancer', or 'vendor-b2c'
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [welcomeUser, setWelcomeUser] = useState(null);

  const { login, isAuthenticated, user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const screens = useBreakpoint();

  // Responsive values
  const isMobile = !screens.md;
  const cardPadding = isMobile ? "1.2rem" : "2.5rem";
  const titleLevel = isMobile ? 2 : 1;
  const logoSize = isMobile ? "70px" : "120px";

  // Success Banner + Auto Redirect after login
  useEffect(() => {
    if (isAuthenticated && user && token) {
      const userName = user?.name || user?.firstName || "User";
      const roleName = user?.role?.name || "User";

      setWelcomeUser({ name: userName, role: roleName });
      setShowSuccessBanner(true);

      // Auto navigate after 2 seconds
      const timer = setTimeout(() => {
        const roleCode = user?.role?.code?.toString() || user?.role;
        const rolePathMap = {
          "0": "/dashboard/superadmin",
          "1": "/dashboard/admin",
          "2": "/dashboard/customer",
          "5": "/dashboard/vendor-b2c",
          "6": "/dashboard/vendor-b2b",
          "7": "/dashboard/freelancer",
          "11": "/dashboard/accountant",
          "12": "/dashboard/supervisor",
        };

        const path = rolePathMap[roleCode] || "/dashboard";
        navigate(path, { replace: true });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, user, token, navigate]);

  const handlePartnerSelect = (type) => {
    setSelectedPartnerType(type);
    setGeneralError("");
    form.resetFields();
  };

  const handleBackToSelection = () => {
    setSelectedPartnerType(null);
    setGeneralError("");
    form.resetFields();
  };

  const onFinish = async (values) => {
    setLoading(true);
    setGeneralError("");
    try {
      let endpoint = '';
      
      // Determine endpoint based on partner type
      if (selectedPartnerType === 'freelancer') {
        endpoint = '/freelancer/login';
      } else if (selectedPartnerType === 'vendor-b2c') {
        endpoint = '/vendor/b2c/login';
      }
      
      await login(endpoint, { email: values.email, password: values.password });
      message.success('Login successful!');
    } catch (err) {
      const errorMessage = typeof err === 'object' 
        ? err.message || err.status || 'Invalid credentials' 
        : err || 'Invalid credentials';
      setGeneralError(errorMessage);
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const partnerTypes = [
    {
      value: 'freelancer',
      label: 'Execution Partner',
      desc: 'Provide services and expertise',
      icon: <UserOutlined style={{ fontSize: isMobile ? "20px" : "24px" }} />,
      color: "#5C039B",
    },
    {
      value: 'vendor-b2c',
      label: 'Strategic Alliances',
      desc: 'Sell products directly to customers',
      icon: <ShopOutlined style={{ fontSize: isMobile ? "20px" : "24px" }} />,
      color: "#1890ff",
    },
  ];

  const getSelectedPartner = () => {
    return partnerTypes.find(t => t.value === selectedPartnerType);
  };

  const handleRegister = () => {
    if (selectedPartnerType === 'freelancer') {
      navigate('/freelancer/registration');
    } else if (selectedPartnerType === 'vendor-b2c') {
      navigate('/ecommerce/seller');
    }
  };

  const renderPartnerSelection = () => (
    <motion.div
      key="partner-selection"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
    >
      <Title 
        level={isMobile ? 5 : 4} 
        style={{ 
          textAlign: "center", 
          color: "#5C039B",
          marginBottom: isMobile ? "1rem" : "1.5rem",
          fontSize: isMobile ? "18px" : "24px",
          fontWeight: "600"
        }}
      >
        Select Partner Type
      </Title>
      <Text 
        type="secondary" 
        style={{ 
          textAlign: "center", 
          display: "block", 
          marginBottom: "2rem",
          fontSize: isMobile ? "14px" : "16px"
        }}
      >
        Choose your account type to continue
      </Text>

      <Row gutter={[isMobile ? 8 : 16, isMobile ? 8 : 16]} justify="center">
        {partnerTypes.map((type) => (
          <Col xs={24} sm={12} key={type.value}>
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                hoverable
                onClick={() => handlePartnerSelect(type.value)}
                style={{
                  textAlign: "center",
                  borderRadius: isMobile ? "12px" : "16px",
                  border: selectedPartnerType === type.value ? `2px solid ${type.color}` : "1px solid #e0e0e0",
                  boxShadow: selectedPartnerType === type.value ? `0 8px 20px ${type.color}20` : "0 4px 12px rgba(0,0,0,0.08)",
                  padding: isMobile ? "16px 12px" : "24px 16px",
                  height: "100%",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  background: selectedPartnerType === type.value ? `${type.color}10` : "#fff",
                }}
                bodyStyle={{ 
                  padding: "12px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "12px"
                }}
              >
                <div style={{ 
                  width: isMobile ? "48px" : "64px", 
                  height: isMobile ? "48px" : "64px", 
                  borderRadius: "12px",
                  background: selectedPartnerType === type.value ? type.color : "#f0f0f0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: selectedPartnerType === type.value ? "#fff" : type.color,
                  fontSize: isMobile ? "20px" : "24px",
                }}>
                  {type.icon}
                </div>
                <div>
                  <Text 
                    strong 
                    style={{ 
                      color: selectedPartnerType === type.value ? type.color : "#333",
                      fontSize: isMobile ? "16px" : "18px",
                      display: "block",
                      marginBottom: "4px"
                    }}
                  >
                    {type.label}
                  </Text>
                  <Text 
                    type="secondary" 
                    style={{ 
                      fontSize: isMobile ? "12px" : "14px",
                      lineHeight: "1.4",
                      display: "block"
                    }}
                  >
                    {type.desc}
                  </Text>
                </div>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>


    </motion.div>
  );

  const renderLoginForm = () => (
    <motion.div
      key="login-form"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
    >
      <div style={{ 
        display: "flex",
        justifyContent:"center", 
        alignItems: "center", 
        marginBottom: "1.5rem",
        cursor: "pointer"
      }}>
        <Button
          type="text"
          onClick={handleBackToSelection}
          style={{ 
            color: "#ffffffff", 
            backgroundColor:"#5C039B",
            padding: "4px 8px",
            height: "auto",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}
        >
          <ArrowLeftOutlined />
          Back
        </Button>
      </div>

      <div style={{ 
        textAlign: "center", 
        marginBottom: "2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px"
      }}>
        <div style={{
          width: "48px",
          height: "48px",
          borderRadius: "12px",
          background: getSelectedPartner()?.color || "#5C039B",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: "20px"
        }}>
          {getSelectedPartner()?.icon}
        </div>
        <div>
          <Title 
            level={isMobile ? 5 : 4} 
            style={{ 
              color: "#5C039B",
              margin: 0,
              fontSize: isMobile ? "18px" : "22px",
              textAlign: "left"
            }}
          >
            Login as {getSelectedPartner()?.label}
          </Title>
          <Text type="secondary" style={{ fontSize: isMobile ? "12px" : "14px" }}>
            Enter your credentials to continue
          </Text>
        </div>
      </div>

      {generalError && (
        <Alert
          message={generalError}
          type="error"
          showIcon
          closable
          onClose={() => setGeneralError("")}
          style={{ 
            marginBottom: "1.5rem", 
            borderRadius: "10px",
            fontSize: "14px",
            border: "none"
          }}
        />
      )}

      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item 
          name="email" 
          label={<span style={{ fontSize: "14px", color: "#5C039B", fontWeight: "600" }}>Email</span>}
          rules={[{ required: true, type: "email" }]}
        >
          <Input 
            size="large" 
            placeholder="you@example.com" 
            style={{ 
              borderRadius: "10px", 
              height: "48px",
              fontSize: "16px",
              borderColor: "#e0e0e0"
            }} 
          />
        </Form.Item>
        <Form.Item 
          name="password" 
          label={<span style={{ fontSize: "14px", color: "#5C039B", fontWeight: "600" }}>Password</span>}
          rules={[{ required: true }]}
        >
          <Input.Password 
            size="large" 
            placeholder="••••••••" 
            style={{ 
              borderRadius: "10px", 
              height: "48px",
              fontSize: "16px",
              borderColor: "#e0e0e0"
            }} 
          />
        </Form.Item>

        <div style={{ display: "flex", gap: "12px", marginTop: "1rem" }}>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            style={{
              flex: 1,
              height: "48px",
              background: getSelectedPartner()?.color || "#5C039B",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: "600",
              border: "none",
              boxShadow: `0 4px 15px ${getSelectedPartner()?.color || "#5C039B"}30`,
            }}
          >
            {loading ? "Signing In..." : "Login Now"}
          </Button>
          
          <Button
            type="default"
            onClick={handleRegister}
            style={{
              height: "48px",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: "600",
              border: `1px solid ${getSelectedPartner()?.color || "#5C039B"}`,
              color: getSelectedPartner()?.color || "#5C039B",
            }}
          >
            Register
          </Button>
        </div>
      </Form>
    </motion.div>
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `url(${loginimage}) center/cover no-repeat fixed`,
        position: "relative",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Dark Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0, 0, 0, 0.65)",
          backdropFilter: "blur(5px)",
        }}
      />

      {/* Success Welcome Banner */}
      {showSuccessBanner && welcomeUser && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
            padding: isMobile ? "0.8rem" : "1rem",
            background: "#ffffff",
            color: "#1f1f1f",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: isMobile ? "0.9rem" : "1.3rem",
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            borderBottom: "4px solid #64EF0A",
          }}
        >
          <CheckCircleFilled style={{
            fontSize: isMobile ? "1.2rem" : "1.8rem",
            marginRight: isMobile ? "6px" : "12px",
            color: "#64EF0A",
          }} />
          Welcome, {welcomeUser.name}! ({welcomeUser.role})
          <br />
          <Text style={{
            fontSize: isMobile ? "0.75rem" : "1rem",
            opacity: 0.8,
            color: "#333333",
          }}>
            Redirecting you to your dashboard...
          </Text>
        </motion.div>
      )}

      {/* Mobile Layout */}
      {isMobile ? (
        <div style={{ 
          minHeight: "100vh", 
          position: "relative", 
          zIndex: 10,
          display: "flex",
          flexDirection: "column"
        }}>
          {/* Header Section */}
          <div style={{
            padding: "1.5rem 1rem 1rem",
            color: "white",
            textAlign: "center",
            flexShrink: 0,
          }}>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
                padding: "1.5rem"
              }}
            >
              <img
                src={logoNew}
                alt="Logo"
                style={{
                  width: logoSize,
                  height: "auto",
                  filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.4))",
                }}
              />
              <Title
                level={2}
                style={{
                  color: "#03A4F4",
                  fontSize: "1.8rem",
                  fontWeight: 800,
                  margin: 0,
                  lineHeight: 1.2
                }}
              >
                Partner Login
              </Title>
              <Text
                style={{
                  fontSize: "0.95rem",
                  opacity: 0.9,
                  display: "block"
                }}
              >
                {!selectedPartnerType
                  ? "Select your partner type to continue"
                  : `Logging in as ${getSelectedPartner()?.label}`}
              </Text>
            </motion.div>
          </div>

          {/* Form Section */}
          <div style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            padding: "0 1rem 1.5rem",
            overflow: "auto"
          }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ 
                width: "100%", 
                maxWidth: "400px"
              }}
            >
              <Card
                style={{
                  width: "100%",
                  borderRadius: "20px",
                  boxShadow: "0 15px 30px rgba(0,0,0,0.25)",
                  background: "rgba(255,255,255,0.98)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
                bodyStyle={{ 
                  padding: cardPadding,
                }}
              >
                {/* Content */}
                {!selectedPartnerType && renderPartnerSelection()}
                {selectedPartnerType && renderLoginForm()}
              </Card>
            </motion.div>
          </div>
        </div>
      ) : (
        /* Desktop Layout */
        <Row style={{ 
          minHeight: "100vh", 
          position: "relative", 
          zIndex: 10 
        }}>
          {/* Left Side - Logo & Text */}
          <Col xs={24} lg={12}>
            <div style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              padding: "2rem",
              color: "white",
            }}>
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "1rem",
                  padding: "1.5rem",
                  maxWidth: "600px",
                  textAlign: "center"
                }}
              >
                <img
                  src={logoNew}
                  alt="Logo"
                  style={{
                    width: logoSize,
                    height: "auto",
                    marginBottom: "2rem",
                    filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.4))",
                  }}
                />
                <Title level={titleLevel} style={{ color: "#03A4F4", fontSize: "3.5rem", fontWeight: 800, margin: 0 }}>
                  Partner Login
                </Title>
                <Text style={{ fontSize: "1.5rem", opacity: 0.9, color: "white", marginBottom: "1rem" }}>
                  {!selectedPartnerType
                    ? "Welcome to the partner network"
                    : `Welcome back, ${getSelectedPartner()?.label}!`}
                </Text>
                
              
              </motion.div>
            </div>
          </Col>

          {/* Right Side - Form */}
          <Col xs={24} lg={12}>
            <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              padding: "2rem",
            }}>
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                style={{ width: "100%", maxWidth: "500px" }}
              >
                <Card
                  style={{
                    width: "100%",
                    borderRadius: "24px",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                    background: "rgba(255,255,255,0.98)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                  bodyStyle={{ padding: "2.5rem" }}
                >
                  {/* Content */}
                  {!selectedPartnerType && renderPartnerSelection()}
                  {selectedPartnerType && renderLoginForm()}
                </Card>
              </motion.div>
            </div>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Login;