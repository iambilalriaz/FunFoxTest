import Button from './common/Button';
import { FaPlus } from 'react-icons/fa';

const EmptyState = ({
  tasksLength,
  toggleAddingNewTask,
}: {
  tasksLength: number;
  toggleAddingNewTask: () => void;
}) => {
  return (
    <div
      className={`grid place-items-center ${
        tasksLength ? 'mt-12' : 'h-screen'
      }`}
    >
      {tasksLength ? null : (
        <div className='flex flex-col justify-center items-center'>
          <p className='italic font-normal text-sm sm:text-lg mb-4 text-slate-400'>
            No tasks found. Please add some tasks!
          </p>
          <Button
            Icon={FaPlus}
            label='Add New Task'
            clickHandler={toggleAddingNewTask}
          />
        </div>
      )}
    </div>
  );
};

export default EmptyState;
