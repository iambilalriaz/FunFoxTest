import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import TaskForm from './TaskForm';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';
import Header from './Header';
import EmptyState from './EmptyState';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

import {
  addTask,
  getGroupTasks,
  removeTask,
  updateTaskStatus,
} from '../api/requests';
import { getAppUser, socket } from '../utils';
import Spinner from './common/Spinner';
import AddTaskButton from './AddTaskButton';
import { opacityVariants, slideInVariants } from '../assets/variants';

export interface ITask {
  id?: string;
  title: string;
  description: string;
  completed: boolean;
  created_by: string;
}

const reorder = (list: ITask[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const TasksList = () => {
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

  const addNewTask = useCallback(
    (task: ITask) => {
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
    },
    [toggleAddingNewTask]
  );

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

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const tasks = reorder(
      tasksList,
      result.source.index,
      result.destination.index
    );

    setTasksList(tasks);
  };

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

  useEffect(() => {
    socket.on('UPDATE_TASKS', ({ tasks, group }) => {
      if (group === getAppUser()?.group) {
        setTasksList(tasks);
      }
    });
    return () => {
      socket.off('UPDATE_TASKS');
    };
  }, []);

  useEffect(() => {
    socket.on('NOTIFICATION', ({ doer, activity, group }) => {
      if (group === getAppUser()?.group) {
        toast.success(
          `${doer === getAppUser()?.email ? 'You' : doer} ${activity}`
        );
      }
    });
    return () => {
      socket.off('NOTIFICATION');
    };
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
          addNewTask={addNewTask}
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
          <motion.p
            variants={slideInVariants}
            className='fixed w-full top-12 pt-8 pb-4 text-center text-xs sm:text-base bg-light text-light flex justify-center items-center'
          >
            <p className='bg-secondary w-fit rounded-full px-2 sm:px-4 py-1'>
              {getAppUser()?.email}
            </p>
            <p className='bg-primary w-fit rounded-full px-2 sm:px-4 py-1 ml-1 sm:ml-3'>
              {getAppUser()?.group}
            </p>
          </motion.p>
          {loading ? (
            <div className='h-screen grid place-items-center'>
              <Spinner size='4xl' />
            </div>
          ) : (
            <>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId='droppable'>
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className='pb-4'
                    >
                      {tasksList.map((task, index) => (
                        <motion.div
                          key={task?.id}
                          variants={opacityVariants}
                          transition={{
                            delay: index / 3,
                            duration: 0.5,
                          }}
                        >
                          <TaskCard
                            task={task}
                            index={index}
                            deleteTask={deleteTask}
                            changeCompletionStatus={changeCompletionStatus}
                          />
                        </motion.div>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
              <EmptyState tasksLength={tasksList?.length} />
            </>
          )}
        </section>
      )}
    </motion.div>
  );
};

export default TasksList;
