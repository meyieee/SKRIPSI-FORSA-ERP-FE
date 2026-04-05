import React from 'react'
import { InspectionRequestInfo } from '../../../../core/inspection-defect'
import { UserModel } from '../../../../../../../../modules/auth'
import FormSection from '../../common/components/FormSection'
import FormField from '../../common/components/FormField'
import FormSelect from '../../common/components/FormSelect'
import FormTextarea from '../../common/components/FormTextarea'
import EmployeeSearchTypeahead from '../../common/components/EmployeeSearchTypeahead'
import FormFileUpload from '../../common/components/FormFileUpload'

type RequestInfoSectionProps = {
  values: InspectionRequestInfo
  setFieldValue: (field: string, value: any) => void
  getRequestPurposeOptions: () => Array<{ value: string; label: string }>
  getPriorityOptions: () => Array<{ value: string; label: string }>
  getBranchSiteOptions: () => Array<{ value: string; label: string }>
  getLocationOptions: () => Array<{ value: string; label: string }>
  getDepartmentOptions: () => Array<{ value: string; label: string }>
  currentUser?: UserModel | null
}

export default function RequestInfoSection({
  values,
  setFieldValue,
  getRequestPurposeOptions,
  getPriorityOptions,
  getBranchSiteOptions,
  getLocationOptions,
  getDepartmentOptions,
  currentUser,
}: RequestInfoSectionProps) {
  // Helper untuk mendapatkan name/username dari current user untuk display
  const getCurrentUserName = (): string => {
    if (!currentUser) return values.requestBy || ''
    
    // Prioritas: name > username > fullname > first_name + last_name > id_number
    if (currentUser.name) return currentUser.name
    if (currentUser.username) return currentUser.username
    if (currentUser.fullname) return currentUser.fullname
    if (currentUser.first_name || currentUser.last_name) {
      return `${currentUser.first_name || ''} ${currentUser.last_name || ''}`.trim()
    }
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
          />
        </div>
        <div className='col-md-4'>
          <FormSelect
            label='Branch|Site'
            name='requestInfo.branchSite'
            value={values.branchSite}
            onChange={(value) => setFieldValue('requestInfo.branchSite', value)}
            options={getBranchSiteOptions()}
          />
        </div>
      </div>

      <div className='row'>
        <div className='col-md-4'>
          <FormSelect
            label='Department'
            name='requestInfo.department'
            value={values.department}
            onChange={(value) => setFieldValue('requestInfo.department', value)}
            options={getDepartmentOptions()}
          />
        </div>
        <div className='col-md-4'>
          <FormField
            label='Cost Center'
            name='requestInfo.costCenter'
            value={values.costCenter}
            onChange={(value) => setFieldValue('requestInfo.costCenter', value)}
            placeholder='[combo]'
          />
        </div>
        <div className='col-md-4'>
          <FormSelect
            label='Location'
            name='requestInfo.location'
            value={values.location}
            onChange={(value) => setFieldValue('requestInfo.location', value)}
            options={getLocationOptions()}
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
            placeholder='[text input]'
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
            placeholder='[text input]'
          />
        </div>
        <div className='col-md-4'>
          <FormTextarea
            label='Comment|Remark|Note'
            name='requestInfo.commentRemarkNote'
            value={values.commentRemarkNote}
            onChange={(value) => setFieldValue('requestInfo.commentRemarkNote', value)}
            rows={2}
            placeholder='[text input]'
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
            placeholder='[text input]'
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