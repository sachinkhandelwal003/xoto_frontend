import React, { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  Form,
  Input,
  Select,
  Space,
  Tag,
  Switch,
  Popconfirm,
} from 'antd';
import {
  PlusOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  LockOutlined,
} from '@ant-design/icons';
import CustomTable from '../../../pages/custom/CustomTable';
import { apiService } from '../../../../../manageApi/utils/custom.apiservice';
import { showToast } from '../../../../../manageApi/utils/toast';

const { Option } = Select;

const UsersRoleList = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // ← Default 10
  const [filters, setFilters] = useState({ search: '', role: '', active: '' });
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Fetch Roles
  const fetchRoles = async () => {
    try {
      const res = await apiService.get('/roles', { params: { limit: 100 } });
      setRoles(res.roles || []);
    } catch (err) {
      showToast('Failed to load roles', 'error');
    }
  };

  // FETCH USERS WITH DEFAULT: page=1 & limit=10
  const fetchUsers = async (page = 1, limit = 10, currentFilters = {}) => {
    setLoading(true);
    try {
      const params = {
        page,
        limit,
        ...(currentFilters.search && { search: currentFilters.search }),
        ...(currentFilters.role && { role: currentFilters.role }),
        ...(currentFilters.active !== '' && { active: currentFilters.active }),
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

  // AUTO LOAD ON PAGE OPEN → page=1, limit=10
  useEffect(() => {
    fetchRoles();
    fetchUsers(1, 10); // ← This triggers default API call
  }, []);

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
    fetchUsers(1, itemsPerPage, newFilters); // Reset to page 1 on filter
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setItemsPerPage(pageSize);
    fetchUsers(page, pageSize, filters);
  };

  // Toggle & Delete (unchanged)
  const toggleStatus = async (id, current) => {
    try {
      await apiService.patch(`/users/${id}/toggle`);
      showToast(`User ${current ? 'deactivated' : 'activated'}`, 'success');
      fetchUsers(currentPage, itemsPerPage, filters);
    } catch (err) {
      showToast('Failed to update status', 'error');
    }
  };

  const deleteUser = async (id) => {
    try {
      await apiService.delete(`/users/${id}`);
      showToast('User deleted', 'success');
      fetchUsers(currentPage, itemsPerPage, filters);
    } catch (err) {
      showToast('Delete failed', 'error');
    }
  };

  // Create User with perfect backend error handling
  const handleCreate = async (values) => {
    form.setFields([]);

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
        confirm_password:values.confirm_password,
        role: values.role,
      });

      showToast('User created successfully', 'success');
      setModalVisible(false);
      form.resetFields();
      fetchUsers(currentPage, itemsPerPage, filters);
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
        showToast( 'Registration failed', 'error');
      }
    }
  };

  const getSerialNumber = (index) => (currentPage - 1) * itemsPerPage + index + 1;

  const columns = [
 {
      key: 'id',
      title: 'Id',
      render: (_, r) => `${r._id} `,
    },
    {
      key: 'name',
      title: 'Name',
      render: (_, r) => `${r.name.first_name} ${r.name.last_name}`,
    },
    { key: 'email', title: 'Email', dataIndex: 'email' },
    { key: 'mobile', title: 'Mobile', dataIndex: 'mobile' },
    {
      key: 'role',
      title: 'Role',
      render: (_, r) => <Tag color="blue">{r.role?.name || 'N/A'}</Tag>,
      filterable: true,
      filterKey: 'role',
      filterOptions: roles.map(r => ({ label: r.name, value: r._id })),
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
        />
      ),
      filterable: true,
      filterKey: 'active',
      filterOptions: [
        { label: 'Active', value: 'true' },
        { label: 'Inactive', value: 'false' },
      ],
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (_, r) => (
        <Popconfirm title="Delete user?" onConfirm={() => deleteUser(r._id)}>
          <Button danger size="small">Delete</Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
          <p className="text-gray-600">Manage all users and roles</p>
        </div>
        <Button
          type="primary"
          size="large"
          icon={<PlusOutlined />}
          onClick={() => {
            form.resetFields();
            form.setFields([]);
            setModalVisible(true);
          }}
        >
          Add New User
        </Button>
      </div>

      <CustomTable
        columns={columns}
        data={users}
        loading={loading}
        totalItems={totalUsers}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        onFilter={handleFilter}
      />

      {/* Create User Modal */}
      <Modal
        title="Add New User"
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
          form.setFields([]);
        }}
        footer={null}
        width={680}
        destroyOnClose
      >
        <Form form={form} onFinish={handleCreate} layout="vertical">
          <div className="grid grid-cols-2 gap-4">
            <Form.Item name="first_name" label="First Name" rules={[{ required: true }]}>
              <Input prefix={<UserOutlined />} />
            </Form.Item>
            <Form.Item name="last_name" label="Last Name" rules={[{ required: true }]}>
              <Input prefix={<UserOutlined />} />
            </Form.Item>
          </div>

          <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
            <Input prefix={<MailOutlined />} />
          </Form.Item>

          <Form.Item
            name="mobile"
            label="Mobile"
            rules={[
              { required: true },
              { len: 10, message: 'Must be 10 digits' },
              { pattern: /^[6-9]\d{9}$/, message: 'Invalid Indian mobile' },
            ]}
          >
            <Input prefix={<PhoneOutlined />} maxLength={10} />
          </Form.Item>

          <Form.Item name="role" label="Role" rules={[{ required: true }]}>
            <Select placeholder="Select role" loading={!roles.length}>
              {roles.map(r => (
                <Option key={r._id} value={r._id}>{r.name}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="password" label="Password" rules={[{ required: true, min: 6 }]}>
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>

          <Form.Item name="confirm_password" label="Confirm Password" rules={[{ required: true }]}>
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>

          <Form.Item className="mb-0 text-right">
            <Button onClick={() => setModalVisible(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit" loading={loading} className="ml-2">
              Create User
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UsersRoleList;