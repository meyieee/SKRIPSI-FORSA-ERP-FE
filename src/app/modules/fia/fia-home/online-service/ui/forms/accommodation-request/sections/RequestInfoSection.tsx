import React from 'react'
import { AccommodationRequestInfo } from '../../../../core/accommodation-request'
import { UserModel } from '../../../../../../../../modules/auth'
import FormSection from '../../common/components/FormSection'
import FormField from '../../common/components/FormField'
import FormSelect from '../../common/components/FormSelect'
import FormTextarea from '../../common/components/FormTextarea'
import EmployeeSearchTypeahead from '../../common/components/EmployeeSearchTypeahead'
import OrgLockedOrManualField from '../../common/components/OrgLockedOrManualField'
import { useRequestForOrganizationSync } from '../../common/hooks'

type RequestInfoSectionProps = {
  values: AccommodationRequestInfo
  setFieldValue: (field: string, value: any) => void
  getRequestPurposeOptions: () => Array<{ value: string; label: string }>
  getPriorityOptions: () => Array<{ value: string; label: string }>
  branchSiteOptions: Array<{ value: string; label: string }>
  getLocationOptions: () => Array<{ value: string; label: string }>
  currentUser?: UserModel | null
}

export default function RequestInfoSection({
  values,
  setFieldValue,
  getRequestPurposeOptions,
  getPriorityOptions,
  branchSiteOptions,
  getLocationOptions,
  currentUser,
}: RequestInfoSectionProps) {
  const orgSync = useRequestForOrganizationSync(values.requestFor, setFieldValue)

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
          />
        </div>
        <div className='col-md-4'>
          <OrgLockedOrManualField
            orgReadOnly={orgSync.orgReadOnly}
            displayValue={orgSync.displayBranchSite}
            label='Branch|Site'
            name='requestInfo.branchSite'
            manual={
              <FormSelect
                label='Branch|Site'
                name='requestInfo.branchSite'
                value={values.branchSite}
                onChange={(value) => setFieldValue('requestInfo.branchSite', value)}
                options={branchSiteOptions}
              />
            }
          />
        </div>
      </div>

      <div className='row'>
        <div className='col-md-4'>
          <OrgLockedOrManualField
            orgReadOnly={orgSync.orgReadOnly}
            displayValue={orgSync.displayDepartment}
            label='Department'
            name='requestInfo.department'
            manual={
              <FormField
                label='Department'
                name='requestInfo.department'
                value={values.department}
                onChange={(value) => setFieldValue('requestInfo.department', value)}
                placeholder='Enter department'
              />
            }
          />
        </div>
        <div className='col-md-4'>
          <OrgLockedOrManualField
            orgReadOnly={orgSync.orgReadOnly}
            displayValue={orgSync.displayCostCenter}
            label='Cost Center'
            name='requestInfo.costCenter'
            manual={
              <FormField
                label='Cost Center'
                name='requestInfo.costCenter'
                value={values.costCenter}
                onChange={(value) => setFieldValue('requestInfo.costCenter', value)}
                placeholder='Enter cost center'
              />
            }
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
            placeholder='Enter request description'
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
            rows={1}
            placeholder='Enter additional comments or information'
          />
        </div>
          <div className='col-md-4'>
          <FormField
            label='Relevant Docs'
            name='requestInfo.relevantDocs'
            value={values.relevantDocs}
            onChange={(value) => setFieldValue('requestInfo.relevantDocs', value)}
            placeholder='[file input]'
          />
        </div>
        <div className='col-md-4'>
          <FormField
            label='Relevant Docs Second'
            name='requestInfo.relevantDocsSecond'
            value={values.relevantDocsSecond}
            onChange={(value) => setFieldValue('requestInfo.relevantDocsSecond', value)}
            placeholder='[file input]'
          />
        </div>
      </div>
    </FormSection>
  )
}



