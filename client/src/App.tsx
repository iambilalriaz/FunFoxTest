import { RouterProvider } from 'react-router-dom';
import AppToast from './components/common/AppToast';
import { router } from './router';

const App = () => {
  return (
    <div>
      <AppToast />
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
