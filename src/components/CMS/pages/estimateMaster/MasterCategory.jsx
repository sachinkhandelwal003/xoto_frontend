// components/CMS/pages/estimate/CategoryManager/MasterCategory.jsx
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Card, Button, Drawer, Switch, Space, Tag, Tooltip, Spin,
  Typography, Popconfirm, Empty, Input, Form, Modal, message, Badge
} from 'antd';
import {
  PlusOutlined, EyeOutlined, EditOutlined, DeleteOutlined,
  RestOutlined, ArrowLeftOutlined, FolderOutlined,
  FolderOpenOutlined, TagsOutlined, HomeOutlined, DatabaseOutlined
} from '@ant-design/icons';
import { FiRefreshCw } from 'react-icons/fi';
import CustomTable from '../../../../components/CMS/pages/custom/CustomTable';
import { apiService } from '../../../../manageApi/utils/custom.apiservice';

const { Title, Text } = Typography;
const { TextArea } = Input;

const PURPLE_THEME = { primary: '#722ed1' };
const API_BASE = '/estimate/master/category';

const MasterCategory = () => {
  const [level, setLevel] = useState('categories'); // 'categories' | 'subcategories' | 'types'
  const [parentCategory, setParentCategory] = useState(null);
  const [parentSubcategory, setParentSubcategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showTrash, setShowTrash] = useState(false);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0,
  });

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

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
        render: (_, record) => (
          <div className="flex items-center gap-3">
            {level === 'categories' && <FolderOutlined className="text-blue-5xl" />}
            {level === 'subcategories' && <FolderOpenOutlined className="text-green-600" />}
            {level === 'types' && <TagsOutlined className="text-orange-600" />}
            <div>
              <div className="font-medium">{record.name || record.label}</div>
              {record.description && <div className="text-xs text-gray-500">{record.description}</div>}
            </div>
          </div>
        ),
      },
      {
        title: 'Status',
        width: 100,
        render: (_, record) => (
          <Tag color={record.is_deleted ? 'red' : record.isActive !== false ? 'green' : 'orange'}>
            {record.is_deleted ? 'Deleted' : record.isActive !== false ? 'Active' : 'Inactive'}
          </Tag>
        ),
      },
      {
        title: 'Action',
        width: 180,
        render: (_, record) => (
          <Space>
            {level !== 'types' && (
              <Button
                size="small"
                type="primary"
                icon={<ArrowLeftOutlined rotate={180} />}
                onClick={() => level === 'categories' ? goToSubcategories(record) : goToTypes(record)}
              >
                View {level === 'categories' ? 'Subcategories' : 'Types'}
              </Button>
            )}
            <Button size="small" icon={<EyeOutlined />} onClick={() => { setSelectedItem(record); setDetailsOpen(true); }} />
          </Space>
        ),
      },
    ];

    if (level === 'categories') {
      cols.splice(1, 0, {
        title: 'Type',
        width: 100,
        render: (_, record) => <Tag color={record.name === 'Interior' ? 'blue' : 'green'}>{record.name}</Tag>
      });
    }

    return cols;
  }, [level]);

  const getPageTitle = () => {
    if (level === 'categories') return 'All Categories';
    if (level === 'subcategories') return `Subcategories → ${selectedCategory?.name}`;
    if (level === 'types') return `Types → ${selectedSubcategory?.label}`;
  };

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
        message.success('Created!');
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
        title={`Add New ${level === 'categories' ? 'Category' : level === 'subcategories' ? 'Subcategory' : 'Type'}`}
        open={createModalOpen}
        onCancel={() => setCreateModalOpen(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={onSubmit}>
          {level === 'categories' ? (
            <Form.Item name="name" label="Category Type" rules={[{ required: true }]}>
              <select className="ant-input">
                <option value="Interior">Interior</option>
                <option value="Landscaping">Landscaping</option>
              </select>
            </Form.Item>
          ) : (
            <Form.Item name="label" label="Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          )}
          <Form.Item name="description" label="Description">
            <TextArea rows={3} />
          </Form.Item>
          <div className="flex justify-end gap-2">
            <Button onClick={() => setCreateModalOpen(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit" loading={saving} style={{ background: PURPLE_THEME.primary }}>
              Create
            </Button>
          </div>
        </Form>
      </Modal>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <Title level={2} style={{ color: PURPLE_THEME.primary, margin: 0 }}>
              Category Manager
            </Title>
            <Text type="secondary">{getPageTitle()}</Text>
          </div>
          <Space>
            {level !== 'categories' && (
              <Button icon={<ArrowLeftOutlined />} onClick={goBack}>
                Back
              </Button>
            )}
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setCreateModalOpen(true)}
              style={{ background: PURPLE_THEME.primary }}
            >
              Add {level === 'categories' ? 'Category' : level === 'subcategories' ? 'Subcategory' : 'Type'}
            </Button>
          </Space>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-lg">
          <Button type="link" icon={<HomeOutlined />} onClick={() => setLevel('categories')} className="p-0">
            Categories
          </Button>
          {selectedCategory && (
            <>
              <span>/</span>
              <Tag color="blue">{selectedCategory.name}</Tag>
            </>
          )}
          {selectedSubcategory && (
            <>
              <span>/</span>
              <Tag color="green">{selectedSubcategory.label}</Tag>
            </>
          )}
        </div>
      </div>

      <Card>
        <div className="flex justify-between mb-4">
          <Input.Search
            placeholder="Search..."
            allowClear
            onSearch={(v) => { setSearchTerm(v); setPagination(p => ({ ...p, currentPage: 1 })); }}
            style={{ width: 300 }}
          />
          <Space>
            <Button icon={<RestOutlined />} type={showTrash ? 'primary' : 'default'} danger={showTrash} onClick={() => setShowTrash(!showTrash)} />
            <Button icon={<FiRefreshCw />} onClick={() => fetchData()} loading={loading} />
          </Space>
        </div>

        {data.length > 0 ? (
          <CustomTable
            columns={columns}
            data={data}
            loading={loading}
            pagination={{
              current: pagination.currentPage,
              pageSize: pagination.itemsPerPage,
              total: pagination.totalItems,
              onChange: (page, size) => {
                setPagination({ ...pagination, currentPage: page, itemsPerPage: size });
                fetchData(page, size);
              }
            }}
            rowKey="_id"
          />
        ) : (
          <Empty description={loading ? 'Loading...' : 'No items found'} />
        )}
      </Card>

      <CreateModal />
    </div>
  );
};

export default MasterCategory;