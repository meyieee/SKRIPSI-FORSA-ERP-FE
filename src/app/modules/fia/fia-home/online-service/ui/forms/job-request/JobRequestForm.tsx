import React, { useState, useEffect } from 'react'
import { Formik, Form } from 'formik'
import { useQueryClient } from '@tanstack/react-query'
import { OnlineCategoryKey } from '../../../registry'
import { UseReactQuery } from '../../../../../../../functions/reactQuery'
import { cache_jobrequest_new, cache_jobrequest_list } from '../../../../../../../constans/CachesName'
import { useAuth } from '../../../../../../../modules/auth'
import {
  getJobRequestNew,
  postJobRequest,
  validateJobRequestAll,
  getRequestPurposeOptions,
  getPriorityOptions,
  getBranchSiteOptions,
  getLocationOptions,
  getDepartmentOptions,
  getCostCenterOptions,
  getJobTypeOptions,
  getWorkOrderStatusOptions,
  getWorkOrderClosureOptions,
  getAssignedToOptions,
  getAssetEquipmentOptions,
  JobRequestForm as JobRequestFormType,
} from '../../../core/job-request'
import HeaderSection from '../common/sections/HeaderSection'
import {
  FormLoadingState,
  SuccessModal,
  ErrorModal,
} from '../common/components'
import { useFormNotification } from '../common/hooks'
import RequestInfoSection from './sections/RequestInfoSection'
import JobOrderDetailsSection from './sections/JobOrderDetailsSection'
import WorkRequirementsSection from './sections/WorkRequirementsSection'
import AssignmentSchedulingSection from './sections/AssignmentSchedulingSection'
import './JobRequestForm.scss'

type Props = {
  cat: OnlineCategoryKey
  type: string
}

function JobRequestForm({ cat, type }: Props) {
  const queryClient = useQueryClient()
  const [submitting, setSubmitting] = useState(false)
  const { currentUser } = useAuth()
  
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

  // Use React Query to fetch job request form data
  const { data, isLoading: loading, error: queryError } = UseReactQuery<JobRequestFormType>({
    func: () => getJobRequestNew(),
    cacheName: cache_jobrequest_new,
    enabled: true,
  })

  // State for async options
  const [branchSiteOptions, setBranchSiteOptions] = useState<Array<{ value: string; label: string }>>([])
  const [locationOptions, setLocationOptions] = useState<Array<{ value: string; label: string }>>([])
  const [departmentOptions, setDepartmentOptions] = useState<Array<{ value: string; label: string }>>([])
  const [costCenterOptions, setCostCenterOptions] = useState<Array<{ value: string; label: string }>>([])
  const [assignedToOptions, setAssignedToOptions] = useState<Array<{ value: string; label: string }>>([])
  const [assetEquipmentOptions, setAssetEquipmentOptions] = useState<Array<{ value: string; label: string }>>([])
  const [optionsLoading, setOptionsLoading] = useState(true)

  // Fetch all async options on component mount
  useEffect(() => {
    const fetchOptions = async () => {
      setOptionsLoading(true)
      try {
        const [branches, locations, departments, costCenters, employees, assets] = await Promise.all([
          getBranchSiteOptions(),
          getLocationOptions(),
          getDepartmentOptions(),
          getCostCenterOptions(),
          getAssignedToOptions(),
          getAssetEquipmentOptions(),
        ])

        setBranchSiteOptions(branches)
        setLocationOptions(locations)
        setDepartmentOptions(departments)
        setCostCenterOptions(costCenters)
        setAssignedToOptions(employees)
        setAssetEquipmentOptions(assets)
      } catch (error) {
        console.error('Error fetching options:', error)
      } finally {
        setOptionsLoading(false)
      }
    }

    fetchOptions()
  }, [])

  // Handle form submission
  const onSubmit = async (values: JobRequestFormType, actions: any) => {
    const errs = validateJobRequestAll(values)
    if (errs.length) {
      showErrorModal(errs.join('\n'))
      return
    }
    try {
      setSubmitting(true)
      const res = await postJobRequest(values)
      
      // Invalidate cache after successful submission
      queryClient.invalidateQueries({ queryKey: [cache_jobrequest_list] })
      queryClient.invalidateQueries({ queryKey: [cache_jobrequest_new] })
      
      // Show success modal dengan requestId dan refRequestNo
      showSuccessModal(
        res.message || 'Job request submitted successfully!',
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
  if (loading || optionsLoading) {
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
            Failed to load job request form: {String(queryError)}
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
            Failed to load job request form data for {cat} - {type}
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
                <h3 className='card-title mb-2'>CREATE JOB REQUEST</h3>
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
                      locationOptions={locationOptions}
                      departmentOptions={departmentOptions}
                      costCenterOptions={costCenterOptions}
                      currentUser={currentUser}
                    />

                    <JobOrderDetailsSection
                      values={formProps.values.jobOrder}
                      setFieldValue={formProps.setFieldValue}
                      getJobTypeOptions={getJobTypeOptions}
                      locationOptions={locationOptions}
                      assetEquipmentOptions={assetEquipmentOptions}
                    />

                    <WorkRequirementsSection
                      values={formProps.values.workRequirements}
                      setFieldValue={formProps.setFieldValue}
                    />

                    <AssignmentSchedulingSection
                      values={formProps.values.assignment}
                      setFieldValue={formProps.setFieldValue}
                      getWorkOrderStatusOptions={getWorkOrderStatusOptions}
                      getWorkOrderClosureOptions={getWorkOrderClosureOptions}
                      assignedToOptions={assignedToOptions}
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

export default JobRequestForm
