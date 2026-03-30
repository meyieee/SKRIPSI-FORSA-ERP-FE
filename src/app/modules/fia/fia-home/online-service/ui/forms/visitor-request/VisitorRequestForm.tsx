import React, { useState, useEffect } from 'react'
import { Formik, Form } from 'formik'
import { useQueryClient } from '@tanstack/react-query'
import { OnlineCategoryKey } from '../../../registry'
import { UseReactQuery } from '../../../../../../../functions/reactQuery'
import { cache_visitorrequest_new, cache_visitorrequest_list } from '../../../../../../../constans/CachesName'
import { useAuth } from '../../../../../../../modules/auth'
import { 
  getVisitorRequestNew,
  postVisitorRequest,
  saveVisitorRequestDraft,
  validateVisitorRequest,
  getRequestPurposeOptions,
  getPriorityOptions,
  getBranchSiteOptions,
  getLocationOptions,
  getDepartmentOptions,
  getClearanceTypeOptions,
  getMeetingRoomOptions,
  getTimeOptions,
  getYesNoOptions,
  getDurationOptions,
  getUserOptions,
  VisitorRequestForm as VisitorRequestFormType,
} from '../../../core/visitor-request'
import HeaderSection from '../common/sections/HeaderSection'
import {
  FormLoadingState,
  SuccessModal,
  ErrorModal,
  DraftSavedModal
} from '../common/components'
import { useFormNotification } from '../common/hooks'
import RequestInfoSection from './sections/RequestInfoSection'
import VisitorDetailsSection from './sections/VisitorDetailsSection'
import VisitDetailsSection from './sections/VisitDetailsSection'
import HostDetailsSection from './sections/HostDetailsSection'
import SecurityClearanceSection from './sections/SecurityClearanceSection'
import SpecialRequirementsSection from './sections/SpecialRequirementsSection'
import VisitorRegistrationSection from './sections/VisitorRegistrationSection'
import './VisitorRequestForm.scss'

type Props = {
  cat: OnlineCategoryKey
  type: string
}

function VisitorRequestForm({ cat, type }: Props) {
  const queryClient = useQueryClient()
  const [submitting, setSubmitting] = useState(false)
  const { currentUser } = useAuth()
  
  // State untuk employee options
  const [employeeOptions, setEmployeeOptions] = useState<Array<{ value: string; label: string }>>([])
  const [optionsLoading, setOptionsLoading] = useState(true)
  
  // Use form notification hook for modals
  const {
    showSuccess,
    showError,
    showDraftSaved,
    successMessage,
    errorMessage,
    errorDetails,
    successRequestId,
    successRefRequestNo,
    showSuccessModal,
    showErrorModal,
    showDraftSavedModal,
    closeAllModals
  } = useFormNotification()

  // Use React Query to fetch visitor request form data
  const { data, isLoading: loading, error: queryError } = UseReactQuery<VisitorRequestFormType>({
    func: () => getVisitorRequestNew(),
    cacheName: cache_visitorrequest_new,
    enabled: true,
  })

  // Fetch employee options on component mount
  useEffect(() => {
    const fetchEmployeeOptions = async () => {
      setOptionsLoading(true)
      try {
        const employees = await getUserOptions()
        setEmployeeOptions(employees)
      } catch (error) {
        console.error('Error fetching employee options:', error)
      } finally {
        setOptionsLoading(false)
      }
    }
    
    fetchEmployeeOptions()
  }, [])

  // Handle form submission
  const onSubmit = async (values: VisitorRequestFormType, actions: any) => {
    const errs = validateVisitorRequest(values)
    if (errs.length) {
      showErrorModal(errs.join('\n'))
      return
    }
    try {
      setSubmitting(true)
      const res = await postVisitorRequest(values)
      
      // Invalidate cache after successful submission
      queryClient.invalidateQueries({ queryKey: [cache_visitorrequest_list] })
      queryClient.invalidateQueries({ queryKey: [cache_visitorrequest_new] })
      
      // Show success modal dengan requestId dan refRequestNo
      showSuccessModal(
        res.message || 'Visitor request submitted successfully!',
        res.data?.header?.requestId,
        res.data?.header?.refRequestNo
      )
      
      // Update form with response data to show generated IDs
      if (res.data) {
        actions.setValues(res.data)
      }
    } catch (e: any) {
      const errorMessage = e.response?.data?.message || e.message || 'Submit failed'
      const errorDetails = e.response?.data?.error || e.stack
      showErrorModal(errorMessage, errorDetails)
    } finally {
      setSubmitting(false)
    }
  }

  // Handle save draft
  const onSave = async (values: VisitorRequestFormType) => {
    if (!values) return
    try {
      await saveVisitorRequestDraft(cat, type, values)
      showDraftSavedModal()
    } catch (e: any) {
      showErrorModal(e.message || 'Save failed')
    }
  }

  // Handle cancel
  const onCancel = async () => {
    try {
      // Reset form by refetching data
      queryClient.invalidateQueries({ queryKey: [cache_visitorrequest_new] })
    } catch (e: any) {
      showErrorModal(e.message || 'Reset failed')
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="card">
        <div className="card-body">
          <FormLoadingState 
            message={`Loading ${type} form...`} 
            fullScreen={false}
          />
        </div>
      </div>
    )
  }

  if (queryError) {
    return (
      <div className="card">
        <div className="card-body">
          <div className='alert alert-danger'>
            Failed to load visitor request form: {String(queryError)}
          </div>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="card">
        <div className="card-body">
          <div className='alert alert-danger'>
            Failed to load visitor request form data for {cat} - {type}
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Modals */}
      <SuccessModal
        show={showSuccess}
        onClose={closeAllModals}
        message={successMessage}
        requestId={successRequestId}
        refRequestNo={successRefRequestNo}
        autoClose={true}
        autoCloseDelay={3000}
      />
      <ErrorModal
        show={showError}
        onClose={closeAllModals}
        message={errorMessage}
        errorDetails={errorDetails}
      />
      <DraftSavedModal
        show={showDraftSaved}
        onClose={closeAllModals}
        autoClose={true}
        autoCloseDelay={2000}
      />

      <div className='card'>
        <Formik 
          initialValues={(() => {
            // Set initial values dengan current user untuk requestBy dan requestFor
            if (data && currentUser) {
              const currentUserId = currentUser.id_number || currentUser.id?.toString() || ''
              return {
                ...data,
                requestInfo: {
                  ...data.requestInfo,
                  requestBy: currentUserId || data.requestInfo.requestBy || '',
                  requestFor: currentUserId || data.requestInfo.requestFor || '',
                }
              }
            }
            return data
          })()}
          onSubmit={onSubmit}
          enableReinitialize={true}
        >
          {(formProps) => (
            <>
              <div className='card-header d-flex justify-content-between align-items-center'>
                <div>
                  <h3 className='card-title mb-2'>VISITOR REQUEST FORM</h3>
                  <HeaderSection
                    requestId={formProps.values.header.requestId}
                    requestType={formProps.values.header.requestType}
                    refRequestNo={formProps.values.header.refRequestNo}
                  />
                </div>
                <div className='d-flex gap-2'>
                  <button className='btn btn-success' onClick={() => onSubmit(formProps.values, formProps)} disabled={submitting}>SUBMIT</button>
                  <button className='btn btn-secondary' onClick={onCancel} disabled={submitting}>CANCEL</button>
                  <button className='btn btn-primary' onClick={() => onSave(formProps.values)} disabled={submitting}>SAVE</button>
                </div>
              </div>
              <div className='card-body'>
                <div className='row'>
                  <div className='col-12'>
                    <Form className='w-100'>
                      <RequestInfoSection
                        values={formProps.values.requestInfo}
                        setFieldValue={formProps.setFieldValue}
                        getRequestPurposeOptions={getRequestPurposeOptions}
                        getPriorityOptions={getPriorityOptions}
                        getBranchSiteOptions={getBranchSiteOptions}
                        getLocationOptions={getLocationOptions}
                        getDepartmentOptions={getDepartmentOptions}
                        employeeOptions={employeeOptions}
                        currentUser={currentUser}
                      />

                      <VisitorDetailsSection
                        values={formProps.values.visitorDetails}
                        setFieldValue={formProps.setFieldValue}
                      />

                      <VisitDetailsSection
                        values={formProps.values.visitDetails}
                        setFieldValue={formProps.setFieldValue}
                        getTimeOptions={getTimeOptions}
                        getDurationOptions={getDurationOptions}
                      />

                      <HostDetailsSection
                        values={formProps.values.hostDetails}
                        setFieldValue={formProps.setFieldValue}
                        getDepartmentOptions={getDepartmentOptions}
                      />

                      <SecurityClearanceSection
                        values={formProps.values.securityClearance}
                        setFieldValue={formProps.setFieldValue}
                        getYesNoOptions={getYesNoOptions}
                        getClearanceTypeOptions={getClearanceTypeOptions}
                      />

                      <SpecialRequirementsSection
                        values={formProps.values.specialRequirements}
                        setFieldValue={formProps.setFieldValue}
                        getMeetingRoomOptions={getMeetingRoomOptions}
                      />

                      <VisitorRegistrationSection
                        values={formProps.values.visitorRegistration}
                        setFieldValue={formProps.setFieldValue}
                        getTimeOptions={getTimeOptions}
                      />
                    </Form>
                  </div>
                </div>
              </div>
            </>
          )}
        </Formik>
      </div>
    </>
  )
}

export default VisitorRequestForm
