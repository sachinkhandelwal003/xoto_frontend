import React, { useState, useEffect } from 'react';
import { apiService } from '../../../../../manageApi/utils/custom.apiservice';
import { 
  Tabs, Card, Button, Modal, Table, Tag, Input, Spin, Empty, 
  Row, Col, Divider, Badge, Avatar, Space, Alert
} from 'antd';
import { 
  CheckCircleOutlined, CloseCircleOutlined, EyeOutlined, 
  ClockCircleOutlined, DollarOutlined, CalendarOutlined,
  UserOutlined, FileTextOutlined, MailOutlined,
  PhoneOutlined, EnvironmentOutlined, ToolOutlined
} from '@ant-design/icons';
import { showSuccessAlert, showErrorAlert, showConfirmDialog } from '../../../../../manageApi/utils/sweetAlert';

const { TextArea } = Input;

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

const MyEstimates = () => {
  const [allEstimates, setAllEstimates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedQuotation, setSelectedQuotation] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [respondingId, setRespondingId] = useState(null);
  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const [selectedEstimate, setSelectedEstimate] = useState(null);

  // Fetch All Customer Estimates
  const fetchMyEstimates = async () => {
    setLoading(true);
    try {
      const res = await apiService.get('/estimates/customer/my-estimates');
      if (res.success) {
        setAllEstimates(res.data || []);
      }
    } catch (error) {
      showErrorAlert('Error', 'Failed to load your estimates');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyEstimates();
  }, []);

  // Filter Data by Tab
  const pendingEstimates = allEstimates.filter(e => 
    e.status === 'superadmin_approved' && !e.customer_response?.status
  );
  const respondedEstimates = allEstimates.filter(e => 
    e.customer_response?.status
  );

  // Statistics
  const stats = {
    total: allEstimates.length,
    pending: pendingEstimates.length,
    accepted: respondedEstimates.filter(e => e.customer_response?.status === 'accepted').length,
    rejected: respondedEstimates.filter(e => e.customer_response?.status === 'rejected').length,
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

  // View Quotation Modal
  const openQuotation = (quotation) => {
    setSelectedQuotation(quotation);
    setModalVisible(true);
  };

  // Accept Quotation
  const accept = async (estimate) => {
    const confirm = await showConfirmDialog(
      'Accept Quotation', 
      `Are you sure you want to accept this quotation?`,
      'Yes, Accept'
    );
    if (!confirm.isConfirmed) return;

    setRespondingId(estimate._id);
    try {
      await apiService.put(`/estimates/${estimate._id}/response`, { status: 'accepted' });
      showSuccessAlert('Success', 'Quotation accepted successfully!');
      fetchMyEstimates();
    } catch (err) {
      showErrorAlert('Error', 'Failed to accept quotation');
    } finally {
      setRespondingId(null);
    }
  };

  // Open Reject Modal
  const openRejectModal = (estimate) => {
    setSelectedEstimate(estimate);
    setRejectReason('');
    setRejectModalVisible(true);
  };

  // Reject with Reason
  const reject = async () => {
    if (!rejectReason.trim()) {
      showErrorAlert('Reason Required', 'Please provide a reason');
      return;
    }

    const confirm = await showConfirmDialog(
      'Reject Quotation',
      'Are you sure you want to reject this quotation?',
      'Confirm Reject'
    );
    if (!confirm.isConfirmed) return;

    setRespondingId(selectedEstimate._id);
    try {
      await apiService.put(`/estimates/${selectedEstimate._id}/response`, {
        status: 'rejected',
        reason: rejectReason
      });
      showSuccessAlert('Success', 'Quotation rejected');
      setRejectModalVisible(false);
      setRejectReason('');
      fetchMyEstimates();
    } catch (err) {
      showErrorAlert('Error', 'Failed to reject quotation');
    } finally {
      setRespondingId(null);
      setSelectedEstimate(null);
    }
  };

  // Pending Estimate Card
  const PendingEstimateCard = ({ est }) => {
    const q = est.final_quotation;
    
    return (
      <Card 
        className="mb-4"
        style={{ 
          borderLeft: `4px solid ${PURPLE_THEME.primary}`,
          background: 'white'
        }}
      >
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} md={16}>
            <div className="flex items-start gap-3">
              <Avatar 
                size={48}
                icon={<FileTextOutlined />}
                style={{ 
                  background: PURPLE_THEME.primaryBg,
                  color: PURPLE_THEME.primary
                }}
              />
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-gray-900 m-0">{est.service_type}</h4>
                  <Tag color="blue">{est.area_sqft} sq ft</Tag>
                </div>
                
                <div className="text-sm text-gray-600 mb-2">
                  {est.description || 'No description'}
                </div>
                
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <CalendarOutlined />
                    {formatDate(est.submitted_at)}
                  </div>
                  {est.assigned_supervisor && (
                    <div className="flex items-center gap-1">
                      <UserOutlined />
                      {est.assigned_supervisor.name?.first_name}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Col>

          <Col xs={24} md={8}>
            <div className="text-right">
              <div className="mb-3">
                <div className="text-2xl font-bold" style={{ color: PURPLE_THEME.success }}>
                  {formatCurrency(q?.grand_total)}
                </div>
                {q?.discount_percent > 0 && (
                  <div className="text-xs text-green-600">
                    {q.discount_percent}% discount
                  </div>
                )}
              </div>

              <Space direction="vertical" style={{ width: '100%' }} size="small">
                <Button
                  size="small"
                  icon={<EyeOutlined />}
                  onClick={() => openQuotation(q)}
                  style={{ 
                    background: PURPLE_THEME.primaryBg,
                    borderColor: PURPLE_THEME.primaryLighter,
                    color: PURPLE_THEME.primary
                  }}
                >
                  View Details
                </Button>

                <div className="flex gap-2">
                  <Button
                    type="primary"
                    size="small"
                    icon={<CheckCircleOutlined />}
                    loading={respondingId === est._id}
                    onClick={() => accept(est)}
                    style={{ 
                      background: PURPLE_THEME.success,
                      borderColor: PURPLE_THEME.success
                    }}
                  >
                    Accept
                  </Button>

                  <Button
                    size="small"
                    danger
                    icon={<CloseCircleOutlined />}
                    loading={respondingId === est._id}
                    onClick={() => openRejectModal(est)}
                  >
                    Reject
                  </Button>
                </div>
              </Space>
            </div>
          </Col>
        </Row>
      </Card>
    );
  };

  // Responded Estimate Card
  const RespondedEstimateCard = ({ est }) => {
    const q = est.final_quotation;
    const isAccepted = est.customer_response?.status === 'accepted';
    
    return (
      <Card 
        className="mb-3"
        style={{ 
          borderLeft: `4px solid ${isAccepted ? PURPLE_THEME.success : PURPLE_THEME.error}`,
          background: 'white'
        }}
        size="small"
      >
        <Row gutter={[16, 16]} align="middle">
          <Col xs={16}>
            <div className="flex items-center gap-3">
              <Avatar 
                size={36}
                icon={isAccepted ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
                style={{ 
                  background: isAccepted ? '#f6ffed' : '#fff1f0',
                  color: isAccepted ? PURPLE_THEME.success : PURPLE_THEME.error
                }}
              />
              <div>
                <div className="font-medium text-gray-900">{est.service_type}</div>
                <div className="text-sm text-gray-600">
                  {formatCurrency(q?.grand_total)} • {formatDate(est.updatedAt)}
                </div>
              </div>
            </div>
          </Col>
          
          <Col xs={8} className="text-right">
            <Tag 
              color={isAccepted ? "success" : "error"}
              icon={isAccepted ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
            >
              {isAccepted ? 'Accepted' : 'Rejected'}
            </Tag>
          </Col>
        </Row>
      </Card>
    );
  };

  // Tab Items
  const tabItems = [
    {
      key: 'pending',
      label: (
        <Badge count={pendingEstimates.length} size="small" style={{ backgroundColor: PURPLE_THEME.primary }}>
          Pending
        </Badge>
      ),
      children: pendingEstimates.length === 0 ? (
        <Empty 
          description="No pending quotations"
          imageStyle={{ height: 60 }}
        />
      ) : (
        <div>
          {pendingEstimates.map(est => (
            <PendingEstimateCard key={est._id} est={est} />
          ))}
        </div>
      ),
    },
    {
      key: 'responded',
      label: (
        <Badge count={respondedEstimates.length} size="small" style={{ backgroundColor: PURPLE_THEME.primary }}>
          Responded
        </Badge>
      ),
      children: respondedEstimates.length === 0 ? (
        <Empty 
          description="No responses yet"
          imageStyle={{ height: 60 }}
        />
      ) : (
        <div>
          {respondedEstimates.map(est => (
            <RespondedEstimateCard key={est._id} est={est} />
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen p-6" style={{ background: PURPLE_THEME.light }}>
      <div className="max-w-screen-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold" style={{ color: PURPLE_THEME.dark }}>
                My Estimates
              </h1>
              <p className="text-gray-600">Review and respond to your project estimates</p>
            </div>
          </div>

          {/* Stats */}
          <Row gutter={[16, 16]} className="mb-6">
            <Col xs={12} sm={6}>
              <Card 
                className="text-center border-0"
                style={{ 
                  background: 'white',
                  borderLeft: `4px solid ${PURPLE_THEME.primary}`
                }}
                bodyStyle={{ padding: '12px' }}
              >
                <div className="text-2xl font-bold" style={{ color: PURPLE_THEME.primary }}>
                  {stats.total}
                </div>
                <div className="text-sm text-gray-600">Total</div>
              </Card>
            </Col>
            
            <Col xs={12} sm={6}>
              <Card 
                className="text-center border-0"
                style={{ 
                  background: 'white',
                  borderLeft: `4px solid ${PURPLE_THEME.warning}`
                }}
                bodyStyle={{ padding: '12px' }}
              >
                <div className="text-2xl font-bold" style={{ color: PURPLE_THEME.warning }}>
                  {stats.pending}
                </div>
                <div className="text-sm text-gray-600">Pending</div>
              </Card>
            </Col>
            
            <Col xs={12} sm={6}>
              <Card 
                className="text-center border-0"
                style={{ 
                  background: 'white',
                  borderLeft: `4px solid ${PURPLE_THEME.success}`
                }}
                bodyStyle={{ padding: '12px' }}
              >
                <div className="text-2xl font-bold" style={{ color: PURPLE_THEME.success }}>
                  {stats.accepted}
                </div>
                <div className="text-sm text-gray-600">Accepted</div>
              </Card>
            </Col>
            
            <Col xs={12} sm={6}>
              <Card 
                className="text-center border-0"
                style={{ 
                  background: 'white',
                  borderLeft: `4px solid ${PURPLE_THEME.error}`
                }}
                bodyStyle={{ padding: '12px' }}
              >
                <div className="text-2xl font-bold" style={{ color: PURPLE_THEME.error }}>
                  {stats.rejected}
                </div>
                <div className="text-sm text-gray-600">Rejected</div>
              </Card>
            </Col>
          </Row>
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
            {loading ? (
              <div className="flex justify-center py-8">
                <Spin />
              </div>
            ) : activeTab === 'pending' && pendingEstimates.length === 0 ? (
              <Empty description="No pending quotations to review" />
            ) : activeTab === 'responded' && respondedEstimates.length === 0 ? (
              <Empty description="No responses yet" />
            ) : null}
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
                <p className="text-gray-500 text-sm m-0">Full project breakdown</p>
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
                      {selectedQuotation.discount_percent}% discount applied
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

                  <Divider />

                  <div className="flex justify-between text-lg font-bold" style={{ color: PURPLE_THEME.success }}>
                    <span>Grand Total:</span>
                    <span>{formatCurrency(selectedQuotation.grand_total)}</span>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </Modal>

        {/* Reject Reason Modal */}
        <Modal
          title="Reason for Rejection"
          open={rejectModalVisible}
          onCancel={() => setRejectModalVisible(false)}
          footer={[
            <Button key="cancel" onClick={() => setRejectModalVisible(false)}>
              Cancel
            </Button>,
            <Button 
              key="reject"
              type="primary"
              danger
              loading={respondingId === selectedEstimate?._id}
              onClick={reject}
              icon={<CloseCircleOutlined />}
            >
              Reject
            </Button>,
          ]}
          width={500}
        >
          {selectedEstimate && (
            <div className="space-y-4">
              <Alert
                message="Help us improve"
                description="Your feedback helps us understand your needs better"
                type="info"
                showIcon
              />
              
              <div className="bg-gray-50 p-3 rounded">
                <div className="font-semibold text-gray-900">
                  {selectedEstimate.service_type} • {formatCurrency(selectedEstimate.final_quotation?.grand_total)}
                </div>
              </div>

              <div>
                <div className="font-medium text-gray-900 mb-2">
                  Please share your reason:
                </div>
                <TextArea
                  rows={4}
                  placeholder="For example: The price is too high, timeline doesn't work, etc."
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  maxLength={500}
                />
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default MyEstimates;