// src/pages/admin/VendorB2C.jsx
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  FiPlus,
  FiRefreshCw,
  FiEye,
  FiCheck,
  FiX,
  FiUser,
  FiClock,
  FiShoppingBag,
} from "react-icons/fi";
import { Button, Card, Modal, Input, Tabs, Statistic, Tag, Space } from "antd";
import CustomTable from "../../custom/CustomTable";
import { apiService } from "../../../../../manageApi/utils/custom.apiservice";
import { showToast } from "../../../../../manageApi/utils/toast";

const { TextArea } = Input;
const { TabPane } = Tabs;

const roleSlugMap = {
  0: "superadmin",
  1: "admin",
  5: "vendor-b2c",
  6: "vendor-b2b",
  7: "freelancer",
  11: "accountant",
};

const useVendorPermission = () => {
  const { permissions } = useSelector((s) => s.auth);
  const p = permissions?.["Request→All Sellers"] ?? {};

  return {
    canView: !!p.canView,
    canAdd: !!p.canAdd,
    canEdit: !!p.canEdit,
    canDelete: !!p.canDelete,
    canApprove: !!p.canEdit,
    canReject: !!p.canDelete,
  };
};

const VendorB2C = () => {
  const navigate = useNavigate();
  const { user, token } = useSelector((s) => s.auth);
  const perm = useVendorPermission();

  const roleSlug = roleSlugMap[user?.role?.code] ?? "dashboard";

  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("pending");
  const [vendors, setVendors] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalResults: 0,
    itemsPerPage: 10,
  });

  const [selectedVendor, setSelectedVendor] = useState(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  const fetchVendors = useCallback(
    async (page = 1, limit = 10) => {
      if (!token || !perm.canView) return;
      setLoading(true);

      try {
        const statusMap = { pending: 0, approved: 1, rejected: 2 };
        const res = await apiService.get("/vendor/b2c", {
          page,
          limit,
          status: statusMap[activeTab],
        });

        const data = (res.vendors || []).map((v, i) => {
          const fullName = `${v.name?.first_name || ""} ${v.name?.last_name || ""}`.trim() || "—";
          const mobile = v.mobile ? `${v.mobile.country_code}${v.mobile.number}` : "—";
          const categories = v.store_details?.categories
            ? v.store_details.categories.map(c => c.name).join(", ")
            : "—";

          return {
            ...v,
            key: v._id,
            sno: (page - 1) * limit + i + 1,
            full_name: fullName,
            email: v.email || "—",
            mobile: mobile,
            store_name: v.store_details?.store_name || "—",
            store_type: v.store_details?.store_type || "—",
            categories: categories,
            status: v.status_info?.status || 0,
            rejection_reason: v.status_info?.rejection_reason || "",
            created_at: v.meta?.created_at || v.createdAt,
          };
        });

        setVendors(data);

        setPagination({
          currentPage: res.pagination?.page || 1,
          totalPages: res.pagination?.totalPages || 1,
          totalResults: res.pagination?.total || 0,
          itemsPerPage: res.pagination?.limit || 10,
        });

        setStats({
          total: res.stats?.total || 0,
          pending: res.stats?.pending || 0,
          approved: res.stats?.approved || 0,
          rejected: res.stats?.rejected || 0,
        });
      } catch (err) {
        showToast(err.response?.data?.message || "Failed to load vendors", "error");
        setVendors([]);
      } finally {
        setLoading(false);
      }
    },
    [activeTab, token, perm.canView]
  );

  useEffect(() => {
    fetchVendors(pagination.currentPage, pagination.itemsPerPage);
  }, [activeTab, fetchVendors]);

  const handleTabChange = (key) => {
    setActiveTab(key);
    setPagination((p) => ({ ...p, currentPage: 1 }));
  };

  const handlePageChange = (page, limit) => {
    fetchVendors(page, limit);
  };

  const handleRefresh = () => {
    fetchVendors(pagination.currentPage, pagination.itemsPerPage);
  };

  const handleApprove = async (id) => {
    try {
      await apiService.put(`/vendor/b2c/${id}/status`, { status: 1 });
      showToast("Vendor approved successfully", "success");
      handleRefresh();
    } catch (err) {
      showToast("Approval failed", "error");
    }
  };

  const openRejectModal = (vendor) => {
    setSelectedVendor(vendor);
    setRejectionReason("");
    setShowRejectModal(true);
  };

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      showToast("Rejection reason is required", "error");
      return;
    }
    try {
      await apiService.put(`/vendor/b2c/${selectedVendor._id}/status`, {
        status: 2,
        rejection_reason: rejectionReason,
      });
      showToast("Vendor rejected", "success");
      handleRefresh();
      setShowRejectModal(false);
    } catch (err) {
      showToast("Rejection failed", "error");
    }
  };

  const columns = useMemo(
    () => [
    
      {
        title: "Vendor",
        width: 280,
        render: (_, r) => (
          <div>
            <div className="font-semibold text-gray-900">{r.full_name}</div>
            <div className="text-sm text-gray-500">{r.email}</div>
            <div className="text-xs text-purple-600 font-medium mt-1">
              {r.store_name}
            </div>
          </div>
        ),
      },
      {
        title: "Mobile",
        width: 140,
        render: (_, r) => (
          <Space direction="vertical" size={0}>
            <span>{r.mobile}</span>
            {r.is_mobile_verified && <Tag color="green" className="text-xs">Verified</Tag>}
          </Space>
        ),
      },
      {
        title: "Categories",
        width: 200,
        render: (_, r) => (
          <div className="text-sm">
            {r.categories}
          </div>
        ),
      },
      {
        title: "Store Type",
        width: 160,
        render: (_, r) => r.store_type,
      },
      {
        title: "Status",
        width: 130,
        render: (_, r) => {
          const status = r.status;
          const map = { 0: "warning", 1: "success", 2: "error" };
          const label = { 0: "Pending", 1: "Approved", 2: "Rejected" };
          return (
            <div>
              <Tag color={map[status]}>{label[status]}</Tag>
              {status === 2 && r.rejection_reason && (
                <div className="text-xs text-red-600 mt-1 max-w-xs truncate">
                  {r.rejection_reason}
                </div>
              )}
            </div>
          );
        },
      },
      {
        title: "Registered",
        width: 120,
        render: (_, r) =>
          r.created_at
            ? new Date(r.created_at).toLocaleDateString("en-GB")
            : "—",
      },
      {
        title: "Actions",
        fixed: "right",
        width: 180,
        render: (_, r) => (
          <Space>
            <Button
              type="link"
              size="small"
              icon={<FiEye />}
              onClick={() => navigate(`/dashboard/${roleSlug}/seller/${r._id}`)}
            />

            {activeTab === "pending" && perm.canApprove && (
              <Button
                type="link"
                size="small"
                icon={<FiCheck />}
                className="text-green-600"
                onClick={() => handleApprove(r._id)}
              />
            )}

            {activeTab === "pending" && perm.canReject && (
              <Button
                type="link"
                size="small"
                danger
                icon={<FiX />}
                onClick={() => openRejectModal(r)}
              />
            )}

            <Button
              type="link"
              size="small"
              icon={<FiShoppingBag />}
              className="text-purple-600"
              onClick={() =>
                navigate(`/dashboard/${roleSlug}/seller/product/${r._id}`)
              }
            >
              Products
            </Button>
          </Space>
        ),
      },
    ],
    [activeTab, perm.canApprove, perm.canReject, roleSlug, navigate]
  );

  if (!perm.canView) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-2xl font-bold text-red-600">Access Denied</h2>
        <p className="text-gray-600 mt-2">You don't have permission to view B2C vendors.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <Card className="mb-6 shadow-sm">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">B2C Vendor Requests</h1>
            <p className="text-gray-500">Manage and approve B2C seller applications</p>
          </div>
          <Button
            type="primary"
            icon={<FiRefreshCw />}
            onClick={handleRefresh}
            loading={loading}
          >
            Refresh
          </Button>
        </div>
      </Card>

      {/* Tabs */}
      <Tabs activeKey={activeTab} onChange={handleTabChange} className="mb-6">
        <TabPane tab={`Pending (${stats.pending})`} key="pending" />
        <TabPane tab={`Approved (${stats.approved})`} key="approved" />
        <TabPane tab={`Rejected (${stats.rejected})`} key="rejected" />
      </Tabs>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { title: "Total Vendors", value: stats.total, icon: FiUser, color: "#5C039B" },
          { title: "Pending", value: stats.pending, icon: FiClock, color: "#ff9800" },
          { title: "Approved", value: stats.approved, icon: FiCheck, color: "#4caf50" },
          { title: "Rejected", value: stats.rejected, icon: FiX, color: "#f44336" },
        ].map((s) => (
          <Card key={s.title} className="shadow-md hover:shadow-lg transition-shadow">
            <Statistic
              title={s.title}
              value={s.value}
              prefix={<s.icon className="text-xl" style={{ color: s.color }} />}
              valueStyle={{ color: s.color, fontWeight: "bold" }}
            />
          </Card>
        ))}
      </div>

      {/* Table */}
      <Card bodyStyle={{ padding: 0 }}>
        <CustomTable
          columns={columns}
          data={vendors}
          loading={loading}
          totalItems={pagination.totalResults}
          currentPage={pagination.currentPage}
          itemsPerPage={pagination.itemsPerPage}
          onPageChange={handlePageChange}
          scroll={{ x: 1500 }}
        />
      </Card>

      {/* Reject Modal */}
      <Modal
        title="Reject Vendor Application"
        open={showRejectModal}
        onCancel={() => setShowRejectModal(false)}
        footer={null}
        width={500}
      >
        {selectedVendor && (
          <div>
            <p className="mb-4">
              <strong>Vendor:</strong> {selectedVendor.full_name}<br />
              <strong>Store:</strong> {selectedVendor.store_name}
            </p>
            <TextArea
              rows={4}
              placeholder="Please provide a reason for rejection (required)"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="mb-4"
            />
            <div className="flex justify-end gap-3">
              <Button onClick={() => setShowRejectModal(false)}>Cancel</Button>
              <Button
                type="primary"
                danger
                onClick={handleReject}
                disabled={!rejectionReason.trim()}
              >
                Reject Vendor
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default VendorB2C;