import React, { useState, useEffect } from 'react';
import { apiService } from '../../../../../manageApi/utils/custom.apiservice';
import CustomTable from '../../../pages/custom/CustomTable';
import { 
  Tabs, Card, Button, Modal, Table, Tag, Row, Col, 
  Badge, Avatar, Space, Alert, Statistic, Popconfirm
} from 'antd';
import { 
  CheckCircleOutlined, CloseCircleOutlined, EyeOutlined, 
  UserOutlined, DollarOutlined, CalendarOutlined,
  MailOutlined, FileTextOutlined, TeamOutlined,
  RocketOutlined, ProjectOutlined, PhoneOutlined,
  ClockCircleOutlined, CheckOutlined
} from '@ant-design/icons';
import { showSuccessAlert, showErrorAlert } from '../../../../../manageApi/utils/sweetAlert';

// Purple Theme Colors
const PURPLE_THEME = {
  primary: '#722ed1',
  primaryLight: '#9254de',
  primaryLighter: '#d3adf7',
  primaryBg: '#f9f0ff',
  success: '#52c41a',
  warning: '#faad14',
  error: '#ff4d4f',
  info: '#1890ff',
  dark: '#1f2937',
  gray: '#6b7280',
  light: '#f8fafc'
};

const Leads = () => {
  const [loading, setLoading] = useState(false);
  const [convertingDeal, setConvertingDeal] = useState(null);
  const [activeTab, setActiveTab] = useState('accepted');
  const [acceptedLeads, setAcceptedLeads] = useState([]);
  const [rejectedLeads, setRejectedLeads] = useState([]);
  const [deals, setDeals] = useState([]);
  const [selectedQuotation, setSelectedQuotation] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    accepted: 0,
    rejected: 0,
    revenue: 0,
    deals: 0,
    dealRevenue: 0
  });

  // Status configuration
  const statusConfig = {
    customer_accepted: { 
      label: 'Accepted', 
      color: 'success', 
      icon: <CheckCircleOutlined />,
      bgColor: '#f6ffed',
      textColor: '#52c41a'
    },
    customer_rejected: { 
      label: 'Rejected', 
      color: 'error', 
      icon: <CloseCircleOutlined />,
      bgColor: '#fff1f0',
      textColor: '#ff4d4f'
    },
    deal: { 
      label: 'Deal', 
      color: 'purple', 
      icon: <RocketOutlined />,
      bgColor: '#f9f0ff',
      textColor: '#722ed1'
    }
  };

  // Format mobile number
  const formatMobileNumber = (mobileObj) => {
    if (!mobileObj) return 'N/A';
    return `${mobileObj.country_code || ''} ${mobileObj.number || ''}`.trim();
  };

  // Format currency
  const formatCurrency = (amount, currency = 'AED') => {
    if (!amount) return `${currency} 0`;
    return `${currency} ${amount.toLocaleString()}`;
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Fetch Leads by Customer Response
  const fetchLeads = async (status) => {
    setLoading(true);
    try {
      const response = await apiService.get('/estimates', {
        status: status === 'accepted' ? 'customer_accepted' : 'customer_rejected',
        page: 1,
        limit: 50
      });

      if (response.success) {
        if (status === 'accepted') {
          setAcceptedLeads(response.data || []);
        } else {
          setRejectedLeads(response.data || []);
        }
        updateStats(response.data || [], status);
      }
    } catch (error) {
      showErrorAlert('Error', `Failed to load ${status} leads`);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Deals
  const fetchDeals = async () => {
    setLoading(true);
    try {
      const response = await apiService.get('/estimates', {
        status: 'deal',
        page: 1,
        limit: 50
      });

      if (response.success) {
        setDeals(response.data || []);
        updateDealStats(response.data || []);
      }
    } catch (error) {
      showErrorAlert('Error', 'Failed to load deals');
    } finally {
      setLoading(false);
    }
  };

  // Update statistics
  const updateStats = (data, type) => {
    setStats(prev => {
      const newStats = { ...prev };
      
      if (type === 'accepted') {
        newStats.accepted = data.length;
        newStats.revenue = data.reduce((sum, lead) => 
          sum + (lead.final_quotation?.grand_total || 0), 0
        );
      } else if (type === 'rejected') {
        newStats.rejected = data.length;
      }
      
      newStats.total = newStats.accepted + newStats.rejected;
      return newStats;
    });
  };

  // Update deal statistics
  const updateDealStats = (dealsData) => {
    setStats(prev => ({
      ...prev,
      deals: dealsData.length,
      dealRevenue: dealsData.reduce((sum, deal) => 
        sum + (deal.final_quotation?.grand_total || 0), 0
      )
    }));
  };

  // Convert to Deal function
  const handleConvertToDeal = async (estimateId) => {
    setConvertingDeal(estimateId);
    try {
      const response = await apiService.post(`/estimates/${estimateId}/convert-to-deal`);
      
      if (response.success) {
        showSuccessAlert('Success', 'Converted to deal successfully');
        fetchLeads('accepted');
        fetchDeals();
      }
    } catch (error) {
      showErrorAlert('Error', 'Failed to convert to deal');
    } finally {
      setConvertingDeal(null);
    }
  };

  useEffect(() => {
    if (activeTab === 'deals') {
      fetchDeals();
    } else {
      fetchLeads(activeTab);
    }
  }, [activeTab]);

  const openQuotation = (quotation) => {
    setSelectedQuotation(quotation);
    setModalVisible(true);
  };

  // Status Badge Component
  const StatusBadge = ({ status }) => {
    const config = statusConfig[status] || statusConfig.customer_accepted;
    
    return (
      <Tag 
        color={config.color} 
        icon={config.icon}
        style={{ 
          background: config.bgColor,
          color: config.textColor,
          borderColor: config.textColor
        }}
      >
        {config.label}
      </Tag>
    );
  };

  // Accepted Leads Columns
  const acceptedColumns = [
    {
      title: 'Customer',
      width: 200,
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <Avatar 
            size={40} 
            style={{ 
              background: PURPLE_THEME.primaryBg,
              color: PURPLE_THEME.primary
            }}
            icon={<UserOutlined />}
          />
          <div>
            <div className="font-semibold text-gray-900">{record.customer_name}</div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <MailOutlined />
              <span>{record.customer_email}</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Service',
      width: 150,
      render: (_, record) => (
        <div>
          <div className="font-medium">{record.subcategory?.label || record.service_type}</div>
          <div className="text-xs text-gray-500">
            {record.area_sqft} sq ft
          </div>
        </div>
      )
    },
    {
      title: 'Amount',
      width: 120,
      render: (_, record) => (
        <div className="font-bold" style={{ color: PURPLE_THEME.success }}>
          {formatCurrency(record.final_quotation?.grand_total)}
        </div>
      )
    },
    {
      title: 'Status',
      width: 120,
      render: (_, record) => <StatusBadge status={record.status} />
    },
    {
      title: 'Accepted On',
      width: 120,
      render: (_, record) => (
        <div className="text-xs text-gray-500">
          {formatDate(record.customer_response?.responded_at)}
        </div>
      )
    },
    {
      title: 'Actions',
      width: 180,
      render: (_, record) => (
        <Space>
          <Button 
            size="small" 
            icon={<EyeOutlined />}
            onClick={() => openQuotation(record.final_quotation)}
            style={{ 
              background: PURPLE_THEME.primaryBg,
              borderColor: PURPLE_THEME.primaryLighter,
              color: PURPLE_THEME.primary
            }}
          >
            View
          </Button>
          
          {record.status === 'customer_accepted' && !record.project_reference && (
            <Popconfirm
              title="Convert to Deal"
              description="Convert this estimate to a project deal?"
              onConfirm={() => handleConvertToDeal(record._id)}
              okText="Convert"
              cancelText="Cancel"
            >
              <Button
                type="primary"
                size="small"
                icon={<RocketOutlined />}
                loading={convertingDeal === record._id}
                style={{ 
                  background: PURPLE_THEME.primary,
                  borderColor: PURPLE_THEME.primary
                }}
              >
                Convert
              </Button>
            </Popconfirm>
          )}
        </Space>
      )
    }
  ];

  // Rejected Leads Columns
  const rejectedColumns = [
    {
      title: 'Customer',
      width: 180,
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <Avatar 
            size={40} 
            style={{ 
              background: '#fff1f0',
              color: '#ff4d4f'
            }}
            icon={<UserOutlined />}
          />
          <div>
            <div className="font-semibold">{record.customer_name}</div>
            <div className="text-sm text-gray-500">{record.customer_email}</div>
          </div>
        </div>
      )
    },
    {
      title: 'Service',
      width: 120,
      render: (_, record) => record.subcategory?.label || 'N/A'
    },
    {
      title: 'Amount',
      width: 100,
      render: (_, record) => (
        <div className="font-semibold" style={{ color: PURPLE_THEME.error }}>
          {formatCurrency(record.final_quotation?.grand_total)}
        </div>
      )
    },
    {
      title: 'Reason',
      width: 150,
      render: (_, record) => (
        <div className="text-xs text-gray-600 truncate">
          {record.customer_response?.reason || 'No reason provided'}
        </div>
      )
    },
    {
      title: 'Action',
      width: 100,
      render: (_, record) => (
        <Button
          size="small"
          icon={<EyeOutlined />}
          onClick={() => openQuotation(record.final_quotation)}
          style={{ color: PURPLE_THEME.primary }}
        >
          View
        </Button>
      )
    }
  ];

  // Deals Columns
  const dealsColumns = [
    {
      title: 'Project',
      width: 200,
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <Avatar 
            size={40} 
            style={{ 
              background: PURPLE_THEME.primaryBg,
              color: PURPLE_THEME.primary
            }}
            icon={<ProjectOutlined />}
          />
          <div>
            <div className="font-semibold text-gray-900">{record.customer_name}</div>
            <div className="text-xs text-purple-600">
              Project #{record.project_reference?.substring(0, 8) || 'N/A'}
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Service',
      width: 140,
      render: (_, record) => record.subcategory?.label || 'N/A'
    },
    {
      title: 'Value',
      width: 120,
      render: (_, record) => (
        <div className="font-bold" style={{ color: PURPLE_THEME.success }}>
          {formatCurrency(record.final_quotation?.grand_total)}
        </div>
      )
    },
    {
      title: 'Converted',
      width: 100,
      render: (_, record) => (
        <div className="text-xs text-gray-500">
          {formatDate(record.deal_converted_at)}
        </div>
      )
    },
    {
      title: 'Actions',
      width: 100,
      render: (_, record) => (
        <Button
          size="small"
          icon={<EyeOutlined />}
          onClick={() => openQuotation(record.final_quotation)}
          style={{ 
            background: PURPLE_THEME.primaryBg,
            borderColor: PURPLE_THEME.primaryLighter,
            color: PURPLE_THEME.primary
          }}
        >
          View
        </Button>
      )
    }
  ];

  // Tab items
  const tabItems = [
    {
      key: 'accepted',
      label: (
        <Badge count={acceptedLeads.length} size="small" style={{ backgroundColor: PURPLE_THEME.success }}>
          Accepted
        </Badge>
      )
    },
    {
      key: 'rejected',
      label: (
        <Badge count={rejectedLeads.length} size="small" style={{ backgroundColor: PURPLE_THEME.error }}>
          Rejected
        </Badge>
      )
    },
    {
      key: 'deals',
      label: (
        <Badge count={deals.length} size="small" style={{ backgroundColor: PURPLE_THEME.primary }}>
          Deals
        </Badge>
      )
    }
  ];

  return (
    <div className="min-h-screen p-6" style={{ background: PURPLE_THEME.light }}>
      <div className="max-w-screen-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold" style={{ color: PURPLE_THEME.dark }}>
                Customer Responses
              </h1>
              <p className="text-gray-600">Track accepted/rejected leads and converted deals</p>
            </div>
          </div>

          {/* Stats */}
          <Row gutter={[16, 16]} className="mb-6">
            <Col xs={12} sm={6} md={4}>
              <Card 
                className="text-center border-0"
                style={{ 
                  background: 'white',
                  borderLeft: `4px solid ${PURPLE_THEME.primary}`
                }}
                bodyStyle={{ padding: '16px' }}
              >
                <div className="text-2xl font-bold" style={{ color: PURPLE_THEME.primary }}>
                  {stats.total}
                </div>
                <div className="text-sm text-gray-600">Total</div>
              </Card>
            </Col>
            
            <Col xs={12} sm={6} md={4}>
              <Card 
                className="text-center border-0"
                style={{ 
                  background: 'white',
                  borderLeft: `4px solid ${PURPLE_THEME.success}`
                }}
                bodyStyle={{ padding: '16px' }}
              >
                <div className="text-2xl font-bold" style={{ color: PURPLE_THEME.success }}>
                  {stats.accepted}
                </div>
                <div className="text-sm text-gray-600">Accepted</div>
              </Card>
            </Col>
            
            <Col xs={12} sm={6} md={4}>
              <Card 
                className="text-center border-0"
                style={{ 
                  background: 'white',
                  borderLeft: `4px solid ${PURPLE_THEME.error}`
                }}
                bodyStyle={{ padding: '16px' }}
              >
                <div className="text-2xl font-bold" style={{ color: PURPLE_THEME.error }}>
                  {stats.rejected}
                </div>
                <div className="text-sm text-gray-600">Rejected</div>
              </Card>
            </Col>
            
            <Col xs={12} sm={6} md={4}>
              <Card 
                className="text-center border-0"
                style={{ 
                  background: 'white',
                  borderLeft: `4px solid ${PURPLE_THEME.primary}`
                }}
                bodyStyle={{ padding: '16px' }}
              >
                <div className="text-2xl font-bold" style={{ color: PURPLE_THEME.primary }}>
                  {stats.deals}
                </div>
                <div className="text-sm text-gray-600">Deals</div>
              </Card>
            </Col>
            
            <Col xs={24} sm={12} md={4}>
              <Card 
                className="text-center border-0"
                style={{ 
                  background: 'white',
                  borderLeft: `4px solid ${PURPLE_THEME.success}`
                }}
                bodyStyle={{ padding: '16px' }}
              >
                <div className="text-2xl font-bold" style={{ color: PURPLE_THEME.success }}>
                  {formatCurrency(stats.revenue)}
                </div>
                <div className="text-sm text-gray-600">Revenue</div>
              </Card>
            </Col>
            
            <Col xs={24} sm={12} md={4}>
              <Card 
                className="text-center border-0"
                style={{ 
                  background: 'white',
                  borderLeft: `4px solid ${PURPLE_THEME.success}`
                }}
                bodyStyle={{ padding: '16px' }}
              >
                <div className="text-2xl font-bold" style={{ color: PURPLE_THEME.success }}>
                  {formatCurrency(stats.dealRevenue)}
                </div>
                <div className="text-sm text-gray-600">Deal Value</div>
              </Card>
            </Col>
          </Row>

          {/* Conversion Alert */}
          {activeTab === 'accepted' && acceptedLeads.some(lead => lead.status === 'customer_accepted' && !lead.project_reference) && (
            <Alert
              message="Leads Ready for Conversion"
              description={`You have ${acceptedLeads.filter(lead => lead.status === 'customer_accepted' && !lead.project_reference).length} accepted leads that can be converted to deals`}
              type="info"
              showIcon
              style={{ 
                marginBottom: '16px',
                background: PURPLE_THEME.primaryBg,
                borderColor: PURPLE_THEME.primaryLighter
              }}
            />
          )}
        </div>

        {/* Main Content */}
        <Card
          style={{ 
            borderRadius: '12px',
            border: '1px solid #f0f0f0',
            background: 'white'
          }}
          bodyStyle={{ padding: 0 }}
        >
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            items={tabItems}
            style={{ padding: '0 16px' }}
          />

          <div className="p-4">
            {activeTab === 'accepted' && (
              <CustomTable
                columns={acceptedColumns}
                data={acceptedLeads}
                loading={loading}
                pagination={false}
                scroll={{ x: 800 }}
                rowClassName="hover:bg-purple-50 transition-colors"
              />
            )}
            
            {activeTab === 'rejected' && (
              <CustomTable
                columns={rejectedColumns}
                data={rejectedLeads}
                loading={loading}
                pagination={false}
                scroll={{ x: 800 }}
                rowClassName="hover:bg-purple-50 transition-colors"
              />
            )}
            
            {activeTab === 'deals' && (
              <CustomTable
                columns={dealsColumns}
                data={deals}
                loading={loading}
                pagination={false}
                scroll={{ x: 800 }}
                rowClassName="hover:bg-purple-50 transition-colors"
              />
            )}
          </div>
        </Card>

        {/* Quotation Details Modal */}
        <Modal
          title={
            <div className="flex items-center gap-3">
              <Avatar 
                size={40}
                style={{ 
                  background: PURPLE_THEME.primary,
                  color: 'white'
                }}
                icon={<FileTextOutlined />}
              />
              <div>
                <h3 className="text-xl font-bold m-0" style={{ color: PURPLE_THEME.dark }}>
                  Quotation Details
                </h3>
                <p className="text-gray-500 text-sm m-0">Full quotation breakdown</p>
              </div>
            </div>
          }
          open={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={null}
          width={800}
        >
          {selectedQuotation && (
            <div className="space-y-6 mt-4">
              {/* Amount Summary */}
              <Card 
                style={{ 
                  background: PURPLE_THEME.primaryBg,
                  border: `1px solid ${PURPLE_THEME.primaryLighter}`
                }}
              >
                <div className="text-center">
                  <div className="text-sm text-gray-600">Grand Total</div>
                  <div className="text-3xl font-bold mt-2" style={{ color: PURPLE_THEME.success }}>
                    {formatCurrency(selectedQuotation.grand_total)}
                  </div>
                  {selectedQuotation.discount_percent > 0 && (
                    <div className="text-sm text-green-600 mt-2">
                      {selectedQuotation.discount_percent}% discount
                    </div>
                  )}
                </div>
              </Card>

              {/* Scope of Work */}
              <Card title="Scope of Work" size="small">
                <div className="p-3 bg-gray-50 rounded">
                  <p>{selectedQuotation.scope_of_work}</p>
                </div>
              </Card>

              {/* Items Table */}
              <Card title="Items Breakdown" size="small">
                <Table
                  dataSource={selectedQuotation.items || []}
                  pagination={false}
                  bordered
                  size="small"
                  scroll={{ x: 600 }}
                >
                  <Table.Column 
                    title="Item" 
                    dataIndex="item" 
                    width={200}
                  />
                  <Table.Column 
                    title="Description" 
                    dataIndex="description" 
                    ellipsis
                  />
                  <Table.Column 
                    title="Qty" 
                    dataIndex="quantity" 
                    width={80}
                    align="center"
                  />
                  <Table.Column 
                    title="Rate" 
                    render={(_, r) => (
                      <div>{formatCurrency(r.unit_price)}</div>
                    )}
                    width={100}
                  />
                  <Table.Column 
                    title="Total" 
                    render={(_, r) => (
                      <div className="font-semibold" style={{ color: PURPLE_THEME.success }}>
                        {formatCurrency(r.total)}
                      </div>
                    )}
                    width={120}
                  />
                </Table>
              </Card>

              {/* Totals */}
              <Card size="small">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-semibold">{formatCurrency(selectedQuotation.subtotal)}</span>
                  </div>
                  
                  {selectedQuotation.discount_percent > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({selectedQuotation.discount_percent}%):</span>
                      <span className="font-semibold">-{formatCurrency(selectedQuotation.discount_amount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-lg font-bold" style={{ color: PURPLE_THEME.success }}>
                    <span>Grand Total:</span>
                    <span>{formatCurrency(selectedQuotation.grand_total)}</span>
                  </div>
                </div>
              </Card>

              {/* Additional Info */}
              <Card title="Additional Information" size="small">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Created:</span>
                    <span>{formatDate(selectedQuotation.created_at)}</span>
                  </div>
                  {selectedQuotation.superadmin_approved && (
                    <div className="flex justify-between text-green-600">
                      <span>Approved by Superadmin:</span>
                      <CheckOutlined />
                    </div>
                  )}
                  {selectedQuotation.is_final && (
                    <div className="flex justify-between text-purple-600">
                      <span>Final Quotation:</span>
                      <CheckOutlined />
                    </div>
                  )}
                </div>
              </Card>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default Leads;