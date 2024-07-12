import { io } from 'socket.io-client';

export const socketService = io(process.env.SOCKET_URL, {
	path: '/socket',
});
