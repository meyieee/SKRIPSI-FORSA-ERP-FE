/* eslint-disable react-hooks/rules-of-hooks */
import React, {useEffect, useMemo, useState} from 'react'
import {findAsset, AssetIndexedRow, AssetRow} from './dummy'
import AssetGeneralInfo from './AssetGeneralInfo'

/* import tabs detail-info */
import {
  DetailTab,
  SpecsTab,
  FinanceTab,
  HireTab,
  WarrantyTab,
  LeasingTab,
  DocumentsTab,
} from './detail-info/tabs'

/* import tabs operation */
import {BreakdownTab, ReadingTab, FuelTab, TasksTab} from './operation/tabs'

/* import tabs maintenance */
import {PMServiceTab, WorkorderTab, PCRAPLsTab} from './maintenance/tabs'

/* import tabs cost */
import {CostSummaryTab, MaterialTab, ManhoursTab, OtherTab} from './cost/tabs'

type Main = 'general' | 'operation' | 'maintenance' | 'cost'
type SectionKey =
  | 'detail'
  | 'specs'
  | 'finance'
  | 'hire'
  | 'warranty'
  | 'leasing'
  | 'documents'
  | 'breakdown'
  | 'reading'
  | 'fuel'
  | 'tasks'
  | 'pmservice'
  | 'workorder'
  | 'pcr/apls'
  | 'cost_summary'
  | 'material'
  | 'manhours'
  | 'other'
type SectionComp = React.ComponentType<{asset?: AssetRow | null}>
type SubConf = {key: SectionKey; label: string; Comp: SectionComp}

/** Sub-tabs General Info */
const SUB_TABS: Record<Main, SubConf[]> = {
  general: [
    {key: 'detail', label: 'DETAIL', Comp: DetailTab},
    {key: 'specs', label: 'SPECS', Comp: SpecsTab},
    {key: 'finance', label: 'FINANCE', Comp: FinanceTab},
    {key: 'hire', label: 'HIRE RATE', Comp: HireTab},
    {key: 'warranty', label: 'WARRANTY', Comp: WarrantyTab},
    {key: 'leasing', label: 'LEASING', Comp: LeasingTab},
    {key: 'documents', label: 'DOCUMENTS', Comp: DocumentsTab},
  ],
  operation: [
    {key: 'breakdown', label: 'BREAKDOWN', Comp: BreakdownTab},
    {key: 'reading', label: 'READING', Comp: ReadingTab},
    {key: 'fuel', label: 'FUEL', Comp: FuelTab},
    {key: 'tasks', label: 'TASKS', Comp: TasksTab},
  ],

  maintenance: [
    {key: 'pmservice', label: 'PM SERVICE', Comp: PMServiceTab},
    {key: 'workorder', label: 'WORKORDER', Comp: WorkorderTab},
    {key: 'pcr/apls', label: "PCR | APL's", Comp: PCRAPLsTab},
  ],
  cost: [
    {key: 'cost_summary', label: 'COST SUMMARY', Comp: CostSummaryTab},
    {key: 'material', label: 'MATERIAL', Comp: MaterialTab},
    {key: 'manhours', label: 'MANHOURS', Comp: ManhoursTab},
    {key: 'other', label: 'OTHER', Comp: OtherTab},
  ],
}

const MAIN_TABS: {key: Main; label: string}[] = [
  {key: 'general', label: 'ASSET DETAIL INFO'},
  {key: 'operation', label: 'ASSET OPERATION'},
  {key: 'maintenance', label: 'MAINTENANCE'},
  {key: 'cost', label: 'COST'},
]

const InlineAssetInfoPanel: React.FC<{
  selected?: AssetRow | null
  groupName?: string
}> = ({selected, groupName}) => {
  if (!selected) return null

  const [viewAsset, setViewAsset] = useState<AssetIndexedRow | AssetRow | null>(selected)
  useEffect(() => setViewAsset(selected ?? null), [selected])

  const [notFound, setNotFound] = useState(false)
  const [notFoundMsg, setNotFoundMsg] = useState('')

  const handleSearchAsset = (keyword: string) => {
    const found = findAsset(keyword)
    if (found) {
      setViewAsset(found)
      setNotFound(false)
    } else {
      setNotFoundMsg(`No asset found for "${keyword}". Please check Asset No / Model / Serial.`)
      setNotFound(true)
      window.setTimeout(() => setNotFound(false), 4000)
    }
  }

  const [main, setMain] = useState<Main>('general')
  const [sub, setSub] = useState<SectionKey>(SUB_TABS.general[0].key)

  const subs = SUB_TABS[main]
  const activeSub = useMemo(() => subs.find((s) => s.key === sub) ?? subs[0], [subs, sub])
  const ActiveComp = activeSub.Comp

  return (
    <div className='mt-6'>
      {/* Header */}
      {notFound && (
        <div className='alert alert-warning d-flex align-items-center' role='alert'>
          <i className='bi bi-exclamation-triangle me-2' />
          <div>{notFoundMsg}</div>
          <button type='button' className='btn-close ms-auto' onClick={() => setNotFound(false)} />
        </div>
      )}

      {viewAsset && (
        <AssetGeneralInfo
          asset={viewAsset as AssetRow}
          // pakai groupName dari aset jika ada; fallback ke prop parent
          groupName={(viewAsset as any).groupName || groupName}
          showSearch
          onSearch={handleSearchAsset}
        />
      )}

      {/* Main Tabs  */}
      <div className='ms-3 mb-3'>
        <ul className='nav nav-tabs nav-line-tabs nav-stretch fs-5 border-0'>
          {MAIN_TABS.map((t) => (
            <li key={t.key} className='nav-item me-3'>
              <button
                type='button'
                className={`nav-link ${
                  main === t.key ? 'active text-primary fw-bold' : 'text-muted'
                }`}
                onClick={() => {
                  setMain(t.key)
                  setSub(SUB_TABS[t.key][0].key)
                }}
              >
                {t.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Sub-tabs General Info */}
      <div className='card'>
        <div className='card bg-secondary'>
          <ul className='nav nav-tabs nav-line-tabs nav-stretch fs-6 border-0 ms-5 mt-2 mb-2 gap-2'>
            {subs.map((s) => (
              <li key={s.key} className='nav-item'>
                <button
                  type='button'
                  className={`nav-link ${
                    activeSub.key === s.key ? 'active text-primary fw-bold' : 'text-muted'
                  }`}
                  onClick={() => setSub(s.key)}
                >
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Konten sub-tab */}
        <div className='card-body'>
          <ActiveComp
            asset={viewAsset as AssetRow}
            key={`asset-content-${sub}-${(viewAsset as AssetRow | null)?.assetNo || ''}`}
          />
        </div>
      </div>
    </div>
  )
}

export default InlineAssetInfoPanel
