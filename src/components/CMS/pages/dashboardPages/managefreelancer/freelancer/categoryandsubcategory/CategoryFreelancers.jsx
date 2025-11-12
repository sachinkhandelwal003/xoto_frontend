import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  Button,
  Tag,
  Tooltip,
  Spin,
  Typography,
  Space,
  Modal,
  Form,
  Input,
  Upload,
  message,
  Tabs,
  Select,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  InboxOutlined,
} from '@ant-design/icons';
import { FiTrash2 } from 'react-icons/fi';
import CustomTable from '../../../../../../../components/CMS/pages/custom/CustomTable';
import { apiService } from '../../../../../../../manageApi/utils/custom.apiservice';
import { showToast } from '../../../../../../../manageApi/utils/toast';
import { showConfirmDialog } from '../../../../../../../manageApi/utils/sweetAlert';

const { TextArea } = Input;
const { Option } = Select;

const CategoryFreelancers = () => {
  const { token } = useSelector(s => s.auth);

  // Shared
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('categories');
  const [showTrash, setShowTrash] = useState(false);

  // Category
  const [categories, setCategories] = useState([]);
  const [catFilters, setCatFilters] = useState({ search: '', active: true });
  const [catPagination, setCatPagination] = useState({ currentPage: 1, itemsPerPage: 10, totalItems: 0 });

  // Subcategory
  const [subcategories, setSubcategories] = useState([]);
  const [subFilters, setSubFilters] = useState({ search: '', active: true, category: '' });
  const [subPagination, setSubPagination] = useState({ currentPage: 1, itemsPerPage: 10, totalItems: 0 });

  // Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingItem, setEditingItem] = useState(null);
  const [uploading, setUploading] = useState(false);

  /* --------------------- Fetch Categories --------------------- */
  const fetchCategories = useCallback(async (page = 1, limit = 10, filters = {}) => {
    setLoading(true);
    try {
      const params = {
        page, limit,
        active: filters.active !== undefined ? filters.active : true,
        is_deleted: showTrash.toString(),
        ...(filters.search && { search: filters.search }),
      };
      const res = await apiService.get('/freelancer/category', { params });
      setCategories(res.categories || []);
      setCatPagination({
        currentPage: res.pagination.page,
        itemsPerPage: res.pagination.limit,
        totalItems: res.pagination.total,
      });
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to load categories', 'error');
    } finally {
      setLoading(false);
    }
  }, [showTrash]);

  /* --------------------- Fetch Subcategories --------------------- */
  const fetchSubcategories = useCallback(async (page = 1, limit = 10, filters = {}) => {
    setLoading(true);
    try {
      const params = {
        page, limit,
        active: filters.active !== undefined ? filters.active : true,
        is_deleted: showTrash.toString(),
        ...(filters.search && { search: filters.search }),
        ...(filters.category && { category: filters.category }),
      };
      const res = await apiService.get('/freelancer/subcategory', { params });
      setSubcategories(res.subcategories || []);
      setSubPagination({
        currentPage: res.pagination.page,
        itemsPerPage: res.pagination.limit,
        totalItems: res.pagination.total,
      });
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to load subcategories', 'error');
    } finally {
      setLoading(false);
    }
  }, [showTrash]);

  /* --------------------- Effects --------------------- */
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      if (activeTab === 'categories') {
        fetchCategories(catPagination.currentPage, catPagination.itemsPerPage, catFilters);
      } else {
        fetchSubcategories(subPagination.currentPage, subPagination.itemsPerPage, subFilters);
      }
    }
  }, [token, activeTab, showTrash, fetchCategories, fetchSubcategories]);

  /* --------------------- Handlers --------------------- */
  const handleTabChange = (key) => {
    setActiveTab(key);
    setShowTrash(false);
    if (key === 'categories') {
      fetchCategories(1, 10, catFilters);
    } else {
      fetchSubcategories(1, 10, subFilters);
    }
  };

  const handleTrashToggle = () => {
    setShowTrash(!showTrash);
    const page = 1;
    if (activeTab === 'categories') {
      fetchCategories(page, catPagination.itemsPerPage, catFilters);
    } else {
      fetchSubcategories(page, subPagination.itemsPerPage, subFilters);
    }
  };

  const openAddModal = () => {
    setEditingItem(null);
    form.resetFields();
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    form.setFieldsValue({
      name: item.name,
      description: item.description,
      category: item.category?._id || item.category,
      icon: item.icon ? [{ uid: '-1', name: 'icon.png', status: 'done', url: item.icon }] : [],
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingItem(null);
    form.resetFields();
  };

  const handleDelete = async (item) => {
    const isSub = activeTab === 'subcategories';
    const confirmed = await showConfirmDialog(
      `Delete ${isSub ? 'Subcategory' : 'Category'}`,
      `Delete "${item.name}"?`
    );
    if (!confirmed) return;

    try {
      await apiService.delete(`/freelancer/${isSub ? 'subcategory' : 'category'}/${item._id}`);
      showToast('Deleted successfully', 'success');
      activeTab === 'categories' ? fetchCategories() : fetchSubcategories();
    } catch (err) {
      showToast(err.response?.data?.message || 'Delete failed', 'error');
    }
  };

  const handleRestore = async (item) => {
    const isSub = activeTab === 'subcategories';
    const confirmed = await showConfirmDialog(
      `Restore ${isSub ? 'Subcategory' : 'Category'}`,
      `Restore "${item.name}"?`
    );
    if (!confirmed) return;

    try {
      await apiService.put(`/freelancer/${isSub ? 'subcategory' : 'category'}/${item._id}/restore`);
      showToast('Restored successfully', 'success');
      activeTab === 'categories' ? fetchCategories() : fetchSubcategories();
    } catch (err) {
      showToast(err.response?.data?.message || 'Restore failed', 'error');
    }
  };

  const handleSubmit = async (values) => {
    const { name, description, category, icon } = values;
    const iconUrl = icon?.[0]?.response?.url || icon?.[0]?.url || null;
    const isSub = activeTab === 'subcategories';

    try {
      if (editingItem) {
        await apiService.put(`/freelancer/${isSub ? 'subcategory' : 'category'}/${editingItem._id}`, {
          name, description, icon: iconUrl, ...(isSub && { category })
        });
        showToast('Updated successfully', 'success');
      } else {
        await apiService.post(`/freelancer/${isSub ? 'subcategory' : 'category'}`, {
          name, description, icon: iconUrl, ...(isSub && { category })
        });
        showToast('Created successfully', 'success');
      }
      closeModal();
      isSub ? fetchSubcategories() : fetchCategories();
    } catch (err) {
      showToast(err.response?.data?.message || 'Operation failed', 'error');
    }
  };

  /* --------------------- Upload --------------------- */
  const uploadProps = {
    name: 'file',
    action: '/api/upload',
    headers: { Authorization: `Bearer ${token}` },
    onChange(info) {
      if (info.file.status === 'uploading') setUploading(true);
      if (info.file.status === 'done') {
        setUploading(false);
        message.success(`${info.file.name} uploaded`);
      } else if (info.file.status === 'error') {
        setUploading(false);
        message.error(`${info.file.name} upload failed`);
      }
    },
  };

  /* --------------------- Table Columns --------------------- */
  const categoryColumns = useMemo(() => [
    {
      key: 'name',
      title: 'Category',
      sortable: true,
      render: (name, item) => (
        <div className="flex items-center space-x-3">
          <img src={item.icon || '/default-icon.svg'} alt={name} className="w-8 h-8 rounded-lg object-cover bg-gray-100" />
          <div>
            <div className="font-medium text-gray-900">{name}</div>
            <div className="text-xs text-gray-500">{item.slug}</div>
          </div>
        </div>
      ),
    },
    { key: 'description', title: 'Description', render: (d) => <span className="text-sm line-clamp-2">{d || '—'}</span> },
    {
      key: 'is_active',
      title: 'Status',
      filterable: true,
      filterKey: 'active',
      filterOptions: [{ value: true, label: 'Active' }, { value: false, label: 'Inactive' }],
      render: (v) => <Tag color={v ? 'green' : 'orange'}>{v ? 'Active' : 'Inactive'}</Tag>,
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (_, item) => (
        <Space>
          <Tooltip title="Edit"><Button type="link" icon={<EditOutlined />} onClick={() => openEditModal(item)} /></Tooltip>
          {showTrash ? (
            <Tooltip title="Restore"><Button type="link" icon={<FiTrash2 className="text-green-600" />} onClick={() => handleRestore(item)} /></Tooltip>
          ) : (
            <Tooltip title="Delete"><Button type="link" danger icon={<DeleteOutlined />} onClick={() => handleDelete(item)} /></Tooltip>
          )}
        </Space>
      ),
    },
  ], [showTrash]);

  const subcategoryColumns = useMemo(() => [
    {
      key: 'name',
      title: 'Subcategory',
      sortable: true,
      render: (name, item) => (
        <div className="flex items-center space-x-3">
          <img src={item.icon || '/default-icon.svg'} alt={name} className="w-8 h-8 rounded-lg object-cover bg-gray-100" />
          <div>
            <div className="font-medium text-gray-900">{name}</div>
            <div className="text-xs text-gray-500">{item.category?.name}</div>
          </div>
        </div>
      ),
    },
    { key: 'description', title: 'Description', render: (d) => <span className="text-sm line-clamp-2">{d || '—'}</span> },
    {
      key: 'is_active',
      title: 'Status',
      filterable: true,
      filterKey: 'active',
      filterOptions: [{ value: true, label: 'Active' }, { value: false, label: 'Inactive' }],
      render: (v) => <Tag color={v ? 'green' : 'orange'}>{v ? 'Active' : 'Inactive'}</Tag>,
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (_, item) => (
        <Space>
          <Tooltip title="Edit"><Button type="link" icon={<EditOutlined />} onClick={() => openEditModal(item)} /></Tooltip>
          {showTrash ? (
            <Tooltip title="Restore"><Button type="link" icon={<FiTrash2 className="text-green-600" />} onClick={() => handleRestore(item)} /></Tooltip>
          ) : (
            <Tooltip title="Delete"><Button type="link" danger icon={<DeleteOutlined />} onClick={() => handleDelete(item)} /></Tooltip>
          )}
        </Space>
      ),
    },
  ], [showTrash]);

  /* --------------------- Render --------------------- */
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="flex justify-between items-start mb-8 gap-4">
        <div>
          <Typography.Title level={2} style={{ margin: 0 }}>Freelancer Categories</Typography.Title>
          <Typography.Text type="secondary">Manage categories and subcategories</Typography.Text>
        </div>
        <div className="flex gap-3">
          <Button onClick={handleTrashToggle} type={showTrash ? 'primary' : 'default'} icon={<FiTrash2 />}>
            {showTrash ? 'Active' : 'Trash'}
          </Button>
          <Button type="primary" icon={<PlusOutlined />} onClick={openAddModal}>
            Add {activeTab === 'categories' ? 'Category' : 'Subcategory'}
          </Button>
        </div>
      </div>

      <Tabs activeKey={activeTab} onChange={handleTabChange}>
        <Tabs.TabPane tab="Categories" key="categories">
          <CustomTable
            columns={categoryColumns}
            data={categories}
            totalItems={catPagination.totalItems}
            currentPage={catPagination.currentPage}
            itemsPerPage={catPagination.itemsPerPage}
            onPageChange={(p, s) => fetchCategories(p, s, catFilters)}
            onFilter={(f) => { setCatFilters(f); fetchCategories(1, catPagination.itemsPerPage, f); }}
            loading={loading}
          />
        </Tabs.TabPane>

        <Tabs.TabPane tab="Subcategories" key="subcategories">
          <CustomTable
            columns={subcategoryColumns}
            data={subcategories}
            totalItems={subPagination.totalItems}
            currentPage={subPagination.currentPage}
            itemsPerPage={subPagination.itemsPerPage}
            onPageChange={(p, s) => fetchSubcategories(p, s, subFilters)}
            onFilter={(f) => { setSubFilters(f); fetchSubcategories(1, subPagination.itemsPerPage, f); }}
            loading={loading}
            extraFilters={
              <Select
                placeholder="Filter by Category"
                style={{ width: 200 }}
                allowClear
                onChange={(v) => {
                  const newF = { ...subFilters, category: v };
                  setSubFilters(newF);
                  fetchSubcategories(1, subPagination.itemsPerPage, newF);
                }}
                value={subFilters.category}
              >
                {categories.map(c => (
                  <Option key={c._id} value={c._id}>{c.name}</Option>
                ))}
              </Select>
            }
          />
        </Tabs.TabPane>
      </Tabs>

      {/* Modal Form */}
      <Modal
        title={editingItem ? `Edit ${activeTab === 'categories' ? 'Category' : 'Subcategory'}` : `Add ${activeTab === 'categories' ? 'Category' : 'Subcategory'}`}
        open={modalOpen}
        onCancel={closeModal}
        footer={null}
        width={600}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          {activeTab === 'subcategories' && (
            <Form.Item name="category" label="Parent Category" rules={[{ required: true }]}>
              <Select placeholder="Select category">
                {categories.filter(c => c.is_active && !c.is_deleted).map(c => (
                  <Option key={c._id} value={c._id}>{c.name}</Option>
                ))}
              </Select>
            </Form.Item>
          )}

          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="description" label="Description" rules={[{ required: true }]}>
            <TextArea rows={3} />
          </Form.Item>

          <Form.Item name="icon" label="Icon" valuePropName="fileList" getValueFromEvent={e => Array.isArray(e) ? e : e?.fileList}>
            <Upload.Dragger {...uploadProps} maxCount={1} listType="picture" accept="image/*">
              <p className="ant-upload-drag-icon"><InboxOutlined /></p>
              <p className="ant-upload-text">Click or drag to upload</p>
            </Upload.Dragger>
          </Form.Item>

          <Form.Item className="mb-0">
            <Space className="w-full justify-end">
              <Button onClick={closeModal}>Cancel</Button>
              <Button type="primary" htmlType="submit" loading={uploading}>
                {editingItem ? 'Update' : 'Create'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CategoryFreelancers;