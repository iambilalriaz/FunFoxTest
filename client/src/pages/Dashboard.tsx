import { motion } from 'framer-motion';
import { opacityVariants } from '../assets/variants';
import AddTaskButton from '../components/AddTaskButton';
import Header from '../components/Header';
import TaskForm from '../components/TaskForm';
import Spinner from '../components/common/Spinner';
import DragDrop from '../components/DragDrop';
import { getGroupTasks, removeTask, updateTaskStatus } from '../api/requests';
import EmptyState from '../components/EmptyState';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import UserInfo from '../components/UserInfo';
import { toast } from 'react-toastify';
import { ITask } from '../components/types';

const Dashboard = () => {
  const [tasksList, setTasksList] = useState<ITask[]>([]);
  const [addingNewTask, setAddingNewTask] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    const header = document.getElementById('header');
    setHeaderHeight((header?.clientHeight as number) + 16 || 0);
  }, [tasksList]);

  useEffect(() => {
    setLoading(true);
    getGroupTasks()
      .then(({ data }) => {
        setTasksList(data);
        setLoading(false);
      })
      .catch(() => {
        setTasksList([]);
        setLoading(false);
      });
  }, []);

  const toggleAddingNewTask = useCallback(() => {
    setAddingNewTask((prevState) => !prevState);
  }, []);

  const deleteTask = useCallback((taskId: string) => {
    setLoading(true);
    removeTask(taskId)
      .then(({ data }) => {
        setTasksList(data?.tasks);
        setLoading(false);
      })
      .catch(({ response }) => {
        toast.error(response?.data?.message);
        setLoading(false);
      });
  }, []);

  const changeCompletionStatus = useCallback((taskId: string) => {
    setLoading(true);
    updateTaskStatus(taskId)
      .then(({ data }) => {
        setTasksList(data?.tasks);
        setLoading(false);
      })
      .catch(({ response }) => {
        toast.error(response?.data?.message);
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      variants={opacityVariants}
      initial='initial'
      animate='animate'
      transition={{
        delay: 0.2,
        duration: 0.5,
      }}
    >
      {!addingNewTask ? (
        <AddTaskButton toggleAddingNewTask={toggleAddingNewTask} />
      ) : null}
      <Header />
      {addingNewTask ? (
        <TaskForm
          setTasksList={setTasksList}
          toggleAddingNewTask={toggleAddingNewTask}
        />
      ) : (
        <section
          style={
            !loading
              ? {
                  marginTop: `${headerHeight + 60}px`,
                }
              : {}
          }
        >
          <UserInfo />
          {loading ? (
            <div className='h-screen grid place-items-center'>
              <Spinner size='4xl' />
            </div>
          ) : (
            <>
              <DragDrop
                tasksList={tasksList}
                setTasksList={setTasksList}
                deleteTask={deleteTask}
                changeCompletionStatus={changeCompletionStatus}
              />
              <EmptyState tasksLength={tasksList?.length} />
            </>
          )}
        </section>
      )}
    </motion.div>
  );
};

export default Dashboard;
