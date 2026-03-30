import React from 'react'
import {RequestDetailPayload} from '../requests/types'

interface RequestDetailSectionsProps {
  payload: RequestDetailPayload | null
}

const hiddenTopLevelKeys = new Set([
  'header',
  'id',
  'approval_status',
  'is_draft',
  'status',
  'workflowTracking',
  'approvals',
])

const hiddenNestedKeys = new Set([
  'requestId',
  'requisitionId',
  'refRequestNo',
  'requestType',
  'createdAt',
  'updatedAt',
])

const sectionOrder = [
  'header',
  'requestInfo',
  'jobOrder',
  'workRequirements',
  'assignment',
  'trainingDetails',
  'fleetDetails',
  'transferDetails',
  'inspectionInfo',
  'inspectionDetailInfo',
  'defectDetails',
  'travelDetails',
  'travelers',
  'workforceSpecs',
  'jobRequirements',
  'assetDetails',
  'cashRequestDetails',
  'extendedRequestDetails',
  'accommodationRequirements',
  'accommodationDetails',
  'transportationDetails',
  'officeUseDetails',
  'visitorDetails',
  'visitDetails',
  'hostDetails',
  'securityClearance',
  'specialRequirements',
  'visitorRegistration',
  'requisitionInfo',
  'itemDetails',
  'estimatedTotalCost',
  'remark',
  'internalNote',
  'attachment',
  'status',
  'createdBy',
  'createdDate',
  'lastModifiedBy',
  'lastModifiedDate',
  'approvedBy',
  'approvedDate',
  'rejectedBy',
  'rejectedDate',
  'reasonForRejection',
]

const sectionLabels: Record<string, string> = {
  header: 'Header',
  requestInfo: 'Request Information',
  jobOrder: 'Job Order',
  workRequirements: 'Work Requirements',
  assignment: 'Assignment & Scheduling',
  trainingDetails: 'Training Details',
  fleetDetails: 'Fleet Details',
  transferDetails: 'Transfer Details',
  inspectionInfo: 'Inspection Information',
  inspectionDetailInfo: 'Inspection Detail Information',
  defectDetails: 'Defect Details',
  travelDetails: 'Travel Details',
  travelers: 'Travelers',
  workforceSpecs: 'Workforce Specs',
  jobRequirements: 'Job Requirements',
  assetDetails: 'Asset Details',
  cashRequestDetails: 'Cash Request Details',
  extendedRequestDetails: 'Extended Request Details',
  accommodationRequirements: 'Accommodation Requirements',
  accommodationDetails: 'Accommodation Details',
  transportationDetails: 'Transportation Details',
  officeUseDetails: 'Office Use Details',
  visitorDetails: 'Visitor Details',
  visitDetails: 'Visit Details',
  hostDetails: 'Host Details',
  securityClearance: 'Security Clearance',
  specialRequirements: 'Special Requirements',
  visitorRegistration: 'Visitor Registration',
  requisitionInfo: 'Requisition Information',
  itemDetails: 'Item Details',
  estimatedTotalCost: 'Estimated Total Cost',
  internalNote: 'Internal Note',
  reasonForRejection: 'Reason For Rejection',
}

const fieldOrderMap: Record<string, string[]> = {
  header: ['requestId', 'requisitionId', 'requestType', 'refRequestNo', 'fullPaymentMethod'],
  requestInfo: [
    'requestDate',
    'requisitionDate',
    'requestBy',
    'requestByJobTitle',
    'requestFor',
    'requestForJobTitle',
    'requestPurpose',
    'priority',
    'branchSite',
    'department',
    'costCenter',
    'location',
    'requestDescription',
    'justification',
    'justificationReason',
    'justificationBenefit',
    'commentRemarkNote',
    'additionalComments',
    'relevantDocs',
    'relevantDocsSecond',
    'amount',
    'estimatedTime',
    'firstService',
  ],
  jobOrder: ['jobType', 'location', 'assetEquipment'],
  workRequirements: [
    'specialInstructions',
    'safetyPrecautions',
    'materialRequired',
    'toolRequired',
  ],
  assignment: [
    'assignedTo',
    'workorderStatus',
    'workorderClosure',
    'scheduleStartDate',
    'actualStartDate',
    'completionDate',
    'actualCompletionDate',
    'additionalComments',
  ],
  trainingDetails: [
    'trainingTitle',
    'trainingDuration',
    'trainingMethod',
    'lastAttended',
    'organizerProvider',
    'organizerDate',
    'organizerVenue',
    'organizerFees',
    'identifiedByEmployee',
    'identifiedBySupervisor',
    'identifiedByOther',
  ],
  fleetDetails: ['fleetType', 'numberOfUnits', 'specifications'],
  transferDetails: ['currentOwner', 'workLocation', 'reasonForTransfer'],
  inspectionInfo: [
    'inspectionDate',
    'inspectionType',
    'inspectionDescription',
    'inspectionBy',
    'inspectionByJobTitle',
    'inspectionFor',
    'inspectionForJobTitle',
    'priority',
    'department',
    'relevantDocs',
    'costCenter',
    'justificationReason',
    'justificationBenefit',
  ],
  inspectionDetailInfo: [
    'assetNo',
    'assetDescription',
    'assetType',
    'assetModel',
    'location',
    'inspectionSummary',
    'notesComments',
    'additionalNotes',
  ],
  defectDetails: [
    'no',
    'defectDescription',
    'condition',
    'category',
    'actionTaken',
    'result',
    'status',
    'comments',
  ],
  travelDetails: [
    'numberOfPerson',
    'noDaysAbsent',
    'departure',
    'return',
    'dateReturnToWork',
    'contactDuringLeave',
    'pointOfLeave',
    'totalLeaveDaysRemaining',
    'totalDayTakenOnThisHoliday',
    'dayOffHoliday',
    'totalDaysTakenOnThisVacation',
    'lastBalanceEntitlement',
    'firstWorkDayAbsentFromWork',
    'lastWorkDayAbsentFromWork',
    'totalNumberOfDaysAbsent',
    'lessStatutoryPublicHolidaySundayIncluded',
    'netWorkingDaysLeaveRequested',
  ],
  travelers: ['no', 'lastName', 'firstName', 'category', 'comments'],
  workforceSpecs: [
    'jobTitle',
    'positions',
    'employmentType',
    'overtimeRequired',
    'workSchedule',
    'workLocation',
    'shift',
  ],
  jobRequirements: [
    'jobDescription',
    'keyResponsibilities',
    'requiredSkills',
    'experience',
    'education',
  ],
  assetDetails: ['assetType', 'assetModel', 'assetSpecification', 'quantity', 'comments'],
  cashRequestDetails: ['expenseType', 'amountRequest', 'paymentMethod', 'bankAccount', 'currency'],
  extendedRequestDetails: ['visitorName', 'durationOfStay', 'comments'],
  accommodationRequirements: ['accommodationType', 'numberOfNights', 'extraBed', 'mealProvided'],
  accommodationDetails: [
    'arrivalLocation',
    'accommodationLocation',
    'roomNumber',
    'checkInTime',
    'checkOutTime',
  ],
  transportationDetails: [
    'destination',
    'modeOfTransport',
    'noOfPassengers',
    'pickUpTime',
    'specialRequirement',
    'dropOffTime',
    'comments',
  ],
  officeUseDetails: ['vehicleNo', 'driverName', 'contactNo'],
  visitorDetails: ['visitorName', 'companyOrg', 'contactNoEmail'],
  visitDetails: ['dateOfVisit', 'timeOfVisit', 'expectedDuration'],
  hostDetails: ['hostName', 'department', 'contactNumber'],
  securityClearance: ['clearanceRequired', 'typeOfClearance', 'comments'],
  specialRequirements: ['meetingRoom', 'equipmentRequirements', 'comments'],
  visitorRegistration: ['visitorId', 'checkInTime', 'checkOutTime'],
  requisitionInfo: ['supplier', 'supplierAddress', 'supplierContact', 'comments'],
  itemDetails: [
    'no',
    'stockcode',
    'stock_description',
    'item_type',
    'quantity',
    'unit_price',
    'totalPrice',
    'comments',
  ],
}

const labelMap: Record<string, string> = {
  requestBy: 'Request By',
  requestFor: 'Request For',
  requestDate: 'Request Date',
  requisitionDate: 'Requisition Date',
  requestPurpose: 'Request Purpose',
  branchSite: 'Branch Site',
  costCenter: 'Cost Center',
  requestDescription: 'Request Description',
  commentRemarkNote: 'Comment Remark Note',
  additionalComments: 'Additional Comments',
  relevantDocs: 'Relevant Docs',
  relevantDocsSecond: 'Relevant Docs Second',
  requestByJobTitle: 'Request By Job Title',
  requestForJobTitle: 'Request For Job Title',
  jobType: 'Job Type',
  assetEquipment: 'Asset Equipment',
  assignedTo: 'Assigned To',
  workorderStatus: 'Workorder Status',
  workorderClosure: 'Workorder Closure',
  scheduleStartDate: 'Schedule Start Date',
  actualStartDate: 'Actual Start Date',
  completionDate: 'Completion Date',
  actualCompletionDate: 'Actual Completion Date',
  organizerProvider: 'Organizer Provider',
  organizerDate: 'Organizer Date',
  organizerVenue: 'Organizer Venue',
  organizerFees: 'Organizer Fees',
  identifiedByEmployee: 'Identified By Employee',
  identifiedBySupervisor: 'Identified By Supervisor',
  identifiedByOther: 'Identified By Other',
  numberOfUnits: 'Number Of Units',
  workLocation: 'Work Location',
  reasonForTransfer: 'Reason For Transfer',
  inspectionDate: 'Inspection Date',
  inspectionType: 'Inspection Type',
  inspectionDescription: 'Inspection Description',
  inspectionBy: 'Inspection By',
  inspectionByJobTitle: 'Inspection By Job Title',
  inspectionFor: 'Inspection For',
  inspectionForJobTitle: 'Inspection For Job Title',
  justificationReason: 'Justification Reason',
  justificationBenefit: 'Justification Benefit',
  assetNo: 'Asset No',
  assetType: 'Asset Type',
  assetModel: 'Asset Model',
  assetSpecification: 'Asset Specification',
  notesComments: 'Notes Comments',
  additionalNotes: 'Additional Notes',
  defectDescription: 'Defect Description',
  actionTaken: 'Action Taken',
  numberOfPerson: 'Number Of Person',
  noDaysAbsent: 'No Days Absent',
  dateReturnToWork: 'Date Return To Work',
  contactDuringLeave: 'Contact During Leave',
  pointOfLeave: 'Point Of Leave',
  totalLeaveDaysRemaining: 'Total Leave Days Remaining',
  totalDayTakenOnThisHoliday: 'Total Day Taken On This Holiday',
  dayOffHoliday: 'Day Off Holiday',
  totalDaysTakenOnThisVacation: 'Total Days Taken On This Vacation',
  lastBalanceEntitlement: 'Last Balance Entitlement',
  firstWorkDayAbsentFromWork: 'First Work Day Absent From Work',
  lastWorkDayAbsentFromWork: 'Last Work Day Absent From Work',
  totalNumberOfDaysAbsent: 'Total Number Of Days Absent',
  lessStatutoryPublicHolidaySundayIncluded: 'Less Statutory Public Holiday Sunday Included',
  netWorkingDaysLeaveRequested: 'Net Working Days Leave Requested',
  lastName: 'Last Name',
  firstName: 'First Name',
  employmentType: 'Employment Type',
  overtimeRequired: 'Overtime Required',
  workSchedule: 'Work Schedule',
  jobDescription: 'Job Description',
  keyResponsibilities: 'Key Responsibilities',
  requiredSkills: 'Required Skills',
  expenseType: 'Expense Type',
  amountRequest: 'Amount Request',
  paymentMethod: 'Payment Method',
  bankAccount: 'Bank Account',
  visitorName: 'Visitor Name',
  durationOfStay: 'Duration Of Stay',
  accommodationType: 'Accommodation Type',
  numberOfNights: 'Number Of Nights',
  extraBed: 'Extra Bed',
  mealProvided: 'Meal Provided',
  arrivalLocation: 'Arrival Location',
  accommodationLocation: 'Accommodation Location',
  roomNumber: 'Room Number',
  checkInTime: 'Check In Time',
  checkOutTime: 'Check Out Time',
  modeOfTransport: 'Mode Of Transport',
  noOfPassengers: 'No Of Passengers',
  pickUpTime: 'Pick Up Time',
  specialRequirement: 'Special Requirement',
  dropOffTime: 'Drop Off Time',
  vehicleNo: 'Vehicle No',
  driverName: 'Driver Name',
  contactNo: 'Contact No',
  companyOrg: 'Company Organization',
  contactNoEmail: 'Contact No / Email',
  dateOfVisit: 'Date Of Visit',
  timeOfVisit: 'Time Of Visit',
  expectedDuration: 'Expected Duration',
  hostName: 'Host Name',
  contactNumber: 'Contact Number',
  clearanceRequired: 'Clearance Required',
  typeOfClearance: 'Type Of Clearance',
  meetingRoom: 'Meeting Room',
  equipmentRequirements: 'Equipment Requirements',
  visitorId: 'Visitor Id',
  fullPaymentMethod: 'Full Payment Method',
  supplierAddress: 'Supplier Address',
  supplierContact: 'Supplier Contact',
  estimatedTotalCost: 'Estimated Total Cost',
  internalNote: 'Internal Note',
  createdBy: 'Created By',
  createdDate: 'Created Date',
  lastModifiedBy: 'Last Modified By',
  lastModifiedDate: 'Last Modified Date',
  approvedBy: 'Approved By',
  approvedDate: 'Approved Date',
  rejectedBy: 'Rejected By',
  rejectedDate: 'Rejected Date',
  reasonForRejection: 'Reason For Rejection',
}

const formatLabel = (key: string) =>
  labelMap[key] ||
  sectionLabels[key] ||
  key
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())

const formatValue = (value: any) => {
  if (value == null || value === '') return '-'
  if (typeof value === 'boolean') return value ? 'Yes' : 'No'
  return String(value)
}

const sortKeys = (keys: string[], scope: string) => {
  const orderedKeys = scope === '__top_level__' ? sectionOrder : fieldOrderMap[scope] || []
  return [...keys].sort((left, right) => {
    const leftIndex = orderedKeys.indexOf(left)
    const rightIndex = orderedKeys.indexOf(right)
    const safeLeft = leftIndex === -1 ? Number.MAX_SAFE_INTEGER : leftIndex
    const safeRight = rightIndex === -1 ? Number.MAX_SAFE_INTEGER : rightIndex
    if (safeLeft !== safeRight) return safeLeft - safeRight
    return left.localeCompare(right)
  })
}

const renderArrayTable = (title: string, rows: any[]) => {
  const normalizedRows = Array.isArray(rows) ? rows : []
  const discoveredColumns = Array.from(
    normalizedRows.reduce((set, row) => {
      Object.keys(row || {}).forEach((key) => {
        if (!hiddenNestedKeys.has(key)) set.add(key)
      })
      return set
    }, new Set<string>())
  )
  const columns = sortKeys(
    discoveredColumns.length > 0 ? discoveredColumns : fieldOrderMap[title] || [],
    title
  )

  if (columns.length === 0) return null

  return (
    <div className='detail-section-card' key={title}>
      <div className='detail-section-title'>{formatLabel(title)}</div>
      <div className='table-responsive'>
        <table className='table table-row-bordered align-middle gs-2 gy-2'>
          <thead>
            <tr className='fw-bold text-gray-700'>
              {columns.map((column) => (
                <th key={column}>{formatLabel(column)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {normalizedRows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className='text-muted text-center'>
                  No data
                </td>
              </tr>
            ) : (
              normalizedRows.map((row, index) => (
                <tr key={`${title}-${index}`}>
                  {columns.map((column) => (
                    <td key={column}>{formatValue(row[column])}</td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const renderObjectSection = (title: string, value: Record<string, any>) => {
  const entries = Object.entries(value).filter(([key]) => !hiddenNestedKeys.has(key))
  const sortedEntries = sortKeys(
    entries.map(([key]) => key),
    title
  ).map((key) => [key, value[key]] as [string, any])

  return (
    <div className='detail-section-card' key={title}>
      <div className='detail-section-title'>{formatLabel(title)}</div>
      <div className='detail-field-grid'>
      {sortedEntries.map(([key, nestedValue]) => {
        if (Array.isArray(nestedValue)) {
          return renderArrayTable(key, nestedValue)
        }

        if (nestedValue && typeof nestedValue === 'object') {
          return renderObjectSection(key, nestedValue)
        }

        return (
          <div className='request-detail-item' key={`${title}-${key}`}>
            <span className='label'>{formatLabel(key)}:</span>
            <span className='value'>{formatValue(nestedValue)}</span>
          </div>
        )
      })}
      </div>
    </div>
  )
}

const RequestDetailSections: React.FC<RequestDetailSectionsProps> = ({payload}) => {
  if (!payload?.detail) return null

  const sections = sortKeys(
    Object.keys(payload.detail).filter((key) => !hiddenTopLevelKeys.has(key)),
    '__top_level__'
  ).map((key) => [key, payload.detail[key]] as [string, any])

  return (
    <>
      {sections.map(([key, value]) => {
        if (Array.isArray(value)) {
          return renderArrayTable(key, value)
        }

        if (value && typeof value === 'object') {
          return renderObjectSection(key, value)
        }

        return (
          <div className='request-detail-item' key={key}>
            <span className='label'>{formatLabel(key)}:</span>
            <span className='value'>{formatValue(value)}</span>
          </div>
        )
      })}
    </>
  )
}

export default RequestDetailSections
