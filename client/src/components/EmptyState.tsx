const EmptyState = ({ tasksLength }: { tasksLength: number }) => (
  <div
    className={`grid place-items-center -z-10 absolute inset-0 ${
      tasksLength ? 'mt-20' : 'h-full'
    }`}
  >
    {tasksLength ? null : (
      <div className='flex flex-col justify-center items-center'>
        <p className='italic font-normal text-sm sm:text-lg mb-4 text-slate-400'>
          No tasks found. Please add some tasks!
        </p>
      </div>
    )}
  </div>
);

export default EmptyState;
