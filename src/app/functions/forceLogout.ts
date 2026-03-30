import axios from 'axios';
import { removeAuth } from '../modules/auth/core/AuthHelpers';
import { LOGOUT_URL } from '../modules/auth/core/_requests';

export const forceLogout = () => {
    removeAuth()
    window.location.href = '/login';
    axios.post(LOGOUT_URL, { name: 'dummyUser' }, { withCredentials:true })
    return null
};