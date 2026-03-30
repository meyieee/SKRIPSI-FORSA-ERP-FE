import {FC} from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import { ProtectedRoute } from '../../auth/components/ProtectedRoute'

/* MyOnlineFeeds imports */
import {MyOnlineFeedsView} from './my-online-feeds/MyOnlineFeedsView'
import {TabProvider} from './my-online-feeds/components/TabContext'
import {ChatProvider} from './my-online-feeds/components/tasks/chat/ChatContext'
import {ApprovalTab, RequestsTab, TasksTab, RosterTab} from './my-online-feeds/components/tabs'
import ChatWindow from './my-online-feeds/components/tasks/chat/ChatWindow'
import {ApprovalProvider} from './my-online-feeds/components/approval/ApprovalContext'

/* PersonalInfo imports */
import {AuthProvider} from '../../auth/core/Auth'
import {PersonalInfoView} from './personal-info/PersonalInfoView'
import {ProfileProvider} from './personal-info/components/ProfileContext'
import {
  PersonalDataTab,
  JobInfoTab,
  JobServiceTab,
  DependentTab,
  KINTab,
} from './personal-info/components/main-tabs/SubTabs'

/* More Detail Components */
import {CareerDevelopmentView} from './personal-info/components/more-detail/career-development/CareerDevView'
import {ViolationDisciplineView} from './personal-info/components/more-detail/violation-discipline/VioDisView'
import {CompensationBenefitView} from './personal-info/components/more-detail/compensation-benefit/CompBenView'
import {DocumentsView} from './personal-info/components/more-detail/documents/DocumentsView'

/* More Detail Sub-components */
import {
  CareerTab,
  TrainingTab,
  EducationTab,
  LanguageHobbyTab,
  AppraisalTab,
} from './personal-info/components/more-detail/career-development/SubTabs'

import {
  DisciplineTab,
  WarningTab,
} from './personal-info/components/more-detail/violation-discipline/SubTabs'

import {
  LeaveTravelTab,
  ExpenseClaimTab,
  EarningsTab,
  MedicalTab,
  LoanTab,
  AssetTab,
  PpeTab,
} from './personal-info/components/more-detail/compensation-benefit/SubTabs'

import {ContractTab, EFilingTab} from './personal-info/components/more-detail/documents/SubTabs'

/* --- WORKFORCE TRACKING import--- */
import {WorkforceTrackingView} from './workforce-tracking/WorkforceTrackingView'

import {
  ViolationLayout,
  ViolationControlTab,
  ViolationUpdateTab,
} from './workforce-tracking/components/violation/tabs'

import {
  DevelopmentLayout,
  PerformanceAppraisalControl,
  TrainingDevelopmentControl,
} from './workforce-tracking/components/development/tabs'

import {LeaveLayout, LeaveTravelControl} from './workforce-tracking/components/leave/tabs'

import {
  ContractLayout,
  EmploymentContractControl,
} from './workforce-tracking/components/contract/tabs'

import {TimeLayout, TimeManagementTab} from './workforce-tracking/components/time/tabs'

import {RosterLayout, WorkforceRosterTab} from './workforce-tracking/components/roster/tabs'

import {MedicalLayout, MedicalRecordTab} from './workforce-tracking/components/medical/tabs'

import {RequestLayout, WorkforceRequestTab} from './workforce-tracking/components/request/tabs'

/* --- Statistic Management import--- */

import {StatisticManagementView} from './statistic-management/StatisticManagementView'

import {
  ManpowerLayout,
  ManpowerOverviewTab,
  ManpowerSummaryTab,
  ManpowerDetailsTab,
  MoreInfoTab,
} from './statistic-management/components/manpower/tabs'

import {
  PlanLayout,
  PlanOverviewTab,
  PlanSummaryTab,
  PlanDetailsTab,
  PlanMoreInfoTab,
} from './statistic-management/components/plan/tabs'

import {
  ServiceLayout,
  MovementLayout,
  ServiceMovementOverviewTab,
  ServiceMovementSummaryTab,
  ServiceMovementDetailsTab,
  ServiceMovementMoreInfoTab,
  ServiceDevelopmentLayout,
  ServiceDevelopmentOverviewTab,
  ServiceDevelopmentSummaryTab,
  ServiceDevelopmentDetailsTab,
  ServiceDevelopmentAppraisalTab,
  ServiceDevelopmentMoreInfoTab,
  PerformanceLayout,
  ServicePerformanceOverviewTab,
  ServicePerformanceSummaryTab,
  ServicePerformanceViolationDetailsTab,
  ServicePerformanceWarningDetailsTab,
  ServicePerformanceMoreInfoTab,
  BenefitsLayout,
  ServiceBenefitsOverviewTab,
  ServiceBenefitsSummaryTab,
  ServiceBenefitsLeaveDetailsTab,
  ServiceBenefitsMedicalDetailsTab,
  ServiceBenefitsMoreInfoTab,
  FacilitiesLayout,
  ServiceFacilitiesOverviewTab,
  ServiceFacilitiesSummaryTab,
  ServiceFacilitiesAssetDetailsTab,
  ServiceFacilitiesUniformDetailsTab,
  ServiceFacilitiesMoreInfoTab,
} from './statistic-management/components/service/tabs'

import {
  ScheduleLayout,
  ScheduleRosterTab,
  ScheduleDetailsTab,
  ScheduleMoreInfoTab,
} from './statistic-management/components/schedule/tabs'

/* --- Analytical & KPI's import--- */
import {AnalyticalKPIView} from './analytical-kpi/Analytical&KPIsView'

import {
  RecapAnalyticalLayout,
  RecapitulationOverviewTab,
  RecapitulationSummaryTab,
  RecapitulationDetailsTab,
  TurnoverAnalyticalLayout,
  TurnoverOverviewTab,
  TurnoverSummaryTab,
  TurnoverDetailsTab,
  DevelopmentAnalyticalLayout,
  DevelopmentOverviewTab,
  DevelopmentSummaryTab,
  DevelopmentDetailsTab,
  AccountabilityAnalyticalLayout,
  AccountabilityOverviewTab,
  AccountabilitySummaryTab,
  AccountabilityDetailsTab,
} from './analytical-kpi/components/tabs'

/* File Routing */
const FIAResourcePage: FC = () => {
  return (
    <Routes>
      {/* --- MY ONLINE FEEDS --- */}
      <Route
        path='my_online_feeds'
        element={
          <ProtectedRoute routePath='/fia-resource/my_online_feeds'>
            <TabProvider>
              <ApprovalProvider>
              {' '}
              <MyOnlineFeedsView />
              </ApprovalProvider>
          </TabProvider>
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to='approval' replace />} />
        <Route path='approval' element={<ApprovalTab />} />
        <Route path='requests' element={<RequestsTab />} />
        <Route
          path='tasks'
          element={
            <ChatProvider>
              <TasksTab />
              <ChatWindow />
            </ChatProvider>
          }
        />

        <Route path='roster' element={<RosterTab />} />
      </Route>

      {/* --- PERSONAL INFO --- */}
      <Route
        path='personal_info'
        element={
          <ProtectedRoute routePath='/fia-resource/personal_info'>
            <AuthProvider>
              <ProfileProvider>
                <PersonalInfoView />
              </ProfileProvider>
            </AuthProvider>
          </ProtectedRoute>
        }
      >
        {/* Main tabs */}
        <Route index element={<Navigate to='personal_data' replace />} />
        <Route path='personal_data' element={<PersonalDataTab />} />
        <Route path='job_info' element={<JobInfoTab />} />
        <Route path='job_service' element={<JobServiceTab />} />
        <Route path='dependent' element={<DependentTab />} />
        <Route path='kin' element={<KINTab />} />

        {/* More Detail tabs */}
        <Route path='career_development' element={<CareerDevelopmentView />}>
          <Route index element={<Navigate to='career' replace />} />
          <Route path='career' element={<CareerTab />} />
          <Route path='training' element={<TrainingTab />} />
          <Route path='education' element={<EducationTab />} />
          <Route path='language_hobby' element={<LanguageHobbyTab />} />
          <Route path='appraisal' element={<AppraisalTab />} />
        </Route>

        <Route path='violation_discipline' element={<ViolationDisciplineView />}>
          <Route index element={<Navigate to='discipline' replace />} />
          <Route path='discipline' element={<DisciplineTab />} />
          <Route path='warning' element={<WarningTab />} />
        </Route>

        <Route path='compensation_benefit' element={<CompensationBenefitView />}>
          <Route index element={<Navigate to='leave_travel' replace />} />
          <Route path='leave_travel' element={<LeaveTravelTab />} />
          <Route path='expense_claim' element={<ExpenseClaimTab />} />
          <Route path='earnings' element={<EarningsTab />} />
          <Route path='medical' element={<MedicalTab />} />
          <Route path='loan' element={<LoanTab />} />
          <Route path='asset' element={<AssetTab />} />
          <Route path='ppe' element={<PpeTab />} />
        </Route>

        <Route path='documents' element={<DocumentsView />}>
          <Route index element={<Navigate to='efiling' replace />} />
          <Route path='efiling' element={<EFilingTab />} />
          <Route path='employment_contract' element={<ContractTab />} />
        </Route>
      </Route>

      {/* --- WORKFORCE TRACKING--- */}
      <Route 
        path='workforce_tracking' 
        element={
          <ProtectedRoute routePath='/fia-resource/workforce_tracking'>
            <WorkforceTrackingView />
          </ProtectedRoute>
        }
      >
        {/* default ke VIOLATION */}
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

      {/* --- STATISTIC MANAGEMENT--- */}
      <Route
        path='statistic_management'
        element={
          <ProtectedRoute routePath='/fia-resource/statistic_management'>
            <ProfileProvider>
              <StatisticManagementView />
            </ProfileProvider>
          </ProtectedRoute>
        }
      >
        {/* default ke MANPOWER */}
        <Route index element={<Navigate to='manpower' replace />} />

        {/* MANPOWER */}
        <Route path='manpower' element={<ManpowerLayout />}>
          <Route index element={<Navigate to='manpower_overview' replace />} />
          <Route path='manpower_overview' element={<ManpowerOverviewTab />} />
          <Route path='manpower_summary' element={<ManpowerSummaryTab />} />
          <Route path='manpower_details' element={<ManpowerDetailsTab />} />
          <Route path='manpower_more_info' element={<MoreInfoTab />} />
        </Route>

        {/* PLAN */}
        <Route path='manpower_plan' element={<PlanLayout />}>
          <Route index element={<Navigate to='plan_overview' replace />} />
          <Route path='plan_overview' element={<PlanOverviewTab />} />
          <Route path='plan_summary' element={<PlanSummaryTab />} />
          <Route path='plan_details' element={<PlanDetailsTab />} />
          <Route path='plan_more_info' element={<PlanMoreInfoTab />} />
        </Route>

        {/* SERVICE */}
        <Route path='manpower_service' element={<ServiceLayout />}>
          <Route index element={<Navigate to='service_movement' replace />} />

          {/* MOVEMENT */}
          <Route path='service_movement' element={<MovementLayout />}>
            <Route index element={<Navigate to='movement_overview' replace />} />
            <Route path='movement_overview' element={<ServiceMovementOverviewTab />} />
            <Route path='movement_summary' element={<ServiceMovementSummaryTab />} />
            <Route path='movement_details' element={<ServiceMovementDetailsTab />} />
            <Route path='movement_more_info' element={<ServiceMovementMoreInfoTab />} />
          </Route>

          {/* DEVELOPMENT */}
          <Route path='service_development' element={<ServiceDevelopmentLayout />}>
            <Route index element={<Navigate to='development_overview' replace />} />
            <Route path='development_overview' element={<ServiceDevelopmentOverviewTab />} />
            <Route path='development_summary' element={<ServiceDevelopmentSummaryTab />} />
            <Route path='development_details' element={<ServiceDevelopmentDetailsTab />} />
            <Route path='development_appraisal' element={<ServiceDevelopmentAppraisalTab />} />
            <Route path='development_more_info' element={<ServiceDevelopmentMoreInfoTab />} />
          </Route>

          {/* PERFORMANCE */}
          <Route path='service_performance' element={<PerformanceLayout />}>
            <Route index element={<Navigate to='performance_overview' replace />} />
            <Route path='performance_overview' element={<ServicePerformanceOverviewTab />} />
            <Route path='performance_summary' element={<ServicePerformanceSummaryTab />} />
            <Route
              path='performance_vio_details'
              element={<ServicePerformanceViolationDetailsTab />}
            />
            <Route
              path='performance_warn_details'
              element={<ServicePerformanceWarningDetailsTab />}
            />
            <Route path='performance_more_info' element={<ServicePerformanceMoreInfoTab />} />
          </Route>

          {/* BENEFITS */}
          <Route path='service_benefits' element={<BenefitsLayout />}>
            <Route index element={<Navigate to='benefits_overview' replace />} />
            <Route path='benefits_overview' element={<ServiceBenefitsOverviewTab />} />
            <Route path='benefits_summary' element={<ServiceBenefitsSummaryTab />} />
            <Route path='benefits_leave_details' element={<ServiceBenefitsLeaveDetailsTab />} />
            <Route path='benefits_medical_details' element={<ServiceBenefitsMedicalDetailsTab />} />
            <Route path='benefits_more_info' element={<ServiceBenefitsMoreInfoTab />} />
          </Route>

          {/* FACILITIES */}
          <Route path='service_facilities' element={<FacilitiesLayout />}>
            <Route index element={<Navigate to='facilities_overview' replace />} />
            <Route path='facilities_overview' element={<ServiceFacilitiesOverviewTab />} />
            <Route path='facilities_summary' element={<ServiceFacilitiesSummaryTab />} />
            <Route path='facilities_asset_details' element={<ServiceFacilitiesAssetDetailsTab />} />
            <Route
              path='facilities_uniform_details'
              element={<ServiceFacilitiesUniformDetailsTab />}
            />
            <Route path='facilities_more_info' element={<ServiceFacilitiesMoreInfoTab />} />
          </Route>
        </Route>

        {/* SCHEDULE */}
        <Route path='manpower_schedule' element={<ScheduleLayout />}>
          <Route index element={<Navigate to='schedule_roster' replace />} />
          <Route path='schedule_roster' element={<ScheduleRosterTab />} />
          <Route path='schedule_details' element={<ScheduleDetailsTab />} />
          <Route path='schedule_more_info' element={<ScheduleMoreInfoTab />} />
        </Route>
      </Route>

      {/* --- ANALYTICAL & KPI'S --- */}
      <Route
        path='analitycal&KPIs'
        element={
          <ProtectedRoute routePath='/fia-resource/analitycal&KPIs'>
            <ProfileProvider>
              <AnalyticalKPIView />
            </ProfileProvider>
          </ProtectedRoute>
        }
      >
        {/* default ke RECAPITULATION */}
        <Route index element={<Navigate to='recapitulation' replace />} />

        {/* RECAPITULATION */}
        <Route path='recapitulation' element={<RecapAnalyticalLayout />}>
          <Route index element={<Navigate to='recap_overview' replace />} />
          <Route path='recap_overview' element={<RecapitulationOverviewTab />} />
          <Route path='recap_summary' element={<RecapitulationSummaryTab />} />
          <Route path='recap_details' element={<RecapitulationDetailsTab />} />
        </Route>

        {/* TURNOVER */}
        <Route path='turnover' element={<TurnoverAnalyticalLayout />}>
          <Route index element={<Navigate to='turnover_overview' replace />} />
          <Route path='turnover_overview' element={<TurnoverOverviewTab />} />
          <Route path='turnover_summary' element={<TurnoverSummaryTab />} />
          <Route path='turnover_details' element={<TurnoverDetailsTab />} />
        </Route>

        {/* DEVELOPMENT */}
        <Route path='development' element={<DevelopmentAnalyticalLayout />}>
          <Route index element={<Navigate to='development_overview' replace />} />
          <Route path='development_overview' element={<DevelopmentOverviewTab />} />
          <Route path='development_summary' element={<DevelopmentSummaryTab />} />
          <Route path='development_details' element={<DevelopmentDetailsTab />} />
        </Route>

        {/* ACCOUNTABILITY */}
        <Route path='accountability' element={<AccountabilityAnalyticalLayout />}>
          <Route index element={<Navigate to='accountability_overview' replace />} />
          <Route path='accountability_overview' element={<AccountabilityOverviewTab />} />
          <Route path='accountability_summary' element={<AccountabilitySummaryTab />} />
          <Route path='accountability_details' element={<AccountabilityDetailsTab />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default FIAResourcePage
