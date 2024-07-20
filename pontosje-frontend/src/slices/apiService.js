import api from './api';

export const login = async (username, password) => {
    const response = await api.post('/login/', { username, password });
    return response.data;
};

export const logout = async () => {
    const response = await api.post('/logout/');
    return response.data;
};