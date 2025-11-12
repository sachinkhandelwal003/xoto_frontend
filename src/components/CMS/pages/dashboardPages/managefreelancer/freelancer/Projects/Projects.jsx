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
  const [accountants, setAccountants] = useState([]); // NEW
  const [loading, setLoading] = useState(true);
  const [loadingFreelancers, setLoadingFreelancers] = useState(false);
  const [loadingAccountants, setLoadingAccountants] = useState(false); // NEW

  const [milestoneDrawerOpen, setMilestoneDrawerOpen] = useState(false);
  const [dailyUpdatesDrawerOpen, setDailyUpdatesDrawerOpen] = useState(false);
  const [detailDrawerOpen, setDetailDrawerOpen] = useState(false);
  const [assignDrawerOpen, setAssignDrawerOpen] = useState(false);
  const [moveDrawerOpen, setMoveDrawerOpen] = useState(false); // NEW

  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  const [milestones, setMilestones] = useState([]);
  const [dailyUpdates, setDailyUpdates] = useState([]);
  const [loadingMilestones, setLoadingMilestones] = useState(false);
  const [loadingDailyUpdates, setLoadingDailyUpdates] = useState(false);
  const [addingMilestone, setAddingMilestone] = useState(false);
  const [addingDailyUpdate, setAddingDailyUpdate] = useState(false);
  const [assigning, setAssigning] = useState(false);
  const [moving, setMoving] = useState(false); // NEW

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

        const { projects, pagination: pag } = await apiService.get(
          "/freelancer/projects",
          params
        );
        setProjects(projects || []);
        setPagination({
          currentPage: pag?.page || 1,
          totalPages: pag?.totalPages || 1,
          totalResults: pag?.total || 0,
          itemsPerPage: pag?.limit || 10,
        });
      } catch (err) {
        showToast(err?.response?.data?.message || "Failed to load projects", "error");
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  /* -------------------------- FETCH FREELANCERS -------------------------- */
  const fetchFreelancers = async () => {
    setLoadingFreelancers(true);
    try {
      const { freelancers } = await apiService.get("/freelancer");
      setFreelancers(freelancers);
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
      const { accountants } = await apiService.get("/accountant");
      setAccountants(accountants || []);
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
        fetchAccountants(); // NEW
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

  const assignFreelancer = async (freelancerId) => {
    if (!selectedProject) return;
    setAssigning(true);
    try {
      await apiService.post(
        `/freelancer/projects/${selectedProject._id}/assign`,
        { freelancerId }
      );
      showSuccessAlert("Assigned", "Freelancer assigned successfully");
      setAssignDrawerOpen(false);
      fetchProjects();
    } catch (err) {
      showErrorAlert(
        "Error",
        err?.response?.data?.message || "Failed to assign freelancer"
      );
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
      const { milestones } = await apiService.get(
        `/freelancer/projects/${projectId}/milestones`
      );
      setMilestones(milestones || []);
    } catch (err) {
      showToast("Failed to load milestones", "error");
    } finally {
      setLoadingMilestones(false);
    }
  };

  /* ---------- ADD MILESTONE – FINAL CORRECTED VERSION ---------- */
  const addMilestone = async (values) => {
    if (!selectedProject) return;

    const start = moment(values.start_date);
    const end = moment(values.end_date);
    if (!start.isValid() || !end.isValid() || start.isSameOrAfter(end)) {
      showErrorAlert("Invalid Dates", "Start date must be before end date");
      return;
    }

    setAddingMilestone(true);
    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("description", values.description?.trim() ?? "");
    formData.append("start_date", start.format("YYYY-MM-DD"));
    formData.append("end_date", end.format("YYYY-MM-DD"));
    formData.append("due_date", moment(values.due_date).format("YYYY-MM-DD"));
    formData.append("amount", Number(values.amount));

    const fileList = values.photos?.fileList ?? [];
    const photos = fileList.map((f) => f.originFileObj).filter(Boolean);
    photos.forEach((file) => formData.append("photos", file));

    console.group("addMilestone – FormData payload");
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`${key} → ${value.name} (${value.size} bytes)`);
      } else {
        console.log(`${key} →`, value);
      }
    }
    console.log("Total photos →", photos.length);
    console.groupEnd();

    try {
      await apiService.upload(
        `/freelancer/projects/${selectedProject._id}/milestones`,
        formData
      );
      showSuccessAlert("Success", "Milestone added");
      milestoneForm.resetFields();
      await fetchMilestones(selectedProject._id);
    } catch (err) {
      console.error("addMilestone error →", err);
      showErrorAlert(
        "Error",
        err?.response?.data?.message || "Failed to add milestone"
      );
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
      showSuccessAlert("Success", "Milestone approved & invoice generated");
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
      const { daily_updates } = await apiService.get(
        `/freelancer/projects/${projectId}/milestones/${milestoneId}/daily`
      );
      setDailyUpdates(daily_updates || []);
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
        key: "project_type",
        title: "Type",
        render: (v) => <Tag>{v}</Tag>,
        width: 100,
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
        render: (v, r) => (
          <Space direction="vertical" size={0}>
            <Tag
              color={
                v === "completed"
                  ? "green"
                  : v === "assigned"
                  ? "blue"
                  : v === "in_progress"
                  ? "orange"
                  : "default"
              }
            >
              {v?.toUpperCase()}
            </Tag>
            {v === "completed" && (
              <Button size="small" type="link" icon={<BankOutlined />}>
                In Accounts
              </Button>
            )}
          </Space>
        ),
        width: 130,
      },
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
        title: "Freelancer",
        render: (_, r) =>
          r.freelancer ? (
            <Tooltip title={r.freelancer.email}>
              {`${r.freelancer.name?.first_name} ${r.freelancer.name?.last_name}`}
            </Tooltip>
          ) : (
            <Tag color="red">Not Assigned</Tag>
          ),
        width: 150,
      },
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

                {/* NEW: Move to Accountant */}
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
        <Link to={`/sawtar/dashboard/${roleSlug}/addProjects`}>
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
      <Drawer
        title="Assign Freelancer"
        open={assignDrawerOpen}
        onClose={() => setAssignDrawerOpen(false)}
        width={550}
        destroyOnClose
      >
        <Spin spinning={loadingFreelancers}>
          <List
            dataSource={freelancers}
            renderItem={(f) => (
              <List.Item
                actions={[
                  <Button
                    type="primary"
                    size="small"
                    loading={assigning && selectedProject?.freelancer?._id === f._id}
                    onClick={() => assignFreelancer(f._id)}
                  >
                    Assign
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  title={`${f.name?.first_name} ${f.name?.last_name}`}
                  description={
                    <Space direction="vertical" size={0}>
                      <div>Email: {f.email}</div>
                      <div>Mobile: {f.mobile}</div>
                      <Tag color="blue">
                        {f.skills?.join(", ") || "No skills"}
                      </Tag>
                    </Space>
                  }
                />
              </List.Item>
            )}
            locale={{ emptyText: "No freelancers available" }}
          />
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
                    loading={moving && selectedProject?.accountant?._id === a._id}
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
                {selectedProject.project_id || selectedProject._id?.slice(-6)}
              </Descriptions.Item>
              <Descriptions.Item label="Title">{selectedProject.title}</Descriptions.Item>
              <Descriptions.Item label="Client">{selectedProject.client_name}</Descriptions.Item>
              <Descriptions.Item label="Company">{selectedProject.client_company || "—"}</Descriptions.Item>
              <Descriptions.Item label="Type">{selectedProject.project_type}</Descriptions.Item>
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
          <Card title="Add New Milestone" style={{ marginBottom: 16 }}>
            <Form form={milestoneForm} onFinish={addMilestone} layout="vertical">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="title"
                    label="Title"
                    rules={[{ required: true, message: "Title required" }]}
                  >
                    <Input placeholder="Milestone title" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="amount"
                    label="Amount"
                    rules={[{ required: true, message: "Amount required" }]}
                  >
                    <InputNumber
                      min={0}
                      style={{ width: "100%" }}
                      formatter={(v) => `$ ${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    name="start_date"
                    label="Start Date"
                    rules={[{ required: true, message: "Start date required" }]}
                  >
                    <DatePicker style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="end_date"
                    label="End Date"
                    rules={[{ required: true, message: "End date required" }]}
                  >
                    <DatePicker style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="due_date"
                    label="Due Date"
                    rules={[{ required: true, message: "Due date required" }]}
                  >
                    <DatePicker style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
              </Row>

           <Form.Item name="description" label="Description">
  <Input placeholder="Optional description" />
</Form.Item>

              <Form.Item
                name="photos"
                label="Photos (optional, max 10)"
                valuePropName="fileList"
                getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
              >
                <Upload
                  listType="picture-card"
                  multiple
                  beforeUpload={() => false}
                  accept="image/*"
                  maxCount={10}
                >
                  <div>
                    <UploadOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </Form.Item>

              <Button type="primary" htmlType="submit" loading={addingMilestone} block>
                {addingMilestone ? "Adding…" : "Add Milestone"}
              </Button>
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
                        <strong>{m.title}</strong>
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
                      <span className="font-medium">Due:</span>{" "}
                      {moment(m.due_date).format("YYYY-MM-DD")} |{" "}
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