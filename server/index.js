import express, { json } from 'express';
import morgan from 'morgan';
import { createDBConnection } from './db/index.js';
import 'dotenv/config';
import cors from 'cors';
import authRoutes from './routes/user.js';

const app = express();
app.use(morgan('dev'));
app.use(json());

app.use(
  cors({
    origin: '*',
  })
);

app.use('/auth', authRoutes);

app.listen(4000, () => {
  console.log('Server listening on 4000');
  createDBConnection();
});
