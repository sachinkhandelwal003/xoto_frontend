// src/components/CMS/pages/dashboardPages/consult/Enquiry.jsx
import React, { useState, useEffect } from 'react';
import {
  Card, Drawer, Descriptions, Tag, Button, Space, Badge,
  Alert, message, Avatar, Row, Col, Input, Tabs, Select
} from 'antd';
import {
  PhoneOutlined, MailOutlined, MessageOutlined, UserOutlined,
  ClockCircleOutlined, CheckCircleOutlined, EyeOutlined,
  DeleteOutlined, BellOutlined
} from '@ant-design/icons';
import { apiService } from '../../../../../manageApi/utils/custom.apiservice';
import { showSuccessAlert, showConfirmDialog } from '../../../../../manageApi/utils/sweetAlert';
import CustomTable from '../../../pages/custom/CustomTable';

const statusConfig = {
  submit: { label: 'New Submission', color: 'orange', icon: <ClockCircleOutlined /> },
  contacted: { label: 'Contacted', color: 'green', icon: <CheckCircleOutlined /> }
};

const Enquiry = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [activeTab, setActiveTab] = useState('submit');
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0
  });
  const [searchTerm, setSearchTerm] = useState('');

  const fetchEnquiries = async (status = activeTab, page = 1, limit = 10, search = '') => {
    setLoading(true);
    try {
      const params = { page, limit, status };
      if (search) params.search = search;

      const res = await apiService.get('/enquiry', params);
      if (res.success) {
        setEnquiries(res.data);
        setPagination({
          currentPage: res.pagination?.page || 1,
          itemsPerPage: res.pagination?.limit || 10,
          totalItems: res.pagination?.total || 0
        });
      }
    } catch (err) {
      message.error('Failed to load enquiries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries(activeTab, 1, 10, searchTerm);
  }, [activeTab]);

  const handleTabChange = (key) => {
    setActiveTab(key);
    fetchEnquiries(key, 1, 10, searchTerm);
  };

  const handleSearch = () => {
    fetchEnquiries(activeTab, 1, 10, searchTerm);
  };

  const handlePageChange = (page, pageSize) => {
    fetchEnquiries(activeTab, page, pageSize, searchTerm);
  };

  const markAsContacted = async (id) => {
    try {
      await apiService.put(`/enquiry/${id}/contacted`);
      showSuccessAlert('Success!', 'Marked as contacted');
      fetchEnquiries(activeTab);
      if (selectedEnquiry?._id === id) {
        setSelectedEnquiry({ ...selectedEnquiry, status: 'contacted' });
      }
    } catch (err) {
      message.error('Failed to update status');
    }
  };

  const softDelete = async (id) => {
    const result = await showConfirmDialog('Delete Enquiry?', 'This action will move it to trash.', 'Yes, Delete');
    if (result.isConfirmed) {
      try {
        await apiService.delete(`/enquiry/${id}`);
        showSuccessAlert('Deleted', 'Enquiry moved to trash');
        fetchEnquiries(activeTab);
      } catch (err) {
        message.error('Delete failed');
      }
    }
  };

  const columns = [
    {
      title: 'Name',
      key: 'name',
      render: (_, record) => (
        <Space>
          <Avatar size="small" icon={<UserOutlined />} />
          <div>
            <div className="font-medium">{record.full_name || `${record.name.first_name} ${record.name.last_name}`}</div>
            <div className="text-xs text-gray-500">
              {new Date(record.createdAt).toLocaleDateString()}
            </div>
          </div>
        </Space>
      )
    },
    {
      title: 'Contact',
      render: (_, record) => (
        <Space direction="vertical" size={0}>
          <Space><MailOutlined className="text-gray-500" /> {record.email}</Space>
          <Space><PhoneOutlined className="text-gray-500" /> {record.mobile?.country_code || '+91'} {record.mobile?.number}</Space>
        </Space>
      )
    },
    {
      title: 'Preferred',
      render: (_, record) => (
        <Tag>
          {record.preferred_contact === 'whatsapp' && 'WhatsApp'}
          {record.preferred_contact === 'phone' && 'Call'}
          {record.preferred_contact === 'email' && 'Email'}
        </Tag>
      )
    },
    {
      title: 'Status',
      render: (_, record) => {
        const config = statusConfig[record.status];
        return <Tag icon={config.icon} color={config.color}>{config.label}</Tag>;
      }
    },
    {
      title: 'Actions',
      render: (_, record) => (
        <Space>
          <Button
            size="small"
            icon={<EyeOutlined />}
            onClick={() => {
              setSelectedEnquiry(record);
              setDrawerVisible(true);
            }}
          >
            View
          </Button>

          {record.status === 'submit' && (
            <Button
              type="primary"
              size="small"
              icon={<CheckCircleOutlined />}
              onClick={() => markAsContacted(record._id)}
            >
              Mark Contacted
            </Button>
          )}

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

  const tabItems = [
    {
      key: 'submit',
      label: (
        <span>
          {statusConfig.submit.icon} New Submissions
          <Badge count={enquiries.filter(e => e.status === 'submit').length} style={{ marginLeft: 8, backgroundColor: '#fa8c16' }} />
        </span>
      )
    },
    {
      key: 'contacted',
      label: (
        <span>
          {statusConfig.contacted.icon} Contacted
          <Badge count={enquiries.filter(e => e.status === 'contacted').length} style={{ marginLeft: 8, backgroundColor: '#52c41a' }} />
        </span>
      )
    }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Website Enquiries</h1>
        <p className="text-gray-600 mt-1">All contact form submissions from your website</p>
      </div>

      {activeTab === 'submit' && enquiries.some(e => e.status === 'submit') && (
        <Alert
          className="mb-6"
          message={
            <div className="flex items-center">
              <BellOutlined className="mr-2 text-xl" />
              <strong>{enquiries.filter(e => e.status === 'submit').length} new enquiry(ies) waiting!</strong>
            </div>
          }
          type="warning"
          showIcon
        />
      )}

      <Card className="mb-6">
        <Row gutter={16} align="middle">
          <Col flex="auto">
            <Input.Search
              placeholder="Search by name, email, mobile..."
              allowClear
              size="large"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onSearch={handleSearch}
            />
          </Col>
        </Row>
      </Card>

      <Card>
        <Tabs activeKey={activeTab} onChange={handleTabChange} items={tabItems} type="card" />

        <div className="mt-6">
          <CustomTable
            columns={columns}
            data={enquiries}
            loading={loading}
            totalItems={pagination.totalItems}
            currentPage={pagination.currentPage}
            itemsPerPage={pagination.itemsPerPage}
            onPageChange={handlePageChange}
          />
        </div>
      </Card>

      {/* Fixed Drawer - This was the main error */}
      <Drawer
        title="Enquiry Details"
        placement="right"
        width={600}
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
      >
        {selectedEnquiry && (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar size={64} icon={<UserOutlined />} />
              <div>
                <h3 className="text-2xl font-bold">{selectedEnquiry.full_name}</h3>
                <p className="text-gray-500">
                  Submitted on {new Date(selectedEnquiry.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            <Descriptions bordered column={1} size="middle">
              <Descriptions.Item label="Email">
                <Space><MailOutlined /> {selectedEnquiry.email}</Space>
              </Descriptions.Item>
              <Descriptions.Item label="Mobile">
                <Space><PhoneOutlined /> {selectedEnquiry.mobile?.country_code} {selectedEnquiry.mobile?.number}</Space>
              </Descriptions.Item>
              <Descriptions.Item label="Preferred Contact">
                <Tag>
                  {selectedEnquiry.preferred_contact === 'whatsapp' && 'WhatsApp'}
                  {selectedEnquiry.preferred_contact === 'phone' && 'Phone Call'}
                  {selectedEnquiry.preferred_contact === 'email' && 'Email'}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                <Tag icon={statusConfig[selectedEnquiry.status].icon} color={statusConfig[selectedEnquiry.status].color}>
                  {statusConfig[selectedEnquiry.status].label}
                </Tag>
              </Descriptions.Item>
            </Descriptions>

            <Card title={<span><MessageOutlined /> Customer Message</span>}>
              <p className="text-gray-700 whitespace-pre-wrap text-base">
                {selectedEnquiry.message || 'No message provided.'}
              </p>
            </Card>

            {selectedEnquiry.status === 'submit' && (
              <Button
                type="primary"
                size="large"
                block
                icon={<CheckCircleOutlined />}
                onClick={() => {
                  markAsContacted(selectedEnquiry._id);
                  setDrawerVisible(false);
                }}
              >
                Mark as Contacted
              </Button>
            )}
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default Enquiry;