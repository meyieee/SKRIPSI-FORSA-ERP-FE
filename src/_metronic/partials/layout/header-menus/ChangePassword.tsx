import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { useAuth } from "../../../../app/modules/auth"
import { AlertMessengerContext } from "../../../../app/components"
import { PasswordUpdateSchema } from "../../../../app/modules/cf/controls-user-management/core/_models"
import { updatePasswordUsers } from "../../../../app/modules/cf/controls-user-management/core/_requests"

const ChangePassword = () => {
  const {currentUser} = useAuth()
  let navigate = useNavigate()
  const [initValues] = useState<{ id_number: string | undefined, current_password: string, new_password: string, confirm_password: string }>({
    id_number: currentUser?.id_number,
    current_password: '',
    new_password: '',
    confirm_password: '',
  })

  const [isSubmit, setIsSubmit] = useState(false)

  const { addSuccessMessage, addErrorMessage } = useContext(AlertMessengerContext);

  function onSuccess(msg: string) {
    const time = new Date().toLocaleTimeString();
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

  const submitStep = async (values: { id_number: string | undefined, current_password: string, new_password: string, confirm_password: string }) => {
    setIsSubmit(true)
    updatePasswordUsers(values, onSuccess, onError, navigate, setIsSubmit)
  }

	return (
    <div className='card'>
      <div className='card-body'>
        <Formik validationSchema={PasswordUpdateSchema} initialValues={initValues} onSubmit={submitStep}>
          {(formProps) => (
            <Form className='mx-auto mw-1000px w-100 pt-10 pb-10' id='kt_create_account_form'>
              <div className='w-100'>
                <div className='pb-10 pb-lg-15'>
                  <h2 className='fw-bolder text-dark'>Change Password Form</h2>
                </div>

                <div className="row mb-1">
                  <div className="col-lg-4">
                    <div className="fv-row mb-0">
                      <label className="d-flex align-items-center form-label">Current Password</label>
                      <Field type="password" className="form-control form-control-lg form-control-solid" name="current_password" />
                      <div className="text-danger mt-2">
                        <ErrorMessage name='current_password' />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="fv-row mb-0">
                      <label className="d-flex align-items-center form-label">New Password</label>
                      <Field type="password" className="form-control form-control-lg form-control-solid" name="new_password" />
                      <div className="text-danger mt-2">
                        <ErrorMessage name='new_password' />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="fv-row mb-0">
                      <label className="d-flex align-items-center form-label">Confirm New Password</label>
                      <Field type="password" className="form-control form-control-lg form-control-solid" name="confirm_password" />
                      <div className="text-danger mt-2">
                        <ErrorMessage name='confirm_password' />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`d-flex flex-stack pt-15`}>
                <div className='mr-2'></div>
                <div>
                  <Link to='/' className='btn btn-color-gray-400 btn-active-light-primary px-6'>Cancel</Link>
                  <button type='submit' disabled={isSubmit !== undefined ? isSubmit : false} className='btn btn-lg btn-primary ms-3'>
                    <span className='indicator-label'>Update Password</span>
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
	)
}

export {ChangePassword}