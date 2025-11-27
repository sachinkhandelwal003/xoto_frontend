// components/freelancer/UpdateFreelancerProfile.jsx
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { apiService } from "../../../../../../manageApi/utils/custom.apiservice";
import { showToast } from "../../../../../../manageApi/utils/toast";
import {
  Form,
  Input,
  Button,
  Card,
  Row,
  Col,
  Select,
  InputNumber,
  Upload,
  Avatar,
  Tag,
  Divider,
  Space,
  Typography,
  Switch,
  DatePicker,
  message,
  Spin,
  Descriptions,
  Badge,
  Tabs,
  List,
  Image,
  Modal,
  Progress
} from "antd";
import {
  UserOutlined,
  EditOutlined,
  SaveOutlined,
  PlusOutlined,
  DeleteOutlined,
  UploadOutlined,
  EyeOutlined,
  CheckOutlined,
  CloseOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  SolutionOutlined,
  DollarCircleOutlined,
  FileTextOutlined,
  GlobalOutlined,
  ToolFilled,
  TrophyOutlined
} from "@ant-design/icons";
import moment from "moment";

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TextArea } = Input;
const { TabPane } = Tabs;

const UpdateFreelancerProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  
  const [freelancer, setFreelancer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [activeTab, setActiveTab] = useState("basic");
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [subcategoryLoading, setSubcategoryLoading] = useState(false);

  // Fetch freelancer profile and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [profileRes, categoriesRes] = await Promise.all([
          apiService.get("/freelancer/profile"),
          fetchCategories()
        ]);

        if (profileRes.success) {
          setFreelancer(profileRes.freelancer);
          // Set form values
          form.setFieldsValue(formatFormData(profileRes.freelancer));
        }

        if (categoriesRes) {
          setCategories(categoriesRes);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        showToast("Failed to load profile data", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [form]);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      setCategoryLoading(true);
      const response = await apiService.get("/freelancer/category?active=true");
      console.log("Categories API Response:", response);
      
      if (response.data) {
        return response.data.map(c => ({ 
          value: c._id, 
          label: c.name,
          ...c 
        }));
      }
      return [];
    } catch (error) {
      console.error("Error fetching categories:", error);
      showToast("Failed to load categories", "error");
      return [];
    } finally {
      setCategoryLoading(false);
    }
  };

  // Fetch subcategories
  const fetchSubcategories = async (categoryId) => {
    if (!categoryId) {
      setSubcategories([]);
      return;
    }

    try {
      setSubcategoryLoading(true);
      const response = await apiService.get(`/freelancer/subcategory?category=${categoryId}`);
      console.log("Subcategories API Response:", response);
      
      if (response.data) {
        const subs = response.data.map(s => ({ 
          value: s._id, 
          label: s.name,
          ...s 
        }));
        setSubcategories(subs);
      } else {
        setSubcategories([]);
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      showToast("Failed to load subcategories", "error");
      setSubcategories([]);
    } finally {
      setSubcategoryLoading(false);
    }
  };

  // Handle category change in services
  const handleCategoryChange = (value, fieldName) => {
    console.log("Category changed:", value, "for field:", fieldName);
    fetchSubcategories(value);
    
    // Reset subcategories when category changes
    const currentServices = form.getFieldValue('services') || [];
    const fieldIndex = parseInt(fieldName.split('.')[1]);
    
    if (currentServices[fieldIndex]) {
      currentServices[fieldIndex].subcategories = [];
      form.setFieldsValue({ services: currentServices });
    }
  };

  // Format data for form
  const formatFormData = (data) => {
    return {
      // Basic Information
      firstName: data.name?.first_name,
      lastName: data.name?.last_name,
      mobile: data.mobile?.number ? `${data.mobile.country_code} ${data.mobile.number}` : '',
      languages: data.languages || [],
      
      // Professional Details
      experienceYears: data.professional?.experience_years,
      availability: data.professional?.availability,
      workingRadius: data.professional?.working_radius,
      bio: data.professional?.bio,
      skills: data.professional?.skills?.join(', ') || '',
      
      // Location
      city: data.location?.city,
      state: data.location?.state,
      country: data.location?.country,
      pincode: data.location?.pincode,
      
      // Payment
      preferredMethod: data.payment?.preferred_method,
      advancePercentage: data.payment?.advance_percentage,
      gstNumber: data.payment?.gst_number,
      
      // Services
      services: data.services_offered?.map(service => ({
        category: service.category?._id || service.category,
        subcategories: service.subcategories?.map(sub => sub._id || sub) || [],
        description: service.description,
        priceRange: service.price_range,
        unit: service.unit,
        isActive: service.is_active !== false
      })) || [],
      
      // Portfolio
      portfolio: data.portfolio?.map(item => ({
        title: item.title,
        category: item.category?._id || item.category,
        subcategory: item.subcategory?._id || item.subcategory,
        description: item.description,
        area: item.area,
        duration: item.duration,
        clientName: item.client_name,
        completedAt: item.completed_at ? moment(item.completed_at) : null,
        featured: item.featured || false
      })) || []
    };
  };

  // Handle form submission
  const onFinish = async (values) => {
    try {
      setSaving(true);
      
      const payload = {
        name: {
          first_name: values.firstName,
          last_name: values.lastName
        },
        mobile: values.mobile,
        languages: values.languages,
        professional: {
          experience_years: values.experienceYears,
          availability: values.availability,
          working_radius: values.workingRadius,
          bio: values.bio,
          skills: values.skills.split(',').map(skill => skill.trim()).filter(skill => skill)
        },
        location: {
          city: values.city,
          state: values.state,
          country: values.country,
          pincode: values.pincode
        },
        payment: {
          preferred_method: values.preferredMethod,
          advance_percentage: values.advancePercentage,
          gst_number: values.gstNumber
        },
        services_offered: values.services?.map(service => ({
          category: service.category,
          subcategories: service.subcategories,
          description: service.description,
          price_range: service.priceRange,
          unit: service.unit,
          is_active: service.isActive
        })) || [],
        portfolio: values.portfolio?.map(item => ({
          title: item.title,
          category: item.category,
          subcategory: item.subcategory,
          description: item.description,
          area: item.area,
          duration: item.duration,
          client_name: item.clientName,
          completed_at: item.completedAt?.toISOString(),
          featured: item.featured
        })) || []
      };

      console.log("Submitting payload:", payload);

      const response = await apiService.put("/freelancer/profile", payload);
      
      if (response.success) {
        showToast("Profile updated successfully!", "success");
        setFreelancer(response.freelancer);
      } else {
        showToast(response.message || "Failed to update profile", "error");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      showToast("Failed to update profile", "error");
    } finally {
      setSaving(false);
    }
  };

  // Handle file upload
  const handleFileUpload = async (file, type) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    try {
      const response = await apiService.post("/freelancer/upload", formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      if (response.success) {
        showToast(`File uploaded successfully`, "success");
        return response.filePath;
      }
    } catch (error) {
      console.error("Upload error:", error);
      showToast("File upload failed", "error");
    }
    return null;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Space direction="vertical" align="center" size="large">
          <Spin size="large" />
          <Text>Loading your profile...</Text>
        </Space>
      </div>
    );
  }

  if (!freelancer) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="text-center">
          <Title level={3} type="danger">Profile Not Found</Title>
          <Text>Unable to load your freelancer profile.</Text>
          <div className="mt-4">
            <Button type="primary" onClick={() => navigate("/dashboard/freelancer")}>
              Back to Dashboard
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Card className="mb-6 shadow-sm border-0 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center space-x-4 mb-4 lg:mb-0">
              <Avatar
                size={80}
                src={freelancer.profile_image ? `http://localhost:5000/${freelancer.profile_image}` : undefined}
                icon={<UserOutlined />}
                className="border-4 border-white shadow-lg"
              />
              <div>
                <Title level={2} className="m-0 text-gray-800">
                  {freelancer.name?.first_name} {freelancer.name?.last_name}
                </Title>
                <Text type="secondary" className="text-lg">
                  Professional Landscape Designer
                </Text>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge 
                    status={freelancer.status_info?.status === 1 ? "success" : "processing"} 
                    text={freelancer.status_info?.status === 1 ? "Verified" : "Pending Approval"} 
                  />
                  <Tag color="blue">
                    {freelancer.professional?.experience_years || 0} years experience
                  </Tag>
                  <Tag color="green">
                    {freelancer.professional?.availability || "Full-time"}
                  </Tag>
                </div>
              </div>
            </div>
            <Space>
              <Button 
                icon={<EyeOutlined />}
                onClick={() => navigate("/dashboard/freelancer/profile")}
              >
                View Profile
              </Button>
              <Button 
                type="primary" 
                icon={<SaveOutlined />}
                loading={saving}
                onClick={() => form.submit()}
              >
                Save Changes
              </Button>
            </Space>
          </div>
        </Card>

        {/* Main Form */}
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          size="large"
        >
          <Card className="shadow-sm border-0">
            <Tabs
              activeKey={activeTab}
              onChange={setActiveTab}
              type="card"
              items={[
                {
                  key: "basic",
                  label: (
                    <span>
                      <UserOutlined className="mr-2" />
                      Basic Information
                    </span>
                  ),
                  children: (
                    <div className="p-4">
                      <Row gutter={[24, 16]}>
                        <Col xs={24} md={12}>
                          <Form.Item
                            label="First Name"
                            name="firstName"
                            rules={[{ required: true, message: 'Please enter your first name' }]}
                          >
                            <Input 
                              prefix={<UserOutlined />}
                              placeholder="Enter your first name"
                            />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                          <Form.Item
                            label="Last Name"
                            name="lastName"
                            rules={[{ required: true, message: 'Please enter your last name' }]}
                          >
                            <Input 
                              prefix={<UserOutlined />}
                              placeholder="Enter your last name"
                            />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                          <Form.Item
                            label="Mobile Number"
                            name="mobile"
                            rules={[{ required: true, message: 'Please enter your mobile number' }]}
                          >
                            <Input 
                              prefix={<PhoneOutlined />}
                              placeholder="+1 234 567 8900"
                            />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                          <Form.Item
                            label="Email"
                          >
                            <Input 
                              prefix={<MailOutlined />}
                              value={freelancer.email}
                              disabled
                            />
                          </Form.Item>
                        </Col>
                        <Col xs={24}>
                          <Form.Item
                            label="Languages"
                            name="languages"
                          >
                            <Select
                              mode="multiple"
                              placeholder="Select languages you speak"
                              optionFilterProp="children"
                            >
                              <Option value="english">English</Option>
                              <Option value="arabic">Arabic</Option>
                              <Option value="hindi">Hindi</Option>
                              <Option value="french">French</Option>
                              <Option value="spanish">Spanish</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>
                    </div>
                  ),
                },
                {
                  key: "professional",
                  label: (
                    <span>
                      <SolutionOutlined className="mr-2" />
                      Professional Details
                    </span>
                  ),
                  children: (
                    <div className="p-4">
                      <Row gutter={[24, 16]}>
                        <Col xs={24} md={8}>
                          <Form.Item
                            label="Years of Experience"
                            name="experienceYears"
                            rules={[{ required: true, message: 'Please enter years of experience' }]}
                          >
                            <InputNumber
                              min={0}
                              max={50}
                              className="w-full"
                              placeholder="5"
                            />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                          <Form.Item
                            label="Availability"
                            name="availability"
                            rules={[{ required: true, message: 'Please select availability' }]}
                          >
                            <Select placeholder="Select availability">
                              <Option value="Full-time">Full-time</Option>
                              <Option value="Part-time">Part-time</Option>
                              <Option value="Project-based">Project-based</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                          <Form.Item
                            label="Working Radius"
                            name="workingRadius"
                          >
                            <Input placeholder="e.g., 50km, City-wide" />
                          </Form.Item>
                        </Col>
                        <Col xs={24}>
                          <Form.Item
                            label="Professional Bio"
                            name="bio"
                            rules={[{ required: true, message: 'Please enter your professional bio' }]}
                          >
                            <TextArea
                              rows={4}
                              placeholder="Describe your expertise, experience, and what makes you unique..."
                              showCount
                              maxLength={1000}
                            />
                          </Form.Item>
                        </Col>
                        <Col xs={24}>
                          <Form.Item
                            label="Skills (comma separated)"
                            name="skills"
                            tooltip="Separate multiple skills with commas"
                          >
                            <Input placeholder="e.g., Landscape Design, Irrigation Systems, Plant Selection" />
                          </Form.Item>
                        </Col>
                      </Row>
                    </div>
                  ),
                },
                {
                  key: "location",
                  label: (
                    <span>
                      <EnvironmentOutlined className="mr-2" />
                      Location
                    </span>
                  ),
                  children: (
                    <div className="p-4">
                      <Row gutter={[24, 16]}>
                        <Col xs={24} md={8}>
                          <Form.Item
                            label="City"
                            name="city"
                            rules={[{ required: true, message: 'Please enter your city' }]}
                          >
                            <Input placeholder="Enter your city" />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                          <Form.Item
                            label="State"
                            name="state"
                            rules={[{ required: true, message: 'Please enter your state' }]}
                          >
                            <Input placeholder="Enter your state" />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                          <Form.Item
                            label="Country"
                            name="country"
                            rules={[{ required: true, message: 'Please enter your country' }]}
                          >
                            <Input placeholder="Enter your country" />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                          <Form.Item
                            label="Pincode"
                            name="pincode"
                          >
                            <Input placeholder="Enter pincode" />
                          </Form.Item>
                        </Col>
                      </Row>
                    </div>
                  ),
                },
                {
                  key: "services",
                  label: (
                    <span>
                      <ToolFilled className="mr-2" />
                      Services Offered
                    </span>
                  ),
                  children: (
                    <div className="p-4">
                      <Form.List name="services">
                        {(fields, { add, remove }) => (
                          <>
                            {fields.map(({ key, name, ...restField }) => (
                              <Card 
                                key={key} 
                                className="mb-4 border border-gray-200"
                                title={`Service ${name + 1}`}
                                extra={
                                  <Button
                                    type="text"
                                    danger
                                    icon={<DeleteOutlined />}
                                    onClick={() => remove(name)}
                                  >
                                    Remove
                                  </Button>
                                }
                              >
                                <Row gutter={[16, 16]}>
                                  <Col xs={24} md={12}>
                                    <Form.Item
                                      {...restField}
                                      label="Category"
                                      name={[name, 'category']}
                                      rules={[{ required: true, message: 'Please select category' }]}
                                    >
                                      <Select 
                                        placeholder="Select service category"
                                        loading={categoryLoading}
                                        onChange={(value) => handleCategoryChange(value, `services[${name}].category`)}
                                      >
                                        {categories.map(cat => (
                                          <Option key={cat.value} value={cat.value}>
                                            {cat.label}
                                          </Option>
                                        ))}
                                      </Select>
                                    </Form.Item>
                                  </Col>
                                  <Col xs={24} md={12}>
                                    <Form.Item
                                      {...restField}
                                      label="Subcategories"
                                      name={[name, 'subcategories']}
                                      rules={[{ required: true, message: 'Please select at least one subcategory' }]}
                                    >
                                      <Select 
                                        mode="multiple"
                                        placeholder="Select subcategories"
                                        loading={subcategoryLoading}
                                        disabled={subcategoryLoading || !form.getFieldValue(['services', name, 'category'])}
                                      >
                                        {subcategories.map(sub => (
                                          <Option key={sub.value} value={sub.value}>
                                            {sub.label}
                                          </Option>
                                        ))}
                                      </Select>
                                    </Form.Item>
                                  </Col>
                                  <Col xs={24}>
                                    <Form.Item
                                      {...restField}
                                      label="Service Description"
                                      name={[name, 'description']}
                                      rules={[{ required: true, message: 'Please enter service description' }]}
                                    >
                                      <TextArea
                                        rows={3}
                                        placeholder="Describe this service in detail..."
                                        showCount
                                        maxLength={500}
                                      />
                                    </Form.Item>
                                  </Col>
                                  <Col xs={24} md={12}>
                                    <Form.Item
                                      {...restField}
                                      label="Price Range"
                                      name={[name, 'priceRange']}
                                    >
                                      <Input placeholder="e.g., $100 - $500, $50/hour" />
                                    </Form.Item>
                                  </Col>
                                  <Col xs={24} md={12}>
                                    <Form.Item
                                      {...restField}
                                      label="Unit"
                                      name={[name, 'unit']}
                                    >
                                      <Input placeholder="e.g., per project, per hour, per sqm" />
                                    </Form.Item>
                                  </Col>
                                  <Col xs={24}>
                                    <Form.Item
                                      {...restField}
                                      label="Active"
                                      name={[name, 'isActive']}
                                      valuePropName="checked"
                                      initialValue={true}
                                    >
                                      <Switch />
                                    </Form.Item>
                                  </Col>
                                </Row>
                              </Card>
                            ))}
                            
                            <Form.Item>
                              <Button
                                type="dashed"
                                onClick={() => add({
                                  category: '',
                                  subcategories: [],
                                  description: '',
                                  priceRange: '',
                                  unit: '',
                                  isActive: true
                                })}
                                block
                                icon={<PlusOutlined />}
                                className="mt-4"
                              >
                                Add Service
                              </Button>
                            </Form.Item>
                          </>
                        )}
                      </Form.List>
                    </div>
                  ),
                },
                {
                  key: "payment",
                  label: (
                    <span>
                      <DollarCircleOutlined className="mr-2" />
                      Payment Details
                    </span>
                  ),
                  children: (
                    <div className="p-4">
                      <Row gutter={[24, 16]}>
                        <Col xs={24} md={8}>
                          <Form.Item
                            label="Preferred Payment Method"
                            name="preferredMethod"
                            rules={[{ required: true, message: 'Please select payment method' }]}
                          >
                            <Select placeholder="Select payment method">
                              <Option value="Bank Transfer">Bank Transfer</Option>
                              <Option value="Cash">Cash</Option>
                              <Option value="UPI">UPI</Option>
                              <Option value="Credit Card">Credit Card</Option>
                              <Option value="PayPal">PayPal</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                          <Form.Item
                            label="Advance Percentage"
                            name="advancePercentage"
                            tooltip="Percentage required as advance payment"
                          >
                            <InputNumber
                              min={0}
                              max={100}
                              className="w-full"
                              placeholder="30"
                              addonAfter="%"
                            />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                          <Form.Item
                            label="GST Number"
                            name="gstNumber"
                          >
                            <Input placeholder="Enter GST number if applicable" />
                          </Form.Item>
                        </Col>
                      </Row>
                    </div>
                  ),
                },
                {
                  key: "portfolio",
                  label: (
                    <span>
                      <TrophyOutlined className="mr-2" />
                      Portfolio
                    </span>
                  ),
                  children: (
                    <div className="p-4">
                      <Form.List name="portfolio">
                        {(fields, { add, remove }) => (
                          <>
                            {fields.map(({ key, name, ...restField }) => (
                              <Card 
                                key={key} 
                                className="mb-4 border border-gray-200"
                                title={`Portfolio Item ${name + 1}`}
                                extra={
                                  <Button
                                    type="text"
                                    danger
                                    icon={<DeleteOutlined />}
                                    onClick={() => remove(name)}
                                  >
                                    Remove
                                  </Button>
                                }
                              >
                                <Row gutter={[16, 16]}>
                                  <Col xs={24}>
                                    <Form.Item
                                      {...restField}
                                      label="Project Title"
                                      name={[name, 'title']}
                                      rules={[{ required: true, message: 'Please enter project title' }]}
                                    >
                                      <Input placeholder="Enter project title" />
                                    </Form.Item>
                                  </Col>
                                  <Col xs={24} md={12}>
                                    <Form.Item
                                      {...restField}
                                      label="Category"
                                      name={[name, 'category']}
                                      rules={[{ required: true, message: 'Please select category' }]}
                                    >
                                      <Select 
                                        placeholder="Select project category"
                                        loading={categoryLoading}
                                        onChange={(value) => fetchSubcategories(value)}
                                      >
                                        {categories.map(cat => (
                                          <Option key={cat.value} value={cat.value}>
                                            {cat.label}
                                          </Option>
                                        ))}
                                      </Select>
                                    </Form.Item>
                                  </Col>
                                  <Col xs={24} md={12}>
                                    <Form.Item
                                      {...restField}
                                      label="Subcategory"
                                      name={[name, 'subcategory']}
                                      rules={[{ required: true, message: 'Please select subcategory' }]}
                                    >
                                      <Select 
                                        placeholder="Select project subcategory"
                                        loading={subcategoryLoading}
                                        disabled={subcategoryLoading || !form.getFieldValue(['portfolio', name, 'category'])}
                                      >
                                        {subcategories.map(sub => (
                                          <Option key={sub.value} value={sub.value}>
                                            {sub.label}
                                          </Option>
                                        ))}
                                      </Select>
                                    </Form.Item>
                                  </Col>
                                  <Col xs={24}>
                                    <Form.Item
                                      {...restField}
                                      label="Project Description"
                                      name={[name, 'description']}
                                      rules={[{ required: true, message: 'Please enter project description' }]}
                                    >
                                      <TextArea
                                        rows={3}
                                        placeholder="Describe this project..."
                                        showCount
                                        maxLength={1000}
                                      />
                                    </Form.Item>
                                  </Col>
                                  <Col xs={24} md={8}>
                                    <Form.Item
                                      {...restField}
                                      label="Area"
                                      name={[name, 'area']}
                                    >
                                      <Input placeholder="e.g., 2000 sqm" />
                                    </Form.Item>
                                  </Col>
                                  <Col xs={24} md={8}>
                                    <Form.Item
                                      {...restField}
                                      label="Duration"
                                      name={[name, 'duration']}
                                    >
                                      <Input placeholder="e.g., 3 months" />
                                    </Form.Item>
                                  </Col>
                                  <Col xs={24} md={8}>
                                    <Form.Item
                                      {...restField}
                                      label="Client Name"
                                      name={[name, 'clientName']}
                                    >
                                      <Input placeholder="Enter client name" />
                                    </Form.Item>
                                  </Col>
                                  <Col xs={24} md={12}>
                                    <Form.Item
                                      {...restField}
                                      label="Completion Date"
                                      name={[name, 'completedAt']}
                                    >
                                      <DatePicker className="w-full" />
                                    </Form.Item>
                                  </Col>
                                  <Col xs={24} md={12}>
                                    <Form.Item
                                      {...restField}
                                      label="Featured Project"
                                      name={[name, 'featured']}
                                      valuePropName="checked"
                                    >
                                      <Switch />
                                    </Form.Item>
                                  </Col>
                                </Row>
                              </Card>
                            ))}
                            
                            <Form.Item>
                              <Button
                                type="dashed"
                                onClick={() => add({
                                  title: '',
                                  category: '',
                                  subcategory: '',
                                  description: '',
                                  area: '',
                                  duration: '',
                                  clientName: '',
                                  completedAt: null,
                                  featured: false
                                })}
                                block
                                icon={<PlusOutlined />}
                                className="mt-4"
                              >
                                Add Portfolio Item
                              </Button>
                            </Form.Item>
                          </>
                        )}
                      </Form.List>
                    </div>
                  ),
                },
              ]}
            />

            {/* Save Button */}
            <Divider />
            <div className="text-right">
              <Space>
                <Button 
                  onClick={() => navigate("/dashboard/freelancer")}
                >
                  Cancel
                </Button>
                <Button 
                  type="primary" 
                  htmlType="submit"
                  icon={<SaveOutlined />}
                  loading={saving}
                  size="large"
                >
                  Save All Changes
                </Button>
              </Space>
            </div>
          </Card>
        </Form>
      </div>
    </div>
  );
};

export default UpdateFreelancerProfile;