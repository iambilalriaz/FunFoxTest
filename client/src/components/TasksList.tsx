import { useCallback, useLayoutEffect, useState } from 'react';
import TaskForm from './TaskForm';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';
import Header from './Header';
import EmptyState from './EmptyState';
import { toast } from 'react-toastify';
import { allTasks } from '../assets/data';

export interface ITask {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

const reorder = (list: ITask[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const TasksList = () => {
  const [tasksList, setTasksList] = useState<ITask[]>(allTasks);
  const [addingNewTask, setAddingNewTask] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);

  useLayoutEffect(() => {
    const header = document.getElementById('header');
    setHeaderHeight((header?.clientHeight as number) + 16 || 0);
  }, [tasksList]);

  const toggleAddingNewTask = useCallback(() => {
    setAddingNewTask((prevState) => !prevState);
  }, []);

  const addNewTask = useCallback(
    (task: ITask) => {
      if (task?.title?.trim() && task?.description?.trim()) {
        setTasksList((prevState) => [task, ...prevState]);
        toggleAddingNewTask();
        toast.success('Task added successfully.');
      } else {
        toast.error('Please fill all the required fields.');
      }
    },
    [toggleAddingNewTask]
  );

  const deleteTask = useCallback((taskId: string) => {
    setTasksList((prevState) =>
      prevState?.filter((task) => task?.id !== taskId)
    );
    toast.success('Task deleted successfully.');
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
    const index = tasksList.map(({ id }) => id).indexOf(taskId);
    const tempArray = tasksList.slice();
    tempArray[index].completed = !tempArray[index].completed;
    setTasksList(tempArray);
    toast.success(
      tempArray?.[index]?.completed
        ? 'Task marked as completed'
        : 'Task marked as incomplete'
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      {!tasksList?.length ? null : (
        <Header toggleAddingNewTask={toggleAddingNewTask} />
      )}

      {addingNewTask ? (
        <TaskForm
          addNewTask={addNewTask}
          toggleAddingNewTask={toggleAddingNewTask}
        />
      ) : (
        <section
          style={{
            marginTop: `${headerHeight}px`,
          }}
        >
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='droppable'>
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {tasksList.map((task, index) => (
                    <TaskCard
                      key={task?.id}
                      task={task}
                      index={index}
                      deleteTask={deleteTask}
                      changeCompletionStatus={changeCompletionStatus}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <EmptyState
            tasksLength={tasksList?.length}
            toggleAddingNewTask={toggleAddingNewTask}
          />
        </section>
      )}
    </div>
  );
};

export default TasksList;
