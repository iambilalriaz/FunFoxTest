import axios from 'axios';
import { API_URL } from './constants';
import { getAppUser } from '../utils';

export const userSignUp = (email: string, password: string, group: string) =>
  axios.request({
    method: 'POST',
    url: `${API_URL}/auth/signup`,
    data: { email, password, group },
  });
export const userLogin = (email: string, password: string) =>
  axios.request({
    method: 'POST',
    url: `${API_URL}/auth/login`,
    data: { email, password },
  });

export const getGroupTasks = () =>
  axios.request({
    method: 'GET',
    url: `${API_URL}/tasks`,
    headers: {
      user_id: getAppUser()?.id,
    },
  });

export const addTask = (title: string, description: string) =>
  axios.request({
    method: 'POST',
    url: `${API_URL}/tasks`,
    data: { title, description },
    headers: {
      user_id: getAppUser()?.id,
    },
  });
export const updateTaskStatus = (taskId: string) =>
  axios.request({
    method: 'PATCH',
    url: `${API_URL}/tasks/${taskId}`,
    headers: {
      user_id: getAppUser()?.id,
    },
  });
export const removeTask = (taskId: string) =>
  axios.request({
    method: 'DELETE',
    url: `${API_URL}/tasks/${taskId}`,
    headers: {
      user_id: getAppUser()?.id,
    },
  });
