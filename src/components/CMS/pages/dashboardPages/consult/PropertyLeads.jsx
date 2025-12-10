// src/components/property/PropertyLeads.jsx
import React, { useState, useEffect } from 'react';
import {
  Card, Drawer, Descriptions, Tag, Button, Space, Badge,
  Alert, message, Avatar, Row, Col, Input, Tabs, Select
} from 'antd';
import {
  PhoneOutlined, MailOutlined, UserOutlined,
  HomeOutlined, DollarCircleOutlined, CalendarOutlined,
  CheckCircleOutlined, EyeOutlined, DeleteOutlined, BellOutlined,
  UsergroupAddOutlined, BankOutlined
} from '@ant-design/icons';
import { apiService } from '../../../../../manageApi/utils/custom.apiservice';
import { showSuccessAlert, showConfirmDialog } from '../../../../../manageApi/utils/sweetAlert';
import CustomTable from '../../../pages/custom/CustomTable';

const typeConfig = {
  buy: { label: 'Buy Property', color: 'blue', icon: <HomeOutlined /> },
  sell: { label: 'Sell Property', color: 'purple', icon: <DollarCircleOutlined /> },
  schedule_visit: { label: 'Schedule Visit', color: 'orange', icon: <CalendarOutlined /> },
  rent: { label: 'Rent Property', color: 'cyan', icon: <BankOutlined /> },
  partner: { label: 'Partner', color: 'green', icon: <UsergroupAddOutlined /> }
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

  const getFullName = (record) => {
    if (record.full_name) return record.full_name;
    if (record.name && record.name.first_name) {
      return `${record.name.first_name} ${record.name.last_name || ''}`.trim();
    }
    return 'N/A';
  };

  const columns = [
    {
      title: 'Name',
      render: (_, record) => (
        <Space>
          <Avatar size="small" icon={<UserOutlined />} />
          <div>
            <div className="font-medium">
              {getFullName(record)}
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
        const config = typeConfig[record.type] || { label: 'Unknown', color: 'default', icon: <UserOutlined /> };
        return <Tag icon={config.icon} color={config.color}>{config.label}</Tag>;
      }
    },
    {
      title: 'Contact',
      render: (_, record) => (
        <Space direction="vertical" size={0}>
          <Space><MailOutlined className="text-gray-500" /> {record.email || 'N/A'}</Space>
          <Space><PhoneOutlined className="text-gray-500" /> {record.mobile?.country_code || ''} {record.mobile?.number || 'N/A'}</Space>
        </Space>
      )
    },
    {
      title: 'Status',
      render: (_, record) => {
        const config = statusConfig[record.status] || { label: 'Unknown', color: 'default', icon: <BellOutlined /> };
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

  const renderTypeSpecificDetails = (lead) => {
    switch (lead.type) {
      case 'buy':
        return (
          <Card title="Looking For">
            <Descriptions bordered column={1} size="small">
              <Descriptions.Item label="Country">{lead.country || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="Preferred City">{lead.preferred_city || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="Budget">{lead.budget || 'N/A'}</Descriptions.Item>
            </Descriptions>
          </Card>
        );

      case 'sell':
        return (
          <Card title="Property Details">
            <Descriptions bordered column={1} size="small">
              <Descriptions.Item label="Country">{lead.country || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="Preferred City">{lead.preferred_city || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="Budget">{lead.budget || 'N/A'}</Descriptions.Item>
              {lead.project_name && <Descriptions.Item label="Project">{lead.project_name}</Descriptions.Item>}
              {lead.unit_type && <Descriptions.Item label="Unit Type">{lead.unit_type}</Descriptions.Item>}
              {lead.bedroom_config && <Descriptions.Item label="Bedroom Config">{lead.bedroom_config}</Descriptions.Item>}
              {lead.price && <Descriptions.Item label="Price">AED {lead.price.toLocaleString()}</Descriptions.Item>}
              {lead.size_sqft && <Descriptions.Item label="Size">{lead.size_sqft} Sq.ft</Descriptions.Item>}
              {lead.description && <Descriptions.Item label="Description">{lead.description}</Descriptions.Item>}
            </Descriptions>
          </Card>
        );

      case 'schedule_visit':
        return (
          <Card title="Visit Request">
            <Descriptions bordered column={1} size="small">
              <Descriptions.Item label="Occupation">{lead.occupation || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="Location">{lead.location || 'N/A'}</Descriptions.Item>
            </Descriptions>
          </Card>
        );

      case 'rent':
        return (
          <Card title="Rental Requirements">
            <Descriptions bordered column={1} size="small">
              <Descriptions.Item label="Country">{lead.country || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="Preferred City">{lead.preferred_city || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="Budget">{lead.budget || 'N/A'}</Descriptions.Item>
            </Descriptions>
          </Card>
        );

      case 'partner':
        return (
          <Card title="Partner Details">
            <Descriptions bordered column={1} size="small">
              <Descriptions.Item label="Company">{lead.company || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="Stakeholder Type">{lead.stakeholder_type || 'N/A'}</Descriptions.Item>
              <Descriptions.Item label="Message">{lead.message || 'N/A'}</Descriptions.Item>
            </Descriptions>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Property Leads</h1>
        <p className="text-gray-600 mt-1">Manage all Buy, Sell, Rent & Partner requests</p>
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
              placeholder="Search by name, email, mobile, company..."
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
        title="Lead Details"
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
                <h3 className="text-2xl font-bold">{getFullName(selectedLead)}</h3>
                <Tag 
                  icon={typeConfig[selectedLead.type]?.icon || <UserOutlined />} 
                  color={typeConfig[selectedLead.type]?.color || 'default'}
                >
                  {typeConfig[selectedLead.type]?.label || 'Unknown Type'}
                </Tag>
                <p className="text-gray-500 mt-1">
                  Submitted: {new Date(selectedLead.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            <Descriptions bordered column={1}>
              <Descriptions.Item label="Email">
                <Space><MailOutlined /> {selectedLead.email || 'N/A'}</Space>
              </Descriptions.Item>
              <Descriptions.Item label="Mobile">
                <Space><PhoneOutlined /> {selectedLead.mobile?.country_code || ''} {selectedLead.mobile?.number || 'N/A'}</Space>
              </Descriptions.Item>
              <Descriptions.Item label="Preferred Contact">
                <Tag>{selectedLead.preferred_contact?.toUpperCase() || 'N/A'}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                <Tag 
                  icon={statusConfig[selectedLead.status]?.icon || <BellOutlined />} 
                  color={statusConfig[selectedLead.status]?.color || 'default'}
                >
                  {statusConfig[selectedLead.status]?.label || 'Unknown'}
                </Tag>
              </Descriptions.Item>
            </Descriptions>

            {/* Type-specific Details */}
            {renderTypeSpecificDetails(selectedLead)}

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