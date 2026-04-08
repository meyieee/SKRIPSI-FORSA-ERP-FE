import React, { useState, useEffect } from 'react'
import { Formik, Form } from 'formik'
import { useQueryClient } from '@tanstack/react-query'
import { OnlineCategoryKey } from '../../../registry'
import { UseReactQuery } from '../../../../../../../functions/reactQuery'
import { cache_workforcerequest_new, cache_workforcerequest_list } from '../../../../../../../constans/CachesName'
import { useAuth } from '../../../../../../../modules/auth'
import { 
  getWorkforceRequestNew,
  postWorkforceRequest,
  validateWorkforceRequestAll,
  getRequestPurposeOptions,
  getPriorityOptions,
  getBranchSiteOptions,
  getLocationOptions,
  getDepartmentOptions,
  getEmploymentTypeOptions,
  getShiftOptions,
  WorkforceRequestForm as WorkforceRequestFormType,
} from '../../../core/workforce-request'
import HeaderSection from '../common/sections/HeaderSection'
import {
  FormLoadingState,
  SuccessModal,
  ErrorModal,
} from '../common/components'
import { useFormNotification } from '../common/hooks'
import RequestInfoSection from './sections/RequestInfoSection'
import WorkforceSpecsSection from './sections/WorkforceSpecsSection'
import JobRequirementsSection from './sections/JobRequirementsSection'
import './WorkforceRequestForm.scss'

type Props = {
  cat: OnlineCategoryKey
  type: string
}

function WorkforceRequestForm({ cat, type }: Props) {
  const queryClient = useQueryClient()
  const [submitting, setSubmitting] = useState(false)
  const [branchSiteOptions, setBranchSiteOptions] = useState<
    Array<{ value: string; label: string }>
  >([])
  const { currentUser } = useAuth()

  useEffect(() => {
    const load = async () => {
      try {
        const opts = await getBranchSiteOptions()
        setBranchSiteOptions(opts)
      } catch (e) {
        console.error(e)
      }
    }
    void load()
  }, [])
  
  // Use form notification hook for modals
  const {
    showSuccess,
    showError,
    successMessage,
    errorMessage,
    errorDetails,
    successRequestId,
    successRefRequestNo,
    showSuccessModal,
    showErrorModal,
    closeAllModals
  } = useFormNotification()

  // Use React Query to fetch workforce request form data
  const { data, isLoading: loading, error: queryError } = UseReactQuery<WorkforceRequestFormType>({
    func: () => getWorkforceRequestNew(),
    cacheName: cache_workforcerequest_new,
    enabled: true,
  })

  // Handle form submission
  const onSubmit = async (values: WorkforceRequestFormType, actions: any) => {
    const errs = validateWorkforceRequestAll(values)
    if (errs.length) {
      showErrorModal(errs.join('\n'))
      return
    }
    try {
      setSubmitting(true)
      const res = await postWorkforceRequest(values)
      
      // Invalidate cache after successful submission
      queryClient.invalidateQueries({ queryKey: [cache_workforcerequest_list] })
      queryClient.invalidateQueries({ queryKey: [cache_workforcerequest_new] })
      
      // Show success modal dengan requestId dan refRequestNo
      showSuccessModal(
        res.message || 'Workforce request submitted successfully!',
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
            Failed to load workforce request form: {String(queryError)}
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
            Failed to load workforce request form data for {cat} - {type}
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

      <div className='card'>
        <Formik 
          initialValues={(() => {
            // requestBy: current user; requestFor: dari API (kosong = user pilih typeahead)
            if (data && currentUser) {
              const currentUserId = currentUser.id_number || currentUser.id?.toString() || ''
              return {
                ...data,
                requestInfo: {
                  ...data.requestInfo,
                  requestBy: currentUserId || data.requestInfo.requestBy || '',
                  requestFor: data.requestInfo.requestFor || '',
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
                  <h3 className='card-title mb-2'>WORKFORCE REQUEST FORM</h3>
                  <HeaderSection
                    requestId={formProps.values.header.requestId}
                    requestType={formProps.values.header.requestType}
                    refRequestNo={formProps.values.header.refRequestNo}
                  />
                </div>
                <div className='d-flex gap-2'>
                  <button className='btn btn-success' onClick={() => onSubmit(formProps.values, formProps)} disabled={submitting}>SUBMIT</button>
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
                        branchSiteOptions={branchSiteOptions}
                        getLocationOptions={getLocationOptions}
                        getDepartmentOptions={getDepartmentOptions}
                        currentUser={currentUser}
                      />

                      <WorkforceSpecsSection
                        values={formProps.values.workforceSpecs}
                        setFieldValue={formProps.setFieldValue}
                        getEmploymentTypeOptions={getEmploymentTypeOptions}
                        getShiftOptions={getShiftOptions}
                      />

                      <JobRequirementsSection
                        values={formProps.values.jobRequirements}
                        setFieldValue={formProps.setFieldValue}
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

export default WorkforceRequestForm
