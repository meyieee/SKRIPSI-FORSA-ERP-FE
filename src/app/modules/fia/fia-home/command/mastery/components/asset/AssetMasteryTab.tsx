import React, {useMemo, useRef, useState} from 'react'
import {Form, Row, Col, Button} from 'react-bootstrap'
import {KTSVG, KTCard, KTCardBody} from '../../../../../../../../_metronic'
import InlineAssetInfoPanel from './InlineAssetInfoPanel'
import {assetTableDummy, AssetRow} from './dummy'

const pick = (obj: any, keys: string[]) => {
  for (const k of keys) {
    const v = obj?.[k]
    if (v !== undefined && v !== null && String(v).trim() !== '') return String(v).trim()
  }
  return ''
}

const readSite = (r: any) => pick(r, ['siteBranch', 'site', 'branch', 'location'])
const readSection = (r: any) => pick(r, ['sectionCc', 'section', 'cc', 'costCenter'])
const readDept = (r: any, block?: any) => pick(r, ['department']) || pick(block, ['department'])

const AssetMasteryTab: React.FC = () => {
  const [filters, setFilters] = useState({site: '', department: '', section: '', asset: ''})
  const onChange =
    (key: keyof typeof filters) =>
    (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) =>
      setFilters((s) => ({...s, [key]: e.target.value}))
  const clearAll = () => setFilters({site: '', department: '', section: '', asset: ''})

  // selection
  const [selected, setSelected] = useState<{row: AssetRow; group: string} | null>(null)
  const anchorRef = useRef<HTMLDivElement>(null)

  // options
  const siteOptions = useMemo(() => {
    const set = new Set<string>()
    assetTableDummy.forEach((b) => b.rows.forEach((r) => set.add(readSite(r))))
    set.delete('')
    return Array.from(set)
  }, [])
  const sectionOptions = useMemo(() => {
    const set = new Set<string>()
    assetTableDummy.forEach((b) => b.rows.forEach((r) => set.add(readSection(r))))
    set.delete('')
    return Array.from(set)
  }, [])
  const departmentOptions = useMemo(() => {
    const set = new Set<string>()
    assetTableDummy.forEach((b) => {
      if (b.department) set.add(b.department)
      b.rows.forEach((r) => {
        const d = readDept(r)
        if (d) set.add(d)
      })
    })
    set.delete('')
    return Array.from(set)
  }, [])

  // filtered data
  const filteredBlocks = useMemo(() => {
    const qRaw = filters.asset.trim()
    const qLower = qRaw.toLowerCase()
    const qAlpha = qRaw.replace(/[^a-z0-9]/gi, '').toLowerCase()
    const qDigits = qRaw.replace(/\D/g, '')
    const hasLetters = /[a-z]/i.test(qRaw)

    return assetTableDummy
      .map((block) => {
        const rows = block.rows.filter((r) => {
          const byDept = filters.department ? readDept(r, block) === filters.department : true
          const bySite = filters.site ? readSite(r) === filters.site : true
          const bySection = filters.section ? readSection(r) === filters.section : true

          // kolom target
          const assetNoAlpha = String(r.assetNo ?? '')
            .replace(/[^a-z0-9]/gi, '')
            .toLowerCase()
          const assetNoDigits = String(r.assetNo ?? '').replace(/\D/g, '')
          const modelLower = String(r.model ?? '').toLowerCase()
          const mfgLower = String(r.manufacturer ?? '').toLowerCase()
          const serialAlpha = String(r.serialNo ?? '')
            .replace(/[^a-z0-9]/gi, '')
            .toLowerCase()
          const serialDigits = String(r.serialNo ?? '').replace(/\D/g, '')

          // aturan match
          const serialMatch = hasLetters
            ? serialAlpha.includes(qAlpha)
            : qDigits !== '' && serialDigits.includes(qDigits)

          const assetNoMatch = hasLetters
            ? assetNoAlpha.includes(qAlpha)
            : qDigits !== '' && assetNoDigits.includes(qDigits)

          const byQ = qLower
            ? assetNoMatch ||
              modelLower.includes(qLower) ||
              mfgLower.includes(qLower) ||
              serialMatch
            : true

          return byDept && bySite && bySection && byQ
        })
        return {...block, rows}
      })
      .filter((b) => b.rows.length > 0)
  }, [filters])

  const totalVisible = useMemo(
    () => filteredBlocks.reduce((acc, b) => acc + b.rows.length, 0),
    [filteredBlocks]
  )

  const handleView = (row: AssetRow, groupName: string) => {
    setSelected({row, group: groupName})
    setTimeout(() => anchorRef.current?.scrollIntoView({behavior: 'smooth', block: 'start'}), 0)
  }

  return (
    <KTCard className='mb-5'>
      <KTCardBody>
      {/* Filter Bar */}
      <div className='mb-3 p-3 border rounded'>
        <Row className='g-3 align-items-end row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5'>
          <Col>
            <Form.Label className='fw-semibold'>Site | Branch</Form.Label>
            <Form.Select value={filters.site} onChange={onChange('site')}>
              <option value=''>default: All</option>
              {siteOptions.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col>
            <Form.Label className='fw-semibold'>Department</Form.Label>
            <Form.Select value={filters.department} onChange={onChange('department')}>
              <option value=''>default: All</option>
              {departmentOptions.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col>
            <Form.Label className='fw-semibold'>Section | CC</Form.Label>
            <Form.Select value={filters.section} onChange={onChange('section')}>
              <option value=''>default: All</option>
              {sectionOptions.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col>
            <Form.Label className='fw-semibold'>Asset</Form.Label>
            <Form.Control
              placeholder='default: All'
              value={filters.asset}
              onChange={onChange('asset')}
            />
          </Col>

          <Col>
            <Form.Label className='fw-semibold invisible'>Actions</Form.Label>
            <div className='d-flex align-items-center justify-content-between gap-2 flex-wrap'>
              <div className='text-gray-800 small mb-0'>
                Showing <span className='fw-semibold'>{totalVisible}</span> item
                {totalVisible !== 1 ? 's' : ''}
              </div>
              <Button variant='light-dark' size='sm' onClick={clearAll}>
                Reset
              </Button>
            </div>
          </Col>
        </Row>
      </div>

      {/* Tabel*/}
      <div className='table-responsive'>
        <table className='table table-hover table-rounded border table-row-bordered table-row-gray-300 align-middle gs-4 gy-1 gx-3'>
          <thead>
            <tr className='fw-bold bg-secondary'>
              <th className='min-w-30px py-3'>No</th>
              <th className='min-w-140px py-3'>Asset No</th>
              <th className='min-w-220px py-3'>Asset Type</th>
              <th className='min-w-200px py-3'>Manufacture</th>
              <th className='min-w-200px py-3'>Model</th>
              <th className='min-w-160px py-3'>Serial No</th>
              <th className='min-w-80px py-3'>Year</th>
              <th className='min-w-180px py-3'>Location</th>
              <th className='min-w-60px text-end py-3'>Action</th>
            </tr>
          </thead>
          <tbody className='text-gray-800'>
            {filteredBlocks.length === 0 ? (
              <tr>
                <td colSpan={9} className='text-center text-muted py-10'>
                  No data found for current filters.
                </td>
              </tr>
            ) : (
              filteredBlocks.map((block) => (
                <React.Fragment key={block.groupName}>
                  <tr>
                    <td colSpan={9} className='fw-bolder text-dark bg-light'>
                      {block.groupName}
                    </td>
                  </tr>
                  {block.rows.map((r) => (
                    <tr key={`${block.groupName}-${r.no}-${r.assetNo}`}>
                      <td>{r.no}</td>
                      <td>{r.assetNo}</td>
                      <td>{r.assetType}</td>
                      <td>{r.manufacturer}</td>
                      <td>{r.model}</td>
                      <td>{r.serialNo}</td>
                      <td>{r.year}</td>
                      <td>{r.location}</td>
                      <td className='text-end'>
                        <button
                          type='button'
                          className='btn btn-sm btn-link btn-color-dark btn-active-color-primary me-1'
                          onClick={() => handleView(r, block.groupName)}
                          aria-label='View'
                        >
                          <KTSVG
                            path='/media/icons/duotune/general/gen004.svg'
                            className='svg-icon-3'
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* auto-scroll ke detail */}
      <div ref={anchorRef} />

      {/* Detail Panel*/}
      <div className={selected ? '' : 'd-none'}>
        <InlineAssetInfoPanel selected={selected?.row} groupName={selected?.group} />
      </div>
      </KTCardBody>
    </KTCard>
  )
}

export default AssetMasteryTab
