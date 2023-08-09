import { Draggable } from 'react-beautiful-dnd';
import { BsPatchCheckFill } from 'react-icons/bs';
import { ITask } from './TasksList';
import Button from './common/Button';

const TaskCard = ({
  task,
  index,
  deleteTask,
  changeCompletionStatus,
}: {
  task: ITask;
  index: number;
  deleteTask: (taskId: string) => void;
  changeCompletionStatus: (taskId: string) => void;
}) => {
  const { id, title, description, completed } = task;

  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className='bg-light mx-4 my-2 shadow-md border border-silver/30 rounded p-4 px-4'>
            <div className='block sm:flex justify-between'>
              <div className='sm:max-w-[75%]'>
                <h1 className='font-semibold text-lg flex items-center'>
                  {title}
                  {completed && (
                    <p className='ml-2 text-success'>
                      <BsPatchCheckFill />
                    </p>
                  )}
                </h1>
                <p className='text-sm text-slate-500'>{description}</p>
              </div>
              <div className='sm:block flex flex-col self-center justify-center items-center mt-3 sm:mt-0'>
                <Button
                  label='Delete'
                  variant='danger'
                  clickHandler={() => deleteTask(id)}
                  styles='w-full max-w-[200px]'
                />
                <Button
                  variant={completed ? 'secondary' : 'success'}
                  label={`Mark as ${completed ? 'incomplete' : 'completed'}`}
                  clickHandler={() => changeCompletionStatus(id)}
                  styles='w-full mt-2  max-w-[200px]'
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
