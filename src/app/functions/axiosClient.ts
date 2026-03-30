import axios from 'axios';
import { fullUrlServer } from "./base_url";
import { getAuth, setAuth } from '../modules/auth/core/AuthHelpers';
import { forceLogout } from './forceLogout';

let isRefreshing = false;

export const client = () => {
    const result = getAuth();
    if (!result || !result.user?.name) {
        forceLogout();
        return axios.create(); // Kembalikan instance kosong agar tidak error
    }

    const axiosInstance = axios.create({
        baseURL: `${fullUrlServer}/api`,
        withCredentials: true
    });

    axiosInstance.interceptors.response.use(
        (response) => response,
        async (error) => {
            if (!error.response) {
                console.error("Network error or no response from server.", error);
                return Promise.reject({ message: "Network error. Please try again later." });
            }

            const { status, config: originalRequest } = error.response;

            if (status === 403 && !originalRequest._retry) {
                if (isRefreshing) {
                    return Promise.reject({ message: "Session refresh already in progress." });
                }

                isRefreshing = true;
                originalRequest._retry = true;

                try {
                    //jika akses token sudah kadaluarsa, maka akan dibuatkan akses token yang baru
                    const { data } = await axios.post(`${fullUrlServer}/api/users/specific`,{ name: result?.user?.name }, { withCredentials: true });
                    setAuth(data)
                    
                    isRefreshing = false;
                    return axiosInstance(originalRequest);
                } catch (refreshError) {
                    console.error("Error refreshing token:", refreshError);
                    // isRefreshing = false;
                    forceLogout();
                    return Promise.reject({ message: "Failed to refresh session. Please log in again." });
                }
            }

            return Promise.reject(error);
        }
    );

    return axiosInstance;
};