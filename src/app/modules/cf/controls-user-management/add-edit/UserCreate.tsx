import { useState, useContext } from 'react'
import { Form, Formik } from 'formik'
import { AlertMessengerContext, BtnSubmit } from '../../../../components'
import { UserData, createUserSchemas } from '../core/_models'
import { addUser } from '../core/_requests'
import { useNavigate } from 'react-router-dom'
import { UserForm } from './UserForm'

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
            <BtnSubmit isSubmit={isSubmit}  />
          </Form>
        )}
      </Formik>
	)
}

export {UserCreate}