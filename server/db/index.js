import mongoose from 'mongoose';

export const createDBConnection = () =>
  mongoose
    .connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}.5zp2uga.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() => console.log('DB connection established.'))
    .catch(() => console.log('DB connection failed.'));
