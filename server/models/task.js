import mongoose, { Schema } from 'mongoose';

const taskSchema = new Schema(
  {
    title: String,
    description: String,
    completed: Boolean,
    created_by: String,
    user_group: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('tasks', taskSchema);
