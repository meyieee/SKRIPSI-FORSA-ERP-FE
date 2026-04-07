import { Field, ErrorMessage } from 'formik'

type Props = {
  formProps: any
}

const AccountForm = ({formProps}: Props) => {
  return (
    <main className='w-100'>
      <header className='pb-10 pb-lg-15'>
        <h2 className='fw-bolder text-dark'>Account Form</h2>
        <span className='text-gray-800 text-hover-primary mt-1'>Registered by: {formProps.values.reg_by}</span>
      </header>

      <section className='row mb-7'>
        <section className='col-md-2 fv-row'>
          <label className='d-flex align-items-center form-label'>
            <span className='required'>Account No</span>
          </label>

          <Field
            name='account_no'
            className='form-control form-control-lg form-control-solid'
            disabled={formProps?.initialValues.account_no !== ''}
          />
          <section className='text-danger mt-2'>
            <ErrorMessage name='account_no' />
          </section>
        </section>

        <section className='col-md-10 fv-row'>
          <label className='d-flex align-items-center form-label'>
            <span className='required'>Account Name</span>
          </label>

          <Field
            name='account_name'
            className='form-control form-control-lg form-control-solid'
          />
          <section className='text-danger mt-2'>
            <ErrorMessage name='account_name' />
          </section>
        </section>
      </section>

      <section className='row mb-10'>
        <section className='col-md-4 fv-row'>
          <label className='d-flex align-items-center form-label'>
            <span className='required'>Account Type</span>
          </label>

          <Field
            name='account_type'
            className='form-control form-control-lg form-control-solid'
          />
          <section className='text-danger mt-2'>
            <ErrorMessage name='account_type' />
          </section>
        </section>

        <section className='col-md-4 fv-row'>
          <label className='d-flex align-items-center form-label'>
            <span className='required'>Account Group</span>
          </label>

          <Field
            name='account_group'
            className='form-control form-control-lg form-control-solid'
          />
          <section className='text-danger mt-2'>
            <ErrorMessage name='account_group' />
          </section>
        </section>

        <section className='col-md-4 fv-row'>
          <label className='d-flex align-items-center form-label'>
            <span className='required'>Normally</span>
          </label>

          <Field
            name='normally'
            className='form-control form-control-lg form-control-solid'
          />
          <section className='text-danger mt-2'>
            <ErrorMessage name='normally' />
          </section>
        </section>
      </section>
    </main>
  )
}

export {AccountForm}
