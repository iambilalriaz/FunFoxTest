import { KeyboardEvent, useState } from 'react';
import Button from './common/Button';
import { ITask } from './TasksList';
import { getAppUser } from '../utils';
import { motion } from 'framer-motion';
const TaskForm = ({
  addNewTask,
  toggleAddingNewTask,
}: {
  addNewTask: (task: ITask) => void;
  toggleAddingNewTask: () => void;
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const onAddTask = () => {
    addNewTask({
      title,
      description,
      completed: false,
      created_by: getAppUser()?.email,
    });
  };
  const onPressEnter = (e: KeyboardEvent) => {
    if (e?.key === 'Enter') {
      onAddTask();
    }
  };
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 1000,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        delay: 0.2,
        duration: 0.5,
      }}
      className='h-screen grid place-items-center'
    >
      <div className='shadow-2xl rounded-lg p-4 min-w-[50%] m-4 text-secondary'>
        <label
          htmlFor='title'
          className='font-semibold after:content-["*"] after:text-danger after:ml-0.5'
        >
          Title
        </label>
        <input
          required
          type='text'
          id='title'
          value={title}
          onChange={(e) => setTitle(e?.target?.value)}
          className='outline-none border border-secondary rounded p-1 block w-full mb-4'
          onKeyDown={onPressEnter}
        />
        <label
          htmlFor='description'
          className='font-semibold after:content-["*"] after:text-danger after:ml-0.5'
        >
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
          <Button label='Submit' clickHandler={onAddTask} styles='ml-4' />
        </div>
      </div>
    </motion.div>
  );
};

export default TaskForm;
