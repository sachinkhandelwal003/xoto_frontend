import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Card, Button, Drawer, Switch, Space, Tag, Tooltip, Spin,
  Typography, Divider, Row, Col, Alert, Avatar, Popconfirm,
  Empty, Input, Form, Modal, Select, Tabs, Descriptions, message
} from 'antd';
import {
  PlusOutlined, EyeOutlined, EditOutlined, DeleteOutlined,
  RestOutlined, SearchOutlined, InfoCircleOutlined, CloseOutlined
} from '@ant-design/icons';
import { FiRefreshCw } from 'react-icons/fi';
import { FaLayerGroup, FaTag, FaSitemap } from 'react-icons/fa';
import CustomTable from '../../../../components/CMS/pages/custom/CustomTable';
import { apiService } from '../../../../manageApi/utils/custom.apiservice';
import { showToast } from '../../../../manageApi/utils/toast';

const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;

const PURPLE_THEME = {
  primary: '#722ed1',
  primaryLight: '#9254de',
  primaryBg: '#f9f0ff',
};

const API_BASE = '/estimate/master/category';

// Main Component
const MasterCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('categories');
  const [showTrash, setShowTrash] = useState(false);

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [parentCategory, setParentCategory] = useState(null);
  const [parentSubcategory, setParentSubcategory] = useState(null);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0,
  });

  // Fetch data based on active tab
  const fetchData = useCallback(async (page = 1, limit = 10) => {
    setLoading(true);
    try {
      let url = API_BASE;
      const params = { page, limit, is_deleted: showTrash };

      if (activeTab === 'subcategories') {
        url = `${API_BASE}/${parentCategory}/subcategories`;
      } else if (activeTab === 'types') {
        url = `${API_BASE}/${parentCategory}/subcategories/${parentSubcategory}/types`;
      }

      const res = await apiService.get(url, params);
      setCategories(res.data.categories || res.data.subcategories || res.data.types || []);
      setPagination({
        currentPage: res.data.currentPage || page,
        itemsPerPage: res.data.itemsPerPage || limit,
        totalItems: res.data.totalItems || res.data.length,
      });
    } catch (err) {
      message.error(err.response?.data?.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }, [activeTab, parentCategory, parentSubcategory, showTrash]);

  useEffect(() => {
    fetchData(pagination.currentPage, pagination.itemsPerPage);
  }, [fetchData]);

  // Create Modal
  const CreateModal = () => {
    const [form] = Form.useForm();

    const handleSubmit = async (values) => {
      try {
        let endpoint = API_BASE;
        if (activeTab === 'subcategories') {
          endpoint = `${API_BASE}/${parentCategory}/subcategories`;
        } else if (activeTab === 'types') {
          endpoint = `${API_BASE}/${parentCategory}/subcategories/${parentSubcategory}/types`;
        }

        await apiService.post(endpoint, values);
        message.success(`${activeTab.slice(0, -1)} created successfully`);
        form.resetFields();
        setCreateModalOpen(false);
        fetchData();
      } catch (err) {
        message.error(err.response?.data?.message || 'Create failed');
      }
    };

    return (
      <Modal
        title={`Create New ${activeTab.slice(0, -1)}`}
        open={createModalOpen}
        onCancel={() => setCreateModalOpen(false)}
        footer={null}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="label" label="Label" rules={[{ required: true }]}>
            <Input placeholder="e.g., Residential Gardens" />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <TextArea rows={3} placeholder="Optional description..." />
          </Form.Item>
          <div className="flex justify-end gap-2">
            <Button onClick={() => setCreateModalOpen(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit" style={{ background: PURPLE_THEME.primary }}>
              Create
            </Button>
          </div>
        </Form>
      </Modal>
    );
  };

  // Details Drawer
  const DetailsDrawer = () => {
    const [form] = Form.useForm();
    const [editing, setEditing] = useState(false);

    useEffect(() => {
      if (selectedItem) {
        form.setFieldsValue({
          label: selectedItem.label,
          description: selectedItem.description || '',
          isActive: selectedItem.isActive !== false,
        });
      }
    }, [selectedItem, form]);

    const handleUpdate = async (values) => {
      try {
        let endpoint = API_BASE;
        if (activeTab === 'subcategories') {
          endpoint = `${API_BASE}/${parentCategory}/subcategories/${selectedItem._id}`;
        } else if (activeTab === 'types') {
          endpoint = `${API_BASE}/${parentCategory}/subcategories/${parentSubcategory}/types/${selectedItem._id}`;
        } else {
          endpoint = `${API_BASE}/${selectedItem._id}`;
        }

        await apiService.put(endpoint, values);
        message.success('Updated successfully');
        setEditing(false);
        fetchData();
      } catch (err) {
        message.error('Update failed');
      }
    };

    const handleDelete = async () => {
      try {
        let endpoint = API_BASE;
        if (activeTab === 'subcategories') {
          endpoint = `${API_BASE}/${parentCategory}/subcategories/${selectedItem._id}`;
        } else if (activeTab === 'types') {
          endpoint = `${API_BASE}/${parentCategory}/subcategories/${parentSubcategory}/types/${selectedItem._id}`;
        } else {
          endpoint = `${API_BASE}/${selectedItem._id}`;
        }

        await apiService.delete(endpoint);
        message.success('Deleted');
        setDetailsOpen(false);
        fetchData();
      } catch (err) {
        message.error('Delete failed');
      }
    };

    const handleRestore = async () => {
      try {
        await apiService.patch(`${API_BASE}/${selectedItem._id}/restore`);
        message.success('Restored');
        setDetailsOpen(false);
        fetchData();
      } catch (err) {
        message.error('Restore failed');
      }
    };

    if (!selectedItem) return null;

    return (
      <Drawer
        title={selectedItem.label}
        open={detailsOpen}
        onClose={() => { setDetailsOpen(false); setSelectedItem(null); }}
        width={500}
      >
        <Form form={form} layout="vertical" onFinish={handleUpdate} disabled={!editing}>
          <Form.Item name="label" label="Label">
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <TextArea rows={3} />
          </Form.Item>
          <Form.Item name="isActive" valuePropName="checked">
            <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
          </Form.Item>

          {editing ? (
            <Space>
              <Button onClick={() => setEditing(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit">Save</Button>
            </Space>
          ) : (
            <Space>
              <Button icon={<EditOutlined />} onClick={() => setEditing(true)}>Edit</Button>
              {selectedItem.is_deleted ? (
                <Button onClick={handleRestore} type="primary" style={{ background: '#52c41a' }}>
                  Restore
                </Button>
              ) : (
                <Popconfirm title="Delete?" onConfirm={handleDelete}>
                  <Button danger>Delete</Button>
                </Popconfirm>
              )}
            </Space>
          )}
        </Form>
      </Drawer>
    );
  };

  const columns = useMemo(() => [
    {
      title: 'Label',
      render: (_, item) => (
        <div>
          <div className="font-medium">{item.label}</div>
          {item.description && <div className="text-xs text-gray-500">{item.description}</div>}
        </div>
      ),
    },
    {
      title: 'Status',
      render: (_, item) => (
        <Tag color={item.is_deleted ? 'red' : item.isActive !== false ? 'green' : 'orange'}>
          {item.is_deleted ? 'Deleted' : item.isActive !== false ? 'Active' : 'Inactive'}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      render: (_, item) => (
        <Space>
          <Button
            size="small"
            icon={<EyeOutlined />}
            onClick={() => { setSelectedItem(item); setDetailsOpen(true); }}
          />
        </Space>
      ),
    },
  ], []);

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <Typography.Title level={3}>Category Manager</Typography.Title>
          <Typography.Text type="secondary">
            Manage Interior & Landscaping categories, subcategories, and types
          </Typography.Text>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setCreateModalOpen(true)}
          style={{ background: PURPLE_THEME.primary }}
        >
          Add {activeTab.slice(0, -1)}
        </Button>
      </div>

      <Card>
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <TabPane tab={<span><FaLayerGroup /> Categories</span>} key="categories" />
          <TabPane tab={<span><FaTag /> Subcategories</span>} key="subcategories" disabled={!parentCategory} />
          <TabPane tab={<span><FaSitemap /> Types</span>} key="types" disabled={!parentSubcategory} />
        </Tabs>

        {activeTab === 'subcategories' && !parentCategory && (
          <Alert message="Please select a parent category first" type="info" showIcon />
        )}

        {activeTab === 'types' && !parentSubcategory && (
          <Alert message="Please select a subcategory first" type="info" showIcon />
        )}

        <CustomTable
          columns={columns}
          data={categories}
          loading={loading}
          totalItems={pagination.totalItems}
          currentPage={pagination.currentPage}
          itemsPerPage={pagination.itemsPerPage}
          onPageChange={(page, size) => fetchData(page, size)}
        />
      </Card>

      <CreateModal />
      <DetailsDrawer />
    </div>
  );
};

export default MasterCategory;