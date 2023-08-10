import { io } from '../index.js';
import Task from '../models/task.js';

export const getGroupTasks = async (req, res) => {
  if (!req.userGroup) {
    return res.status(400).json({ message: 'Empty user group.' });
  }

  try {
    const groupTasks = await Task.find({ user_group: req.userGroup });
    groupTasks.sort((t1, t2) => t2.createdAt - t1.createdAt);

    const tasksResponse = groupTasks?.map((task) => ({
      id: task?._id,
      title: task?.title,
      description: task?.description,
      completed: task?.completed,
      created_by: task.created_by,
    }));

    return res.status(200).json(tasksResponse);
  } catch {
    return res.status(500).json({ message: 'Something went wrong.' });
  }
};

export const addTask = async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;

  if (!title || !description) {
    return res
      .status(400)
      .json({ message: 'Please enter all required fields.' });
  }
  try {
    const newTask = new Task({
      title,
      description,
      completed: false,
      user_group: req.userGroup,
      created_by: req.userEmail,
    });
    await newTask.save();
    const tasks = await Task.find({ user_group: req.userGroup });
    tasks.sort((t1, t2) => t2.createdAt - t1.createdAt);
    const tasksResponse = tasks?.map((task) => ({
      id: task?._id,
      title: task?.title,
      description: task?.description,
      completed: task?.completed,
      created_by: task.created_by,
    }));
    io.sockets.emit('UPDATE_TASKS', {
      tasks: tasksResponse,
      group: req.userGroup,
    });
    io.sockets.emit('NOTIFICATION', {
      doer: req.userEmail,
      activity: 'added a task.',
      group: req.userGroup,
    });
    return res.status(201).json({
      message: 'Task added successfully.',
      tasks: tasksResponse,
    });
  } catch {
    return res.status(500).json({ message: 'Something went wrong.' });
  }
};

export const removeTask = async (req, res) => {
  const taskId = req.params.taskId;
  if (!taskId) {
    return res.status(400).json({ message: 'Task ID not specified.' });
  }
  try {
    const task = await Task.findOne({ _id: taskId });
    if (!task) {
      return res.status(404).json({ message: 'Task not found.' });
    }
    await Task.deleteOne({ _id: taskId });
    const updatedTasks = await Task.find({ user_group: req.userGroup });
    const tasksResponse = updatedTasks?.map((task) => ({
      id: task?._id,
      title: task?.title,
      description: task?.description,
      completed: task?.completed,
      created_by: task.created_by,
    }));
    io.sockets.emit('UPDATE_TASKS', {
      tasks: tasksResponse,
      group: req.userGroup,
    });
    io.sockets.emit('NOTIFICATION', {
      doer: req.userEmail,
      activity: 'deleted a task.',
      group: req.userGroup,
    });

    return res
      .status(200)
      .json({ message: 'Task deleted successfully.', tasks: tasksResponse });
  } catch {
    return res.status(500).json({ message: 'Something went wrong.' });
  }
};

export const updateTaskStatus = async (req, res) => {
  const taskId = req.params.taskId;
  if (!taskId) {
    return res.status(400).json({ message: 'Task ID not specified.' });
  }
  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found.' });
    }

    await Task.updateOne({ _id: taskId }, { completed: !task.completed });
    const tasks = await Task.find({ user_group: req.userGroup });
    const tasksResponse = tasks?.map((task) => ({
      id: task?._id,
      title: task?.title,
      description: task?.description,
      completed: task?.completed,
      created_by: task.created_by,
    }));
    io.sockets.emit('UPDATE_TASKS', {
      tasks: tasksResponse,
      group: req.userGroup,
    });
    io.sockets.emit('NOTIFICATION', {
      doer: req.userEmail,
      activity: 'updated a task.',
      group: req.userGroup,
    });
    return res.status(200).json({
      tasks: tasksResponse,
      message: `Task marked as ${task.completed ? 'incomplete' : 'completed'}.`,
    });
  } catch {
    return res.status(500).json({ message: 'Something went wrong.' });
  }
};
