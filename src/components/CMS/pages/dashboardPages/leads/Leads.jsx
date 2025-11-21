import React, { useState, useEffect } from 'react';
import { apiService } from '../../../../../manageApi/utils/custom.apiservice';
import CustomTable from '../../../pages/custom/CustomTable';
import { 
  Tabs, Card, Button, Tag, Modal, Table, Descriptions, 
  Row, Col, Statistic, Progress, Badge, Avatar, Timeline,
  Space, Divider, Alert, List, Tooltip, Popconfirm, message
} from 'antd';
import { 
  CheckCircleOutlined, CloseCircleOutlined, EyeOutlined, 
  UserOutlined, DollarOutlined, CalendarOutlined,
  PhoneOutlined, MailOutlined, FileTextOutlined,
  TeamOutlined, SafetyCertificateOutlined, TrophyOutlined,
  ClockCircleOutlined, ArrowRightOutlined, StarOutlined,
  RocketOutlined, ProjectOutlined, EnvironmentOutlined,
  FlagOutlined, CheckSquareOutlined, TagOutlined
} from '@ant-design/icons';
import { showSuccessAlert, showErrorAlert } from '../../../../../manageApi/utils/sweetAlert';

const Leads = () => {
  const [loading, setLoading] = useState(false);
  const [convertingDeal, setConvertingDeal] = useState(null);
  const [activeTab, setActiveTab] = useState('accepted');
  const [acceptedLeads, setAcceptedLeads] = useState([]);
  const [rejectedLeads, setRejectedLeads] = useState([]);
  const [deals, setDeals] = useState([]);
  const [selectedQuotation, setSelectedQuotation] = useState(null);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [dealModalVisible, setDealModalVisible] = useState(false);
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
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    },
    customer_rejected: { 
      label: 'Rejected', 
      color: 'error', 
      icon: <CloseCircleOutlined />,
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    },
    superadmin_approved: { 
      label: 'Approved', 
      color: 'processing', 
      icon: <SafetyCertificateOutlined />,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    final_created: { 
      label: 'Final Created', 
      color: 'warning', 
      icon: <FileTextOutlined />,
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200'
    },
    deal: { 
      label: 'Converted to Deal', 
      color: 'purple', 
      icon: <RocketOutlined />,
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    }
  };

  // Project status configuration
  const projectStatusConfig = {
    pending: { label: 'Pending', color: 'default', icon: <ClockCircleOutlined /> },
    active: { label: 'Active', color: 'processing', icon: <ProjectOutlined /> },
    completed: { label: 'Completed', color: 'success', icon: <CheckCircleOutlined /> },
    cancelled: { label: 'Cancelled', color: 'error', icon: <CloseCircleOutlined /> },
    on_hold: { label: 'On Hold', color: 'warning', icon: <FlagOutlined /> }
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
        const dealsData = response.data || [];
        setDeals(dealsData);
        updateDealStats(dealsData);
        
        // Fetch project details for each deal
        const dealsWithProjects = await Promise.all(
          dealsData.map(async (deal) => {
            if (deal.project_reference) {
              try {
                const projectResponse = await apiService.get(`/projects/${deal.project_reference}`);
                if (projectResponse.success) {
                  return {
                    ...deal,
                    project: projectResponse.data
                  };
                }
              } catch (error) {
                console.error(`Failed to fetch project for deal ${deal._id}:`, error);
              }
            }
            return deal;
          })
        );
        
        setDeals(dealsWithProjects);
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
        showSuccessAlert('Success', 'Estimate successfully converted to deal!');
        // Refresh all data
        fetchLeads('accepted');
        fetchDeals();
      }
    } catch (error) {
      showErrorAlert(
        'Conversion Failed', 
        error.response?.data?.message || 'Failed to convert estimate to deal'
      );
    } finally {
      setConvertingDeal(null);
    }
  };

  // View Deal Details
  const openDealDetails = async (deal) => {
    try {
      // If project data is not already loaded, fetch it
      if (deal.project_reference && !deal.project) {
        const response = await apiService.get(`/projects/${deal.project_reference}`);
        if (response.success) {
          setSelectedDeal({
            ...deal,
            project: response.data
          });
        } else {
          setSelectedDeal(deal);
        }
      } else {
        setSelectedDeal(deal);
      }
      setDealModalVisible(true);
    } catch (error) {
      setSelectedDeal(deal);
      setDealModalVisible(true);
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

  // Accepted Leads Columns
  const acceptedColumns = [
    {
      title: 'Customer Details',
      width: 200,
      render: (_, record) => (
        <div className="flex items-start space-x-3">
          <Avatar 
            size={40} 
            icon={<UserOutlined />}
            className="bg-blue-100 text-blue-600"
          />
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-gray-900 truncate">
              {record.customer_name}
            </div>
            <div className="text-xs text-gray-500 truncate">
              <MailOutlined className="mr-1" />
              {record.customer_email}
            </div>
            <div className="text-xs text-gray-500 truncate">
              <PhoneOutlined className="mr-1" />
              {record.customer_mobile}
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Service Information',
      width: 180,
      render: (_, record) => (
        <div>
          <div className="font-medium text-gray-900">{record.category?.name}</div>
          <div className="text-xs text-gray-500 mt-1">
            {record.subcategories?.slice(0, 2).map(sub => sub.name).join(', ')}
            {record.subcategories?.length > 2 && '...'}
          </div>
        </div>
      )
    },
    {
      title: 'Status',
      width: 140,
      render: (_, record) => {
        const config = statusConfig[record.status] || statusConfig.customer_accepted;
        return (
          <Tag 
            color={config.color} 
            icon={config.icon}
            className="flex items-center space-x-1 px-2 py-1"
          >
            {config.label}
          </Tag>
        );
      }
    },
    {
      title: 'Financial Details',
      width: 150,
      render: (_, record) => (
        <div className="text-right">
          <div className="text-lg font-bold text-green-600">
            <DollarOutlined className="mr-1" />
            AED {record.final_quotation?.grand_total?.toLocaleString() || '0'}
          </div>
          {record.final_quotation?.discount_percent > 0 && (
            <div className="text-xs text-green-500">
              {record.final_quotation.discount_percent}% OFF
            </div>
          )}
        </div>
      )
    },
    {
      title: 'Timeline',
      width: 140,
      render: (_, record) => (
        <div className="space-y-1">
          <div className="text-xs text-gray-500">
            Submitted: {new Date(record.submitted_at).toLocaleDateString()}
          </div>
          <div className="text-xs text-green-600 font-medium">
            Accepted: {record.customer_response?.responded_at ? 
              new Date(record.customer_response.responded_at).toLocaleDateString() : '-'
            }
          </div>
          {record.deal_converted_at && (
            <div className="text-xs text-purple-600 font-medium">
              Converted: {new Date(record.deal_converted_at).toLocaleDateString()}
            </div>
          )}
        </div>
      )
    },
    {
      title: 'Supervisor',
      width: 120,
      render: (_, record) => (
        <div className="text-center">
          {record.assigned_supervisor ? (
            <Tooltip title={`${record.assigned_supervisor.name?.first_name} ${record.assigned_supervisor.name?.last_name}`}>
              <Avatar 
                size="small" 
                icon={<UserOutlined />}
                className="bg-purple-100 text-purple-600 mx-auto"
              />
            </Tooltip>
          ) : (
            <span className="text-gray-400 text-xs">Not Assigned</span>
          )}
        </div>
      )
    },
    {
      title: 'Actions',
      width: 180,
      fixed: 'right',
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => openQuotation(record.final_quotation)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            View
          </Button>
          
          {record.status === 'customer_accepted' && !record.project_reference && (
            <Popconfirm
              title="Convert to Deal"
              description="Are you sure you want to convert this estimate to a project deal?"
              onConfirm={() => handleConvertToDeal(record._id)}
              okText="Yes, Convert"
              cancelText="Cancel"
              okButtonProps={{ 
                loading: convertingDeal === record._id,
                className: 'bg-purple-600 hover:bg-purple-700'
              }}
            >
              <Button
                type="primary"
                size="small"
                icon={<RocketOutlined />}
                loading={convertingDeal === record._id}
                className="bg-purple-600 hover:bg-purple-700 border-purple-600"
              >
                Convert to Deal
              </Button>
            </Popconfirm>
          )}
          
          {record.status === 'deal' && (
            <Button
              type="primary"
              size="small"
              icon={<ProjectOutlined />}
              onClick={() => openDealDetails(record)}
              className="bg-green-600 hover:bg-green-700"
            >
              View Deal
            </Button>
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
        <div className="flex items-center space-x-3">
          <Avatar 
            size={40} 
            icon={<UserOutlined />}
            className="bg-red-100 text-red-600"
          />
          <div>
            <div className="font-semibold">{record.customer_name}</div>
            <div className="text-xs text-gray-500">{record.customer_email}</div>
          </div>
        </div>
      )
    },
    {
      title: 'Service',
      width: 150,
      render: (_, record) => record.category?.name || 'N/A'
    },
    {
      title: 'Quotation Value',
      width: 130,
      render: (_, record) => (
        <div className="text-red-600 font-semibold">
          AED {record.final_quotation?.grand_total?.toLocaleString() || '0'}
        </div>
      )
    },
    {
      title: 'Rejection Details',
      width: 200,
      render: (_, record) => (
        <div>
          <div className="text-xs text-gray-500">
            {record.customer_response?.responded_at ? 
              new Date(record.customer_response.responded_at).toLocaleDateString() : '-'
            }
          </div>
          {record.customer_response?.reason && (
            <Tooltip title={record.customer_response.reason}>
              <div className="text-xs text-red-600 truncate mt-1">
                {record.customer_response.reason}
              </div>
            </Tooltip>
          )}
        </div>
      )
    },
    {
      title: 'Action',
      width: 100,
      fixed: 'right',
      render: (_, record) => (
        <Button
          danger
          size="small"
          icon={<EyeOutlined />}
          onClick={() => openQuotation(record.final_quotation)}
        >
          View
        </Button>
      )
    }
  ];

  // Deals Columns
  const dealsColumns = [
    {
      title: 'Project Details',
      width: 220,
      render: (_, record) => (
        <div className="flex items-start space-x-3">
          <Avatar 
            size={40} 
            icon={<ProjectOutlined />}
            className="bg-purple-100 text-purple-600"
          />
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-gray-900 truncate">
              {record.project?.title || 'Landscaping Project'}
            </div>
            <div className="text-xs text-gray-500 truncate">
              <UserOutlined className="mr-1" />
              {record.customer_name}
            </div>
            <div className="text-xs text-purple-600 font-medium">
              Project ID: {record.project?.code || 'N/A'}
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Service Category',
      width: 150,
      render: (_, record) => (
        <div>
          <div className="font-medium">{record.category?.name}</div>
          <div className="text-xs text-gray-500">
            {record.subcategories?.length || 0} subcategories
          </div>
        </div>
      )
    },
    {
      title: 'Project Status',
      width: 130,
      render: (_, record) => {
        const status = record.project?.status || 'pending';
        const config = projectStatusConfig[status] || projectStatusConfig.pending;
        return (
          <Tag 
            color={config.color} 
            icon={config.icon}
            className="flex items-center space-x-1 px-2 py-1"
          >
            {config.label}
          </Tag>
        );
      }
    },
    {
      title: 'Budget & Timeline',
      width: 180,
      render: (_, record) => (
        <div className="space-y-1">
          <div className="font-bold text-green-600">
            AED {record.final_quotation?.grand_total?.toLocaleString() || '0'}
          </div>
          <div className="text-xs text-gray-500">
            Duration: {record.project?.duration_days || record.final_quotation?.duration_days || 'N/A'} days
          </div>
          {record.project?.start_date && (
            <div className="text-xs text-blue-600">
              Starts: {new Date(record.project.start_date).toLocaleDateString()}
            </div>
          )}
        </div>
      )
    },
    {
      title: 'Location',
      width: 120,
      render: (_, record) => (
        <div className="text-xs text-gray-600">
          {record.project?.city || record.city || 'N/A'}
        </div>
      )
    },
    {
      title: 'Conversion Info',
      width: 140,
      render: (_, record) => (
        <div className="space-y-1">
          <div className="text-xs text-purple-600">
            Converted: {record.deal_converted_at ? 
              new Date(record.deal_converted_at).toLocaleDateString() : '-'
            }
          </div>
          <div className="text-xs text-gray-500">
            By: {record.deal_converted_by?.name || 'System'}
          </div>
        </div>
      )
    },
    {
      title: 'Actions',
      width: 150,
      fixed: 'right',
      render: (_, record) => (
        <Space>
          <Button
            type="primary"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => openQuotation(record.final_quotation)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Quotation
          </Button>
          <Button
            type="default"
            size="small"
            icon={<ProjectOutlined />}
            onClick={() => openDealDetails(record)}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Details
          </Button>
        </Space>
      )
    }
  ];

  const tabItems = [
    {
      key: 'accepted',
      label: (
        <Badge count={acceptedLeads.length} size="small" offset={[10, -5]}>
          <span className="flex items-center space-x-2">
            <CheckCircleOutlined className="text-green-500" />
            <span>Accepted Leads</span>
          </span>
        </Badge>
      ),
      children: (
        <div className="space-y-6">
          {/* Statistics Cards */}
          <Row gutter={[16, 16]}>
            <Col xs={12} sm={6}>
              <Card className="text-center border-0 shadow-sm">
                <Statistic
                  title="Total Accepted"
                  value={acceptedLeads.length}
                  prefix={<CheckCircleOutlined className="text-green-500" />}
                  valueStyle={{ color: '#10b981' }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card className="text-center border-0 shadow-sm">
                <Statistic
                  title="Total Revenue"
                  value={stats.revenue}
                  prefix="AED "
                  valueStyle={{ color: '#059669' }}
                  formatter={value => value.toLocaleString()}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card className="text-center border-0 shadow-sm">
                <Statistic
                  title="Converted to Deals"
                  value={acceptedLeads.filter(lead => lead.status === 'deal').length}
                  prefix={<RocketOutlined className="text-purple-500" />}
                  valueStyle={{ color: '#7c3aed' }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card className="text-center border-0 shadow-sm">
                <Statistic
                  title="Success Rate"
                  value={stats.total > 0 ? (acceptedLeads.length / stats.total) * 100 : 0}
                  suffix="%"
                  valueStyle={{ color: '#7c3aed' }}
                  formatter={value => Math.round(value)}
                />
              </Card>
            </Col>
          </Row>

          {/* Conversion Alert */}
          {acceptedLeads.some(lead => lead.status === 'customer_accepted' && !lead.project_reference) && (
            <Alert
              message="Ready for Conversion"
              description="You have accepted leads that can be converted to project deals. Use the 'Convert to Deal' button to create projects."
              type="info"
              showIcon
              icon={<RocketOutlined />}
              action={
                <Button 
                  size="small" 
                  type="primary"
                  onClick={() => {
                    const convertibleLeads = acceptedLeads.filter(
                      lead => lead.status === 'customer_accepted' && !lead.project_reference
                    );
                    if (convertibleLeads.length > 0) {
                      showSuccessAlert(
                        'Convertible Leads', 
                        `You have ${convertibleLeads.length} leads ready for conversion to deals.`
                      );
                    }
                  }}
                >
                  View Details
                </Button>
              }
            />
          )}

          {/* Leads Table */}
          <Card 
            title={
              <div className="flex items-center space-x-2">
                <TeamOutlined className="text-blue-500" />
                <span>Accepted Customer Leads</span>
                <Tag color="success" className="ml-2">
                  {acceptedLeads.length} Leads
                </Tag>
                <Tag color="purple" className="ml-2">
                  {acceptedLeads.filter(lead => lead.status === 'deal').length} Converted
                </Tag>
              </div>
            }
            className="shadow-lg border-0"
          >
            <CustomTable
              columns={acceptedColumns}
              data={acceptedLeads}
              loading={loading && activeTab === 'accepted'}
              pagination={false}
              scroll={{ x: 1200 }}
            />
          </Card>
        </div>
      )
    },
    {
      key: 'rejected',
      label: (
        <Badge count={rejectedLeads.length} size="small" offset={[10, -5]}>
          <span className="flex items-center space-x-2">
            <CloseCircleOutlined className="text-red-500" />
            <span>Rejected Leads</span>
          </span>
        </Badge>
      ),
      children: (
        <div className="space-y-6">
          {/* Rejection Insights */}
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card 
                title="Rejection Analysis" 
                className="shadow-sm border-0"
                extra={<Tag color="red">{rejectedLeads.length} Rejections</Tag>}
              >
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Rejection Rate</span>
                      <span>{stats.total > 0 ? Math.round((rejectedLeads.length / stats.total) * 100) : 0}%</span>
                    </div>
                    <Progress 
                      percent={stats.total > 0 ? Math.round((rejectedLeads.length / stats.total) * 100) : 0} 
                      status="exception"
                      strokeColor="#ef4444"
                    />
                  </div>
                  <div className="text-sm text-gray-600">
                    Total lost revenue: <strong>AED {rejectedLeads.reduce((sum, lead) => 
                      sum + (lead.final_quotation?.grand_total || 0), 0
                    ).toLocaleString()}</strong>
                  </div>
                </div>
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card 
                title="Common Feedback" 
                className="shadow-sm border-0"
              >
                <List
                  size="small"
                  dataSource={rejectedLeads.slice(0, 3).filter(lead => lead.customer_response?.reason)}
                  renderItem={(lead) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<CloseCircleOutlined className="text-red-500" />}
                        title={
                          <div className="text-xs text-gray-500">
                            {lead.customer_name}
                          </div>
                        }
                        description={
                          <div className="text-sm">
                            {lead.customer_response.reason}
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>

          {/* Rejected Leads Table */}
          <Card 
            title={
              <div className="flex items-center space-x-2">
                <CloseCircleOutlined className="text-red-500" />
                <span>Rejected Customer Leads</span>
                <Tag color="error" className="ml-2">
                  {rejectedLeads.length} Leads
                </Tag>
              </div>
            }
            className="shadow-lg border-0"
          >
            <CustomTable
              columns={rejectedColumns}
              data={rejectedLeads}
              loading={loading && activeTab === 'rejected'}
              pagination={false}
              scroll={{ x: 800 }}
            />
          </Card>
        </div>
      )
    },
    {
      key: 'deals',
      label: (
        <Badge count={deals.length} size="small" offset={[10, -5]}>
          <span className="flex items-center space-x-2">
            <RocketOutlined className="text-purple-500" />
            <span>Project Deals</span>
          </span>
        </Badge>
      ),
      children: (
        <div className="space-y-6">
          {/* Deal Statistics */}
          <Row gutter={[16, 16]}>
            <Col xs={12} sm={6}>
              <Card className="text-center border-0 shadow-sm">
                <Statistic
                  title="Total Deals"
                  value={deals.length}
                  prefix={<RocketOutlined className="text-purple-500" />}
                  valueStyle={{ color: '#7c3aed' }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card className="text-center border-0 shadow-sm">
                <Statistic
                  title="Deal Revenue"
                  value={stats.dealRevenue}
                  prefix="AED "
                  valueStyle={{ color: '#059669' }}
                  formatter={value => value.toLocaleString()}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card className="text-center border-0 shadow-sm">
                <Statistic
                  title="Active Projects"
                  value={deals.filter(deal => deal.project?.status === 'active').length}
                  prefix={<ProjectOutlined className="text-green-500" />}
                  valueStyle={{ color: '#10b981' }}
                />
              </Card>
            </Col>
            <Col xs={12} sm={6}>
              <Card className="text-center border-0 shadow-sm">
                <Statistic
                  title="Conversion Rate"
                  value={stats.accepted > 0 ? (deals.length / stats.accepted) * 100 : 0}
                  suffix="%"
                  valueStyle={{ color: '#7c3aed' }}
                  formatter={value => Math.round(value)}
                />
              </Card>
            </Col>
          </Row>

          {/* Project Status Overview */}
          <Card 
            title="Project Status Overview" 
            className="shadow-sm border-0"
            extra={<Tag color="purple">{deals.length} Total Deals</Tag>}
          >
            <Row gutter={[16, 16]}>
              {Object.entries(projectStatusConfig).map(([status, config]) => {
                const count = deals.filter(deal => deal.project?.status === status).length;
                const percentage = deals.length > 0 ? (count / deals.length) * 100 : 0;
                
                return (
                  <Col xs={24} sm={8} key={status}>
                    <div className="border rounded-lg p-4 text-center">
                      <Tag 
                        color={config.color} 
                        icon={config.icon}
                        className="text-lg px-3 py-1 mb-2"
                      >
                        {config.label}
                      </Tag>
                      <div className="text-2xl font-bold text-gray-900">{count}</div>
                      <div className="text-sm text-gray-500">Projects</div>
                      <Progress 
                        percent={Math.round(percentage)} 
                        size="small"
                        strokeColor={config.color === 'success' ? '#10b981' : 
                                   config.color === 'processing' ? '#1890ff' : 
                                   config.color === 'warning' ? '#faad14' : 
                                   config.color === 'error' ? '#ff4d4f' : '#d9d9d9'}
                      />
                    </div>
                  </Col>
                );
              })}
            </Row>
          </Card>

          {/* Deals Table */}
          <Card 
            title={
              <div className="flex items-center space-x-2">
                <RocketOutlined className="text-purple-500" />
                <span>Converted Project Deals</span>
                <Tag color="purple" className="ml-2">
                  {deals.length} Deals
                </Tag>
              </div>
            }
            className="shadow-lg border-0"
          >
            <CustomTable
              columns={dealsColumns}
              data={deals}
              loading={loading && activeTab === 'deals'}
              pagination={false}
              scroll={{ x: 1200 }}
            />
          </Card>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-6">
            <TeamOutlined className="text-4xl text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Customer Responses & Deals
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Track customer decisions, manage accepted quotations, and monitor converted project deals in one place.
          </p>
        </div>

        {/* Main Content */}
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

        {/* Enhanced Quotation Modal */}
        <Modal
          title={
            <div className="flex items-center space-x-3">
              <TrophyOutlined className="text-2xl text-yellow-500" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 m-0">Final Quotation Details</h2>
                <p className="text-gray-600 text-sm m-0">Complete project breakdown and customer decision</p>
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
              {/* Header Summary */}
              <Row gutter={[16, 16]} className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
                <Col xs={24} md={12}>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <DollarOutlined className="text-green-500 text-xl" />
                      <span className="font-semibold text-lg">Grand Total:</span>
                      <span className="text-2xl font-bold text-green-600">
                        AED {selectedQuotation.grand_total?.toLocaleString()}
                      </span>
                    </div>
                    {selectedQuotation.duration_days && (
                      <div className="flex items-center space-x-2">
                        <CalendarOutlined className="text-blue-500" />
                        <span className="font-semibold">Project Duration:</span>
                        <span className="text-lg text-blue-600">{selectedQuotation.duration_days} days</span>
                      </div>
                    )}
                  </div>
                </Col>
                <Col xs={24} md={12}>
                  <div className="space-y-2 text-right">
                    {selectedQuotation.discount_percent > 0 && (
                      <div className="text-lg text-green-600 font-semibold">
                        Customer Savings: AED {selectedQuotation.discount_amount?.toLocaleString()} 
                        ({selectedQuotation.discount_percent}% OFF)
                      </div>
                    )}
                    <div className="text-sm text-gray-500">
                      Quotation created: {new Date(selectedQuotation.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </Col>
              </Row>

              {/* Scope of Work */}
              <Card 
                title={
                  <span className="text-lg font-semibold flex items-center">
                    <FileTextOutlined className="mr-2 text-blue-500" />
                    Project Scope & Specifications
                  </span>
                }
                className="shadow-sm"
              >
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-lg">
                    {selectedQuotation.scope_of_work}
                  </p>
                </div>
              </Card>

              {/* Detailed Breakdown */}
              <Card
                title={
                  <span className="text-lg font-semibold flex items-center">
                    <TeamOutlined className="mr-2 text-green-500" />
                    Detailed Cost Breakdown
                  </span>
                }
                className="shadow-sm"
              >
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
                          <div className="text-sm text-gray-600 mt-1">{record.description}</div>
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
              </Card>

              {/* Financial Summary */}
              <Card 
                className="bg-gradient-to-r from-green-50 to-emerald-100 border-0 shadow-sm"
              >
                <Row gutter={[16, 16]}>
                  <Col xs={24} md={12}>
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-gray-900 flex items-center">
                        <DollarOutlined className="mr-2 text-green-500" />
                        Financial Summary
                      </h3>
                      <div className="space-y-3">
                        <div className="flex justify-between text-lg">
                          <span className="font-semibold">Subtotal:</span>
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
                    </div>
                  </Col>
                  <Col xs={24} md={12}>
                    <div className="bg-white p-4 rounded-lg border shadow-sm">
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                        <SafetyCertificateOutlined className="mr-2 text-blue-500" />
                        Project Inclusions
                      </h4>
                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-center">
                          <CheckCircleOutlined className="text-green-500 mr-2" />
                          Premium quality materials
                        </li>
                        <li className="flex items-center">
                          <CheckCircleOutlined className="text-green-500 mr-2" />
                          Certified professional team
                        </li>
                        <li className="flex items-center">
                          <CheckCircleOutlined className="text-green-500 mr-2" />
                          Quality assurance guarantee
                        </li>
                        <li className="flex items-center">
                          <CheckCircleOutlined className="text-green-500 mr-2" />
                          Comprehensive after-service support
                        </li>
                        <li className="flex items-center">
                          <CheckCircleOutlined className="text-green-500 mr-2" />
                          Timely project completion
                        </li>
                      </ul>
                    </div>
                  </Col>
                </Row>
              </Card>
            </div>
          )}
        </Modal>

        {/* Deal Details Modal */}
        <Modal
          title={
            <div className="flex items-center space-x-3">
              <RocketOutlined className="text-2xl text-purple-500" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 m-0">Project Deal Details</h2>
                <p className="text-gray-600 text-sm m-0">Complete project information and conversion details</p>
              </div>
            </div>
          }
          open={dealModalVisible}
          onCancel={() => setDealModalVisible(false)}
          footer={null}
          width="95%"
          style={{ maxWidth: 1200 }}
          className="deal-modal"
        >
          {selectedDeal && (
            <div className="space-y-6">
              {/* Deal Header */}
              <Row gutter={[16, 16]} className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-lg">
                <Col xs={24} md={12}>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <ProjectOutlined className="text-purple-500 text-xl" />
                      <span className="font-semibold text-lg">Project:</span>
                      <span className="text-2xl font-bold text-purple-600">
                        {selectedDeal.project?.title || 'Landscaping Project'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <UserOutlined className="text-blue-500" />
                      <span className="font-semibold">Client:</span>
                      <span className="text-lg text-blue-600">{selectedDeal.customer_name}</span>
                    </div>
                    {selectedDeal.project?.code && (
                      <div className="flex items-center space-x-2">
                        <TagOutlined className="text-green-500" />
                        <span className="font-semibold">Project ID:</span>
                        <span className="text-lg text-green-600">{selectedDeal.project.code}</span>
                      </div>
                    )}
                  </div>
                </Col>
                <Col xs={24} md={12}>
                  <div className="space-y-2 text-right">
                    <div className="text-lg font-bold text-green-600">
                      <DollarOutlined className="mr-1" />
                      AED {selectedDeal.final_quotation?.grand_total?.toLocaleString() || '0'}
                    </div>
                    <div className="text-sm text-purple-600">
                      Converted: {selectedDeal.deal_converted_at ? 
                        new Date(selectedDeal.deal_converted_at).toLocaleDateString() : '-'
                      }
                    </div>
                    {selectedDeal.deal_converted_by?.name && (
                      <div className="text-xs text-gray-500">
                        By: {selectedDeal.deal_converted_by.name}
                      </div>
                    )}
                  </div>
                </Col>
              </Row>

              {/* Project Information */}
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Card title="Project Information" className="shadow-sm">
                    <Descriptions column={1} size="small">
                      <Descriptions.Item label="Category">
                        {selectedDeal.category?.name || 'N/A'}
                      </Descriptions.Item>
                      <Descriptions.Item label="Subcategories">
                        {selectedDeal.subcategories?.map(sub => sub.name).join(', ') || 'N/A'}
                      </Descriptions.Item>
                      <Descriptions.Item label="Project Status">
                        <Tag 
                          color={
                            selectedDeal.project?.status === 'completed' ? 'green' :
                            selectedDeal.project?.status === 'active' ? 'blue' :
                            selectedDeal.project?.status === 'pending' ? 'orange' : 'default'
                          }
                        >
                          {selectedDeal.project?.status?.toUpperCase() || 'PENDING'}
                        </Tag>
                      </Descriptions.Item>
                      <Descriptions.Item label="Location">
                        {selectedDeal.project?.city || selectedDeal.city || 'N/A'}
                      </Descriptions.Item>
                      {selectedDeal.project?.budget && (
                        <Descriptions.Item label="Project Budget">
                          AED {selectedDeal.project.budget?.toLocaleString()}
                        </Descriptions.Item>
                      )}
                    </Descriptions>
                  </Card>
                </Col>
                <Col xs={24} md={12}>
                  <Card title="Timeline Information" className="shadow-sm">
                    <Descriptions column={1} size="small">
                      <Descriptions.Item label="Estimate Submitted">
                        {new Date(selectedDeal.submitted_at).toLocaleDateString()}
                      </Descriptions.Item>
                      <Descriptions.Item label="Customer Accepted">
                        {selectedDeal.customer_response?.responded_at ? 
                          new Date(selectedDeal.customer_response.responded_at).toLocaleDateString() : '-'
                        }
                      </Descriptions.Item>
                      <Descriptions.Item label="Deal Converted">
                        {selectedDeal.deal_converted_at ? 
                          new Date(selectedDeal.deal_converted_at).toLocaleDateString() : '-'
                        }
                      </Descriptions.Item>
                      {selectedDeal.project?.start_date && (
                        <Descriptions.Item label="Project Start">
                          {new Date(selectedDeal.project.start_date).toLocaleDateString()}
                        </Descriptions.Item>
                      )}
                      {selectedDeal.project?.end_date && (
                        <Descriptions.Item label="Project End">
                          {new Date(selectedDeal.project.end_date).toLocaleDateString()}
                        </Descriptions.Item>
                      )}
                    </Descriptions>
                  </Card>
                </Col>
              </Row>

              {/* Financial Summary */}
              {selectedDeal.final_quotation && (
                <Card title="Financial Summary" className="shadow-sm">
                  <Row gutter={[16, 16]}>
                    <Col xs={24} md={8}>
                      <Statistic
                        title="Quotation Value"
                        value={selectedDeal.final_quotation.grand_total}
                        prefix="AED "
                        valueStyle={{ color: '#059669' }}
                      />
                    </Col>
                    <Col xs={24} md={8}>
                      <Statistic
                        title="Discount"
                        value={selectedDeal.final_quotation.discount_percent || 0}
                        suffix="%"
                        valueStyle={{ color: '#ef4444' }}
                      />
                    </Col>
                    <Col xs={24} md={8}>
                      <Statistic
                        title="Discount Amount"
                        value={selectedDeal.final_quotation.discount_amount || 0}
                        prefix="AED "
                        valueStyle={{ color: '#ef4444' }}
                      />
                    </Col>
                  </Row>
                </Card>
              )}

              {/* Actions */}
              <Card title="Actions" className="shadow-sm">
                <Space>
                  <Button
                    type="primary"
                    icon={<EyeOutlined />}
                    onClick={() => {
                      setDealModalVisible(false);
                      openQuotation(selectedDeal.final_quotation);
                    }}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    View Full Quotation
                  </Button>
                  <Button
                    type="default"
                    icon={<ProjectOutlined />}
                    onClick={() => {
                      // Navigate to project management page if needed
                      message.info('Redirecting to project management...');
                    }}
                  >
                    Manage Project
                  </Button>
                </Space>
              </Card>
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
        
        .deal-modal .ant-modal-header {
          background: linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%);
          border-bottom: 1px solid #e9d5ff;
        }
        
        .custom-table .ant-table-thead > tr > th {
          background: #f8fafc;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};

export default Leads;