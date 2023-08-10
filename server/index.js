import express, { json } from 'express';
import morgan from 'morgan';
import { createDBConnection } from './db/index.js';
import 'dotenv/config';
import cors from 'cors';
import authRoutes from './routes/user.js';
import taskRoutes from './routes/task.js';
import { Server } from 'socket.io';
import http from 'http';
const app = express();
const server = http.createServer(app);
export const io = new Server(server);

app.use(morgan('dev'));
app.use(json());

app.use(cors());

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

io.on('connection', () => {
  console.log('Socket connection established.');
});
io.off('connection', () => {
  console.log('Socket connection closed.');
});

server.listen(process.env.HTTP_PORT, () => {
  console.log(`Server listening on ${process.env.HTTP_PORT}`);
  createDBConnection();
});
