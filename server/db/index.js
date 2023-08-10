import mongoose from 'mongoose';

export const createDBConnection = () =>
  mongoose
    .connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}.jhytmrk.mongodb.net/`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => console.log('DB connection established.'))
    .catch((err) => console.log('DB connection failed.', err));
