import React, { useState, useEffect } from 'react'
import { Formik, Form } from 'formik'
import { useQueryClient } from '@tanstack/react-query'
import { OnlineCategoryKey } from '../../../registry'
import { UseReactQuery } from '../../../../../../../functions/reactQuery'
import { cache_fleetrequest_new, cache_fleetrequest_list } from '../../../../../../../constans/CachesName'
import { useAuth } from '../../../../../../../modules/auth'
import {
  getFleetRequestNew,
  postFleetRequest,
  saveFleetRequestDraft,
  validateFleetRequestAll,
  getRequestPurposeOptions,
  getPriorityOptions,
  getBranchSiteOptions,
  getLocationOptions,
  getDepartmentOptions,
  getFleetTypeOptions,
  getNumberOfUnitsOptions,
  getSpecificationsOptions,
  getFleetLocationOptions,
  getReasonForTransferOptions,
  FleetForm as FleetFormType,
} from '../../../core/fleet-request'
import HeaderSection from '../common/sections/HeaderSection'
import {
  FormLoadingState,
  SuccessModal,
  ErrorModal,
  DraftSavedModal
} from '../common/components'
import { useFormNotification } from '../common/hooks'
import RequestInfoSection from './sections/RequestInfoSection'
import FleetDetailsSection from './sections/FleetDetailsSection'
import TransferDetailsSection from './sections/TransferDetailsSection'
import './FleetRequestForm.scss'

type Props = {
  cat: OnlineCategoryKey
  type: string
}

function FleetRequestForm({ cat, type }: Props) {
  const queryClient = useQueryClient()
  const [submitting, setSubmitting] = useState(false)
  const { currentUser } = useAuth()
  
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

  // Use React Query to fetch fleet request form data
  const { data, isLoading: loading, error: queryError } = UseReactQuery<FleetFormType>({
    func: () => getFleetRequestNew(),
    cacheName: cache_fleetrequest_new,
    enabled: true,
  })

  // State for async options
  const [branchSiteOptions, setBranchSiteOptions] = useState<Array<{ value: string; label: string }>>([])
  const [locationOptions, setLocationOptions] = useState<Array<{ value: string; label: string }>>([])
  const [departmentOptions, setDepartmentOptions] = useState<Array<{ value: string; label: string }>>([])
  const [fleetLocationOptions, setFleetLocationOptions] = useState<Array<{ value: string; label: string }>>([])
  const [optionsLoading, setOptionsLoading] = useState(true)

  // Fetch all async options on component mount
  useEffect(() => {
    const fetchOptions = async () => {
      setOptionsLoading(true)
      try {
        const [branches, locations, departments, fleetLocations] = await Promise.all([
          getBranchSiteOptions(),
          getLocationOptions(),
          getDepartmentOptions(),
          getFleetLocationOptions(),
        ])

        setBranchSiteOptions(branches)
        setLocationOptions(locations)
        setDepartmentOptions(departments)
        setFleetLocationOptions(fleetLocations)
      } catch (error) {
        console.error('Error fetching options:', error)
      } finally {
        setOptionsLoading(false)
      }
    }

    fetchOptions()
  }, [])

  // Handle form submission
  const onSubmit = async (values: FleetFormType, actions: any) => {
    const errs = validateFleetRequestAll(values)
    if (errs.length) {
      showErrorModal(errs.join('\n'))
      return
    }
    try {
      setSubmitting(true)
      const res = await postFleetRequest(values)
      
      // Invalidate cache after successful submission
      queryClient.invalidateQueries({ queryKey: [cache_fleetrequest_list] })
      queryClient.invalidateQueries({ queryKey: [cache_fleetrequest_new] })
      
      // Show success modal dengan requestId dan refRequestNo
      showSuccessModal(
        res.message || 'Fleet request submitted successfully!',
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
  const onSave = async (values: FleetFormType) => {
    if (!values) return
    try {
      await saveFleetRequestDraft(cat, type, values)
      showDraftSavedModal()
    } catch (e: any) {
      showErrorModal(e.message || 'Save failed')
    }
  }

  // Handle cancel
  const onCancel = async () => {
    try {
      // Reset form by refetching data
      queryClient.invalidateQueries({ queryKey: [cache_fleetrequest_new] })
    } catch (e: any) {
      showErrorModal(e.message || 'Reset failed')
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
            Failed to load fleet request form: {String(queryError)}
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
            Failed to load fleet request form data for {cat} - {type}
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
          // requestBy: current user; requestFor: dari API/draft saja (kosong = user pilih typeahead)
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
                <h3 className='card-title mb-2'>NEW OR TRANSFER FLEET REQUEST FORM</h3>
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
                      branchSiteOptions={branchSiteOptions}
                      locationOptions={locationOptions}
                      departmentOptions={departmentOptions}
                      currentUser={currentUser}
                    />

                    <FleetDetailsSection
                      values={formProps.values.fleetDetails}
                      setFieldValue={formProps.setFieldValue}
                      getFleetTypeOptions={getFleetTypeOptions}
                      getNumberOfUnitsOptions={getNumberOfUnitsOptions}
                      getSpecificationsOptions={getSpecificationsOptions}
                    />

                    <TransferDetailsSection
                      values={formProps.values.transferDetails}
                      setFieldValue={formProps.setFieldValue}
                      fleetLocationOptions={fleetLocationOptions}
                      getReasonForTransferOptions={getReasonForTransferOptions}
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

export default FleetRequestForm
