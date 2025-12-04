// src/pages/auth/Login.jsx
import React, { useState, useEffect, useContext } from "react";
import {
  Form,
  Input,
  Button,
  Radio,
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
import { CheckCircleFilled } from "@ant-design/icons";

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const OtherLogin = () => {
  const [form] = Form.useForm();
  const [activeStep, setActiveStep] = useState(0);
  const [userType, setUserType] = useState("");
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

  const handleNext = () => {
    if (!userType) {
      setGeneralError("Please select your role");
      return;
    }
    setActiveStep(1);
    setGeneralError("");
  };

  const handleBack = () => {
    setActiveStep(0);
    setUserType("");
    form.resetFields();
    setGeneralError("");
  };

  const handleRegisterRedirect = () => {
    if (!userType) {
      setGeneralError("Please select your role");
      return;
    }
    if (userType === "freelancer") {
      navigate("/freelancer/registration");
    } else {
      message.info(`Registration for ${getDisplayName()} coming soon!`);
    }
  };

  // Fixed error handling - ensure we always return a string
  const onFinishNormal = async (values) => {
    setLoading(true);
    setGeneralError("");
    try {
      let endpoint = "/auth/login";
      if (userType === "freelancer") endpoint = "/freelancer/login";
      else if (userType === "vendor-b2c") endpoint = "/vendor/b2c/login";
      else if (userType === "vendor-b2b") endpoint = "/vendor/b2b/login";
      else if (["supervisor", "accountant"].includes(userType))
        endpoint = "/users/login";

      await login(endpoint, { email: values.email, password: values.password });
    } catch (err) {
      // Ensure we always set a string, not an object
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
      // Ensure we always set a string, not an object
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
    { value: "customer", label: "Customer", desc: "Shop & buy products/services" },
    { value: "freelancer", label: "Xoto Partner", desc: "Earn by providing services" },
    { value: "vendor-b2c", label: "Xoto Vendor (B2C)", desc: "Sell directly to customers" },
    { value: "vendor-b2b", label: "Xoto Vendor (B2B)", desc: "Business-to-business sales" },
    { value: "supervisor", label: "Supervisor", desc: "Manage leads and estimates" },
    { value: "accountant", label: "Accountant", desc: "Handle financial operations" },
  ];

  const getDisplayName = () => {
    const map = {
      customer: "Customer",
      freelancer: "Xoto Partner",
      "vendor-b2c": "Vendor (B2C)",
      "vendor-b2b": "Vendor (B2B)",
      supervisor: "Supervisor",
      accountant: "Accountant",
    };
    return map[userType] || "User";
  };

  const isCustomer = userType === "customer";

  // Responsive grid for account type cards
  const getAccountTypeColProps = () => {
    if (isMobile) return { xs: 24 };
    if (isTablet) return { xs: 12, md: 8 };
    return { xs: 12, sm: 8, md: 8 };
  };

  // Fixed: Ensure all rendered content returns valid React elements
  const renderAccountTypeCards = () => (
    <Radio.Group 
      value={userType} 
      onChange={(e) => setUserType(e.target.value)} 
      style={{ width: "100%" }}
    >
      <Row gutter={[8, 8]}>
        {accountTypes.map((type) => (
          <Col xs={24} key={type.value}>
            <Card
              hoverable
              onClick={() => setUserType(type.value)}
              style={{
                textAlign: "center",
                borderRadius: "10px",
                border: userType === type.value ? "2px solid #5C039B" : "1px solid #ddd",
                boxShadow: userType === type.value ? "0 0 10px rgba(92,3,155,0.2)" : "none",
                padding: "10px",
              }}
              bodyStyle={{ padding: "12px 8px" }}
            >
              <Text 
                strong 
                style={{ 
                  color: userType === type.value ? "#5C039B" : "#333",
                  fontSize: "14px"
                }}
              >
                {type.label}
              </Text>
              <br />
              <Text 
                type="secondary" 
                style={{ 
                  fontSize: "11px",
                  lineHeight: "1.3"
                }}
              >
                {type.desc}
              </Text>
            </Card>
          </Col>
        ))}
      </Row>
    </Radio.Group>
  );

  const renderDesktopAccountTypeCards = () => (
    <Radio.Group 
      value={userType} 
      onChange={(e) => setUserType(e.target.value)} 
      style={{ width: "100%" }}
    >
      <Row gutter={[12, 12]}>
        {accountTypes.map((type) => (
          <Col {...getAccountTypeColProps()} key={type.value}>
            <Card
              hoverable
              onClick={() => setUserType(type.value)}
              style={{
                textAlign: "center",
                borderRadius: "12px",
                border: userType === type.value ? "2px solid #5C039B" : "1px solid #ddd",
                boxShadow: userType === type.value ? "0 0 15px rgba(92,3,155,0.2)" : "none",
                padding: isMobile ? "8px" : "12px",
                height: "100%",
              }}
              bodyStyle={{ padding: isMobile ? "8px" : "12px" }}
            >
              <Text 
                strong 
                style={{ 
                  color: userType === type.value ? "#5C039B" : "#333",
                  fontSize: isMobile ? "12px" : "14px"
                }}
              >
                {type.label}
              </Text>
              <br />
              <Text 
                type="secondary" 
                style={{ 
                  fontSize: isMobile ? "10px" : "0.8rem",
                  lineHeight: isMobile ? "1.2" : "1.4"
                }}
              >
                {type.desc}
              </Text>
            </Card>
          </Col>
        ))}
      </Row>
    </Radio.Group>
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

      {/* Success Welcome Banner (Appears after login) */}
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
          Welcome , {welcomeUser.name}! ({welcomeUser.role})
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

      {/* Mobile Layout: Text on Top, Form Below */}
      {isMobile ? (
        <div style={{ 
          minHeight: "100vh", 
          position: "relative", 
          zIndex: 10,
          display: "flex",
          flexDirection: "column"
        }}>
          {/* Header Section - Always Visible */}
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
                Welcome !
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
                  : `Logging in as ${getDisplayName()}`}
              </Text>
            </motion.div>
          </div>

          {/* Form Section - Scrollable */}
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
                maxWidth: "400px",
                marginTop: activeStep === 1 ? "0" : "0.5rem"
              }}
            >
              <Card
                style={{
                  width: "100%",
                  borderRadius: "16px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                  background: "rgba(255,255,255,0.98)",
                }}
                bodyStyle={{ 
                  padding: cardPadding,
                }}
              >
                {/* Back button for mobile step 1 */}
                {activeStep === 1 && (
                  <Button 
                    onClick={handleBack}
                    type="text"
                    style={{ 
                      marginBottom: "1rem",
                      padding: "4px 0",
                      height: "auto",
                      fontSize: "14px"
                    }}
                  >
                    ← Back to Role Selection
                  </Button>
                )}

                {/* Toggle Login/Register */}
                <div style={{ 
                  textAlign: "center", 
                  marginBottom: "1rem" 
                }}>
                  <Button.Group 
                    size="large" 
                    style={{ width: "100%", display: "flex" }}
                  >
                    <Button
                      type={!isRegisterMode ? "primary" : "default"}
                      onClick={() => {
                        setIsRegisterMode(false);
                        setActiveStep(0);
                      }}
                      style={{
                        flex: 1,
                        borderRadius: "10px 0 0 10px",
                        background: !isRegisterMode ? "#5C039B" : "#f0f0f0",
                        border: "none",
                        height: "42px",
                        fontWeight: "bold",
                        fontSize: "14px",
                      }}
                    >
                      Login
                    </Button>
                    <Button
                      type={isRegisterMode ? "primary" : "default"}
                      onClick={() => setIsRegisterMode(true)}
                      style={{
                        flex: 1,
                        borderRadius: "0 10px 10px 0",
                        background: isRegisterMode ? "#5C039B" : "#f0f0f0",
                        border: "none",
                        height: "42px",
                        fontWeight: "bold",
                        fontSize: "14px",
                      }}
                    >
                      Register
                    </Button>
                  </Button.Group>
                </div>

                {generalError && (
                  <Alert
                    message={generalError}
                    type="error"
                    showIcon
                    closable
                    onClose={() => setGeneralError("")}
                    style={{ 
                      marginBottom: "1rem", 
                      borderRadius: "8px",
                      fontSize: "13px"
                    }}
                  />
                )}

                {/* Step 0: Role Selection */}
                {activeStep === 0 ? (
                  <>
                    <Title 
                      level={5} 
                      style={{ 
                        textAlign: "center", 
                        color: "#5C039B",
                        marginBottom: "0.5rem",
                        fontSize: "16px"
                      }}
                    >
                      {isRegisterMode ? "Choose Account Type" : "Select Your Role"}
                    </Title>

                    {renderAccountTypeCards()}

                    <Button
                      type="primary"
                      size="large"
                      block
                      onClick={isRegisterMode ? handleRegisterRedirect : handleNext}
                      disabled={!userType}
                      style={{
                        marginTop: "1.5rem",
                        height: "44px",
                        background: "#5C039B",
                        borderRadius: "10px",
                        fontWeight: "bold",
                        fontSize: "15px",
                      }}
                    >
                      {isRegisterMode ? "Continue to Register" : "Next"}
                    </Button>
                  </>
                ) : (
                  /* Login Form */
                  <>
                    <Title 
                      level={5} 
                      style={{ 
                        textAlign: "center", 
                        color: "#5C039B",
                        marginBottom: "1rem",
                        fontSize: "16px"
                      }}
                    >
                      Sign In as {getDisplayName()}
                    </Title>

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
                              height: "44px", 
                              borderRadius: "10px",
                              fontSize: "15px"
                            }}
                          />
                        </Form.Item>

                        <Button
                          type="primary"
                          htmlType="submit"
                          loading={loading}
                          block
                          style={{ 
                            height: "44px", 
                            background: "#5C039B", 
                            borderRadius: "10px",
                            fontSize: "15px",
                            fontWeight: "600",
                            marginTop: "0.5rem"
                          }}
                        >
                          Login Now
                        </Button>
                      </Form>
                    ) : (
                      <Form form={form} onFinish={onFinishNormal} layout="vertical">
                        <Form.Item 
                          name="email" 
                          label={<span style={{ fontSize: "14px" }}>Email</span>}
                          rules={[{ required: true, type: "email" }]}
                        >
                          <Input 
                            size="large" 
                            placeholder="you@example.com" 
                            style={{ 
                              borderRadius: "10px", 
                              height: "44px",
                              fontSize: "15px"
                            }} 
                          />
                        </Form.Item>
                        <Form.Item 
                          name="password" 
                          label={<span style={{ fontSize: "14px" }}>Password</span>}
                          rules={[{ required: true }]}
                        >
                          <Input.Password 
                            size="large" 
                            placeholder="••••••••" 
                            style={{ 
                              borderRadius: "10px", 
                              height: "44px",
                              fontSize: "15px"
                            }} 
                          />
                        </Form.Item>

                        <Button
                          type="primary"
                          htmlType="submit"
                          loading={loading}
                          block
                          style={{ 
                            height: "44px", 
                            background: "#5C039B", 
                            borderRadius: "10px",
                            fontSize: "15px",
                            fontWeight: "600"
                          }}
                        >
                          {loading ? "Signing In..." : "Login Now"}
                        </Button>
                      </Form>
                    )}
                  </>
                )}

                <Divider style={{ margin: "1.5rem 0" }} />
                <Text 
                  type="secondary" 
                  style={{ 
                    display: "block", 
                    textAlign: "center",
                    fontSize: "13px"
                  }}
                >
                  {isRegisterMode ? "Already have an account? " : "Don't have an account? "}
                  <Button
                    type="link"
                    onClick={() => {
                      setIsRegisterMode(!isRegisterMode);
                      setActiveStep(0);
                      setUserType("");
                    }}
                    style={{ 
                      color: "#5C039B", 
                      fontWeight: "bold",
                      padding: "0 4px",
                      height: "auto",
                      fontSize: "13px"
                    }}
                  >
                    {isRegisterMode ? "Login Here" : "Register Now"}
                  </Button>
                </Text>
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
                  padding: "1.5rem"
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
                <Title level={titleLevel} style={{ color: "#03A4F4", fontSize: "3rem", fontWeight: 800 }}>
                  Welcome
                </Title>
                <Text style={{ fontSize: "1.3rem", opacity: 0.9, color: "white" }}>
                  {activeStep === 0
                    ? "Choose your role to get started"
                    : `Logging in as ${getDisplayName()}`}
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
                style={{ width: "100%", maxWidth: "480px" }}
              >
                <Card
                  style={{
                    width: "100%",
                    borderRadius: "20px",
                    boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
                    background: "rgba(255,255,255,0.98)",
                  }}
                  bodyStyle={{ padding: cardPadding }}
                >
                  {/* Toggle Login/Register */}
                  <div style={{ 
                    textAlign: "center", 
                    marginBottom: "1.5rem" 
                  }}>
                    <Button.Group 
                      size="large" 
                      style={{ width: "100%", display: "flex" }}
                    >
                      <Button
                        type={!isRegisterMode ? "primary" : "default"}
                        onClick={() => {
                          setIsRegisterMode(false);
                          setActiveStep(0);
                        }}
                        style={{
                          flex: 1,
                          borderRadius: "12px 0 0 12px",
                          background: !isRegisterMode ? "#5C039B" : "#f0f0f0",
                          border: "none",
                          height: "50px",
                          fontWeight: "bold",
                          fontSize: "16px",
                        }}
                      >
                        Login
                      </Button>
                      <Button
                        type={isRegisterMode ? "primary" : "default"}
                        onClick={() => setIsRegisterMode(true)}
                        style={{
                          flex: 1,
                          borderRadius: "0 12px 12px 0",
                          background: isRegisterMode ? "#5C039B" : "#f0f0f0",
                          border: "none",
                          height: "50px",
                          fontWeight: "bold",
                          fontSize: "16px",
                        }}
                      >
                        Register
                      </Button>
                    </Button.Group>
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
                        fontSize: "14px"
                      }}
                    />
                  )}

                  {/* Step 0: Role Selection */}
                  {activeStep === 0 ? (
                    <>
                      <Title 
                        level={4} 
                        style={{ 
                          textAlign: "center", 
                          color: "#5C039B",
                          marginBottom: "1rem"
                        }}
                      >
                        {isRegisterMode ? "Choose Account Type" : "Select Your Role"}
                      </Title>

                      {renderDesktopAccountTypeCards()}

                      <Button
                        type="primary"
                        size="large"
                        block
                        onClick={isRegisterMode ? handleRegisterRedirect : handleNext}
                        disabled={!userType}
                        style={{
                          marginTop: "2rem",
                          height: "50px",
                          background: "#5C039B",
                          borderRadius: "12px",
                          fontWeight: "bold",
                          fontSize: "16px",
                        }}
                      >
                        {isRegisterMode ? "Continue to Register" : "Next"}
                      </Button>
                    </>
                  ) : (
                    /* Login Form */
                    <>
                      <Title 
                        level={4} 
                        style={{ 
                          textAlign: "center", 
                          color: "#5C039B",
                          marginBottom: "1.5rem"
                        }}
                      >
                        Sign In as {getDisplayName()}
                      </Title>

                      {isCustomer ? (
                        <Form form={form} onFinish={onFinishCustomer} layout="vertical">
                          <Form.Item
                            name="mobile"
                            label={<span style={{ color: "#5C039B", fontWeight: 600 }}>Mobile Number</span>}
                            rules={[{ required: true }, { pattern: /^\d{10}$/, message: "10 digits required" }]}
                          >
                            <InputNumber
                              controls={false}
                              placeholder="9876543210"
                              style={{ 
                                width: "100%", 
                                height: "48px", 
                                borderRadius: "10px" 
                              }}
                            />
                          </Form.Item>

                          <div style={{ 
                            display: "flex", 
                            gap: "12px", 
                            marginTop: "1rem",
                            flexDirection: "row"
                          }}>
                            <Button 
                              onClick={handleBack} 
                              style={{ 
                                flex: 1, 
                                height: "48px" 
                              }}
                            >
                              Back
                            </Button>
                            <Button
                              type="primary"
                              htmlType="submit"
                              loading={loading}
                              style={{ 
                                flex: 2, 
                                height: "48px", 
                                background: "#5C039B", 
                                borderRadius: "10px",
                                fontSize: "16px"
                              }}
                            >
                              Login Now
                            </Button>
                          </div>
                        </Form>
                      ) : (
                        <Form form={form} onFinish={onFinishNormal} layout="vertical">
                          <Form.Item 
                            name="email" 
                            label="Email" 
                            rules={[{ required: true, type: "email" }]}
                          >
                            <Input 
                              size="large" 
                              placeholder="you@example.com" 
                              style={{ 
                                borderRadius: "10px", 
                                height: "48px",
                                fontSize: "16px"
                              }} 
                            />
                          </Form.Item>
                          <Form.Item 
                            name="password" 
                            label="Password" 
                            rules={[{ required: true }]}
                          >
                            <Input.Password 
                              size="large" 
                              placeholder="••••••••" 
                              style={{ 
                                borderRadius: "10px", 
                                height: "48px",
                                fontSize: "16px"
                              }} 
                            />
                          </Form.Item>

                          <div style={{ 
                            display: "flex", 
                            gap: "12px", 
                            marginTop: "1rem",
                            flexDirection: "row"
                          }}>
                            <Button 
                              onClick={handleBack} 
                              style={{ 
                                flex: 1, 
                                height: "48px" 
                              }}
                            >
                              Back
                            </Button>
                            <Button
                              type="primary"
                              htmlType="submit"
                              loading={loading}
                              style={{ 
                                flex: 2, 
                                height: "48px", 
                                background: "#5C039B", 
                                borderRadius: "10px",
                                fontSize: "16px"
                              }}
                            >
                              {loading ? "Signing In..." : "Login Now"}
                            </Button>
                          </div>
                        </Form>
                      )}
                    </>
                  )}

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
                      }}
                      style={{ 
                        color: "#5C039B", 
                        fontWeight: "bold",
                        padding: "0 4px",
                        height: "auto"
                      }}
                    >
                      {isRegisterMode ? "Login Here" : "Register Now"}
                    </Button>
                  </Text>
                </Card>
              </motion.div>
            </div>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default OtherLogin;