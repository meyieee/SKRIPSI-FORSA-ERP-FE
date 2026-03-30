import { FC } from 'react'
import Recommendations from './component/Recommendations'
import GoalAndValue from './component/GoalValue'
import WorkforceTrackingPage from './mastery/WorkforceTrackingPage'
import HeaderCommand from './component/HeaderCommand'
import HotlinePage from './Hotline/HotlinePage'
import FeedsPage from './feeds/FeedsPage'
import {Routes, Route, Navigate} from 'react-router-dom'
import React, {useEffect} from 'react'
import {useThemeMode, systemMode} from '../../../../../_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { PageTitle } from '../../../../../_metronic/layout/core'
// Import DispatchViewWrapper
import { DispatchViewWrapper } from './Dispatcher/DispatchViewWrapper'
// Import WorkforceTrackingViewWrapper
import { WorkforceTrackingViewWrapper } from './workforce/WorkforceTrackingViewWrapper'
// Import Workforce Tracking components
import {
  ViolationLayout,
  ViolationControlTab,
  ViolationUpdateTab,
} from '../../fia-resource/workforce-tracking/components/violation/tabs'
import {
  DevelopmentLayout,
  PerformanceAppraisalControl,
  TrainingDevelopmentControl,
} from '../../fia-resource/workforce-tracking/components/development/tabs'
import {LeaveLayout, LeaveTravelControl} from '../../fia-resource/workforce-tracking/components/leave/tabs'
import {
  ContractLayout,
  EmploymentContractControl,
} from '../../fia-resource/workforce-tracking/components/contract/tabs'
import {TimeLayout, TimeManagementTab} from '../../fia-resource/workforce-tracking/components/time/tabs'
import {RosterLayout, WorkforceRosterTab} from '../../fia-resource/workforce-tracking/components/roster/tabs'
import {MedicalLayout, MedicalRecordTab} from '../../fia-resource/workforce-tracking/components/medical/tabs'
import {RequestLayout, WorkforceRequestTab} from '../../fia-resource/workforce-tracking/components/request/tabs'
// Import Dispatch Radio Control components
import { BreakdownLayout } from '../../fia-operation/dispatch-radio-control/components/breakdown/BreakdownLayout'
import ReadyTab from '../../fia-operation/dispatch-radio-control/components/breakdown/tabs/ReadyTab'
import { ReadingLayout } from '../../fia-operation/dispatch-radio-control/components/reading/ReadingLayout'
import MeterReadingTab from '../../fia-operation/dispatch-radio-control/components/reading/tabs/MeterReadingTab'
import ReadingUpdateTab from '../../fia-operation/dispatch-radio-control/components/reading/tabs/ReadingUpdateTab'
import { FuelLayout } from '../../fia-operation/dispatch-radio-control/components/fuel/FuelLayout'
import FuelConsumptionTab from '../../fia-operation/dispatch-radio-control/components/fuel/tabs/FuelConsumptionTab'
import FuelUpdateTab from '../../fia-operation/dispatch-radio-control/components/fuel/tabs/FuelUpdateTab'
import { PMLayout } from '../../fia-operation/dispatch-radio-control/components/pm/PMLayout'
import PlanningandSchedulingTab from '../../fia-operation/dispatch-radio-control/components/pm/tabs/PlanningandSchedulingTab'
import PMUpdateTab from '../../fia-operation/dispatch-radio-control/components/pm/tabs/PMUpdateTab'
import { WorkorderLayout } from '../../fia-operation/dispatch-radio-control/components/workorder/WorkorderLayout'
import WorkorderListTab from '../../fia-operation/dispatch-radio-control/components/workorder/tabs/WorkorderListTab'
import { ComponentLayout } from '../../fia-operation/dispatch-radio-control/components/component/ComponentLayout'
import TrackingandMonitoringTab from '../../fia-operation/dispatch-radio-control/components/component/tabs/TrackingandMonitoringTab'
import { JobLayout } from '../../fia-operation/dispatch-radio-control/components/job/JobLayout'
import JobReqControlTab from '../../fia-operation/dispatch-radio-control/components/job/tabs/JobReqControlTab'
import { FleetLayout } from '../../fia-operation/dispatch-radio-control/components/fleet/FleetLayout'
import FleetReqControlTab from '../../fia-operation/dispatch-radio-control/components/fleet/tabs/FleetReqControlTab'
import { InspectionLayout } from '../../fia-operation/dispatch-radio-control/components/inspection/InspectionLayout'
import InspectionDefectControlTab from '../../fia-operation/dispatch-radio-control/components/inspection/tabs/InspectionDefectControlTab'
import { ChecklistLayout } from '../../fia-operation/dispatch-radio-control/components/checklist/ChecklistLayout'
import PreChecklistControlTab from '../../fia-operation/dispatch-radio-control/components/checklist/tabs/PreChecklistControlTab'

const FiaHomeCommandCenter: FC = () => {
  const {mode} = useThemeMode()

  useEffect(() => {
    const updatedMode = mode === 'system' ? systemMode : mode
    document.documentElement.setAttribute('data-theme', updatedMode)
  }, [mode])

  return (
    <div>
      <PageTitle>COMMAND CENTER</PageTitle>
      <div className='bg-body mb-5'>
        <HeaderCommand />
      </div>

      <div className='tab-content bg-body'>
        <Routes>
          <Route path='overview' element={
            <div className='row gx-6'>
              <div className='col-lg-8 col-xxl-8'>
                <Recommendations />
              </div>
              <div className='col-lg-4 col-xxl-4'>
                <GoalAndValue />
              </div>
            </div>
          } />
          <Route path='hotline' element={<HotlinePage />} />
          <Route path='feeds/*' element={<FeedsPage />} />
            <Route path='mastery/*' element={
            <WorkforceTrackingPage />
          } />
          <Route path='dispatcher/*' element={<DispatchViewWrapper />}>
            {/* default to BREAKDOWN */}
            <Route index element={<Navigate to='breakdown' replace />} />
            {/* BREAKDOWN */}
            <Route path="breakdown" element={<BreakdownLayout />}>
              <Route index element={<Navigate to='ready' replace />} />
              <Route path="ready" element={<ReadyTab />} />
            </Route>
            {/* READING */}
            <Route path='reading' element={<ReadingLayout />}>
              <Route index element={<Navigate to='reading' replace />} />
              <Route path='reading' element={<MeterReadingTab />} />
              <Route path='update' element={<ReadingUpdateTab />} />
            </Route>
            {/* FUEL */}
            <Route path='fuel' element={<FuelLayout />}>
              <Route index element={<Navigate to='fuel' replace />} />
              <Route path='fuel' element={<FuelConsumptionTab />} />
              <Route path='update' element={<FuelUpdateTab />} />
            </Route>
            {/* PM */}
            <Route path='pm' element={<PMLayout />}>
              <Route index element={<Navigate to='pm' replace />} />
              <Route path='pm' element={<PlanningandSchedulingTab />} />
              <Route path='update' element={<PMUpdateTab />} />
            </Route>
            {/* WORKORDER */}
            <Route path="workorder" element={<WorkorderLayout />}>
              <Route index element={<Navigate to='workorder' replace />} />
              <Route path="workorder" element={<WorkorderListTab />} />
            </Route>
            {/* COMPONENT */}
            <Route path="component" element={<ComponentLayout />}>
              <Route index element={<Navigate to='component' replace />} />
              <Route path="component" element={<TrackingandMonitoringTab />} />
            </Route>
            {/* JOB */}
            <Route path="job" element={<JobLayout />}>
              <Route index element={<Navigate to='job' replace />} />
              <Route path="job" element={<JobReqControlTab />} />
            </Route>
            {/* FLEET */}
            <Route path="fleet" element={<FleetLayout />}>
              <Route index element={<Navigate to='fleet' replace />} />
              <Route path="fleet" element={<FleetReqControlTab />} />
            </Route>
            {/* INSPECTION */}
            <Route path="inspection" element={<InspectionLayout />}>
              <Route index element={<Navigate to='inspection' replace />} />
              <Route path="inspection" element={<InspectionDefectControlTab />} />
            </Route>
            {/* CHECKLIST */}
            <Route path="checklist" element={<ChecklistLayout />}>
              <Route index element={<Navigate to='checklist' replace />} />
              <Route path="checklist" element={<PreChecklistControlTab />} />
            </Route>
          </Route>
          <Route path='department-work-tracking' element={
            <div className='row gx-6'>
              <div className='col-lg-8 col-xxl-8'>
              </div>
            </div>
          } />
            <Route path='workforce/*' element={<WorkforceTrackingViewWrapper />}>
            {/* default to VIOLATION */}
            <Route index element={<Navigate to='violation' replace />} />

            {/* VIOLATION */}
            <Route path='violation' element={<ViolationLayout />}>
              <Route index element={<Navigate to='control' replace />} />
              <Route path='control' element={<ViolationControlTab />} />
              <Route path='update' element={<ViolationUpdateTab />} />
            </Route>

            {/* DEVELOPMENT */}
            <Route path='development' element={<DevelopmentLayout />}>
              <Route index element={<Navigate to='performance' replace />} />
              <Route path='performance' element={<PerformanceAppraisalControl />} />
              <Route path='training' element={<TrainingDevelopmentControl />} />
            </Route>

            {/* TIME */}
            <Route path='time' element={<TimeLayout />}>
              <Route index element={<Navigate to='time_management' replace />} />
              <Route path='time_management' element={<TimeManagementTab />} />
            </Route>

            {/* ROSTER */}
            <Route path='roster' element={<RosterLayout />}>
              <Route index element={<Navigate to='workforce_roster' replace />} />
              <Route path='workforce_roster' element={<WorkforceRosterTab />} />
            </Route>

            {/* LEAVE */}
            <Route path='leave' element={<LeaveLayout />}>
              <Route index element={<Navigate to='leave_travel_control' replace />} />
              <Route path='leave_travel_control' element={<LeaveTravelControl />} />
            </Route>

            {/* MEDICAL */}
            <Route path='medical' element={<MedicalLayout />}>
              <Route index element={<Navigate to='medical_record' replace />} />
              <Route path='medical_record' element={<MedicalRecordTab />} />
            </Route>

            {/* CONTRACT */}
            <Route path='contract' element={<ContractLayout />}>
              <Route index element={<Navigate to='employment_contract' replace />} />
              <Route path='employment_contract' element={<EmploymentContractControl />} />
            </Route>

            {/* WORKFORCE REQUEST */}
            <Route path='request' element={<RequestLayout />}>
              <Route index element={<Navigate to='employee_request_control' replace />} />
              <Route path='employee_request_control' element={<WorkforceRequestTab />} />
            </Route>
          </Route>
          <Route path='online' element={
            <React.Fragment>
              <div className='bg-body p-10 border rounded-3 text-center'>
                <h3 className='theme-light-text-dark theme-dark-text-gray-100'>Online Control</h3>
                <p className='theme-light-text-muted theme-dark-text-gray-600'>Module is under development.</p>
              </div>
            </React.Fragment>
          } />
        
          <Route index element={<Navigate to='overview' replace />} />
        </Routes>
      </div>
    </div>
  )
}

export default FiaHomeCommandCenter