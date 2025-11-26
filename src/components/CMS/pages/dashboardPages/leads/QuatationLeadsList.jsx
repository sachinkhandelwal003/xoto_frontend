import React, { useState, useEffect } from 'react';
import { apiService } from '../../../../../manageApi/utils/custom.apiservice';
import CustomTable from '../../../pages/custom/CustomTable';
import {
  Drawer, Button, Spin, Card, Tag, message, Form, Input, InputNumber,
  Upload, Modal, Row, Col, Divider, Table, Space, Select
} from 'antd';
import {
  EyeOutlined, FileAddOutlined, UploadOutlined, FileTextOutlined,
  CheckCircleOutlined, PlusOutlined, DeleteOutlined
} from '@ant-design/icons';
import { showSuccessAlert, showErrorAlert } from '../../../../../manageApi/utils/sweetAlert';
import { useSelector } from "react-redux";

const { TextArea } = Input;
const { Dragger } = Upload;
const { Option } = Select;

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

  const statusConfig = {
    pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
    assigned: { label: 'Assigned', color: 'bg-blue-100 text-blue-800' },
    request_sent: { label: 'Request Sent', color: 'bg-purple-100 text-purple-800' },
    quotations_received: { label: 'Quotations Received', color: 'bg-green-100 text-green-800' },
    final_created: { label: 'Final Created', color: 'bg-teal-100 text-teal-800' },
    superadmin_approved: { label: 'Approved', color: 'bg-emerald-100 text-emerald-800' },
    customer_accepted: { label: 'Customer Accepted', color: 'bg-lime-100 text-lime-800' },
    customer_rejected: { label: 'Customer Rejected', color: 'bg-red-100 text-red-800' }
  };

  const unitOptions = [
    'sq.ft', 'sq.m', 'lumpsum', 'hour', 'day', 'week', 'month',
    'piece', 'kg', 'meter', 'set', 'unit', 'lot'
  ];

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

  // Fixed this function — was missing semicolon and had syntax error
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
    { title: 'S.No', dataIndex: 'sno', width: 60, align: 'center', render: t => <Tag color="blue">{t}</Tag> },
    {
      title: 'Item', dataIndex: 'item',
      render: (t, _, i) => (
        <Input
          value={t}
          placeholder="Item name"
          onChange={e => {
            const newItems = [...items];
            newItems[i].item = e.target.value;
            setItems(newItems);
          }}
        />
      )
    },
    {
      title: 'Description', dataIndex: 'description',
      render: (t, _, i) => (
        <Input
          value={t}
          placeholder="Description"
          onChange={e => {
            const newItems = [...items];
            newItems[i].description = e.target.value;
            setItems(newItems);
          }}
        />
      )
    },
    {
      title: 'Unit', dataIndex: 'unit', width: 100,
      render: (t, _, i) => (
        <Select
          value={t}
          placeholder="Unit"
          onChange={v => {
            const newItems = [...items];
            newItems[i].unit = v;
            setItems(newItems);
          }}
          style={{ width: '100%' }}
        >
          {unitOptions.map(u => <Option key={u} value={u}>{u}</Option>)}
        </Select>
      )
    },
    {
      title: 'Qty', dataIndex: 'quantity', width: 100,
      render: (t, _, i) => (
        <InputNumber
          min={0}
          value={t}
          style={{ width: '100%' }}
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
      title: 'Unit Price (₹)', dataIndex: 'unit_price', width: 140,
      render: (t, _, i) => (
        <InputNumber
          min={0}
          value={t}
          style={{ width: '100%' }}
          formatter={v => `₹ ${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={v => v.replace(/₹\s?|(,*)/g, '')}
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
      title: 'Total (₹)', dataIndex: 'total', width: 120,
      render: t => <div className="text-right font-semibold text-green-600">₹{t?.toLocaleString()}</div>
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
        />
      )
    }
  ];

  const getColumns = () => [
    { key: 'customer_name', title: 'Customer Name' },
    { key: 'customer_email', title: 'Email' },
    { key: 'customer_mobile', title: 'Mobile' },
    { key: 'category', title: 'Category', render: v => v?.name || 'N/A' },
    { key: 'subcategories', title: 'Subcategories', render: v => v?.map(s => s.name).join(', ') || 'N/A' },
    {
      key: 'status', title: 'Status',
      render: v => {
        const cfg = statusConfig[v] || { label: v, color: 'bg-gray-100 text-gray-800' };
        return <span className={`px-2 py-1 rounded-full text-xs font-medium ${cfg.color}`}>{cfg.label}</span>;
      }
    },
    {
      key: 'quotation_status', title: 'Your Quotation',
      render: (_, record) => {
        if (!isSentToFreelancer(record)) return <Tag>Not Sent</Tag>;
        if (hasSubmittedQuotation(record)) {
          const q = record.freelancer_quotations.find(x => x.freelancer._id === user.id);
          return (
            <div>
              <Tag color="green" icon={<CheckCircleOutlined />}>Submitted</Tag>
              <div className="text-xs text-gray-500">
                ₹{q?.quotation?.grand_total} • {new Date(q.submitted_at).toLocaleDateString()}
              </div>
            </div>
          );
        }
        return <Tag color="orange" icon={<FileTextOutlined />}>Pending</Tag>;
      }
    },
    {
      key: 'actions', title: 'Actions',
      render: (_, record) => (
        <Space>
          <Button size="small" icon={<EyeOutlined />} onClick={() => {
            setSelectedLead(record);
            setDetailsDrawerVisible(true);
          }}>View</Button>

          {isSentToFreelancer(record) && !hasSubmittedQuotation(record) && (
            <Button type="primary" size="small" icon={<FileAddOutlined />}
              onClick={() => openCreateQuotationModal(record)}>
              Create Quotation
            </Button>
          )}

          {hasSubmittedQuotation(record) && (
            <Button size="small" type="dashed" onClick={() => openViewQuotationModal(record)}>
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
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Estimates & Quotations</h1>
        <p className="text-gray-600">Manage estimates sent to you and submit detailed quotations</p>
      </div>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card size="small" className="text-center">
          <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
          <div className="text-gray-600">Total Estimates</div>
        </Card>
        <Card size="small" className="text-center">
          <div className="text-2xl font-bold text-orange-600">{stats.pending}</div>
          <div className="text-gray-600">Pending Quotations</div>
        </Card>
        <Card size="small" className="text-center">
          <div className="text-2xl font-bold text-green-600">{stats.submitted}</div>
          <div className="text-gray-600">Submitted</div>
        </Card>
      </div>

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

      {/* Details Drawer */}
      <Drawer
        title="Estimate Details"
        placement="right"
        width={600}
        onClose={() => setDetailsDrawerVisible(false)}
        open={detailsDrawerVisible}
      >
        {selectedLead && (
          <div className="space-y-4">
            <Card title="Customer Info" size="small">
              <Row gutter={[16, 8]}>
                <Col span={12}><strong>Name:</strong> {selectedLead.customer_name}</Col>
                <Col span={12}><strong>Email:</strong> {selectedLead.customer_email}</Col>
                <Col span={12}><strong>Mobile:</strong> {selectedLead.customer_mobile}</Col>
                <Col span={12}><strong>Submitted:</strong> {new Date(selectedLead.submitted_at).toLocaleString()}</Col>
              </Row>
            </Card>
            <Card title="Service Details" size="small">
              <p><strong>Category:</strong> {selectedLead.category?.name}</p>
              <p><strong>Subcategories:</strong> {selectedLead.subcategories?.map(s => s.name).join(', ')}</p>
              <p><strong>Description:</strong> {selectedLead.description}</p>
            </Card>
          </div>
        )}
      </Drawer>

      {/* Create Quotation Modal */}
      <Modal
        title="Create Detailed Quotation"
        open={createModalVisible}
        onCancel={() => setCreateModalVisible(false)}
        footer={null}
        width={1000}
        destroyOnClose
      >
        {selectedEstimate && (
          <Form form={form} layout="vertical" onFinish={handleSubmitQuotation}>
            <div className="space-y-6 max-h-[75vh] overflow-y-auto pr-4">
              <Card size="small" title="Estimate Summary">
                <p><strong>Customer:</strong> {selectedEstimate.customer_name}</p>
                <p><strong>Service:</strong> {selectedEstimate.category?.name}</p>
                <p><strong>Description:</strong> {selectedEstimate.description}</p>
              </Card>

              <Card title={<div className="flex justify-between"><span>Items Breakdown</span><Button icon={<PlusOutlined />} onClick={addItem} type="dashed">Add Item</Button></div>}>
                <Table columns={itemColumns} dataSource={items} pagination={false} scroll={{ x: 900 }} rowKey={(_, i) => i} />
              </Card>

              <Card title="Financial Summary">
                <div className="text-right space-y-3">
                  <div>Subtotal: <strong className="text-xl">₹{subtotal.toLocaleString()}</strong></div>
                  <Form.Item name="discount_percent" label="Discount %">
                    <InputNumber min={0} max={100} addonAfter="%" style={{ width: 200 }} />
                  </Form.Item>
                  <div>Discount: <strong className="text-red-600">-₹{discountAmount.toLocaleString()}</strong></div>
                  <Divider />
                  <div className="text-2xl font-bold text-green-700">Grand Total: ₹{grandTotal.toLocaleString()}</div>
                </div>
              </Card>

              <Card title="Scope of Work">
                <Form.Item name="scope_of_work" rules={[{ required: true, message: 'Scope of work is required' }]}>
                  <TextArea rows={6} placeholder="Describe full scope, timeline, materials, exclusions..." />
                </Form.Item>
              </Card>

          

              <div className="text-right space-x-3">
                <Button onClick={() => setCreateModalVisible(false)}>Cancel</Button>
                <Button type="primary" loading={submitting} htmlType="submit">
                  Submit Quotation
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Modal>

      {/* View Submitted Quotation Modal */}
      <Modal
        title="Your Submitted Quotation"
        open={viewQuotationModal}
        onCancel={() => setViewQuotationModal(false)}
        footer={null}
        width={900}
      >
        {mySubmittedQuotation && (
          <div className="space-y-6">
            <div className="text-right text-3xl font-bold text-green-600">
              Grand Total: ₹{mySubmittedQuotation.grand_total?.toLocaleString()}
            </div>
            <Table
              dataSource={mySubmittedQuotation.items || []}
              columns={[
                { title: 'S.No', render: (_, __, i) => i + 1 },
                { title: 'Item', dataIndex: 'item' },
                { title: 'Description', dataIndex: 'description' },
                { title: 'Unit', dataIndex: 'unit' },
                { title: 'Qty', dataIndex: 'quantity' },
                { title: 'Rate (₹)', dataIndex: 'unit_price', render: v => v?.toLocaleString() },
                { title: 'Total (₹)', dataIndex: 'total', render: v => v?.toLocaleString() },
              ]}
              pagination={false}
            />
            <Card title="Scope of Work">
              <p className="whitespace-pre-wrap">{mySubmittedQuotation.scope_of_work}</p>
            </Card>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default QuotationLeadsList;