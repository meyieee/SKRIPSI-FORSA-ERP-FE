import { FC, useMemo } from 'react'
import type { RbacFeatureRow } from '../core/_models'
import { buildFeatureTree, FeatureTreeNode, nodeVisibleUnderSearch } from '../featureTreeUtils'

type Props = {
  features: RbacFeatureRow[]
  selectedId: number | null
  onSelect: (id: number) => void
  loading: boolean
  searchQuery: string
  onSearchChange: (q: string) => void
  expandedIds: Set<number>
  onExpandedChange: (next: Set<number>) => void
  allParentIds: Set<number>
  canUpdate: boolean
  onEdit: (f: RbacFeatureRow) => void
}

const TreeRows: FC<{
  nodes: FeatureTreeNode[]
  depth: number
  selectedId: number | null
  onSelect: (id: number) => void
  expandedIds: Set<number>
  onToggleExpand: (id: number) => void
  searchQuery: string
  canUpdate: boolean
  onEdit: (f: RbacFeatureRow) => void
}> = ({
  nodes,
  depth,
  selectedId,
  onSelect,
  expandedIds,
  onToggleExpand,
  searchQuery,
  canUpdate,
  onEdit,
}) => {
  return (
    <>
      {nodes.map((node) => {
        const visible = nodeVisibleUnderSearch(node, searchQuery)
        if (!visible) return null

        const { feature, children } = node
        const hasChildren = children.length > 0
        const expanded = expandedIds.has(feature.id)
        const isSelected = selectedId === feature.id
        const active = feature.is_active !== false

        return (
          <div key={feature.id}>
            <div
              className={`rbac-tree-row ${isSelected ? 'rbac-tree-row--selected' : ''}`}
              style={{ paddingLeft: `${8 + depth * 14}px` }}
              onClick={() => onSelect(feature.id)}
              role="treeitem"
              aria-expanded={hasChildren ? expanded : undefined}
            >
              <span
                className={`rbac-tree-chevron ${!hasChildren ? 'rbac-tree-chevron--placeholder' : ''}`}
                onClick={(e) => {
                  if (!hasChildren) return
                  e.stopPropagation()
                  onToggleExpand(feature.id)
                }}
              >
                {hasChildren ? (expanded ? '\u25BC' : '\u25B6') : ''}
              </span>
              <span
                className={`rbac-feature-status-dot ${active ? 'rbac-feature-status-dot--active' : 'rbac-feature-status-dot--inactive'}`}
                title={active ? 'Active' : 'Inactive'}
              />
              <div className="flex-grow-1 min-w-0">
                <div className="fw-semibold fs-7 text-truncate">{feature.feature_name}</div>
                {feature.route_path && (
                  <div className="text-muted fs-8 text-truncate">{feature.route_path}</div>
                )}
              </div>
              {canUpdate && (
                <button
                  type="button"
                  className="btn btn-icon btn-sm btn-light btn-active-light-primary"
                  onClick={(e) => {
                    e.stopPropagation()
                    onEdit(feature)
                  }}
                  aria-label="Edit feature"
                >
                  <i className="bi bi-pencil fs-7" />
                </button>
              )}
            </div>
            {hasChildren && expanded && (
              <TreeRows
                nodes={children}
                depth={depth + 1}
                selectedId={selectedId}
                onSelect={onSelect}
                expandedIds={expandedIds}
                onToggleExpand={onToggleExpand}
                searchQuery={searchQuery}
                canUpdate={canUpdate}
                onEdit={onEdit}
              />
            )}
          </div>
        )
      })}
    </>
  )
}

export const FeatureTreeSidebar: FC<Props> = ({
  features,
  selectedId,
  onSelect,
  loading,
  searchQuery,
  onSearchChange,
  expandedIds,
  onExpandedChange,
  allParentIds,
  canUpdate,
  onEdit,
}) => {
  const tree = useMemo(() => buildFeatureTree(features), [features])

  const handleToggleExpand = (id: number) => {
    const next = new Set(expandedIds)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    onExpandedChange(next)
  }

  const expandAll = () => onExpandedChange(new Set(allParentIds))
  const collapseAll = () => onExpandedChange(new Set())

  return (
    <aside className="rbac-mgmt-sidebar">
      <div className="p-3 border-bottom border-gray-300">
        <label className="form-label fw-semibold fs-7 mb-2">Search features</label>
        <input
          type="search"
          className="form-control form-control-sm"
          placeholder="Name, code, route…"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          autoComplete="off"
        />
        <div className="d-flex gap-2 mt-3">
          <button type="button" className="btn btn-sm btn-light flex-grow-1" onClick={expandAll}>
            Expand all
          </button>
          <button type="button" className="btn btn-sm btn-light flex-grow-1" onClick={collapseAll}>
            Collapse all
          </button>
        </div>
      </div>
      <div className="rbac-mgmt-sidebar-inner">
        <div className="rbac-mgmt-tree-scroll" role="tree">
          {loading ? (
            <div className="text-muted p-2">Loading…</div>
          ) : tree.length === 0 ? (
            <div className="text-muted p-2">No features</div>
          ) : (
            <TreeRows
              nodes={tree}
              depth={0}
              selectedId={selectedId}
              onSelect={onSelect}
              expandedIds={expandedIds}
              onToggleExpand={handleToggleExpand}
              searchQuery={searchQuery}
              canUpdate={canUpdate}
              onEdit={onEdit}
            />
          )}
        </div>
      </div>
    </aside>
  )
}
