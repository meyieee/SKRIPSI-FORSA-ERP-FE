import { NavigateFunction } from 'react-router-dom'
import { client } from '../../../../functions'
import { AccountData } from './_models'

const getAccount = async () => {
  return await client().get('/accounts').then(res => res.data.data)
}

const addAccount = async (values: AccountData, onSuccess: Function, onError: Function, navigate: NavigateFunction, setIsSubmit: React.Dispatch<React.SetStateAction<boolean>>) => {
  await client().post('/account', values)
  .then(res => {
    onSuccess(res.data.message)
    setTimeout(() => {
      navigate('/control-file/master/acc/view')
    }, 1500)
  })
  .catch(err => {
    setIsSubmit(false)
    onError(err.response.data.message)
  })
}

const updateAccount = async (values: AccountData, onSuccess: Function, onError: Function, navigate: NavigateFunction, id: string, setIsSubmit: React.Dispatch<React.SetStateAction<boolean>>) => {
  await client().put(`/account/${id}`, values)
  .then(res => {
    onSuccess(res.data.message)
    setTimeout(() => {
      navigate('/control-file/master/acc/view')
    }, 1500)
  })
  .catch(err => {
    setIsSubmit(false)
    onError(err.response.data.message)
  })
}

const updateStatusAccount = async (id: string, status: boolean, remarks: string, onSuccess: Function, onError: Function) => {
  let updateStatus = !status
  let data = { status: updateStatus, remarks: remarks }

  await client().put(`/account/${id}/status`, data)
    .then(res => {onSuccess(res.data.message)})
    .catch(err => onError(err.response.data.message))
}

export { getAccount, addAccount, updateAccount, updateStatusAccount }
