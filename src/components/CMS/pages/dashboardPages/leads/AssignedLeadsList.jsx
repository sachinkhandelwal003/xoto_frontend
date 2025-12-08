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
  Card, 
  Tag, 
  message, 
  Badge, 
  Alert, 
  Row, 
  Col, 
  Modal, 
  Select, 
  Form, 
  Input, 
  InputNumber, 
  Divider, 
  Descriptions, 
  Table, 
  Space, 
  Collapse,
  Timeline,
  Typography,
  Tooltip
} from 'antd';
import { 
  UserOutlined, 
  SendOutlined, 
  EyeOutlined, 
  FileTextOutlined, 
  BellOutlined, 
  CheckCircleOutlined, 
  DollarOutlined, 
  CalendarOutlined, 
  ClockCircleOutlined, 
  PlusOutlined, 
  DeleteOutlined, 
  CalculatorOutlined,
  PhoneOutlined,
  MailOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  PaperClipOutlined,
  EnvironmentOutlined,
  ToolOutlined,
  ShoppingOutlined,
  PercentageOutlined,
  NumberOutlined,
  IdcardOutlined,
  HistoryOutlined,
  SafetyOutlined,
  FileOutlined,
  CopyOutlined,
  CheckOutlined,
  CloseOutlined,
  TeamOutlined,
  BuildOutlined
} from '@ant-design/icons';
import { showSuccessAlert, showErrorAlert, showConfirmDialog } from '../../../../../manageApi/utils/sweetAlert';
import { useSelector } from "react-redux";

const { Option } = Select;
const { TextArea } = Input;
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

const AssignedLeadsList = () => {
    const user = useSelector((s) => s.auth?.user);
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(false);
    const [freelancers, setFreelancers] = useState([]);
    const [freelancersLoading, setFreelancersLoading] = useState(false);
    const [quotations, setQuotations] = useState([]);
    const [quotationsLoading, setQuotationsLoading] = useState(false);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [freelancerDrawerVisible, setFreelancerDrawerVisible] = useState(false);
    const [quotationsDrawerVisible, setQuotationsDrawerVisible] = useState(false);
    const [finalQuotationModalVisible, setFinalQuotationModalVisible] = useState(false);
    const [selectedLead, setSelectedLead] = useState(null);
    const [selectedFreelancers, setSelectedFreelancers] = useState([]);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        itemsPerPage: 10,
        totalItems: 0
    });
    const [filters, setFilters] = useState({
        status: 'assigned'
    });
    const [finalQuotationForm] = Form.useForm();
    const [items, setItems] = useState([
        { 
            sno: 1, 
            item: '', 
            description: '', 
            unit: '', 
            quantity: 1, 
            unit_price: 0, 
            total: 0 
        }
    ]);
    const [selectedQuotation, setSelectedQuotation] = useState(null);

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
            icon: <SendOutlined />
        },
        final_created: { 
            label: 'Final Created', 
            color: 'purple', 
            bgColor: '#f0e6ff',
            textColor: '#722ed1',
            icon: <FileTextOutlined />
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

    // Supervisor progress mapping
    const supervisorProgressConfig = {
        none: { 
            label: 'Not Started', 
            color: 'default', 
            bgColor: '#f5f5f5',
            textColor: '#8c8c8c',
            icon: <ClockCircleOutlined />
        },
        request_sent: { 
            label: 'Request Sent', 
            color: 'purple', 
            bgColor: '#f9f0ff',
            textColor: '#722ed1',
            icon: <SendOutlined />
        },
        request_completed: { 
            label: 'Request Completed', 
            color: 'success', 
            bgColor: '#f6ffed',
            textColor: '#52c41a',
            icon: <CheckCircleOutlined />
        },
        final_quotation_created: { 
            label: 'Final Quotation Created', 
            color: 'purple', 
            bgColor: '#f0e6ff',
            textColor: '#722ed1',
            icon: <FileTextOutlined />
        }
    };

    // Unit options
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

    // Fetch leads data for current supervisor
    const fetchLeads = async (page = 1, limit = 10, filterParams = {}) => {
        setLoading(true);
        try {
            const params = {
                page,
                limit,
                supervisor: user?.id,
                ...filterParams
            };
            
            const response = await apiService.get('/estimates', params);
            console.log('Leads API Response:', response);
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
            showErrorAlert('Error', 'Failed to fetch leads');
        } finally {
            setLoading(false);
        }
    };

    // Fetch available freelancers
    const fetchFreelancers = async () => {
        setFreelancersLoading(true);
        try {
            const response = await apiService.get('/freelancer', { isActive: true });
            
            if (response.success) {
                setFreelancers(response.freelancers || []);
            }
        } catch (error) {
            console.error('Error fetching freelancers:', error);
            showErrorAlert('Error', 'Failed to fetch freelancers');
        } finally {
            setFreelancersLoading(false);
        }
    };

    // Fetch quotations for a specific estimate
    const fetchQuotations = async (estimateId) => {
        setQuotationsLoading(true);
        try {
            const response = await apiService.get(`/estimates/quatation?estimate_id=${estimateId}`);
            
            if (response.success) {
                setQuotations(response.data || []);
            }
        } catch (error) {
            console.error('Error fetching quotations:', error);
            showErrorAlert('Error', 'Failed to fetch quotations');
        } finally {
            setQuotationsLoading(false);
        }
    };

    // Calculate totals
    const calculateTotals = () => {
        const subtotal = items.reduce((sum, item) => sum + (item.total || 0), 0);
        const discountPercent = finalQuotationForm.getFieldValue('discount_percent') || 0;
        const discountAmount = (subtotal * discountPercent) / 100;
        const grandTotal = subtotal - discountAmount;

        return {
            subtotal,
            discountAmount,
            grandTotal,
            discountPercent
        };
    };

    // Update item total
    const updateItemTotal = (index) => {
        const newItems = [...items];
        const item = newItems[index];
        item.total = (item.quantity || 0) * (item.unit_price || 0);
        setItems(newItems);
    };

    // Add new item
    const addItem = () => {
        setItems([
            ...items,
            { 
                sno: items.length + 1, 
                item: '', 
                description: '', 
                unit: '', 
                quantity: 1, 
                unit_price: 0, 
                total: 0 
            }
        ]);
    };

    // Remove item
    const removeItem = (index) => {
        if (items.length === 1) {
            message.warning('At least one item is required');
            return;
        }
        const newItems = items.filter((_, i) => i !== index);
        // Update serial numbers
        const updatedItems = newItems.map((item, idx) => ({
            ...item,
            sno: idx + 1
        }));
        setItems(updatedItems);
    };

    // Send request to freelancers
    const handleSendToFreelancers = async () => {
        if (!selectedLead || selectedFreelancers.length === 0) {
            message.error('Please select at least one freelancer');
            return;
        }

        const confirm = await showConfirmDialog(
            'Send to Freelancers',
            `Are you sure you want to send this lead to ${selectedFreelancers.length} freelancer(s)?`,
            'Send'
        );

        if (confirm.isConfirmed) {
            try {
                const response = await apiService.put(
                    `/estimates/${selectedLead._id}/send-to-freelancers`,
                    { freelancer_ids: selectedFreelancers }
                );

                if (response.success) {
                    showSuccessAlert('Success', `Lead sent to ${selectedFreelancers.length} freelancers successfully`);
                    setFreelancerDrawerVisible(false);
                    setSelectedLead(null);
                    setSelectedFreelancers([]);
                    fetchLeads(pagination.currentPage, pagination.itemsPerPage, filters);
                }
            } catch (error) {
                console.error('Error sending to freelancers:', error);
                showErrorAlert('Error', 'Failed to send lead to freelancers');
            }
        }
    };

    // Handle freelancer selection
    const handleFreelancerSelect = (freelancerId) => {
        setSelectedFreelancers(prev => {
            if (prev.includes(freelancerId)) {
                return prev.filter(id => id !== freelancerId);
            } else {
                return [...prev, freelancerId];
            }
        });
    };

    // Open freelancer selection drawer
    const openFreelancerDrawer = (lead) => {
        setSelectedLead(lead);
        setSelectedFreelancers([]);
        setFreelancerDrawerVisible(true);
        if (freelancers.length === 0) {
            fetchFreelancers();
        }
    };

    // Open quotations drawer
    const openQuotationsDrawer = async (lead) => {
        setSelectedLead(lead);
        setQuotationsDrawerVisible(true);
        await fetchQuotations(lead._id);
    };

    // Open final quotation modal
    const openFinalQuotationModal = (lead) => {
        setSelectedLead(lead);
        setFinalQuotationModalVisible(true);
        finalQuotationForm.resetFields();
        setItems([{ sno: 1, item: '', description: '', unit: '', quantity: 1, unit_price: 0, total: 0 }]);
        setSelectedQuotation(null);
    };

    // Load quotation data into form
    const loadQuotationData = (quotation) => {
        setSelectedQuotation(quotation);
        
        if (quotation.items && quotation.items.length > 0) {
            setItems(quotation.items.map((item, index) => ({
                ...item,
                sno: index + 1
            })));
        }

        finalQuotationForm.setFieldsValue({
            scope_of_work: quotation.scope_of_work,
            discount_percent: quotation.discount_percent || 0
        });
    };

    // Create final quotation
    const handleCreateFinalQuotation = async (values) => {
        try {
            /* ----------------------------------------------------
               1️⃣ VALIDATION
            ---------------------------------------------------- */
            const { scope_of_work, discount_percent } = values;

            if (!scope_of_work || scope_of_work.trim() === "") {
                return showErrorAlert("Validation Error", "Scope of work is required.");
            }

            const filteredItems = items.filter(i => i.item.trim() !== "");

            if (filteredItems.length === 0) {
                return showErrorAlert("Validation Error", "At least one item is required.");
            }

            for (let item of filteredItems) {
                if (!item.item.trim()) {
                    return showErrorAlert("Validation Error", "Item name cannot be empty.");
                }
                if (!item.quantity || item.quantity <= 0) {
                    return showErrorAlert("Validation Error", "Quantity must be greater than 0.");
                }
                if (!item.unit_price || item.unit_price < 0) {
                    return showErrorAlert("Validation Error", "Unit price must be valid.");
                }
            }

            if (discount_percent < 0 || discount_percent > 100) {
                return showErrorAlert("Validation Error", "Discount must be between 0 and 100.");
            }

            /* ----------------------------------------------------
               2️⃣ PREPARE ITEMS
            ---------------------------------------------------- */

            const preparedItems = filteredItems.map(i => ({
                sno: i.sno,
                item: i.item,
                description: i.description,
                unit: i.unit,
                quantity: i.quantity,
                unit_price: i.unit_price,
                total: i.total
            }));

            /* ----------------------------------------------------
               3️⃣ FINAL PAYLOAD (edit or new)
            ---------------------------------------------------- */

            let finalQuotationData = {};

            if (selectedQuotation) {
                // Edit existing quotation
                finalQuotationData = {
                    quotation_id: selectedQuotation._id,
                    edited_quotation: {
                        items: preparedItems,
                        scope_of_work,
                        discount_percent: discount_percent || 0
                    }
                };
            } else {
                // Create new custom quotation
                finalQuotationData = {
                    items: preparedItems,
                    scope_of_work,
                    discount_percent: discount_percent || 0
                };
            }

            console.log("Sending to API:", finalQuotationData);

            /* ----------------------------------------------------
               4️⃣ SEND API
            ---------------------------------------------------- */

            const response = await apiService.post(
                `/estimates/${selectedLead._id}/final-quotation`,
                finalQuotationData
            );

            if (response.success) {
                showSuccessAlert("Success", "Final quotation created successfully");

                setFinalQuotationModalVisible(false);
                setSelectedLead(null);
                setSelectedQuotation(null);

                setItems([
                    { sno: 1, item: "", description: "", unit: "", quantity: 1, unit_price: 0, total: 0 }
                ]);

                fetchLeads(pagination.currentPage, pagination.itemsPerPage, filters);
            }

        } catch (error) {
            console.error("Error creating final quotation:", error);

            if (error?.response?.data?.message) {
                return showErrorAlert("Error", error.response.data.message);
            }

            showErrorAlert("Error", "Failed to create final quotation");
        }
    };

    // Close drawers
    const closeDrawer = () => {
        setDrawerVisible(false);
        setSelectedLead(null);
    };

    const closeFreelancerDrawer = () => {
        setFreelancerDrawerVisible(false);
        setSelectedLead(null);
        setSelectedFreelancers([]);
    };

    const closeQuotationsDrawer = () => {
        setQuotationsDrawerVisible(false);
        setSelectedLead(null);
        setQuotations([]);
    };

    // Handle page change
    const handlePageChange = (page, pageSize) => {
        fetchLeads(page, pageSize, filters);
    };

    // Handle filter change
    const handleFilter = (newFilters) => {
        setFilters(newFilters);
        fetchLeads(1, pagination.itemsPerPage, newFilters);
    };

    // UPDATED: Handle tab change based on supervisor progress
    const handleTabChange = (tabKey) => {
        let filterParams = { status: 'assigned' };
        
        console.log('Tab changed to:', tabKey);
        
        if (tabKey === 'assigned') {
            // Newly assigned leads - no progress yet
            filterParams.supervisor_progress = 'none';
        } else if (tabKey === 'request_sent') {
            // Request sent but no quotations received yet
            filterParams.supervisor_progress = 'request_sent';
        } else if (tabKey === 'quotations_received') {
            // Request completed - quotations received
            filterParams.supervisor_progress = 'request_completed';
        } else if (tabKey === 'final_created') {
            // Final quotation created
            filterParams.status = 'final_created';
        }
        
        console.log('Fetching with filters:', filterParams);
        setFilters(filterParams);
        fetchLeads(1, pagination.itemsPerPage, filterParams);
    };

    // Get quotation statistics
    const getQuotationStats = (lead) => {
        const totalFreelancers = lead.sent_to_freelancers?.length || 0;
        const receivedQuotations = lead.freelancer_quotations?.length || 0;
        const pendingQuotations = totalFreelancers - receivedQuotations;
        
        return {
            total: totalFreelancers,
            received: receivedQuotations,
            pending: pendingQuotations
        };
    };

    // UPDATED: Get current active tab key based on filters
    const getActiveTabKey = () => {
        if (filters.status === 'final_created') return 'final_created';
        if (filters.supervisor_progress === 'request_completed') return 'quotations_received';
        if (filters.supervisor_progress === 'request_sent') return 'request_sent';
        return 'assigned';
    };

    // Items table columns
    const itemColumns = [
        {
            title: 'S.No',
            dataIndex: 'sno',
            width: 60,
            align: 'center',
            render: (text) => (
                <Badge 
                    count={text} 
                    style={{ 
                        backgroundColor: PURPLE_THEME.primary,
                        color: 'white'
                    }}
                />
            )
        },
        {
            title: 'Item Description',
            dataIndex: 'item',
            render: (text, record, index) => (
                <Input
                    placeholder="Enter item name"
                    value={text}
                    onChange={(e) => {
                        const newItems = [...items];
                        newItems[index].item = e.target.value;
                        setItems(newItems);
                    }}
                    style={{ borderColor: PURPLE_THEME.primaryLighter }}
                />
            )
        },
        {
            title: 'Description',
            dataIndex: 'description',
            render: (text, record, index) => (
                <Input
                    placeholder="Enter description"
                    value={text}
                    onChange={(e) => {
                        const newItems = [...items];
                        newItems[index].description = e.target.value;
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
            render: (text, record, index) => (
                <Select
                    placeholder="Unit"
                    value={text}
                    onChange={(value) => {
                        const newItems = [...items];
                        newItems[index].unit = value;
                        setItems(newItems);
                    }}
                    style={{ width: '100%', borderColor: PURPLE_THEME.primaryLighter }}
                    dropdownStyle={{ backgroundColor: PURPLE_THEME.light }}
                >
                    {unitOptions.map(unit => (
                        <Option key={unit} value={unit}>{unit}</Option>
                    ))}
                </Select>
            )
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            width: 100,
            render: (text, record, index) => (
                <InputNumber
                    min={0}
                    value={text}
                    onChange={(value) => {
                        const newItems = [...items];
                        newItems[index].quantity = value || 0;
                        setItems(newItems);
                        updateItemTotal(index);
                    }}
                    style={{ width: '100%', borderColor: PURPLE_THEME.primaryLighter }}
                />
            )
        },
        {
            title: 'Unit Price (AED)',
            dataIndex: 'unit_price',
            width: 120,
            render: (text, record, index) => (
                <InputNumber
                    min={0}
                    value={text}
                    onChange={(value) => {
                        const newItems = [...items];
                        newItems[index].unit_price = value || 0;
                        setItems(newItems);
                        updateItemTotal(index);
                    }}
                    formatter={value => `AED ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/AED\s?|(,*)/g, '')}
                    style={{ width: '100%', borderColor: PURPLE_THEME.primaryLighter }}
                />
            )
        },
        {
            title: 'Total (AED)',
            dataIndex: 'total',
            width: 120,
            render: (text) => (
                <div className="font-semibold text-right" style={{ color: PURPLE_THEME.success }}>
                    AED {text?.toLocaleString()}
                </div>
            )
        },
        {
            title: 'Action',
            width: 80,
            align: 'center',
            render: (_, record, index) => (
                <Button
                    type="link"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => removeItem(index)}
                    disabled={items.length === 1}
                    style={{ color: PURPLE_THEME.error }}
                />
            )
        }
    ];

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

    // Status Badge Component
    const StatusBadge = ({ status, type = 'lead' }) => {
        const config = type === 'lead' 
            ? statusConfig[status] || statusConfig.pending
            : supervisorProgressConfig[status] || supervisorProgressConfig.none;
        
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

    // Get columns based on current status filter
    const getColumns = () => {
        const baseColumns = [
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
                title: 'Supervisor Progress',
                width: 140,
                render: (_, record) => <StatusBadge status={record.supervisor_progress} type="progress" />
            },
            {
                title: 'Freelancers & Quotations',
                width: 160,
                render: (_, record) => {
                    const stats = getQuotationStats(record);
                    
                    if (record.supervisor_progress === 'none') {
                        return <span className="text-gray-400 text-sm">Not sent yet</span>;
                    }

                    return (
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <TeamOutlined style={{ color: PURPLE_THEME.info }} />
                                <span className="text-sm font-medium">{stats.total} freelancers</span>
                            </div>
                            {stats.received > 0 && (
                                <div className="flex items-center gap-2">
                                    <FileTextOutlined style={{ color: PURPLE_THEME.success }} />
                                    <span className="text-sm" style={{ color: PURPLE_THEME.success }}>
                                        {stats.received} quotations
                                    </span>
                                </div>
                            )}
                            {stats.pending > 0 && (
                                <div className="flex items-center gap-2">
                                    <ClockCircleOutlined style={{ color: PURPLE_THEME.warning }} />
                                    <span className="text-sm" style={{ color: PURPLE_THEME.warning }}>
                                        {stats.pending} pending
                                    </span>
                                </div>
                            )}
                        </div>
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
            }
        ];

        // Add actions column
        baseColumns.push({
            title: 'Actions',
            fixed: 'right',
            width: 200,
            render: (_, record) => {
                const stats = getQuotationStats(record);
                
                return (
                    <Space>
                        <Button 
                            size="small" 
                            icon={<EyeOutlined />}
                            onClick={() => {
                                setSelectedLead(record);
                                setDrawerVisible(true);
                            }}
                            style={{ 
                                background: PURPLE_THEME.primaryBg, 
                                borderColor: PURPLE_THEME.primaryLighter,
                                color: PURPLE_THEME.primary
                            }}
                        >
                            View Details
                        </Button>
                        
                        {/* Show send to freelancers button for assigned leads with no progress */}
                        {record.status === 'assigned' && record.supervisor_progress === 'none' && (
                            <Button
                                type="primary"
                                size="small"
                                icon={<SendOutlined />}
                                onClick={() => openFreelancerDrawer(record)}
                                style={{ 
                                    background: PURPLE_THEME.primary, 
                                    borderColor: PURPLE_THEME.primary 
                                }}
                            >
                                Send
                            </Button>
                        )}
                        
                        {/* Show review quotations button for request_completed status */}
                        {record.supervisor_progress === 'request_completed' && stats.received > 0 && (
                            <Button
                                type="primary"
                                size="small"
                                icon={<FileTextOutlined />}
                                onClick={() => openQuotationsDrawer(record)}
                                style={{ 
                                    background: PURPLE_THEME.success, 
                                    borderColor: PURPLE_THEME.success 
                                }}
                            >
                                Review ({stats.received})
                            </Button>
                        )}
                        
                        {/* Show create final button for request_completed status */}
                        {record.supervisor_progress === 'request_completed' && stats.received > 0 && (
                            <Button
                                type="primary"
                                size="small"
                                icon={<CheckCircleOutlined />}
                                onClick={() => openFinalQuotationModal(record)}
                                style={{ 
                                    background: PURPLE_THEME.primary, 
                                    borderColor: PURPLE_THEME.primary 
                                }}
                            >
                                Create Final
                            </Button>
                        )}
                        
                        {/* Show final created badge */}
                        {record.status === 'final_created' && (
                            <Tag color="purple" icon={<CheckCircleOutlined />} className="text-xs">
                                Final Created
                            </Tag>
                        )}
                    </Space>
                );
            }
        });

        return baseColumns;
    };

    // UPDATED: Tab items configuration with proper flow
    const tabItems = [
        {
            key: 'assigned',
            label: 'Assigned Leads',
            children: null
        },
        {
            key: 'request_sent',
            label: 'Request Sent',
            children: null
        },
        {
            key: 'quotations_received',
            label: 'Quotations Received',
            children: null
        },
        {
            key: 'final_created',
            label: 'Final Created',
            children: null
        }
    ];

    // UPDATED: Get notification count for quotations received (request_completed)
    const getNotificationCount = () => {
        return leads.filter(lead => 
            lead.supervisor_progress === 'request_completed' && 
            lead.freelancer_quotations && 
            lead.freelancer_quotations.length > 0
        ).length;
    };

    const { subtotal, discountAmount, grandTotal, discountPercent } = calculateTotals();

    // Load initial data
    useEffect(() => {
        if (user?.id) {
            // Start with assigned leads (no progress)
            fetchLeads(1, 10, { status: 'assigned', supervisor_progress: 'none' });
        }
    }, [user]);

    return (
        <div className="min-h-screen p-6" style={{ background: PURPLE_THEME.light }}>
            <div className="max-w-screen-2xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                        <div>
                            <Title level={2} style={{ color: PURPLE_THEME.dark, margin: 0 }}>
                                My Assigned Leads
                            </Title>
                            <Paragraph style={{ color: PURPLE_THEME.gray, marginTop: '4px' }}>
                                Manage leads assigned to you and coordinate with freelancers
                            </Paragraph>
                        </div>
                    </div>
                </div>

                {/* Notifications Bar */}
                {getNotificationCount() > 0 && (
                    <Alert
                        message={
                            <div className="flex items-center justify-between">
                                <span style={{ color: PURPLE_THEME.dark }}>
                                    <BellOutlined className="mr-2" />
                                    You have {getNotificationCount()} lead(s) with new quotations to review!
                                </span>
                                <Button 
                                    type="link" 
                                    onClick={() => handleTabChange('quotations_received')}
                                    style={{ color: PURPLE_THEME.primary }}
                                >
                                    Review Now
                                </Button>
                            </div>
                        }
                        type="info"
                        showIcon
                        style={{ 
                            background: PURPLE_THEME.primaryBg,
                            border: `1px solid ${PURPLE_THEME.primaryLighter}`,
                            marginBottom: '24px'
                        }}
                    />
                )}

                {/* Card Tabs */}
                <Card
                    style={{ 
                        borderRadius: '12px',
                        border: '1px solid #f0f0f0',
                        marginBottom: '24px',
                        background: 'white'
                    }}
                    bodyStyle={{ padding: 0 }}
                >
                    <Tabs
                        activeKey={getActiveTabKey()}
                        onChange={handleTabChange}
                        type="card"
                        style={{ padding: '0 16px' }}
                        items={tabItems.map(tab => ({
                            ...tab,
                            label: tab.key === 'quotations_received' && getNotificationCount() > 0 ? (
                                <Badge 
                                    count={getNotificationCount()} 
                                    style={{ 
                                        backgroundColor: PURPLE_THEME.primary,
                                        color: 'white'
                                    }}
                                    offset={[10, -5]}
                                >
                                    {tab.label}
                                </Badge>
                            ) : tab.label
                        }))}
                    />

                    {/* Status-wise information */}
                    <div className="p-4" style={{ 
                        background: PURPLE_THEME.primaryBg,
                        borderTop: `1px solid ${PURPLE_THEME.primaryLighter}`
                    }}>
                        <h3 className="font-semibold mb-2" style={{ color: PURPLE_THEME.primary }}>
                            {getActiveTabKey() === 'assigned' && 'Assigned Leads - Ready to Send to Freelancers'}
                            {getActiveTabKey() === 'request_sent' && 'Request Sent - Waiting for Quotations from Freelancers'}
                            {getActiveTabKey() === 'quotations_received' && 'Quotations Received - Ready for Review and Final Creation'}
                            {getActiveTabKey() === 'final_created' && 'Final Created - Waiting for Super Admin Approval'}
                        </h3>
                        <p className="text-sm" style={{ color: PURPLE_THEME.primary }}>
                            {getActiveTabKey() === 'assigned' && 'These leads are assigned to you and ready to be sent to freelancers for quotations.'}
                            {getActiveTabKey() === 'request_sent' && 'These leads have been sent to freelancers. Waiting for them to submit quotations.'}
                            {getActiveTabKey() === 'quotations_received' && 'Freelancers have submitted quotations. Review them and create the final quotation.'}
                            {getActiveTabKey() === 'final_created' && 'Final quotations have been created and sent for super admin approval.'}
                        </p>
                    </div>

                    {/* Custom Table */}
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

                {/* Enhanced Lead Details Drawer - Shows Full Estimate Details */}
                <Drawer
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
                                <Title level={4} style={{ margin: 0, color: PURPLE_THEME.dark }}>
                                    Estimate Lead Details
                                </Title>
                                <Text type="secondary">Complete information for lead #{selectedLead?._id?.substring(0, 8) || 'N/A'}</Text>
                            </div>
                        </div>
                    }
                    placement="right"
                    onClose={closeDrawer}
                    open={drawerVisible}
                    width={800}
                    style={{ background: PURPLE_THEME.light }}
                >
                    {selectedLead && (
                        <div className="space-y-6 mt-4">
                            {/* Status and Progress Banner */}
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
                                            {/* <StatusBadge status={selectedLead.status} type="lead" /> */}
                                        </div>
                                        <Divider type="vertical" style={{ height: '40px' }} />
                                        <div>
                                            <div className="text-sm font-medium text-gray-600">Supervisor Progress</div>
                                            <StatusBadge status={selectedLead.supervisor_progress} type="progress" />
                                        </div>
                                        <Divider type="vertical" style={{ height: '40px' }} />
                                        <div>
                                            <div className="text-sm font-medium text-gray-600">Customer Progress</div>
                                            <div className="text-lg font-semibold">
                                                <Tag 
                                                    color={selectedLead.customer_progress === 'completed' ? 'success' : 'default'}
                                                    icon={selectedLead.customer_progress === 'completed' ? <CheckCircleOutlined /> : <ClockCircleOutlined />}
                                                >
                                                    {selectedLead.customer_progress === 'completed' ? 'Completed' : 'In Progress'}
                                                </Tag>
                                            </div>
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
                                            <Descriptions.Item label="Customer ID">
                                                <Text copyable style={{ color: PURPLE_THEME.primary }}>
                                                    {selectedLead.customer?._id || 'N/A'}
                                                </Text>
                                            </Descriptions.Item>
                                            <Descriptions.Item label="Customer Name in System">
                                                <Text>{selectedLead.customer?.name || 'N/A'}</Text>
                                            </Descriptions.Item>
                                            <Descriptions.Item label="Customer Email">
                                                <Text>{selectedLead.customer?.email || 'N/A'}</Text>
                                            </Descriptions.Item>
                                            <Descriptions.Item label="Customer Mobile">
                                                <Text>{selectedLead.customer?.mobile || 'N/A'}</Text>
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
                                                <FileOutlined style={{ color: PURPLE_THEME.primary }} />
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

                            {/* Freelancers Section */}
                            {selectedLead.sent_to_freelancers && selectedLead.sent_to_freelancers.length > 0 && (
                                <DetailCard title="Sent to Freelancers" icon={<TeamOutlined />}>
                                    <div className="space-y-3">
                                        {selectedLead.sent_to_freelancers.map((freelancer, index) => (
                                            <div key={index} className="flex items-center justify-between p-3 border rounded" style={{ borderColor: PURPLE_THEME.primaryLighter }}>
                                                <div className="flex items-center space-x-3">
                                                    <Avatar 
                                                        icon={<UserOutlined />}
                                                        style={{ background: PURPLE_THEME.primaryLighter, color: PURPLE_THEME.primary }}
                                                    />
                                                    <div>
                                                        <p className="font-medium">{freelancer.name?.first_name} {freelancer.name?.last_name}</p>
                                                        <p className="text-sm text-gray-500">{freelancer.email}</p>
                                                        <p className="text-xs text-gray-400">
                                                            Services: {freelancer.services_offered?.map(service => 
                                                                service.subcategory?.name || service.category?.name
                                                            ).join(', ')}
                                                        </p>
                                                    </div>
                                                </div>
                                                {selectedLead.freelancer_quotations?.some(q => q.freelancer?._id === freelancer._id) ? (
                                                    <Tag color="success" icon={<CheckCircleOutlined />}>Quotation Submitted</Tag>
                                                ) : (
                                                    <Tag color="orange" icon={<ClockCircleOutlined />}>Waiting</Tag>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </DetailCard>
                            )}

                            {/* Quotations Section */}
                            {selectedLead.freelancer_quotations && selectedLead.freelancer_quotations.length > 0 && (
                                <DetailCard title="Freelancer Quotations" icon={<DollarOutlined />}>
                                    <Collapse ghost>
                                        {selectedLead.freelancer_quotations.map((quotation, index) => (
                                            <Panel 
                                                header={
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <span className="font-medium">Quotation #{index + 1}</span>
                                                            <Tag color="blue" className="ml-2">
                                                                {formatCurrency(quotation.total_amount || quotation.grand_total)}
                                                            </Tag>
                                                        </div>
                                                        <Button 
                                                            size="small" 
                                                            icon={<EyeOutlined />}
                                                            onClick={() => {
                                                                setQuotationsDrawerVisible(true);
                                                                setSelectedLead(selectedLead);
                                                            }}
                                                        >
                                                            View Details
                                                        </Button>
                                                    </div>
                                                } 
                                                key={index}
                                            >
                                                <Descriptions bordered size="small" column={2}>
                                                    <Descriptions.Item label="Freelancer">
                                                        {quotation.freelancer?.name || quotation.created_by?.name?.first_name || 'Unknown'}
                                                    </Descriptions.Item>
                                                    <Descriptions.Item label="Total Items">
                                                        {quotation.items?.length || 0}
                                                    </Descriptions.Item>
                                                    <Descriptions.Item label="Scope of Work" span={2}>
                                                        {quotation.scope_of_work || 'No scope provided'}
                                                    </Descriptions.Item>
                                                    <Descriptions.Item label="Submitted At">
                                                        {formatDate(quotation.created_at || quotation.submitted_at)}
                                                    </Descriptions.Item>
                                                </Descriptions>
                                            </Panel>
                                        ))}
                                    </Collapse>
                                </DetailCard>
                            )}

                            {/* Final Quotation */}
                            {selectedLead.final_quotation && (
                                <DetailCard title="Final Quotation" icon={<CheckCircleOutlined />}>
                                    <div className="p-3 border rounded" style={{ 
                                        background: PURPLE_THEME.primaryBg,
                                        borderColor: PURPLE_THEME.primaryLighter
                                    }}>
                                        <div className="flex justify-between items-center mb-3">
                                            <div>
                                                <Text strong style={{ color: PURPLE_THEME.primary }}>Final Quotation</Text>
                                                <div className="text-xs text-gray-500">
                                                    Created by Supervisor
                                                </div>
                                            </div>
                                            <Tag color="purple" icon={<FileTextOutlined />}>Final</Tag>
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-sm">
                                                <strong>Amount:</strong> {formatCurrency(selectedLead.final_quotation.grand_total)}
                                            </p>
                                            <p className="text-sm">
                                                <strong>Description:</strong> {selectedLead.final_quotation.scope_of_work}
                                            </p>
                                            <p className="text-sm">
                                                <strong>Status:</strong> 
                                                <Tag color={selectedLead.status === 'superadmin_approved' ? 'success' : 'processing'} className="ml-2">
                                                    {selectedLead.status === 'superadmin_approved' ? 'Approved by Superadmin' : 'Pending Approval'}
                                                </Tag>
                                            </p>
                                            {selectedLead.final_quotation.items && (
                                                <div className="mt-3">
                                                    <strong>Items:</strong>
                                                    <div className="mt-1 space-y-1">
                                                        {selectedLead.final_quotation.items.slice(0, 3).map((item, idx) => (
                                                            <div key={idx} className="text-xs text-gray-600 flex justify-between">
                                                                <span>{item.item}</span>
                                                                <span>{formatCurrency(item.total)}</span>
                                                            </div>
                                                        ))}
                                                        {selectedLead.final_quotation.items.length > 3 && (
                                                            <div className="text-xs text-gray-400">+{selectedLead.final_quotation.items.length - 3} more items</div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </DetailCard>
                            )}

                            {/* Timeline and History */}
                            <DetailCard title="Timeline & History" icon={<HistoryOutlined />}>
                                <Timeline>
                                    <Timeline.Item color="green">
                                        <div className="font-medium">Lead Created</div>
                                        <div className="text-sm text-gray-500">
                                            {formatDate(selectedLead.createdAt)}
                                        </div>
                                    </Timeline.Item>
                                    <Timeline.Item color="blue">
                                        <div className="font-medium">Submitted</div>
                                        <div className="text-sm text-gray-500">
                                            {formatDate(selectedLead.submitted_at)}
                                        </div>
                                    </Timeline.Item>
                                    {selectedLead.sent_to_freelancers && selectedLead.sent_to_freelancers.length > 0 && (
                                        <Timeline.Item color="purple">
                                            <div className="font-medium">Sent to {selectedLead.sent_to_freelancers.length} Freelancers</div>
                                            <div className="text-sm text-gray-500">
                                                Supervisor Progress: {supervisorProgressConfig[selectedLead.supervisor_progress]?.label}
                                            </div>
                                        </Timeline.Item>
                                    )}
                                    <Timeline.Item color="purple" dot={<ClockCircleOutlined />}>
                                        <div className="font-medium">Current Status</div>
                                        <div className="text-sm">
                                            <StatusBadge status={selectedLead.status} type="lead" />
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
                                                {formatDate(selectedLead.createdAt)}
                                            </Descriptions.Item>
                                            <Descriptions.Item label="Updated At">
                                                {formatDate(selectedLead.updatedAt)}
                                            </Descriptions.Item>
                                            <Descriptions.Item label="Database Version">
                                                <Tag style={{ background: PURPLE_THEME.primaryLighter, color: PURPLE_THEME.primary }}>
                                                    {selectedLead.__v}
                                                </Tag>
                                            </Descriptions.Item>
                                        </Descriptions>
                                    </Col>
                                    <Col span={12}>
                                        <Descriptions size="small" column={1}>
                                            <Descriptions.Item label="Sent to Freelancers">
                                                {selectedLead.sent_to_freelancers?.length || 0} freelancers
                                            </Descriptions.Item>
                                            <Descriptions.Item label="Customer Response">
                                                {selectedLead.customer_response?.status ? (
                                                    <Tag color={selectedLead.customer_response.status === 'accepted' ? 'success' : 'error'}>
                                                        {selectedLead.customer_response.status.toUpperCase()}
                                                    </Tag>
                                                ) : (
                                                    <Tag>No response</Tag>
                                                )}
                                            </Descriptions.Item>
                                            <Descriptions.Item label="Service Type">
                                                <Tag color="purple">{selectedLead.service_type}</Tag>
                                            </Descriptions.Item>
                                        </Descriptions>
                                    </Col>
                                </Row>
                            </DetailCard>

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-3 pt-4 border-t" style={{ borderColor: PURPLE_THEME.primaryLighter }}>
                                <Button 
                                    onClick={closeDrawer}
                                    style={{ color: PURPLE_THEME.primary }}
                                >
                                    Close
                                </Button>
                                {selectedLead.status === 'assigned' && selectedLead.supervisor_progress === 'none' && (
                                    <Button 
                                        type="primary"
                                        onClick={() => {
                                            closeDrawer();
                                            openFreelancerDrawer(selectedLead);
                                        }}
                                        style={{ background: PURPLE_THEME.primary, borderColor: PURPLE_THEME.primary }}
                                        icon={<SendOutlined />}
                                    >
                                        Send to Freelancers
                                    </Button>
                                )}
                                {selectedLead.supervisor_progress === 'request_completed' && selectedLead.freelancer_quotations?.length > 0 && (
                                    <Button 
                                        type="primary"
                                        onClick={() => {
                                            closeDrawer();
                                            openQuotationsDrawer(selectedLead);
                                        }}
                                        style={{ background: PURPLE_THEME.primary, borderColor: PURPLE_THEME.primary }}
                                        icon={<FileTextOutlined />}
                                    >
                                        Review Quotations
                                    </Button>
                                )}
                                {selectedLead.supervisor_progress === 'request_completed' && selectedLead.freelancer_quotations?.length > 0 && (
                                    <Button 
                                        type="primary"
                                        onClick={() => {
                                            closeDrawer();
                                            openFinalQuotationModal(selectedLead);
                                        }}
                                        style={{ background: PURPLE_THEME.success, borderColor: PURPLE_THEME.success }}
                                        icon={<CheckCircleOutlined />}
                                    >
                                        Create Final Quotation
                                    </Button>
                                )}
                            </div>
                        </div>
                    )}
                </Drawer>

                {/* Quotations Review Drawer */}
                <Drawer
                    title={`Quotations for ${selectedLead?.customer_name}`}
                    placement="right"
                    onClose={closeQuotationsDrawer}
                    open={quotationsDrawerVisible}
                    width={700}
                    style={{ background: PURPLE_THEME.light }}
                    extra={
                        <Button
                            type="primary"
                            icon={<CheckCircleOutlined />}
                            onClick={() => openFinalQuotationModal(selectedLead)}
                            style={{ background: PURPLE_THEME.primary, borderColor: PURPLE_THEME.primary }}
                        >
                            Create Final Quotation
                        </Button>
                    }
                >
                    {selectedLead && (
                        <div className="space-y-4">
                            <Card title="Customer Details" size="small" style={{ borderLeft: `4px solid ${PURPLE_THEME.primary}` }}>
                                <Row gutter={[16, 8]}>
                                    <Col span={8}>
                                        <strong>Name:</strong> {selectedLead.customer_name}
                                    </Col>
                                    <Col span={8}>
                                        <strong>Service:</strong> {selectedLead.subcategory?.label}
                                    </Col>
                                    <Col span={8}>
                                        <strong>Quotations:</strong> {quotations.length}
                                    </Col>
                                </Row>
                            </Card>

                            {quotationsLoading ? (
                                <div className="flex justify-center py-8">
                                    <Spin size="large" />
                                </div>
                            ) : quotations.length > 0 ? (
                                <div className="space-y-4">
                                    {quotations.map((quotation, index) => (
                                        <Card 
                                            key={index} 
                                            size="small" 
                                            className="border-2 hover:border-blue-300 transition-colors"
                                            style={{ 
                                                borderColor: PURPLE_THEME.primaryLighter,
                                                borderLeft: `4px solid ${PURPLE_THEME.primary}`
                                            }}
                                            title={
                                                <div className="flex justify-between items-center">
                                                    <span className="flex items-center">
                                                        <Avatar 
                                                            size="small" 
                                                            icon={<UserOutlined />} 
                                                            className="mr-2"
                                                            style={{ background: PURPLE_THEME.primaryLighter, color: PURPLE_THEME.primary }}
                                                        />
                                                        {quotation.created_by?.name?.first_name} {quotation.created_by?.name?.last_name}
                                                    </span>
                                                    <Tag color="blue" icon={<DollarOutlined />} style={{ background: PURPLE_THEME.primaryBg, color: PURPLE_THEME.primary }}>
                                                        {formatCurrency(quotation.grand_total)}
                                                    </Tag>
                                                </div>
                                            }
                                            extra={
                                                <Space>
                                                   
                                                   
                                                </Space>
                                            }
                                        >
                                            <div className="space-y-3">
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center space-x-4">
                                                        <div className="flex items-center">
                                                            <DollarOutlined className="mr-1" style={{ color: PURPLE_THEME.success }} />
                                                            <span className="font-semibold">{formatCurrency(quotation.grand_total)}</span>
                                                        </div>
                                                        {quotation.duration_days && (
                                                            <div className="flex items-center">
                                                                <CalendarOutlined className="mr-1" style={{ color: PURPLE_THEME.info }} />
                                                                <span>{quotation.duration_days} days</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        Submitted: {formatDate(quotation.created_at)}
                                                    </div>
                                                </div>
                                                
                                                <div>
                                                    <strong>Scope of Work:</strong>
                                                    <p className="mt-1 text-sm text-gray-700 p-2 rounded" style={{ background: PURPLE_THEME.light }}>
                                                        {quotation.scope_of_work}
                                                    </p>
                                                </div>

                                                {quotation.items && quotation.items.length > 0 && (
                                                    <div>
                                                        <strong>Items Breakdown:</strong>
                                                        <div className="mt-2 space-y-2">
                                                            {quotation.items.slice(0, 3).map((item, itemIndex) => (
                                                                <div key={itemIndex} className="flex justify-between text-sm border-b pb-1" style={{ borderColor: PURPLE_THEME.primaryLighter }}>
                                                                    <span>{item.item}</span>
                                                                    <span>{formatCurrency(item.total)}</span>
                                                                </div>
                                                            ))}
                                                            {quotation.items.length > 3 && (
                                                                <div className="text-xs text-center text-gray-500">
                                                                    +{quotation.items.length - 3} more items
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: PURPLE_THEME.primaryLighter }}>
                                                    <div className="text-xs text-gray-500">
                                                        Freelancer: {quotation.created_by?.email}
                                                    </div>
                                                    <Button 
                                                        type="primary" 
                                                        size="small"
                                                        onClick={() => {
                                                            loadQuotationData(quotation);
                                                            setFinalQuotationModalVisible(true);
                                                        }}
                                                        style={{ background: PURPLE_THEME.primary, borderColor: PURPLE_THEME.primary }}
                                                    >
                                                        Use  & Create Final
                                                    </Button>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            ) : (
                                <Card size="small" style={{ borderLeft: `4px solid ${PURPLE_THEME.warning}` }}>
                                    <div className="text-center py-8 text-gray-500">
                                        <FileTextOutlined className="text-4xl mb-2" style={{ color: PURPLE_THEME.gray }} />
                                        <p>No quotations submitted yet</p>
                                        <p className="text-sm">Waiting for freelancers to submit their quotations</p>
                                    </div>
                                </Card>
                            )}
                        </div>
                    )}
                </Drawer>

                {/* Enhanced Final Quotation Modal */}
                <Modal
                    title={
                        <div className="flex items-center gap-3">
                            <Avatar 
                                size={40}
                                style={{ 
                                    background: PURPLE_THEME.primary,
                                    color: 'white'
                                }}
                                icon={<DollarOutlined />}
                            />
                            <div>
                                <Title level={4} style={{ margin: 0, color: PURPLE_THEME.dark }}>
                                    Create Final Quotation
                                </Title>
                                <Text type="secondary">Create final quotation for {selectedLead?.customer_name}</Text>
                            </div>
                        </div>
                    }
                    open={finalQuotationModalVisible}
                    onCancel={() => setFinalQuotationModalVisible(false)}
                    footer={null}
                    width={900}
                    style={{ top: 20 }}
                >
                    <Form
                        form={finalQuotationForm}
                        layout="vertical"
                        onFinish={handleCreateFinalQuotation}
                    >
                        {selectedQuotation && (
                            <Alert
                                message={`Editing quotation from ${selectedQuotation.created_by?.name?.first_name} ${selectedQuotation.created_by?.name?.last_name}`}
                                type="info"
                                showIcon
                                style={{ 
                                    background: PURPLE_THEME.primaryBg,
                                    border: `1px solid ${PURPLE_THEME.primaryLighter}`,
                                    marginBottom: '16px'
                                }}
                            />
                        )}

                        <Card 
                            title={
                                <div className="flex items-center justify-between">
                                    <span style={{ color: PURPLE_THEME.primary }}>Quotation Items Breakdown</span>
                                    <Button
                                        type="dashed"
                                        icon={<PlusOutlined />}
                                        onClick={addItem}
                                        style={{ color: PURPLE_THEME.primary, borderColor: PURPLE_THEME.primary }}
                                    >
                                        Add Item
                                    </Button>
                                </div>
                            }
                            size="small"
                            style={{ borderLeft: `4px solid ${PURPLE_THEME.primary}` }}
                        >
                            <Table
                                columns={itemColumns}
                                dataSource={items}
                                pagination={false}
                                size="small"
                                scroll={{ x: 800 }}
                                rowKey={(record, index) => index}
                            />
                        </Card>

                        {/* Financial Summary */}
                        <Card title="Financial Summary" size="small" className="mt-4" style={{ borderLeft: `4px solid ${PURPLE_THEME.success}` }}>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold">Subtotal:</span>
                                    <span className="text-lg font-bold">{formatCurrency(subtotal)}</span>
                                </div>
                                
                                <Form.Item
                                    name="discount_percent"
                                    label="Discount Percentage"
                                    rules={[{ required: true, message: 'Please enter discount percentage' }]}
                                >
                                    <InputNumber
                                        min={0}
                                        max={100}
                                        placeholder="Enter discount percentage"
                                        style={{ width: '100%', borderColor: PURPLE_THEME.primaryLighter }}
                                        addonAfter="%"
                                    />
                                </Form.Item>

                                <div className="flex justify-between items-center" style={{ color: PURPLE_THEME.success }}>
                                    <span>Discount Amount:</span>
                                    <span className="font-semibold">-{formatCurrency(discountAmount)}</span>
                                </div>

                                <Divider style={{ borderColor: PURPLE_THEME.primaryLighter }} />

                                <div className="flex justify-between items-center text-2xl font-bold" style={{ color: PURPLE_THEME.success }}>
                                    <span>Grand Total:</span>
                                    <span>{formatCurrency(grandTotal)}</span>
                                </div>
                            </div>
                        </Card>

                        <Card title="Scope of Work" size="small" className="mt-4" style={{ borderLeft: `4px solid ${PURPLE_THEME.info}` }}>
                            <Form.Item
                                name="scope_of_work"
                                rules={[{ required: true, message: 'Please enter scope of work' }]}
                            >
                                <TextArea
                                    placeholder="Describe the complete scope of work, including materials, methodology, timeline, and any special considerations..."
                                    rows={4}
                                    showCount
                                    maxLength={2000}
                                    style={{ borderColor: PURPLE_THEME.primaryLighter }}
                                />
                            </Form.Item>
                        </Card>

                        <div className="flex justify-end space-x-2 mt-6">
                            <Button 
                                onClick={() => setFinalQuotationModalVisible(false)}
                                style={{ color: PURPLE_THEME.primary }}
                            >
                                Cancel
                            </Button>
                            <Button 
                                type="primary" 
                                htmlType="submit"
                                style={{ background: PURPLE_THEME.primary, borderColor: PURPLE_THEME.primary }}
                            >
                                Create Final Quotation
                            </Button>
                        </div>
                    </Form>
                </Modal>

                {/* Freelancer Selection Drawer */}
                <Drawer
                    title="Send to Freelancers"
                    placement="right"
                    onClose={closeFreelancerDrawer}
                    open={freelancerDrawerVisible}
                    width={600}
                    style={{ background: PURPLE_THEME.light }}
                    extra={
                        <Button
                            type="primary"
                            onClick={handleSendToFreelancers}
                            disabled={selectedFreelancers.length === 0}
                            icon={<SendOutlined />}
                            style={{ background: PURPLE_THEME.primary, borderColor: PURPLE_THEME.primary }}
                        >
                            Send to {selectedFreelancers.length} Freelancer(s)
                        </Button>
                    }
                >
                    {selectedLead && (
                        <div className="mb-6 p-4 rounded-lg" style={{ 
                            background: PURPLE_THEME.primaryBg,
                            border: `1px solid ${PURPLE_THEME.primaryLighter}`
                        }}>
                            <h3 className="font-semibold mb-2" style={{ color: PURPLE_THEME.primary }}>Lead Details</h3>
                            <p><strong>Customer:</strong> {selectedLead.customer_name}</p>
                            <p><strong>Service:</strong> {selectedLead.subcategory?.label}</p>
                            <p><strong>Area:</strong> {selectedLead.area_sqft} sq ft</p>
                            <p><strong>Package:</strong> {selectedLead.package?.name}</p>
                        </div>
                    )}

                    <h3 className="font-semibold mb-4" style={{ color: PURPLE_THEME.dark }}>
                        Select Freelancers ({selectedFreelancers.length} selected)
                    </h3>
                    
                    {freelancersLoading ? (
                        <div className="flex justify-center py-8">
                            <Spin size="large" />
                        </div>
                    ) : freelancers.length > 0 ? (
                        <List
                            dataSource={freelancers}
                            renderItem={(freelancer) => (
                                <List.Item
                                    className={`cursor-pointer p-3 rounded-lg border transition-colors ${
                                        selectedFreelancers.includes(freelancer._id) 
                                            ? 'bg-blue-50 border-blue-200' 
                                            : 'hover:bg-gray-50'
                                    }`}
                                    style={{ 
                                        borderColor: selectedFreelancers.includes(freelancer._id) 
                                            ? PURPLE_THEME.primary 
                                            : PURPLE_THEME.primaryLighter
                                    }}
                                    onClick={() => handleFreelancerSelect(freelancer._id)}
                                    actions={[
                                        <Button
                                            key="select"
                                            type={selectedFreelancers.includes(freelancer._id) ? "primary" : "default"}
                                            size="small"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleFreelancerSelect(freelancer._id);
                                            }}
                                            style={selectedFreelancers.includes(freelancer._id) ? {
                                                background: PURPLE_THEME.primary,
                                                borderColor: PURPLE_THEME.primary
                                            } : {}}
                                        >
                                            {selectedFreelancers.includes(freelancer._id) ? 'Selected' : 'Select'}
                                        </Button>
                                    ]}
                                >
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar 
                                                icon={<UserOutlined />} 
                                                src={freelancer.avatar}
                                                style={{ background: PURPLE_THEME.primaryLighter, color: PURPLE_THEME.primary }}
                                            />
                                        }
                                        title={
                                            <div className="font-medium">
                                                {freelancer.name?.first_name} {freelancer.name?.last_name}
                                            </div>
                                        }
                                        description={
                                            <div>
                                                <p className="text-sm">{freelancer.email}</p>
                                                <div className="mt-1">
                                                    <p className="text-xs text-gray-500">
                                                        Services: {freelancer.services_offered?.map(service => 
                                                            service.subcategory?.name || service.category?.name
                                                        ).join(', ')}
                                                    </p>
                                                </div>
                                            </div>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    ) : (
                        <div className="text-center py-8 text-gray-500">
                            <UserOutlined className="text-4xl mb-2" style={{ color: PURPLE_THEME.gray }} />
                            <p>No freelancers found</p>
                            <p className="text-sm">Please check if freelancers are available in the system</p>
                        </div>
                    )}
                </Drawer>
            </div>
        </div>
    );
};

export default AssignedLeadsList;