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
  Space,
  Typography,
  Switch,
  Spin,
  Tabs,
  Table,
  Alert,
  Badge
} from "antd";
import {
  UserOutlined,
  SaveOutlined,
  PlusOutlined,
  DeleteOutlined,
  UploadOutlined,
  EnvironmentOutlined,
  SolutionOutlined,
  DollarCircleOutlined,
  ToolFilled,
  FileTextOutlined,
  CameraOutlined,
  CreditCardOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined
} from "@ant-design/icons";
import moment from "moment";

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;
const { TabPane } = Tabs;

// Define standard unit options
const unitOptions = [
  { label: "Per Hour", value: "per hour" },
  { label: "Per Sq. Ft", value: "per sq.ft" },
  { label: "Per Sq. Meter", value: "per sq.m" },
  { label: "Fixed Price", value: "fixed" },
  { label: "Per Day", value: "per day" },
  { label: "Per Item", value: "per item" },
  { label: "Per Visit", value: "per visit" }
];

const UpdateFreelancerProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  
  const [freelancer, setFreelancer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Rate Card specific state
  const [rateLoading, setRateLoading] = useState(false);
  const [rateCardValues, setRateCardValues] = useState({}); 

  // Data States
  const [categories, setCategories] = useState([]);
  const [subcategoriesMap, setSubcategoriesMap] = useState({}); 
  const [currencies, setCurrencies] = useState([]); 

  // File States
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [fileList, setFileList] = useState({
    resume: [],
    identityProof: [],
    addressProof: [],
    certificate: []
  });

  const [activeTab, setActiveTab] = useState("basic");

  // Initial Fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [profileRes, categoriesRes, currenciesRes] = await Promise.all([
          apiService.get("/freelancer/profile"),
          fetchCategories(),
          fetchCurrencies()
        ]);

        if (profileRes.success) {
          setFreelancer(profileRes.freelancer);
          const formattedData = formatFormData(profileRes.freelancer);
          form.setFieldsValue(formattedData);
          
          if (profileRes.freelancer.profile_image) {
            setPreviewImage(`http://localhost:5000/${profileRes.freelancer.profile_image}`);
          }

          // Rate Card Init
          const initialRates = {};
          if (profileRes.freelancer.services_offered) {
            profileRes.freelancer.services_offered.forEach(s => {
              initialRates[s._id] = {
                price_range: s.price_range || "",
                unit: s.unit || "per hour"
              };
            });
          }
          setRateCardValues(initialRates);

          // Subcategories Init
          if (formattedData.services && formattedData.services.length > 0) {
            formattedData.services.forEach((service, index) => {
              if (service.category) {
                fetchSubcategories(service.category, index);
              }
            });
          }
        }

        if (categoriesRes) setCategories(categoriesRes);
        if (currenciesRes) setCurrencies(currenciesRes);

      } catch (error) {
        console.error("Error fetching data:", error);
        showToast("Failed to load profile data", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [form]);

  // --- API Helpers ---
  const fetchCategories = async () => {
    try {
      const response = await apiService.get("/freelancer/category?active=true");
      return response.data ? response.data.map(c => ({ value: c._id, label: c.name, ...c })) : [];
    } catch (error) { return []; }
  };

  const fetchSubcategories = async (categoryId, index) => {
    if (!categoryId) return;
    try {
      const response = await apiService.get(`/freelancer/subcategory?category=${categoryId}`);
      if (response.data) {
        const subs = response.data.map(s => ({ value: s._id, label: s.name }));
        setSubcategoriesMap(prev => ({ ...prev, [index]: subs }));
      }
    } catch (error) { console.error(error); }
  };

  const fetchCurrencies = async () => {
    try {
      const response = await apiService.get('/setting/currency');
      return response.success ? response.currencies : [];
    } catch (error) { return []; }
  };

  const handleCategoryChange = (value, index) => {
    const services = form.getFieldValue('services');
    if (services && services[index]) {
      services[index].subcategories = [];
      form.setFieldsValue({ services });
    }
    fetchSubcategories(value, index);
  };

  // --- Rate Card Logic ---
  const handleRateInputChange = (serviceId, field, value) => {
    setRateCardValues(prev => ({
      ...prev,
      [serviceId]: { ...prev[serviceId], [field]: value }
    }));
  };

  const updateSingleRateCard = async (serviceId) => {
    try {
      setRateLoading(true);
      const values = rateCardValues[serviceId];
      if(!values?.price_range) return showToast("Price range is required", "warning");

      const payload = {
        serviceId: serviceId,
        price_range: values.price_range,
        unit: values.unit
      };

      const response = await apiService.put('/freelancer/rate-card', payload);

      if (response.success) {
        showToast("Rate card updated!", "success");
        setFreelancer(prev => {
           const updatedServices = prev.services_offered.map(s => 
              s._id === serviceId ? { ...s, price_range: values.price_range, unit: values.unit } : s
           );
           return { ...prev, services_offered: updatedServices };
        });
      } else {
        showToast(response.message || "Update failed", "error");
      }
    } catch (error) {
      showToast("Update failed", "error");
    } finally {
      setRateLoading(false);
    }
  };

  const rateCardColumns = [
    {
      title: 'Service Category',
      key: 'category',
      render: (_, record) => (
        <Space>
           {record.category?.icon && <Avatar src={record.category.icon} shape="square" size="small" />}
           <div className="flex flex-col">
             <Text strong>{record.category?.name || "Unknown Category"}</Text>
             <Text type="secondary" style={{ fontSize: 12 }}>
               {record.subcategories?.map(s => s.name).join(", ")}
             </Text>
           </div>
        </Space>
      )
    },
    {
      title: 'Price Range',
      key: 'price',
      width: 200,
      render: (_, record) => (
        <Input 
          value={rateCardValues[record._id]?.price_range}
          onChange={(e) => handleRateInputChange(record._id, 'price_range', e.target.value)}
          placeholder="e.g. 100-200"
          prefix={freelancer?.payment?.preferred_currency?.symbol || "$"}
        />
      )
    },
    {
      title: 'Unit',
      key: 'unit',
      width: 180,
      render: (_, record) => (
        <Select 
          value={rateCardValues[record._id]?.unit}
          onChange={(value) => handleRateInputChange(record._id, 'unit', value)}
          placeholder="Select Unit"
          style={{ width: '100%' }}
        >
          {unitOptions.map((opt) => (
            <Option key={opt.value} value={opt.value}>{opt.label}</Option>
          ))}
        </Select>
      )
    },
    {
      title: 'Action',
      key: 'action',
      width: 100,
      render: (_, record) => (
        <Button 
          type="primary" 
          ghost 
          size="small"
          loading={rateLoading}
          onClick={() => updateSingleRateCard(record._id)}
        >
          Update
        </Button>
      )
    }
  ];

  // --- Form Formatting ---
  const formatFormData = (data) => {
    return {
      firstName: data.name?.first_name,
      lastName: data.name?.last_name,
      mobile: data.mobile?.number,
      countryCode: data.mobile?.country_code || '+91',
      languages: data.languages || [],
      experienceYears: data.professional?.experience_years,
      availability: data.professional?.availability,
      workingRadius: data.professional?.working_radius,
      bio: data.professional?.bio,
      skills: data.professional?.skills?.join(', ') || '',
      city: data.location?.city,
      state: data.location?.state,
      country: data.location?.country || 'India',
      pincode: data.location?.pincode,
      preferredMethod: data.payment?.preferred_method,
      preferredCurrency: data.payment?.preferred_currency?._id || data.payment?.preferred_currency,
      advancePercentage: data.payment?.advance_percentage,
      gstNumber: data.payment?.gst_number,
      services: data.services_offered?.map(service => ({
        category: service.category?._id || service.category,
        subcategories: service.subcategories?.map(sub => sub._id || sub) || [],
        description: service.description,
        priceRange: service.price_range,
        unit: service.unit,
        isActive: service.is_active !== false
      })) || [],
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

  // --- File Handling (Initial) ---
  const handleProfileImageChange = (info) => {
    if (info.file.status === 'removed') {
      setProfileImage(null);
      setPreviewImage(null);
      return;
    }
    const file = info.file;
    setProfileImage(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setPreviewImage(reader.result);
    return false;
  };

  const handleDocumentChange = (info, type) => {
    let newFileList = [...info.fileList];
    newFileList = newFileList.slice(-1); 
    setFileList(prev => ({ ...prev, [type]: newFileList }));
  };

  const customRequest = ({ onSuccess }) => { 
    setTimeout(() => { onSuccess("ok"); }, 0); 
  };

  // --- RE-UPLOAD HANDLER FOR REJECTED DOCUMENTS ---
  const handleReupload = async (options, documentId) => {
    const { file, onSuccess, onError } = options;
    const formData = new FormData();
    formData.append('file', file); // Backend expects 'file'

    try {
      showToast("Uploading...", "info");
      const res = await apiService.put(`/freelancer/document/${documentId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (res.success) {
        onSuccess("Ok");
        showToast("Document re-uploaded successfully!", "success");
        
        // Update local state immediately
        setFreelancer(prev => {
            const updatedDocs = prev.documents.map(d => 
                d._id === documentId ? res.document : d
            );
            return { ...prev, documents: updatedDocs, onboarding_status: res.onboarding_status };
        });
      } else {
        showToast(res.message, "error");
        onError(new Error(res.message));
      }
    } catch (err) {
      console.error(err);
      showToast("Re-upload failed", "error");
      onError(err);
    }
  };

  // --- MAIN FORM SUBMISSION (Initial/Full Update) ---
  const onFinish = async (values) => {
    try {
      setSaving(true);
      const formData = new FormData();

      // ... (Rest of FormData logic same as before) ...
      formData.append('name[first_name]', values.firstName);
      formData.append('name[last_name]', values.lastName);
      formData.append('mobile[country_code]', values.countryCode);
      formData.append('mobile[number]', values.mobile);
      if (values.languages) values.languages.forEach(lang => formData.append('languages[]', lang));
      if (profileImage) formData.append('profile_image', profileImage);
      
      formData.append('professional', JSON.stringify({
        experience_years: values.experienceYears,
        availability: values.availability,
        working_radius: values.workingRadius,
        bio: values.bio,
        skills: typeof values.skills === 'string' ? values.skills.split(',') : values.skills
      }));

      formData.append('location', JSON.stringify({
        city: values.city, state: values.state, country: values.country, pincode: values.pincode
      }));

      formData.append('payment', JSON.stringify({
        preferred_method: values.preferredMethod,
        advance_percentage: values.advancePercentage,
        gst_number: values.gstNumber,
        preferred_currency: values.preferredCurrency
      }));

      if (values.services) {
        const servicesData = values.services.map(s => ({
          category: s.category, subcategories: s.subcategories, description: s.description,
          price_range: s.priceRange, unit: s.unit, is_active: s.isActive
        }));
        formData.append('services_offered', JSON.stringify(servicesData));
      }

      // Append new files (Initial Uploads)
      if (fileList.resume.length) formData.append('resume', fileList.resume[0].originFileObj);
      if (fileList.identityProof.length) formData.append('identityProof', fileList.identityProof[0].originFileObj);
      if (fileList.addressProof.length) formData.append('addressProof', fileList.addressProof[0].originFileObj);
      if (fileList.certificate.length) formData.append('certificate', fileList.certificate[0].originFileObj);

      const response = await apiService.put("/freelancer/profile", formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      if (response.success) {
        showToast("Profile updated successfully!", "success");
        setFreelancer(response.freelancer);
        form.setFieldsValue(formatFormData(response.freelancer));
        setProfileImage(null);
        setFileList({ resume: [], identityProof: [], addressProof: [], certificate: [] });
      } else {
        showToast(response.message || "Failed to update profile", "error");
      }
    } catch (error) {
      showToast("Failed to update profile", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Spin size="large" className="flex justify-center mt-10" />;
  if (!freelancer) return <div className="text-center mt-10">Profile Not Found</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Card className="mb-6 shadow-sm border-0 bg-white">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative group">
                <Avatar
                  size={100}
                  src={previewImage}
                  icon={<UserOutlined />}
                  className="border-2 border-gray-200"
                />
                <div className="absolute bottom-0 right-0">
                  <Upload
                    name="profile_image"
                    showUploadList={false}
                    beforeUpload={() => false}
                    onChange={handleProfileImageChange}
                  >
                    <Button type="primary" shape="circle" icon={<CameraOutlined />} size="small" />
                  </Upload>
                </div>
              </div>
              <div>
                <Title level={2} className="m-0 text-gray-800">
                  {freelancer.name?.first_name} {freelancer.name?.last_name}
                </Title>
                <Tag color="blue" className="mt-2">
                  {freelancer.professional?.experience_years || 0} years exp
                </Tag>
                <Tag color={freelancer.status_info?.status === 2 ? 'red' : 'blue'}>
                    {freelancer.onboarding_status}
                </Tag>
              </div>
            </div>
            <Button 
              type="primary" 
              icon={<SaveOutlined />} 
              loading={saving} 
              onClick={() => form.submit()} 
              size="large"
            >
              Save Full Profile
            </Button>
          </div>
        </Card>

        {/* Main Form */}
        <Form form={form} layout="vertical" onFinish={onFinish} size="large">
          <Tabs activeKey={activeTab} onChange={setActiveTab} type="card" className="bg-white p-4 rounded shadow-sm">
            
            {/* ... TABS 1-6 ARE SAME AS BEFORE (Basic, Professional, Location, Services, Rate Card, Payment) ... */}
            <TabPane tab={<span><UserOutlined /> Basic Info</span>} key="basic">
               {/* Same content as previous... */}
               <Row gutter={[24, 16]}>
                <Col xs={24} md={12}>
                  <Form.Item label="First Name" name="firstName" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="Last Name" name="lastName" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="Mobile" required style={{ marginBottom: 0 }}>
                      <Input.Group compact>
                        <Form.Item name="countryCode" noStyle rules={[{ required: true }]}>
                            <Select style={{ width: '30%' }}>
                                <Option value="+91">+91</Option>
                                <Option value="+971">+971</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item name="mobile" noStyle rules={[{ required: true }]}>
                            <Input style={{ width: '70%' }} />
                        </Form.Item>
                    </Input.Group>
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item label="Languages" name="languages">
                    <Select mode="multiple">
                      <Option value="english">English</Option>
                      <Option value="hindi">Hindi</Option>
                      <Option value="arabic">Arabic</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </TabPane>

            <TabPane tab={<span><SolutionOutlined /> Professional</span>} key="professional">
               {/* Same content as previous... */}
               <Row gutter={[24, 16]}>
                  <Col xs={24} md={12}><Form.Item label="Experience (Years)" name="experienceYears"><InputNumber className="w-full" /></Form.Item></Col>
                  <Col xs={24} md={12}><Form.Item label="Availability" name="availability"><Select><Option value="Full-time">Full-time</Option><Option value="Part-time">Part-time</Option></Select></Form.Item></Col>
                  <Col xs={24} md={12}><Form.Item label="Working Radius" name="workingRadius"><Input /></Form.Item></Col>
                  <Col xs={24}><Form.Item label="Bio" name="bio" rules={[{ required: true }]}><TextArea rows={4} /></Form.Item></Col>
                  <Col xs={24}><Form.Item label="Skills" name="skills" help="Comma separated"><Input /></Form.Item></Col>
              </Row>
            </TabPane>

            <TabPane tab={<span><EnvironmentOutlined /> Location</span>} key="location">
               {/* Same content as previous... */}
               <Row gutter={[24, 16]}>
                <Col xs={24} md={12}><Form.Item label="City" name="city"><Input /></Form.Item></Col>
                <Col xs={24} md={12}><Form.Item label="State" name="state"><Input /></Form.Item></Col>
                <Col xs={24} md={12}><Form.Item label="Country" name="country"><Input /></Form.Item></Col>
                <Col xs={24} md={12}><Form.Item label="Pincode" name="pincode"><Input /></Form.Item></Col>
              </Row>
            </TabPane>

            <TabPane tab={<span><ToolFilled /> Services (Setup)</span>} key="services">
               {/* Same content as previous... */}
               <div className="bg-blue-50 p-3 mb-4 rounded border border-blue-100">
                <Text type="secondary"><ToolFilled /> Use this tab to <b>Add</b> or <b>Remove</b> services. Use the "Rate Card" tab to quickly update prices.</Text>
              </div>
              <Form.List name="services">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Card key={key} size="small" className="mb-4 bg-gray-50" extra={<Button danger icon={<DeleteOutlined />} onClick={() => remove(name)} />}>
                        <Row gutter={[16, 16]}>
                          <Col xs={24} md={12}>
                            <Form.Item {...restField} label="Category" name={[name, 'category']} rules={[{ required: true }]}>
                              <Select onChange={(val) => handleCategoryChange(val, name)}>
                                {categories.map(c => <Option key={c.value} value={c.value}>{c.label}</Option>)}
                              </Select>
                            </Form.Item>
                          </Col>
                          <Col xs={24} md={12}>
                            <Form.Item {...restField} label="Subcategories" name={[name, 'subcategories']}>
                              <Select mode="multiple" disabled={!subcategoriesMap[name]}>
                                {subcategoriesMap[name]?.map(s => <Option key={s.value} value={s.value}>{s.label}</Option>)}
                              </Select>
                            </Form.Item>
                          </Col>
                          <Col xs={24}><Form.Item {...restField} label="Description" name={[name, 'description']}><TextArea rows={2} /></Form.Item></Col>
                          <Col xs={24} md={8}><Form.Item {...restField} label="Price" name={[name, 'priceRange']}><Input /></Form.Item></Col>
                          <Col xs={24} md={8}>
                             <Form.Item {...restField} label="Unit" name={[name, 'unit']}>
                               <Select placeholder="Select Unit">
                                  {unitOptions.map(u => <Option key={u.value} value={u.value}>{u.label}</Option>)}
                               </Select>
                             </Form.Item>
                          </Col>
                          <Col xs={24} md={8}>
                             <Form.Item {...restField} label="Status" name={[name, 'isActive']} valuePropName="checked" initialValue={true}>
                               <Switch />
                             </Form.Item>
                          </Col>
                        </Row>
                      </Card>
                    ))}
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>Add Service</Button>
                  </>
                )}
              </Form.List>
            </TabPane>

            <TabPane tab={<span><CreditCardOutlined /> Rate Card</span>} key="rate-card">
               {/* Same content as previous... */}
               <div className="mb-4">
                 <Title level={5}>Quick Price Adjustment</Title>
                 <Text type="secondary">Update your pricing for active services individually without saving the whole profile.</Text>
              </div>
              
              <Table 
                dataSource={freelancer.services_offered} 
                columns={rateCardColumns}
                rowKey="_id"
                pagination={false}
                bordered
              />
            </TabPane>

            <TabPane tab={<span><DollarCircleOutlined /> Payment</span>} key="payment">
               {/* Same content as previous... */}
               <Row gutter={[24, 16]}>
                <Col xs={24} md={12}>
                  <Form.Item label="Preferred Method" name="preferredMethod">
                    <Select>
                      <Option value="Cash">Cash</Option>
                      <Option value="Bank Transfer">Bank Transfer</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                   <Form.Item label="Currency" name="preferredCurrency">
                     <Select placeholder="Select Currency" loading={!currencies.length}>
                        {currencies.map(curr => (
                           <Option key={curr._id} value={curr._id}>
                             {curr.code} - {curr.symbol} ({curr.name})
                           </Option>
                        ))}
                     </Select>
                   </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="Advance %" name="advancePercentage">
                    <InputNumber min={0} max={100} formatter={v => `${v}%`} parser={v => v.replace('%', '')} className="w-full" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="GST Number" name="gstNumber">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            </TabPane>

            {/* TAB 7: DOCUMENTS - UPDATED FOR RE-UPLOAD */}
            <TabPane tab={<span><FileTextOutlined /> Documents</span>} key="documents">
               <Row gutter={[24, 24]}>
                 {['resume', 'identityProof', 'addressProof', 'certificate'].map(type => {
                   
                   // Find existing document state
                   const doc = freelancer.documents?.find(d => d.type === type);
                   const isRejected = doc?.verified === false && doc?.reason;
                   const isVerified = doc?.verified === true;
                   
                   return (
                     <Col xs={24} md={12} key={type}>
                       <Card 
                         title={type.charAt(0).toUpperCase() + type.slice(1).replace(/([A-Z])/g, ' $1')} 
                         size="small"
                         className={isRejected ? "border-red-400" : ""}
                         headStyle={isRejected ? { color: '#ff4d4f' } : {}}
                       >
                         
                         {/* 1. Verified State */}
                         {isVerified && (
                           <div className="mb-4 text-green-600 flex items-center">
                             <CheckCircleOutlined className="mr-2" /> Verified & Approved
                           </div>
                         )}

                         {/* 2. Rejected State */}
                         {isRejected && (
                           <Alert 
                             message="Document Rejected" 
                             description={
                               <div>
                                 <div><strong>Reason:</strong> {doc.reason}</div>
                                 {doc.suggestion && <div><strong>Suggestion:</strong> {doc.suggestion}</div>}
                               </div>
                             }
                             type="error" 
                             showIcon 
                             className="mb-4"
                           />
                         )}

                         {/* 3. Pending/New State */}
                         {!isVerified && !isRejected && doc && (
                           <div className="mb-2 text-blue-600">
                             <FileTextOutlined /> Document Uploaded (Pending Review)
                           </div>
                         )}

                         {/* ACTION AREA */}
                         {/* Show upload button if: Not verified AND (Rejected OR Not uploaded yet) */}
                         {!isVerified && (
                           <Upload
                             // If rejected, call re-upload API immediately. Else, add to fileList for batch save.
                             customRequest={isRejected ? (options) => handleReupload(options, doc._id) : customRequest}
                             
                             fileList={isRejected ? [] : fileList[type]} // Clear list for re-upload mode
                             
                             onChange={(info) => {
                               // Only handle local state change for initial upload
                               if (!isRejected) handleDocumentChange(info, type);
                             }}
                             
                             showUploadList={!isRejected} // Hide standard list for re-upload button
                             maxCount={1}
                           >
                             <Button 
                               icon={isRejected ? <SyncOutlined /> : <UploadOutlined />}
                               type={isRejected ? "primary" : "default"}
                               danger={isRejected}
                             >
                               {isRejected ? "Re-upload Document" : "Click to Upload"}
                             </Button>
                           </Upload>
                         )}
                       </Card>
                     </Col>
                   );
                 })}
               </Row>
            </TabPane>

          </Tabs>
        </Form>
      </div>
    </div>
  );
};

export default UpdateFreelancerProfile;