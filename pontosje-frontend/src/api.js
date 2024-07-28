// api.js
import api from './apiConfig';
import Cookies from 'js-cookie';
import store from './store'; // Adjust the path to your store
import { refreshToken } from './slices/authSlice'; // Adjust the path to your authSlice

// Request interceptor to add the access token to headers
api.interceptors.request.use((config) => {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Response interceptor to handle 401 errors
api.interceptors.response.use((response) => {
    return response;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
            const { payload } = await store.dispatch(refreshToken());
            const newAccessToken = payload.access;
            Cookies.set('accessToken', newAccessToken);
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return api(originalRequest);
        } catch (refreshError) {
            return Promise.reject(refreshError);
        }
    }
    return Promise.reject(error);
});

export default api;