import React, {useMemo, useRef, useState} from 'react'
import {Form, Row, Col, Button} from 'react-bootstrap'
import {KTSVG, KTCard, KTCardBody} from '../../../../../../../../_metronic'
import StockRegisterInfo from './register/StockRegisterInfo'

type StockRow = {
  no: number
  code: string
  desc: string
  bin?: string
  uom: string
  soh: number
  reserve?: number
  available: number
  onOrder?: number
  inTransit?: number
  combine?: number
  target?: number
  reorder?: number
}

type StockBlock = {
  groupName: string
  rows: StockRow[]
}

const dummy: StockBlock[] = [
  {
    groupName: 'COMPONENT',
    rows: [
      {
        no: 1,
        code: '10001-001',
        desc: 'Radiator For Production Drill DZZ31',
        bin: '',
        uom: 'EA',
        soh: 10,
        reserve: 1,
        available: 9,
        onOrder: 10,
        inTransit: 0,
        combine: 0,
        target: 20,
        reorder: 10,
      },
      {
        no: 2,
        code: '10001-002',
        desc: 'Compressor Drill Model 123',
        uom: 'EA',
        soh: 5,
        available: 5,
        onOrder: 2,
        target: 7,
        reorder: 5,
      },
      {
        no: 3,
        code: '10001-003',
        desc: 'Radiator For Excavator Model 1234354',
        uom: 'EA',
        soh: 3,
        available: 3,
        inTransit: 1,
        target: 4,
        reorder: 5,
      },
    ],
  },
  {
    groupName: 'OPERATION CONSUMABLE',
    rows: [
      {
        no: 1,
        code: '30001-001',
        desc: 'Bits',
        uom: 'EA',
        soh: 30,
        reserve: 3,
        available: 27,
        inTransit: 1,
        target: 31,
        reorder: 40,
      },
      {
        no: 2,
        code: '30001-002',
        desc: 'Bucket',
        uom: 'EA',
        soh: 10,
        available: 10,
        inTransit: 2,
        target: 12,
        reorder: 15,
      },
    ],
  },
  {
    groupName: 'OFFICE CONSUMABLE',
    rows: [
      {
        no: 1,
        code: '40001-001',
        desc: 'Office Supplies - Pulpen Black Color',
        uom: 'BOX',
        soh: 10,
        available: 10,
        onOrder: 2,
        inTransit: 1,
        target: 13,
        reorder: 20,
      },
    ],
  },
]

const StockMasteryTab: React.FC = () => {
  const [filters, setFilters] = useState({
    site: '',
    department: '',
    storage: '',
    stockcode: '',
  })

  const [activeRow, setActiveRow] = useState<StockRow | null>(null)
  const [hasDetail, setHasDetail] = useState(false)
  const anchorRef = useRef<HTMLDivElement>(null)

  const onChange =
    (key: keyof typeof filters) =>
    (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) =>
      setFilters((s) => ({...s, [key]: e.target.value}))

  const clearAll = () => setFilters({site: '', department: '', storage: '', stockcode: ''})

  const siteOptions = useMemo(() => ['HQ', 'SITE A', 'SITE B'], [])
  const deptOptions = useMemo(() => ['Component', 'Operation', 'Office'], [])
  const storageOptions = useMemo(() => ['Main WH', 'Yard', 'Transit'], [])

  const filteredBlocks = useMemo(() => {
    const q = filters.stockcode.trim().toLowerCase()
    const qDigits = q.replace(/\D/g, '')

    return dummy
      .filter((b) =>
        filters.department ? b.groupName.toLowerCase().includes(filters.department.toLowerCase()) : true
      )
      .map((b) => {
        const rows = b.rows.filter((r) => {
          if (!q) return true
          const codeDigits = r.code.replace(/\D/g, '')
          return (
            r.code.toLowerCase().includes(q) ||
            r.desc.toLowerCase().includes(q) ||
            (qDigits !== '' && codeDigits.includes(qDigits))
          )
        })
        return {...b, rows}
      })
      .filter((b) => b.rows.length > 0)
  }, [filters])

  const totalVisible = useMemo(
    () => filteredBlocks.reduce((acc, b) => acc + b.rows.length, 0),
    [filteredBlocks]
  )

  return (
    <KTCard className='mb-5'>
      <KTCardBody>
      {/* Filter bar */}
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
              {deptOptions.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col>
            <Form.Label className='fw-semibold'>Storage+</Form.Label>
            <Form.Select value={filters.storage} onChange={onChange('storage')}>
              <option value=''>default: All</option>
              {storageOptions.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col>
            <Form.Label className='fw-semibold'>Stockcode</Form.Label>
            <Form.Control
              placeholder='default: All'
              value={filters.stockcode}
              onChange={onChange('stockcode')}
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

      {/* Table */}
      <div className='table-responsive'>
        <table className='table table-hover table-rounded border table-row-bordered table-row-gray-300 align-middle gs-4 gy-1 gx-3'>
          <thead>
            <tr className='fw-bold bg-secondary'>
              <th className='min-w-30px py-3'>No</th>
              <th className='min-w-140px py-3'>Stockcode</th>
              <th className='min-w-320px py-3'>Stock Description</th>
              <th className='min-w-80px py-3'>BIN</th>
              <th className='min-w-80px py-3'>UOM</th>
              <th className='min-w-80px py-3'>SOH</th>
              <th className='min-w-100px py-3'>Reserve</th>
              <th className='min-w-140px py-3'>Stock Available</th>
              <th className='min-w-110px py-3'>On Order</th>
              <th className='min-w-110px py-3'>In Transit</th>
              <th className='min-w-140px py-3'>Combine Stock</th>
              <th className='min-w-120px py-3'>Target Level</th>
              <th className='min-w-110px py-3'>Re-Order</th>
              <th className='min-w-100px text-end py-3'>Action</th>
            </tr>
          </thead>

          <tbody className='text-gray-800'>
            {filteredBlocks.length === 0 ? (
              <tr>
                <td colSpan={14} className='text-center text-muted py-10'>
                  No data found for current filters.
                </td>
              </tr>
            ) : (
              filteredBlocks.map((block) => (
                <React.Fragment key={block.groupName}>
                  <tr>
                    <td colSpan={14} className='fw-bolder text-dark bg-light'>
                      {block.groupName}
                    </td>
                  </tr>
                  {block.rows.map((r) => (
                    <tr key={`${block.groupName}-${r.no}-${r.code}`}>
                      <td>{r.no}</td>
                      <td>{r.code}</td>
                      <td>{r.desc}</td>
                      <td>{r.bin || '-'}</td>
                      <td>{r.uom}</td>
                      <td>{r.soh}</td>
                      <td>{r.reserve ?? '-'}</td>
                      <td>{r.available}</td>
                      <td>{r.onOrder ?? '-'}</td>
                      <td>{r.inTransit ?? '-'}</td>
                      <td>{r.combine ?? '-'}</td>
                      <td>{r.target ?? '-'}</td>
                      <td>{r.reorder ?? '-'}</td>
                      <td className='text-end'>
                        <button
                          type='button'
                          className='btn btn-sm btn-link btn-color-dark btn-active-color-primary me-1'
                          onClick={() => {
                            setActiveRow(r)
                            if (!hasDetail) setHasDetail(true)
                            setTimeout(() => anchorRef.current?.scrollIntoView({behavior: 'smooth', block: 'start'}), 0)
                          }}
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

      {/* Footer actions */}
      <div className='d-flex justify-content-between align-items-center mt-4'>
        <button
          type='button'
          className='btn btn-dark'
          disabled={filteredBlocks.length === 0 || filteredBlocks[0]?.rows.length === 0}
          onClick={() => {
            // Toggle open/close
            if (hasDetail) {
              setHasDetail(false)
              return
            }
            // Auto-select first row if no row is selected then open and scroll
            if (!activeRow && filteredBlocks.length > 0 && filteredBlocks[0].rows.length > 0) {
              setActiveRow(filteredBlocks[0].rows[0])
            }
            setHasDetail(true)
            setTimeout(() => anchorRef.current?.scrollIntoView({behavior: 'smooth', block: 'start'}), 0)
          }}
        >
          {hasDetail ? 'HIDE STOCK REGISTER INFO' : 'STOCK REGISTER INFO'}
        </button>
        <span className='text-muted'>More Detail…</span>
      </div>

      {/* untuk auto-scroll */}
      <div ref={anchorRef} />

      {/* Stock Register Info Tab */}
      <div className={hasDetail ? '' : 'd-none'}>
        <StockRegisterInfo
          item={
          activeRow || (filteredBlocks.length > 0 && filteredBlocks[0].rows.length > 0)
            ? {
                code: (activeRow || filteredBlocks[0].rows[0]).code,
                desc: (activeRow || filteredBlocks[0].rows[0]).desc,
                uom: (activeRow || filteredBlocks[0].rows[0]).uom,
                site: filters.site || undefined,
                branch: filters.site || undefined,
                storage: filters.storage || undefined,
                bin: (activeRow || filteredBlocks[0].rows[0]).bin || undefined,
              }
            : null
        }
        sohAll={[
          {no: 1, branch: 'Balikpapan Branch', storage: 'Surface Storage', qty: 50.0},
          {no: 2, branch: 'Balikpapan Branch', storage: 'Underground Storage', qty: 30.0},
          {no: 3, branch: 'Balikpapan Branch', storage: 'Pit Storage', qty: 20.0},
        ]}
        sohGlobal={[
          {no: 1, branch: 'Balikpapan Branch', qty: 100.0},
          {no: 2, branch: 'Manado Branch', qty: 80.0},
          {no: 3, branch: 'Bali Branch', qty: 150.0},
          {no: 4, branch: 'Head Quarter Branch', qty: 170.0},
        ]}
        />
      </div>
      </KTCardBody>
    </KTCard>
  )
}

export default StockMasteryTab


