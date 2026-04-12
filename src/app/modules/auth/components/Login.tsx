import { useState } from 'react'
import api from 'axios'
import * as Yup from 'yup'
import clsx from 'clsx'
import {useFormik} from 'formik'
import {login} from '../core/_requests'
import {useAuth} from '../core/Auth'
import { fullUrlServer } from '../../../functions/base_url'
import {AuthModel} from '../core/_models'

api.defaults.baseURL = `${fullUrlServer}/api`;

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
  const {saveAuth, setCurrentUser} = useAuth()

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      try {
        const response = await login(values.name, values.password)
        const data = response.data as AuthModel
        // Ensure permissions array exists
        const authData: AuthModel = {
          token: data.token ?? null,
          id: data.id ?? null,
          user: data.user ?? null,
          permissions: data.permissions || []
        }
        saveAuth(authData)
        // Use data.user directly, convert null to undefined
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

  return (
    <form
      className='form w-100'
      onSubmit={formik.handleSubmit}
      noValidate
      id='kt_login_signin_form'
    >
       
       {/* <button type='button' onClick={getDummyUserSession}>
          testing temp token
        </button> */}

      <header className='text-center mb-10'>
        <p className='text-muted fw-semibold fs-6 mb-3'>Welcome back. Please sign in to continue.</p>
        <h1 className='text-dark mb-3'>Sign In to FORSA</h1>
      </header>

      {formik.status ? (
        <p className='mb-lg-15 alert alert-danger'>
          <span className='alert-text font-weight-bold'>{formik.status}</span>
        </p>
      ) : null}

      <section className='fv-row mb-10'>
        <label className='form-label fs-6 fw-bolder text-dark'>Username</label>
        <input
          placeholder='Username'
          {...formik.getFieldProps('name')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {'is-invalid': formik.touched.name && formik.errors.name},
            {
              'is-valid': formik.touched.name && !formik.errors.name,
            }
          )}
          name='name'
          autoComplete='off'
        />
        {formik.touched.name && formik.errors.name && (
          <p className='fv-plugins-message-container'>
            <span role='alert'>{formik.errors.name}</span>
          </p>
        )}
      </section>

      <section className='fv-row mb-10'>
        <section className='d-flex justify-content-between mt-n5'>
          <label className='form-label fw-bolder text-dark fs-6'>Password</label>
        </section>
        <input
          placeholder="Password"
          type='password'
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
          className='btn btn-lg btn-primary w-100 mb-5'
          disabled={formik.isSubmitting || !formik.isValid}
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
