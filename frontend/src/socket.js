import { io } from 'socket.io-client';
import { BASE_URL } from './utils/api';


export const socket = io(BASE_URL);