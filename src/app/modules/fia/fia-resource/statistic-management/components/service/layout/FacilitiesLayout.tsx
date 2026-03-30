import React from 'react'
import {Outlet} from 'react-router-dom'
import {SubTabNav} from '../../../../components/ResourceSubTab'
import StatisticFilterBar from '../../StatisticFilterBar'

export const FacilitiesLayout: React.FC = () => {
  return (
    <div className='container-fluid px-0'>
      <div className='mt-0'>
        <StatisticFilterBar />
      </div>

      <SubTabNav
        tabs={[
          {path: 'facilities_overview', label: 'Overview'},
          {path: 'facilities_summary', label: 'Asset Uniform & PPE Summary'},
          {path: 'facilities_asset_details', label: 'Asset Details'},
          {path: 'facilities_uniform_details', label: 'Uniform & PPE Details'},
          {path: 'facilities_more_info', label: 'More Info...'},
        ]}
      />
      <div className='pt-5'>
        <Outlet />
      </div>
    </div>
  )
}
