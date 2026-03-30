import {useFormik} from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
import {register} from '../core/_requests'
import {Link} from 'react-router-dom'

const initialValues = {
  name: 'admin',
  // password: '12345678',
  // changepassword: '12345678',
  role:'administrator',
  id_number: '000000000000001',
  branch_code:'ABASE-001',
  com_name: 'Andalan Banua Sejahtera',
  first_name: 'Admin',
  last_name: ''
}

const registrationSchema = Yup.object().shape({
  branch_code: Yup.string()
    .max(15, 'Maximum characters reached')
    .min(4, 'Minimum characters reached')
    .matches(/^\S*$/, 'No space allowed')
    .required('Company Code is required'),
  com_name: Yup.string()
    .max(150, 'Maximum characters reached')
    .min(4, 'Minimum characters reached')
    .required('Company Name is required'),
  id_number: Yup.string()
    .max(15, 'Maximum characters reached')
    .min(4, 'Minimum characters reached')
    .matches(/^\S*$/, 'No space allowed')
    .required('ID number user is required'),
  first_name: Yup.string()
    .max(50, 'Maximum characters reached')
    .matches(/^\S*$/, 'No space allowed')
    .min(1, 'Minimum characters reached')
    .required('First Name is required'),
  last_name: Yup.string()
  .max(50, 'Maximum characters reached')
  .matches(/^\S*$/, 'No space allowed'),
  name: Yup.string()
    .max(25, 'Maximum characters reached')
    .min(4, 'Minimum characters reached')
    .matches(/^\S*$/, 'No space allowed')
    .required('username is required'),
  // password: Yup.string()
  //   .min(4, 'Minimum 4 symbols')
  //   .max(50, 'Maximum 50 symbols')
  //   .matches(/^\S*$/, 'No space allowed')
  //   .required('Password is required'),
  // changepassword: Yup.string()
  //   .required('Password confirmation is required')
  //   .matches(/^\S*$/, 'No space allowed')
  //   .when('password', {
  //     is: (val: string) => (val && val.length > 0 ? true : false),
  //     then: Yup.string().oneOf([Yup.ref('password')], "Password and Confirm Password didn't match"),
  //   }),
})

export const Registration = () => {
  const formik = useFormik({
    initialValues,
    validationSchema: registrationSchema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      setSubmitting(true);
      register(values)
        .then((response) => {
          setStatus({ message: response.data.message, status: true });
          setSubmitting(false);
        })
        .catch((error) => {
          const err = error as any;
          const errorMessage = err.response?.data?.message || err.message || 'The registration details is incorrect';
          setStatus({ message: errorMessage, status: false });
          setSubmitting(false);
        });
    },
  })

  return (
    <form
      className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
      noValidate
      id='kt_login_signup_form'
      onSubmit={formik.handleSubmit}
    >
      <header className='mb-10 text-center'>
        <h1 className='text-dark mb-3'>Create an Account</h1>
      </header>

      {formik.status && (
        <p className={`mb-lg-15 alert ${formik.status.status === true ? 'alert-success' : 'alert-danger'}`}>
          <span className='alert-text font-weight-bold'>{formik.status.message}</span>
        </p>
      )}

      <header className='mb-10 text-left'><h2 className='text-dark mb-3'>Company Detail</h2></header>

      <main className='fv-row mb-7'>
        <label className='form-label fw-bolder text-dark fs-6'>Company Code</label>
        <input
          placeholder='company code'
          type='text'
          autoComplete='off'
          {...formik.getFieldProps('branch_code')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {'is-invalid': formik.touched.branch_code && formik.errors.branch_code},
            {
              'is-valid': formik.touched.branch_code && !formik.errors.branch_code,
            }
          )}
        />
        {formik.touched.branch_code && formik.errors.branch_code && (
          <section className='fv-plugins-message-container'>
            <p className='fv-help-block'>
              <span role='alert'>{formik.errors.branch_code}</span>
            </p>
          </section>
        )}
      </main>

      <main className='fv-row mb-7'>
        <label className='form-label fw-bolder text-dark fs-6'>Company Name</label>
        <textarea
          placeholder='company name'
          autoComplete='off'
          {...formik.getFieldProps('com_name')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {'is-invalid': formik.touched.com_name && formik.errors.com_name},
            {
              'is-valid': formik.touched.com_name && !formik.errors.com_name,
            }
          )}
        />
        {formik.touched.com_name && formik.errors.com_name && (
          <section className='fv-plugins-message-container'>
            <p className='fv-help-block'>
              <span role='alert'>{formik.errors.com_name}</span>
            </p>
          </section>
        )}
      </main>

      <br/>
      <header className='mb-10 text-left'><h2 className='text-dark mb-3'>User Detail</h2></header>

      <main className='fv-row mb-7'>
        <label className='form-label fw-bolder text-dark fs-6'>ID Number</label>
        <input
          placeholder='id number'
          type='text'
          autoComplete='off'
          {...formik.getFieldProps('id_number')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {'is-invalid': formik.touched.id_number && formik.errors.id_number},
            {
              'is-valid': formik.touched.id_number && !formik.errors.id_number,
            }
          )}
        />
        {formik.touched.id_number && formik.errors.id_number && (
          <section className='fv-plugins-message-container'>
            <p className='fv-help-block'>
              <span role='alert'>{formik.errors.id_number}</span>
            </p>
          </section>
        )}
      </main>

      <main className='fv-row mb-7'>
        <label className='form-label fw-bolder text-dark fs-6'>First Name</label>
        <input
          placeholder='first name'
          type='text'
          autoComplete='off'
          {...formik.getFieldProps('first_name')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {'is-invalid': formik.touched.first_name && formik.errors.first_name},
            {
              'is-valid': formik.touched.first_name && !formik.errors.first_name,
            }
          )}
        />
        {formik.touched.first_name && formik.errors.first_name && (
          <section className='fv-plugins-message-container'>
            <p className='fv-help-block'>
              <span role='alert'>{formik.errors.first_name}</span>
            </p>
          </section>
        )}
      </main>

      <main className='fv-row mb-7'>
        <label className='form-label fw-bolder text-dark fs-6'>Last Name</label>
        <input
          placeholder='last name'
          type='text'
          autoComplete='off'
          {...formik.getFieldProps('last_name')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {'is-invalid': formik.touched.last_name && formik.errors.last_name},
            {
              'is-valid': formik.touched.last_name && !formik.errors.last_name,
            }
          )}
        />
        {formik.touched.last_name && formik.errors.last_name && (
          <section className='fv-plugins-message-container'>
            <p className='fv-help-block'>
              <span role='alert'>{formik.errors.last_name}</span>
            </p>
          </section>
        )}
      </main>

      <main className='fv-row mb-7'>
        <label className='form-label fw-bolder text-dark fs-6'>Username</label>
        <input
          disabled
          placeholder='Username'
          type='text'
          autoComplete='off'
          {...formik.getFieldProps('name')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {'is-invalid': formik.touched.name && formik.errors.name},
            {
              'is-valid': formik.touched.name && !formik.errors.name,
            }
          )}
        />
        {formik.touched.name && formik.errors.name && (
          <section className='fv-plugins-message-container'>
            <p className='fv-help-block'>
              <span role='alert'>{formik.errors.name}</span>
            </p>
          </section>
        )}
      </main>

      {/* <main className='mb-10 fv-row' data-kt-password-meter='true'>
        <section className='mb-1'>
          <label className='form-label fw-bolder text-dark fs-6'>Password</label>
          <section className='position-relative mb-3'>
            <input
              // type='password'
              disabled
              placeholder='Password'
              autoComplete='off'
              {...formik.getFieldProps('password')}
              className={clsx(
                'form-control form-control-lg form-control-solid',
                {
                  'is-invalid': formik.touched.password && formik.errors.password,
                },
                {
                  'is-valid': formik.touched.password && !formik.errors.password,
                }
              )}
            />
            {formik.touched.password && formik.errors.password && (
              <section className='fv-plugins-message-container'>
                <p className='fv-help-block'>
                  <span role='alert'>{formik.errors.password}</span>
                </p>
              </section>
            )}
          </section>
        </section>
      </main>

      <main className='fv-row mb-5'>
        <label className='form-label fw-bolder text-dark fs-6'>Confirm Password</label>
        <input
          // type='password'
          placeholder='Password confirmation'
          autoComplete='off'
          {...formik.getFieldProps('changepassword')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {
              'is-invalid': formik.touched.changepassword && formik.errors.changepassword,
            },
            {
              'is-valid': formik.touched.changepassword && !formik.errors.changepassword,
            }
          )}
        />
        {formik.touched.changepassword && formik.errors.changepassword && (
          <section className='fv-plugins-message-container'>
            <p className='fv-help-block'>
              <span role='alert'>{formik.errors.changepassword}</span>
            </p>
          </section>
        )}
      </main> */}

      <section className='text-center'>
        <button
          type='submit'
          id='kt_sign_up_submit'
          className='btn btn-lg btn-primary w-100 mb-5'
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!formik.isSubmitting && <span className='indicator-label'>Submit</span>}
          {formik.isSubmitting && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Please wait...{' '}
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
        <Link to='/auth/login'>
          <button
            type='button'
            id='kt_login_signup_form_cancel_button'
            className='btn btn-lg btn-light-primary w-100 mb-5'
          >
            Cancel
          </button>
        </Link>
      </section>
    </form>
  )
}











/*
// Original Code


import {useState, useEffect} from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
import {register} from '../core/_requests'
import {Link} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import {PasswordMeterComponent} from '../../../../_metronic/assets/ts/components'
import {useAuth} from '../core/Auth'

const initialValues = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  changepassword: '',
  acceptTerms: false,
}

const registrationSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('First name is required'),
  email: Yup.string()
    .email('Wrong email format')
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Email is required'),
  lastname: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Last name is required'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
  changepassword: Yup.string()
    .required('Password confirmation is required')
    .when('password', {
      is: (val: string) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf([Yup.ref('password')], "Password and Confirm Password didn't match"),
    }),
  acceptTerms: Yup.bool().required('You must accept the terms and conditions'),
})

export function Registration() {
  const [loading, setLoading] = useState(false)
  const {saveAuth, setCurrentUser} = useAuth()
  const formik = useFormik({
    initialValues,
    validationSchema: registrationSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      try {
        const {data: auth} = await register(
          values.email,
          values.firstname,
          values.lastname,
          values.password,
          values.changepassword
        )
        // saveAuth(auth)
        // setCurrentUser(user)
      } catch (error) {
        saveAuth(undefined)
        setStatus('The registration details is incorrect')
        setSubmitting(false)
        setLoading(false)
      }
    },
  })

  useEffect(() => {
    PasswordMeterComponent.bootstrap()
  }, [])

  return (
    <form
      className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
      noValidate
      id='kt_login_signup_form'
      onSubmit={formik.handleSubmit}
    >
      <header className='mb-10 text-center'>
        <h1 className='text-dark mb-3'>Create an Account</h1>
        <p className='text-gray-400 fw-bold fs-4'>
          Already have an account?
          <Link to='/auth/login' className='link-primary fw-bolder' style={{marginLeft: '5px'}}>
            Forgot Password ?
          </Link>
        </p>
      </header>

      <button type='button' className='btn btn-light-primary fw-bolder w-100 mb-10'>
        <img
          alt='Logo'
          src={toAbsoluteUrl('/media/svg/brand-logos/google-icon.svg')}
          className='h-20px me-3'
        />
        Sign in with Google
      </button>

      <p className='d-flex align-items-center mb-10'>
        <span className='border-bottom border-gray-300 mw-50 w-100'></span>
        <span className='fw-bold text-gray-400 fs-7 mx-2'>OR</span>
        <span className='border-bottom border-gray-300 mw-50 w-100'></span>
      </p>

      {formik.status && (
        <p className='mb-lg-15 alert alert-danger'>
          <span className='alert-text font-weight-bold'>{formik.status}</span>
        </p>
      )}

      <main className='row fv-row mb-7'>
        <section className='col-xl-6'>
          <label className='class="form-label fw-bolder text-dark fs-6'>First name</label>
          <input
            placeholder='First name'
            type='text'
            autoComplete='off'
            {...formik.getFieldProps('firstname')}
            className={clsx(
              'form-control form-control-lg form-control-solid',
              {
                'is-invalid': formik.touched.firstname && formik.errors.firstname,
              },
              {
                'is-valid': formik.touched.firstname && !formik.errors.firstname,
              }
            )}
          />
          {formik.touched.firstname && formik.errors.firstname && (
            <section className='fv-plugins-message-container'>
              <p className='fv-help-block'>
                <span role='alert'>{formik.errors.firstname}</span>
              </p>
            </section>
          )}
        </section>
        <section className='col-xl-6'>
          <section className='fv-row mb-5'>
            <label className='form-label fw-bolder text-dark fs-6'>Last name</label>
            <input
              placeholder='Last name'
              type='text'
              autoComplete='off'
              {...formik.getFieldProps('lastname')}
              className={clsx(
                'form-control form-control-lg form-control-solid',
                {
                  'is-invalid': formik.touched.lastname && formik.errors.lastname,
                },
                {
                  'is-valid': formik.touched.lastname && !formik.errors.lastname,
                }
              )}
            />
            {formik.touched.lastname && formik.errors.lastname && (
              <section className='fv-plugins-message-container'>
                <p className='fv-help-block'>
                  <span role='alert'>{formik.errors.lastname}</span>
                </p>
              </section>
            )}
          </section>
        </section>
      </main>

      <main className='fv-row mb-7'>
        <label className='form-label fw-bolder text-dark fs-6'>Email</label>
        <input
          placeholder='Email'
          type='email'
          autoComplete='off'
          {...formik.getFieldProps('email')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {'is-invalid': formik.touched.email && formik.errors.email},
            {
              'is-valid': formik.touched.email && !formik.errors.email,
            }
          )}
        />
        {formik.touched.email && formik.errors.email && (
          <section className='fv-plugins-message-container'>
            <p className='fv-help-block'>
              <span role='alert'>{formik.errors.email}</span>
            </p>
          </section>
        )}
      </main>

      <main className='mb-10 fv-row' data-kt-password-meter='true'>
        <section className='mb-1'>
          <label className='form-label fw-bolder text-dark fs-6'>Password</label>
          <section className='position-relative mb-3'>
            <input
              type='password'
              placeholder='Password'
              autoComplete='off'
              {...formik.getFieldProps('password')}
              className={clsx(
                'form-control form-control-lg form-control-solid',
                {
                  'is-invalid': formik.touched.password && formik.errors.password,
                },
                {
                  'is-valid': formik.touched.password && !formik.errors.password,
                }
              )}
            />
            {formik.touched.password && formik.errors.password && (
              <section className='fv-plugins-message-container'>
                <p className='fv-help-block'>
                  <span role='alert'>{formik.errors.password}</span>
                </p>
              </section>
            )}
          </section>
          <p
            className='d-flex align-items-center mb-3'
            data-kt-password-meter-control='highlight'
          >
            <span className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></span>
            <span className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></span>
            <span className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></span>
            <span className='flex-grow-1 bg-secondary bg-active-success rounded h-5px'></span>
          </p>
        </section>
        <p className='text-muted'>
          Use 8 or more characters with a mix of letters, numbers & symbols.
        </p>
      </main>

      <main className='fv-row mb-5'>
        <label className='form-label fw-bolder text-dark fs-6'>Confirm Password</label>
        <input
          type='password'
          placeholder='Password confirmation'
          autoComplete='off'
          {...formik.getFieldProps('changepassword')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {
              'is-invalid': formik.touched.changepassword && formik.errors.changepassword,
            },
            {
              'is-valid': formik.touched.changepassword && !formik.errors.changepassword,
            }
          )}
        />
        {formik.touched.changepassword && formik.errors.changepassword && (
          <section className='fv-plugins-message-container'>
            <p className='fv-help-block'>
              <span role='alert'>{formik.errors.changepassword}</span>
            </p>
          </section>
        )}
      </main>

      <main className='fv-row mb-10'>
        <section className='form-check form-check-custom form-check-solid'>
          <input
            className='form-check-input'
            type='checkbox'
            id='kt_login_toc_agree'
            {...formik.getFieldProps('acceptTerms')}
          />
          <label
            className='form-check-label fw-bold text-gray-700 fs-6'
            htmlFor='kt_login_toc_agree'
          >
            I Agree the{' '}
            <Link to='/auth/terms' className='ms-1 link-primary'>
              terms and conditions
            </Link>
            .
          </label>
          {formik.touched.acceptTerms && formik.errors.acceptTerms && (
            <section className='fv-plugins-message-container'>
              <p className='fv-help-block'>
                <span role='alert'>{formik.errors.acceptTerms}</span>
              </p>
            </section>
          )}
        </section>
      </main>

      <section className='text-center'>
        <button
          type='submit'
          id='kt_sign_up_submit'
          className='btn btn-lg btn-primary w-100 mb-5'
          disabled={formik.isSubmitting || !formik.isValid || !formik.values.acceptTerms}
        >
          {!loading && <span className='indicator-label'>Submit</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Please wait...{' '}
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
        <Link to='/auth/login'>
          <button
            type='button'
            id='kt_login_signup_form_cancel_button'
            className='btn btn-lg btn-light-primary w-100 mb-5'
          >
            Cancel
          </button>
        </Link>
      </section>
    </form>
  )
}
*/