import { useState, useContext } from 'react'
import { Form, Formik } from 'formik'
import { AlertMessengerContext } from '../../../../components'
import { UserData, createUserSchemas } from '../core/_models'
import { addUser } from '../core/_requests'
import { Link, useNavigate } from 'react-router-dom'
import { UserForm } from './UserForm'
import { KTSVG } from '../../../../../_metronic'

const UserCreate = () => {
  let navigate = useNavigate()
  const { addSuccessMessage, addErrorMessage } = useContext(AlertMessengerContext);
  const [isSubmit, setIsSubmit] = useState(false)

  const initValues = {
    id_number: '',
    name: '',
    role: '',
    status: true,
    branch_code: '',
    department: '',
    com_name: '',
    department_des: '',
  }

  function onSuccess(msg: string) {
    const time = new Date().toLocaleString();
    addSuccessMessage({
      title: `Success!`,
      message: `${msg} - time: ${time}`
    });
  };

  function onError(msg: string) {
    const time = new Date().toLocaleTimeString();
    addErrorMessage({
      title: `Error!`,
      message: `${msg}
      ${time}`
    });
  };

  const submitStep = (values: UserData) => {
    setIsSubmit(true)
    addUser(values)
    .then(res => {
      onSuccess(res.data.message)
      setTimeout(() => {
        navigate('/controls/account-settings')
      }, 1500)
    })
    .catch((err)=>{
      onError(err.response.data.message);
      setIsSubmit(false)
    })
  }

	return (
      <Formik validationSchema={createUserSchemas} initialValues={initValues} onSubmit={submitStep}>
        {(formProps) => (
          <Form className='mx-auto mw-1000px w-100' id='kt_create_account_form'>
            <UserForm formProps={formProps} isUpdate={false}/>
            <div className='d-flex justify-content-end align-items-center gap-3 pt-15'>
              <Link to='/controls/account-settings' className='btn btn-icon btn-light-primary' title='Back to table'>
                <KTSVG path='/media/icons/duotune/arrows/arr063.svg' className='svg-icon-2 m-0' />
              </Link>
              <button
                type='submit'
                disabled={isSubmit}
                className='btn btn-lg btn-primary'
              >
                <span className='indicator-label'>
                  Submit
                  <KTSVG path='/media/icons/duotune/arrows/arr064.svg' className='svg-icon-3 ms-2 me-0' />
                </span>
              </button>
            </div>
          </Form>
        )}
      </Formik>
	)
}

export {UserCreate}
