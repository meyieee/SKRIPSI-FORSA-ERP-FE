import React, { useState, useMemo, useEffect } from 'react'
import { Button } from 'react-bootstrap'

type PMRow = {
  id: number
  assetNo: string
  requestNo: string
  stockcode: string
  status?: string
  leadTime?: string
  planStartDate?: string
  planStartTime?: string
  planFinishDate?: string
  planFinishTime?: string
  requestedBy: string
  date: string
  duration?: string
  comment?: string
  workOrder?: string
  // Optional update fields
  currentDateTime?: string
  currentQty?: number
  currentReading?: number
  currentDescription?: string
  currentPriority?: string
  currentLeadTime?: string
  currentPlanStartDate?: string
  currentPlanStartTime?: string
  currentPlanFinishDate?: string
  currentPlanFinishTime?: string
  currentRemarks?: string
  currentDuration?: string
  currentWorkOrder?: string
}

type PMGroup = {
  groupTitle: string
  siteBranch: string
  department: string
  section: string
  element: string
  rows: PMRow[]
}

// Fallback dummy data (mirrors FuelUpdateTab structure)
const fallbackDummyGroups: PMGroup[] = [
  {
    groupTitle: 'Diesel Drill Model DD-Z01',
    siteBranch: 'Jakarta',
    department: 'Mining',
    section: 'Section 1',
    element: 'PM',
    rows: [
      {
        id: 1,
        assetNo: 'DD001',
        requestNo: 'PM2306-001',
        stockcode: 'PM Service 250',
        status: 'P#1',
        leadTime: '1',
        planStartDate: '2025-06-04',
        planStartTime: '12:00:00',
        planFinishDate: '2025-06-05',
        planFinishTime: '12:00:00',
        requestedBy: 'Wong Tiara',
        date: '2025-05-06',
        duration: '20',
        comment: 'PM at field',
		workOrder: 'WO2506-001',
      },
      {
        id: 2,
        assetNo: 'DD002',
        requestNo: 'PM2306-002',
        stockcode: 'PM Service 500',
        status: 'P#2',
        leadTime: '3',
        planStartDate: '2025-06-09',
        planStartTime: '12:00:00',
        planFinishDate: '2025-06-12',
        planFinishTime: '12:00:00',
        requestedBy: 'Wong Tiara',
        date: '2025-05-20',
        duration: '30',
        comment: 'Bring to workshop',
		workOrder: 'WO2506-002',
      },
    ],
  },
  {
    groupTitle: 'Excavator EXC-AAA',
    siteBranch: 'Jakarta',
    department: 'Operations',
    section: 'Section 2',
    element: 'PM',
    rows: [
      {
        id: 3,
        assetNo: 'EXA001',
        requestNo: 'PM2306-003',
        stockcode: 'PM Service 1000',
        status: 'P#1',
        leadTime: '1',
        planStartDate: '2025-06-11',
        planStartTime: '12:00:00',
        planFinishDate: '2025-06-12',
        planFinishTime: '12:00:00',
        requestedBy: 'Wong Tiara',
        date: '2025-05-16',
        duration: '20',
        comment: 'PM at Bay Shop',
		workOrder: 'WO2506-001',
      },
	  {
        id: 4,
        assetNo: 'EXA002',
        requestNo: 'PM2306-004',
        stockcode: 'PM Service 2000',
        status: 'P#3',
        leadTime: '4',
        planStartDate: '2025-06-16',
        planStartTime: '12:00:00',
        planFinishDate: '2025-06-24',
        planFinishTime: '12:00:00',
        requestedBy: 'Wong Tiara',
        date: '2025-05-16',
        duration: '20',
        comment: 'PM at Pushback #20',
		workOrder: 'WO2506-001',
      },
    ],
  },
  {
    groupTitle: 'Excavator EXC-BBB',
    siteBranch: 'Surabaya',
    department: 'Hauling',
    section: 'Section 3',
    element: 'PM',
    rows: [
      {
        id: 5,
        assetNo: 'EXB001',
        requestNo: 'PM2306-005',
        stockcode: 'PM Service 250',
        status: 'P#1',
        leadTime: '1',
        planStartDate: '2025-06-04',
        planStartTime: '12:00:00',
        planFinishDate: '2025-06-05',
        planFinishTime: '12:00:00',
        requestedBy: 'Wong Tiara',
        date: '2025-05-16',
        duration: '20',
        comment: 'PM at field',
		workOrder: 'WO2506-001',
      },
    ],
  },
  {
    groupTitle: 'Haul Truck HT-007',
    siteBranch: 'Jakarta',
    department: 'Operations',
    section: 'Section 4',
    element: 'PM',
    rows: [
      {
        id: 6,
        assetNo: 'HL001',
        requestNo: 'PM2306-008',
        stockcode: 'PM Service 250',
        status: 'P#1',
        leadTime: '1',
        planStartDate: '2025-06-11',
        planStartTime: '12:00:00',
        planFinishDate: '2025-06-12',
        planFinishTime: '12:00:00',
        requestedBy: 'Wong Tiara',
        date: '2025-05-16',
        duration: '20',
        comment: 'PM at Bay Shop',
		workOrder: 'WO2506-001',
      },
	  {
        id: 7,
        assetNo: 'HL002',
        requestNo: 'PM2306-009',
        stockcode: 'PM Service 250',
        status: 'P#2',
        leadTime: '3',
        planStartDate: '2025-06-16',
        planStartTime: '12:00:00',
        planFinishDate: '2025-06-24',
        planFinishTime: '12:00:00',
        requestedBy: 'Wong Tiara',
        date: '2025-05-20',
        duration: '30',
        comment: 'PM at Pushback #20',
		workOrder: 'WO2506-002',
      },
    ],
  },
  {
    groupTitle: 'Haul Truck HTZ08',
    siteBranch: 'Jakarta',
    department: 'Operations',
    section: 'Section 2',
    element: 'PM',
    rows: [
      {
        id: 8,
        assetNo: 'HL003',
        requestNo: 'PM2306-010',
        stockcode: 'PM Service 500',
        status: 'P#1',
        leadTime: '2',
        planStartDate: '2025-06-11',
        planStartTime: '12:00:00',
        planFinishDate: '2025-06-12',
        planFinishTime: '12:00:00',
        requestedBy: 'Wong Tiara',
        date: '2025-05-16',
        duration: '10',
        comment: 'PM at Bay Shop',
		workOrder: 'WO2506-003',
      },
	  {
        id: 9,
        assetNo: 'HL004',
        requestNo: 'PM2306-011',
        stockcode: 'PM Service 2000',
        status: 'P#2',
        leadTime: '1',
        planStartDate: '2025-06-16',
        planStartTime: '12:00:00',
        planFinishDate: '2025-06-24',
        planFinishTime: '12:00:00',
        requestedBy: 'Wong Tiara',
        date: '2025-05-20',
        duration: '45',
        comment: 'PM at Pushback #20',
		workOrder: 'WO2506-004',
      },
    ],
  },
]

export const PMUpdateTab: React.FC = () => {
  const [updateData, setUpdateData] = useState<PMGroup[]>([])
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setFetchError(null)

        // For now, use fallback dummy data
        console.log('Using fallback dummy data for PMUpdateTab')
        setUpdateData(fallbackDummyGroups)
      } catch (err) {
        console.error('Failed to fetch PM data:', err)
        setFetchError('Failed to load PM data. Using fallback.')
        setUpdateData(fallbackDummyGroups)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const totalRows = useMemo(() => updateData.reduce((sum, g) => sum + (g.rows?.length || 0), 0), [updateData])

  const updateCell = (gIdx: number, rIdx: number, patch: Partial<PMRow>) => {
    setUpdateData((prev) => {
      const copy = prev.map((g) => ({ ...g, rows: g.rows.map((r) => ({ ...r })) }))
      if (!copy[gIdx]) return prev
      if (!copy[gIdx].rows[rIdx]) return prev
      copy[gIdx].rows[rIdx] = { ...copy[gIdx].rows[rIdx], ...patch }
      return copy
    })
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    setSubmitMessage(null)
    try {
      // TODO: send updateData to real API
      console.log('Submitting PM updates:', updateData)
      await new Promise((r) => setTimeout(r, 800))
      setSubmitMessage({ type: 'success', text: 'PM updates submitted (mock).' })
    } catch (err) {
      console.error(err)
      setSubmitMessage({ type: 'error', text: 'Submission failed.' })
    } finally {
      setSubmitting(false)
    }
  }

  const handleCancel = () => {
    setSubmitMessage(null)
    setUpdateData((prev) => prev.map((g) => ({
      ...g,
      rows: g.rows.map((r) => ({
        ...r,
        currentDateTime: '',
        currentQty: undefined,
        currentReading: undefined,
        currentDescription: '',
        currentPriority: '',
        currentLeadTime: '',
        currentPlanStartDate: '',
        currentPlanStartTime: '',
        currentPlanFinishDate: '',
        currentPlanFinishTime: '',
        currentRemarks: '',
        currentDuration: '',
        currentWorkOrder: '',
      })),
    })))
    console.log('PM update cancelled, cleared inputs')
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
      <h5 className="fw-bold mb-3">PM Update All</h5>
      <div className="mb-3 small text-muted">
        Ready to submit <strong>{totalRows}</strong> row{totalRows !== 1 ? 's' : ''} from <strong>{updateData?.length ?? 0}</strong> group{(updateData?.length ?? 0) !== 1 ? 's' : ''}.
        {fetchError && <div className="text-warning mt-1">{fetchError}</div>}
      </div>

      <div className="table-responsive border rounded p-3 mb-3">
        <table className="table table-rounded border table-row-bordered align-middle gs-4 gy-2 gx-3">
          <thead>
            <tr className="fw-bold bg-secondary">
              <th style={{ width: '3%', padding: '6px 4px' }}>No.</th>
              <th style={{ width: '18%', padding: '6px 4px' }}>PM No. - Description</th>
              <th style={{ width: '9%', padding: '6px 4px' }}>Asset No.</th>
              <th style={{ width: '7%', padding: '6px 4px' }}>Priority</th>
              <th style={{ width: '7%', padding: '6px 4px' }}>Lead Time</th>
              <th style={{ width: '12%', padding: '6px 4px' }}>Plan Start Date Time</th>
              <th style={{ width: '12%', padding: '6px 4px' }}>Plan Finish Date Time</th>
              <th style={{ width: '10%', padding: '6px 4px' }}>Comments</th>
              <th style={{ width: '8%', padding: '6px 4px' }}>Last Done</th>
              <th style={{ width: '6%', padding: '6px 4px' }}>Duration</th>
              <th style={{ width: '8%', padding: '6px 4px' }}>Work Order</th>
            </tr>
          </thead>
          <tbody>
            {updateData?.length === 0 ? (
              <tr>
                <td colSpan={12} className="text-center text-muted py-6">No data available</td>
              </tr>
            ) : (
              updateData.map((g, gIdx) => (
                <React.Fragment key={g.groupTitle}>
                  <tr style={{ backgroundColor: '#3f4254', color: '#fff' }}>
                    <td colSpan={12} className="fw-semibold">{g.groupTitle}</td>
                  </tr>
                  {g.rows.map((r, rIdx) => (
                    <tr key={r.id}>
                      <td>{rIdx + 1}</td>
                      <td>{r.requestNo} - 
                        <input 
                          type="text" 
                          className="form-control form-control-sm" 
                          placeholder="Description" 
                          value={r.currentDescription || ''} 
                          onChange={(e) => updateCell(gIdx, rIdx, { currentDescription: e.target.value })}
                        />
                      </td>
                      <td>{r.assetNo}</td>
                      <td>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          placeholder="Priority"
                          value={r.currentPriority || ''}
                          onChange={(e) => updateCell(gIdx, rIdx, { currentPriority: e.target.value })}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          placeholder="Lead Time"
                          value={r.currentLeadTime || ''}
                          onChange={(e) => updateCell(gIdx, rIdx, { currentLeadTime: e.target.value })}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          placeholder="YYYY-MM-DD HH:MM:SS"
                          value={r.currentPlanStartDate || ''}
                          onChange={(e) => updateCell(gIdx, rIdx, { currentPlanStartDate: e.target.value })}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          placeholder="YYYY-MM-DD HH:MM:SS"
                          value={r.currentPlanFinishDate || ''}
                          onChange={(e) => updateCell(gIdx, rIdx, { currentPlanFinishDate: e.target.value })}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          placeholder="Comments"
                          value={r.currentRemarks || ''}
                          onChange={(e) => updateCell(gIdx, rIdx, { currentRemarks: e.target.value })}
                        />
                      </td>
                      <td>{r.date}</td>
                      <td>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          placeholder="Duration"
                          value={r.currentDuration || ''}
                          onChange={(e) => updateCell(gIdx, rIdx, { currentDuration: e.target.value })}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          placeholder="Work Order"
                          value={r.currentWorkOrder || ''}
                          onChange={(e) => updateCell(gIdx, rIdx, { currentWorkOrder: e.target.value })}
                        />
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>

      {submitMessage && (
        <div className={`alert alert-${submitMessage.type === 'success' ? 'info' : 'danger'} mb-3`}>
          {submitMessage.text}
        </div>
      )}

      <div className="d-flex justify-content-end gap-2">
        <Button variant="outline-secondary" onClick={handleCancel} disabled={submitting}>Cancel</Button>
        <Button variant="success" onClick={handleSubmit} disabled={submitting || totalRows === 0}>{submitting ? 'Submitting...' : 'Submit'}</Button>
      </div>
    </div>
  )
}

export default PMUpdateTab
