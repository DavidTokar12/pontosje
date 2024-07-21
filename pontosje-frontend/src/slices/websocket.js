import config from '../config';
const socket = new WebSocket(config.websocketUrl);

socket.onopen = () => {
    console.log('Connected to WebSocket server');
};

socket.onclose = () => {
    console.log('Disconnected from WebSocket server');
};

socket.onerror = (error) => {
    console.error('WebSocket error:', error);
};

socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log('Message from server:', data);
};

export { socket };