import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { apiService } from '../../../../../manageApi/utils/custom.apiservice';
import CustomTable from '../../../pages/custom/CustomTable';

// 1. IMPORT LOGO
import logo from "../../../../../assets/img/logoNew.png";

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
  CheckCircleOutlined, 
  DollarOutlined, 
  ClockCircleOutlined, 
  PlusOutlined, 
  DeleteOutlined, 
  CalculatorOutlined,
  PhoneOutlined,
  MailOutlined,
  PaperClipOutlined,
  FileOutlined,
  TeamOutlined,
  IdcardOutlined,
  HistoryOutlined,
  ToolOutlined,
  CheckOutlined,
  CloseOutlined
} from '@ant-design/icons';

import { showSuccessAlert, showErrorAlert, showConfirmDialog } from '../../../../../manageApi/utils/sweetAlert';

const { Option } = Select;
const { TextArea } = Input;
const { Title, Text } = Typography;
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
    
    // Freelancers & Quotations Data
    const [freelancers, setFreelancers] = useState([]);
    const [freelancersLoading, setFreelancersLoading] = useState(false);
    const [quotations, setQuotations] = useState([]);
    const [quotationsLoading, setQuotationsLoading] = useState(false);

    // Visibility States
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [freelancerDrawerVisible, setFreelancerDrawerVisible] = useState(false);
    
    // MODALS (No longer drawers for quotations)
    const [reviewQuotesModalVisible, setReviewQuotesModalVisible] = useState(false);
    const [finalQuotationModalVisible, setFinalQuotationModalVisible] = useState(false);

    // Selection States
    const [selectedLead, setSelectedLead] = useState(null);
    const [selectedFreelancers, setSelectedFreelancers] = useState([]);
    
    // Pagination & Filters
    const [pagination, setPagination] = useState({ currentPage: 1, itemsPerPage: 10, totalItems: 0 });
    const [filters, setFilters] = useState({ status: 'assigned' });

    // Form & Dynamic Items
    const [finalQuotationForm] = Form.useForm();
    const [items, setItems] = useState([
        { sno: 1, item: '', description: '', unit: '', quantity: 1, unit_price: 0, total: 0 }
    ]);

    // --- CONFIGURATION OBJECTS ---
    const statusConfig = {
        pending: { label: 'Pending', color: 'warning', bgColor: '#fff7e6', textColor: '#fa8c16', icon: <ClockCircleOutlined /> },
        assigned: { label: 'Assigned', color: 'processing', bgColor: '#e6f7ff', textColor: '#1890ff', icon: <UserOutlined /> },
        request_sent: { label: 'Request Sent', color: 'purple', bgColor: '#f9f0ff', textColor: '#722ed1', icon: <SendOutlined /> },
        final_created: { label: 'Final Created', color: 'purple', bgColor: '#f0e6ff', textColor: '#722ed1', icon: <FileTextOutlined /> },
        superadmin_approved: { label: 'Approved', color: 'success', bgColor: '#f6ffed', textColor: '#52c41a', icon: <CheckCircleOutlined /> },
        customer_accepted: { label: 'Customer Accepted', color: 'green', bgColor: '#f6ffed', textColor: '#389e0d', icon: <CheckOutlined /> },
        customer_rejected: { label: 'Customer Rejected', color: 'error', bgColor: '#fff1f0', textColor: '#cf1322', icon: <CloseOutlined /> }
    };

    const supervisorProgressConfig = {
        none: { label: 'Not Started', color: 'default', bgColor: '#f5f5f5', textColor: '#8c8c8c' },
        request_sent: { label: 'Request Sent', color: 'purple', bgColor: '#f9f0ff', textColor: '#722ed1' },
        request_completed: { label: 'Request Completed', color: 'success', bgColor: '#f6ffed', textColor: '#52c41a' },
        final_quotation_created: { label: 'Final Created', color: 'purple', bgColor: '#f0e6ff', textColor: '#722ed1' }
    };

    const unitOptions = ['sq.ft', 'sq.m', 'lumpsum', 'hour', 'day', 'week', 'month', 'piece', 'kg', 'meter', 'set', 'unit', 'lot'];

    // --- HELPERS ---
    const formatMobileNumber = (mobileObj) => mobileObj ? `${mobileObj.country_code || ''} ${mobileObj.number || ''}`.trim() : 'N/A';
    const formatDate = (dateString) => dateString ? new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'N/A';
    const formatCurrency = (amount, currency = 'AED') => amount ? `${currency} ${amount.toLocaleString()}` : `${currency} 0`;

    // --- API CALLS ---
    const fetchLeads = async (page = 1, limit = 10, filterParams = {}) => {
        setLoading(true);
        try {
            const params = { page, limit, supervisor: user?.id, ...filterParams };
            const response = await apiService.get('/estimates', params);
            console.log(response.data)
            if (response.success) {
                setLeads(response.data);
                setPagination(prev => ({ ...prev, currentPage: response.pagination?.page || page, itemsPerPage: response.pagination?.limit || limit, totalItems: response.pagination?.total || 0 }));
            }
        } catch (error) {
            showErrorAlert('Error', 'Failed to fetch leads');
        } finally {
            setLoading(false);
        }
    };

    const fetchFreelancers = async () => {
        setFreelancersLoading(true);
        try {
            const response = await apiService.get('/freelancer', { isActive: true });
            if (response.success) setFreelancers(response.freelancers || []);
        } catch (error) {
            showErrorAlert('Error', 'Failed to fetch freelancers');
        } finally {
            setFreelancersLoading(false);
        }
    };

    const fetchQuotations = async (estimateId) => {
        setQuotationsLoading(true);
        try {
            const response = await apiService.get(`/estimates/quatation?estimate_id=${estimateId}`);
            if (response.success) setQuotations(response.data || []);
        } catch (error) {
            showErrorAlert('Error', 'Failed to fetch quotations');
        } finally {
            setQuotationsLoading(false);
        }
    };

    // --- CALCULATION LOGIC ---
    const updateItemTotal = (index) => {
        const newItems = [...items];
        const item = newItems[index];
        item.total = (item.quantity || 0) * (item.unit_price || 0);
        setItems(newItems);
    };

    const calculateTotals = () => {
        const subtotal = items.reduce((sum, item) => sum + (item.total || 0), 0);
        const discountPercent = finalQuotationForm.getFieldValue('discount_percent') || 0;
        const discountAmount = (subtotal * discountPercent) / 100;
        const grandTotal = subtotal - discountAmount;
        return { subtotal, discountAmount, grandTotal, discountPercent };
    };

    const addItem = () => setItems([...items, { sno: items.length + 1, item: '', description: '', unit: '', quantity: 1, unit_price: 0, total: 0 }]);
    
    const removeItem = (index) => {
        if (items.length === 1) return message.warning('At least one item is required');
        const newItems = items.filter((_, i) => i !== index).map((item, idx) => ({ ...item, sno: idx + 1 }));
        setItems(newItems);
    };

    // --- HANDLERS ---
    const handleSendToFreelancers = async () => {
        if (!selectedLead || selectedFreelancers.length === 0) return message.error('Please select at least one freelancer');
        const confirm = await showConfirmDialog('Send to Freelancers', `Send to ${selectedFreelancers.length} freelancer(s)?`, 'Send');
        if (confirm.isConfirmed) {
            try {
                const response = await apiService.put(`/estimates/${selectedLead._id}/send-to-freelancers`, { freelancer_ids: selectedFreelancers });
                if (response.success) {
                    showSuccessAlert('Success', 'Lead sent successfully');
                    setFreelancerDrawerVisible(false);
                    fetchLeads(pagination.currentPage, pagination.itemsPerPage, filters);
                }
            } catch (error) {
                showErrorAlert('Error', 'Failed to send lead');
            }
        }
    };

    const openFreelancerDrawer = (lead) => {
        setSelectedLead(lead);
        setSelectedFreelancers([]);
        setFreelancerDrawerVisible(true);
        if (freelancers.length === 0) fetchFreelancers();
    };

    const openReviewModal = async (lead) => {
        setSelectedLead(lead);
        setReviewQuotesModalVisible(true); // Open Modal, NOT Drawer
        await fetchQuotations(lead._id);
    };

    const openFinalQuotationModal = (lead) => {
        setSelectedLead(lead);
        setFinalQuotationModalVisible(true);
        finalQuotationForm.resetFields();
        setItems([{ sno: 1, item: '', description: '', unit: '', quantity: 1, unit_price: 0, total: 0 }]);
    };

    const handleCopyFreelancerData = (quotation) => {
        // Map freelancer items to final items
        if (quotation.items && quotation.items.length > 0) {
            const mappedItems = quotation.items.map((item, index) => ({
                sno: index + 1,
                item: item.item,
                description: item.description || '',
                unit: item.unit || 'lumpsum',
                quantity: item.quantity || 1,
                unit_price: item.unit_price || 0,
                total: (item.quantity || 1) * (item.unit_price || 0)
            }));
            setItems(mappedItems);
        }

        finalQuotationForm.setFieldsValue({
            scope_of_work: quotation.scope_of_work,
            discount_percent: 0 
        });

        // Close Review Modal and Open Final Modal
        setReviewQuotesModalVisible(false);
        setFinalQuotationModalVisible(true);
    };

    const handleCreateFinalQuotation = async (values) => {
        const { scope_of_work, discount_percent } = values;
        
        const filteredItems = items.filter(i => i.item && i.item.trim() !== "");
        if (filteredItems.length === 0) return showErrorAlert("Validation Error", "At least one item is required.");

        const preparedItems = filteredItems.map(i => ({
            sno: i.sno,
            item: i.item,
            description: i.description,
            unit: i.unit,
            quantity: i.quantity,
            unit_price: i.unit_price,
            total: i.total
        }));

        try {
            const payload = {
                items: preparedItems,
                scope_of_work,
                discount_percent: discount_percent || 0
            };

            const response = await apiService.post(`/estimates/${selectedLead._id}/final-quotation`, payload);
            if (response.success) {
                showSuccessAlert("Success", "Final quotation created successfully");
                setFinalQuotationModalVisible(false);
                fetchLeads(pagination.currentPage, pagination.itemsPerPage, filters);
            }
        } catch (error) {
            showErrorAlert("Error", "Failed to create final quotation");
        }
    };

    const handleTabChange = (tabKey) => {
        let filterParams = { status: 'assigned' };
        if (tabKey === 'assigned') filterParams.supervisor_progress = 'none';
        else if (tabKey === 'request_sent') filterParams.supervisor_progress = 'request_sent';
        else if (tabKey === 'quotations_received') filterParams.supervisor_progress = 'request_completed';
        else if (tabKey === 'final_created') filterParams.status = 'final_created';
        
        setFilters(filterParams);
        fetchLeads(1, pagination.itemsPerPage, filterParams);
    };

    const getActiveTabKey = () => {
        if (filters.status === 'final_created') return 'final_created';
        if (filters.supervisor_progress === 'request_completed') return 'quotations_received';
        if (filters.supervisor_progress === 'request_sent') return 'request_sent';
        return 'assigned';
    };

    const { subtotal, discountAmount, grandTotal } = calculateTotals();

    // --- COLUMNS DEFINITIONS ---
    const itemColumns = [
        { title: '#', dataIndex: 'sno', width: 50, align: 'center', render: (t) => <Badge count={t} style={{ backgroundColor: PURPLE_THEME.primary }} /> },
        { title: 'Item', dataIndex: 'item', render: (t, r, i) => <Input value={t} onChange={(e) => { const n = [...items]; n[i].item = e.target.value; setItems(n); }} placeholder="Item Name" /> },
        { title: 'Description', dataIndex: 'description', render: (t, r, i) => <Input value={t} onChange={(e) => { const n = [...items]; n[i].description = e.target.value; setItems(n); }} placeholder="Desc" /> },
        { title: 'Unit', dataIndex: 'unit', width: 90, render: (t, r, i) => <Select value={t} onChange={(v) => { const n = [...items]; n[i].unit = v; setItems(n); }} style={{ width: '100%' }}>{unitOptions.map(u => <Option key={u} value={u}>{u}</Option>)}</Select> },
        { title: 'Qty', dataIndex: 'quantity', width: 80, render: (t, r, i) => <InputNumber min={1} value={t} onChange={(v) => { const n = [...items]; n[i].quantity = v; setItems(n); updateItemTotal(i); }} style={{ width: '100%' }} /> },
        { title: 'Price', dataIndex: 'unit_price', width: 110, render: (t, r, i) => <InputNumber min={0} value={t} onChange={(v) => { const n = [...items]; n[i].unit_price = v; setItems(n); updateItemTotal(i); }} style={{ width: '100%' }} /> },
        { title: 'Total', dataIndex: 'total', width: 100, align: 'right', render: (t) => <span style={{ color: PURPLE_THEME.success, fontWeight: 'bold' }}>{t?.toLocaleString()}</span> },
        { title: '', width: 50, render: (_, __, i) => <Button type="text" danger icon={<DeleteOutlined />} onClick={() => removeItem(i)} /> }
    ];

    const columns = [
        {
            title: 'Customer Info',
            width: 250,
            render: (_, r) => (
                <div className="flex items-center gap-3">
                    <Avatar size={40} icon={<UserOutlined />} style={{ background: PURPLE_THEME.primaryBg, color: PURPLE_THEME.primary }} />
                    <div>
                        <div className="font-semibold">{r.customer_name}</div>
                        <div className="text-xs text-gray-500">{r.customer_email}</div>
                        <div className="text-xs text-gray-400">{formatMobileNumber(r.customer_mobile)}</div>
                    </div>
                </div>
            )
        },
        {
            title: 'Service',
            render: (_, r) => (
                <div>
                    <Tag color="purple">{r.service_type}</Tag>
                    <div className="text-sm font-medium mt-1">{r.subcategory?.label}</div>
                    <div className="text-xs text-gray-500">{r.package?.name}</div>
                </div>
            )
        },
        {
            title: 'Area',
            width: 120,
            render: (_, r) => (
                 <div>
                    <div className="font-bold text-gray-700">{r.area_sqft} <span className="text-xs font-normal">sq.ft</span></div>
                    <div className="text-xs text-gray-400">{r.area_length} x {r.area_width}</div>
                 </div>
            )
        },
        {
            title: 'Progress',
            render: (_, r) => {
                const cfg = supervisorProgressConfig[r.supervisor_progress] || supervisorProgressConfig.none;
                return <Tag color={cfg.color}>{cfg.label}</Tag>;
            }
        },
        
        {
            title: 'Actions',
            fixed: 'right',
            width: 200,
            render: (_, r) => (
                <Space>
                    <Tooltip title="View Full Details">
                        <Button icon={<EyeOutlined />} onClick={() => { setSelectedLead(r); setDrawerVisible(true); }} />
                    </Tooltip>
                    
                    {r.status === 'assigned' && r.supervisor_progress === 'none' && (
                        <Button type="primary" size="small" style={{ background: PURPLE_THEME.primary }} onClick={() => openFreelancerDrawer(r)}>Send to Freelancer</Button>
                    )}
                    
                    {r.supervisor_progress === 'request_completed' && (
                        <Button type="primary" size="small" style={{ background: PURPLE_THEME.success, borderColor: PURPLE_THEME.success }} onClick={() => openReviewModal(r)}>
                            Review ({r.freelancer_quotations?.length || 0})
                        </Button>
                    )}

                    {r.status === 'final_created' && (
                         <Tag icon={<CheckCircleOutlined />} color="success">Done</Tag>
                    )}
                </Space>
            )
        }
    ];

    const DetailCard = ({ title, icon, children }) => (
        <Card size="small" title={<span className="flex items-center gap-2 text-purple-700">{icon} {title}</span>} className="mb-4 shadow-sm" headStyle={{ background: '#fafafa' }}>{children}</Card>
    );

    useEffect(() => {
        if (user?.id) fetchLeads(1, 10, { status: 'assigned', supervisor_progress: 'none' });
    }, [user]);

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-screen-2xl mx-auto">
                <Title level={2} className="mb-6" style={{ color: PURPLE_THEME.dark }}>Supervisor Dashboard</Title>

                {/* TABS */}
                <Card bodyStyle={{ padding: 0 }} className="mb-6 overflow-hidden rounded-lg shadow-sm">
                    <Tabs activeKey={getActiveTabKey()} onChange={handleTabChange} type="card" size="large" tabBarStyle={{ margin: 0 }}>
                         <Tabs.TabPane tab="Assigned (New)" key="assigned" />
                         <Tabs.TabPane tab="Request Sent" key="request_sent" />
                         <Tabs.TabPane tab={<Badge count={leads.filter(l => l.supervisor_progress === 'request_completed').length} offset={[10, 0]}>Quotations Received</Badge>} key="quotations_received" />
                         <Tabs.TabPane tab="Final Created" key="final_created" />
                    </Tabs>
                </Card>

                {/* TABLE */}
                <Card bodyStyle={{ padding: 0 }}>
                    <CustomTable columns={columns} data={leads} totalItems={pagination.totalItems} currentPage={pagination.currentPage} itemsPerPage={pagination.itemsPerPage} onPageChange={(p, l) => fetchLeads(p, l, filters)} loading={loading} />
                </Card>
            </div>

            {/* --- DRAWER: FULL DETAILS (LEFT SIDE) --- */}
     {/* --- DRAWER: FULL DETAILS (LEFT SIDE) --- */}
<Drawer 
    title={<span className="text-purple-700"><FileTextOutlined /> Lead Full Information</span>} 
    width={850} 
    onClose={() => setDrawerVisible(false)} 
    open={drawerVisible}
>
    {selectedLead && (
        <div className="p-2">
            {/* Lead Status Header */}
            <div className="flex justify-between items-center mb-6 p-5 bg-purple-50 rounded-xl border border-purple-100 shadow-sm">
                <div>
                    <h3 className="text-xl font-bold text-purple-800 m-0">
                        {selectedLead.service_type} - {selectedLead.subcategory?.label}
                    </h3>
                    <Text type="secondary">ID: {selectedLead._id}</Text>
                </div>
                <Badge status={statusConfig[selectedLead.status]?.color} text={statusConfig[selectedLead.status]?.label} />
            </div>

            <Row gutter={16}>
                <Col span={14}>
                    <DetailCard title="Customer Details" icon={<IdcardOutlined />}>
                        <Descriptions column={1} size="small" bordered={false}>
                            <Descriptions.Item label={<Text strong><UserOutlined /> Name</Text>}>{selectedLead.customer_name}</Descriptions.Item>
                            <Descriptions.Item label={<Text strong><MailOutlined /> Email</Text>}>{selectedLead.customer_email}</Descriptions.Item>
                            <Descriptions.Item label={<Text strong><PhoneOutlined /> Mobile</Text>}>{formatMobileNumber(selectedLead.customer_mobile)}</Descriptions.Item>
                        </Descriptions>
                    </DetailCard>

                    {/* --- NEW SECTION: SHOW ASSIGNED FREELANCERS HERE --- */}
                    <DetailCard title="Assigned Freelancers" icon={<TeamOutlined />}>
                        {selectedLead.sent_to_freelancers && selectedLead.sent_to_freelancers.length > 0 ? (
                            <List
                                itemLayout="horizontal"
                                dataSource={selectedLead.sent_to_freelancers}
                                renderItem={(f) => (
                                    <List.Item className="px-0">
                                        <List.Item.Meta
                                            avatar={<Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />}
                                            title={<Text strong>{f.full_name || `${f.name?.first_name} ${f.name?.last_name}`}</Text>}
                                            description={
                                                <Space direction="vertical" size={0}>
                                                    <Text type="secondary" style={{ fontSize: '12px' }}><MailOutlined /> {f.email}</Text>
                                                    <Text type="secondary" style={{ fontSize: '12px' }}><PhoneOutlined /> {formatMobileNumber(f.mobile)}</Text>
                                                </Space>
                                            }
                                        />
                                        <Tag color="green">Notified</Tag>
                                    </List.Item>
                                )}
                            />
                        ) : (
                            <Alert 
                                message="No Freelancers Assigned" 
                                description="This lead has not been sent to any freelancers yet." 
                                type="info" 
                                showIcon 
                                action={
                                    <Button size="small" type="primary" onClick={() => { setDrawerVisible(false); openFreelancerDrawer(selectedLead); }}>
                                        Assign Now
                                    </Button>
                                }
                            />
                        )}
                    </DetailCard>
                </Col>

                <Col span={10}>
                    <DetailCard title="Area Specifications" icon={<CalculatorOutlined />}>
                        <div className="flex justify-around bg-gray-50 p-3 rounded-lg border mb-3">
                            <div className="text-center">
                                <Title level={4} className="m-0" style={{ color: PURPLE_THEME.primary }}>{selectedLead.area_sqft}</Title>
                                <Text size="small" type="secondary">Sq.Ft</Text>
                            </div>
                            <Divider type="vertical" style={{ height: '40px' }} />
                            <div className="text-center">
                                <Title level={4} className="m-0">{selectedLead.area_length}x{selectedLead.area_width}</Title>
                                <Text size="small" type="secondary">Dimensions</Text>
                            </div>
                        </div>
                        <Text strong>Description:</Text>
                        <p className="text-gray-600 mt-1" style={{ fontSize: '13px' }}>{selectedLead.description}</p>
                    </DetailCard>

                    <DetailCard title="Process Timeline" icon={<HistoryOutlined />}>
                        <Timeline mode="left" className="mt-2" size="small">
                            <Timeline.Item color="green" label="Created">{formatDate(selectedLead.createdAt)}</Timeline.Item>
                            <Timeline.Item color="blue" label="Assigned">Lead assigned to you</Timeline.Item>
                            <Timeline.Item 
                                color={selectedLead.sent_to_freelancers?.length > 0 ? 'purple' : 'gray'} 
                                label="Freelancers"
                            >
                                {selectedLead.sent_to_freelancers?.length || 0} notified
                            </Timeline.Item>
                        </Timeline>
                    </DetailCard>
                </Col>
            </Row>
        </div>
    )}
</Drawer>

            {/* --- DRAWER: SELECT FREELANCERS --- */}
            <Drawer title="Select Freelancers" width={500} onClose={() => setFreelancerDrawerVisible(false)} open={freelancerDrawerVisible}>
                {freelancersLoading ? <Spin /> : (
                    <>
                        <List
                            dataSource={freelancers}
                            renderItem={item => (
                                <List.Item actions={[
                                    <Button 
                                        type={selectedFreelancers.includes(item._id) ? 'primary' : 'default'} 
                                        onClick={() => {
                                            setSelectedFreelancers(prev => prev.includes(item._id) ? prev.filter(id => id !== item._id) : [...prev, item._id]);
                                        }}
                                    >
                                        {selectedFreelancers.includes(item._id) ? 'Selected' : 'Select'}
                                    </Button>
                                ]}>
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.avatar} icon={<UserOutlined />} />}
                                        title={`${item.name?.first_name} ${item.name?.last_name}`}
                                        description={item.email}
                                    />
                                </List.Item>
                            )}
                        />
                        <div className="mt-4 pt-4 border-t text-right">
                             <Button type="primary" disabled={selectedFreelancers.length === 0} onClick={handleSendToFreelancers}>
                                 Send Request ({selectedFreelancers.length})
                             </Button>
                        </div>
                    </>
                )}
            </Drawer>

            {/* --- MODAL: REVIEW FREELANCER QUOTATIONS (Formal Logo View) --- */}
            <Modal
                title={null}
                open={reviewQuotesModalVisible}
                onCancel={() => setReviewQuotesModalVisible(false)}
                footer={null}
                width={800}
                style={{ top: 20 }}
            >
                {quotationsLoading ? <div className="text-center py-10"><Spin size="large" /></div> : (
                    <div className="space-y-6">
                        <Title level={4} className="text-center mb-4">Received Quotations</Title>
                        
                        <Collapse accordion defaultActiveKey={['0']}>
                            {quotations.map((quote, idx) => (
                                <Panel 
                                    header={
                                        <div className="flex justify-between items-center w-full">
                                            <span>Quote from <strong>{quote.created_by?.name?.first_name} {quote.created_by?.name?.last_name}</strong></span>
                                            <Tag color="blue">{formatCurrency(quote.grand_total)}</Tag>
                                        </div>
                                    } 
                                    key={idx}
                                >
                                    {/* --- FORMAL QUOTATION VIEW WITH LOGO --- */}
                                    <div className="p-6 border rounded-lg bg-white shadow-sm">
                                        
                                        {/* Header with Logo */}
                                        <div className="flex justify-between items-start border-b pb-4 mb-4">
                                            <div>
                                                <img src={logo} alt="Company Logo" style={{ height: 50, marginBottom: 8 }} />
                                                <div className="text-xs text-gray-500">Incoming Quotation</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-lg font-bold text-gray-700">QUOTATION</div>
                                                <div className="text-xs text-gray-500">Date: {formatDate(quote.createdAt)}</div>
                                                <div className="text-xs text-gray-500">Ref: {quote._id.substring(0,8)}</div>
                                            </div>
                                        </div>

                                        {/* Items Table (Read Only) */}
                                        <Table 
                                            dataSource={quote.items}
                                            pagination={false}
                                            size="small"
                                            bordered
                                            columns={[
                                                { title: '#', render: (t,r,i) => i+1, width: 50, align: 'center' },
                                                { title: 'Item', dataIndex: 'item' },
                                                { title: 'Description', dataIndex: 'description' },
                                                { title: 'Qty', dataIndex: 'quantity', width: 80, align: 'center' },
                                                { title: 'Rate', dataIndex: 'unit_price', width: 100, align: 'right', render: v => formatCurrency(v) },
                                                { title: 'Total', render: (_, r) => <strong>{formatCurrency(r.quantity * r.unit_price)}</strong>, align: 'right', width: 120 }
                                            ]}
                                        />

                                        {/* Scope & Totals */}
                                        <Row gutter={16} className="mt-4">
                                            <Col span={14}>
                                                <div className="p-3 bg-gray-50 rounded">
                                                    <div className="font-bold text-xs text-gray-500 mb-1">SCOPE OF WORK</div>
                                                    <p className="text-sm m-0">{quote.scope_of_work}</p>
                                                </div>
                                            </Col>
                                            <Col span={10}>
                                                <div className="text-right">
                                                    <div className="text-2xl font-bold text-purple-700 mt-2">
                                                        Total: {formatCurrency(quote.grand_total)}
                                                    </div>
                                                    <div className="text-xs text-gray-500">Duration: {quote.duration_days} Days</div>
                                                </div>
                                            </Col>
                                        </Row>

                                        {/* Action Button */}
                                        <div className="mt-6 pt-4 border-t text-right">
                                            <Button 
                                                type="primary" 
                                                icon={<CheckOutlined />} 
                                                onClick={() => handleCopyFreelancerData(quote)}
                                                style={{ background: PURPLE_THEME.success, borderColor: PURPLE_THEME.success }}
                                            >
                                                Use & Create Final
                                            </Button>
                                        </div>
                                    </div>
                                    {/* --- END FORMAL VIEW --- */}
                                </Panel>
                            ))}
                        </Collapse>

                        {quotations.length === 0 && <Alert message="No quotations received yet." type="warning" />}
                        
                        <div className="text-center pt-4">
                            <Button type="dashed" onClick={() => { setReviewQuotesModalVisible(false); openFinalQuotationModal(selectedLead); }}>
                                Skip & Create Empty Final Quotation
                            </Button>
                        </div>
                    </div>
                )}
            </Modal>

            {/* --- MODAL: CREATE FINAL QUOTATION (INVOICE STYLE) --- */}
            <Modal
                title={null}
                open={finalQuotationModalVisible}
                onCancel={() => setFinalQuotationModalVisible(false)}
                footer={null}
                width={900}
                style={{ top: 20 }}
                bodyStyle={{ padding: 0 }} 
            >
                <Form form={finalQuotationForm} layout="vertical" onFinish={handleCreateFinalQuotation}>
                    {/* INVOICE HEADER WITH LOGO */}
                    <div className="p-8 bg-white rounded-t-lg">
                        <div className="flex justify-between items-start border-b pb-6 mb-6">
                            <div>
                                <img src={logo} alt="Company Logo" style={{ height: 60, marginBottom: 10 }} />
                                <div className="text-gray-500 text-sm">
                                    123 Landscape Avenue<br/>Dubai, UAE<br/>contact@company.com
                                </div>
                            </div>
                            <div className="text-right">
                                <h1 className="text-2xl font-bold text-purple-700 m-0">FINAL QUOTATION</h1>
                                <div className="mt-2 text-gray-600">
                                    <div><strong>Date:</strong> {new Date().toLocaleDateString()}</div>
                                    <div><strong>Ref:</strong> {selectedLead?._id?.substring(0,8).toUpperCase()}</div>
                                    <div><strong>Customer:</strong> {selectedLead?.customer_name}</div>
                                </div>
                            </div>
                        </div>

                        {/* ITEMS TABLE */}
                        <Card title="Quotation Items" size="small" type="inner" className="mb-6 bg-gray-50">
                            <Table 
                                columns={itemColumns} 
                                dataSource={items} 
                                pagination={false} 
                                size="small" 
                                rowKey="sno" 
                                footer={() => <Button type="dashed" onClick={addItem} icon={<PlusOutlined />} block>Add Line Item</Button>}
                            />
                        </Card>

                        <Row gutter={24}>
                            <Col span={14}>
                                <Form.Item name="scope_of_work" label="Scope of Work & Terms" rules={[{ required: true }]}>
                                    <TextArea rows={6} placeholder="Detailed scope..." />
                                </Form.Item>
                            </Col>
                            <Col span={10}>
                                <div className="bg-purple-50 p-4 rounded">
                                    <div className="flex justify-between mb-2">
                                        <span>Subtotal:</span>
                                        <span className="font-semibold">{formatCurrency(subtotal)}</span>
                                    </div>
                                    <Form.Item name="discount_percent" label="Discount %">
                                        <InputNumber min={0} max={100} style={{ width: '100%' }} onChange={() => { const { grandTotal } = calculateTotals(); /* force update if needed */ }} />
                                    </Form.Item>
                                    <div className="flex justify-between mb-2 text-red-500">
                                        <span>Discount Amount:</span>
                                        <span>- {formatCurrency(discountAmount)}</span>
                                    </div>
                                    <Divider style={{ margin: '10px 0' }} />
                                    <div className="flex justify-between text-xl font-bold text-purple-800">
                                        <span>Grand Total:</span>
                                        <span>{formatCurrency(grandTotal)}</span>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>

                    {/* FOOTER ACTIONS */}
                    <div className="p-4 bg-gray-100 flex justify-end gap-3 rounded-b-lg border-t">
                        <Button onClick={() => setFinalQuotationModalVisible(false)}>Cancel</Button>
                        <Button type="primary" htmlType="submit" size="large" icon={<CheckCircleOutlined />} style={{ background: PURPLE_THEME.primary }}>
                            Create & Submit for Approval
                        </Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default AssignedLeadsList;