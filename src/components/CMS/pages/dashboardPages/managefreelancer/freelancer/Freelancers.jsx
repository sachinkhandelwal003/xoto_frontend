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
  Popconfirm,
  Alert,
  message,
  Badge,
  Typography,
  Avatar,
  Divider
} from "antd";
import {
  UserOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  EyeOutlined,
  CheckOutlined,
  CloseOutlined,
  PhoneOutlined,
  MailOutlined,
  GlobalOutlined,
  SafetyCertificateOutlined
} from "@ant-design/icons";
import moment from "moment";
import { apiService } from "../../../../../../manageApi/utils/custom.apiservice";
import CustomTable from "../../../custom/CustomTable";

const { TextArea } = Input;
const { TabPane } = Tabs;
const { Title, Text } = Typography;

// --- THEME CONFIGURATION ---
const PURPLE_THEME = {
  primary: '#722ed1',
  primaryLight: '#9254de',
  primaryBg: '#f9f0ff',
  success: '#52c41a',
  warning: '#faad14',
  error: '#ff4d4f',
};

// Role map
const roleSlugMap = {
  0: "superadmin",
  1: "admin",
  5: "vendor-b2c",
  6: "vendor-b2b",
  7: "freelancer",
  11: "accountant",
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

  // DEFAULT TAB SET TO 'approved'
  const [activeTab, setActiveTab] = useState("approved"); 
  const [loading, setLoading] = useState(true);
  const [freelancers, setFreelancers] = useState([]);
  
  // Kept stats only for Tab Badges (not for top cards)
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

  // Status UI Config
  const statusConfig = {
    0: { label: "Pending", color: "warning", icon: <ClockCircleOutlined />, bgColor: '#fff7e6', textColor: '#fa8c16' },
    1: { label: "Approved", color: "success", icon: <CheckCircleOutlined />, bgColor: '#f6ffed', textColor: '#52c41a' },
    2: { label: "Rejected", color: "error", icon: <CloseCircleOutlined />, bgColor: '#fff1f0', textColor: '#ff4d4f' },
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

        const res = await apiService.get("/freelancer", params);

        if (res.success) {
          setFreelancers(res.freelancers || []);
          
          const paginationData = res.pagination || {};
          setPagination({
            currentPage: paginationData.page || 1,
            totalPages: paginationData.totalPages || 1,
            totalResults: paginationData.total || 0,
            itemsPerPage: paginationData.limit || limit,
          });

          // Calculate stats for badges
          if (res.stats) {
            setStats(res.stats);
          } else {
             // Basic fallback (optional)
             const all = res.freelancers || [];
             setStats(prev => ({...prev, [activeTab]: all.length})); 
          }
        } else {
          message.error(res.message || "Failed to fetch freelancers");
          setFreelancers([]);
        }
      } catch (err) {
        console.error("Error fetching freelancers:", err);
        message.error("Failed to load freelancers");
      } finally {
        setLoading(false);
      }
    },
    [activeTab, token, perm.canView]
  );

  // Initial Fetch of Stats (for badges)
  const fetchStats = useCallback(async () => {
    try {
      const allRes = await apiService.get("/freelancer", { limit: 1 }); // Just to get stats object
      if (allRes.success && allRes.stats) {
        setStats(allRes.stats);
      }
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  }, []);

  useEffect(() => {
    fetchFreelancers(pagination.currentPage, pagination.itemsPerPage);
    fetchStats();
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
    fetchStats();
  };

  const handleApprove = async (id) => {
    setActionLoading(id);
    try {
      const response = await apiService.put(`/freelancer/${id}/status`, { status: 1 });
      if (response.success) {
        message.success("Freelancer approved successfully!");
        handleRefresh();
      } else {
        message.error(response.message || "Failed to approve freelancer");
      }
    } catch (err) {
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
      message.error("Failed to reject freelancer");
    } finally {
      setActionLoading(null);
    }
  };

  const handleViewDetails = (freelancer) => {
      navigate(`/dashboard/${roleSlug}/freelancer?freelancerId=${freelancer._id}`)
  };

  const formatMobile = (freelancer) => {
    if (freelancer.mobile) {
      if (typeof freelancer.mobile === 'object') {
        return `${freelancer.mobile.country_code} ${freelancer.mobile.number}`;
      }
      return freelancer.mobile;
    }
    return "—";
  };

  // --- COLUMNS ---
  const columns = useMemo(
    () => [
      {
        title: "Freelancer Profile",
        width: 280,
        render: (_, record) => (
          <div className="flex items-center gap-3">
            <Avatar 
                size={45} 
                style={{ background: PURPLE_THEME.primaryBg, color: PURPLE_THEME.primary, border: `1px solid ${PURPLE_THEME.primaryLighter}` }}
            >
                {record.name?.first_name?.[0]?.toUpperCase() || "F"}
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-gray-800 truncate">
                {record.name?.first_name} {record.name?.last_name}
              </div>
              <div className="text-xs text-gray-500 flex items-center gap-1">
                 <MailOutlined /> {record.email}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                Joined: {moment(record.createdAt).format("DD MMM YYYY")}
              </div>
            </div>
          </div>
        ),
      },
      {
        title: "Contact & Location",
        width: 200,
        render: (_, record) => {
             const location = [
                record.location?.city,
                record.location?.state
              ].filter(Boolean).join(", ");

            return (
              <Space direction="vertical" size={0}>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <PhoneOutlined className="text-gray-400"/>
                  <span>{formatMobile(record)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                    <GlobalOutlined className="text-gray-400"/>
                    <Tooltip title={`${location}, ${record.location?.country || ''}`}>
                        <span className="truncate max-w-[150px]">{location || "—"}</span>
                    </Tooltip>
                </div>
              </Space>
            )
        },
      },
      {
        title: "Professional Info",
        width: 150,
        render: (_, record) => (
            <Space direction="vertical" size={2}>
                <Tag color="purple">
                     <SafetyCertificateOutlined className="mr-1"/>
                     {record.professional?.experience_years || 0} Years Exp.
                </Tag>
                <div className="text-xs text-gray-500 pl-1">
                    {record.services_offered?.length || 0} Services Offered
                </div>
            </Space>
        ),
      },
      {
        title: "Status",
        width: 130,
        render: (_, record) => {
          const status = record.status_info?.status ?? 0;
          const config = statusConfig[status];
          return (
            <Tag color={config.color} style={{ borderRadius: 10, padding: '2px 10px', display: 'flex', width: 'fit-content', alignItems: 'center', gap: '4px' }}>
                {config.icon} {config.label}
            </Tag>
          );
        },
      },
      {
        title: "Actions",
        fixed: "right",
        width: 140,
        render: (_, record) => (
          <Space>
            <Tooltip title="View Details">
              <Button
                icon={<EyeOutlined />}
                size="small"
                onClick={() => handleViewDetails(record)}
              />
            </Tooltip>

            {/* Actions for Pending Tab */}
            {activeTab === "pending" && perm.canApprove && (
              <Tooltip title="Approve">
                <Popconfirm
                  title="Approve Freelancer"
                  description="Are you sure you want to approve this freelancer?"
                  onConfirm={() => handleApprove(record._id)}
                  okText="Yes"
                  cancelText="No"
                  okButtonProps={{ style: { background: '#52c41a' }}}
                >
                  <Button
                    type="primary"
                    size="small"
                    icon={<CheckOutlined />}
                    className="bg-green-600 hover:bg-green-500"
                    loading={actionLoading === record._id}
                  />
                </Popconfirm>
              </Tooltip>
            )}

            {activeTab === "pending" && perm.canReject && (
              <Tooltip title="Reject">
                <Button
                  type="primary"
                  danger
                  size="small"
                  icon={<CloseOutlined />}
                  onClick={() => openRejectModal(record)}
                  loading={actionLoading === record._id}
                />
              </Tooltip>
            )}
          </Space>
        ),
      },
    ],
    [activeTab, perm, actionLoading, navigate, roleSlug]
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

  // --- TAB CONFIGURATION ---
  // Re-ordering so Approved is first conceptually, but using keys to control content
  const tabItems = [
    {
        key: 'approved',
        label: 'Approved',
        icon: <CheckCircleOutlined />,
        count: stats.approved,
        color: '#52c41a'
    },
    {
        key: 'pending',
        label: 'Pending',
        icon: <ClockCircleOutlined />,
        count: stats.pending,
        color: '#fa8c16'
    },
    {
        key: 'rejected',
        label: 'Rejected',
        icon: <CloseCircleOutlined />,
        count: stats.rejected,
        color: '#ff4d4f'
    }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      
      {/* Header */}
      <div className="mb-6">
        <Title level={3}>Freelancer Management</Title>
        <Text type="secondary">Manage partners, view profiles, and handle approvals</Text>
      </div>

      {/* Filter Tabs */}
      <Card bodyStyle={{ padding: 0 }} className="mb-6 overflow-hidden rounded-lg shadow-sm border-none">
        <Tabs 
            activeKey={activeTab} 
            onChange={handleTabChange} 
            type="card" 
            size="large"
            tabBarStyle={{ margin: 0, background: '#fff' }}
        >
            {tabItems.map(item => (
                <TabPane 
                    tab={
                        <span className="flex items-center gap-2 px-4">
                            {item.icon}
                            {item.label}
                            {item.count > 0 && (
                                <Badge 
                                    count={item.count} 
                                    style={{ backgroundColor: item.color, marginLeft: 4 }} 
                                />
                            )}
                        </span>
                    }
                    key={item.key}
                />
            ))}
        </Tabs>
      </Card>

      {/* Data Table */}
      <Card bodyStyle={{ padding: '0px' }} className="shadow-sm border-none">
          <CustomTable
            columns={columns}
            data={freelancers}
            loading={loading}
            totalItems={pagination.totalResults}
            currentPage={pagination.currentPage}
            itemsPerPage={pagination.itemsPerPage}
            onPageChange={handlePageChange}
            scroll={{ x: 1000 }}
            rowKey="_id"
          />
      </Card>

      {/* Reject Modal */}
      <Modal
        open={showRejectModal}
        title={<span className="text-red-600"><CloseCircleOutlined /> Reject Application</span>}
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
            Confirm Rejection
          </Button>,
        ]}
        width={500}
      >
        {selectedFreelancer && (
          <div className="pt-2">
            <Alert
              message="Action Required"
              description="Please provide a valid reason for rejection. This will be sent to the freelancer."
              type="warning"
              showIcon
              className="mb-4"
            />
            
            <div className="mb-4 p-3 bg-gray-50 rounded border border-gray-200">
              <div className="flex items-center gap-2">
                <Avatar size="small" src={selectedFreelancer.avatar}>{selectedFreelancer.name?.first_name?.[0]}</Avatar>
                <div>
                    <div className="font-semibold text-sm">
                        {selectedFreelancer.name?.first_name} {selectedFreelancer.name?.last_name}
                    </div>
                    <div className="text-xs text-gray-500">{selectedFreelancer.email}</div>
                </div>
              </div>
            </div>

            <Text strong>Rejection Reason:</Text>
            <TextArea
              className="mt-2"
              rows={4}
              placeholder="E.g., Incomplete profile information, credentials not verified..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              maxLength={500}
              showCount
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Freelancers;