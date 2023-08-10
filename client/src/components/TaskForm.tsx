import { KeyboardEvent, useState } from 'react';
import Button from './common/Button';
import { getAppUser } from '../utils';
import { motion } from 'framer-motion';
import Input from './common/Input';
import { slideInVariants } from '../assets/variants';
import { addTask } from '../api/requests';
import { toast } from 'react-toastify';
import Spinner from './common/Spinner';
import { ITask } from './types';
const TaskForm = ({
  setTasksList,
  toggleAddingNewTask,
}: {
  setTasksList: (tasksList: ITask[]) => void;
  toggleAddingNewTask: () => void;
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const addNewTask = (task: ITask) => {
    if (task?.title?.trim() && task?.description?.trim()) {
      setLoading(true);
      addTask(task?.title, task?.description)
        .then(({ data }) => {
          setTasksList(data?.tasks);
          toggleAddingNewTask();
          setLoading(false);
        })
        .catch(({ response }) => {
          toast.error(response?.data?.message);
          setLoading(false);
        });
    } else {
      toast.error('Please fill all the required fields.');
    }
  };

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
      variants={slideInVariants}
      transition={{
        delay: 0.2,
        duration: 0.5,
      }}
      className='h-screen grid place-items-center'
    >
      <div className='shadow-2xl rounded-lg p-4 min-w-[50%] m-4 text-secondary'>
        <Input
          label='Title'
          id='title'
          value={title}
          setValue={setTitle}
          onPressEnter={onPressEnter}
          containerStyles='mb-4'
          required
        />
        <label
          htmlFor='description'
          className='font-medium after:content-["*"] after:text-danger after:ml-0.5'
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
          {loading ? (
            <Spinner />
          ) : (
            <>
              <Button
                label='Cancel'
                clickHandler={toggleAddingNewTask}
                variant='secondary'
              />
              <Button label='Submit' clickHandler={onAddTask} styles='ml-4' />
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default TaskForm;
