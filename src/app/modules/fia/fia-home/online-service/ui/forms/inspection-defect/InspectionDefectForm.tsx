import React, { useState, useEffect } from 'react'
import { Formik, Form } from 'formik'
import { useQueryClient } from '@tanstack/react-query'
import { OnlineCategoryKey } from '../../../registry'
import { UseReactQuery } from '../../../../../../../functions/reactQuery'
import { cache_inspectiondefect_new, cache_inspectiondefect_list } from '../../../../../../../constans/CachesName'
import { useAuth } from '../../../../../../../modules/auth'
import { 
  getInspectionDefectNew,
  postInspectionDefect,
  validateInspectionDefect,
  getRequestPurposeOptions,
  getPriorityOptions,
  getBranchSiteOptions,
  getLocationOptions,
  getDepartmentOptions,
  getSupervisorOptions,
  getInspectionTypeOptions,
  getAssetOptions,
  getConditionOptions,
  getCategoryOptions,
  getActionTakenOptions,
  getResultOptions,
  getStatusOptions,
  InspectionDefectForm as InspectionDefectFormType,
} from '../../../core/inspection-defect'
import HeaderSection from '../common/sections/HeaderSection'
import {
  FormLoadingState,
  SuccessModal,
  ErrorModal,
} from '../common/components'
import { useFormNotification } from '../common/hooks'
import RequestInfoSection from './sections/RequestInfoSection'
import InspectionInfoSection from './sections/InspectionInfoSection'
import InspectionDetailInfoSection from './sections/InspectionDetailInfoSection'
import DefectDetailsSection from './sections/DefectDetailsSection'
import './InspectionDefectForm.scss'

type Props = {
  cat: OnlineCategoryKey
  type: string
}

function InspectionDefectForm({ cat, type }: Props) {
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

  // Use React Query to fetch inspection defect form data
  const { data, isLoading: loading, error: queryError } = UseReactQuery<InspectionDefectFormType>({
    func: () => getInspectionDefectNew(),
    cacheName: cache_inspectiondefect_new,
    enabled: true,
  })

  // Handle form submission
  const onSubmit = async (values: InspectionDefectFormType, actions: any) => {
    const errs = validateInspectionDefect(values)
    if (errs.length) {
      showErrorModal(errs.join('\n'))
      return
    }
    try {
      setSubmitting(true)
      const res = await postInspectionDefect(values)
      
      // Invalidate cache after successful submission
      queryClient.invalidateQueries({ queryKey: [cache_inspectiondefect_list] })
      queryClient.invalidateQueries({ queryKey: [cache_inspectiondefect_new] })
      
      // Show success modal dengan requestId dan refRequestNo
      showSuccessModal(
        res.message || 'Inspection defect request submitted successfully!',
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
            Failed to load inspection defect form: {String(queryError)}
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
            Failed to load inspection defect form data for {cat} - {type}
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
            const defaultInspectionInfo = {
              inspectionDate: new Date().toISOString().slice(0, 10),
              inspectionType: '',
              inspectionDescription: '',
              inspectionBy: '',
              inspectionByJobTitle: '',
              inspectionFor: '',
              inspectionForJobTitle: '',
              priority: '',
              department: '',
              relevantDocs: '',
              costCenter: '',
              justificationReason: '',
              justificationBenefit: '',
            }
            
            const defaultInspectionDetailInfo = {
              assetNo: '',
              assetDescription: '',
              assetType: '',
              assetModel: '',
              location: '',
              inspectionSummary: '',
              notesComments: '',
              additionalNotes: '',
            }
            
            if (data && currentUser) {
              const currentUserId = currentUser.id_number || currentUser.id?.toString() || ''
              return {
                ...data,
                requestInfo: {
                  ...data.requestInfo,
                  requestBy: currentUserId || data.requestInfo?.requestBy || '',
                  requestFor: data.requestInfo?.requestFor || '',
                },
                inspectionInfo: data.inspectionInfo || defaultInspectionInfo,
                inspectionDetailInfo: data.inspectionDetailInfo || defaultInspectionDetailInfo,
                defectDetails: data.defectDetails || [],
              }
            }
            
            // Fallback jika data tidak lengkap
            return {
              ...data,
              inspectionInfo: data?.inspectionInfo || defaultInspectionInfo,
              inspectionDetailInfo: data?.inspectionDetailInfo || defaultInspectionDetailInfo,
              defectDetails: data?.defectDetails || [],
            }
          })()}
          onSubmit={onSubmit}
          enableReinitialize={true}
        >
          {(formProps) => (
            <>
              <div className='card-header d-flex justify-content-between align-items-center'>
                <div>
                  <h3 className='card-title mb-2'>CREATE INSPECTION | DEFECT</h3>
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

                      <InspectionInfoSection
                        values={formProps.values.inspectionInfo}
                        setFieldValue={formProps.setFieldValue}
                        getInspectionTypeOptions={getInspectionTypeOptions}
                      />

                      <InspectionDetailInfoSection
                        values={formProps.values.inspectionDetailInfo}
                        setFieldValue={formProps.setFieldValue}
                        getAssetOptions={getAssetOptions}
                      />

                      <DefectDetailsSection
                        values={formProps.values.defectDetails}
                        setFieldValue={formProps.setFieldValue}
                        getConditionOptions={getConditionOptions}
                        getCategoryOptions={getCategoryOptions}
                        getActionTakenOptions={getActionTakenOptions}
                        getResultOptions={getResultOptions}
                        getStatusOptions={getStatusOptions}
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

export default InspectionDefectForm