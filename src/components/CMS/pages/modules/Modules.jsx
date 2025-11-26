// src/components/CMS/pages/modules/Modules.jsx
import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Typography,
  Tooltip,
} from '@mui/material';
import { GridView, ViewList, Add } from '@mui/icons-material';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { moduleService } from './module.service';
import { showToast } from '../../../../manageApi/utils/toast';
import { ModuleCard } from './ModuleCard';
import { ModuleListItem } from './ModuleListItem';
import { AddModuleDialog } from './AddModuleDialog';
import { AddSubModuleDialog } from './AddSubModuleDialog';

/* -------------------------------------------------------------
   Helper – get permission for “Module→All Modules”
   ------------------------------------------------------------- */
const useModulePermission = () => {
  const { permissions } = useSelector(s => s.auth);
  const perm = permissions?.['Module→All Modules'] ?? {};

  return {
    canView: !!perm.canView,
    canAdd: !!perm.canAdd,
    canEdit: !!perm.canEdit,
    canDelete: !!perm.canDelete,
    canViewAll: !!perm.canViewAll,
    raw: perm,
  };
};

/* -------------------------------------------------------------
   Main component
   ------------------------------------------------------------- */
const Modules = () => {
  const { token } = useSelector(s => s.auth);
  const perm = useModulePermission();

  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('list'); // 'list' | 'grid'
  const [addOpen, setAddOpen] = useState(false);
  const [subOpen, setSubOpen] = useState(false);
  const [selectedModuleId, setSelectedModuleId] = useState(null);

  const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor));

  /* ---------------------------------------------------------- FETCH */
  const fetch = useCallback(async () => {
    if (!perm.canView) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const { data } = await moduleService.getAll();
      setModules(data.sort((a, b) => a.position - b.position));
    } catch (e) {
      moduleService.handleError(e, 'Load failed');
    } finally {
      setLoading(false);
    }
  }, [perm.canView]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      fetch();
    }
  }, [token, fetch]);

  /* ---------------------------------------------------------- CREATE */
  const handleCreate = async (payload) => {  // ← Removed : any
    const clean = {
      ...payload,
      icon: payload.icon || 'fas fa-folder',
      subModules: (payload.subModules || []).map(s => ({
        ...s,
        icon: s.icon || 'fas fa-circle',
        isActive: true,
        dashboardView: s.dashboardView ?? false,
      })),
    };
    await moduleService.create(clean);
    showToast('Module created', 'success');
    setAddOpen(false);
    fetch();
  };

  /* ---------------------------------------------------------- UPDATE / DELETE / RESTORE */
  const updateModule = async (id, data) => {
    await moduleService.update(id, data);
    fetch();
  };
  const deleteModule = async (id) => {
    if (window.confirm('Delete this module?')) {
      await moduleService.delete(id);
      fetch();
    }
  };
  const restoreModule = async (id) => {
    await moduleService.restore(id);
    fetch();
  };

  /* ---------------------------------------------------------- SUB-MODULES */
  const addSub = async (data) => {
    await moduleService.createSub(selectedModuleId, [data]);
    showToast('Sub-module added', 'success');
    setSubOpen(false);
    fetch();
  };
  const updateSub = async (modId, subId, data) => {
    await moduleService.updateSub(modId, subId, data);
    fetch();
  };
  const deleteSub = async (modId, subId) => {
    if (window.confirm('Delete sub-module?')) {
      await moduleService.deleteSub(modId, subId);
      fetch();
    }
  };
  const restoreSub = async (modId, subId) => {
    await moduleService.restoreSub(modId, subId);
    fetch();
  };

  /* ---------------------------------------------------------- REORDER */
  const reorderModules = async (activeId, overId) => {
    const oldIdx = modules.findIndex(m => m._id === activeId);
    const newIdx = modules.findIndex(m => m._id === overId);
    if (oldIdx === newIdx) return;

    const moved = arrayMove(modules, oldIdx, newIdx).map((m, i) => ({
      ...m,
      position: i,
    }));
    setModules(moved);
    try {
      await moduleService.reorder(
        moved.map(m => ({ _id: m._id, position: m.position }))
      );
    } catch {
      fetch();
    }
  };

  const reorderSubs = async (modId, activeId, overId) => {
    const mod = modules.find(m => m._id === modId);
    if (!mod) return;
    const subs = mod.subModules.filter(s => !s.isDeleted);
    const oldIdx = subs.findIndex(s => s._id === activeId);
    const newIdx = subs.findIndex(s => s._id === overId);
    if (oldIdx === newIdx) return;

    const moved = arrayMove(subs, oldIdx, newIdx).map((s, i) => ({
      ...s,
      position: i,
    }));
    const updated = modules.map(m =>
      m._id === modId ? { ...m, subModules: moved } : m
    );
    setModules(updated);
    try {
      await moduleService.reorderSub(
        modId,
        moved.map(s => ({ _id: s._id, position: s.position }))
      );
    } catch {
      fetch();
    }
  };

  /* ---------------------------------------------------------- RENDER */
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!perm.canView) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          You do not have permission to view Modules.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* ---------- HEADER ---------- */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Modules Management
        </Typography>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton onClick={() => setView(v => (v === 'list' ? 'grid' : 'list'))}>
            {view === 'list' ? <GridView /> : <ViewList />}
          </IconButton>

          {perm.canAdd && (
            <Tooltip title="Add new module">
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => setAddOpen(true)}
              >
                Add Module
              </Button>
            </Tooltip>
          )}
        </Box>
      </Box>

      {/* ---------- GRID VIEW ---------- */}
      {view === 'grid' && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={e => reorderModules(e.active.id, e.over?.id)}
        >
          <SortableContext
            items={modules.map(m => m._id)}
            strategy={verticalListSortingStrategy}
          >
            <Box
              sx={{
                display: 'grid',
                gap: 3,
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              }}
            >
              {modules.map(m => (
                <ModuleCard
                  key={m._id}
                  module={m}
                  onEdit={updateModule}
                  onDelete={perm.canDelete ? deleteModule : undefined}
                  onRestore={perm.canDelete ? restoreModule : undefined}
                  onAddSub={id => {
                    setSelectedModuleId(id);
                    setSubOpen(true);
                  }}
                />
              ))}
            </Box>
          </SortableContext>
        </DndContext>
      )}

      {/* ---------- LIST VIEW ---------- */}
      {view === 'list' && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={e => reorderModules(e.active.id, e.over?.id)}
        >
          <SortableContext
            items={modules.map(m => m._id)}
            strategy={verticalListSortingStrategy}
          >
            {modules.map(mod => (
              <ModuleListItem
                key={mod._id}
                module={mod}
                onModuleEdit={perm.canEdit ? fetch : undefined}
                onModuleDelete={perm.canDelete ? deleteModule : undefined}
                onModuleRestore={perm.canDelete ? restoreModule : undefined}
                onSubAdd={id => {
                  setSelectedModuleId(id);
                  setSubOpen(true);
                }}
                onSubEdit={perm.canEdit ? fetch : undefined}
                onSubDelete={perm.canDelete ? deleteSub : undefined}
                onSubRestore={perm.canDelete ? restoreSub : undefined}
                onSubReorder={(a, o) => reorderSubs(mod._id, a, o)}
              />
            ))}
          </SortableContext>
        </DndContext>
      )}

      {/* ---------- DIALOGS ---------- */}
      {perm.canAdd && (
        <AddModuleDialog
          open={addOpen}
          onCancel={() => setAddOpen(false)}
          onSubmit={handleCreate}
        />
      )}
      <AddSubModuleDialog
        open={subOpen}
        onCancel={() => setSubOpen(false)}
        onSubmit={addSub}
      />
    </Box>
  );
};

export default Modules;