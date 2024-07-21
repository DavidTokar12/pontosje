import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import appReducer from './slices/appSlice';
import websocketMiddleware from './slices/websocket/websocketMiddleware';
import websocketReducer from './slices/websocket/websocketSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        app: appReducer,
        websocket: websocketReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(websocketMiddleware),
});

export default store;