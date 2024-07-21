// websocketActions.js
export const WEBSOCKET_CONNECT = 'WEBSOCKET_CONNECT';
export const WEBSOCKET_DISCONNECT = 'WEBSOCKET_DISCONNECT';
export const WEBSOCKET_SEND = 'WEBSOCKET_SEND';
export const WEBSOCKET_MESSAGE_RECEIVED = 'WEBSOCKET_MESSAGE_RECEIVED';
export const WEBSOCKET_ERROR = 'WEBSOCKET_ERROR';

export const connectWebSocket = () => ({ type: WEBSOCKET_CONNECT });
export const disconnectWebSocket = () => ({ type: WEBSOCKET_DISCONNECT });
export const sendWebSocketMessage = (message) => ({
    type: WEBSOCKET_SEND,
    payload: message,
});
export const websocketError = (error) => ({
    type: WEBSOCKET_ERROR,
    payload: error,
});
