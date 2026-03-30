import {FC} from 'react'
import {Link} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'

const Error403: FC = () => {
  return (
    <div className='d-flex flex-column flex-root'>
      <div className='d-flex flex-column flex-center flex-column-fluid p-10'>
        {/* begin::Illustration */}
        <img
          src={toAbsoluteUrl('/media/illustrations/sketchy-1/18.png')}
          alt=''
          className='mw-100 mb-10 h-lg-450px'
        />
        {/* end::Illustration */}
        {/* begin::Message */}
        <h1 className='fw-bold mb-10' style={{color: '#A3A3C7'}}>
          Access Denied
        </h1>
        <p className='fs-3 fw-semibold text-gray-700 mb-7'>
          You don't have permission to access this page.
        </p>
        {/* end::Message */}
        {/* begin::Link */}
        <Link to='/home/overview' className='btn btn-primary'>
          Return Home
        </Link>
        {/* end::Link */}
      </div>
    </div>
  )
}

export {Error403}

