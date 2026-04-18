import type { RbacFeatureRow } from './core/_models'

export const PRIVILEGE_COLUMN_ORDER = ['Create', 'Read', 'Update', 'Delete', 'UpdateA'] as const

export type FeatureTreeNode = {
  feature: RbacFeatureRow
  children: FeatureTreeNode[]
}

export function buildFeatureTree(features: RbacFeatureRow[]): FeatureTreeNode[] {
  const byParent = new Map<number | null, RbacFeatureRow[]>()
  for (const f of features) {
    const p = f.parent_feature_id ?? null
    if (!byParent.has(p)) byParent.set(p, [])
    byParent.get(p)!.push(f)
  }
  for (const arr of byParent.values()) {
    arr.sort((a, b) => {
      const o = (a.display_order ?? 0) - (b.display_order ?? 0)
      if (o !== 0) return o
      return a.feature_name.localeCompare(b.feature_name)
    })
  }

  const build = (parentId: number | null): FeatureTreeNode[] =>
    (byParent.get(parentId) || []).map((feature) => ({
      feature,
      children: build(feature.id),
    }))

  return build(null)
}

/** IDs of features that have at least one child */
export function collectParentFeatureIds(nodes: FeatureTreeNode[], acc = new Set<number>()): Set<number> {
  for (const n of nodes) {
    if (n.children.length > 0) {
      acc.add(n.feature.id)
      collectParentFeatureIds(n.children, acc)
    }
  }
  return acc
}

function matchesFeature(f: RbacFeatureRow, q: string): boolean {
  const s = q.trim().toLowerCase()
  if (!s) return true
  return (
    f.feature_name.toLowerCase().includes(s) ||
    f.code.toLowerCase().includes(s) ||
    String(f.route_path || '')
      .toLowerCase()
      .includes(s)
  )
}

/** Node visible if it matches search or any descendant does */
export function nodeVisibleUnderSearch(node: FeatureTreeNode, q: string): boolean {
  if (!q.trim()) return true
  const self = matchesFeature(node.feature, q)
  if (self) return true
  return node.children.some((c) => nodeVisibleUnderSearch(c, q))
}

/** Collect ancestor IDs needed to show a node (walk via parent_feature_id map) */
export function ancestorsForId(
  id: number,
  byId: Map<number, RbacFeatureRow>
): number[] {
  const out: number[] = []
  let cur: RbacFeatureRow | undefined = byId.get(id)
  while (cur?.parent_feature_id != null) {
    const p = cur.parent_feature_id
    out.push(p)
    cur = byId.get(p)
  }
  return out
}

/** Auto-expand: all parent ids + ancestors of every visible node when searching */
export function computeExpandedForSearch(
  tree: FeatureTreeNode[],
  features: RbacFeatureRow[],
  q: string,
  allParentIds: Set<number>
): Set<number> {
  if (!q.trim()) return new Set(allParentIds)

  const byId = new Map(features.map((f) => [f.id, f]))
  const expanded = new Set<number>()

  const walk = (node: FeatureTreeNode): boolean => {
    const childVisible = node.children.map(walk).some(Boolean)
    const selfMatch = matchesFeature(node.feature, q)
    const show = selfMatch || childVisible
    if (show && node.children.length > 0) {
      expanded.add(node.feature.id)
    }
    if (selfMatch) {
      for (const aid of ancestorsForId(node.feature.id, byId)) {
        expanded.add(aid)
      }
    }
    return show
  }
  tree.forEach(walk)
  return expanded
}

export function breadcrumbForFeature(
  feature: RbacFeatureRow | null,
  byId: Map<number, RbacFeatureRow>
): string[] {
  if (!feature) return ['Controls', 'RBAC', 'Features']
  const segments: string[] = []
  const seen = new Set<number>()
  let cur: RbacFeatureRow | null = feature
  while (cur && !seen.has(cur.id)) {
    seen.add(cur.id)
    segments.unshift(cur.feature_name)
    const pid: number | null = cur.parent_feature_id
    cur = pid != null ? byId.get(pid) ?? null : null
  }
  return ['Controls', 'RBAC', ...segments]
}
