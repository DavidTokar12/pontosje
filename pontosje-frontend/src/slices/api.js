import axios from 'axios';
import config from '../config';


const api = axios.create({
    baseURL: config.apiBaseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: config.apiTimeout,
    withCredentials: true,
});


api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.error('Unauthorized! Logging out...', error);
        }
        return Promise.reject(error);
    }
);

export default api;