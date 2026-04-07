import { useState , useContext} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Formik, Form } from 'formik'
import { useAuth } from '../../../auth'
import { AlertMessengerContext, BtnSubmit } from "../../../../components";
import { createAccountSchemas, AccountData } from '../core/_models'
import { updateAccount } from '../core/_requests'
import { AccountForm } from './AccountForm'

const EditAccountWrapper = () => {
  const {currentUser} = useAuth()
  const location = useLocation()
  const { id, account_no, account_name, account_type, account_group, normally }: AccountData = location.state as AccountData

  let navigate = useNavigate()
  const [initValues] = useState<AccountData>({
    account_no,
    account_name,
    account_type,
    account_group,
    normally,
    reg_by: currentUser?.id_number
  })
  const { addSuccessMessage, addErrorMessage } = useContext(AlertMessengerContext);
  const [isSubmit, setIsSubmit] = useState(false)

  function onSuccess(msg: string) {
    const time = new Date().toLocaleString();
    addSuccessMessage({
      title: `Success!`,
      message: `${msg} - time: ${time}`
    });
  };

  function onError(msg: string) {
    const time = new Date().toLocaleString();
    addErrorMessage({
      title: `Error!`,
      message: `${msg} - time: ${time}`
    });
  };

  const submitStep = async (values: AccountData) => {
    setIsSubmit(true)
    updateAccount(values, onSuccess, onError, navigate, (id || ''), setIsSubmit)
  }

  return (
    <main className='card'>
      <section className='card-body'>
        <Formik validationSchema={createAccountSchemas} initialValues={initValues} onSubmit={submitStep}>
          {(formProps) => (
            <Form className='mx-auto mw-1000px w-100 pt-10 pb-10' id='kt_create_account_form'>
              <AccountForm formProps={formProps} />
              <BtnSubmit isSubmit={isSubmit}/>
            </Form>
          )}
        </Formik>
      </section>
    </main>
  )
}

export {EditAccountWrapper}
