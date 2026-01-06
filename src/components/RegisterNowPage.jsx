import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { User, Mail, Phone, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Select, Button, message } from "antd";
import { apiService } from "../manageApi/utils/custom.apiservice";

const { Option } = Select;

const countryCodes = [
  { value: "+91", label: "+91 India" },
  { value: "+971", label: "+971 UAE" },
  { value: "+966", label: "+966 Saudi Arabia" },
  { value: "+1", label: "+1 USA/Canada" },
];

const RegisterNowPage = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const [countryCode, setCountryCode] = useState("+971");
  const [mobileNumber, setMobileNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    if (!mobileNumber || mobileNumber.length < 6) {
      return message.error("Please enter a valid mobile number");
    }

    if (data.password !== data.confirmPassword) {
      return message.error("Passwords do not match");
    }

    const signupPayload = {
      name: {
        first_name: data.first_name.trim(),
        last_name: data.last_name.trim(),
      },
      email: data.email.toLowerCase().trim(),
      password: data.password,
      confirm_password: data.confirmPassword,
      mobile: {
        country_code: countryCode,
        number: String(mobileNumber),
      },
      comingFromAiPage: true,
    };

    try {
      setLoading(true);
      await apiService.post("/users/signup/customer", signupPayload);
      message.success("Account created successfully!");
      navigate("/aiPlanner/landscape");
    } catch (err) {
      const apiError = err?.response?.data;

      if (
        apiError?.message?.toLowerCase().includes("already") ||
        apiError?.message?.toLowerCase().includes("exists")
      ) {
        message.warning("Account already exists. Please login.");
        navigate("/user/login");
        return;
      }

      message.error(apiError?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

 return (
  <div className="min-h-screen flex items-center justify-center bg-[#5C039B] py-10 ">
    <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">

      {/* ================= LEFT SIDE ================= */}
      <div className="hidden lg:flex flex-col justify-between p-10 text-white relative bg-[#5C039B]">
        
        {/* Background overlay */}
        <div className="absolute inset-0 bg-black/20"></div>

        <div className="relative z-10">
          <h1 className="text-4xl font-extrabold mb-2">
            <span className="text-green-400">Xoto</span>
          </h1>
          <h2 className="text-3xl font-semibold mt-6">
            Customer Registration
          </h2>
          <p className="mt-3 text-white/80 max-w-sm">
            Create your account to start designing your dream outdoor spaces with AI.
          </p>
        </div>

        <div className="relative z-10 text-sm text-white/70">
          © {new Date().getFullYear()} Xoto. All rights reserved.
        </div>
      </div>

      {/* ================= RIGHT SIDE ================= */}
      <div className="p-8 md:p-12 flex flex-col justify-center">

        {/* HEADER */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Create Account
          </h2>
          <p className="text-gray-500 mt-2">
            Sign up using your details below
          </p>
        </div>

        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>

          {/* NAME */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item
              label="First Name"
              validateStatus={errors.first_name && "error"}
              help={errors.first_name?.message}
            >
              <Controller
                name="first_name"
                control={control}
                rules={{ required: "First name is required" }}
                render={({ field }) => (
                  <Input size="large" prefix={<User />} {...field} />
                )}
              />
            </Form.Item>

            <Form.Item
              label="Last Name"
              validateStatus={errors.last_name && "error"}
              help={errors.last_name?.message}
            >
              <Controller
                name="last_name"
                control={control}
                rules={{ required: "Last name is required" }}
                render={({ field }) => (
                  <Input size="large" prefix={<User />} {...field} />
                )}
              />
            </Form.Item>
          </div>

          {/* EMAIL */}
          <Form.Item
            label="Email Address"
            validateStatus={errors.email && "error"}
            help={errors.email?.message}
          >
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Enter a valid email address",
                },
              }}
              render={({ field }) => (
                <Input size="large" prefix={<Mail />} {...field} />
              )}
            />
          </Form.Item>

          {/* MOBILE */}
          <Form.Item label="Mobile Number" required>
            <div className="flex gap-3">
              <Select
                size="large"
                value={countryCode}
                onChange={setCountryCode}
                className="w-[150px]"
              >
                {countryCodes.map((c) => (
                  <Option key={c.value} value={c.value}>
                    {c.label}
                  </Option>
                ))}
              </Select>

              <Input
                size="large"
                prefix={<Phone />}
                value={mobileNumber}
                onChange={(e) =>
                  setMobileNumber(e.target.value.replace(/\D/g, ""))
                }
                placeholder="9876543210"
                maxLength={15}
              />
            </div>
          </Form.Item>

          {/* PASSWORD */}
          <Form.Item
            label="Password"
            validateStatus={errors.password && "error"}
            help={errors.password?.message}
          >
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              }}
              render={({ field }) => (
                <Input.Password size="large" prefix={<Lock />} {...field} />
              )}
            />
          </Form.Item>

          {/* CONFIRM PASSWORD */}
          <Form.Item
            label="Confirm Password"
            validateStatus={errors.confirmPassword && "error"}
            help={errors.confirmPassword?.message}
          >
            <Controller
              name="confirmPassword"
              control={control}
              rules={{ required: "Confirm your password" }}
              render={({ field }) => (
                <Input.Password size="large" prefix={<Lock />} {...field} />
              )}
            />
          </Form.Item>

          {/* CTA */}
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            size="large"
            className="rounded-xl h-12 text-base font-semibold bg-[#0ea5e9]"
          >
            Create Account
          </Button>

          {/* LOGIN LINK */}
          <div className="text-center mt-6 text-sm">
            <span className="text-gray-500">Already have an account? </span>
            <span
              onClick={() => navigate("/user/login")}
              className="text-[#0ea5e9] font-semibold cursor-pointer hover:underline"
            >
              Login
            </span>
          </div>

        </Form>
      </div>
    </div>
  </div>
);

};

export default RegisterNowPage;
