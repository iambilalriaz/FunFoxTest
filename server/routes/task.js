import { Router } from 'express';
import { detectUserGroup } from '../middleware/index.js';
import {
  addTask,
  getGroupTasks,
  removeTask,
  updateTaskStatus,
} from '../controllers/task.js';

const router = Router();

router.get('/', detectUserGroup, getGroupTasks);
router.post('/', detectUserGroup, addTask);
router.patch('/:taskId', detectUserGroup, updateTaskStatus);
router.delete('/:taskId', detectUserGroup, removeTask);

export default router;
