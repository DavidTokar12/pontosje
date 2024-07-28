// websocketMiddleware.js
import { WEBSOCKET_CONNECT, WEBSOCKET_DISCONNECT, WEBSOCKET_SEND, WEBSOCKET_MESSAGE_RECEIVED, WEBSOCKET_ERROR } from './websocketActions';

let websocket = null;

const websocketMiddleware = store => next => action => {

    const onOpen = () => {
        console.log('WebSocket connection established');
    };

    const onMessage = (event) => {
        store.dispatch({ type: WEBSOCKET_MESSAGE_RECEIVED, payload: event.data });
    };

    const onClose = () => {
        console.log('WebSocket connection closed');
    };

    const onError = (error) => {
        console.error('WebSocket error:', error);
        store.dispatch({ type: WEBSOCKET_ERROR, payload: error.message });
    };

    switch (action.type) {
        case WEBSOCKET_CONNECT:
            try {
                if (websocket !== null) {
                    websocket.close();
                }
                websocket = new WebSocket('ws://localhost:8000/ws/grammar/');
                websocket.onopen = onOpen;
                websocket.onmessage = onMessage;
                websocket.onclose = onClose;
                websocket.onerror = onError;
            } catch (error) {
                console.error('WebSocket error:', error);
                store.dispatch({ type: WEBSOCKET_ERROR, payload: error.message });
            }
            break;

        case WEBSOCKET_DISCONNECT:
            if (websocket !== null) {
                websocket.close();
            }
            websocket = null;
            break;

        case WEBSOCKET_SEND:
            if (websocket !== null) {
                websocket.send(action.payload);
            }
            break;

        default:
            break;
    }

    return next(action);
};

export default websocketMiddleware;