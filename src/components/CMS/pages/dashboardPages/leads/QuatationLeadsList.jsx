import React, { useState, useEffect } from 'react';
import { apiService } from '../../../../../manageApi/utils/custom.apiservice';
import CustomTable from '../../../pages/custom/CustomTable';
import {
  Drawer, Button, Spin, Card, Tag, message, Form, Input, InputNumber,
  Upload, Modal, Row, Col, Divider, Table, Space, Select,
  Descriptions, Badge, Typography, Collapse, Avatar, Tooltip
} from 'antd';
import {
  EyeOutlined, FileAddOutlined, UploadOutlined, FileTextOutlined,
  CheckCircleOutlined, PlusOutlined, DeleteOutlined,
  UserOutlined, MailOutlined, PhoneOutlined, CalendarOutlined,
  CalculatorOutlined, DollarOutlined, HomeOutlined, ToolOutlined,
  InfoCircleOutlined, PaperClipOutlined, ClockCircleOutlined,
  CheckOutlined, CloseOutlined, TeamOutlined, BuildOutlined
} from '@ant-design/icons';
import { showSuccessAlert, showErrorAlert } from '../../../../../manageApi/utils/sweetAlert';
import { useSelector } from "react-redux";

const { TextArea } = Input;
const { Dragger } = Upload;
const { Option } = Select;
const { Title, Text, Paragraph } = Typography;
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

const QuotationLeadsList = () => {
  const user = useSelector((s) => s.auth?.user);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);

  // Modals & Drawers
  const [detailsDrawerVisible, setDetailsDrawerVisible] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [viewQuotationModal, setViewQuotationModal] = useState(false);

  const [selectedLead, setSelectedLead] = useState(null);
  const [selectedEstimate, setSelectedEstimate] = useState(null);
  const [mySubmittedQuotation, setMySubmittedQuotation] = useState(null);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0
  });

  const [filters, setFilters] = useState({ status: 'assigned' });
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);
  const [fileList, setFileList] = useState([]);

  const [items, setItems] = useState([
    { sno: 1, item: '', description: '', unit: '', quantity: 1, unit_price: 0, total: 0 }
  ]);

  // Status mapping with purple theme
  const statusConfig = {
    pending: { 
      label: 'Pending', 
      color: 'warning', 
      bgColor: '#fff7e6',
      textColor: '#fa8c16',
      icon: <ClockCircleOutlined />
    },
    assigned: { 
      label: 'Assigned', 
      color: 'processing', 
      bgColor: '#e6f7ff',
      textColor: '#1890ff',
      icon: <UserOutlined />
    },
    request_sent: { 
      label: 'Request Sent', 
      color: 'purple', 
      bgColor: '#f9f0ff',
      textColor: '#722ed1',
      icon: <FileAddOutlined />
    },
    quotations_received: { 
      label: 'Quotations Received', 
      color: 'success', 
      bgColor: '#f6ffed',
      textColor: '#52c41a',
      icon: <FileTextOutlined />
    },
    final_created: { 
      label: 'Final Created', 
      color: 'purple', 
      bgColor: '#f0e6ff',
      textColor: '#722ed1',
      icon: <CheckCircleOutlined />
    },
    superadmin_approved: { 
      label: 'Approved', 
      color: 'success', 
      bgColor: '#f6ffed',
      textColor: '#52c41a',
      icon: <CheckCircleOutlined />
    },
    customer_accepted: { 
      label: 'Customer Accepted', 
      color: 'green', 
      bgColor: '#f6ffed',
      textColor: '#389e0d',
      icon: <CheckOutlined />
    },
    customer_rejected: { 
      label: 'Customer Rejected', 
      color: 'error', 
      bgColor: '#fff1f0',
      textColor: '#cf1322',
      icon: <CloseOutlined />
    }
  };

  const unitOptions = [
    'sq.ft', 'sq.m', 'lumpsum', 'hour', 'day', 'week', 'month',
    'piece', 'kg', 'meter', 'set', 'unit', 'lot'
  ];

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

  const fetchLeads = async (page = 1, limit = 10, filterParams = {}) => {
    setLoading(true);
    try {
      const params = { page, limit, freelancer_id: user?.id, ...filterParams };
      const response = await apiService.get('/estimates', params);
      if (response.success) {
        setLeads(response.data);
        setPagination(prev => ({
          ...prev,
          currentPage: response.pagination?.page || page,
          itemsPerPage: response.pagination?.limit || limit,
          totalItems: response.pagination?.total || 0
        }));
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
      showErrorAlert('Error', 'Failed to fetch estimates');
    } finally {
      setLoading(false);
    }
  };

  const hasSubmittedQuotation = (estimate) => {
    if (!estimate.freelancer_quotations || !user?.id) return false;
    return estimate.freelancer_quotations.some(q => q.freelancer._id === user.id);
  };

  const isSentToFreelancer = (estimate) => {
    if (!estimate.sent_to_freelancers || !user?.id) return false;
    return estimate.sent_to_freelancers.some(f => f._id === user.id);
  };

  // Status Badge Component
  const StatusBadge = ({ status }) => {
    const config = statusConfig[status] || statusConfig.pending;
    
    return (
      <Badge
        count={config.label}
        style={{ 
          backgroundColor: config.bgColor,
          color: config.textColor,
          border: `1px solid ${config.textColor}20`
        }}
        className="px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1"
      >
        {config.icon}
        <span>{config.label}</span>
      </Badge>
    );
  };

  // Detail Card Component
  const DetailCard = ({ title, icon, children, style = {} }) => (
    <Card 
      size="small" 
      title={
        <div className="flex items-center gap-2" style={{ color: PURPLE_THEME.primary }}>
          {icon}
          <span className="font-semibold">{title}</span>
        </div>
      }
      style={{ 
        borderLeft: `4px solid ${PURPLE_THEME.primary}`,
        marginBottom: '16px',
        ...style
      }}
      headStyle={{ background: PURPLE_THEME.primaryBg }}
    >
      {children}
    </Card>
  );

  const calculateTotals = () => {
    const subtotal = items.reduce((sum, item) => sum + (item.total || 0), 0);
    const discountPercent = form.getFieldValue('discount_percent') || 0;
    const discountAmount = (subtotal * discountPercent) / 100;
    const grandTotal = subtotal - discountAmount;
    return { subtotal, discountAmount, grandTotal, discountPercent };
  };

  const updateItemTotal = (index) => {
    const newItems = [...items];
    newItems[index].total = (newItems[index].quantity || 0) * (newItems[index].unit_price || 0);
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, {
      sno: items.length + 1,
      item: '', description: '', unit: '', quantity: 1, unit_price: 0, total: 0
    }]);
  };

  const removeItem = (index) => {
    if (items.length === 1) {
      message.warning('At least one item is required');
      return;
    }
    const updated = items
      .filter((_, i) => i !== index)
      .map((item, idx) => ({ ...item, sno: idx + 1 }));
    setItems(updated);
  };

  const handlePageChange = (page, pageSize) => {
    fetchLeads(page, pageSize, filters);
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
    fetchLeads(1, pagination.itemsPerPage, newFilters);
  };

  const openCreateQuotationModal = (estimate) => {
    if (!isSentToFreelancer(estimate)) {
      message.error('This estimate was not sent to you');
      return;
    }
    if (hasSubmittedQuotation(estimate)) {
      message.info('You have already submitted a quotation');
      return;
    }
    setSelectedEstimate(estimate);
    form.resetFields();
    setFileList([]);
    setItems([{ sno: 1, item: '', description: '', unit: '', quantity: 1, unit_price: 0, total: 0 }]);
    setCreateModalVisible(true);
  };

  const openViewQuotationModal = (estimate) => {
    const myQ = estimate.freelancer_quotations.find(q => q.freelancer._id === user.id);
    if (myQ) {
      setMySubmittedQuotation(myQ.quotation);
      setSelectedEstimate(estimate);
      setViewQuotationModal(true);
    }
  };

  const openDetailsDrawer = (lead) => {
    setSelectedLead(lead);
    setDetailsDrawerVisible(true);
  };

  const handleSubmitQuotation = async (values) => {
    console.log("Form Values:", values);
    console.log("Items:", items);

    setSubmitting(true);

    try {
      /* ----------------------------------------------------
         1️⃣ VALIDATION — STOP HERE IF ANY ERROR
      ---------------------------------------------------- */

      // Scope required
      if (!values.scope_of_work || values.scope_of_work.trim() === "") {
        setSubmitting(false);
        return showErrorAlert("Validation Error", "Scope of work is required.");
      }

      // Filter non-empty items
      const filteredItems = items.filter(i => i.item.trim() !== "");

      if (filteredItems.length === 0) {
        setSubmitting(false);
        return showErrorAlert("Validation Error", "At least one quotation item is required.");
      }

      // Validate each item
      for (let item of filteredItems) {
        if (!item.item.trim()) {
          setSubmitting(false);
          return showErrorAlert("Validation Error", "Item name cannot be empty.");
        }
        if (!item.quantity || item.quantity <= 0) {
          setSubmitting(false);
          return showErrorAlert("Validation Error", "Quantity must be greater than 0.");
        }
        if (item.unit_price === "" || item.unit_price < 0) {
          setSubmitting(false);
          return showErrorAlert("Validation Error", "Unit price must be valid.");
        }
      }

      // Discount validation
      if (values.discount_percent < 0 || values.discount_percent > 100) {
        setSubmitting(false);
        return showErrorAlert("Validation Error", "Discount must be between 0 and 100.");
      }

      /* ----------------------------------------------------
         2️⃣ NOW BUILD PAYLOAD AFTER PASSING ALL VALIDATION
      ---------------------------------------------------- */

      const quotationData = {
        items: filteredItems,
        scope_of_work: values.scope_of_work,
        discount_percent: values.discount_percent || 0,
      };

      console.log("Sending Payload:", quotationData);

      /* ----------------------------------------------------
         3️⃣ SEND API REQUEST
      ---------------------------------------------------- */

      const response = await apiService.post(
        `/estimates/${selectedEstimate._id}/quotation`,
        quotationData
      );

      if (response.success) {
        showSuccessAlert("Success", "Quotation submitted successfully");
        setCreateModalVisible(false);
        setSelectedEstimate(null);
        form.resetFields();
        setItems([{ sno: 1, item: "", description: "", unit: "", quantity: 1, unit_price: 0, total: 0 }]);
        fetchLeads(pagination.currentPage, pagination.itemsPerPage, filters);
      }

    } catch (error) {
      console.error("Error submitting quotation:", error);

      // If backend sends a validation message — show it
      if (error?.response?.data?.message) {
        showErrorAlert("Error", error.response.data.message);
      } else {
        showErrorAlert("Error", "Failed to submit quotation");
      }

    } finally {
      setSubmitting(false);
    }
  };

  const uploadProps = {
    onRemove: (file) => {
      setFileList(prev => prev.filter(f => f.uid !== file.uid));
    },
    beforeUpload: (file) => {
      setFileList(prev => [...prev, file]);
      return false;
    },
    fileList,
  };

  const itemColumns = [
    { 
      title: 'S.No', 
      dataIndex: 'sno', 
      width: 60, 
      align: 'center', 
      render: t => (
        <Badge 
          count={t} 
          style={{ 
            backgroundColor: PURPLE_THEME.primary,
            color: 'white'
          }}
        />
      ) 
    },
    {
      title: 'Item', 
      dataIndex: 'item',
      render: (t, _, i) => (
        <Input
          value={t}
          placeholder="Item name"
          onChange={e => {
            const newItems = [...items];
            newItems[i].item = e.target.value;
            setItems(newItems);
          }}
          style={{ borderColor: PURPLE_THEME.primaryLighter }}
        />
      )
    },
    {
      title: 'Description', 
      dataIndex: 'description',
      render: (t, _, i) => (
        <Input
          value={t}
          placeholder="Description"
          onChange={e => {
            const newItems = [...items];
            newItems[i].description = e.target.value;
            setItems(newItems);
          }}
          style={{ borderColor: PURPLE_THEME.primaryLighter }}
        />
      )
    },
    {
      title: 'Unit', 
      dataIndex: 'unit', 
      width: 100,
      render: (t, _, i) => (
        <Select
          value={t}
          placeholder="Unit"
          onChange={v => {
            const newItems = [...items];
            newItems[i].unit = v;
            setItems(newItems);
          }}
          style={{ width: '100%', borderColor: PURPLE_THEME.primaryLighter }}
        >
          {unitOptions.map(u => <Option key={u} value={u}>{u}</Option>)}
        </Select>
      )
    },
    {
      title: 'Qty', 
      dataIndex: 'quantity', 
      width: 100,
      render: (t, _, i) => (
        <InputNumber
          min={0}
          value={t}
          style={{ width: '100%', borderColor: PURPLE_THEME.primaryLighter }}
          onChange={v => {
            const newItems = [...items];
            newItems[i].quantity = v || 0;
            setItems(newItems);
            updateItemTotal(i);
          }}
        />
      )
    },
    {
      title: 'Unit Price (AED)', 
      dataIndex: 'unit_price', 
      width: 140,
      render: (t, _, i) => (
        <InputNumber
          min={0}
          value={t}
          style={{ width: '100%', borderColor: PURPLE_THEME.primaryLighter }}
          formatter={v => `AED ${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={v => v.replace(/AED\s?|(,*)/g, '')}
          onChange={v => {
            const newItems = [...items];
            newItems[i].unit_price = v || 0;
            setItems(newItems);
            updateItemTotal(i);
          }}
        />
      )
    },
    {
      title: 'Total (AED)', 
      dataIndex: 'total', 
      width: 120,
      render: t => (
        <div className="text-right font-semibold" style={{ color: PURPLE_THEME.success }}>
          AED {t?.toLocaleString()}
        </div>
      )
    },
    {
      title: 'Action',
      width: 80,
      render: (_, __, i) => (
        <Button
          type="link"
          danger
          icon={<DeleteOutlined />}
          onClick={() => removeItem(i)}
          disabled={items.length === 1}
          style={{ color: PURPLE_THEME.error }}
        />
      )
    }
  ];

  const getColumns = () => [
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
      title: 'Lead Status',
      width: 120,
      render: (_, record) => <StatusBadge status={record.status} />
    },
    {
      title: 'Your Quotation Status',
      width: 150,
      render: (_, record) => {
        if (!isSentToFreelancer(record)) {
          return (
            <Tag color="default" icon={<CloseOutlined />}>
              Not Sent
            </Tag>
          );
        }
        
        if (hasSubmittedQuotation(record)) {
          const q = record.freelancer_quotations.find(x => x.freelancer._id === user.id);
          return (
            <div className="space-y-1">
              <Tag color="success" icon={<CheckCircleOutlined />}>
                Submitted
              </Tag>
              <div className="text-xs text-gray-500">
                {formatCurrency(q?.quotation?.grand_total)} • {formatDate(q.submitted_at)}
              </div>
            </div>
          );
        }
        
        return (
          <Tag color="orange" icon={<ClockCircleOutlined />}>
            Pending Submission
          </Tag>
        );
      }
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
      width: 200,
      render: (_, record) => (
        <Space>
          <Button 
            size="small" 
            icon={<EyeOutlined />} 
            onClick={() => openDetailsDrawer(record)}
            style={{ 
              background: PURPLE_THEME.primaryBg, 
              borderColor: PURPLE_THEME.primaryLighter,
              color: PURPLE_THEME.primary
            }}
          >
            View Details
          </Button>

          {isSentToFreelancer(record) && !hasSubmittedQuotation(record) && (
            <Button 
              type="primary" 
              size="small" 
              icon={<FileAddOutlined />}
              onClick={() => openCreateQuotationModal(record)}
              style={{ 
                background: PURPLE_THEME.primary, 
                borderColor: PURPLE_THEME.primary 
              }}
            >
              Create Quotation
            </Button>
          )}

          {hasSubmittedQuotation(record) && (
            <Button 
              size="small" 
              type="default"
              onClick={() => openViewQuotationModal(record)}
              style={{ 
                borderColor: PURPLE_THEME.success,
                color: PURPLE_THEME.success
              }}
            >
              View My Quotation
            </Button>
          )}
        </Space>
      )
    }
  ];

  const { subtotal, discountAmount, grandTotal } = calculateTotals();

  const stats = {
    total: leads.length,
    pending: leads.filter(l => isSentToFreelancer(l) && !hasSubmittedQuotation(l)).length,
    submitted: leads.filter(l => hasSubmittedQuotation(l)).length
  };

  useEffect(() => {
    if (user?.id) fetchLeads(1, 10, { status: 'assigned' });
  }, [user]);

  return (
    <div className="min-h-screen p-6" style={{ background: PURPLE_THEME.light }}>
      <div className="max-w-screen-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <Title level={2} style={{ color: PURPLE_THEME.dark, margin: 0 }}>
                My Estimates & Quotations
              </Title>
              <Paragraph style={{ color: PURPLE_THEME.gray, marginTop: '4px' }}>
                Manage estimates sent to you and submit detailed quotations
              </Paragraph>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={24} sm={8}>
            <Card 
              style={{ 
                borderRadius: '12px',
                border: `1px solid ${PURPLE_THEME.primary}20`,
                background: `${PURPLE_THEME.primary}08`,
                textAlign: 'center'
              }}
              bodyStyle={{ padding: '20px' }}
            >
              <div className="text-3xl font-bold" style={{ color: PURPLE_THEME.primary }}>
                {stats.total}
              </div>
              <div className="text-gray-600 mt-2">Total Estimates</div>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card 
              style={{ 
                borderRadius: '12px',
                border: `1px solid ${PURPLE_THEME.warning}20`,
                background: `${PURPLE_THEME.warning}08`,
                textAlign: 'center'
              }}
              bodyStyle={{ padding: '20px' }}
            >
              <div className="text-3xl font-bold" style={{ color: PURPLE_THEME.warning }}>
                {stats.pending}
              </div>
              <div className="text-gray-600 mt-2">Pending Quotations</div>
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card 
              style={{ 
                borderRadius: '12px',
                border: `1px solid ${PURPLE_THEME.success}20`,
                background: `${PURPLE_THEME.success}08`,
                textAlign: 'center'
              }}
              bodyStyle={{ padding: '20px' }}
            >
              <div className="text-3xl font-bold" style={{ color: PURPLE_THEME.success }}>
                {stats.submitted}
              </div>
              <div className="text-gray-600 mt-2">Submitted Quotations</div>
            </Card>
          </Col>
        </Row>

        {/* Table Card */}
        <Card
          style={{ 
            borderRadius: '12px',
            border: '1px solid #f0f0f0',
            marginBottom: '24px'
          }}
          bodyStyle={{ padding: 0 }}
        >
          <div className="p-4">
            <CustomTable
              columns={getColumns()}
              data={leads}
              totalItems={pagination.totalItems}
              currentPage={pagination.currentPage}
              itemsPerPage={pagination.itemsPerPage}
              onPageChange={handlePageChange}
              onFilter={handleFilter}
              loading={loading}
              rowClassName="hover:bg-purple-50 transition-colors"
            />
          </div>
        </Card>

        {/* Enhanced Details Drawer - Shows Full Estimate Details */}
        <Drawer
          title={
            <div className="flex items-center gap-3">
              <Avatar 
                size={40}
                style={{ 
                  background: PURPLE_THEME.primary,
                  color: 'white'
                }}
                icon={<InfoCircleOutlined />}
              />
              <div>
                <Title level={4} style={{ margin: 0, color: PURPLE_THEME.dark }}>
                  Estimate Details
                </Title>
                <Text type="secondary">Complete information for customer lead</Text>
              </div>
            </div>
          }
          placement="right"
          width={800}
          onClose={() => setDetailsDrawerVisible(false)}
          open={detailsDrawerVisible}
          style={{ background: PURPLE_THEME.light }}
        >
          {selectedLead && (
            <div className="space-y-6 mt-4">
              {/* Status Banner */}
              <Card 
                style={{ 
                  background: statusConfig[selectedLead.status]?.bgColor || PURPLE_THEME.light,
                  border: `2px solid ${statusConfig[selectedLead.status]?.textColor || PURPLE_THEME.primary}20`
                }}
                bodyStyle={{ padding: '12px 16px' }}
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="text-sm font-medium text-gray-600">Lead Status</div>
                      <StatusBadge status={selectedLead.status} />
                    </div>
                    <Divider type="vertical" style={{ height: '40px' }} />
                    <div>
                      <div className="text-sm font-medium text-gray-600">Your Status</div>
                      {isSentToFreelancer(selectedLead) ? (
                        hasSubmittedQuotation(selectedLead) ? (
                          <Tag color="success" icon={<CheckCircleOutlined />}>
                            Quotation Submitted
                          </Tag>
                        ) : (
                          <Tag color="orange" icon={<ClockCircleOutlined />}>
                            Pending Submission
                          </Tag>
                        )
                      ) : (
                        <Tag color="default" icon={<CloseOutlined />}>
                          Not Sent To You
                        </Tag>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-600">Estimate ID</div>
                    <div className="font-mono text-sm" style={{ color: PURPLE_THEME.primary }}>
                      {selectedLead._id.substring(0, 8)}...
                    </div>
                  </div>
                </div>
              </Card>

              {/* Customer Information */}
              <DetailCard title="Customer Information" icon={<UserOutlined />}>
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Descriptions size="small" column={1}>
                      <Descriptions.Item label="Full Name">
                        <Text strong>{selectedLead.customer_name}</Text>
                      </Descriptions.Item>
                      <Descriptions.Item label="Email">
                        <div className="flex items-center gap-2">
                          <MailOutlined />
                          <Text copyable>{selectedLead.customer_email}</Text>
                        </div>
                      </Descriptions.Item>
                      <Descriptions.Item label="Mobile">
                        <div className="flex items-center gap-2">
                          <PhoneOutlined />
                          <Text>{formatMobileNumber(selectedLead.customer_mobile)}</Text>
                        </div>
                      </Descriptions.Item>
                    </Descriptions>
                  </Col>
                  <Col span={12}>
                    <Descriptions size="small" column={1}>
                      <Descriptions.Item label="Submitted On">
                        {formatDate(selectedLead.submitted_at)}
                      </Descriptions.Item>
                      <Descriptions.Item label="Created On">
                        {formatDate(selectedLead.createdAt)}
                      </Descriptions.Item>
                      <Descriptions.Item label="Updated On">
                        {formatDate(selectedLead.updatedAt)}
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
                        <Tag color="purple">{selectedLead.service_type?.toUpperCase()}</Tag>
                      </Descriptions.Item>
                      <Descriptions.Item label="Category">
                        <Text strong>{selectedLead.subcategory?.category || 'N/A'}</Text>
                      </Descriptions.Item>
                    </Descriptions>
                  </Col>
                  <Col span={8}>
                    <Descriptions size="small" column={1}>
                      <Descriptions.Item label="Subcategory">
                        <Text strong>{selectedLead.subcategory?.label || 'N/A'}</Text>
                        <div className="text-xs text-gray-500 mt-1">
                          {selectedLead.subcategory?.description || 'No description'}
                        </div>
                      </Descriptions.Item>
                    </Descriptions>
                  </Col>
                  <Col span={8}>
                    <Descriptions size="small" column={1}>
                      <Descriptions.Item label="Service Type">
                        <Text strong>{selectedLead.type?.label || 'N/A'}</Text>
                      </Descriptions.Item>
                      <Descriptions.Item label="Package">
                        <Text strong>{selectedLead.package?.name || 'N/A'}</Text>
                      </Descriptions.Item>
                    </Descriptions>
                  </Col>
                </Row>
              </DetailCard>

              {/* Area and Measurement */}
              <DetailCard title="Area & Measurements" icon={<CalculatorOutlined />}>
                <Row gutter={[16, 16]}>
                  <Col span={6}>
                    <div className="text-center p-3 border rounded-lg" style={{ borderColor: PURPLE_THEME.primaryLighter }}>
                      <div className="text-2xl font-bold" style={{ color: PURPLE_THEME.primary }}>
                        {selectedLead.area_sqft || 0}
                      </div>
                      <div className="text-sm text-gray-600">Total Area (sq ft)</div>
                    </div>
                  </Col>
                  <Col span={6}>
                    <div className="text-center p-3 border rounded-lg" style={{ borderColor: PURPLE_THEME.primaryLighter }}>
                      <div className="text-xl font-bold text-gray-800">
                        {selectedLead.area_length || 0} ft
                      </div>
                      <div className="text-sm text-gray-600">Length</div>
                    </div>
                  </Col>
                  <Col span={6}>
                    <div className="text-center p-3 border rounded-lg" style={{ borderColor: PURPLE_THEME.primaryLighter }}>
                      <div className="text-xl font-bold text-gray-800">
                        {selectedLead.area_width || 0} ft
                      </div>
                      <div className="text-sm text-gray-600">Width</div>
                    </div>
                  </Col>
                  <Col span={6}>
                    <div className="text-center p-3 border rounded-lg" style={{ borderColor: PURPLE_THEME.primaryLighter }}>
                      <div className="text-xl font-bold" style={{ color: PURPLE_THEME.success }}>
                        {formatCurrency(selectedLead.package?.price)}
                      </div>
                      <div className="text-sm text-gray-600">Package Price</div>
                    </div>
                  </Col>
                </Row>
              </DetailCard>

              {/* Project Description */}
              <DetailCard title="Project Description" icon={<FileTextOutlined />}>
                <div className="p-3 rounded-lg" style={{ background: PURPLE_THEME.light }}>
                  {selectedLead.description ? (
                    <Paragraph>{selectedLead.description}</Paragraph>
                  ) : (
                    <Text type="secondary">No description provided</Text>
                  )}
                </div>
              </DetailCard>

              {/* Attachments */}
              <DetailCard title="Attachments" icon={<PaperClipOutlined />}>
                {selectedLead.attachments && selectedLead.attachments.length > 0 ? (
                  <div className="space-y-2">
                    {selectedLead.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 border rounded" style={{ borderColor: PURPLE_THEME.primaryLighter }}>
                        <FileTextOutlined style={{ color: PURPLE_THEME.primary }} />
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

              {/* Supervisor Information */}
              {selectedLead.assigned_supervisor && (
                <DetailCard title="Supervisor Information" icon={<TeamOutlined />}>
                  <div className="flex items-center gap-3 p-2 border rounded" style={{ borderColor: PURPLE_THEME.primaryLighter }}>
                    <Avatar 
                      icon={<UserOutlined />}
                      style={{ background: PURPLE_THEME.primaryLighter, color: PURPLE_THEME.primary }}
                    />
                    <div>
                      <div className="font-medium">
                        {selectedLead.assigned_supervisor.name?.first_name} {selectedLead.assigned_supervisor.name?.last_name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {selectedLead.assigned_supervisor.email}
                      </div>
                    </div>
                  </div>
                </DetailCard>
              )}

              {/* Timeline */}
              <DetailCard title="Timeline" icon={<CalendarOutlined />}>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Lead Created:</span>
                    <span className="text-sm text-gray-600">{formatDate(selectedLead.createdAt)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Submitted:</span>
                    <span className="text-sm text-gray-600">{formatDate(selectedLead.submitted_at)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Last Updated:</span>
                    <span className="text-sm text-gray-600">{formatDate(selectedLead.updatedAt)}</span>
                  </div>
                </div>
              </DetailCard>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t" style={{ borderColor: PURPLE_THEME.primaryLighter }}>
                <Button 
                  onClick={() => setDetailsDrawerVisible(false)}
                  style={{ color: PURPLE_THEME.primary }}
                >
                  Close
                </Button>
                {isSentToFreelancer(selectedLead) && !hasSubmittedQuotation(selectedLead) && (
                  <Button 
                    type="primary"
                    onClick={() => {
                      setDetailsDrawerVisible(false);
                      openCreateQuotationModal(selectedLead);
                    }}
                    style={{ background: PURPLE_THEME.primary, borderColor: PURPLE_THEME.primary }}
                    icon={<FileAddOutlined />}
                  >
                    Create Quotation
                  </Button>
                )}
                {hasSubmittedQuotation(selectedLead) && (
                  <Button 
                    type="default"
                    onClick={() => {
                      setDetailsDrawerVisible(false);
                      openViewQuotationModal(selectedLead);
                    }}
                    style={{ 
                      borderColor: PURPLE_THEME.success,
                      color: PURPLE_THEME.success
                    }}
                  >
                    View My Quotation
                  </Button>
                )}
              </div>
            </div>
          )}
        </Drawer>

        {/* Create Quotation Modal */}
        <Modal
          title={
            <div className="flex items-center gap-3">
              <Avatar 
                size={40}
                style={{ 
                  background: PURPLE_THEME.primary,
                  color: 'white'
                }}
                icon={<FileAddOutlined />}
              />
              <div>
                <Title level={4} style={{ margin: 0, color: PURPLE_THEME.dark }}>
                  Create Detailed Quotation
                </Title>
                <Text type="secondary">For {selectedEstimate?.customer_name}</Text>
              </div>
            </div>
          }
          open={createModalVisible}
          onCancel={() => setCreateModalVisible(false)}
          footer={null}
          width={1000}
          style={{ top: 20 }}
          destroyOnClose
        >
          {selectedEstimate && (
            <Form form={form} layout="vertical" onFinish={handleSubmitQuotation}>
              <div className="space-y-6 max-h-[75vh] overflow-y-auto pr-4">
                {/* Estimate Summary */}
                <Card 
                  size="small" 
                  title="Estimate Summary"
                  style={{ borderLeft: `4px solid ${PURPLE_THEME.primary}` }}
                >
                  <div className="space-y-2">
                    <p><strong>Customer:</strong> {selectedEstimate.customer_name}</p>
                    <p><strong>Service:</strong> {selectedEstimate.subcategory?.label}</p>
                    <p><strong>Area:</strong> {selectedEstimate.area_sqft} sq ft ({selectedEstimate.area_length} x {selectedEstimate.area_width})</p>
                    <p><strong>Package:</strong> {selectedEstimate.package?.name}</p>
                  </div>
                </Card>

                {/* Items Breakdown */}
                <Card 
                  title={
                    <div className="flex justify-between items-center">
                      <span style={{ color: PURPLE_THEME.primary }}>Items Breakdown</span>
                      <Button 
                        icon={<PlusOutlined />} 
                        onClick={addItem} 
                        type="dashed"
                        style={{ color: PURPLE_THEME.primary, borderColor: PURPLE_THEME.primary }}
                      >
                        Add Item
                      </Button>
                    </div>
                  }
                  style={{ borderLeft: `4px solid ${PURPLE_THEME.primary}` }}
                >
                  <Table 
                    columns={itemColumns} 
                    dataSource={items} 
                    pagination={false} 
                    scroll={{ x: 900 }} 
                    rowKey={(_, i) => i} 
                  />
                </Card>

                {/* Financial Summary */}
                <Card 
                  title="Financial Summary" 
                  style={{ borderLeft: `4px solid ${PURPLE_THEME.success}` }}
                >
                  <div className="text-right space-y-3">
                    <div className="text-lg">
                      Subtotal: <strong style={{ color: PURPLE_THEME.primary }}>{formatCurrency(subtotal)}</strong>
                    </div>
                    <Form.Item name="discount_percent" label="Discount %">
                      <InputNumber 
                        min={0} 
                        max={100} 
                        addonAfter="%" 
                        style={{ width: 200, borderColor: PURPLE_THEME.primaryLighter }}
                      />
                    </Form.Item>
                    <div className="text-lg">
                      Discount: <strong style={{ color: PURPLE_THEME.success }}>-{formatCurrency(discountAmount)}</strong>
                    </div>
                    <Divider style={{ borderColor: PURPLE_THEME.primaryLighter }} />
                    <div className="text-2xl font-bold" style={{ color: PURPLE_THEME.success }}>
                      Grand Total: {formatCurrency(grandTotal)}
                    </div>
                  </div>
                </Card>

                {/* Scope of Work */}
                <Card 
                  title="Scope of Work" 
                  style={{ borderLeft: `4px solid ${PURPLE_THEME.info}` }}
                >
                  <Form.Item 
                    name="scope_of_work" 
                    rules={[{ required: true, message: 'Scope of work is required' }]}
                  >
                    <TextArea 
                      rows={6} 
                      placeholder="Describe full scope, timeline, materials, exclusions..." 
                      style={{ borderColor: PURPLE_THEME.primaryLighter }}
                    />
                  </Form.Item>
                </Card>

                {/* Action Buttons */}
                <div className="text-right space-x-3">
                  <Button 
                    onClick={() => setCreateModalVisible(false)}
                    style={{ color: PURPLE_THEME.primary }}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="primary" 
                    loading={submitting} 
                    htmlType="submit"
                    style={{ background: PURPLE_THEME.primary, borderColor: PURPLE_THEME.primary }}
                  >
                    Submit Quotation
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Modal>

        {/* View Submitted Quotation Modal */}
        <Modal
          title={
            <div className="flex items-center gap-3">
              <Avatar 
                size={40}
                style={{ 
                  background: PURPLE_THEME.success,
                  color: 'white'
                }}
                icon={<CheckCircleOutlined />}
              />
              <div>
                <Title level={4} style={{ margin: 0, color: PURPLE_THEME.dark }}>
                  Your Submitted Quotation
                </Title>
                <Text type="secondary">Submitted for {selectedEstimate?.customer_name}</Text>
              </div>
            </div>
          }
          open={viewQuotationModal}
          onCancel={() => setViewQuotationModal(false)}
          footer={null}
          width={900}
          style={{ top: 20 }}
        >
          {mySubmittedQuotation && (
            <div className="space-y-6">
              {/* Grand Total Banner */}
              <Card 
                style={{ 
                  background: PURPLE_THEME.success + '10',
                  border: `2px solid ${PURPLE_THEME.success}20`
                }}
                bodyStyle={{ padding: '16px' }}
              >
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-600 mb-2">Grand Total</div>
                  <div className="text-4xl font-bold" style={{ color: PURPLE_THEME.success }}>
                    {formatCurrency(mySubmittedQuotation.grand_total)}
                  </div>
                  {mySubmittedQuotation.discount_percent > 0 && (
                    <div className="text-sm text-gray-500 mt-2">
                      Includes {mySubmittedQuotation.discount_percent}% discount
                    </div>
                  )}
                </div>
              </Card>

              {/* Items Table */}
              <Card 
                title="Quotation Items" 
                style={{ borderLeft: `4px solid ${PURPLE_THEME.primary}` }}
              >
                <Table
                  dataSource={mySubmittedQuotation.items || []}
                  columns={[
                    { 
                      title: 'S.No', 
                      width: 60,
                      align: 'center',
                      render: (_, __, i) => (
                        <Badge 
                          count={i + 1} 
                          style={{ 
                            backgroundColor: PURPLE_THEME.primary,
                            color: 'white'
                          }}
                        />
                      ) 
                    },
                    { title: 'Item', dataIndex: 'item', width: 200 },
                    { title: 'Description', dataIndex: 'description', ellipsis: true },
                    { title: 'Unit', dataIndex: 'unit', width: 80 },
                    { 
                      title: 'Qty', 
                      dataIndex: 'quantity', 
                      width: 80,
                      align: 'center' 
                    },
                    { 
                      title: 'Rate (AED)', 
                      dataIndex: 'unit_price', 
                      width: 120,
                      render: v => formatCurrency(v)
                    },
                    { 
                      title: 'Total (AED)', 
                      dataIndex: 'total', 
                      width: 120,
                      render: v => (
                        <div className="font-semibold" style={{ color: PURPLE_THEME.success }}>
                          {formatCurrency(v)}
                        </div>
                      )
                    },
                  ]}
                  pagination={false}
                  scroll={{ x: 800 }}
                />
              </Card>

              {/* Scope of Work */}
              <Card 
                title="Scope of Work" 
                style={{ borderLeft: `4px solid ${PURPLE_THEME.info}` }}
              >
                <div className="p-3 rounded-lg" style={{ background: PURPLE_THEME.light }}>
                  <Paragraph className="whitespace-pre-wrap">
                    {mySubmittedQuotation.scope_of_work}
                  </Paragraph>
                </div>
              </Card>

              {/* Summary */}
              <Card 
                title="Summary" 
                style={{ borderLeft: `4px solid ${PURPLE_THEME.success}` }}
              >
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Discount Applied:</span>
                        <span style={{ color: PURPLE_THEME.success }}>
                          {mySubmittedQuotation.discount_percent || 0}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Number of Items:</span>
                        <span>{mySubmittedQuotation.items?.length || 0}</span>
                      </div>
                    </div>
                  </Col>
                  <Col span={12}>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Submitted On:</span>
                        <span>{formatDate(selectedEstimate?.updatedAt)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Status:</span>
                        <Tag color="success" icon={<CheckCircleOutlined />}>
                          Submitted
                        </Tag>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card>

              <div className="text-right">
                <Button 
                  onClick={() => setViewQuotationModal(false)}
                  style={{ color: PURPLE_THEME.primary }}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default QuotationLeadsList;