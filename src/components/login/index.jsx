// src/pages/auth/Login.jsx
import React, { useState, useEffect, useContext } from "react";
import { Form, Input, Button, Radio, Card, Typography, Alert, Checkbox } from "antd";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../manageApi/context/AuthContext.jsx";
import loginimage from "../../assets/img/one.png";
import logoNew from "../../assets/img/logoNew.png";
import { toast } from "react-toastify";

// Custom Theme Override (Your Brand Colors)
const theme = {
  token: {
    colorPrimary: "#5C039B",     // Main Purple
    colorInfo: "#03A4F4",        // Blue for text/links
    colorSuccess: "#64EF0A",     // Green for success
    colorTextBase: "#020202",
    colorBgBase: "#FFFFFF",
  },
};

const { Title, Text } = Typography;

const Login = () => {
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState("login");
  const [activeStep, setActiveStep] = useState(0);
  const [userType, setUserType] = useState("");
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState("");

  const { login, isAuthenticated, user, token } = useContext(AuthContext);
  const navigate = useNavigate();

  // Role-based redirect + Welcome message with Role Name
  useEffect(() => {
    if (isAuthenticated && user && token) {
      const roleName = user?.role?.name || "User";
      const roleCode = user?.role?.code?.toString();

      const rolePathMap = {
        0: "/dashboard/superadmin",
        1: "/dashboard/admin",
        5: "/dashboard/vendor-b2c",
        6: "/dashboard/vendor-b2b",
        7: "/dashboard/freelancer",
      };

      const redirectPath = rolePathMap[roleCode] || "/dashboard";

      toast.success(`Welcome back, ${user?.name || "User"}! (${roleName})`, {
        position: "top-right",
        autoClose: 4000,
        style: {
          background: "#64EF0A",
          color: "#020202",
          fontWeight: "bold",
          fontSize: "16px",
          borderRadius: "12px",
        },
      });

      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, user, token, navigate]);

  const handleNext = () => {
    if (!userType) {
      setGeneralError("Please select an account type");
      return;
    }

    if (activeTab === "register" && userType === "freelancer") {
      navigate("/freelancer/registration");
      return;
    }

    if (activeTab === "register" && userType.includes("vendor")) {
      setActiveTab("login");
    }

    setActiveStep(1);
    setGeneralError("");
  };

  const handleBack = () => {
    setActiveStep(0);
    setGeneralError("");
    form.resetFields();
  };

  const onFinish = async (values) => {
    setLoading(true);
    setGeneralError("");

    try {
      let endpointPath = "/auth/login";
      if (userType === "freelancer") endpointPath = "/freelancer/login";
      else if (userType === "vendor-b2c") endpointPath = "/vendor/b2c/login";
      else if (userType === "vendor-b2b") endpointPath = "/vendor/b2b/login";

      await login(values.email, values.password, endpointPath);
    } catch (err) {
      const errorMsg = err.message || "Invalid email or password. Please try again.";
      setGeneralError(errorMsg);
      toast.error(errorMsg, {
        style: { background: "#ff4d4f", color: "white" },
      });
    } finally {
      setLoading(false);
    }
  };

  const accountTypes = [
    { value: "freelancer", label: "Xoto Partner", desc: "Earn by providing services" },
    { value: "vendor-b2c", label: "Xoto Vendor", desc: "Sell products directly to customers" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${loginimage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        position: "relative",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Dark Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(8px)",
        }}
      />

      <div style={{ flex: 1, display: "flex", zIndex: 10 }}>
        {/* Left Side - Welcome */}
        <motion.div
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "2rem",
            color: "white",
            textAlign: "center",
          }}
        >
          <Title level={1} style={{ color: "#03A4F4", marginBottom: 16, fontWeight: 800, fontSize: "3.5rem" }}>
            {activeTab === "login" ? "Welcome Back!" : "Join Xoto"}
          </Title>
          <Text style={{ fontSize: "1.6rem", color: "#fff", maxWidth: 600, opacity: 0.9 }}>
            {activeStep === 0
              ? "Choose your role to get started"
              : `Login as ${userType === "freelancer" ? "Partner" : "Vendor"}`}
          </Text>

          {activeStep === 0 && (
            <motion.img
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 120 }}
              src={logoNew}
              alt="Xoto Logo"
              style={{
                width: 200,
                marginTop: 50,
                borderRadius: 24,
              }}
            />
          )}
        </motion.div>

        {/* Right Side - Form */}
        <motion.div
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "2rem",
          }}
        >
          <Card
            style={{
              width: "100%",
              maxWidth: 520,
              borderRadius: 24,
              background: "rgba(255, 255, 255, 0.98)",
            }}
            bodyStyle={{ padding: "48px" }}
          >
            {/* Tabs */}
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <Button
                type={activeTab === "login" ? "primary" : "default"}
                size="large"
                style={{
                  width: 150,
                  height: 50,
                  fontWeight: "bold",
                  background: activeTab === "login" ? "#5C039B" : undefined,
                  borderColor: "#5C039B",
                }}
                onClick={() => {
                  setActiveTab("login");
                  setActiveStep(0);
                  setUserType("");
                  form.resetFields();
                  setGeneralError("");
                }}
              >
                Login
              </Button>
              <Button
                type={activeTab === "register" ? "primary" : "default"}
                size="large"
                style={{
                  width: 150,
                  height: 50,
                  fontWeight: "bold",
                  marginLeft: 20,
                  background: activeTab === "register" ? "#5C039B" : undefined,
                  borderColor: "#5C039B",
                }}
                onClick={() => {
                  setActiveTab("register");
                  setActiveStep(0);
                  setUserType("");
                  form.resetFields();
                  setGeneralError("");
                }}
              >
                Register
              </Button>
            </div>

            <Text strong style={{ display: "block", textAlign: "center", marginBottom: 24, fontSize: 16, color: "#5C039B" }}>
              Step {activeStep + 1} of 2
            </Text>

            {generalError && (
              <Alert
                message={generalError}
                type="error"
                showIcon
                style={{ marginBottom: 24, borderRadius: 12 }}
                closable
                onClose={() => setGeneralError("")}
              />
            )}

            {/* Step 0: Select Role */}
            {activeStep === 0 ? (
              <div>
                <Title level={3} style={{ textAlign: "center", color: "#5C039B", marginBottom: 32 }}>
                  Choose Your Role
                </Title>

                <Radio.Group
                  value={userType}
                  onChange={(e) => {
                    setUserType(e.target.value);
                    setGeneralError("");
                  }}
                  style={{ width: "100%" }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                    {accountTypes.map((type) => (
                      <Card
                        key={type.value}
                        hoverable
                        onClick={() => setUserType(type.value)}
                        style={{
                          borderRadius: 16,
                          border: userType === type.value ? "3px solid #5C039B" : "1px solid #ddd",
                          boxShadow: userType === type.value ? "0 0 20px rgba(92, 3, 155, 0.2)" : "none",
                          transition: "all 0.3s",
                        }}
                      >
                        <Radio value={type.value}>
                          <Text strong style={{ fontSize: 20, color: "#5C039B" }}>
                            {type.label}
                          </Text>
                        </Radio>
                        <br />
                        <Text type="secondary" style={{ fontSize: 15 }}>{type.desc}</Text>
                      </Card>
                    ))}
                  </div>
                </Radio.Group>

                <Button
                  type="primary"
                  size="large"
                  block
                  onClick={handleNext}
                  disabled={!userType}
                  style={{
                    height: 58,
                    fontSize: 18,
                    fontWeight: "bold",
                    marginTop: 32,
                    background: "#5C039B",
                    borderColor: "#5C039B",
                    borderRadius: 16,
                  }}
                >
                  Continue →
                </Button>
              </div>
            ) : (
              /* Step 1: Login Form */
              <div>
                <Title level={3} style={{ textAlign: "center", color: "#5C039B", marginBottom: 32 }}>
                  Sign In to Dashboard
                </Title>

                <Form form={form} layout="vertical" onFinish={onFinish}>
                  <Form.Item
                    name="email"
                    label={<span style={{ color: "#5C039B", fontWeight: 600 }}>Email Address</span>}
                    rules={[
                      { required: true, message: "Please enter your email" },
                      { type: "email", message: "Invalid email format" },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="you@example.com"
                      style={{ borderRadius: 12, height: 50 }}
                    />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    label={<span style={{ color: "#5C039B", fontWeight: 600 }}>Password</span>}
                    rules={[
                      { required: true, message: "Please enter your password" },
                      { min: 6, message: "Password must be 6+ characters" },
                    ]}
                  >
                    <Input.Password
                      size="large"
                      placeholder="••••••••"
                      style={{ borderRadius: 12, height: 50 }}
                      iconRender={(visible) => (
                        <span style={{ color: "#5C039B" }}>
                          {visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </span>
                      )}
                    />
                  </Form.Item>

                  <Form.Item name="remember" valuePropName="checked">
                    <Checkbox style={{ color: "#020202" }}>Remember me</Checkbox>
                  </Form.Item>

                  <div style={{ display: "flex", gap: 16, marginTop: 30 }}>
                    <Button size="large" onClick={handleBack} style={{ flex: 1, height: 50, borderRadius: 12 }}>
                      Back
                    </Button>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                      size="large"
                      style={{
                        flex: 2,
                        height: 50,
                        background: "#5C039B",
                        borderColor: "#5C039B",
                        fontWeight: "bold",
                        fontSize: 17,
                        borderRadius: 12,
                      }}
                    >
                      {loading ? "Signing In..." : "Login Now"}
                    </Button>
                  </div>
                </Form>
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;