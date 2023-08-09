import axios from 'axios';
import { API_URL } from './constants';

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
