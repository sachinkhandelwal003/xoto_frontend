// src/pages/admin/Freelancers.jsx
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Drawer,
  Card,
  Space,
  Tag,
  Tooltip,
  Spin,
  Typography,
  Descriptions,
  Divider,
  Modal,
  Input,
  Tabs,
  Badge,
  Popconfirm,
  Image,
  Alert,
} from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EyeOutlined,
  UserOutlined,
  MobileOutlined,
  EnvironmentOutlined,
  TagsOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { apiService } from "../../../../../../manageApi/utils/custom.apiservice";
import CustomTable from "../../../custom/CustomTable";

const { Title, Text } = Typography;
const { TextArea } = Input;

/* --------------------------------------------------------------
   Role → slug map (your existing map)
   -------------------------------------------------------------- */
const roleSlugMap = {
  0: "superadmin",
  1: "admin",
  5: "vendor-b2c",
  6: "vendor-b2b",
  7: "freelancer",
  11: "accountant",
};

const Freelancers = () => {
  const navigate = useNavigate();
  const { token, user, permissions } = useSelector((s) => s.auth);

  /* ---------- Role & Permission logic ---------- */
  const roleSlug = roleSlugMap[user?.role?.code] ?? "dashboard";
  const isAdmin = ["superadmin", "admin"].includes(roleSlug);

  // <--  NEW: Use the exact key you posted
  const partnerPerm = permissions?.["Xoto Partners→All Partners"] ?? {};

  const canView   = isAdmin || !!partnerPerm.canView;
  const canEdit   = isAdmin || !!partnerPerm.canEdit;
  const canAdd    = isAdmin || !!partnerPerm.canAdd;      // for “New Request”
  const canDelete = isAdmin || !!partnerPerm.canDelete;   // (future use)
  const canViewAll = isAdmin || !!partnerPerm.canViewAll; // (future use)

  /* ---------- UI state ---------- */
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("pending");
  const [freelancers, setFreelancers] = useState([]);
  const [selectedFreelancer, setSelectedFreelancer] = useState(null);
  const [detailDrawerOpen, setDetailDrawerOpen] = useState(false);
  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [rejectingId, setRejectingId] = useState(null);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalResults: 0,
    itemsPerPage: 10,
  });

  const statusMap = { pending: 0, approved: 1, rejected: 2 };
  const statusColors = { 0: "orange", 1: "green", 2: "red" };
  const statusLabels = { 0: "Pending", 1: "Approved", 2: "Rejected" };

  /* --------------------- FETCH --------------------- */
  const fetchFreelancers = useCallback(
    async (page = 1, limit = 10) => {
      if (!token || !canView) return;
      setLoading(true);
      try {
        const params = { page, limit, status: statusMap[activeTab] };
        const { freelancers = [], pagination: pag = {} } = await apiService.get(
          "/freelancer",
          params
        );
        setFreelancers(freelancers);
        setPagination({
          currentPage: pag.page ?? 1,
          totalPages: pag.totalPages ?? 1,
          totalResults: pag.total ?? 0,
          itemsPerPage: pag.limit ?? 10,
        });
      } catch (err) {
        console.error("Fetch freelancers error:", err);
      } finally {
        setLoading(false);
      }
    },
    [activeTab, token, canView]
  );

  useEffect(() => {
    fetchFreelancers(pagination.currentPage, pagination.itemsPerPage);
  }, [activeTab, fetchFreelancers]);

  const handlePageChange = (page, limit) => fetchFreelancers(page, limit);

  /* --------------------- STATUS UPDATE --------------------- */
  const updateStatus = async (id, status, reason = "") => {
    if (!canEdit) return;
    try {
      const payload = { status };
      if (status === 2 && reason.trim()) payload.rejection_reason = reason.trim();
      await apiService.put(`/freelancer/${id}/status`, payload);
      fetchFreelancers(pagination.currentPage, pagination.itemsPerPage);
    } catch (err) {
      console.error("Update status error:", err);
    } finally {
      setRejectModalVisible(false);
      setRejectionReason("");
      setRejectingId(null);
    }
  };

  /* --------------------- REJECT MODAL --------------------- */
  const openRejectModal = (freelancer) => {
    setSelectedFreelancer(freelancer);
    setRejectingId(freelancer._id);
    setRejectionReason("");
    setRejectModalVisible(true);
  };
  const closeRejectModal = () => {
    setRejectModalVisible(false);
    setSelectedFreelancer(null);
    setRejectingId(null);
    setRejectionReason("");
  };

  /* --------------------- DETAIL DRAWER --------------------- */
  const openDetailDrawer = (freelancer) => {
    setSelectedFreelancer(freelancer);
    setDetailDrawerOpen(true);
  };

  /* --------------------- NAVIGATE TO PROFILE --------------------- */
  const goToProfile = (id) => {
    navigate(`/sawtar/dashboard/${roleSlug}/freelancer/${id}`);
  };

  /* --------------------- TABLE COLUMNS --------------------- */
  const columns = useMemo(
    () => [
      {
        key: "sno",
        title: "S.No",
        width: 70,
        render: (_, __, idx) => {
          const page = pagination.currentPage ?? 1;
          const perPage = pagination.itemsPerPage ?? 10;
          return (page - 1) * perPage + idx + 1;
        },
      },
      {
        key: "name",
        title: "Freelancer",
        width: 200,
        render: (_, r) => (
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
              style={{ backgroundColor: "#14b8a6" }}
            >
              {r.name?.first_name?.[0]?.toUpperCase() || "F"}
            </div>
            <div>
              <div className="font-medium">
                {r.name?.first_name} {r.name?.last_name}
              </div>
              <Text type="secondary" className="text-xs">
                {r.email}
              </Text>
            </div>
          </div>
        ),
      },
      {
        key: "mobile",
        title: "Mobile",
        width: 140,
        render: (_, r) => (
          <Space>
            <Text>{r.mobile}</Text>
            {r.is_mobile_verified && (
              <Tag icon={<CheckCircleOutlined />} color="success">
                Verified
              </Tag>
            )}
          </Space>
        ),
      },
      {
        key: "location",
        title: "Location",
        width: 140,
        render: (_, r) => {
          const city = r.location?.city;
          const country = r.location?.country;
          const loc = city && country ? `${city}, ${country}` : city || country || "—";
          return <Text>{loc}</Text>;
        },
      },
      {
        key: "services",
        title: "Services",
        width: 110,
        render: (_, r) => (
          <Tag color="blue" icon={<TagsOutlined />}>
            {r.services_offered?.length ?? 0}
          </Tag>
        ),
      },
      {
        key: "status",
        title: "Status",
        width: 110,
        render: (_, r) => {
          const s = r.status_info?.status ?? 0;
          return <Tag color={statusColors[s]}>{statusLabels[s]}</Tag>;
        },
      },
      {
        key: "createdAt",
        title: "Registered",
        width: 120,
        render: (_, r) => moment(r.createdAt).format("DD MMM YYYY"),
      },
      {
        key: "actions",
        title: "Actions",
        width: 180,
        fixed: "right",
        render: (_, r) => (
          <Space>
            <Tooltip title="View Details">
              <Button size="small" icon={<EyeOutlined />} onClick={() => goToProfile(r._id)} />
            </Tooltip>


            {/* Approve / Reject – only for pending & when canEdit */}
            {activeTab === "pending" && canEdit && (
              <>
                <Popconfirm
                  title="Approve this freelancer?"
                  onConfirm={() => updateStatus(r._id, 1)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button size="small" type="primary" icon={<CheckCircleOutlined />} />
                </Popconfirm>

                <Tooltip title="Reject">
                  <Button
                    size="small"
                    danger
                    icon={<CloseCircleOutlined />}
                    onClick={() => openRejectModal(r)}
                  />
                </Tooltip>
              </>
            )}
          </Space>
        ),
      },
    ],
    [activeTab, pagination, canEdit, roleSlug]
  );

  /* --------------------- RENDER --------------------- */
  if (!canView) {
    return (
      <div className="p-6 text-center">
        <Title level={4}>Access Denied</Title>
        <Text>You don't have permission to view Freelancers.</Text>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <Title level={3}>Freelancer Management</Title>
          <Text type="secondary">
            Review, approve, or reject freelancer applications
          </Text>
        </div>

        {/* NEW REQUEST – only when canAdd */}
        {canAdd && (
          <Button
            type="primary"
            icon={<UserOutlined />}
            onClick={() => navigate("/sawtar/cms/freelancer/request")}
          >
            New Request
          </Button>
        )}
      </div>

      {/* Tabs */}
      <Tabs activeKey={activeTab} onChange={setActiveTab} className="mb-4">
        {["pending", "approved", "rejected"].map((tab) => {
          const count = activeTab === tab ? pagination.totalResults : 0;
          return (
            <Tabs.TabPane
              key={tab}
              tab={
                <span>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  {count > 0 && (
                    <Badge
                      count={count}
                      style={{ marginLeft: 8, backgroundColor: "#14b8a6" }}
                    />
                  )}
                </span>
              }
            />
          );
        })}
      </Tabs>

      {/* Table */}
      <Card bodyStyle={{ padding: 0 }}>
        <CustomTable
          columns={columns}
          data={freelancers}
          totalItems={pagination.totalResults}
          currentPage={pagination.currentPage}
          itemsPerPage={pagination.itemsPerPage}
          onPageChange={handlePageChange}
          loading={loading}
          scroll={{ x: 1350 }}
        />
      </Card>

      {/* ---------- DETAIL DRAWER ---------- */}
      <Drawer
        title="Freelancer Details"
        open={detailDrawerOpen}
        onClose={() => setDetailDrawerOpen(false)}
        width={700}
        destroyOnClose
      >
        {selectedFreelancer && (
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold"
                style={{ backgroundColor: "#14b8a6" }}
              >
                {selectedFreelancer.name?.first_name?.[0]?.toUpperCase() || "F"}
              </div>
              <div>
                <Title level={4} className="mb-0">
                  {selectedFreelancer.name?.first_name} {selectedFreelancer.name?.last_name}
                </Title>
                <Text type="secondary">{selectedFreelancer.email}</Text>
              </div>
            </div>

            <Descriptions bordered column={2}>
              <Descriptions.Item label="Mobile" span={1}>
                <Space>
                  <MobileOutlined />
                  {selectedFreelancer.mobile}
                  {selectedFreelancer.is_mobile_verified && (
                    <Tag color="green" icon={<CheckCircleOutlined />}>
                      Verified
                    </Tag>
                  )}
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="Location" span={1}>
                <Space>
                  <EnvironmentOutlined />
                  {selectedFreelancer.location?.city && `${selectedFreelancer.location.city}, `}
                  {selectedFreelancer.location?.country || "—"}
                </Space>
              </Descriptions.Item>

              <Descriptions.Item label="Services Offered" span={2}>
                <Space wrap>
                  {selectedFreelancer.services_offered?.length > 0 ? (
                    selectedFreelancer.services_offered.map((s, i) => (
                      <Tag key={i} color="blue">
                        {s}
                      </Tag>
                    ))
                  ) : (
                    <Text type="secondary">None</Text>
                  )}
                </Space>
              </Descriptions.Item>

              <Descriptions.Item label="Skills" span={2}>
                <Space wrap>
                  {selectedFreelancer.skills?.length > 0 ? (
                    selectedFreelancer.skills.map((skill, i) => (
                      <Tag key={i} color="purple">
                        {skill}
                      </Tag>
                    ))
                  ) : (
                    <Text type="secondary">No skills listed</Text>
                  )}
                </Space>
              </Descriptions.Item>

              <Descriptions.Item label="Status" span={1}>
                <Tag
                  color={statusColors[selectedFreelancer.status_info?.status ?? 0]}
                >
                  {statusLabels[selectedFreelancer.status_info?.status ?? 0]}
                </Tag>
              </Descriptions.Item>

              <Descriptions.Item label="Registered" span={1}>
                <Space>
                  <CalendarOutlined />
                  {moment(selectedFreelancer.createdAt).format(
                    "DD MMM YYYY, HH:mm"
                  )}
                </Space>
              </Descriptions.Item>
            </Descriptions>

            {/* Rejection Reason */}
            {selectedFreelancer.status_info?.status === 2 &&
              selectedFreelancer.status_info?.rejection_reason && (
                <>
                  <Divider />
                  <Alert
                    message="Rejection Reason"
                    description={selectedFreelancer.status_info.rejection_reason}
                    type="error"
                    showIcon
                  />
                </>
              )}

            {/* Documents */}
            {selectedFreelancer.documents?.length > 0 && (
              <>
                <Divider />
                <Title level={5}>Documents</Title>
                <Space wrap>
                  {selectedFreelancer.documents.map((doc, i) => (
                    <Card key={i} size="small" style={{ width: 200 }}>
                      <Image
                        src={doc.url}
                        alt={doc.type}
                        width="100%"
                        height={120}
                        style={{ objectFit: "cover" }}
                        preview
                      />
                      <Text strong className="block mt-2">
                        {doc.type}
                      </Text>
                    </Card>
                  ))}
                </Space>
              </>
            )}
          </div>
        )}
      </Drawer>

      {/* ---------- REJECT MODAL ---------- */}
      <Modal
        title="Reject Freelancer"
        open={rejectModalVisible}
        onCancel={closeRejectModal}
        footer={null}
        width={500}
      >
        {selectedFreelancer && (
          <div>
            <Text strong>
              {selectedFreelancer.name?.first_name}{" "}
              {selectedFreelancer.name?.last_name}
            </Text>
            <Text type="secondary" className="block mb-3">
              {selectedFreelancer.email}
            </Text>

            <TextArea
              rows={4}
              placeholder="Enter reason for rejection (required)"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="mb-4"
            />

            <Space className="w-full justify-end">
              <Button onClick={closeRejectModal}>Cancel</Button>
              <Button
                type="primary"
                danger
                loading={rejectingId === selectedFreelancer._id}
                disabled={!rejectionReason.trim()}
                onClick={() =>
                  updateStatus(selectedFreelancer._id, 2, rejectionReason)
                }
              >
                Confirm Reject
              </Button>
            </Space>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Freelancers;