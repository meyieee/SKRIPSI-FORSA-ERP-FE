import React from 'react'
import {AssetRow} from '../../dummy'
import {tasksDummy, TaskRow} from './dummy'

type Props = {asset?: AssetRow | null}

const TasksTab: React.FC<Props> = ({asset}) => {
  const rows: TaskRow[] | undefined = asset?.assetNo ? tasksDummy[asset.assetNo] : undefined

  const priorityBadge = (priority: string) => {
    const p = String(priority || '')
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '') // bisa dengan penulisan "P1" / "P#1"
    let cls = 'badge bg-secondary'
    if (p === 'p1' || p === 'p#1') cls = 'badge bg-danger'
    else if (p === 'p2' || p === 'p#2') cls = 'badge bg-warning'
    else if (p === 'p3' || p === 'p#3') cls = 'badge bg-success'
    return <span className={`${cls}`}>{String(priority).toUpperCase()}</span>
  }

  return (
    <div className='table-responsive'>
      <table className='table table-hover table-rounded border table-row-bordered table-row-gray-300 align-middle gs-4 gy-3 gx-3'>
        <thead>
          <tr className='fw-bold bg-secondary'>
            <th>No</th>
            <th>Tasks No</th>
            <th>DateTime</th>
            <th>Task Description</th>
            <th>Inspector</th>
            <th>Condition</th>
            <th>Priority</th>
            <th>Plan Start</th>
            <th>Completed</th>
          </tr>
        </thead>

        <tbody className='text-gray-800'>
          {rows && rows.length > 0 ? (
            rows.map((r, idx) => (
              <tr key={idx}>
                <td>{r.no}</td>
                <td>{r.tasksNo}</td>
                <td>{r.dateTime}</td>
                <td>{r.description}</td>
                <td>{r.inspector}</td>
                <td>{r.condition}</td>
                <td>{priorityBadge(r.priority)}</td>
                <td>{r.planStart}</td>
                <td>{r.completed}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={9} className='text-center text-muted py-10'>
                No data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default TasksTab
