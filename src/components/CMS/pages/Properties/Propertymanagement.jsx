import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
  Button, Modal, Form, Input, InputNumber, Select, Row, Col, Divider,
  Typography, Table, Card, Space, Tag, Popconfirm, message, notification, Switch, Tooltip, Upload, Statistic
} from 'antd';
import {
  PlusOutlined, HomeOutlined, DollarOutlined, EnvironmentOutlined,
  DeleteOutlined, EditOutlined, BuildOutlined, LayoutOutlined, UploadOutlined, FilePdfOutlined,
  SearchOutlined, PropertySafetyOutlined, CheckCircleOutlined, SyncOutlined, CloseCircleOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

const THEME = { primary: "#7c3aed", success: "#10b981" };

const PropertyManagement = () => {
  const BASE_URL = "https://xoto.ae/api/property";
  const UPLOAD_API = "https://xoto.ae/api/upload";

  const [properties, setProperties] = useState([]);
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchText] = useState('');

  const [fileList, setFileList] = useState([]); 
  const [brochureUrl, setBrochureUrl] = useState(""); 

  const [form] = Form.useForm();

  // --- 1. FETCH DATA FUNCTIONS ---
  const fetchDevelopers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/get-all-developers`);
      const list = Array.isArray(res.data) ? res.data : (res.data?.data || []);
      setDevelopers(list);
    } catch (err) { console.error("Error fetching developers"); }
  };

  const fetchProperties = useCallback(async (page, limit, search) => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/get-all-properties`, {
        params: { 
          page, 
          limit, 
          isFeatured: false, 
          search: search || undefined 
        }
      });
      const resData = response.data;
      const list = Array.isArray(resData?.data) ? resData.data : (Array.isArray(resData) ? resData : []);
      setProperties(list);
      setTotal(resData?.total || resData?.pagination?.total || list.length);
    } catch (err) { 
      message.error("Failed to load properties"); 
    } finally { 
      setLoading(false); 
    }
  }, []);

  // SEARCH & PAGINATION EFFECT
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProperties(currentPage, pageSize, searchText);
    }, 500); // Debounce
    return () => clearTimeout(timer);
  }, [searchText, currentPage, pageSize, fetchProperties]);

  useEffect(() => {
    fetchDevelopers();
  }, []);

  // --- 2. SAVE & EDIT LOGIC ---
  const handleSave = async (values) => {
    setLoading(true);
    try {
      const finalPhotos = fileList
        .map(f => f.url || f.response?.file?.url || f.response?.url || f.response)
        .filter(url => typeof url === 'string');

      const payload = {
        ...values,
        price: Number(values.price || 0),
        bedrooms: Number(values.bedrooms || 0),
        bathrooms: Number(values.bathrooms || 0),
        length: Number(values.length || 0),
        breadth: Number(values.breadth || 0),
        builtUpArea: Number(values.builtUpArea || 0),
        photos: finalPhotos,
        brochure: brochureUrl, 
        mainLogo: finalPhotos[0] || "",
        // Default units preserved
        lengthUnit: values.lengthUnit || "ft",
        breadthUnit: values.breadthUnit || "ft",
        builtUpAreaUnit: values.builtUpAreaUnit || "sqft",
        currency: values.currency || "AED"
      };

      if (editingId) {
        // EDIT API INTEGRATED
        await axios.post(`${BASE_URL}/edit-property`, payload, { params: { id: editingId } });
      } else {
        await axios.post(`${BASE_URL}/create-properties`, payload);
      }

      notification.success({ message: `Property Saved Successfully!` });
      closeModal();
      fetchProperties(currentPage, pageSize, searchText);
    } catch (err) {
      message.error("Error saving property.");
    } finally { setLoading(false); }
  };

  // --- 3. DELETE LOGIC ---
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.post(`${BASE_URL}/delete-property`, null, { params: { id } });
      message.success("Property deleted successfully");
      fetchProperties(currentPage, pageSize, searchText);
    } catch (err) { message.error("Failed to delete"); }
    finally { setLoading(false); }
  };

  const closeModal = () => {
    setModalVisible(false);
    setEditingId(null);
    setFileList([]);
    setBrochureUrl("");
    form.resetFields();
  };

  const columns = [
    { title: 'Property Name', dataIndex: 'propertyName', key: 'propertyName', render: (t) => <Text strong>{t}</Text> },
    { title: 'Price', dataIndex: 'price', key: 'price', render: (p, r) => <Text strong style={{color: THEME.primary}}>{r.currency} {p?.toLocaleString()}</Text> },
    { title: 'Location', key: 'location', render: (_, r) => `${r.area || ''}, ${r.city || ''}` },
    {
      title: 'Status',
      key: 'status',
      align: 'center',
      render: (_, record) => (
        record.notReadyYet ? <Tag color="processing">Construction</Tag> :
        record.isAvailable ? <Tag color="success">Available</Tag> : <Tag color="error">Sold</Tag>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="text" icon={<EditOutlined style={{color: THEME.primary}} />} onClick={() => {
                setEditingId(record._id);
                form.setFieldsValue({ ...record, developer: record.developer?._id || record.developer });
                setModalVisible(true);
                if(record.photos) setFileList(record.photos.map((url, i) => ({ uid: i, url, status: 'done', name: `Img ${i+1}` })));
                if(record.brochure) setBrochureUrl(record.brochure);
              }} 
            />
          <Popconfirm title="Delete?" onConfirm={() => handleDelete(record._id)} okText="Yes">
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Row gutter={[16, 16]} align="middle" justify="space-between" className="mb-6">
        <Col><Title level={3} style={{ margin: 0 }}>Property Management</Title></Col>
        <Col><Button type="primary" size="large" icon={<PlusOutlined />} onClick={() => setModalVisible(true)} style={{ backgroundColor: THEME.primary }}>Add New Property</Button></Col>
      </Row>

      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={8}><Card bordered={false} className="shadow-sm"><Statistic title="Total Properties" value={total} prefix={<PropertySafetyOutlined style={{ color: THEME.primary }} />} /></Card></Col>
        <Col xs={24} sm={16}>
            <Card bordered={false} className="shadow-sm">
                <Input 
                    placeholder="Search by Name, Area or City..." 
                    prefix={<SearchOutlined />} 
                    size="large" 
                    allowClear 
                    value={searchText} 
                    onChange={(e) => {
                        setSearchText(e.target.value);
                        setCurrentPage(1); // RESET TO PAGE 1 ON SEARCH
                    }} 
                />
            </Card>
        </Col>
      </Row>

      <Table columns={columns} dataSource={properties} loading={loading} rowKey="_id" pagination={{ current: currentPage, total: total, pageSize: pageSize, onChange: (p, s) => { setCurrentPage(p); } }} />

      <Modal title={editingId ? "Edit Property" : "Add New Property"} open={modalVisible} onCancel={closeModal} footer={null} width={950} centered>
        <Form form={form} layout="vertical" onFinish={handleSave} initialValues={{ currency: 'AED', lengthUnit: 'ft', breadthUnit: 'ft', builtUpAreaUnit: 'sqft', propertyType: 'sell', propertySubType: 'ready', isAvailable: true, country: 'UAE', state: 'Dubai', city: 'Dubai', postalCode: '00000', notReadyYet: false }}>
          
          <Divider orientation="left">Basic Info & Media</Divider>
          <Row gutter={16}>
            <Col span={8}><Form.Item name="propertyName" label="Property Name" rules={[{ required: true }]}><Input /></Form.Item></Col>
            <Col span={8}>
              <Form.Item name="developer" label="Developer" rules={[{ required: true }]}>
                <Select placeholder="Select Developer">{developers.map(d => <Option key={d._id} value={d._id}>{d.name}</Option>)}</Select>
              </Form.Item>
            </Col>
            <Col span={8}><Form.Item name="propertyType" label="Transaction"><Select><Option value="sell">Sell</Option><Option value="rent">Rent</Option></Select></Form.Item></Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Photos">
                <Upload listType="picture-card" fileList={fileList} action={UPLOAD_API} name="file" onChange={({ fileList }) => setFileList(fileList)}>
                  {fileList.length >= 8 ? null : <div><PlusOutlined /><div>Upload</div></div>}
                </Upload>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Brochure PDF">
                <Upload action={UPLOAD_API} name="file" maxCount={1} onChange={(info) => {
                  if (info.file.status === 'done') {
                    setBrochureUrl(info.file.response?.file?.url || info.file.response?.url);
                    message.success("Brochure linked!");
                  }
                }}>
                  <Button icon={<UploadOutlined />}>Upload PDF</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>

          <Divider orientation="left">Configuration & Price</Divider>
          <Row gutter={16}>
            <Col span={6}><Form.Item name="bedrooms" label="Bedrooms"><InputNumber className="w-full" /></Form.Item></Col>
            <Col span={6}><Form.Item name="bathrooms" label="Bathrooms"><InputNumber className="w-full" /></Form.Item></Col>
            <Col span={6}><Form.Item name="price" label="Price (AED)"><InputNumber className="w-full" /></Form.Item></Col>
            <Col span={6}><Form.Item name="propertySubType" label="Status"><Select><Option value="ready">Ready</Option><Option value="off_plan">Off Plan</Option><Option value="resale">Resale</Option></Select></Form.Item></Col>
          </Row>

          <Row gutter={16}>
            <Col span={4}><Form.Item name="length" label="Length"><InputNumber className="w-full" /></Form.Item></Col>
            <Col span={4}><Form.Item name="breadth" label="Breadth"><InputNumber className="w-full" /></Form.Item></Col>
            <Col span={8}><Form.Item name="builtUpArea" label="Built Up Area"><InputNumber className="w-full" /></Form.Item></Col>
            <Col span={8}><Form.Item name="googleLocation" label="Maps Link"><Input placeholder="https://..." /></Form.Item></Col>
          </Row>

          <Divider orientation="left">Location Details</Divider>
          <Row gutter={16}>
            <Col span={6}><Form.Item name="buildingNo" label="Building No"><Input /></Form.Item></Col>
            <Col span={6}><Form.Item name="street" label="Street Address"><Input /></Form.Item></Col>
            <Col span={6}><Form.Item name="area" label="Area"><Input /></Form.Item></Col>
            <Col span={6}><Form.Item name="city" label="City"><Input /></Form.Item></Col>
          </Row>
          <Row gutter={16}>
            <Col span={6}><Form.Item name="state" label="State"><Input /></Form.Item></Col>
            <Col span={6}><Form.Item name="country" label="Country"><Input /></Form.Item></Col>
            <Col span={6}><Form.Item name="postalCode" label="Postal Code"><Input /></Form.Item></Col>
          </Row>

          <Divider orientation="left">Availability & Features</Divider>
          <Row gutter={16}>
            <Col span={8}><Form.Item name="isAvailable" label="Available" valuePropName="checked"><Switch /></Form.Item></Col>
            <Col span={8}><Form.Item name="notReadyYet" label="Construction" valuePropName="checked"><Switch /></Form.Item></Col>
            <Col span={8}><Form.Item name="isFeatured" label="Featured" valuePropName="checked"><Switch /></Form.Item></Col>
          </Row>

          <div className="flex justify-end gap-3 mt-6">
            <Button onClick={closeModal}>Cancel</Button>
            <Button type="primary" htmlType="submit" loading={loading} style={{ backgroundColor: THEME.primary }}>Save Property</Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default PropertyManagement;