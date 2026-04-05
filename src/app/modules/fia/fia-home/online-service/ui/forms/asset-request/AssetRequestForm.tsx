import React, { useState } from 'react'
import { Formik, Form } from 'formik'
import { useQueryClient } from '@tanstack/react-query'
import { OnlineCategoryKey } from '../../../registry'
import { UseReactQuery } from '../../../../../../../functions/reactQuery'
import { cache_assetrequest_new, cache_assetrequest_list } from '../../../../../../../constans/CachesName'
import { useAuth } from '../../../../../../../modules/auth'
import { 
  getAssetRequestNew,
  postAssetRequest,
  saveAssetRequestDraft,
  validateAssetRequestAll,
  getRequestPurposeOptions,
  getPriorityOptions,
  getBranchSiteOptions,
  getLocationOptions,
  getDepartmentOptions,
  getAssetTypeOptions,
  AssetRequestForm as AssetRequestFormType,
} from '../../../core/asset-request'
import HeaderSection from '../common/sections/HeaderSection'
import {
  FormLoadingState,
  SuccessModal,
  ErrorModal,
  DraftSavedModal
} from '../common/components'
import { useFormNotification } from '../common/hooks'
import RequestInfoSection from './sections/RequestInfoSection'
import AssetDetailsSection from './sections/AssetDetailsSection'
import './AssetRequestForm.scss'

type Props = {
  cat: OnlineCategoryKey
  type: string
}

function AssetRequestForm({ cat, type }: Props) {
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

  // Use React Query to fetch asset request form data
  const { data, isLoading: loading, error: queryError } = UseReactQuery<AssetRequestFormType>({
    func: () => getAssetRequestNew(),
    cacheName: cache_assetrequest_new,
    enabled: true,
  })

  // Handle form submission
  const onSubmit = async (values: AssetRequestFormType, actions: any) => {
    const errs = validateAssetRequestAll(values)
    if (errs.length) {
      showErrorModal(errs.join('\n'))
      return
    }
    try {
      setSubmitting(true)
      const res = await postAssetRequest(values)
      
      // Invalidate cache after successful submission
      queryClient.invalidateQueries({ queryKey: [cache_assetrequest_list] })
      queryClient.invalidateQueries({ queryKey: [cache_assetrequest_new] })
      
      // Show success modal dengan requestId dan refRequestNo
      showSuccessModal(
        res.message || 'Asset request submitted successfully!',
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
  const onSave = async (values: AssetRequestFormType) => {
    if (!values) return
    try {
      await saveAssetRequestDraft(cat, type, values)
      showDraftSavedModal()
    } catch (e: any) {
      showErrorModal(e.message || 'Save failed')
    }
  }

  // Handle cancel
  const onCancel = async () => {
    try {
      // Reset form by refetching data
      queryClient.invalidateQueries({ queryKey: [cache_assetrequest_new] })
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
            Failed to load asset request form: {String(queryError)}
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
            Failed to load asset request form data for {cat} - {type}
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
                  <h3 className='card-title mb-2'>ASSET REQUEST FORM</h3>
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
                        currentUser={currentUser}
                      />

                      <AssetDetailsSection
                        values={formProps.values.assetDetails}
                        setFieldValue={formProps.setFieldValue}
                        getAssetTypeOptions={getAssetTypeOptions}
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

export default AssetRequestForm