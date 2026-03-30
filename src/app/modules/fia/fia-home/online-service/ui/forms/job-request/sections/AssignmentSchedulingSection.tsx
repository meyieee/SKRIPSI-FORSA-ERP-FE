import React from 'react'
import { AssignmentScheduling, getDateOptions } from '../../../../core/job-request'
import FormSection from '../../common/components/FormSection'
import FormSelect from '../../common/components/FormSelect'
import FormTextarea from '../../common/components/FormTextarea'

type AssignmentSchedulingSectionProps = {
  values: AssignmentScheduling
  setFieldValue: (field: string, value: any) => void
  getWorkOrderStatusOptions: () => Array<{ value: string; label: string }>
  getWorkOrderClosureOptions: () => Array<{ value: string; label: string }>
  assignedToOptions: Array<{ value: string; label: string }>
}

export default function AssignmentSchedulingSection({
  values,
  setFieldValue,
  getWorkOrderStatusOptions,
  getWorkOrderClosureOptions,
  assignedToOptions,
}: AssignmentSchedulingSectionProps) {
  return (
    <FormSection title='Assignment & Scheduling'>
      <div className='row'>
        <div className='col-md-4'>
          <FormSelect
            label='Assigned To'
            name='assignment.assignedTo'
            value={values.assignedTo}
            onChange={(value) => setFieldValue('assignment.assignedTo', value)}
            options={assignedToOptions}
            placeholder='[combo]'
          />
        </div>
        <div className='col-md-4'>
          <FormSelect
            label='Work Order Status'
            name='assignment.workorderStatus'
            value={values.workorderStatus}
            onChange={(value) => setFieldValue('assignment.workorderStatus', value)}
            options={getWorkOrderStatusOptions()}
          />
        </div>
        <div className='col-md-4'>
          <FormSelect
            label='Work Order Closure'
            name='assignment.workorderClosure'
            value={values.workorderClosure}
            onChange={(value) => setFieldValue('assignment.workorderClosure', value)}
            options={getWorkOrderClosureOptions()}
          />
        </div>
      </div>
      <div className='row'>
        <div className='col-md-4'>
          <FormSelect
            label='Schedule Start Date'
            name='assignment.scheduleStartDate'
            value={values.scheduleStartDate}
            onChange={(value) => setFieldValue('assignment.scheduleStartDate', value)}
            options={getDateOptions()}
            placeholder='[combo]'
          />
        </div>
        <div className='col-md-4'>
          <FormSelect
            label='Actual Start Date'
            name='assignment.actualStartDate'
            value={values.actualStartDate}
            onChange={(value) => setFieldValue('assignment.actualStartDate', value)}
            options={getDateOptions()}
            placeholder='[combo]'
          />
        </div>
        <div className='col-md-4'>
          <FormSelect
            label='Completion Date'
            name='assignment.completionDate'
            value={values.completionDate}
            onChange={(value) => setFieldValue('assignment.completionDate', value)}
            options={getDateOptions()}
            placeholder='[combo]'
          />
        </div>
      </div>
      <div className='row'>
        <div className='col-md-6'>
          <FormSelect
            label='Actual Completion Date'
            name='assignment.actualCompletionDate'
            value={values.actualCompletionDate}
            onChange={(value) => setFieldValue('assignment.actualCompletionDate', value)}
            options={getDateOptions()}
            placeholder='[combo]'
          />
        </div>
        <div className='col-md-6'>
          <FormTextarea
            label='Additional Comments'
            name='assignment.additionalComments'
            value={values.additionalComments}
            onChange={(value) => setFieldValue('assignment.additionalComments', value)}
            rows={2}
            placeholder='[text input]'
          />
        </div>
      </div>
    </FormSection>
  )
}

