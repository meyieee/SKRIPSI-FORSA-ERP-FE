import { io } from 'socket.io-client';
import { urlSocketIo } from './base_url';

const socket = io(urlSocketIo, {
  withCredentials: true,
  transports: ['websocket', 'polling'],
  reconnectionAttempts: 2,
  reconnectionDelay: 1000,
});

export default socket;
