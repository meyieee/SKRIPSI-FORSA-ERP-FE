import axios from 'axios'
import {AuthModel} from './_models'
import { removeAuth, setAuth } from './AuthHelpers';
import { client } from '../../../functions';

const API_URL = process.env.REACT_APP_API_URL

export const LOGIN_URL = `/users/login`
export const SESSION_URL = `/users/session`
export const LOGOUT_URL = `/users/logout`
export const REGISTER_URL = `/users/registration`
export const REQUEST_PASSWORD_URL = `${API_URL}/forgot_password`
export const CHECKING_EXISTING_ADMIN = `/users/check-existing-admin`

export const getUserSession = async (result: AuthModel  | undefined) => {
  if (!result || typeof result !== "object" || !result.user || !result.user.name || typeof result.user.name !== "string") {
    return; 
  }

  await client()
    .get(`${SESSION_URL}/${result.user.name}`)
    .then((res) => {
      if (res.data && res.data.user) {
        const updatedValue = { ...result, user: res.data.user };
        setAuth(updatedValue)

        if ((updatedValue.user.status === 0 || updatedValue.user['employees.status'] !== 'Active') && updatedValue.user.id_number !== 'HO') {
          removeAuth()
        }
      }
    })
    .catch((err) => {
      // console.log("error:", err.response.data.message)
    });
};


// Server should return AuthModel
export function login(name: string | null, password: string | null) {
  return axios.post<AuthModel>(LOGIN_URL, {name, password},{ withCredentials:true })
}

// Server should return AuthModel
export function register(values:any) {
  return axios.post(REGISTER_URL, values)
}

export function requestPassword(email: string) {
  return axios.post<{result: boolean}>(REQUEST_PASSWORD_URL, {
    email,
  })
}

export async function checkingExistingAdmin() {
  const response = await axios.get(CHECKING_EXISTING_ADMIN)
  return response.status;
}
