// src/components/CMS/pages/modules/Modules.jsx
import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  Card,
  Button,
  Drawer,
  Switch,
  Space,
  Tag,
  Tooltip,
  Spin,
  Typography,
  Divider,
  Row,
  Col,
  Statistic,
  Badge,
  Alert,
  Avatar,
  Popconfirm,
  Empty,
  Input,
  Form,
  Modal
} from 'antd';
import {
  EyeOutlined,
  SaveOutlined,
  CloseOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  RestOutlined,
  SettingOutlined,
  FolderOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
  InfoCircleOutlined,
  DragOutlined,
  ArrowRightOutlined
} from '@ant-design/icons';
import CustomTable from '../../pages/custom/CustomTable';
import { moduleService } from './module.service';
import { showToast } from '../../../../manageApi/utils/toast';
import { showSuccessAlert, showErrorAlert } from '../../../../manageApi/utils/sweetAlert';

// Theme colors
const PURPLE_THEME = {
  primary: '#722ed1',
  primaryLight: '#9254de',
  primaryLighter: '#d3adf7',
  primaryBg: '#f9f0ff',
  success: '#52c41a',
  warning: '#faad14',
  error: '#ff4d4f',
  info: '#1890ff',
  gray: '#8c8c8c',
  dark: '#1f2937'
};

// ProCard component
const ProCard = ({ children, title, extra, headerStyle, bodyStyle, className = '', ...props }) => (
  <Card
    {...props}
    className={`shadow-sm border-0 hover:shadow-md transition-shadow ${className}`}
    styles={{
      body: { padding: '20px 24px', ...bodyStyle },
      header: { 
        background: PURPLE_THEME.primaryBg,
        borderBottom: `1px solid ${PURPLE_THEME.primaryLighter}`,
        padding: '16px 24px',
        ...headerStyle
      }
    }}
    title={title && (
      <div className="flex items-center justify-between">
        <Typography.Text strong style={{ color: PURPLE_THEME.dark, fontSize: '16px' }}>
          {title}
        </Typography.Text>
        {extra}
      </div>
    )}
  >
    {children}
  </Card>
);

// Permission hook
const useModulePermission = () => {
  const { permissions } = useSelector(s => s.auth);
  const perm = permissions?.['Module→All Modules'] ?? {};
  return {
    canView: !!perm.canView,
    canAdd: !!perm.canAdd,
    canEdit: !!perm.canEdit,
    canDelete: !!perm.canDelete,
    canViewAll: !!perm.canViewAll,
  };
};

// Module Creation Modal
const CreateModuleModal = ({ open, onCancel, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [subModules, setSubModules] = useState([]);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const payload = {
        ...values,
        icon: values.icon || 'fas fa-folder',
        subModules: subModules.map(sub => ({
          ...sub,
          icon: sub.icon || 'fas fa-circle',
          isActive: true
        }))
      };
      await moduleService.create(payload);
      showSuccessAlert('Success', 'Module created successfully');
      form.resetFields();
      setSubModules([]);
      onSuccess();
      onCancel();
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to create module';
      showErrorAlert('Error', msg);
    } finally {
      setLoading(false);
    }
  };

  const addSubModule = () => {
    setSubModules([...subModules, { name: '', route: '', icon: '' }]);
  };

  const updateSubModule = (index, field, value) => {
    const updated = [...subModules];
    updated[index] = { ...updated[index], [field]: value };
    setSubModules(updated);
  };

  const removeSubModule = (index) => {
    setSubModules(subModules.filter((_, i) => i !== index));
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <PlusOutlined style={{ color: PURPLE_THEME.primary }} />
          <span>Create New Module</span>
        </div>
      }
      open={open}
      onCancel={onCancel}
      footer={null}
      width={700}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ icon: 'fas fa-folder' }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Module Name"
              name="name"
              rules={[{ required: true, message: 'Please enter module name' }]}
            >
              <Input placeholder="e.g., Products" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Route"
              name="route"
              rules={[{ required: true, message: 'Please enter route' }]}
            >
              <Input placeholder="/products" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Icon (FontAwesome)"
              name="icon"
            >
              <Input placeholder="fas fa-folder" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Description"
              name="description"
            >
              <Input placeholder="Optional description" />
            </Form.Item>
          </Col>
        </Row>

        <Divider orientation="left">
          <Tag color="purple">Sub-modules (Optional)</Tag>
        </Divider>

        <Alert
          message="Add sub-modules now or later from module details"
          type="info"
          showIcon
          style={{ marginBottom: 16 }}
        />

        {subModules.map((sub, index) => (
          <Card key={index} size="small" style={{ marginBottom: 12, borderLeft: `3px solid ${PURPLE_THEME.primaryLighter}` }}>
            <Row gutter={12} align="middle">
              <Col span={8}>
                <Input
                  placeholder="Sub-module name"
                  value={sub.name}
                  onChange={(e) => updateSubModule(index, 'name', e.target.value)}
                />
              </Col>
              <Col span={8}>
                <Input
                  placeholder="/route"
                  value={sub.route}
                  onChange={(e) => updateSubModule(index, 'route', e.target.value)}
                />
              </Col>
              <Col span={6}>
                <Input
                  placeholder="fas fa-circle"
                  value={sub.icon}
                  onChange={(e) => updateSubModule(index, 'icon', e.target.value)}
                />
              </Col>
              <Col span={2}>
                <Button
                  danger
                  type="text"
                  icon={<DeleteOutlined />}
                  onClick={() => removeSubModule(index)}
                />
              </Col>
            </Row>
          </Card>
        ))}

        <Button
          type="dashed"
          block
          icon={<PlusOutlined />}
          onClick={addSubModule}
          style={{ marginBottom: 24 }}
        >
          Add Sub-module
        </Button>

        <Divider />

        <div className="flex justify-end gap-2">
          <Button onClick={onCancel} disabled={loading}>
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            style={{ background: PURPLE_THEME.primary, borderColor: PURPLE_THEME.primary }}
          >
            Create Module
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

// Sub-module Creation Modal
const CreateSubModuleModal = ({ open, moduleId, moduleName, onCancel, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const payload = {
        ...values,
        icon: values.icon || 'fas fa-circle',
        isActive: true
      };
      await moduleService.createSub(moduleId, [payload]);
      showSuccessAlert('Success', 'Sub-module added successfully');
      form.resetFields();
      onSuccess();
      onCancel();
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to add sub-module';
      showErrorAlert('Error', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <ArrowRightOutlined style={{ color: PURPLE_THEME.primary }} />
          <span>Add Sub-module to {moduleName}</span>
        </div>
      }
      open={open}
      onCancel={onCancel}
      footer={null}
      width={500}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ icon: 'fas fa-circle' }}
      >
        <Form.Item
          label="Sub-module Name"
          name="name"
          rules={[{ required: true, message: 'Please enter sub-module name' }]}
        >
          <Input placeholder="e.g., Product List" />
        </Form.Item>

        <Form.Item
          label="Route"
          name="route"
          rules={[{ required: true, message: 'Please enter route' }]}
        >
          <Input placeholder="/products/list" />
        </Form.Item>

        <Form.Item
          label="Icon (FontAwesome)"
          name="icon"
        >
          <Input placeholder="fas fa-list" />
        </Form.Item>

        <Divider />

        <div className="flex justify-end gap-2">
          <Button onClick={onCancel} disabled={loading}>
            Cancel
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            style={{ background: PURPLE_THEME.primary, borderColor: PURPLE_THEME.primary }}
          >
            Add Sub-module
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

// Module Details Drawer
const ModuleDetailsDrawer = ({ open, module, onClose, onEdit, onDelete, onRestore, perm }) => {
  const [editMode, setEditMode] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [subModules, setSubModules] = useState([]);

  useEffect(() => {
    if (module) {
      form.setFieldsValue(module);
      setSubModules(module.subModules?.filter(s => !s.isDeleted) || []);
    }
  }, [module, form]);

  const handleSave = async (values) => {
    setLoading(true);
    try {
      await moduleService.update(module._id, values);
      showToast('Module updated successfully', 'success');
      setEditMode(false);
      onEdit();
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to update module';
      showErrorAlert('Error', msg);
    } finally {
      setLoading(false);
    }
  };

  const handleSubModuleUpdate = async (subId, values) => {
    try {
      await moduleService.updateSub(module._id, subId, values);
      showToast('Sub-module updated successfully', 'success');
      onEdit();
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to update sub-module';
      showErrorAlert('Error', msg);
    }
  };

  const handleSubModuleDelete = async (subId) => {
    try {
      await showSuccessAlert(
        'Confirm Delete',
        'Are you sure you want to delete this sub-module?',
        'warning',
        true
      ).then(async (result) => {
        if (result.isConfirmed) {
          await moduleService.deleteSub(module._id, subId);
          showToast('Sub-module deleted successfully', 'success');
          onEdit();
        }
      });
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to delete sub-module';
      showErrorAlert('Error', msg);
    }
  };

  const handleSubModuleRestore = async (subId) => {
    try {
      await moduleService.restoreSub(module._id, subId);
      showToast('Sub-module restored successfully', 'success');
      onEdit();
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to restore sub-module';
      showErrorAlert('Error', msg);
    }
  };

  if (!module) return null;

  return (
    <Drawer
      title={
        <div className="flex items-center gap-3">
          <Avatar 
            size={40}
            style={{ background: PURPLE_THEME.primaryBg, color: PURPLE_THEME.primary }}
            icon={<FolderOutlined />}
          />
          <div>
            <Typography.Title level={4} style={{ margin: 0 }}>
              {module.name}
            </Typography.Title>
            <Typography.Text type="secondary">{module.route}</Typography.Text>
          </div>
        </div>
      }
      placement="right"
      onClose={onClose}
      open={open}
      width={700}
      destroyOnClose
      extra={
        <Space>
          {!editMode && perm.canEdit && !module.isDeleted && (
            <Button
              icon={<EditOutlined />}
              onClick={() => setEditMode(true)}
            >
              Edit
            </Button>
          )}
          <Button icon={<CloseOutlined />} onClick={onClose} />
        </Space>
      }
    >
      <div className="space-y-6">
        {/* Status */}
        <div>
          <Badge
            status={module.isDeleted ? "error" : "success"}
            text={
              <Typography.Text strong style={{ color: module.isDeleted ? PURPLE_THEME.error : PURPLE_THEME.success }}>
                {module.isDeleted ? 'Deleted' : 'Active'}
              </Typography.Text>
            }
          />
          <Typography.Text type="secondary" className="ml-4">
            Created: {new Date(module.createdAt).toLocaleDateString()}
          </Typography.Text>
        </div>

        {/* Edit Form */}
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSave}
          disabled={!editMode || loading}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Module Name"
                name="name"
                rules={[{ required: true, message: 'Required' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Route"
                name="route"
                rules={[{ required: true, message: 'Required' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Icon"
                name="icon"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Description"
                name="description"
              >
                <Input.TextArea rows={2} />
              </Form.Item>
            </Col>
          </Row>

          {editMode && (
            <div className="flex justify-end gap-2 mt-4">
              <Button onClick={() => setEditMode(false)} disabled={loading}>
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                style={{ background: PURPLE_THEME.primary, borderColor: PURPLE_THEME.primary }}
              >
                Save Changes
              </Button>
            </div>
          )}
        </Form>

        {/* Sub-modules Section */}
        <Divider orientation="left">
          <Tag color="purple" icon={<ArrowRightOutlined />}>
            Sub-modules ({subModules.length})
          </Tag>
        </Divider>

        {subModules.length > 0 ? (
          <div className="space-y-3">
            {subModules.map(sub => (
              <Card
                key={sub._id}
                size="small"
                style={{ borderLeft: `3px solid ${PURPLE_THEME.primaryLighter}` }}
                title={
                  <div className="flex items-center justify-between">
                    <Space>
                      <Typography.Text strong>{sub.name}</Typography.Text>
                      <Tag>{sub.route}</Tag>
                    </Space>
                    <Space>
                      {sub.isDeleted ? (
                        <Popconfirm
                          title="Restore this sub-module?"
                          onConfirm={() => handleSubModuleRestore(sub._id)}
                        >
                          <Button size="small" icon={<RestOutlined />} type="text">
                            Restore
                          </Button>
                        </Popconfirm>
                      ) : (
                        <>
                          <Button
                            size="small"
                            icon={<EditOutlined />}
                            type="text"
                            onClick={() => {
                              Modal.confirm({
                                title: 'Edit Sub-module',
                                content: (
                                  <Form
                                    initialValues={sub}
                                    onFinish={(values) => {
                                      handleSubModuleUpdate(sub._id, values);
                                      Modal.destroyAll();
                                    }}
                                    layout="vertical"
                                  >
                                    <Form.Item
                                      label="Name"
                                      name="name"
                                      rules={[{ required: true }]}
                                    >
                                      <Input />
                                    </Form.Item>
                                    <Form.Item
                                      label="Route"
                                      name="route"
                                      rules={[{ required: true }]}
                                    >
                                      <Input />
                                    </Form.Item>
                                    <Form.Item
                                      label="Icon"
                                      name="icon"
                                    >
                                      <Input />
                                    </Form.Item>
                                  </Form>
                                ),
                                icon: null,
                                okText: 'Save',
                                cancelText: 'Cancel',
                                onOk: () => {
                                  const form = Modal.confirm?.modalProps?.content?.props?.form;
                                  return form?.submit();
                                }
                              });
                            }}
                          />
                          <Popconfirm
                            title="Delete this sub-module?"
                            onConfirm={() => handleSubModuleDelete(sub._id)}
                          >
                            <Button size="small" icon={<DeleteOutlined />} type="text" danger />
                          </Popconfirm>
                        </>
                      )}
                    </Space>
                  </div>
                }
              >
                <Typography.Text type="secondary">
                  <i className={sub.icon || 'fas fa-circle'} /> {sub.icon}
                </Typography.Text>
              </Card>
            ))}
          </div>
        ) : (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="No sub-modules"
          />
        )}

        {/* Actions */}
        {!module.isDeleted && perm.canDelete && (
          <Divider>
            <Typography.Text type="danger">Danger Zone</Typography.Text>
          </Divider>
        )}

        <div className="space-y-3">
          {module.isDeleted ? (
            perm.canDelete && (
              <Popconfirm
                title="Restore this module?"
                description="This will make the module active again"
                onConfirm={() => onRestore(module._id)}
              >
                <Button
                  block
                  icon={<RestOutlined />}
                  style={{ background: PURPLE_THEME.success, borderColor: PURPLE_THEME.success, color: 'white' }}
                >
                  Restore Module
                </Button>
              </Popconfirm>
            )
          ) : (
            perm.canDelete && (
              <Popconfirm
                title="Delete this module?"
                description="This will soft delete the module. You can restore it later."
                onConfirm={() => onDelete(module._id)}
              >
                <Button
                  block
                  danger
                  icon={<DeleteOutlined />}
                >
                  Delete Module
                </Button>
              </Popconfirm>
            )
          )}
        </div>
      </div>
    </Drawer>
  );
};

// Main Component
const Modules = () => {
  const { token } = useSelector(s => s.auth);
  const perm = useModulePermission();

  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('table'); // 'table' or 'grid'
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [subModalOpen, setSubModalOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    deleted: 0,
    withSubs: 0
  });
  const [filters, setFilters] = useState({});
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalResults: 0,
    itemsPerPage: 10,
  });
  const [searchQuery, setSearchQuery] = useState('');

  const fetchModules = useCallback(async (page = 1, itemsPerPage = 10, filters = {}) => {
    if (!perm.canView) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const response = await moduleService.getAll({
        page,
        limit: itemsPerPage,
        ...filters
      });
      
      const data = response.data || [];
      const paginationData = response.pagination || {};
      
      // Sort modules by position
      const sorted = data.sort((a, b) => a.position - b.position);
      setModules(sorted);
      
      // Calculate stats from current page data
      const total = paginationData.total || paginationData.totalRecords || 0;
      const active = data.filter(m => !m.isDeleted).length;
      const deleted = data.filter(m => m.isDeleted).length;
      const withSubs = data.filter(m => m.subModules?.some(s => !s.isDeleted)).length;
      
      setStats({ 
        total, 
        active, 
        deleted, 
        withSubs 
      });
      
      setPagination({
        currentPage: paginationData.page || page,
        totalPages: paginationData.totalPages || Math.ceil(total / itemsPerPage),
        totalResults: total,
        itemsPerPage: paginationData.limit || paginationData.perPage || itemsPerPage,
      });
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to load modules';
      showErrorAlert('Error', msg);
    } finally {
      setLoading(false);
    }
  }, [perm.canView]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      fetchModules(pagination.currentPage, pagination.itemsPerPage, filters);
    }
  }, [token, fetchModules]);

  const handleModuleDelete = async (id) => {
    try {
      await showSuccessAlert(
        'Confirm Delete',
        'Are you sure you want to delete this module?',
        'warning',
        true
      ).then(async (result) => {
        if (result.isConfirmed) {
          await moduleService.delete(id);
          showToast('Module deleted successfully', 'success');
          fetchModules(pagination.currentPage, pagination.itemsPerPage, filters);
        }
      });
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to delete module';
      showErrorAlert('Error', msg);
    }
  };

  const handleModuleRestore = async (id) => {
    try {
      await moduleService.restore(id);
      showToast('Module restored successfully', 'success');
      fetchModules(pagination.currentPage, pagination.itemsPerPage, filters);
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to restore module';
      showErrorAlert('Error', msg);
    }
  };

  // Table columns
  const columns = useMemo(() => [
    {
      key: 'name',
      title: 'Module Name',
      sortable: true,
      filterable: true,
      filterKey: 'name',
      render: (value, record) => (
        <div className="flex items-center gap-3">
          <Avatar 
            size={40}
            style={{ background: PURPLE_THEME.primaryBg, color: PURPLE_THEME.primary }}
            icon={<FolderOutlined />}
          />
          <div>
            <div className="font-semibold text-gray-900">{value}</div>
            <div className="text-sm text-gray-500">{record.route}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'description',
      title: 'Description',
      filterable: true,
      filterKey: 'description',
      render: (value) => (
        <Typography.Text type="secondary">
          {value || '—'}
        </Typography.Text>
      ),
    },
    {
      key: 'subModules',
      title: 'Sub-modules',
      render: (_, record) => {
        const activeSubs = record.subModules?.filter(s => !s.isDeleted) || [];
        return (
          <Badge
            count={activeSubs.length}
            style={{ background: PURPLE_THEME.primary }}
            showZero
          />
        );
      },
    },
    {
      key: 'isDeleted',
      title: 'Status',
      sortable: true,
      filterable: true,
      filterKey: 'isDeleted',
      filterOptions: [
        { value: false, label: 'Active' },
        { value: true, label: 'Deleted' },
      ],
      render: (value) => (
        <Tag color={value ? 'red' : 'green'} className="capitalize">
          {value ? 'Deleted' : 'Active'}
        </Tag>
      ),
    },
    {
      key: 'createdAt',
      title: 'Created',
      sortable: true,
      render: (value) => (
        <Typography.Text type="secondary">
          {new Date(value).toLocaleDateString()}
        </Typography.Text>
      ),
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (_, record) => (
        <Space>
          <Tooltip title="View Details">
            <Button
              type="link"
              icon={<EyeOutlined />}
              onClick={() => {
                setSelectedModule(record);
                setDetailsOpen(true);
              }}
            />
          </Tooltip>
          
          {perm.canEdit && !record.isDeleted && (
            <Tooltip title="Add Sub-module">
              <Button
                type="link"
                icon={<PlusOutlined />}
                onClick={() => {
                  setSelectedModule(record);
                  setSubModalOpen(true);
                }}
              />
            </Tooltip>
          )}
          
          {perm.canDelete && (
            record.isDeleted ? (
              <Tooltip title="Restore">
                <Button
                  type="link"
                  icon={<RestOutlined />}
                  onClick={() => handleModuleRestore(record._id)}
                />
              </Tooltip>
            ) : (
              <Popconfirm
                title="Delete this module?"
                onConfirm={() => handleModuleDelete(record._id)}
              >
                <Tooltip title="Delete">
                  <Button
                    type="link"
                    icon={<DeleteOutlined />}
                    danger
                  />
                </Tooltip>
              </Popconfirm>
            )
          )}
        </Space>
      ),
    },
  ], [perm]);

  const handlePageChange = (page, itemsPerPage) => {
    fetchModules(page, itemsPerPage, filters);
  };

  const handleFilter = (newFilters) => {
    // Handle search separately
    const { search, ...otherFilters } = newFilters;
    
    if (search !== undefined) {
      setSearchQuery(search);
    }
    
    const updatedFilters = { ...filters, ...otherFilters };
    if (search !== undefined) {
      updatedFilters.search = search;
    }
    
    setFilters(updatedFilters);
    fetchModules(1, pagination.itemsPerPage, updatedFilters);
  };

  const handleSearch = (value) => {
    const updatedFilters = { ...filters, search: value };
    setFilters(updatedFilters);
    setSearchQuery(value);
    fetchModules(1, pagination.itemsPerPage, updatedFilters);
  };

  const handleClearFilters = () => {
    setFilters({});
    setSearchQuery('');
    fetchModules(1, pagination.itemsPerPage, {});
  };

  // Grid view pagination
  const [gridPage, setGridPage] = useState(1);
  const [gridItemsPerPage, setGridItemsPerPage] = useState(12);
  
  const gridTotalPages = Math.ceil(pagination.totalResults / gridItemsPerPage);
  const gridStartIndex = (gridPage - 1) * gridItemsPerPage;
  const gridEndIndex = gridStartIndex + gridItemsPerPage;
  const gridDisplayModules = modules.slice(gridStartIndex, gridEndIndex);

  const handleGridPageChange = (page) => {
    setGridPage(page);
  };

  const handleGridItemsPerPageChange = (value) => {
    setGridItemsPerPage(value);
    setGridPage(1);
  };

  const renderGridPagination = () => {
    const totalPages = Math.ceil(pagination.totalResults / gridItemsPerPage);
    if (totalPages <= 1) return null;

    const renderPageNumbers = () => {
      const pages = [];
      const maxVisible = 5;
      let start = Math.max(1, gridPage - Math.floor(maxVisible / 2));
      let end = Math.min(totalPages, start + maxVisible - 1);

      if (end - start + 1 < maxVisible) {
        start = Math.max(1, end - maxVisible + 1);
      }

      // First page
      if (start > 1) {
        pages.push(
          <Button
            key="first"
            onClick={() => handleGridPageChange(1)}
            className="px-3 py-1"
          >
            1
          </Button>
        );
        if (start > 2) {
          pages.push(<span key="ellipsis1" className="px-2">...</span>);
        }
      }

      // Page numbers
      for (let i = start; i <= end; i++) {
        pages.push(
          <Button
            key={i}
            onClick={() => handleGridPageChange(i)}
            type={gridPage === i ? 'primary' : 'default'}
            className={`px-3 py-1 ${gridPage === i ? '' : 'border'}`}
          >
            {i}
          </Button>
        );
      }

      // Last page
      if (end < totalPages) {
        if (end < totalPages - 1) {
          pages.push(<span key="ellipsis2" className="px-2">...</span>);
        }
        pages.push(
          <Button
            key="last"
            onClick={() => handleGridPageChange(totalPages)}
            className="px-3 py-1"
          >
            {totalPages}
          </Button>
        );
      }

      return pages;
    };

    return (
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 pt-4 border-t">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">{gridStartIndex + 1}</span> to{' '}
          <span className="font-medium">{Math.min(gridEndIndex, pagination.totalResults)}</span> of{' '}
          <span className="font-medium">{pagination.totalResults}</span> modules
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">Rows per page:</span>
            <select
              value={gridItemsPerPage}
              onChange={(e) => handleGridItemsPerPageChange(Number(e.target.value))}
              className="border rounded px-2 py-1 text-sm"
            >
              {[6, 12, 24, 48].map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => handleGridPageChange(gridPage - 1)}
              disabled={gridPage === 1}
              className="px-3 py-1"
            >
              Previous
            </Button>
            <div className="flex gap-1">
              {renderPageNumbers()}
            </div>
            <Button
              onClick={() => handleGridPageChange(gridPage + 1)}
              disabled={gridPage >= totalPages}
              className="px-3 py-1"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    );
  };

  if (loading && modules.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!perm.canView) {
    return (
      <div className="p-8 text-center">
        <Typography.Title level={4} type="secondary">
          🔒 You do not have permission to view Modules.
        </Typography.Title>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <Typography.Title level={3} style={{ margin: 0, color: PURPLE_THEME.dark }}>
            Modules Management
          </Typography.Title>
          
          <Space>
            <Tooltip title={view === 'table' ? 'Grid View' : 'Table View'}>
              <Button
                icon={view === 'table' ? <AppstoreOutlined /> : <UnorderedListOutlined />}
                onClick={() => setView(view === 'table' ? 'grid' : 'table')}
                style={{ color: PURPLE_THEME.primary }}
              />
            </Tooltip>
            
            {perm.canAdd && (
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => setCreateModalOpen(true)}
                style={{ background: PURPLE_THEME.primary, borderColor: PURPLE_THEME.primary }}
              >
                Add Module
              </Button>
            )}
          </Space>
        </div>

        {/* Stats Cards */}
        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={24} sm={6}>
            <ProCard>
              <Statistic
                title="Total Modules"
                value={stats.total}
                valueStyle={{ color: PURPLE_THEME.primary }}
                prefix={<FolderOutlined />}
              />
            </ProCard>
          </Col>
          <Col xs={24} sm={6}>
            <ProCard>
              <Statistic
                title="Active"
                value={stats.active}
                valueStyle={{ color: PURPLE_THEME.success }}
                prefix={<InfoCircleOutlined />}
              />
            </ProCard>
          </Col>
          <Col xs={24} sm={6}>
            <ProCard>
              <Statistic
                title="Deleted"
                value={stats.deleted}
                valueStyle={{ color: PURPLE_THEME.error }}
                prefix={<DeleteOutlined />}
              />
            </ProCard>
          </Col>
          <Col xs={24} sm={6}>
            <ProCard>
              <Statistic
                title="With Sub-modules"
                value={stats.withSubs}
                valueStyle={{ color: PURPLE_THEME.info }}
                prefix={<SettingOutlined />}
              />
            </ProCard>
          </Col>
        </Row>
      </div>

      {/* Main Content */}
      {view === 'table' ? (
        <ProCard title="All Modules">
          <CustomTable
            columns={columns}
            data={modules}
            totalItems={pagination.totalResults}
            currentPage={pagination.currentPage}
            itemsPerPage={pagination.itemsPerPage}
            onPageChange={handlePageChange}
            onFilter={handleFilter}
            loading={loading}
          />
        </ProCard>
      ) : (
        <>
          <ProCard title="Modules Grid View">
            {/* Grid View Search */}
            <div className="mb-6">
              <Input.Search
                placeholder="Search modules..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onSearch={handleSearch}
                onPressEnter={(e) => handleSearch(e.target.value)}
                enterButton
                style={{ width: 300 }}
              />
            </div>

            {/* Grid Content */}
            {gridDisplayModules.length > 0 ? (
              <>
                <Row gutter={[16, 16]}>
                  {gridDisplayModules.map(module => (
                    <Col xs={24} sm={12} md={8} lg={6} key={module._id}>
                      <ProCard
                        className="h-full"
                        bodyStyle={{ padding: '20px' }}
                      >
                        <div className="flex flex-col h-full">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <Avatar 
                                size={40}
                                style={{ background: PURPLE_THEME.primaryBg, color: PURPLE_THEME.primary }}
                                icon={<FolderOutlined />}
                              />
                              <div>
                                <Typography.Text strong style={{ fontSize: '16px' }}>
                                  {module.name}
                                </Typography.Text>
                                <div className="text-sm text-gray-500">{module.route}</div>
                              </div>
                            </div>
                            <Tag color={module.isDeleted ? 'red' : 'green'}>
                              {module.isDeleted ? 'Deleted' : 'Active'}
                            </Tag>
                          </div>

                          <Typography.Paragraph
                            type="secondary"
                            ellipsis={{ rows: 2 }}
                            className="flex-grow"
                          >
                            {module.description || 'No description'}
                          </Typography.Paragraph>

                          <div className="flex items-center justify-between mt-4 pt-3 border-t">
                            <Badge
                              count={module.subModules?.filter(s => !s.isDeleted).length || 0}
                              style={{ background: PURPLE_THEME.primary }}
                              showZero
                              title="Sub-modules"
                            />
                            
                            <Space>
                              <Tooltip title="View Details">
                                <Button
                                  size="small"
                                  icon={<EyeOutlined />}
                                  onClick={() => {
                                    setSelectedModule(module);
                                    setDetailsOpen(true);
                                  }}
                                />
                              </Tooltip>
                              
                              {perm.canEdit && !module.isDeleted && (
                                <Tooltip title="Add Sub-module">
                                  <Button
                                    size="small"
                                    icon={<PlusOutlined />}
                                    onClick={() => {
                                      setSelectedModule(module);
                                      setSubModalOpen(true);
                                    }}
                                  />
                                </Tooltip>
                              )}
                              
                              {perm.canDelete && (
                                <Tooltip title={module.isDeleted ? 'Restore' : 'Delete'}>
                                  <Button
                                    size="small"
                                    icon={module.isDeleted ? <RestOutlined /> : <DeleteOutlined />}
                                    danger={!module.isDeleted}
                                    onClick={() => module.isDeleted ? handleModuleRestore(module._id) : handleModuleDelete(module._id)}
                                  />
                                </Tooltip>
                              )}
                            </Space>
                          </div>
                        </div>
                      </ProCard>
                    </Col>
                  ))}
                </Row>
                
                {/* Grid Pagination */}
                {renderGridPagination()}
              </>
            ) : (
              <Empty
                description={
                  <div>
                    <Typography.Text type="secondary">No modules found</Typography.Text>
                    {searchQuery && (
                      <div className="mt-2">
                        <Button type="link" onClick={handleClearFilters}>
                          Clear search
                        </Button>
                      </div>
                    )}
                  </div>
                }
              />
            )}
          </ProCard>
        </>
      )}

      {/* Dialogs */}
      <CreateModuleModal
        open={createModalOpen}
        onCancel={() => setCreateModalOpen(false)}
        onSuccess={() => fetchModules(pagination.currentPage, pagination.itemsPerPage, filters)}
      />
      
      <CreateSubModuleModal
        open={subModalOpen}
        moduleId={selectedModule?._id}
        moduleName={selectedModule?.name}
        onCancel={() => setSubModalOpen(false)}
        onSuccess={() => fetchModules(pagination.currentPage, pagination.itemsPerPage, filters)}
      />
      
      <ModuleDetailsDrawer
        open={detailsOpen}
        module={selectedModule}
        onClose={() => {
          setDetailsOpen(false);
          setSelectedModule(null);
        }}
        onEdit={() => fetchModules(pagination.currentPage, pagination.itemsPerPage, filters)}
        onDelete={handleModuleDelete}
        onRestore={handleModuleRestore}
        perm={perm}
      />
    </div>
  );
};

export default Modules;