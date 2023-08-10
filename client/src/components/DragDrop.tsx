import { motion } from 'framer-motion';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import { opacityVariants } from '../assets/variants';
import TaskCard from './TaskCard';
import { ITask } from './types';

const reorder = (list: ITask[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const DragDrop = ({
  tasksList,
  setTasksList,
  deleteTask,
  changeCompletionStatus,
}: {
  tasksList: ITask[];
  setTasksList: (tasksList: ITask[]) => void;
  deleteTask: (taskId: string) => void;
  changeCompletionStatus: (taskId: string) => void;
}) => {
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
  return (
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
  );
};

export default DragDrop;
