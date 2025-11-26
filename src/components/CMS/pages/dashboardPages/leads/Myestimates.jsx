import React, { useState, useEffect } from 'react';
import { apiService } from '../../../../../manageApi/utils/custom.apiservice';
import { 
  Tabs, Card, Button, Modal, Table, Tag, Input, Spin, Empty, Alert, 
  Row, Col, Statistic, Progress, Divider, Timeline, Badge, Avatar,
  Rate, Tooltip, Space, Collapse
} from 'antd';
import { 
  CheckCircleOutlined, CloseCircleOutlined, EyeOutlined, 
  ClockCircleOutlined, DollarOutlined, CalendarOutlined,
  UserOutlined, FileTextOutlined, StarOutlined,
  PhoneOutlined, MailOutlined, EnvironmentOutlined,
  TrophyOutlined, SafetyCertificateOutlined, TeamOutlined
} from '@ant-design/icons';
import { showSuccessAlert, showErrorAlert, showConfirmDialog } from '../../../../../manageApi/utils/sweetAlert';

const { TextArea } = Input;
const { Panel } = Collapse;

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

  // View Quotation Modal
  const openQuotation = (quotation) => {
    setSelectedQuotation(quotation);
    setModalVisible(true);
  };

  // Accept Quotation
  const accept = async (estimate) => {
    const confirm = await showConfirmDialog(
      'Accept Quotation', 
      `Are you sure you want to accept this quotation for ${estimate.category?.name}? This will start the project process.`,
      'Yes, Accept'
    );
    if (!confirm.isConfirmed) return;

    setRespondingId(estimate._id);
    try {
      await apiService.put(`/estimates/${estimate._id}/response`, { status: 'accepted' });
      showSuccessAlert('Quotation Accepted!', 'Thank you for your confirmation! Our team will contact you within 24 hours to schedule the project.');
      fetchMyEstimates();
    } catch (err) {
      showErrorAlert('Error', 'Failed to accept quotation. Please try again.');
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
      showErrorAlert('Reason Required', 'Please provide a reason for rejecting this quotation.');
      return;
    }

    const confirm = await showConfirmDialog(
      'Reject Quotation',
      `You are about to reject the quotation for ${selectedEstimate.category?.name}. This action cannot be undone.`,
      'Confirm Reject',
      'danger'
    );
    if (!confirm.isConfirmed) return;

    setRespondingId(selectedEstimate._id);
    try {
      await apiService.put(`/estimates/${selectedEstimate._id}/response`, {
        status: 'rejected',
        reason: rejectReason
      });
      showSuccessAlert('Quotation Rejected', 'Thank you for your feedback. We appreciate your input.');
      setRejectModalVisible(false);
      setRejectReason('');
      fetchMyEstimates();
    } catch (err) {
      showErrorAlert('Error', 'Failed to reject quotation. Please try again.');
    } finally {
      setRespondingId(null);
      setSelectedEstimate(null);
    }
  };

  // Quotation Card Component
  const QuotationCard = ({ est }) => {
    const q = est.final_quotation;
    const hasResponded = !!est.customer_response?.status;
    const isAccepted = est.customer_response?.status === 'accepted';
    const isRejected = est.customer_response?.status === 'rejected';

    return (
      <Card 
        className="mb-6 shadow-lg hover:shadow-xl transition-all duration-300 border-0 rounded-2xl"
        style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          borderLeft: `4px solid ${isAccepted ? '#10b981' : isRejected ? '#ef4444' : '#3b82f6'}`
        }}
      >
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} md={16}>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <Avatar 
                  size={64}
                  icon={<FileTextOutlined />}
                  className="bg-blue-100 text-blue-600"
                  style={{ fontSize: '24px' }}
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{est.category?.name}</h3>
                  {q?.discount_percent > 0 && (
                    <Badge.Ribbon text={`${q.discount_percent}% OFF`} color="green">
                      <div></div>
                    </Badge.Ribbon>
                  )}
                </div>
                
                <p className="text-gray-600 mb-3">
                  {est.subcategories?.map(s => s.name).join(' • ')}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  <Tag icon={<CalendarOutlined />} color="blue">
                    {new Date(est.submitted_at).toLocaleDateString()}
                  </Tag>
                  <Tag icon={<UserOutlined />} color="purple">
                    {est.assigned_supervisor?.name?.first_name} {est.assigned_supervisor?.name?.last_name}
                  </Tag>
                  {est.final_quotation?.duration_days && (
                    <Tag icon={<ClockCircleOutlined />} color="orange">
                      {est.final_quotation.duration_days} days
                    </Tag>
                  )}
                </div>

                <p className="text-sm text-gray-500 line-clamp-2">
                  {est.description}
                </p>
              </div>
            </div>
          </Col>

          <Col xs={24} md={8}>
            <div className="text-center md:text-right">
              <div className="mb-4">
                <div className="text-3xl font-bold text-green-600 mb-1">
                  AED {q?.grand_total?.toLocaleString()}
                </div>
                {q?.discount_percent > 0 && (
                  <div className="text-sm text-gray-500 line-through">
                    AED {q?.subtotal?.toLocaleString()}
                  </div>
                )}
                <div className="text-xs text-gray-400 mt-1">
                  Inclusive of all taxes
                </div>
              </div>

              <Space direction="vertical" style={{ width: '100%' }} size="middle">
                <Button
                  type="primary"
                  icon={<EyeOutlined />}
                  onClick={() => openQuotation(q)}
                  block
                  size="large"
                  className="bg-blue-600 hover:bg-blue-700 border-blue-600"
                >
                  View Details
                </Button>

                {!hasResponded && (
                  <div className="flex space-x-2">
                    <Button
                      type="primary"
                      icon={<CheckCircleOutlined />}
                      loading={respondingId === est._id}
                      onClick={() => accept(est)}
                      block
                      size="large"
                      className="bg-green-600 hover:bg-green-700 border-green-600"
                    >
                      Accept
                    </Button>

                    <Button
                      danger
                      icon={<CloseCircleOutlined />}
                      loading={respondingId === est._id}
                      onClick={() => openRejectModal(est)}
                      block
                      size="large"
                    >
                      Reject
                    </Button>
                  </div>
                )}

                {hasResponded && (
                  <Tag 
                    icon={isAccepted ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
                    color={isAccepted ? "success" : "error"}
                    className="text-lg py-2 px-6 w-full text-center"
                  >
                    {isAccepted ? 'Accepted' : 'Rejected'}
                  </Tag>
                )}
              </Space>
            </div>
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
        <Badge count={pendingEstimates.length} size="small" offset={[10, -5]}>
          <span className="flex items-center space-x-2">
            <ClockCircleOutlined className="text-orange-500" />
            <span>Pending Response</span>
          </span>
        </Badge>
      ),
      children: pendingEstimates.length === 0 ? (
        <Empty 
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <div>
              <div className="text-lg font-semibold text-gray-600 mb-2">No Pending Quotations</div>
              <div className="text-gray-400">All your quotations have been responded to</div>
            </div>
          }
        />
      ) : (
        <div className="space-y-4">
          {pendingEstimates.map(est => (
            <QuotationCard key={est._id} est={est} />
          ))}
        </div>
      ),
    },
    {
      key: 'responded',
      label: (
        <Badge count={respondedEstimates.length} size="small" offset={[10, -5]}>
          <span className="flex items-center space-x-2">
            <CheckCircleOutlined className="text-green-500" />
            <span>My Responses</span>
          </span>
        </Badge>
      ),
      children: respondedEstimates.length === 0 ? (
        <Empty 
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <div>
              <div className="text-lg font-semibold text-gray-600 mb-2">No Responses Yet</div>
              <div className="text-gray-400">Your responses will appear here</div>
            </div>
          }
        />
      ) : (
        <div className="space-y-4">
          {respondedEstimates.map(est => {
            const q = est.final_quotation;
            const isAccepted = est.customer_response?.status === 'accepted';
            
            return (
              <Card 
                key={est._id} 
                className="mb-4 shadow-md border-0 rounded-xl"
                style={{
                  borderLeft: `4px solid ${isAccepted ? '#10b981' : '#ef4444'}`
                }}
              >
                <Row gutter={[16, 16]} align="middle">
                  <Col xs={24} md={18}>
                    <div className="flex items-center space-x-4">
                      <Avatar 
                        size={48}
                        icon={isAccepted ? <CheckCircleOutlined /> : <CloseCircleOutlined />}
                        className={isAccepted ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-900">{est.category?.name}</h3>
                        <p className="text-gray-600">
                          Grand Total: <strong>AED {q?.grand_total?.toLocaleString()}</strong>
                        </p>
                        {est.customer_response.status === 'rejected' && est.customer_response.reason && (
                          <Alert 
                            message={
                              <div>
                                <div className="font-semibold">Your Feedback:</div>
                                <div className="mt-1">{est.customer_response.reason}</div>
                              </div>
                            } 
                            type="warning" 
                            showIcon 
                            className="mt-3"
                          />
                        )}
                      </div>
                    </div>
                  </Col>
                  <Col xs={24} md={6}>
                    <div className="text-right">
                      <Tag 
                        color={isAccepted ? "success" : "error"}
                        className="text-base px-4 py-2"
                      >
                        {isAccepted ? (
                          <span className="flex items-center space-x-1">
                            <CheckCircleOutlined />
                            <span>Accepted</span>
                          </span>
                        ) : (
                          <span className="flex items-center space-x-1">
                            <CloseCircleOutlined />
                            <span>Rejected</span>
                          </span>
                        )}
                      </Tag>
                      <div className="text-xs text-gray-400 mt-2">
                        {new Date(est.updatedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card>
            );
          })}
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-6">
            <FileTextOutlined className="text-4xl text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            My Quotations
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Review and manage your project estimates in one place
          </p>
        </div>

        {/* Statistics */}
        <Row gutter={[16, 16]} className="mb-8">
          <Col xs={12} sm={6}>
            <Card className="text-center border-0 shadow-md rounded-2xl">
              <Statistic
                title="Total Quotes"
                value={stats.total}
                prefix={<FileTextOutlined />}
                valueStyle={{ color: '#3b82f6' }}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card className="text-center border-0 shadow-md rounded-2xl">
              <Statistic
                title="Pending"
                value={stats.pending}
                prefix={<ClockCircleOutlined />}
                valueStyle={{ color: '#f59e0b' }}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card className="text-center border-0 shadow-md rounded-2xl">
              <Statistic
                title="Accepted"
                value={stats.accepted}
                prefix={<CheckCircleOutlined />}
                valueStyle={{ color: '#10b981' }}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card className="text-center border-0 shadow-md rounded-2xl">
              <Statistic
                title="Rejected"
                value={stats.rejected}
                prefix={<CloseCircleOutlined />}
                valueStyle={{ color: '#ef4444' }}
              />
            </Card>
          </Col>
        </Row>

        {/* Main Content */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <Spin size="large" className="mb-4" />
              <div className="text-lg text-gray-600">Loading your quotations...</div>
            </div>
          </div>
        ) : (
          <Card 
            className="border-0 shadow-xl rounded-2xl overflow-hidden"
            bodyStyle={{ padding: 0 }}
          >
            <Tabs 
              activeKey={activeTab} 
              onChange={setActiveTab} 
              items={tabItems}
              size="large"
              className="custom-tabs"
              tabBarStyle={{ 
                padding: '0 24px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                margin: 0
              }}
            />
          </Card>
        )}

        {/* Quotation Detail Modal */}
        <Modal
          title={
            <div className="flex items-center space-x-3">
              <TrophyOutlined className="text-2xl text-yellow-500" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 m-0">Project Quotation</h2>
                <p className="text-gray-600 text-sm m-0">Detailed breakdown of your estimate</p>
              </div>
            </div>
          }
          open={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={null}
          width="95%"
          style={{ maxWidth: 1200 }}
          className="quotation-modal"
        >
          {selectedQuotation && (
            <div className="space-y-6">
              {/* Header Info */}
              <Row gutter={[16, 16]} className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
                <Col xs={24} md={12}>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <DollarOutlined className="text-green-500" />
                      <span className="font-semibold">Grand Total:</span>
                      <span className="text-2xl font-bold text-green-600">
                        AED {selectedQuotation.grand_total?.toLocaleString()}
                      </span>
                    </div>
                    {selectedQuotation.duration_days && (
                      <div className="flex items-center space-x-2">
                        <CalendarOutlined className="text-blue-500" />
                        <span className="font-semibold">Estimated Duration:</span>
                        <span className="text-lg text-blue-600">{selectedQuotation.duration_days} days</span>
                      </div>
                    )}
                  </div>
                </Col>
                <Col xs={24} md={12}>
                  <div className="space-y-2 text-right">
                    {selectedQuotation.discount_percent > 0 && (
                      <div className="text-lg text-green-600 font-semibold">
                        You Save: AED {selectedQuotation.discount_amount?.toLocaleString()} 
                        ({selectedQuotation.discount_percent}% OFF)
                      </div>
                    )}
                    <div className="text-sm text-gray-500">
                      Valid until: {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                    </div>
                  </div>
                </Col>
              </Row>

              {/* Scope of Work */}
              <Collapse 
                defaultActiveKey={['1']}
                className="custom-collapse"
              >
                <Panel 
                  header={
                    <span className="text-lg font-semibold flex items-center">
                      <FileTextOutlined className="mr-2 text-blue-500" />
                      Scope of Work & Project Details
                    </span>
                  } 
                  key="1"
                >
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-lg">
                      {selectedQuotation.scope_of_work}
                    </p>
                  </div>
                </Panel>
              </Collapse>

              {/* Items Breakdown */}
              <div className="bg-white rounded-lg border">
                <div className="p-4 border-b">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center">
                    <TeamOutlined className="mr-2 text-green-500" />
                    Detailed Cost Breakdown
                  </h3>
                </div>
                <Table
                  dataSource={selectedQuotation.items}
                  pagination={false}
                  bordered
                  size="middle"
                  className="custom-table"
                  scroll={{ x: 800 }}
                >
                  <Table.Column 
                    title="S.No" 
                    dataIndex="sno" 
                    width={80}
                    align="center"
                    render={(text) => <Tag color="blue">{text}</Tag>}
                  />
                  <Table.Column 
                    title="Item Description" 
                    dataIndex="item" 
                    render={(text, record) => (
                      <div>
                        <div className="font-semibold">{text}</div>
                        {record.description && (
                          <div className="text-sm text-gray-600">{record.description}</div>
                        )}
                      </div>
                    )}
                  />
                  <Table.Column 
                    title="Unit" 
                    dataIndex="unit" 
                    width={100}
                    align="center"
                  />
                  <Table.Column 
                    title="Quantity" 
                    dataIndex="quantity" 
                    width={100}
                    align="center"
                  />
                  <Table.Column 
                    title="Unit Price" 
                    render={(_, record) => (
                      <div className="text-right font-semibold">
                        AED {record.unit_price?.toLocaleString()}
                      </div>
                    )} 
                    width={120}
                  />
                  <Table.Column 
                    title="Total Amount" 
                    render={(_, record) => (
                      <div className="text-right font-bold text-green-600">
                        AED {record.total?.toLocaleString()}
                      </div>
                    )} 
                    width={140}
                  />
                </Table>
              </div>

              {/* Summary */}
              <Card 
                className="bg-gradient-to-r from-green-50 to-emerald-100 border-0"
                bodyStyle={{ padding: '24px' }}
              >
                <Row gutter={[16, 16]}>
                  <Col xs={24} md={12}>
                    <div className="space-y-3">
                      <div className="flex justify-between text-lg">
                        <span>Subtotal:</span>
                        <span className="font-semibold">AED {selectedQuotation.subtotal?.toLocaleString()}</span>
                      </div>
                      {selectedQuotation.discount_percent > 0 && (
                        <div className="flex justify-between text-lg text-green-600">
                          <span>Discount ({selectedQuotation.discount_percent}%):</span>
                          <span className="font-semibold">-AED {selectedQuotation.discount_amount?.toLocaleString()}</span>
                        </div>
                      )}
                      <Divider className="my-3" />
                      <div className="flex justify-between text-2xl font-bold text-green-700">
                        <span>Grand Total:</span>
                        <span>AED {selectedQuotation.grand_total?.toLocaleString()}</span>
                      </div>
                    </div>
                  </Col>
                  <Col xs={24} md={12}>
                    <div className="bg-white p-4 rounded-lg border">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <SafetyCertificateOutlined className="mr-2 text-blue-500" />
                        What's Included
                      </h4>
                      <ul className="space-y-2 text-gray-600">
                        <li>✓ Professional quality materials</li>
                        <li>✓ Experienced certified team</li>
                        <li>✓ Quality assurance guarantee</li>
                        <li>✓ Post-service support</li>
                        <li>✓ Timely project completion</li>
                      </ul>
                    </div>
                  </Col>
                </Row>
              </Card>
            </div>
          )}
        </Modal>

        {/* Reject Reason Modal */}
        <Modal
          title={
            <div className="flex items-center space-x-2 text-red-600">
              <CloseCircleOutlined />
              <span>Reason for Rejection</span>
            </div>
          }
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
              Reject Quotation
            </Button>,
          ]}
          width={600}
        >
          {selectedEstimate && (
            <div className="space-y-4">
              <Alert
                message="Help Us Improve"
                description="Your feedback helps us understand your needs better and improve our service quality."
                type="info"
                showIcon
              />
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="font-semibold text-gray-900 mb-2">
                  Project: {selectedEstimate.category?.name}
                </div>
                <div className="text-gray-600">
                  Amount: AED {selectedEstimate.final_quotation?.grand_total?.toLocaleString()}
                </div>
              </div>

              <div>
                <div className="font-semibold text-gray-900 mb-2">
                  Please share your reason for rejecting this quotation:
                </div>
                <TextArea
                  rows={6}
                  placeholder="For example: The price is too high, the timeline doesn't work for me, I found another provider, I've changed my plans, etc. Your honest feedback is valuable to us."
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  maxLength={500}
                  showCount
                />
              </div>
            </div>
          )}
        </Modal>
      </div>

      <style jsx>{`
        .custom-tabs .ant-tabs-tab {
          color: white !important;
          font-weight: 600;
        }
        
        .custom-tabs .ant-tabs-tab-active {
          background: rgba(255, 255, 255, 0.2) !important;
          border-radius: 8px 8px 0 0;
        }
        
        .custom-tabs .ant-tabs-ink-bar {
          background: white !important;
          height: 3px;
        }
        
        .quotation-modal .ant-modal-header {
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          border-bottom: 1px solid #e2e8f0;
        }
        
        .custom-collapse .ant-collapse-header {
          background: #f8fafc !important;
          border-radius: 8px !important;
        }
        
        .custom-table .ant-table-thead > tr > th {
          background: #f8fafc;
          font-weight: 600;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default MyEstimates;