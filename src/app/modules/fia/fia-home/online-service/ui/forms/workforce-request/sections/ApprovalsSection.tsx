import React from 'react'
import { WorkforceApprovals } from '../../../../core/workforce-request'
import FormSection from '../../common/components/FormSection'
import FormSelect from '../../common/components/FormSelect'
import FormField from '../../common/components/FormField'

type ApprovalsSectionProps = {
  values: WorkforceApprovals
  setFieldValue: (field: string, value: any) => void
  getSupervisorOptions: () => Array<{ value: string; label: string }>
}

export default function ApprovalsSection({
  values,
  setFieldValue,
  getSupervisorOptions,
}: ApprovalsSectionProps) {
  return (
    <FormSection title='Approvals'>
      <div className='row'>
        <div className='col-md-4'>
          <FormSelect
            label='Immediate Supervisor'
            name='approvals.immediateSupervisor'
            value={values.immediateSupervisor}
            onChange={(value) => setFieldValue('approvals.immediateSupervisor', value)}
            options={getSupervisorOptions()}
          />
        </div>
        <div className='col-md-4'>
          <FormField
            label='Department Head'
            name='approvals.departmentHead'
            value={values.departmentHead}
            onChange={(value) => setFieldValue('approvals.departmentHead', value)}
            placeholder='[code - description]'
          />
        </div>
        <div className='col-md-4'>
          <FormField
            label='Human Resource'
            name='approvals.humanResource'
            value={values.humanResource}
            onChange={(value) => setFieldValue('approvals.humanResource', value)}
            placeholder='[text input]'
          />
        </div>
      </div>
    </FormSection>
  )
}




