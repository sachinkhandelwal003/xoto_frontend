// src/pages/freelancer/Projects.jsx
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  ArrowRightOutlined,
  EyeOutlined,
  FileTextOutlined,
  UploadOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  BankOutlined,
  UserAddOutlined,
  PlusCircleOutlined,
  PlusOutlined,
  MessageOutlined
} from "@ant-design/icons";
import {
  Button,
  Drawer,
  Form,
  Input,
  InputNumber,
  DatePicker,
  Card,
  Space,
  Tag,
  Tooltip,
  Spin,
  Typography,
  List,
  Progress,
  Row,
  Col,
  Upload,
  Modal,
  Badge,
  Tabs,
  Descriptions,
  Divider,
  Alert,
  Statistic,
  Select,
  Image,
  message
} from "antd";
import {
  showSuccessAlert,
  showErrorAlert,
} from "../../../../../../../manageApi/utils/sweetAlert";
import { showToast } from "../../../../../../../manageApi/utils/toast";
import { apiService } from "../../../../../../../manageApi/utils/custom.apiservice";
import CustomTable from "../../../../custom/CustomTable";
import moment from "moment";

const { TextArea } = Input;
const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { confirm } = Modal;
const { Option } = Select;

/* --------------------------------------------------------------- */
/* -----------------------  MAIN COMPONENT  ---------------------- */
/* --------------------------------------------------------------- */
const Projects = () => {
  /* -------------------------- AUTH -------------------------- */
  const { token, user } = useSelector((s) => s.auth);
  const roleSlugMap = {
    0: "superadmin",
    1: "admin",
    5: "vendor-b2c",
    6: "vendor-b2b",
    7: "freelancer",
    11: "accountant",
  };
  const roleSlug = roleSlugMap[user?.role?.code] ?? "dashboard";
  const isAdmin = ["SuperAdmin", "Admin"].includes(user?.role?.name);
  const isFreelancer = user?.role?.name === "Freelancer";

  /* -------------------------- STATE -------------------------- */
  const [projects, setProjects] = useState([]);
  const [freelancers, setFreelancers] = useState([]);
  const [accountants, setAccountants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingFreelancers, setLoadingFreelancers] = useState(false);
  const [loadingAccountants, setLoadingAccountants] = useState(false);
const [selectedFreelancerIds, setSelectedFreelancerIds] = useState([]);
  const [milestoneDrawerOpen, setMilestoneDrawerOpen] = useState(false);
  const [dailyUpdatesDrawerOpen, setDailyUpdatesDrawerOpen] = useState(false);
  const [detailDrawerOpen, setDetailDrawerOpen] = useState(false);
  const [assignDrawerOpen, setAssignDrawerOpen] = useState(false);
  const [moveDrawerOpen, setMoveDrawerOpen] = useState(false);

  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [milestones, setMilestones] = useState([]);
  const [dailyUpdates, setDailyUpdates] = useState([]);
  const [loadingMilestones, setLoadingMilestones] = useState(false);
  const [loadingDailyUpdates, setLoadingDailyUpdates] = useState(false);
  const [addingMilestone, setAddingMilestone] = useState(false);
  const [addingDailyUpdate, setAddingDailyUpdate] = useState(false);
  const [assigning, setAssigning] = useState(false);
  const [moving, setMoving] = useState(false);

  const [activeTab, setActiveTab] = useState("projects");

  const [milestoneForm] = Form.useForm();
  const [dailyUpdateForm] = Form.useForm();

  const [filters, setFilters] = useState({});
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalResults: 0,
    itemsPerPage: 10,
  });

  /* -------------------------- FETCH PROJECTS -------------------------- */
  const fetchProjects = useCallback(
    async (page = 1, limit = 10, filters = {}) => {
      setLoading(true);
      try {
        const params = { page, limit };
        if (filters.status) params.status = filters.status;
        if (filters.search) params.search = filters.search;

        const response = await apiService.get(
          "/freelancer/projects",
          params
        );
        
        setProjects(response.projects || []);
        setPagination({
          currentPage: response.pagination?.page || 1,
          totalPages: response.pagination?.totalPages || 1,
          totalResults: response.pagination?.total || 0,
          itemsPerPage: response.pagination?.limit || 10,
        });
      } catch (err) {
        showToast(err?.response?.data?.message || "Failed to load projects", "error");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  /* -------------------------- FETCH FREELANCERS -------------------------- */
  const fetchFreelancers = async () => {
    setLoadingFreelancers(true);
    try {
      const response = await apiService.get("/freelancer");
      setFreelancers(response.freelancers || []);
    } catch (err) {
      showToast("Failed to load freelancers", "error");
    } finally {
      setLoadingFreelancers(false);
    }
  };

  /* -------------------------- FETCH ACCOUNTANTS -------------------------- */
 const fetchAccountants = async () => {
  setLoadingAccountants(true);
  try {
    const response = await apiService.get("/users?role=accountant");

    // Backend returns "data"
    setAccountants(response.data || []);
  } catch (err) {
    showToast("Failed to load accountants", "error");
  } finally {
    setLoadingAccountants(false);
  }
};


  useEffect(() => {
    if (token) {
      fetchProjects();
      if (isAdmin) {
        fetchFreelancers();
        fetchAccountants();
      }
    }
  }, [token, fetchProjects, isAdmin]);

  const handlePageChange = (page, limit) => fetchProjects(page, limit, filters);
  const handleFilter = (newFilters) => {
    setFilters(newFilters);
    fetchProjects(1, pagination.itemsPerPage, newFilters);
  };

  /* -------------------------- DRAWER OPENERS -------------------------- */
  const openProjectDetails = (project) => {
    setSelectedProject(project);
    setDetailDrawerOpen(true);
  };

  const openMilestoneDrawer = async (project) => {
    setSelectedProject(project);
    setMilestoneDrawerOpen(true);
    await fetchMilestones(project._id);
  };

  const openDailyUpdatesDrawer = async (project, milestone) => {
    setSelectedProject(project);
    setSelectedMilestone(milestone);
    setDailyUpdatesDrawerOpen(true);
    await fetchDailyUpdates(project._id, milestone._id);
  };

  /* -------------------------- ASSIGN FREELANCER -------------------------- */
  const openAssignDrawer = (project) => {
    setSelectedProject(project);
    setAssignDrawerOpen(true);
  };

const assignSelectedFreelancers = async () => {
  if (!selectedProject || selectedFreelancerIds.length === 0) return;

  setAssigning(true);
  try {
    const response = await apiService.post(
      `/freelancer/projects/${selectedProject._id}/assign`,
      {
        freelancers: selectedFreelancerIds, // now sends array
      }
    );

    message.success("Freelancers assigned successfully!");
    setAssignDrawerOpen(false);
    setSelectedFreelancerIds([]); // clear selection
    fetchProjects(); // refresh list
  } catch (err) {
    const msg =
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      "Failed to assign freelancers";
    message.error(msg);
  } finally {
    setAssigning(false);
  }
};

  /* -------------------------- MOVE TO ACCOUNTANT -------------------------- */
  const openMoveDrawer = (project) => {
    setSelectedProject(project);
    setMoveDrawerOpen(true);
  };

  const moveProjectToAccountant = async (accountantId) => {
    if (!selectedProject) return;
    setMoving(true);
    try {
      await apiService.post(
        `/freelancer/projects/${selectedProject._id}/move`,
        { accountantId }
      );
      showSuccessAlert("Moved", "Project moved to accountant successfully");
      setMoveDrawerOpen(false);
      fetchProjects();
    } catch (err) {
      showErrorAlert(
        "Error",
        err?.response?.data?.message || "Failed to move project"
      );
    } finally {
      setMoving(false);
    }
  };

  /* -------------------------- MILESTONES -------------------------- */
  const fetchMilestones = async (projectId) => {
    setLoadingMilestones(true);
    try {
      const response = await apiService.get(
        `/freelancer/projects/${projectId}/milestones`
      );
      setMilestones(response.milestones || []);
    } catch (err) {
      showToast("Failed to load milestones", "error");
    } finally {
      setLoadingMilestones(false);
    }
  };

  /* ---------- ADD MILESTONE – FIXED VERSION ---------- */
 /* ---------- ADD MILESTONE – FINAL FIXED VERSION ---------- */
const addMilestone = async (values) => {
  console.log("🔍 addMilestone() submitted:", values);

  if (!selectedProject) {
    message.error("No project selected");
    return;
  }

  // Dates come as Day.js/Moment objects
const startMoment = moment(values.start_date?.toDate?.() || values.start_date);
const endMoment = moment(values.end_date?.toDate?.() || values.end_date);


  if (!startMoment.isValid() || !endMoment.isValid()) {
    return message.error("Please select valid dates");
  }

  if (startMoment.isSameOrAfter(endMoment)) {
    return message.error("Start date must be before end date");
  }

  // Optional: validate inside project period
  const projectStart = moment(selectedProject.start_date);
  const projectEnd = moment(selectedProject.end_date);

  if (startMoment.isBefore(projectStart) || endMoment.isAfter(projectEnd)) {
    return message.error(
      `Dates must be between ${projectStart.format("DD MMM YYYY")} and ${projectEnd.format("DD MMM YYYY")}`
    );
  }

  setAddingMilestone(true);

  try {
    const formData = new FormData();

    // Required fields
    formData.append("title", values.title.trim());
    formData.append("amount", values.amount);
    formData.append("start_date", startMoment.format("YYYY-MM-DD"));
    formData.append("end_date", endMoment.format("YYYY-MM-DD"));

    // Optional
    if (values.description) {
      formData.append("description", values.description.trim());
    }

    // Photos (AntD Upload)
    if (values.photos && Array.isArray(values.photos)) {
      values.photos.forEach((file) => {
        if (file.originFileObj) {
          formData.append("photos", file.originFileObj);
        }
      });
    }

    // Debugging FormData
    console.log("📦 FormData contents:");
    for (let pair of formData.entries()) {
      console.log(" →", pair[0], ":", pair[1]);
    }

    // Send request
    const response = await apiService.upload(
      `/freelancer/projects/${selectedProject._id}/milestones`,
      formData
    );

    if (response.success) {
      message.success("Milestone added successfully!");
      milestoneForm.resetFields();
      await fetchMilestones(selectedProject._id);
    } else {
      message.error(response.message || "Failed to add milestone");
    }
  } catch (error) {
    console.error("❌ Error adding milestone:", error);

    const errorMsg =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error.message ||
      "Failed to add milestone";

    message.error(errorMsg);
  } finally {
    setAddingMilestone(false);
  }
};


  const updateMilestoneProgress = async (milestoneId, progress) => {
    try {
      await apiService.put(
        `/freelancer/projects/${selectedProject._id}/milestones/${milestoneId}/progress`,
        { progress }
      );
      showSuccessAlert("Success", "Progress updated");
      await fetchMilestones(selectedProject._id);
    } catch (err) {
      showErrorAlert("Error", err?.response?.data?.message || "Failed to update progress");
    }
  };

  const requestPaymentRelease = async (milestoneId) => {
    try {
      await apiService.post(
        `/freelancer/projects/${selectedProject._id}/milestones/${milestoneId}/request-release`
      );
      showSuccessAlert("Success", "Payment release requested");
      await fetchMilestones(selectedProject._id);
    } catch (err) {
      showErrorAlert("Error", err?.response?.data?.message || "Failed to request payment");
    }
  };

  const approveMilestone = async (milestoneId) => {
    try {
      await apiService.put(
        `/freelancer/projects/${selectedProject._id}/milestones/${milestoneId}/approve`
      );
      showSuccessAlert("Success", "Milestone approved");
      await fetchMilestones(selectedProject._id);
    } catch (err) {
      showErrorAlert(
        "Error",
        err?.response?.data?.message || "Failed to approve milestone"
      );
    }
  };

  /* -------------------------- DAILY UPDATES -------------------------- */
  const fetchDailyUpdates = async (projectId, milestoneId) => {
    setLoadingDailyUpdates(true);
    try {
      const response = await apiService.get(
        `/freelancer/projects/${projectId}/milestones/${milestoneId}/daily`
      );
      setDailyUpdates(response.daily_updates || []);
    } catch (err) {
      showToast("Failed to load daily updates", "error");
    } finally {
      setLoadingDailyUpdates(false);
    }
  };

  const addDailyUpdate = async (values) => {
    if (!selectedProject || !selectedMilestone) return;
    setAddingDailyUpdate(true);
    try {
      const payload = {
        work_done: values.work_done,
        date: values.date
          ? moment(values.date).format("YYYY-MM-DD")
          : moment().format("YYYY-MM-DD"),
        notes: values.notes || "",
      };
      await apiService.post(
        `/freelancer/projects/${selectedProject._id}/milestones/${selectedMilestone._id}/daily`,
        payload
      );
      showSuccessAlert("Success", "Daily update added");
      dailyUpdateForm.resetFields();
      await fetchDailyUpdates(selectedProject._id, selectedMilestone._id);
      await fetchMilestones(selectedProject._id);
    } catch (err) {
      showErrorAlert(
        "Error",
        err?.response?.data?.message || "Failed to add daily update"
      );
    } finally {
      setAddingDailyUpdate(false);
    }
  };

  const approveDailyUpdate = async (dailyId, approvedProgress) => {
    try {
      await apiService.put(
        `/freelancer/projects/${selectedProject._id}/milestones/${selectedMilestone._id}/daily/${dailyId}/approve`,
        { approved_progress: approvedProgress }
      );
      showSuccessAlert("Success", "Daily update approved");
      await fetchDailyUpdates(selectedProject._id, selectedMilestone._id);
      await fetchMilestones(selectedProject._id);
    } catch (err) {
      showErrorAlert("Error", err?.response?.data?.message || "Failed to approve update");
    }
  };

  const rejectDailyUpdate = async (dailyId) => {
    confirm({
      title: "Reject Daily Update",
      content: (
        <div>
          <p>Please provide a reason for rejection:</p>
          <Input.TextArea id="rejectionReason" rows={3} placeholder="Enter reason..." />
        </div>
      ),
      onOk: async () => {
        const reason = document.getElementById("rejectionReason")?.value;
        try {
          await apiService.put(
            `/freelancer/projects/${selectedProject._id}/milestones/${selectedMilestone._id}/daily/${dailyId}/reject`,
            { reason }
          );
          showSuccessAlert("Success", "Daily update rejected");
          await fetchDailyUpdates(selectedProject._id, selectedMilestone._id);
          await fetchMilestones(selectedProject._id);
        } catch (err) {
          showErrorAlert("Error", err?.response?.data?.message || "Failed to reject update");
        }
      },
    });
  };

  /* -------------------------- TABLE COLUMNS -------------------------- */
  const columns = useMemo(
    () => [
      {
        key: "code",
        title: "Code",
        render: (_, record) => (
          <Tooltip title={record.Code}>
            <Text strong style={{ color: "#1890ff" }}>
              {record.Code}
            </Text>
          </Tooltip>
        ),
        width: 120,
      },
      {
        key: "title",
        title: "Title",
        render: (v) => <strong>{v}</strong>,
        width: 200,
      },
      {
        key: "client_name",
        title: "Client",
        render: (v, r) => (
          <div>
            <div>{v}</div>
            {r.client_company && (
              <Text type="secondary" style={{ fontSize: "12px" }}>
                {r.client_company}
              </Text>
            )}
          </div>
        ),
        width: 150,
      },
      {
        key: "category",
        title: "Category",
        render: (_, r) => r.category?.name || "N/A",
        width: 120,
      },
      {
        key: "budget",
        title: "Budget",
        render: (v) => `$${Number(v).toLocaleString()}`,
        width: 120,
      },
    {
  key: "status",
  title: "Status",
  width: 150,
  render: (_, r) => {
    const status = r.status;

    // Accountant (safe access)
    const acc = r.accountant;
    const fullName = acc
      ? `${acc?.name?.first_name || ""} ${acc?.name?.last_name || ""}`.trim()
      : null;

    return (
      <Space direction="vertical" size={4}>
        {/* Status Tag */}
        <Tag
          color={
            status === "completed"
              ? "green"
              : status === "assigned"
              ? "blue"
              : status === "in_progress"
              ? "orange"
              : "default"
          }
        >
          {status?.toUpperCase()}
        </Tag>

        {/* Accountant Tag */}
        {fullName ? (
          <Tag color="purple">Accountant: {fullName}</Tag>
        ) : (
          <Tag color="red">No Accountant Assigned</Tag>
        )}
      </Space>
    );
  },
}
,
      {
        key: "milestones",
        title: "Milestones",
        render: (_, r) => {
          const active = r.milestones?.filter((m) => !m.is_deleted) || [];
          const completed = active.filter((m) => m.status === "approved").length;
          const total = active.length;
          return (
            <div>
              <div>
                {completed}/{total} Completed
              </div>
              <Progress
                percent={total > 0 ? Math.round((completed / total) * 100) : 0}
                size="small"
              />
            </div>
          );
        },
        width: 150,
      },
  {
  key: "freelancer",
  title: "Freelancer(s)",
  render: (_, r) => {
    const flArray = r.freelancers || [];  // MULTIPLE

    // CASE 1: MULTIPLE FREELANCERS
    if (flArray.length > 0) {
      return (
        <>
          {flArray.map((f) => (
            <Tooltip key={f._id} title={f.email}>
              <Tag color="blue" style={{ marginBottom: 4 }}>
                {`${f.name?.first_name} ${f.name?.last_name}`}
              </Tag>
            </Tooltip>
          ))}
        </>
      );
    }

  

    // CASE 3: NONE ASSIGNED
    return <Tag color="red">Not Assigned</Tag>;
  },
  width: 180,
}
,
      {
        key: "actions",
        title: "Actions",
        render: (_, r) => (
          <Space>
            <Tooltip title="View Details">
              <Button size="small" icon={<EyeOutlined />} onClick={() => openProjectDetails(r)} />
            </Tooltip>

            <Tooltip title="View Milestones">
              <Button size="small" icon={<FileTextOutlined />} onClick={() => openMilestoneDrawer(r)} />
            </Tooltip>

            {isAdmin && (
              <>
                <Tooltip title="Assign Freelancer">
                  <Button
                    size="small"
                    icon={<UserAddOutlined />}
                    onClick={() => openAssignDrawer(r)}
                    disabled={r.status === "completed"}
                  />
                </Tooltip>

                <Tooltip title="Move to Accountant">
                  <Button
                    size="small"
                    icon={<BankOutlined />}
                    onClick={() => openMoveDrawer(r)}
                    disabled={!!r.accountant || r.status !== "completed"}  
                  />
                </Tooltip>
              </>
            )}
          </Space>
        ),
        width: 180,
      },
    ],
    [isAdmin]
  );

  /* -------------------------- RENDER -------------------------- */
  if (loading) return <Spin tip="Loading..." className="flex justify-center mt-10" />;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <Title level={3}>Projects Management</Title>
        <Link to={`/dashboard/${roleSlug}/addProjects`}>
          <Button type="primary" icon={<ArrowRightOutlined />}>
            Go to Projects
          </Button>
        </Link>
      </div>

      {/* Tabs */}
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="Projects" key="projects">
          <CustomTable
            columns={columns}
            data={projects}
            totalItems={pagination.totalResults}
            currentPage={pagination.currentPage}
            itemsPerPage={pagination.itemsPerPage}
            onPageChange={handlePageChange}
            onFilter={handleFilter}
            loading={loading}
            searchPlaceholder="Search projects..."
          />
        </TabPane>
      </Tabs>

      {/* ---------- ASSIGN FREELANCER DRAWER ---------- */}
    {/* ---------- ASSIGN FREELANCER DRAWER (MULTI-SELECT) ---------- */}
<Drawer
  title="Assign Freelancer(s)"
  open={assignDrawerOpen}
  onClose={() => {
    setAssignDrawerOpen(false);
    setSelectedFreelancerIds([]); // clear selection on close
  }}
  width={600}
  destroyOnClose
>
  <Spin spinning={loadingFreelancers}>
    {selectedProject && (
      <>
        {/* Show already assigned freelancers */}
        {selectedProject.freelancers && selectedProject.freelancers.length > 0 && (
          <Alert
            message="Currently Assigned"
            description={
              <Space wrap>
                {selectedProject.freelancers.map(f => (
                  <Tag key={f._id} color="blue">
                    {f.name?.first_name} {f.name?.last_name}
                  </Tag>
                ))}
              </Space>
            }
            type="info"
            showIcon
            style={{ marginBottom: 16 }}
          />
        )}

        <Form layout="vertical">
          <Form.Item label="Select Freelancers to Assign">
            <Select
              mode="multiple"
              placeholder="Search and select freelancers..."
              showSearch
              optionFilterProp="children"
              loading={loadingFreelancers}
              value={selectedFreelancerIds}
              onChange={setSelectedFreelancerIds}
              style={{ width: "100%" }}
            >
              {freelancers.map((f) => {
                const isAlreadyAssigned = selectedProject.freelancers?.some(
                  (assigned) => assigned._id === f._id
                );

                return (
                  <Option
                    key={f._id}
                    value={f._id}
                    disabled={isAlreadyAssigned} // prevent re-selecting already assigned
                  >
                    <div>
                      <strong>{f.name?.first_name} {f.name?.last_name}</strong>
                      <br />
                      <small>{f.email} • {f.mobile || "No mobile"}</small>
                      {isAlreadyAssigned && (
                        <Tag color="green" size="small" style={{ marginLeft: 8 }}>
                          Already Assigned
                        </Tag>
                      )}
                    </div>
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              size="large"
              block
              loading={assigning}
              disabled={selectedFreelancerIds.length === 0}
              onClick={assignSelectedFreelancers}
              icon={<UserAddOutlined />}
            >
              {assigning
                ? "Assigning..."
                : `Assign ${selectedFreelancerIds.length} Freelancer(s)`}
            </Button>
          </Form.Item>
        </Form>
      </>
    )}
  </Spin>
</Drawer>

      {/* ---------- MOVE TO ACCOUNTANT DRAWER ---------- */}
      <Drawer
        title="Move Project to Accountant"
        open={moveDrawerOpen}
        onClose={() => setMoveDrawerOpen(false)}
        width={550}
        destroyOnClose
      >
        <Spin spinning={loadingAccountants}>
          <List
            dataSource={accountants}
            renderItem={(a) => (
              <List.Item
                actions={[
                  <Button
                    type="primary"
                    size="small"
                    loading={moving}
                    onClick={() => moveProjectToAccountant(a._id)}
                  >
                    Move
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  title={`${a.name?.first_name} ${a.name?.last_name}`}
                  description={
                    <Space direction="vertical" size={0}>
                      <div>Email: {a.email}</div>
                      <div>Mobile: {a.mobile}</div>
                      <div>Firm: {a.firm_name}</div>
                      <Tag color="purple">{a.qualifications?.join(", ")}</Tag>
                    </Space>
                  }
                />
              </List.Item>
            )}
            locale={{ emptyText: "No accountants available" }}
          />
        </Spin>
      </Drawer>

      {/* ---------- PROJECT DETAILS DRAWER ---------- */}
      <Drawer
        title="Project Details"
        open={detailDrawerOpen}
        onClose={() => setDetailDrawerOpen(false)}
        width={700}
      >
        {selectedProject && (
          <div>
            <Descriptions title="Basic Information" bordered column={2}>
              <Descriptions.Item label="Project ID">
                {selectedProject.code || selectedProject._id?.slice(-6)}
              </Descriptions.Item>
              <Descriptions.Item label="Title">{selectedProject.title}</Descriptions.Item>
              <Descriptions.Item label="Client">{selectedProject.client_name}</Descriptions.Item>
              <Descriptions.Item label="Company">{selectedProject.client_company || "—"}</Descriptions.Item>
              <Descriptions.Item label="Category">{selectedProject.category?.name || "N/A"}</Descriptions.Item>
              <Descriptions.Item label="Status">
                <Tag
                  color={
                    selectedProject.status === "completed"
                      ? "green"
                      : selectedProject.status === "assigned"
                      ? "blue"
                      : selectedProject.status === "in_progress"
                      ? "orange"
                      : "default"
                  }
                >
                  {selectedProject.status?.toUpperCase()}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Budget" span={2}>
                ${Number(selectedProject.budget).toLocaleString()}
              </Descriptions.Item>
              <Descriptions.Item label="Overview" span={2}>
                {selectedProject.overview || "—"}
              </Descriptions.Item>
              <Descriptions.Item label="Project Dates" span={2}>
                {moment(selectedProject.start_date).format("DD MMM YYYY")} - {moment(selectedProject.end_date).format("DD MMM YYYY")}
              </Descriptions.Item>
            </Descriptions>

            <Divider />
            <Title level={5}>Milestones Summary</Title>
            <Row gutter={16}>
              <Col span={6}>
                <Statistic
                  title="Total"
                  value={selectedProject.milestones?.filter((m) => !m.is_deleted).length || 0}
                />
              </Col>
              <Col span={6}>
                <Statistic
                  title="Completed"
                  value={selectedProject.milestones?.filter((m) => m.status === "approved").length || 0}
                />
              </Col>
              <Col span={6}>
                <Statistic
                  title="In Progress"
                  value={selectedProject.milestones?.filter((m) => m.status === "in_progress").length || 0}
                />
              </Col>
              <Col span={6}>
                <Statistic
                  title="Pending Payment"
                  value={selectedProject.milestones?.filter((m) => m.status === "release_requested").length || 0}
                />
              </Col>
            </Row>
          </div>
        )}
      </Drawer>

      {/* ---------- MILESTONE DRAWER ---------- */}
      <Drawer
        title={`Milestones – ${selectedProject?.title}`}
        open={milestoneDrawerOpen}
        onClose={() => setMilestoneDrawerOpen(false)}
        width={950}
        destroyOnClose
      >
        {/* ---- ADD MILESTONE (Admin only) ---- */}
     {isAdmin && (
  <Card
    title="Add New Milestone"
    style={{ marginBottom: 24 }}
    className="shadow-sm"
  >
    <Form
      form={milestoneForm}
      onFinish={addMilestone}
      layout="vertical"
      initialValues={{
        amount: 0,
      }}
    >
      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item
            name="title"
            label="Milestone Title"
            rules={[{ required: true, message: "Please enter milestone title" }]}
          >
            <Input size="large" placeholder="e.g. Foundation, Plumbing, Roofing" />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            name="amount"
            label="Amount"
            rules={[{ required: true, message: "Please enter amount" }]}
          >
            <InputNumber
              min={1}
              size="large"
              style={{ width: "100%" }}
              placeholder="15000"
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={8}>
          <Form.Item
            name="start_date"
            label="Start Date"
            rules={[{ required: true, message: "Start date is required" }]}
          >
            <DatePicker
              size="large"
              style={{ width: "100%" }}
              format="YYYY-MM-DD"
              disabledDate={(current) => {
                if (!selectedProject) return false;
                const ps = moment(selectedProject.start_date);
                const pe = moment(selectedProject.end_date);
                return current && (current < ps || current > pe);
              }}
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={8}>
          <Form.Item
            name="end_date"
            label="End Date"
            rules={[{ required: true, message: "End date is required" }]}
          >
            <DatePicker
              size="large"
              style={{ width: "100%" }}
              format="YYYY-MM-DD"
              disabledDate={(current) => {
                if (!selectedProject) return false;
                const ps = moment(selectedProject.start_date);
                const pe = moment(selectedProject.end_date);
                return current && (current < ps || current > pe);
              }}
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={8}>
          <div style={{ paddingTop: "30px" }}>
            <Alert
              message="Project Period"
              description={`${moment(selectedProject?.start_date).format("DD MMM YYYY")} → ${moment(selectedProject?.end_date).format("DD MMM YYYY")}`}
              type="info"
              showIcon
            />
          </div>
        </Col>
      </Row>

      <Form.Item name="description" label="Description (Optional)">
        <Input.TextArea rows={3} placeholder="Short description of this milestone…" />
      </Form.Item>

      <Form.Item
        name="photos"
        label="Upload Photos (Optional)"
        valuePropName="fileList"
        getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
      >
        <Upload
          listType="picture-card"
          multiple
          accept="image/*"
          maxCount={10}
          beforeUpload={() => false} // prevent auto upload
        >
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          loading={addingMilestone}
          block
          icon={<PlusCircleOutlined />}
        >
          {addingMilestone ? "Adding Milestone…" : "Add Milestone"}
        </Button>
      </Form.Item>
    </Form>
  </Card>
)}


        {/* ---- LIST OF MILESTONES ---- */}
        <Spin spinning={loadingMilestones}>
          <List
            dataSource={milestones}
            locale={{ emptyText: "No milestones found" }}
            renderItem={(m) => (
              <Card className="mb-3" key={m._id}>
                <div className="flex justify-between items-start">
                  <div style={{ flex: 1 }}>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <strong>#{m.milestone_number} - {m.title}</strong>
                        {m.daily_updates_count > 0 && (
                          <Badge
                            count={m.daily_updates_count - m.approved_updates}
                            style={{ backgroundColor: "#faad14", marginLeft: 8 }}
                          >
                            <Button
                              size="small"
                              type="link"
                              icon={<FileTextOutlined />}
                              onClick={() => openDailyUpdatesDrawer(selectedProject, m)}
                            >
                              Daily Updates
                            </Button>
                          </Badge>
                        )}
                      </div>

                      <Tag
                        color={
                          m.status === "approved"
                            ? "green"
                            : m.status === "release_requested"
                            ? "orange"
                            : m.status === "in_progress"
                            ? "blue"
                            : "default"
                        }
                      >
                        {m.status?.toUpperCase()}
                      </Tag>
                    </div>

                    {m.description && <div className="mb-2 text-gray-600">{m.description}</div>}

                    <div className="mb-2">
                      <span className="font-medium">Period:</span>{" "}
                      {moment(m.start_date).format("DD MMM YYYY")} - {moment(m.end_date).format("DD MMM YYYY")} |{" "}
                      <span className="font-medium ml-2">Amount:</span> $
                      {Number(m.amount).toLocaleString()}
                    </div>

                    {m.photos && m.photos.length > 0 && (
                      <div className="mb-3">
                        <Text strong>Photos:</Text>
                        <Space wrap style={{ marginTop: 8 }}>
                          {m.photos.map((url, idx) => (
                            <Image
                              key={idx}
                              src={url}
                              alt={`milestone-photo-${idx}`}
                              width={80}
                              height={80}
                              style={{ objectFit: "cover" }}
                              preview
                            />
                          ))}
                        </Space>
                      </div>
                    )}

                    <div className="mt-3">
                      <div className="flex justify-between items-center mb-2">
                        <span>Progress: {m.progress}%</span>

                        {isFreelancer && (
                          <Space>
                            <Button
                              size="small"
                              onClick={() =>
                                updateMilestoneProgress(m._id, Math.min(100, m.progress + 25))
                              }
                            >
                              +25%
                            </Button>
                            <Button size="small" onClick={() => updateMilestoneProgress(m._id, 100)}>
                              Complete
                            </Button>
                            {m.progress === 100 && m.status === "in_progress" && (
                              <Button
                                type="primary"
                                size="small"
                                onClick={() => requestPaymentRelease(m._id)}
                              >
                                Request Payment
                              </Button>
                            )}
                          </Space>
                        )}
                      </div>
                      <Progress percent={m.progress} />
                    </div>
                  </div>

                  <div className="ml-4 flex flex-col gap-2">
                    {isAdmin && m.status === "release_requested" && (
                      <Button
                        type="primary"
                        icon={<CheckCircleOutlined />}
                        onClick={() => approveMilestone(m._id)}
                      >
                        Approve 
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            )}
          />
        </Spin>
      </Drawer>

      {/* ---------- DAILY UPDATES DRAWER ---------- */}
      <Drawer
        title={`Daily Updates – ${selectedMilestone?.title}`}
        open={dailyUpdatesDrawerOpen}
        onClose={() => setDailyUpdatesDrawerOpen(false)}
        width={800}
        destroyOnClose
      >
        {isFreelancer && (
          <Card title="Add Daily Update" style={{ marginBottom: 16 }}>
            <Form form={dailyUpdateForm} onFinish={addDailyUpdate} layout="vertical">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="date" label="Date">
                    <DatePicker style={{ width: "100%" }} placeholder="Today (default)" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="work_done"
                label="Work Done"
                rules={[{ required: true, message: "Describe work done" }]}
              >
                <TextArea rows={3} placeholder="What you completed, challenges, etc." />
              </Form.Item>

              <Form.Item name="notes" label="Notes">
                <TextArea rows={2} placeholder="Additional notes…" />
              </Form.Item>

              <Form.Item name="photos" label="Photos">
                <Upload listType="picture" beforeUpload={() => false} multiple>
                  <Button icon={<UploadOutlined />}>Upload Photos</Button>
                </Upload>
              </Form.Item>

              <Button type="primary" htmlType="submit" loading={addingDailyUpdate} block>
                {addingDailyUpdate ? "Adding…" : "Add Daily Update"}
              </Button>
            </Form>
          </Card>
        )}

        <Spin spinning={loadingDailyUpdates}>
          <List
            dataSource={dailyUpdates}
            locale={{ emptyText: "No daily updates found" }}
            renderItem={(du) => (
              <Card className="mb-3" key={du._id}>
                <div className="flex justify-between items-start">
                  <div style={{ flex: 1 }}>
                    <div className="flex justify-between items-center mb-2">
                      <strong>{moment(du.date).format("YYYY-MM-DD HH:mm")}</strong>
                      <Tag
                        color={
                          du.approval_status === "approved"
                            ? "green"
                            : du.approval_status === "rejected"
                            ? "red"
                            : "orange"
                        }
                      >
                        {du.approval_status?.toUpperCase()}
                      </Tag>
                    </div>

                    {du.approved_progress > 0 && (
                      <div className="mb-2">
                        <Progress percent={du.approved_progress} size="small" style={{ width: 200 }} />
                        <span className="ml-2">Approved: {du.approved_progress}%</span>
                      </div>
                    )}

                    <div className="mb-2">
                      <span className="font-medium">Work Done:</span> {du.work_done}
                    </div>

                    {du.notes && (
                      <div className="mb-2">
                        <span className="font-medium">Notes:</span> {du.notes}
                      </div>
                    )}

                    {du.photos && du.photos.length > 0 && (
                      <div className="mb-2">
                        <span className="font-medium block mb-1">Photos:</span>
                        <div className="flex flex-wrap gap-2">
                          {du.photos.map((photo, index) => (
                            <Image
                              key={index}
                              width={120}
                              height={120}
                              src={`http://localhost:5000/${photo}`}
                              alt={`Daily update photo ${index + 1}`}
                              style={{ objectFit: "cover", borderRadius: 8 }}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    {du.rejection_reason && (
                      <Alert
                        message="Rejection Reason"
                        description={du.rejection_reason}
                        type="error"
                        showIcon
                        className="mt-2"
                      />
                    )}
                  </div>

                  {isAdmin && du.approval_status === "pending" && (
                    <div className="ml-4 flex flex-col gap-2">
                      <Tooltip title="Approve with progress %">
                        <Button
                          type="primary"
                          icon={<CheckCircleOutlined />}
                          onClick={() => {
                            Modal.confirm({
                              title: "Approve Daily Update",
                              content: (
                                <div>
                                  <p>Set approved progress:</p>
                                  <InputNumber
                                    min={0}
                                    max={100}
                                    defaultValue={du.approved_progress || 0}
                                    id="approvedProgressInput"
                                    style={{ width: "100%", marginTop: 8 }}
                                  />
                                </div>
                              ),
                              onOk: () => {
                                const prog = document.getElementById("approvedProgressInput")?.value || 0;
                                approveDailyUpdate(du._id, Number(prog));
                              },
                            });
                          }}
                        >
                          Approve
                        </Button>
                      </Tooltip>

                      <Button danger icon={<CloseCircleOutlined />} onClick={() => rejectDailyUpdate(du._id)}>
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              </Card>
            )}
          />
        </Spin>
      </Drawer>
    </div>
  );
};

export default Projects;