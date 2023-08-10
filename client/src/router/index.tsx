import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import ProtectedRoute from './ProtectedRoute';
import { getAppUser } from '../utils';

export const router = createBrowserRouter([
  {
    path: '/',
    element: getAppUser() ? <Dashboard /> : <Login />,
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
    element: <ProtectedRoute component={<Dashboard />} />,
  },
]);
