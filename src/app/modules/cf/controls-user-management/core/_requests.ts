import { NavigateFunction } from 'react-router-dom';
import { client } from '../../../../functions'
import { UserData } from './_models';

const getUsers = async (branch_code: string | null | undefined) => {
  const urlAPI = branch_code === 'HO' ? '/users' : `/users/${branch_code}`
  const response = await client().get(urlAPI)
  return response.data.data;
}

const getRoleCategories = async () => {
  const response = await client().get('/users/role-categories')
  return response.data.data;
}

const getRolesApi = async () => {
  const response = await client().get('/v1/roles');
  return response.data.data;
}

const addV1User = async (values: any) => {
  return await client().post('/v1/users/create', values);
}

const addUser = async (values: UserData) => {

  return await client().post('/users', values)
}

const updateUser =async (id: string, values:Object) => {
  return await client().put(`/users/${id}`, values) 
}

const updateStatusUsers = async (id: string, branch_code: string, status: boolean, remarks: string, onSuccess: Function, onError: Function) => {
  let updateStatus = !status
  let data = { status: updateStatus, remarks, branch_code}

  await client().put(`/users/${id}/status`, data)
    .then(res => {onSuccess(res.data.message)})
    .catch(err => {onError(err.response.data.message)})
}

const updatePasswordUsers = async (values: { id_number: string | undefined, current_password: string, new_password: string, confirm_password: string }, onSuccess: Function, onError: Function, navigate: NavigateFunction, setIsSubmit: React.Dispatch<React.SetStateAction<boolean>>) => {
  await client().put(`/users`, values)
    .then(res => {
      onSuccess(res.data.message)
      setTimeout(() => {
        navigate('/')
      }, 1500)
    })
    .catch(err => {
      setIsSubmit(false)
      onError(err.response.data.message)
    })
}

const resetPasswordUser = async (id_number: string, onSuccess: Function, onError: Function) => {
  await client().put(`/users/password/${id_number}`)
    .then(res => {
      onSuccess(res.data.message)
    })
    .catch(err => {
      onError(err.response.data.message)
    })
}

const getUserById = async(id:string|undefined)=>{
  const response =  await client().get(`/user/${id}`)
  return response.data.data; 
}

export { getUsers, getRolesApi, getRoleCategories, addUser, addV1User, updateUser, updateStatusUsers, updatePasswordUsers, resetPasswordUser, getUserById }
