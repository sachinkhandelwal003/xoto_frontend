import React, { useState, useEffect, useMemo } from 'react';
import { apiService } from '../../../../../manageApi/utils/custom.apiservice';
import CustomTable from '../../../pages/custom/CustomTable';
// 1. IMPORT YOUR LOGO HERE
import logo from "../../../../../assets/img/logoNew.png";

import {
  Modal,
  Button,
  Tabs,
  Tag,
  Card,
  Row,
  Col,
  Statistic,
  Space,
  Typography,
  Avatar,
  Divider,
  Descriptions,
  Timeline,
  Popconfirm,
  Badge,
  Tooltip,
  Table,
  Empty
} from 'antd';
import {
  UserOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  RocketOutlined,
  FileTextOutlined,
  MailOutlined,
  PhoneOutlined,
  PrinterOutlined,
  ProjectOutlined,
  ClockCircleOutlined,
  IdcardOutlined,
  ToolOutlined,
  SafetyOutlined,
  GoldOutlined
} from '@ant-design/icons';
import { showSuccessAlert, showErrorAlert } from '../../../../../manageApi/utils/sweetAlert';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

// Purple Theme Colors (Same as LeadsList)
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
  // --- STATE ---
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('accepted');
  
  // Data States
  const [acceptedLeads, setAcceptedLeads] = useState([]);
  const [rejectedLeads, setRejectedLeads] = useState([]);
  const [deals, setDeals] = useState([]);

  // Action States
  const [convertingDeal, setConvertingDeal] = useState(null);
  const [viewDetailsModal, setViewDetailsModal] = useState({ visible: false, data: null });
  const [quotationModal, setQuotationModal] = useState({ visible: false, data: null });

  // Stats
  const [stats, setStats] = useState({
    total: 0,
    accepted: 0,
    rejected: 0,
    deals: 0,
    potential_revenue: 0,
    secured_revenue: 0
  });

  // --- CONFIGURATIONS ---

  const statusConfig = {
    customer_accepted: { label: 'Accepted', color: 'success', icon: <CheckCircleOutlined />, bgColor: '#f6ffed', textColor: '#52c41a' },
    customer_rejected: { label: 'Rejected', color: 'error', icon: <CloseCircleOutlined />, bgColor: '#fff1f0', textColor: '#ff4d4f' },
    deal: { label: 'Deal Created', color: 'purple', icon: <RocketOutlined />, bgColor: '#f9f0ff', textColor: '#722ed1' }
  };

  // --- API CALLS ---

  const fetchLeads = async (status) => {
    setLoading(true);
    try {
      const response = await apiService.get('/estimates', {
        status: status === 'accepted' ? 'customer_accepted' : 'customer_rejected',
        page: 1,
        limit: 100 // Adjust limit as needed or add pagination state
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
      console.error(error);
      showErrorAlert('Error', `Failed to load ${status} leads`);
    } finally {
      setLoading(false);
    }
  };

  const fetchDeals = async () => {
    setLoading(true);
    try {
      const response = await apiService.get('/estimates', {
        status: 'deal',
        page: 1,
        limit: 100
      });

      if (response.success) {
        setDeals(response.data || []);
        updateDealStats(response.data || []);
      }
    } catch (error) {
      console.error(error);
      showErrorAlert('Error', 'Failed to load deals');
    } finally {
      setLoading(false);
    }
  };

  const handleConvertToDeal = async (estimateId) => {
    setConvertingDeal(estimateId);
    try {
      const response = await apiService.post(`/estimates/${estimateId}/convert-to-deal`);
      if (response.success) {
        showSuccessAlert('Success', 'Converted to deal successfully');
        setViewDetailsModal({ visible: false, data: null }); // Close modal if open
        // Refresh data
        fetchLeads('accepted');
        fetchDeals(); // Background fetch to update deal count
      }
    } catch (error) {
      showErrorAlert('Error', 'Failed to convert to deal');
    } finally {
      setConvertingDeal(null);
    }
  };

  // --- HELPERS ---

  const updateStats = (data, type) => {
    setStats(prev => {
      const newStats = { ...prev };
      if (type === 'accepted') {
        newStats.accepted = data.length;
        newStats.potential_revenue = data.reduce((sum, item) => sum + (item.final_quotation?.grand_total || 0), 0);
      } else if (type === 'rejected') {
        newStats.rejected = data.length;
      }
      newStats.total = newStats.accepted + newStats.rejected + newStats.deals;
      return newStats;
    });
  };

  const updateDealStats = (data) => {
    setStats(prev => ({
      ...prev,
      deals: data.length,
      secured_revenue: data.reduce((sum, item) => sum + (item.final_quotation?.grand_total || 0), 0)
    }));
  };

  const formatCurrency = (amount) => amount ? `AED ${amount.toLocaleString()}` : 'AED 0';
  const formatDate = (date) => date ? new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'N/A';

  // --- EFFECTS ---

  useEffect(() => {
    if (activeTab === 'deals') {
      fetchDeals();
    } else {
      fetchLeads(activeTab);
    }
  }, [activeTab]);

  // --- COLUMNS ---

  const getColumns = () => [
    {
      title: 'Customer',
      width: 220,
      render: (_, r) => (
        <div className="flex items-center gap-3">
          <Avatar 
            size={40} 
            style={{ 
              background: activeTab === 'rejected' ? '#fff1f0' : PURPLE_THEME.primaryBg, 
              color: activeTab === 'rejected' ? '#ff4d4f' : PURPLE_THEME.primary 
            }}
            icon={activeTab === 'deals' ? <RocketOutlined /> : <UserOutlined />}
          />
          <div>
            <div className="font-semibold text-gray-900">{r.customer_name}</div>
            <div className="text-xs text-gray-500">{r.customer_email}</div>
          </div>
        </div>
      )
    },
    {
      title: 'Service Info',
      width: 200,
      render: (_, r) => (
        <div>
           <Tag color={activeTab === 'deals' ? 'purple' : 'blue'}>{r.service_type?.toUpperCase()}</Tag>
           <div className="text-sm font-medium mt-1">{r.subcategory?.label}</div>
           <div className="text-xs text-gray-500">{r.area_sqft} sq.ft</div>
        </div>
      )
    },
    {
      title: 'Value',
      width: 150,
      render: (_, r) => (
        <div>
          <div className={`font-bold ${activeTab === 'rejected' ? 'text-red-500' : 'text-green-600'}`}>
            {formatCurrency(r.final_quotation?.grand_total)}
          </div>
          <div className="text-xs text-gray-400">Grand Total</div>
        </div>
      )
    },
    // Only show Rejection Reason if on Rejected Tab
    ...(activeTab === 'rejected' ? [{
      title: 'Rejection Reason',
      width: 200,
      render: (_, r) => (
        <Tooltip title={r.customer_response?.reason}>
          <div className="text-red-500 text-sm truncate max-w-[180px]">
            {r.customer_response?.reason || 'No reason provided'}
          </div>
        </Tooltip>
      )
    }] : []),
    // Only show Project Ref if on Deals Tab
    ...(activeTab === 'deals' ? [{
      title: 'Project Ref',
      width: 150,
      render: (_, r) => (
        <div>
          <span className="font-mono bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">
            #{r.project_reference?.substring(0, 8) || 'N/A'}
          </span>
          <div className="text-xs text-gray-400 mt-1">
             Converted: {formatDate(r.deal_converted_at)}
          </div>
        </div>
      )
    }] : []),
    {
      title: 'Status',
      width: 140,
      render: (_, r) => {
        const cfg = statusConfig[r.status] || statusConfig.customer_accepted;
        return (
          <Tag color={cfg.color} style={{ borderRadius: 10, padding: '2px 10px' }}>
             {cfg.icon} <span className="ml-1">{cfg.label}</span>
          </Tag>
        );
      }
    },
    {
      title: 'Actions',
      fixed: 'right',
      width: 180,
      render: (_, r) => (
        <Space>
          <Tooltip title="View Details">
            <Button 
                icon={<EyeOutlined />} 
                size="small"
                onClick={() => setViewDetailsModal({ visible: true, data: r })}
            />
          </Tooltip>
          
          {/* Conversion Button only for Accepted Leads */}
          {r.status === 'customer_accepted' && !r.project_reference && (
            <Popconfirm 
              title="Convert to Deal" 
              description="Create a project from this lead?" 
              onConfirm={() => handleConvertToDeal(r._id)}
              okText="Yes, Convert"
              okButtonProps={{ loading: convertingDeal === r._id }}
            >
              <Button 
                type="primary" 
                size="small" 
                icon={<RocketOutlined />}
                loading={convertingDeal === r._id}
                style={{ background: PURPLE_THEME.primary, borderColor: PURPLE_THEME.primary }}
              >
                Convert
              </Button>
            </Popconfirm>
          )}
        </Space>
      )
    }
  ];

  const currentData = useMemo(() => {
    if (activeTab === 'accepted') return acceptedLeads;
    if (activeTab === 'rejected') return rejectedLeads;
    return deals;
  }, [activeTab, acceptedLeads, rejectedLeads, deals]);

  // --- SUB-COMPONENTS ---
  const DetailSection = ({ title, icon, children, className }) => (
    <Card 
      size="small" 
      title={<span className="flex items-center gap-2 text-purple-700">{icon} {title}</span>}
      className={`mb-4 shadow-sm ${className}`}
      headStyle={{ background: '#fafafa', borderBottom: '1px solid #f0f0f0' }}
    >
      {children}
    </Card>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      
      {/* HEADER TITLE */}
      <div className="mb-6">
        <Title level={3}>Deals & Conversions</Title>
        <Text type="secondary">Manage accepted quotations, handle rejections, and monitor converted deals.</Text>
      </div>

      {/* STATS ROW */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={12} sm={6} md={4}>
            <Card size="small" hoverable className="text-center border-t-4 border-green-500">
                <Statistic 
                  title="ACCEPTED LEADS" 
                  value={stats.accepted} 
                  valueStyle={{ color: '#52c41a' }} 
                  prefix={<CheckCircleOutlined />}
                />
            </Card>
        </Col>
        <Col xs={12} sm={6} md={5}>
            <Card size="small" hoverable className="text-center border-t-4 border-purple-500">
                <Statistic 
                  title="ACTIVE DEALS" 
                  value={stats.deals} 
                  valueStyle={{ color: PURPLE_THEME.primary }} 
                  prefix={<RocketOutlined />}
                />
            </Card>
        </Col>
        <Col xs={12} sm={6} md={4}>
            <Card size="small" hoverable className="text-center border-t-4 border-red-400">
                <Statistic 
                  title="REJECTED" 
                  value={stats.rejected} 
                  valueStyle={{ color: '#ff4d4f' }} 
                  prefix={<CloseCircleOutlined />}
                />
            </Card>
        </Col>
        <Col xs={24} sm={12} md={5}>
            <Card size="small" hoverable className="text-center border-t-4 border-green-600 bg-green-50">
                <Statistic 
                  title="SECURED REVENUE" 
                  value={stats.secured_revenue} 
                  precision={0}
                  prefix="AED"
                  valueStyle={{ color: '#135200', fontWeight: 'bold' }} 
                />
            </Card>
        </Col>
      </Row>

      {/* TABS FILTER */}
      <Card bodyStyle={{ padding: 0 }} className="mb-6 overflow-hidden rounded-lg shadow-sm">
        <Tabs 
            activeKey={activeTab} 
            onChange={setActiveTab} 
            type="card" 
            size="large"
            tabBarStyle={{ margin: 0, background: '#fff' }}
        >
            <TabPane 
                tab={
                   <span className="px-4">
                      <CheckCircleOutlined style={{color: '#52c41a'}} /> Accepted
                      <Badge count={acceptedLeads.length} style={{ backgroundColor: '#52c41a', marginLeft: 8 }} />
                   </span>
                } 
                key="accepted" 
            />
            <TabPane 
                tab={
                   <span className="px-4">
                      <CloseCircleOutlined style={{color: '#ff4d4f'}} /> Rejected
                      <Badge count={rejectedLeads.length} style={{ backgroundColor: '#ff4d4f', marginLeft: 8 }} />
                   </span>
                } 
                key="rejected" 
            />
            <TabPane 
                tab={
                   <span className="px-4">
                      <RocketOutlined style={{color: '#722ed1'}} /> Active Deals
                      <Badge count={deals.length} style={{ backgroundColor: '#722ed1', marginLeft: 8 }} />
                   </span>
                } 
                key="deals" 
            />
        </Tabs>
      </Card>

      {/* DATA TABLE */}
      <Card bodyStyle={{ padding: '0px' }}>
          <CustomTable
            columns={getColumns()}
            data={currentData}
            loading={loading}
            // Add pagination props if your API supports it, passed from parent
            pagination={false} 
          />
      </Card>


      {/* ========================================================= */}
      {/* VIEW DETAILS MODAL (FULL PROFILE)                         */}
      {/* ========================================================= */}
      <Modal
        title={null}
        open={viewDetailsModal.visible}
        onCancel={() => setViewDetailsModal({ visible: false, data: null })}
        width={1100}
        footer={null}
        style={{ top: 20 }}
      >
        {viewDetailsModal.data && (
            <div>
                {/* 1. HEADER */}
                <div className="flex justify-between items-start mb-6 border-b pb-4">
                    <div>
                        <div className="flex items-center gap-3">
                           <Title level={3} style={{ margin: 0, color: PURPLE_THEME.primary }}>
                               {viewDetailsModal.data.customer_name}
                           </Title>
                           {viewDetailsModal.data.project_reference && (
                             <Tag color="purple">PROJECT #{viewDetailsModal.data.project_reference.substring(0,6)}</Tag>
                           )}
                        </div>
                        <Text type="secondary">{viewDetailsModal.data.service_type} | {viewDetailsModal.data.subcategory?.label}</Text>
                    </div>
                    <div className="text-right">
                        <Tag 
                          color={statusConfig[viewDetailsModal.data.status]?.color} 
                          style={{ fontSize: 14, padding: '4px 12px' }}
                        >
                            {statusConfig[viewDetailsModal.data.status]?.icon} {statusConfig[viewDetailsModal.data.status]?.label.toUpperCase()}
                        </Tag>
                    </div>
                </div>

                <Row gutter={[24, 24]}>
                    {/* LEFT COL */}
                    <Col span={14}>
                        <DetailSection title="Customer Details" icon={<IdcardOutlined />}>
                            <div className="flex items-center gap-4">
                                <Avatar size={54} icon={<UserOutlined />} style={{ background: PURPLE_THEME.primaryLight }} />
                                <div>
                                    <div className="font-bold text-lg">{viewDetailsModal.data.customer_name}</div>
                                    <div className="text-gray-600"><MailOutlined /> {viewDetailsModal.data.customer_email}</div>
                                    <div className="text-gray-600"><PhoneOutlined /> {viewDetailsModal.data.customer_mobile?.country_code} {viewDetailsModal.data.customer_mobile?.number}</div>
                                </div>
                            </div>
                        </DetailSection>

                        <DetailSection title="Service & Requirements" icon={<ToolOutlined />}>
                           <Descriptions bordered size="small" column={2}>
                                <Descriptions.Item label="Category">{viewDetailsModal.data.subcategory?.label}</Descriptions.Item>
                                <Descriptions.Item label="Package"><Tag color="gold">{viewDetailsModal.data.package?.name}</Tag></Descriptions.Item>
                                <Descriptions.Item label="Area">{viewDetailsModal.data.area_sqft} sq.ft</Descriptions.Item>
                                <Descriptions.Item label="Dims">{viewDetailsModal.data.area_length} x {viewDetailsModal.data.area_width}</Descriptions.Item>
                           </Descriptions>
                           <div className="mt-3">
                              <Text strong>Description:</Text>
                              <p className="text-gray-500 text-sm mt-1">{viewDetailsModal.data.description || 'No description provided.'}</p>
                           </div>
                        </DetailSection>

                        {/* If Rejected, show reason prominently */}
                        {viewDetailsModal.data.status === 'customer_rejected' && (
                            <div className="bg-red-50 border border-red-200 p-4 rounded-md">
                                <div className="text-red-700 font-bold mb-1"><CloseCircleOutlined /> Rejection Reason</div>
                                <p className="text-red-600 m-0">{viewDetailsModal.data.customer_response?.reason}</p>
                            </div>
                        )}
                    </Col>

                    {/* RIGHT COL */}
                    <Col span={10}>
                         <Card size="small" title="Status Timeline" className="mb-4">
                             <Timeline className="mt-2">
                                <Timeline.Item color="green">Quotation Created: {formatDate(viewDetailsModal.data.createdAt)}</Timeline.Item>
                                <Timeline.Item color="green">Sent to Customer: {formatDate(viewDetailsModal.data.submitted_at)}</Timeline.Item>
                                <Timeline.Item 
                                  color={viewDetailsModal.data.status === 'customer_rejected' ? 'red' : 'green'}
                                  dot={viewDetailsModal.data.status === 'customer_rejected' ? <CloseCircleOutlined /> : <CheckCircleOutlined />}
                                >
                                   Customer Response: {formatDate(viewDetailsModal.data.customer_response?.responded_at)}
                                </Timeline.Item>
                                {viewDetailsModal.data.status === 'deal' && (
                                   <Timeline.Item dot={<RocketOutlined />} color="purple">
                                      Converted to Deal: {formatDate(viewDetailsModal.data.deal_converted_at)}
                                   </Timeline.Item>
                                )}
                             </Timeline>
                         </Card>

                         {/* FINANCIAL SUMMARY CARD */}
                         {viewDetailsModal.data.final_quotation ? (
                             <Card 
                               title={<span className="text-green-700"><FileTextOutlined /> Quotation Summary</span>}
                               className="border-green-200 bg-green-50"
                               size="small"
                             >
                                 <div className="text-center py-4">
                                     <div className="text-3xl font-bold text-green-700">
                                         {formatCurrency(viewDetailsModal.data.final_quotation.grand_total)}
                                     </div>
                                     <div className="text-xs text-gray-500 mb-4">Approved Amount</div>
                                     
                                     <Button 
                                       block 
                                       icon={<EyeOutlined />}
                                       onClick={() => setQuotationModal({ visible: true, data: viewDetailsModal.data.final_quotation })}
                                     >
                                        View Full Invoice
                                     </Button>

                                     {viewDetailsModal.data.status === 'customer_accepted' && !viewDetailsModal.data.project_reference && (
                                        <div className="mt-4 pt-4 border-t border-green-200">
                                            <Popconfirm 
                                              title="Convert to Deal" 
                                              onConfirm={() => handleConvertToDeal(viewDetailsModal.data._id)}
                                              okText="Yes"
                                            >
                                                <Button type="primary" block className="bg-purple-600 hover:bg-purple-500 border-purple-600" icon={<RocketOutlined />}>
                                                    Convert to Deal Now
                                                </Button>
                                            </Popconfirm>
                                        </div>
                                     )}
                                 </div>
                             </Card>
                         ) : (
                            <Empty description="No Quotation Data" />
                         )}
                    </Col>
                </Row>
            </div>
        )}
      </Modal>

      {/* ========================================================= */}
      {/* INVOICE MODAL (Reused logic from LeadsList)               */}
      {/* ========================================================= */}
      <Modal
        title={null}
        footer={null}
        open={quotationModal.visible}
        onCancel={() => setQuotationModal({ visible: false, data: null })}
        width={800}
        bodyStyle={{ padding: 0 }}
        centered
      >
        {quotationModal.data && (
            <div className="bg-white">
                {/* HEADER */}
                <div className="p-8 bg-gray-50 border-b">
                    <div className="flex justify-between items-start">
                        <div>
                            <img src={logo} alt="Company Logo" style={{ height: 60, marginBottom: 10 }} />
                            <div className="text-gray-500 text-sm">
                                123 Landscape Avenue, Dubai, UAE<br/>
                                contact@company.com
                            </div>
                        </div>
                        <div className="text-right">
                            <Title level={2} style={{ color: PURPLE_THEME.primary, margin: 0 }}>QUOTATION</Title>
                            <div className="mt-2 text-gray-600">
                                <div><strong>Date:</strong> {formatDate(quotationModal.data.createdAt)}</div>
                                <div><strong>Status:</strong> <Tag color="blue">APPROVED</Tag></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ITEMS */}
                <div className="p-8">
                    <Table 
                        dataSource={quotationModal.data.items || []}
                        rowKey={(r, i) => i}
                        pagination={false}
                        bordered
                        columns={[
                            { title: '#', render: (_,__,i) => i+1, width: 50, align: 'center' },
                            { title: 'Item', dataIndex: 'item', render: (t, r) => <div><div className="font-bold">{t}</div><div className="text-xs text-gray-500">{r.description}</div></div> },
                            { title: 'Qty', dataIndex: 'quantity', width: 80, align: 'center' },
                            { title: 'Price', dataIndex: 'unit_price', width: 120, align: 'right', render: (v) => formatCurrency(v) },
                            { title: 'Total', dataIndex: 'total', width: 120, align: 'right', render: (v) => <strong>{formatCurrency(v)}</strong> }
                        ]}
                    />

                    <div className="flex justify-end mt-6">
                        <div className="w-64 space-y-2">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal:</span>
                                <span>{formatCurrency(quotationModal.data.subtotal)}</span>
                            </div>
                            {quotationModal.data.discount_amount > 0 && (
                                <div className="flex justify-between text-red-500">
                                    <span>Discount:</span>
                                    <span>- {formatCurrency(quotationModal.data.discount_amount)}</span>
                                </div>
                            )}
                            <div className="flex justify-between text-xl font-bold text-purple-800 border-t pt-3">
                                <span>Grand Total:</span>
                                <span>{formatCurrency(quotationModal.data.grand_total)}</span>
                            </div>
                        </div>
                    </div>

                    {quotationModal.data.scope_of_work && (
                        <div className="mt-8 p-4 bg-gray-50 rounded border border-gray-100">
                            <h5 className="font-bold text-gray-700 mb-2">Scope of Work:</h5>
                            <p className="text-gray-600 text-sm whitespace-pre-wrap">{quotationModal.data.scope_of_work}</p>
                        </div>
                    )}
                </div>

                <div className="p-4 bg-gray-100 border-t flex justify-end gap-3">
                    <Button onClick={() => setQuotationModal({ visible: false, data: null })}>Close</Button>
                    <Button icon={<PrinterOutlined />} onClick={() => window.print()}>Print</Button>
                </div>
            </div>
        )}
      </Modal>

    </div>
  );
};

export default Leads;