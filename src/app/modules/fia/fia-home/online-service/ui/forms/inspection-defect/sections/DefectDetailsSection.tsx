import React from 'react'
import { DefectDetail } from '../../../../core/inspection-defect'
import FormSection from '../../common/components/FormSection'
import DefectDetailRow from './DefectDetailRow'

type DefectDetailsSectionProps = {
  values: DefectDetail[]
  setFieldValue: (field: string, value: any) => void
  getConditionOptions: () => Array<{ value: string; label: string }>
  getCategoryOptions: () => Array<{ value: string; label: string }>
  getActionTakenOptions: () => Array<{ value: string; label: string }>
  getResultOptions: () => Array<{ value: string; label: string }>
  getStatusOptions: () => Array<{ value: string; label: string }>
}

export default function DefectDetailsSection({
  values,
  setFieldValue,
  getConditionOptions,
  getCategoryOptions,
  getActionTakenOptions,
  getResultOptions,
  getStatusOptions,
}: DefectDetailsSectionProps) {
  // Fallback untuk values jika undefined atau empty
  const safeValues = values || []
  
  const updateDefect = (index: number, field: keyof DefectDetail, value: any) => {
    const newDefects = [...safeValues]
    newDefects[index] = { ...newDefects[index], [field]: value }
    setFieldValue('defectDetails', newDefects)
  }

  const addDefect = () => {
    const newDefect: DefectDetail = {
      id: Date.now().toString(),
      no: safeValues.length + 1,
      defectDescription: '',
      condition: 'Good' as const,
      category: 'Mechanical' as const,
      recommendedAction: '',
      assignedTo: '',
      dueDate: '',
      actionTaken: 'None' as const,
      result: 'Pass' as const,
      status: 'Open' as const,
    }
    setFieldValue('defectDetails', [...safeValues, newDefect])
  }

  const removeDefect = (index: number) => {
    const newDefects = safeValues.filter((_, i) => i !== index)
    // Re-index all defects
    newDefects.forEach((defect, i) => {
      defect.no = i + 1
    })
    setFieldValue('defectDetails', newDefects)
  }
  
  // Jika tidak ada defect, tambahkan satu default
  if (safeValues.length === 0) {
    const defaultDefect: DefectDetail = {
      id: '1',
      no: 1,
      defectDescription: '',
      condition: 'Good' as const,
      category: 'Mechanical' as const,
      recommendedAction: '',
      assignedTo: '',
      dueDate: '',
      actionTaken: 'None' as const,
      result: 'Pass' as const,
      status: 'Open' as const,
    }
    setFieldValue('defectDetails', [defaultDefect])
    return null // Return null untuk prevent render sebelum state update
  }

  return (
    <FormSection title='Inspection | Defect Details'>
      <div className='d-flex justify-content-between align-items-center mb-3'>
        <div></div>
        <button
          type='button'
          className='btn btn-primary btn-sm'
          onClick={addDefect}
        >
          <i className='fas fa-plus me-2'></i>
          Add Row
        </button>
      </div>

      <div className='table-responsive'>
        <table className='table table-bordered defect-details-table'>
          <thead className='table-light'>
            <tr>
              <th style={{ width: '50px' }}>No</th>
              <th style={{ width: '200px' }}>Defect Description</th>
              <th style={{ width: '100px' }}>Condition</th>
              <th style={{ width: '120px' }}>Category</th>
              <th style={{ width: '180px' }}>Recommended Action</th>
              <th style={{ width: '150px' }}>Assigned To</th>
              <th style={{ width: '90px' }}>Due Date</th>
              <th style={{ width: '150px' }}>Action Taken</th>
              <th style={{ width: '120px' }}>Result</th>
              <th style={{ width: '120px' }}>Status</th>
              <th style={{ width: '100px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {safeValues.map((defect, index) => (
              <DefectDetailRow
                key={defect.id}
                defect={defect}
                index={index}
                onUpdate={updateDefect}
                onRemove={removeDefect}
                getConditionOptions={getConditionOptions}
                getCategoryOptions={getCategoryOptions}
                getActionTakenOptions={getActionTakenOptions}
                getResultOptions={getResultOptions}
                getStatusOptions={getStatusOptions}
                canRemove={safeValues.length > 1}
              />
            ))}
          </tbody>
        </table>
      </div>
    </FormSection>
  )
}

