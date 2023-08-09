import { Link } from 'react-router-dom';
import Button from './common/Button';
import { FaPlus } from 'react-icons/fa';

const Header = ({
  toggleAddingNewTask,
}: {
  toggleAddingNewTask: () => void;
}) => {
  return (
    <div
      id='header'
      className='flex justify-between items-center p-4 bg-secondary w-full fixed top-0 text-md sm:text-2xl'
    >
      <h1 className='text-light font-semibold'>Tasks Manager</h1>
      <div className='flex items-center'>
        <Button
          Icon={FaPlus}
          label='Add Task'
          clickHandler={toggleAddingNewTask}
        />
        <Link
          to='/login'
          onClick={() => {
            localStorage.clear();
          }}
          className='text-sm ml-4 text-light font-medium'
        >
          Logout
        </Link>
      </div>
    </div>
  );
};

export default Header;
