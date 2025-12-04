// src/pages/auth/Login.jsx
import React, { useState, useEffect, useContext } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  Alert,
  InputNumber,
  Row,
  Col,
  Divider,
  message,
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
  RocketOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined 
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const Login = () => {
  const [form] = Form.useForm();
  const [activeStep, setActiveStep] = useState(0); // 0: role select, 1: partner select, 2: login form
  const [userType, setUserType] = useState(""); // customer, freelancer
  const [subUserType, setSubUserType] = useState(""); // freelancer, vendor-b2c
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState("");
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [welcomeUser, setWelcomeUser] = useState(null);

  const { login, isAuthenticated, user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const screens = useBreakpoint();

  // Responsive values
  const isMobile = !screens.md;
  const isTablet = !screens.lg;
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

  const handleRoleSelect = (type) => {
    setUserType(type);
    setSubUserType("");
    setGeneralError("");
    
    // If Xoto Partner in register mode, go to partner selection
    if (type === "freelancer" && isRegisterMode) {
      setActiveStep(1);
    } else if (type === "customer" && isRegisterMode) {
      // Direct navigation for customer registration
      navigate("/customer/registration", { replace: true });
    } else if (!isRegisterMode) {
      // For login mode, go to login form
      setActiveStep(type === "freelancer" ? 1 : 2);
    }
  };

  const handlePartnerSelect = (type) => {
    setSubUserType(type);
    setGeneralError("");
    
    if (isRegisterMode) {
      // For registration, navigate directly
      if (type === "freelancer") {
        navigate("/freelancer/registration", { replace: true });
      } else if (type === "vendor-b2c") {
        navigate("/ecommerce/seller", { replace: true });
      }
    } else {
      // For login, go to login form
      setActiveStep(2);
    }
  };

  const handleBack = () => {
    if (activeStep === 2) {
      // If on login form, go back to partner selection or role selection
      if (userType === "freelancer") {
        setActiveStep(1);
      } else {
        setActiveStep(0);
        setUserType("");
      }
    } else if (activeStep === 1) {
      // If on partner selection, go back to role selection
      setActiveStep(0);
      setUserType("");
      setSubUserType("");
    }
    form.resetFields();
    setGeneralError("");
  };

  const onFinishNormal = async (values) => {
    setLoading(true);
    setGeneralError("");
    try {
      let endpoint = "/auth/login";
      
      // Determine endpoint based on user type
      if (userType === "freelancer") {
        if (subUserType === "freelancer") {
          endpoint = "/freelancer/login";
        } else if (subUserType === "vendor-b2c") {
          endpoint = "/vendor/b2c/login";
        }
      }
      
      await login(endpoint, { email: values.email, password: values.password });
    } catch (err) {
      const errorMessage = typeof err === 'object' 
        ? err.message || err.status || 'Invalid credentials' 
        : err || 'Invalid credentials';
      setGeneralError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const onFinishCustomer = async (values) => {
    setLoading(true);
    setGeneralError("");
    try {
      const mobile = values.mobile.toString();
      await login("/users/login/customer", { mobile });
    } catch (err) {
      const errorMessage = typeof err === 'object' 
        ? err.message || err.status || 'Login failed'
        : err || 'Login failed';
      
      const msg = errorMessage.includes("not found")
        ? "Customer not found. Please register first."
        : errorMessage;
      setGeneralError(msg);
    } finally {
      setLoading(false);
    }
  };

  const accountTypes = [
    { 
      value: "customer", 
      label: "Customer", 
      desc: "Shop & buy products/services",
      icon: <UserOutlined style={{ fontSize: isMobile ? "20px" : "24px" }} />,
      color: "#1890ff"
    },
    { 
      value: "freelancer", 
      label: "Xoto Partner", 
      desc: "Earn by providing services",
      icon: <RocketOutlined style={{ fontSize: isMobile ? "20px" : "24px" }} />,
      color: "#5C039B"
    },
  ];

  const partnerTypes = [
    {
      value: "freelancer",
      label: "Execution Partner",
      desc: "Provide services and expertise",
      icon: <UserOutlined style={{ fontSize: "24px" }} />,
      color: "#5C039B"
    },
    {
      value: "vendor-b2c",
      label: "Xoto Vendor",
      desc: "Sell products directly to customers",
      icon: <ShopOutlined style={{ fontSize: "24px" }} />,
      color: "#1890ff"
    }
  ];

  const getDisplayName = () => {
    if (userType === "freelancer" && subUserType) {
      const map = {
        "freelancer": "Xoto Freelancer",
        "vendor-b2c": "Xoto Vendor",
      };
      return map[subUserType] || "Xoto Partner";
    }
    const map = {
      customer: "Customer",
      freelancer: "Xoto Partner",
    };
    return map[userType] || "User";
  };

  const isCustomer = userType === "customer";

  const renderRoleSelection = () => (
    <motion.div
      key="role-selection"
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
        {isRegisterMode ? "Choose Account Type" : "Select Your Role"}
      </Title>

      <Row gutter={[isMobile ? 8 : 16, isMobile ? 8 : 16]} justify="center">
        {accountTypes.map((type) => (
          <Col xs={24} sm={12} key={type.value}>
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                hoverable
                onClick={() => handleRoleSelect(type.value)}
                style={{
                  textAlign: "center",
                  borderRadius: isMobile ? "12px" : "16px",
                  border: userType === type.value ? `2px solid ${type.color}` : "1px solid #e0e0e0",
                  boxShadow: userType === type.value ? `0 8px 20px ${type.color}20` : "0 4px 12px rgba(0,0,0,0.08)",
                  padding: isMobile ? "16px 12px" : "24px 16px",
                  height: "100%",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  background: userType === type.value ? `${type.color}10` : "#fff",
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
                  background: userType === type.value ? type.color : "#f0f0f0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: userType === type.value ? "#fff" : type.color,
                  fontSize: isMobile ? "20px" : "24px",
                }}>
                  {type.icon}
                </div>
                <div>
                  <Text 
                    strong 
                    style={{ 
                      color: userType === type.value ? type.color : "#333",
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

      {!isRegisterMode && userType && (
        <Button
          type="primary"
          size="large"
          block
          onClick={() => setActiveStep(userType === "freelancer" ? 1 : 2)}
          style={{
            marginTop: "2rem",
            height: isMobile ? "48px" : "56px",
            background: "#5C039B",
            borderRadius: "12px",
            fontWeight: "bold",
            fontSize: isMobile ? "16px" : "18px",
            border: "none",
            boxShadow: "0 4px 15px rgba(92,3,155,0.3)",
          }}
        >
          Continue <ArrowRightOutlined />
        </Button>
      )}
    </motion.div>
  );

  const renderPartnerSelection = () => (
    <motion.div
      key="partner-selection"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="" style={{ 
        display: "flex",
        justifyContent:"center", 
        alignItems: "center", 
        marginBottom: "1.5rem",
        cursor: "pointer"
      }}>
        <Button
          type="text"
          onClick={handleBack}
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
        Choose how you want to partner with Xoto
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
                  border: subUserType === type.value ? `2px solid ${type.color}` : "1px solid #e0e0e0",
                  boxShadow: subUserType === type.value ? `0 8px 20px ${type.color}20` : "0 4px 12px rgba(0,0,0,0.08)",
                  padding: isMobile ? "16px 12px" : "24px 12px",
                  height: "100%",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  background: subUserType === type.value ? `${type.color}10` : "#fff",
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
                  background: subUserType === type.value ? type.color : "#f0f0f0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: subUserType === type.value ? "#fff" : type.color,
                  fontSize: isMobile ? "20px" : "24px",
                }}>
                  {type.icon}
                </div>
                <div>
                  <Text 
                    strong 
                    style={{ 
                      color: subUserType === type.value ? type.color : "#333",
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

      {!isRegisterMode && subUserType && (
        <Button
          type="primary"
          size="large"
          block
          onClick={() => setActiveStep(2)}
          style={{
            marginTop: "2rem",
            height: isMobile ? "48px" : "56px",
            background: "#5C039B",
            borderRadius: "12px",
            fontWeight: "bold",
            fontSize: isMobile ? "16px" : "18px",
            border: "none",
            boxShadow: "0 4px 15px rgba(92,3,155,0.3)",
          }}
        >
          Continue to Login <ArrowRightOutlined />
        </Button>
      )}
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
    <div className="" style={{ 
        display: "flex",
        justifyContent:"center", 
        alignItems: "center", 
        marginBottom: "1.5rem",
        cursor: "pointer"
      }}>
        <Button
          type="text"
          onClick={handleBack}
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
          background: "#f0f0f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#5C039B",
          fontSize: "20px"
        }}>
          {userType === "freelancer" ? <RocketOutlined /> : <UserOutlined />}
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
            Sign In as {getDisplayName()}
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

      {isCustomer ? (
        <Form form={form} onFinish={onFinishCustomer} layout="vertical">
          <Form.Item
            name="mobile"
            label={<span style={{ color: "#5C039B", fontWeight: 600, fontSize: "14px" }}>Mobile Number</span>}
            rules={[{ required: true }, { pattern: /^\d{10}$/, message: "10 digits required" }]}
          >
            <InputNumber
              controls={false}
              placeholder="9876543210"
              style={{ 
                width: "100%", 
                height: "48px", 
                borderRadius: "10px",
                fontSize: "16px",
                borderColor: "#e0e0e0"
              }}
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            style={{ 
              height: "48px", 
              background: "#5C039B", 
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: "600",
              marginTop: "1rem",
              border: "none",
              boxShadow: "0 4px 15px rgba(92,3,155,0.3)",
            }}
          >
            {loading ? "Signing In..." : "Login Now"}
          </Button>
        </Form>
      ) : (
        <Form form={form} onFinish={onFinishNormal} layout="vertical">
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

          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            style={{ 
              height: "48px", 
              background: "#5C039B", 
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: "600",
              border: "none",
              boxShadow: "0 4px 15px rgba(92,3,155,0.3)",
            }}
          >
            {loading ? "Signing In..." : "Login Now"}
          </Button>
        </Form>
      )}
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
                Welcome!
              </Title>
              <Text
                style={{
                  fontSize: "0.95rem",
                  opacity: 0.9,
                  display: "block"
                }}
              >
                {activeStep === 0
                  ? "Choose your role to get started"
                  : activeStep === 1
                  ? "Select partner type"
                  : `Logging in as ${getDisplayName()}`}
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
                {/* Toggle Login/Register */}
                <div style={{ 
                  textAlign: "center", 
                  marginBottom: "1.5rem" 
                }}>
                  <Button.Group 
                    size="large" 
                    style={{ 
                      width: "100%", 
                      display: "flex",
                      borderRadius: "12px",
                      overflow: "hidden",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                    }}
                  >
                    <Button
                      type={!isRegisterMode ? "primary" : "default"}
                      onClick={() => {
                        setIsRegisterMode(false);
                        setActiveStep(0);
                        setUserType("");
                        setSubUserType("");
                      }}
                      style={{
                        flex: 1,
                        borderRadius: "12px 0 0 12px",
                        background: !isRegisterMode ? "#5C039B" : "#f5f5f5",
                        border: "none",
                        height: "44px",
                        fontWeight: "bold",
                        fontSize: "15px",
                        color: !isRegisterMode ? "#fff" : "#666",
                      }}
                    >
                      Login
                    </Button>
                    <Button
                      type={isRegisterMode ? "primary" : "default"}
                      onClick={() => {
                        setIsRegisterMode(true);
                        setActiveStep(0);
                        setUserType("");
                        setSubUserType("");
                      }}
                      style={{
                        flex: 1,
                        borderRadius: "0 12px 12px 0",
                        background: isRegisterMode ? "#5C039B" : "#f5f5f5",
                        border: "none",
                        height: "44px",
                        fontWeight: "bold",
                        fontSize: "15px",
                        color: isRegisterMode ? "#fff" : "#666",
                      }}
                    >
                      Register
                    </Button>
                  </Button.Group>
                </div>

                {/* Step Content */}
                {activeStep === 0 && renderRoleSelection()}
                {activeStep === 1 && renderPartnerSelection()}
                {activeStep === 2 && renderLoginForm()}

                {/* Register/Login Switch Link */}
                {(activeStep === 0 || activeStep === 1) && (
                  <>
                    <Divider style={{ margin: "1.5rem 0" }} />
                    <Text 
                      type="secondary" 
                      style={{ 
                        display: "block", 
                        textAlign: "center",
                        fontSize: "14px"
                      }}
                    >
                      {isRegisterMode ? "Already have an account? " : "Don't have an account? "}
                      <Button
                        type="link"
                        onClick={() => {
                          setIsRegisterMode(!isRegisterMode);
                          setActiveStep(0);
                          setUserType("");
                          setSubUserType("");
                        }}
                        style={{ 
                          color: "#5C039B", 
                          fontWeight: "bold",
                          padding: "0 4px",
                          height: "auto",
                          fontSize: "14px"
                        }}
                      >
                        {isRegisterMode ? "Login Here" : "Register Now"}
                      </Button>
                    </Text>
                  </>
                )}
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
                  Welcome
                </Title>
                <Text style={{ fontSize: "1.5rem", opacity: 0.9, color: "white", marginBottom: "1rem" }}>
                  {activeStep === 0
                    ? "Join our growing community"
                    : activeStep === 1
                    ? "Choose your partner path"
                    : `Welcome back, ${getDisplayName()}!`}
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
                  {/* Toggle Login/Register */}
                  <div style={{ 
                    textAlign: "center", 
                    marginBottom: "2rem" 
                  }}>
                    <Button.Group 
                      size="large" 
                      style={{ 
                        width: "100%", 
                        display: "flex",
                        borderRadius: "16px",
                        overflow: "hidden",
                        boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
                      }}
                    >
                      <Button
                        type={!isRegisterMode ? "primary" : "default"}
                        onClick={() => {
                          setIsRegisterMode(false);
                          setActiveStep(0);
                          setUserType("");
                          setSubUserType("");
                        }}
                        style={{
                          flex: 1,
                          borderRadius: "16px 0 0 16px",
                          background: !isRegisterMode ? "#5C039B" : "#f5f5f5",
                          border: "none",
                          height: "56px",
                          fontWeight: "bold",
                          fontSize: "18px",
                          color: !isRegisterMode ? "#fff" : "#666",
                        }}
                      >
                        Login
                      </Button>
                      <Button
                        type={isRegisterMode ? "primary" : "default"}
                        onClick={() => {
                          setIsRegisterMode(true);
                          setActiveStep(0);
                          setUserType("");
                          setSubUserType("");
                        }}
                        style={{
                          flex: 1,
                          borderRadius: "0 16px 16px 0",
                          background: isRegisterMode ? "#5C039B" : "#f5f5f5",
                          border: "none",
                          height: "56px",
                          fontWeight: "bold",
                          fontSize: "18px",
                          color: isRegisterMode ? "#fff" : "#666",
                        }}
                      >
                        Register
                      </Button>
                    </Button.Group>
                  </div>

                  {/* Step Content */}
                  {activeStep === 0 && renderRoleSelection()}
                  {activeStep === 1 && renderPartnerSelection()}
                  {activeStep === 2 && renderLoginForm()}

             
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