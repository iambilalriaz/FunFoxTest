import { RouterProvider } from 'react-router-dom';
import AppToast from './components/common/AppToast';
import { router } from './router';

const App = () => {
  return (
    <>
      <AppToast />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
