// src/pages/admin/Freelancers.jsx
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Space,
  Tag,
  Tooltip,
  Modal,
  Input,
  Tabs,
  Statistic,
  Popconfirm,
  Alert,
} from "antd";
import {
  FiPlus,
  FiRefreshCw,
  FiEye,
  FiCheck,
  FiX,
  FiUser,
  FiClock,
} from "react-icons/fi";
import moment from "moment";
import { apiService } from "../../../../../../manageApi/utils/custom.apiservice";
import CustomTable from "../../../custom/CustomTable";

const { TextArea } = Input;
const { TabPane } = Tabs;

// Role map
const roleSlugMap = {
  0: "superadmin",
  1: "admin",
  5: "vendor-b2c",
  6: "vendor-b2b",
  7: "freelancer",
  11: "accountant",
};

// Permission Hook - Same logic as ProductRequestB2C
const useFreelancerPermission = () => {
  const { permissions } = useSelector((s) => s.auth);
  const p = permissions?.["Xoto Partners→All Partners"] ?? {};

  return {
    canView: !!p.canView,
    canAdd: !!p.canAdd,
    canEdit: !!p.canEdit,
    canDelete: !!p.canDelete,
    canApprove: !!p.canEdit,
    canReject: !!p.canDelete,
  };
};

const Freelancers = () => {
  const navigate = useNavigate();
  const { token, user } = useSelector((s) => s.auth);
  const perm = useFreelancerPermission();

  const roleSlug = roleSlugMap[user?.role?.code] ?? "dashboard";

  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("pending");
  const [freelancers, setFreelancers] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalResults: 0,
    itemsPerPage: 10,
  });

  const [selectedFreelancer, setSelectedFreelancer] = useState(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  // Fetch Freelancers + Stats
  const fetchFreelancers = useCallback(
    async (page = 1, limit = 10) => {
      if (!token || !perm.canView) return;
      setLoading(true);

      try {
        const statusMap = { pending: 0, approved: 1, rejected: 2 };
        const res = await apiService.get("/freelancer", {
          page,
          limit,
          status: statusMap[activeTab],
        });

       
setFreelancers(res.freelancers)
        setPagination({
          currentPage: res.pagination?.page || 1,
          totalPages: res.pagination?.totalPages || 1,
          totalResults: res.pagination?.total || 0,
          itemsPerPage: res.pagination?.limit || 10,
        });

        // Stats from API or fallback
        setStats({
          total: res.stats?.total || 0,
          pending: res.stats?.pending || 0,
          approved: res.stats?.approved || 0,
          rejected: res.stats?.rejected || 0,
        });
      } catch (err) {
        console.error(err);
        setFreelancers([]);
      } finally {
        setLoading(false);
      }
    },
    [activeTab, token, perm.canView]
  );

  useEffect(() => {
    fetchFreelancers(pagination.currentPage, pagination.itemsPerPage);
  }, [activeTab, fetchFreelancers]);

  const handleTabChange = (key) => {
    setActiveTab(key);
    setPagination((p) => ({ ...p, currentPage: 1 }));
  };

  const handlePageChange = (page, limit) => {
    fetchFreelancers(page, limit);
  };

  const handleRefresh = () => fetchFreelancers(pagination.currentPage, pagination.itemsPerPage);

  const handleApprove = async (id) => {
    try {
      await apiService.put(`/freelancer/${id}/status`, { status: 1 });
      handleRefresh();
    } catch (err) {
      console.error(err);
    }
  };

  const openRejectModal = (record) => {
    setSelectedFreelancer(record);
    setRejectionReason("");
    setShowRejectModal(true);
  };

  const handleReject = async () => {
    if (!rejectionReason.trim()) return;
    try {
      await apiService.put(`/freelancer/${selectedFreelancer._id}/status`, {
        status: 2,
        rejection_reason: rejectionReason,
      });
      handleRefresh();
      setShowRejectModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  // Table Columns
  const columns = useMemo(
    () => [
      {
        title: "S.No",
        key: "sno",
        width: 80,
        render: (_, r) => <span className="font-medium">{r.sno}</span>,
      },
      {
        title: "Freelancer",
        width: 250,
        render: (_, r) => (
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
              style={{ backgroundColor: "#5C039B" }}
            >
              {r.name?.first_name?.[0]?.toUpperCase() || "F"}
            </div>
            <div>
              <div className="font-medium">
                {r.name?.first_name} {r.name?.last_name}
              </div>
              <div className="text-xs text-gray-500">{r.email}</div>
            </div>
          </div>
        ),
      },
      {
        title: "Mobile",
        width: 140,
        render: (_, r) => (
          <Space>
            {r.mobile}
            {r.is_mobile_verified && (
              <Tag color="green" icon={<FiCheck />}>
                Verified
              </Tag>
            )}
          </Space>
        ),
      },
      {
        title: "Location",
        width: 160,
        render: (_, r) => {
          const loc = [r.location?.city, r.location?.country].filter(Boolean).join(", ");
          return loc || "—";
        },
      },
      {
        title: "Services",
        width: 100,
        render: (_, r) => (
          <Tag color="purple">{r.services_offered?.length || 0}</Tag>
        ),
      },
      {
        title: "Status",
        width: 110,
        render: (_, r) => {
          const s = r.status_info?.status;
          const map = { 0: "orange", 1: "green", 2: "red" };
          const label = { 0: "Pending", 1: "Approved", 2: "Rejected" };
          return <Tag color={map[s]}>{label[s]}</Tag>;
        },
      },
      {
        title: "Registered",
        width: 130,
        render: (_, r) => moment(r.createdAt).format("DD/MM/YYYY"),
      },
      {
        title: "Actions",
        fixed: "right",
        width: 160,
        render: (_, r) => (
          <Space>
            <Button
  type="link"
  icon={<FiEye />}
  onClick={() =>
    navigate(`/dashboard/${roleSlug}/freelancer?freelancerId=${r._id}`)
  }
/>


            {activeTab === "pending" && perm.canApprove && (
              <Popconfirm
                title="Approve this freelancer?"
                onConfirm={() => handleApprove(r._id)}
              >
                <Button type="link" icon={<FiCheck />} className="text-green-600" />
              </Popconfirm>
            )}

            {activeTab === "pending" && perm.canReject && (
              <Button
                type="link"
                danger
                icon={<FiX />}
                onClick={() => openRejectModal(r)}
              />
            )}
          </Space>
        ),
      },
    ],
    [activeTab, perm.canApprove, perm.canReject, roleSlug, navigate]
  );

  if (!perm.canView) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold">Access Denied</h2>
        <p>You don't have permission to view freelancers.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <Card className="mb-6" bodyStyle={{ padding: "16px 24px" }}>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Freelancer Requests</h1>
            <p className="text-gray-500">Review and manage freelancer applications</p>
          </div>
          <Space>
            {/* {perm.canAdd && (
              <Button
                type="primary"
                icon={<FiPlus />}
                onClick={() => navigate("/sawtar/cms/freelancer/request")}
              >
                New Request
              </Button>
            )} */}
            <Button icon={<FiRefreshCw />} onClick={handleRefresh}>
              Refresh
            </Button>
          </Space>
        </div>
      </Card>

      {/* Tabs */}
      <Tabs activeKey={activeTab} onChange={handleTabChange} className="mb-6">
        <TabPane tab={`Pending `} key="pending" />
        <TabPane tab={`Approved `} key="approved" />
        <TabPane tab={`Rejected `} key="rejected" />
      </Tabs>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { title: "Total", value: stats.total, icon: FiUser, color: "#5C039B" },
          { title: "Pending", value: stats.pending, icon: FiClock, color: "#ff9800" },
          { title: "Approved", value: stats.approved, icon: FiCheck, color: "#4caf50" },
          { title: "Rejected", value: stats.rejected, icon: FiX, color: "#f44336" },
        ].map((s) => (
          <Card key={s.title} className="shadow-md">
            <Statistic
              title={s.title}
              value={s.value}
              prefix={<s.icon style={{ color: s.color }} />}
              valueStyle={{ color: s.color }}
            />
          </Card>
        ))}
      </div>

      {/* Table */}
      <Card bodyStyle={{ padding: 0 }}>
        <CustomTable
          columns={columns}
          data={freelancers}
          loading={loading}
          totalItems={pagination.totalResults}
          currentPage={pagination.currentPage}
          itemsPerPage={pagination.itemsPerPage}
          onPageChange={handlePageChange}
          scroll={{ x: 1400 }}
        />
      </Card>

      {/* Reject Modal */}
      <Modal
        open={showRejectModal}
        title="Reject Freelancer"
        onCancel={() => setShowRejectModal(false)}
        footer={null}
      >
        {selectedFreelancer && (
          <>
            <p className="font-medium mb-4">
              {selectedFreelancer.name?.first_name} {selectedFreelancer.name?.last_name}
            </p>
            <TextArea
              rows={4}
              placeholder="Reason for rejection (required)"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
            />
            <div className="mt-4 flex justify-end gap-2">
              <Button onClick={() => setShowRejectModal(false)}>Cancel</Button>
              <Button
                type="primary"
                danger
                disabled={!rejectionReason.trim()}
                onClick={handleReject}
              >
                Reject
              </Button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default Freelancers;