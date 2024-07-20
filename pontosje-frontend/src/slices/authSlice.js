// src/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login, logout } from './apiService';

export const loginUser = createAsyncThunk('auth/login', async (credentials) => {
    const response = await login(credentials.username, credentials.password);
    return response;
});

export const logoutUser = createAsyncThunk('auth/logout', async () => {
    const response = await logout();
    return response;
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload.user;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
            });
    },
});

export default authSlice.reducer;
