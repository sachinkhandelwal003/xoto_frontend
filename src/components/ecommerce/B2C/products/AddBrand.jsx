import React, { useState, useMemo } from "react";
import {
  Button,
  Input,
  Upload,
  Modal,
  message,
  Card,
  Row,
  Col,
  Statistic,
  Space,
  Tooltip,
  Avatar,
  Typography,
  Divider,
  Form,
  Table,
  Tag,
} from "antd";

import {
  PlusOutlined,
  EyeOutlined,
  SearchOutlined,
  ShopOutlined,
  GlobalOutlined,
  UploadOutlined,
} from "@ant-design/icons";

import { format } from "date-fns";

const { TextArea } = Input;
const { Title, Text } = Typography;

const [uploadedLogo, setUploadedLogo] = useState({
  url: "",
  key: "",
});
const [logoLocked, setLogoLocked] = useState(false);

/* ================= CONFIG ================= */
const BASE_URL = "https://xotostaging.xoto.ae";
const UPLOAD_API = `${BASE_URL}/api/upload`;
const CREATE_BRAND_API = `${BASE_URL}/api/products/create-brand`;
const THEME = { primary: "#7c3aed" };

const AddBrand = () => {
  const [form] = Form.useForm();
  const [brands, setBrands] = useState([]);
  const [search, setSearch] = useState("");
  const [addModal, setAddModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);

  const [uploadedLogoUrl, setUploadedLogoUrl] = useState("");
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [saving, setSaving] = useState(false);

  /* ================= LOGO UPLOAD LOGIC ================= */
const handleLogoUpload = async ({ file, onSuccess, onError }) => {
  const allowedTypes = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/svg+xml",
  ];

  if (!allowedTypes.includes(file.type)) {
    message.error("Invalid image format");
    return onError(new Error("Invalid format"));
  }

  const formData = new FormData();
  formData.append("file", file); // 🔥 backend confirmed

  try {
    setUploadingLogo(true);

    const res = await fetch(`${BASE_URL}/api/upload`, {
      method: "POST",
      body: formData,
    });

    const raw = await res.text();
    console.log("UPLOAD RESPONSE:", raw);

    const data = JSON.parse(raw);

    if (!res.ok) {
      throw new Error(data?.message || "Upload failed");
    }

    // 🔥 BACKEND SHOULD RETURN THIS
    // {
    //   "key": "brands/logo123.png",
    //   "url": "https://cdn.xoto.ae/brands/logo123.png"
    // }

    if (!data?.url || !data?.key) {
      throw new Error("Invalid upload response");
    }

    setUploadedLogo({
      url: data.url,
      key: data.key,
    });

    setLogoLocked(true); // 🔒 LOCK EVERYTHING
    message.success("Logo uploaded & locked");

    onSuccess({}); // AntD requirement
  } catch (err) {
    console.error(err);
    message.error(err.message || "Upload failed");
    onError(err);
  } finally {
    setUploadingLogo(false);
  }
};

  /* ================= CREATE BRAND LOGIC ================= */
  const handleAddBrand = async (values) => {
    if (!uploadedLogoUrl) {
      return message.warning("Please upload a logo first");
    }

    const payload = {
      brandName: values.brandName,
      photo: uploadedLogoUrl,
      websiteUrl: values.websiteUrl || "",
      country: values.country || "",
      description: values.description || "",
      isActive: true,
    };

    try {
      setSaving(true);
      const res = await fetch(CREATE_BRAND_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save brand");

      message.success("Brand created!");
      
      setBrands(prev => [{
        ...payload,
        _id: Date.now().toString(),
        created_at: new Date()
      }, ...prev]);

      setAddModal(false);
      setUploadedLogoUrl("");
      form.resetFields();
    } catch (err) {
      message.error("Error creating brand");
    } finally {
      setSaving(false);
    }
  };

  /* ================= TABLE COLUMNS ================= */
  const columns = [
    {
      title: "Brand",
      key: "brand",
      render: (_, record) => (
        <Space>
          <Avatar shape="square" size={45} src={record.photo} icon={<ShopOutlined />} />
          <Text strong>{record.brandName}</Text>
        </Space>
      ),
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Button 
          icon={<EyeOutlined />} 
          onClick={() => { setSelectedBrand(record); setViewModal(true); }} 
        />
      ),
    },
  ];

  const filteredData = useMemo(() => {
    return brands.filter(b => b.brandName.toLowerCase().includes(search.toLowerCase()));
  }, [brands, search]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <Title level={3}>Brand Management</Title>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          style={{ background: THEME.primary }}
          onClick={() => setAddModal(true)}
        >
          Add New Brand
        </Button>
      </div>

      <Card bordered={false} className="shadow-sm">
        <Input
          prefix={<SearchOutlined />}
          placeholder="Search brands..."
          className="mb-4 max-w-xs"
          allowClear
          onChange={(e) => setSearch(e.target.value)}
        />
        <Table 
          columns={columns} 
          dataSource={filteredData} 
          rowKey="_id"
          pagination={{ pageSize: 5 }}
        />
      </Card>

      <Modal
        title="Create Brand"
        open={addModal}
        onCancel={() => { setAddModal(false); setUploadedLogoUrl(""); form.resetFields(); }}
        footer={null}
        centered
      >
        <Form layout="vertical" form={form} onFinish={handleAddBrand}>
          <Form.Item label="Brand Logo" required>
<Upload
  customRequest={handleLogoUpload}
  showUploadList={false}
  accept=".png,.jpg,.jpeg,.svg"
  maxCount={1}
  beforeUpload={() => true}
>
            <div className="flex flex-col items-center p-6 border-2 border-dashed border-gray-200 rounded-lg hover:border-purple-400 transition cursor-pointer bg-gray-50">
                {uploadedLogoUrl ? (
                  <img src={uploadedLogoUrl} alt="logo" className="h-20 w-20 object-contain" />
                ) : (
                  <div className="text-center">
                    <UploadOutlined style={{ fontSize: 24, color: THEME.primary }} />
                    <div className="mt-2 text-gray-500">
                      {uploadingLogo ? "Uploading..." : "Click to select Logo"}
                    </div>
                  </div>
                )}
              </div>
            </Upload>
          </Form.Item>

          <Form.Item name="brandName" label="Brand Name" rules={[{ required: true }]}>
            <Input placeholder="Nike, Apple, etc." size="large" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="country" label="Country">
                <Input placeholder="USA" size="large" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="websiteUrl" label="Website URL">
                <Input prefix={<GlobalOutlined />} placeholder="https://..." size="large" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="description" label="Description">
            <TextArea rows={3} placeholder="About the brand..." />
          </Form.Item>

          <Space className="w-full justify-end pt-4">
            <Button onClick={() => setAddModal(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit" loading={saving} style={{ background: THEME.primary }}>
              Create Brand
            </Button>
          </Space>
        </Form>
      </Modal>

      <Modal
        title="Brand Details"
        open={viewModal}
        onCancel={() => setViewModal(false)}
        footer={null}
        centered
      >
        {selectedBrand && (
          <div className="text-center">
            <Avatar size={100} src={selectedBrand.photo} shape="square" className="mb-4 shadow" />
            <Title level={4}>{selectedBrand.brandName}</Title>
            <Tag color="purple">{selectedBrand.country || "Global"}</Tag>
            <Divider />
            <p className="text-left">{selectedBrand.description || "No description provided."}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AddBrand;