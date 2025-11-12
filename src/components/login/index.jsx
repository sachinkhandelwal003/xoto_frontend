// src/pages/auth/Login.jsx
import React, { useState, useEffect, useContext } from "react";
import {
  TextField,
  Button,
  Typography,
  Link,
  Box,
  Card,
  CardContent,
  Tabs,
  Tab,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  Stepper,
  Step,
  StepLabel,
  Alert,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../manageApi/context/AuthContext.jsx";
import loginimage from "../../assets/img/one.png";
import logoNew from "../../assets/img/logoNew.png";
import { toast } from "react-toastify";

const Login = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [activeStep, setActiveStep] = useState(0);
  const [userType, setUserType] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const {
    user,
    token,
    loading,
    error: authError,
    login,
    isAuthenticated,
  } = useContext(AuthContext);
  const navigate = useNavigate();

  // === REDIRECT AFTER SUCCESSFUL LOGIN ===
  useEffect(() => {
    if (isAuthenticated && user && token) {
      const roleCode = user?.role?.code?.toString();
      const rolePathMap = {
        0: "/sawtar/dashboard/superadmin",
        1: "/sawtar/dashboard/admin",
        5: "/sawtar/dashboard/vendor-b2c",
        6: "/sawtar/dashboard/vendor-b2b",
        7: "/sawtar/dashboard/freelancer",
      };
      const redirectPath = rolePathMap[roleCode] || "/sawtar/";
      toast.success(`Welcome ${user?.role?.name || "User"}!`);
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, user, token, navigate]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setActiveStep(0);
    setUserType("");
    setErrors({});
    setSuccessMessage("");
    setShowPassword(false);
    setFormData({ email: "", password: "", rememberMe: false });
  };

  const handleNext = () => {
    if (!userType) {
      setErrors({ general: "Please select an account type" });
      return;
    }

    // Freelancer → redirect to registration
    if (activeTab === "register" && userType === "freelancer") {
      navigate("/sawtar/freelancer/registration");
      return;
    }

    // Vendor → no registration, go to login
    if (activeTab === "register" && userType.includes("vendor")) {
      setActiveTab("login");
      setActiveStep(1);
      return;
    }

    setActiveStep(1);
    setErrors({});
  };

  const handleBack = () => {
    setActiveStep(0);
    setErrors({});
    setSuccessMessage("");
    setShowPassword(false);
  };

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
    setErrors({});
    setSuccessMessage("");
    setShowPassword(false);
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    if (errors.general) setErrors((prev) => ({ ...prev, general: "" }));
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!formData.email) newErrors.email = "Email is required";
    else if (!emailRegex.test(formData.email))
      newErrors.email = "Invalid email format";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage("");

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      let loginEndpoint = "";

      // Dynamic API based on userType
      if (userType === "freelancer") {
        loginEndpoint = "/api/freelancer/login";
      } else if (userType === "vendor-b2c") {
        loginEndpoint = "/api/vendor/b2c/login";
      } else if (userType === "vendor-b2b") {
        loginEndpoint = "/api/vendor/b2b/login";
      } else {
        loginEndpoint = "/api/auth/login";
      }

      const response = await login(formData.email, formData.password, loginEndpoint);

      if (response?.success) {
        setSuccessMessage(`Welcome! Redirecting...`);
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors({ general: error.message || "Login failed. Please try again." });
    }
  };

  const steps = ["Select Account Type", "Login"];

  const inputSx = (field) => ({
    "& .MuiInputBase-root": {
      backgroundColor: "#e5e7eb",
      color: "#374151",
      borderRadius: "4px",
      border: errors[field] ? "1px solid #ef4444" : "1px solid #e5e7eb",
      padding: "0.75rem 1rem",
      "&:focus-within": { backgroundColor: "#fff", borderColor: "#6b7280" },
    },
    "& .MuiInputBase-input": { padding: "0.75rem 0" },
    "& .MuiOutlinedInput-notchedOutline": { border: "none" },
  });

  const buttonSx = {
    backgroundColor: "#1976D2",
    color: "#fff",
    fontWeight: "bold",
    textTransform: "none",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    "&:hover": { backgroundColor: "#1565C0" },
    "&:disabled": { backgroundColor: "#9ca3af" },
  };

  const outlineButtonSx = {
    borderColor: "#1976D2",
    color: "#1976D2",
    fontWeight: "bold",
    textTransform: "none",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    "&:hover": { backgroundColor: "rgba(25, 118, 210, 0.08)", borderColor: "#1565C0" },
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundImage: `url(${loginimage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      {/* Left Side */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem",
          color: "#fff",
          backgroundColor: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(4px)",
        }}
      >
        <Box textAlign="center">
          <Typography variant="h3" fontWeight="bold" sx={{ mb: 2 }}>
            {activeTab === "login" ? "Welcome Back!" : "Join Us!"}
          </Typography>
          <Typography variant="h6" sx={{ mb: 3 }}>
            {activeStep === 0
              ? "Select your account type to continue"
              : `${userType.charAt(0).toUpperCase() + userType.slice(1).replace("-", " ")} Login`}
          </Typography>
          {activeStep === 0 && (
            <img
              src={logoNew}
              alt="App Logo"
              style={{
                width: "140px",
                height: "auto",
                marginTop: "1rem",
                objectFit: "contain",
                borderRadius: "12px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
              }}
            />
          )}
        </Box>
      </motion.div>

      {/* Right Side Form */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem",
        }}
      >
        <Card sx={{ maxWidth: 500, width: "100%", p: 4, boxShadow: 8, borderRadius: 4 }}>
          <CardContent>
            <Tabs value={activeTab} onChange={handleTabChange} centered sx={{ mb: 2 }}>
              <Tab label="Login" value="login" />
              <Tab label="Register" value="register" />
            </Tabs>

            <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {errors.general && <Alert severity="error" sx={{ mb: 2 }}>{errors.general}</Alert>}
            {authError && <Alert severity="error" sx={{ mb: 2 }}>{authError}</Alert>}
            {successMessage && <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>}
            {loading && <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}><CircularProgress sx={{ color: "#1976D2" }} /></Box>}

            {/* === STEP 0: Select Account Type === */}
            {activeStep === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Typography variant="h5" align="center" gutterBottom>
                  Select Account Type
                </Typography>

                <RadioGroup value={userType} onChange={handleUserTypeChange} sx={{ gap: 2, mt: 3 }}>
                  {[
                    // { value: "employee", label: "Employee" },
                    // { value: "customer", label: "Customer" },
                    { value: "freelancer", label: "Xoto Partner" },
                    { value: "vendor-b2c", label: " Xoto Vendor" },
                    // { value: "vendor-b2b", label: "Vendor (B2B)" },
                  ].map((type) => (
                    <Card
                      key={type.value}
                      variant="outlined"
                      sx={{
                        p: 2,
                        borderColor: userType === type.value ? "#1976D2" : "divider",
                      }}
                    >
                      <FormControlLabel
                        value={type.value}
                        control={<Radio sx={{ color: "#1976D2" }} />}
                        label={type.label}
                        sx={{ width: "100%", m: 0 }}
                      />
                    </Card>
                  ))}
                </RadioGroup>

                <Box sx={{ mt: 3 }}>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    disabled={!userType}
                    fullWidth
                    sx={buttonSx}
                  >
                    Continue
                  </Button>
                </Box>
              </motion.div>
            ) : (
              /* === STEP 1: Login Form === */
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={!!errors.email}
                    helperText={errors.email}
                    sx={inputSx("email")}
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    error={!!errors.password}
                    helperText={errors.password}
                    sx={inputSx("password")}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handleTogglePasswordVisibility}>
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleInputChange}
                      />
                    }
                    label="Remember me"
                  />

                  <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
                    <Button variant="outlined" onClick={handleBack} sx={outlineButtonSx}>
                      Back
                    </Button>
                    <Button type="submit" variant="contained" disabled={loading} sx={buttonSx}>
                      {loading ? "Logging in..." : "Login"}
                    </Button>
                  </Box>
                </Box>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

export default Login;