// src/pages/admin/ProductRequestB2C.jsx
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  FiPlus,
  FiRefreshCw,
  FiEye,
  FiCheck,
  FiX,
  FiShoppingBag,
  FiTrendingDown,
  FiImage,
  FiFileText,FiPackage ,FiClock 
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
  Form,
  Collapse,
  Alert,
  Space,
} from "antd";
import CustomTable from "../../custom/CustomTable";
import { apiService } from "../../../../../manageApi/utils/custom.apiservice";
import { showToast } from "../../../../../manageApi/utils/toast";
import { format, isBefore } from "date-fns";

const { Option } = AntdSelect;
const { TextArea } = Input;
const { TabPane } = Tabs;
const { Panel } = Collapse;

/* ------------------------------------------------------------------ */
/*                     PERMISSION HOOK (same as Permission page)      */
/* ------------------------------------------------------------------ */
const useProductPermission = () => {
  const { permissions } = useSelector((s) => s.auth);
  const p = permissions?.["Request→All Sellers"] ?? {};

  return {
    canView: !!p.canView,
    canAdd: !!p.canAdd,
    canEdit: !!p.canEdit,
    canDelete: !!p.canDelete,
    canViewAll: !!p.canViewAll,
    // we will also expose approve/reject/edit-pricing from the same object
    canApprove: !!p.canEdit,          // approve = edit permission
    canReject: !!p.canDelete,         // reject = delete permission
    canEditPricing: !!p.canEdit,      // pricing edit = edit permission
    canViewInventory: !!p.canViewAll, // inventory = view-all permission
  };
};

/* ------------------------------------------------------------------ */
/*                     ROLE SLUG MAP (unchanged)                      */
/* ------------------------------------------------------------------ */
const ROLE_SLUG_MAP = {
  0: "superadmin",
  1: "admin",
  5: "vendor-b2c",
  6: "vendor-b2b",
  7: "freelancer",
  11: "accountant",
};

const ProductRequestB2C = () => {
  const { user, token } = useSelector((state) => state.auth);
  const { id: vendorId } = useParams();
  const [form] = Form.useForm();

  /* ----------------------- PERMISSIONS ----------------------- */
  const perm = useProductPermission();

  // ROLE & VENDOR LOGIC (unchanged)
  const roleSlug = ROLE_SLUG_MAP[user?.role?.code] ?? "unknown";
  const isAdmin = ["superadmin", "admin"].includes(roleSlug);
  const isVendor = roleSlug === "vendor-b2c";

  // Vendor can only see own products unless superadmin
  const effectiveVendorId = isAdmin ? vendorId : user.id;
  const isValidVendorId = effectiveVendorId && effectiveVendorId !== "undefined";

  /* -------------------------- STATE -------------------------- */
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalResults: 0,
    itemsPerPage: 10,
  });
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });
  const [activeTab, setActiveTab] = useState("pending");
  const [filters, setFilters] = useState({
    verification_status: "pending",
    search: "",
    category_id: "",
    date_filter: "",
  });
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Modals
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [rejectionSuggestion, setRejectionSuggestion] = useState("");
  const [assetErrors, setAssetErrors] = useState([]);

  // Dropdown data
  const [categories, setCategories] = useState([]);
  const [taxes, setTaxes] = useState([]);

  /* ----------------------- FETCH DATA ------------------------ */
  const fetchCategories = async () => {
    try {
      const res = await apiService.get("/categories");
      setCategories(res.categories || []);
    } catch (err) {
      showToast("Failed to load categories", "error");
    }
  };

  const fetchTaxes = async () => {
    try {
      const res = await apiService.get("/setting/tax");
      setTaxes(res.taxes || []);
    } catch (err) {
      showToast("Failed to load taxes", "error");
    }
  };

  const fetchProducts = useCallback(
    async (page = 1, limit = 10, filters = {}) => {
      if (!token || !perm.canView) return;
      setLoading(true);

      try {
        const params = {
          page,
          limit,
          verification_status: filters.verification_status,
          vendor_id: isValidVendorId ? effectiveVendorId : undefined,
        };

        if (filters.search) params.search = filters.search;
        if (filters.category_id) params.category_id = filters.category_id;
        if (filters.date_filter) params.date_filter = filters.date_filter;

        const res = await apiService.get("/products", params);

        const raw = res.products || [];
        setProducts(raw.map((p) => ({ ...p, key: p._id })));

        setPagination({
          currentPage: res.pagination?.page || 1,
          totalPages: Math.ceil((res.pagination?.total || 0) / limit) || 1,
          totalResults: res.pagination?.total || 0,
          itemsPerPage: res.pagination?.limit || 10,
        });

        setStats({
          total: res.stats?.total || 0,
          pending: res.stats?.pending || 0,
          approved: res.stats?.approved || 0,
          rejected: res.stats?.rejected || 0,
        });
      } catch (err) {
        showToast(err.response?.data?.message || "Failed to load products", "error");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    },
    [token, perm.canView, effectiveVendorId, isValidVendorId]
  );

  useEffect(() => {
    fetchCategories();
    fetchTaxes();
  }, []);

  useEffect(() => {
    fetchProducts(pagination.currentPage, pagination.itemsPerPage, filters);
  }, [activeTab, refreshTrigger, fetchProducts]);

  /* -------------------------- HANDLERS -------------------------- */
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    const newFilters = { ...filters, verification_status: tab };
    setFilters(newFilters);
    setPagination((p) => ({ ...p, currentPage: 1 }));
    fetchProducts(1, pagination.itemsPerPage, newFilters);
  };

  const handlePageChange = (page, limit) => {
    setPagination((p) => ({ ...p, currentPage: page, itemsPerPage: limit }));
    fetchProducts(page, limit, filters);
  };

  const handleFilter = (newFilters) => {
    const updated = { ...newFilters, verification_status: filters.verification_status };
    setFilters(updated);
    setPagination((p) => ({ ...p, currentPage: 1 }));
    fetchProducts(1, pagination.itemsPerPage, updated);
  };

  const handleRefresh = () => setRefreshTrigger((t) => t + 1);

  const openRejectModal = (product) => {
    setSelectedProduct(product);
    setRejectionReason("");
    setRejectionSuggestion("");
    setAssetErrors([]);
    setShowRejectModal(true);
  };

  const closeRejectModal = () => {
    setShowRejectModal(false);
    setSelectedProduct(null);
  };

  const openPricingModal = (product) => {
    setSelectedProduct(product);
    form.setFieldsValue({
      discount_type: product.pricing?.discount?.type || "percentage",
      discount_value: product.pricing?.discount?.value || 0,
      valid_till: product.pricing?.discount?.valid_till
        ? new Date(product.pricing.discount.valid_till)
        : null,
      sale_price: product.pricing?.sale_price || product.pricing?.base_price || 0,
      tax_id: product.pricing?.tax?.tax_id || "",
      rate: product.pricing?.tax?.rate || 0,
    });
    setShowPricingModal(true);
  };

  const closePricingModal = () => {
    setShowPricingModal(false);
    setSelectedProduct(null);
    form.resetFields();
  };

  const handleStatusUpdate = async (id, status, reason = "", suggestion = "") => {
    try {
      const payload = { status };
      if (status === "rejected") {
        payload.rejection_reason = reason;
        payload.suggestion = suggestion;
      }
      await apiService.put(`/products/${id}/verify-all`, payload);
      showToast(`Product ${status} successfully`, "success");
      fetchProducts(pagination.currentPage, pagination.itemsPerPage, filters);
      closeRejectModal();
    } catch (err) {
      const msg = err.response?.data?.message || "Update failed";
      showToast(msg, "error");
      if (err.response?.data?.assetErrors) setAssetErrors(err.response.data.assetErrors);
    }
  };

  const handlePricingUpdate = async (values) => {
    try {
      const payload = {
        sale_price: values.sale_price,
        discount: {
          type: values.discount_type,
          value: values.discount_value,
          valid_till: values.valid_till?.toISOString(),
        },
        tax: {
          tax_id: values.tax_id || undefined,
          rate: values.rate,
        },
      };
      await apiService.put(`/products/${selectedProduct._id}/pricing`, payload);
      showToast("Pricing updated", "success");
      fetchProducts(pagination.currentPage, pagination.itemsPerPage, filters);
      closePricingModal();
    } catch (err) {
      showToast(err.response?.data?.message || "Pricing update failed", "error");
    }
  };

  const handleTaxChange = (value) => {
    const tax = taxes.find((t) => t._id === value);
    if (tax) form.setFieldsValue({ rate: tax.rate });
  };

  /* -------------------------- TABLE DATA -------------------------- */
  const dataWithSno = useMemo(() => {
    return products.map((p, i) => ({
      ...p,
      sno: (pagination.currentPage - 1) * pagination.itemsPerPage + i + 1,
    }));
  }, [products, pagination]);

  /* -------------------------- COLUMNS -------------------------- */
  const productColumns = useMemo(
    () => [
      {
        key: "sno",
        title: "S.No",
        width: 70,
        render: (_, r) => <span className="font-medium">{r.sno}</span>,
      },
      {
        key: "name",
        title: "Product",
        width: 220,
        render: (_, r) => (
          <div>
            <div className="font-medium">{r.name || "--"}</div>
            <div className="text-xs text-gray-500">{r.product_code || "N/A"}</div>
          </div>
        ),
      },
      {
        key: "vendor",
        title: "Vendor",
        width: 180,
        render: (_, r) => (
          <div>
            <div className="font-medium">{r.vendor?.full_name || "--"}</div>
            <div className="text-xs text-gray-500">{r.vendor?.email || "--"}</div>
          </div>
        ),
      },
      {
        key: "category",
        title: "Category",
        width: 140,
        render: (_, r) => r.category?.name || "--",
      },
      {
        key: "sale_price",
        title: "Sale Price",
        width: 120,
        render: (_, r) => {
          const price = r.pricing?.sale_price || r.pricing?.final_price || 0;
          return `${r.pricing?.currency?.symbol || "₹"} ${price.toFixed(2)}`;
        },
      },
      {
        key: "discount",
        title: "Discount",
        width: 160,
        render: (_, r) => {
          if (!r.pricing?.discount?.value || !r.pricing?.discount?.approved) return "--";
          const d = r.pricing.discount;
          return (
            <div>
              {d.type === "percentage" ? `${d.value}%` : `${r.d?.symbol || "₹"} ${d.value}`}
              <div className="text-xs">
                Till {d.valid_till ? format(new Date(d.valid_till), "dd/MM") : "--"}
              </div>
            </div>
          );
        },
      },
      {
        key: "tax",
        title: "Tax",
        width: 100,
        render: (_, r) => (r.pricing?.tax?.rate ? `${r.pricing.tax.rate}%` : "--"),
      },
      {
        key: "status",
        title: "Status",
        width: 120,
        render: (_, r) => {
          const map = {
            active: { color: "green", label: "Active" },
            inactive: { color: "red", label: "Inactive" },
            draft: { color: "gray", label: "Draft" },
            pending_verification: { color: "orange", label: "Pending" },
            rejected: { color: "volcano", label: "Rejected" },
            archived: { color: "purple", label: "Archived" },
          };
          const s = map[r.status] || { color: "gray", label: r.status };
          return <Tag color={s.color}>{s.label}</Tag>;
        },
      },
      {
        key: "verification",
        title: "Verification",
        width: 130,
        render: (_, r) => {
          const v = r.verification_status?.status;
          const map = { pending: "warning", approved: "success", rejected: "error" };
          return (
            <div>
              <Tag color={map[v] || "default"}>{(v || "pending").toUpperCase()}</Tag>
              {v === "rejected" && r.verification_status?.rejection_reason && (
                <div className="text-xs text-gray-500">
                  {r.verification_status.rejection_reason}
                </div>
              )}
            </div>
          );
        },
      },
      {
        key: "createdAt",
        title: "Created",
        width: 110,
        render: (_, r) =>
          r.createdAt ? format(new Date(r.createdAt), "dd/MM/yyyy") : "--",
      },
      {
        key: "actions",
        title: "Actions",
        fixed: "right",
        width: 180,
        render: (_, r) => (
          <Space>
            <Button type="link" icon={<FiEye />} href={`/sawtar/dashboard/${roleSlug}/products/${r._id}`} />

            {/* Approve */}
            {activeTab === "pending" && perm.canApprove && (
              <Button
                type="link"
                icon={<FiCheck />}
                className="text-green-600"
                onClick={() => handleStatusUpdate(r._id, "approved")}
              />
            )}

            {/* Reject */}
            {activeTab === "pending" && perm.canReject && (
              <Button
                type="link"
                icon={<FiX />}
                danger
                onClick={() => openRejectModal(r)}
              />
            )}

            {/* Inventory */}
            {perm.canViewInventory && (
              <Button
                type="link"
                icon={<FiShoppingBag />}
                href={`/sawtar/cms/products/inventory/${r._id}`}
                className="text-purple-600"
              />
            )}

            {/* Pricing */}
            {perm.canEditPricing && (
              <Button
                type="link"
                icon={<FiTrendingDown />}
                onClick={() => openPricingModal(r)}
                className="text-blue-600"
              />
            )}
          </Space>
        ),
      },
    ],
    [
      activeTab,
      perm.canApprove,
      perm.canReject,
      perm.canViewInventory,
      perm.canEditPricing,
      roleSlug,
    ]
  );

  /* ----------------------- EXPANDABLE ROW ----------------------- */
  const expandedRowRender = (record) => {
    const docs = Object.entries(record.documents || {})
      .filter(([k, v]) => v && k !== "__typename")
      .map(([k, v]) => ({ type: k, ...v }));

    const images = (record.color_variants || []).flatMap((v) =>
      (v.images || []).map((img) => ({ type: `Image (${v.color_name})`, ...img }))
    );

    return (
      <Collapse>
        <Panel header="Asset Details" key="1">
          {docs.map((d) => (
            <div key={d._id} className="mb-2 flex items-center">
              <FiFileText className="mr-2" />
              <span>{d.type}:</span>
              <Tag color={d.verified ? "green" : "red"} className="ml-2">
                {d.verified ? "Verified" : "Not Verified"}
              </Tag>
              {!d.verified && d.reason && (
                <div className="text-xs text-gray-500 ml-6">
                  {d.reason}
                  {d.suggestion && <div>Suggestion: {d.suggestion}</div>}
                </div>
              )}
            </div>
          ))}
          {images.map((img) => (
            <div key={img._id} className="mb-2 flex items-center">
              <FiImage className="mr-2" />
              <span>{img.type}:</span>
              <Tag color={img.verified ? "green" : "red"} className="ml-2">
                {img.verified ? "Verified" : "Not Verified"}
              </Tag>
            </div>
          ))}
        </Panel>
      </Collapse>
    );
  };

  /* -------------------------- RENDER -------------------------- */
  if (!perm.canView) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold">Access Denied</h2>
        <p>You don't have permission to view product requests.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <Card className="mb-6" bodyStyle={{ padding: "16px 24px" }}>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">B2C Product Requests</h1>
            <p className="text-gray-500">Review and manage product submissions</p>
          </div>
          <Button icon={<FiRefreshCw />} onClick={handleRefresh}>
            Refresh
          </Button>
        </div>
      </Card>

      {/* Tabs */}
      <Tabs activeKey={activeTab} onChange={handleTabChange} className="mb-6">
        {["pending", "approved", "rejected"].map((t) => (
          <TabPane
            key={t}
            tab={`${t.charAt(0).toUpperCase() + t.slice(1)} (${
              t === "pending"
                ? stats.pending
                : t === "approved"
                ? stats.approved
                : stats.rejected
            })`}
          />
        ))}
      </Tabs>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { title: "Total", value: stats.total, icon: FiPackage, color: "#3f51b5" },
          { title: "Pending", value: stats.pending, icon: FiClock, color: "#ff9800" },
          { title: "Approved", value: stats.approved, icon: FiCheck, color: "#4caf50" },
          { title: "Rejected", value: stats.rejected, icon: FiX, color: "#f44336" },
        ].map((s) => (
          <Card key={s.title} className="shadow-md">
            <Statistic
              title={s.title}
              value={s.value}
              prefix={<s.icon style={{ color: s.color }} />}
              valueStyle={{ color: s.color }}
            />
          </Card>
        ))}
      </div>

      {/* Table */}
      <Card bodyStyle={{ padding: 0, position: "relative" }}>
        <CustomTable
          columns={productColumns}
          data={dataWithSno}
          totalItems={pagination.totalResults}
          currentPage={pagination.currentPage}
          itemsPerPage={pagination.itemsPerPage}
          onPageChange={handlePageChange}
          onFilter={handleFilter}
          loading={loading}
          scroll={{ x: 1500 }}
          expandable={{
            expandedRowRender,
            rowExpandable: (r) =>
              !!r.documents || !!r.color_variants?.length || !!r.three_d_model,
          }}
          filters={[
            { key: "search", type: "text", placeholder: "Search..." },
            {
              key: "category_id",
              type: "select",
              placeholder: "Category",
              options: [
                { value: "", label: "All" },
                ...categories.map((c) => ({ value: c._id, label: c.name })),
              ],
            },
            {
              key: "date_filter",
              type: "select",
              placeholder: "Date",
              options: [
                { value: "", label: "All" },
                { value: "today", label: "Today" },
                { value: "week", label: "Last Week" },
                { value: "month", label: "Last Month" },
              ],
            },
          ]}
        />
      </Card>

      {/* Asset Errors */}
      {assetErrors.length > 0 && (
        <div className="mt-4">
          {assetErrors.map((e, i) => (
            <Alert
              key={i}
              message={`Asset ${e.assetId}`}
              description={e.message}
              type="error"
              showIcon
              className="mb-2"
            />
          ))}
        </div>
      )}

      {/* Reject Modal */}
      <Modal
        open={showRejectModal}
        onCancel={closeRejectModal}
        title="Reject Product"
        footer={null}
      >
        {selectedProduct && (
          <>
            <p>
              <strong>{selectedProduct.name}</strong>
            </p>
            <TextArea
              rows2
              placeholder="Reason (required)"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              className="mb-3"
            />
            <TextArea
              rows={3}
              placeholder="Suggestion (optional)"
              value={rejectionSuggestion}
              onChange={(e) => setRejectionSuggestion(e.target.value)}
            />
            <div className="mt-4 flex justify-end gap-2">
              <Button onClick={closeRejectModal}>Cancel</Button>
              <Button
                type="primary"
                danger
                disabled={!rejectionReason.trim()}
                onClick={() =>
                  handleStatusUpdate(
                    selectedProduct._id,
                    "rejected",
                    rejectionReason,
                    rejectionSuggestion
                  )
                }
              >
                Reject
              </Button>
            </div>
          </>
        )}
      </Modal>

      {/* Pricing Modal */}
      <Modal
        open={showPricingModal}
        onCancel={closePricingModal}
        title="Update Pricing"
        footer={null}
      >
        <Form form={form} onFinish={handlePricingUpdate} layout="vertical">
          <Form.Item label="Discount Type" name="discount_type">
            <AntdSelect>
              <Option value="percentage">Percentage</Option>
              <Option value="fixed">Fixed</Option>
            </AntdSelect>
          </Form.Item>
          <Form.Item label="Discount Value" name="discount_value">
            <Input type="number" min={0} />
          </Form.Item>
          <Form.Item label="Valid Till" name="valid_till">
            <DatePicker disabledDate={(d) => d && isBefore(d, new Date())} />
          </Form.Item>
          <Form.Item label="Sale Price" name="sale_price">
            <Input
              type="number"
              min={0}
              addonBefore={selectedProduct?.pricing?.currency?.symbol}
            />
          </Form.Item>
          <Form.Item label="Tax" name="tax_id">
            <AntdSelect allowClear onChange={handleTaxChange}>
              {taxes.map((t) => (
                <Option key={t._id} value={t._id}>
                  {t.taxName} ({t.rate}%)
                </Option>
              ))}
            </AntdSelect>
          </Form.Item>
          <Form.Item label="Tax Rate (%)" name="rate">
            <Input type="number" min={0} max={100} step="0.01" />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button onClick={closePricingModal}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProductRequestB2C;