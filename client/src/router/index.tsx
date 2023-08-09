import { createBrowserRouter } from 'react-router-dom';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import TasksList from '../components/TasksList';

export const router = createBrowserRouter([
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
    element: <TasksList />,
  },
]);
