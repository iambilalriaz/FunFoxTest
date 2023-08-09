import { createBrowserRouter } from 'react-router-dom';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import TasksList from '../components/TasksList';
import ProtectedRoute from './ProtectedRoute';
import { getAppUser } from '../utils';

export const router = createBrowserRouter([
  {
    path: '/',
    element: getAppUser() ? <TasksList /> : <Login />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/dashboard',
    element: <ProtectedRoute component={<TasksList />} />,
  },
]);
