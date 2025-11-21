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
} from "antd";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../manageApi/context/AuthContext.jsx";
import loginimage from "../../assets/img/one.png";
import logoNew from "../../assets/img/logoNew.png";
import { toast } from "react-toastify";

const { Title, Text } = Typography;

const Login = () => {
  const [form] = Form.useForm();
  const [activeStep, setActiveStep] = useState(0);
  const [userType, setUserType] = useState("");
  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState("");

  const { login, isAuthenticated, user, token } = useContext(AuthContext);
  const navigate = useNavigate();

  // Auto redirect after login
  useEffect(() => {
    if (isAuthenticated && user && token) {
      const roleCode = user?.role?.code?.toString() || user?.role;
      const roleName = user?.role?.name || "User";

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

      toast.success(`Welcome back, ${user?.name || "User"}! (${roleName})`, {
        style: { background: "#64EF0A", color: "#020202", fontWeight: "bold" },
      });

      navigate(path, { replace: true });
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

  // Normal Login (Email + Password)
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
      setGeneralError(err || "Invalid credentials");
      toast.error(err || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // Customer Login – Mobile Only (Direct Login)
  const onFinishCustomer = async (values) => {
    setLoading(true);
    setGeneralError("");

    try {
      const mobile = values.mobile.toString();

      await login("/users/login/customer", { mobile });

      toast.success("Welcome back, Customer!");
    } catch (err) {
      const msg = err.includes("not found")
        ? "Customer not found. Please register first."
        : err;

      setGeneralError(msg);
      toast.error(msg);
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
      freelancer: "Partner",
      "vendor-b2c": "Vendor (B2C)",
      "vendor-b2b": "Vendor (B2B)",
      supervisor: "Supervisor",
      accountant: "Accountant",
    };
    return map[userType] || "User";
  };

  const isCustomer = userType === "customer";

  return (
    <div style={{
      minHeight: "100vh",
      backgroundImage: `url(${loginimage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      position: "relative",
      fontFamily: "'Poppins', sans-serif",
    }}>
      <div style={{
        position: "absolute",
        inset: 0,
        background: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(8px)",
      }} />

      <div style={{ flex: 1, display: "flex", zIndex: 10 }}>
        {/* Left */}
        <motion.div initial={{ x: -200, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }} style={{
            flex: 1, display: "flex", flexDirection: "column",
            justifyContent: "center", alignItems: "center", padding: "2rem", color: "white", textAlign: "center"
          }}>
          <Title level={1} style={{ color: "#03A4F4", fontWeight: 800, fontSize: "3.5rem" }}>
            Welcome Back!
          </Title>
          <Text style={{ fontSize: "1.6rem", opacity: 0.9 }}>
            {activeStep === 0 ? "Choose your role" : `Login as ${getDisplayName()}`}
          </Text>
          {activeStep === 0 && (
            <motion.img initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring" }} src={logoNew} alt="Logo"
              style={{ width: 200, marginTop: 50, borderRadius: 24 }} />
          )}
        </motion.div>

        {/* Right */}
        <motion.div initial={{ x: 200, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }} style={{
            flex: 1, display: "flex", justifyContent: "center",
            alignItems: "center", padding: "2rem"
          }}>
          <Card style={{ width: "100%", maxWidth: 520, borderRadius: 24, background: "rgba(255,255,255,0.98)" }}
            bodyStyle={{ padding: "48px" }}>

            <Text strong style={{ display: "block", textAlign: "center", marginBottom: 24, fontSize: 16, color: "#5C039B" }}>
              Step {activeStep + 1} of 2
            </Text>

            {generalError && (
              <Alert message={generalError} type="error" showIcon closable
                style={{ marginBottom: 24, borderRadius: 12 }}
                onClose={() => setGeneralError("")} />
            )}

            {/* Step 0 */}
            {activeStep === 0 ? (
              <div>
                <Title level={3} style={{ textAlign: "center", color: "#5C039B", marginBottom: 32 }}>
                  Choose Your Role
                </Title>
                <Radio.Group value={userType} onChange={(e) => setUserType(e.target.value)} style={{ width: "100%" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                    {accountTypes.map((type) => (
                      <Card key={type.value} hoverable onClick={() => setUserType(type.value)}
                        style={{
                          borderRadius: 16,
                          border: userType === type.value ? "3px solid #5C039B" : "1px solid #ddd",
                          boxShadow: userType === type.value ? "0 0 20px rgba(92, 3, 155, 0.2)" : "none",
                        }}>
                        <Radio value={type.value}>
                          <Text strong style={{ fontSize: 20, color: "#5C039B" }}>{type.label}</Text>
                        </Radio>
                        <br />
                        <Text type="secondary">{type.desc}</Text>
                      </Card>
                    ))}
                  </div>
                </Radio.Group>

                <Button type="primary" size="large" block onClick={handleNext} disabled={!userType}
                  style={{ height: 58, fontSize: 18, fontWeight: "bold", marginTop: 32, background: "#5C039B", borderRadius: 16 }}>
                  Continue
                </Button>
              </div>
            ) : (
              /* Step 1 */
              <div>
                <Title level={3} style={{ textAlign: "center", color: "#5C039B", marginBottom: 32 }}>
                  Sign In as {getDisplayName()}
                </Title>

                {isCustomer ? (
                  <Form form={form} onFinish={onFinishCustomer} layout="vertical">
                    <Form.Item name="mobile" label={<span style={{ color: "#5C039B", fontWeight: 600 }}>Mobile Number</span>}
                      rules={[
                        { required: true, message: "Enter mobile number" },
                        { pattern: /^\d{10}$/, message: "Enter valid 10-digit number" },
                      ]}>
                      <InputNumber
                        size="large"
                        placeholder="9876543210"
                        controls={false}
                        style={{ width: "100%", borderRadius: 12, height: 50 }}
                        formatter={(v) => v.replace(/\D/g, "").slice(0, 10)}
                      />
                    </Form.Item>

                    <div style={{ display: "flex", gap: 16, marginTop: 40 }}>
                      <Button onClick={handleBack} style={{ flex: 1, height: 50, borderRadius: 12 }}>Back</Button>
                      <Button type="primary" htmlType="submit" loading={loading}
                        style={{ flex: 2, height: 50, background: "#5C039B", fontWeight: "bold", borderRadius: 12 }}>
                        {loading ? "Logging In..." : "Login Now"}
                      </Button>
                    </div>
                  </Form>
                ) : (
                  <Form form={form} onFinish={onFinishNormal} layout="vertical">
                    <Form.Item name="email" label="Email" rules={[{ required: true }, { type: "email" }]}>
                      <Input size="large" placeholder="you@example.com" style={{ borderRadius: 12, height: 50 }} />
                    </Form.Item>
                    <Form.Item name="password" label="Password" rules={[{ required: true }, { min: 6 }]}>
                      <Input.Password size="large" placeholder="••••••••" style={{ borderRadius: 12, height: 50 }} />
                    </Form.Item>

                    <div style={{ display: "flex", gap: 16, marginTop: 30 }}>
                      <Button onClick={handleBack} style={{ flex: 1, height: 50, borderRadius: 12 }}>Back</Button>
                      <Button type="primary" htmlType="submit" loading={loading}
                        style={{ flex: 2, height: 50, background: "#5C039B", fontWeight: "bold", borderRadius: 12 }}>
                        {loading ? "Signing In..." : "Login Now"}
                      </Button>
                    </div>
                  </Form>
                )}
              </div>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;