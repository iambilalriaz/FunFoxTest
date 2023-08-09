import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppToast = () => {
  return (
    <ToastContainer
      position='bottom-right'
      autoClose={5000}
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
