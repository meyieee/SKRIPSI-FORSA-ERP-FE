import React from 'react'
import { DefectDetail } from '../../../../core/inspection-defect'

type DefectDetailRowProps = {
  defect: DefectDetail
  index: number
  onUpdate: (index: number, field: keyof DefectDetail, value: any) => void
  onRemove: (index: number) => void
  getConditionOptions: () => Array<{ value: string; label: string }>
  getCategoryOptions: () => Array<{ value: string; label: string }>
  getActionTakenOptions: () => Array<{ value: string; label: string }>
  getResultOptions: () => Array<{ value: string; label: string }>
  getStatusOptions: () => Array<{ value: string; label: string }>
  canRemove: boolean
}

export default function DefectDetailRow({
  defect,
  index,
  onUpdate,
  onRemove,
  getConditionOptions,
  getCategoryOptions,
  getActionTakenOptions,
  getResultOptions,
  getStatusOptions,
  canRemove,
}: DefectDetailRowProps) {
  return (
    <tr>
      <td className='text-center'>{defect.no}</td>
      <td>
        <textarea
          className='form-control form-control-sm'
          rows={1}
          value={defect.defectDescription}
          onChange={(e) => onUpdate(index, 'defectDescription', e.target.value)}
          placeholder='Describe the defect...'
        />
      </td>
      <td>
        <select
          className='form-select form-select-sm'
          value={defect.condition}
          onChange={(e) => onUpdate(index, 'condition', e.target.value)}
        >
          {getConditionOptions().map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </td>
      <td>
        <select
          className='form-select form-select-sm'
          value={defect.category}
          onChange={(e) => onUpdate(index, 'category', e.target.value)}
        >
          {getCategoryOptions().map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </td>
      <td>
        <input
          type='text'
          className='form-control form-control-sm'
          value={defect.recommendedAction}
          onChange={(e) => onUpdate(index, 'recommendedAction', e.target.value)}
          placeholder='Recommended action...'
        />
      </td>
      <td>
        <input
          type='text'
          className='form-control form-control-sm'
          value={defect.assignedTo}
          onChange={(e) => onUpdate(index, 'assignedTo', e.target.value)}
          placeholder='Assign to...'
        />
      </td>
      <td>
        <input
          type='date'
          className='form-control form-control-sm'
          value={defect.dueDate}
          onChange={(e) => onUpdate(index, 'dueDate', e.target.value)}
        />
      </td>
      <td>
        <select
          className='form-select form-select-sm'
          value={defect.actionTaken}
          onChange={(e) => onUpdate(index, 'actionTaken', e.target.value)}
        >
          {getActionTakenOptions().map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </td>
      <td>
        <select
          className='form-select form-select-sm'
          value={defect.result}
          onChange={(e) => onUpdate(index, 'result', e.target.value)}
        >
          {getResultOptions().map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </td>
      <td>
        <select
          className='form-select form-select-sm'
          value={defect.status}
          onChange={(e) => onUpdate(index, 'status', e.target.value)}
        >
          {getStatusOptions().map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </td>
      <td>
        {canRemove && (
          <button
            type='button'
            className='btn btn-danger btn-sm'
            onClick={() => onRemove(index)}
          >
            Remove
          </button>
        )}
      </td>
    </tr>
  )
}

