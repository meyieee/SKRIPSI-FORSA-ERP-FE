import React from 'react'
import { InspectionRequestInfo } from '../../../../core/inspection-defect'
import { UserModel } from '../../../../../../../../modules/auth'
import FormSection from '../../common/components/FormSection'
import FormField from '../../common/components/FormField'
import FormSelect from '../../common/components/FormSelect'
import FormTextarea from '../../common/components/FormTextarea'
import EmployeeSearchTypeahead from '../../common/components/EmployeeSearchTypeahead'
import FormFileUpload from '../../common/components/FormFileUpload'
import OrgLockedOrManualField from '../../common/components/OrgLockedOrManualField'
import { useOrgMasterOptions, useRequestForOrganizationSync } from '../../common/hooks'

type RequestInfoSectionProps = {
  values: InspectionRequestInfo
  setFieldValue: (field: string, value: any) => void
  getRequestPurposeOptions: () => Array<{ value: string; label: string }>
  getPriorityOptions: () => Array<{ value: string; label: string }>
  branchSiteOptions: Array<{ value: string; label: string }>
  getLocationOptions: () => Array<{ value: string; label: string }>
  getDepartmentOptions: () => Array<{ value: string; label: string }>
  currentUser?: UserModel | null
}

export default function RequestInfoSection({
  values,
  setFieldValue,
  getRequestPurposeOptions,
  getPriorityOptions,
  branchSiteOptions,
  getLocationOptions,
  getDepartmentOptions,
  currentUser,
}: RequestInfoSectionProps) {
  const orgSync = useRequestForOrganizationSync(values.requestFor, setFieldValue)
  const { departmentOptions } = useOrgMasterOptions(values.department)

  // Helper untuk mendapatkan nama lengkap current user untuk display
  const getCurrentUserName = (): string => {
    if (!currentUser) return values.requestBy || ''
    if (currentUser.display_name) return currentUser.display_name
    if (currentUser.fullname) return currentUser.fullname
    if (currentUser['employees.first_name'] || currentUser['employees.last_name']) {
      return `${currentUser['employees.first_name'] || ''} ${currentUser['employees.middle_name'] || ''} ${currentUser['employees.last_name'] || ''}`.replace(/\s+/g, ' ').trim()
    }
    if (currentUser.first_name || currentUser.last_name) {
      return `${currentUser.first_name || ''} ${currentUser.last_name || ''}`.trim()
    }
    if (currentUser.name) return currentUser.name
    if (currentUser.username) return currentUser.username
    if (currentUser.id_number) return currentUser.id_number
    return values.requestBy || ''
  }

  return (
    <FormSection title='Request Information'>
      <div className='row'>
        <div className='col-md-4'>
          <FormField
            label='Request Date'
            name='requestInfo.requestDate'
            value={values.requestDate}
            onChange={(value) => setFieldValue('requestInfo.requestDate', value)}
            type='date'
            required
          />
        </div>
        <div className='col-md-4'>
          {/* Request By - Read-only, auto-filled dengan current user (name/username) */}
          <FormField
            label='Request By'
            name='requestInfo.requestBy'
            value={getCurrentUserName()}
            onChange={(value) => setFieldValue('requestInfo.requestBy', value)}
            placeholder='(name / member)'
            required
            readOnly={true}
          />
        </div>
        <div className='col-md-4'>
          <EmployeeSearchTypeahead
            label='Request For'
            name='requestInfo.requestFor'
            value={values.requestFor}
            onChange={(id) => setFieldValue('requestInfo.requestFor', id)}
            currentUser={currentUser}
          />
          {orgSync.orgError && (
            <div className='small text-danger mt-1'>{orgSync.orgError}</div>
          )}
        </div>
      </div>

      <div className='row'>
        <div className='col-md-4'>
          <FormSelect
            label='Request Purpose'
            name='requestInfo.requestPurpose'
            value={values.requestPurpose}
            onChange={(value) => setFieldValue('requestInfo.requestPurpose', value)}
            options={getRequestPurposeOptions()}
            required
          />
        </div>
        <div className='col-md-4'>
          <FormSelect
            label='Priority'
            name='requestInfo.priority'
            value={values.priority}
            onChange={(value) => setFieldValue('requestInfo.priority', value)}
            options={getPriorityOptions()}
            required
          />
        </div>
      </div>

      <div className='row'>
        <div className='col-md-4'>
          <FormTextarea
            label='Request Description'
            name='requestInfo.requestDescription'
            value={values.requestDescription}
            onChange={(value) => setFieldValue('requestInfo.requestDescription', value)}
            rows={2}
            placeholder='Enter request description'
            required
          />
        </div>
        <div className='col-md-4'>
          <FormTextarea
            label='Justification'
            name='requestInfo.justification'
            value={values.justification}
            onChange={(value) => setFieldValue('requestInfo.justification', value)}
            rows={2}
            placeholder='Enter justification'
          />
        </div>
        <div className='col-md-4'>
          <FormTextarea
            label='Comment|Remark|Note'
            name='requestInfo.commentRemarkNote'
            value={values.commentRemarkNote}
            onChange={(value) => setFieldValue('requestInfo.commentRemarkNote', value)}
            rows={2}
            placeholder='Enter comment, remark, or note'
          />
        </div>
      </div>

      <div className='row'>
        <div className='col-md-4'>
          <FormTextarea
            label='Additional Comments|R|N|Information'
            name='requestInfo.additionalComments'
            value={values.additionalComments}
            onChange={(value) => setFieldValue('requestInfo.additionalComments', value)}
            rows={2}
            placeholder='Enter additional comments or information'
          />
        </div>
        <div className='col-md-4'>
          <FormField
            label='Relevant Docs'
            name='requestInfo.relevantDocs'
            value={values.relevantDocs}
            onChange={(value) => setFieldValue('requestInfo.relevantDocs', value)}
            placeholder='insert your link google drive'
          />
        </div>
        <div className='col-md-4'>
          <FormField
            label='Relevant Docs Second'
            name='requestInfo.relevantDocsSecond'
            value={values.relevantDocsSecond}
            onChange={(value) => setFieldValue('requestInfo.relevantDocsSecond', value)}
            placeholder='insert your link google drive'
          />
        </div>
      </div>
    </FormSection>
  )
}
