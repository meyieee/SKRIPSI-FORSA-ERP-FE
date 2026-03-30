import React, {useState, useMemo, useEffect} from 'react'
import {Button} from 'react-bootstrap'

type FuelRow = {
  id: number
  assetNo: string
  type: string
  requestNo: string
  date: string
  time: string
  requestedBy: string
  storage: string
  stockcode: string
  uom: string
  qty: number
  reading: number
  costCenter: string
  fuelCard: string
  status?: string
  // Optional fields for updates
  currentDateTime?: string
  currentQty?: number
  currentReading?: number
}

type FuelGroup = {
  groupTitle: string
  siteBranch: string
  department: string
  section: string
  element: string
  rows: FuelRow[]
}

// Fallback dummy data (used if API not available)
const fallbackDummyGroups: FuelGroup[] = [
  {
    groupTitle: 'Diesel Drill Model DD-Z01',
    siteBranch: 'Jakarta',
    department: 'Mining',
    section: 'Section 1',
    element: 'Fuel',
    rows: [
      {
        id: 1,
        assetNo: 'DD001',
        type: 'Hours',
        requestNo: 'FL0101',
        date: '2025-09-20',
        time: '00:00:00',
        requestedBy: 'Wong Tiara - 12345',
        storage: 'Fuel Bay AA',
        stockcode: 'SC0001 - Diesel Fuel',
        uom: 'Litre',
        qty: 100,
        reading: 20000,
        costCenter: 'Operation',
        fuelCard: 'FCDD001',
        status: 'Approved',
      },
      {
        id: 2,
        assetNo: 'DD002',
        type: 'Hours',
        requestNo: 'FL0102',
        date: '2025-09-20',
        time: '00:00:00',
        requestedBy: 'Jun Hale - 12346',
        storage: 'Fuel Bay AA',
        stockcode: 'SC0001 - Diesel Fuel',
        uom: 'Litre',
        qty: 150,
        reading: 18000,
        costCenter: 'Operation',
        fuelCard: 'FCDD002',
        status: 'Approved',
      },
    ],
  },
  {
    groupTitle: 'Excavator EXC-AAA',
    siteBranch: 'Jakarta',
    department: 'Operations',
    section: 'Section 2',
    element: 'Fuel',
    rows: [
      {
        id: 3,
        assetNo: 'EXA001',
        type: 'Hours',
        requestNo: 'FL0102',
        date: '2025-09-20',
        time: '00:00:00',
        requestedBy: 'Wong Tiara - 12345',
        storage: 'Fuel Bay AA',
        stockcode: 'SC0001 - Diesel Fuel',
        uom: 'Litre',
        qty: 200,
        reading: 22000,
        costCenter: 'Operation',
        fuelCard: 'FCEXA001',
        status: 'Approved',
      },
      {
        id: 4,
        assetNo: 'EXA002',
        type: 'Hours',
        requestNo: 'FL0103',
        date: '2025-09-20',
        time: '00:00:00',
        requestedBy: 'Wong Tiara - 12345',
        storage: 'Fuel Bay AA',
        stockcode: 'SC0001 - Diesel Fuel',
        uom: 'Litre',
        qty: 75,
        reading: 19000,
        costCenter: 'Operation',
        fuelCard: 'FCEXA002',
        status: 'Approved',
      },
    ],
  },
  {
    groupTitle: 'Excavator EXC-BBB',
    siteBranch: 'Jakarta',
    department: 'Operations',
    section: 'Section 3',
    element: 'Fuel',
    rows: [
      {
        id: 5,
        assetNo: 'EXB001',
        type: 'Hours',
        requestNo: 'FL0104',
        date: '2025-09-20',
        time: '00:00:00',
        requestedBy: 'Jun Hale - 12346',
        storage: 'Fuel Bay AA',
        stockcode: 'SC0001 - Diesel Fuel',
        uom: 'Litre',
        qty: 150,
        reading: 15000,
        costCenter: 'Operation',
        fuelCard: 'FCEXB001',
        status: 'Approved',
      },
    ],
  },
  {
    groupTitle: 'Haul Truck HT-007',
    siteBranch: 'Surabaya',
    department: 'Hauling',
    section: 'Section 4',
    element: 'Fuel',
    rows: [
      {
        id: 6,
        assetNo: 'HL001',
        type: 'Km',
        requestNo: 'FL0105',
        date: '2025-09-20',
        time: '00:00:00',
        requestedBy: 'Wong Tiara - 12345',
        storage: 'Fuel Bay BB',
        stockcode: 'SC0001 - Diesel Fuel',
        uom: 'Litre',
        qty: 175,
        reading: 20000,
        costCenter: 'Operation',
        fuelCard: 'FCHL001',
        status: 'Approved',
      },
      {
        id: 7,
        assetNo: 'HL002',
        type: 'Km',
        requestNo: 'FL0106',
        date: '2025-09-20',
        time: '00:00:00',
        requestedBy: 'Jun Hale - 12346',
        storage: 'Fuel Bay BB',
        stockcode: 'SC0001 - Diesel Fuel',
        uom: 'Litre',
        qty: 300,
        reading: 18000,
        costCenter: 'Operation',
        fuelCard: 'FCHL002',
        status: 'Approved',
      },
    ],
  },
  {
    groupTitle: 'Haul Truck HTZ08',
    siteBranch: 'Surabaya',
    department: 'Hauling',
    section: 'Section 5',
    element: 'Fuel',
    rows: [
      {
        id: 8,
        assetNo: 'HL003',
        type: 'Km',
        requestNo: 'FL0107',
        date: '2025-09-20',
        time: '00:00:00',
        requestedBy: 'Jun Hale - 12346',
        storage: 'Fuel Bay BB',
        stockcode: 'SC0001 - Diesel Fuel',
        uom: 'Litre',
        qty: 125,
        reading: 22000,
        costCenter: 'Operation',
        fuelCard: 'FCHL003',
        status: 'Approved',
      },
      {
        id: 9,
        assetNo: 'HL004',
        type: 'Km',
        requestNo: 'FL0108',
        date: '2025-09-20',
        time: '00:00:00',
        requestedBy: 'Wong Tiara - 12345',
        storage: 'Fuel Bay BB',
        stockcode: 'SC0001 - Diesel Fuel',
        uom: 'Litre',
        qty: 125,
        reading: 19000,
        costCenter: 'Operation',
        fuelCard: 'FCHL004',
        status: 'Approved',
      },
    ],
  },
]

export const FuelUpdateTab: React.FC = () => {
  const [updateData, setUpdateData] = useState<FuelGroup[]>([])
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [submitMessage, setSubmitMessage] = useState<{type: 'success' | 'error'; text: string} | null>(null)
  const [submitting, setSubmitting] = useState(false)

  // Fetch fuel data from API on component mount
  useEffect(() => {
    const fetchFuelData = async () => {
      try {
        setLoading(true)
        setFetchError(null)

        // TODO: Replace with actual API endpoint once backend is ready
        // Example: const response = await fetch('/api/fuel-requests')
        // const data = await response.json()
        // setUpdateData(data)

        // For now, use fallback dummy data
        console.log('Using fallback dummy data for FuelUpdateTab (API not yet implemented)')
        setUpdateData(fallbackDummyGroups)
      } catch (err) {
        console.error('Failed to fetch fuel data:', err)
        setFetchError('Failed to load fuel data. Using fallback.')
        setUpdateData(fallbackDummyGroups)
      } finally {
        setLoading(false)
      }
    }

    fetchFuelData()
  }, [])

  const totalRows = useMemo(
    () => updateData.reduce((sum, g) => sum + (g.rows?.length || 0), 0),
    [updateData]
  )

  const updateCell = (gIdx: number, rIdx: number, patch: Partial<FuelRow>) => {
    setUpdateData((prev) => {
      const copy = prev.map((g) => ({...g, rows: g.rows.map((r) => ({...r}))}))
      if (!copy[gIdx]) return prev
      if (!copy[gIdx].rows[rIdx]) return prev
      copy[gIdx].rows[rIdx] = {...copy[gIdx].rows[rIdx], ...patch}
      return copy
    })
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    setSubmitMessage(null)
    try {
      // Replace with real API call once backend is ready
      // Example: await fetch('/api/fuel-updates', { method: 'POST', body: JSON.stringify(updateData) })
      console.log('Submitting all fuel updates:', updateData)
      await new Promise((r) => setTimeout(r, 800))
      setSubmitMessage({type: 'success', text: 'All fuel updates submitted successfully (mock).'})
    } catch (err) {
      console.error(err)
      setSubmitMessage({type: 'error', text: 'Submission failed. See console for details.'})
    } finally {
      setSubmitting(false)
    }
  }

  const handleCancel = () => {
    setSubmitMessage(null)
    // Clear any user-entered values in editable fields (currentDateTime, currentQty, currentReading)
    setUpdateData((prev) =>
      prev.map((g) => ({
        ...g,
        rows: g.rows.map((r) => ({
          ...r,
          currentDateTime: undefined,
          currentQty: undefined,
          currentReading: undefined,
        })),
      }))
    )
    console.log('Update cancelled. Cleared editable inputs.')
  }

  if (loading) {
    return (
      <div className="text-center py-6">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h5 className="fw-bold mb-3">Fuel Update All</h5>
      <div className="mb-3 small text-muted">
        Ready to submit <strong>{totalRows}</strong> row{totalRows !== 1 ? 's' : ''} from{' '}
        <strong>{updateData?.length ?? 0}</strong> group{(updateData?.length ?? 0) !== 1 ? 's' : ''}.
        {fetchError && <div className="text-warning mt-1">{fetchError}</div>}
      </div>

      {/* Data preview table - follow FuelConsumption columns */}
      <div className="table-responsive border rounded p-3 mb-3">
        <table className="table table-rounded border table-row-bordered align-middle gs-4 gy-2 gx-3">
          <thead>
            <tr className="fw-bold bg-secondary">
              <th style={{width: 35, minWidth: 35}}>No.</th>
              <th style={{width: 100, minWidth: 100}}>Asset No</th>
              <th style={{width: 80, minWidth: 80}}>Type</th>
              <th style={{width: 100, minWidth: 100}}>Request No</th>
              <th style={{width: 120, minWidth: 120}}>Requested By</th>
              <th style={{width: 100, minWidth: 100}}>Storage</th>
              <th style={{width: 100, minWidth: 100}}>Stockcode</th>
              <th style={{width: 120, minWidth: 120}}>Date / Time</th>
              <th style={{width: 100, minWidth: 100}}>Qty</th>
              <th style={{width: 100, minWidth: 100}}>Reading</th>
              <th style={{width: 120, minWidth: 120}}>Cost Center</th>
              <th style={{width: 100, minWidth: 100}}>Fuel Card</th>
            </tr>
          </thead>
          <tbody>
            {updateData?.length === 0 ? (
              <tr>
                <td colSpan={12} className="text-center text-muted py-6">
                  No data available
                </td>
              </tr>
            ) : (
              updateData.map((g, gIdx) => (
                <React.Fragment key={g.groupTitle}>
                  <tr style={{backgroundColor: '#3f4254', color: '#fff'}}>
                    <td colSpan={12} className="fw-semibold">
                      {g.groupTitle}
                    </td>
                  </tr>
                  {g.rows.map((r, rIdx) => (
                    <tr key={r.id}>
                      <td>{rIdx + 1}</td>
                      <td>{r.assetNo}</td>
                      <td>{r.type}</td>
                      <td>{r.requestNo}</td>
                      <td>{r.requestedBy}</td>
                      <td>{r.storage}</td>
                      <td>{r.stockcode}</td>
                      <td>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          placeholder="YYYY-MM-DD HH:MM:SS"
                          value={(r as any).currentDateTime ?? ''}
                          onChange={(e) => updateCell(gIdx, rIdx, {currentDateTime: e.target.value} as any)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          value={(r as any).currentQty ?? ''}
                          onChange={(e) => updateCell(gIdx, rIdx, {currentQty: Number(e.target.value)} as any)}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          value={(r as any).currentReading ?? ''}
                          onChange={(e) => updateCell(gIdx, rIdx, {currentReading: Number(e.target.value)} as any)}
                        />
                      </td>
                      <td>{r.costCenter}</td>
                      <td>{r.fuelCard}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Status message */}
      {submitMessage && (
        <div className={`alert alert-${submitMessage.type === 'success' ? 'info' : 'danger'} mb-3`}>
          {submitMessage.text}
        </div>
      )}

      {/* Action buttons (right-aligned) */}
      <div className="d-flex justify-content-end gap-2">
        <Button
          variant="outline-secondary"
          onClick={handleCancel}
          disabled={submitting}
        >
          Cancel
        </Button>
        <Button
          variant="success"
          onClick={handleSubmit}
          disabled={submitting || totalRows === 0}
        >
          {submitting ? 'Submitting...' : 'Submit'}
        </Button>
      </div>
    </div>
  )
}

export default FuelUpdateTab
