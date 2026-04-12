import { useState, useContext, useEffect } from 'react'
import { Form, Formik } from 'formik'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AlertMessengerContext } from '../../../../components'
import { UserData, createUserSchemas, latestValues } from '../core/_models'
import { getUserById, updateUser } from '../core/_requests'
import { UserForm } from './UserForm'
import { cache_users } from '../../../../constans'
import { SocketListenerRoomReactQuery, UseReactQuery } from '../../../../functions'
import { useQueryClient } from '@tanstack/react-query'
import { KTSVG } from '../../../../../_metronic'

const UserUpdate = () => {
  let navigate = useNavigate()
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();

  const cacheName = `${cache_users}/${id}` 

  const { addSuccessMessage, addErrorMessage } = useContext(AlertMessengerContext);
  const { data, isLoading, error } = UseReactQuery({ func: () => getUserById(id), cacheName });

  const [isSubmit, setIsSubmit] = useState(false)

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
    updateUser(data?.id, values)
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
  
  useEffect(() => {
    SocketListenerRoomReactQuery(`users_${id}`, queryClient, cacheName)
  }, [])

  return (
      <Formik validationSchema={createUserSchemas} initialValues={latestValues(data)} onSubmit={submitStep} enableReinitialize={true}>
        {(formProps) => (
          <Form className='mx-auto mw-1000px w-100' id='kt_create_account_form'>
            <UserForm formProps={formProps} isUpdate={true} />
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

export {UserUpdate}
