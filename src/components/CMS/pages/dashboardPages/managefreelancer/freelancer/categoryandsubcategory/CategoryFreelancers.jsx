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
  Select,
  message,
  Tabs,
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { FiTrash2, FiArrowLeft } from 'react-icons/fi';
import {
  FaLaptopCode, FaMobileAlt, FaPaintBrush, FaBullhorn, FaCamera, FaPenFancy,
  FaVideo, FaChartLine, FaCogs, FaHeadset, FaShieldAlt, FaWordpress, FaReact,
  FaNodeJs, FaPython, FaDatabase, FaCloud, FaShoppingCart, FaUsers, FaBriefcase,
  FaLightbulb, FaRocket, FaStar, FaHeart, FaCertificate,
} from 'react-icons/fa';

import CustomTable from '../../../../../../../components/CMS/pages/custom/CustomTable';
import { apiService } from '../../../../../../../manageApi/utils/custom.apiservice';
import { showToast } from '../../../../../../../manageApi/utils/toast';
import { showConfirmDialog } from '../../../../../../../manageApi/utils/sweetAlert';

const { TextArea } = Input;
const { Option } = Select;

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

const CategoryFreelancers = () => {
  const { token } = useSelector(s => s.auth);

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('categories');
  const [showTrash, setShowTrash] = useState(false);

  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const [catPagination, setCatPagination] = useState({ currentPage: 1, itemsPerPage: 10, totalItems: 0 });
  const [subPagination, setSubPagination] = useState({ currentPage: 1, itemsPerPage: 10, totalItems: 0 });

  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form] = Form.useForm();

  // Fetch Categories
  const fetchCategories = useCallback(async (page = 1, limit = 10) => {
    setLoading(true);
    try {
      const params = { page, limit, is_deleted: showTrash.toString() };
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

  // Fetch Subcategories
  const fetchSubcategories = useCallback(async (page = 1, limit = 10, filters = {}) => {
    setLoading(true);
    try {
      const params = {
        page, limit,
        is_deleted: showTrash.toString(),
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

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      if (activeTab === 'categories') fetchCategories();
      else fetchSubcategories();
    }
  }, [token, activeTab, showTrash, fetchCategories, fetchSubcategories]);

  const handleTabChange = (key) => {
    setActiveTab(key);
    setShowTrash(false);
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
      description: item.description || '',
      category: item.category?._id || item.category,
      icon: item.icon || 'FaLaptopCode',
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingItem(null);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    const { name, description, category, icon } = values;
    const isSub = activeTab === 'subcategories';

    try {
      if (editingItem) {
        await apiService.put(`/freelancer/${isSub ? 'subcategory' : 'category'}/${editingItem._id}`, {
          name, description, icon, ...(isSub && { category })
        });
        showToast('Updated successfully', 'success');
      } else {
        await apiService.post(`/freelancer/${isSub ? 'subcategory' : 'category'}`, {
          name, description, icon, ...(isSub && { category })
        });
        showToast('Created successfully', 'success');
      }
      closeModal();
      isSub ? fetchSubcategories() : fetchCategories();
    } catch (err) {
      showToast(err.response?.data?.message || 'Operation failed', 'error');
    }
  };

  const handleDelete = async (item) => {
    const confirmed = await showConfirmDialog(
      `Delete ${activeTab === 'categories' ? 'Category' : 'Subcategory'}`,
      `Move "${item.name}" to trash?`
    );
    if (!confirmed) return;

    try {
      await apiService.delete(`/freelancer/${activeTab === 'subcategories' ? 'subcategory' : 'category'}/${item._id}`);
      showToast('Moved to trash', 'success');
      activeTab === 'categories' ? fetchCategories() : fetchSubcategories();
    } catch (err) {
      showToast(err.response?.data?.message || 'Delete failed', 'error');
    }
  };

  const handleRestore = async (item) => {
    const confirmed = await showConfirmDialog(
      `Restore ${activeTab === 'categories' ? 'Category' : 'Subcategory'}`,
      `Restore "${item.name}"?`
    );
    if (!confirmed) return;

    try {
      await apiService.put(`/freelancer/${activeTab === 'subcategories' ? 'subcategory' : 'category'}/${item._id}/restore`);
      showToast('Restored successfully', 'success');
      activeTab === 'categories' ? fetchCategories() : fetchSubcategories();
    } catch (err) {
      showToast(err.response?.data?.message || 'Restore failed', 'error');
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
    return Icon ? <Icon className="text-2xl" /> : <FaLaptopCode className="text-2xl" />;
  };

  const columns = useMemo(() => [
    {
      key: 'icon',
      title: 'Icon',
      render: (_, item) => (
        <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center text-purple-600 shadow-md">
          {getIconComponent(item.icon || 'FaLaptopCode')}
        </div>
      ),
    },
    {
      key: 'name',
      title: activeTab === 'categories' ? 'Category Name' : 'Subcategory Name',
      render: (_, item) => (
        <div>
          <div className="font-bold text-gray-900">{item.name}</div>
          {activeTab === 'subcategories' && item.category && (
            <div className="text-xs text-purple-600 mt-1">
              {item.category.name || item.category}
            </div>
          )}
        </div>
      ),
    },
    {
      key: 'description',
      title: 'Description',
      render: (d) => <span className="text-sm text-gray-600">{d || '—'}</span>,
    },
    {
      key: 'status',
      title: 'Status',
      render: (_, item) => (
        <Tag color={item.is_active ? 'green' : 'orange'}>
          {item.is_active ? 'Active' : 'Inactive'}
        </Tag>
      ),
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (_, item) => (
        <Space>
          <Tooltip title="Edit">
            <Button type="link" icon={<EditOutlined />} onClick={() => openEditModal(item)} />
          </Tooltip>
          {showTrash ? (
            <Tooltip title="Restore">
              <Button type="link" icon={<FiArrowLeft className="text-green-600 text-lg" />} onClick={() => handleRestore(item)} />
            </Tooltip>
          ) : (
            <Tooltip title="Move to Trash">
              <Button type="link" danger icon={<DeleteOutlined />} onClick={() => handleDelete(item)} />
            </Tooltip>
          )}
        </Space>
      ),
    },
  ], [activeTab, showTrash]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <div className="max-w-7xl mx-auto ">
        {/* Header */}
        <div className="bg-white  shadow-2xl p-8 mb-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Freelancer Categories
              </h1>
              <p className="text-gray-600 mt-3 text-lg">Manage service categories & subcategories with icons</p>
            </div>
            <Space size="large">
              <Button
                size="large"
                type={showTrash ? 'primary' : 'default'}
                icon={<FiTrash2 />}
                onClick={() => setShowTrash(!showTrash)}
                className="font-semibold"
              >
                {showTrash ? 'View Active' : 'View Trash'}
              </Button>
              <Button
                size="large"
                type="primary"
                className="bg-gradient-to-r from-purple-600 to-pink-600 border-0 font-bold text-lg px-8"
                onClick={openAddModal}
              >
                Add {activeTab === 'categories' ? 'Category' : 'Subcategory'}
              </Button>
            </Space>
          </div>

          <Tabs activeKey={activeTab} onChange={handleTabChange} size="large" animated>
            <Tabs.TabPane tab={<span className="text-lg font-semibold">Categories</span>} key="categories">
              <CustomTable
                columns={columns}
                data={categories}
                loading={loading}
                totalItems={catPagination.totalItems}
                currentPage={catPagination.currentPage}
                itemsPerPage={catPagination.itemsPerPage}
                onPageChange={(p, s) => fetchCategories(p, s)}
              />
            </Tabs.TabPane>

            <Tabs.TabPane tab={<span className="text-lg font-semibold">Subcategories</span>} key="subcategories">
              <div className="mb-6">
                <Select
                  placeholder="Filter by Parent Category"
                  allowClear
                  style={{ width: 320 }}
                  size="large"
                  onChange={(value) => fetchSubcategories(1, subPagination.itemsPerPage, { category: value })}
                >
                  {categories.filter(c => c.is_active && !c.is_deleted).map(c => (
                    <Option key={c._id} value={c._id}>
                      <div className="flex items-center gap-3">
                        {getIconComponent(c.icon)}
                        <span>{c.name}</span>
                      </div>
                    </Option>
                  ))}
                </Select>
              </div>
              <CustomTable
                columns={columns}
                data={subcategories}
                loading={loading}
                totalItems={subPagination.totalItems}
                currentPage={subPagination.currentPage}
                itemsPerPage={subPagination.itemsPerPage}
                onPageChange={(p, s) => fetchSubcategories(p, s)}
              />
            </Tabs.TabPane>
          </Tabs>
        </div>

        {/* Modal */}
        <Modal
          title={
            <span className="text-2xl font-bold text-purple-700">
              {editingItem ? 'Edit' : 'Add New'} {activeTab === 'categories' ? 'Category' : 'Subcategory'}
            </span>
          }
          open={modalOpen}
          onCancel={closeModal}
          footer={null}
          width={700}
          centered
        >
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            {activeTab === 'subcategories' && (
              <Form.Item name="category" label="Parent Category" rules={[{ required: true }]}>
                <Select size="large" placeholder="Select parent category">
                  {categories.filter(c => c.is_active && !c.is_deleted).map(c => (
                    <Option key={c._id} value={c._id}>
                      <div className="flex items-center gap-3">
                        {getIconComponent(c.icon || 'FaLaptopCode')}
                        <span className="font-medium">{c.name}</span>
                      </div>
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            )}

            <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Name is required' }]}>
              <Input size="large" placeholder="e.g. React.js Development" />
            </Form.Item>

            <Form.Item name="description" label="Description">
              <TextArea rows={4} placeholder="Describe this service..." />
            </Form.Item>

            <Form.Item name="icon" label="Choose Icon" initialValue="FaLaptopCode">
              <Select size="large" showSearch optionLabelProp="label">
                {iconOptions.map(opt => (
                  <Option key={opt.value} value={opt.value} label={opt.label}>
                    <div className="flex items-center gap-4 py-2">
                      <span className="text-purple-600 text-2xl">{opt.icon}</span>
                      <span className="font-medium">{opt.label}</span>
                    </div>
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item className="mb-0 mt-8">
              <div className="flex justify-end gap-4">
                <Button size="large" onClick={closeModal}>Cancel</Button>
                <Button
                  size="large"
                  type="primary"
                  htmlType="submit"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 border-0 font-bold px-8"
                >
                  {editingItem ? 'Update' : 'Create'}
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default CategoryFreelancers;