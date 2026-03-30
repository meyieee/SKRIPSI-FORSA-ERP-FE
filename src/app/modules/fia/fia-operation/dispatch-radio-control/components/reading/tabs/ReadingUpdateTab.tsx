import React, {useState, useMemo, useEffect} from 'react'
import {Button} from 'react-bootstrap'

type MeterRow = {
  id: number
  assetNo: string
  type: string
  averageUsing: string
  date: string
  time: string
  enteredReading: number
  increment: number
  accumReading: number
  status: string
  // optional fields used in UpdateTab
  currentDateTime?: string
  currentReading?: number
  lastDateTime?: string
}

type MeterGroup = {
  groupTitle: string
  siteBranch: string
  department: string
  section: string
  element: string
  rows: MeterRow[]
}

// Fallback dummy data (used if API not available)
const fallbackDummyGroups: MeterGroup[] = [
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
        averageUsing: '#DIV/0!',
        date: '2025-09-20',
        time: '0:00:00',
        enteredReading: 3000,
        increment: 20,
        accumReading: 3000,
        status: 'Continue',
      },
      {
        id: 2,
        assetNo: 'DD002',
        type: 'Hours',
        averageUsing: '0',
        date: '2025-09-20',
        time: '0:00:00',
        enteredReading: 2000,
        increment: 20,
        accumReading: 2000,
        status: 'Continue',
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
        averageUsing: '#DIV/0!',
        date: '2025-09-20',
        time: '0:00:00',
        enteredReading: 3030,
        increment: 15,
        accumReading: 3030,
        status: 'Continue',
      },
      {
        id: 4,
        assetNo: 'EXA002',
        type: 'Hours',
        averageUsing: '0',
        date: '2025-09-20',
        time: '0:00:00',
        enteredReading: 1500,
        increment: 15,
        accumReading: 1500,
        status: 'Continue',
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
        averageUsing: '0',
        date: '2025-09-20',
        time: '0:00:00',
        enteredReading: 4040,
        increment: 24,
        accumReading: 4040,
        status: 'Continue',
      },
    ],
  },
  {
    groupTitle: 'Haul Truck HTZ07',
    siteBranch: 'Surabaya',
    department: 'Hauling',
    section: 'Section 4',
    element: 'Km',
    rows: [
      {
        id: 6,
        assetNo: 'HL001',
        type: 'Km',
        averageUsing: '#DIV/0!',
        date: '2025-09-20',
        time: '0:00:00',
        enteredReading: 3030,
        increment: 20,
        accumReading: 3030,
        status: 'Continue',
      },
      {
        id: 7,
        assetNo: 'HL002',
        type: 'Km',
        averageUsing: '0',
        date: '2025-09-20',
        time: '0:00:00',
        enteredReading: 1500,
        increment: 20,
        accumReading: 1500,
        status: 'Continue',
      },
    ],
  },
  {
    groupTitle: 'Haul Truck HTZ08',
    siteBranch: 'Surabaya',
    department: 'Hauling',
    section: 'Section 5',
    element: 'Km',
    rows: [
      {
        id: 8,
        assetNo: 'HL003',
        type: 'Km',
        averageUsing: '#DIV/0!',
        date: '2025-09-20',
        time: '0:00:00',
        enteredReading: 2026,
        increment: 20,
        accumReading: 2026,
        status: 'Continue',
      },
      {
        id: 9,
        assetNo: 'HL004',
        type: 'Km',
        averageUsing: '0',
        date: '2025-09-20',
        time: '0:00:00',
        enteredReading: 3500,
        increment: 20,
        accumReading: 3500,
        status: 'Continue',
      },
    ],
  },
]

export const ReadingUpdateTab: React.FC = () => {
  const [updateData, setUpdateData] = useState<MeterGroup[]>([])
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [submitMessage, setSubmitMessage] = useState<{type: 'success' | 'error'; text: string} | null>(null)
  const [submitting, setSubmitting] = useState(false)

  // Fetch meter data from API on component mount
  useEffect(() => {
    const fetchMeterData = async () => {
      try {
        setLoading(true)
        setFetchError(null)
        
        // TODO: Replace with actual API endpoint once backend is ready
        // Example: const response = await fetch('/api/meter-readings')
        // const data = await response.json()
        // setUpdateData(data)
        
        // For now, use fallback dummy data
        console.log('Using fallback dummy data for UpdateTab (API not yet implemented)')
        setUpdateData(fallbackDummyGroups)
      } catch (err) {
        console.error('Failed to fetch meter data:', err)
        setFetchError('Failed to load data. Using fallback.')
        setUpdateData(fallbackDummyGroups)
      } finally {
        setLoading(false)
      }
    }

    fetchMeterData()
  }, [])

  const totalRows = useMemo(
    () => updateData.reduce((sum, g) => sum + (g.rows?.length || 0), 0),
    [updateData]
  )

  const updateCell = (gIdx: number, rIdx: number, patch: Partial<MeterRow>) => {
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
      // Example: await fetch('/api/meter-updates', { method: 'POST', body: JSON.stringify(updateData) })
      console.log('Submitting all updates:', updateData)
      await new Promise((r) => setTimeout(r, 800))
      setSubmitMessage({type: 'success', text: 'All updates submitted successfully (mock).'})
    } catch (err) {
      console.error(err)
      setSubmitMessage({type: 'error', text: 'Submission failed. See console for details.'})
    } finally {
      setSubmitting(false)
    }
  }

  const handleCancel = () => {
    setSubmitMessage(null)
    // Clear any user-entered values in editable fields (currentReading, lastDateTime)
    setUpdateData((prev) =>
      prev.map((g) => ({
        ...g,
        rows: g.rows.map((r) => ({
          ...r,
          currentReading: undefined,
          lastDateTime: '',
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
      <h5 className="fw-bold mb-3">Update All</h5>
      <div className="mb-3 small text-muted">
        Ready to submit <strong>{totalRows}</strong> row{totalRows !== 1 ? 's' : ''} from{' '}
        <strong>{updateData?.length ?? 0}</strong> group{(updateData?.length ?? 0) !== 1 ? 's' : ''}.
        {fetchError && <div className="text-warning mt-1">{fetchError}</div>}
      </div>

      {/* Data preview table - follow MeterReadingTab columns per request */}
      <div className="table-responsive border rounded p-3 mb-3">
        <table className="table table-rounded border table-row-bordered align-middle gs-4 gy-2 gx-3">
          <thead>
            <tr className="fw-bold bg-secondary">
              <th style={{width: 35, minWidth: 35}}>No.</th>
              <th style={{width: 120, minWidth: 120}}>Asset No</th>
              <th style={{width: 90, minWidth: 90}}>Type</th>
              <th style={{width: 120, minWidth: 120}}>Reading Status</th>
              <th style={{width: 140, minWidth: 140}}>Current Date / Time</th>
              <th style={{width: 140, minWidth: 140}}>Current Reading</th>
              <th style={{width: 180, minWidth: 180}}>Last Date / Time</th>
              <th style={{width: 120, minWidth: 120}}>Last Reading</th>
              <th style={{width: 140, minWidth: 140}}>Cummulative</th>
            </tr>
          </thead>
          <tbody>
            {updateData?.length === 0 ? (
              <tr>
                <td colSpan={9} className="text-center text-muted py-6">
                  No data available
                </td>
              </tr>
            ) : (
              updateData.map((g, gIdx) => (
                <React.Fragment key={g.groupTitle}>
                  <tr style={{backgroundColor: '#3f4254', color: '#fff'}}>
                    <td colSpan={9} className="fw-semibold">
                      {g.groupTitle}
                    </td>
                  </tr>
                  {g.rows.map((r, rIdx) => (
                    <tr key={r.id}>
                      <td>{rIdx + 1}</td>
                      <td>{r.assetNo}</td>
                      <td>Hours</td>
                      <td>{r.status}</td>
                      <td>
                        {((r as any).currentDateTime
                          ? String((r as any).currentDateTime).replace('T', ' ')
                          : `${r.date} ${r.time}`)}
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          value={(r as any).currentReading ?? ''}
                          onChange={(e) => updateCell(gIdx, rIdx, {currentReading: Number(e.target.value)} as any)}
                        />
                      </td>
                      <td>
                        <input
                          type="datetime-local"
                          className="form-control form-control-sm"
                          value={(r as any).lastDateTime ?? ''}
                          onChange={(e) => updateCell(gIdx, rIdx, {lastDateTime: e.target.value} as any)}
                        />
                      </td>
                      <td>{r.enteredReading}</td>
                      <td>{r.accumReading}</td>
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

export default ReadingUpdateTab
