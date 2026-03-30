import React from 'react'
import { TravelDetails } from '../../../../core/travel-request'
import FormSection from '../../common/components/FormSection'
import FormField from '../../common/components/FormField'

type TravelDetailsSectionProps = {
  values: TravelDetails
  setFieldValue: (field: string, value: any) => void
}

export default function TravelDetailsSection({
  values,
  setFieldValue,
}: TravelDetailsSectionProps) {
  return (
    <FormSection title='Travel Details'>
      <div className='row'>
        <div className='col-md-4'>
          <FormField
            label='Number of Person'
            name='travelDetails.numberOfPerson'
            value={values.numberOfPerson}
            onChange={(value) => setFieldValue('travelDetails.numberOfPerson', value)}
            type='number'
            placeholder='[number]'
            required
          />
        </div>
        <div className='col-md-4'>
          <FormField
            label='No Days Absent'
            name='travelDetails.noDaysAbsent'
            value={values.noDaysAbsent}
            onChange={(value) => setFieldValue('travelDetails.noDaysAbsent', value)}
            type='number'
            placeholder='[number]'
          />
        </div>
        <div className='col-md-4'>
          <FormField
            label='Date Return to Work'
            name='travelDetails.dateReturnToWork'
            value={values.dateReturnToWork}
            onChange={(value) => setFieldValue('travelDetails.dateReturnToWork', value)}
            type='date'
          />
        </div>
      </div>

      <div className='row'>
        <div className='col-md-4'>
          <FormField
            label='Departure'
            name='travelDetails.departure'
            value={values.departure}
            onChange={(value) => setFieldValue('travelDetails.departure', value)}
            placeholder='[combo]'
            required
          />
        </div>
        <div className='col-md-4'>
          <FormField
            label='Return'
            name='travelDetails.return'
            value={values.return}
            onChange={(value) => setFieldValue('travelDetails.return', value)}
            placeholder='[combo]'
            required
          />
        </div>
        <div className='col-md-4'>
          <FormField
            label='Contact During Leave'
            name='travelDetails.contactDuringLeave'
            value={values.contactDuringLeave}
            onChange={(value) => setFieldValue('travelDetails.contactDuringLeave', value)}
            placeholder='[contact]'
          />
        </div>
        <div className='col-md-4'>
          <FormField
            label='Point of Leave'
            name='travelDetails.pointOfLeave'
            value={values.pointOfLeave}
            onChange={(value) => setFieldValue('travelDetails.pointOfLeave', value)}
            placeholder='[text input]'
          />
        </div>
        <div className='col-md-4'>
          <FormField
            label='Total Leave Days Remaining'
            name='travelDetails.totalLeaveDaysRemaining'
            value={values.totalLeaveDaysRemaining}
            onChange={(value) => setFieldValue('travelDetails.totalLeaveDaysRemaining', value)}
            type='number'
            placeholder='[number]'
          />
        </div>
        <div className='col-md-4'>
          <FormField
            label='Total Day Taken on This Holiday'
            name='travelDetails.totalDayTakenOnThisHoliday'
            value={values.totalDayTakenOnThisHoliday}
            onChange={(value) => setFieldValue('travelDetails.totalDayTakenOnThisHoliday', value)}
            type='number'
            placeholder='[number]'
          />
        </div>
        <div className='col-md-4'>
          <FormField
            label='Day Off and Holiday'
            name='travelDetails.dayOffHoliday'
            value={values.dayOffHoliday}
            onChange={(value) => setFieldValue('travelDetails.dayOffHoliday', value)}
            type='number'
            placeholder='[number]'
          />
        </div>
        <div className='col-md-4'>
          <FormField
            label='Total Days Taken on This Vacation'
            name='travelDetails.totalDaysTakenOnThisVacation'
            value={values.totalDaysTakenOnThisVacation}
            onChange={(value) => setFieldValue('travelDetails.totalDaysTakenOnThisVacation', value)}
            type='number'
            placeholder='[number]'
          />
        </div>
        <div className='col-md-4'>
          <FormField
            label='Last Balance Entitlement'
            name='travelDetails.lastBalanceEntitlement'
            value={values.lastBalanceEntitlement}
            onChange={(value) => setFieldValue('travelDetails.lastBalanceEntitlement', value)}
            type='number'
            placeholder='[number]'
          />
        </div>
      </div>

      <div className='row'>
        <div className='col-md-4'>
          <FormField
            label='First Work Day Absent from Work'
            name='travelDetails.firstWorkDayAbsentFromWork'
            value={values.firstWorkDayAbsentFromWork}
            onChange={(value) => setFieldValue('travelDetails.firstWorkDayAbsentFromWork', value)}
            type='date'
            placeholder='[date]'
          />
        </div>
        <div className='col-md-4'>
          <FormField
            label='Last Work Day Absent from Work'
            name='travelDetails.lastWorkDayAbsentFromWork'
            value={values.lastWorkDayAbsentFromWork}
            onChange={(value) => setFieldValue('travelDetails.lastWorkDayAbsentFromWork', value)}
            type='date'
            placeholder='[date]'
          />
        </div>
        <div className='col-md-4'>
          <FormField
            label='Total Number of Days Absent'
            name='travelDetails.totalNumberOfDaysAbsent'
            value={values.totalNumberOfDaysAbsent}
            onChange={(value) => setFieldValue('travelDetails.totalNumberOfDaysAbsent', value)}
            type='number'
            placeholder='[number]'
          />
        </div>
      </div>

      <div className='row'>
        
        <div className='col-md-6'>
          <FormField
            label='Less : Statutory / Public Holiday/Sunday Included'
            name='travelDetails.lessStatutoryPublicHolidaySundayIncluded'
            value={values.lessStatutoryPublicHolidaySundayIncluded}
            onChange={(value) => setFieldValue('travelDetails.lessStatutoryPublicHolidaySundayIncluded', value)}
            type='number'
            placeholder='[number]'
          />
        </div>
        <div className='col-md-6'>
          <FormField
            label='Net Working Days Leave Requested'
            name='travelDetails.netWorkingDaysLeaveRequested'
            value={values.netWorkingDaysLeaveRequested}
            onChange={(value) => setFieldValue('travelDetails.netWorkingDaysLeaveRequested', value)}
            type='number'
            placeholder='[number]'
          />
        </div>
      </div>
    </FormSection>
  )
}
