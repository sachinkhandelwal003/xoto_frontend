// src/components/CMS/pages/brands/AddBrand.jsx
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Button,
  Input,
  Upload,
  Modal,
  message,
  Card,
  Row,
  Col,
  Statistic,
  Tabs,
  Space,
  Tooltip,
  Avatar,
  Typography,
  Divider,
  Form,
  Badge
} from 'antd';
import {
  ArrowLeftOutlined,
  UploadOutlined,
  SearchOutlined,
  ShopOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  RotateLeftOutlined,
  PlusOutlined,
  GlobalOutlined,
  RestOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import CustomTable from '../../../CMS/pages/custom/CustomTable';
import { apiService } from '../../../../manageApi/utils/custom.apiservice';
import { showSuccessAlert, showErrorAlert, showConfirmDialog } from '../../../../manageApi/utils/sweetAlert';

const { TextArea } = Input;
const { Title, Text } = Typography;

// --- THEME CONFIGURATION ---
const THEME = {
  primary: "#722ed1", // Purple
  secondary: "#1890ff", // Blue
  success: "#52c41a",
  warning: "#faad14",
  error: "#ff4d4f",
  bgLight: "#f9f0ff",
};

const AddBrand = () => {
  const navigate = useNavigate();

  // --- STATES ---
  // Form State (Add)
  const [addForm] = Form.useForm();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);
  const [isLoadingForm, setIsLoadingForm] = useState(false);

  // Edit State
  const [editForm] = Form.useForm();
  const [showEditModal, setShowEditModal] = useState(false);
  const [editLogoPreview, setEditLogoPreview] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);

  // View State
  const [showViewModal, setShowViewModal] = useState(false);

  // Data State
  const [brands, setBrands] = useState([]);
  const [loadingTable, setLoadingTable] = useState(true);
  const [activeTab, setActiveTab] = useState('active');
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  
  // Filter & Pagination
  const [filters, setFilters] = useState({ search: '', status: 1 });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 10,
    totalResults: 0,
  });

  // --- API CALLS ---
  const fetchBrands = useCallback(
    async (page = 1, itemsPerPage = 10, currentFilters = filters) => {
      setLoadingTable(true);
      try {
        const params = {
          page,
          limit: itemsPerPage,
          status: currentFilters.status,
        };
        if (currentFilters.search) params.search = currentFilters.search;

        const response = await apiService.get('/brands', params);

        setBrands(response.brands || []);
        setPagination({
          currentPage: response.pagination?.page || 1,
          itemsPerPage: response.pagination?.limit || 10,
          totalResults: response.pagination?.total || 0,
        });
      } catch (error) {
        showErrorAlert('Error', error.response?.data?.message || 'Failed to fetch brands');
        setBrands([]);
      } finally {
        setLoadingTable(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchBrands(pagination.currentPage, pagination.itemsPerPage, filters);
  }, [refreshTrigger, fetchBrands, filters]);

  // --- HANDLERS ---

  const handleTabChange = (key) => {
    setActiveTab(key);
    const newStatus = key === 'active' ? 1 : 0;
    const newFilters = { ...filters, status: newStatus };
    setFilters(newFilters);
    setPagination(prev => ({ ...prev, currentPage: 1 }));
    fetchBrands(1, pagination.itemsPerPage, newFilters);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    const newFilters = { ...filters, search: value };
    setFilters(newFilters);
    fetchBrands(1, pagination.itemsPerPage, newFilters);
  };

  const handlePageChange = (page, itemsPerPage) => {
    fetchBrands(page, itemsPerPage, filters);
  };

  // --- CRUD ACTIONS ---

  const handleAddSubmit = async (values) => {
    setIsLoadingForm(true);
    try {
      const formData = new FormData();
      formData.append('name', values.name.trim());
      formData.append('description', values.description?.trim() || '');
      formData.append('website', values.website?.trim() || '');
      formData.append('country', values.country?.trim() || '');
      if (values.logo?.file) formData.append('logo', values.logo.file);

      await apiService.upload('/brands', formData);
      showSuccessAlert('Success', 'Brand created successfully');
      
      setIsAddModalOpen(false);
      addForm.resetFields();
      setLogoPreview(null);
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      showErrorAlert('Error', error.response?.data?.message || 'Failed to create brand');
    } finally {
      setIsLoadingForm(false);
    }
  };

  const handleEditSubmit = async (values) => {
    setIsLoadingForm(true);
    try {
      const formData = new FormData();
      formData.append('name', values.name.trim());
      formData.append('description', values.description?.trim() || '');
      formData.append('website', values.website?.trim() || '');
      formData.append('country', values.country?.trim() || '');
      if (values.logo?.file) formData.append('logo', values.logo.file);

      await apiService.put(`/brands/${selectedBrand._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      showSuccessAlert('Success', 'Brand updated successfully');
      setShowEditModal(false);
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      showErrorAlert('Error', error.response?.data?.message || 'Failed to update brand');
    } finally {
      setIsLoadingForm(false);
    }
  };

  const handleSoftDelete = async (brandId) => {
    const result = await showConfirmDialog(
      'Move to Trash?',
      'This brand will be deactivated.',
      'Yes, Trash it'
    );
    if (result.isConfirmed) {
      try {
        await apiService.delete(`/brands/${brandId}`);
        showSuccessAlert('Moved to Trash', 'Brand has been deactivated.');
        setRefreshTrigger(prev => prev + 1);
      } catch (error) {
        showErrorAlert('Error', 'Failed to trash brand');
      }
    }
  };

  const handleRestore = async (brandId) => {
    const result = await showConfirmDialog(
      'Restore Brand?',
      'This will reactivate the brand.',
      'Yes, Restore'
    );
    if (result.isConfirmed) {
      try {
        await apiService.post(`/brands/${brandId}/restore`);
        showSuccessAlert('Restored', 'Brand is active again.');
        setRefreshTrigger(prev => prev + 1);
      } catch (error) {
        showErrorAlert('Error', 'Failed to restore brand');
      }
    }
  };

  // --- MODAL OPENERS ---
  const openEditModal = (item) => {
    setSelectedBrand(item);
    setEditFormWrapper(item);
    setShowEditModal(true);
  };

  const setEditFormWrapper = (item) => {
    editForm.setFieldsValue({
      name: item.name,
      description: item.description,
      website: item.website,
      country: item.country,
    });
    setEditLogoPreview(item.logo ? `http://localhost:5000/${item.logo}` : null);
  };

  // --- HELPERS ---
  const getUploadProps = (setPreviewFn) => ({
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('You can only upload image files!');
        return Upload.LIST_IGNORE;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
        return Upload.LIST_IGNORE;
      }
      setPreviewFn(URL.createObjectURL(file));
      return false; // Prevent auto upload
    },
    maxCount: 1,
    showUploadList: false,
  });

  // --- COLUMNS ---
  const columns = useMemo(() => [
    {
      key: 'info',
      title: 'Brand',
      render: (_, r) => (
        <div className="flex items-center gap-3">
          <Avatar 
            shape="square" 
            size={48} 
            src={r.logo ? `http://localhost:5000/${r.logo}` : null}
            icon={<ShopOutlined />}
            style={{ backgroundColor: THEME.bgLight, color: THEME.primary, border: '1px solid #eee' }}
          />
          <div>
            <div className="font-bold text-gray-800 text-base">{r.name}</div>
            <div className="text-xs text-gray-500">{r.country || 'No Country'}</div>
          </div>
        </div>
      )
    },
    {
      key: 'description',
      title: 'Description',
      width: 300,
      render: (v) => <div className="truncate w-64 text-gray-500" title={v}>{v || '--'}</div>
    },
    {
      key: 'website',
      title: 'Website',
      render: (v) => v ? (
        <a href={v} target="_blank" rel="noopener noreferrer" className="text-blue-600 flex items-center gap-1">
          <GlobalOutlined /> Visit
        </a>
      ) : '--'
    },
    {
      key: 'created_at',
      title: 'Created',
      render: (v) => {
        if (!v) return <span className="text-gray-400">--</span>;
        const date = new Date(v);
        return isNaN(date.getTime()) ? (
            <span className="text-gray-400">--</span>
        ) : (
            <span className="text-gray-500 text-xs">{format(date, 'dd MMM yyyy')}</span>
        );
      }
    },
    {
      key: 'actions',
      title: 'Actions',
      align: 'right',
      render: (_, r) => (
        <Space>
          <Tooltip title="View">
            <Button 
                shape="circle" 
                icon={<EyeOutlined style={{ color: THEME.primary }} />} 
                onClick={() => { setSelectedBrand(r); setShowViewModal(true); }}
            />
          </Tooltip>
          
          {activeTab === 'active' ? (
            <>
              <Tooltip title="Edit">
                <Button 
                    shape="circle" 
                    icon={<EditOutlined style={{ color: THEME.secondary }} />} 
                    onClick={() => openEditModal(r)}
                />
              </Tooltip>
              <Tooltip title="Trash">
                <Button 
                    shape="circle" 
                    danger 
                    icon={<DeleteOutlined />} 
                    onClick={() => handleSoftDelete(r._id)}
                />
              </Tooltip>
            </>
          ) : (
            <Tooltip title="Restore">
                <Button 
                    shape="circle" 
                    icon={<RotateLeftOutlined style={{ color: THEME.success }} />} 
                    onClick={() => handleRestore(r._id)}
                    className="border-green-500"
                />
            </Tooltip>
          )}
        </Space>
      )
    }
  ], [activeTab]);

  // --- TAB ITEMS CONFIGURATION ---
  const tabItems = [
    {
      key: 'active',
      label: (
        <span>
          <ShopOutlined /> Active Brands
          <Badge 
            count={activeTab === 'active' ? pagination.totalResults : 0} 
            style={{ marginLeft: 8, backgroundColor: THEME.success }} 
          />
        </span>
      )
    },
    {
      key: 'trashed',
      label: (
        <span>
          <DeleteOutlined /> Trashed
          <Badge 
            count={activeTab === 'trashed' ? pagination.totalResults : 0} 
            style={{ marginLeft: 8, backgroundColor: THEME.error }} 
          />
        </span>
      )
    }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      
      {/* 1. Header & Stats */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
               
                <div>
                    <Title level={3} style={{ margin: 0 }}>Brand Management</Title>
                    <Text type="secondary">Create and manage your partner brands.</Text>
                </div>
            </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
    {/* Add Brand Button */}
    <Button
        type="primary"
        size="large"
        icon={<PlusOutlined />}
        style={{
            backgroundColor: THEME.primary,
            borderColor: THEME.primary
        }}
        onClick={() => setIsAddModalOpen(true)}
    >
        Add New Brand
    </Button>

    {/* Back Button */}
    <Button
        size="large"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate(-1)}
        style={{
            backgroundColor: THEME.primary,
            borderColor: THEME.primary,
            color: "#fff"
        }}
        onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "black";
            e.currentTarget.style.borderColor = "black";
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = THEME.primary;
            e.currentTarget.style.borderColor = THEME.primary;
        }}
    >
        Back
    </Button>
</div>

        </div>

        <Row gutter={[16, 16]}>
            <Col xs={24} sm={8}>
                <Card bordered={false} className="shadow-sm border-t-4" style={{ borderColor: THEME.primary }}>
                    <Statistic 
                        title="Total Brands" 
                        value={pagination.totalResults} 
                        prefix={<ShopOutlined style={{ color: THEME.primary }} />} 
                    />
                </Card>
            </Col>
            <Col xs={24} sm={8}>
                <Card bordered={false} className="shadow-sm border-t-4" style={{ borderColor: THEME.success }}>
                    <Statistic 
                        title="Active Brands" 
                        value={activeTab === 'active' ? pagination.totalResults : '--'} 
                        prefix={<CheckCircleOutlined style={{ color: THEME.success }} />} 
                    />
                </Card>
            </Col>
            <Col xs={24} sm={8}>
                <Card bordered={false} className="shadow-sm border-t-4" style={{ borderColor: THEME.error }}>
                    <Statistic 
                        title="Trashed Brands" 
                        value={activeTab === 'trashed' ? pagination.totalResults : '--'} 
                        prefix={<RestOutlined style={{ color: THEME.error }} />} 
                    />
                </Card>
            </Col>
        </Row>
      </div>

      {/* 2. Main Content */}
      <Card bordered={false} className="shadow-md rounded-lg" bodyStyle={{ padding: 0 }}>
        {/* Search Bar */}
       

        {/* --- TABS WITH CARD STYLE --- */}
        <Tabs
            activeKey={activeTab}
            onChange={handleTabChange}
            type="card"
            size="large"
            tabBarStyle={{ margin: 0, paddingLeft: 16, paddingTop: 16, background: '#fafafa' }}
            items={tabItems}
        />

        {/* Table */}
        <div className="p-0">
            <CustomTable
                columns={columns}
                data={brands}
                loading={loadingTable}
                totalItems={pagination.totalResults}
                currentPage={pagination.currentPage}
                itemsPerPage={pagination.itemsPerPage}
                onPageChange={handlePageChange}
            />
        </div>
      </Card>

      {/* 3. ADD BRAND MODAL */}
      <Modal
        title={
            <div className="flex items-center gap-2 text-xl font-bold text-gray-800">
                <PlusOutlined style={{ color: THEME.primary }} /> Add New Brand
            </div>
        }
        open={isAddModalOpen}
        onCancel={() => { setIsAddModalOpen(false); addForm.resetFields(); setLogoPreview(null); }}
        footer={null}
        width={600}
        destroyOnClose
        centered
      >
        <Divider className="my-4" />
        <Form form={addForm} onFinish={handleAddSubmit} layout="vertical">
            <Row gutter={16}>
                <Col span={24} className="flex justify-center mb-4">
                    <Form.Item name="logo">
                        <Upload {...getUploadProps(setLogoPreview)} listType="picture-card" showUploadList={false}>
                            {logoPreview ? (
                                <img src={logoPreview} alt="logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Upload Logo</div>
                                </div>
                            )}
                        </Upload>
                    </Form.Item>
                </Col>
            </Row>
            
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item name="name" label="Brand Name" rules={[{ required: true }]}>
                        <Input size="large" placeholder="e.g. Nike" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="country" label="Country">
                        <Input size="large" placeholder="e.g. USA" />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item name="website" label="Website URL" rules={[{ type: 'url', warningOnly: true }]}>
                <Input size="large" prefix={<GlobalOutlined className="text-gray-400" />} placeholder="https://..." />
            </Form.Item>

            <Form.Item name="description" label="Description">
                <TextArea rows={3} placeholder="Short bio about the brand..." />
            </Form.Item>

            <div className="flex justify-end gap-3 mt-6">
                <Button size="large" onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
                <Button 
                    type="primary" 
                    htmlType="submit" 
                    loading={isLoadingForm}
                    size="large"
                    style={{ backgroundColor: THEME.primary, borderColor: THEME.primary }}
                >
                    Create Brand
                </Button>
            </div>
        </Form>
      </Modal>

      {/* 4. EDIT BRAND MODAL */}
      <Modal
        title={
            <div className="flex items-center gap-2 text-xl font-bold text-gray-800">
                <EditOutlined style={{ color: THEME.secondary }} /> Edit Brand
            </div>
        }
        open={showEditModal}
        onCancel={() => setShowEditModal(false)}
        footer={null}
        width={600}
        destroyOnClose
        centered
      >
        <Divider className="my-4" />
        <Form form={editForm} onFinish={handleEditSubmit} layout="vertical">
            <Row gutter={16}>
                <Col span={24} className="flex justify-center mb-4">
                    <Form.Item name="logo">
                        <Upload {...getUploadProps(setEditLogoPreview)} listType="picture-card" showUploadList={false}>
                            {editLogoPreview ? (
                                <img src={editLogoPreview} alt="logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Change Logo</div>
                                </div>
                            )}
                        </Upload>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item name="name" label="Brand Name" rules={[{ required: true }]}>
                        <Input size="large" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="country" label="Country">
                        <Input size="large" />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item name="website" label="Website URL">
                <Input size="large" prefix={<GlobalOutlined className="text-gray-400" />} />
            </Form.Item>

            <Form.Item name="description" label="Description">
                <TextArea rows={3} />
            </Form.Item>

            <div className="flex justify-end gap-3 mt-6">
                <Button size="large" onClick={() => setShowEditModal(false)}>Cancel</Button>
                <Button 
                    type="primary" 
                    htmlType="submit" 
                    loading={isLoadingForm}
                    size="large"
                    style={{ backgroundColor: THEME.primary, borderColor: THEME.primary }}
                >
                    Update Brand
                </Button>
            </div>
        </Form>
      </Modal>

      {/* 5. VIEW MODAL */}
      <Modal
        title="Brand Details"
        open={showViewModal}
        onCancel={() => setShowViewModal(false)}
        footer={[<Button key="close" onClick={() => setShowViewModal(false)}>Close</Button>]}
        centered
      >
        {selectedBrand && (
            <div className="text-center">
                <Avatar 
                    size={80} 
                    src={selectedBrand.logo ? `http://localhost:5000/${selectedBrand.logo}` : null} 
                    icon={<ShopOutlined />}
                    className="mb-4 bg-purple-50 text-purple-500 border border-purple-100"
                    shape="square"
                />
                <Title level={4} style={{ margin: 0 }}>{selectedBrand.name}</Title>
                <Text type="secondary">{selectedBrand.country}</Text>
                
                <Divider />
                
                <div className="text-left space-y-3">
                    <div>
                        <Text strong className="block text-gray-600">Website:</Text>
                        {selectedBrand.website ? <a href={selectedBrand.website} target="_blank" rel="noreferrer">{selectedBrand.website}</a> : <Text type="secondary">N/A</Text>}
                    </div>
                    <div>
                        <Text strong className="block text-gray-600">Description:</Text>
                        <p className="text-gray-700">{selectedBrand.description || 'No description provided.'}</p>
                    </div>
                    <div className="flex justify-between mt-4 text-xs text-gray-400">
                        <span>Created: {format(new Date(selectedBrand.created_at || new Date()), 'dd MMM yyyy')}</span>
                    </div>
                </div>
            </div>
        )}
      </Modal>

    </div>
  );
};

export default AddBrand;