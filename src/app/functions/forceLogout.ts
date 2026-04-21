import axios from 'axios';
import { removeAuth } from '../modules/auth/core/AuthHelpers';
import { LOGOUT_URL } from '../modules/auth/core/_requests';
import { apiBaseUrl } from './base_url';

export const forceLogout = () => {
    removeAuth()
    window.location.href = '/login';
    axios.post(`${apiBaseUrl}${LOGOUT_URL}`, { name: 'dummyUser' }, { withCredentials:true }).catch(() => null)
    return null
};
