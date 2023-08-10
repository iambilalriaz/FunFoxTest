import { Link } from 'react-router-dom';

const Header = () => (
  <header
    id='header'
    className='text-light flex justify-between items-center z-20 p-4 bg-secondary w-full fixed top-0 text-sm sm:text-2xl'
  >
    <h1 className='font-semibold'>Tasks Manager</h1>
    <Link
      to='/login'
      onClick={() => {
        localStorage.clear();
      }}
      className='ml-4 text-sm font-medium'
    >
      Logout
    </Link>
  </header>
);

export default Header;
