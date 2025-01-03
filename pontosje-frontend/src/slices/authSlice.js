import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../config';
import Cookies from 'js-cookie';
import api from '../apiConfig';
import _ from 'lodash';

export const authenticateWithToken = createAsyncThunk('auth/authenticateWithToken', async (_, { rejectWithValue }) => {
    const accessToken = Cookies.get('accessToken');
    try {

        const response = await axios.post(`${config.apiBaseUrl}/api/token/verify/`, {
            token: accessToken,
        });

        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
    try {
        const response = await api.post('/api/token/', credentials);
        Cookies.set('accessToken', response.data.access);
        Cookies.set('refreshToken', response.data.refresh);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});
export const googleLogin = createAsyncThunk('auth/googleLogin', async (authCode, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${config.apiBaseUrl}/api/auth/google/`, { code: authCode });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const refreshToken = createAsyncThunk('auth/refreshToken', async (_, { rejectWithValue }) => {
    const refreshToken = Cookies.get('refreshToken');
    try {
        const response = await api.post('/api/token/refresh/', { refresh: refreshToken });
        Cookies.set('accessToken', response.data.access);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});



export const signup = createAsyncThunk('auth/signup', async (userData, { rejectWithValue }) => {
    try {
        console.log('User data being sent:', userData);
        const response = await axios.post(`${config.apiBaseUrl}/api/signup/`, userData);
        Cookies.set('accessToken', response.data.access);
        Cookies.set('refreshToken', response.data.refresh);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});




const authSlice = createSlice({
    name: 'auth',
    initialState: {
        accessToken: Cookies.get('accessToken') || null,
        refreshToken: Cookies.get('refreshToken') || null,
        status: 'idle',
        error: null,
    },
    reducers: {
        logout(state) {
            state.accessToken = null;
            state.refreshToken = null;
            state.status = 'idle';
            state.error = null;
            // Remove tokens from cookies
            Cookies.remove('accessToken');
            Cookies.remove('refreshToken');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.accessToken = action.payload.access;
                state.refreshToken = action.payload.refresh;

                Cookies.set('accessToken', action.payload.access);
                Cookies.set('refreshToken', action.payload.refresh);
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';

                state.accessToken = null;
                state.accessToken = null;

                Cookies.remove('accessToken');
                Cookies.remove('refreshToken');

                state.error = action.payload;
            })

            .addCase(refreshToken.fulfilled, (state, action) => {
                state.accessToken = action.payload.access;
            })

            .addCase(refreshToken.rejected, (state, action) => {
                state.status = 'failed';

                state.accessToken = null;
                state.refreshToken = null;

                Cookies.remove('accessToken');
                Cookies.remove('refreshToken');

                state.error = action.payload;
            })
            .addCase(googleLogin.fulfilled, (state, action) => {
                state.accessToken = action.payload.access;
                state.refreshToken = action.payload.refresh;

                Cookies.set('accessToken', action.payload.access);
                Cookies.set('refreshToken', action.payload.refresh);
            })
            .addCase(googleLogin.rejected, (state, action) => {
                state.status = 'failed';

                state.accessToken = null;
                state.refreshToken = null;

                Cookies.remove('accessToken');
                Cookies.remove('refreshToken');

                state.error = action.payload;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.accessToken = action.payload.access;
                state.refreshToken = action.payload.refresh;
            })
            .addCase(signup.rejected, (state, action) => {
                state.status = 'failed';

                state.accessToken = null;
                state.refreshToken = null;

                Cookies.remove('accessToken');
                Cookies.remove('refreshToken');

                state.error = action.payload;
            })
            .addCase(authenticateWithToken.fulfilled, (state, action) => {
                state.status = "succeeded";
            })
            .addCase(authenticateWithToken.rejected, (state, action) => {
                state.status = 'failed';

                state.accessToken = null;
                state.refreshToken = null;

                Cookies.remove('accessToken');
                Cookies.remove('refreshToken');

                state.error = action.payload;
            });
        ;
    },
});

export const { logout } = authSlice.actions;

export const selectIsAuthenticated = (state) => { return state.auth.status === "succeeded" };
export const selectToken = (state) => state.auth.accessToken;

export default authSlice.reducer;