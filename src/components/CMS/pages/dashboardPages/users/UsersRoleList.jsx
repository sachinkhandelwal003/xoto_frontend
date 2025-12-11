// src/pages/admin/UsersRoleList.jsx
import React, { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  Form,
  Input,
  Select,
  Tag,
  Switch,
  Popconfirm,
  Card,
  Typography,
  Tabs,
  Avatar,
  Row,
  Col,
  Statistic
} from 'antd';
import {
  PlusOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  LockOutlined,
  DeleteOutlined,
  SearchOutlined,
  TeamOutlined,
  SafetyCertificateFilled
} from '@ant-design/icons';
import CustomTable from '../../../pages/custom/CustomTable';
import { apiService } from '../../../../../manageApi/utils/custom.apiservice';
import { showToast } from '../../../../../manageApi/utils/toast';
const { Option } = Select;
const { Title, Text } = Typography;
const { TabPane } = Tabs;

// --- THEME CONSTANTS ---
const PURPLE_THEME = {
  primary: '#5C039B',
  secondary: '#8E44AD',
  light: '#F3E5F5',
  gradient: 'linear-gradient(135deg, #5C039B 0%, #8E44AD 100%)'
};

const UsersRoleList = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]); // This will only hold Supervisor & Accountant
  const [loading, setLoading] = useState(false);
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // Filters & State
  const [activeTab, setActiveTab] = useState('all'); 
  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  // --- API CALLS ---

  const fetchRoles = async () => {
    try {
      const res = await apiService.get('/roles', { params: { limit: 100 } });
      const allRoles = res.roles || [];
      
      // --- FILTER LOGIC: ONLY SUPERVISOR & ACCOUNTANT ---
      const allowedNames = ['Supervisor', 'Accountant'];
      const teamRoles = allRoles.filter(r => allowedNames.includes(r.name));
      
      setRoles(teamRoles);
    } catch (err) {
      showToast('Failed to load roles', 'error');
    }
  };

  const fetchUsers = async (page = 1, limit = 10, roleId = null, search = '') => {
    setLoading(true);
    try {
      const params = {
        page,
        limit,
        role: roleId === 'all' ? undefined : roleId,
        search: search || undefined
      };

      const res = await apiService.get('/users', params);
      setUsers(res.data || []);
      setTotalUsers(res.pagination?.total || 0);
      setCurrentPage(res.pagination?.page || page);
      setItemsPerPage(res.pagination?.limit || limit);
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to load users', 'error');
    } finally {
      setLoading(false);
    }
  };

  // --- EFFECTS ---

  useEffect(() => {
    fetchRoles();
    fetchUsers(1, 10, 'all');
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
        fetchUsers(1, itemsPerPage, activeTab, searchText);
    }, 300);
    return () => clearTimeout(timer);
  }, [activeTab, searchText]);

  // --- HANDLERS ---

  const handleTabChange = (key) => {
    setActiveTab(key);
    setCurrentPage(1);
  };

  const handlePageChange = (page, pageSize) => {
    fetchUsers(page, pageSize, activeTab, searchText);
  };

  const toggleStatus = async (id, current) => {
    try {
      await apiService.patch(`/users/${id}/toggle`);
      showToast(`User ${current ? 'deactivated' : 'activated'}`, 'success');
      fetchUsers(currentPage, itemsPerPage, activeTab, searchText);
    } catch (err) {
      showToast('Failed to update status', 'error');
    }
  };

  const deleteUser = async (id) => {
    try {
      await apiService.delete(`/users/${id}`);
      showToast('User deleted', 'success');
      fetchUsers(currentPage, itemsPerPage, activeTab, searchText);
    } catch (err) {
      showToast('Delete failed', 'error');
    }
  };

  const handleCreate = async (values) => {
    if (values.password !== values.confirm_password) {
      form.setFields([{ name: 'confirm_password', errors: ['Passwords do not match'] }]);
      return;
    }

    try {
      await apiService.post('/users/register', {
        name: { first_name: values.first_name, last_name: values.last_name },
        email: values.email,
        mobile: values.mobile,
        password: values.password,
        confirm_password: values.confirm_password,
        role: values.role,
      });

      showToast('User created successfully', 'success');
      setModalVisible(false);
      form.resetFields();
      fetchUsers(currentPage, itemsPerPage, activeTab, searchText);
    } catch (err) {
      const backendErrors = err.response?.data?.errors || [];
      if (backendErrors.length > 0) {
        const fieldErrors = backendErrors.map(item => {
          let field = item.field;
          if (field === 'name.first_name') field = 'first_name';
          if (field === 'name.last_name') field = 'last_name';
          return { name: field, errors: [item.message] };
        });
        form.setFields(fieldErrors);
      } else {
        showToast('Registration failed', 'error');
      }
    }
  };

  // --- COLUMNS ---
  const columns = [
    {
      key: 'avatar',
      title: '',
      width: 60,
      render: (_, r) => (
        <Avatar 
            style={{ backgroundColor: PURPLE_THEME.light, color: PURPLE_THEME.primary, verticalAlign: 'middle' }} 
            size="large"
        >
            {r.name?.first_name?.charAt(0)?.toUpperCase()}
        </Avatar>
      )
    },
    {
      key: 'info',
      title: 'Member Details',
      render: (_, r) => (
        <div>
            <div className="font-bold text-gray-800 text-base">
                {r.name?.first_name} {r.name?.last_name}
            </div>
            <div className="text-gray-500 text-xs flex items-center gap-2">
                <MailOutlined /> {r.email}
            </div>
            <div className="text-gray-500 text-xs flex items-center gap-2 mt-1">
                <PhoneOutlined /> {r.mobile}
            </div>
        </div>
      ),
    },
    {
      key: 'role',
      title: 'Role',
      render: (_, r) => {
        let color = '#5C039B'; // Default purple
        if (r.role?.name === 'Supervisor') color = '#fa8c16'; // Orange
        if (r.role?.name === 'Accountant') color = '#52c41a'; // Green
        
        return (
            <Tag color={color} style={{ padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600 }}>
                {r.role?.name || 'N/A'}
            </Tag>
        );
      },
    },
    {
      key: 'status',
      title: 'Status',
      render: (_, r) => (
        <Switch
          checked={r.isActive}
          onChange={() => toggleStatus(r._id, r.isActive)}
          checkedChildren="Active"
          unCheckedChildren="Inactive"
          style={{ backgroundColor: r.isActive ? '#52c41a' : undefined }}
        />
      ),
    },
    {
      key: 'actions',
      title: 'Action',
      render: (_, r) => (
        <Popconfirm 
            title="Delete Member?" 
            description="This action cannot be undone."
            onConfirm={() => deleteUser(r._id)}
            okText="Delete"
            cancelText="Cancel"
            okButtonProps={{ danger: true }}
        >
          <Button 
            type="text" 
            danger 
            icon={<DeleteOutlined />} 
            className="hover:bg-red-50 rounded-full"
          />
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      
      {/* HEADER SECTION */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <Title level={2} style={{ margin: 0, color: '#333', fontWeight: 800 }}>
             Team <span style={{ color: PURPLE_THEME.primary }}>Management</span>
          </Title>
          <Text type="secondary" className="text-base">
             Manage Supervisors & Accountants
          </Text>
        </div>
        
        <div className="flex gap-3">
            <Button
                type="primary"
                size="large"
                icon={<PlusOutlined />}
                onClick={() => {
                    form.resetFields();
                    setModalVisible(true);
                }}
                style={{
                    background: PURPLE_THEME.gradient,
                    border: 'none',
                    borderRadius: '12px',
                    height: '48px',
                    padding: '0 24px',
                    boxShadow: '0 4px 14px rgba(92, 3, 155, 0.3)'
                }}
            >
                Add Team Member
            </Button>
        </div>
      </div>

      {/* STATS & SEARCH */}
      <Row gutter={16} className="mb-6">
        <Col xs={24} md={8}>
            <Card bordered={false} className="shadow-sm rounded-2xl bg-white mb-4 md:mb-0">
                <Statistic 
                    title="Total Team Members" 
                    value={totalUsers} 
                    prefix={<TeamOutlined style={{ color: PURPLE_THEME.primary }} />} 
                    valueStyle={{ fontWeight: 'bold' }}
                />
            </Card>
        </Col>
        <Col xs={24} md={16}>
             <Card bordered={false} className="shadow-sm rounded-2xl bg-white h-full flex items-center px-4">
                <Input 
                    prefix={<SearchOutlined style={{ color: '#bfbfbf', fontSize: '18px' }} />}
                    placeholder="Search team members..." 
                    bordered={false}
                    size="large"
                    onChange={(e) => setSearchText(e.target.value)}
                    style={{ width: '100%' }}
                />
             </Card>
        </Col>
      </Row>

      {/* TABS & TABLE CARD */}
      <Card 
        bordered={false} 
        className="shadow-md rounded-2xl overflow-hidden"
        bodyStyle={{ padding: 0 }}
      >
        <Tabs
            activeKey={activeTab}
            onChange={handleTabChange}
            size="large"
            tabBarStyle={{ 
                padding: '0 24px', 
                marginBottom: 0, 
                background: '#fff',
                borderBottom: '1px solid #f0f0f0' 
            }}
        >
            <TabPane tab="All Team" key="all" />
            {roles.map(role => (
                <TabPane tab={role.name} key={role._id} />
            ))}
        </Tabs>

        <div className="p-0">
            <CustomTable
                columns={columns}
                data={users}
                loading={loading}
                totalItems={totalUsers}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
            />
        </div>
      </Card>

      {/* CREATE USER MODAL */}
      <Modal
        title={
            <div className="flex items-center gap-3 text-xl font-bold text-gray-800">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                    <UserOutlined />
                </div>
                Add Team Member
            </div>
        }
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
        }}
        footer={null}
        width={700}
        centered
        destroyOnClose
      >
        <Form form={form} onFinish={handleCreate} layout="vertical" className="mt-4">
          <Row gutter={16}>
            <Col span={12}>
                <Form.Item name="first_name" label="First Name" rules={[{ required: true }]}>
                    <Input prefix={<UserOutlined className="text-gray-400" />} size="large" className="rounded-lg" />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item name="last_name" label="Last Name" rules={[{ required: true }]}>
                    <Input prefix={<UserOutlined className="text-gray-400" />} size="large" className="rounded-lg" />
                </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
                <Form.Item name="email" label="Email Address" rules={[{ required: true, type: 'email' }]}>
                    <Input prefix={<MailOutlined className="text-gray-400" />} size="large" className="rounded-lg" />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item
                    name="mobile"
                    label="Mobile Number"
                    rules={[
                    { required: true },
                    { len: 10, message: 'Must be 10 digits' },
                    { pattern: /^[6-9]\d{9}$/, message: 'Invalid Indian mobile' },
                    ]}
                >
                    <Input prefix={<PhoneOutlined className="text-gray-400" />} maxLength={10} size="large" className="rounded-lg" />
                </Form.Item>
            </Col>
          </Row>

          <Form.Item name="role" label="Assign Role" rules={[{ required: true }]}>
            <Select placeholder="Select role" size="large" className="rounded-lg">
              {roles.map(r => (
                <Option key={r._id} value={r._id}>
                    <div className="flex items-center gap-2">
                        <SafetyCertificateFilled style={{ color: PURPLE_THEME.primary }} /> {r.name}
                    </div>
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
                <Form.Item name="password" label="Password" rules={[{ required: true, min: 6 }]}>
                    <Input.Password prefix={<LockOutlined className="text-gray-400" />} size="large" className="rounded-lg" />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item name="confirm_password" label="Confirm Password" rules={[{ required: true }]}>
                    <Input.Password prefix={<LockOutlined className="text-gray-400" />} size="large" className="rounded-lg" />
                </Form.Item>
            </Col>
          </Row>

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
            <Button size="large" onClick={() => setModalVisible(false)} className="rounded-lg">Cancel</Button>
            <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading} 
                size="large"
                style={{ background: PURPLE_THEME.primary, border: 'none' }}
                className="rounded-lg px-8"
            >
              Create Member
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default UsersRoleList;