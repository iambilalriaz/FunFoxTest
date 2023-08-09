import { useState } from 'react';
import Button from './common/Button';
import { ITask } from './TasksList';

const TaskForm = ({
  addNewTask,
  toggleAddingNewTask,
}: {
  addNewTask: (task: ITask) => void;
  toggleAddingNewTask: () => void;
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  return (
    <div className='h-screen grid place-items-center'>
      <div className='shadow-2xl rounded-lg p-4 min-w-[50%] m-4 text-secondary'>
        <label htmlFor='title' className='font-semibold'>
          Title
        </label>
        <input
          required
          type='text'
          id='title'
          value={title}
          onChange={(e) => setTitle(e?.target?.value)}
          className='outline-none border border-secondary rounded p-1 block w-full mb-4'
        />
        <label htmlFor='description' className='font-semibold'>
          Description
        </label>
        <textarea
          id='description'
          required
          value={description}
          onChange={(e) => setDescription(e?.target?.value)}
          className='outline-none border border-secondary rounded p-2 resize-none block h-[8rem] w-full'
        />
        <div className='flex justify-center items-center mt-4'>
          <Button
            label='Cancel'
            clickHandler={toggleAddingNewTask}
            variant='secondary'
          />
          <Button
            label='Submit'
            clickHandler={() =>
              addNewTask({
                id: crypto.randomUUID(),
                title,
                description,
                completed: false,
              })
            }
            styles='ml-4'
          />
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
