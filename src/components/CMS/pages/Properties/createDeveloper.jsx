import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import {
  Button, Modal, Form, Input, Popconfirm, Card, Table,
  Typography, Avatar, Row, Col, Statistic, Space, Divider, message, notification, Tooltip
} from 'antd';
import {
  PlusOutlined, UserOutlined, MailOutlined, PhoneOutlined,
  DeleteOutlined, EditOutlined, SearchOutlined, UsergroupAddOutlined, GlobalOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

const THEME = {
  primary: "#7c3aed", 
  success: "#10b981",
  error: "#ef4444",
};

const CreateDeveloper = () => {
  const BASE_URL = "https://xoto.ae/api/property"; 

  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchText] = useState('');
  
  const [modalVisible, setModalVisible] = useState(false);
  const [editingId, setEditingId] = useState(null); 
  const [form] = Form.useForm();

  // --- 1. GET ALL DEVELOPERS ---
  const fetchDevelopers = async (page = 1, limit = 10, search = '') => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/get-all-developers`, {
        params: { page, limit, search: search || undefined }
      });
      
      const resData = response.data;
      const rawList = resData?.data || resData || [];
      setDevelopers(rawList);

      const count = resData?.pagination?.total || resData?.total || rawList.length || 0;
      setTotal(count);
      
    } catch (err) {
      message.error("Failed to load developers list.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
        fetchDevelopers(currentPage, pageSize, searchText);
    }, 400);
    return () => clearTimeout(delayDebounce);
  }, [currentPage, pageSize, searchText]);

  // --- 2. GET SINGLE DEVELOPER BY ID (For Editing) ---
  const fetchDeveloperById = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/get-developer-by-id`, {
        params: { id }
      });
      const dev = response.data?.data || response.data;
      if (dev) {
        form.setFieldsValue({
          name: dev.name,
          email: dev.email,
          phone_number: dev.phone_number,
          country_code: dev.country_code || '+91'
        });
        setEditingId(id);
        setModalVisible(true);
      }
    } catch (err) {
      message.error("Failed to fetch developer details.");
    } finally {
      setLoading(false);
    }
  };

  // --- 3. CREATE OR UPDATE (EDIT) DEVELOPER ---
  const handleSave = async (values) => {
    setLoading(true);
    try {
      const payload = {
        name: values.name,
        email: values.email,
        phone_number: values.phone_number,
        country_code: values.country_code,
      };

      let response;
      if (editingId) {
        // Updated to use your Edit API format: edit-developer?id=XYZ
        response = await axios.post(`${BASE_URL}/edit-developer`, payload, {
          params: { id: editingId }
        });
      } else {
        response = await axios.post(`${BASE_URL}/create-developer`, payload);
      }
      
      if (response.status === 200 || response.status === 201) {
        notification.success({
          message: editingId ? 'Developer Updated' : 'Developer Created',
          description: `Developer ${values.name} has been successfully ${editingId ? 'updated' : 'registered'}.`,
          placement: 'topRight'
        });
        closeModal();
        fetchDevelopers(currentPage, pageSize);
      }
    } catch (err) {
      message.error(err.response?.data?.message || "Failed to save developer details.");
    } finally {
      setLoading(false);
    }
  };

  // --- 4. DELETE DEVELOPER ---
  const deleteDeveloper = async (id) => {
    try {
      setLoading(true);
      const response = await axios.post(`${BASE_URL}/delete-developer-by-id?id=${id}`); 

      if (response.status === 200 || response.status === 204) {
          message.success("Developer deleted successfully.");
          fetchDevelopers(currentPage, pageSize, searchText);
      }
    } catch (err) {
      message.error(err.response?.data?.message || "Deletion failed.");
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setEditingId(null);
    form.resetFields();
  };

  const columns = [
    {
      title: 'Developer Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => (
        <Space>
          <Avatar size="small" icon={<UserOutlined />} style={{ backgroundColor: THEME.primary }} />
          <Text strong>{text}</Text>
        </Space>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (email) => (
        <Text type="secondary"><MailOutlined /> {email}</Text>
      ),
    },
    {
      title: 'Contact',
      key: 'contact',
      render: (_, record) => (
        <Text><PhoneOutlined /> {record.country_code} {record.phone_number}</Text>
      ),
    },
    {
      title: 'Action',
      key: 'actions',
      align: 'center',
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Edit">
            <Button 
              type="text" 
              icon={<EditOutlined style={{ color: THEME.primary }} />} 
              onClick={() => fetchDeveloperById(record._id || record.id)}
            />
          </Tooltip>
          
          <Popconfirm 
            title="Are you sure you want to delete?" 
            onConfirm={() => deleteDeveloper(record._id || record.id)} 
            okText="Yes, Delete" 
            cancelText="No"
            okButtonProps={{ danger: true, loading: loading }}
          >
            <Tooltip title="Delete">
              <Button type="text" danger icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Title level={3} style={{ margin: 0 }}>Developer Management</Title>
          <Text type="secondary">Manage your real estate developers professionally.</Text>
        </div>
        <Button 
          type="primary" 
          size="large" 
          icon={<PlusOutlined />} 
          onClick={() => setModalVisible(true)}
          style={{ backgroundColor: THEME.primary, borderColor: THEME.primary }}
        >
          Add New Developer
        </Button>
      </div>

      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={8}>
          <Card bordered={false} className="shadow-sm border-t-4" style={{ borderColor: THEME.primary }}>
            <Statistic 
              title="Total Developers" 
              value={total} 
              prefix={<UsergroupAddOutlined style={{ color: THEME.primary }} />} 
            />
          </Card>
        </Col>
      </Row>

      <Card bordered={false} className="shadow-md" bodyStyle={{ padding: 0 }}>
        <div className="p-4 border-b bg-white rounded-t-lg">
          <Input 
            prefix={<SearchOutlined className="text-gray-400" />} 
            placeholder="Search by name or email..." 
            style={{ maxWidth: 400 }}
            onChange={(e) => {
                setSearchText(e.target.value);
                setCurrentPage(1);
            }}
            allowClear
            size="large"
          />
        </div>

        <Table 
          columns={columns} 
          dataSource={developers} 
          loading={loading}
          rowKey={(record) => record._id || record.id}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: total,
            showSizeChanger: true,
            onChange: (page, size) => {
              setCurrentPage(page);
              setPageSize(size);
            },
          }}
        />
      </Card>

      <Modal
        title={<div className="font-bold text-lg">{editingId ? <EditOutlined /> : <PlusOutlined />} {editingId ? 'Edit Developer' : 'Register New Developer'}</div>}
        open={modalVisible}
        onCancel={closeModal}
        footer={null}
        centered
        destroyOnClose
        width={500}
      >
        <Divider style={{ margin: '10px 0 25px 0' }} />
        <Form form={form} layout="vertical" onFinish={handleSave} initialValues={{ country_code: '+91' }}>
          <Form.Item name="name" label="Developer Name" rules={[{ required: true, message: 'Please enter developer name' }]}>
            <Input prefix={<UserOutlined />} placeholder="e.g. John Doe" size="large" />
          </Form.Item>

          <Form.Item name="email" label="Email Address" rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}>
            <Input prefix={<MailOutlined />} placeholder="johndoe@gmail.com" size="large" />
          </Form.Item>

          <Row gutter={10}>
            <Col span={7}>
              <Form.Item name="country_code" label="Code">
                <Input prefix={<GlobalOutlined />} readOnly style={{ backgroundColor: '#f5f5f5' }} size="large" />
              </Form.Item>
            </Col>
            <Col span={17}>
              <Form.Item 
                name="phone_number" 
                label="Phone Number" 
                rules={[{ required: true, pattern: /^\d{10}$/, message: 'Must be exactly 10 digits' }]}
              >
                <Input prefix={<PhoneOutlined />} placeholder="9876543210" size="large" maxLength={10} />
              </Form.Item>
            </Col>
          </Row>

          <div className="flex justify-end gap-3 mt-6">
            <Button size="large" onClick={closeModal}>Cancel</Button>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading} 
              size="large"
              style={{ backgroundColor: THEME.primary, borderColor: THEME.primary }}
            >
              {editingId ? 'Update Changes' : 'Save Developer'}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateDeveloper;