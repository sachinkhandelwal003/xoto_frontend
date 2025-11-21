import React, { useState, useEffect } from 'react';
import { apiService } from '../../../../../manageApi/utils/custom.apiservice';
import CustomTable from '../../../pages/custom/CustomTable';
import { Drawer, List, Avatar, Button, Spin, Tabs, Card, Tag, message, Badge, Alert, Row, Col, Modal, Select, Form, Input, InputNumber, Divider, Descriptions, Table, Space } from 'antd';
import { UserOutlined, SendOutlined, EyeOutlined, FileTextOutlined, BellOutlined, CheckCircleOutlined, DollarOutlined, CalendarOutlined, ClockCircleOutlined, PlusOutlined, DeleteOutlined, CalculatorOutlined } from '@ant-design/icons';
import { showSuccessAlert, showErrorAlert, showConfirmDialog } from '../../../../../manageApi/utils/sweetAlert';
import { useSelector } from "react-redux";

const { Option } = Select;
const { TextArea } = Input;

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

    // Status mapping for display
    const statusConfig = {
        pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
        assigned: { label: 'Assigned', color: 'bg-blue-100 text-blue-800' },
        request_sent: { label: 'Request Sent', color: 'bg-purple-100 text-purple-800' },
        final_created: { label: 'Final Created', color: 'bg-teal-100 text-teal-800' },
        superadmin_approved: { label: 'Approved', color: 'bg-emerald-100 text-emerald-800' },
        customer_accepted: { label: 'Customer Accepted', color: 'bg-lime-100 text-lime-800' },
        customer_rejected: { label: 'Customer Rejected', color: 'bg-red-100 text-red-800' }
    };

    // Supervisor progress mapping - UPDATED based on your API
    const supervisorProgressConfig = {
        none: { label: 'Not Started', color: 'bg-gray-100 text-gray-800' },
        request_sent: { label: 'Request Sent', color: 'bg-purple-100 text-purple-800' },
        request_completed: { label: 'Request Completed', color: 'bg-green-100 text-green-800' },
        final_quotation_created: { label: 'Final Quotation Created', color: 'bg-teal-100 text-teal-800' }
    };

    // Unit options
    const unitOptions = [
        'sq.ft', 'sq.m', 'lumpsum', 'hour', 'day', 'week', 'month', 
        'piece', 'kg', 'meter', 'set', 'unit', 'lot'
    ];

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
            render: (text) => <Tag color="blue">{text}</Tag>
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
                    style={{ width: '100%' }}
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
                    style={{ width: '100%' }}
                />
            )
        },
        {
            title: 'Unit Price (₹)',
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
                    formatter={value => `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/₹\s?|(,*)/g, '')}
                    style={{ width: '100%' }}
                />
            )
        },
        {
            title: 'Total (₹)',
            dataIndex: 'total',
            width: 120,
            render: (text) => (
                <div className="font-semibold text-green-600 text-right">
                    ₹{text?.toLocaleString()}
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
                />
            )
        }
    ];

    // Get columns based on current status filter
    const getColumns = () => {
        const baseColumns = [
            {
                key: 'customer_name',
                title: 'Customer Name',
                sortable: true,
                filterable: false,
            },
            {
                key: 'customer_email',
                title: 'Email',
                sortable: true,
                filterable: false,
            },
            {
                key: 'customer_mobile',
                title: 'Mobile',
                sortable: true,
                filterable: false,
            },
            {
                key: 'category',
                title: 'Category',
                sortable: true,
                filterable: false,
                render: (value) => value?.name || 'N/A'
            },
            {
                key: 'subcategories',
                title: 'Subcategories',
                sortable: false,
                filterable: false,
                render: (value) => value?.map(sub => sub.name).join(', ') || 'N/A'
            },
            {
                key: 'supervisor_progress',
                title: 'Supervisor Progress',
                sortable: false,
                filterable: false,
                render: (value) => {
                    const config = supervisorProgressConfig[value] || { label: value, color: 'bg-gray-100 text-gray-800' };
                    return (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
                            {config.label}
                        </span>
                    );
                }
            },
            {
                key: 'freelancers_info',
                title: 'Freelancers & Quotations',
                sortable: false,
                filterable: false,
                render: (value, record) => {
                    const stats = getQuotationStats(record);
                    
                    if (record.supervisor_progress === 'none') {
                        return <span className="text-gray-400">Not sent</span>;
                    }

                    return (
                        <div className="flex flex-col space-y-1">
                            <div className="flex items-center space-x-2">
                                <UserOutlined className="text-blue-500" />
                                <span className="text-sm font-medium">{stats.total} freelancers</span>
                            </div>
                            {stats.received > 0 && (
                                <div className="flex items-center space-x-2">
                                    <FileTextOutlined className="text-green-500" />
                                    <span className="text-sm text-green-600">{stats.received} quotations</span>
                                </div>
                            )}
                            {stats.pending > 0 && (
                                <div className="flex items-center space-x-2">
                                    <ClockCircleOutlined className="text-orange-500" />
                                    <span className="text-sm text-orange-600">{stats.pending} pending</span>
                                </div>
                            )}
                        </div>
                    );
                }
            },
            {
                key: 'submitted_at',
                title: 'Submitted Date',
                sortable: true,
                filterable: false,
                render: (value) => new Date(value).toLocaleDateString()
            }
        ];

        // Add actions column
        baseColumns.push({
            key: 'actions',
            title: 'Actions',
            sortable: false,
            filterable: false,
            render: (value, record) => {
                const stats = getQuotationStats(record);
                
                // Show send to freelancers button for assigned leads with no progress
                if (record.status === 'assigned' && record.supervisor_progress === 'none') {
                    return (
                        <div className="flex space-x-2">
                            <Button
                                type="primary"
                                size="small"
                                icon={<SendOutlined />}
                                onClick={() => openFreelancerDrawer(record)}
                            >
                                Send to Freelancers
                            </Button>
                            <Button
                                size="small"
                                icon={<EyeOutlined />}
                                onClick={() => {
                                    setSelectedLead(record);
                                    setDrawerVisible(true);
                                }}
                            >
                                View
                            </Button>
                        </div>
                    );
                }
                
                // Show actions for request_sent status (waiting for quotations)
                if (record.supervisor_progress === 'request_sent') {
                    return (
                        <div className="flex space-x-2">
                            <Button
                                type="default"
                                size="small"
                                icon={<EyeOutlined />}
                                onClick={() => {
                                    setSelectedLead(record);
                                    setDrawerVisible(true);
                                }}
                            >
                                View Details
                            </Button>
                            
                            <Tag color="orange">Waiting for Quotations</Tag>
                        </div>
                    );
                }
                
                // Show actions for request_completed status (quotations received)
                if (record.supervisor_progress === 'request_completed') {
                    return (
                        <div className="flex space-x-2">
                            <Button
                                type="default"
                                size="small"
                                icon={<EyeOutlined />}
                                onClick={() => {
                                    setSelectedLead(record);
                                    setDrawerVisible(true);
                                }}
                            >
                                View Details
                            </Button>
                            
                            {stats.received > 0 && (
                                <Button
                                    type="primary"
                                    size="small"
                                    icon={<FileTextOutlined />}
                                    onClick={() => openQuotationsDrawer(record)}
                                >
                                    Review Quotations ({stats.received})
                                </Button>
                            )}
                            
                            {stats.received > 0 && (
                                <Button
                                    type="primary"
                                    size="small"
                                    icon={<CheckCircleOutlined />}
                                    onClick={() => openFinalQuotationModal(record)}
                                >
                                    Create Final
                                </Button>
                            )}
                        </div>
                    );
                }
                
                // Show view only for final created
                if (record.status === 'final_created') {
                    return (
                        <div className="flex space-x-2">
                            <Button
                                type="default"
                                size="small"
                                icon={<EyeOutlined />}
                                onClick={() => {
                                    setSelectedLead(record);
                                    setDrawerVisible(true);
                                }}
                            >
                                View Details
                            </Button>
                            <Tag color="teal">Final Created</Tag>
                        </div>
                    );
                }
                
                return (
                    <Button
                        size="small"
                        icon={<EyeOutlined />}
                        onClick={() => {
                            setSelectedLead(record);
                            setDrawerVisible(true);
                        }}
                    >
                        View
                    </Button>
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
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">My Assigned Leads</h1>
                <p className="text-gray-600">Manage leads assigned to you and coordinate with freelancers</p>
            </div>

            {/* Notifications Bar */}
            {getNotificationCount() > 0 && (
                <Alert
                    message={
                        <div className="flex items-center justify-between">
                            <span>
                                <BellOutlined className="mr-2" />
                                You have {getNotificationCount()} lead(s) with new quotations to review!
                            </span>
                            <Button 
                                type="link" 
                                onClick={() => handleTabChange('quotations_received')}
                            >
                                Review Now
                            </Button>
                        </div>
                    }
                    type="info"
                    showIcon
                    className="mb-4"
                />
            )}

            {/* Status Tabs */}
            <div className="mb-6">
                <Tabs
                    activeKey={getActiveTabKey()}
                    onChange={handleTabChange}
                    type="card"
                    items={tabItems.map(tab => ({
                        ...tab,
                        label: tab.key === 'quotations_received' && getNotificationCount() > 0 ? (
                            <Badge count={getNotificationCount()} offset={[10, -5]}>
                                {tab.label}
                            </Badge>
                        ) : tab.label
                    }))}
                />
            </div>

            {/* UPDATED: Status-wise information */}
            <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">
                    {getActiveTabKey() === 'assigned' && 'Assigned Leads - Ready to Send to Freelancers'}
                    {getActiveTabKey() === 'request_sent' && 'Request Sent - Waiting for Quotations from Freelancers'}
                    {getActiveTabKey() === 'quotations_received' && 'Quotations Received - Ready for Review and Final Creation'}
                    {getActiveTabKey() === 'final_created' && 'Final Created - Waiting for Super Admin Approval'}
                </h3>
                <p className="text-blue-700 text-sm">
                    {getActiveTabKey() === 'assigned' && 'These leads are assigned to you and ready to be sent to freelancers for quotations.'}
                    {getActiveTabKey() === 'request_sent' && 'These leads have been sent to freelancers. Waiting for them to submit quotations.'}
                    {getActiveTabKey() === 'quotations_received' && 'Freelancers have submitted quotations. Review them and create the final quotation.'}
                    {getActiveTabKey() === 'final_created' && 'Final quotations have been created and sent for super admin approval.'}
                </p>
            </div>

            {/* Custom Table */}
            <CustomTable
                columns={getColumns()}
                data={leads}
                totalItems={pagination.totalItems}
                currentPage={pagination.currentPage}
                itemsPerPage={pagination.itemsPerPage}
                onPageChange={handlePageChange}
                onFilter={handleFilter}
                loading={loading}
            />

            {/* Lead Details Drawer */}
            <Drawer
                title="Lead Details"
                placement="right"
                onClose={closeDrawer}
                open={drawerVisible}
                width={600}
            >
                {selectedLead && (
                    <div className="space-y-4">
                        <Card title="Customer Information" size="small">
                            <Descriptions column={1} size="small">
                                <Descriptions.Item label="Name">{selectedLead.customer_name}</Descriptions.Item>
                                <Descriptions.Item label="Email">{selectedLead.customer_email}</Descriptions.Item>
                                <Descriptions.Item label="Mobile">{selectedLead.customer_mobile}</Descriptions.Item>
                                <Descriptions.Item label="Submitted">
                                    {new Date(selectedLead.submitted_at).toLocaleString()}
                                </Descriptions.Item>
                            </Descriptions>
                        </Card>

                        <Card title="Service Details" size="small">
                            <div className="space-y-2">
                                <p><strong>Category:</strong> {selectedLead.category?.name}</p>
                                <p><strong>Subcategories:</strong></p>
                                <div className="flex flex-wrap gap-1">
                                    {selectedLead.subcategories?.map((sub, index) => (
                                        <Tag key={index} color="blue">{sub.name}</Tag>
                                    ))}
                                </div>
                                <p><strong>Description:</strong> {selectedLead.description}</p>
                            </div>
                        </Card>

                        <Card title="Progress Information" size="small">
                            <Row gutter={[16, 8]}>
                                <Col span={12}>
                                    <strong>Status:</strong>
                                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                                        statusConfig[selectedLead.status]?.color || 'bg-gray-100 text-gray-800'
                                    }`}>
                                        {statusConfig[selectedLead.status]?.label || selectedLead.status}
                                    </span>
                                </Col>
                                <Col span={12}>
                                    <strong>Supervisor Progress:</strong>
                                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                                        supervisorProgressConfig[selectedLead.supervisor_progress]?.color || 'bg-gray-100 text-gray-800'
                                    }`}>
                                        {supervisorProgressConfig[selectedLead.supervisor_progress]?.label || selectedLead.supervisor_progress}
                                    </span>
                                </Col>
                            </Row>
                        </Card>

                        {selectedLead.sent_to_freelancers && selectedLead.sent_to_freelancers.length > 0 && (
                            <Card title="Sent to Freelancers" size="small">
                                <div className="space-y-3">
                                    {selectedLead.sent_to_freelancers.map((freelancer, index) => (
                                        <div key={index} className="flex items-center justify-between p-2 border rounded">
                                            <div className="flex items-center space-x-3">
                                                <Avatar icon={<UserOutlined />} />
                                                <div>
                                                    <p className="font-medium">{freelancer.name?.first_name} {freelancer.name?.last_name}</p>
                                                    <p className="text-sm text-gray-500">{freelancer.email}</p>
                                                </div>
                                            </div>
                                            {selectedLead.freelancer_quotations?.some(q => q.freelancer._id === freelancer._id) ? (
                                                <Tag color="green">Quotation Submitted</Tag>
                                            ) : (
                                                <Tag color="orange">Waiting</Tag>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        )}

                        {selectedLead.freelancer_quotations && selectedLead.freelancer_quotations.length > 0 && (
                            <Card title="Submitted Quotations" size="small">
                                <div className="space-y-3">
                                    {selectedLead.freelancer_quotations.map((quotation, index) => (
                                        <div key={index} className="p-3 border rounded bg-gray-50">
                                            <div className="flex justify-between items-start mb-2">
                                                <strong>{quotation.freelancer.name?.first_name} {quotation.freelancer.name?.last_name}</strong>
                                                <Tag color="blue">₹{quotation.quotation.grand_total}</Tag>
                                            </div>
                                            <p className="text-sm mb-1">{quotation.quotation.scope_of_work}</p>
                                            <p className="text-xs text-gray-500">
                                                Duration: {quotation.quotation.duration_days || 'N/A'} days • 
                                                Submitted: {new Date(quotation.submitted_at).toLocaleString()}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        )}

                        {selectedLead.final_quotation && (
                            <Card title="Final Quotation" size="small">
                                <div className="p-3 border rounded bg-teal-50">
                                    <div className="flex justify-between items-center mb-2">
                                        <strong>Final Quotation</strong>
                                        <Tag color="teal">Final</Tag>
                                    </div>
                                    <p className="text-sm"><strong>Amount:</strong> ₹{selectedLead.final_quotation.grand_total}</p>
                                    <p className="text-sm"><strong>Description:</strong> {selectedLead.final_quotation.scope_of_work}</p>
                                </div>
                            </Card>
                        )}
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
                extra={
                    <Button
                        type="primary"
                        icon={<CheckCircleOutlined />}
                        onClick={() => openFinalQuotationModal(selectedLead)}
                    >
                        Create Final Quotation
                    </Button>
                }
            >
                {selectedLead && (
                    <div className="space-y-4">
                        <Card title="Customer Details" size="small">
                            <Row gutter={[16, 8]}>
                                <Col span={8}>
                                    <strong>Name:</strong> {selectedLead.customer_name}
                                </Col>
                                <Col span={8}>
                                    <strong>Service:</strong> {selectedLead.category?.name}
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
                                        title={
                                            <div className="flex justify-between items-center">
                                                <span className="flex items-center">
                                                    <Avatar 
                                                        size="small" 
                                                        icon={<UserOutlined />} 
                                                        className="mr-2"
                                                    />
                                                    {quotation.created_by?.name?.first_name} {quotation.created_by?.name?.last_name}
                                                </span>
                                                <Tag color="blue" icon={<DollarOutlined />}>
                                                    ₹{quotation.grand_total}
                                                </Tag>
                                            </div>
                                        }
                                        extra={
                                            <Space>
                                                <Button 
                                                    type="link" 
                                                    size="small"
                                                    onClick={() => {
                                                        loadQuotationData(quotation);
                                                        setFinalQuotationModalVisible(true);
                                                    }}
                                                >
                                                    Edit & Use
                                                </Button>
                                                <Button 
                                                    type="link" 
                                                    size="small"
                                                    onClick={() => {
                                                        finalQuotationForm.setFieldsValue({
                                                            quotation_id: quotation._id
                                                        });
                                                        setFinalQuotationModalVisible(true);
                                                    }}
                                                >
                                                    Use As Is
                                                </Button>
                                            </Space>
                                        }
                                    >
                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center space-x-4">
                                                    <div className="flex items-center">
                                                        <DollarOutlined className="text-green-500 mr-1" />
                                                        <span className="font-semibold">₹{quotation.grand_total}</span>
                                                    </div>
                                                    {quotation.duration_days && (
                                                        <div className="flex items-center">
                                                            <CalendarOutlined className="text-blue-500 mr-1" />
                                                            <span>{quotation.duration_days} days</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    Submitted: {new Date(quotation.created_at).toLocaleString()}
                                                </div>
                                            </div>
                                            
                                            <div>
                                                <strong>Scope of Work:</strong>
                                                <p className="mt-1 text-sm text-gray-700 bg-gray-50 p-2 rounded">
                                                    {quotation.scope_of_work}
                                                </p>
                                            </div>

                                            {quotation.items && quotation.items.length > 0 && (
                                                <div>
                                                    <strong>Items Breakdown:</strong>
                                                    <div className="mt-2 space-y-2">
                                                        {quotation.items.map((item, itemIndex) => (
                                                            <div key={itemIndex} className="flex justify-between text-sm border-b pb-1">
                                                                <span>{item.item}</span>
                                                                <span>₹{item.total}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            <div className="flex items-center justify-between pt-2 border-t">
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
                                                >
                                                    Edit & Create Final
                                                </Button>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <Card size="small">
                                <div className="text-center py-8 text-gray-500">
                                    <FileTextOutlined className="text-4xl mb-2 text-gray-300" />
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
                title="Create Final Quotation"
                open={finalQuotationModalVisible}
                onCancel={() => setFinalQuotationModalVisible(false)}
                footer={null}
                width={900}
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
                            className="mb-4"
                        />
                    )}

                    <Card 
                        title={
                            <div className="flex items-center justify-between">
                                <span>Quotation Items Breakdown</span>
                                <Button
                                    type="dashed"
                                    icon={<PlusOutlined />}
                                    onClick={addItem}
                                >
                                    Add Item
                                </Button>
                            </div>
                        }
                        size="small"
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

                    {/* Financial Summary - Only for display, not sent to API */}
                    <Card title="Financial Summary" size="small" className="mt-4">
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">Subtotal:</span>
                                <span className="text-lg font-bold">₹{subtotal.toLocaleString()}</span>
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
                                    style={{ width: '100%' }}
                                    addonAfter="%"
                                />
                            </Form.Item>

                            <div className="flex justify-between items-center text-green-600">
                                <span>Discount Amount:</span>
                                <span className="font-semibold">-₹{discountAmount.toLocaleString()}</span>
                            </div>

                            <Divider />

                            <div className="flex justify-between items-center text-2xl font-bold text-green-700">
                                <span>Grand Total:</span>
                                <span>₹{grandTotal.toLocaleString()}</span>
                            </div>
                        </div>
                    </Card>

                    <Card title="Scope of Work" size="small" className="mt-4">
                        <Form.Item
                            name="scope_of_work"
                            rules={[{ required: true, message: 'Please enter scope of work' }]}
                        >
                            <TextArea
                                placeholder="Describe the complete scope of work, including materials, methodology, timeline, and any special considerations..."
                                rows={4}
                                showCount
                                maxLength={2000}
                            />
                        </Form.Item>
                    </Card>

                    <div className="flex justify-end space-x-2 mt-6">
                        <Button onClick={() => setFinalQuotationModalVisible(false)}>
                            Cancel
                        </Button>
                        <Button type="primary" htmlType="submit">
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
                extra={
                    <Button
                        type="primary"
                        onClick={handleSendToFreelancers}
                        disabled={selectedFreelancers.length === 0}
                        icon={<SendOutlined />}
                    >
                        Send to {selectedFreelancers.length} Freelancer(s)
                    </Button>
                }
            >
                {selectedLead && (
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold text-gray-900 mb-2">Lead Details</h3>
                        <p><strong>Customer:</strong> {selectedLead.customer_name}</p>
                        <p><strong>Service:</strong> {selectedLead.category?.name}</p>
                        <p><strong>Subcategories:</strong> {selectedLead.subcategories?.map(sub => sub.name).join(', ')}</p>
                    </div>
                )}

                <h3 className="font-semibold text-gray-900 mb-4">
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
                                        />
                                    }
                                    title={`${freelancer.name?.first_name} ${freelancer.name?.last_name}`}
                                    description={
                                        <div>
                                            <p className="text-sm">{freelancer.email}</p>
                                            <p className="text-sm">{freelancer.mobile}</p>
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
                        <UserOutlined className="text-4xl mb-2 text-gray-300" />
                        <p>No freelancers found</p>
                        <p className="text-sm">Please check if freelancers are available in the system</p>
                    </div>
                )}
            </Drawer>
        </div>
    );
};

export default AssignedLeadsList;