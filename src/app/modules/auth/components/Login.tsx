import {useState} from 'react'
import api from 'axios'
import * as Yup from 'yup'
import clsx from 'clsx'
import {useFormik} from 'formik'
import {login} from '../core/_requests'
import {useAuth} from '../core/Auth'
import {apiBaseUrl} from '../../../functions/base_url'
import {AuthModel} from '../core/_models'

api.defaults.baseURL = apiBaseUrl

const loginSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Minimum 3 char')
    .max(50, 'Maximum 50 char')
    .required('Username is required'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Password is required'),
})

const initialValues = {
  name: '',
  password: '',
}

export function Login() {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const {saveAuth, setCurrentUser} = useAuth()

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      try {
        const response = await login(values.name, values.password)
        const data = response.data as AuthModel
        const authData: AuthModel = {
          token: data.token ?? null,
          id: data.id ?? null,
          user: data.user ?? null,
          permissions: data.permissions || [],
        }
        saveAuth(authData)
        if (data.user) {
          setCurrentUser(data.user)
        } else {
          setCurrentUser(undefined)
        }
      } catch (error: any) {
        saveAuth(undefined)
        setStatus(error.response?.data?.message || 'Login failed')
        setSubmitting(false)
        setLoading(false)
      }
    },
  })

  const isNameValid = formik.touched.name && !formik.errors.name
  const isPasswordValid = formik.touched.password && !formik.errors.password

  return (
    <form
      className='form w-100'
      onSubmit={formik.handleSubmit}
      noValidate
      id='kt_login_signin_form'
      style={{maxWidth: 340, margin: '0 auto'}}
    >
      <header className='text-center mb-5'>
        <p className='text-muted fw-semibold mb-2' style={{fontSize: '0.82rem'}}>
          Welcome back. Please sign in to continue.
        </p>
        <h1 className='text-dark mb-1' style={{fontSize: 'clamp(1.18rem, 2vw, 1.55rem)'}}>
          Sign In to FORSA
        </h1>
      </header>

      {formik.status ? (
        <p className='mb-lg-15 alert alert-danger'>
          <span className='alert-text font-weight-bold'>{formik.status}</span>
        </p>
      ) : null}

      <section className='fv-row mb-4'>
        <label className='form-label fw-bolder text-dark mb-2' style={{fontSize: '0.84rem'}}>
          Username
        </label>
        <div className='d-flex align-items-center gap-2'>
          <input
            placeholder='Username'
            {...formik.getFieldProps('name')}
            className={clsx('form-control form-control-solid', {
              'is-invalid': formik.touched.name && formik.errors.name,
            })}
            name='name'
            autoComplete='off'
            style={{minHeight: 42, fontSize: '0.9rem', paddingInline: '0.9rem'}}
          />
          <div style={{width: 20}} className='text-success text-center'>
            {isNameValid ? <i className='bi bi-check-lg fs-2'></i> : null}
          </div>
        </div>
        {formik.touched.name && formik.errors.name && (
          <section className='fv-plugins-message-container'>
            <article className='fv-help-block'>
              <span role='alert'>{formik.errors.name}</span>
            </article>
          </section>
        )}
      </section>

      <section className='fv-row mb-5'>
        <section className='d-flex justify-content-between mt-n5'>
          <label className='form-label fw-bolder text-dark mb-2' style={{fontSize: '0.84rem'}}>
            Password
          </label>
        </section>
        <div className='d-flex align-items-center gap-2'>
          <div className='position-relative flex-grow-1'>
            <input
              placeholder='Password'
              type={showPassword ? 'text' : 'password'}
              autoComplete='off'
              {...formik.getFieldProps('password')}
              className={clsx('form-control form-control-solid', {
                'is-invalid': formik.touched.password && formik.errors.password,
              })}
              style={{minHeight: 42, fontSize: '0.9rem', paddingLeft: '0.9rem', paddingRight: '2.75rem'}}
            />
            <button
              type='button'
              className='btn btn-icon btn-sm position-absolute top-50 end-0 translate-middle-y me-2 text-muted'
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              <i className={showPassword ? 'bi bi-eye fs-4' : 'bi bi-eye-slash fs-4'}></i>
            </button>
          </div>
          <div style={{width: 20}} className='text-success text-center'>
            {isPasswordValid ? <i className='bi bi-check-lg fs-2'></i> : null}
          </div>
        </div>
        {formik.touched.password && formik.errors.password && (
          <section className='fv-plugins-message-container'>
            <article className='fv-help-block'>
              <span role='alert'>{formik.errors.password}</span>
            </article>
          </section>
        )}
      </section>

      <section className='text-center'>
        <button
          type='submit'
          id='kt_sign_in_submit'
          className='btn btn-primary w-100 mb-4'
          disabled={formik.isSubmitting || !formik.isValid}
          style={{minHeight: 44, fontSize: '0.9rem', fontWeight: 700}}
        >
          {!loading && <span className='indicator-label'>Continue</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Please wait...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
      </section>
    </form>
  )
}
