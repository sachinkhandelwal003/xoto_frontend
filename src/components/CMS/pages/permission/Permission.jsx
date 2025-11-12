import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import {
  Button,
  Drawer,
  Switch,
  Card,
  Space,
  Tag,
  Tooltip,
  Spin,
  Typography,
  Divider,
} from 'antd';
import { Form } from 'antd';
import { EyeOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';
import CustomTable from '../../pages/custom/CustomTable';
import { apiService } from '../../../../manageApi/utils/custom.apiservice';
import { showToast } from '../../../../manageApi/utils/toast';
import { showSuccessAlert, showErrorAlert } from '../../../../manageApi/utils/sweetAlert';
import { moduleService } from '../modules/module.service';

// Helper: Deep clone to avoid mutation
const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

const useModulePermission = () => {
  const { permissions } = useSelector(s => s.auth);
  const p = permissions?.['Module→All Modules'] ?? {};
  return {
    canView: !!p.canView,
    canAdd: !!p.canAdd,
    canEdit: !!p.canEdit,
    canDelete: !!p.canDelete,
    canViewAll: !!p.canViewAll,
  };
};

const Permission = () => {
  const { token } = useSelector(s => s.auth);
  const perm = useModulePermission();

  const [roles, setRoles] = useState([]);
  const [modules, setModules] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [rolePermMap, setRolePermMap] = useState({});
  const [saving, setSaving] = useState(false);
  const [filters, setFilters] = useState({});
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalResults: 0,
    itemsPerPage: 10,
  });

  const getPermValue = (value) => value === 1 || value === true;

  /* -------------------------- FETCH DATA -------------------------- */
  const fetchData = useCallback(async (page = 1, itemsPerPage = 10, filters = {}) => {
    if (!perm.canView) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const [rolesRes, modulesRes, permissionsRes] = await Promise.all([
        apiService.get('/roles', { page, limit: itemsPerPage, ...filters }),
        moduleService.getAll(),
        apiService.get('/permission', { limit: 1000 })
      ]);

      const sortedModules = (modulesRes.data || []).sort((a, b) => a.position - b.position);
      setModules(sortedModules);
      setRoles(rolesRes.roles || []);
      setPermissions(permissionsRes.permissions || []);

      setPagination({
        currentPage: rolesRes.pagination?.currentPage || 1,
        totalPages: rolesRes.pagination?.totalPages || 1,
        totalResults: rolesRes.pagination?.totalRecords || 0,
        itemsPerPage: rolesRes.pagination?.perPage || 10,
      });

      // Build immutable permission map
      const map = {};
      permissionsRes.permissions.forEach(p => {
        const roleId = p.role._id;
        const modId = p.module._id;
        const subId = p.subModule?._id || null;

        if (!map[roleId]) map[roleId] = {};
        if (!map[roleId][modId]) map[roleId][modId] = {};

        const key = subId || '__module__';
        map[roleId][modId][key] = {
          id: p._id,
          canAdd: getPermValue(p.permissions.canAdd),
          canEdit: getPermValue(p.permissions.canEdit),
          canView: getPermValue(p.permissions.canView),
          canDelete: getPermValue(p.permissions.canDelete),
          canViewAll: getPermValue(p.permissions.canViewAll),
        };
      });
      setRolePermMap(map);
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to load data', 'error');
    } finally {
      setLoading(false);
    }
  }, [perm.canView]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      fetchData(pagination.currentPage, pagination.itemsPerPage, filters);
    }
  }, [token, fetchData]);

  const handlePageChange = (page, itemsPerPage) => fetchData(page, itemsPerPage, filters);
  const handleFilter = (newFilters) => {
    setFilters(newFilters);
    fetchData(1, pagination.itemsPerPage, newFilters);
  };

  const openDrawer = (role) => {
    setSelectedRole(role);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setSelectedRole(null);
  };

  /* --------------------- IMMUTABLE UPDATE --------------------- */
  const updatePerm = useCallback((moduleId, subId, type, value) => {
    setRolePermMap(prev => {
      const copy = deepClone(prev);
      const roleId = selectedRole._id;

      if (!copy[roleId]) copy[roleId] = {};
      if (!copy[roleId][moduleId]) copy[roleId][moduleId] = {};

      const key = subId || '__module__';
      if (!copy[roleId][moduleId][key]) {
        copy[roleId][moduleId][key] = {
          canAdd: false,
          canEdit: false,
          canView: false,
          canDelete: false,
          canViewAll: false,
        };
      }

      copy[roleId][moduleId][key][type] = value;
      return copy;
    });
  }, [selectedRole]);

  /* -------------------------- SAVE -------------------------- */
  const savePermissions = async () => {
    if (!perm.canEdit) {
      showToast('You do not have permission to edit', 'warning');
      return;
    }

    setSaving(true);
    const roleId = selectedRole._id;
    const rolePerms = rolePermMap[roleId] || {};
    const toCreate = [];
    const toUpdate = [];
    const toDelete = [];

    Object.entries(rolePerms).forEach(([modId, modPerms]) => {
      Object.entries(modPerms).forEach(([key, p]) => {
        const subId = key === '__module__' ? null : key;
        const hasAny = p.canAdd || p.canEdit || p.canView || p.canDelete || p.canViewAll;

        const payload = {
          canAdd: p.canAdd ? 1 : 0,
          canEdit: p.canEdit ? 1 : 0,
          canView: p.canView ? 1 : 0,
          canDelete: p.canDelete ? 1 : 0,
          canViewAll: p.canViewAll ? 1 : 0,
        };

        if (hasAny && p.id) {
          toUpdate.push({ id: p.id, data: payload });
        } else if (hasAny && !p.id) {
          toCreate.push({ roleId, moduleId: modId, subModuleId: subId, ...payload });
        } else if (!hasAny && p.id) {
          toDelete.push(p.id);
        }
      });
    });

    try {
      // Delete first
      if (toDelete.length) {
        await Promise.all(toDelete.map(id => apiService.delete(`/permission/${id}`)));
      }

      // Update
      if (toUpdate.length) {
        await Promise.all(toUpdate.map(({ id, data }) => apiService.put(`/permission/${id}`, data)));
      }

      // Create
      if (toCreate.length) {
        await apiService.post('/permission', toCreate);
      }

      showSuccessAlert('Success', `${toCreate.length} created, ${toUpdate.length} updated, ${toDelete.length} removed`);
      closeDrawer();
      fetchData(pagination.currentPage, pagination.itemsPerPage, filters);
    } catch (err) {
      const msg = err.response?.data?.message || 'Save failed';
      showErrorAlert('Error', msg);
      console.error('Save error:', err.response?.data);
    } finally {
      setSaving(false);
    }
  };

  /* -------------------------- COLUMNS -------------------------- */
  const columns = useMemo(() => [
    {
      key: 'name',
      title: 'Role Name',
      sortable: true,
      render: v => <span className="font-medium text-gray-900">{v}</span>,
    },
    {
      key: 'code',
      title: 'Role Code',
      sortable: true,
      render: v => <Tag color="blue">{v}</Tag>,
    },
    {
      key: 'description',
      title: 'Description',
      render: v => <span className="text-gray-900">{v || '—'}</span>,
    },
    {
      key: 'permissions',
      title: 'Permissions Summary',
      render: (_, r) => {
        const totalItems = modules.reduce((c, m) => c + 1 + m.subModules.length, 0);
        const granted = Object.values(rolePermMap[r._id] || {}).reduce(
          (c, mod) => c + Object.keys(mod).length,
          0
        );
        return (
          <div>
            <span className="font-medium">{granted}</span> / {totalItems}
            <br />
            <span className="text-xs text-gray-500">
              {granted === 0 ? 'None' : granted === totalItems ? 'All' : 'Partial'}
            </span>
          </div>
        );
      },
    },
    {
      key: 'isActive',
      title: 'Status',
      sortable: true,
      filterable: true,
      filterKey: 'isActive',
      filterOptions: [
        { value: true, label: 'Active' },
        { value: false, label: 'Inactive' },
      ],
      render: v => <Tag color={v ? 'green' : 'red'}>{v ? 'Active' : 'Inactive'}</Tag>,
    },
    {
      key: 'actions',
      title: 'Actions',
      render: (_, r) => (
        <Space>
          <Tooltip title="Manage Permissions">
            <Button
              type="link"
              icon={<EyeOutlined />}
              onClick={() => openDrawer(r)}
              disabled={!perm.canView}
            />
          </Tooltip>
        </Space>
      ),
    },
  ], [modules, rolePermMap, perm.canView]);

  /* -------------------------- RENDER -------------------------- */
  if (loading) {
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
          You do not have permission to view Role Permissions.
        </Typography.Title>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <Typography.Title level={3} style={{ margin: 0, color: '#1f2937' }}>
          Role Permissions Management
        </Typography.Title>
      </div>

      <CustomTable
        columns={columns}
        data={roles}
        totalItems={pagination.totalResults}
        currentPage={pagination.currentPage}
        itemsPerPage={pagination.itemsPerPage}
        onPageChange={handlePageChange}
        onFilter={handleFilter}
        loading={loading}
      />

      <Drawer
        title={
          <div>
            <Typography.Title level={4} style={{ margin: 0 }}>
              Permissions for {selectedRole?.name}
            </Typography.Title>
            <Typography.Text type="secondary">{selectedRole?.code}</Typography.Text>
          </div>
        }
        placement="right"
        onClose={closeDrawer}
        open={drawerOpen}
        closeIcon={<CloseOutlined />}
        width={960}
        destroyOnClose
        maskClosable={false}
      >
        {selectedRole && (
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            {modules.map(mod => {
              const modPerms = rolePermMap[selectedRole._id]?.[mod._id] || {};
              const permTypes = ['canView', 'canAdd', 'canEdit', 'canDelete', 'canViewAll'];

              return (
                <Card
                  key={mod._id}
                  title={
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{mod.name}</span>
                      {mod.description && (
                        <Typography.Text type="secondary" className="text-sm">
                          – {mod.description}
                        </Typography.Text>
                      )}
                    </div>
                  }
                  style={{ borderRadius: 12 }}
                  bodyStyle={{ padding: mod.subModules.length ? '16px' : '24px' }}
                >
                  {mod.subModules.length === 0 ? (
                    <div className="grid grid-cols-3 gap-6">
                      {permTypes.map(type => {
                        const p = modPerms['__module__'] || {};
                        const checked = !!p[type];
                        const label = type.replace('can', 'Can ').replace('All', ' All');

                        return (
                          <Form.Item key={type} label={label} className="mb-0">
                            <Switch
                              checked={checked}
                              onChange={c => updatePerm(mod._id, null, type, c)}
                              disabled={!perm.canEdit}
                            />
                          </Form.Item>
                        );
                      })}
                    </div>
                  ) : (
                    mod.subModules.map(sub => {
                      const p = modPerms[sub._id] || {};
                      return (
                        <div key={sub._id} className="mb-8 last:mb-0">
                          <Divider orientation="left" className="mb-4">
                            <span className="text-sm font-semibold text-gray-700">{sub.name}</span>
                          </Divider>
                          <div className="grid grid-cols-3 gap-6">
                            {permTypes.map(type => {
                              const checked = !!p[type];
                              const label = type.replace('can', 'Can ').replace('All', ' All');

                              return (
                                <Form.Item key={type} label={label} className="mb-0">
                                  <Switch
                                    checked={checked}
                                    onChange={c => updatePerm(mod._id, sub._id, type, c)}
                                    disabled={!perm.canEdit}
                                  />
                                </Form.Item>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })
                  )}
                </Card>
              );
            })}
          </Space>
        )}

        <div className="mt-8 flex justify-end gap-3 sticky bottom-0 bg-white p-4 border-t">
          <Button onClick={closeDrawer} size="large">
            Cancel
          </Button>
          <Button
            type="primary"
            icon={<SaveOutlined />}
            onClick={savePermissions}
            loading={saving}
            disabled={!perm.canEdit}
            size="large"
          >
            Save Permissions
          </Button>
        </div>
      </Drawer>
    </div>
  );
};

export default Permission;