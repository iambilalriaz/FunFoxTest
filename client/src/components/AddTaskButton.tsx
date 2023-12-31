import { HiPencilAlt } from 'react-icons/hi';
const AddTaskButton = ({
  toggleAddingNewTask,
}: {
  toggleAddingNewTask: () => void;
}) => (
  <button
    title='Add new task'
    onClick={toggleAddingNewTask}
    className='z-20 bg-primary grid place-items-center text-3xl w-16 h-16 p-4 rounded-full text-light fixed right-8 bottom-8'
  >
    <HiPencilAlt />
  </button>
);

export default AddTaskButton;
