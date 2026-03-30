import React from 'react'
import { KTSVG } from '../../../../../../../../_metronic'
import { OnlineReminder } from './types'

type Props = {
  reminders: OnlineReminder[]
  onView?: (reminder: OnlineReminder) => void
}

const OnlineReminderTable: React.FC<Props> = ({ reminders, onView }) => {
  const handleView = (reminder: OnlineReminder) => {
    if (onView) {
      onView(reminder)
    }
  }

  const total = reminders.length

  return (
    <div>
      {/* Title */}
      <div className='mb-3'>
        <h3 className='fw-bold fs-3 mb-0'>ONLINE REMINDER CONTROL</h3>
      </div>

      {/* ===== Table ===== */}
      <div className='table-responsive'>
        <table className='table table-hover table-rounded border table-row-bordered table-row-gray-300 align-middle gs-4 gy-1 gx-3'>
          <thead>
            <tr className='fw-bold align-middle bg-secondary'>
              <th className='min-w-30px'>No</th>
              <th className='min-w-120px'>Doc No</th>
              <th className='min-w-250px'>Title</th>
              <th className='min-w-150px'>Person Incharge</th>
              <th className='min-w-120px'>Actual Due</th>
              <th className='min-w-120px'>Will Due</th>
              <th className='min-w-120px'>Notification</th>
              <th className='min-w-100px text-end py-3'>Action</th>
            </tr>
          </thead>
          <tbody className='text-gray-800'>
            {reminders.length === 0 ? (
              <tr>
                <td colSpan={8} className='text-center text-muted py-10'>
                  No data found for current filters.
                </td>
              </tr>
            ) : (
              reminders.map((reminder) => (
                <tr key={reminder.id}>
                  <td>{reminder.no}</td>
                  <td>{reminder.docNo}</td>
                  <td>{reminder.title}</td>
                  <td>{reminder.personIncharge}</td>
                  <td>{reminder.actualDue}</td>
                  <td>{reminder.willDue || '-'}</td>
                  <td>
                    {reminder.notification ? (
                      <span className='text-danger fw-semibold'>{reminder.notification}</span>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td className='text-end'>
                    {onView && (
                      <button
                        type='button'
                        className='btn btn-sm btn-link btn-color-dark btn-active-color-primary me-1'
                        onClick={() => handleView(reminder)}
                      >
                        <KTSVG
                          path='/media/icons/duotune/general/gen004.svg'
                          className='svg-icon-3'
                        />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className='small text-muted mt-2'>
        Showing <span className='fw-semibold'>{total}</span> record{total !== 1 ? 's' : ''}
      </div>
    </div>
  )
}

export default OnlineReminderTable

