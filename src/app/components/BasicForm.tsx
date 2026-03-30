import { Field, ErrorMessage } from 'formik'

type Props = {
  formProps: any
  title: string
  code: string
  description: string
}

const BasicForm = ({formProps, title, code, description}: Props) => {
  const accessCode = Object.keys(formProps.values)[0]

  return (
  <div className='w-100'>
    <div className='pb-10 pb-lg-15'>
      <h2 className='fw-bolder text-dark'>{title} Form</h2>
    </div>

    <div className='row mb-10'>
      <div className='col-md-4 fv-row'>
        <label className='d-flex align-items-center form-label'>
          <span className='required'>Code</span>
        </label>

        <Field
          name={code}
          className='form-control form-control-lg form-control-solid'
          disabled={formProps.initialValues[accessCode] !== ''}
        />
        <div className='text-danger mt-2'>
          <ErrorMessage name={code} />
        </div>
      </div>

      <div className='col-md-8 fv-row'>
        <label className='d-flex align-items-center form-label'>
          <span className='required'>Description</span>
        </label>

        <Field
          name={description}
          className='form-control form-control-lg form-control-solid'
        />
        <div className='text-danger mt-2'>
          <ErrorMessage name={description} />
        </div>
      </div>
    </div>
  </div>
  )
}

export default BasicForm
