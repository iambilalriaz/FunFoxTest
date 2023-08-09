import { io } from 'socket.io-client';

export const getAppUser = () =>
  JSON.parse(localStorage.getItem('appUser')) as {
    id: string;
    email: string;
    group: string;
  };

export const socket = io('http://192.168.10.5:4000', {
  transports: ['websocket'],
});
