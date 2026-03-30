import React from 'react'
import { getSupervisorOptions } from '../../../../core/asset-request'
import FormSection from '../../common/components/FormSection'
import FormSelect from '../../common/components/FormSelect'

type ApprovalsSectionProps = {
  values: {
    immediateSupervisor: string
    departmentHead: string
    relatedManager: string
  }
  setFieldValue: (field: string, value: any) => void
}

export default function ApprovalsSection({ values, setFieldValue }: ApprovalsSectionProps) {
  return (
    <FormSection title='Approvals'>
      <div className='row'>
        <div className='col-md-4'>
          <FormSelect
            label='Immediate Supervisor'
            name='approvals.immediateSupervisor'
            options={getSupervisorOptions()}
            value={values.immediateSupervisor}
            onChange={(value: string) => setFieldValue('approvals.immediateSupervisor', value)}
          />
        </div>
        <div className='col-md-4'>
          <FormSelect
            label='Department Head'
            name='approvals.departmentHead'
            value={values.departmentHead}
            onChange={(value: string) => setFieldValue('approvals.departmentHead', value)}
            options={getSupervisorOptions()}
          />
        </div>
        <div className='col-md-4'>
          <FormSelect
            label='Related Manager'
            name='approvals.relatedManager'
            value={values.relatedManager}
            onChange={(value) => setFieldValue('approvals.relatedManager', value)}
            options={getSupervisorOptions()}
          />
        </div>
      </div>
    </FormSection>
  )
}

