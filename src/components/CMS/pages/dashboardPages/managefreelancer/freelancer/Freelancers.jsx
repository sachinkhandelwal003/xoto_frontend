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
  message,
  Badge,
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
import { showConfirmDialog } from "../../../../../../manageApi/utils/sweetAlert";

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

// Status configuration
const STATUS_CONFIG = {
  0: { label: "Pending", color: "orange", badge: "processing" },
  1: { label: "Approved", color: "green", badge: "success" },
  2: { label: "Rejected", color: "red", badge: "error" },
};

// Permission Hook
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
  const [stats, setStats] = useState({ 
    total: 0, 
    pending: 0, 
    approved: 0, 
    rejected: 0 
  });

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalResults: 0,
    itemsPerPage: 10,
  });

  const [selectedFreelancer, setSelectedFreelancer] = useState(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [actionLoading, setActionLoading] = useState(null);

  // Status mapping for API
  const statusMap = { 
    pending: 0, 
    approved: 1, 
    rejected: 2 
  };

  // Fetch Freelancers
  const fetchFreelancers = useCallback(
    async (page = 1, limit = 10) => {
      if (!token || !perm.canView) return;
      setLoading(true);

      try {
        const params = {
          page,
          limit,
          status: statusMap[activeTab],
        };

        console.log("Fetching freelancers with params:", params);

        const res = await apiService.get("/freelancer", params);
        console.log("API Response:", res);

        if (res.success) {
          setFreelancers(res.freelancers || []);
          
          // Handle pagination
          const paginationData = res.pagination || {};
          setPagination({
            currentPage: paginationData.page || 1,
            totalPages: paginationData.totalPages || 1,
            totalResults: paginationData.total || 0,
            itemsPerPage: paginationData.limit || limit,
          });

          // Calculate stats from data if not provided by API
          if (res.stats) {
            setStats(res.stats);
          } else {
            // Fallback: Calculate from current data
            const allFreelancers = res.freelancers || [];
            setStats({
              total: paginationData.total || allFreelancers.length,
              pending: allFreelancers.filter(f => f.status_info?.status === 0).length,
              approved: allFreelancers.filter(f => f.status_info?.status === 1).length,
              rejected: allFreelancers.filter(f => f.status_info?.status === 2).length,
            });
          }
        } else {
          message.error(res.message || "Failed to fetch freelancers");
          setFreelancers([]);
        }
      } catch (err) {
        console.error("Error fetching freelancers:", err);
        message.error("Failed to load freelancers");
        setFreelancers([]);
      } finally {
        setLoading(false);
      }
    },
    [activeTab, token, perm.canView]
  );

  // Fetch stats separately
  const fetchStats = useCallback(async () => {
    try {
      const allRes = await apiService.get("/freelancer", { limit: 1000 });
      if (allRes.success) {
        const allFreelancers = allRes.freelancers || [];
        setStats({
          total: allRes.pagination?.total || allFreelancers.length,
          pending: allFreelancers.filter(f => f.status_info?.status === 0).length,
          approved: allFreelancers.filter(f => f.status_info?.status === 1).length,
          rejected: allFreelancers.filter(f => f.status_info?.status === 2).length,
        });
      }
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  }, []);

  useEffect(() => {
    fetchFreelancers(pagination.currentPage, pagination.itemsPerPage);
    // fetchStats();
  }, [activeTab, fetchFreelancers, fetchStats]);

  const handleTabChange = (key) => {
    setActiveTab(key);
    setPagination((p) => ({ ...p, currentPage: 1 }));
  };

  const handlePageChange = (page, limit) => {
    fetchFreelancers(page, limit);
  };

  const handleRefresh = () => {
    fetchFreelancers(pagination.currentPage, pagination.itemsPerPage);
  };

  const handleApprove = async (id) => {
    setActionLoading(id);
    try {
      const response = await apiService.put(`/freelancer/${id}/status`, { 
        status: 1 
      });

      if (response.success) {
        message.success("Freelancer approved successfully!");
        handleRefresh();
      } else {
        message.error(response.message || "Failed to approve freelancer");
      }
    } catch (err) {
      console.error("Error approving freelancer:", err);
      message.error("Failed to approve freelancer");
    } finally {
      setActionLoading(null);
    }
  };

  const openRejectModal = (record) => {
    setSelectedFreelancer(record);
    setRejectionReason("");
    setShowRejectModal(true);
  };

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      message.error("Please provide a rejection reason");
      return;
    }

    setActionLoading(selectedFreelancer._id);
    try {
      const response = await apiService.put(
        `/freelancer/${selectedFreelancer._id}/status`,
        {
          status: 2,
          rejection_reason: rejectionReason,
        }
      );

      if (response.success) {
        message.success("Freelancer rejected successfully!");
        handleRefresh();
        setShowRejectModal(false);
      } else {
        message.error(response.message || "Failed to reject freelancer");
      }
    } catch (err) {
      console.error("Error rejecting freelancer:", err);
      message.error("Failed to reject freelancer");
    } finally {
      setActionLoading(null);
    }
  };

  // Navigate to freelancer detail page
  const handleViewDetails = (freelancer) => {
    // navigate(`/dashboard/${roleSlug}/freelancer/${freelancer._id}`);
          navigate(`/dashboard/${roleSlug}/freelancer?freelancerId=${freelancer._id}`)

  };


  // Format mobile number
  const formatMobile = (freelancer) => {
    if (freelancer.mobile) {
      if (typeof freelancer.mobile === 'object') {
        return `${freelancer.mobile.country_code} ${freelancer.mobile.number}`;
      }
      return freelancer.mobile;
    }
    return "—";
  };

  // Table Columns
  const columns = useMemo(
    () => [
      {
        title: "Freelancer",
        width: 280,
        render: (_, record) => (
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
              style={{ backgroundColor: "#5C039B" }}
            >
              {record.name?.first_name?.[0]?.toUpperCase() || "F"}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-gray-800 truncate">
                {record.name?.first_name} {record.name?.last_name}
              </div>
              <div className="text-xs text-gray-500 truncate">{record.email}</div>
              <div className="text-xs text-gray-400 mt-1">
                Joined: {moment(record.createdAt).format("DD MMM YYYY")}
              </div>
            </div>
          </div>
        ),
      },
      {
        title: "Contact",
        width: 160,
        render: (_, record) => (
          <Space direction="vertical" size={2}>
            <div className="flex items-center gap-1 text-sm">
              <span>{formatMobile(record)}</span>
            </div>
            {record.is_mobile_verified && (
              <Tag color="green" icon={<FiCheck />} size="small">
                Verified
              </Tag>
            )}
          </Space>
        ),
      },
      {
        title: "Location",
        width: 150,
        render: (_, record) => {
          const location = [
            record.location?.city,
            record.location?.state,
            record.location?.country,
          ]
            .filter(Boolean)
            .join(", ");
          return (
            <Tooltip title={location}>
              <div className="text-sm">
                <span className="truncate">{location || "—"}</span>
              </div>
            </Tooltip>
          );
        },
      },
      {
        title: "Experience",
        width: 120,
        render: (_, record) => (
          <div className="text-center">
            <Tag color="blue">
              {record.professional?.experience_years || 0} years
            </Tag>
          </div>
        ),
      },
      {
        title: "Services",
        width: 100,
        render: (_, record) => (
          <Badge 
            count={record.services_offered?.length || 0} 
            showZero 
            color="#5C039B"
          >
            <div className="text-center">
              <Tag color="purple">{record.services_offered?.length || 0}</Tag>
            </div>
          </Badge>
        ),
      },
      {
        title: "Status",
        width: 120,
        render: (_, record) => {
          const status = record.status_info?.status ?? 0;
          const config = STATUS_CONFIG[status];
          return (
            <Badge 
              status={config.badge} 
              text={config.label}
              className="font-medium"
            />
          );
        },
      },
      {
        title: "Registered",
        width: 130,
        render: (_, record) => moment(record.createdAt).format("DD/MM/YYYY"),
      },
      {
        title: "Actions",
        fixed: "right",
        width: 180,
        render: (_, record) => (
          <Space>
            <Tooltip title="View Full Details">
              <Button
                type="link"
                icon={<FiEye />}
                onClick={() => handleViewDetails(record)}
                className="text-blue-600"
              />
            </Tooltip>

            {activeTab === "pending" && perm.canApprove && (
              <Tooltip title="Approve">
                <Popconfirm
                  title="Approve Freelancer"
                  description="Are you sure you want to approve this freelancer?"
                  onConfirm={() => handleApprove(record._id)}
                  okText="Yes"
                  cancelText="No"
                  okType="primary"
                >
                  <Button
                    type="link"
                    icon={<FiCheck />}
                    className="text-green-600"
                    loading={actionLoading === record._id}
                  />
                </Popconfirm>
              </Tooltip>
            )}

            {activeTab === "pending" && perm.canReject && (
              <Tooltip title="Reject">
                <Button
                  type="link"
                  danger
                  icon={<FiX />}
                  onClick={() => openRejectModal(record)}
                  loading={actionLoading === record._id}
                />
              </Tooltip>
            )}
          </Space>
        ),
      },
    ],
    [activeTab, perm.canApprove, perm.canReject, actionLoading, roleSlug, navigate]
  );

  if (!perm.canView) {
    return (
      <div className="p-6 text-center">
        <Alert
          message="Access Denied"
          description="You don't have permission to view freelancers."
          type="error"
          showIcon
        />
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <Card className="mb-6 shadow-sm" bodyStyle={{ padding: "20px 24px" }}>
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-1">
              Freelancer Management
            </h1>
            <p className="text-gray-600">
              Review and manage freelancer applications and profiles
            </p>
          </div>
        
        </div>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { 
            title: "Total Freelancers", 
            value: stats.total, 
            icon: <FiUser style={{ color: "#5C039B" }} />, 
            color: "#5C039B" 
          },
          { 
            title: "Pending Review", 
            value: stats.pending, 
            icon: <FiClock style={{ color: "#fa8c16" }} />, 
            color: "#fa8c16" 
          },
          { 
            title: "Approved", 
            value: stats.approved, 
            icon: <FiCheck style={{ color: "#52c41a" }} />, 
            color: "#52c41a" 
          },
          { 
            title: "Rejected", 
            value: stats.rejected, 
            icon: <FiX style={{ color: "#ff4d4f" }} />, 
            color: "#ff4d4f" 
          },
        ].map((stat, index) => (
          <Card key={stat.title} className="shadow-sm hover:shadow-md transition-shadow">
            <Statistic
              title={stat.title}
              value={stat.value}
              prefix={stat.icon}
              valueStyle={{ color: stat.color, fontWeight: 600 }}
            />
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Card className="shadow-sm">
        <Tabs 
          activeKey={activeTab} 
          onChange={handleTabChange}
          type="card"
        >
          <TabPane 
            tab={
              <span>
                Pending
                {stats.pending > 0 && (
                  <Badge count={stats.pending} offset={[10, -5]} />
                )}
              </span>
            } 
            key="pending" 
          />
          <TabPane 
            tab={
              <span>
                Approved
                {stats.approved > 0 && (
                  <Badge count={stats.approved} offset={[10, -5]} />
                )}
              </span>
            } 
            key="approved" 
          />
          <TabPane 
            tab={
              <span>
                Rejected
                {stats.rejected > 0 && (
                  <Badge count={stats.rejected} offset={[10, -5]} />
                )}
              </span>
            } 
            key="rejected" 
          />
        </Tabs>

        {/* Table */}
        <div className="mt-4">
          <CustomTable
            columns={columns}
            data={freelancers}
            loading={loading}
            totalItems={pagination.totalResults}
            currentPage={pagination.currentPage}
            itemsPerPage={pagination.itemsPerPage}
            onPageChange={handlePageChange}
            scroll={{ x: 1200 }}
            rowKey="_id"
          />
        </div>
      </Card>

      {/* Reject Modal */}
      <Modal
        open={showRejectModal}
        title="Reject Freelancer Application"
        onCancel={() => setShowRejectModal(false)}
        footer={[
          <Button key="cancel" onClick={() => setShowRejectModal(false)}>
            Cancel
          </Button>,
          <Button
            key="reject"
            type="primary"
            danger
            loading={actionLoading === selectedFreelancer?._id}
            disabled={!rejectionReason.trim()}
            onClick={handleReject}
          >
            Reject Application
          </Button>,
        ]}
        width={500}
      >
        {selectedFreelancer && (
          <>
            <Alert
              message="Rejection Reason Required"
              description="Please provide a clear reason for rejecting this freelancer's application. This will be visible to the freelancer."
              type="warning"
              showIcon
              className="mb-4"
            />
            
            <div className="mb-4 p-3 bg-gray-50 rounded">
              <div className="font-semibold">
                {selectedFreelancer.name?.first_name} {selectedFreelancer.name?.last_name}
              </div>
              <div className="text-sm text-gray-600">{selectedFreelancer.email}</div>
            </div>

            <TextArea
              rows={4}
              placeholder="Enter detailed reason for rejection..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              maxLength={500}
              showCount
            />
          </>
        )}
      </Modal>
    </div>
  );
};

export default Freelancers;