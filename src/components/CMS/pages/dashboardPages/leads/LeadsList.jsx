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
  Input,
  Collapse,
  Timeline
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
  ReloadOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  PaperClipOutlined,
  EnvironmentOutlined,
  ToolOutlined,
  ShoppingOutlined,
  PercentageOutlined,
  CalculatorOutlined,
  NumberOutlined,
  IdcardOutlined,
  FileOutlined,
  HistoryOutlined,
  SafetyOutlined
} from '@ant-design/icons';
import { showSuccessAlert, showErrorAlert, showConfirmDialog } from '../../../../../manageApi/utils/sweetAlert';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Search } = Input;
const { Panel } = Collapse;

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
  const [viewDetailsModal, setViewDetailsModal] = useState({ visible: false, data: null });
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

  // Progress Config
  const progressConfig = {
    none: { label: 'Not Started', color: 'default', icon: <ClockCircleOutlined /> },
    in_progress: { label: 'In Progress', color: 'processing', icon: <ClockCircleOutlined /> },
    completed: { label: 'Completed', color: 'success', icon: <CheckCircleOutlined /> }
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
        setLeads(response.data || []);
        setPagination({
          currentPage: response.pagination?.page || page,
          itemsPerPage: response.pagination?.limit || limit,
          totalItems: response.pagination?.total || 0
        });
        
        // Calculate stats from the filtered data
        calculateStats(response.data || []);
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
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
      console.error('Error fetching supervisors:', error);
      showErrorAlert('Error', 'Failed to load supervisors');
    } finally {
      setSupervisorsLoading(false);
    }
  };

  // Tab Change
  const handleTabChange = (key) => {
    const newFilters = { status: key };
    setFilters(newFilters);
    fetchLeads(1, pagination.itemsPerPage, newFilters);
  };

  // Open Assign Drawer
  const openAssignDrawer = (lead) => {
    setSelectedLead(lead);
    setDrawerVisible(true);
    if (supervisors.length === 0) fetchSupervisors();
  };

  // View Lead Details
  const viewLeadDetails = (lead) => {
    setViewDetailsModal({ visible: true, data: lead });
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
        console.error('Error assigning supervisor:', error);
        showErrorAlert('Error', 'Failed to assign lead to supervisor');
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
        console.error('Error approving quotation:', error);
        showErrorAlert('Error', 'Failed to approve quotation');
      }
    }
  };

  // View Final Quotation
  const viewQuotation = (quotation) => {
    setQuotationModal({ visible: true, data: quotation });
  };

  // Calculate Statistics
  const calculateStats = (leadsData) => {
    const newStats = {
      total: leadsData.length,
      pending: leadsData.filter(l => l.status === 'pending').length,
      assigned: leadsData.filter(l => l.status === 'assigned').length,
      final_created: leadsData.filter(l => l.status === 'final_created').length,
      superadmin_approved: leadsData.filter(l => l.status === 'superadmin_approved').length
    };
    setStats(newStats);
  };

  // Format mobile number
  const formatMobileNumber = (mobileObj) => {
    if (!mobileObj) return 'N/A';
    return `${mobileObj.country_code || ''} ${mobileObj.number || ''}`.trim();
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Format currency
  const formatCurrency = (amount, currency = 'AED') => {
    if (!amount) return `${currency} 0`;
    return `${currency} ${amount.toLocaleString()}`;
  };

  // Table Columns
  const columns = [
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
            <div className="font-semibold text-gray-900 truncate">{record.customer_name}</div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <MailOutlined />
              <span className="truncate">{record.customer_email}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
              <PhoneOutlined />
              {formatMobileNumber(record.customer_mobile)}
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Service Details',
      width: 180,
      render: (_, record) => (
        <div className="space-y-1">
          <div className="font-medium text-gray-800">
            {record.service_type?.toUpperCase()}
          </div>
          <div className="text-sm text-gray-600">
            {record.subcategory?.label}
          </div>
          <div className="text-xs text-gray-500">
            {record.type?.label}
          </div>
          {record.package && (
            <Tag color="blue" size="small">
              {record.package.name}
            </Tag>
          )}
        </div>
      )
    },
    {
      title: 'Area',
      width: 100,
      render: (_, record) => (
        <div className="text-center">
          <div className="font-bold text-lg" style={{ color: PURPLE_THEME.primary }}>
            {record.area_sqft || 0}
          </div>
          <div className="text-xs text-gray-500">sq ft</div>
          <div className="text-xs text-gray-400">
            {record.area_length} x {record.area_width}
          </div>
        </div>
      )
    },
    {
      title: 'Status',
      width: 120,
      render: (_, record) => {
        const cfg = statusConfig[record.status] || statusConfig.pending;
        return (
          <Tooltip title={cfg.label}>
            <Badge
              style={{ 
                backgroundColor: cfg.bgColor,
                color: cfg.textColor,
                border: `1px solid ${cfg.textColor}20`
              }}
              className="px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1"
            >
              {cfg.icon}
              <span>{cfg.label}</span>
            </Badge>
          </Tooltip>
        );
      }
    },
    {
      title: 'Progress',
      width: 120,
      render: (_, record) => (
        <div className="text-center">
          <Tag 
            color={progressConfig[record.supervisor_progress]?.color || 'default'}
            icon={progressConfig[record.supervisor_progress]?.icon}
            className="text-xs"
          >
            {progressConfig[record.supervisor_progress]?.label || 'Unknown'}
          </Tag>
        </div>
      )
    },
    {
      title: 'Submitted',
      width: 120,
      render: (_, record) => (
        <div className="text-xs text-gray-500">
          {formatDate(record.submitted_at || record.createdAt)}
        </div>
      )
    },
    {
      title: 'Actions',
      fixed: 'right',
      width: 220,
      render: (_, record) => {
        return (
          <Space>
            <Button 
              size="small" 
              icon={<EyeOutlined />}
              onClick={() => viewLeadDetails(record)}
              style={{ background: PURPLE_THEME.primaryBg, borderColor: PURPLE_THEME.primaryLighter }}
            >
              View Details
            </Button>
            
            {record.status === 'pending' && (
              <Button 
                size="small" 
                type="primary"
                onClick={() => openAssignDrawer(record)}
                style={{ background: PURPLE_THEME.primary, borderColor: PURPLE_THEME.primary }}
              >
                Assign
              </Button>
            )}
            
            {record.status === 'final_created' && (
              <Button
                type="primary"
                size="small"
                style={{ background: PURPLE_THEME.success, borderColor: PURPLE_THEME.success }}
                onClick={() => approveQuotation(record._id)}
                icon={<CheckCircleOutlined />}
              >
                Approve & Send
              </Button>
            )}
            
            {record.status === 'superadmin_approved' && (
              <Tag color="success" icon={<CheckCircleOutlined />} className="text-xs">
                Sent
              </Tag>
            )}
          </Space>
        );
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
        borderRadius: '12px',
        cursor: 'pointer'
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

  // Detail Card Component
  const DetailCard = ({ title, icon, children, style = {} }) => (
    <Card 
      size="small" 
      title={
        <div className="flex items-center gap-2">
          {icon}
          <span>{title}</span>
        </div>
      }
      style={{ 
        borderLeft: `4px solid ${PURPLE_THEME.primary}`,
        marginBottom: '16px',
        ...style
      }}
    >
      {children}
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
                placeholder="Search by name, email..."
                allowClear
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onSearch={(value) => fetchLeads(1, pagination.itemsPerPage, { ...filters, search: value })}
                style={{ width: 250 }}
              />
              <Button 
                icon={<ReloadOutlined />} 
                onClick={() => fetchLeads(pagination.currentPage, pagination.itemsPerPage, filters)}
              >
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
                onClick={() => {
                  setFilters({});
                  fetchLeads(1, pagination.itemsPerPage, {});
                }}
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

        {/* LEAD DETAILS MODAL */}
        <Modal
          title={
            <div className="flex items-center gap-3">
              <Avatar 
                size={40}
                style={{ 
                  background: PURPLE_THEME.primary,
                  color: 'white'
                }}
                icon={<IdcardOutlined />}
              />
              <div>
                <Title level={3} style={{ margin: 0, color: PURPLE_THEME.dark }}>
                  Estimate Lead Details
                </Title>
                <Text type="secondary">Complete information for lead #{viewDetailsModal.data?._id?.substring(0, 8) || 'N/A'}</Text>
              </div>
            </div>
          }
          open={viewDetailsModal.visible}
          onCancel={() => setViewDetailsModal({ visible: false, data: null })}
          footer={null}
          width={1000}
          style={{ top: 20 }}
        >
          {viewDetailsModal.data && (
            <div className="space-y-6 mt-4">
              {/* Status and Progress Banner */}
              <Card 
                style={{ 
                  background: statusConfig[viewDetailsModal.data.status]?.bgColor || PURPLE_THEME.light,
                  border: `2px solid ${statusConfig[viewDetailsModal.data.status]?.textColor || PURPLE_THEME.primary}20`
                }}
                bodyStyle={{ padding: '12px 16px' }}
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="text-sm font-medium text-gray-600">Lead Status</div>
                      <div className="text-xl font-bold" style={{ color: statusConfig[viewDetailsModal.data.status]?.textColor }}>
                        {statusConfig[viewDetailsModal.data.status]?.label || 'Unknown'}
                      </div>
                    </div>
                    <Divider type="vertical" style={{ height: '40px' }} />
                    <div>
                      <div className="text-sm font-medium text-gray-600">Supervisor Progress</div>
                      <div className="text-lg font-semibold">
                        <Tag 
                          color={progressConfig[viewDetailsModal.data.supervisor_progress]?.color || 'default'}
                          icon={progressConfig[viewDetailsModal.data.supervisor_progress]?.icon}
                        >
                          {progressConfig[viewDetailsModal.data.supervisor_progress]?.label || 'Unknown'}
                        </Tag>
                      </div>
                    </div>
                    <Divider type="vertical" style={{ height: '40px' }} />
                    <div>
                      <div className="text-sm font-medium text-gray-600">Customer Progress</div>
                      <div className="text-lg font-semibold">
                        <Tag 
                          color={progressConfig[viewDetailsModal.data.customer_progress]?.color || 'default'}
                          icon={progressConfig[viewDetailsModal.data.customer_progress]?.icon}
                        >
                          {progressConfig[viewDetailsModal.data.customer_progress]?.label || 'Unknown'}
                        </Tag>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-600">Lead ID</div>
                    <div className="font-mono text-sm">{viewDetailsModal.data._id}</div>
                  </div>
                </div>
              </Card>

              {/* Customer Information */}
              <DetailCard title="Customer Information" icon={<UserOutlined />}>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Descriptions size="small" column={1}>
                      <Descriptions.Item label="Full Name">
                        <Text strong>{viewDetailsModal.data.customer_name}</Text>
                      </Descriptions.Item>
                      <Descriptions.Item label="Email">
                        <div className="flex items-center gap-2">
                          <MailOutlined />
                          <Text copyable>{viewDetailsModal.data.customer_email}</Text>
                        </div>
                      </Descriptions.Item>
                      <Descriptions.Item label="Mobile">
                        <div className="flex items-center gap-2">
                          <PhoneOutlined />
                          <Text>{formatMobileNumber(viewDetailsModal.data.customer_mobile)}</Text>
                        </div>
                      </Descriptions.Item>
                    </Descriptions>
                  </Col>
                  <Col span={12}>
                    <Descriptions size="small" column={1}>
                      <Descriptions.Item label="Customer ID">
                        <Text copyable>{viewDetailsModal.data.customer?._id || 'N/A'}</Text>
                      </Descriptions.Item>
                      <Descriptions.Item label="Customer Name in System">
                        <Text>{viewDetailsModal.data.customer?.name || 'N/A'}</Text>
                      </Descriptions.Item>
                      <Descriptions.Item label="Customer Email">
                        <Text>{viewDetailsModal.data.customer?.email || 'N/A'}</Text>
                      </Descriptions.Item>
                      <Descriptions.Item label="Customer Mobile">
                        <Text>{viewDetailsModal.data.customer?.mobile || 'N/A'}</Text>
                      </Descriptions.Item>
                    </Descriptions>
                  </Col>
                </Row>
              </DetailCard>

              {/* Service Details */}
              <DetailCard title="Service Details" icon={<ToolOutlined />}>
                <Row gutter={[16, 16]}>
                  <Col span={8}>
                    <Descriptions size="small" column={1}>
                      <Descriptions.Item label="Service Type">
                        <Tag color="purple">{viewDetailsModal.data.service_type?.toUpperCase()}</Tag>
                      </Descriptions.Item>
                      <Descriptions.Item label="Category">
                        <Text strong>{viewDetailsModal.data.subcategory?.category || 'N/A'}</Text>
                      </Descriptions.Item>
                    </Descriptions>
                  </Col>
                  <Col span={8}>
                    <Descriptions size="small" column={1}>
                      <Descriptions.Item label="Subcategory">
                        <Text strong>{viewDetailsModal.data.subcategory?.label || 'N/A'}</Text>
                        <div className="text-xs text-gray-500 mt-1">
                          {viewDetailsModal.data.subcategory?.description || 'No description'}
                        </div>
                      </Descriptions.Item>
                    </Descriptions>
                  </Col>
                  <Col span={8}>
                    <Descriptions size="small" column={1}>
                      <Descriptions.Item label="Service Type">
                        <Text strong>{viewDetailsModal.data.type?.label || 'N/A'}</Text>
                      </Descriptions.Item>
                      <Descriptions.Item label="Package">
                        <Text strong>{viewDetailsModal.data.package?.name || 'N/A'}</Text>
                      </Descriptions.Item>
                    </Descriptions>
                  </Col>
                </Row>
              </DetailCard>

              {/* Area and Measurement */}
              <DetailCard title="Area & Measurements" icon={<CalculatorOutlined />}>
                <Row gutter={[16, 16]}>
                  <Col span={6}>
                    <div className="text-center p-3 border rounded-lg">
                      <div className="text-2xl font-bold" style={{ color: PURPLE_THEME.primary }}>
                        {viewDetailsModal.data.area_sqft || 0}
                      </div>
                      <div className="text-sm text-gray-600">Total Area (sq ft)</div>
                    </div>
                  </Col>
                  <Col span={6}>
                    <div className="text-center p-3 border rounded-lg">
                      <div className="text-xl font-bold text-gray-800">
                        {viewDetailsModal.data.area_length || 0} ft
                      </div>
                      <div className="text-sm text-gray-600">Length</div>
                    </div>
                  </Col>
                  <Col span={6}>
                    <div className="text-center p-3 border rounded-lg">
                      <div className="text-xl font-bold text-gray-800">
                        {viewDetailsModal.data.area_width || 0} ft
                      </div>
                      <div className="text-sm text-gray-600">Width</div>
                    </div>
                  </Col>
                  <Col span={6}>
                    <div className="text-center p-3 border rounded-lg">
                      <div className="text-xl font-bold" style={{ color: PURPLE_THEME.success }}>
                        {formatCurrency(viewDetailsModal.data.package?.price)}
                      </div>
                      <div className="text-sm text-gray-600">Package Price</div>
                    </div>
                  </Col>
                </Row>
              </DetailCard>

              {/* Project Description */}
              <DetailCard title="Project Description" icon={<FileTextOutlined />}>
                <div className="p-3 bg-gray-50 rounded-lg">
                  {viewDetailsModal.data.description ? (
                    <Paragraph>{viewDetailsModal.data.description}</Paragraph>
                  ) : (
                    <Text type="secondary">No description provided</Text>
                  )}
                </div>
              </DetailCard>

              {/* Attachments */}
              <DetailCard title="Attachments" icon={<PaperClipOutlined />}>
                {viewDetailsModal.data.attachments && viewDetailsModal.data.attachments.length > 0 ? (
                  <div className="space-y-2">
                    {viewDetailsModal.data.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 border rounded">
                        <FileOutlined />
                        <div>
                          <div className="font-medium">Attachment {index + 1}</div>
                          <div className="text-sm text-gray-500">{attachment}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <Text type="secondary">No attachments uploaded</Text>
                )}
              </DetailCard>

              {/* Quotations Section */}
              <DetailCard title="Freelancer Quotations" icon={<DollarOutlined />}>
                {viewDetailsModal.data.freelancer_quotations && viewDetailsModal.data.freelancer_quotations.length > 0 ? (
                  <Collapse ghost>
                    {viewDetailsModal.data.freelancer_quotations.map((quotation, index) => (
                      <Panel 
                        header={
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="font-medium">Quotation #{index + 1}</span>
                              <Tag color="blue" className="ml-2">
                                {formatCurrency(quotation.total_amount)}
                              </Tag>
                            </div>
                            <Button 
                              size="small" 
                              icon={<EyeOutlined />}
                              onClick={() => viewQuotation(quotation)}
                            >
                              View Details
                            </Button>
                          </div>
                        } 
                        key={index}
                      >
                        <Descriptions bordered size="small" column={2}>
                          <Descriptions.Item label="Freelancer">
                            {quotation.freelancer?.name || 'Unknown'}
                          </Descriptions.Item>
                          <Descriptions.Item label="Total Items">
                            {quotation.items?.length || 0}
                          </Descriptions.Item>
                          <Descriptions.Item label="Notes" span={2}>
                            {quotation.notes || 'No notes'}
                          </Descriptions.Item>
                        </Descriptions>
                      </Panel>
                    ))}
                  </Collapse>
                ) : (
                  <Text type="secondary">No quotations received yet</Text>
                )}
              </DetailCard>

              {/* Timeline and History */}
              <DetailCard title="Timeline & History" icon={<HistoryOutlined />}>
                <Timeline>
                  <Timeline.Item color="green">
                    <div className="font-medium">Lead Created</div>
                    <div className="text-sm text-gray-500">
                      {formatDate(viewDetailsModal.data.createdAt)}
                    </div>
                  </Timeline.Item>
                  <Timeline.Item color="blue">
                    <div className="font-medium">Submitted</div>
                    <div className="text-sm text-gray-500">
                      {formatDate(viewDetailsModal.data.submitted_at)}
                    </div>
                  </Timeline.Item>
                  <Timeline.Item color="purple" dot={<ClockCircleOutlined />}>
                    <div className="font-medium">Current Status</div>
                    <div className="text-sm">
                      <Tag color={statusConfig[viewDetailsModal.data.status]?.color}>
                        {statusConfig[viewDetailsModal.data.status]?.label}
                      </Tag>
                    </div>
                  </Timeline.Item>
                </Timeline>
              </DetailCard>

              {/* System Information */}
              <DetailCard title="System Information" icon={<SafetyOutlined />}>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Descriptions size="small" column={1}>
                      <Descriptions.Item label="Created At">
                        {formatDate(viewDetailsModal.data.createdAt)}
                      </Descriptions.Item>
                      <Descriptions.Item label="Updated At">
                        {formatDate(viewDetailsModal.data.updatedAt)}
                      </Descriptions.Item>
                      <Descriptions.Item label="Database Version">
                        <Tag>{viewDetailsModal.data.__v}</Tag>
                      </Descriptions.Item>
                    </Descriptions>
                  </Col>
                  <Col span={12}>
                    <Descriptions size="small" column={1}>
                      <Descriptions.Item label="Sent to Freelancers">
                        {viewDetailsModal.data.sent_to_freelancers?.length || 0} freelancers
                      </Descriptions.Item>
                      <Descriptions.Item label="Customer Response">
                        {viewDetailsModal.data.customer_response?.status ? (
                          <Tag color={viewDetailsModal.data.customer_response.status === 'accepted' ? 'success' : 'error'}>
                            {viewDetailsModal.data.customer_response.status.toUpperCase()}
                          </Tag>
                        ) : (
                          <Tag>No response</Tag>
                        )}
                      </Descriptions.Item>
                    </Descriptions>
                  </Col>
                </Row>
              </DetailCard>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button 
                  onClick={() => setViewDetailsModal({ visible: false, data: null })}
                >
                  Close
                </Button>
                {viewDetailsModal.data.status === 'pending' && (
                  <Button 
                    type="primary"
                    onClick={() => {
                      setViewDetailsModal({ visible: false, data: null });
                      openAssignDrawer(viewDetailsModal.data);
                    }}
                    style={{ background: PURPLE_THEME.primary }}
                  >
                    Assign Supervisor
                  </Button>
                )}
                {viewDetailsModal.data.status === 'final_created' && (
                  <Button 
                    type="primary"
                    onClick={() => {
                      setViewDetailsModal({ visible: false, data: null });
                      approveQuotation(viewDetailsModal.data._id);
                    }}
                    style={{ background: PURPLE_THEME.success }}
                  >
                    Approve & Send Quotation
                  </Button>
                )}
              </div>
            </div>
          )}
        </Modal>

        {/* Quotation Details Modal */}
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
                  Quotation Details
                </Title>
                <Text type="secondary">View quotation information</Text>
              </div>
            </div>
          }
          open={quotationModal.visible}
          onCancel={() => setQuotationModal({ visible: false, data: null })}
          footer={null}
          width={800}
        >
          {quotationModal.data && (
            <div className="space-y-6 mt-4">
              <Descriptions bordered column={2}>
                <Descriptions.Item label="Quotation ID" span={2}>
                  {quotationModal.data._id || 'N/A'}
                </Descriptions.Item>
                <Descriptions.Item label="Total Amount">
                  <Text strong style={{ color: PURPLE_THEME.success }}>
                    {formatCurrency(quotationModal.data.total_amount)}
                  </Text>
                </Descriptions.Item>
                <Descriptions.Item label="Status">
                  <Tag color="processing">Submitted</Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Submitted By" span={2}>
                  {quotationModal.data.freelancer?.name || 'Unknown Freelancer'}
                </Descriptions.Item>
                <Descriptions.Item label="Notes" span={2}>
                  {quotationModal.data.notes || 'No additional notes'}
                </Descriptions.Item>
              </Descriptions>

              {quotationModal.data.items && quotationModal.data.items.length > 0 && (
                <Card title="Quotation Items" size="small">
                  <Table
                    dataSource={quotationModal.data.items}
                    pagination={false}
                    bordered
                    rowKey="_id"
                    size="small"
                    scroll={{ x: 600 }}
                  >
                    <Table.Column title="Item" dataIndex="item" width={150} />
                    <Table.Column title="Description" dataIndex="description" ellipsis />
                    <Table.Column title="Qty" dataIndex="quantity" width={80} align="center" />
                    <Table.Column title="Unit Price" dataIndex="unit_price" width={100} />
                    <Table.Column title="Total" 
                      render={(_, record) => (
                        <Text strong style={{ color: PURPLE_THEME.success }}>
                          {formatCurrency(record.quantity * record.unit_price)}
                        </Text>
                      )} 
                      width={120} 
                    />
                  </Table>
                </Card>
              )}
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
                    <PhoneOutlined />
                    {formatMobileNumber(selectedLead.customer_mobile)}
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>Service:</strong> {selectedLead.service_type} - {selectedLead.subcategory?.label}
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>Area:</strong> {selectedLead.area_sqft} sq ft
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>Description:</strong> {selectedLead.description || 'No description'}
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
                          title={`${supervisor.name?.first_name || ''} ${supervisor.name?.last_name || ''}`}
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