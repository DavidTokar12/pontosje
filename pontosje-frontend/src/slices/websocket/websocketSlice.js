// src/slices/websocketSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { WEBSOCKET_MESSAGE_RECEIVED, WEBSOCKET_ERROR, connectWebSocket, disconnectWebSocket, sendWebSocketMessage } from './websocketActions';

const initialState = {
    messages: [],
    error: null,
    status: 'idle',
};

export const initializeWebSocketConnection = createAsyncThunk(
    'websocket/initializeWebSocketConnection',
    async (_, { dispatch }) => {

        dispatch(connectWebSocket());
    }
);

export const terminateWebSocketConnection = createAsyncThunk(
    'websocket/terminateWebSocketConnection',
    async (_, { dispatch }) => {
        dispatch(disconnectWebSocket());
    }
);

export const sendWebsocketMessage = createAsyncThunk(
    'websocket/sendMessage',
    async (message, { dispatch }) => {
        dispatch(sendWebSocketMessage(message));
    }
);

const websocketSlice = createSlice({
    name: 'websocket',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(WEBSOCKET_MESSAGE_RECEIVED, (state, action) => {
                state.messages.push(action.payload);
                state.error = null;
                state.status = 'connected';
            })
            .addCase(WEBSOCKET_ERROR, (state, action) => {
                state.error = action.payload;
                state.status = 'error';
            })
            .addCase(initializeWebSocketConnection.pending, (state) => {
                state.status = 'connecting';
            })
            .addCase(initializeWebSocketConnection.fulfilled, (state) => {
                state.status = 'connected';
            })
            .addCase(initializeWebSocketConnection.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(terminateWebSocketConnection.pending, (state) => {
                state.status = 'disconnecting';
            })
            .addCase(terminateWebSocketConnection.fulfilled, (state) => {
                state.status = 'disconnected';
            })
            .addCase(terminateWebSocketConnection.rejected, (state) => {
                state.status = 'disconnect_failed';
            });
    },
});

export const selectMessages = (state) => state.websocket.messages;
export const selectWebSocketError = (state) => state.websocket.error;
export const selectWebSocketStatus = (state) => state.websocket.status;

export default websocketSlice.reducer;
