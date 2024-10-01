import { io } from 'socket.io-client';

const WEBSOCKET_SERVER_URL = process.env.REACT_APP_WS_SERVER;

export const socket = io(`${WEBSOCKET_SERVER_URL}`);
