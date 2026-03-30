import CompanyCalendar from './component/Calender'
import HeaderHome from './component/HeaderHome'
import {PersonalFeeds} from './component/PersonalFeeds'
import {HomeNews} from './component/HomeNews'
import CompanyOverview from './component/company-overview/CompanyOverview'
import { useCanAccessRoute } from '../../../../custom-hooks'

export const FiaHomeView = () => {
  const canAccess = useCanAccessRoute('/home/overview')
  
  if (!canAccess) {
    return (
      <div className='alert alert-warning'>
        <h4>Access Denied</h4>
        <p>You don't have permission to access this page.</p>
      </div>
    )
  }
  
  return (
    <>
      {/* Toolbar/Header di bar kosong */}
      <div className='toolbar' id='kt_toolbar'>
        <HeaderHome title='OVERVIEW' />
      </div>

      {/* Content dengan margin-top untuk spacing dari toolbar */}
      <div className='row gy-5 g-xl-8'>
        <div className='col-xxl-4'>
          <PersonalFeeds
            className='card-xl-stretch mb-5'
            chartColor='danger'
            chartHeight='20px'
            strokeColor='#cb1e46'
          />
        </div>
        <div className='col-xxl-8 mb-5'>
          <CompanyOverview />
        </div>
      </div>
      <div className='row gy-5 g-xl-8'>
        <div className='col-xxl-8'>
          <CompanyCalendar />
        </div>
        <div className='col-xxl-4'>
          <HomeNews className='card-xxl-stretch mb-5 mb-xl-8' />
        </div>
      </div>
    </>
  )
}
