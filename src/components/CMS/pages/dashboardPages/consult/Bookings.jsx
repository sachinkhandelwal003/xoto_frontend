// src/components/consult/ConsultBookings.jsx
import React, { useState, useEffect } from 'react';
import {
  Tabs, Card, Drawer, Descriptions, Tag, Button, Space, Badge,
  Alert, message, Spin, Avatar, List, Row, Col, Divider, Modal, Select, Input
} from 'antd';
import {
  PhoneOutlined, MailOutlined, MessageOutlined, UserOutlined,
  CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined,
  EyeOutlined, DeleteOutlined, UndoOutlined, EditOutlined,BellOutlined
} from '@ant-design/icons';
import { apiService } from '../../../../../manageApi/utils/custom.apiservice';
import { showSuccessAlert, showConfirmDialog } from '../../../../../manageApi/utils/sweetAlert';
import CustomTable from '../../../pages/custom/CustomTable';

const { Option } = Select;
const { TextArea } = Input;

const statusConfig = {
  submitted: { label: 'Submitted', color: 'orange', icon: <ClockCircleOutlined /> },
  contacted: { label: 'Contacted', color: 'blue', icon: <PhoneOutlined /> },
  qualified: { label: 'Qualified', color: 'green', icon: <CheckCircleOutlined /> },
  not_qualified: { label: 'Not Qualified', color: 'red', icon: <CloseCircleOutlined /> },
  converted: { label: 'Converted', color: 'purple', icon: <CheckCircleOutlined /> },
  rejected: { label: 'Rejected', color: 'volcano', icon: <CloseCircleOutlined /> },
};

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [activeTab, setActiveTab] = useState('submitted');
  const [pagination, setPagination] = useState({ currentPage: 1, itemsPerPage: 10, totalItems: 0 });
  const [searchTerm, setSearchTerm] = useState('');
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const fetchBookings = async (status = activeTab, page = 1, limit = 10, search = '') => {
    setLoading(true);
    try {
      const params = { page, limit, status };
      if (search) params.search = search;

      const res = await apiService.get('/consult', params);
      if (res.success) {
        setBookings(res.data);
        setPagination({
          currentPage: res.pagination.page,
          itemsPerPage: res.pagination.limit,
          totalItems: res.pagination.total
        });
      }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings(activeTab, 1, 10, searchTerm);
  }, [activeTab]);

  const handleTabChange = (key) => {
    setActiveTab(key);
    fetchBookings(key, 1, 10, searchTerm);
  };

  const handleSearch = () => {
    fetchBookings(activeTab, 1, 10, searchTerm);
  };

  const handlePageChange = (page, pageSize) => {
    fetchBookings(activeTab, page, pageSize, searchTerm);
  };

  const updateStatus = async (id, newStatus) => {
    setUpdatingStatus(true);
    try {
      await apiService.put(`/consult/${id}/status`, { status: newStatus });
      showSuccessAlert('Success', `Status updated to ${statusConfig[newStatus].label}`);
      fetchBookings(activeTab);
    } catch (err) {
      message.error('Failed to update status');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const softDelete = async (id) => {
    const confirm = await showConfirmDialog('Delete?', 'Move to trash?', 'Yes, Delete');
    if (confirm.isConfirmed) {
      try {
        await apiService.delete(`/consult/${id}`);
        showSuccessAlert('Deleted', 'Moved to trash');
        fetchBookings(activeTab);
      } catch (err) {
        message.error('Delete failed');
      }
    }
  };

  const columns = [
    {
      key: 'full_name',
      title: 'Customer Name',
      render: (_, record) => (
        <Space>
          <Avatar icon={<UserOutlined />} size="small" />
          <span className="font-medium">{record.full_name}</span>
        </Space>
      )
    },
    {
      key: 'email',
      title: 'Email',
      render: (_, record) => (
        <Space>
          <MailOutlined className="text-gray-500" />
          <span>{record.email}</span>
        </Space>
      )
    },
    {
      key: 'mobile',
      title: 'Mobile',
      render: (_, record) => (
        <Space>
          <PhoneOutlined className="text-gray-500" />
          <span>{record.mobile.country_code} {record.mobile.number}</span>
        </Space>
      )
    },
    {
      key: 'status',
      title: 'Status',
      render: (_, record) => {
        const config = statusConfig[record.status];
        return (
          <Tag color={config.color} icon={config.icon}>
            {config.label}
          </Tag>
        );
      }
    },
    {
      key: 'createdAt',
      title: 'Submitted',
      render: (_, record) => new Date(record.createdAt).toLocaleDateString()
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (_, record) => (
        <Space>
          <Button
            size="small"
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedBooking(record);
              setDrawerVisible(true);
            }}
          >
            View
          </Button>

          <Select
            size="small"
            value={record.status}
            style={{ width: 140 }}
            onChange={(val) => updateStatus(record._id, val)}
            loading={updatingStatus}
          >
            {Object.keys(statusConfig).map(key => (
              <Option key={key} value={key}>
                <Space>{statusConfig[key].icon} {statusConfig[key].label}</Space>
              </Option>
            ))}
          </Select>

          <Button
            danger
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => softDelete(record._id)}
          />
        </Space>
      )
    }
  ];

  const tabItems = Object.keys(statusConfig).map(key => ({
    key,
    label: (
      <span>
        {statusConfig[key].icon} {statusConfig[key].label}
        {key === 'submitted' && bookings.length > 0 && (
          <Badge count={bookings.length} style={{ marginLeft: 8 }} />
        )}
      </span>
    ),
    children: null
  }));

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Consultation Bookings</h1>
        <p className="text-gray-600 mt-1">Manage all incoming consultation requests</p>
      </div>

      {/* New Submissions Alert */}
      {activeTab === 'submitted' && bookings.length > 0 && (
        <Alert
          message={
            <div className="flex items-center justify-between">
              <span>
                <BellOutlined className="mr-2" />
                You have {bookings.length} new consultation request(s)
              </span>
            </div>
          }
          type="warning"
          showIcon
          className="mb-6"
        />
      )}

      {/* Search Bar */}
      <Card className="mb-6">
        <Row gutter={16} align="middle">
          <Col flex="auto">
            <Input.Search
              placeholder="Search by name, email, or mobile..."
              allowClear
              size="large"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onSearch={handleSearch}
            />
          </Col>
        </Row>
      </Card>

      {/* Tabs */}
      <Card>
        <Tabs
          activeKey={activeTab}
          onChange={handleTabChange}
          type="card"
          items={tabItems}
        />
        
        <div className="mt-6">
          <CustomTable
            columns={columns}
            data={bookings}
            loading={loading}
            totalItems={pagination.totalItems}
            currentPage={pagination.currentPage}
            itemsPerPage={pagination.itemsPerPage}
            onPageChange={handlePageChange}
          />
        </div>
      </Card>

      {/* Detail Drawer */}
      <Drawer
        title="Consultation Request Details"
        placement="right"
        width={600}
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
      >
        {selectedBooking && (
          <div className="space-y-6">
            <Card>
              <div className="flex items-center space-x-4 mb-6">
                <Avatar size={64} icon={<UserOutlined />} />
                <div>
                  <h3 className="text-xl font-bold">{selectedBooking.full_name}</h3>
                  <p className="text-gray-500">Submitted on {new Date(selectedBooking.createdAt).toLocaleString()}</p>
                </div>
              </div>

              <Descriptions column={1} bordered size="small">
                <Descriptions.Item label="Email">
                  <Space>
                    <MailOutlined />
                    {selectedBooking.email}
                  </Space>
                </Descriptions.Item>
                <Descriptions.Item label="Mobile">
                  <Space>
                    <PhoneOutlined />
                    {selectedBooking.mobile.country_code} {selectedBooking.mobile.number}
                  </Space>
                </Descriptions.Item>
                <Descriptions.Item label="Status">
                  <Tag color={statusConfig[selectedBooking.status].color} icon={statusConfig[selectedBooking.status].icon}>
                    {statusConfig[selectedBooking.status].label}
                  </Tag>
                </Descriptions.Item>
              </Descriptions>
            </Card>

            <Card title={<span><MessageOutlined /> Customer Message</span>}>
              <p className="text-gray-700 whitespace-pre-wrap">
                {selectedBooking.message || 'No message provided'}
              </p>
            </Card>

            <Card title="Quick Actions">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Select
                  size="large"
                  value={selectedBooking.status}
                  style={{ width: '100%' }}
                  onChange={(val) => updateStatus(selectedBooking._id, val)}
                >
                  {Object.keys(statusConfig).map(key => (
                    <Option key={key} value={key}>
                      <Space>{statusConfig[key].icon} {statusConfig[key].label}</Space>
                    </Option>
                  ))}
                </Select>
              </Space>
            </Card>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default Bookings;