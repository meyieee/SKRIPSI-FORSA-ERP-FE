import {useEffect} from 'react'
import {Outlet, Route, Routes} from 'react-router-dom'
import {Registration} from './components/Registration'
import {ForgotPassword} from './components/ForgotPassword'
import {Login} from './components/Login'
import {toAbsoluteUrl} from '../../../_metronic/helpers'

const AuthLayout = () => {
  useEffect(() => {
    document.body.classList.add('bg-body')
    document.body.classList.add('auth-page-body')
    return () => {
      document.body.classList.remove('bg-body')
      document.body.classList.remove('auth-page-body')
    }
  }, [])

  return (
    <div
      className='d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain auth-page-shell'
      style={{
        backgroundImage: `url(${toAbsoluteUrl('/media/illustrations/sketchy-1/14.png')})`,
        minHeight: '100vh',
        backgroundSize: 'min(1200px, 100vw)',
      }}
    >
      {/* begin::Content */}
      <div
        className='d-flex flex-center flex-column flex-column-fluid px-6 py-8 px-lg-10 pb-lg-14 auth-page-content'
        style={{
          minHeight: 'calc(100vh - 64px)',
          transform: 'scale(0.84)',
          transformOrigin: 'top center',
        }}
      >
        {/* begin::Logo */}
        <a href='#' className='mb-6 mb-lg-8'>
          <img
            alt='Logo'
            src={toAbsoluteUrl('/media/logos/abase-white.svg')}
            className='auth-page-logo'
            style={{height: 'clamp(34px, 4vw, 46px)'}}
          />
        </a>
        {/* end::Logo */}
        {/* begin::Wrapper */}
        <div
          className='bg-body rounded shadow-sm p-8 p-lg-10 mx-auto auth-page-card'
          style={{
            width: 'min(100%, 430px)',
            paddingInline: 'clamp(0.9rem, 2vw, 1.25rem)',
            paddingBlock: 'clamp(0.9rem, 2vw, 1.25rem)',
          }}
        >
          <Outlet />
        </div>
        {/* end::Wrapper */}
      </div>
      {/* end::Content */}
      {/* begin::Footer */}
      <div className='d-flex flex-center flex-column-auto px-6 pb-8 pt-0'>
        <div className='d-flex align-items-center fw-bold fs-6'>
          <a href='http://abase.id/index.php/Welcome/about' target='_blank' rel='noreferrer' className='text-muted text-hover-primary px-2'>
            About
          </a>

          <a href='http://abase.id/index.php/Welcome/contacts' target='_blank' rel='noreferrer' className='text-muted text-hover-primary px-2'>
            Contact Us
          </a>
        </div>
      </div>
      {/* end::Footer */}
    </div>
  )
}

const AuthPage = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route path='login' element={<Login />} />
      <Route path='registration' element={<Registration />} />
      <Route path='forgot-password' element={<ForgotPassword />} />
      <Route index element={<Login />} />
    </Route>
  </Routes>
)

export {AuthPage}
