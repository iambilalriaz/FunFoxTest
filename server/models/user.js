import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema(
  {
    email: String,
    password: String,
    group: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('users', userSchema);
