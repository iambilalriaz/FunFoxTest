import { io } from 'socket.io-client';

export const getAppUser = () =>
  JSON.parse(localStorage.getItem('appUser') as string) as {
    id: string;
    email: string;
    group: string;
  };

export const socket = io('http://localhost:4000', {
  transports: ['websocket'],
});
