import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppToast = () => {
  return (
    <ToastContainer
      position='top-center'
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme='colored'
      className='text-sm sm:text-md'
    />
  );
};

export default AppToast;
