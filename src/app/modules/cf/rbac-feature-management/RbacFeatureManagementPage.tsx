import { FC, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { KTCard, KTCardBody } from '../../../../_metronic'
import { AlertMessengerContext } from '../../../components'
import { useCanAccessRoute, usePermission } from '../../../custom-hooks'
import type { RbacFeatureRow, RoleRow, RbacPrivilegeRow } from './core/_models'
import {
  getRbacAdminFeatures,
  getRbacAdminFeatureRolePrivileges,
  getRbacAdminPrivileges,
  getRolesV1,
  postRbacAdminFeature,
  putRbacAdminFeature,
  putRbacAdminFeatureRolePrivileges,
  RBAC_MANAGEMENT_ROUTE_PATH,
} from './core/_requests'
import { getAPIError } from '../../../types'
import { FeatureTreeSidebar } from './components/FeatureTreeSidebar'
import { BulkMatrixAction, PrivilegeMatrixPanel } from './components/PrivilegeMatrixPanel'
import {
  breadcrumbForFeature,
  buildFeatureTree,
  collectParentFeatureIds,
  computeExpandedForSearch,
  PRIVILEGE_COLUMN_ORDER,
} from './featureTreeUtils'
import './rbac-management.css'

const emptyForm: Partial<RbacFeatureRow> = {
  feature_name: '',
  code: '',
  route_path: '',
  description: '',
  display_order: 100,
  is_active: true,
  parent_feature_id: null,
}

function normalizeMatrixSnapshot(
  roles: RoleRow[],
  m: Record<number, Set<number>>
): Record<number, number[]> {
  const o: Record<number, number[]> = {}
  for (const r of roles) {
    o[r.id] = [...(m[r.id] || [])].sort((a, b) => a - b)
  }
  return o
}

function snapshotToSets(snap: Record<number, number[]>): Record<number, Set<number>> {
  const o: Record<number, Set<number>> = {}
  for (const [k, v] of Object.entries(snap)) {
    o[Number(k)] = new Set(v)
  }
  return o
}

export const RbacFeatureManagementPage: FC = () => {
  const canView = useCanAccessRoute(RBAC_MANAGEMENT_ROUTE_PATH)
  const canCreate = usePermission(RBAC_MANAGEMENT_ROUTE_PATH, 'Create')
  const canUpdate = usePermission(RBAC_MANAGEMENT_ROUTE_PATH, 'Update')

  const { addSuccessMessage, addErrorMessage } = useContext(AlertMessengerContext)

  const [features, setFeatures] = useState<RbacFeatureRow[]>([])
  const [roles, setRoles] = useState<RoleRow[]>([])
  const [privileges, setPrivileges] = useState<RbacPrivilegeRow[]>([])
  const [loading, setLoading] = useState(true)
  const [savingMatrix, setSavingMatrix] = useState(false)
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const [searchQuery, setSearchQuery] = useState('')
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set())

  const [matrix, setMatrix] = useState<Record<number, Set<number>>>({})
  const [baselineSnapshot, setBaselineSnapshot] = useState<Record<number, number[]>>({})
  const [matrixBaselineReady, setMatrixBaselineReady] = useState(false)

  const [showAddModal, setShowAddModal] = useState(false)
  const [form, setForm] = useState<Partial<RbacFeatureRow>>(emptyForm)
  const [editingId, setEditingId] = useState<number | null>(null)

  const toastOk = (msg: string) =>
    addSuccessMessage({
      title: 'Success',
      message: `${msg} — users may need to log in again to see permission changes.`,
    })
  const toastErr = (msg: string) => addErrorMessage({ title: 'Error', message: msg })

  const tree = useMemo(() => buildFeatureTree(features), [features])
  const allParentIds = useMemo(() => collectParentFeatureIds(tree), [tree])
  const featureById = useMemo(() => new Map(features.map((f) => [f.id, f])), [features])

  useEffect(() => {
    if (searchQuery.trim()) {
      setExpandedIds(computeExpandedForSearch(tree, features, searchQuery, allParentIds))
    } else {
      setExpandedIds(new Set(allParentIds))
    }
  }, [searchQuery, tree, features, allParentIds])

  const loadCatalog = useCallback(async () => {
    setLoading(true)
    try {
      const [f, r, p] = await Promise.all([
        getRbacAdminFeatures(true),
        getRolesV1(),
        getRbacAdminPrivileges(),
      ])
      setFeatures(f)
      setRoles(r)
      setPrivileges(p.sort((a, b) => String(a.privilege_r).localeCompare(String(b.privilege_r))))
      setSelectedId((prev) => {
        if (prev != null && f.some((x) => x.id === prev)) return prev
        return f.length > 0 ? f[0].id : null
      })
    } catch (e) {
      toastErr((e as getAPIError)?.response?.data?.message || 'Failed to load RBAC data')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!canView) return
    void loadCatalog()
  }, [canView, loadCatalog])

  const loadMatrix = useCallback(
    async (featureId: number) => {
      setMatrixBaselineReady(false)
      try {
        const rows = await getRbacAdminFeatureRolePrivileges(featureId)
        const next: Record<number, Set<number>> = {}
        for (const role of roles) {
          next[role.id] = new Set()
        }
        for (const row of rows) {
          if (!row.isActive) continue
          if (!next[row.roleId]) next[row.roleId] = new Set()
          next[row.roleId].add(row.privilegeId)
        }
        setMatrix(next)
        setBaselineSnapshot(normalizeMatrixSnapshot(roles, next))
        setMatrixBaselineReady(true)
      } catch (e) {
        toastErr((e as getAPIError)?.response?.data?.message || 'Failed to load role privileges')
        setBaselineSnapshot({})
        setMatrixBaselineReady(false)
      }
    },
    [roles]
  )

  useEffect(() => {
    if (!canView || !selectedId || roles.length === 0) return
    void loadMatrix(selectedId)
  }, [canView, selectedId, roles, loadMatrix])

  const matrixDirty = useMemo(() => {
    if (!selectedId || roles.length === 0 || !matrixBaselineReady) return false
    const cur = normalizeMatrixSnapshot(roles, matrix)
    return JSON.stringify(cur) !== JSON.stringify(baselineSnapshot)
  }, [baselineSnapshot, matrix, matrixBaselineReady, roles, selectedId])

  const toggleCell = (roleId: number, privilegeId: number) => {
    if (!canUpdate) return
    setMatrix((prev) => {
      const copy: Record<number, Set<number>> = { ...prev }
      const set = new Set(copy[roleId] || [])
      if (set.has(privilegeId)) set.delete(privilegeId)
      else set.add(privilegeId)
      copy[roleId] = set
      return copy
    })
  }

  const applyBulkAction = (action: BulkMatrixAction) => {
    if (!canUpdate) return
    const byCode = new Map(privileges.map((p) => [p.privilege_r, p.id]))
    const readId = byCode.get('Read')
    const standardIds = PRIVILEGE_COLUMN_ORDER.map((c) => byCode.get(c)).filter(
      (id): id is number => id != null
    )
    const allIds = privileges.map((p) => p.id)

    setMatrix((prev) => {
      const copy: Record<number, Set<number>> = { ...prev }
      for (const r of roles) {
        let set = new Set(copy[r.id] || [])
        switch (action) {
          case 'grant_all_read':
            if (readId != null) set.add(readId)
            break
          case 'grant_full_standard':
            standardIds.forEach((id) => set.add(id))
            break
          case 'grant_all_all_roles':
            allIds.forEach((id) => set.add(id))
            break
          case 'clear_all':
            set = new Set()
            break
          default:
            break
        }
        copy[r.id] = set
      }
      return copy
    })
  }

  const cancelMatrixChanges = () => {
    setMatrix(snapshotToSets(baselineSnapshot))
  }

  const confirmSaveMatrix = async () => {
    if (!selectedId || !canUpdate) return
    setSavingMatrix(true)
    try {
      const payload = roles.map((r) => ({
        roleId: r.id,
        privilegeIds: Array.from(matrix[r.id] || []),
      }))
      await putRbacAdminFeatureRolePrivileges(selectedId, payload)
      toastOk('Role permissions saved')
      await loadMatrix(selectedId)
    } catch (e) {
      toastErr((e as getAPIError)?.response?.data?.message || 'Save failed')
    } finally {
      setSavingMatrix(false)
    }
  }

  const openAdd = () => {
    setForm(emptyForm)
    setEditingId(null)
    setShowAddModal(true)
  }

  const openEdit = (f: RbacFeatureRow) => {
    setEditingId(f.id)
    setForm({
      feature_name: f.feature_name,
      code: f.code,
      route_path: f.route_path || '',
      description: f.description || '',
      display_order: f.display_order ?? 0,
      is_active: f.is_active !== false,
      parent_feature_id: f.parent_feature_id ?? null,
    })
    setShowAddModal(true)
  }

  const saveFeature = async () => {
    if (!form.feature_name?.trim() || !form.code?.trim()) {
      toastErr('Feature name and code are required')
      return
    }
    try {
      if (editingId) {
        if (!canUpdate) return
        await putRbacAdminFeature(editingId, form)
        toastOk('Feature updated')
      } else {
        if (!canCreate) return
        const created = await postRbacAdminFeature(form)
        toastOk('Feature created')
        setSelectedId(created.id)
      }
      setShowAddModal(false)
      await loadCatalog()
    } catch (e) {
      toastErr((e as getAPIError)?.response?.data?.message || 'Save feature failed')
    }
  }

  const selectedFeature = useMemo(
    () => features.find((f) => f.id === selectedId) || null,
    [features, selectedId]
  )

  const breadcrumbSegments = useMemo(
    () => breadcrumbForFeature(selectedFeature, featureById),
    [selectedFeature, featureById]
  )

  if (!canView) {
    return (
      <KTCard>
        <KTCardBody>
          <div className="text-gray-700">You do not have access to RBAC feature management.</div>
        </KTCardBody>
      </KTCard>
    )
  }

  return (
    <>
      <div className="d-flex flex-wrap gap-3 justify-content-between align-items-center mb-4">
        <h1 className="fs-3 fw-bold mb-0">RBAC feature management</h1>
        <div className="d-flex gap-2">
          <button type="button" className="btn btn-light-primary btn-sm" onClick={() => void loadCatalog()} disabled={loading}>
            Refresh
          </button>
          {canCreate && (
            <button type="button" className="btn btn-primary btn-sm" onClick={openAdd}>
              Add feature
            </button>
          )}
        </div>
      </div>

      <p className="text-muted fs-7 mb-4">
        Route path for this screen must stay <code>{RBAC_MANAGEMENT_ROUTE_PATH}</code> in sync with the database. After
        changing permissions, users typically need to log in again.
      </p>

      <div className="rbac-mgmt-layout">
        <FeatureTreeSidebar
          features={features}
          selectedId={selectedId}
          onSelect={setSelectedId}
          loading={loading}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          expandedIds={expandedIds}
          onExpandedChange={setExpandedIds}
          allParentIds={allParentIds}
          canUpdate={canUpdate}
          onEdit={openEdit}
        />

        <PrivilegeMatrixPanel
          selectedFeature={selectedFeature}
          breadcrumbSegments={breadcrumbSegments}
          privileges={privileges}
          roles={roles}
          matrix={matrix}
          canUpdate={canUpdate}
          onToggleCell={toggleCell}
          onBulkAction={applyBulkAction}
        />
      </div>

      {matrixDirty && canUpdate && selectedId && (
        <div className="rbac-dirty-bar" role="status">
          <span className="fs-7 fw-semibold">Unsaved permission changes</span>
          <div className="d-flex gap-2 ms-auto">
            <button type="button" className="btn btn-sm btn-light" onClick={cancelMatrixChanges} disabled={savingMatrix}>
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-sm btn-success"
              onClick={() => void confirmSaveMatrix()}
              disabled={savingMatrix}
            >
              {savingMatrix ? 'Saving…' : 'Confirm'}
            </button>
          </div>
        </div>
      )}

      {showAddModal && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          role="dialog"
          style={{ background: 'rgba(0,0,0,0.35)' }}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editingId ? 'Edit feature' : 'Add feature'}</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowAddModal(false)} />
              </div>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label required">Feature name</label>
                    <input
                      className="form-control"
                      value={form.feature_name || ''}
                      onChange={(e) => setForm((f) => ({ ...f, feature_name: e.target.value }))}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label required">Code</label>
                    <input
                      className="form-control"
                      value={form.code || ''}
                      onChange={(e) => setForm((f) => ({ ...f, code: e.target.value }))}
                      disabled={Boolean(editingId)}
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Parent feature (optional)</label>
                    <select
                      className="form-select"
                      value={form.parent_feature_id ?? ''}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          parent_feature_id: e.target.value === '' ? null : Number(e.target.value),
                        }))
                      }
                    >
                      <option value="">— None (root) —</option>
                      {features
                        .filter((feat) => feat.id !== editingId)
                        .map((feat) => (
                          <option key={feat.id} value={feat.id}>
                            {feat.feature_name} ({feat.code})
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label">Route path</label>
                    <input
                      className="form-control"
                      placeholder="/home/overview"
                      value={form.route_path || ''}
                      onChange={(e) => setForm((f) => ({ ...f, route_path: e.target.value }))}
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Description</label>
                    <input
                      className="form-control"
                      value={form.description || ''}
                      onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Display order</label>
                    <input
                      type="number"
                      className="form-control"
                      value={form.display_order ?? 0}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, display_order: Number(e.target.value) || 0 }))
                      }
                    />
                  </div>
                  <div className="col-md-6 d-flex align-items-end">
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={Boolean(form.is_active)}
                        onChange={(e) => setForm((f) => ({ ...f, is_active: e.target.checked }))}
                        id={`rbac-feat-active-${editingId ?? 'new'}`}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`rbac-feat-active-${editingId ?? 'new'}`}
                      >
                        Active
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-light" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="button" className="btn btn-primary" onClick={() => void saveFeature()}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
