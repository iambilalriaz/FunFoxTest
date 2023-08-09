import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAppUser } from '../utils';

const ProtectedRoute = ({ component }: { component: JSX.Element }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!getAppUser()) {
      localStorage.setItem('redirect_route', window.location.pathname);
      navigate('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return component;
};

export default ProtectedRoute;
