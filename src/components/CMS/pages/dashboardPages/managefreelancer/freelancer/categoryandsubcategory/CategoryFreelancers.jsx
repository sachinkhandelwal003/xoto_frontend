import React, { useState, useEffect, useCallback, useMemo } from 'react';
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
  Alert,
  Avatar,
  Popconfirm,
  Empty,
  Input,
  Form,
  Modal,
  Select,
  Tabs,
  Descriptions,
} from 'antd';

import {
  PlusOutlined,
  EyeOutlined,
  EditOutlined,
  RestOutlined,
  SearchOutlined,
  InfoCircleOutlined,
  CloseOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

import {
  FiTrash2,
  FiArrowLeft,
  FiRefreshCw
} from 'react-icons/fi';

import {
  FaLaptopCode, FaMobileAlt, FaPaintBrush, FaBullhorn, FaCamera, FaPenFancy,
  FaVideo, FaChartLine, FaCogs, FaHeadset, FaShieldAlt, FaWordpress, FaReact,
  FaNodeJs, FaPython, FaDatabase, FaCloud, FaShoppingCart, FaUsers, FaBriefcase,
  FaLightbulb, FaRocket, FaStar, FaHeart, FaCertificate, FaLayerGroup, FaTag
} from 'react-icons/fa';

import CustomTable from '../../../../../../../components/CMS/pages/custom/CustomTable';
import { apiService } from '../../../../../../../manageApi/utils/custom.apiservice';
import { showToast } from '../../../../../../../manageApi/utils/toast';
import { showConfirmDialog, showSuccessAlert, showErrorAlert } from '../../../../../../../manageApi/utils/sweetAlert';

const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;

// Theme colors - PURPLE
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

const iconOptions = [
  { value: 'FaLaptopCode', label: 'Web Development', icon: <FaLaptopCode /> },
  { value: 'FaMobileAlt', label: 'Mobile App', icon: <FaMobileAlt /> },
  { value: 'FaPaintBrush', label: 'Graphic Design', icon: <FaPaintBrush /> },
  { value: 'FaBullhorn', label: 'Digital Marketing', icon: <FaBullhorn /> },
  { value: 'FaCamera', label: 'Photography', icon: <FaCamera /> },
  { value: 'FaPenFancy', label: 'Content Writing', icon: <FaPenFancy /> },
  { value: 'FaVideo', label: 'Video Editing', icon: <FaVideo /> },
  { value: 'FaChartLine', label: 'SEO', icon: <FaChartLine /> },
  { value: 'FaCogs', label: 'Automation', icon: <FaCogs /> },
  { value: 'FaHeadset', label: 'Virtual Assistant', icon: <FaHeadset /> },
  { value: 'FaShieldAlt', label: 'Cybersecurity', icon: <FaShieldAlt /> },
  { value: 'FaWordpress', label: 'WordPress', icon: <FaWordpress /> },
  { value: 'FaReact', label: 'React.js', icon: <FaReact /> },
  { value: 'FaNodeJs', label: 'Node.js', icon: <FaNodeJs /> },
  { value: 'FaPython', label: 'Python', icon: <FaPython /> },
  { value: 'FaDatabase', label: 'Database', icon: <FaDatabase /> },
  { value: 'FaCloud', label: 'Cloud Services', icon: <FaCloud /> },
  { value: 'FaShoppingCart', label: 'E-commerce', icon: <FaShoppingCart /> },
  { value: 'FaUsers', label: 'Customer Support', icon: <FaUsers /> },
  { value: 'FaBriefcase', label: 'Business Consulting', icon: <FaBriefcase /> },
  { value: 'FaLightbulb', label: 'Strategy & Ideas', icon: <FaLightbulb /> },
  { value: 'FaRocket', label: 'Startup Services', icon: <FaRocket /> },
  { value: 'FaStar', label: 'Premium Service', icon: <FaStar /> },
  { value: 'FaHeart', label: 'Branding', icon: <FaHeart /> },
  { value: 'FaCertificate', label: 'Certified Expert', icon: <FaCertificate /> },
];

// Category Creation Modal
const CreateCategoryModal = ({ open, onCancel, onSuccess, isSubcategory = false, parentCategory = null }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [activeCategories, setActiveCategories] = useState([]);

  useEffect(() => {
    if (isSubcategory) {
      fetchActiveCategories();
    }
  }, [isSubcategory]);

  const fetchActiveCategories = async () => {
    try {
      const params = {
        active: true,
        is_deleted: false,
        limit: 100
      };
      const res = await apiService.get('/freelancer/category', params);
      setActiveCategories(res.data || []);
    } catch (err) {
      console.error('Error fetching active categories:', err);
    }
  };

  const getIconComponent = (iconName) => {
    const map = {
      FaLaptopCode, FaMobileAlt, FaPaintBrush, FaBullhorn, FaCamera, FaPenFancy,
      FaVideo, FaChartLine, FaCogs, FaHeadset, FaShieldAlt, FaWordpress, FaReact,
      FaNodeJs, FaPython, FaDatabase, FaCloud, FaShoppingCart, FaUsers, FaBriefcase,
      FaLightbulb, FaRocket, FaStar, FaHeart, FaCertificate,
    };
    const Icon = map[iconName];
    return Icon ? <Icon /> : <FaLaptopCode />;
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const payload = {
        ...values,
        icon: values.icon || 'FaLaptopCode',
        is_active: true
      };
      
      if (isSubcategory && values.category) {
        payload.category = values.category;
      }
      
      const endpoint = isSubcategory ? '/freelancer/subcategory' : '/freelancer/category';
      await apiService.post(endpoint, payload);
      
      showSuccessAlert('Success', `${isSubcategory ? 'Subcategory' : 'Category'} created successfully`);
      form.resetFields();
      onSuccess();
      onCancel();
    } catch (err) {
      const msg = err.response?.data?.message || `Failed to create ${isSubcategory ? 'subcategory' : 'category'}`;
      showErrorAlert('Error', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <PlusOutlined style={{ color: PURPLE_THEME.primary }} />
          <span>Create New {isSubcategory ? 'Subcategory' : 'Category'}</span>
        </div>
      }
      open={open}
      onCancel={onCancel}
      footer={null}
      width={600}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ icon: 'FaLaptopCode' }}
      >
        {isSubcategory && (
          <Form.Item
            name="category"
            label="Parent Category"
            rules={[{ required: true, message: 'Please select a parent category' }]}
            initialValue={parentCategory}
          >
            <Select
              placeholder="Select parent category"
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {activeCategories.map(cat => (
                <Option key={cat._id} value={cat._id}>
                  <div className="flex items-center gap-3">
                    {getIconComponent(cat.icon || 'FaLaptopCode')}
                    <span className="font-medium">{cat.name}</span>
                  </div>
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}

        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: 'Please enter name' }]}
        >
          <Input 
            placeholder={`e.g., ${isSubcategory ? 'React.js Development' : 'Web Development'}`} 
          />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
        >
          <TextArea 
            rows={3} 
            placeholder="Describe this service category..." 
            showCount 
            maxLength={200} 
          />
        </Form.Item>

        <Form.Item
          name="icon"
          label="Icon"
          rules={[{ required: true, message: 'Please select an icon' }]}
        >
          <Select
            showSearch
            optionLabelProp="label"
            placeholder="Select an icon"
            filterOption={(input, option) =>
              option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {iconOptions.map(opt => (
              <Option key={opt.value} value={opt.value} label={opt.label}>
                <div className="flex items-center gap-4 py-2">
                  <span className="text-purple-600 text-xl">{opt.icon}</span>
                  <span className="font-medium">{opt.label}</span>
                </div>
              </Option>
            ))}
          </Select>
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
            Create {isSubcategory ? 'Subcategory' : 'Category'}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

// Category Details Drawer
const CategoryDetailsDrawer = ({ open, category, onClose, onEdit, onDelete, onRestore, isSubcategory = false }) => {
  const [editMode, setEditMode] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (category) {
      form.setFieldsValue({
        name: category.name,
        description: category.description || '',
        icon: category.icon || 'FaLaptopCode',
        is_active: category.is_active !== undefined ? category.is_active : true
      });
    }
  }, [category, form]);

  const getIconComponent = (iconName) => {
    const map = {
      FaLaptopCode, FaMobileAlt, FaPaintBrush, FaBullhorn, FaCamera, FaPenFancy,
      FaVideo, FaChartLine, FaCogs, FaHeadset, FaShieldAlt, FaWordpress, FaReact,
      FaNodeJs, FaPython, FaDatabase, FaCloud, FaShoppingCart, FaUsers, FaBriefcase,
      FaLightbulb, FaRocket, FaStar, FaHeart, FaCertificate,
    };
    const Icon = map[iconName];
    return Icon ? <Icon /> : <FaLaptopCode />;
  };

  const handleSave = async (values) => {
    setLoading(true);
    try {
      const endpoint = isSubcategory ? '/freelancer/subcategory' : '/freelancer/category';
      await apiService.put(`${endpoint}/${category._id}`, values);
      showToast(`${isSubcategory ? 'Subcategory' : 'Category'} updated successfully`, 'success');
      setEditMode(false);
      onEdit();
    } catch (err) {
      const msg = err.response?.data?.message || `Failed to update ${isSubcategory ? 'subcategory' : 'category'}`;
      showErrorAlert('Error', msg);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await showSuccessAlert(
        'Confirm Delete',
        `Are you sure you want to delete this ${isSubcategory ? 'subcategory' : 'category'}?`,
        'warning',
        true
      ).then(async (result) => {
        if (result.isConfirmed) {
          const endpoint = isSubcategory ? '/freelancer/subcategory' : '/freelancer/category';
          await apiService.delete(`${endpoint}/${category._id}`);
          showToast(`${isSubcategory ? 'Subcategory' : 'Category'} deleted successfully`, 'success');
          onDelete();
          onClose();
        }
      });
    } catch (err) {
      const msg = err.response?.data?.message || `Failed to delete ${isSubcategory ? 'subcategory' : 'category'}`;
      showErrorAlert('Error', msg);
    }
  };

  const handleRestore = async () => {
    try {
      const endpoint = isSubcategory ? '/freelancer/subcategory' : '/freelancer/category';
      await apiService.put(`${endpoint}/${category._id}/restore`);
      showToast(`${isSubcategory ? 'Subcategory' : 'Category'} restored successfully`, 'success');
      onRestore();
      onClose();
    } catch (err) {
      const msg = err.response?.data?.message || `Failed to restore ${isSubcategory ? 'subcategory' : 'category'}`;
      showErrorAlert('Error', msg);
    }
  };

  if (!category) return null;

  return (
    <Drawer
      title={
        <div className="flex items-center gap-3">
          <Avatar 
            size={40}
            style={{ background: PURPLE_THEME.primaryBg, color: PURPLE_THEME.primary }}
            icon={getIconComponent(category.icon || 'FaLaptopCode')}
          />
          <div>
            <Typography.Title level={4} style={{ margin: 0 }}>
              {category.name}
            </Typography.Title>
            <Typography.Text type="secondary">
              {isSubcategory ? 'Subcategory' : 'Category'}
            </Typography.Text>
          </div>
        </div>
      }
      placement="right"
      onClose={onClose}
      open={open}
      width={600}
      destroyOnClose
      extra={
        <Space>
          {!editMode && !category.is_deleted && (
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
          <Tag color={category.is_deleted ? 'red' : category.is_active ? 'green' : 'orange'}>
            {category.is_deleted ? 'Deleted' : category.is_active ? 'Active' : 'Inactive'}
          </Tag>
          <Typography.Text type="secondary" className="ml-4">
            Created: {new Date(category.created_at).toLocaleDateString()}
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
            <Col span={24}>
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Required' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Description"
                name="description"
              >
                <TextArea rows={3} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Icon"
                name="icon"
              >
                <Select
                  showSearch
                  optionLabelProp="label"
                  placeholder="Select an icon"
                >
                  {iconOptions.map(opt => (
                    <Option key={opt.value} value={opt.value} label={opt.label}>
                      <div className="flex items-center gap-4 py-2">
                        <span className="text-purple-600 text-xl">{opt.icon}</span>
                        <span className="font-medium">{opt.label}</span>
                      </div>
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Status"
                name="is_active"
                valuePropName="checked"
              >
                <Switch
                  checkedChildren="Active"
                  unCheckedChildren="Inactive"
                />
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

        {/* Additional Info */}
        <Divider orientation="left">
          <Tag color="purple" icon={<InfoCircleOutlined />}>
            Additional Information
          </Tag>
        </Divider>

        <Descriptions column={1} size="small">
          <Descriptions.Item label="ID">
            <Typography.Text copyable>{category._id}</Typography.Text>
          </Descriptions.Item>
          <Descriptions.Item label="Created At">
            {new Date(category.created_at).toLocaleString()}
          </Descriptions.Item>
          {category.updated_at && (
            <Descriptions.Item label="Last Updated">
              {new Date(category.updated_at).toLocaleString()}
            </Descriptions.Item>
          )}
          {isSubcategory && category.category && (
            <Descriptions.Item label="Parent Category">
              <Tag color="purple">{category.category?.name || category.category}</Tag>
            </Descriptions.Item>
          )}
        </Descriptions>

        {/* Actions */}
        {!category.is_deleted && (
          <Divider>
            <Typography.Text type="danger">Danger Zone</Typography.Text>
          </Divider>
        )}

        <div className="space-y-3">
          {category.is_deleted ? (
            <Popconfirm
              title={`Restore this ${isSubcategory ? 'subcategory' : 'category'}?`}
              description={`This will make the ${isSubcategory ? 'subcategory' : 'category'} active again`}
              onConfirm={handleRestore}
            >
              <Button
                block
                icon={<RestOutlined />}
                style={{ background: PURPLE_THEME.success, borderColor: PURPLE_THEME.success, color: 'white' }}
              >
                Restore {isSubcategory ? 'Subcategory' : 'Category'}
              </Button>
            </Popconfirm>
          ) : (
            <Popconfirm
              title={`Delete this ${isSubcategory ? 'subcategory' : 'category'}?`}
              description="This will soft delete. You can restore it later."
              onConfirm={handleDelete}
            >
              <Button
                block
                danger
                icon={<DeleteOutlined />}
              >
                Delete {isSubcategory ? 'Subcategory' : 'Category'}
              </Button>
            </Popconfirm>
          )}
        </div>
      </div>
    </Drawer>
  );
};

// Main Component
const CategoryFreelancers = () => {
  const { token } = useSelector(s => s.auth);

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [activeCategories, setActiveCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('categories');
  const [showTrash, setShowTrash] = useState(false);
  
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState(null);

  const [catPagination, setCatPagination] = useState({
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0,
  });

  const [subPagination, setSubPagination] = useState({
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0,
  });

  // Fetch active categories for filter dropdown
  const fetchActiveCategories = useCallback(async () => {
    try {
      const params = {
        active: true,
        is_deleted: false,
        limit: 100
      };
      const res = await apiService.get('/freelancer/category', params);
      setActiveCategories(res.data || []);
    } catch (err) {
      console.error('Error fetching active categories:', err);
    }
  }, []);

  // Fetch Categories
  const fetchCategories = useCallback(async (page = 1, limit = 10, filters = {}) => {
    setLoading(true);
    try {
      const params = {
        page,
        limit,
        ...filters,
        is_deleted: showTrash,
      };

      if (statusFilter !== 'all') {
        params.is_active = statusFilter === 'active';
      }

      if (searchQuery) {
        params.search = searchQuery;
      }

      const res = await apiService.get('/freelancer/category', params);
      setCategories(res.data || []);
      setCatPagination({
        currentPage: res.pagination?.page || page,
        itemsPerPage: res.pagination?.limit || limit,
        totalItems: res.pagination?.total || 0,
      });
    } catch (err) {
      console.error('Error fetching categories:', err);
      showErrorAlert('Error', 'Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  }, [showTrash, statusFilter, searchQuery]);

  // Fetch Subcategories
  const fetchSubcategories = useCallback(async (page = 1, limit = 10, filters = {}) => {
    setLoading(true);
    try {
      const params = {
        page,
        limit,
        ...filters,
        is_deleted: showTrash,
      };

      if (categoryFilter) {
        params.category = categoryFilter;
      }

      if (statusFilter !== 'all') {
        params.is_active = statusFilter === 'active';
      }

      if (searchQuery) {
        params.search = searchQuery;
      }

      const res = await apiService.get('/freelancer/subcategory', params);
      setSubcategories(res.data || []);
      setSubPagination({
        currentPage: res.pagination?.page || page,
        itemsPerPage: res.pagination?.limit || limit,
        totalItems: res.pagination?.total || 0,
      });
    } catch (err) {
      console.error('Error fetching subcategories:', err);
      showErrorAlert('Error', 'Failed to fetch subcategories');
    } finally {
      setLoading(false);
    }
  }, [showTrash, categoryFilter, statusFilter, searchQuery]);

  // Initial load
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      fetchActiveCategories();
      fetchCategories(catPagination.currentPage, catPagination.itemsPerPage);
    }
  }, [token]);

  // Handle tab change
  useEffect(() => {
    if (activeTab === 'subcategories') {
      fetchSubcategories(subPagination.currentPage, subPagination.itemsPerPage);
    }
  }, [activeTab]);

  const handleTabChange = (key) => {
    setActiveTab(key);
    setShowTrash(false);
    setSearchQuery('');
    setStatusFilter('all');
    setCategoryFilter(null);
  };

  const handleFilterChange = () => {
    if (activeTab === 'categories') {
      fetchCategories(1, catPagination.itemsPerPage);
    } else {
      fetchSubcategories(1, subPagination.itemsPerPage);
    }
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setCategoryFilter(null);
    if (activeTab === 'categories') {
      fetchCategories(1, catPagination.itemsPerPage);
    } else {
      fetchSubcategories(1, subPagination.itemsPerPage);
    }
  };

  const handleDelete = async (item) => {
    const confirmed = await showConfirmDialog(
      `Delete ${activeTab === 'categories' ? 'Category' : 'Subcategory'}`,
      `Move "${item.name}" to trash?`,
      'Delete'
    );
    if (!confirmed) return;

    try {
      const endpoint = activeTab === 'subcategories' ? '/freelancer/subcategory' : '/freelancer/category';
      await apiService.delete(`${endpoint}/${item._id}`);
      showSuccessAlert('Success', 'Moved to trash');
      if (activeTab === 'categories') {
        fetchCategories(catPagination.currentPage, catPagination.itemsPerPage);
      } else {
        fetchSubcategories(subPagination.currentPage, subPagination.itemsPerPage);
      }
    } catch (err) {
      showErrorAlert('Error', err.response?.data?.message || 'Delete failed');
    }
  };

  const handleRestore = async (item) => {
    const confirmed = await showConfirmDialog(
      `Restore ${activeTab === 'categories' ? 'Category' : 'Subcategory'}`,
      `Restore "${item.name}"?`,
      'Restore'
    );
    if (!confirmed) return;

    try {
      const endpoint = activeTab === 'subcategories' ? '/freelancer/subcategory' : '/freelancer/category';
      await apiService.put(`${endpoint}/${item._id}/restore`);
      showSuccessAlert('Success', 'Restored successfully');
      if (activeTab === 'categories') {
        fetchCategories(catPagination.currentPage, catPagination.itemsPerPage);
      } else {
        fetchSubcategories(subPagination.currentPage, subPagination.itemsPerPage);
      }
    } catch (err) {
      showErrorAlert('Error', err.response?.data?.message || 'Restore failed');
    }
  };

  const getIconComponent = (iconName) => {
    const map = {
      FaLaptopCode, FaMobileAlt, FaPaintBrush, FaBullhorn, FaCamera, FaPenFancy,
      FaVideo, FaChartLine, FaCogs, FaHeadset, FaShieldAlt, FaWordpress, FaReact,
      FaNodeJs, FaPython, FaDatabase, FaCloud, FaShoppingCart, FaUsers, FaBriefcase,
      FaLightbulb, FaRocket, FaStar, FaHeart, FaCertificate,
    };
    const Icon = map[iconName];
    return Icon ? <Icon /> : <FaLaptopCode />;
  };

  // Get columns based on active tab
  const getColumns = useMemo(() => {
    const baseColumns = [
      {
        key: 'icon',
        title: 'Icon',
        sortable: false,
        filterable: false,
        render: (_, item) => (
          <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center text-purple-600">
            {getIconComponent(item.icon || 'FaLaptopCode')}
          </div>
        ),
      },
      {
        key: 'name',
        title: 'Name',
        sortable: true,
        filterKey: 'name',
        render: (_, item) => (
          <div>
            <div className="font-semibold text-gray-900">{item.name}</div>
            {activeTab === 'subcategories' && item.category && (
              <div className="text-xs text-purple-600 mt-1">
                {item.category?.name || item.category}
              </div>
            )}
          </div>
        ),
      },
      {
        key: 'description',
        title: 'Description',
        sortable: false,
        filterKey: 'description',
        render: (d) => (
          <span className="text-sm text-gray-600 line-clamp-2">{d || 'No description'}</span>
        ),
      },
      {
        key: 'is_active',
        title: 'Status',
        sortable: true,
        filterable: true,
        filterKey: 'is_active',
        filterOptions: [
          { value: true, label: 'Active' },
          { value: false, label: 'Inactive' },
        ],
        render: (_, item) => {
          let status = 'active';
          if (item.is_deleted) status = 'deleted';
          else if (!item.is_active) status = 'inactive';
          
          return (
            <Tag color={status === 'deleted' ? 'red' : status === 'active' ? 'green' : 'orange'}>
              {status === 'deleted' ? 'Deleted' : status === 'active' ? 'Active' : 'Inactive'}
            </Tag>
          );
        }
      },
     
      {
        key: 'actions',
        title: 'Actions',
        render: (_, item) => (
          <Space>
            <Tooltip title="View Details">
              <Button
                type="link"
                icon={<EyeOutlined />}
                onClick={() => {
                  setSelectedCategory(item);
                  setDetailsOpen(true);
                }}
              />
            </Tooltip>
            
            {!showTrash && (
              <Tooltip title="Edit">
                <Button
                  type="link"
                  icon={<EditOutlined />}
                  onClick={() => {
                    setSelectedCategory(item);
                    setDetailsOpen(true);
                  }}
                />
              </Tooltip>
            )}
            
            {showTrash ? (
              <Popconfirm
                title="Restore?"
                onConfirm={() => handleRestore(item)}
              >
                <Tooltip title="Restore">
                  <Button
                    type="link"
                    icon={<FiArrowLeft className="text-green-600" />}
                  />
                </Tooltip>
              </Popconfirm>
            ) : (
              <Popconfirm
                title="Move to trash?"
                onConfirm={() => handleDelete(item)}
              >
                <Tooltip title="Delete">
                  <Button
                    type="link"
                    icon={<DeleteOutlined />}
                    danger
                  />
                </Tooltip>
              </Popconfirm>
            )}
          </Space>
        ),
      },
    ];

    return baseColumns;
  }, [activeTab, showTrash]);

  // Get trash count
  const getTrashCount = () => {
    const data = activeTab === 'categories' ? categories : subcategories;
    return data.filter(item => item.is_deleted).length;
  };

  if (loading && categories.length === 0 && subcategories.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <Typography.Title level={3} style={{ margin: 0, color: PURPLE_THEME.dark }}>
              Freelancer Categories
            </Typography.Title>
            <Typography.Text type="secondary">
              Manage service categories and subcategories for freelancers
            </Typography.Text>
          </div>
          
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setCreateModalOpen(true)}
            style={{ background: PURPLE_THEME.primary, borderColor: PURPLE_THEME.primary }}
          >
            Add {activeTab === 'categories' ? 'Category' : 'Subcategory'}
          </Button>
        </div>
      </div>

    

      {/* Main Content */}
      <Card className="shadow-sm" title={
        <div className="flex justify-between items-center">
          <Tabs
            activeKey={activeTab}
            onChange={handleTabChange}
            size="large"
          >
            <TabPane
              tab={
                <span className="flex items-center gap-2">
                  <FaLayerGroup />
                  Categories
                </span>
              }
              key="categories"
            />
            <TabPane
              tab={
                <span className="flex items-center gap-2">
                  <FaTag />
                  Subcategories
                </span>
              }
              key="subcategories"
            />
          </Tabs>
        </div>
      }>
        {activeTab === 'categories' ? (
          <CustomTable
            columns={getColumns}
            data={categories}
            loading={loading}
            totalItems={catPagination.totalItems}
            currentPage={catPagination.currentPage}
            itemsPerPage={catPagination.itemsPerPage}
            onPageChange={(page, pageSize) => {
              fetchCategories(page, pageSize);
              setCatPagination(prev => ({ ...prev, currentPage: page, itemsPerPage: pageSize }));
            }}
            onFilter={handleFilterChange}
          />
        ) : (
          <CustomTable
            columns={getColumns}
            data={subcategories}
            loading={loading}
            totalItems={subPagination.totalItems}
            currentPage={subPagination.currentPage}
            itemsPerPage={subPagination.itemsPerPage}
            onPageChange={(page, pageSize) => {
              fetchSubcategories(page, pageSize);
              setSubPagination(prev => ({ ...prev, currentPage: page, itemsPerPage: pageSize }));
            }}
            onFilter={handleFilterChange}
          />
        )}
      </Card>

      {/* Modals and Drawers */}
      <CreateCategoryModal
        open={createModalOpen}
        onCancel={() => setCreateModalOpen(false)}
        onSuccess={() => {
          if (activeTab === 'categories') {
            fetchCategories(catPagination.currentPage, catPagination.itemsPerPage);
          } else {
            fetchSubcategories(subPagination.currentPage, subPagination.itemsPerPage);
          }
        }}
        isSubcategory={activeTab === 'subcategories'}
        parentCategory={categoryFilter}
      />
      
      <CategoryDetailsDrawer
        open={detailsOpen}
        category={selectedCategory}
        onClose={() => {
          setDetailsOpen(false);
          setSelectedCategory(null);
        }}
        onEdit={() => {
          if (activeTab === 'categories') {
            fetchCategories(catPagination.currentPage, catPagination.itemsPerPage);
          } else {
            fetchSubcategories(subPagination.currentPage, subPagination.itemsPerPage);
          }
        }}
        onDelete={() => {
          if (activeTab === 'categories') {
            fetchCategories(catPagination.currentPage, catPagination.itemsPerPage);
          } else {
            fetchSubcategories(subPagination.currentPage, subPagination.itemsPerPage);
          }
        }}
        onRestore={() => {
          if (activeTab === 'categories') {
            fetchCategories(catPagination.currentPage, catPagination.itemsPerPage);
          } else {
            fetchSubcategories(subPagination.currentPage, subPagination.itemsPerPage);
          }
        }}
        isSubcategory={activeTab === 'subcategories'}
      />
    </div>
  );
};

export default CategoryFreelancers;