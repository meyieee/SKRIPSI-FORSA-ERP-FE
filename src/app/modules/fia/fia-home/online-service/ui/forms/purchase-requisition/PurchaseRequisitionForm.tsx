import React, { useState, useEffect } from 'react'
import { Formik, Form } from 'formik'
import { useQueryClient } from '@tanstack/react-query'
import { OnlineCategoryKey } from '../../../registry'
import { UseReactQuery } from '../../../../../../../functions/reactQuery'
import { cache_purchaserequisition_new, cache_purchaserequisition_list } from '../../../../../../../constans/CachesName'
import { useAuth } from '../../../../../../../modules/auth'
import { 
  getPurchaseRequisitionNew,
  postPurchaseRequisition,
  validatePurchaseRequisition,
  getRequestPurposeOptions,
  getPriorityOptions,
  getBranchSiteOptions,
  getLocationOptions,
  getDepartmentOptions,
  getCostCenterOptions,
  PurchaseRequisitionForm as PurchaseRequisitionFormType,
} from '../../../core/purchase-requisition'
import HeaderSection from '../common/sections/HeaderSection'
import {
  FormLoadingState,
  SuccessModal,
  ErrorModal,
} from '../common/components'
import { useFormNotification } from '../common/hooks'
import RequestInfoSection from './sections/RequestInfoSection'
import RequisitionInformationSection from './sections/RequisitionInformationSection'
import './PurchaseRequisitionForm.scss'

type Props = {
  cat: OnlineCategoryKey
  type: string
}

function PurchaseRequisitionForm({ cat, type }: Props) {
  const queryClient = useQueryClient()
  const [submitting, setSubmitting] = useState(false)
  const { currentUser } = useAuth()
  
  // State for async options
  const [branchSiteOptions, setBranchSiteOptions] = useState<Array<{ value: string; label: string }>>([])
  const [locationOptions, setLocationOptions] = useState<Array<{ value: string; label: string }>>([])
  const [departmentOptions, setDepartmentOptions] = useState<Array<{ value: string; label: string }>>([])
  const [costCenterOptions, setCostCenterOptions] = useState<Array<{ value: string; label: string }>>([])
  
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

  // Use React Query to fetch purchase requisition form data
  const { data, isLoading: loading, error: queryError } = UseReactQuery<PurchaseRequisitionFormType>({
    func: () => getPurchaseRequisitionNew(),
    cacheName: cache_purchaserequisition_new,
    enabled: true,
  })

  // Fetch all async options on component mount
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [branches, locations, departments, costCenters] = await Promise.all([
          getBranchSiteOptions(),
          getLocationOptions(),
          getDepartmentOptions(),
          getCostCenterOptions(),
        ])

        setBranchSiteOptions(branches)
        setLocationOptions(locations)
        setDepartmentOptions(departments)
        setCostCenterOptions(costCenters)
      } catch (error) {
        console.error('Error fetching options:', error)
      }
    }

    fetchOptions()
  }, [])

  // Handle form submission
  const onSubmit = async (values: PurchaseRequisitionFormType, actions: any) => {
    const errs = validatePurchaseRequisition(values)
    if (errs.length) {
      showErrorModal(errs.join('\n'))
      return
    }
    try {
      setSubmitting(true)
      const res = await postPurchaseRequisition(values)
      
      // Invalidate cache after successful submission
      queryClient.invalidateQueries({ queryKey: [cache_purchaserequisition_list] })
      queryClient.invalidateQueries({ queryKey: [cache_purchaserequisition_new] })
      
      // Show success modal dengan requestId dan refRequestNo
      showSuccessModal(
        res.message || 'Purchase requisition submitted successfully!',
        res.data?.header?.requisitionId,
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
            Failed to load purchase requisition form: {String(queryError)}
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
            Failed to load purchase requisition form data for {cat} - {type}
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
            // Pastikan semua nested objects ada dengan default values
            const defaultItemDetails = [
              {
                id: '1',
                no: 1,
                stockcode: '',
                stock_description: '',
                item_type: '',
                quantity: '',
                unit_price: '',
                totalPrice: '',
              }
            ]
            
            if (data && currentUser) {
              const currentUserId = currentUser.id_number || currentUser.id?.toString() || ''
              return {
                ...data,
                requestInfo: {
                  ...data.requestInfo,
                  requestBy: currentUserId || data.requestInfo?.requestBy || '',
                  requestFor: data.requestInfo?.requestFor || '',
                },
                itemDetails: data.itemDetails || defaultItemDetails,
              }
            }
            
            // Fallback jika data tidak lengkap
            return {
              ...data,
              itemDetails: data?.itemDetails || defaultItemDetails,
            }
          })()}
          onSubmit={onSubmit}
          enableReinitialize={true}
        >
          {(formProps) => (
            <>
              <div className='card-header d-flex justify-content-between align-items-center'>
                <div>
                  <h3 className='card-title mb-2'>PURCHASE REQUISITION FORM</h3>
                  <HeaderSection
                    requestId={formProps.values.header.requisitionId}
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
                        currentUser={currentUser}
                      />

                      <RequisitionInformationSection
                        values={formProps.values.requisitionInfo}
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

export default PurchaseRequisitionForm
