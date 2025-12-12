// components/CMS/pages/estimate/CategoryManager/MasterCategory.jsx
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Card, Button, Drawer, Switch, Space, Tag, Tooltip, Spin,
  Typography, Popconfirm, Empty, Input, Form, Modal, message, Badge,
  Row, Col, Statistic, Breadcrumb, Divider,Select
} from 'antd';
import {
  PlusOutlined, EyeOutlined, EditOutlined, DeleteOutlined,
  RestOutlined, ArrowLeftOutlined, FolderOutlined,
  FolderOpenOutlined, TagsOutlined, HomeOutlined, DatabaseOutlined,
  SearchOutlined, ReloadOutlined, AppstoreOutlined
} from '@ant-design/icons';
import CustomTable from '../../../../components/CMS/pages/custom/CustomTable';
import { apiService } from '../../../../manageApi/utils/custom.apiservice';

const { Title, Text } = Typography;
const { TextArea } = Input;

// --- THEME CONFIGURATION ---
const THEME = {
  primary: "#722ed1", // Purple
  secondary: "#1890ff", // Blue
  success: "#52c41a",
  warning: "#faad14",
  error: "#ff4d4f",
  bgLight: "#f9f0ff",
};

const API_BASE = '/estimate/master/category';

const MasterCategory = () => {
  // Navigation State
  const [level, setLevel] = useState('categories'); // 'categories' | 'subcategories' | 'types'
  const [parentCategory, setParentCategory] = useState(null);
  const [parentSubcategory, setParentSubcategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  // Data State
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showTrash, setShowTrash] = useState(false);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0,
  });

  // Modal State
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Stats Calculation
  const stats = useMemo(() => {
    return {
      total: pagination.totalItems,
      active: data.filter(d => d.isActive !== false && !d.is_deleted).length,
      trashed: data.filter(d => d.is_deleted).length
    };
  }, [data, pagination.totalItems]);

  // Fetch data based on current level
  const fetchData = useCallback(async (page = 1, limit = 10) => {
    setLoading(true);
    try {
      let url = API_BASE;
      const params = { page, limit, search: searchTerm || undefined };

      let response;

      if (level === 'subcategories') {
        url = `${API_BASE}/${parentCategory}/subcategories`;
        response = await apiService.get(url, params);
        setData(response.data || []);
      } else if (level === 'types') {
        url = `${API_BASE}/${parentCategory}/subcategories/${parentSubcategory}/types`;
        response = await apiService.get(url, params);
        setData(response.data || []);
      } else {
        response = await apiService.get(url, params);
        setData(response.categories || response.data || []);
      }

      setPagination({
        currentPage: response.pagination?.page || page,
        itemsPerPage: response.pagination?.limit || limit,
        totalItems: response.pagination?.total || response.data?.length || 0,
      });
    } catch (err) {
      message.error('Failed to load data');
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [level, parentCategory, parentSubcategory, searchTerm, showTrash]);

  useEffect(() => {
    fetchData(pagination.currentPage, pagination.itemsPerPage);
  }, [fetchData]);

  // Reset page when level changes
  useEffect(() => {
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  }, [level, parentCategory, parentSubcategory]);

  const goToSubcategories = (category) => {
    setParentCategory(category._id);
    setSelectedCategory(category);
    setLevel('subcategories');
  };

  const goToTypes = (subcategory) => {
    setParentSubcategory(subcategory._id);
    setSelectedSubcategory(subcategory);
    setLevel('types');
  };

  const goBack = () => {
    if (level === 'types') {
      setLevel('subcategories');
      setParentSubcategory(null);
      setSelectedSubcategory(null);
    } else if (level === 'subcategories') {
      setLevel('categories');
      setParentCategory(null);
      setSelectedCategory(null);
    }
  };

  const columns = useMemo(() => {
    const cols = [
      {
        title: level === 'categories' ? 'Category Name' : level === 'subcategories' ? 'Subcategory' : 'Type',
        key: 'name',
        width: 300,
        render: (_, record) => (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: THEME.bgLight }}>
                {level === 'categories' && <FolderOutlined style={{ fontSize: '20px', color: THEME.primary }} />}
                {level === 'subcategories' && <FolderOpenOutlined style={{ fontSize: '20px', color: THEME.secondary }} />}
                {level === 'types' && <TagsOutlined style={{ fontSize: '20px', color: THEME.warning }} />}
            </div>
            <div>
              <div className="font-semibold text-gray-800">{record.name || record.label}</div>
              {record.description && <div className="text-xs text-gray-500 truncate w-48">{record.description}</div>}
            </div>
          </div>
        ),
      },
      {
        title: 'Status',
        width: 120,
        render: (_, record) => (
          <Tag 
            color={record.is_deleted ? 'red' : record.isActive !== false ? 'green' : 'orange'}
            style={{ borderRadius: '12px', padding: '2px 10px' }}
          >
            {record.is_deleted ? 'Deleted' : record.isActive !== false ? 'Active' : 'Inactive'}
          </Tag>
        ),
      },
      {
        title: 'Action',
        width: 180,
        align: 'right',
        render: (_, record) => (
          <Space>
            {level !== 'types' && (
              <Tooltip title={`View ${level === 'categories' ? 'Subcategories' : 'Types'}`}>
                  <Button
                    size="small"
                    type="primary"
                    ghost
                    icon={<ArrowLeftOutlined rotate={180} />}
                    onClick={() => level === 'categories' ? goToSubcategories(record) : goToTypes(record)}
                  >
                    Open
                  </Button>
              </Tooltip>
            )}
            <Tooltip title="View Details">
                <Button 
                    size="small" 
                    icon={<EyeOutlined />} 
                    onClick={() => { setSelectedItem(record); setDetailsOpen(true); }} 
                />
            </Tooltip>
          </Space>
        ),
      },
    ];

    if (level === 'categories') {
      cols.splice(1, 0, {
        title: 'Type',
        width: 150,
        render: (_, record) => (
            <Tag color={record.name === 'Interior' ? 'blue' : 'geekblue'}>
                {record.name?.toUpperCase()}
            </Tag>
        )
      });
    }

    return cols;
  }, [level]);

  // --- CREATE MODAL COMPONENT ---
  const CreateModal = () => {
    const [form] = Form.useForm();
    const [saving, setSaving] = useState(false);

    const onSubmit = async (values) => {
      setSaving(true);
      try {
        let url = API_BASE;
        let payload = {};

        if (level === 'categories') {
          payload = { name: values.name, description: values.description };
        } else if (level === 'subcategories') {
          url = `${API_BASE}/${parentCategory}/subcategories`;
          payload = { label: values.label, description: values.description };
        } else if (level === 'types') {
          url = `${API_BASE}/${parentCategory}/subcategories/${parentSubcategory}/types`;
          payload = { label: values.label, description: values.description };
        }

        await apiService.post(url, payload);
        message.success('Created successfully!');
        setCreateModalOpen(false);
        form.resetFields();
        fetchData(1);
      } catch (err) {
        message.error('Create failed');
      } finally {
        setSaving(false);
      }
    };

    return (
      <Modal
        title={
            <div className="flex items-center gap-2 text-xl font-bold text-gray-800">
                <PlusOutlined style={{ color: THEME.primary }} /> 
                Add New {level === 'categories' ? 'Category' : level === 'subcategories' ? 'Subcategory' : 'Type'}
            </div>
        }
        open={createModalOpen}
        onCancel={() => setCreateModalOpen(false)}
        footer={null}
        destroyOnClose
      >
        <Divider className="my-4" />
        <Form form={form} layout="vertical" onFinish={onSubmit}>
          {level === 'categories' ? (
            <Form.Item name="name" label="Category Type" rules={[{ required: true }]}>
              <Select placeholder="Select Type" size="large">
                <Select.Option value="Interior">Interior</Select.Option>
                <Select.Option value="Landscaping">Landscaping</Select.Option>
              </Select>
            </Form.Item>
          ) : (
            <Form.Item name="label" label="Name" rules={[{ required: true }]}>
              <Input size="large" placeholder="Enter name" />
            </Form.Item>
          )}
          <Form.Item name="description" label="Description">
            <TextArea rows={3} placeholder="Optional description..." />
          </Form.Item>
          
          <div className="flex justify-end gap-3 mt-6">
            <Button size="large" onClick={() => setCreateModalOpen(false)}>Cancel</Button>
            <Button 
                type="primary" 
                htmlType="submit" 
                loading={saving} 
                size="large"
                style={{ backgroundColor: THEME.primary, borderColor: THEME.primary }}
            >
              Create
            </Button>
          </div>
        </Form>
      </Modal>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      
      {/* 1. Header & Breadcrumbs */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
             {level !== 'categories' && (
                <Button 
                    shape="circle" 
                    icon={<ArrowLeftOutlined />} 
                    onClick={goBack} 
                />
             )}
             <div>
                <Title level={3} style={{ margin: 0 }}>Category Manager</Title>
                <Breadcrumb separator=">">
                    <Breadcrumb.Item>
                        <span 
                            className={`cursor-pointer ${level === 'categories' ? 'font-bold text-purple-700' : 'text-gray-500'}`}
                            onClick={() => { setLevel('categories'); setParentCategory(null); setSelectedCategory(null); }}
                        >
                            Categories
                        </span>
                    </Breadcrumb.Item>
                    {selectedCategory && (
                        <Breadcrumb.Item>
                            <span 
                                className={`cursor-pointer ${level === 'subcategories' ? 'font-bold text-purple-700' : 'text-gray-500'}`}
                                onClick={() => { setLevel('subcategories'); setParentSubcategory(null); setSelectedSubcategory(null); }}
                            >
                                {selectedCategory.name}
                            </span>
                        </Breadcrumb.Item>
                    )}
                    {selectedSubcategory && (
                        <Breadcrumb.Item>
                            <span className="font-bold text-purple-700">
                                {selectedSubcategory.label}
                            </span>
                        </Breadcrumb.Item>
                    )}
                </Breadcrumb>
             </div>
          </div>

          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={() => setCreateModalOpen(true)}
            style={{ backgroundColor: THEME.primary, borderColor: THEME.primary }}
          >
            Add {level === 'categories' ? 'Category' : level === 'subcategories' ? 'Subcategory' : 'Type'}
          </Button>
        </div>

        {/* 2. Stats Row */}
        <Row gutter={[16, 16]}>
            <Col xs={24} sm={8}>
                <Card bordered={false} className="shadow-sm border-t-4" style={{ borderColor: THEME.primary }}>
                    <Statistic 
                        title={`Total ${level === 'categories' ? 'Categories' : level === 'subcategories' ? 'Subcategories' : 'Types'}`}
                        value={stats.total} 
                        prefix={<AppstoreOutlined style={{ color: THEME.primary }} />} 
                    />
                </Card>
            </Col>
            <Col xs={24} sm={8}>
                <Card bordered={false} className="shadow-sm border-t-4" style={{ borderColor: THEME.success }}>
                    <Statistic 
                        title="Active Items" 
                        value={stats.active} 
                        prefix={<DatabaseOutlined style={{ color: THEME.success }} />} 
                    />
                </Card>
            </Col>
            <Col xs={24} sm={8}>
                <Card bordered={false} className="shadow-sm border-t-4" style={{ borderColor: THEME.error }}>
                    <Statistic 
                        title="Deleted Items" 
                        value={stats.trashed} 
                        prefix={<RestOutlined style={{ color: THEME.error }} />} 
                    />
                </Card>
            </Col>
        </Row>
      </div>

      {/* 3. Main Content Card */}
      <Card bordered={false} className="shadow-md rounded-lg" bodyStyle={{ padding: 0 }}>
        
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 bg-white rounded-t-lg flex justify-between items-center">
            <Input 
                prefix={<SearchOutlined className="text-gray-400" />}
                placeholder="Search items..." 
                size="large"
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ maxWidth: 400 }}
                allowClear
            />
            <Space>
                <Tooltip title="Toggle Trash View">
                    <Button 
                        type={showTrash ? 'primary' : 'default'} 
                        danger={showTrash}
                        icon={<RestOutlined />} 
                        onClick={() => setShowTrash(!showTrash)}
                    />
                </Tooltip>
                <Button icon={<ReloadOutlined />} onClick={() => fetchData()} />
            </Space>
        </div>

        {/* Table */}
        <div className="p-0">
            <CustomTable
                columns={columns}
                data={data}
                loading={loading}
                totalItems={pagination.totalItems}
                currentPage={pagination.currentPage}
                itemsPerPage={pagination.itemsPerPage}
                onPageChange={(page, size) => fetchData(page, size)}
            />
        </div>
      </Card>

      {/* Modals */}
      <CreateModal />
      
      {/* Details View Modal */}
      <Modal
        title="Item Details"
        open={detailsOpen}
        onCancel={() => setDetailsOpen(false)}
        footer={[<Button key="close" onClick={() => setDetailsOpen(false)}>Close</Button>]}
      >
        {selectedItem && (
            <div className="space-y-4">
                <div>
                    <Text type="secondary" className="block text-xs uppercase">Name</Text>
                    <Text strong className="text-lg">{selectedItem.name || selectedItem.label}</Text>
                </div>
                <div>
                    <Text type="secondary" className="block text-xs uppercase">Description</Text>
                    <Text>{selectedItem.description || 'No description provided.'}</Text>
                </div>
                <div>
                    <Text type="secondary" className="block text-xs uppercase">Status</Text>
                    <Tag color={selectedItem.isActive !== false ? 'green' : 'orange'}>
                        {selectedItem.isActive !== false ? 'Active' : 'Inactive'}
                    </Tag>
                </div>
            </div>
        )}
      </Modal>

    </div>
  );
};

export default MasterCategory;