// src/pages/admin/ProductRequestB2C.jsx
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  FiRefreshCw,
  FiEye,
  FiCheck,
  FiX,
  FiShoppingBag,
  FiClock,
  FiPackage,
  FiSearch,
  FiEdit2,
  FiTrendingUp,
  FiArrowRight
} from "react-icons/fi";
import {
  Button,
  Modal,
  Input,
  Tabs,
  Card,
  Tag,
  Select as AntdSelect,
  Statistic,
  DatePicker,
  Space,
  Form,
  Row,
  Col,
  Tooltip,
  Alert,
  Avatar,
  Typography,
  Badge,
  InputNumber,
  Divider
} from "antd";
import CustomTable from "../../custom/CustomTable";
import { apiService } from "../../../../../manageApi/utils/custom.apiservice";
import { showToast } from "../../../../../manageApi/utils/toast";
import { showConfirmDialog } from "../../../../../manageApi/utils/sweetAlert";
import dayjs from "dayjs";
import { format } from "date-fns";

const { Option } = AntdSelect;
const { TextArea } = Input;
const { Title, Text } = Typography;

const THEME = {
  primary: "#722ed1",
  secondary: "#1890ff",
  success: "#52c41a",
  warning: "#faad14",
  error: "#ff4d4f",
  bgLight: "#f9f0ff",
};

const useProductPermission = () => {
  const { permissions } = useSelector((s) => s.auth);
  const p = permissions?.["Request→All Sellers"] ?? {};
  return {
    canView: !!p.canView,
    canEdit: !!p.canEdit,
    canDelete: !!p.canDelete,
  };
};

const ROLE_SLUG_MAP = {
  0: "superadmin",
  1: "admin",
  5: "vendor-b2c",
  6: "vendor-b2b",
  7: "freelancer",
  11: "accountant",
};

const PricingPreview = ({ form, basePrice, currencySymbol = "$" }) => {
  const values = Form.useWatch([], form);

  if (!values) return null;

  const salePrice = Number(values.sale_price) || 0;
  const discountVal = Number(values.discount_value) || 0;
  const discountType = values.discount_type || 'percentage';
  const taxRate = Number(values.rate) || 0;

  let discountAmount = 0;
  if (discountType === 'percentage') {
    discountAmount = salePrice * (discountVal / 100);
  } else {
    discountAmount = discountVal;
  }
  const priceAfterDiscount = Math.max(salePrice - discountAmount, 0);
  const taxAmount = priceAfterDiscount * (taxRate / 100);
  const finalPrice = priceAfterDiscount + taxAmount;

  const margin = priceAfterDiscount - basePrice;
  const marginPercent = basePrice > 0 ? (margin / basePrice) * 100 : 0;

  return (
    <Card className="bg-gray-50 border-gray-200 mt-4 md:mt-0 h-full">
      <Title level={5} className="mb-4 text-purple-700 flex items-center gap-2">
        <FiTrendingUp /> Pricing Impact
      </Title>
      <div className="space-y-4">
        <div className="flex justify-between items-center bg-white p-3 rounded border">
          <div>
            <Text type="secondary" className="text-xs">Vendor Base Cost</Text>
            <div className="font-semibold text-gray-600">
              {currencySymbol} {basePrice.toFixed(2)}
            </div>
          </div>
          <FiArrowRight className="text-gray-400" />
          <div className="text-right">
            <Text type="secondary" className="text-xs">Your Sale Price</Text>
            <div className="font-bold text-blue-600">
              {currencySymbol} {salePrice.toFixed(2)}
            </div>
          </div>
        </div>
        <Divider style={{ margin: '12px 0' }} />
        <Row gutter={16}>
          <Col span={12}>
            <Statistic
              title={`Net Margin (${currencySymbol})`}
              value={margin}
              precision={2}
              valueStyle={{ color: margin >= 0 ? THEME.success : THEME.error, fontSize: '1.2rem' }}
              prefix={currencySymbol}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="Margin %"
              value={marginPercent}
              precision={1}
              valueStyle={{ color: margin >= 0 ? THEME.success : THEME.error, fontSize: '1.2rem' }}
              suffix="%"
            />
          </Col>
        </Row>
        <div className="bg-white p-3 rounded border mt-2">
          <div className="flex justify-between text-sm mb-1">
            <span>Price after Disc:</span>
            <span>{currencySymbol} {priceAfterDiscount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span>Tax ({taxRate}%):</span>
            <span>+{currencySymbol} {taxAmount.toFixed(2)}</span>
          </div>
          <Divider style={{ margin: '6px 0' }} />
          <div className="flex justify-between font-bold text-base">
            <span>Final Customer Price:</span>
            <span className="text-purple-700">
              {currencySymbol} {finalPrice.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

const ProductRequestB2C = () => {
  const { user, token } = useSelector((state) => state.auth);
  const { id: vendorId } = useParams();
  const [form] = Form.useForm();
  const perm = useProductPermission();
  const roleSlug = ROLE_SLUG_MAP[user?.role?.code] ?? "dashboard";
  const isAdmin = ["superadmin", "admin"].includes(roleSlug);
  const effectiveVendorId = isAdmin ? vendorId : user.id;
  const isValidVendorId = effectiveVendorId && effectiveVendorId !== "undefined";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("pending");
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalResults: 0,
    itemsPerPage: 10,
  });

  const [filters, setFilters] = useState({
    search: "",
    category_id: "",
  });

  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [rejectionReason, setRejectionReason] = useState("");
  const [rejectionSuggestion, setRejectionSuggestion] = useState("");

  const [categories, setCategories] = useState([]);
  const [serverErrors, setServerErrors] = useState([]); // For pricing modal errors

  const fetchCategories = async () => {
    try {
      const res = await apiService.get("/categories");
      setCategories(res.categories || []);
    } catch (err) {
      console.error("Categories fetch failed");
    }
  };

  const fetchProducts = useCallback(
    async (page = 1, limit = 10, currentFilters = filters) => {
      if (!token || !perm.canView) return;
      setLoading(true);
      try {
        const params = {
          page,
          limit,
          verification_status: activeTab,
          vendor_id: isValidVendorId ? effectiveVendorId : undefined,
          ...currentFilters
        };
        Object.keys(params).forEach(key => {
          if (params[key] === "" || params[key] === undefined) delete params[key];
        });
        const res = await apiService.get("/products", { params });
        setProducts(res.products || []);

        setPagination({
          currentPage: res.pagination?.currentPage || 1,
          totalPages: res.pagination?.totalPages || 1,
          totalResults: res.pagination?.totalRecords || 0,
          itemsPerPage: res.pagination?.perPage || 10,
        });
        if (res.stats) {
          setStats(prev => ({ ...prev, ...res.stats }));
        }
      } catch (err) {
        showToast(err.response?.data?.message || "Failed to load products", "error");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    },
    [token, perm.canView, effectiveVendorId, isValidVendorId, activeTab, filters]
  );

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts(pagination.currentPage, pagination.itemsPerPage, filters);
  }, [activeTab, fetchProducts]);

  const handlePageChange = (page, limit) => {
    fetchProducts(page, limit, filters);
  };

  const handleRefresh = () => {
    fetchProducts(pagination.currentPage, pagination.itemsPerPage, filters);
  };

  const handleVerifyAll = async (id, status, reason = "", suggestion = "") => {
    try {
      const payload = { status };
      if (status === "rejected") {
        payload.rejection_reason = reason;
        payload.suggestion = suggestion;
      }
      await apiService.put(`/products/${id}/verify-all`, payload);
      showToast(`Product ${status} successfully`, "success");
      fetchProducts(pagination.currentPage, pagination.itemsPerPage, filters);
      setShowRejectModal(false);
    } catch (err) {
      showToast(err.response?.data?.message || "Update failed", "error");
    }
  };

  // === IMPROVED PRICING UPDATE WITH SERVER VALIDATION ===
  const handlePricingUpdate = async (values) => {
    if (!selectedProduct) return;

    setServerErrors([]); // Clear previous errors

 const isConfirmed = await showConfirmDialog(
  "Update Pricing?",
  "This will immediately change the price visible to customers.",
  "Yes, Update It",
  "Cancel"
);

if (!isConfirmed) return;


    try {
      const payload = {
        sale_price: values.sale_price,
        discount: {
          type: values.discount_type,
          value: values.discount_value,
          valid_till: values.valid_till ? values.valid_till.toISOString() : null
        },
        tax: {
          rate: values.rate
        }
      };

      await apiService.put(`/products/${selectedProduct._id}/pricing`, payload);

      showToast("Pricing updated successfully", "success");
      setShowPricingModal(false);
      fetchProducts(pagination.currentPage, pagination.itemsPerPage, filters);
    } catch (err) {
      const res = err.response?.data;

      if (res?.errors && Array.isArray(res.errors)) {
        const errors = res.errors;
        setServerErrors(errors);

        // Map backend field names to form field names
        const fieldErrors = errors.map(error => {
          let fieldName = error.field;

          if (fieldName === 'sale_price') return { name: 'sale_price', errors: [error.message] };
          if (fieldName === 'discount.value') return { name: 'discount_value', errors: [error.message] };
          if (fieldName === 'discount.type') return { name: 'discount_type', errors: [error.message] };
          if (fieldName === 'tax.rate') return { name: 'rate', errors: [error.message] };
          if (fieldName === 'discount.valid_till') return { name: 'valid_till', errors: [error.message] };

          return { name: fieldName, errors: [error.message] };
        });

        form.setFields(fieldErrors);

        // Scroll to first error
        setTimeout(() => {
          const firstError = errors[0];
          const selector = `[name="${firstError.field === 'discount.value' ? 'discount_value' : firstError.field}"]`;
          const el = document.querySelector(selector);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 100);

        // showToast(`Please fix ${errors.length} error(s) in the form`, "error");
      } else {
        const msg = res?.message || "Pricing update failed";
        // showToast(msg, "error");
        setServerErrors([{ field: 'general', message: msg }]);
      }
    }
  };

  const openPricingModal = (product) => {
    setSelectedProduct(product);
    setServerErrors([]);
    form.resetFields();
    form.setFieldsValue({
      sale_price: product.pricing?.sale_price || product.pricing?.base_price,
      discount_type: product.pricing?.discount?.type || "percentage",
      discount_value: product.pricing?.discount?.value || 0,
      valid_till: product.pricing?.discount?.valid_till ? dayjs(product.pricing.discount.valid_till) : null,
      rate: product.pricing?.tax?.rate || 0
    });
    setShowPricingModal(true);
  };

  const onStatusDropdownChange = (id, value) => {
    if (value === 'rejected') {
      const prod = products.find(p => p._id === id);
      setSelectedProduct(prod);
      setRejectionReason("");
      setRejectionSuggestion("");
      setShowRejectModal(true);
    } else {
      Modal.confirm({
        title: 'Confirm Approval',
        content: 'Are you sure you want to approve this product?',
        onOk: () => handleVerifyAll(id, 'approved')
      });
    }
  };

  const columns = useMemo(
    () => [
      // ... (your existing columns remain unchanged)
      {
        title: "Product Info",
        width: 300,
        render: (_, r) => (
          <div className="flex items-center gap-3">
            <Avatar
              shape="square"
              size={50}
              src={r.color_variants?.[0]?.images?.[0]?.url ? `http://localhost:5000/${r.color_variants[0].images[0].url}` : null}
              icon={<FiShoppingBag />}
              style={{ backgroundColor: THEME.bgLight, color: THEME.primary, border: '1px solid #eee' }}
            />
            <div>
              <div className="font-semibold text-gray-800">{r.name}</div>
              <div className="text-xs text-gray-500">Code: {r.product_code || "N/A"}</div>
              <div className="text-xs text-purple-600">{r.category?.name}</div>
            </div>
          </div>
        ),
      },
      {
        title: "Pricing",
        width: 150,
        render: (_, r) => {
          const price = r.pricing?.sale_price || r.pricing?.base_price || 0;
          const currency = r.pricing?.currency?.symbol || "$";
          return (
            <div>
              <div className="font-medium text-gray-700">
                {currency} {price.toFixed(2)}
              </div>
              {r.pricing?.discount?.value > 0 && (
                <div className="text-xs text-green-600">
                  {r.pricing.discount.type === 'percentage' ? `${r.pricing.discount.value}% Off` : `-${currency} ${r.pricing.discount.value}`}
                </div>
              )}
            </div>
          )
        },
      },
      {
        title: "Stock",
        width: 120,
        render: (_, r) => (
          <Tag color={r.stock?.total_available > 0 ? "green" : "red"}>
            {r.stock?.total_available || 0} In Stock
          </Tag>
        ),
      },
      {
        title: "Vendor",
        width: 200,
        render: (_, r) => (
          <div>
            <div className="text-sm font-medium">{r.vendor?.email}</div>
            <div className="text-xs text-gray-400">ID: {r.vendor?._id}</div>
          </div>
        )
      },
      {
        title: "Status",
        width: 150,
        render: (_, r) => {
          const v = r.verification_status?.status || "pending";
          if (v === 'pending' && perm.canEdit) {
            return (
              <AntdSelect
                defaultValue="pending"
                style={{ width: 120 }}
                onChange={(val) => onStatusDropdownChange(r._id, val)}
              >
                <Option value="pending">Pending</Option>
                <Option value="approved" className="text-green-600">Approve</Option>
                <Option value="rejected" className="text-red-600">Reject</Option>
              </AntdSelect>
            );
          }
          const map = { pending: "warning", approved: "success", rejected: "error" };
          return <Badge status={map[v]} text={v.toUpperCase()} />;
        },
      },
      {
        title: "Created",
        width: 120,
        render: (_, r) => (
          <span className="text-gray-500 text-xs">
            {r.createdAt ? format(new Date(r.createdAt), "dd MMM yyyy") : "--"}
          </span>
        )
      },
      {
        title: "Actions",
        fixed: "right",
        width: 120,
        render: (_, r) => (
          <Space>
            <Tooltip title="View Details">
              <Button
                type="text"
                shape="circle"
                icon={<FiEye style={{ color: THEME.primary }} />}
                href={`/dashboard/${roleSlug}/products?productId=${r._id}`}
              />
            </Tooltip>
            {perm.canEdit && (
              <Tooltip title="Edit Pricing">
                <Button
                  type="text"
                  shape="circle"
                  icon={<FiEdit2 style={{ color: THEME.secondary }} />}
                  onClick={() => openPricingModal(r)}
                />
              </Tooltip>
            )}
          </Space>
        ),
      },
    ],
    [perm, roleSlug, products]
  );

  const tabItems = [
    // ... (your tab items remain unchanged)
    {
      key: 'pending',
      label: (
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <FiClock size={16} />
          <span>Pending</span>
          <Badge count={stats.pending || 0} style={{ backgroundColor: THEME.warning }} />
        </span>
      )
    },
    {
      key: 'approved',
      label: (
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <FiCheck size={16} />
          <span>Approved</span>
          <Badge count={stats.approved || 0} style={{ backgroundColor: THEME.success }} />
        </span>
      )
    },
    {
      key: 'rejected',
      label: (
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <FiX size={16} />
          <span>Rejected</span>
          <Badge count={stats.rejected || 0} style={{ backgroundColor: THEME.error }} />
        </span>
      )
    }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header & Stats - unchanged */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <Title level={3} style={{ margin: 0 }}>Product Requests (B2C)</Title>
            <Text type="secondary">Manage product approvals and pricing.</Text>
          </div>
          <Button
            icon={<FiRefreshCw />}
            onClick={handleRefresh}
            loading={loading}
            size="large"
          >
            Refresh
          </Button>
        </div>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8}>
            <Card bordered={false} className="shadow-sm border-t-4" style={{ borderColor: THEME.primary }}>
              <Statistic
                title="Total Products"
                value={pagination.totalResults}
                prefix={<FiPackage style={{ color: THEME.primary }} />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card bordered={false} className="shadow-sm border-t-4" style={{ borderColor: THEME.warning }}>
              <Statistic
                title="Pending Review"
                value={stats.pending || 0}
                prefix={<FiClock style={{ color: THEME.warning }} />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card bordered={false} className="shadow-sm border-t-4" style={{ borderColor: THEME.success }}>
              <Statistic
                title="Approved"
                value={stats.approved || 0}
                prefix={<FiCheck style={{ color: THEME.success }} />}
              />
            </Card>
          </Col>
        </Row>
      </div>

      <Card bordered={false} className="shadow-md rounded-lg" bodyStyle={{ padding: 0 }}>
        <div className="p-4 border-b border-gray-100 bg-white rounded-t-lg flex flex-wrap gap-4">
          <Input
            prefix={<FiSearch className="text-gray-400" />}
            placeholder="Search products..."
            size="large"
            onPressEnter={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            style={{ maxWidth: 300 }}
            allowClear
          />
          <AntdSelect
            placeholder="Filter by Category"
            size="large"
            style={{ width: 200 }}
            allowClear
            onChange={(val) => setFilters(prev => ({ ...prev, category_id: val }))}
          >
            {categories.map(c => <Option key={c._id} value={c._id}>{c.name}</Option>)}
          </AntdSelect>
        </div>
        <Tabs
          activeKey={activeTab}
          onChange={(key) => setActiveTab(key)}
          size="large"
          tabBarStyle={{ margin: 0, paddingLeft: 16, paddingTop: 16, background: '#fafafa' }}
          items={tabItems}
          type="card"
        />
        <div className="p-0">
          <CustomTable
            columns={columns}
            data={products}
            loading={loading}
            totalItems={pagination.totalResults}
            currentPage={pagination.currentPage}
            itemsPerPage={pagination.itemsPerPage}
            onPageChange={handlePageChange}
            scroll={{ x: 1200 }}
          />
        </div>
      </Card>

      {/* Reject Modal - unchanged */}
      <Modal
        open={showRejectModal}
        title={<div className="flex items-center gap-2 text-red-600"><FiX /> Reject Product</div>}
        onCancel={() => setShowRejectModal(false)}
        footer={null}
      >
        {selectedProduct && (
          <div className="space-y-4 pt-2">
            <Alert message={`Rejecting: ${selectedProduct.name}`} type="warning" showIcon />
            <TextArea
              rows={3}
              placeholder="Reason for rejection (Required)"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
            />
            <TextArea
              rows={2}
              placeholder="Suggestion for improvement (Optional)"
              value={rejectionSuggestion}
              onChange={(e) => setRejectionSuggestion(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <Button onClick={() => setShowRejectModal(false)}>Cancel</Button>
              <Button
                type="primary"
                danger
                disabled={!rejectionReason.trim()}
                onClick={() => handleVerifyAll(selectedProduct._id, "rejected", rejectionReason, rejectionSuggestion)}
              >
                Confirm Rejection
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Pricing Modal - NOW WITH SERVER ERROR HANDLING */}
      <Modal
        open={showPricingModal}
        title="Update Pricing & Margin"
        footer={null}
        onCancel={() => {
          setShowPricingModal(false);
          setServerErrors([]);
          form.resetFields();
        }}
        destroyOnClose
        width={800}
      >
      

        <Form form={form} layout="vertical" onFinish={handlePricingUpdate}>
          <Row gutter={24}>
            <Col xs={24} md={12}>
              <Form.Item name="sale_price" label="Sale Price (Base Price)" rules={[{ required: true, message: 'Sale Price is required' }]}>
                <InputNumber
                  style={{ width: '100%' }}
                  min={0}
                  prefix={selectedProduct?.pricing?.currency?.symbol || "$"}
                  placeholder="e.g. 150"
                />
              </Form.Item>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="discount_type" label="Discount Type" initialValue="percentage">
                    <AntdSelect>
                      <Option value="percentage">Percentage</Option>
                      <Option value="fixed">Fixed Amount</Option>
                    </AntdSelect>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="discount_value" label="Value">
                    <InputNumber style={{ width: '100%' }} min={0} placeholder="0" />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item name="valid_till" label="Discount Valid Till">
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item name="rate" label="Tax Rate (%)">
                <InputNumber style={{ width: '100%' }} min={0} max={100} placeholder="0" />
              </Form.Item>
            </Col>

            <Col xs={24} md={12}>
              {selectedProduct && (
                <PricingPreview
                  form={form}
                  basePrice={selectedProduct.pricing?.base_price || 0}
                  currencySymbol={selectedProduct.pricing?.currency?.symbol || "$"}
                />
              )}
            </Col>
          </Row>
          <Divider />
          <div className="flex justify-end gap-2">
            <Button onClick={() => setShowPricingModal(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Update Pricing
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductRequestB2C;