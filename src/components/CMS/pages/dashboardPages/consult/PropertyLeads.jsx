// src/components/property/PropertyLeads.jsx
import React, { useState, useEffect } from 'react';
import {
  Card, Drawer, Descriptions, Tag, Button, Space, Badge,
  Alert, message, Avatar, Row, Col, Input, Tabs, Select
} from 'antd';
import {
  PhoneOutlined, MailOutlined, UserOutlined,
  HomeOutlined, DollarCircleOutlined, CalendarOutlined,
  CheckCircleOutlined, EyeOutlined, DeleteOutlined, BellOutlined
} from '@ant-design/icons';
import { apiService } from '../../../../../manageApi/utils/custom.apiservice';
import { showSuccessAlert, showConfirmDialog } from '../../../../../manageApi/utils/sweetAlert';
import CustomTable from '../../../pages/custom/CustomTable';

const typeConfig = {
  buy: { label: 'Buy Property', color: 'blue', icon: <HomeOutlined /> },
  sell: { label: 'Sell Property', color: 'purple', icon: <DollarCircleOutlined /> },
  schedule_visit: { label: 'Schedule Visit', color: 'orange', icon: <CalendarOutlined /> }
};

const statusConfig = {
  submit: { label: 'New Lead', color: 'orange', icon: <BellOutlined /> },
  contacted: { label: 'Contacted', color: 'green', icon: <CheckCircleOutlined /> }
};

const PropertyLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0
  });

  const fetchLeads = async (tab = activeTab, page = 1, limit = 10, search = '') => {
    setLoading(true);
    try {
      const params = { page, limit };
      if (search) params.search = search;
      if (tab !== 'all') params.type = tab;

      const res = await apiService.get('/property/lead', params);
      if (res.success) {
        setLeads(res.data);
        setPagination({
          currentPage: res.pagination?.page || 1,
          itemsPerPage: res.pagination?.limit || 10,
          totalItems: res.pagination?.total || 0
        });
      }
    } catch (err) {
      message.error('Failed to load property leads');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads(activeTab, 1, 10, searchTerm);
  }, [activeTab]);

  const handleTabChange = (key) => {
    setActiveTab(key);
    fetchLeads(key, 1, 10, searchTerm);
  };

  const handleSearch = () => {
    fetchLeads(activeTab, 1, 10, searchTerm);
  };

  const handlePageChange = (page, pageSize) => {
    fetchLeads(activeTab, page, pageSize, searchTerm);
  };

  const markAsContacted = async (id) => {
    try {
      await apiService.put(`/property/lead/${id}/contacted`);
      showSuccessAlert('Success!', 'Lead marked as contacted');
      fetchLeads(activeTab);
      if (selectedLead?._id === id) {
        setSelectedLead({ ...selectedLead, status: 'contacted' });
      }
    } catch (err) {
      message.error('Failed to update');
    }
  };

  const softDelete = async (id) => {
    const result = await showConfirmDialog('Delete Lead?', 'This will move it to trash.', 'Yes, Delete');
    if (result.isConfirmed) {
      try {
        await apiService.delete(`/property/lead/${id}`);
        showSuccessAlert('Deleted', 'Lead moved to trash');
        fetchLeads(activeTab);
      } catch (err) {
        message.error('Delete failed');
      }
    }
  };

  const columns = [
    {
      title: 'Name',
      render: (_, record) => (
        <Space>
          <Avatar size="small" icon={<UserOutlined />} />
          <div>
            <div className="font-medium">
              {record.full_name || `${record.name.first_name} ${record.name.last_name}`}
            </div>
            <div className="text-xs text-gray-500">
              {new Date(record.createdAt).toLocaleDateString()}
            </div>
          </div>
        </Space>
      )
    },
    {
      title: 'Type',
      render: (_, record) => {
        const config = typeConfig[record.type];
        return <Tag icon={config.icon} color={config.color}>{config.label}</Tag>;
      }
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
              setSelectedLead(record);
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
      key: 'all',
      label: (
        <span>
          All Leads
          <Badge count={leads.length} style={{ marginLeft: 8, backgroundColor: '#1890ff' }} />
        </span>
      )
    },
    ...Object.keys(typeConfig).map(key => ({
      key,
      label: (
        <span>
          {typeConfig[key].icon} {typeConfig[key].label}
          <Badge 
            count={leads.filter(l => l.type === key).length} 
            style={{ marginLeft: 8, backgroundColor: typeConfig[key].color }} 
          />
        </span>
      )
    }))
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Property Leads</h1>
        <p className="text-gray-600 mt-1">Manage all Buy, Sell & Visit requests</p>
      </div>

      {/* New Leads Alert */}
      {leads.some(l => l.status === 'submit') && (
        <Alert
          className="mb-6"
          message={
            <div className="flex items-center">
              <BellOutlined className="mr-2 text-xl" />
              <strong>{leads.filter(l => l.status === 'submit').length} new lead(s) waiting!</strong>
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
              placeholder="Search by name, email, mobile, project..."
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
            data={leads}
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
        title="Property Lead Details"
        placement="right"
        width={650}
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
      >
        {selectedLead && (
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar size={70} icon={<UserOutlined />} />
              <div>
                <h3 className="text-2xl font-bold">{selectedLead.full_name}</h3>
                <Tag icon={typeConfig[selectedLead.type].icon} color={typeConfig[selectedLead.type].color}>
                  {typeConfig[selectedLead.type].label}
                </Tag>
                <p className="text-gray-500 mt-1">
                  Submitted: {new Date(selectedLead.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            <Descriptions bordered column={1}>
              <Descriptions.Item label="Email">
                <Space><MailOutlined /> {selectedLead.email}</Space>
              </Descriptions.Item>
              <Descriptions.Item label="Mobile">
                <Space><PhoneOutlined /> {selectedLead.mobile?.country_code} {selectedLead.mobile?.number}</Space>
              </Descriptions.Item>
              <Descriptions.Item label="Preferred Contact">
                <Tag>{selectedLead.preferred_contact?.toUpperCase()}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                <Tag icon={statusConfig[selectedLead.status].icon} color={statusConfig[selectedLead.status].color}>
                  {statusConfig[selectedLead.status].label}
                </Tag>
              </Descriptions.Item>
            </Descriptions>

            {/* Type-specific Details */}
            {selectedLead.type === 'buy' && (
              <Card title="Looking For">
                <p><strong>Bedrooms:</strong> {selectedLead.desired_bedrooms}</p>
              </Card>
            )}

            {selectedLead.type === 'sell' && (
              <Card title="Property Details">
                <p><strong>Project:</strong> {selectedLead.project_name || 'N/A'}</p>
                <p><strong>Location:</strong> {selectedLead.city}, {selectedLead.area}</p>
                <p><strong>Type:</strong> {selectedLead.unit_type} • {selectedLead.bedroom_config}</p>
                {selectedLead.price && <p><strong>Price:</strong> AED {selectedLead.price.toLocaleString()}</p>}
                {selectedLead.size_sqft && <p><strong>Size:</strong> {selectedLead.size_sqft} Sq.ft</p>}
                {selectedLead.description && <p className="mt-3 italic">"{selectedLead.description}"</p>}
              </Card>
            )}

            {selectedLead.type === 'schedule_visit' && (
              <Card title="Visit Request">
                <p><strong>Occupation:</strong> {selectedLead.occupation}</p>
                <p><strong>Location:</strong> {selectedLead.location}</p>
              </Card>
            )}

            {selectedLead.status === 'submit' && (
              <Button
                type="primary"
                size="large"
                block
                icon={<CheckCircleOutlined />}
                onClick={() => {
                  markAsContacted(selectedLead._id);
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

export default PropertyLeads;