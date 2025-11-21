import React, { useState, useEffect } from 'react';
import { apiService } from '../../../../../manageApi/utils/custom.apiservice';
import CustomTable from '../../../pages/custom/CustomTable';
import { Drawer, List, Avatar, Button, Spin, Tabs, Modal, Table, Tag, Descriptions } from 'antd';
import { UserOutlined, EyeOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { showSuccessAlert, showErrorAlert, showConfirmDialog } from '../../../../../manageApi/utils/sweetAlert';

const LeadsList = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [supervisors, setSupervisors] = useState([]);
  const [supervisorsLoading, setSupervisorsLoading] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [quotationModal, setQuotationModal] = useState({ visible: false, data: null });

  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0
  });
  const [filters, setFilters] = useState({ status: 'pending' });

  // Status Labels
  const statusConfig = {
    pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
    assigned: { label: 'Assigned', color: 'bg-blue-100 text-blue-800' },
    final_created: { label: 'Final Created', color: 'bg-purple-100 text-purple-800' },
    superadmin_approved: { label: 'Approved & Sent', color: 'bg-green-100 text-green-800' },
    customer_accepted: { label: 'Customer Accepted', color: 'bg-emerald-100 text-emerald-800' },
    customer_rejected: { label: 'Customer Rejected', color: 'bg-red-100 text-red-800' },
  };

  // Fetch Leads
  const fetchLeads = async (page = 1, limit = 10, filterParams = {}) => {
    setLoading(true);
    try {
      const response = await apiService.get('/estimates', { page, limit, ...filterParams });
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

  // Table Columns
  const columns = [
    {
      title: 'Customer',
      render: (_, r) => <div className="font-medium">{r.customer_name}</div>
    },
    {
      title: 'Contact',
      render: (_, r) => (
        <div>
          <div className="text-sm">{r.customer_email}</div>
          <div className="text-xs text-gray-500">{r.customer_mobile}</div>
        </div>
      )
    },
    {
      title: 'Service',
      render: (_, r) => r.category?.name || 'N/A'
    },
    {
      title: 'Status',
      render: (_, r) => {
        const cfg = statusConfig[r.status] || { label: r.status, color: 'bg-gray-100 text-gray-800' };
        return <span className={`px-3 py-1 rounded-full text-xs font-medium ${cfg.color}`}>{cfg.label}</span>;
      }
    },
    {
  title: "Assigned Person",
  render: (_, r) => {
    const fullName = r.assigned_supervisor
      ? `${r.assigned_supervisor.name.first_name} ${r.assigned_supervisor.name.last_name}`
      : "N/A";

    const cfg = statusConfig[fullName] || {
      label: r.status,
      color: "bg-gray-100 text-gray-800"
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${cfg.color}`}
      >
        {fullName}
      </span>
    );
  }
}
,
    {
      title: 'Final Quotation',
      width: 280,
      render: (_, record) => {
        if (!record.final_quotation) return <span className="text-gray-400">Not created</span>;

        const q = record.final_quotation;
        const isApproved = q.superadmin_approved;

        return (
          <div className="space-y-2">
            <Button size="small" icon={<EyeOutlined />} onClick={() => viewQuotation(q)}>
              View Quotation
            </Button>
            <div className="text-xs">
              <div>Grand Total: <strong>AED {q.grand_total?.toLocaleString()}</strong></div>
              {q.discount_percent > 0 && <div className="text-green-600">Discount: {q.discount_percent}%</div>}
            </div>
            {isApproved ? (
              <Tag icon={<CheckCircleOutlined />} color="success">Sent to Customer</Tag>
            ) : record.status === 'final_created' ? (
              <Tag color="processing">Ready for Approval</Tag>
            ) : null}
          </div>
        );
      }
    },
    {
      title: 'Actions',
      render: (_, record) => {
        if (record.status === 'pending') {
          return <Button size="small" type="primary" onClick={() => openAssignDrawer(record)}>Assign Supervisor</Button>;
        }
        if (record.status === 'final_created') {
          return (
            <Button
              type="primary"
              size="small"
              className="bg-green-600 hover:bg-green-700"
              onClick={() => approveQuotation(record._id)}
            >
              Approve & Send to Customer
            </Button>
          );
        }
        if (record.status === 'superadmin_approved') {
          return <Tag color="success" icon={<CheckCircleOutlined />}>Sent to Customer</Tag>;
        }
        return null;
      }
    }
  ];

  const tabItems = [
    { key: 'pending', label: 'Pending' },
    { key: 'assigned', label: 'Assigned' },
    { key: 'final_created', label: 'Final Created' },
    { key: 'superadmin_approved', label: 'Approved & Sent' }
  ];

  useEffect(() => {
    fetchLeads(1, 10, { status: 'pending' });
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Leads Management</h1>
        <p className="text-gray-600 mt-2">Track and manage customer leads from submission to approval</p>
      </div>

      <Tabs activeKey={filters.status} onChange={handleTabChange} items={tabItems} className="mb-6" />

      <div className="bg-white rounded-lg shadow">
        <CustomTable
          columns={columns}
          data={leads}
          loading={loading}
          totalItems={pagination.totalItems}
          currentPage={pagination.currentPage}
          itemsPerPage={pagination.itemsPerPage}
          onPageChange={(page, size) => fetchLeads(page, size, filters)}
        />
      </div>

      {/* Final Quotation Modal */}
      <Modal
        title={<span className="text-2xl font-bold text-green-700">Final Quotation</span>}
        open={quotationModal.visible}
        onCancel={() => setQuotationModal({ visible: false, data: null })}
        footer={null}
        width={1000}
      >
        {quotationModal.data && (
          <div className="space-y-6 mt-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">Scope of Work</h3>
              <p className="text-gray-700">{quotationModal.data.scope_of_work}</p>
            </div>

            <Table
              dataSource={quotationModal.data.items}
              pagination={false}
              bordered
              rowKey="_id"
              title={() => <strong className="text-lg">Line Items</strong>}
            >
              <Table.Column title="S.No" dataIndex="sno" width={60} align="center" />
              <Table.Column title="Item" dataIndex="item" />
              <Table.Column title="Description" dataIndex="description" />
              <Table.Column title="Unit" dataIndex="unit" width={80} />
              <Table.Column title="Qty" dataIndex="quantity" width={80} align="center" />
              <Table.Column title="Rate" render={(_, r) => `AED ${r.unit_price}`} width={100} />
              <Table.Column title="Total" render={(_, r) => <strong>AED {r.total?.toLocaleString()}</strong>} width={120} />
            </Table>

            <div className="bg-gray-50 p-6 rounded-lg text-right space-y-2">
              <div className="text-lg">Subtotal: <strong>AED {quotationModal.data.subtotal?.toLocaleString()}</strong></div>
              {quotationModal.data.discount_percent > 0 && (
                <div className="text-green-600">
                  Discount ({quotationModal.data.discount_percent}%): -AED {quotationModal.data.discount_amount?.toLocaleString()}
                </div>
              )}
              <div className="text-2xl font-bold text-green-700">
                Grand Total: AED {quotationModal.data.grand_total?.toLocaleString()}
              </div>
              {quotationModal.data.superadmin_approved ? (
                <Tag icon={<CheckCircleOutlined />} color="success" className="mt-4 text-lg px-4 py-2">
                  Approved & Sent to Customer
                </Tag>
              ) : (
                <Tag color="processing" className="mt-4 text-lg px-4 py-2">Waiting for Superadmin Approval</Tag>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* Assign Supervisor Drawer */}
      <Drawer
        title="Assign Supervisor"
        open={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        width={400}
      >
        {selectedLead && (
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold">Lead Details</h4>
              <p className="mt-2"><strong>{selectedLead.customer_name}</strong></p>
              <p>{selectedLead.customer_email}</p>
              <p>{selectedLead.customer_mobile}</p>
              <p className="text-sm text-gray-600 mt-2">{selectedLead.category?.name}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Select Supervisor</h4>
              {supervisorsLoading ? (
                <Spin />
              ) : (
                <List
                  dataSource={supervisors}
                  renderItem={s => (
                    <List.Item actions={[<Button type="primary" size="small" onClick={() => assignSupervisor(s._id)}>Assign</Button>]}>
                      <List.Item.Meta
                        avatar={<Avatar icon={<UserOutlined />} />}
                        title={`${s.name?.first_name} ${s.name?.last_name}`}
                        description={s.email}
                      />
                    </List.Item>
                  )}
                />
              )}
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default LeadsList;