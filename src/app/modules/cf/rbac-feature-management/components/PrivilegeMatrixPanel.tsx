import { FC, useMemo, type ChangeEvent } from 'react'
import type { RbacFeatureRow, RbacPrivilegeRow, RoleRow } from '../core/_models'
import { PRIVILEGE_COLUMN_ORDER } from '../featureTreeUtils'

export type BulkMatrixAction =
  | 'grant_all_read'
  | 'grant_full_standard'
  | 'clear_all'
  | 'grant_all_all_roles'

type Props = {
  selectedFeature: RbacFeatureRow | null
  breadcrumbSegments: string[]
  privileges: RbacPrivilegeRow[]
  roles: RoleRow[]
  matrix: Record<number, Set<number>>
  canUpdate: boolean
  onToggleCell: (roleId: number, privilegeId: number) => void
  onBulkAction: (action: BulkMatrixAction) => void
}

const MatrixToggle: FC<{
  checked: boolean
  disabled: boolean
  onChange: () => void
  label: string
}> = ({ checked, disabled, onChange, label }) => (
  <div className="rbac-cell-toggle">
    <button
      type="button"
      className={`rbac-switch ${checked ? 'rbac-switch--on' : ''}`}
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={onChange}
      aria-label={label}
    >
      <span className="rbac-switch__knob" />
    </button>
  </div>
)

export const PrivilegeMatrixPanel: FC<Props> = ({
  selectedFeature,
  breadcrumbSegments,
  privileges,
  roles,
  matrix,
  canUpdate,
  onToggleCell,
  onBulkAction,
}) => {
  const orderedPrivileges = useMemo(() => {
    const byCode = new Map(privileges.map((p) => [p.privilege_r, p]))
    const ordered: RbacPrivilegeRow[] = []
    for (const code of PRIVILEGE_COLUMN_ORDER) {
      const p = byCode.get(code)
      if (p) ordered.push(p)
    }
    for (const p of privileges) {
      if (!PRIVILEGE_COLUMN_ORDER.includes(p.privilege_r as (typeof PRIVILEGE_COLUMN_ORDER)[number])) {
        ordered.push(p)
      }
    }
    return ordered
  }, [privileges])

  const onBulkSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const v = e.target.value as BulkMatrixAction | ''
    if (!v) return
    onBulkAction(v)
    e.target.value = ''
  }

  return (
    <section className="rbac-mgmt-main">
      <div className="p-4 border-bottom border-gray-300">
        <div className="rbac-mgmt-breadcrumb mb-2">
          {breadcrumbSegments.map((seg, i) => (
            <span key={`${seg}-${i}`}>
              {i > 0 && <span className="text-gray-400 mx-1">/</span>}
              {i === breadcrumbSegments.length - 1 ? <strong>{seg}</strong> : <span>{seg}</span>}
            </span>
          ))}
        </div>
        {selectedFeature && (
          <div className="fs-8 text-muted font-monospace text-break">
            {selectedFeature.route_path || '—'}
          </div>
        )}
      </div>

      <div className="p-4 flex-grow-1 d-flex flex-column min-h-0">
        {!selectedFeature ? (
          <div className="text-muted">Select a feature from the tree.</div>
        ) : (
          <>
            <div className="d-flex flex-wrap align-items-center gap-3 mb-3">
              <label className="form-label mb-0 fw-semibold fs-7 text-nowrap">Bulk selection</label>
              <select
                className="form-select form-select-sm w-auto"
                defaultValue=""
                disabled={!canUpdate}
                onChange={onBulkSelect}
                aria-label="Bulk permission actions"
              >
                <option value="">Choose action…</option>
                <option value="grant_all_read">Grant Read — all roles</option>
                <option value="grant_full_standard">Grant Create, Read, Update, Delete, UpdateA — all roles</option>
                <option value="grant_all_all_roles">Grant all privileges — all roles</option>
                <option value="clear_all">Clear all — all roles</option>
              </select>
              <span className="text-muted fs-8">Applies to the matrix below; use the bar below to save.</span>
            </div>

            <div className="rbac-matrix-wrap flex-grow-1">
              <table className="rbac-matrix-table">
                <thead>
                  <tr>
                    <th scope="col">Role</th>
                    {orderedPrivileges.map((p) => (
                      <th key={p.id} scope="col" title={p.description}>
                        {p.privilege_r}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {roles.map((r) => (
                    <tr key={r.id}>
                      <th scope="row">
                        <span className="rbac-role-hint" title={r.description}>
                          {r.role_name}
                        </span>
                      </th>
                      {orderedPrivileges.map((p) => {
                        const on = (matrix[r.id] || new Set()).has(p.id)
                        return (
                          <td key={p.id}>
                            <MatrixToggle
                              checked={on}
                              disabled={!canUpdate}
                              onChange={() => onToggleCell(r.id, p.id)}
                              label={`${r.role_name} — ${p.privilege_r}`}
                            />
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
