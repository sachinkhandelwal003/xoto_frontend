import React, { useState, useEffect } from 'react';
import { apiService } from '../../../../../manageApi/utils/custom.apiservice';
import CustomTable from '../../../pages/custom/CustomTable';
import {
  Drawer,
  List,
  Avatar,
  Button,
  Spin,
  Tabs,
  Modal,
  Table,
  Tag,
  Descriptions,
  Card,
  Row,
  Col,
  Statistic,
  Space,
  Typography,
  Badge,
  Divider,
  Tooltip,
  Input
} from 'antd';
import {
  UserOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined,
  DollarOutlined,
  TeamOutlined,
  FileTextOutlined,
  CheckOutlined,
  CloseOutlined,
  ClockCircleOutlined,
  SearchOutlined,
  FilterOutlined,
  ExportOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import { showSuccessAlert, showErrorAlert, showConfirmDialog } from '../../../../../manageApi/utils/sweetAlert';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Search } = Input;

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

const LeadsList = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [supervisors, setSupervisors] = useState([]);
  const [supervisorsLoading, setSupervisorsLoading] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [quotationModal, setQuotationModal] = useState({ visible: false, data: null });
  const [searchText, setSearchText] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    assigned: 0,
    final_created: 0,
    superadmin_approved: 0
  });

  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0
  });
  const [filters, setFilters] = useState({ status: 'pending' });

  // Status Config with improved styling
  const statusConfig = {
    pending: { 
      label: 'Pending', 
      color: 'warning', 
      icon: <ClockCircleOutlined />,
      bgColor: '#fff7e6',
      textColor: '#fa8c16'
    },
    assigned: { 
      label: 'Assigned', 
      color: 'processing', 
      icon: <TeamOutlined />,
      bgColor: '#e6f7ff',
      textColor: '#1890ff'
    },
    final_created: { 
      label: 'Final Created', 
      color: 'purple', 
      icon: <FileTextOutlined />,
      bgColor: '#f9f0ff',
      textColor: '#722ed1'
    },
    superadmin_approved: { 
      label: 'Approved & Sent', 
      color: 'success', 
      icon: <CheckOutlined />,
      bgColor: '#f6ffed',
      textColor: '#52c41a'
    },
    customer_accepted: { 
      label: 'Customer Accepted', 
      color: 'green', 
      icon: <CheckCircleOutlined />,
      bgColor: '#f6ffed',
      textColor: '#389e0d'
    },
    customer_rejected: { 
      label: 'Customer Rejected', 
      color: 'error', 
      icon: <CloseOutlined />,
      bgColor: '#fff1f0',
      textColor: '#cf1322'
    },
  };

  // Fetch Leads
  const fetchLeads = async (page = 1, limit = 10, filterParams = {}) => {
    setLoading(true);
    try {
      const response = await apiService.get('/estimates', { 
        page, 
        limit, 
        ...filterParams,
        search: searchText || undefined
      });
      if (response.success) {
        setLeads(response.data);
        setPagination({
          currentPage: response.pagination?.page || page,
          itemsPerPage: response.pagination?.limit || limit,
          totalItems: response.pagination?.total || 0
        });
      }
    } catch (error) {
      showErrorAlert('Error', 'Failed to load leads');
    } finally {
      setLoading(false);
    }
  };

  // Fetch Supervisors
  const fetchSupervisors = async () => {
    setSupervisorsLoading(true);
    try {
      const res = await apiService.get('/users', { role: 'supervisor' });
      if (res.success) setSupervisors(res.data || []);
    } catch (error) {
      showErrorAlert('Error', 'Failed to load supervisors');
    } finally {
      setSupervisorsLoading(false);
    }
  };

  // Tab Change
  const handleTabChange = (key) => {
    setFilters({ status: key });
    fetchLeads(1, pagination.itemsPerPage, { status: key });
  };

  // Open Assign Drawer
  const openAssignDrawer = (lead) => {
    setSelectedLead(lead);
    setDrawerVisible(true);
    if (supervisors.length === 0) fetchSupervisors();
  };

  // Assign Supervisor
  const assignSupervisor = async (supervisorId) => {
    const confirm = await showConfirmDialog('Assign Lead', 'Assign this lead to supervisor?', 'Yes, Assign');
    if (confirm.isConfirmed) {
      try {
        await apiService.put(`/estimates/${selectedLead._id}/assign-supervisor`, { supervisor_id: supervisorId });
        showSuccessAlert('Success', 'Lead assigned successfully');
        setDrawerVisible(false);
        fetchLeads(pagination.currentPage, pagination.itemsPerPage, filters);
      } catch (error) {
        showErrorAlert('Error', 'Failed to assign');
      }
    }
  };

  // Approve Final Quotation
  const approveQuotation = async (estimateId) => {
    const confirm = await showConfirmDialog(
      'Approve Final Quotation',
      'This will send the quotation to the customer for approval.',
      'Approve & Send'
    );
    if (confirm.isConfirmed) {
      try {
        await apiService.put(`/estimates/${estimateId}/approve-quotation`);
        showSuccessAlert('Approved!', 'Quotation sent to customer');
        fetchLeads(pagination.currentPage, pagination.itemsPerPage, filters);
      } catch (error) {
        showErrorAlert('Error', 'Failed to approve');
      }
    }
  };

  // View Final Quotation
  const viewQuotation = (quotation) => {
    setQuotationModal({ visible: true, data: quotation });
  };

  // Calculate Statistics
  const calculateStats = (leads) => {
    const stats = {
      total: leads.length,
      pending: leads.filter(l => l.status === 'pending').length,
      assigned: leads.filter(l => l.status === 'assigned').length,
      final_created: leads.filter(l => l.status === 'final_created').length,
      superadmin_approved: leads.filter(l => l.status === 'superadmin_approved').length
    };
    setStats(stats);
  };

  useEffect(() => {
    calculateStats(leads);
  }, [leads]);

  // Table Columns
  const columns = [
    {
      title: 'Customer',
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
              {record.customer_email}
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Service',
      render: (_, record) => (
        <div className="font-medium text-gray-800">
          {record.category?.name || 'N/A'}
        </div>
      )
    },
    {
      title: 'Status',
      render: (_, record) => {
        const cfg = statusConfig[record.status] || statusConfig.pending;
        return (
          <Badge
            count={cfg.label}
            style={{ 
              backgroundColor: cfg.bgColor,
              color: cfg.textColor,
              border: `1px solid ${cfg.textColor}20`
            }}
            className="px-3 py-1 rounded-full text-xs font-medium"
          />
        );
      }
    },
    {
      title: 'Assigned Supervisor',
      render: (_, record) => {
        const supervisor = record.assigned_supervisor;
        return supervisor ? (
          <div className="flex items-center gap-2">
            <Avatar 
              size="small" 
              icon={<UserOutlined />}
              style={{ background: PURPLE_THEME.primaryLighter }}
            />
            <span className="text-sm font-medium">
              {supervisor.name?.first_name} {supervisor.name?.last_name}
            </span>
          </div>
        ) : (
          <Tag color="default" icon={<UserOutlined />}>Not Assigned</Tag>
        );
      }
    },
    {
      title: 'Quotation',
      width: 280,
      render: (_, record) => {
        if (!record.final_quotation) {
          return (
            <div className="text-gray-400 italic">
              <FileTextOutlined /> Not created
            </div>
          );
        }

        const q = record.final_quotation;
        const isApproved = q.superadmin_approved;

        return (
          <div className="space-y-2">
            <Button 
              size="small" 
              icon={<EyeOutlined />} 
              onClick={() => viewQuotation(q)}
              style={{ background: PURPLE_THEME.primaryBg, borderColor: PURPLE_THEME.primaryLighter }}
            >
              View Quotation
            </Button>
            <div className="text-sm">
              <div className="flex items-center gap-1">
                <DollarOutlined className="text-green-600" />
                <strong>AED {q.grand_total?.toLocaleString()}</strong>
              </div>
              {q.discount_percent > 0 && (
                <div className="text-green-600 text-xs">
                  -{q.discount_percent}% discount
                </div>
              )}
            </div>
            {isApproved ? (
              <Tag icon={<CheckCircleOutlined />} color="success" className="text-xs">
                Sent to Customer
              </Tag>
            ) : record.status === 'final_created' ? (
              <Tag color="processing" className="text-xs">Ready for Approval</Tag>
            ) : null}
          </div>
        );
      }
    },
    {
      title: 'Actions',
      fixed: 'right',
      width: 180,
      render: (_, record) => {
        switch (record.status) {
          case 'pending':
            return (
              <Button 
                size="small" 
                type="primary"
                onClick={() => openAssignDrawer(record)}
                style={{ background: PURPLE_THEME.primary, borderColor: PURPLE_THEME.primary }}
              >
                Assign Supervisor
              </Button>
            );
          case 'final_created':
            return (
              <Button
                type="primary"
                size="small"
                style={{ background: PURPLE_THEME.success, borderColor: PURPLE_THEME.success }}
                onClick={() => approveQuotation(record._id)}
                icon={<CheckCircleOutlined />}
              >
                Approve & Send
              </Button>
            );
          case 'superadmin_approved':
            return (
              <Tag color="success" icon={<CheckCircleOutlined />}>
                Sent to Customer
              </Tag>
            );
          default:
            return null;
        }
      }
    }
  ];

  // Stats Cards Component
  const StatCard = ({ title, value, icon, color, onClick }) => (
    <Card 
      hoverable 
      onClick={onClick}
      style={{ 
        border: `1px solid ${color}20`,
        background: `${color}08`,
        borderRadius: '12px'
      }}
      bodyStyle={{ padding: '16px' }}
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-medium text-gray-600">{title}</div>
          <div className="text-2xl font-bold mt-2" style={{ color }}>{value}</div>
        </div>
        <div style={{ color }} className="text-2xl">
          {icon}
        </div>
      </div>
    </Card>
  );

  useEffect(() => {
    fetchLeads(1, 10, { status: 'pending' });
  }, []);

  return (
    <div className="min-h-screen p-6" style={{ background: PURPLE_THEME.light }}>
      <div className="max-w-screen-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <Title level={2} style={{ color: PURPLE_THEME.dark, margin: 0 }}>
                Leads Management
              </Title>
              <Paragraph style={{ color: PURPLE_THEME.gray, marginTop: '4px' }}>
                Track and manage customer leads from submission to approval
              </Paragraph>
            </div>
            <Space>
              <Search
                placeholder="Search leads..."
                allowClear
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onSearch={(value) => fetchLeads(1, pagination.itemsPerPage, { ...filters, search: value })}
                style={{ width: 250 }}
              />
              <Button icon={<ReloadOutlined />} onClick={() => fetchLeads(pagination.currentPage, pagination.itemsPerPage, filters)}>
                Refresh
              </Button>
            </Space>
          </div>

          {/* Stats Cards */}
          <Row gutter={[16, 16]} className="mb-6">
            <Col xs={24} sm={12} md={4.8}>
              <StatCard
                title="Total Leads"
                value={stats.total}
                icon={<TeamOutlined />}
                color={PURPLE_THEME.dark}
                onClick={() => setFilters({})}
              />
            </Col>
            <Col xs={24} sm={12} md={4.8}>
              <StatCard
                title="Pending"
                value={stats.pending}
                icon={<ClockCircleOutlined />}
                color={PURPLE_THEME.warning}
                onClick={() => handleTabChange('pending')}
              />
            </Col>
            <Col xs={24} sm={12} md={4.8}>
              <StatCard
                title="Assigned"
                value={stats.assigned}
                icon={<UserOutlined />}
                color={PURPLE_THEME.info}
                onClick={() => handleTabChange('assigned')}
              />
            </Col>
            <Col xs={24} sm={12} md={4.8}>
              <StatCard
                title="Final Created"
                value={stats.final_created}
                icon={<FileTextOutlined />}
                color={PURPLE_THEME.primary}
                onClick={() => handleTabChange('final_created')}
              />
            </Col>
            <Col xs={24} sm={12} md={4.8}>
              <StatCard
                title="Approved"
                value={stats.superadmin_approved}
                icon={<CheckCircleOutlined />}
                color={PURPLE_THEME.success}
                onClick={() => handleTabChange('superadmin_approved')}
              />
            </Col>
          </Row>
        </div>

        {/* Card Tabs */}
        <Card
          style={{ 
            borderRadius: '12px',
            border: '1px solid #f0f0f0',
            marginBottom: '24px'
          }}
          bodyStyle={{ padding: 0 }}
        >
          <Tabs
            activeKey={filters.status}
            onChange={handleTabChange}
            type="card"
            style={{ padding: '0 16px' }}
          >
            <TabPane 
              tab={
                <div className="flex items-center gap-2">
                  <ClockCircleOutlined />
                  <span>Pending</span>
                  {stats.pending > 0 && (
                    <Badge count={stats.pending} style={{ backgroundColor: PURPLE_THEME.warning }} />
                  )}
                </div>
              } 
              key="pending"
            />
            <TabPane 
              tab={
                <div className="flex items-center gap-2">
                  <UserOutlined />
                  <span>Assigned</span>
                  {stats.assigned > 0 && (
                    <Badge count={stats.assigned} style={{ backgroundColor: PURPLE_THEME.info }} />
                  )}
                </div>
              } 
              key="assigned"
            />
            <TabPane 
              tab={
                <div className="flex items-center gap-2">
                  <FileTextOutlined />
                  <span>Final Created</span>
                  {stats.final_created > 0 && (
                    <Badge count={stats.final_created} style={{ backgroundColor: PURPLE_THEME.primary }} />
                  )}
                </div>
              } 
              key="final_created"
            />
            <TabPane 
              tab={
                <div className="flex items-center gap-2">
                  <CheckCircleOutlined />
                  <span>Approved & Sent</span>
                  {stats.superadmin_approved > 0 && (
                    <Badge count={stats.superadmin_approved} style={{ backgroundColor: PURPLE_THEME.success }} />
                  )}
                </div>
              } 
              key="superadmin_approved"
            />
          </Tabs>

          {/* Table */}
          <div className="p-4">
            <CustomTable
              columns={columns}
              data={leads}
              loading={loading}
              totalItems={pagination.totalItems}
              currentPage={pagination.currentPage}
              itemsPerPage={pagination.itemsPerPage}
              onPageChange={(page, size) => fetchLeads(page, size, filters)}
              rowClassName="hover:bg-purple-50 transition-colors"
            />
          </div>
        </Card>

        {/* Final Quotation Modal */}
        <Modal
          title={
            <div className="flex items-center gap-3">
              <Avatar 
                size={40}
                style={{ 
                  background: PURPLE_THEME.success,
                  color: 'white'
                }}
                icon={<DollarOutlined />}
              />
              <div>
                <Title level={4} style={{ margin: 0, color: PURPLE_THEME.dark }}>
                  Final Quotation Details
                </Title>
                <Text type="secondary">Customer: {quotationModal.data?.customer_name}</Text>
              </div>
            </div>
          }
          open={quotationModal.visible}
          onCancel={() => setQuotationModal({ visible: false, data: null })}
          footer={null}
          width={900}
        >
          {quotationModal.data && (
            <div className="space-y-6 mt-4">
              {/* Scope of Work */}
              <Card 
                title="Scope of Work" 
                size="small"
                style={{ borderLeft: `4px solid ${PURPLE_THEME.primary}` }}
              >
                <Paragraph>{quotationModal.data.scope_of_work}</Paragraph>
              </Card>

              {/* Line Items Table */}
              <Card title="Quotation Items" size="small">
                <Table
                  dataSource={quotationModal.data.items}
                  pagination={false}
                  bordered
                  rowKey="_id"
                  size="small"
                >
                  <Table.Column title="S.No" dataIndex="sno" width={60} align="center" />
                  <Table.Column title="Item" dataIndex="item" />
                  <Table.Column title="Description" dataIndex="description" ellipsis />
                  <Table.Column title="Unit" dataIndex="unit" width={80} />
                  <Table.Column title="Qty" dataIndex="quantity" width={80} align="center" />
                  <Table.Column 
                    title="Rate" 
                    render={(_, r) => (
                      <Text strong>AED {r.unit_price?.toLocaleString()}</Text>
                    )} 
                    width={100} 
                  />
                  <Table.Column 
                    title="Total" 
                    render={(_, r) => (
                      <Text strong style={{ color: PURPLE_THEME.success }}>
                        AED {r.total?.toLocaleString()}
                      </Text>
                    )} 
                    width={120} 
                  />
                </Table>
              </Card>

              {/* Total Summary */}
              <Card 
                style={{ 
                  background: PURPLE_THEME.light,
                  border: `1px solid ${PURPLE_THEME.primaryLighter}`
                }}
              >
                <div className="text-right space-y-2">
                  <div className="flex justify-between">
                    <Text strong>Subtotal:</Text>
                    <Text strong>AED {quotationModal.data.subtotal?.toLocaleString()}</Text>
                  </div>
                  {quotationModal.data.discount_percent > 0 && (
                    <div className="flex justify-between">
                      <Text style={{ color: PURPLE_THEME.success }}>
                        Discount ({quotationModal.data.discount_percent}%):
                      </Text>
                      <Text style={{ color: PURPLE_THEME.success }}>
                        -AED {quotationModal.data.discount_amount?.toLocaleString()}
                      </Text>
                    </div>
                  )}
                  <Divider />
                  <div className="flex justify-between text-xl">
                    <Text strong style={{ color: PURPLE_THEME.primary }}>Grand Total:</Text>
                    <Title level={3} style={{ color: PURPLE_THEME.primary, margin: 0 }}>
                      AED {quotationModal.data.grand_total?.toLocaleString()}
                    </Title>
                  </div>
                </div>

                {/* Status */}
                <div className="mt-6 text-center">
                  {quotationModal.data.superadmin_approved ? (
                    <Tag 
                      icon={<CheckCircleOutlined />} 
                      color="success" 
                      style={{ 
                        fontSize: '16px', 
                        padding: '8px 16px',
                        background: PURPLE_THEME.success + '10'
                      }}
                    >
                      Approved & Sent to Customer
                    </Tag>
                  ) : (
                    <Tag 
                      color="processing" 
                      style={{ 
                        fontSize: '16px', 
                        padding: '8px 16px',
                        background: PURPLE_THEME.info + '10'
                      }}
                    >
                      Waiting for Superadmin Approval
                    </Tag>
                  )}
                </div>
              </Card>
            </div>
          )}
        </Modal>

        {/* Assign Supervisor Drawer */}
        <Drawer
          title={
            <div className="flex items-center gap-3">
              <Avatar 
                size={32}
                style={{ 
                  background: PURPLE_THEME.primaryBg,
                  color: PURPLE_THEME.primary
                }}
                icon={<UserOutlined />}
              />
              <div>
                <Title level={5} style={{ margin: 0 }}>Assign Supervisor</Title>
                <Text type="secondary">Select a supervisor for this lead</Text>
              </div>
            </div>
          }
          open={drawerVisible}
          onClose={() => setDrawerVisible(false)}
          width={450}
        >
          {selectedLead && (
            <div className="space-y-6">
              {/* Lead Info Card */}
              <Card 
                size="small" 
                style={{ borderLeft: `4px solid ${PURPLE_THEME.primary}` }}
              >
                <div className="space-y-2">
                  <Title level={5} style={{ margin: 0 }}>{selectedLead.customer_name}</Title>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MailOutlined />
                    {selectedLead.customer_email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CalendarOutlined />
                    {selectedLead.category?.name}
                  </div>
                </div>
              </Card>

              {/* Supervisors List */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Title level={5} style={{ margin: 0 }}>Available Supervisors</Title>
                  {supervisorsLoading && <Spin size="small" />}
                </div>
                {supervisorsLoading ? (
                  <div className="text-center py-8">
                    <Spin />
                    <div className="mt-2 text-gray-500">Loading supervisors...</div>
                  </div>
                ) : (
                  <List
                    dataSource={supervisors}
                    renderItem={supervisor => (
                      <List.Item 
                        actions={[
                          <Button 
                            type="primary" 
                            size="small" 
                            onClick={() => assignSupervisor(supervisor._id)}
                            style={{ background: PURPLE_THEME.primary, borderColor: PURPLE_THEME.primary }}
                          >
                            Assign
                          </Button>
                        ]}
                        style={{ padding: '12px 0' }}
                      >
                        <List.Item.Meta
                          avatar={
                            <Avatar 
                              icon={<UserOutlined />}
                              style={{ background: PURPLE_THEME.primaryLighter }}
                            />
                          }
                          title={`${supervisor.name?.first_name} ${supervisor.name?.last_name}`}
                          description={
                            <div className="text-sm text-gray-500">
                              {supervisor.email}
                            </div>
                          }
                        />
                      </List.Item>
                    )}
                    locale={{ emptyText: 'No supervisors available' }}
                  />
                )}
              </div>
            </div>
          )}
        </Drawer>
      </div>
    </div>
  );
};

export default LeadsList;